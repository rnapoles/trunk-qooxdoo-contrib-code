(function() {
  
if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"feedreader.Application","qx.theme":"qx.theme.Modern","qx.version":"0.9-pre"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"feedreader":{"resourceUri":"resource","sourceUri":"script","version":"trunk"},"qx":{"resourceUri":"resource","sourceUri":"script","version":"trunk"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {"feedreader/css/reader.css":"feedreader","feedreader/images/combined/icons16.png":[16,96,"png","feedreader"],"feedreader/images/combined/icons22.png":[22,176,"png","feedreader"],"feedreader/images/loading22.gif":[22,22,"gif","feedreader"],"feedreader/images/loading66.gif":[66,66,"gif","feedreader"],"feedreader/proxy/proxy.php":"feedreader","qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-61,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-43,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-30,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-15,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-53,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-35,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-checked-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-checked-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-disabled-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-hovered-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-preselected-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-pressed-c.png":[20,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-404,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-474,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-544,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",0,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-600,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-460,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-614,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-320,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-196,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-488,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-586,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-376,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-516,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-558,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-530,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-278,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-224,0],"qx/decoration/Modern/form/input.png":[84,12,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-70,0],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-264,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-432,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-390,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-42,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-362,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-306,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-292,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-572,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-348,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-502,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-14,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-418,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-446,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/inputcheckradio-combined.png",-334,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-c.png":[20,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-c.png":[20,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/inputcheckradio-combined.png":[628,14,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[60,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[20,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",-20,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-c.png":[20,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/scrollbar-combined.png":[174,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-69,0],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-151,0],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-43,0],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-12,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-59,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-145,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-170,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-39,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-53,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-27,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-c.png":[20,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[20,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-8],"qx/decoration/Modern/table-combined.png":[74,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-46,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-22,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/header-cell.png":[20,18,"png","qx","qx/decoration/Modern/table-combined.png",-54,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-36,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[20,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[12,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[14,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[20,12,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[20,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[20,2,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[40,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[20,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-20,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-c.png":[20,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-c.png":[20,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/icon/Tango/16/actions/dialog-apply.png":[16,16,"png","feedreader","feedreader/images/combined/icons16.png",0,-80],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","feedreader","feedreader/images/combined/icons16.png",0,-64],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","feedreader","feedreader/images/combined/icons16.png",0,0],"qx/icon/Tango/16/actions/document-new.png":[16,16,"png","feedreader","feedreader/images/combined/icons16.png",0,-16],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-locale.png":[16,16,"png","feedreader","feedreader/images/combined/icons16.png",0,-48],"qx/icon/Tango/16/apps/preferences-theme.png":[16,16,"png","feedreader","feedreader/images/combined/icons16.png",0,-32],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/actions/dialog-cancel.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,-154],"qx/icon/Tango/22/actions/dialog-ok.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,-66],"qx/icon/Tango/22/actions/help-about.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,-88],"qx/icon/Tango/22/actions/process-stop.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,-22],"qx/icon/Tango/22/actions/view-refresh.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,-44],"qx/icon/Tango/22/apps/internet-feed-reader.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,0],"qx/icon/Tango/22/apps/preferences-theme.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,-132],"qx/icon/Tango/22/places/folder.png":[22,22,"png","feedreader","feedreader/images/combined/icons22.png",0,-110],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]};
qx.$$translations = {"C":{},"de":{"Add":"Hinzufügen","Add a feed":"Feed hinzufügen","Add feed":"Feed hinzufügen","Cancel":"Abbrechen","Feed Information":"Feed Information","FeedReader (qooxdoo powered)":"FeedReader (qooxdoo powered)","Help":"Hilfe","Language":"Sprache","OK":"OK","Open preferences window.":"Einstellungsfenster öffnen","Please enter a title.":"Bitte geben Sie einen Titel an.","Please enter a url.":"Bitte geben Sie eine URL an.","Posts":"Nachrichten","Preferences":"Einstellungen","Reload":"Neu laden","Reload the feeds. (%1)":"Feeds neu laden. (%1)","Remove feed":"Feed löschen","Static Feeds":"Vordefinierte Quellen","Title:":"Titel:","URL:":"URL:","User Feeds":"Eigene Quellen","key_full_Alt":"Alt","key_full_Apps":"Kontextmenü","key_full_Backspace":"Rücktaste","key_full_CapsLock":"Feststelltaste","key_full_Control":"Steuerung","key_full_Delete":"Entfernen","key_full_Down":"Pfeil runter","key_full_End":"Ende","key_full_Enter":"Enter","key_full_Escape":"Escape","key_full_Home":"Position 1","key_full_Insert":"Einfügen","key_full_Left":"Pfeil links","key_full_Meta":"Meta","key_full_NumLock":"NumLock","key_full_PageDown":"Bild runter ","key_full_PageUp":"Bild hoch","key_full_Pause":"Pause","key_full_PrintScreen":"Drucken","key_full_Right":"Pfeil rechts","key_full_Scroll":"Rollen","key_full_Shift":"Umschalttaste","key_full_Space":"Leertaste","key_full_Tab":"Tabulator","key_full_Up":"Pfeil hoch","key_full_Win":"Windowstaste","key_short_Alt":"Alt","key_short_Apps":"Kontext","key_short_Backspace":"Rück","key_short_CapsLock":"Feststell","key_short_Control":"Strg","key_short_Delete":"Entf","key_short_Down":"Runter","key_short_End":"Ende","key_short_Enter":"Enter","key_short_Escape":"Esc","key_short_Home":"Pos1","key_short_Insert":"Einfg","key_short_Left":"Links","key_short_Meta":"Meta","key_short_NumLock":"Num","key_short_PageDown":"Bild runter","key_short_PageUp":"Bild hoch","key_short_Pause":"Pause","key_short_PrintScreen":"Druck","key_short_Right":"Rechts ","key_short_Scroll":"Rollen","key_short_Shift":"Umschalt","key_short_Space":"Leer","key_short_Tab":"Tab","key_short_Up":"Hoch","key_short_Win":"Win"},"en":{},"es":{"Add":"Agregar","Add a feed":"Agregar Feed","Add feed":"Agregar feed","Cancel":"Cancelar","Feed Information":"Información del Feed","FeedReader (qooxdoo powered)":"FeedReader (qooxdoo powered)","Help":"Ayuda","Language":"Lenguaje","OK":"OK","Open preferences window.":"Abre la ventana de preferencias","Please enter a title.":"Por favor ingrese un título","Please enter a url.":"Por favor ingrese una url","Posts":"Posts","Preferences":"Preferencias","Reload":"Actualizar","Reload the feeds. (%1)":"Recargar los feeds (%1)","Remove feed":"Eliminar feed","Static Feeds":"Feeds Estáticos","Title:":"Título:","URL:":"URL:","User Feeds":"Feeds del Usuario","key_full_Alt":"Alt","key_full_Apps":"Aplicaciones","key_full_Backspace":"Retroceso","key_full_CapsLock":"Bloqueo Mayúsculas","key_full_Control":"Control","key_full_Delete":"Suprimir","key_full_Down":"Flecha abajo","key_full_End":"Fin","key_full_Enter":"Intro","key_full_Escape":"Escape","key_full_Home":"Inicio","key_full_Insert":"Insertar","key_full_Left":"Flecha izquierda","key_full_Meta":"Meta","key_full_NumLock":"Bloqueo Numérico","key_full_PageDown":"Avanzar Página","key_full_PageUp":"Retroceder Página","key_full_Pause":"Pausa","key_full_PrintScreen":"Imprimir Pantalla","key_full_Right":"Flecha derecha","key_full_Scroll":"Bloq. Despl.","key_full_Shift":"Mayúscula","key_full_Space":"Espacio","key_full_Tab":"Tabulador","key_full_Up":"Flecha arriba","key_full_Win":"Windows","key_short_Alt":"Alt","key_short_Apps":"Aplic","key_short_Backspace":"Retroceso","key_short_CapsLock":"BloqMayús","key_short_Control":"Ctrl","key_short_Delete":"Supr","key_short_Down":"Abajo","key_short_End":"Fin","key_short_Enter":"Intro","key_short_Escape":"Esc","key_short_Home":"Inicio","key_short_Insert":"Insert","key_short_Left":"Izquierda","key_short_Meta":"Meta","key_short_NumLock":"BloqNum","key_short_PageDown":"AvPág","key_short_PageUp":"RePág","key_short_Pause":"Pausa","key_short_PrintScreen":"ImprPant","key_short_Right":"Derecha","key_short_Scroll":"BloqDespl","key_short_Shift":"Mayús","key_short_Space":"Espacio","key_short_Tab":"Tab","key_short_Up":"Arriba","key_short_Win":"Win"},"fr":{"Add":"Ajouter","Add a feed":"Ajouter un fil","Add feed":"Ajouter un fil","Cancel":"Annuler","Feed Information":"Information sur le fil","FeedReader (qooxdoo powered)":"Agrégateur de fils de syndication (fait à l'aide de qooxdoo)","Help":"Aide","Language":"Langue","OK":"OK","Open preferences window.":"Ouvrir la fenêtre de préférences","Please enter a title.":"S'il-vous-plaît, entrez un titre.","Please enter a url.":"S'il-vous-plaît, entrez une url.","Posts":"Messages","Preferences":"Préférences","Reload":"Rafraichir","Reload the feeds. (%1)":"Rafraichir les fils. (%1)","Remove feed":"Enlever un fil","Static Feeds":"Fils statiques","Title:":"Titre:","URL:":"URL:","User Feeds":"Fils de l'utilisateur","key_full_Alt":"Alternative","key_full_Apps":"Application","key_full_Backspace":"Effacement arrière","key_full_CapsLock":"Verrouillage des Majuscule","key_full_Control":"Contrôle","key_full_Delete":"Suppression","key_full_Down":"Bas","key_full_End":"Fin","key_full_Enter":"Entrée","key_full_Escape":"Échappement","key_full_Home":"Origine","key_full_Insert":"Insertion","key_full_Left":"Gauche","key_full_Meta":"Meta","key_full_NumLock":"Verouillage Numérique","key_full_PageDown":"Page Suivante","key_full_PageUp":"Page Précédente","key_full_Pause":"Pause","key_full_PrintScreen":"Impression de l'écran","key_full_Right":"Droite","key_full_Scroll":"Arrêt défilement","key_full_Shift":"Majuscules","key_full_Space":"Espace","key_full_Tab":"Tabulation","key_full_Up":"Haut","key_full_Win":"Windows","key_short_Alt":"Alt","key_short_Apps":"App.","key_short_Backspace":"Effacement Arrière","key_short_CapsLock":"Verr. Maj.","key_short_Control":"Ctrl","key_short_Delete":"Supp.","key_short_Down":"Bas","key_short_End":"Fin","key_short_Enter":"Entrée","key_short_Escape":"Echap.","key_short_Home":"Orig.","key_short_Insert":"Ins.","key_short_Left":"Gauche","key_short_Meta":"Meta","key_short_NumLock":"Verr. Num.","key_short_PageDown":"Pg Suiv.","key_short_PageUp":"Pg Préc.","key_short_Pause":"Pause","key_short_PrintScreen":"Imp. Écran","key_short_Right":"Droite","key_short_Scroll":"Arrêt Défil","key_short_Shift":"Maj","key_short_Space":"Espace","key_short_Tab":"Tab","key_short_Up":"Haut","key_short_Win":"Win"},"it":{"Add":"Aggiungi","Add a feed":"Aggiungi un feed","Add feed":"Aggiungi un feed","Cancel":"Annulla","Feed Information":"Informazioni sul Feed","FeedReader (qooxdoo powered)":"FeedReader (realizzato con qooxdoo)","Help":"Aiuto","Language":"Lingua","OK":"OK","Open preferences window.":"Apri la finestra delle preferenze.","Please enter a title.":"Inserisci un titolo.","Please enter a url.":"Inserisci un URL.","Posts":"Messaggi","Preferences":"Preferenze","Reload":"Ricarica","Reload the feeds. (%1)":"Ricarica i feed. (%1)","Remove feed":"Rimuovi il feed","Static Feeds":"Feed statici","Title:":"Titolo:","URL:":"URL:","User Feeds":"Feed utente","key_full_Alt":"Alt","key_full_Apps":"Tasto Menu","key_full_Backspace":"Backspace","key_full_CapsLock":"Blocca Maiuscole","key_full_Control":"Control","key_full_Delete":"Cancella","key_full_Down":"Freccia Giù","key_full_End":"Fine","key_full_Enter":"Invio","key_full_Escape":"Escape","key_full_Home":"Inizio","key_full_Insert":"Inserisci","key_full_Left":"Freccia Sinistra","key_full_Meta":"Meta","key_full_NumLock":"Blocca Numeri","key_full_PageDown":"Pagina Giù","key_full_PageUp":"Pagina Su","key_full_Pause":"Pausa","key_full_PrintScreen":"Stampa Schermo","key_full_Right":"Freccia Destra","key_full_Scroll":"Blocca Scorrimento","key_full_Shift":"Maiuscole","key_full_Space":"Spazio","key_full_Tab":"Tabulazione","key_full_Up":"Freccia Su","key_full_Win":"Tasto Windows","key_short_Alt":"Alt","key_short_Apps":"Menu","key_short_Backspace":"Backspace","key_short_CapsLock":"Bloc Maiusc","key_short_Control":"Ctrl","key_short_Delete":"Canc","key_short_Down":"Giù","key_short_End":"Fine","key_short_Enter":"Invio","key_short_Escape":"Esc","key_short_Home":"Inizio","key_short_Insert":"Ins","key_short_Left":"Sinistra","key_short_Meta":"Meta","key_short_NumLock":"Bloc Num","key_short_PageDown":"Pag Giù","key_short_PageUp":"Pag Su","key_short_Pause":"Pausa","key_short_PrintScreen":"Stamp","key_short_Right":"Destra","key_short_Scroll":"Bloc Scorr","key_short_Shift":"Maiusc","key_short_Space":"Spazio","key_short_Tab":"Tab","key_short_Up":"Su","key_short_Win":"Win"},"nl":{"Add":"Toevoegen","Add a feed":"Een feed toevoegen","Add feed":"Feed toevoegen","Cancel":"Annuleren","Feed Information":"Feed Informatie","FeedReader (qooxdoo powered)":"FeedReader (qooxdoo powered)","Help":"Help","Language":"Taal","OK":"OK","Open preferences window.":"Open voorkeuren venster.","Please enter a title.":"Voer a.u.b. een titel in.","Please enter a url.":"Voer a.u.b. een URL in.","Posts":"Berichten","Preferences":"Voorkeuren","Reload":"Herladen","Reload the feeds. (%1)":"Feeds herladen. (%1)","Remove feed":"Feed verwijderen","Static Feeds":"Statische Feeds","Title:":"Titel:","URL:":"URL:","User Feeds":"Gebruiker Feeds","key_full_Alt":"Alternative","key_full_Apps":"Contextmenu","key_full_Backspace":"Backspace","key_full_CapsLock":"Caps Lock","key_full_Control":"Bediending","key_full_Delete":"Verwijderen","key_full_Down":"Pijl omlaag","key_full_End":"End","key_full_Enter":"Enter","key_full_Escape":"Escape","key_full_Home":"Oorsprong","key_full_Insert":"Invoegen","key_full_Left":"Pijl links","key_full_Meta":"Meta","key_full_NumLock":"Num Lock","key_full_PageDown":"Volgende pagina","key_full_PageUp":"Vorige pagina","key_full_Pause":"Pauze","key_full_PrintScreen":"Schermafbeelding","key_full_Right":"Pijl rechts","key_full_Scroll":"Scroll Lock","key_full_Shift":"Shift","key_full_Space":"Spatiebalk","key_full_Tab":"Tabulator","key_full_Up":"Pijl omhoog","key_full_Win":"Windowstoets","key_short_Alt":"Alt","key_short_Apps":"Apps","key_short_Backspace":"Backspace","key_short_CapsLock":"Caps Lock","key_short_Control":"Ctrl","key_short_Delete":"Del","key_short_Down":"Omlaag","key_short_End":"End","key_short_Enter":"Enter","key_short_Escape":"Esc","key_short_Home":"Home","key_short_Insert":"Ins","key_short_Left":"Links","key_short_Meta":"Meta","key_short_NumLock":"Num Lock","key_short_PageDown":"PgDn","key_short_PageUp":"PgUp","key_short_Pause":"Pause","key_short_PrintScreen":"PrtSc","key_short_Right":"Rechts","key_short_Scroll":"Scroll Lock","key_short_Shift":"Shift","key_short_Space":"Spatie","key_short_Tab":"Tab","key_short_Up":"Omhoog","key_short_Win":"Win"},"sv":{"Add":"Lägg till","Add a feed":"Lägg till ett flöde","Add feed":"Lägg till flöde","Cancel":"Avbryt","Feed Information":"Flödesinformation","FeedReader (qooxdoo powered)":"FeedReader (qooxdoo driven)","Help":"Hjälp","Language":"Språk","OK":"OK","Open preferences window.":"Öppna inställningsfönstret","Please enter a title.":"Fyll i en titel","Please enter a url.":"Fyll i en url.","Posts":"Poster","Preferences":"Inställningar","Reload":"Uppdatera","Reload the feeds. (%1)":"Ladda om flödena. (%1)","Remove feed":"Ta bort flöde","Static Feeds":"Statiska flöden","Title:":"Titel","URL:":"URL:","User Feeds":"Användarflöden","key_full_Alt":"Alt","key_full_Apps":"Apps","key_full_Backspace":"Backspace","key_full_CapsLock":"CapsLock","key_full_Control":"Control","key_full_Delete":"Delete","key_full_Down":"Ner","key_full_End":"End","key_full_Enter":"Enter","key_full_Escape":"Escape","key_full_Home":"Home","key_full_Insert":"Insert","key_full_Left":"Vänster","key_full_Meta":"Meta","key_full_NumLock":"NumLock","key_full_PageDown":"PageDown","key_full_PageUp":"PageUp","key_full_Pause":"Pause","key_full_PrintScreen":"PrintScreen","key_full_Right":"Höger","key_full_Scroll":"Scroll","key_full_Shift":"Shift","key_full_Space":"Blanksteg","key_full_Tab":"Tabb","key_full_Up":"Upp","key_full_Win":"Win","key_short_Alt":"Alt","key_short_Apps":"Apps","key_short_Backspace":"BS","key_short_CapsLock":"Caps","key_short_Control":"CTRL","key_short_Delete":"DEL","key_short_Down":"Ner","key_short_End":"END","key_short_Enter":"Enter","key_short_Escape":"ESC","key_short_Home":"HOME","key_short_Insert":"INS","key_short_Left":"Vänster","key_short_Meta":"Meta","key_short_NumLock":"NUM","key_short_PageDown":"PGDN","key_short_PageUp":"PGUP","key_short_Pause":"Pause","key_short_PrintScreen":"PRNSCN","key_short_Right":"Höger","key_short_Scroll":"SCL","key_short_Shift":"Shift","key_short_Space":"Space","key_short_Tab":"Tabb","key_short_Up":"Upp","key_short_Win":"Win"}};
qx.$$locales = {"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, yyyy","cldr_date_format_long":"MMMM d, yyyy","cldr_date_format_medium":"MMM d, yyyy","cldr_date_format_short":"M/d/yy","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM yyyy","cldr_date_time_format_yMMMEd":"EEE, MMM d, yyyy","cldr_date_time_format_yMMMM":"MMMM yyyy","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ yyyy","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a v","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"de":{"alternateQuotationEnd":"‘","alternateQuotationStart":"‚","cldr_am":"vorm.","cldr_date_format_full":"EEEE, d. MMMM yyyy","cldr_date_format_long":"d. MMMM yyyy","cldr_date_format_medium":"dd.MM.yyyy","cldr_date_format_short":"dd.MM.yy","cldr_date_time_format_Ed":"E d","cldr_date_time_format_H":"H","cldr_date_time_format_HHmm":"HH:mm","cldr_date_time_format_HHmmss":"HH:mm:ss","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, d.M.","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d. MMM","cldr_date_time_format_MMMMEd":"E d. MMMM","cldr_date_time_format_MMMMd":"d. MMMM","cldr_date_time_format_MMMMdd":"dd. MMMM","cldr_date_time_format_MMMd":"d. MMM","cldr_date_time_format_MMd":"d.MM.","cldr_date_time_format_MMdd":"dd.MM.","cldr_date_time_format_Md":"d.M.","cldr_date_time_format_d":"d","cldr_date_time_format_hhmm":"hh:mm a","cldr_date_time_format_hhmmss":"hh:mm:ss a","cldr_date_time_format_mmss":"mm:ss","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"yyyy-M","cldr_date_time_format_yMEd":"EEE, yyyy-M-d","cldr_date_time_format_yMMM":"MMM yyyy","cldr_date_time_format_yMMMEd":"EEE, d. MMM yyyy","cldr_date_time_format_yMMMM":"MMMM yyyy","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ yyyy","cldr_date_time_format_yyMM":"MM.yy","cldr_date_time_format_yyMMM":"MMM yy","cldr_date_time_format_yyMMdd":"dd.MM.yy","cldr_date_time_format_yyQ":"Q yy","cldr_date_time_format_yyQQQQ":"QQQQ yy","cldr_date_time_format_yyyy":"yyyy","cldr_date_time_format_yyyyMMMM":"MMMM yyyy","cldr_day_format_abbreviated_fri":"Fr.","cldr_day_format_abbreviated_mon":"Mo.","cldr_day_format_abbreviated_sat":"Sa.","cldr_day_format_abbreviated_sun":"So.","cldr_day_format_abbreviated_thu":"Do.","cldr_day_format_abbreviated_tue":"Di.","cldr_day_format_abbreviated_wed":"Mi.","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"D","cldr_day_format_narrow_tue":"D","cldr_day_format_narrow_wed":"M","cldr_day_format_wide_fri":"Freitag","cldr_day_format_wide_mon":"Montag","cldr_day_format_wide_sat":"Samstag","cldr_day_format_wide_sun":"Sonntag","cldr_day_format_wide_thu":"Donnerstag","cldr_day_format_wide_tue":"Dienstag","cldr_day_format_wide_wed":"Mittwoch","cldr_day_stand-alone_abbreviated_fri":"Fr.","cldr_day_stand-alone_abbreviated_mon":"Mo.","cldr_day_stand-alone_abbreviated_sat":"Sa.","cldr_day_stand-alone_abbreviated_sun":"So.","cldr_day_stand-alone_abbreviated_thu":"Do.","cldr_day_stand-alone_abbreviated_tue":"Di.","cldr_day_stand-alone_abbreviated_wed":"Mi.","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"D","cldr_day_stand-alone_narrow_tue":"D","cldr_day_stand-alone_narrow_wed":"M","cldr_day_stand-alone_wide_fri":"Freitag","cldr_day_stand-alone_wide_mon":"Montag","cldr_day_stand-alone_wide_sat":"Samstag","cldr_day_stand-alone_wide_sun":"Sonntag","cldr_day_stand-alone_wide_thu":"Donnerstag","cldr_day_stand-alone_wide_tue":"Dienstag","cldr_day_stand-alone_wide_wed":"Mittwoch","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Okt","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dez","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mrz","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"Mai","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"Januar","cldr_month_format_wide_10":"Oktober","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"Dezember","cldr_month_format_wide_2":"Februar","cldr_month_format_wide_3":"März","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"Mai","cldr_month_format_wide_6":"Juni","cldr_month_format_wide_7":"Juli","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_abbreviated_10":"Okt","cldr_month_stand-alone_abbreviated_11":"Nov","cldr_month_stand-alone_abbreviated_12":"Dez","cldr_month_stand-alone_abbreviated_3":"Mär","cldr_month_stand-alone_abbreviated_7":"Jul","cldr_month_stand-alone_abbreviated_8":"Aug","cldr_month_stand-alone_abbreviated_9":"Sep","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":",","cldr_number_group_separator":".","cldr_number_percent_format":"#,##0 %","cldr_pm":"nachm.","cldr_time_format_full":"HH:mm:ss v","cldr_time_format_long":"HH:mm:ss z","cldr_time_format_medium":"HH:mm:ss","cldr_time_format_short":"HH:mm","quotationEnd":"“","quotationStart":"„"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, yyyy","cldr_date_format_long":"MMMM d, yyyy","cldr_date_format_medium":"MMM d, yyyy","cldr_date_format_short":"M/d/yy","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM yyyy","cldr_date_time_format_yMMMEd":"EEE, MMM d, yyyy","cldr_date_time_format_yMMMM":"MMMM yyyy","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ yyyy","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a v","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"es":{"alternateQuotationEnd":"”","alternateQuotationStart":"“","cldr_am":"a.m.","cldr_date_format_full":"EEEE d 'de' MMMM 'de' yyyy","cldr_date_format_long":"d 'de' MMMM 'de' yyyy","cldr_date_format_medium":"dd/MM/yyyy","cldr_date_format_short":"dd/MM/yy","cldr_date_time_format_HHmm":"HH:mm","cldr_date_time_format_HHmmss":"HH:mm:ss","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E d-M","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d MMM","cldr_date_time_format_MMMMEd":"E d MMMM","cldr_date_time_format_MMMMd":"d 'de' MMMM","cldr_date_time_format_MMMd":"d MMM","cldr_date_time_format_MMMdd":"dd-MMM","cldr_date_time_format_MMd":"d/MM","cldr_date_time_format_Md":"d/M","cldr_date_time_format_d":"d","cldr_date_time_format_hhmm":"hh:mm a","cldr_date_time_format_hhmmss":"hh:mm:ss a","cldr_date_time_format_mmss":"mm:ss","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"M-yyyy","cldr_date_time_format_yMEd":"EEE, d-M-yyyy","cldr_date_time_format_yMMM":"MMM yyyy","cldr_date_time_format_yMMMEd":"EEE, yyyy MMM d","cldr_date_time_format_yMMMM":"MMMM yyyy","cldr_date_time_format_yQ":"yyyy 'trimestre' Q","cldr_date_time_format_yQQQ":"yyyy 'trimestre' Q","cldr_date_time_format_yyMM":"MM/yy","cldr_date_time_format_yyMMM":"MMM-yy","cldr_date_time_format_yyQ":"Q yy","cldr_date_time_format_yyQQQQ":"QQQQ 'de' yyyy","cldr_date_time_format_yyyyMM":"MM/yyyy","cldr_day_format_abbreviated_fri":"vie","cldr_day_format_abbreviated_mon":"lun","cldr_day_format_abbreviated_sat":"sáb","cldr_day_format_abbreviated_sun":"dom","cldr_day_format_abbreviated_thu":"jue","cldr_day_format_abbreviated_tue":"mar","cldr_day_format_abbreviated_wed":"mié","cldr_day_format_narrow_fri":"V","cldr_day_format_narrow_mon":"L","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"D","cldr_day_format_narrow_thu":"J","cldr_day_format_narrow_tue":"M","cldr_day_format_narrow_wed":"M","cldr_day_format_wide_fri":"viernes","cldr_day_format_wide_mon":"lunes","cldr_day_format_wide_sat":"sábado","cldr_day_format_wide_sun":"domingo","cldr_day_format_wide_thu":"jueves","cldr_day_format_wide_tue":"martes","cldr_day_format_wide_wed":"miércoles","cldr_day_stand-alone_abbreviated_fri":"vie","cldr_day_stand-alone_abbreviated_mon":"lun","cldr_day_stand-alone_abbreviated_sat":"sáb","cldr_day_stand-alone_abbreviated_sun":"dom","cldr_day_stand-alone_abbreviated_thu":"jue","cldr_day_stand-alone_abbreviated_tue":"mar","cldr_day_stand-alone_abbreviated_wed":"mié","cldr_day_stand-alone_narrow_fri":"V","cldr_day_stand-alone_narrow_mon":"L","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"D","cldr_day_stand-alone_narrow_thu":"J","cldr_day_stand-alone_narrow_tue":"M","cldr_day_stand-alone_narrow_wed":"M","cldr_day_stand-alone_wide_fri":"viernes","cldr_day_stand-alone_wide_mon":"lunes","cldr_day_stand-alone_wide_sat":"sábado","cldr_day_stand-alone_wide_sun":"domingo","cldr_day_stand-alone_wide_thu":"jueves","cldr_day_stand-alone_wide_tue":"martes","cldr_day_stand-alone_wide_wed":"miércoles","cldr_month_format_abbreviated_1":"ene","cldr_month_format_abbreviated_10":"oct","cldr_month_format_abbreviated_11":"nov","cldr_month_format_abbreviated_12":"dic","cldr_month_format_abbreviated_2":"feb","cldr_month_format_abbreviated_3":"mar","cldr_month_format_abbreviated_4":"abr","cldr_month_format_abbreviated_5":"may","cldr_month_format_abbreviated_6":"jun","cldr_month_format_abbreviated_7":"jul","cldr_month_format_abbreviated_8":"ago","cldr_month_format_abbreviated_9":"sep","cldr_month_format_wide_1":"enero","cldr_month_format_wide_10":"octubre","cldr_month_format_wide_11":"noviembre","cldr_month_format_wide_12":"diciembre","cldr_month_format_wide_2":"febrero","cldr_month_format_wide_3":"marzo","cldr_month_format_wide_4":"abril","cldr_month_format_wide_5":"mayo","cldr_month_format_wide_6":"junio","cldr_month_format_wide_7":"julio","cldr_month_format_wide_8":"agosto","cldr_month_format_wide_9":"septiembre","cldr_month_stand-alone_narrow_1":"E","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":",","cldr_number_group_separator":".","cldr_number_percent_format":"#,##0%","cldr_pm":"p.m.","cldr_time_format_full":"hh:mm:ss a v","cldr_time_format_long":"HH:mm:ss z","cldr_time_format_medium":"HH:mm:ss","cldr_time_format_short":"HH:mm","quotationEnd":"’","quotationStart":"‘"},"fr":{"alternateQuotationEnd":"”","alternateQuotationStart":"“","cldr_am":"AM","cldr_date_format_full":"EEEE d MMMM yyyy","cldr_date_format_long":"d MMMM yyyy","cldr_date_format_medium":"d MMM yyyy","cldr_date_format_short":"dd/MM/yy","cldr_date_time_format_HHmm":"HH:mm","cldr_date_time_format_HHmmss":"HH:mm:ss","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"EEE d/M","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d MMM","cldr_date_time_format_MMMMEd":"EEE d MMMM","cldr_date_time_format_MMMMd":"d MMMM","cldr_date_time_format_MMMd":"d MMM","cldr_date_time_format_MMMdd":"dd MMM","cldr_date_time_format_MMd":"d/MM","cldr_date_time_format_MMdd":"dd/MM","cldr_date_time_format_Md":"M-d","cldr_date_time_format_d":"d","cldr_date_time_format_hhmm":"HH:mm","cldr_date_time_format_hhmmss":"HH:mm:ss","cldr_date_time_format_mmss":"mm:ss","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE d/M/yyyy","cldr_date_time_format_yMMM":"MMM yyyy","cldr_date_time_format_yMMMEd":"EEE d MMM yyyy","cldr_date_time_format_yMMMM":"MMMM yyyy","cldr_date_time_format_yQ":"QQQ yyyy","cldr_date_time_format_yQQQ":"QQQ yyyy","cldr_date_time_format_yyMM":"MM/yy","cldr_date_time_format_yyMMM":"MMM yy","cldr_date_time_format_yyMMMEEEd":"EEE d MMM yy","cldr_date_time_format_yyMMMd":"d MMM yy","cldr_date_time_format_yyQ":"QQQ yy","cldr_date_time_format_yyQQQQ":"QQQQ yy","cldr_date_time_format_yyyyMMMM":"MMMM yyyy","cldr_day_format_abbreviated_fri":"ven.","cldr_day_format_abbreviated_mon":"lun.","cldr_day_format_abbreviated_sat":"sam.","cldr_day_format_abbreviated_sun":"dim.","cldr_day_format_abbreviated_thu":"jeu.","cldr_day_format_abbreviated_tue":"mar.","cldr_day_format_abbreviated_wed":"mer.","cldr_day_format_narrow_fri":"V","cldr_day_format_narrow_mon":"L","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"D","cldr_day_format_narrow_thu":"J","cldr_day_format_narrow_tue":"M","cldr_day_format_narrow_wed":"M","cldr_day_format_wide_fri":"vendredi","cldr_day_format_wide_mon":"lundi","cldr_day_format_wide_sat":"samedi","cldr_day_format_wide_sun":"dimanche","cldr_day_format_wide_thu":"jeudi","cldr_day_format_wide_tue":"mardi","cldr_day_format_wide_wed":"mercredi","cldr_day_stand-alone_abbreviated_fri":"ven.","cldr_day_stand-alone_abbreviated_mon":"lun.","cldr_day_stand-alone_abbreviated_sat":"sam.","cldr_day_stand-alone_abbreviated_sun":"dim.","cldr_day_stand-alone_abbreviated_thu":"jeu.","cldr_day_stand-alone_abbreviated_tue":"mar.","cldr_day_stand-alone_abbreviated_wed":"mer.","cldr_day_stand-alone_narrow_fri":"V","cldr_day_stand-alone_narrow_mon":"L","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"D","cldr_day_stand-alone_narrow_thu":"J","cldr_day_stand-alone_narrow_tue":"M","cldr_day_stand-alone_narrow_wed":"M","cldr_day_stand-alone_wide_fri":"vendredi","cldr_day_stand-alone_wide_mon":"lundi","cldr_day_stand-alone_wide_sat":"samedi","cldr_day_stand-alone_wide_sun":"dimanche","cldr_day_stand-alone_wide_thu":"jeudi","cldr_day_stand-alone_wide_tue":"mardi","cldr_day_stand-alone_wide_wed":"mercredi","cldr_month_format_abbreviated_1":"janv.","cldr_month_format_abbreviated_10":"oct.","cldr_month_format_abbreviated_11":"nov.","cldr_month_format_abbreviated_12":"déc.","cldr_month_format_abbreviated_2":"févr.","cldr_month_format_abbreviated_3":"mars","cldr_month_format_abbreviated_4":"avr.","cldr_month_format_abbreviated_5":"mai","cldr_month_format_abbreviated_6":"juin","cldr_month_format_abbreviated_7":"juil.","cldr_month_format_abbreviated_8":"août","cldr_month_format_abbreviated_9":"sept.","cldr_month_format_wide_1":"janvier","cldr_month_format_wide_10":"octobre","cldr_month_format_wide_11":"novembre","cldr_month_format_wide_12":"décembre","cldr_month_format_wide_2":"février","cldr_month_format_wide_3":"mars","cldr_month_format_wide_4":"avril","cldr_month_format_wide_5":"mai","cldr_month_format_wide_6":"juin","cldr_month_format_wide_7":"juillet","cldr_month_format_wide_8":"août","cldr_month_format_wide_9":"septembre","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":",","cldr_number_group_separator":" ","cldr_number_percent_format":"#,##0 %","cldr_pm":"PM","cldr_time_format_full":"HH:mm:ss v","cldr_time_format_long":"HH:mm:ss z","cldr_time_format_medium":"HH:mm:ss","cldr_time_format_short":"HH:mm","quotationEnd":"»","quotationStart":"«"},"it":{"alternateQuotationEnd":"”","alternateQuotationStart":"“","cldr_am":"m.","cldr_date_format_full":"EEEE d MMMM yyyy","cldr_date_format_long":"dd MMMM yyyy","cldr_date_format_medium":"dd/MMM/yyyy","cldr_date_format_short":"dd/MM/yy","cldr_date_time_format_HHmm":"HH.mm","cldr_date_time_format_HHmmss":"HH.mm.ss","cldr_date_time_format_Hm":"HH.mm","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"EEE d/M","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"EEE d MMM","cldr_date_time_format_MMMMEd":"EEE d MMMM","cldr_date_time_format_MMMMd":"d MMMM","cldr_date_time_format_MMMMdd":"dd MMMM","cldr_date_time_format_MMMd":"d MMM","cldr_date_time_format_MMdd":"dd/MM","cldr_date_time_format_Md":"d/M","cldr_date_time_format_d":"d","cldr_date_time_format_hhmm":"hh.mm a","cldr_date_time_format_hhmmss":"hh.mm.ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, d-M-yyyy","cldr_date_time_format_yMMM":"MMM yyyy","cldr_date_time_format_yMMMEd":"EEE d MMM yyyy","cldr_date_time_format_yMMMM":"MMMM yyyy","cldr_date_time_format_yQ":"Q-yyyy","cldr_date_time_format_yQQQ":"QQQ yyyy","cldr_date_time_format_yyMM":"MM/yy","cldr_date_time_format_yyQ":"Q yy","cldr_date_time_format_yyQQQQ":"QQQQ yy","cldr_date_time_format_yyyyMMMM":"MMMM yyyy","cldr_day_format_abbreviated_fri":"ven","cldr_day_format_abbreviated_mon":"lun","cldr_day_format_abbreviated_sat":"sab","cldr_day_format_abbreviated_sun":"dom","cldr_day_format_abbreviated_thu":"gio","cldr_day_format_abbreviated_tue":"mar","cldr_day_format_abbreviated_wed":"mer","cldr_day_format_narrow_fri":"V","cldr_day_format_narrow_mon":"L","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"D","cldr_day_format_narrow_thu":"G","cldr_day_format_narrow_tue":"M","cldr_day_format_narrow_wed":"M","cldr_day_format_wide_fri":"Venerdì","cldr_day_format_wide_mon":"Lunedì","cldr_day_format_wide_sat":"Sabato","cldr_day_format_wide_sun":"Domenica","cldr_day_format_wide_thu":"Giovedì","cldr_day_format_wide_tue":"Martedì","cldr_day_format_wide_wed":"Mercoledì","cldr_day_stand-alone_abbreviated_fri":"ven","cldr_day_stand-alone_abbreviated_mon":"lun","cldr_day_stand-alone_abbreviated_sat":"sab","cldr_day_stand-alone_abbreviated_sun":"dom","cldr_day_stand-alone_abbreviated_thu":"gio","cldr_day_stand-alone_abbreviated_tue":"mar","cldr_day_stand-alone_abbreviated_wed":"mer","cldr_day_stand-alone_narrow_fri":"V","cldr_day_stand-alone_narrow_mon":"L","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"D","cldr_day_stand-alone_narrow_thu":"G","cldr_day_stand-alone_narrow_tue":"M","cldr_day_stand-alone_narrow_wed":"M","cldr_day_stand-alone_wide_fri":"Venerdì","cldr_day_stand-alone_wide_mon":"Lunedì","cldr_day_stand-alone_wide_sat":"Sabato","cldr_day_stand-alone_wide_sun":"Domenica","cldr_day_stand-alone_wide_thu":"Giovedì","cldr_day_stand-alone_wide_tue":"Martedì","cldr_day_stand-alone_wide_wed":"Mercoledì","cldr_month_format_abbreviated_1":"gen","cldr_month_format_abbreviated_10":"ott","cldr_month_format_abbreviated_11":"nov","cldr_month_format_abbreviated_12":"dic","cldr_month_format_abbreviated_2":"feb","cldr_month_format_abbreviated_3":"mar","cldr_month_format_abbreviated_4":"apr","cldr_month_format_abbreviated_5":"mag","cldr_month_format_abbreviated_6":"giu","cldr_month_format_abbreviated_7":"lug","cldr_month_format_abbreviated_8":"ago","cldr_month_format_abbreviated_9":"set","cldr_month_format_wide_1":"gennaio","cldr_month_format_wide_10":"ottobre","cldr_month_format_wide_11":"novembre","cldr_month_format_wide_12":"dicembre","cldr_month_format_wide_2":"febbraio","cldr_month_format_wide_3":"marzo","cldr_month_format_wide_4":"aprile","cldr_month_format_wide_5":"maggio","cldr_month_format_wide_6":"giugno","cldr_month_format_wide_7":"Luglio","cldr_month_format_wide_8":"agosto","cldr_month_format_wide_9":"settembre","cldr_month_stand-alone_narrow_1":"G","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"G","cldr_month_stand-alone_narrow_7":"L","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_month_stand-alone_wide_1":"Gennaio","cldr_month_stand-alone_wide_2":"Febbraio","cldr_month_stand-alone_wide_3":"Marzo","cldr_month_stand-alone_wide_4":"Aprile","cldr_month_stand-alone_wide_5":"Maggio","cldr_month_stand-alone_wide_6":"Giugno","cldr_month_stand-alone_wide_7":"Luglio","cldr_number_decimal_separator":",","cldr_number_group_separator":".","cldr_number_percent_format":"#,##0%","cldr_pm":"p.","cldr_time_format_full":"HH.mm.ss v","cldr_time_format_long":"HH.mm.ss z","cldr_time_format_medium":"HH.mm.ss","cldr_time_format_short":"HH.mm","quotationEnd":"’","quotationStart":"‘"},"nl":{"alternateQuotationEnd":"”","alternateQuotationStart":"“","cldr_am":"AM","cldr_date_format_full":"EEEE d MMMM yyyy","cldr_date_format_long":"d MMMM yyyy","cldr_date_format_medium":"d MMM yyyy","cldr_date_format_short":"dd-MM-yy","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, d-M","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d MMM","cldr_date_time_format_MMMMEd":"E d MMMM","cldr_date_time_format_MMMMd":"d MMMM","cldr_date_time_format_MMMd":"d-MMM","cldr_date_time_format_MMd":"d-MM","cldr_date_time_format_MMdd":"dd-MM","cldr_date_time_format_Md":"d-M","cldr_date_time_format_d":"d","cldr_date_time_format_mmss":"mm:ss","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"M-yyyy","cldr_date_time_format_yMEd":"EEE, d-M-yyyy","cldr_date_time_format_yMMM":"MMM yyyy","cldr_date_time_format_yMMMEd":"EEE, d MMM yyyy","cldr_date_time_format_yMMMM":"MMMM yyyy","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ yyyy","cldr_date_time_format_yyMM":"MM-yy","cldr_date_time_format_yyMMM":"MMM yy","cldr_date_time_format_yyQ":"Q yy","cldr_date_time_format_yyQQQQ":"QQQQ yy","cldr_date_time_format_yyyyMMMM":"MMMM yyyy","cldr_day_format_abbreviated_fri":"vr","cldr_day_format_abbreviated_mon":"ma","cldr_day_format_abbreviated_sat":"za","cldr_day_format_abbreviated_sun":"zo","cldr_day_format_abbreviated_thu":"do","cldr_day_format_abbreviated_tue":"di","cldr_day_format_abbreviated_wed":"wo","cldr_day_format_narrow_fri":"V","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"Z","cldr_day_format_narrow_sun":"Z","cldr_day_format_narrow_thu":"D","cldr_day_format_narrow_tue":"D","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"vrijdag","cldr_day_format_wide_mon":"maandag","cldr_day_format_wide_sat":"zaterdag","cldr_day_format_wide_sun":"zondag","cldr_day_format_wide_thu":"donderdag","cldr_day_format_wide_tue":"dinsdag","cldr_day_format_wide_wed":"woensdag","cldr_day_stand-alone_abbreviated_fri":"vr","cldr_day_stand-alone_abbreviated_mon":"ma","cldr_day_stand-alone_abbreviated_sat":"za","cldr_day_stand-alone_abbreviated_sun":"zo","cldr_day_stand-alone_abbreviated_thu":"do","cldr_day_stand-alone_abbreviated_tue":"di","cldr_day_stand-alone_abbreviated_wed":"wo","cldr_day_stand-alone_narrow_fri":"V","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"Z","cldr_day_stand-alone_narrow_sun":"Z","cldr_day_stand-alone_narrow_thu":"D","cldr_day_stand-alone_narrow_tue":"D","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"vrijdag","cldr_day_stand-alone_wide_mon":"maandag","cldr_day_stand-alone_wide_sat":"zaterdag","cldr_day_stand-alone_wide_sun":"zondag","cldr_day_stand-alone_wide_thu":"donderdag","cldr_day_stand-alone_wide_tue":"dinsdag","cldr_day_stand-alone_wide_wed":"woensdag","cldr_month_format_abbreviated_1":"jan","cldr_month_format_abbreviated_10":"okt","cldr_month_format_abbreviated_11":"nov","cldr_month_format_abbreviated_12":"dec","cldr_month_format_abbreviated_2":"feb","cldr_month_format_abbreviated_3":"mrt","cldr_month_format_abbreviated_4":"apr","cldr_month_format_abbreviated_5":"mei","cldr_month_format_abbreviated_6":"jun","cldr_month_format_abbreviated_7":"jul","cldr_month_format_abbreviated_8":"aug","cldr_month_format_abbreviated_9":"sep","cldr_month_format_wide_1":"januari","cldr_month_format_wide_10":"oktober","cldr_month_format_wide_11":"november","cldr_month_format_wide_12":"december","cldr_month_format_wide_2":"februari","cldr_month_format_wide_3":"maart","cldr_month_format_wide_4":"april","cldr_month_format_wide_5":"mei","cldr_month_format_wide_6":"juni","cldr_month_format_wide_7":"juli","cldr_month_format_wide_8":"augustus","cldr_month_format_wide_9":"september","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":",","cldr_number_group_separator":".","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"HH:mm:ss v","cldr_time_format_long":"HH:mm:ss z","cldr_time_format_medium":"HH:mm:ss","cldr_time_format_short":"HH:mm","quotationEnd":"’","quotationStart":"‘"},"sv":{"alternateQuotationEnd":"’","alternateQuotationStart":"’","cldr_am":"fm","cldr_date_format_full":"EEEE 'den' d MMMM yyyy","cldr_date_format_long":"d MMMM yyyy","cldr_date_format_medium":"d MMM yyyy","cldr_date_format_short":"yyyy-MM-dd","cldr_date_time_format_HHmm":"HH:mm","cldr_date_time_format_HHmmss":"HH.mm.ss","cldr_date_time_format_Hm":"H.mm","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E d/M","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d MMM","cldr_date_time_format_MMMMEEEd":"EEEE d MMMM","cldr_date_time_format_MMMMEd":"E d MMMM","cldr_date_time_format_MMMMd":"d MMMM","cldr_date_time_format_MMMd":"d MMM","cldr_date_time_format_MMd":"d/M","cldr_date_time_format_MMdd":"d/M","cldr_date_time_format_Md":"d/M","cldr_date_time_format_d":"d","cldr_date_time_format_hhmm":"hh.mm","cldr_date_time_format_hhmmss":"HH:mm:ss","cldr_date_time_format_mmss":"mm.ss","cldr_date_time_format_ms":"mm.ss","cldr_date_time_format_y":"yyyy","cldr_date_time_format_yM":"yyyy-MM","cldr_date_time_format_yMEd":"EEE, yyyy-MM-dd","cldr_date_time_format_yMMM":"yyyy MMM","cldr_date_time_format_yMMMEd":"EEE d MMM yyyy","cldr_date_time_format_yMMMM":"yyyy MMMM","cldr_date_time_format_yQ":"yyyy Q","cldr_date_time_format_yQQQ":"yyyy QQQ","cldr_date_time_format_yyMM":"yy-MM","cldr_date_time_format_yyMMM":"MMM -yy","cldr_date_time_format_yyQ":"Q yy","cldr_date_time_format_yyyyMM":"yyyy-MM","cldr_date_time_format_yyyyMMM":"MMM yyyy","cldr_date_time_format_yyyyQQQQ":"QQQQ yyyy","cldr_day_format_abbreviated_fri":"fre","cldr_day_format_abbreviated_mon":"mån","cldr_day_format_abbreviated_sat":"lör","cldr_day_format_abbreviated_sun":"sön","cldr_day_format_abbreviated_thu":"tors","cldr_day_format_abbreviated_tue":"tis","cldr_day_format_abbreviated_wed":"ons","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"L","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"O","cldr_day_format_wide_fri":"fredag","cldr_day_format_wide_mon":"måndag","cldr_day_format_wide_sat":"lördag","cldr_day_format_wide_sun":"söndag","cldr_day_format_wide_thu":"torsdag","cldr_day_format_wide_tue":"tisdag","cldr_day_format_wide_wed":"onsdag","cldr_day_stand-alone_abbreviated_fri":"fre","cldr_day_stand-alone_abbreviated_mon":"mån","cldr_day_stand-alone_abbreviated_sat":"lör","cldr_day_stand-alone_abbreviated_sun":"sön","cldr_day_stand-alone_abbreviated_thu":"tors","cldr_day_stand-alone_abbreviated_tue":"tis","cldr_day_stand-alone_abbreviated_wed":"ons","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"L","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"O","cldr_day_stand-alone_wide_fri":"fredag","cldr_day_stand-alone_wide_mon":"måndag","cldr_day_stand-alone_wide_sat":"lördag","cldr_day_stand-alone_wide_sun":"söndag","cldr_day_stand-alone_wide_thu":"torsdag","cldr_day_stand-alone_wide_tue":"tisdag","cldr_day_stand-alone_wide_wed":"onsdag","cldr_month_format_abbreviated_1":"jan","cldr_month_format_abbreviated_10":"okt","cldr_month_format_abbreviated_11":"nov","cldr_month_format_abbreviated_12":"dec","cldr_month_format_abbreviated_2":"feb","cldr_month_format_abbreviated_3":"mar","cldr_month_format_abbreviated_4":"apr","cldr_month_format_abbreviated_5":"maj","cldr_month_format_abbreviated_6":"jun","cldr_month_format_abbreviated_7":"jul","cldr_month_format_abbreviated_8":"aug","cldr_month_format_abbreviated_9":"sep","cldr_month_format_wide_1":"januari","cldr_month_format_wide_10":"oktober","cldr_month_format_wide_11":"november","cldr_month_format_wide_12":"december","cldr_month_format_wide_2":"februari","cldr_month_format_wide_3":"mars","cldr_month_format_wide_4":"april","cldr_month_format_wide_5":"maj","cldr_month_format_wide_6":"juni","cldr_month_format_wide_7":"juli","cldr_month_format_wide_8":"augusti","cldr_month_format_wide_9":"september","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":",","cldr_number_group_separator":" ","cldr_number_percent_format":"#,##0 %","cldr_pm":"em","cldr_time_format_full":"'kl'. HH.mm.ss v","cldr_time_format_long":"HH.mm.ss z","cldr_time_format_medium":"HH.mm.ss","cldr_time_format_short":"HH.mm","quotationEnd":"”","quotationStart":"”"}};
qx.$$i18n    = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"addfeed":[0,1,2],"boot":[0],"settings":[0,1]},
  uris : [["feedreader:feedreader.js"],["feedreader:feedreader-0.js"],["feedreader:feedreader-1.js"]],
  boot : "boot",
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var prefix = libs[uri[0]].sourceUri;
      var euri = prefix + "/" + uri[1];
      
      uris.push(euri);
    }
    return uris;
  }
};  
})();

qx.$$packageData['hash']={};
(function(){var p=".",o="()",n="[Class ",m=".prototype",l="toString",k="qx.Bootstrap",j="]",h="Class";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return n+this.classname+j;
},createNamespace:function(name,a){var c=name.split(p);
var parent=window;
var b=c[0];

for(var i=0,d=c.length-1;i<d;i++,b=c[i]){if(!parent[b]){parent=parent[b]={};
}else{parent=parent[b];
}}parent[b]=a;
return b;
},setDisplayName:function(q,r,name){q.displayName=r+p+name+o;
},setDisplayNames:function(e,f){for(var name in e){var g=e[name];

if(g instanceof Function){g.displayName=f+p+name+o;
}}},define:function(name,s){if(!s){var s={statics:{}};
}var x;
var v=null;
qx.Bootstrap.setDisplayNames(s.statics,name);

if(s.members){qx.Bootstrap.setDisplayNames(s.members,name+m);
x=s.construct||new Function;
var t=s.statics;

for(var u in t){x[u]=t[u];
}v=x.prototype;
var y=s.members;

for(var u in y){v[u]=y[u];
}}else{x=s.statics||{};
}var w=this.createNamespace(name,x);
x.name=x.classname=name;
x.basename=w;
x.$$type=h;
if(!x.hasOwnProperty(l)){x.toString=this.genericToString;
}if(s.defer){s.defer(x,v);
}qx.Bootstrap.$$registry[name]=s.statics;
}};
qx.Bootstrap.define(k,{statics:{LOADSTART:new Date,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return this.$$registry[name];
},$$registry:{}}});
})();
(function(){var k="qx.allowUrlSettings",j="&",h="qx.core.Setting",g="qx.allowUrlVariants",f="qxsetting",e=":",d=".";
qx.Bootstrap.define(h,{statics:{__a:{},define:function(a,b){if(b===undefined){throw new Error('Default value of setting "'+a+'" must be defined!');
}
if(!this.__a[a]){this.__a[a]={};
}else if(this.__a[a].defaultValue!==undefined){throw new Error('Setting "'+a+'" is already defined!');
}this.__a[a].defaultValue=b;
},get:function(l){var m=this.__a[l];

if(m===undefined){throw new Error('Setting "'+l+'" is not defined.');
}
if(m.value!==undefined){return m.value;
}return m.defaultValue;
},set:function(n,o){if((n.split(d)).length<2){throw new Error('Malformed settings key "'+n+'". Must be following the schema "namespace.key".');
}
if(!this.__a[n]){this.__a[n]={};
}this.__a[n].value=o;
},__b:function(){if(window.qxsettings){for(var c in qxsettings){this.set(c,qxsettings[c]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(s){}this.__c();
}},__c:function(){if(this.get(k)!=true){return;
}var r=document.location.search.slice(1).split(j);

for(var i=0;i<r.length;i++){var q=r[i].split(e);

if(q.length!=3||q[0]!=f){continue;
}this.set(q[1],decodeURIComponent(q[2]));
}}},defer:function(p){p.define(k,false);
p.define(g,false);
p.__b();
}});
})();
(function(){var s="gecko",r="1.9.0.0",q=".",p="[object Opera]",o="function",n="[^\\.0-9]",m="525.26",l="",k="mshtml",j="AppleWebKit/",d="unknown",i="9.6.0",g="4.0",c="Gecko",b="opera",f="webkit",e="0.0.0",h="8.0",a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__d:function(){var t=d;
var x=e;
var w=navigator.userAgent;
var z=false;
var v=false;

if(window.opera&&Object.prototype.toString.call(window.opera)==p){t=b;
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(w)){x=RegExp.$1+q+RegExp.$2;

if(RegExp.$3!=l){x+=q+RegExp.$3;
}}else{v=true;
x=i;
}}else if(navigator.userAgent.indexOf(j)!=-1){t=f;
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(w)){x=RegExp.$1;
var y=RegExp(n).exec(x);

if(y){x=x.slice(0,y.index);
}}else{v=true;
x=m;
}}else if(window.controllers&&navigator.product===c){t=s;
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(w)){x=RegExp.$1;
}else{v=true;
x=r;
}}else if(navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(w)){t=k;
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
alert("Unsupported client: "+w+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=z;
this.UNKNOWN_VERSION=v;
this.NAME=t;
this.FULLVERSION=x;
this.VERSION=parseFloat(x);
}},defer:function(A){A.__d();
}});
})();
(function(){var A="on",z="off",y="|",x="default",w="object",u="&",t="qx.aspects",s="$",r="qx.allowUrlVariants",q="qx.debug",j="qx.client",p="qx.dynlocale",n="webkit",h="qxvariant",g="opera",m=":",k="qx.core.Variant",o="mshtml",f="gecko";
qx.Bootstrap.define(k,{statics:{__e:{},__f:{},compilerIsSet:function(){return true;
},define:function(B,C,D){{};

if(!this.__e[B]){this.__e[B]={};
}else{}this.__e[B].allowedValues=C;
this.__e[B].defaultValue=D;
},get:function(P){var Q=this.__e[P];
{};

if(Q.value!==undefined){return Q.value;
}return Q.defaultValue;
},__g:function(){if(window.qxvariants){for(var L in qxvariants){{};

if(!this.__e[L]){this.__e[L]={};
}this.__e[L].value=qxvariants[L];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(a){}this.__h(this.__e);
}},__h:function(){if(qx.core.Setting.get(r)!=true){return;
}var M=document.location.search.slice(1).split(u);

for(var i=0;i<M.length;i++){var N=M[i].split(m);

if(N.length!=3||N[0]!=h){continue;
}var O=N[1];

if(!this.__e[O]){this.__e[O]={};
}this.__e[O].value=decodeURIComponent(N[2]);
}},select:function(c,d){{};

for(var e in d){if(this.isSet(c,e)){return d[e];
}}
if(d[x]!==undefined){return d[x];
}{};
},isSet:function(G,H){var I=G+s+H;

if(this.__f[I]!==undefined){return this.__f[I];
}var K=false;
if(H.indexOf(y)<0){K=this.get(G)===H;
}else{var J=H.split(y);

for(var i=0,l=J.length;i<l;i++){if(this.get(G)===J[i]){K=true;
break;
}}}this.__f[I]=K;
return K;
},__i:function(v){return typeof v===w&&v!==null&&v instanceof Array;
},__j:function(v){return typeof v===w&&v!==null&&!(v instanceof Array);
},__k:function(E,F){for(var i=0,l=E.length;i<l;i++){if(E[i]==F){return true;
}}return false;
}},defer:function(b){b.define(j,[f,o,g,n],qx.bom.client.Engine.NAME);
b.define(q,[A,z],A);
b.define(t,[A,z],z);
b.define(p,[A,z],A);
b.__g();
}});
})();
(function(){var x="qx.client",w='"',v="valueOf",u="toLocaleString",t="isPrototypeOf",s="",r="toString",q="qx.lang.Object",p='\", "',o="hasOwnProperty";
qx.Bootstrap.define(q,{statics:{empty:function(m){{};

for(var n in m){if(m.hasOwnProperty(n)){delete m[n];
}}},isEmpty:qx.core.Variant.select(x,{"gecko":function(S){{};
return S.__count__===0;
},"default":function(f){{};

for(var g in f){return false;
}return true;
}}),hasMinLength:qx.core.Variant.select(x,{"gecko":function(J,K){{};
return J.__count__>=K;
},"default":function(y,z){{};

if(z<=0){return true;
}var length=0;

for(var A in y){if((++length)>=z){return true;
}}return false;
}}),getLength:qx.core.Variant.select(x,{"gecko":function(Y){{};
return Y.__count__;
},"default":function(ba){{};
var length=0;

for(var bb in ba){length++;
}return length;
}}),_shadowedKeys:[t,o,u,r,v],getKeys:qx.core.Variant.select(x,{"mshtml":function(b){var c=[];

for(var e in b){c.push(e);
}var d=Object.prototype.hasOwnProperty;

for(var i=0,a=this._shadowedKeys,l=a.length;i<l;i++){if(d.call(b,a[i])){c.push(a[i]);
}}return c;
},"default":function(be){var bf=[];

for(var bg in be){bf.push(bg);
}return bf;
}}),getKeysAsString:function(W){{};
var X=qx.lang.Object.getKeys(W);

if(X.length==0){return s;
}return w+X.join(p)+w;
},getValues:function(L){{};
var N=[];
var M=this.getKeys(L);

for(var i=0,l=M.length;i<l;i++){N.push(L[M[i]]);
}return N;
},mergeWith:function(O,P,Q){{};

if(Q===undefined){Q=true;
}
for(var R in P){if(Q||O[R]===undefined){O[R]=P[R];
}}return O;
},carefullyMergeWith:function(E,F){{};
return qx.lang.Object.mergeWith(E,F,false);
},merge:function(T,U){{};
var V=arguments.length;

for(var i=1;i<V;i++){qx.lang.Object.mergeWith(T,arguments[i]);
}return T;
},clone:function(h){{};
var j={};

for(var k in h){j[k]=h[k];
}return j;
},invert:function(G){{};
var H={};

for(var I in G){H[G[I].toString()]=I;
}return H;
},getKeyFromValue:function(B,C){{};

for(var D in B){if(B.hasOwnProperty(D)&&B[D]===C){return D;
}}return null;
},contains:function(bc,bd){{};
return this.getKeyFromValue(bc,bd)!==null;
},select:function(bh,bi){{};
return bi[bh];
},fromArray:function(bj){{};
var bk={};

for(var i=0,l=bj.length;i<l;i++){{};
bk[bj[i].toString()]=true;
}return bk;
}}});
})();
(function(){var o="Function",n="Boolean",m="Error",l="Number",k="Array",j="Date",i="RegExp",h="String",g="Object",f="qx.lang.Type",e="string";
qx.Bootstrap.define(f,{statics:{__l:{"[object String]":h,"[object Array]":k,"[object Object]":g,"[object RegExp]":i,"[object Number]":l,"[object Boolean]":n,"[object Date]":j,"[object Function]":o,"[object Error]":m},getClass:function(s){var t=Object.prototype.toString.call(s);
return (this.__l[t]||t.slice(8,-1));
},isString:function(q){return (q!==null&&(typeof q===e||this.getClass(q)==h||q instanceof String||(!!q&&!!q.$$isString)));
},isArray:function(a){return (a!==null&&(a instanceof Array||(a&&qx.Class.hasInterface(a.constructor,qx.data.IListData))||this.getClass(a)==k||(!!a&&!!a.$$isArray)));
},isObject:function(c){return (c!==undefined&&c!==null&&this.getClass(c)==g);
},isRegExp:function(b){return this.getClass(b)==i;
},isNumber:function(r){return (r!==null&&(this.getClass(r)==l||r instanceof Number));
},isBoolean:function(v){return (v!==null&&(this.getClass(v)==n||v instanceof Boolean));
},isDate:function(u){return (u!==null&&(this.getClass(u)==j||u instanceof Date));
},isError:function(p){return (p!==null&&(this.getClass(p)==m||p instanceof Error));
},isFunction:function(d){return this.getClass(d)==o;
}}});
})();
(function(){var m="qx.core.Aspect",l="before",k="*",j="static";
qx.Bootstrap.define(m,{statics:{__m:[],wrap:function(a,b,c){var h=[];
var d=[];
var g=this.__m;
var f;

for(var i=0;i<g.length;i++){f=g[i];

if((f.type==null||c==f.type||f.type==k)&&(f.name==null||a.match(f.name))){f.pos==-1?h.push(f.fcn):d.push(f.fcn);
}}
if(h.length===0&&d.length===0){return b;
}var e=function(){for(var i=0;i<h.length;i++){h[i].call(this,a,b,c,arguments);
}var q=b.apply(this,arguments);

for(var i=0;i<d.length;i++){d[i].call(this,a,b,c,arguments,q);
}return q;
};

if(c!==j){e.self=b.self;
e.base=b.base;
}b.wrapper=e;
e.original=b;
return e;
},addAdvice:function(n,o,p,name){this.__m.push({fcn:n,pos:o===l?-1:1,type:p,name:name});
}}});
})();
(function(){var u="qx.aspects",t="on",s=".",r="static",q="[Class ",p="]",o="toString",n="constructor",m="member",k="$$init_",d=".prototype",j="destructor",g="extend",c="destruct",b="Class",f="off",e="qx.Class",h="qx.event.type.Data";
qx.Bootstrap.define(e,{statics:{define:function(name,bR){if(!bR){var bR={};
}if(bR.include&&!(bR.include instanceof Array)){bR.include=[bR.include];
}if(bR.implement&&!(bR.implement instanceof Array)){bR.implement=[bR.implement];
}if(!bR.hasOwnProperty(g)&&!bR.type){bR.type=r;
}{};
var bT=this.__r(name,bR.type,bR.extend,bR.statics,bR.construct,bR.destruct);
if(bR.extend){if(bR.properties){this.__t(bT,bR.properties,true);
}if(bR.members){this.__v(bT,bR.members,true,true,false);
}if(bR.events){this.__s(bT,bR.events,true);
}if(bR.include){for(var i=0,l=bR.include.length;i<l;i++){this.__y(bT,bR.include[i],false);
}}}if(bR.settings){for(var bS in bR.settings){qx.core.Setting.define(bS,bR.settings[bS]);
}}if(bR.variants){for(var bS in bR.variants){qx.core.Variant.define(bS,bR.variants[bS].allowedValues,bR.variants[bS].defaultValue);
}}if(bR.implement){for(var i=0,l=bR.implement.length;i<l;i++){this.__x(bT,bR.implement[i]);
}}{};
if(bR.defer){bR.defer.self=bT;
bR.defer(bT,bT.prototype,{add:function(name,I){var J={};
J[name]=I;
qx.Class.__t(bT,J,true);
}});
}},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},getByName:function(name){return this.$$registry[name];
},include:function(by,bz){{};
qx.Class.__y(by,bz,false);
},patch:function(bb,bc){{};
qx.Class.__y(bb,bc,true);
},isSubClassOf:function(cb,cc){if(!cb){return false;
}
if(cb==cc){return true;
}
if(cb.prototype instanceof cc){return true;
}return false;
},getPropertyDefinition:function(ce,name){while(ce){if(ce.$$properties&&ce.$$properties[name]){return ce.$$properties[name];
}ce=ce.superclass;
}return null;
},getProperties:function(z){var A=[];

while(z){if(z.$$properties){A.push.apply(A,qx.lang.Object.getKeys(z.$$properties));
}z=z.superclass;
}return A;
},getByProperty:function(bA,name){while(bA){if(bA.$$properties&&bA.$$properties[name]){return bA;
}bA=bA.superclass;
}return null;
},hasProperty:function(bB,name){return !!this.getPropertyDefinition(bB,name);
},getEventType:function(bQ,name){var bQ=bQ.constructor;

while(bQ.superclass){if(bQ.$$events&&bQ.$$events[name]!==undefined){return bQ.$$events[name];
}bQ=bQ.superclass;
}return null;
},supportsEvent:function(cd,name){return !!this.getEventType(cd,name);
},hasOwnMixin:function(W,X){return W.$$includes&&W.$$includes.indexOf(X)!==-1;
},getByMixin:function(bd,be){var bf,i,l;

while(bd){if(bd.$$includes){bf=bd.$$flatIncludes;

for(i=0,l=bf.length;i<l;i++){if(bf[i]===be){return bd;
}}}bd=bd.superclass;
}return null;
},getMixins:function(bo){var bp=[];

while(bo){if(bo.$$includes){bp.push.apply(bp,bo.$$flatIncludes);
}bo=bo.superclass;
}return bp;
},hasMixin:function(Y,ba){return !!this.getByMixin(Y,ba);
},hasOwnInterface:function(v,w){return v.$$implements&&v.$$implements.indexOf(w)!==-1;
},getByInterface:function(cg,ch){var ci,i,l;

while(cg){if(cg.$$implements){ci=cg.$$flatImplements;

for(i=0,l=ci.length;i<l;i++){if(ci[i]===ch){return cg;
}}}cg=cg.superclass;
}return null;
},getInterfaces:function(bY){var ca=[];

while(bY){if(bY.$$implements){ca.push.apply(ca,bY.$$flatImplements);
}bY=bY.superclass;
}return ca;
},hasInterface:function(x,y){return !!this.getByInterface(x,y);
},implementsInterface:function(C,D){var E=C.constructor;

if(this.hasInterface(E,D)){return true;
}
try{qx.Interface.assertObject(C,D);
return true;
}catch(bg){}
try{qx.Interface.assert(E,D,false);
return true;
}catch(cf){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return q+this.classname+p;
},$$registry:qx.Bootstrap.$$registry,__n:null,__o:null,__p:function(){},__q:function(){},__r:function(name,bE,bF,bG,bH,bI){var bN;

if(!bF&&qx.core.Variant.isSet(u,f)){bN=bG||{};
qx.Bootstrap.setDisplayNames(bN,name);
}else{bN={};

if(bF){if(!bH){bH=this.__z();
}bN=this.__B(bH,name,bE);
qx.Bootstrap.setDisplayName(bH,name,n);
}if(bG){qx.Bootstrap.setDisplayNames(bG,name);
var bO;

for(var i=0,a=qx.lang.Object.getKeys(bG),l=a.length;i<l;i++){bO=a[i];
var bK=bG[bO];

if(qx.core.Variant.isSet(u,t)){if(bK instanceof Function){bK=qx.core.Aspect.wrap(name+s+bO,bK,r);
}bN[bO]=bK;
}else{bN[bO]=bK;
}}}}var bM=qx.Bootstrap.createNamespace(name,bN,false);
bN.name=bN.classname=name;
bN.basename=bM;
bN.$$type=b;

if(bE){bN.$$classtype=bE;
}if(!bN.hasOwnProperty(o)){bN.toString=this.genericToString;
}
if(bF){var bP=bF.prototype;
var bJ=this.__A();
bJ.prototype=bP;
var bL=new bJ;
bN.prototype=bL;
bL.name=bL.classname=name;
bL.basename=bM;
bH.base=bN.superclass=bF;
bH.self=bN.constructor=bL.constructor=bN;
if(bI){if(qx.core.Variant.isSet(u,t)){bI=qx.core.Aspect.wrap(name,bI,j);
}bN.$$destructor=bI;
qx.Bootstrap.setDisplayName(bI,name,c);
}}this.$$registry[name]=bN;
return bN;
},__s:function(bU,bV,bW){var bX,bX;
{};

if(bU.$$events){for(var bX in bV){bU.$$events[bX]=bV[bX];
}}else{bU.$$events=bV;
}},__t:function(bh,bi,bj){var bl;

if(bj===undefined){bj=false;
}var bk=!!bh.$$propertiesAttached;

for(var name in bi){bl=bi[name];
{};
bl.name=name;
if(!bl.refine){if(bh.$$properties===undefined){bh.$$properties={};
}bh.$$properties[name]=bl;
}if(bl.init!==undefined){bh.prototype[k+name]=bl.init;
}if(bl.event!==undefined){var event={};
event[bl.event]=h;
this.__s(bh,event,bj);
}if(bl.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(bk){qx.core.Property.attachMethods(bh,name,bl);
}}},__u:null,__v:function(bq,br,bs,bt,bu){var bv=bq.prototype;
var bx,bw;
qx.Bootstrap.setDisplayNames(br,bq.classname+d);

for(var i=0,a=qx.lang.Object.getKeys(br),l=a.length;i<l;i++){bx=a[i];
bw=br[bx];
{};
if(bt!==false&&bw instanceof Function&&bw.$$type==null){if(bu==true){bw=this.__w(bw,bv[bx]);
}else{if(bv[bx]){bw.base=bv[bx];
}bw.self=bq;
}
if(qx.core.Variant.isSet(u,t)){bw=qx.core.Aspect.wrap(bq.classname+s+bx,bw,m);
}}bv[bx]=bw;
}},__w:function(bC,bD){if(bD){return function(){var bn=bC.base;
bC.base=bD;
var bm=bC.apply(this,arguments);
bC.base=bn;
return bm;
};
}else{return bC;
}},__x:function(P,Q){{};
var R=qx.Interface.flatten([Q]);

if(P.$$implements){P.$$implements.push(Q);
P.$$flatImplements.push.apply(P.$$flatImplements,R);
}else{P.$$implements=[Q];
P.$$flatImplements=R;
}},__y:function(K,L,M){{};

if(this.hasMixin(K,L)){qx.log.Logger.warn('Mixin "'+L.name+'" is already included into Class "'+K.classname+'" by class: '+this.getByMixin(K,L).classname+'!');
return;
}var O=qx.Mixin.flatten([L]);
var N;

for(var i=0,l=O.length;i<l;i++){N=O[i];
if(N.$$events){this.__s(K,N.$$events,M);
}if(N.$$properties){this.__t(K,N.$$properties,M);
}if(N.$$members){this.__v(K,N.$$members,M,M,M);
}}if(K.$$includes){K.$$includes.push(L);
K.$$flatIncludes.push.apply(K.$$flatIncludes,O);
}else{K.$$includes=[L];
K.$$flatIncludes=O;
}},__z:function(){function B(){arguments.callee.base.apply(this,arguments);
}return B;
},__A:function(){return function(){};
},__B:function(S,name,T){var V=function(){var cl=arguments.callee.constructor;
{};
if(!cl.$$propertiesAttached){qx.core.Property.attach(cl);
}var ck=cl.$$original.apply(this,arguments);
if(cl.$$includes){var cj=cl.$$flatIncludes;

for(var i=0,l=cj.length;i<l;i++){if(cj[i].$$constructor){cj[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return ck;
};

if(qx.core.Variant.isSet("qx.aspects","on")){var U=qx.core.Aspect.wrap(name,V,"constructor");
V.$$original=S;
V.constructor=U;
V=U;
}if(T==="singleton"){V.getInstance=this.getInstance;
}V.$$original=S;
S.wrapper=V;
return V;
}},defer:function(F){if(qx.core.Variant.isSet(u,t)){for(var G in qx.Bootstrap.$$registry){var F=qx.Bootstrap.$$registry[G];

for(var H in F){if(F[H] instanceof Function){F[H]=qx.core.Aspect.wrap(G+s+H,F[H],r);
}}}}}});
})();
(function(){var bM=';',bL='computed=this.',bK='=value;',bJ='this.',bI='if(this.',bH='!==undefined)',bG='delete this.',bF="set",bE="setThemed",bD='}',bs="init",br="setRuntime",bq='else if(this.',bp='return this.',bo="string",bn="boolean",bm="resetThemed",bl='!==undefined){',bk='=true;',bj="resetRuntime",bT="reset",bU="refresh",bR='old=this.',bS='else ',bP='if(old===undefined)old=this.',bQ='old=computed=this.',bN=' of an instance of ',bO=";",bV='if(old===computed)return value;',bW='if(old===undefined)old=null;',bw='(value);',bv=' is not (yet) ready!");',by='===value)return value;',bx='return init;',bA='var init=this.',bz="Error in property ",bC='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',bB='.validate.call(this, value);',bu='else{',bt=" in method ",v='=computed;',w='(backup);',x='if(computed===inherit){',y="inherit",z='if(value===undefined)prop.error(this,2,"',A='var computed, old=this.',B='else if(computed===undefined)',C="': ",D=" of class ",E='===undefined)return;',cb="')){",ca='else this.',bY='value=this.',bX='","',cf='if(init==qx.core.Property.$$inherit)init=null;',ce='var inherit=prop.$$inherit;',cd='var computed, old;',cc='computed=undefined;delete this.',ch='",value);',cg='computed=value;',T=';}',U='){',R='if(computed===undefined||computed===inherit){',S='!==inherit){',X='(computed, old, "',Y='return value;',V='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',W="if(reg.hasListener(this, '",P=')a[i].',Q='.$$properties.',M="var reg=qx.event.Registration;",L='return null;',O='");',N='var pa=this.getLayoutParent();if(pa)computed=pa.',I='!==undefined&&',H="', qx.event.type.Data, [computed, old]",K='var backup=computed;',J='}else{',G="object",F='if(computed===undefined)computed=null;',be='if(a[i].',bf='throw new Error("Property ',bg=")}",bh='var prop=qx.core.Property;',ba=" with incoming value '",bb='if(computed===undefined||computed==inherit)computed=null;',bc='if((computed===undefined||computed===inherit)&&',bd="reg.fireEvent(this, '",bi="qx.core.Property";
qx.Class.define(bi,{statics:{__K:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__L:{"Object":true,"Array":true,"Map":true,"Function":true,"Date":true,"Node":true,"Element":true,"Document":true,"Window":true,"Event":true,"Class":true,"Mixin":true,"Interface":true,"Theme":true,"Font":true,"Decorator":true},$$inherit:y,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bo,dispose:bn,inheritable:bn,nullable:bn,themeable:bn,refine:bn,init:null,apply:bo,event:bo,check:null,transform:bo,deferredInit:bn,validate:null},$$allowedGroupKeys:{name:bo,group:G,mode:bo,themeable:bn},$$inheritable:{},refresh:function(d){var parent=d.getLayoutParent();

if(parent){var g=d.constructor;
var j=this.$$store.inherit;
var h=this.$$store.init;
var f=this.$$method.refresh;
var k;
var e;
{};

while(g){k=g.$$properties;

if(k){for(var name in this.$$inheritable){if(k[name]&&d[f[name]]){e=parent[j[name]];

if(e===undefined){e=parent[h[name]];
}{};
d[f[name]](e);
}}}g=g.superclass;
}}},attach:function(m){var n=m.$$properties;

if(n){for(var name in n){this.attachMethods(m,name,n[name]);
}}m.$$propertiesAttached=true;
},attachMethods:function(b,name,c){c.group?this.__M(b,c,name):this.__N(b,c,name);
},__M:function(cj,ck,name){var cr=qx.lang.String.firstUp(name);
var cq=cj.prototype;
var cs=ck.themeable===true;
{};
var ct=[];
var cn=[];

if(cs){var cl=[];
var cp=[];
}var co="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
ct.push(co);

if(cs){cl.push(co);
}
if(ck.mode=="shorthand"){var cm="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
ct.push(cm);

if(cs){cl.push(cm);
}}
for(var i=0,a=ck.group,l=a.length;i<l;i++){{};
ct.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
cn.push("this.",this.$$method.reset[a[i]],"();");

if(cs){{};
cl.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
cp.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+cr;
cq[this.$$method.set[name]]=new Function(ct.join(""));
this.$$method.reset[name]="reset"+cr;
cq[this.$$method.reset[name]]=new Function(cn.join(""));

if(cs){this.$$method.setThemed[name]="setThemed"+cr;
cq[this.$$method.setThemed[name]]=new Function(cl.join(""));
this.$$method.resetThemed[name]="resetThemed"+cr;
cq[this.$$method.resetThemed[name]]=new Function(cp.join(""));
}},__N:function(p,q,name){var s=qx.lang.String.firstUp(name);
var u=p.prototype;
{};
if(q.dispose===undefined&&typeof q.check==="string"){q.dispose=this.__L[q.check]||qx.Class.isDefined(q.check)||qx.Interface.isDefined(q.check);
}var t=this.$$method;
var r=this.$$store;
r.runtime[name]="$$runtime_"+name;
r.user[name]="$$user_"+name;
r.theme[name]="$$theme_"+name;
r.init[name]="$$init_"+name;
r.inherit[name]="$$inherit_"+name;
r.useinit[name]="$$useinit_"+name;
t.get[name]="get"+s;
u[t.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,p,name,"get");
};
t.set[name]="set"+s;
u[t.set[name]]=function(cI){return qx.core.Property.executeOptimizedSetter(this,p,name,"set",arguments);
};
t.reset[name]="reset"+s;
u[t.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,p,name,"reset");
};

if(q.inheritable||q.apply||q.event||q.deferredInit){t.init[name]="init"+s;
u[t.init[name]]=function(cJ){return qx.core.Property.executeOptimizedSetter(this,p,name,"init",arguments);
};
}
if(q.inheritable){t.refresh[name]="refresh"+s;
u[t.refresh[name]]=function(cK){return qx.core.Property.executeOptimizedSetter(this,p,name,"refresh",arguments);
};
}t.setRuntime[name]="setRuntime"+s;
u[t.setRuntime[name]]=function(ci){return qx.core.Property.executeOptimizedSetter(this,p,name,"setRuntime",arguments);
};
t.resetRuntime[name]="resetRuntime"+s;
u[t.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,p,name,"resetRuntime");
};

if(q.themeable){t.setThemed[name]="setThemed"+s;
u[t.setThemed[name]]=function(o){return qx.core.Property.executeOptimizedSetter(this,p,name,"setThemed",arguments);
};
t.resetThemed[name]="resetThemed"+s;
u[t.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,p,name,"resetThemed");
};
}
if(q.check==="Boolean"){u["toggle"+s]=new Function("return this."+t.set[name]+"(!this."+t.get[name]+"())");
u["is"+s]=new Function("return this."+t.get[name]+"()");
}},__O:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(cu,cv,cw,cx,cy){var cz=cu.constructor.classname;
var cA=bz+cw+D+cz+bt+this.$$method[cx][cw]+ba+cy+C;
throw new Error(cA+(this.__O[cv]||"Unknown reason: "+cv));
},__P:function(cL,cM,name,cN,cO,cP){var cQ=this.$$method[cN][name];
{cM[cQ]=new Function("value",cO.join(""));
};
if(qx.core.Variant.isSet("qx.aspects","on")){cM[cQ]=qx.core.Aspect.wrap(cL.classname+"."+cQ,cM[cQ],"property");
}qx.Bootstrap.setDisplayName(cM[cQ],cL.classname+".prototype",cQ);
if(cP===undefined){return cL[cQ]();
}else{return cL[cQ](cP[0]);
}},executeOptimizedGetter:function(cB,cC,name,cD){var cF=cC.$$properties[name];
var cH=cC.prototype;
var cE=[];
var cG=this.$$store;
cE.push(bI,cG.runtime[name],bH);
cE.push(bp,cG.runtime[name],bM);

if(cF.inheritable){cE.push(bq,cG.inherit[name],bH);
cE.push(bp,cG.inherit[name],bM);
cE.push(bS);
}cE.push(bI,cG.user[name],bH);
cE.push(bp,cG.user[name],bM);

if(cF.themeable){cE.push(bq,cG.theme[name],bH);
cE.push(bp,cG.theme[name],bM);
}
if(cF.deferredInit&&cF.init===undefined){cE.push(bq,cG.init[name],bH);
cE.push(bp,cG.init[name],bM);
}cE.push(bS);

if(cF.init!==undefined){if(cF.inheritable){cE.push(bA,cG.init[name],bM);

if(cF.nullable){cE.push(cf);
}else if(cF.init!==undefined){cE.push(bp,cG.init[name],bM);
}else{cE.push(V,name,bN,cC.classname,bv);
}cE.push(bx);
}else{cE.push(bp,cG.init[name],bM);
}}else if(cF.inheritable||cF.nullable){cE.push(L);
}else{cE.push(bf,name,bN,cC.classname,bv);
}return this.__P(cB,cH,name,cD,cE);
},executeOptimizedSetter:function(cR,cS,name,cT,cU){var db=cS.$$properties[name];
var da=cS.prototype;
var cW=[];
var cV=cT===bF||cT===bE||cT===br||(cT===bs&&db.init===undefined);
var cX=cT===bT||cT===bm||cT===bj;
var cY=db.apply||db.event||db.inheritable;

if(cT===br||cT===bj){var dc=this.$$store.runtime[name];
}else if(cT===bE||cT===bm){var dc=this.$$store.theme[name];
}else if(cT===bs){var dc=this.$$store.init[name];
}else{var dc=this.$$store.user[name];
}{if(!db.nullable||db.check||db.inheritable){cW.push(bh);
}if(cT===bF){cW.push(z,name,bX,cT,ch);
}};
if(cV){if(db.transform){cW.push(bY,db.transform,bw);
}if(db.validate){if(typeof db.validate===bo){cW.push(bJ,db.validate,bw);
}else if(db.validate instanceof Function){cW.push(cS.classname,Q,name);
cW.push(bB);
}}}if(cY){if(cV){cW.push(bI,dc,by);
}else if(cX){cW.push(bI,dc,E);
}}if(db.inheritable){cW.push(ce);
}{};

if(!cY){if(cT===br){cW.push(bJ,this.$$store.runtime[name],bK);
}else if(cT===bj){cW.push(bI,this.$$store.runtime[name],bH);
cW.push(bG,this.$$store.runtime[name],bM);
}else if(cT===bF){cW.push(bJ,this.$$store.user[name],bK);
}else if(cT===bT){cW.push(bI,this.$$store.user[name],bH);
cW.push(bG,this.$$store.user[name],bM);
}else if(cT===bE){cW.push(bJ,this.$$store.theme[name],bK);
}else if(cT===bm){cW.push(bI,this.$$store.theme[name],bH);
cW.push(bG,this.$$store.theme[name],bM);
}else if(cT===bs&&cV){cW.push(bJ,this.$$store.init[name],bK);
}}else{if(db.inheritable){cW.push(A,this.$$store.inherit[name],bM);
}else{cW.push(cd);
}cW.push(bI,this.$$store.runtime[name],bl);

if(cT===br){cW.push(bL,this.$$store.runtime[name],bK);
}else if(cT===bj){cW.push(bG,this.$$store.runtime[name],bM);
cW.push(bI,this.$$store.user[name],bH);
cW.push(bL,this.$$store.user[name],bM);
cW.push(bq,this.$$store.theme[name],bH);
cW.push(bL,this.$$store.theme[name],bM);
cW.push(bq,this.$$store.init[name],bl);
cW.push(bL,this.$$store.init[name],bM);
cW.push(bJ,this.$$store.useinit[name],bk);
cW.push(bD);
}else{cW.push(bQ,this.$$store.runtime[name],bM);
if(cT===bF){cW.push(bJ,this.$$store.user[name],bK);
}else if(cT===bT){cW.push(bG,this.$$store.user[name],bM);
}else if(cT===bE){cW.push(bJ,this.$$store.theme[name],bK);
}else if(cT===bm){cW.push(bG,this.$$store.theme[name],bM);
}else if(cT===bs&&cV){cW.push(bJ,this.$$store.init[name],bK);
}}cW.push(bD);
cW.push(bq,this.$$store.user[name],bl);

if(cT===bF){if(!db.inheritable){cW.push(bR,this.$$store.user[name],bM);
}cW.push(bL,this.$$store.user[name],bK);
}else if(cT===bT){if(!db.inheritable){cW.push(bR,this.$$store.user[name],bM);
}cW.push(bG,this.$$store.user[name],bM);
cW.push(bI,this.$$store.runtime[name],bH);
cW.push(bL,this.$$store.runtime[name],bM);
cW.push(bI,this.$$store.theme[name],bH);
cW.push(bL,this.$$store.theme[name],bM);
cW.push(bq,this.$$store.init[name],bl);
cW.push(bL,this.$$store.init[name],bM);
cW.push(bJ,this.$$store.useinit[name],bk);
cW.push(bD);
}else{if(cT===br){cW.push(bL,this.$$store.runtime[name],bK);
}else if(db.inheritable){cW.push(bL,this.$$store.user[name],bM);
}else{cW.push(bQ,this.$$store.user[name],bM);
}if(cT===bE){cW.push(bJ,this.$$store.theme[name],bK);
}else if(cT===bm){cW.push(bG,this.$$store.theme[name],bM);
}else if(cT===bs&&cV){cW.push(bJ,this.$$store.init[name],bK);
}}cW.push(bD);
if(db.themeable){cW.push(bq,this.$$store.theme[name],bl);

if(!db.inheritable){cW.push(bR,this.$$store.theme[name],bM);
}
if(cT===br){cW.push(bL,this.$$store.runtime[name],bK);
}else if(cT===bF){cW.push(bL,this.$$store.user[name],bK);
}else if(cT===bE){cW.push(bL,this.$$store.theme[name],bK);
}else if(cT===bm){cW.push(bG,this.$$store.theme[name],bM);
cW.push(bI,this.$$store.init[name],bl);
cW.push(bL,this.$$store.init[name],bM);
cW.push(bJ,this.$$store.useinit[name],bk);
cW.push(bD);
}else if(cT===bs){if(cV){cW.push(bJ,this.$$store.init[name],bK);
}cW.push(bL,this.$$store.theme[name],bM);
}else if(cT===bU){cW.push(bL,this.$$store.theme[name],bM);
}cW.push(bD);
}cW.push(bq,this.$$store.useinit[name],U);

if(!db.inheritable){cW.push(bR,this.$$store.init[name],bM);
}
if(cT===bs){if(cV){cW.push(bL,this.$$store.init[name],bK);
}else{cW.push(bL,this.$$store.init[name],bM);
}}else if(cT===bF||cT===br||cT===bE||cT===bU){cW.push(bG,this.$$store.useinit[name],bM);

if(cT===br){cW.push(bL,this.$$store.runtime[name],bK);
}else if(cT===bF){cW.push(bL,this.$$store.user[name],bK);
}else if(cT===bE){cW.push(bL,this.$$store.theme[name],bK);
}else if(cT===bU){cW.push(bL,this.$$store.init[name],bM);
}}cW.push(bD);
if(cT===bF||cT===br||cT===bE||cT===bs){cW.push(bu);

if(cT===br){cW.push(bL,this.$$store.runtime[name],bK);
}else if(cT===bF){cW.push(bL,this.$$store.user[name],bK);
}else if(cT===bE){cW.push(bL,this.$$store.theme[name],bK);
}else if(cT===bs){if(cV){cW.push(bL,this.$$store.init[name],bK);
}else{cW.push(bL,this.$$store.init[name],bM);
}cW.push(bJ,this.$$store.useinit[name],bk);
}cW.push(bD);
}}
if(db.inheritable){cW.push(R);

if(cT===bU){cW.push(cg);
}else{cW.push(N,this.$$store.inherit[name],bM);
}cW.push(bc);
cW.push(bJ,this.$$store.init[name],I);
cW.push(bJ,this.$$store.init[name],S);
cW.push(bL,this.$$store.init[name],bM);
cW.push(bJ,this.$$store.useinit[name],bk);
cW.push(J);
cW.push(bG,this.$$store.useinit[name],T);
cW.push(bD);
cW.push(bV);
cW.push(x);
cW.push(cc,this.$$store.inherit[name],bM);
cW.push(bD);
cW.push(B);
cW.push(bG,this.$$store.inherit[name],bM);
cW.push(ca,this.$$store.inherit[name],v);
cW.push(K);
if(db.init!==undefined&&cT!==bs){cW.push(bP,this.$$store.init[name],bO);
}else{cW.push(bW);
}cW.push(bb);
}else if(cY){if(cT!==bF&&cT!==br&&cT!==bE){cW.push(F);
}cW.push(bV);
if(db.init!==undefined&&cT!==bs){cW.push(bP,this.$$store.init[name],bO);
}else{cW.push(bW);
}}if(cY){if(db.apply){cW.push(bJ,db.apply,X,name,O);
}if(db.event){cW.push(M,W,db.event,cb,bd,db.event,H,bg);
}if(db.inheritable&&da._getChildren){cW.push(bC);
cW.push(be,this.$$method.refresh[name],P,this.$$method.refresh[name],w);
cW.push(bD);
}}if(cV){cW.push(Y);
}return this.__P(cR,da,name,cT,cW,cU);
}},settings:{"qx.propertyDebugLevel":0}});
})();
(function(){var d="$$hash",c="qx.core.ObjectRegistry";
qx.Bootstrap.define(c,{statics:{inShutDown:false,__Q:{},__R:0,__S:[],register:function(o){var r=this.__Q;

if(!r){return;
}var q=o.$$hash;

if(q==null){var p=this.__S;

if(p.length>0){q=p.pop();
}else{q=(this.__R++).toString(36);
}o.$$hash=q;
}{};
r[q]=o;
},unregister:function(t){var u=t.$$hash;

if(u==null){return;
}var v=this.__Q;

if(v&&v[u]){delete v[u];
this.__S.push(u);
}try{delete t.$$hash;
}catch(m){if(t.removeAttribute){t.removeAttribute(d);
}}},toHashCode:function(g){{};
var j=g.$$hash;

if(j!=null){return j;
}var h=this.__S;

if(h.length>0){j=h.pop();
}else{j=(this.__R++).toString(36);
}return g.$$hash=j;
},clearHashCode:function(e){{};
var f=e.$$hash;

if(f!=null){this.__S.push(f);
try{delete e.$$hash;
}catch(n){if(e.removeAttribute){e.removeAttribute(d);
}}}},fromHashCode:function(s){return this.__Q[s]||null;
},shutdown:function(){this.inShutDown=true;
var x=this.__Q;
var z=[];

for(var y in x){z.push(y);
}z.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var w,i=0,l=z.length;

while(true){try{for(;i<l;i++){y=z[i];
w=x[y];

if(w&&w.dispose){w.dispose();
}}}catch(k){qx.log.Logger.error(this,"Could not dispose object "+w.toString()+": "+k);

if(i!==l){i++;
continue;
}}break;
}qx.log.Logger.debug(this,"Disposed "+l+" objects");
delete this.__Q;
},getRegistry:function(){return this.__Q;
}}});
})();
(function(){var q="qx.Mixin",p=".prototype",o="constructor",n="[Mixin ",m="]",k="destruct",j="Mixin";
qx.Class.define(q,{statics:{define:function(name,w){if(w){if(w.include&&!(w.include instanceof Array)){w.include=[w.include];
}{};
var y=w.statics?w.statics:{};
qx.Bootstrap.setDisplayNames(y,name);

for(var x in y){if(y[x] instanceof Function){y[x].$$mixin=y;
}}if(w.construct){y.$$constructor=w.construct;
qx.Bootstrap.setDisplayName(w.construct,name,o);
}
if(w.include){y.$$includes=w.include;
}
if(w.properties){y.$$properties=w.properties;
}
if(w.members){y.$$members=w.members;
qx.Bootstrap.setDisplayNames(w.members,name+p);
}
for(var x in y.$$members){if(y.$$members[x] instanceof Function){y.$$members[x].$$mixin=y;
}}
if(w.events){y.$$events=w.events;
}
if(w.destruct){y.$$destructor=w.destruct;
qx.Bootstrap.setDisplayName(w.destruct,name,k);
}}else{var y={};
}y.$$type=j;
y.name=name;
y.toString=this.genericToString;
y.basename=qx.Bootstrap.createNamespace(name,y);
this.$$registry[name]=y;
return y;
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
},isCompatible:function(r,s){var t=qx.Class.getMixins(s);
t.push(r);
return qx.Mixin.checkCompatibility(t);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(u){if(!u){return [];
}var v=u.concat();

for(var i=0,l=u.length;i<l;i++){if(u[i].$$includes){v.push.apply(v,this.flatten(u[i].$$includes));
}}return v;
},genericToString:function(){return n+this.name+m;
},$$registry:{},__T:null,__U:function(){}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(c,d,e,f){return qx.data.SingleValueBinding.bind(this,c,d,e,f);
},removeBinding:function(b){qx.data.SingleValueBinding.removeBindingFromObject(this,b);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var o="qx.client",n="on",m="mousedown",l="qx.bom.Event",k="mouseover",j="HTMLEvents";
qx.Bootstrap.define(l,{statics:{addNativeListener:qx.core.Variant.select(o,{"mshtml":function(p,q,r){p.attachEvent(n+q,r);
},"default":function(a,b,c){a.addEventListener(b,c,false);
}}),removeNativeListener:qx.core.Variant.select(o,{"mshtml":function(v,w,x){v.detachEvent(n+w,x);
},"default":function(g,h,i){g.removeEventListener(h,i,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(o,{"mshtml":function(e){if(e.type===k){return e.fromEvent;
}else{return e.toElement;
}},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(o,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==m&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(f){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(d){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(s,t){if(document.createEventObject){var u=document.createEventObject();
return s.fireEvent(n+t,u);
}else{var u=document.createEvent(j);
u.initEvent(t,true,true);
return !s.dispatchEvent(u);
}}}});
})();
(function(){var cv="|bubble",cu="|capture",ct="|",cs="_",cr="unload",cq="UNKNOWN_",cp="DOM_",co="__Y",cn="__X",cm="c",cj="WIN_",cl="capture",ck="qx.event.Manager",ci="QX_";
qx.Bootstrap.define(ck,{construct:function(bO){this.__V=bO;
if(bO.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(bO,cr,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(bO,cr,arguments.callee);
self.dispose();
}));
}this.__W={};
this.__X={};
this.__Y={};
this.__ba={};
},statics:{__bb:0,getNextUniqueId:function(){return (this.__bb++).toString(36);
}},members:{__W:null,__Y:null,__bc:null,__X:null,__ba:null,__V:null,getWindow:function(){return this.__V;
},getHandler:function(bn){var bo=this.__X[bn.classname];

if(bo){return bo;
}return this.__X[bn.classname]=new bn(this);
},getDispatcher:function(X){var Y=this.__Y[X.classname];

if(Y){return Y;
}return this.__Y[X.classname]=new X(this);
},getListeners:function(z,A,B){var C=z.$$hash||qx.core.ObjectRegistry.toHashCode(z);
var E=this.__W[C];

if(!E){return null;
}var F=A+(B?cu:cv);
var D=E[F];
return D?D.concat():null;
},serializeListeners:function(N){var U=N.$$hash||qx.core.ObjectRegistry.toHashCode(N);
var W=this.__W[U];
var S=[];

if(W){var Q,V,O,R,T;

for(var P in W){Q=P.indexOf(ct);
V=P.substring(0,Q);
O=P.charAt(Q+1)==cm;
R=W[P];

for(var i=0,l=R.length;i<l;i++){T=R[i];
S.push({self:T.context,handler:T.handler,type:V,capture:O});
}}}return S;
},toggleAttachedEvents:function(bt,bu){var bz=bt.$$hash||qx.core.ObjectRegistry.toHashCode(bt);
var bB=this.__W[bz];

if(bB){var bw,bA,bv,bx;

for(var by in bB){bw=by.indexOf(ct);
bA=by.substring(0,bw);
bv=by.charCodeAt(bw+1)===99;
bx=bB[by];

if(bu){this.__bd(bt,bA,bv);
}else{this.__be(bt,bA,bv);
}}}},hasListener:function(cw,cx,cy){{};
var cz=cw.$$hash||qx.core.ObjectRegistry.toHashCode(cw);
var cB=this.__W[cz];

if(!cB){return false;
}var cC=cx+(cy?cu:cv);
var cA=cB[cC];
return cA&&cA.length>0;
},importListeners:function(be,bf){{};
var bl=be.$$hash||qx.core.ObjectRegistry.toHashCode(be);
var bm=this.__W[bl]={};
var bi=qx.event.Manager;

for(var bg in bf){var bj=bf[bg];
var bk=bj.type+(bj.capture?cu:cv);
var bh=bm[bk];

if(!bh){bh=bm[bk]=[];
this.__bd(be,bj.type,bj.capture);
}bh.push({handler:bj.listener,context:bj.self,unique:bj.unique||(bi.__bb++).toString(36)});
}},addListener:function(bW,bX,bY,self,ca){var ce;
{};
var cf=bW.$$hash||qx.core.ObjectRegistry.toHashCode(bW);
var ch=this.__W[cf];

if(!ch){ch=this.__W[cf]={};
}var cd=bX+(ca?cu:cv);
var cc=ch[cd];

if(!cc){cc=ch[cd]=[];
}if(cc.length===0){this.__bd(bW,bX,ca);
}var cg=(qx.event.Manager.__bb++).toString(36);
var cb={handler:bY,context:self,unique:cg};
cc.push(cb);
return cd+ct+cg;
},findHandler:function(m,n){var x=false,q=false,y=false;
var w;

if(m.nodeType===1){x=true;
w=cp+m.tagName.toLowerCase()+cs+n;
}else if(m==this.__V){q=true;
w=cj+n;
}else if(m.classname){y=true;
w=ci+m.classname+cs+n;
}else{w=cq+m+cs+n;
}var s=this.__ba;

if(s[w]){return s[w];
}var v=qx.event.Registration.getHandlers();
var r=qx.event.IEventHandler;
var t,u,p,o;

for(var i=0,l=v.length;i<l;i++){t=v[i];
p=t.SUPPORTED_TYPES;

if(p&&!p[n]){continue;
}o=t.TARGET_CHECK;

if(o){if(!x&&o===r.TARGET_DOMNODE){continue;
}else if(!q&&o===r.TARGET_WINDOW){continue;
}else if(!y&&o===r.TARGET_OBJECT){continue;
}}u=this.getHandler(v[i]);

if(t.IGNORE_CAN_HANDLE||u.canHandleEvent(m,n)){s[w]=u;
return u;
}}return null;
},__bd:function(ba,bb,bc){var bd=this.findHandler(ba,bb);

if(bd){bd.registerEvent(ba,bb,bc);
return;
}{};
},removeListener:function(a,b,c,self,d){var h;
{};
var j=a.$$hash||qx.core.ObjectRegistry.toHashCode(a);
var k=this.__W[j];

if(!k){return false;
}var e=b+(d?cu:cv);
var f=k[e];

if(!f){return false;
}var g;

for(var i=0,l=f.length;i<l;i++){g=f[i];

if(g.handler===c&&g.context===self){qx.lang.Array.removeAt(f,i);

if(f.length==0){this.__be(a,b,d);
}return true;
}}return false;
},removeListenerById:function(bC,bD){var bJ;
{};
var bH=bD.split(ct);
var bM=bH[0];
var bE=bH[1].charCodeAt(0)==99;
var bL=bH[2];
var bK=bC.$$hash||qx.core.ObjectRegistry.toHashCode(bC);
var bN=this.__W[bK];

if(!bN){return false;
}var bI=bM+(bE?cu:cv);
var bG=bN[bI];

if(!bG){return false;
}var bF;

for(var i=0,l=bG.length;i<l;i++){bF=bG[i];

if(bF.unique===bL){qx.lang.Array.removeAt(bG,i);

if(bG.length==0){this.__be(bC,bM,bE);
}return true;
}}return false;
},removeAllListeners:function(bP){var bT=bP.$$hash||qx.core.ObjectRegistry.toHashCode(bP);
var bV=this.__W[bT];

if(!bV){return false;
}var bR,bU,bQ;

for(var bS in bV){if(bV[bS].length>0){bR=bS.split(ct);
bU=bR[0];
bQ=bR[1]===cl;
this.__be(bP,bU,bQ);
}}delete this.__W[bT];
return true;
},__be:function(bp,bq,br){var bs=this.findHandler(bp,bq);

if(bs){bs.unregisterEvent(bp,bq,br);
return;
}{};
},dispatchEvent:function(G,event){var L;
{};
var M=event.getType();

if(!event.getBubbles()&&!this.hasListener(G,M)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(G);
}var K=qx.event.Registration.getDispatchers();
var J;
var I=false;

for(var i=0,l=K.length;i<l;i++){J=this.getDispatcher(K[i]);
if(J.canDispatchEvent(G,event,M)){J.dispatchEvent(G,event,M);
I=true;
break;
}}
if(!I){qx.log.Logger.error(this,"No dispatcher can handle event of type "+M+" on "+G);
return true;
}var H=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !H;
},dispose:function(){qx.event.Registration.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,cn);
qx.util.DisposeUtil.disposeMap(this,co);
this.__W=this.__V=this.__bc=this.__ba=null;
}}});
})();
(function(){var h="qx.dom.Node",g="qx.client",f="";
qx.Class.define(h,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(c){return c.nodeType===
this.DOCUMENT?c:
c.ownerDocument||c.document;
},getWindow:qx.core.Variant.select(g,{"mshtml":function(q){if(q.nodeType==null){return q;
}if(q.nodeType!==this.DOCUMENT){q=q.ownerDocument;
}return q.parentWindow;
},"default":function(j){if(j.nodeType==null){return j;
}if(j.nodeType!==this.DOCUMENT){j=j.ownerDocument;
}return j.defaultView;
}}),getDocumentElement:function(b){return this.getDocument(b).documentElement;
},getBodyElement:function(e){return this.getDocument(e).body;
},isNode:function(l){return !!(l&&l.nodeType!=null);
},isElement:function(k){return !!(k&&k.nodeType===this.ELEMENT);
},isDocument:function(p){return !!(p&&p.nodeType===this.DOCUMENT);
},isText:function(m){return !!(m&&m.nodeType===this.TEXT);
},isWindow:function(d){return !!(d&&d.history&&d.location&&d.document);
},getText:function(n){if(!n||!n.nodeType){return null;
}
switch(n.nodeType){case 1:var i,a=[],o=n.childNodes,length=o.length;

for(i=0;i<length;i++){a[i]=this.getText(o[i]);
}return a.join(f);
case 2:return n.nodeValue;
break;
case 3:return n.nodeValue;
break;
}return null;
}}});
})();
(function(){var v="mshtml",u="qx.client",t="[object Array]",s="qx.lang.Array",r="qx",q="number",p="string";
qx.Bootstrap.define(s,{statics:{toArray:function(k,m){return this.cast(k,Array,m);
},cast:function(F,G,H){if(F.constructor===G){return F;
}
if(qx.Class.hasInterface(F,qx.data.IListData)){var F=F.toArray();
}var I=new G;
if(qx.core.Variant.isSet(u,v)){if(F.item){for(var i=H||0,l=F.length;i<l;i++){I.push(F[i]);
}return I;
}}if(Object.prototype.toString.call(F)===t&&H==null){I.push.apply(I,F);
}else{I.push.apply(I,Array.prototype.slice.call(F,H||0));
}return I;
},fromArguments:function(bk,bl){return Array.prototype.slice.call(bk,bl||0);
},fromCollection:function(U){if(qx.core.Variant.isSet(u,v)){if(U.item){var V=[];

for(var i=0,l=U.length;i<l;i++){V[i]=U[i];
}return V;
}}return Array.prototype.slice.call(U,0);
},fromShortHand:function(bm){var bo=bm.length;
var bn=qx.lang.Array.clone(bm);
switch(bo){case 1:bn[1]=bn[2]=bn[3]=bn[0];
break;
case 2:bn[2]=bn[0];
case 3:bn[3]=bn[1];
}return bn;
},clone:function(E){return E.concat();
},insertAt:function(z,A,i){z.splice(i,0,A);
return z;
},insertBefore:function(L,M,N){var i=L.indexOf(N);

if(i==-1){L.push(M);
}else{L.splice(i,0,M);
}return L;
},insertAfter:function(w,x,y){var i=w.indexOf(y);

if(i==-1||i==(w.length-1)){w.push(x);
}else{w.splice(i+1,0,x);
}return w;
},removeAt:function(B,i){return B.splice(i,1)[0];
},removeAll:function(O){O.length=0;
return this;
},append:function(bp,bq){{};
Array.prototype.push.apply(bp,bq);
return bp;
},exclude:function(P,Q){{};

for(var i=0,S=Q.length,R;i<S;i++){R=P.indexOf(Q[i]);

if(R!=-1){P.splice(R,1);
}}return P;
},remove:function(C,D){var i=C.indexOf(D);

if(i!=-1){C.splice(i,1);
return D;
}},contains:function(h,j){return h.indexOf(j)!==-1;
},equals:function(J,K){var length=J.length;

if(length!==K.length){return false;
}
for(var i=0;i<length;i++){if(J[i]!==K[i]){return false;
}}return true;
},sum:function(n){var o=0;

for(var i=0,l=n.length;i<l;i++){o+=n[i];
}return o;
},max:function(e){{};
var i,g=e.length,f=e[0];

for(i=1;i<g;i++){if(e[i]>f){f=e[i];
}}return f===undefined?null:f;
},min:function(b){{};
var i,d=b.length,c=b[0];

for(i=1;i<d;i++){if(b[i]<c){c=b[i];
}}return c===undefined?null:c;
},unique:function(W){var bh=[],Y={},bc={},be={};
var bd,X=0;
var bi=r+qx.lang.Date.now();
var ba=false,bg=false,bj=false;
for(var i=0,bf=W.length;i<bf;i++){bd=W[i];
if(bd===null){if(!ba){ba=true;
bh.push(bd);
}}else if(bd===undefined){}else if(bd===false){if(!bg){bg=true;
bh.push(bd);
}}else if(bd===true){if(!bj){bj=true;
bh.push(bd);
}}else if(typeof bd===p){if(!Y[bd]){Y[bd]=1;
bh.push(bd);
}}else if(typeof bd===q){if(!bc[bd]){bc[bd]=1;
bh.push(bd);
}}else{bb=bd[bi];

if(bb==null){bb=bd[bi]=X++;
}
if(!be[bb]){be[bb]=bd;
bh.push(bd);
}}}for(var bb in be){try{delete be[bb][bi];
}catch(T){try{be[bb][bi]=null;
}catch(a){throw new Error("Cannot clean-up map entry doneObjects["+bb+"]["+bi+"]");
}}}return bh;
}}});
})();
(function(){var A="()",z=".",y=".prototype.",x='anonymous()',w="qx.lang.Function",v=".constructor()";
qx.Bootstrap.define(w,{statics:{getCaller:function(i){return i.caller?i.caller.callee:i.callee.caller;
},getName:function(c){if(c.displayName){return c.displayName;
}
if(c.$$original||c.wrapper||c.classname){return c.classname+v;
}
if(c.$$mixin){for(var e in c.$$mixin.$$members){if(c.$$mixin.$$members[e]==c){return c.$$mixin.name+y+e+A;
}}for(var e in c.$$mixin){if(c.$$mixin[e]==c){return c.$$mixin.name+z+e+A;
}}}
if(c.self){var f=c.self.constructor;

if(f){for(var e in f.prototype){if(f.prototype[e]==c){return f.classname+y+e+A;
}}for(var e in f){if(f[e]==c){return f.classname+z+e+A;
}}}}var d=c.toString().match(/function\s*(\w*)\s*\(.*/);

if(d&&d.length>=1&&d[1]){return d[1]+A;
}return x;
},globalEval:function(u){if(window.execScript){return window.execScript(u);
}else{return eval.call(window,u);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(D,E){{};
if(!E){return D;
}if(!(E.self||E.args||E.delay!=null||E.periodical!=null||E.attempt)){return D;
}return function(event){{};
var n=qx.lang.Array.fromArguments(arguments);
if(E.args){n=E.args.concat(n);
}
if(E.delay||E.periodical){var m=qx.event.GlobalError.observeMethod(function(){return D.apply(E.self||this,n);
});

if(E.delay){return window.setTimeout(m,E.delay);
}
if(E.periodical){return window.setInterval(m,E.periodical);
}}else if(E.attempt){var o=false;

try{o=D.apply(E.self||this,n);
}catch(a){}return o;
}else{return D.apply(E.self||this,n);
}};
},bind:function(B,self,C){return this.create(B,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(g,h){return this.create(g,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(j,self,k){if(arguments.length<3){return function(event){return j.call(self||this,event||window.event);
};
}else{var l=qx.lang.Array.fromArguments(arguments,2);
return function(event){var b=[event||window.event];
b.push.apply(b,l);
j.apply(self||this,b);
};
}},attempt:function(p,self,q){return this.create(p,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(r,s,self,t){return this.create(r,{delay:s,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(F,G,self,H){return this.create(F,{periodical:G,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var o="qx.event.Registration";
qx.Bootstrap.define(o,{statics:{__bf:{},getManager:function(w){if(w==null){{};
w=window;
}else if(w.nodeType){w=qx.dom.Node.getWindow(w);
}else if(!qx.dom.Node.isWindow(w)){w=window;
}var y=w.$$hash||qx.core.ObjectRegistry.toHashCode(w);
var x=this.__bf[y];

if(!x){x=new qx.event.Manager(w);
this.__bf[y]=x;
}return x;
},removeManager:function(j){var k=qx.core.ObjectRegistry.toHashCode(j.getWindow());
delete this.__bf[k];
},addListener:function(s,t,u,self,v){return this.getManager(s).addListener(s,t,u,self,v);
},removeListener:function(f,g,h,self,i){return this.getManager(f).removeListener(f,g,h,self,i);
},removeListenerById:function(d,e){return this.getManager(d).removeListenerById(d,e);
},removeAllListeners:function(z){return this.getManager(z).removeAllListeners(z);
},hasListener:function(l,m,n){return this.getManager(l).hasListener(l,m,n);
},serializeListeners:function(c){return this.getManager(c).serializeListeners(c);
},createEvent:function(G,H,I){{};
if(H==null){H=qx.event.type.Event;
}var J=qx.event.Pool.getInstance().getObject(H);

if(!J){return;
}I?J.init.apply(J,I):J.init();
if(G){J.setType(G);
}return J;
},dispatchEvent:function(p,event){return this.getManager(p).dispatchEvent(p,event);
},fireEvent:function(A,B,C,D){var E;
{};
var F=this.createEvent(B,C||null,D);
return this.getManager(A).dispatchEvent(A,F);
},fireNonBubblingEvent:function(L,M,N,O){{};
var P=this.getManager(L);

if(!P.hasListener(L,M,false)){return true;
}var Q=this.createEvent(M,N||null,O);
return P.dispatchEvent(L,Q);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bg:[],addHandler:function(K){{};
this.__bg.push(K);
this.__bg.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bg;
},__bh:[],addDispatcher:function(q,r){{};
this.__bh.push(q);
this.__bh.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bh;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Bootstrap.define(a,{construct:function(b){this.__bi=[];
this.setMaxMessages(b||50);
},members:{__bj:0,__bi:null,__bk:50,setMaxMessages:function(i){this.__bk=i;
this.clearHistory();
},getMaxMessages:function(){return this.__bk;
},process:function(g){var h=this.getMaxMessages();

if(this.__bi.length<h){this.__bi.push(g);
}else{this.__bi[this.__bj++]=g;

if(this.__bj>=h){this.__bj=0;
}}},getAllLogEvents:function(){return this.retrieveLogEvents(this.getMaxMessages());
},retrieveLogEvents:function(c){if(c>this.__bi.length){c=this.__bi.length;
}
if(this.__bi.length==this.getMaxMessages()){var e=this.__bj-1;
}else{e=this.__bi.length-1;
}var d=e-c+1;

if(d<0){d+=this.__bi.length;
}var f;

if(d<=e){f=this.__bi.slice(d,e+1);
}else{f=this.__bi.slice(d,this.__bi.length).concat(this.__bi.slice(0,e+1));
}return f;
},clearHistory:function(){this.__bi=[];
this.__bj=0;
}}});
})();
(function(){var w="node",v="error",u="...(+",t="array",s=")",r="info",q="instance",p="string",o="null",n="class",R="number",Q="stringify",P="]",O="unknown",N="function",M="boolean",L="debug",K="map",J="undefined",I="qx.log.Logger",D=")}",E="#",B="warn",C="document",z="{...(",A="[",x="text[",y="[...(",F="\n",G=")]",H="object";
qx.Bootstrap.define(I,{statics:{__bl:L,setLevel:function(j){this.__bl=j;
},getLevel:function(){return this.__bl;
},setTreshold:function(U){this.__bo.setMaxMessages(U);
},getTreshold:function(){return this.__bo.getMaxMessages();
},__bm:{},__bn:0,register:function(bC){if(bC.$$id){return;
}var bD=this.__bn++;
this.__bm[bD]=bC;
bC.$$id=bD;
var bE=this.__bo.getAllLogEvents();

for(var i=0,l=bE.length;i<l;i++){bC.process(bE[i]);
}},unregister:function(be){var bf=be.$$id;

if(bf==null){return;
}delete this.__bm[bf];
delete be.$$id;
},debug:function(W,X){this.__bq(L,arguments);
},info:function(g,h){this.__bq(r,arguments);
},warn:function(k,m){this.__bq(B,arguments);
},error:function(Y,ba){this.__bq(v,arguments);
},trace:function(V){this.__bq(r,[V,qx.dev.StackTrace.getStackTrace().join(F)]);
},deprecatedMethodWarning:function(a,b){var c;
{};
},deprecatedClassWarning:function(bb,bc){var bd;
{};
},deprecatedEventWarning:function(bz,event,bA){var bB;
{};
},deprecatedMixinWarning:function(d,e){var f;
{};
},clear:function(){this.__bo.clearHistory();
},__bo:new qx.log.appender.RingBuffer(50),__bp:{debug:0,info:1,warn:2,error:3},__bq:function(bp,bq){var bv=this.__bp;

if(bv[bp]<bv[this.__bl]){return;
}var bs=bq.length<2?null:bq[0];
var bu=bs?1:0;
var br=[];

for(var i=bu,l=bq.length;i<l;i++){br.push(this.__bs(bq[i],true));
}var bw=new Date;
var bx={time:bw,offset:bw-qx.Bootstrap.LOADSTART,level:bp,items:br,win:window};
if(bs){if(bs instanceof qx.core.Object){bx.object=bs.$$hash;
}else if(bs.$$type){bx.clazz=bs;
}}this.__bo.process(bx);
var by=this.__bm;

for(var bt in by){by[bt].process(bx);
}},__br:function(S){if(S===undefined){return J;
}else if(S===null){return o;
}
if(S.$$type){return n;
}var T=typeof S;

if(T===N||T==p||T===R||T===M){return T;
}else if(T===H){if(S.nodeType){return w;
}else if(S.classname){return q;
}else if(S instanceof Array){return t;
}else if(S instanceof Error){return v;
}else{return K;
}}
if(S.toString){return Q;
}return O;
},__bs:function(bg,bh){var bo=this.__br(bg);
var bk=O;
var bj=[];

switch(bo){case o:case J:bk=bo;
break;
case p:case R:case M:bk=bg;
break;
case w:if(bg.nodeType===9){bk=C;
}else if(bg.nodeType===3){bk=x+bg.nodeValue+P;
}else if(bg.nodeType===1){bk=bg.nodeName.toLowerCase();

if(bg.id){bk+=E+bg.id;
}}else{bk=w;
}break;
case N:bk=qx.lang.Function.getName(bg)||bo;
break;
case q:bk=bg.basename+A+bg.$$hash+P;
break;
case n:case Q:bk=bg.toString();
break;
case v:bj=qx.dev.StackTrace.getStackTraceFromError(bg);
bk=bg.toString();
break;
case t:if(bh){bk=[];

for(var i=0,l=bg.length;i<l;i++){if(bk.length>20){bk.push(u+(l-i)+s);
break;
}bk.push(this.__bs(bg[i],false));
}}else{bk=y+bg.length+G;
}break;
case K:if(bh){var bi;
var bn=[];

for(var bm in bg){bn.push(bm);
}bn.sort();
bk=[];

for(var i=0,l=bn.length;i<l;i++){if(bk.length>20){bk.push(u+(l-i)+s);
break;
}bm=bn[i];
bi=this.__bs(bg[bm],false);
bi.key=bm;
bk.push(bi);
}}else{var bl=0;

for(var bm in bg){bl++;
}bk=z+bl+D;
}break;
}return {type:bo,text:bk,trace:bj};
}}});
})();
(function(){var G="set",F="get",E="reset",D="qx.core.Object",C="]",B="__bu",A="[",z="$$user_",y="Object";
qx.Class.define(D,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:y},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+A+this.$$hash+C;
},base:function(be,bf){if(arguments.length===1){return be.callee.base.call(this);
}else{return be.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(X){return X.callee.self;
},clone:function(){var u=this.constructor;
var t=new u;
var w=qx.Class.getProperties(u);
var v=qx.core.Property.$$store.user;
var x=qx.core.Property.$$method.set;
var name;
for(var i=0,l=w.length;i<l;i++){name=w[i];

if(this.hasOwnProperty(v[name])){t[x[name]](this[v[name]]);
}}return t;
},serialize:function(){var K=this.constructor;
var M=qx.Class.getProperties(K);
var N=qx.core.Property.$$store.user;
var name,J;
var L={classname:K.classname,properties:{}};
for(var i=0,l=M.length;i<l;i++){name=M[i];

if(this.hasOwnProperty(N[name])){J=this[N[name]];

if(J instanceof qx.core.Object){L.properties[name]={$$hash:J.$$hash};
}else{L.properties[name]=J;
}}}return L;
},set:function(P,Q){var S=qx.core.Property.$$method.set;

if(qx.lang.Type.isString(P)){if(!this[S[P]]){if(this[G+qx.lang.String.firstUp(P)]!=undefined){this[G+qx.lang.String.firstUp(P)](Q);
return;
}{};
}return this[S[P]](Q);
}else{for(var R in P){if(!this[S[R]]){if(this[G+qx.lang.String.firstUp(R)]!=undefined){this[G+qx.lang.String.firstUp(R)](P[R]);
continue;
}{};
}this[S[R]](P[R]);
}return this;
}},get:function(bs){var bt=qx.core.Property.$$method.get;

if(!this[bt[bs]]){if(this[F+qx.lang.String.firstUp(bs)]!=undefined){return this[F+qx.lang.String.firstUp(bs)]();
}{};
}return this[bt[bs]]();
},reset:function(bj){var bk=qx.core.Property.$$method.reset;

if(!this[bk[bj]]){if(this[E+qx.lang.String.firstUp(bj)]!=undefined){this[E+qx.lang.String.firstUp(bj)]();
return;
}{};
}this[bk[bj]]();
},__bt:qx.event.Registration,addListener:function(bm,bn,self,bo){if(!this.$$disposed){return this.__bt.addListener(this,bm,bn,self,bo);
}return null;
},addListenerOnce:function(o,p,self,q){var r=function(e){p.call(self||this,e);
this.removeListener(o,r,this,q);
};
return this.addListener(o,r,this,q);
},removeListener:function(k,m,self,n){if(!this.$$disposed){return this.__bt.removeListener(this,k,m,self,n);
}return false;
},removeListenerById:function(bi){if(!this.$$disposed){return this.__bt.removeListenerById(this,bi);
}return false;
},hasListener:function(V,W){return this.__bt.hasListener(this,V,W);
},dispatchEvent:function(bg){if(!this.$$disposed){return this.__bt.dispatchEvent(this,bg);
}return true;
},fireEvent:function(bu,bv,bw){if(!this.$$disposed){return this.__bt.fireEvent(this,bu,bv,bw);
}return true;
},fireNonBubblingEvent:function(bx,by,bz){if(!this.$$disposed){return this.__bt.fireNonBubblingEvent(this,bx,by,bz);
}return true;
},fireDataEvent:function(ba,bb,bc,bd){if(!this.$$disposed){if(bc===undefined){bc=null;
}return this.__bt.fireNonBubblingEvent(this,ba,qx.event.type.Data,[bb,bc,!!bd]);
}return true;
},__bu:null,setUserData:function(T,U){if(!this.__bu){this.__bu={};
}this.__bu[T]=U;
},getUserData:function(H){if(!this.__bu){return null;
}var I=this.__bu[H];
return I===undefined?null:I;
},__bv:qx.log.Logger,debug:function(bl){this.__bv.debug(this,bl);
},info:function(br){this.__bv.info(this,br);
},warn:function(bh){this.__bv.warn(this,bh);
},error:function(O){this.__bv.error(this,O);
},trace:function(){this.__bv.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var bE,bC;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var bD=this.constructor;
var bB;

while(bD.superclass){if(bD.$$destructor){bD.$$destructor.call(this);
}if(bD.$$includes){bB=bD.$$flatIncludes;

for(var i=0,l=bB.length;i<l;i++){if(bB[i].$$destructor){bB[i].$$destructor.call(this);
}}}bD=bD.superclass;
}var bF=qx.Class.getProperties(this.constructor);

for(var i=0,l=bF.length;i<l;i++){delete this[z+bF[i]];
}{};
},_disposeFields:function(bq){qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(s){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(bA){qx.util.DisposeUtil.disposeArray(this,bA);
},_disposeMap:function(Y){qx.util.DisposeUtil.disposeMap(this,Y);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bp){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this._disposeFields(B);
var c=this.constructor;
var h;
var j=qx.core.Property.$$store;
var f=j.user;
var g=j.theme;
var a=j.inherit;
var d=j.useinit;
var b=j.init;

while(c){h=c.$$properties;

if(h){for(var name in h){if(h[name].dispose){this[f[name]]=this[g[name]]=this[a[name]]=this[d[name]]=this[b[name]]=undefined;
}}}c=c.superclass;
}}});
})();
(function(){var bf="keypress",be="focusout",bd="__iz",bc="activate",bb="__iA",ba="Tab",Y="__iB",X="singleton",W="__iy",V="deactivate",T="focusin",U="qx.ui.core.FocusHandler";
qx.Class.define(U,{extend:qx.core.Object,type:X,construct:function(){arguments.callee.base.call(this);
this.__iy={};
},members:{__iy:null,__iz:null,__iA:null,__iB:null,connectTo:function(h){h.addListener(bf,this.__iC,this);
h.addListener(T,this._onFocusIn,this,true);
h.addListener(be,this._onFocusOut,this,true);
h.addListener(bc,this._onActivate,this,true);
h.addListener(V,this._onDeactivate,this,true);
},addRoot:function(bh){this.__iy[bh.$$hash]=bh;
},removeRoot:function(c){delete this.__iy[c.$$hash];
},getActiveWidget:function(){return this.__iz;
},isActive:function(bg){return this.__iz==bg;
},getFocusedWidget:function(){return this.__iA;
},isFocused:function(L){return this.__iA==L;
},isFocusRoot:function(o){return !!this.__iy[o.$$hash];
},_onActivate:function(e){var K=e.getTarget();
this.__iz=K;
var J=this.__iD(K);

if(J!=this.__iB){this.__iB=J;
}},_onDeactivate:function(e){var j=e.getTarget();

if(this.__iz==j){this.__iz=null;
}},_onFocusIn:function(e){var t=e.getTarget();

if(t!=this.__iA){this.__iA=t;
t.visualizeFocus();
}},_onFocusOut:function(e){var Q=e.getTarget();

if(Q==this.__iA){this.__iA=null;
Q.visualizeBlur();
}},__iC:function(e){if(e.getKeyIdentifier()!=ba){return;
}
if(!this.__iB){return;
}e.stopPropagation();
e.preventDefault();
var a=this.__iA;

if(!e.isShiftPressed()){var b=a?this.__iH(a):this.__iF();
}else{var b=a?this.__iI(a):this.__iG();
}if(b){b.tabFocus();
}},__iD:function(R){var S=this.__iy;

while(R){if(S[R.$$hash]){return R;
}R=R.getLayoutParent();
}return null;
},__iE:function(y,z){if(y===z){return 0;
}var B=y.getTabIndex()||0;
var A=z.getTabIndex()||0;

if(B!=A){return B-A;
}var G=y.getContainerElement().getDomElement();
var F=z.getContainerElement().getDomElement();
var E=qx.bom.element.Location;
var D=E.get(G);
var C=E.get(F);
if(D.top!=C.top){return D.top-C.top;
}if(D.left!=C.left){return D.left-C.left;
}var H=y.getZIndex();
var I=z.getZIndex();

if(H!=I){return H-I;
}return 0;
},__iF:function(){return this.__iL(this.__iB,null);
},__iG:function(){return this.__iM(this.__iB,null);
},__iH:function(bi){var bj=this.__iB;

if(bj==bi){return this.__iF();
}
while(bi&&bi.getAnonymous()){bi=bi.getLayoutParent();
}
if(bi==null){return [];
}var bk=[];
this.__iJ(bj,bi,bk);
bk.sort(this.__iE);
var bl=bk.length;
return bl>0?bk[0]:this.__iF();
},__iI:function(p){var q=this.__iB;

if(q==p){return this.__iG();
}
while(p&&p.getAnonymous()){p=p.getLayoutParent();
}
if(p==null){return [];
}var r=[];
this.__iK(q,p,r);
r.sort(this.__iE);
var s=r.length;
return s>0?r[s-1]:this.__iG();
},__iJ:function(parent,M,N){var O=parent.getLayoutChildren();
var P;

for(var i=0,l=O.length;i<l;i++){P=O[i];
if(!(P instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(P)&&P.isEnabled()&&P.isVisible()){if(P.isTabable()&&this.__iE(M,P)<0){N.push(P);
}this.__iJ(P,M,N);
}}},__iK:function(parent,u,v){var w=parent.getLayoutChildren();
var x;

for(var i=0,l=w.length;i<l;i++){x=w[i];
if(!(x instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(x)&&x.isEnabled()&&x.isVisible()){if(x.isTabable()&&this.__iE(u,x)>0){v.push(x);
}this.__iK(x,u,v);
}}},__iL:function(parent,d){var f=parent.getLayoutChildren();
var g;

for(var i=0,l=f.length;i<l;i++){g=f[i];
if(!(g instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(g)&&g.isEnabled()&&g.isVisible()){if(g.isTabable()){if(d==null||this.__iE(g,d)<0){d=g;
}}d=this.__iL(g,d);
}}return d;
},__iM:function(parent,k){var m=parent.getLayoutChildren();
var n;

for(var i=0,l=m.length;i<l;i++){n=m[i];
if(!(n instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(n)&&n.isEnabled()&&n.isVisible()){if(n.isTabable()){if(k==null||this.__iE(n,k)>0){k=n;
}}k=this.__iM(n,k);
}}return k;
}},destruct:function(){this._disposeMap(W);
this._disposeFields(bb,bd,Y);
}});
})();
(function(){var x="",w="g",v="0",u='\\$1',t="%",s='-',r="qx.lang.String",q=' ',p='\n',o="undefined";
qx.Bootstrap.define(r,{statics:{camelCase:function(M){return M.replace(/\-([a-z])/g,function(C,D){return D.toUpperCase();
});
},hyphenate:function(n){return n.replace(/[A-Z]/g,function(c){return (s+c.charAt(0).toLowerCase());
});
},capitalize:function(m){return m.replace(/\b[a-z]/g,function(d){return d.toUpperCase();
});
},clean:function(I){return this.trim(I.replace(/\s+/g,q));
},trimLeft:function(b){return b.replace(/^\s+/,x);
},trimRight:function(z){return z.replace(/\s+$/,x);
},trim:function(H){return H.replace(/^\s+|\s+$/g,x);
},startsWith:function(k,l){return k.indexOf(l)===0;
},endsWith:function(h,j){return h.substring(h.length-j.length,h.length)===j;
},pad:function(E,length,F){if(typeof F===o){F=v;
}var G=x;

for(var i=E.length;i<length;i++){G+=F;
}return G+E;
},firstUp:function(y){return y.charAt(0).toUpperCase()+y.substr(1);
},firstLow:function(A){return A.charAt(0).toLowerCase()+A.substr(1);
},contains:function(K,L){return K.indexOf(L)!=-1;
},format:function(e,f){var g=e;

for(var i=0;i<f.length;i++){g=g.replace(new RegExp(t+(i+1),w),f[i]);
}return g;
},escapeRegexpChars:function(a){return a.replace(/([.*+?^${}()|[\]\/\\])/g,u);
},toArray:function(B){return B.split(/\B|\b/g);
},stripTags:function(J){return J.replace(/<\/?[^>]+>/gi,x);
},stripScripts:function(N,O){var Q=x;
var P=N.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){Q+=arguments[1]+p;
return x;
});

if(O===true){qx.lang.Function.globalEval(Q);
}return P;
}}});
})();
(function(){var z="function",y="Boolean",x="qx.Interface",w="]",v="toggle",u="Interface",t="is",s="[Interface ";
qx.Class.define(x,{statics:{define:function(name,E){if(E){if(E.extend&&!(E.extend instanceof Array)){E.extend=[E.extend];
}{};
var F=E.statics?E.statics:{};
if(E.extend){F.$$extends=E.extend;
}
if(E.properties){F.$$properties=E.properties;
}
if(E.members){F.$$members=E.members;
}
if(E.events){F.$$events=E.events;
}}else{var F={};
}F.$$type=u;
F.name=name;
F.toString=this.genericToString;
F.basename=qx.Bootstrap.createNamespace(name,F);
qx.Interface.$$registry[name]=F;
return F;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(M){if(!M){return [];
}var N=M.concat();

for(var i=0,l=M.length;i<l;i++){if(M[i].$$extends){N.push.apply(N,this.flatten(M[i].$$extends));
}}return N;
},__bw:function(d,e,f,g){var m=f.$$members;

if(m){for(var k in m){if(qx.lang.Type.isFunction(m[k])){var j=this.__bx(e,k);
var h=j||qx.lang.Type.isFunction(d[k]);

if(!h){throw new Error('Implementation of method "'+k+'" is missing in class "'+e.classname+'" required by interface "'+f.name+'"');
}var n=g===true&&!j&&!qx.Class.hasInterface(e,f);

if(n){d[k]=this.__bA(f,d[k],k,m[k]);
}}else{if(typeof d[k]===undefined){if(typeof d[k]!==z){throw new Error('Implementation of member "'+k+'" is missing in class "'+e.classname+'" required by interface "'+f.name+'"');
}}}}}},__bx:function(G,H){var L=H.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!L){return false;
}var I=qx.lang.String.firstLow(L[2]);
var J=qx.Class.hasProperty(G,I);

if(!J){return false;
}var K=L[0]==t||L[0]==v;

if(K){return qx.Class.getPropertyDefinition(G,I).check==y;
}return true;
},__by:function(a,b){if(b.$$properties){for(var c in b.$$properties){if(!qx.Class.hasProperty(a,c)){throw new Error('The property "'+c+'" is not supported by Class "'+a.classname+'"!');
}}}},__bz:function(O,P){if(P.$$events){for(var Q in P.$$events){if(!qx.Class.supportsEvent(O,Q)){throw new Error('The event "'+Q+'" is not supported by Class "'+O.classname+'"!');
}}}},assertObject:function(o,p){var r=o.constructor;
this.__bw(o,r,p,false);
this.__by(r,p);
this.__bz(r,p);
var q=p.$$extends;

if(q){for(var i=0,l=q.length;i<l;i++){this.assertObject(o,q[i]);
}}},assert:function(A,B,C){this.__bw(A.prototype,A,B,C);
this.__by(A,B);
this.__bz(A,B);
var D=B.$$extends;

if(D){for(var i=0,l=D.length;i<l;i++){this.assert(A,D[i],C);
}}},genericToString:function(){return s+this.name+w;
},$$registry:{},__bA:function(){},__bB:null,__bC:function(){}}});
})();
(function(){var d="qx.event.IEventHandler";
qx.Interface.define(d,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(h,i){},registerEvent:function(a,b,c){},unregisterEvent:function(e,f,g){}}});
})();
(function(){var o="__gm",n="qx.event.handler.Appear",m="__gn",l="disappear",k="appear";
qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){arguments.callee.base.call(this);
this.__gm=u;
this.__gn={};
qx.event.handler.Appear.__go[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__go:{},refresh:function(){var g=this.__go;

for(var h in g){g[h].refresh();
}}},members:{__gm:null,__gn:null,canHandleEvent:function(i,j){},registerEvent:function(v,w,x){var y=qx.core.ObjectRegistry.toHashCode(v);
var z=this.__gn;

if(z&&!z[y]){z[y]=v;
v.$$displayed=v.offsetWidth>0;
}},unregisterEvent:function(b,c,d){var e=qx.core.ObjectRegistry.toHashCode(b);
var f=this.__gn;

if(!f){return;
}
if(f[e]){delete f[e];
b.$$displayed=null;
}},refresh:function(){var s=this.__gn;
var t;

for(var r in s){t=s[r];
var p=t.offsetWidth>0;

if((!!t.$$displayed)!==p){t.$$displayed=p;
var q=qx.event.Registration.createEvent(p?k:l);
this.__gm.dispatchEvent(t,q);
}}}},destruct:function(){this._disposeFields(o,m);
delete qx.event.handler.Appear.__go[this.$$hash];
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var b="CSS1Compat",a="qx.bom.client.Feature";
qx.Bootstrap.define(a,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:false,VML:false,XPATH:false,AIR:false,GEARS:false,SSL:false,__cz:function(){this.QUIRKS_MODE=this.__cA();
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
},__cA:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==b;
}}},defer:function(c){c.__cz();
}});
})();
(function(){var s="/",r="mshtml",q="qx.client",p="",o="?",n="string",m="qx.util.ResourceManager",l="singleton",k="qx.isSource";
qx.Class.define(m,{extend:qx.core.Object,type:l,statics:{__cB:qx.$$resources||{},__cC:{}},members:{has:function(u){return !!arguments.callee.self.__cB[u];
},getData:function(t){return arguments.callee.self.__cB[t]||null;
},getImageWidth:function(v){var w=arguments.callee.self.__cB[v];
return w?w[0]:null;
},getImageHeight:function(i){var j=arguments.callee.self.__cB[i];
return j?j[1]:null;
},getImageFormat:function(g){var h=arguments.callee.self.__cB[g];
return h?h[2]:null;
},isClippedImage:function(a){var b=arguments.callee.self.__cB[a];
return b&&b.length>4;
},toUri:function(c){if(c==null){return c;
}var d=arguments.callee.self.__cB[c];

if(!d){return c;
}
if(typeof d===n){var f=d;
}else{var f=d[3];
if(!f){return c;
}}var e=p;

if(qx.core.Variant.isSet(q,r)&&qx.bom.client.Feature.SSL){e=arguments.callee.self.__cC[f];
}return e+qx.$$libraries[f].resourceUri+s+c;
}},defer:function(x){if(qx.core.Variant.isSet(q,r)){if(qx.bom.client.Feature.SSL){for(var B in qx.$$libraries){var z=qx.$$libraries[B].resourceUri;
if(z.match(/^\/\//)!=null){x.__cC[B]=window.location.protocol;
}else if(z.match(/^\.\//)!=null&&qx.core.Setting.get(k)){var y=document.URL;
x.__cC[B]=y.substring(0,y.lastIndexOf(s));
}else if(z.match(/^http/)!=null){}else{var C=window.location.href.indexOf(o);
var A;

if(C==-1){A=window.location.href;
}else{A=window.location.href.substring(0,C);
}x.__cC[B]=A.substring(0,A.lastIndexOf(s)+1);
}}}}}});
})();
(function(){var i="__hP",h="abstract",g="qx.ui.layout.Abstract",f="__hO";
qx.Class.define(g,{type:h,extend:qx.core.Object,members:{__hO:null,_invalidChildrenCache:null,__hP:null,invalidateLayoutCache:function(){this.__hO=null;
},renderLayout:function(b,c){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__hO){return this.__hO;
}return this.__hO=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(a){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var j=this.__hP;

if(j instanceof qx.ui.core.LayoutItem){j.clearSeparators();
}},_renderSeparator:function(d,e){this.__hP.renderSeparator(d,e);
},connectToWidget:function(k){if(k&&this.__hP){throw new Error("It is not possible to manually set the connected widget.");
}this.__hP=k;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__hP;
},_applyLayoutChange:function(){if(this.__hP){this.__hP.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__hP.getLayoutChildren();
}},destruct:function(){this._disposeFields(i,f);
}});
})();
(function(){var v="bottom",u="_applyLayoutChange",t="top",s="left",r="right",q="middle",p="center",o="qx.ui.layout.Atom",n="Integer",m="Boolean";
qx.Class.define(o,{extend:qx.ui.layout.Abstract,properties:{gap:{check:n,init:4,apply:u},iconPosition:{check:[s,t,r,v],init:s,apply:u},center:{check:m,init:false,apply:u}},members:{verifyLayoutProperty:null,renderLayout:function(w,x){var G=qx.ui.layout.Util;
var z=this.getIconPosition();
var C=this._getLayoutChildren();
var length=C.length;
var Q,top,P,A;
var L,F;
var J=this.getGap();
var O=this.getCenter();
if(z===v||z===r){var H=length-1;
var D=-1;
var B=-1;
}else{var H=0;
var D=length;
var B=1;
}if(z==t||z==v){if(O){var K=0;

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
Q=G.computeHorizontalAlignOffset(p,P,w);
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
}top=G.computeVerticalAlignOffset(q,F.height,x);
L.renderLayout(Q,top,P,A);
if(P>0){Q+=P+J;
}}}},_computeSizeHint:function(){var l=this._getLayoutChildren();
var length=l.length;
var c,j;
if(length===1){var c=l[0].getSizeHint();
j={width:c.width,height:c.height,minWidth:c.minWidth,minHeight:c.minHeight};
}else{var g=0,h=0;
var d=0,f=0;
var e=this.getIconPosition();
var k=this.getGap();

if(e===t||e===v){var a=0;

for(var i=0;i<length;i++){c=l[i].getSizeHint();
h=Math.max(h,c.width);
g=Math.max(g,c.minWidth);
if(c.height>0){f+=c.height;
d+=c.minHeight;
a++;
}}
if(a>1){var b=(a-1)*k;
f+=b;
d+=b;
}}else{var a=0;

for(var i=0;i<length;i++){c=l[i].getSizeHint();
f=Math.max(f,c.height);
d=Math.max(d,c.minHeight);
if(c.width>0){h+=c.width;
g+=c.minWidth;
a++;
}}
if(a>1){var b=(a-1)*k;
h+=b;
g+=b;
}}j={minWidth:g,width:h,minHeight:d,height:f};
}return j;
}}});
})();
(function(){var g="object",f="_applyTheme",e="__cx",d="qx.theme.manager.Decoration",c="Theme",b="string",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:f}},members:{__cx:null,resolve:function(h){if(!h){return null;
}
if(typeof h===g){return h;
}var k=this.getTheme();

if(!k){return null;
}var k=this.getTheme();

if(!k){return null;
}var l=this.__cx;

if(!l){l=this.__cx={};
}var i=l[h];

if(i){return i;
}var j=k.decorations[h];

if(!j){return null;
}var m=j.decorator;

if(m==null){throw new Error("Missing definition of which decorator to use in entry: "+h+"!");
}return l[h]=(new m).set(j.style);
},isValidPropertyValue:function(p){if(typeof p===b){return this.isDynamic(p);
}else if(typeof p===g){var q=p.constructor;
return qx.Class.hasInterface(q,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(n){if(!n){return false;
}var o=this.getTheme();

if(!o){return false;
}return !!o.decorations[n];
},_applyTheme:function(r,s){var u=qx.util.AliasManager.getInstance();

if(s){for(var t in s.aliases){u.remove(t);
}}
if(r){for(var t in r.aliases){u.add(t,r.aliases[t]);
}}
if(!r){this.__cx={};
}}},destruct:function(){this._disposeMap(e);
}});
})();
(function(){var y="qx.client",x="",w="boxSizing",v="cursor",u="opacity",t="clip",s="overflowY",r="overflowX",q="user-select",p="userSelect",bb="appearance",ba="style",Y="MozUserModify",X="px",W="-webkit-appearance",V="styleFloat",U="-webkit-user-select",T="-moz-appearance",S="pixelHeight",R="MozAppearance",F=":",G="pixelTop",D="pixelLeft",E="text-overflow",B="-moz-user-select",C="MozUserSelect",z="qx.bom.element.Style",A="-moz-user-modify",H="-webkit-user-modify",I="WebkitUserSelect",L="-o-text-overflow",K="pixelRight",N="cssFloat",M="pixelWidth",P="pixelBottom",O=";",J="WebkitUserModify",Q="WebkitAppearance";
qx.Class.define(z,{statics:{__cN:{styleNames:{"float":qx.core.Variant.select(y,{"mshtml":V,"default":N}),"appearance":qx.core.Variant.select(y,{"gecko":R,"webkit":Q,"default":bb}),"userSelect":qx.core.Variant.select(y,{"gecko":C,"webkit":I,"default":p}),"userModify":qx.core.Variant.select(y,{"gecko":Y,"webkit":J,"default":p})},cssNames:{"appearance":qx.core.Variant.select(y,{"gecko":T,"webkit":W,"default":bb}),"userSelect":qx.core.Variant.select(y,{"gecko":B,"webkit":U,"default":q}),"userModify":qx.core.Variant.select(y,{"gecko":A,"webkit":H,"default":q}),"textOverflow":qx.core.Variant.select(y,{"opera":L,"default":E})},mshtmlPixel:{width:M,height:S,left:D,right:K,top:G,bottom:P},special:{clip:1,cursor:1,opacity:1,boxSizing:1,overflowX:1,overflowY:1}},__cO:{},compile:function(a){var e=[];
var i=this.__cN;
var h=i.special;
var f=i.cssNames;
var d=this.__cO;
var g=qx.lang.String;
var name,c,b;

for(name in a){b=a[name];

if(b==null){continue;
}name=f[name]||name;
if(h[name]){switch(name){case t:e.push(qx.bom.element.Clip.compile(b));
break;
case v:e.push(qx.bom.element.Cursor.compile(b));
break;
case u:e.push(qx.bom.element.Opacity.compile(b));
break;
case w:e.push(qx.bom.element.BoxSizing.compile(b));
break;
case r:e.push(qx.bom.element.Overflow.compileX(b));
break;
case s:e.push(qx.bom.element.Overflow.compileY(b));
break;
}}else{c=d[name];

if(!c){c=d[name]=g.hyphenate(name);
}e.push(c,F,b,O);
}}return e.join(x);
},setCss:qx.core.Variant.select(y,{"mshtml":function(bv,bw){bv.style.cssText=bw;
},"default":function(bl,bm){bl.setAttribute(ba,bm);
}}),getCss:qx.core.Variant.select(y,{"mshtml":function(bc){return bc.style.cssText.toLowerCase();
},"default":function(bq){return bq.getAttribute(ba);
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(br,name,bs,bt){{};
var bu=this.__cN;
name=bu.styleNames[name]||name;
if(bt!==false&&bu.special[name]){switch(name){case t:return qx.bom.element.Clip.set(br,bs);
case v:return qx.bom.element.Cursor.set(br,bs);
case u:return qx.bom.element.Opacity.set(br,bs);
case w:return qx.bom.element.BoxSizing.set(br,bs);
case r:return qx.bom.element.Overflow.setX(br,bs);
case s:return qx.bom.element.Overflow.setY(br,bs);
}}br.style[name]=bs!==null?bs:x;
},setStyles:function(bn,bo,bp){{};

for(var name in bo){this.set(bn,name,bo[name],bp);
}},reset:function(bx,name,by){var bz=this.__cN;
name=bz.styleNames[name]||name;
if(by!==false&&bz.special[name]){switch(name){case t:return qx.bom.element.Clip.reset(bx);
case v:return qx.bom.element.Cursor.reset(bx);
case u:return qx.bom.element.Opacity.reset(bx);
case w:return qx.bom.element.BoxSizing.reset(bx);
case r:return qx.bom.element.Overflow.resetX(bx);
case s:return qx.bom.element.Overflow.resetY(bx);
}}bx.style[name]=x;
},get:qx.core.Variant.select(y,{"mshtml":function(bd,name,be,bf){var bk=this.__cN;
name=bk.styleNames[name]||name;
if(bf!==false&&bk.special[name]){switch(name){case t:return qx.bom.element.Clip.get(bd,be);
case v:return qx.bom.element.Cursor.get(bd,be);
case u:return qx.bom.element.Opacity.get(bd,be);
case w:return qx.bom.element.BoxSizing.get(bd,be);
case r:return qx.bom.element.Overflow.getX(bd,be);
case s:return qx.bom.element.Overflow.getY(bd,be);
}}if(!bd.currentStyle){return bd.style[name]||x;
}switch(be){case this.LOCAL_MODE:return bd.style[name]||x;
case this.CASCADED_MODE:return bd.currentStyle[name]||x;
default:var bj=bd.currentStyle[name]||x;
if(/^-?[\.\d]+(px)?$/i.test(bj)){return bj;
}var bi=bk.mshtmlPixel[name];

if(bi){var bg=bd.style[name];
bd.style[name]=bj||0;
var bh=bd.style[bi]+X;
bd.style[name]=bg;
return bh;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(bj)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return bj;
}},"default":function(j,name,k,l){var o=this.__cN;
name=o.styleNames[name]||name;
if(l!==false&&o.special[name]){switch(name){case t:return qx.bom.element.Clip.get(j,k);
case v:return qx.bom.element.Cursor.get(j,k);
case u:return qx.bom.element.Opacity.get(j,k);
case w:return qx.bom.element.BoxSizing.get(j,k);
case r:return qx.bom.element.Overflow.getX(j,k);
case s:return qx.bom.element.Overflow.getY(j,k);
}}switch(k){case this.LOCAL_MODE:return j.style[name]||x;
case this.CASCADED_MODE:if(j.currentStyle){return j.currentStyle[name]||x;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var m=qx.dom.Node.getDocument(j);
var n=m.defaultView.getComputedStyle(j,null);
return n?n[name]:x;
}}})}});
})();
(function(){var p="",o="underline",n="Boolean",m="px",k='"',j="italic",h="normal",g="bold",f="_applyItalic",e="_applyBold",B="Integer",A="_applyFamily",z="_applyLineHeight",y="Array",x="overline",w="line-through",v="qx.bom.Font",u="Number",t="_applyDecoration",s=" ",q="_applySize",r=",";
qx.Class.define(v,{extend:qx.core.Object,construct:function(a,b){arguments.callee.base.call(this);

if(a!==undefined){this.setSize(a);
}
if(b!==undefined){this.setFamily(b);
}},statics:{fromString:function(P){var T=new qx.bom.Font();
var R=P.split(/\s+/);
var name=[];
var S;

for(var i=0;i<R.length;i++){switch(S=R[i]){case g:T.setBold(true);
break;
case j:T.setItalic(true);
break;
case o:T.setDecoration(o);
break;
default:var Q=parseInt(S,10);

if(Q==S||qx.lang.String.contains(S,m)){T.setSize(Q);
}else{name.push(S);
}break;
}}
if(name.length>0){T.setFamily(name);
}return T;
},fromConfig:function(C){var D=new qx.bom.Font;
D.set(C);
return D;
},__dh:{fontFamily:p,fontSize:p,fontWeight:p,fontStyle:p,textDecoration:p,lineHeight:1.2},getDefaultStyles:function(){return this.__dh;
}},properties:{size:{check:B,nullable:true,apply:q},lineHeight:{check:u,nullable:true,apply:z},family:{check:y,nullable:true,apply:A},bold:{check:n,nullable:true,apply:e},italic:{check:n,nullable:true,apply:f},decoration:{check:[o,w,x],nullable:true,apply:t}},members:{__di:null,__dj:null,__dk:null,__dl:null,__dm:null,__dn:null,_applySize:function(c,d){this.__di=c===null?null:c+m;
},_applyLineHeight:function(G,H){this.__dn=G===null?null:G;
},_applyFamily:function(K,L){var M=p;

for(var i=0,l=K.length;i<l;i++){if(K[i].indexOf(s)>0){M+=k+K[i]+k;
}else{M+=K[i];
}
if(i!==l-1){M+=r;
}}this.__dj=M;
},_applyBold:function(I,J){this.__dk=I===null?null:I?g:h;
},_applyItalic:function(N,O){this.__dl=N===null?null:N?j:h;
},_applyDecoration:function(E,F){this.__dm=E===null?null:E;
},getStyles:function(){return {fontFamily:this.__dj,fontSize:this.__di,fontWeight:this.__dk,fontStyle:this.__dl,textDecoration:this.__dm,lineHeight:this.__dn};
}}});
})();
(function(){var a="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this.getChildrenContainer().getChildren();
},hasChildren:function(){return this.getChildrenContainer().hasChildren();
},add:function(b,c){return this.getChildrenContainer().add(b,c);
},remove:function(l){return this.getChildrenContainer().remove(l);
},removeAll:function(){return this.getChildrenContainer().removeAll();
},indexOf:function(d){return this.getChildrenContainer().indexOf(d);
},addAt:function(i,j,k){this.getChildrenContainer().addAt(i,j,k);
},addBefore:function(e,f,g){this.getChildrenContainer().addBefore(e,f,g);
},addAfter:function(m,n,o){this.getChildrenContainer().addAfter(m,n,o);
},removeAt:function(h){this.getChildrenContainer().removeAt(h);
}}});
})();
(function(){var t="qx.client",s="",r="boxSizing",q="box-sizing",p=":",o="border-box",n="qx.bom.element.BoxSizing",m="KhtmlBoxSizing",k="-moz-box-sizing",j="WebkitBoxSizing",f=";",h="-khtml-box-sizing",g="content-box",e="-webkit-box-sizing",d="MozBoxSizing";
qx.Class.define(n,{statics:{__cQ:qx.core.Variant.select(t,{"mshtml":null,"webkit":[r,m,j],"gecko":[d],"opera":[r]}),__cR:qx.core.Variant.select(t,{"mshtml":null,"webkit":[q,h,e],"gecko":[k],"opera":[q]}),__cS:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__cT:function(F){var G=this.__cS;
return G.tags[F.tagName.toLowerCase()]||G.types[F.type];
},compile:qx.core.Variant.select(t,{"mshtml":function(D){{};
},"default":function(x){var z=this.__cR;
var y=s;

if(z){for(var i=0,l=z.length;i<l;i++){y+=z[i]+p+x+f;
}}return y;
}}),get:qx.core.Variant.select(t,{"mshtml":function(A){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(A))){if(!this.__cT(A)){return g;
}}return o;
},"default":function(u){var w=this.__cQ;
var v;

if(w){for(var i=0,l=w.length;i<l;i++){v=qx.bom.element.Style.get(u,w[i],null,false);

if(v!=null&&v!==s){return v;
}}}return s;
}}),set:qx.core.Variant.select(t,{"mshtml":function(B,C){{};
},"default":function(a,b){var c=this.__cQ;

if(c){for(var i=0,l=c.length;i<l;i++){a.style[c[i]]=b;
}}}}),reset:function(E){this.set(E,s);
}}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__cv=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cv:null,message:null,getComment:function(){return this.__cv;
},toString:function(){return this.__cv+c+this.message;
}}});
})();
(function(){var i="_originalTarget",h="_relatedTarget",g="qx.event.type.Event",f="_target",e="_currentTarget";
qx.Class.define(g,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(o,p){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!o;
this._cancelable=!!p;
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
},stop:function(){this.stopPropagation();
this.preventDefault();
},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(m){this._type=m;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(q){this._eventPhase=q;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(d){this._target=d;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(l){this._currentTarget=l;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(n){this._relatedTarget=n;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(j){this._originalTarget=j;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(k){this._bubbles=k;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(a){this._cancelable=a;
}},destruct:function(){this._disposeFields(f,e,h,i);
}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Bootstrap.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var j="qx.event.type.Native",i="_native",h="_returnValue";
qx.Class.define(j,{extend:qx.event.type.Event,members:{init:function(a,b,c,d,e){arguments.callee.base.call(this,d,e);
this._target=b||qx.bom.Event.getTarget(a);
this._relatedTarget=c||qx.bom.Event.getRelatedTarget(a);

if(a.timeStamp){this._timeStamp=a.timeStamp;
}this._native=a;
this._returnValue=null;
return this;
},clone:function(k){var l=arguments.callee.base.call(this,k);
var m={};
l._native=this._cloneNativeEvent(this._native,m);
l._returnValue=this._returnValue;
return l;
},_cloneNativeEvent:function(f,g){g.preventDefault=qx.lang.Function.empty;
return g;
},preventDefault:function(){arguments.callee.base.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(n){this._returnValue=n;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._disposeFields(i,h);
}});
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
(function(){var c="qx.event.type.KeySequence";
qx.Class.define(c,{extend:qx.event.type.Dom,members:{init:function(d,e,f){arguments.callee.base.call(this,d,e,null,true,true);
this._identifier=f;
return this;
},clone:function(a){var b=arguments.callee.base.call(this,a);
b._identifier=this._identifier;
return b;
},getKeyIdentifier:function(){return this._identifier;
}}});
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
(function(){var p="",o="g",n="$",m="qx.util.StringSplit",l="\\$&",k="^";
qx.Bootstrap.define(m,{statics:{split:function(a,b,c){var f=p;
if(b===undefined){return [a.toString()];
}else if(b===null||b.constructor!==RegExp){b=new RegExp(String(b).replace(/[.*+?^${}()|[\]\/\\]/g,l),o);
}else{f=b.toString().replace(/^[\S\s]+\//,p);

if(!b.global){b=new RegExp(b.source,o+f);
}}var e=new RegExp(k+b.source+n,f);
if(c===undefined||+c<0){c=false;
}else{c=Math.floor(+c);

if(!c){return [];
}}var h,g=[],d=0,i=0;

while((c?i++<=c:true)&&(h=b.exec(a))){if((h[0].length===0)&&(b.lastIndex>h.index)){b.lastIndex--;
}
if(b.lastIndex>d){if(h.length>1){h[0].replace(e,function(){for(var j=1;j<arguments.length-2;j++){if(arguments[j]===undefined){h[j]=undefined;
}}});
}g=g.concat(a.substring(d,h.index),(h.index===a.length?[]:h.slice(1)));
d=b.lastIndex;
}
if(h[0].length===0){b.lastIndex++;
}}return (d===a.length)?(b.test(p)?g:g.concat(p)):(c?g:g.concat(a.substring(d)));
}}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){arguments.callee.base.call(this);
this.__cf={};

if(c!==undefined){this.setSize(c);
}},properties:{size:{check:a,init:null,nullable:true}},members:{__cf:null,getObject:function(h){if(this.$$disposed){return;
}
if(!h){throw new Error("Class needs to be defined!");
}var j=null;
var k=this.__cf[h.classname];

if(k){j=k.pop();
}
if(j){j.$$pooled=false;
}else{j=new h;
}return j;
},poolObject:function(d){if(!this.__cf){return;
}var e=d.classname;
var f=this.__cf[e];

if(d.$$pooled){throw new Error("Object is already pooled: "+d);
}
if(!f){this.__cf[e]=f=[];
}var g=this.getSize()||Infinity;

if(f.length>g){this.warn("Cannot pool "+d+" because the pool is already full.");
d.dispose();
return;
}d.$$pooled=true;
f.push(d);
}},destruct:function(){var o=this.__cf;
var m,n,i,l;

for(m in o){n=o[m];

for(i=0,l=n.length;i<l;i++){n[i].dispose();
}}delete this.__cf;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){arguments.callee.base.call(this,30);
}});
})();
(function(){var s="number",r="qx.ui.layout.Canvas";
qx.Class.define(r,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(a,b){var o=this._getLayoutChildren();
var e,n,k;
var q,top,c,d,g,f;
var m,j,p,h;

for(var i=0,l=o.length;i<l;i++){e=o[i];
n=e.getSizeHint();
k=e.getLayoutProperties();
m=e.getMarginTop();
j=e.getMarginRight();
p=e.getMarginBottom();
h=e.getMarginLeft();
q=k.left!=null?k.left:k.edge;

if(qx.lang.Type.isString(q)){q=Math.round(parseFloat(q)*a/100);
}c=k.right!=null?k.right:k.edge;

if(qx.lang.Type.isString(c)){c=Math.round(parseFloat(c)*a/100);
}top=k.top!=null?k.top:k.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*b/100);
}d=k.bottom!=null?k.bottom:k.edge;

if(qx.lang.Type.isString(d)){d=Math.round(parseFloat(d)*b/100);
}if(q!=null&&c!=null){g=a-q-c-h-j;
if(g<n.minWidth){g=n.minWidth;
}else if(g>n.maxWidth){g=n.maxWidth;
}q+=h;
}else{g=k.width;

if(g==null){g=n.width;
}else{g=Math.round(parseFloat(g)*a/100);
if(g<n.minWidth){g=n.minWidth;
}else if(g>n.maxWidth){g=n.maxWidth;
}}
if(c!=null){q=a-g-c-j-h;
}else if(q==null){q=h;
}else{q+=h;
}}if(top!=null&&d!=null){f=b-top-d-m-p;
if(f<n.minHeight){f=n.minHeight;
}else if(f>n.maxHeight){f=n.maxHeight;
}top+=m;
}else{f=k.height;

if(f==null){f=n.height;
}else{f=Math.round(parseFloat(f)*b/100);
if(f<n.minHeight){f=n.minHeight;
}else if(f>n.maxHeight){f=n.maxHeight;
}}
if(d!=null){top=b-f-d-p-m;
}else if(top==null){top=m;
}else{top+=m;
}}e.renderLayout(q,top,g,f);
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

if(J&&typeof J===s){B+=J;
A+=J;
}u=G.right!=null?G.right:G.edge;

if(u&&typeof u===s){B+=u;
A+=u;
}I=Math.max(I,B);
H=Math.max(H,A);
z=v.height+C;
x=v.minHeight+C;
top=G.top!=null?G.top:G.edge;

if(top&&typeof top===s){z+=top;
x+=top;
}y=G.bottom!=null?G.bottom:G.edge;

if(y&&typeof y===s){z+=y;
x+=y;
}F=Math.max(F,z);
D=Math.max(D,x);
}return {width:I,minWidth:H,height:F,minHeight:D};
}}});
})();
(function(){var k="qx.ui.core.DecoratorFactory",j="__iO",i="$$nopool$$";
qx.Class.define(k,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__iO={};
},statics:{MAX_SIZE:15,__iP:i},members:{__iO:null,getDecoratorElement:function(c){var h=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(c)){var f=c;
var e=qx.theme.manager.Decoration.getInstance().resolve(c);
}else{var f=h.__iP;
e=c;
}var g=this.__iO;

if(g[f]&&g[f].length>0){return g[f].pop();
}else{var d=this._createDecoratorElement(e,f);
return d;
}},poolDecorator:function(l){if(!l){return;
}var o=qx.ui.core.DecoratorFactory;
var m=l.getId();

if(m==o.__iP){l.dispose();
return;
}var n=this.__iO;

if(!n[m]){n[m]=[];
}
if(n[m].length>o.MAX_SIZE){l.dispose();
}else{n[m].push(l);
}},_createDecoratorElement:function(p,q){var r=new qx.html.Decorator(p,q);
{};
return r;
},toString:function(){return arguments.callee.base.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var b=this.__iO;

for(var a in b){qx.util.DisposeUtil.disposeArray(b,a);
}}this._disposeFields(j);
}});
})();
(function(){var q="emulated",p="native",o='"',n="qx.lang.Core",m="\\\\",k="\\\"",j="[object Error]";
qx.Bootstrap.define(n,{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()==j)?q:p,{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?p:q,{"native":Array.prototype.indexOf,"emulated":function(a,b){if(b==null){b=0;
}else if(b<0){b=Math.max(0,this.length+b);
}
for(var i=b;i<this.length;i++){if(this[i]===a){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?p:q,{"native":Array.prototype.lastIndexOf,"emulated":function(u,v){if(v==null){v=this.length-1;
}else if(v<0){v=Math.max(0,this.length+v);
}
for(var i=v;i>=0;i--){if(this[i]===u){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?p:q,{"native":Array.prototype.forEach,"emulated":function(f,g){var l=this.length;

for(var i=0;i<l;i++){var h=this[i];

if(h!==undefined){f.call(g||window,h,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?p:q,{"native":Array.prototype.filter,"emulated":function(w,x){var y=[];
var l=this.length;

for(var i=0;i<l;i++){var z=this[i];

if(z!==undefined){if(w.call(x||window,z,i,this)){y.push(this[i]);
}}}return y;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?p:q,{"native":Array.prototype.map,"emulated":function(A,B){var C=[];
var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){C[i]=A.call(B||window,D,i,this);
}}return C;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?p:q,{"native":Array.prototype.some,"emulated":function(c,d){var l=this.length;

for(var i=0;i<l;i++){var e=this[i];

if(e!==undefined){if(c.call(d||window,e,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?p:q,{"native":Array.prototype.every,"emulated":function(r,s){var l=this.length;

for(var i=0;i<l;i++){var t=this[i];

if(t!==undefined){if(!r.call(s||window,t,i,this)){return false;
}}}return true;
}}),stringQuote:qx.lang.Object.select(String.prototype.quote?p:q,{"native":String.prototype.quote,"emulated":function(){return o+this.replace(/\\/g,m).replace(/\"/g,k)+o;
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
(function(){var n="indexOf",m="lastIndexOf",k="slice",j="concat",h="join",g="toLocaleUpperCase",f="shift",e="substr",d="filter",c="unshift",K="match",J="quote",I="qx.lang.Generics",H="localeCompare",G="sort",F="some",E="charAt",D="split",C="substring",B="pop",v="toUpperCase",w="replace",t="push",u="charCodeAt",q="every",r="reverse",o="search",p="forEach",x="map",y="toLowerCase",A="splice",z="toLocaleLowerCase";
qx.Bootstrap.define(I,{statics:{__bO:{"Array":[h,r,G,t,B,f,c,A,j,k,n,m,p,x,d,F,q],"String":[J,C,y,v,E,u,n,m,z,g,H,K,o,w,D,e,j,k]},__bP:function(a,b){return function(s){return a.prototype[b].apply(s,Array.prototype.slice.call(arguments,1));
};
},__bQ:function(){var L=qx.lang.Generics.__bO;

for(var P in L){var N=window[P];
var M=L[P];

for(var i=0,l=M.length;i<l;i++){var O=M[i];

if(!N[O]){N[O]=qx.lang.Generics.__bP(N,O);
}}}}},defer:function(Q){Q.__bQ();
}});
})();
(function(){var q="number",p="0",o="px",n=";",m="background-image:url(",l=");",k="",j=")",i="background-repeat:",h=" ",e="qx.bom.element.Background",g="url(",f="background-position:";
qx.Class.define(e,{statics:{__cD:[m,null,l,f,null,n,i,null,n],__cE:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__cF:function(a,top){var b=qx.bom.client.Engine;

if(b.GECKO&&b.VERSION<1.9&&a==top&&typeof a==q){top+=0.01;
}
if(a){var c=(typeof a==q)?a+o:a;
}else{c=p;
}
if(top){var d=(typeof top==q)?top+o:top;
}else{d=p;
}return c+h+d;
},compile:function(D,E,F,top){var G=this.__cF(F,top);
var H=qx.util.ResourceManager.getInstance().toUri(D);
var I=this.__cD;
I[1]=H;
I[4]=G;
I[7]=E;
return I.join(k);
},getStyles:function(r,s,t,top){if(!r){return this.__cE;
}var u=this.__cF(t,top);
var v=qx.util.ResourceManager.getInstance().toUri(r);
var w={backgroundPosition:u,backgroundImage:g+v+j};

if(s!=null){w.backgroundRepeat=s;
}return w;
},set:function(x,y,z,A,top){var B=this.getStyles(y,z,A,top);

for(var C in B){x.style[C]=B[C];
}}}});
})();
(function(){var i="qx.globalErrorHandling",h="on",g="qx.event.GlobalError";
qx.Bootstrap.define(g,{statics:{setErrorHandler:function(e,f){this.__bR=e||null;
this.__bS=f||window;

if(qx.core.Setting.get(i)===h){if(e&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__bT,this);
}
if(!e&&window.onerror){window.onerror=null;
}}},__bT:function(b,c,d){if(this.__bR){this.handleError(new qx.core.WindowError(b,c,d));
return true;
}},observeMethod:function(j){if(qx.core.Setting.get(i)===h){var self=this;
return function(){if(!self.__bR){return j.apply(this,arguments);
}
try{return j.apply(this,arguments);
}catch(l){self.handleError(l);
}};
}else{return j;
}},handleError:function(k){if(this.__bR){this.__bR.call(this.__bS,k);
}}},defer:function(a){qx.core.Setting.define(i,h);
a.setErrorHandler(null,null);
}});
})();
(function(){var d="__ew",c="__ev",b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__ev={};
this.__ew=qx.lang.Function.bind(this.__eA,this);
this.__ex=false;
},members:{__ey:null,__ez:null,__ev:null,__ex:null,__ew:null,schedule:function(g){if(this.__ey==null){this.__ey=window.setTimeout(this.__ew,0);
}var h=g.toHashCode();
if(this.__ez&&this.__ez[h]){return;
}this.__ev[h]=g;
this.__ex=true;
},cancel:function(e){var f=e.toHashCode();
if(this.__ez&&this.__ez[f]){this.__ez[f]=null;
return;
}delete this.__ev[f];
if(qx.lang.Object.isEmpty(this.__ev)&&this.__ey!=null){window.clearTimeout(this.__ey);
this.__ey=null;
}},__eA:qx.event.GlobalError.observeMethod(function(){this.__ey=null;
while(this.__ex){this.__ez=qx.lang.Object.clone(this.__ev);
this.__ev={};
this.__ex=false;

for(var j in this.__ez){var i=this.__ez[j];

if(i){this.__ez[j]=null;
i.call();
}}}this.__ez=null;
})},destruct:function(){if(this.__ey!=null){window.clearTimeout(this.__ey);
}this._disposeFields(d,c);
}});
})();
(function(){var d="qx.util.DeferredCall",c="__eD",b="__eC",a="__eB";
qx.Class.define(d,{extend:qx.core.Object,construct:function(e,f){arguments.callee.base.call(this);
this.__eB=e;
this.__eC=f||null;
this.__eD=qx.util.DeferredCallManager.getInstance();
},members:{__eB:null,__eC:null,__eD:null,cancel:function(){this.__eD.cancel(this);
},schedule:function(){this.__eD.schedule(this);
},call:function(){this.__eC?this.__eB.apply(this.__eC):this.__eB();
}},destruct:function(g,h){this.cancel();
this._disposeFields(b,a,c);
}});
})();
(function(){var dq="element",dp="qx.client",dn="div",dm="",dl="mshtml",dk="none",dj="scroll",di="__fb",dh="qx.html.Element",dg="|capture|",dP="activate",dO="blur",dN="__eT",dM="deactivate",dL="userSelect",dK="capture",dJ="releaseCapture",dI="__fd",dH="__eX",dG="__fa",dx="__eQ",dy="qxSelectable",dv="__eW",dw="__eL",dt="tabIndex",du="off",dr="focus",ds="__eU",dz="normal",dA="webkit",dC="__eY",dB="__eV",dE="|bubble|",dD="on",dF="__eP";
qx.Class.define(dh,{extend:qx.core.Object,construct:function(cs){arguments.callee.base.call(this);
this.__eE=cs||dn;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__eF:{},_scheduleFlush:function(dX){qx.html.Element.__fm.schedule();
},_mshtmlVisibilitySort:qx.core.Variant.select(dp,{"mshtml":function(a,b){var U=a.__eL;
var T=b.__eL;

if(U.contains(T)){return 1;
}
if(T.contains(U)){return -1;
}return 0;
},"default":null}),flush:function(){var cS;
{};
var cL=this.__eG();
var cK=cL.getFocus();

if(cK&&this.__eK(cK)){cL.blur(cK);
}var dc=cL.getActive();

if(dc&&this.__eK(dc)){qx.bom.Element.deactivate(dc);
}var cY=this.__eI();

if(cY&&this.__eK(cY)){qx.bom.Element.releaseCapture(cY);
}var cT=[];
var cV=this._modified;

for(var cR in cV){cS=cV[cR];
if(cS.__ff()){if(cS.__eL&&qx.dom.Hierarchy.isRendered(cS.__eL)){cT.push(cS);
}else{{};
cS.__fe();
}delete cV[cR];
}}
for(var i=0,l=cT.length;i<l;i++){cS=cT[i];
{};
cS.__fe();
}var cP=this._visibility;
if(qx.core.Variant.isSet(dp,dl)){var cU=[];

for(var cR in cP){cU.push(cP[cR]);
}if(cU.length>1){cU.sort(this._mshtmlVisibilitySort);
cP=this._visibility={};

for(var i=0;i<cU.length;i++){cS=cU[i];
cP[cS.$$hash]=cS;
}}}
for(var cR in cP){cS=cP[cR];
{};
cS.__eL.style.display=cS.__eO?dm:dk;
delete cP[cR];
}var scroll=this._scroll;

for(var cR in scroll){cS=scroll[cR];
var dd=cS.__eL;

if(dd&&dd.offsetWidth){var cN=true;
if(cS.__eR!=null){cS.__eL.scrollLeft=cS.__eR;
delete cS.__eR;
}if(cS.__eS!=null){cS.__eL.scrollTop=cS.__eS;
delete cS.__eS;
}var cX=cS.__eP;

if(cX!=null){var cQ=cX.element.getDomElement();

if(cQ&&cQ.offsetWidth){qx.bom.element.Scroll.intoViewX(cQ,dd,cX.align);
delete cS.__eP;
}else{cN=false;
}}var cO=cS.__eQ;

if(cO!=null){var cQ=cO.element.getDomElement();

if(cQ&&cQ.offsetWidth){qx.bom.element.Scroll.intoViewY(cQ,dd,cO.align);
delete cS.__eQ;
}else{cN=false;
}}if(cN){delete scroll[cR];
}}}var cM={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var da=this._actions[i];
var cW=da.element.__eL;

if(!cW||!cM[da.type]&&!da.element.__ff()){continue;
}qx.bom.Element[da.type](cW);
}this._actions=[];
for(var cR in this.__eF){var cJ=this.__eF[cR];
var dd=cJ.element.__eL;

if(dd){qx.bom.Selection.set(dd,cJ.start,cJ.end);
delete this.__eF[cR];
}}qx.event.handler.Appear.refresh();
},__eG:function(){if(!this.__eH){var bA=qx.event.Registration.getManager(window);
this.__eH=bA.getHandler(qx.event.handler.Focus);
}return this.__eH;
},__eI:function(){if(!this.__eJ){var cx=qx.event.Registration.getManager(window);
this.__eJ=cx.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__eJ.getCaptureElement();
},__eK:function(bt){var bu=qx.core.ObjectRegistry.fromHashCode(bt.$$element);
return bu&&!bu.__ff();
}},members:{__eE:null,__eL:null,__eM:false,__eN:true,__eO:true,__eP:null,__eQ:null,__eR:null,__eS:null,__eT:null,__eU:null,__eV:null,__eW:null,__eX:null,__eY:null,__fa:null,__fb:null,__fc:null,__fd:null,_scheduleChildrenUpdate:function(){if(this.__fc){return;
}this.__fc=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
},_createDomElement:function(){return qx.bom.Element.create(this.__eE);
},__fe:function(){{};
var C=this.__fb;

if(C){var length=C.length;
var D;

for(var i=0;i<length;i++){D=C[i];

if(D.__eO&&D.__eN&&!D.__eL){D.__fe();
}}}
if(!this.__eL){this.__eL=this._createDomElement();
this.__eL.$$element=this.$$hash;
this._copyData(false);

if(C&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fc){this._syncChildren();
}}delete this.__fc;
},_insertChildren:function(){var dY=this.__fb;
var length=dY.length;
var eb;

if(length>2){var ea=document.createDocumentFragment();

for(var i=0;i<length;i++){eb=dY[i];

if(eb.__eL&&eb.__eN){ea.appendChild(eb.__eL);
}}this.__eL.appendChild(ea);
}else{var ea=this.__eL;

for(var i=0;i<length;i++){eb=dY[i];

if(eb.__eL&&eb.__eN){ea.appendChild(eb.__eL);
}}}},_syncChildren:function(){var cm;
var cr=qx.core.ObjectRegistry;
var ci=this.__fb;
var cp=ci.length;
var cj;
var cn;
var cl=this.__eL;
var co=cl.childNodes;
var ck=0;
var cq;
{};
for(var i=co.length-1;i>=0;i--){cq=co[i];
cn=cr.fromHashCode(cq.$$element);

if(!cn||!cn.__eN||cn.__fd!==this){cl.removeChild(cq);
{};
}}for(var i=0;i<cp;i++){cj=ci[i];
if(cj.__eN){cn=cj.__eL;
cq=co[ck];

if(!cn){continue;
}if(cn!=cq){if(cq){cl.insertBefore(cn,cq);
}else{cl.appendChild(cn);
}{};
}ck++;
}}{};
},_copyData:function(V){var ba=this.__eL;
var Y=this.__eX;

if(Y){var W=qx.bom.element.Attribute;

for(var bb in Y){W.set(ba,bb,Y[bb]);
}}var Y=this.__eW;

if(Y){var X=qx.bom.element.Style;

if(V){for(var bb in Y){X.set(ba,bb,Y[bb]);
}}else{X.setCss(ba,X.compile(Y));
}}var Y=this.__eY;

if(Y){for(var bb in Y){this._applyProperty(bb,Y[bb]);
}}var Y=this.__fa;

if(Y){qx.event.Registration.getManager(ba).importListeners(ba,Y);
delete this.__fa;
}},_syncData:function(){var bP=this.__eL;
var bO=qx.bom.element.Attribute;
var bM=qx.bom.element.Style;
var bN=this.__eU;

if(bN){var bS=this.__eX;

if(bS){var bQ;

for(var bR in bN){bQ=bS[bR];

if(bQ!==undefined){bO.set(bP,bR,bQ);
}else{bO.reset(bP,bR);
}}}this.__eU=null;
}var bN=this.__eT;

if(bN){var bS=this.__eW;

if(bS){var bQ;

for(var bR in bN){bQ=bS[bR];

if(bQ!==undefined){bM.set(bP,bR,bQ);
}else{bM.reset(bP,bR);
}}}this.__eT=null;
}var bN=this.__eV;

if(bN){var bS=this.__eY;

if(bS){var bQ;

for(var bR in bN){this._applyProperty(bR,bS[bR]);
}}this.__eV=null;
}},__ff:function(){var bY=this;
while(bY){if(bY.__eM){return true;
}
if(!bY.__eN||!bY.__eO){return false;
}bY=bY.__fd;
}return false;
},__fg:function(ec){if(ec.__fd===this){throw new Error("Child is already in: "+ec);
}
if(ec.__eM){throw new Error("Root elements could not be inserted into other ones.");
}if(ec.__fd){ec.__fd.remove(ec);
}ec.__fd=this;
if(!this.__fb){this.__fb=[];
}if(this.__eL){this._scheduleChildrenUpdate();
}},__fh:function(dQ){if(dQ.__fd!==this){throw new Error("Has no child: "+dQ);
}if(this.__eL){this._scheduleChildrenUpdate();
}delete dQ.__fd;
},__fi:function(v){if(v.__fd!==this){throw new Error("Has no child: "+v);
}if(this.__eL){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fb||null;
},getChild:function(bf){var bg=this.__fb;
return bg&&bg[bf]||null;
},hasChildren:function(){var bj=this.__fb;
return bj&&bj[0]!==undefined;
},indexOf:function(bk){var bm=this.__fb;
return bm?bm.indexOf(bk):-1;
},hasChild:function(ca){var cb=this.__fb;
return cb&&cb.indexOf(ca)!==-1;
},add:function(E){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fg(arguments[i]);
}this.__fb.push.apply(this.__fb,arguments);
}else{this.__fg(E);
this.__fb.push(E);
}return this;
},addAt:function(bB,bC){this.__fg(bB);
qx.lang.Array.insertAt(this.__fb,bB,bC);
return this;
},remove:function(r){var s=this.__fb;

if(!s){return;
}
if(arguments[1]){var t;

for(var i=0,l=arguments.length;i<l;i++){t=arguments[i];
this.__fh(t);
qx.lang.Array.remove(s,t);
}}else{this.__fh(r);
qx.lang.Array.remove(s,r);
}return this;
},removeAt:function(ct){var cu=this.__fb;

if(!cu){throw new Error("Has no children!");
}var cv=cu[ct];

if(!cv){throw new Error("Has no child at this position!");
}this.__fh(cv);
qx.lang.Array.removeAt(this.__fb,ct);
return this;
},removeAll:function(){var bv=this.__fb;

if(bv){for(var i=0,l=bv.length;i<l;i++){this.__fh(bv[i]);
}bv.length=0;
}return this;
},getParent:function(){return this.__fd||null;
},insertInto:function(parent,bw){parent.__fg(this);

if(bw==null){parent.__fb.push(this);
}else{qx.lang.Array.insertAt(this.__fb,this,bw);
}return this;
},insertBefore:function(cw){var parent=cw.__fd;
parent.__fg(this);
qx.lang.Array.insertBefore(parent.__fb,this,cw);
return this;
},insertAfter:function(ch){var parent=ch.__fd;
parent.__fg(this);
qx.lang.Array.insertAfter(parent.__fb,this,ch);
return this;
},moveTo:function(P){var parent=this.__fd;
parent.__fi(this);
var Q=parent.__fb.indexOf(this);

if(Q===P){throw new Error("Could not move to same index!");
}else if(Q<P){P--;
}qx.lang.Array.removeAt(parent.__fb,Q);
qx.lang.Array.insertAt(parent.__fb,this,P);
return this;
},moveBefore:function(bs){var parent=this.__fd;
return this.moveTo(parent.__fb.indexOf(bs));
},moveAfter:function(bF){var parent=this.__fd;
return this.moveTo(parent.__fb.indexOf(bF)+1);
},free:function(){var parent=this.__fd;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__fb){return;
}parent.__fh(this);
qx.lang.Array.remove(parent.__fb,this);
return this;
},getDomElement:function(){return this.__eL||null;
},getNodeName:function(){return this.__eE;
},setNodeName:function(name){this.__eE=name;
},setRoot:function(bz){this.__eM=bz;
},useMarkup:function(R){if(this.__eL){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(dp,dl)){var S=document.createElement(dn);
}else{var S=qx.html.Element.__fj;

if(!S){S=qx.html.Element.__fj=document.createElement(dn);
}}S.innerHTML=R;
this.__eL=S.firstChild;
this.__eL.$$element=this.$$hash;
this._copyData(true);
return this.__eL;
},useElement:function(u){if(this.__eL){throw new Error("Could not overwrite existing element!");
}this.__eL=u;
this.__eL.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var ce=this.getAttribute(dt);

if(ce>=1){return true;
}var cd=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(ce>=0&&cd[this.__eE]){return true;
}return false;
},setSelectable:function(dW){this.setAttribute(dy,dW?dD:du);
if(qx.core.Variant.isSet(dp,dA)){this.setStyle(dL,dW?dz:dk);
}},isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__eE];
},include:function(){if(this.__eN){return;
}delete this.__eN;

if(this.__fd){this.__fd._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__eN){return;
}this.__eN=false;

if(this.__fd){this.__fd._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__eN===true;
},show:function(){if(this.__eO){return;
}
if(this.__eL){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}if(this.__fd){this.__fd._scheduleChildrenUpdate();
}delete this.__eO;
},hide:function(){if(!this.__eO){return;
}
if(this.__eL){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}this.__eO=false;
},isVisible:function(){return this.__eO===true;
},scrollChildIntoViewX:function(cE,cF,cG){var cH=this.__eL;
var cI=cE.getDomElement();

if(cG!==false&&cH&&cH.offsetWidth&&cI&&cI.offsetWidth){qx.bom.element.Scroll.intoViewX(cI,cH,cF);
}else{this.__eP={element:cE,align:cF};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}delete this.__eR;
},scrollChildIntoViewY:function(bn,bo,bp){var bq=this.__eL;
var br=bn.getDomElement();

if(bp!==false&&bq&&bq.offsetWidth&&br&&br.offsetWidth){qx.bom.element.Scroll.intoViewY(br,bq,bo);
}else{this.__eQ={element:bn,align:bo};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}delete this.__eS;
},scrollToX:function(x,dU){var dV=this.__eL;

if(dU!==true&&dV&&dV.offsetWidth){dV.scrollLeft=x;
}else{this.__eR=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}delete this.__eP;
},getScrollX:function(){var de=this.__eL;

if(de){return de.scrollLeft;
}return this.__eR||0;
},scrollToY:function(y,g){var h=this.__eL;

if(g!==true&&h&&h.offsetWidth){h.scrollTop=y;
}else{this.__eS=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}delete this.__eQ;
},getScrollY:function(){var bX=this.__eL;

if(bX){return bX.scrollTop;
}return this.__eS||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(dj,this.__fk,this);
},enableScrolling:function(){this.removeListener(dj,this.__fk,this);
},__iQ:null,__fk:function(e){if(!this.__iQ){this.__iQ=true;
this.__eL.scrollTop=0;
this.__eL.scrollLeft=0;
delete this.__iQ;
}},getTextSelection:function(){var bW=this.__eL;

if(bW){return qx.bom.Selection.get(bW);
}return null;
},getTextSelectionLength:function(){var cc=this.__eL;

if(cc){return qx.bom.Selection.getLength(cc);
}return null;
},setTextSelection:function(k,m){var n=this.__eL;

if(n){qx.bom.Selection.set(n,k,m);
return;
}qx.html.Element.__eF[this.toHashCode()]={element:this,start:k,end:m};
qx.html.Element._scheduleFlush(dq);
},clearTextSelection:function(){var B=this.__eL;

if(B){qx.bom.Selection.clear(B);
}delete qx.html.Element.__eF[this.toHashCode()];
},__fl:function(bx){var by=qx.html.Element._actions;
by.push({type:bx,element:this});
qx.html.Element._scheduleFlush(dq);
},focus:function(){this.__fl(dr);
},blur:function(){this.__fl(dO);
},activate:function(){this.__fl(dP);
},deactivate:function(){this.__fl(dM);
},capture:function(){this.__fl(dK);
},releaseCapture:function(){this.__fl(dJ);
},setStyle:function(o,p,q){if(!this.__eW){this.__eW={};
}
if(this.__eW[o]==p){return;
}
if(p==null){delete this.__eW[o];
}else{this.__eW[o]=p;
}if(this.__eL){if(q){qx.bom.element.Style.set(this.__eL,o,p);
return this;
}if(!this.__eT){this.__eT={};
}this.__eT[o]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}return this;
},setStyles:function(c,d){for(var f in c){this.setStyle(f,c[f],d);
}return this;
},removeStyle:function(bh,bi){this.setStyle(bh,null,bi);
},getStyle:function(dT){return this.__eW?this.__eW[dT]:null;
},getAllStyles:function(){return this.__eW||null;
},setAttribute:function(bc,bd,be){if(!this.__eX){this.__eX={};
}
if(this.__eX[bc]==bd){return;
}
if(bd==null){delete this.__eX[bc];
}else{this.__eX[bc]=bd;
}if(this.__eL){if(be){qx.bom.element.Attribute.set(this.__eL,bc,bd);
return this;
}if(!this.__eU){this.__eU={};
}this.__eU[bc]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}return this;
},setAttributes:function(M,N){for(var O in M){this.setAttribute(O,M[O],N);
}return this;
},removeAttribute:function(dR,dS){this.setAttribute(dR,null,dS);
},getAttribute:function(bE){return this.__eX?this.__eX[bE]:null;
},_applyProperty:function(name,df){},_setProperty:function(bT,bU,bV){if(!this.__eY){this.__eY={};
}
if(this.__eY[bT]==bU){return;
}
if(bU==null){delete this.__eY[bT];
}else{this.__eY[bT]=bU;
}if(this.__eL){if(bV){this._applyProperty(bT,bU);
return this;
}if(!this.__eV){this.__eV={};
}this.__eV[bT]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dq);
}return this;
},_removeProperty:function(cf,cg){this._setProperty(cf,null,cg);
},_getProperty:function(w){var z=this.__eY;

if(!z){return null;
}var A=z[w];
return A==null?null:A;
},addListener:function(cy,cz,self,cA){var cB;

if(this.$$disposed){return null;
}{};

if(this.__eL){return qx.event.Registration.addListener(this.__eL,cy,cz,self,cA);
}
if(!this.__fa){this.__fa={};
}
if(cA==null){cA=false;
}var cC=qx.event.Manager.getNextUniqueId();
var cD=cy+(cA?dg:dE)+cC;
this.__fa[cD]={type:cy,listener:cz,self:self,capture:cA,unique:cC};
return cD;
},removeListener:function(F,G,self,H){var I;

if(this.$$disposed){return null;
}{};

if(this.__eL){qx.event.Registration.removeListener(this.__eL,F,G,self,H);
}else{var K=this.__fa;
var J;

if(H==null){H=false;
}
for(var L in K){J=K[L];
if(J.listener===G&&J.self===self&&J.capture===H&&J.type===F){delete K[L];
break;
}}}return this;
},removeListenerById:function(j){if(this.$$disposed){return null;
}
if(this.__eL){qx.event.Registration.removeListenerById(this.__eL,j);
}else{delete this.__fa[j];
}return this;
},hasListener:function(bG,bH){if(this.$$disposed){return false;
}
if(this.__eL){return qx.event.Registration.hasListener(this.__eL,bG,bH);
}var bJ=this.__fa;
var bI;

if(bH==null){bH=false;
}
for(var bK in bJ){bI=bJ[bK];
if(bI.capture===bH&&bI.type===bG){return true;
}}return false;
}},defer:function(bL){bL.__fm=new qx.util.DeferredCall(bL.flush,bL);
},destruct:function(){var bD=this.__eL;

if(bD){qx.event.Registration.getManager(bD).removeAllListeners(bD);
bD.$$element=dm;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fd;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(di);
this._disposeFields(dH,dv,dG,dC,ds,dN,dB,dw,dI,dF,dx);
}});
})();
(function(){var j="string",i="_applyTheme",h="__dp",g="__do",f="qx.theme.manager.Appearance",e=":",d="Theme",c="changeTheme",b="/",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__do={};
this.__dp={};
},properties:{theme:{check:d,nullable:true,event:c,apply:i}},members:{__dq:{},__do:null,__dp:null,_applyTheme:function(B,C){this.__dp={};
this.__do={};
},__dr:function(D,E,F){var J=E.appearances;
var M=J[D];

if(!M){var N=b;
var G=[];
var L=D.split(N);
var K;

while(!M&&L.length>0){G.unshift(L.pop());
var H=L.join(N);
M=J[H];

if(M){K=M.alias||M;

if(typeof K===j){var I=K+N+G.join(N);
return this.__dr(I,E,F);
}}}if(F!=null){return this.__dr(F,E);
}return null;
}else if(typeof M===j){return this.__dr(M,E,F);
}else if(M.include&&!M.style){return this.__dr(M.include,E,F);
}return D;
},styleFrom:function(k,l,m,n){if(!m){m=this.getTheme();
}var t=this.__dp;
var o=t[k];

if(!o){o=t[k]=this.__dr(k,m,n);
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
}}var s=this.__do;

if(s[z]!==undefined){return s[z];
}if(!l){l=this.__dq;
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
}},destruct:function(){this._disposeFields(g,h);
}});
})();
(function(){var e="value",d="Please use the getValue() method instead.",c="qx.html.Label",b="Please use the setValue() method instead.";
qx.Class.define(c,{extend:qx.html.Element,members:{__hW:null,_applyProperty:function(name,f){arguments.callee.base.call(this,name,f);

if(name==e){var g=this.getDomElement();
qx.bom.Label.setValue(g,f);
}},_createDomElement:function(){var m=this.__hW;
var l=qx.bom.Label.create(this._content,m);
return l;
},_copyData:function(h){return arguments.callee.base.call(this,true);
},setRich:function(j){var k=this.getDomElement();

if(k){throw new Error("The label mode cannot be modified after initial creation");
}j=!!j;

if(this.__hW==j){return;
}this.__hW=j;
return this;
},setValue:function(a){this._setProperty(e,a);
return this;
},getValue:function(){return this._getProperty(e);
},setContent:function(i){qx.log.Logger.deprecatedMethodWarning(arguments.callee,b);
return this.setValue(i);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,d);
return this.getValue();
}}});
})();
(function(){var E="middle",D="qx.ui.layout.Util",C="left",B="center",A="top",z="bottom",y="right";
qx.Class.define(D,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(R,S,T){var V,ba,U,bb;
var W=S>T;
var bc=Math.abs(S-T);
var bd,X;
var Y={};

for(ba in R){V=R[ba];
Y[ba]={potential:W?V.max-V.value:V.value-V.min,flex:W?V.flex:1/V.flex,offset:0};
}while(bc!=0){bb=Infinity;
U=0;

for(ba in Y){V=Y[ba];

if(V.potential>0){U+=V.flex;
bb=Math.min(bb,V.potential/V.flex);
}}if(U==0){break;
}bb=Math.min(bc,bb*U)/U;
bd=0;

for(ba in Y){V=Y[ba];

if(V.potential>0){X=Math.min(bc,V.potential,Math.ceil(bb*V.flex));
bd+=X-bb*V.flex;

if(bd>=1){bd-=1;
X-=1;
}V.potential-=X;

if(W){V.offset+=X;
}else{V.offset-=X;
}bc-=X;
}}}return Y;
},computeHorizontalAlignOffset:function(F,G,H,I,J){if(I==null){I=0;
}
if(J==null){J=0;
}var K=0;

switch(F){case C:K=I;
break;
case y:K=H-G-J;
break;
case B:K=Math.round((H-G)/2);
if(K<I){K=I;
}else if(K<J){K=Math.max(I,H-G-J);
}break;
}return K;
},computeVerticalAlignOffset:function(e,f,g,h,j){if(h==null){h=0;
}
if(j==null){j=0;
}var k=0;

switch(e){case A:k=h;
break;
case z:k=g-f-j;
break;
case E:k=Math.round((g-f)/2);
if(k<h){k=h;
}else if(k<j){k=Math.max(h,g-f-j);
}break;
}return k;
},collapseMargins:function(a){var b=0,d=0;

for(var i=0,l=arguments.length;i<l;i++){var c=arguments[i];

if(c<0){d=Math.min(d,c);
}else if(c>0){b=Math.max(b,c);
}}return b+d;
},computeHorizontalGaps:function(bm,bn,bo){if(bn==null){bn=0;
}var bp=0;

if(bo){bp+=bm[0].getMarginLeft();

for(var i=1,l=bm.length;i<l;i+=1){bp+=this.collapseMargins(bn,bm[i-1].getMarginRight(),bm[i].getMarginLeft());
}bp+=bm[l-1].getMarginRight();
}else{for(var i=1,l=bm.length;i<l;i+=1){bp+=bm[i].getMarginLeft()+bm[i].getMarginRight();
}bp+=(bn*(l-1));
}return bp;
},computeVerticalGaps:function(m,n,o){if(n==null){n=0;
}var p=0;

if(o){p+=m[0].getMarginTop();

for(var i=1,l=m.length;i<l;i+=1){p+=this.collapseMargins(n,m[i-1].getMarginBottom(),m[i].getMarginTop());
}p+=m[l-1].getMarginBottom();
}else{for(var i=1,l=m.length;i<l;i+=1){p+=m[i].getMarginTop()+m[i].getMarginBottom();
}p+=(n*(l-1));
}return p;
},computeHorizontalSeparatorGaps:function(be,bf,bg){var bj=qx.theme.manager.Decoration.getInstance().resolve(bg);
var bi=bj.getInsets();
var bh=bi.left+bi.right;
var bk=0;

for(var i=0,l=be.length;i<l;i++){var bl=be[i];
bk+=bl.getMarginLeft()+bl.getMarginRight();
}bk+=(bf+bh+bf)*(l-1);
return bk;
},computeVerticalSeparatorGaps:function(q,r,s){var v=qx.theme.manager.Decoration.getInstance().resolve(s);
var u=v.getInsets();
var t=u.top+u.bottom;
var w=0;

for(var i=0,l=q.length;i<l;i++){var x=q[i];
w+=x.getMarginTop()+x.getMarginBottom();
}w+=(r+t+r)*(l-1);
return w;
},arrangeIdeals:function(L,M,N,O,P,Q){if(M<L||P<O){if(M<L&&P<O){M=L;
P=O;
}else if(M<L){P-=(L-M);
M=L;
if(P<O){P=O;
}}else if(P<O){M-=(O-P);
P=O;
if(M<L){M=L;
}}}
if(M>N||P>Q){if(M>N&&P>Q){M=N;
P=Q;
}else if(M>N){P+=(M-N);
M=N;
if(P>Q){P=Q;
}}else if(P>Q){M+=(P-Q);
P=Q;
if(M>N){M=N;
}}}return {begin:M,end:P};
}}});
})();
(function(){var c="qx.event.IEventDispatcher";
qx.Interface.define(c,{members:{canDispatchEvent:function(a,event,b){this.assertInstance(event,qx.event.type.Event);
this.assertString(b);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var c="abstract",b="qx.event.dispatch.AbstractBubbling";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:c,construct:function(v){this._manager=v;
},members:{_getParent:function(a){throw new Error("Missing implementation");
},canDispatchEvent:function(w,event,x){return event.getBubbles();
},dispatchEvent:function(d,event,e){var parent=d;
var p=this._manager;
var m,t;
var k;
var o,r;
var q;
var s=[];
m=p.getListeners(d,e,true);
t=p.getListeners(d,e,false);

if(m){s.push(m);
}
if(t){s.push(t);
}var parent=this._getParent(d);
var g=[];
var f=[];
var h=[];
var n=[];
while(parent!=null){m=p.getListeners(parent,e,true);

if(m){h.push(m);
n.push(parent);
}t=p.getListeners(parent,e,false);

if(t){g.push(t);
f.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=h.length-1;i>=0;i--){q=n[i];
event.setCurrentTarget(q);
k=h[i];

for(var j=0,l=k.length;j<l;j++){o=k[j];
r=o.context||q;
o.handler.call(r,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(d);

for(var i=0,u=s.length;i<u;i++){k=s[i];

for(var j=0,l=k.length;j<l;j++){o=k[j];
r=o.context||d;
o.handler.call(r,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,u=g.length;i<u;i++){q=f[i];
event.setCurrentTarget(q);
k=g[i];

for(var j=0,l=k.length;j<l;j++){o=k[j];
r=o.context||q;
o.handler.call(r,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var b="qx.event.dispatch.DomBubbling";
qx.Class.define(b,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(e){return e.parentNode;
},canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();
}},defer:function(a){qx.event.Registration.addDispatcher(a);
}});
})();
(function(){var x="Integer",w="_applyDimension",v="Boolean",u="_applyStretching",t="_applyMargin",s="shorthand",r="_applyAlign",q="allowShrinkY",p="__dI",o="__dM",R="__dK",Q="__dN",P="bottom",O="baseline",N="marginBottom",M="qx.ui.core.LayoutItem",L="center",K="marginTop",J="$$subparent",I="allowGrowX",E="middle",F="marginLeft",C="allowShrinkX",D="$$parent",A="top",B="right",y="marginRight",z="abstract",G="allowGrowY",H="left";
qx.Class.define(M,{type:z,extend:qx.core.Object,properties:{minWidth:{check:x,nullable:true,apply:w,init:null,themeable:true},width:{check:x,nullable:true,apply:w,init:null,themeable:true},maxWidth:{check:x,nullable:true,apply:w,init:null,themeable:true},minHeight:{check:x,nullable:true,apply:w,init:null,themeable:true},height:{check:x,nullable:true,apply:w,init:null,themeable:true},maxHeight:{check:x,nullable:true,apply:w,init:null,themeable:true},allowGrowX:{check:v,apply:u,init:true,themeable:true},allowShrinkX:{check:v,apply:u,init:true,themeable:true},allowGrowY:{check:v,apply:u,init:true,themeable:true},allowShrinkY:{check:v,apply:u,init:true,themeable:true},allowStretchX:{group:[I,C],mode:s,themeable:true},allowStretchY:{group:[G,q],mode:s,themeable:true},marginTop:{check:x,init:0,apply:t,themeable:true},marginRight:{check:x,init:0,apply:t,themeable:true},marginBottom:{check:x,init:0,apply:t,themeable:true},marginLeft:{check:x,init:0,apply:t,themeable:true},margin:{group:[K,y,N,F],mode:s,themeable:true},alignX:{check:[H,L,B],nullable:true,apply:r,themeable:true},alignY:{check:[A,E,P,O],nullable:true,apply:r,themeable:true}},members:{__dH:null,__dI:null,__dJ:null,__dK:null,__dL:null,__dM:null,__dN:null,getBounds:function(){return this.__dM||this.__dI||null;
},clearSeparators:function(){},renderSeparator:function(e,f){},renderLayout:function(g,top,h,i){var j;
{};
var k=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var k=this._getHeightForWidth(h);
}
if(k!=null&&k!==this.__dH){this.__dH=k;
qx.ui.core.queue.Layout.add(this);
return null;
}var m=this.__dI;

if(!m){m=this.__dI={};
}var l={};

if(g!==m.left||top!==m.top){l.position=true;
m.left=g;
m.top=top;
}
if(h!==m.width||i!==m.height){l.size=true;
m.width=h;
m.height=i;
}if(this.__dJ){l.local=true;
delete this.__dJ;
}
if(this.__dL){l.margin=true;
delete this.__dL;
}return l;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__dJ;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__dJ=true;
this.__dK=null;
},getSizeHint:function(bh){var bi=this.__dK;

if(bi){return bi;
}
if(bh===false){return null;
}bi=this.__dK=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__dH&&this.getHeight()==null){bi.height=this.__dH;
}if(!this.getAllowShrinkX()){bi.minWidth=Math.max(bi.minWidth,bi.width);
}else if(bi.minWidth>bi.width&&this.getAllowGrowX()){bi.width=bi.minWidth;
}
if(!this.getAllowShrinkY()){bi.minHeight=Math.max(bi.minHeight,bi.height);
}
if(bi.minHeight>bi.height&&this.getAllowGrowY()){bi.height=bi.minHeight;
}if(!this.getAllowGrowX()){bi.maxWidth=Math.min(bi.maxWidth,bi.width);
}
if(bi.width>bi.maxWidth){bi.width=bi.maxWidth;
}
if(!this.getAllowGrowY()){bi.maxHeight=Math.min(bi.maxHeight,bi.height);
}
if(bi.height>bi.maxHeight){bi.height=bi.maxHeight;
}return bi;
},_computeSizeHint:function(){var W=this.getMinWidth()||0;
var T=this.getMinHeight()||0;
var X=this.getWidth()||W;
var V=this.getHeight()||T;
var S=this.getMaxWidth()||Infinity;
var U=this.getMaxHeight()||Infinity;
return {minWidth:W,width:X,maxWidth:S,minHeight:T,height:V,maxHeight:U};
},_hasHeightForWidth:function(){var n=this._getLayout();

if(n){return n.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(c){var d=this._getLayout();

if(d&&d.hasHeightForWidth()){return d.getHeightForWidth(c);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__dL=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__dM;
},setUserBounds:function(Y,top,ba,bb){this.__dM={left:Y,top:top,width:ba,height:bb};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__dM;
qx.ui.core.queue.Layout.add(this);
},__dO:{},setLayoutProperties:function(be){if(be==null){return;
}var bf=this.__dN;

if(!bf){bf=this.__dN={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(be);
}for(var bg in be){if(be[bg]==null){delete bf[bg];
}else{bf[bg]=be[bg];
}}},getLayoutProperties:function(){return this.__dN||this.__dO;
},clearLayoutProperties:function(){delete this.__dN;
},updateLayoutProperties:function(bj){var bk=this._getLayout();

if(bk){var bl;
{};
bk.invalidateChildrenCache();
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
},clone:function(){var a=arguments.callee.base.call(this);
var b=this.__dN;

if(b){a.__dN=qx.lang.Object.clone(b);
}return a;
},serialize:function(){var bc=arguments.callee.base.call(this);
var bd=this.__dN;

if(bd){bc.layoutProperties=qx.lang.Object.clone(bd);
}return bc;
}},destruct:function(){this._disposeFields(D,J,Q,p,o,R);
}});
})();
(function(){var a="qx.locale.MTranslation";
qx.Mixin.define(a,{members:{tr:function(m,n){var o=qx.locale.Manager;

if(o){return o.tr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(d,e,f,g){var h=qx.locale.Manager;

if(h){return h.trn.apply(h,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(i,j,k){var l=qx.locale.Manager;

if(l){return l.trc.apply(l,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(b){var c=qx.locale.Manager;

if(c){return c.marktr.apply(c,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var fG="px",fF="Boolean",fE="qx.event.type.Mouse",fD="qx.event.type.Drag",fC="visible",fB="qx.event.type.Focus",fA="on",fz="Integer",fy="excluded",fx="qx.event.type.Data",fb="_applyPadding",fa="qx.event.type.Event",eY="zIndex",eX="hidden",eW="String",eV="tabIndex",eU="contextmenu",eT="backgroundColor",eS="focused",eR="changeVisibility",fN="mshtml",fO="hovered",fL="qx.event.type.KeySequence",fM="qx.client",fJ="absolute",fK="drag",fH="height",fI="div",fP="disabled",fQ="move",fq="__eb",fp="dragstart",fs="qx.dynlocale",fr="dragchange",fu="__dT",ft="position",fw="dragend",fv="resize",fo="Decorator",fn="width",dG="$$widget",dH="opacity",dI="default",dJ="Color",dK="__dU",dL="top",dM="left",dN="changeToolTipText",dO="beforeContextmenuOpen",dP="_applyNativeContextMenu",fU="__dP",fT="_applyBackgroundColor",fS="_applyFocusable",fR="changeShadow",fY="qx.event.type.KeyInput",fX="createChildControl",fW="__dQ",fV="Font",gb="_applyShadow",ga="__ei",eq="_applyEnabled",er="_applySelectable",eo="_applyKeepActive",ep="Number",eu="_applyVisibility",ev="repeat",es="qxDraggable",et="syncAppearance",em="paddingLeft",en="_applyDroppable",dX="#",dW="_applyCursor",ea="_applyDraggable",dY="__dY",dT="changeTextColor",dS="changeContextMenu",dV="paddingTop",dU="changeSelectable",dR="hideFocus",dQ="none",eB="outline",eC="_applyAppearance",eD="overflowX",eE="_applyOpacity",ew="url(",ey=")",ez="qx.ui.core.Widget",eA="_applyFont",eF="cursor",eG="qxDroppable",ei="changeZIndex",eh="overflowY",eg="changeEnabled",ef="changeFont",ee="_applyDecorator",ed="_applyZIndex",ec="_applyTextColor",eb="qx.ui.menu.Menu",ek="_applyToolTipText",ej="__ed",eH="true",eI="widget",eJ="changeDecorator",eK="__dV",eL="_applyTabIndex",eM="changeAppearance",eN="__el",eO="shorthand",eP="/",eQ="",ff="_applyContextMenu",fe="paddingBottom",fd="changeNativeContextMenu",fc="qx.ui.tooltip.ToolTip",fj="qxKeepActive",fi="_applyKeepFocus",fh="paddingRight",fg="changeBackgroundColor",fl="changeLocale",fk="qxKeepFocus",fm="qx/static/blank.gif";
qx.Class.define(ez,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__dP=this._createContainerElement();
this.__dQ=this.__ec();
this.__dP.add(this.__dQ);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:fa,disappear:fa,createChildControl:fx,resize:fx,move:fx,syncAppearance:fx,mousemove:fE,mouseover:fE,mouseout:fE,mousedown:fE,mouseup:fE,click:fE,dblclick:fE,contextmenu:fE,beforeContextmenuOpen:fE,mousewheel:fE,keyup:fL,keydown:fL,keypress:fL,keyinput:fY,focus:fB,blur:fB,focusin:fB,focusout:fB,activate:fB,deactivate:fB,capture:fa,losecapture:fa,drop:fD,dragleave:fD,dragover:fD,drag:fD,dragstart:fD,dragend:fD,dragchange:fD,droprequest:fD},properties:{paddingTop:{check:fz,init:0,apply:fb,themeable:true},paddingRight:{check:fz,init:0,apply:fb,themeable:true},paddingBottom:{check:fz,init:0,apply:fb,themeable:true},paddingLeft:{check:fz,init:0,apply:fb,themeable:true},padding:{group:[dV,fh,fe,em],mode:eO,themeable:true},zIndex:{nullable:true,init:null,apply:ed,event:ei,check:fz,themeable:true},decorator:{nullable:true,init:null,apply:ee,event:eJ,check:fo,themeable:true},shadow:{nullable:true,init:null,apply:gb,event:fR,check:fo,themeable:true},backgroundColor:{nullable:true,check:dJ,apply:fT,event:fg,themeable:true},textColor:{nullable:true,check:dJ,apply:ec,event:dT,themeable:true,inheritable:true},font:{nullable:true,apply:eA,check:fV,event:ef,themeable:true,inheritable:true},opacity:{check:ep,apply:eE,themeable:true,nullable:true,init:null},cursor:{check:eW,apply:dW,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:fc,nullable:true},toolTipText:{check:eW,nullable:true,event:dN,apply:ek},toolTipIcon:{check:eW,nullable:true,event:dN},blockToolTip:{check:fF,init:false},visibility:{check:[fC,eX,fy],init:fC,apply:eu,event:eR},enabled:{init:true,check:fF,inheritable:true,apply:eq,event:eg},anonymous:{init:false,check:fF},tabIndex:{check:fz,nullable:true,apply:eL},focusable:{check:fF,init:false,apply:fS},keepFocus:{check:fF,init:false,apply:fi},keepActive:{check:fF,init:false,apply:eo},draggable:{check:fF,init:false,apply:ea},droppable:{check:fF,init:false,apply:en},selectable:{check:fF,init:false,event:dU,apply:er},contextMenu:{check:eb,apply:ff,nullable:true,event:dS},nativeContextMenu:{check:fF,init:false,themeable:true,event:fd,apply:dP},appearance:{check:eW,init:eI,apply:eC,event:eM}},statics:{DEBUG:false,getWidgetByElement:function(a){try{while(a){var b=a.$$widget;
if(b!=null){return qx.core.ObjectRegistry.fromHashCode(b);
}a=a.parentNode;
}}catch(bL){}return null;
},contains:function(parent,ck){while(ck){if(parent==ck){return true;
}ck=ck.getLayoutParent();
}return false;
},__dR:new qx.ui.core.DecoratorFactory(),__dS:new qx.ui.core.DecoratorFactory()},members:{__dP:null,__dQ:null,__dT:null,__dU:null,__dV:null,__dW:null,__dX:null,__dY:null,_getLayout:function(){return this.__dY;
},_setLayout:function(dj){{};

if(this.__dY){this.__dY.connectToWidget(null);
}
if(dj){dj.connectToWidget(this);
}this.__dY=dj;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var cp=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(cp);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(cp);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},__ea:null,renderLayout:function(cq,top,cr,cs){var cz=arguments.callee.base.call(this,cq,top,cr,cs);
if(!cz){return;
}var cu=this.getContainerElement();
var content=this.getContentElement();
var cx=cz.size||this.__ea;
var cA=fG;
if(cz.position){cu.setStyle(dM,cq+cA);
cu.setStyle(dL,top+cA);
}if(cz.size){cu.setStyle(fn,cr+cA);
cu.setStyle(fH,cs+cA);
}
if(cx||cz.local||cz.margin){var ct=this.getInsets();
var innerWidth=cr-ct.left-ct.right;
var innerHeight=cs-ct.top-ct.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}
if(this.__ea){content.setStyle(dM,ct.left+cA);
content.setStyle(dL,ct.top+cA);
}
if(cx){content.setStyle(fn,innerWidth+cA);
content.setStyle(fH,innerHeight+cA);
}
if(cz.size){var cy=this.__dV;

if(cy){cy.setStyles({width:cr+fG,height:cs+fG});
}}
if(cz.size||this.__ea){if(this.__dT){this.__dT.resize(cr,cs);
}}
if(cz.size){if(this.__dU){var ct=this.__dU.getInsets();
var cw=cr+ct.left+ct.right;
var cv=cs+ct.top+ct.bottom;
this.__dU.resize(cw,cv);
}}
if(cx||cz.local||cz.margin){if(this.__dY&&this.hasLayoutChildren()){this.__dY.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(cz.position&&this.hasListener(fQ)){this.fireDataEvent(fQ,this.getBounds());
}
if(cz.size&&this.hasListener(fv)){this.fireDataEvent(fv,this.getBounds());
}delete this.__ea;
},__eb:null,clearSeparators:function(){var bV=this.__eb;

if(!bV){return;
}var bW=qx.ui.core.Widget.__dR;
var content=this.getContentElement();
var bU;

for(var i=0,l=bV.length;i<l;i++){bU=bV[i];
bW.poolDecorator(bU);
content.remove(bU);
}bV.length=0;
},renderSeparator:function(cO,cP){var cR=qx.ui.core.Widget.__dR.getDecoratorElement(cO);
this.getContentElement().add(cR);
cR.resize(cP.width,cP.height);
var cQ=cR.getDomElement().style;
cQ.left=cP.left+fG;
cQ.top=cP.top+fG;
if(!this.__eb){this.__eb=[cR];
}else{this.__eb.push(cR);
}},_computeSizeHint:function(){var o=this.getWidth();
var n=this.getMinWidth();
var h=this.getMaxWidth();
var m=this.getHeight();
var j=this.getMinHeight();
var k=this.getMaxHeight();
var p=this._getContentHint();
var g=this.getInsets();
var r=g.left+g.right;
var q=g.top+g.bottom;

if(o==null){o=p.width+r;
}
if(m==null){m=p.height+q;
}
if(n==null){n=r;

if(p.minWidth!=null){n+=p.minWidth;
}}
if(j==null){j=q;

if(p.minHeight!=null){j+=p.minHeight;
}}
if(h==null){if(p.maxWidth==null){h=Infinity;
}else{h=p.maxWidth+r;
}}
if(k==null){if(p.maxHeight==null){k=Infinity;
}else{k=p.maxHeight+q;
}}return {width:o,minWidth:n,maxWidth:h,height:m,minHeight:j,maxHeight:k};
},invalidateLayoutCache:function(){arguments.callee.base.call(this);

if(this.__dY){this.__dY.invalidateLayoutCache();
}},_getContentHint:function(){var x=this.__dY;

if(x){if(this.hasLayoutChildren()){var w;
var y=x.getSizeHint();
{};
return y;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(db){var df=this.getInsets();
var di=df.left+df.right;
var dh=df.top+df.bottom;
var dg=db-di;
var dd=this._getLayout();

if(dd&&dd.hasHeightForWidth()){var dc=dd.getHeightForWidth(db);
}else{dc=this._getContentHeightForWidth(dg);
}var de=dc+dh;
return de;
},_getContentHeightForWidth:function(v){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var N=this.getPaddingRight();
var P=this.getPaddingBottom();
var O=this.getPaddingLeft();

if(this.__dT){var M=this.__dT.getInsets();
{};
top+=M.top;
N+=M.right;
P+=M.bottom;
O+=M.left;
}return {"top":top,"right":N,"bottom":P,"left":O};
},getInnerSize:function(){var cm=this.getBounds();

if(!cm){return null;
}var cl=this.getInsets();
return {width:cm.width-cl.left-cl.right,height:cm.height-cl.top-cl.bottom};
},show:function(){this.setVisibility(fC);
},hide:function(){this.setVisibility(eX);
},exclude:function(){this.setVisibility(fy);
},isVisible:function(){return this.getVisibility()===fC;
},isHidden:function(){return this.getVisibility()!==fC;
},isExcluded:function(){return this.getVisibility()===fy;
},isSeeable:function(){var t=this.getContainerElement().getDomElement();

if(t){return t.offsetWidth>0;
}var s=this;

do{if(!s.isVisible()){return false;
}
if(s.isRootWidget()){return true;
}s=s.getLayoutParent();
}while(s);
return false;
},_createContainerElement:function(){var gW=new qx.html.Element(fI);
{};
gW.setStyle(ft,fJ);
gW.setStyle(eY,0);
gW.setAttribute(dG,this.toHashCode());
{};
return gW;
},__ec:function(){var bX=this._createContentElement();
{};
bX.setStyle(ft,fJ);
bX.setStyle(eY,10);
return bX;
},_createContentElement:function(){var u=new qx.html.Element(fI);
u.setStyle(eD,eX);
u.setStyle(eh,eX);
return u;
},getContainerElement:function(){return this.__dP;
},getContentElement:function(){return this.__dQ;
},getDecoratorElement:function(){return this.__dT;
},__ed:null,getLayoutChildren:function(){var gU=this.__ed;

if(!gU){return this.__ee;
}var gV;

for(var i=0,l=gU.length;i<l;i++){var gT=gU[i];

if(gT.hasUserBounds()||gT.isExcluded()){if(gV==null){gV=gU.concat();
}qx.lang.Array.remove(gV,gT);
}}return gV||gU;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var L=this.__dY;

if(L){L.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var J=this.__ed;

if(!J){return false;
}var K;

for(var i=0,l=J.length;i<l;i++){K=J[i];

if(!K.hasUserBounds()&&!K.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__ee:[],_getChildren:function(){return this.__ed||this.__ee;
},_indexOf:function(bg){var bh=this.__ed;

if(!bh){return -1;
}return bh.indexOf(bg);
},_hasChildren:function(){var c=this.__ed;
return c!=null&&(!!c[0]);
},addChildrenToQueue:function(ch){var ci=this.__ed;

if(!ci){return;
}var cj;

for(var i=0,l=ci.length;i<l;i++){cj=ci[i];
ch[cj.$$hash]=cj;
cj.addChildrenToQueue(ch);
}},_add:function(gc,gd){if(gc.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,gc);
}
if(this.__ed){this.__ed.push(gc);
}else{this.__ed=[gc];
}this.__ef(gc,gd);
},_addAt:function(dA,dB,dC){if(!this.__ed){this.__ed=[];
}if(dA.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,dA);
}var dD=this.__ed[dB];

if(dD===dA){return dA.setLayoutProperties(dC);
}
if(dD){qx.lang.Array.insertBefore(this.__ed,dA,dD);
}else{this.__ed.push(dA);
}this.__ef(dA,dC);
},_addBefore:function(gX,gY,ha){{};

if(gX==gY){return;
}
if(!this.__ed){this.__ed=[];
}if(gX.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,gX);
}qx.lang.Array.insertBefore(this.__ed,gX,gY);
this.__ef(gX,ha);
},_addAfter:function(gO,gP,gQ){{};

if(gO==gP){return;
}
if(!this.__ed){this.__ed=[];
}if(gO.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,gO);
}qx.lang.Array.insertAfter(this.__ed,gO,gP);
this.__ef(gO,gQ);
},_remove:function(dp){if(!this.__ed){return;
}qx.lang.Array.remove(this.__ed,dp);
this.__eg(dp);
},_removeAt:function(dE){if(!this.__ed){throw new Error("This widget has no children!");
}var dF=this.__ed[dE];
qx.lang.Array.removeAt(this.__ed,dE);
this.__eg(dF);
return dF;
},_removeAll:function(){if(!this.__ed){return;
}var gB=this.__ed.concat();
this.__ed.length=0;

for(var i=gB.length-1;i>=0;i--){this.__eg(gB[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__ef:function(H,I){{};
var parent=H.getLayoutParent();

if(parent&&parent!=this){parent._remove(H);
}H.setLayoutParent(this);
if(I){H.setLayoutProperties(I);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(H);
}},__eg:function(go){{};
go.setLayoutParent(null);
if(this.__dY){this.__dY.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(go);
}},capture:function(){this.getContainerElement().capture();
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(d,f,name){this.__ea=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__dV){return;
}var gp=this.__dV=new qx.html.Element;
{};
gp.setStyles({position:fJ,top:0,left:0,zIndex:7});
var gq=this.getBounds();

if(gq){this.__dV.setStyles({width:gq.width+fG,height:gq.height+fG});
}if(qx.core.Variant.isSet(fM,fN)){gp.setStyles({backgroundImage:ew+qx.util.ResourceManager.getInstance().toUri(fm)+ey,backgroundRepeat:ev});
}this.getContainerElement().add(gp);
},_applyDecorator:function(Y,ba){{};
var be=qx.ui.core.Widget.__dR;
var bc=this.getContainerElement();
if(!this.__dV){this._createProtectorElement();
}if(ba){bc.remove(this.__dT);
be.poolDecorator(this.__dT);
}if(Y){var bd=this.__dT=be.getDecoratorElement(Y);
bd.setStyle(eY,5);
var bb=this.getBackgroundColor();
bd.tint(bb);
bc.add(bd);
}else{delete this.__dT;
this._applyBackgroundColor(this.getBackgroundColor());
}if(Y&&!ba&&bb){this.getContainerElement().setStyle(eT,null);
}if(qx.ui.decoration.Util.insetsModified(ba,Y)){this.__ea=true;
qx.ui.core.queue.Layout.add(this);
}else if(Y){var bf=this.getBounds();

if(bf){bd.resize(bf.width,bf.height);
this.__dV.setStyles({width:bf.width+fG,height:bf.height+fG});
}}},_applyShadow:function(gf,gg){var gn=qx.ui.core.Widget.__dS;
var gi=this.getContainerElement();
if(gg){gi.remove(this.__dU);
gn.poolDecorator(this.__dU);
}if(gf){var gk=this.__dU=gn.getDecoratorElement(gf);
gi.add(gk);
var gm=gk.getInsets();
gk.setStyles({left:(-gm.left)+fG,top:(-gm.top)+fG});
var gl=this.getBounds();

if(gl){var gj=gl.width+gm.left+gm.right;
var gh=gl.height+gm.top+gm.bottom;
gk.resize(gj,gh);
}gk.tint(null);
}else{delete this.__dU;
}},_applyToolTipText:function(C,D){if(qx.core.Variant.isSet(fs,fA)){if(this.__dX){return;
}var E=qx.locale.Manager.getInstance();
this.__dX=E.addListener(fl,function(){if(C&&C.translate){this.setToolTipText(C.translate());
}},this);
}},_applyTextColor:function(bu,bv){},_applyZIndex:function(cB,cC){this.getContainerElement().setStyle(eY,cB==null?0:cB);
},_applyVisibility:function(T,U){var V=this.getContainerElement();

if(T===fC){V.show();
}else{V.hide();
}var parent=this.$$parent;

if(parent&&(U==null||T==null||U===fy||T===fy)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(bw,bx){this.getContainerElement().setStyle(dH,bw==1?null:bw);
if(qx.core.Variant.isSet(fM,fN)){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var by=(bw==1||bw==null)?null:0.99;
this.getContentElement().setStyle(dH,by);
}}},_applyCursor:function(cW,cX){if(cW==null&&!this.isSelectable()){cW=dI;
}this.getContainerElement().setStyle(eF,cW,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(bM,bN){var bO=this.getBackgroundColor();
var bQ=this.getContainerElement();

if(this.__dT){this.__dT.tint(bO);
bQ.setStyle(eT,null);
}else{var bP=qx.theme.manager.Color.getInstance().resolve(bO);
bQ.setStyle(eT,bP);
}},_applyFont:function(bs,bt){},__ei:null,$$stateChanges:null,_forwardStates:null,hasState:function(gC){var gD=this.__ei;
return gD&&gD[gC];
},addState:function(bB){var bC=this.__ei;

if(!bC){bC=this.__ei={};
}
if(bC[bB]){return;
}this.__ei[bB]=true;
if(bB===fO){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var bF=this.__el;

if(forward&&forward[bB]&&bF){var bD;

for(var bE in bF){bD=bF[bE];

if(bD instanceof qx.ui.core.Widget){bF[bE].addState(bB);
}}}},removeState:function(cJ){var cK=this.__ei;

if(!cK||!cK[cJ]){return;
}delete this.__ei[cJ];
if(cJ===fO){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var cN=this.__el;

if(forward&&forward[cJ]&&cN){for(var cM in cN){var cL=cN[cM];

if(cL instanceof qx.ui.core.Widget){cL.removeState(cJ);
}}}},replaceState:function(gI,gJ){var gK=this.__ei;

if(!gK){gK=this.__ei={};
}
if(!gK[gJ]){gK[gJ]=true;
}
if(gK[gI]){delete gK[gI];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var gN=this.__el;

if(forward&&forward[gJ]&&gN){for(var gM in gN){var gL=gN[gM];

if(gL instanceof qx.ui.core.Widget){gL.replaceState(gI,gJ);
}}}},__ej:null,__ek:null,syncAppearance:function(){var du=this.__ei;
var dt=this.__ej;
var dv=qx.theme.manager.Appearance.getInstance();
var dr=qx.core.Property.$$method.setThemed;
var dz=qx.core.Property.$$method.resetThemed;
if(this.__ek){delete this.__ek;
if(dt){var dq=dv.styleFrom(dt,du,null,this.getAppearance());
if(dq){dt=null;
}}}if(!dt){var ds=this;
var dy=[];

do{dy.push(ds.$$subcontrol||ds.getAppearance());
}while(ds=ds.$$subparent);
dt=this.__ej=dy.reverse().join(eP).replace(/#[0-9]+/g,eQ);
}var dw=dv.styleFrom(dt,du,null,this.getAppearance());

if(dw){var dx;

if(dq){for(var dx in dq){if(dw[dx]===undefined){this[dz[dx]]();
}}}{};
for(var dx in dw){dw[dx]===undefined?this[dz[dx]]():this[dr[dx]](dw[dx]);
}}else if(dq){for(var dx in dq){this[dz[dx]]();
}}this.fireDataEvent(et,this.__ei);
},_applyAppearance:function(gR,gS){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__dW){qx.ui.core.queue.Appearance.add(this);
this.__dW=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__ek=true;
qx.ui.core.queue.Appearance.add(this);
var cF=this.__el;

if(cF){var cD;

for(var cE in cF){cD=cF[cE];

if(cD instanceof qx.ui.core.Widget){cD.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var gr=this;

while(gr.getAnonymous()){gr=gr.getLayoutParent();

if(!gr){return null;
}}return gr;
},getFocusTarget:function(){var Q=this;

if(!Q.getEnabled()){return null;
}
while(Q.getAnonymous()||!Q.getFocusable()){Q=Q.getLayoutParent();

if(!Q||!Q.getEnabled()){return null;
}}return Q;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return this.getContainerElement().getDomElement()&&this.isFocusable();
},_applyFocusable:function(gE,gF){var gG=this.getFocusElement();
if(gE){var gH=this.getTabIndex();

if(gH==null){gH=1;
}gG.setAttribute(eV,gH);
if(qx.core.Variant.isSet(fM,fN)){gG.setAttribute(dR,eH);
}else{gG.setStyle(eB,dQ);
}}else{if(gG.isNativelyFocusable()){gG.setAttribute(eV,-1);
}else if(gF){gG.setAttribute(eV,null);
}}},_applyKeepFocus:function(cf){var cg=this.getFocusElement();
cg.setAttribute(fk,cf?fA:null);
},_applyKeepActive:function(dm){var dn=this.getContainerElement();
dn.setAttribute(fj,dm?fA:null);
},_applyTabIndex:function(bp){if(bp==null){bp=1;
}else if(bp<1||bp>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&bp!=null){this.getFocusElement().setAttribute(eV,bp);
}},_applySelectable:function(hb){this._applyCursor(this.getCursor());
this.getContainerElement().setSelectable(hb);
this.getContentElement().setSelectable(hb);
},_applyEnabled:function(R,S){if(R===false){this.addState(fP);
this.removeState(fO);
if(this.isFocusable()){this.removeState(eS);
this._applyFocusable(false,true);
}}else{this.removeState(fP);
if(this.isFocusable()){this._applyFocusable(true,false);
}}},_applyNativeContextMenu:function(cd,ce,name){},_applyContextMenu:function(F,G){if(G){G.removeState(eU);

if(G.getOpener()==this){G.resetOpener();
}
if(!F){this.removeListener(eU,this._onContextMenuOpen);
G.removeListener(eR,this._onBeforeContextMenuOpen,this);
}}
if(F){F.setOpener(this);
F.addState(eU);

if(!G){this.addListener(eU,this._onContextMenuOpen);
F.addListener(eR,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==fC&&this.hasListener(dO)){this.fireDataEvent(dO,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(hc,hd){qx.ui.core.DragDropCursor.getInstance();
if(hc){this.addListener(fp,this._onDragStart);
this.addListener(fK,this._onDrag);
this.addListener(fw,this._onDragEnd);
this.addListener(fr,this._onDragChange);
}else{this.removeListener(fp,this._onDragStart);
this.removeListener(fK,this._onDrag);
this.removeListener(fw,this._onDragEnd);
this.removeListener(fr,this._onDragChange);
}this.getContainerElement().setAttribute(es,hc?fA:null);
},_applyDroppable:function(cn,co){this.getContainerElement().setAttribute(eG,cn?fA:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(dI);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var cU=qx.ui.core.DragDropCursor.getInstance();
var cV=e.getCurrentAction();
cV?cU.setAction(cV):cU.resetAction();
},visualizeFocus:function(){this.addState(eS);
},visualizeBlur:function(){this.removeState(eS);
},scrollChildIntoView:function(gx,gy,gz,gA){this.scrollChildIntoViewX(gx,gy,gA);
this.scrollChildIntoViewY(gx,gz,gA);
},scrollChildIntoViewX:function(z,A,B){this.getContentElement().scrollChildIntoViewX(z.getContainerElement(),A,B);
},scrollChildIntoViewY:function(bk,bl,bm){this.getContentElement().scrollChildIntoViewY(bk.getContainerElement(),bl,bm);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(ge){if(!this.__el){return false;
}return !!this.__el[ge];
},__el:null,_getCreatedChildControls:function(){return this.__el;
},getChildControl:function(bR,bS){if(!this.__el){if(bS){return null;
}this.__el={};
}var bT=this.__el[bR];

if(bT){return bT;
}
if(bS===true){return null;
}return this._createChildControl(bR);
},_showChildControl:function(cS){var cT=this.getChildControl(cS);
cT.show();
return cT;
},_excludeChildControl:function(bq){var br=this.getChildControl(bq,true);

if(br){br.exclude();
}},_isChildControlVisible:function(bn){var bo=this.getChildControl(bn,true);

if(bo){return bo.isVisible();
}return false;
},_createChildControl:function(bG){if(!this.__el){this.__el={};
}else if(this.__el[bG]){throw new Error("Child control '"+bG+"' already created!");
}var bK=bG.indexOf(dX);

if(bK==-1){var bH=this._createChildControlImpl(bG);
}else{var bH=this._createChildControlImpl(bG.substring(0,bK));
}
if(!bH){throw new Error("Unsupported control: "+bG);
}bH.$$subcontrol=bG;
bH.$$subparent=this;
var bI=this.__ei;
var forward=this._forwardStates;

if(bI&&forward&&bH instanceof qx.ui.core.Widget){for(var bJ in bI){if(forward[bJ]){bH.addState(bJ);
}}}this.fireDataEvent(fX,bH);
return this.__el[bG]=bH;
},_createChildControlImpl:function(cI){return null;
},_disposeChildControls:function(){var cc=this.__el;

if(!cc){return;
}var ca=qx.ui.core.Widget;

for(var cb in cc){var bY=cc[cb];

if(!ca.contains(this,bY)){bY.destroy();
}else{bY.dispose();
}}delete this.__el;
},_findTopControl:function(){var gv=this;

while(gv){if(!gv.$$subparent){return gv;
}gv=gv.$$subparent;
}return null;
},getContainerLocation:function(dk){var dl=this.getContainerElement().getDomElement();
return dl?qx.bom.element.Location.get(dl,dk):null;
},getContentLocation:function(W){var X=this.getContentElement().getDomElement();
return X?qx.bom.element.Location.get(X,W):null;
},setDomLeft:function(bz){var bA=this.getContainerElement().getDomElement();

if(bA){bA.style.left=bz+fG;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(bi){var bj=this.getContainerElement().getDomElement();

if(bj){bj.style.top=bi+fG;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(cG,top){var cH=this.getContainerElement().getDomElement();

if(cH){cH.style.left=cG+fG;
cH.style.top=top+fG;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var cY=arguments.callee.base.call(this);

if(this.getChildren){var da=this.getChildren();

for(var i=0,l=da.length;i<l;i++){cY.add(da[i].clone());
}}return cY;
},serialize:function(){var gt=arguments.callee.base.call(this);

if(this.getChildren){var gu=this.getChildren();

if(gu.length>0){gt.children=[];

for(var i=0,l=gu.length;i<l;i++){gt.children.push(gu[i].serialize());
}}}
if(this.getLayout){var gs=this.getLayout();

if(gs){gt.layout=gs.serialize();
}}return gt;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(fs,fA)){if(this.__dX){qx.locale.Manager.getInstance().removeListenerById(this.__dX);
}}this.getContainerElement().setAttribute(dG,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var gw=qx.ui.core.Widget;
this.clearSeparators();
this.setDecorator(null);
this.setShadow(null);
this._disposeFields(fu,dK,fq);
}else{this._disposeArray(fq);
this._disposeObjects(fu,dK);
}this._disposeArray(ej);
this._disposeFields(ga,eN);
this._disposeObjects(dY,fU,fW,eK);
}});
})();
(function(){var g="qx.event.type.Data",f="qx.event.type.Event",e="qx.data.IListData";
qx.Interface.define(e,{events:{"change":g,"changeLength":f},members:{getItem:function(a){},setItem:function(h,i){},splice:function(b,c,d){},contains:function(j){},getLength:function(){},toArray:function(){}}});
})();
(function(){var j="edge-start",i="align-start",h="align-end",g="edge-end",f="qx.util.placement.AbstractAxis";
qx.Class.define(f,{extend:qx.core.Object,members:{computeStart:function(a,b,c,d,e){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(n,o,p,q){switch(q){case j:return o.start-p.start-n;
case g:return o.end+p.end;
case i:return o.start;
case h:return o.end-n;
}},_isInRange:function(k,l,m){return k>=0&&k+l<=m;
}}});
})();
(function(){var g="qx.util.placement.BestFitAxis";
qx.Class.define(g,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(a,b,c,d,e){var f=this._moveToEdgeAndAlign(a,b,c,e);

if(this._isInRange(f,a,d)){return f;
}
if(f<0){f=Math.min(0,d-a);
}
if(f+a>d){f=Math.max(0,d-a);
}return f;
}}});
})();
(function(){var a="qx.util.placement.DirectAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);
}}});
})();
(function(){var y="blur",x="focus",w="input",v="load",u="qx.ui.core.EventHandler",t="__hi",s="activate";
qx.Class.define(u,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__hi=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hi:null,__hj:{focusin:1,focusout:1,focus:1,blur:1},__hk:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(D,E){return D instanceof qx.ui.core.Widget;
},_dispatchEvent:function(b){var g=b.getTarget();
var f=qx.ui.core.Widget.getWidgetByElement(g);
var h=false;

while(f&&f.isAnonymous()){var h=true;
f=f.getLayoutParent();
}if(f&&h&&b.getType()==s){f.getContainerElement().activate();
}if(this.__hj[b.getType()]){f=f&&f.getFocusTarget();
if(!f){return;
}}if(b.getRelatedTarget){var q=b.getRelatedTarget();
var p=qx.ui.core.Widget.getWidgetByElement(q);

while(p&&p.isAnonymous()){p=p.getLayoutParent();
}
if(p){if(this.__hj[b.getType()]){p=p.getFocusTarget();
}if(p===f){return;
}}}var k=b.getCurrentTarget();
var n=qx.ui.core.Widget.getWidgetByElement(k);

if(!n||n.isAnonymous()){return;
}if(this.__hj[b.getType()]){n=n.getFocusTarget();
}var o=b.getType();

if(!(n.isEnabled()||this.__hk[o])){return;
}var c=b.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var j=this.__hi.getListeners(n,o,c);

if(!j||j.length===0){return;
}var d=qx.event.Pool.getInstance().getObject(b.constructor);
b.clone(d);
d.setTarget(f);
d.setRelatedTarget(p||null);
d.setCurrentTarget(n);
var r=b.getOriginalTarget();

if(r){var e=qx.ui.core.Widget.getWidgetByElement(r);

while(e&&e.isAnonymous()){e=e.getLayoutParent();
}d.setOriginalTarget(e);
}else{d.setOriginalTarget(g);
}for(var i=0,l=j.length;i<l;i++){var m=j[i].context||n;
j[i].handler.call(m,d);
}if(d.getPropagationStopped()){b.stopPropagation();
}
if(d.getDefaultPrevented()){b.preventDefault();
}qx.event.Pool.getInstance().poolObject(d);
},registerEvent:function(F,G,H){var I;

if(G===x||G===y){I=F.getFocusElement();
}else if(G===v||G===w){I=F.getContentElement();
}else{I=F.getContainerElement();
}
if(I){I.addListener(G,this._dispatchEvent,this,H);
}},unregisterEvent:function(z,A,B){var C;

if(A===x||A===y){C=z.getFocusElement();
}else if(A===v||A===w){C=z.getContentElement();
}else{C=z.getContainerElement();
}
if(C){C.removeListener(A,this._dispatchEvent,this,B);
}}},destruct:function(){this._disposeFields(t);
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var o="-",n="qx.event.handler.Element",m="_manager",l="_registeredEvents";
qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(p){arguments.callee.base.call(this);
this._manager=p;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(w,x){},registerEvent:function(q,r,s){var v=qx.core.ObjectRegistry.toHashCode(q);
var t=v+o+r;
var u=qx.lang.Function.listener(this._onNative,this,t);
qx.bom.Event.addNativeListener(q,r,u);
this._registeredEvents[t]={element:q,type:r,listener:u};
},unregisterEvent:function(e,f,g){var j=this._registeredEvents;

if(!j){return;
}var k=qx.core.ObjectRegistry.toHashCode(e);
var h=k+o+f;
var i=this._registeredEvents[h];
qx.bom.Event.removeNativeListener(e,f,i.listener);
delete this._registeredEvents[h];
},_onNative:qx.event.GlobalError.observeMethod(function(a,b){var d=this._registeredEvents;

if(!d){return;
}var c=d[b];
qx.event.Registration.fireNonBubblingEvent(c.element,c.type,qx.event.type.Native,[a]);
})},destruct:function(){var y;
var z=this._registeredEvents;

for(var A in z){y=z[A];
qx.bom.Event.removeNativeListener(y.element,y.type,y.listener);
}this._disposeFields(m,l);
},defer:function(B){qx.event.Registration.addHandler(B);
}});
})();
(function(){var t='indexOf',s='slice',r='concat',q='toLocaleLowerCase',p="qx.type.BaseString",o="",n='match',m='toLocaleUpperCase',k='search',j='replace',c='toLowerCase',h='charCodeAt',f='split',b='substring',a='lastIndexOf',e='substr',d='toUpperCase',g='charAt';
qx.Class.define(p,{extend:Object,construct:function(u){var u=u||o;
this.__hm=u;
this.length=u.length;
},members:{$$isString:true,length:0,__hm:null,toString:function(){return this.__hm;
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
this.__hn=c;
this.__ho=d;
},members:{__hn:null,__ho:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__hn,this.__ho);
}}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(e,f){return qx.Class.supportsEvent(e.constructor,f);
},registerEvent:function(g,h,i){},unregisterEvent:function(b,c,d){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var j="qx.ui.core.MChildrenHandling";
qx.Mixin.define(j,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(a){return this._indexOf(a);
},add:function(b,c){this._add(b,c);
},addAt:function(g,h,i){this._addAt(g,h,i);
},addBefore:function(n,o,p){this._addBefore(n,o,p);
},addAfter:function(d,e,f){this._addAfter(d,e,f);
},remove:function(k){this._remove(k);
},removeAt:function(l){return this._removeAt(l);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(m){m.getChildren=m._getChildren;
m.hasChildren=m._hasChildren;
m.indexOf=m._indexOf;
m.add=m._add;
m.addAt=m._addAt;
m.addBefore=m._addBefore;
m.addAfter=m._addAfter;
m.remove=m._remove;
m.removeAt=m._removeAt;
m.removeAll=m._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MRemoteLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this.getChildrenContainer().setLayout(b);
},getLayout:function(){return this.getChildrenContainer().getLayout();
}}});
})();
(function(){var h="CSS1Compat",g="position:absolute;width:0;height:0;width:1",f="qx.bom.Document",e="1px",d="qx.client",c="div";
qx.Class.define(f,{statics:{isQuirksMode:qx.core.Variant.select(d,{"mshtml":function(i){if(qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return (i||window).document.compatMode!==h;
}},"webkit":function(j){if(document.compatMode===undefined){var k=(j||window).document.createElement(c);
k.style.cssText=g;
return k.style.width===e?true:false;
}else{return (j||window).document.compatMode!==h;
}},"default":function(b){return (b||window).document.compatMode!==h;
}}),isStandardMode:function(a){return !this.isQuirksMode(a);
},getWidth:function(o){var p=(o||window).document;
var q=qx.bom.Viewport.getWidth(o);
var scroll=this.isStandardMode(o)?p.documentElement.scrollWidth:p.body.scrollWidth;
return Math.max(scroll,q);
},getHeight:function(l){var m=(l||window).document;
var n=qx.bom.Viewport.getHeight(l);
var scroll=this.isStandardMode(l)?m.documentElement.scrollHeight:m.body.scrollHeight;
return Math.max(scroll,n);
}}});
})();
(function(){var k="interval",j="qx.event.Timer",i="_applyInterval",h="_applyEnabled",g="Boolean",f="__dG",d="__dF",c="qx.event.type.Event",b="Integer";
qx.Class.define(j,{extend:qx.core.Object,construct:function(r){arguments.callee.base.call(this);
this.setEnabled(false);

if(r!=null){this.setInterval(r);
}this.__dF=qx.lang.Function.bind(this._oninterval,this);
},events:{"interval":c},statics:{once:function(l,m,n){var o=new qx.event.Timer(n);
o.addListener(k,function(e){o.stop();
l.call(m,e);
o.dispose();
m=null;
},m);
o.start();
return o;
}},properties:{enabled:{init:true,check:g,apply:h},interval:{check:b,init:1000,apply:i}},members:{__dG:null,__dF:null,_applyInterval:function(p,q){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(t,u){if(u){window.clearInterval(this.__dG);
this.__dG=null;
}else if(t){this.__dG=window.setInterval(this.__dF,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(s){this.setInterval(s);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(a){this.stop();
this.startWith(a);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.getEnabled()){this.fireEvent(k);
}})},destruct:function(){if(this.__dG){window.clearInterval(this.__dG);
}this._disposeFields(f,d);
}});
})();
(function(){var d="qx.event.handler.UserAction",c="__eu",b="__et";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(a){arguments.callee.base.call(this);
this.__et=a;
this.__eu=a.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__et:null,__eu:null,canHandleEvent:function(i,j){},registerEvent:function(k,l,m){},unregisterEvent:function(e,f,g){}},destruct:function(){this._disposeFields(b,c);
},defer:function(h){qx.event.Registration.addHandler(h);
}});
})();
(function(){var C="qx.client",B="mouseup",A="click",z="mousedown",y="contextmenu",x="dblclick",w="mousewheel",v="mouseover",u="mouseout",t="DOMMouseScroll",m="on",s="mshtml|webkit|opera",p="mousemove",l="useraction",k="__fK",o="__fE",n="gecko|webkit",q="qx.event.handler.Mouse",j="__fD",r="__fF";
qx.Class.define(q,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(K){arguments.callee.base.call(this);
this.__fD=K;
this.__fE=K.getWindow();
this.__fF=this.__fE.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__fG:null,__fH:null,__fI:null,__fJ:null,__fK:null,__fD:null,__fE:null,__fF:null,canHandleEvent:function(a,b){},registerEvent:qx.core.Variant.select(C,{"webkit":function(c,d,e){if(qx.bom.client.System.IPHONE){var f=qx.lang.Function.returnNull;
c[m+d]=f;
c[m+d]=undefined;
}},"default":qx.lang.Function.returnNull}),unregisterEvent:function(L,M,N){},__fL:function(O,P,Q){if(!Q){Q=O.target||O.srcElement;
}if(Q&&Q.nodeType){qx.event.Registration.fireEvent(Q,P||O.type,qx.event.type.Mouse,[O,Q,null,true,true]);
}qx.event.Registration.fireEvent(this.__fE,l,qx.event.type.Data,[P||O.type]);
},_initButtonObserver:function(){this.__fG=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fF,z,this.__fG);
Event.addNativeListener(this.__fF,B,this.__fG);
Event.addNativeListener(this.__fF,A,this.__fG);
Event.addNativeListener(this.__fF,x,this.__fG);
Event.addNativeListener(this.__fF,y,this.__fG);
},_initMoveObserver:function(){this.__fH=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fF,p,this.__fH);
Event.addNativeListener(this.__fF,v,this.__fH);
Event.addNativeListener(this.__fF,u,this.__fH);
},_initWheelObserver:function(){this.__fI=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var bb=qx.core.Variant.isSet(C,s)?w:t;
Event.addNativeListener(this.__fF,bb,this.__fI);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fF,z,this.__fG);
Event.removeNativeListener(this.__fF,B,this.__fG);
Event.removeNativeListener(this.__fF,A,this.__fG);
Event.removeNativeListener(this.__fF,x,this.__fG);
Event.removeNativeListener(this.__fF,y,this.__fG);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fF,p,this.__fH);
Event.removeNativeListener(this.__fF,v,this.__fH);
Event.removeNativeListener(this.__fF,u,this.__fH);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var W=qx.core.Variant.isSet(C,s)?w:t;
Event.removeNativeListener(this.__fF,W,this.__fI);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(bc){this.__fL(bc);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(G){var H=G.type;
var I=G.target||G.srcElement;
if(qx.core.Variant.isSet(C,n)){if(I&&I.nodeType==3){I=I.parentNode;
}}
if(this.__fM){this.__fM(G,H,I);
}
if(this.__fO){this.__fO(G,H,I);
}this.__fL(G,H,I);

if(this.__fN){this.__fN(G,H,I);
}
if(this.__fP){this.__fP(G,H,I);
}this.__fJ=H;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(V){this.__fL(V,w);
}),__fM:qx.core.Variant.select(C,{"webkit":function(D,E,F){if(qx.bom.client.Engine.VERSION<530){if(E==y){this.__fL(D,B,F);
}}},"default":null}),__fN:qx.core.Variant.select(C,{"opera":function(X,Y,ba){if(Y==B&&X.button==2){this.__fL(X,y,ba);
}},"default":null}),__fO:qx.core.Variant.select(C,{"mshtml":function(g,h,i){if(h==B&&this.__fJ==A){this.__fL(g,z,i);
}else if(h==x){this.__fL(g,A,i);
}},"default":null}),__fP:qx.core.Variant.select(C,{"mshtml":null,"default":function(R,S,T){switch(S){case z:this.__fK=T;
break;
case B:if(T!==this.__fK){var U=qx.dom.Hierarchy.getCommonParent(T,this.__fK);
this.__fL(R,A,U);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this._disposeFields(j,o,r,k);
},defer:function(J){qx.event.Registration.addHandler(J);
}});
})();
(function(){var d="_dynamic",c="qx.util.ValueManager",b="abstract";
qx.Class.define(c,{type:b,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(f){return this._dynamic[f];
},isDynamic:function(e){return !!this._dynamic[e];
},resolve:function(g){if(g&&this._dynamic[g]){return this._dynamic[g];
}return g;
},_setDynamic:function(a){this._dynamic=a;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._disposeFields(d);
}});
})();
(function(){var j="qx.client",h="qx.io2.ImageLoader",g="load";
qx.Bootstrap.define(h,{statics:{__cV:{},__cW:{width:null,height:null},__cX:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(r){var s=this.__cV[r];
return !!(s&&s.loaded);
},isFailed:function(C){var D=this.__cV[C];
return !!(D&&D.failed);
},isLoading:function(k){var m=this.__cV[k];
return !!(m&&m.loading);
},getFormat:function(E){var F=this.__cV[E];
return F?F.format:null;
},getSize:function(n){var o=this.__cV[n];
return o?
{width:o.width,height:o.height}:this.__cW;
},getWidth:function(t){var u=this.__cV[t];
return u?u.width:null;
},getHeight:function(p){var q=this.__cV[p];
return q?q.height:null;
},load:function(a,b,c){var d=this.__cV[a];

if(!d){d=this.__cV[a]={};
}if(b&&!c){c=window;
}if(d.loaded||d.loading||d.failed){if(b){if(d.loading){d.callbacks.push(b,c);
}else{b.call(c,a,d);
}}}else{d.loading=true;
d.callbacks=[];

if(b){d.callbacks.push(b,c);
}var f=new Image();
var e=qx.lang.Function.listener(this.__cY,this,f,a);
f.onload=e;
f.onerror=e;
f.src=a;
}},__cY:qx.event.GlobalError.observeMethod(function(event,w,x){var y=this.__cV[x];
if(event.type===g){y.loaded=true;
y.width=this.__da(w);
y.height=this.__db(w);
var z=this.__cX.exec(x);

if(z!=null){y.format=z[1];
}}else{y.failed=true;
}w.onload=w.onerror=null;
var A=y.callbacks;
delete y.loading;
delete y.callbacks;
for(var i=0,l=A.length;i<l;i+=2){A[i].call(A[i+1],x,y);
}}),__da:qx.core.Variant.select(j,{"gecko":function(H){return H.naturalWidth;
},"default":function(v){return v.width;
}}),__db:qx.core.Variant.select(j,{"gecko":function(G){return G.naturalHeight;
},"default":function(B){return B.height;
}})}});
})();
(function(){var l="n-resize",k="e-resize",j="nw-resize",i="ne-resize",h="",g="cursor:",f="qx.client",e=";",d="qx.bom.element.Cursor",c="cursor",b="hand";
qx.Class.define(d,{statics:{__cP:qx.core.Variant.select(f,{"mshtml":{"cursor":b,"ew-resize":k,"ns-resize":l,"nesw-resize":i,"nwse-resize":j},"opera":{"col-resize":k,"row-resize":l,"ew-resize":k,"ns-resize":l,"nesw-resize":i,"nwse-resize":j},"default":{}}),compile:function(a){return g+(this.__cP[a]||a)+e;
},get:function(o,p){return qx.bom.element.Style.get(o,c,p,false);
},set:function(m,n){m.style.cursor=this.__cP[n]||n;
},reset:function(q){q.style.cursor=h;
}}});
})();
(function(){var t="_applyLayoutChange",s="top",r="left",q="middle",p="Decorator",o="__X",n="__W",m="center",k="_applyReversed",j="bottom",f="qx.ui.layout.VBox",h="__ba",g="Integer",e="right",d="Boolean";
qx.Class.define(f,{extend:qx.ui.layout.Abstract,construct:function(a,b,c){arguments.callee.base.call(this);

if(a){this.setSpacing(a);
}
if(b){this.setAlignY(b);
}
if(c){this.setSeparator(c);
}},properties:{alignY:{check:[s,q,j],init:s,apply:t},alignX:{check:[r,m,e],init:r,apply:t},spacing:{check:g,init:0,apply:t},separator:{check:p,nullable:true,apply:t},reversed:{check:d,init:false,apply:k}},members:{__W:null,__X:null,__Y:null,__ba:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__bb:function(){var X=this._getLayoutChildren();
var length=X.length;
var T=false;
var S=this.__W&&this.__W.length!=length&&this.__X&&this.__W;
var V;
var U=S?this.__W:new Array(length);
var W=S?this.__X:new Array(length);
if(this.getReversed()){X=X.concat().reverse();
}for(var i=0;i<length;i++){V=X[i].getLayoutProperties();

if(V.height!=null){U[i]=parseFloat(V.height)/100;
}
if(V.flex!=null){W[i]=V.flex;
T=true;
}}if(!S){this.__W=U;
this.__X=W;
}this.__Y=T;
this.__ba=X;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(u,v){if(this._invalidChildrenCache){this.__bb();
}var C=this.__ba;
var length=C.length;
var M=qx.ui.layout.Util;
var L=this.getSpacing();
var P=this.getSeparator();

if(P){var z=M.computeVerticalSeparatorGaps(C,L,P);
}else{var z=M.computeVerticalGaps(C,L,true);
}var i,x,y,G;
var H=[];
var N=z;

for(i=0;i<length;i+=1){G=this.__W[i];
y=G!=null?Math.floor((v-z)*G):C[i].getSizeHint().height;
H.push(y);
N+=y;
}if(this.__Y&&N!=v){var E={};
var K,O;

for(i=0;i<length;i+=1){K=this.__X[i];

if(K>0){D=C[i].getSizeHint();
E[i]={min:D.minHeight,value:H[i],max:D.maxHeight,flex:K};
}}var A=M.computeFlexOffsets(E,v,N);

for(i in A){O=A[i].offset;
H[i]+=O;
N+=O;
}}var top=C[0].getMarginTop();
if(N<v&&this.getAlignY()!=s){top=v-N;

if(this.getAlignY()===q){top=Math.round(top/2);
}}var D,R,I,y,F,J,B;
this._clearSeparators();
if(P){var Q=qx.theme.manager.Decoration.getInstance().resolve(P).getInsets();
var w=Q.top+Q.bottom;
}for(i=0;i<length;i+=1){x=C[i];
y=H[i];
D=x.getSizeHint();
J=x.getMarginLeft();
B=x.getMarginRight();
I=Math.max(D.minWidth,Math.min(u-J-B,D.maxWidth));
R=M.computeHorizontalAlignOffset(x.getAlignX()||this.getAlignX(),I,u,J,B);
if(i>0){if(P){top+=F+L;
this._renderSeparator(P,{top:top,left:0,height:w,width:u});
top+=w+L+x.getMarginTop();
}else{top+=M.collapseMargins(L,F,x.getMarginTop());
}}x.renderLayout(R,top,I,y);
top+=y;
F=x.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__bb();
}var bf=qx.ui.layout.Util;
var bn=this.__ba;
var bb=0,be=0,bd=0;
var Y=0,bg=0;
var bk,ba,bm;
for(var i=0,l=bn.length;i<l;i+=1){bk=bn[i];
ba=bk.getSizeHint();
be+=ba.height;
var bj=this.__X[i];
var bc=this.__W[i];

if(bj){bb+=ba.minHeight;
}else if(bc){bd=Math.max(bd,Math.round(ba.minHeight/bc));
}else{bb+=ba.height;
}bm=bk.getMarginLeft()+bk.getMarginRight();
if((ba.width+bm)>bg){bg=ba.width+bm;
}if((ba.minWidth+bm)>Y){Y=ba.minWidth+bm;
}}bb+=bd;
var bi=this.getSpacing();
var bl=this.getSeparator();

if(bl){var bh=bf.computeVerticalSeparatorGaps(bn,bi,bl);
}else{var bh=bf.computeVerticalGaps(bn,bi,true);
}return {minHeight:bb+bh,height:be+bh,minWidth:Y,width:bg};
}},destruct:function(){this._disposeFields(n,o,h);
}});
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
(function(){var d="dispose",c="qx.ui.core.queue.Dispose";
qx.Class.define(c,{statics:{__hh:{},add:function(a){var b=this.__hh;

if(b[a.$$hash]){return;
}b[a.$$hash]=a;
qx.ui.core.queue.Manager.scheduleFlush(d);
},flush:function(){var e=this.__hh;

for(var g in e){var f=e[g];
delete e[g];
f.dispose();
}for(var g in e){return;
}this.__hh={};
}}});
})();
(function(){var R="nonScaled",Q="scaled",P="alphaScaled",O="replacement",N=".png",M="hidden",L="div",K="Boolean",J="_applyScale",I="px",B="__iT",H="_applySource",E="-disabled.$1",z="overflowX",y="img",D="changeSource",C="overflowY",F="qx.client",x="String",G="image",A="qx.ui.basic.Image";
qx.Class.define(A,{extend:qx.ui.core.Widget,construct:function(a){this.__iT={};
arguments.callee.base.call(this);

if(a){this.setSource(a);
}},properties:{source:{check:x,init:null,nullable:true,event:D,apply:H,themeable:true},scale:{check:K,init:false,themeable:true,apply:J},appearance:{refine:true,init:G},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__hv:null,__hw:null,__iU:null,__iT:null,getContentElement:function(){return this.__iY();
},_createContentElement:function(){return this.__iY();
},_getContentHint:function(){return {width:this.__hv||0,height:this.__hw||0};
},_applyEnabled:function(c,d){arguments.callee.base.call(this,c,d);

if(this.getSource()){this._styleSource();
}},_applySource:function(j){this._styleSource();
},_applyScale:function(S){this._styleSource();
},__iV:function(b){this.__iU=b;
},__iW:function(){if(this.__iU==null){var V=this.getSource();
var U=false;

if(V!=null){U=qx.lang.String.endsWith(V,N);
}
if(this.getScale()&&U&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__iU=P;
}else if(this.getScale()){this.__iU=Q;
}else{this.__iU=R;
}}return this.__iU;
},__iX:function(m){var n;
var o;

if(m==P){n=true;
o=L;
}else if(m==R){n=false;
o=L;
}else{n=true;
o=y;
}var p=new qx.html.Image(o);
p.setScale(n);
p.setStyle(z,M);
p.setStyle(C,M);
return p;
},__iY:function(){var e=this.__iW();

if(this.__iT[e]==null){this.__iT[e]=this.__iX(e);
}return this.__iT[e];
},_styleSource:function(){var T=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!T){this.getContentElement().resetSource();
return;
}this.__ja(T);
if(qx.util.ResourceManager.getInstance().has(T)){this.__hx(this.getContentElement(),T);
}else if(qx.io2.ImageLoader.isLoaded(T)){this.__hy(this.getContentElement(),T);
}else{this.__hz(this.getContentElement(),T);
}},__ja:qx.core.Variant.select(F,{"mshtml":function(W){var Y=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var X=qx.lang.String.endsWith(W,N);

if(Y&&X){if(this.getScale()&&this.__iW()!=P){this.__iV(P);
}else if(!this.getScale()&&this.__iW()!=R){this.__iV(R);
}}else{if(this.getScale()&&this.__iW()!=Q){this.__iV(Q);
}else if(!this.getScale()&&this.__iW()!=R){this.__iV(R);
}}this.__jb(this.__iY());
},"default":function(bk){if(this.getScale()&&this.__iW()!=Q){this.__iV(Q);
}else if(!this.getScale()&&this.__iW(R)){this.__iV(R);
}this.__jb(this.__iY());
}}),__jb:function(q){var t=this.getContainerElement();
var u=t.getChild(0);

if(u!=q){if(u!=null){var w=I;
var r={};
var s=this.getInnerSize();

if(s!=null){r.width=s.width+w;
r.height=s.height+w;
}var v=this.getInsets();
r.left=v.left+w;
r.top=v.top+w;
q.setStyles(r,true);
q.setSelectable(this.getSelectable());
}t.removeAt(0);
t.addAt(q,0);
}},__hx:function(f,g){var i=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var h=g.replace(/\.([a-z]+)$/,E);

if(i.has(h)){g=h;
this.addState(O);
}else{this.removeState(O);
}}if(f.getSource()===g){return;
}f.setSource(g);
this.__hB(i.getImageWidth(g),i.getImageHeight(g));
},__hy:function(bf,bg){var bi=qx.io2.ImageLoader;
bf.setSource(bg);
var bh=bi.getWidth(bg);
var bj=bi.getHeight(bg);
this.__hB(bh,bj);
},__hz:function(bc,bd){var self;
var be=qx.io2.ImageLoader;
{};
if(!be.isFailed(bd)){be.load(bd,this.__hA,this);
}else{if(bc!=null){bc.resetSource();
}}},__hA:function(ba,bb){if(ba!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(bb.failed){this.warn("Image could not be loaded: "+ba);
}this._styleSource();
},__hB:function(k,l){if(k!==this.__hv||l!==this.__hw){this.__hv=k;
this.__hw=l;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(B);
}});
})();
(function(){var m="interval",l="keep-align",k="Integer",j="direct",i="best-fit",h="Boolean",g="mouse",f="bottom-left",e="disappear",d="bottom-right",B="widget",A="qx.ui.core.MPlacement",z="left-top",y="offsetRight",x="shorthand",w="offsetLeft",v="top-left",u="appear",t="offsetBottom",s="top-right",q="offsetTop",r="right-bottom",o="right-top",p="_applySmart",n="left-bottom";
qx.Mixin.define(A,{properties:{position:{check:[v,s,f,d,z,n,o,r],init:f,themeable:true},placeMethod:{check:[B,g],init:g,themeable:true},domMove:{check:h,init:false},smart:{check:h,init:true,themeable:true,apply:p},placementModeX:{check:[j,l,i],init:l,themeable:true},placementModeY:{check:[j,l,i],init:l,themeable:true},offsetLeft:{check:k,init:0,themeable:true},offsetTop:{check:k,init:0,themeable:true},offsetRight:{check:k,init:0,themeable:true},offsetBottom:{check:k,init:0,themeable:true},offset:{group:[q,y,t,w],mode:x,themeable:true}},members:{__em:null,_applySmart:function(O,P){{};
var Q=O?l:j;
this.set({placementModeX:Q,placementModeY:Q});
},getLayoutLocation:function(E){var H,G,I,top;
G=E.getBounds();
I=G.left;
top=G.top;
var J=G;
E=E.getLayoutParent();

while(E&&!E.isRootWidget()){G=E.getBounds();
I+=G.left;
top+=G.top;
H=E.getInsets();
I+=H.left;
top+=H.top;
E=E.getLayoutParent();
}if(E.isRootWidget()){var F=E.getContainerLocation();

if(F){I+=F.left;
top+=F.top;
}}return {left:I,top:top,right:I+J.width,bottom:top+J.height};
},moveTo:function(N,top){if(this.getDomMove()){this.setDomPosition(N,top);
}else{this.setLayoutProperties({left:N,top:top});
}},placeToWidget:function(a,b){if(b){this.__em=qx.lang.Function.bind(this.placeToWidget,this,a,false);
qx.event.Idle.getInstance().addListener(m,this.__em);
this.addListener(e,function(){if(this.__em){qx.event.Idle.getInstance().removeListener(m,this.__em);
this.__em=null;
}},this);
}var c=a.getContainerLocation()||this.getLayoutLocation(a);
this.__eo(c);
},placeToMouse:function(event){var D=event.getDocumentLeft();
var top=event.getDocumentTop();
var C={left:D,top:top,right:D,bottom:top};
this.__eo(C);
},placeToElement:function(R,S){var location=qx.bom.element.Location.get(R);
var T={left:location.left,top:location.top,right:location.left+R.offsetWidth,bottom:location.top+R.offsetHeight};
if(S){this.__em=qx.lang.Function.bind(this.placeToElement,this,R,false);
qx.event.Idle.getInstance().addListener(m,this.__em);
this.addListener(e,function(){if(this.__em){qx.event.Idle.getInstance().removeListener(m,this.__em);
this.__em=null;
}},this);
}this.__eo(T);
},placeToPoint:function(K){var L={left:K.left,top:K.top,right:K.left,bottom:K.top};
this.__eo(L);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__en:function(W){var X=null;

if(this._computePlacementSize){var X=this._computePlacementSize();
}else if(this.isVisible()){var X=this.getBounds();
}
if(X==null){this.addListenerOnce(u,function(){this.__en(W);
},this);
}else{W.call(this,X);
}},__eo:function(M){this.__en(function(U){var V=qx.util.placement.Placement.compute(U,this.getLayoutParent().getBounds(),M,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(V.left,V.top);
});
}},destruct:function(){if(this.__em){qx.event.Idle.getInstance().removeListener(m,this.__em);
}}});
})();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){arguments.callee.base.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var h=this.getApplicationRoot();
h.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(i,j){if(j){this.removeState(j);
}
if(i){this.addState(i);
}}}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Class.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__bU=c;
this.__bV=d||b;
this.__bW=e===undefined?-1:e;
},members:{__bU:null,__bV:null,__bW:null,toString:function(){return this.__bU;
},getUri:function(){return this.__bV;
},getLineNumber:function(){return this.__bW;
}}});
})();
(function(){var k="Boolean",j="invalid",i="qx.ui.form.MForm",h="_applyValid",g="",f="changeRequired",e="changeValid",d="changeInvalidMessage",c="String";
qx.Mixin.define(i,{properties:{valid:{check:k,init:true,apply:h,event:e},required:{check:k,init:false,event:f},invalidMessage:{check:c,init:g,event:d}},members:{_applyValid:function(a,b){a?this.removeState(j):this.addState(j);
}}});
})();
(function(){var d="_window",c="_manager",b="qx.event.handler.Window";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(w){arguments.callee.base.call(this);
this._manager=w;
this._window=w.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(f,g){},registerEvent:function(r,s,t){},unregisterEvent:function(h,i,j){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var v=qx.event.handler.Window.SUPPORTED_TYPES;

for(var u in v){qx.bom.Event.addNativeListener(this._window,u,this._onNativeWrapper);
}},_stopWindowObserver:function(){var l=qx.event.handler.Window.SUPPORTED_TYPES;

for(var k in l){qx.bom.Event.removeNativeListener(this._window,k,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var n=this._window;
var q=n.document;
var o=q.documentElement;
var m=e.target||e.srcElement;

if(m==null||m===n||m===q||m===o){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,n]);
qx.event.Registration.dispatchEvent(n,event);
var p=event.getReturnValue();

if(p!=null){e.returnValue=p;
return p;
}}})},destruct:function(){this._stopWindowObserver();
this._disposeFields(c,d);
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var w="label",v="icon",u="Boolean",t="left",s="both",r="String",q="_applyRich",p="_applyIcon",o="changeGap",n="_applyShow",g="right",m="_applyCenter",j="_applyIconPosition",e="qx.ui.basic.Atom",d="top",i="changeShow",h="bottom",k="_applyLabel",c="Integer",l="_applyGap",f="atom";
qx.Class.define(e,{extend:qx.ui.core.Widget,construct:function(G,H){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(G!=null){this.setLabel(G);
}
if(H!=null){this.setIcon(H);
}},properties:{appearance:{refine:true,init:f},label:{apply:k,nullable:true,dispose:true,check:r},rich:{check:u,init:false,apply:q},icon:{check:r,apply:p,nullable:true,themeable:true},gap:{check:c,nullable:false,event:o,apply:l,themeable:true,init:4},show:{init:s,check:[s,w,v],themeable:true,inheritable:true,apply:n,event:i},iconPosition:{init:t,check:[d,g,h,t],themeable:true,apply:j},center:{init:false,check:u,themeable:true,apply:m}},members:{_createChildControlImpl:function(A){var B;

switch(A){case w:B=new qx.ui.basic.Label(this.getLabel());
B.setAnonymous(true);
B.setRich(this.getRich());
this._add(B);

if(this.getLabel()==null||this.getShow()===v){B.exclude();
}break;
case v:B=new qx.ui.basic.Image(this.getIcon());
B.setAnonymous(true);
this._addAt(B,0);

if(this.getIcon()==null||this.getShow()===w){B.exclude();
}break;
}return B||arguments.callee.base.call(this,A);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===v){this._excludeChildControl(w);
}else{this._showChildControl(w);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===w){this._excludeChildControl(v);
}else{this._showChildControl(v);
}},_applyLabel:function(x,y){var z=this.getChildControl(w,true);

if(z){z.setValue(x);
}this._handleLabel();
},_applyRich:function(N,O){var P=this.getChildControl(w,true);

if(P){P.setRich(N);
}},_applyIcon:function(I,J){var K=this.getChildControl(v,true);

if(K){K.setSource(I);
}this._handleIcon();
},_applyGap:function(L,M){this._getLayout().setGap(L);
},_applyShow:function(E,F){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(a,b){this._getLayout().setIconPosition(a);
},_applyCenter:function(C,D){this._getLayout().setCenter(C);
}}});
})();
(function(){var O="_applyLayoutChange",N="left",M="center",L="top",K="Decorator",J="middle",I="_applyReversed",H="bottom",G="__bc",F="__bf",C="Boolean",E="right",D="Integer",B="__bd",A="qx.ui.layout.HBox";
qx.Class.define(A,{extend:qx.ui.layout.Abstract,construct:function(bl,bm,bn){arguments.callee.base.call(this);

if(bl){this.setSpacing(bl);
}
if(bm){this.setAlignX(bm);
}
if(bn){this.setSeparator(bn);
}},properties:{alignX:{check:[N,M,E],init:N,apply:O},alignY:{check:[L,J,H],init:L,apply:O},spacing:{check:D,init:0,apply:O},separator:{check:K,nullable:true,apply:O},reversed:{check:C,init:false,apply:I}},members:{__bc:null,__bd:null,__be:null,__bf:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__bg:function(){var U=this._getLayoutChildren();
var length=U.length;
var R=false;
var P=this.__bc&&this.__bc.length!=length&&this.__bd&&this.__bc;
var S;
var Q=P?this.__bc:new Array(length);
var T=P?this.__bd:new Array(length);
if(this.getReversed()){U=U.concat().reverse();
}for(var i=0;i<length;i++){S=U[i].getLayoutProperties();

if(S.width!=null){Q[i]=parseFloat(S.width)/100;
}
if(S.flex!=null){T[i]=S.flex;
R=true;
}}if(!P){this.__bc=Q;
this.__bd=T;
}this.__be=R;
this.__bf=U;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(a,b){if(this._invalidChildrenCache){this.__bg();
}var h=this.__bf;
var length=h.length;
var s=qx.ui.layout.Util;
var r=this.getSpacing();
var v=this.getSeparator();

if(v){var e=s.computeHorizontalSeparatorGaps(h,r,v);
}else{var e=s.computeHorizontalGaps(h,r,true);
}var i,c,p,o;
var u=[];
var j=e;

for(i=0;i<length;i+=1){o=this.__bc[i];
p=o!=null?Math.floor((a-e)*o):h[i].getSizeHint().width;
u.push(p);
j+=p;
}if(this.__be&&j!=a){var m={};
var q,t;

for(i=0;i<length;i+=1){q=this.__bd[i];

if(q>0){k=h[i].getSizeHint();
m[i]={min:k.minWidth,value:u[i],max:k.maxWidth,flex:q};
}}var f=s.computeFlexOffsets(m,a,j);

for(i in f){t=f[i].offset;
u[i]+=t;
j+=t;
}}var z=h[0].getMarginLeft();
if(j<a&&this.getAlignX()!=N){z=a-j;

if(this.getAlignX()===M){z=Math.round(z/2);
}}var k,top,d,p,g,x,n;
var r=this.getSpacing();
this._clearSeparators();
if(v){var w=qx.theme.manager.Decoration.getInstance().resolve(v).getInsets();
var y=w.left+w.right;
}for(i=0;i<length;i+=1){c=h[i];
p=u[i];
k=c.getSizeHint();
x=c.getMarginTop();
n=c.getMarginBottom();
d=Math.max(k.minHeight,Math.min(b-x-n,k.maxHeight));
top=s.computeVerticalAlignOffset(c.getAlignY()||this.getAlignY(),d,b,x,n);
if(i>0){if(v){z+=g+r;
this._renderSeparator(v,{left:z,top:0,width:y,height:b});
z+=y+r+c.getMarginLeft();
}else{z+=s.collapseMargins(r,g,c.getMarginLeft());
}}c.renderLayout(z,top,p,d);
z+=p;
g=c.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__bg();
}var bc=qx.ui.layout.Util;
var bk=this.__bf;
var V=0,bd=0,ba=0;
var Y=0,bb=0;
var bh,W,bj;
for(var i=0,l=bk.length;i<l;i+=1){bh=bk[i];
W=bh.getSizeHint();
bd+=W.width;
var bg=this.__bd[i];
var X=this.__bc[i];

if(bg){V+=W.minWidth;
}else if(X){ba=Math.max(ba,Math.round(W.minWidth/X));
}else{V+=W.width;
}bj=bh.getMarginTop()+bh.getMarginBottom();
if((W.height+bj)>bb){bb=W.height+bj;
}if((W.minHeight+bj)>Y){Y=W.minHeight+bj;
}}V+=ba;
var bf=this.getSpacing();
var bi=this.getSeparator();

if(bi){var be=bc.computeHorizontalSeparatorGaps(bk,bf,bi);
}else{var be=bc.computeHorizontalGaps(bk,bf,true);
}return {minWidth:V+be,width:bd+be,minHeight:Y,height:bb};
}},destruct:function(){this._disposeFields(G,B,F);
}});
})();
(function(){var s="get",r="",q="[",p="]",o="last",n="change",m=".",l="Number",k="String",h="set",H="deepBinding",G="item",F="reset",E="' (",D="Boolean",C=").",B=") to the object '",A="Integer",z="qx.data.SingleValueBinding",y="No event could be found for the property",w="PositiveNumber",x="Binding from '",u="PositiveInteger",v="Binding does not exist!",t="Date";
qx.Class.define(z,{statics:{DEBUG_ON:false,__ci:{},bind:function(V,W,X,Y,ba){var bf=W.split(m);
var bc=this.__cp(bf);
var bi=[];
var bj=[];
var bg=[];
var bd=[];
var be=V;
for(var i=0;i<bf.length;i++){if(bc[i]!==r){bd.push(n);
}else{bd.push(this.__ck(be,bf[i]));
}bi[i]=be;
if(i==bf.length-1){if(bc[i]!==r){var bm=bc[i]===o?be.length-1:bc[i];
var bb=be.getItem(bm);
this.__co(bb,X,Y,ba,V);
bg[i]=this.__cq(be,bd[i],X,Y,ba,bc[i]);
}else{if(bf[i]!=null&&be[s+qx.lang.String.firstUp(bf[i])]!=null){var bb=be[s+qx.lang.String.firstUp(bf[i])]();
this.__co(bb,X,Y,ba,V);
}bg[i]=this.__cq(be,bd[i],X,Y,ba);
}}else{var bk={index:i,propertyNames:bf,sources:bi,listenerIds:bg,arrayIndexValues:bc,targetObject:X,targetProperty:Y,options:ba,listeners:bj};
var bh=qx.lang.Function.bind(this.__cj,this,bk);
bj.push(bh);
bg[i]=be.addListener(bd[i],bh);
}if(be[s+qx.lang.String.firstUp(bf[i])]==null){be=null;
}else if(bc[i]!==r){be=be[s+qx.lang.String.firstUp(bf[i])](bc[i]);
}else{be=be[s+qx.lang.String.firstUp(bf[i])]();
}
if(!be){break;
}}var bl={type:H,listenerIds:bg,sources:bi};
this.__cr(bl,V,W,X,Y);
return bl;
},__cj:function(cc){if(cc.options&&cc.options.onUpdate){cc.options.onUpdate(cc.sources[cc.index],cc.targetObject);
}for(var j=cc.index+1;j<cc.propertyNames.length;j++){var cg=cc.sources[j];
cc.sources[j]=null;

if(!cg){continue;
}cg.removeListenerById(cc.listenerIds[j]);
}var cg=cc.sources[cc.index];
for(var j=cc.index+1;j<cc.propertyNames.length;j++){if(cc.arrayIndexValues[j-1]!==r){cg=cg[s+qx.lang.String.firstUp(cc.propertyNames[j-1])](cc.arrayIndexValues[j-1]);
}else{cg=cg[s+qx.lang.String.firstUp(cc.propertyNames[j-1])]();
}cc.sources[j]=cg;
if(!cg){this.__cl(cc.targetObject,cc.targetProperty);
break;
}if(j==cc.propertyNames.length-1){if(qx.Class.implementsInterface(cg,qx.data.IListData)){var ch=cc.arrayIndexValues[j]===o?cg.length-1:cc.arrayIndexValues[j];
var ce=cg.getItem(ch);
this.__co(ce,cc.targetObject,cc.targetProperty,cc.options,cc.sources[cc.index]);
cc.listenerIds[j]=this.__cq(cg,n,cc.targetObject,cc.targetProperty,cc.options,cc.arrayIndexValues[j]);
}else{if(cc.propertyNames[j]!=null&&cg[s+qx.lang.String.firstUp(cc.propertyNames[j])]!=null){var ce=cg[s+qx.lang.String.firstUp(cc.propertyNames[j])]();
this.__co(ce,cc.targetObject,cc.targetProperty,cc.options,cc.sources[cc.index]);
}var cf=this.__ck(cg,cc.propertyNames[j]);
cc.listenerIds[j]=this.__cq(cg,cf,cc.targetObject,cc.targetProperty,cc.options);
}}else{if(cc.listeners[j]==null){var cd=qx.lang.Function.bind(this.__cj,this,cc);
cc.listeners.push(cd);
}if(qx.Class.implementsInterface(cg,qx.data.IListData)){var cf=n;
}else{var cf=this.__ck(cg,cc.propertyNames[j]);
}cc.listenerIds[j]=cg.addListener(cf,cc.listeners[j]);
}}},__ck:function(O,P){var Q=this.__ct(O,P);
if(Q==null){if(qx.Class.supportsEvent(O.constructor,P)){Q=P;
}else if(qx.Class.supportsEvent(O.constructor,n+qx.lang.String.firstUp(P))){Q=n+qx.lang.String.firstUp(P);
}else{throw new qx.core.AssertionError(y,P);
}}return Q;
},__cl:function(cv,cw){var cx=this.__cn(cv,cw);

if(cx!=null){var cy=cw.substring(cw.lastIndexOf(m)+1,cw.length);
if(cy.charAt(cy.length-1)==p){this.__cm(cv,cw,null);
return;
}if(cx[F+qx.lang.String.firstUp(cy)]!=undefined){cx[F+qx.lang.String.firstUp(cy)]();
}else{cx[h+qx.lang.String.firstUp(cy)](null);
}}},__cm:function(bw,bx,by){var bC=this.__cn(bw,bx);

if(bC!=null){var bD=bx.substring(bx.lastIndexOf(m)+1,bx.length);
if(bD.charAt(bD.length-1)==p){var bz=bD.substring(bD.lastIndexOf(q)+1,bD.length-1);
var bB=bD.substring(0,bD.lastIndexOf(q));
var bA=bC[s+qx.lang.String.firstUp(bB)]();

if(bz==o){bz=bA.length-1;
}
if(bA!=null){bA.setItem(bz,by);
}}else{bC[h+qx.lang.String.firstUp(bD)](by);
}}},__cn:function(bE,bF){var bI=bF.split(m);
var bJ=bE;
for(var i=0;i<bI.length-1;i++){try{var bH=bI[i];
if(bH.indexOf(p)==bH.length-1){var bG=bH.substring(bH.indexOf(q)+1,bH.length-1);
bH=bH.substring(0,bH.indexOf(q));
}bJ=bJ[s+qx.lang.String.firstUp(bH)]();

if(bG!=null){if(bG==o){bG=bJ.length-1;
}bJ=bJ.getItem(bG);
bG=null;
}}catch(g){return null;
}}return bJ;
},__co:function(bU,bV,bW,bX,bY){bU=this.__cs(bU,bV,bW,bX);
if(bU==null){this.__cl(bV,bW);
}if(bU!=undefined){try{this.__cm(bV,bW,bU);
if(bX&&bX.onUpdate){bX.onUpdate(bY,bV,bU);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(bX&&bX.onSetFail){bX.onSetFail(e);
}else{this.warn("Failed so set value "+bU+" on "+bV+". Error message: "+e);
}}}},__cp:function(bN){var bO=[];
for(var i=0;i<bN.length;i++){var name=bN[i];
if(qx.lang.String.endsWith(name,p)){var bP=name.substring(name.indexOf(q)+1,name.indexOf(p));
if(name.indexOf(p)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(bP!==o){if(bP==r||isNaN(parseInt(bP))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(q)!=0){bN[i]=name.substring(0,name.indexOf(q));
bO[i]=r;
bO[i+1]=bP;
bN.splice(i+1,0,G);
i++;
}else{bO[i]=bP;
bN.splice(i,1,G);
}}else{bO[i]=r;
}}return bO;
},__cq:function(bn,bo,bp,bq,br,bs){var bt;
{};
var bv=function(R,e){if(R!==r){if(R===o){R=bn.length-1;
}var U=bn.getItem(R);
if(U==undefined){qx.data.SingleValueBinding.__cl(bp,bq);
}var S=e.getData().start;
var T=e.getData().end;

if(R<S||R>T){return;
}}else{var U=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+bn+" by "+bo+" to "+bp+" ("+bq+")");
qx.log.Logger.debug("Data before conversion: "+U);
}U=qx.data.SingleValueBinding.__cs(U,bp,bq,br);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+U);
}try{if(U!=undefined){qx.data.SingleValueBinding.__cm(bp,bq,U);
}else{qx.data.SingleValueBinding.__cl(bp,bq);
}if(br&&br.onUpdate){br.onUpdate(bn,bp,U);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(br&&br.onSetFail){br.onSetFail(e);
}else{this.warn("Failed so set value "+U+" on "+bp+". Error message: "+e);
}}};
if(!bs){bs=r;
}bv=qx.lang.Function.bind(bv,bn,bs);
var bu=bn.addListener(bo,bv);
return bu;
},__cr:function(a,b,c,d,f){if(this.__ci[b.toHashCode()]===undefined){this.__ci[b.toHashCode()]=[];
}this.__ci[b.toHashCode()].push([a,b,c,d,f]);
},__cs:function(cm,cn,co,cp){if(cp&&cp.converter){var cr;

if(cn.getModel){cr=cn.getModel();
}return cp.converter(cm,cr);
}else{var ct=this.__cn(cn,co);
var cu=co.substring(co.lastIndexOf(m)+1,co.length);
if(ct==null){return cm;
}var cs=qx.Class.getPropertyDefinition(ct.constructor,cu);
var cq=cs==null?r:cs.check;
return this.__cu(cm,cq);
}},__ct:function(I,J){var K=qx.Class.getPropertyDefinition(I.constructor,J);

if(K==null){return null;
}return K.event;
},__cu:function(bK,bL){var bM=qx.lang.Type.getClass(bK);
if((bM==l||bM==k)&&(bL==A||bL==u)){bK=parseInt(bK);
}if((bM==D||bM==l||bM==t)&&bL==k){bK=bK+r;
}if((bM==l||bM==k)&&(bL==l||bL==w)){bK=parseFloat(bK);
}return bK;
},removeBindingFromObject:function(L,M){if(M.type==H){for(var i=0;i<M.sources.length;i++){if(M.sources[i]){M.sources[i].removeListenerById(M.listenerIds[i]);
}}}else{L.removeListenerById(M);
}var N=this.__ci[L.toHashCode()];
if(N!=undefined){for(var i=0;i<N.length;i++){if(N[i][0]==M){qx.lang.Array.remove(N,N[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(ck){{};
var cl=this.__ci[ck.toHashCode()];
for(var i=cl.length-1;i>=0;i--){this.removeBindingFromObject(ck,cl[i][0]);
}},getAllBindingsForObject:function(cz){if(this.__ci[cz.toHashCode()]===undefined){this.__ci[cz.toHashCode()]=[];
}return this.__ci[cz.toHashCode()];
},removeAllBindings:function(){for(var cb in this.__ci){var ca=qx.core.ObjectRegistry.fromHashCode(cb);
if(ca==null){delete this.__ci[cb];
continue;
}this.removeAllBindingsForObject(ca);
}this.__ci={};
},getAllBindings:function(){return this.__ci;
},showBindingInLog:function(bQ,bR){var bT;
for(var i=0;i<this.__ci[bQ.toHashCode()].length;i++){if(this.__ci[bQ.toHashCode()][i][0]==bR){bT=this.__ci[bQ.toHashCode()][i];
break;
}}
if(bT===undefined){var bS=v;
}else{var bS=x+bT[1]+E+bT[2]+B+bT[3]+E+bT[4]+C;
}qx.log.Logger.debug(bS);
},showAllBindingsInLog:function(){for(var cj in this.__ci){var ci=qx.core.ObjectRegistry.fromHashCode(cj);

for(var i=0;i<this.__ci[cj].length;i++){this.showBindingInLog(ci,this.__ci[cj][i][0]);
}}}}});
})();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";
qx.Class.define(c,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);
var j,k;

if(this._isInRange(i,d,g)){return i;
}
if(h==b||h==a){j=e.start-f.start;
k=e.end+f.end;
}else{j=e.end;
k=e.start;
}
if(j>g-k){i=j-d;
}else{i=k;
}return i;
}}});
})();
(function(){var o="losecapture",n="qx.client",m="blur",l="__fV",k="focus",j="click",i="qx.event.dispatch.MouseCapture",h="capture",g="scroll",f="__fU";
qx.Class.define(i,{extend:qx.event.dispatch.AbstractBubbling,construct:function(r){arguments.callee.base.call(this,r);
this.__fU=r.getWindow();
r.addListener(this.__fU,m,this.releaseCapture,this);
r.addListener(this.__fU,k,this.releaseCapture,this);
r.addListener(this.__fU,g,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__fV:null,__fU:null,_getParent:function(d){return d.parentNode;
},canDispatchEvent:function(a,event,b){return (this.__fV&&this.__fW[b]);
},dispatchEvent:function(p,event,q){if(q==j){event.stopPropagation();
this.releaseCapture();
return;
}arguments.callee.base.call(this,this.__fV,event,q);
},__fW:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(u){if(this.__fV===u){return;
}
if(this.__fV){this.releaseCapture();
}this.nativeSetCapture(u);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(u,o,function(){qx.bom.Event.removeNativeListener(u,o,arguments.callee);
self.releaseCapture();
});
}this.__fV=u;
qx.event.Registration.fireEvent(u,h,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__fV;
},releaseCapture:function(){var t=this.__fV;

if(!t){return;
}this.nativeReleaseCapture(t);
this.__fV=null;
qx.event.Registration.fireEvent(t,o,qx.event.type.Event,[true,false]);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(n,{"mshtml":function(c){c.setCapture();
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(n,{"mshtml":function(e){e.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this._disposeFields(l,f);
},defer:function(s){qx.event.Registration.addDispatcher(s);
}});
})();
(function(){var h="qx.client",g="qx.bom.Viewport";
qx.Class.define(g,{statics:{getWidth:qx.core.Variant.select(h,{"opera":function(o){if(qx.bom.client.Engine.VERSION<9.5){return (o||window).document.body.clientWidth;
}else{var p=(o||window).document;
return qx.bom.Document.isStandardMode(o)?p.documentElement.clientWidth:p.body.clientWidth;
}},"webkit":function(a){if(qx.bom.client.Engine.VERSION<523.15){return (a||window).innerWidth;
}else{var b=(a||window).document;
return qx.bom.Document.isStandardMode(a)?b.documentElement.clientWidth:b.body.clientWidth;
}},"default":function(i){var j=(i||window).document;
return qx.bom.Document.isStandardMode(i)?j.documentElement.clientWidth:j.body.clientWidth;
}}),getHeight:qx.core.Variant.select(h,{"opera":function(m){if(qx.bom.client.Engine.VERSION<9.5){return (m||window).document.body.clientHeight;
}else{var n=(m||window).document;
return qx.bom.Document.isStandardMode(m)?n.documentElement.clientHeight:n.body.clientHeight;
}},"webkit":function(s){if(qx.bom.client.Engine.VERSION<523.15){return (s||window).innerHeight;
}else{var t=(s||window).document;
return qx.bom.Document.isStandardMode(s)?t.documentElement.clientHeight:t.body.clientHeight;
}},"default":function(k){var l=(k||window).document;
return qx.bom.Document.isStandardMode(k)?l.documentElement.clientHeight:l.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(h,{"mshtml":function(c){var d=(c||window).document;
return d.documentElement.scrollLeft||d.body.scrollLeft;
},"default":function(r){return (r||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(h,{"mshtml":function(e){var f=(e||window).document;
return f.documentElement.scrollTop||f.body.scrollTop;
},"default":function(q){return (q||window).pageYOffset;
}})}});
})();
(function(){var m='<div style="',l='"></div>',k="mshtml",j='"/>',i="",h='" style="vertical-align:top;',g="scale",f="qx.client",e="qx.ui.decoration.Util",d='<img src="',c="overflow:hidden;";
qx.Class.define(e,{statics:{insetsModified:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var t=qx.theme.manager.Decoration.getInstance();
var v=t.resolve(a).getInsets();
var u=t.resolve(b).getInsets();

if(v.top!=u.top||v.right!=u.right||v.bottom!=u.bottom||v.left!=u.left){return true;
}return false;
},generateBackgroundMarkup:function(n,o,p,top,q){if(n){var r=qx.util.AliasManager.getInstance().resolve(n);
if(o==g){var s=qx.util.ResourceManager.getInstance().toUri(r);
return d+s+h+q+j;
}else{var back=qx.bom.element.Background.compile(r,o,p,top);
return m+back+q+l;
}}else{if(q){if(qx.core.Variant.isSet(f,k)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){q+=c;
}}return m+q+l;
}else{return i;
}}}}});
})();
(function(){var A=",",z="rgb(",y=")",x="qx.theme.manager.Color",w="qx.util.ColorUtil";
qx.Class.define(w,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(o){return this.NAMED[o]!==undefined;
},isSystemColor:function(u){return this.SYSTEM[u]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(x);
},isThemedColor:function(s){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(s);
},stringToRgb:function(m){if(this.supportsThemes()&&this.isThemedColor(m)){var m=qx.theme.manager.Color.getInstance().resolveDynamic(m);
}
if(this.isNamedColor(m)){return this.NAMED[m];
}else if(this.isSystemColor(m)){throw new Error("Could not convert system colors to RGB: "+m);
}else if(this.isRgbString(m)){return this.__cG();
}else if(this.isHex3String(m)){return this.__cI();
}else if(this.isHex6String(m)){return this.__cJ();
}throw new Error("Could not parse color: "+m);
},cssStringToRgb:function(n){if(this.isNamedColor(n)){return this.NAMED[n];
}else if(this.isSystemColor(n)){throw new Error("Could not convert system colors to RGB: "+n);
}else if(this.isRgbString(n)){return this.__cG();
}else if(this.isRgbaString(n)){return this.__cH();
}else if(this.isHex3String(n)){return this.__cI();
}else if(this.isHex6String(n)){return this.__cJ();
}throw new Error("Could not parse color: "+n);
},stringToRgbString:function(v){return this.rgbToRgbString(this.stringToRgb(v));
},rgbToRgbString:function(W){return z+W[0]+A+W[1]+A+W[2]+y;
},rgbToHexString:function(l){return (qx.lang.String.pad(l[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(l[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(l[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(bh){return this.isThemedColor(bh)||this.isNamedColor(bh)||this.isHex3String(bh)||this.isHex6String(bh)||this.isRgbString(bh);
},isCssString:function(bd){return this.isSystemColor(bd)||this.isNamedColor(bd)||this.isHex3String(bd)||this.isHex6String(bd)||this.isRgbString(bd);
},isHex3String:function(k){return this.REGEXP.hex3.test(k);
},isHex6String:function(c){return this.REGEXP.hex6.test(c);
},isRgbString:function(X){return this.REGEXP.rgb.test(X);
},isRgbaString:function(d){return this.REGEXP.rgba.test(d);
},__cG:function(){var V=parseInt(RegExp.$1,10);
var U=parseInt(RegExp.$2,10);
var T=parseInt(RegExp.$3,10);
return [V,U,T];
},__cH:function(){var j=parseInt(RegExp.$1,10);
var h=parseInt(RegExp.$2,10);
var e=parseInt(RegExp.$3,10);
return [j,h,e];
},__cI:function(){var bg=parseInt(RegExp.$1,16)*17;
var bf=parseInt(RegExp.$2,16)*17;
var be=parseInt(RegExp.$3,16)*17;
return [bg,bf,be];
},__cJ:function(){var bc=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var bb=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var ba=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [bc,bb,ba];
},hex3StringToRgb:function(Y){if(this.isHex3String(Y)){return this.__cI(Y);
}throw new Error("Invalid hex3 value: "+Y);
},hex6StringToRgb:function(bi){if(this.isHex6String(bi)){return this.__cJ(bi);
}throw new Error("Invalid hex6 value: "+bi);
},hexStringToRgb:function(a){if(this.isHex3String(a)){return this.__cI(a);
}
if(this.isHex6String(a)){return this.__cJ(a);
}throw new Error("Invalid hex value: "+a);
},rgbToHsb:function(B){var D,E,G;
var M=B[0];
var J=B[1];
var C=B[2];
var L=(M>J)?M:J;

if(C>L){L=C;
}var F=(M<J)?M:J;

if(C<F){F=C;
}G=L/255.0;

if(L!=0){E=(L-F)/L;
}else{E=0;
}
if(E==0){D=0;
}else{var I=(L-M)/(L-F);
var K=(L-J)/(L-F);
var H=(L-C)/(L-F);

if(M==L){D=H-K;
}else if(J==L){D=2.0+I-H;
}else{D=4.0+K-I;
}D=D/6.0;

if(D<0){D=D+1.0;
}}return [Math.round(D*360),Math.round(E*100),Math.round(G*100)];
},hsbToRgb:function(N){var i,f,p,q,t;
var O=N[0]/360;
var P=N[1]/100;
var Q=N[2]/100;

if(O>=1.0){O%=1.0;
}
if(P>1.0){P=1.0;
}
if(Q>1.0){Q=1.0;
}var R=Math.floor(255*Q);
var S={};

if(P==0.0){S.red=S.green=S.blue=R;
}else{O*=6.0;
i=Math.floor(O);
f=O-i;
p=Math.floor(R*(1.0-P));
q=Math.floor(R*(1.0-(P*f)));
t=Math.floor(R*(1.0-(P*(1.0-f))));

switch(i){case 0:S.red=R;
S.green=t;
S.blue=p;
break;
case 1:S.red=q;
S.green=R;
S.blue=p;
break;
case 2:S.red=p;
S.green=R;
S.blue=t;
break;
case 3:S.red=p;
S.green=q;
S.blue=R;
break;
case 4:S.red=t;
S.green=p;
S.blue=R;
break;
case 5:S.red=R;
S.green=p;
S.blue=q;
break;
}}return S;
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var l="/",k="0",j="qx/static",i="__cy",h="http://",g="https://",f="file://",e="qx.util.AliasManager",d="singleton",c=".",b="static";
qx.Class.define(e,{type:d,extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__cy={};
this.add(b,j);
},members:{__cy:null,_preprocess:function(m){var p=this._getDynamic();

if(p[m]===false){return m;
}else if(p[m]===undefined){if(m.charAt(0)===l||m.charAt(0)===c||m.indexOf(h)===0||m.indexOf(g)===k||m.indexOf(f)===0){p[m]=false;
return m;
}
if(this.__cy[m]){return this.__cy[m];
}var o=m.substring(0,m.indexOf(l));
var n=this.__cy[o];

if(n!==undefined){p[m]=n+m.substring(o.length);
}}return m;
},add:function(s,t){this.__cy[s]=t;
var v=this._getDynamic();
for(var u in v){if(u.substring(0,u.indexOf(l))===s){v[u]=t+u.substring(s.length);
}}},remove:function(a){delete this.__cy[a];
},resolve:function(q){var r=this._getDynamic();

if(q!==null){q=this._preprocess(q);
}return r[q]||q;
}},destruct:function(){this._disposeFields(i);
}});
})();
(function(){var q="qx.dynlocale",p="text",o="qx.client",n="color",m="userSelect",l="changeLocale",k="enabled",j="none",i="on",h="_applyTextAlign",M="Boolean",L="__fX",K="qx.ui.core.Widget",J="gecko",I="changeTextAlign",H="changeValue",G="changeContent",F="qx.ui.basic.Label",E="A",D="_applyValue",x="center",y="_applyBuddy",v="String",w="textAlign",t="right",u="changeRich",r="_applyRich",s="click",z="label",A="webkit",C="left",B="__ga";
qx.Class.define(F,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(P){arguments.callee.base.call(this);

if(P!=null){this.setValue(P);
}
if(qx.core.Variant.isSet(q,i)){qx.locale.Manager.getInstance().addListener(l,this._onChangeLocale,this);
}},properties:{rich:{check:M,init:false,event:u,apply:r},value:{check:v,apply:D,event:H,nullable:true},buddy:{check:K,apply:y,nullable:true,init:null},textAlign:{check:[C,x,t],nullable:true,themeable:true,apply:h,event:I},appearance:{refine:true,init:z},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__fX:null,__fY:null,__ga:null,__gb:null,_getContentHint:function(){if(this.__fY){this.__gc=this.__gd();
delete this.__fY;
}return {width:this.__gc.width,height:this.__gc.height};
},_hasHeightForWidth:function(){return this.getRich();
},_applySelectable:function(T){if(qx.core.Variant.isSet(o,J)){if(T&&!this.isRich()){{};
return;
}}arguments.callee.base.call(this,T);
if(qx.core.Variant.isSet(o,A)){this.getContainerElement().setStyle(m,T?p:j);
this.getContentElement().setStyle(m,T?p:j);
}},_getContentHeightForWidth:function(S){if(!this.getRich()){return null;
}return this.__gd(S).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(U,V){this.getContentElement().setStyle(w,U);
},_applyTextColor:function(N,O){if(N){this.getContentElement().setStyle(n,qx.theme.manager.Color.getInstance().resolve(N));
}else{this.getContentElement().removeStyle(n);
}},__gc:{width:0,height:0},_applyFont:function(d,f){var g;

if(d){this.__fX=qx.theme.manager.Font.getInstance().resolve(d);
g=this.__fX.getStyles();
}else{this.__fX=null;
g=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(g);
this.__fY=true;
qx.ui.core.queue.Layout.add(this);
},__gd:function(W){var bb=qx.bom.Label;
var Y=this.getFont();
var X=Y?this.__fX.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||E;
var ba=this.getRich();
return ba?bb.getHtmlSize(content,X,W):bb.getTextSize(content,X);
},_applyBuddy:function(a,b){if(b!=null){b.removeBinding(this.__ga);
this.__ga=null;
this.removeListenerById(this.__gb);
this.__gb=null;
}
if(a!=null){this.__ga=a.bind(k,this,k);
this.__gb=this.addListener(s,a.focus,a);
}},_applyRich:function(bc){this.getContentElement().setRich(bc);
this.__fY=true;
qx.ui.core.queue.Layout.add(this);
},_onChangeLocale:qx.core.Variant.select(q,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(Q,R){this.getContentElement().setValue(Q);
this.__fY=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(G,Q,R);
}},destruct:function(){if(qx.core.Variant.isSet(q,i)){qx.locale.Manager.getInstance().removeListener(l,this._onChangeLocale,this);
}if(this.__ga!=null){var c=this.getBuddy();

if(c!=null&&!c.isDisposed()){c.removeBinding(this.__ga);
}}this._disposeFields(L,B);
}});
})();
(function(){var Y="keydown",X="keypress",W="qx.client",V="NumLock",U="keyup",T="Enter",S="0",R="9",Q="-",P="PageUp",ck="+",cj="PrintScreen",ci="gecko",ch="A",cg="Z",cf="Left",ce="F5",cd="Down",cc="Up",cb="F11",bg="F6",bh="useraction",be="F3",bf="keyinput",bc="Insert",bd="F8",ba="End",bb="/",bo="Delete",bp="*",bD="F1",bz="F4",bL="Home",bG="F2",bW="F12",bQ="PageDown",bu="F7",ca="F9",bY="F10",bX="Right",bs="text",bw="Escape",by="webkit",bB="5",bE="__fw",bH="3",bN="Meta",bS="7",bi="CapsLock",bj="input",bv="Control",bK="Space",bJ="Tab",bI="Shift",bP="Pause",bO="Unidentified",bF="qx.event.handler.Keyboard",bM="mshtml",M="mshtml|webkit",bR="6",bk="off",bl="Apps",bA="4",N="Alt",O="2",br="Scroll",bm="1",bn="8",bq="Win",bC="__ft",bU="__fv",bT="__fu",bx="autoComplete",bV=",",bt="Backspace";
qx.Class.define(bF,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(K){arguments.callee.base.call(this);
this.__ft=K;
this.__fu=K.getWindow();
if(qx.core.Variant.isSet(W,ci)){this.__fv=this.__fu;
}else{this.__fv=this.__fu.document.documentElement;
}this.__fw={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(L){if(this._identifierToKeyCodeMap[L]){return true;
}
if(L.length!=1){return false;
}
if(L>=S&&L<=R){return true;
}
if(L>=ch&&L<=cg){return true;
}
switch(L){case ck:case Q:case bp:case bb:return true;
default:return false;
}}},members:{__fx:null,__ft:null,__fu:null,__fv:null,__fw:null,__fy:null,__fz:null,canHandleEvent:function(cp,cq){},registerEvent:function(cH,cI,cJ){},unregisterEvent:function(cE,cF,cG){},_fireInputEvent:function(f,g){var h=this.__ft.getHandler(qx.event.handler.Focus);
var i=h.getActive();
if(!i||i.offsetWidth==0){i=h.getFocus();
}if(i&&i.offsetWidth!=0){var event=qx.event.Registration.createEvent(bf,qx.event.type.KeyInput,[f,i,g]);
this.__ft.dispatchEvent(i,event);
}if(this.__fu){qx.event.Registration.fireEvent(this.__fu,bh,qx.event.type.Data,[bf]);
}},_fireSequenceEvent:function(n,o,p){var q=this.__ft.getHandler(qx.event.handler.Focus);
var s=q.getActive();
if(!s||s.offsetWidth==0){s=q.getFocus();
}if(!s||s.offsetWidth==0){s=this.__ft.getWindow().document.body;
}var event=qx.event.Registration.createEvent(o,qx.event.type.KeySequence,[n,s,p]);
this.__ft.dispatchEvent(s,event);
if(qx.core.Variant.isSet(W,M)){if(o==Y&&event.getDefaultPrevented()){var r=n.keyCode;

if(!(this._isNonPrintableKeyCode(r)||r==8||r==9)){this._fireSequenceEvent(n,X,p);
}}}if(this.__fu){qx.event.Registration.fireEvent(this.__fu,bh,qx.event.type.Data,[o]);
}},_initKeyObserver:function(){this.__fx=qx.lang.Function.listener(this.__fA,this);
this.__fz=qx.lang.Function.listener(this.__fC,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fv,U,this.__fx);
Event.addNativeListener(this.__fv,Y,this.__fx);
Event.addNativeListener(this.__fv,X,this.__fz);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fv,U,this.__fx);
Event.removeNativeListener(this.__fv,Y,this.__fx);
Event.removeNativeListener(this.__fv,X,this.__fz);

for(var cy in (this.__fy||{})){var cx=this.__fy[cy];
Event.removeNativeListener(cx.target,X,cx.callback);
}delete (this.__fy);
},__fA:qx.event.GlobalError.observeMethod(qx.core.Variant.select(W,{"mshtml":function(a){a=window.event||a;
var d=a.keyCode;
var b=0;
var c=a.type;
if(!(this.__fw[d]==Y&&c==Y)){this._idealKeyHandler(d,b,c,a);
}if(c==Y){if(this._isNonPrintableKeyCode(d)||d==8||d==9){this._idealKeyHandler(d,b,X,a);
}}this.__fw[d]=c;
},"gecko":function(cz){var cD=this._keyCodeFix[cz.keyCode]||cz.keyCode;
var cB=0;
var cC=cz.type;
if(qx.bom.client.Platform.WIN){var cA=cD?this._keyCodeToIdentifier(cD):this._charCodeToIdentifier(cB);

if(!(this.__fw[cA]==Y&&cC==Y)){this._idealKeyHandler(cD,cB,cC,cz);
}this.__fw[cA]=cC;
}else{this._idealKeyHandler(cD,cB,cC,cz);
}this.__fB(cz.target,cC,cD);
},"webkit":function(j){var m=0;
var k=0;
var l=j.type;
if(qx.bom.client.Engine.VERSION<525.13){if(l==U||l==Y){m=this._charCode2KeyCode[j.charCode]||j.keyCode;
}else{if(this._charCode2KeyCode[j.charCode]){m=this._charCode2KeyCode[j.charCode];
}else{k=j.charCode;
}}this._idealKeyHandler(m,k,l,j);
}else{m=j.keyCode;
if(!(this.__fw[m]==Y&&l==Y)){this._idealKeyHandler(m,k,l,j);
}if(l==Y){if(this._isNonPrintableKeyCode(m)||m==8||m==9){this._idealKeyHandler(m,k,X,j);
}}this.__fw[m]=l;
}},"opera":function(cw){this._idealKeyHandler(cw.keyCode,0,cw.type,cw);
}})),__fB:qx.core.Variant.select(W,{"gecko":function(u,v,w){if(v===Y&&(w==33||w==34||w==38||w==40)&&u.type==bs&&u.tagName.toLowerCase()===bj&&u.getAttribute(bx)!==bk){if(!this.__fy){this.__fy={};
}var y=qx.core.ObjectRegistry.toHashCode(u);

if(this.__fy[y]){return;
}var self=this;
this.__fy[y]={target:u,callback:function(e){qx.bom.Event.stopPropagation(e);
self.__fC(e);
}};
var x=qx.event.GlobalError.observeMethod(this.__fy[y].callback);
qx.bom.Event.addNativeListener(u,X,x);
}},"default":null}),__fC:qx.event.GlobalError.observeMethod(qx.core.Variant.select(W,{"mshtml":function(cl){cl=window.event||cl;

if(this._charCode2KeyCode[cl.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cl.keyCode],0,cl.type,cl);
}else{this._idealKeyHandler(0,cl.keyCode,cl.type,cl);
}},"gecko":function(cK){var cN=this._keyCodeFix[cK.keyCode]||cK.keyCode;
var cL=cK.charCode;
var cM=cK.type;
this._idealKeyHandler(cN,cL,cM,cK);
},"webkit":function(cs){if(qx.bom.client.Engine.VERSION<525.13){var cv=0;
var ct=0;
var cu=cs.type;

if(cu==U||cu==Y){cv=this._charCode2KeyCode[cs.charCode]||cs.keyCode;
}else{if(this._charCode2KeyCode[cs.charCode]){cv=this._charCode2KeyCode[cs.charCode];
}else{ct=cs.charCode;
}}this._idealKeyHandler(cv,ct,cu,cs);
}else{if(this._charCode2KeyCode[cs.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cs.keyCode],0,cs.type,cs);
}else{this._idealKeyHandler(0,cs.keyCode,cs.type,cs);
}}},"opera":function(cr){if(this._keyCodeToIdentifierMap[cr.keyCode]){this._idealKeyHandler(cr.keyCode,0,cr.type,cr);
}else{this._idealKeyHandler(0,cr.keyCode,cr.type,cr);
}}})),_idealKeyHandler:function(F,G,H,I){if(!F&&!G){return;
}var J;
if(F){J=this._keyCodeToIdentifier(F);
this._fireSequenceEvent(I,H,J);
}else{J=this._charCodeToIdentifier(G);
this._fireSequenceEvent(I,X,J);
this._fireInputEvent(I,G);
}},_specialCharCodeMap:{8:bt,9:bJ,13:T,27:bw,32:bK},_keyCodeToIdentifierMap:{16:bI,17:bv,18:N,20:bi,224:bN,37:cf,38:cc,39:bX,40:cd,33:P,34:bQ,35:ba,36:bL,45:bc,46:bo,112:bD,113:bG,114:be,115:bz,116:ce,117:bg,118:bu,119:bd,120:ca,121:bY,122:cb,123:bW,144:V,44:cj,145:br,19:bP,91:bq,93:bl},_numpadToCharCode:{96:S.charCodeAt(0),97:bm.charCodeAt(0),98:O.charCodeAt(0),99:bH.charCodeAt(0),100:bA.charCodeAt(0),101:bB.charCodeAt(0),102:bR.charCodeAt(0),103:bS.charCodeAt(0),104:bn.charCodeAt(0),105:R.charCodeAt(0),106:bp.charCodeAt(0),107:ck.charCodeAt(0),109:Q.charCodeAt(0),110:bV.charCodeAt(0),111:bb.charCodeAt(0)},_charCodeA:ch.charCodeAt(0),_charCodeZ:cg.charCodeAt(0),_charCode0:S.charCodeAt(0),_charCode9:R.charCodeAt(0),_isNonPrintableKeyCode:function(t){return this._keyCodeToIdentifierMap[t]?true:false;
},_isIdentifiableKeyCode:function(A){if(A>=this._charCodeA&&A<=this._charCodeZ){return true;
}if(A>=this._charCode0&&A<=this._charCode9){return true;
}if(this._specialCharCodeMap[A]){return true;
}if(this._numpadToCharCode[A]){return true;
}if(this._isNonPrintableKeyCode(A)){return true;
}return false;
},_keyCodeToIdentifier:function(cn){if(this._isIdentifiableKeyCode(cn)){var co=this._numpadToCharCode[cn];

if(co){return String.fromCharCode(co);
}return (this._keyCodeToIdentifierMap[cn]||this._specialCharCodeMap[cn]||String.fromCharCode(cn));
}else{return bO;
}},_charCodeToIdentifier:function(cm){return this._specialCharCodeMap[cm]||String.fromCharCode(cm).toUpperCase();
},_identifierToKeyCode:function(z){return qx.event.handler.Keyboard._identifierToKeyCodeMap[z]||z.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this._disposeFields(bC,bT,bU,bE);
},defer:function(B,C,D){qx.event.Registration.addHandler(B);
if(!B._identifierToKeyCodeMap){B._identifierToKeyCodeMap={};

for(var E in C._keyCodeToIdentifierMap){B._identifierToKeyCodeMap[C._keyCodeToIdentifierMap[E]]=parseInt(E,10);
}
for(var E in C._specialCharCodeMap){B._identifierToKeyCodeMap[C._specialCharCodeMap[E]]=parseInt(E,10);
}}
if(qx.core.Variant.isSet(W,bM)){C._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(W,ci)){C._keyCodeFix={12:C._identifierToKeyCode(V)};
}else if(qx.core.Variant.isSet(W,by)){if(qx.bom.client.Engine.VERSION<525.13){C._charCode2KeyCode={63289:C._identifierToKeyCode(V),63276:C._identifierToKeyCode(P),63277:C._identifierToKeyCode(bQ),63275:C._identifierToKeyCode(ba),63273:C._identifierToKeyCode(bL),63234:C._identifierToKeyCode(cf),63232:C._identifierToKeyCode(cc),63235:C._identifierToKeyCode(bX),63233:C._identifierToKeyCode(cd),63272:C._identifierToKeyCode(bo),63302:C._identifierToKeyCode(bc),63236:C._identifierToKeyCode(bD),63237:C._identifierToKeyCode(bG),63238:C._identifierToKeyCode(be),63239:C._identifierToKeyCode(bz),63240:C._identifierToKeyCode(ce),63241:C._identifierToKeyCode(bg),63242:C._identifierToKeyCode(bu),63243:C._identifierToKeyCode(bd),63244:C._identifierToKeyCode(ca),63245:C._identifierToKeyCode(bY),63246:C._identifierToKeyCode(cb),63247:C._identifierToKeyCode(bW),63248:C._identifierToKeyCode(cj),3:C._identifierToKeyCode(T),12:C._identifierToKeyCode(V),13:C._identifierToKeyCode(T)};
}else{C._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var n="",m="qx.client",l="readOnly",k="accessKey",j="qx.bom.element.Attribute",i="rowSpan",h="vAlign",g="className",f="textContent",e="'",B="htmlFor",A="longDesc",z="cellSpacing",y="frameBorder",x="='",w="useMap",v="innerText",u="innerHTML",t="tabIndex",s="dateTime",q="maxLength",r="mshtml",o="cellPadding",p="colSpan";
qx.Class.define(j,{statics:{__gP:{names:{"class":g,"for":B,html:u,text:qx.core.Variant.isSet(m,r)?v:f,colspan:p,rowspan:i,valign:h,datetime:s,accesskey:k,tabindex:t,maxlength:q,readonly:l,longdesc:A,cellpadding:o,cellspacing:z,frameborder:y,usemap:w},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:n,maxLength:10000000,className:n,innerHTML:n,innerText:n,textContent:n,htmlFor:n,tabIndex:0},original:{href:1,src:1,type:1}},compile:function(I){var J=[];
var L=this.__gP.runtime;

for(var K in I){if(!L[K]){J.push(K,x,I[K],e);
}}return J.join(n);
},get:qx.core.Variant.select(m,{"mshtml":function(F,name){var H=this.__gP;
var G;
name=H.names[name]||name;
if(H.original[name]){G=F.getAttribute(name,2);
}else if(H.property[name]){if(H.propertyDefault[name]&&G==H.propertyDefault[name]){return null;
}G=F[name];
}else{G=F.getAttribute(name);
}if(H.bools[name]){return !!G;
}return G;
},"default":function(C,name){var E=this.__gP;
var D;
name=E.names[name]||name;
if(E.property[name]){if(E.propertyDefault[name]&&D==E.propertyDefault[name]){return null;
}D=C[name];

if(D==null){D=C.getAttribute(name);
}}else{D=C.getAttribute(name);
}if(E.bools[name]){return !!D;
}return D;
}}),set:function(a,name,b){var c=this.__gP;
name=c.names[name]||name;
if(c.bools[name]){b=!!b;
}if(c.property[name]){if(b==null){b=c.propertyDefault[name];

if(b===undefined){b=null;
}}a[name]=b;
}else{if(b===true){a.setAttribute(name,name);
}else if(b===false||b===null){a.removeAttribute(name);
}else{a.setAttribute(name,b);
}}},reset:function(d,name){this.set(d,name,null);
}}});
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
},resolve:function(p){var s=this._dynamic;
var q=s[p];

if(q){return q;
}var r=this.getTheme();

if(r!==null&&r.colors[p]){return s[p]=r.colors[p];
}return p;
},isDynamic:function(m){var o=this._dynamic;

if(m&&(o[m]!==undefined)){return true;
}var n=this.getTheme();

if(n!==null&&m&&(n.colors[m]!==undefined)){o[m]=n.colors[m];
return true;
}return false;
}}});
})();
(function(){var f="appearance",e="qx.ui.core.queue.Appearance";
qx.Class.define(e,{statics:{__hg:{},remove:function(b){delete this.__hg[b.$$hash];
},add:function(c){var d=this.__hg;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(f);
},has:function(a){return !!this.__hg[a.$$hash];
},flush:function(){var j=qx.ui.core.queue.Visibility;
var g=this.__hg;
var i;

for(var h in g){i=g[h];
delete g[h];
if(j.isVisible(i)){i.syncAppearance();
}else{i.$$stateChanges=true;
}}}}});
})();
(function(){var y="top",x="right",w="bottom",v="left",u="align-start",t="qx.util.placement.AbstractAxis",s="edge-start",r="align-end",q="edge-end",p="-",m="best-fit",o="qx.util.placement.Placement",n="keep-align",l="direct",k='__hD';
qx.Class.define(o,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hD=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:t},axisY:{check:t},edge:{check:[y,x,w,v],init:y},align:{check:[y,x,w,v],init:x}},statics:{__hE:null,compute:function(a,b,c,d,e,f,g){this.__hE=this.__hE||new qx.util.placement.Placement();
var j=e.split(p);
var i=j[0];
var h=j[1];
this.__hE.set({axisX:this.__hI(f),axisY:this.__hI(g),edge:i,align:h});
return this.__hE.compute(a,b,c,d);
},__hF:null,__hG:null,__hH:null,__hI:function(B){switch(B){case l:this.__hF=this.__hF||new qx.util.placement.DirectAxis();
return this.__hF;
case n:this.__hG=this.__hG||new qx.util.placement.KeepAlignAxis();
return this.__hG;
case m:this.__hH=this.__hH||new qx.util.placement.BestFitAxis();
return this.__hH;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__hD:null,compute:function(C,D,E,F){{};
var G=this.getAxisX()||this.__hD;
var I=G.computeStart(C.width,{start:E.left,end:E.right},{start:F.left,end:F.right},D.width,this.__hJ());
var H=this.getAxisY()||this.__hD;
var top=H.computeStart(C.height,{start:E.top,end:E.bottom},{start:F.top,end:F.bottom},D.height,this.__hK());
return {left:I,top:top};
},__hJ:function(){var A=this.getEdge();
var z=this.getAlign();

if(A==v){return s;
}else if(A==x){return q;
}else if(z==v){return u;
}else if(z==x){return r;
}},__hK:function(){var K=this.getEdge();
var J=this.getAlign();

if(K==y){return s;
}else if(K==w){return q;
}else if(J==y){return u;
}else if(J==w){return r;
}}},destruct:function(){this._disposeObjects(k);
}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IForm";
qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(d){return arguments.length==1;
},getEnabled:function(){},setRequired:function(c){return arguments.length==1;
},getRequired:function(){},setValid:function(e){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(f){return arguments.length==1;
},getInvalidMessage:function(){}}});
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
(function(){var z="qx.client",y="qx.dom.Hierarchy",x="previousSibling",w="*",v="nextSibling",u="parentNode";
qx.Class.define(y,{statics:{getNodeIndex:function(J){var K=0;

while(J&&(J=J.previousSibling)){K++;
}return K;
},getElementIndex:function(f){var g=0;
var h=qx.dom.Node.ELEMENT;

while(f&&(f=f.previousSibling)){if(f.nodeType==h){g++;
}}return g;
},getNextElementSibling:function(n){while(n&&(n=n.nextSibling)&&!qx.dom.Node.isElement(n)){continue;
}return n||null;
},getPreviousElementSibling:function(t){while(t&&(t=t.previousSibling)&&!qx.dom.Node.isElement(t)){continue;
}return t||null;
},contains:qx.core.Variant.select(z,{"webkit|mshtml|opera":function(k,l){if(qx.dom.Node.isDocument(k)){var m=qx.dom.Node.getDocument(l);
return k&&m==k;
}else if(qx.dom.Node.isDocument(l)){return false;
}else{return k.contains(l);
}},"gecko":function(C,D){return !!(C.compareDocumentPosition(D)&16);
},"default":function(o,p){while(p){if(o==p){return true;
}p=p.parentNode;
}return false;
}}),isRendered:function(A){if(!A.offsetParent){return false;
}var B=A.ownerDocument||A.document;
if(B.body.contains){return B.body.contains(A);
}if(B.compareDocumentPosition){return !!(B.compareDocumentPosition(A)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(q,r){return this.contains(r,q);
},getCommonParent:qx.core.Variant.select(z,{"mshtml|opera":function(U,V){if(U===V){return U;
}
while(U&&qx.dom.Node.isElement(U)){if(U.contains(V)){return U;
}U=U.parentNode;
}return null;
},"default":function(O,P){if(O===P){return O;
}var Q={};
var T=qx.core.ObjectRegistry;
var S,R;

while(O||P){if(O){S=T.toHashCode(O);

if(Q[S]){return Q[S];
}Q[S]=O;
O=O.parentNode;
}
if(P){R=T.toHashCode(P);

if(Q[R]){return Q[R];
}Q[R]=P;
P=P.parentNode;
}}return null;
}}),getAncestors:function(a){return this._recursivelyCollect(a,u);
},getChildElements:function(E){E=E.firstChild;

if(!E){return [];
}var F=this.getNextSiblings(E);

if(E.nodeType===1){F.unshift(E);
}return F;
},getDescendants:function(e){return qx.lang.Array.fromCollection(e.getElementsByTagName(w));
},getFirstDescendant:function(j){j=j.firstChild;

while(j&&j.nodeType!=1){j=j.nextSibling;
}return j;
},getLastDescendant:function(M){M=M.lastChild;

while(M&&M.nodeType!=1){M=M.previousSibling;
}return M;
},getPreviousSiblings:function(N){return this._recursivelyCollect(N,x);
},getNextSiblings:function(s){return this._recursivelyCollect(s,v);
},_recursivelyCollect:function(G,H){var I=[];

while(G=G[H]){if(G.nodeType==1){I.push(G);
}}return I;
},getSiblings:function(i){return this.getPreviousSiblings(i).reverse().concat(this.getNextSiblings(i));
},isEmpty:function(L){L=L.firstChild;

while(L){if(L.nodeType===qx.dom.Node.ELEMENT||L.nodeType===qx.dom.Node.TEXT){return false;
}L=L.nextSibling;
}return true;
},cleanWhitespace:function(b){var c=b.firstChild;

while(c){var d=c.nextSibling;

if(c.nodeType==3&&!/\S/.test(c.nodeValue)){b.removeChild(c);
}c=d;
}}}});
})();
(function(){var c="qx.event.handler.Capture";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(a,b){},registerEvent:function(d,e,f){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var s="",r="qx.client",q=";",p="filter",o="opacity:",n="opacity",m="MozOpacity",l=");",k=")",j="zoom:1;filter:alpha(opacity=",g="qx.bom.element.Opacity",i="alpha(opacity=",h="-moz-opacity:";
qx.Class.define(g,{statics:{compile:qx.core.Variant.select(r,{"mshtml":function(C){if(C>=1){return s;
}
if(C<0.00001){C=0;
}return j+(C*100)+l;
},"gecko":function(w){if(w==1){w=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return h+w+q;
}else{return o+w+q;
}},"default":function(a){if(a==1){return s;
}return o+a+q;
}}),set:qx.core.Variant.select(r,{"mshtml":function(t,u){var v=qx.bom.element.Style.get(t,p,qx.bom.element.Style.COMPUTED_MODE,false);
if(u>=1){t.style.filter=v.replace(/alpha\([^\)]*\)/gi,s);
return;
}
if(u<0.00001){u=0;
}if(!t.currentStyle||!t.currentStyle.hasLayout){t.style.zoom=1;
}t.style.filter=v.replace(/alpha\([^\)]*\)/gi,s)+i+u*100+k;
},"gecko":function(x,y){if(y==1){y=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){x.style.MozOpacity=y;
}else{x.style.opacity=y;
}},"default":function(e,f){if(f==1){f=s;
}e.style.opacity=f;
}}),reset:qx.core.Variant.select(r,{"mshtml":function(I){var J=qx.bom.element.Style.get(I,p,qx.bom.element.Style.COMPUTED_MODE,false);
I.style.filter=J.replace(/alpha\([^\)]*\)/gi,s);
},"gecko":function(H){if(qx.bom.client.Engine.VERSION<1.7){H.style.MozOpacity=s;
}else{H.style.opacity=s;
}},"default":function(K){K.style.opacity=s;
}}),get:qx.core.Variant.select(r,{"mshtml":function(D,E){var F=qx.bom.element.Style.get(D,p,E,false);

if(F){var G=F.match(/alpha\(opacity=(.*)\)/);

if(G&&G[1]){return parseFloat(G[1])/100;
}}return 1.0;
},"gecko":function(z,A){var B=qx.bom.element.Style.get(z,qx.bom.client.Engine.VERSION<1.7?m:n,A,false);

if(B==0.999999){B=1.0;
}
if(B!=null){return parseFloat(B);
}return 1.0;
},"default":function(b,c){var d=qx.bom.element.Style.get(b,n,c,false);

if(d!=null){return parseFloat(d);
}return 1.0;
}})}});
})();
(function(){var b="qx.ui.core.queue.Layout",a="layout";
qx.Class.define(b,{statics:{__ep:{},remove:function(m){delete this.__ep[m.$$hash];
},add:function(c){this.__ep[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var h=this.__es();
for(var i=h.length-1;i>=0;i--){var j=h[i];
if(j.hasValidLayout()){continue;
}if(j.isRootWidget()&&!j.hasUserBounds()){var l=j.getSizeHint();
j.renderLayout(0,0,l.width,l.height);
}else{var k=j.getBounds();
j.renderLayout(k.left,k.top,k.width,k.height);
}}},getNestingLevel:function(d){var e=this.__er;
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
},__eq:function(){var s=qx.ui.core.queue.Visibility;
this.__er={};
var r=[];
var q=this.__ep;
var n,p;

for(var o in q){n=q[o];

if(s.isVisible(n)){p=this.getNestingLevel(n);
if(!r[p]){r[p]={};
}r[p][o]=n;
delete q[o];
}}return r;
},__es:function(){var w=[];
var y=this.__eq();

for(var v=y.length-1;v>=0;v--){if(!y[v]){continue;
}
for(var u in y[v]){var t=y[v][u];
if(v==0||t.isRootWidget()||t.hasUserBounds()){w.push(t);
t.invalidateLayoutCache();
continue;
}var A=t.getSizeHint(false);

if(A){t.invalidateLayoutCache();
var x=t.getSizeHint();
var z=(!t.getBounds()||A.minWidth!==x.minWidth||A.width!==x.width||A.maxWidth!==x.maxWidth||A.minHeight!==x.minHeight||A.height!==x.height||A.maxHeight!==x.maxHeight);
}else{z=true;
}
if(z){var parent=t.getLayoutParent();

if(!y[v-1]){y[v-1]={};
}y[v-1][parent.$$hash]=parent;
}else{w.push(t);
}}}return w;
}}});
})();
(function(){var x="auto",w="px",v=",",u="clip:auto;",t="rect(",s=");",r="",q=")",p="qx.bom.element.Clip",o="string",l="rect(auto)",n="clip:rect(",m="clip",k="rect(auto,auto,auto,auto)";
qx.Class.define(p,{statics:{compile:function(F){if(!F){return u;
}var K=F.left;
var top=F.top;
var J=F.width;
var I=F.height;
var G,H;

if(K==null){G=(J==null?x:J+w);
K=x;
}else{G=(J==null?x:K+J+w);
K=K+w;
}
if(top==null){H=(I==null?x:I+w);
top=x;
}else{H=(I==null?x:top+I+w);
top=top+w;
}return n+top+v+G+v+H+v+K+s;
},get:function(a,b){var d=qx.bom.element.Style.get(a,m,b,false);
var i,top,g,f;
var c,e;

if(typeof d===o&&d!==x&&d!==r){d=qx.lang.String.trim(d);
if(/\((.*)\)/.test(d)){var h=RegExp.$1.split(v);
top=qx.lang.String.trim(h[0]);
c=qx.lang.String.trim(h[1]);
e=qx.lang.String.trim(h[2]);
i=qx.lang.String.trim(h[3]);
if(i===x){i=null;
}
if(top===x){top=null;
}
if(c===x){c=null;
}
if(e===x){e=null;
}if(top!=null){top=parseInt(top,10);
}
if(c!=null){c=parseInt(c,10);
}
if(e!=null){e=parseInt(e,10);
}
if(i!=null){i=parseInt(i,10);
}if(c!=null&&i!=null){g=c-i;
}else if(c!=null){g=c;
}
if(e!=null&&top!=null){f=e-top;
}else if(e!=null){f=e;
}}else{throw new Error("Could not parse clip string: "+d);
}}return {left:i||null,top:top||null,width:g||null,height:f||null};
},set:function(y,z){if(!z){y.style.clip=k;
return;
}var E=z.left;
var top=z.top;
var D=z.width;
var C=z.height;
var A,B;

if(E==null){A=(D==null?x:D+w);
E=x;
}else{A=(D==null?x:E+D+w);
E=E+w;
}
if(top==null){B=(C==null?x:C+w);
top=x;
}else{B=(C==null?x:top+C+w);
top=top+w;
}y.style.clip=t+top+v+A+v+B+v+E+q;
},reset:function(j){j.style.clip=qx.bom.client.Engine.MSHTML?l:x;
}}});
})();
(function(){var s="load",r="unload",q="qx.client",p="ready",o="mshtml",n="qx.event.handler.Application",m="complete",l="gecko|opera|webkit",k="left",j="_window",h="DOMContentLoaded",i="shutdown";
qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(v){arguments.callee.base.call(this);
this._window=v.getWindow();
this.__bY=false;
this.__ca=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__cb:false,onScriptLoaded:function(){this.__cb=true;
var f=qx.event.handler.Application.$$instance;

if(f){f.__ce();
}}},members:{canHandleEvent:function(t,u){},registerEvent:function(b,c,d){},unregisterEvent:function(x,y,z){},__cc:null,__bY:null,__ca:null,__cd:null,__ce:function(){var a=qx.event.handler.Application;
if(!this.__cc&&this.__bY&&a.__cb){this.__cc=true;
qx.event.Registration.fireEvent(this._window,p);
}},isApplicationReady:function(){return this.__cc;
},_initObserver:function(){if(qx.$$domReady||document.readyState==m){this.__bY=true;
this.__ce();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(q,l)){qx.bom.Event.addNativeListener(this._window,h,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(q,o)){var A=function(){try{document.documentElement.doScroll(k);
this._onNativeLoadWrapped();
}catch(w){window.setTimeout(A,100);
}};
A();
}qx.bom.Event.addNativeListener(this._window,s,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,r,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,s,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,r,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__bY=true;
this.__ce();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cd){this.__cd=true;

try{qx.event.Registration.fireEvent(this._window,i);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._disposeFields(j);
},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var j="qx.theme.manager.Font",i="Theme",h="changeTheme",g="_applyTheme",f="singleton";
qx.Class.define(j,{type:f,extend:qx.util.ValueManager,properties:{theme:{check:i,nullable:true,apply:g,event:h}},members:{resolveDynamic:function(o){var p=this._dynamic;
return o instanceof qx.bom.Font?o:p[o];
},resolve:function(k){var n=this._dynamic;
var l=n[k];

if(l){return l;
}var m=this.getTheme();

if(m!==null&&m.fonts[k]){return n[k]=(new qx.bom.Font).set(m.fonts[k]);
}return k;
},isDynamic:function(q){var s=this._dynamic;

if(q&&(q instanceof qx.bom.Font||s[q]!==undefined)){return true;
}var r=this.getTheme();

if(r!==null&&q&&r.fonts[q]){s[q]=(new qx.bom.Font).set(r.fonts[q]);
return true;
}return false;
},_applyTheme:function(a){var b=this._getDynamic();

for(var e in b){if(b[e].themed){b[e].dispose();
delete b[e];
}}
if(a){var c=a.fonts;
var d=qx.bom.Font;

for(var e in c){b[e]=(new d).set(c[e]);
b[e].themed=true;
}}this._setDynamic(b);
}}});
})();
(function(){var f="source",e="scale",d="no-repeat",c="mshtml",b="qx.client",a="qx.html.Image";
qx.Class.define(a,{extend:qx.html.Element,members:{_applyProperty:function(name,j){arguments.callee.base.call(this,name,j);

if(name===f){var n=this.getDomElement();
var k=this.getAllStyles();
var l=this._getProperty(f);
var m=this._getProperty(e);
var o=m?e:d;
qx.bom.element.Decoration.update(n,l,o,k);
}},_createDomElement:function(){var h=this._getProperty(e);
var i=h?e:d;

if(qx.core.Variant.isSet(b,c)){var g=this._getProperty(f);
this.setNodeName(qx.bom.element.Decoration.getTagName(i,g));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(i));
}return arguments.callee.base.call(this);
},_copyData:function(r){return arguments.callee.base.call(this,true);
},setSource:function(q){this._setProperty(f,q);
return this;
},getSource:function(){return this._getProperty(f);
},resetSource:function(){this._removeProperty(f);
return this;
},setScale:function(p){this._setProperty(e,p);
return this;
},getScale:function(){return this._getProperty(e);
}}});
})();
(function(){var b="qx.ui.core.MLayoutHandling";
qx.Mixin.define(b,{members:{setLayout:function(c){return this._setLayout(c);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(a){a.getLayout=a._getLayout;
a.setLayout=a._setLayout;
}}});
})();
(function(){var h="qx.event.type.Data",g="qx.ui.container.Composite",f="addChildWidget",e="removeChildWidget";
qx.Class.define(g,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(d){arguments.callee.base.call(this);

if(d!=null){this._setLayout(d);
}},events:{addChildWidget:h,removeChildWidget:h},members:{_afterAddChild:function(i){this.fireNonBubblingEvent(f,qx.event.type.Data,[i]);
},_afterRemoveChild:function(c){this.fireNonBubblingEvent(e,qx.event.type.Data,[c]);
}},defer:function(a,b){qx.ui.core.MChildrenHandling.remap(b);
qx.ui.core.MLayoutHandling.remap(b);
}});
})();
(function(){var p="mshtml",o="qx.client",n="qx.bom.element.Dimension",m="paddingRight",l="paddingLeft",k="paddingTop",j="paddingBottom";
qx.Class.define(n,{statics:{getWidth:qx.core.Variant.select(o,{"gecko":function(s){if(s.getBoundingClientRect){var t=s.getBoundingClientRect();
return Math.round(t.right)-Math.round(t.left);
}else{return s.offsetWidth;
}},"default":function(r){return r.offsetWidth;
}}),getHeight:qx.core.Variant.select(o,{"gecko":function(a){if(a.getBoundingClientRect){var b=a.getBoundingClientRect();
return Math.round(b.bottom)-Math.round(b.top);
}else{return a.offsetHeight;
}},"default":function(v){return v.offsetHeight;
}}),getSize:function(q){return {width:this.getWidth(q),height:this.getHeight(q)};
},__ie:{visible:true,hidden:true},getContentWidth:function(c){var e=qx.bom.element.Style;
var f=qx.bom.element.Overflow.getX(c);
var g=parseInt(e.get(c,l),10);
var i=parseInt(e.get(c,m),10);

if(this.__ie[f]){return c.clientWidth-g-i;
}else{if(c.clientWidth>=c.scrollWidth){return Math.max(c.clientWidth,c.scrollWidth)-g-i;
}else{var h=c.scrollWidth-g;
var d=qx.bom.client.Engine;

if(d.NAME===p&&d.VERSION==6){h-=i;
}return h;
}}},getContentHeight:function(w){var y=qx.bom.element.Style;
var A=qx.bom.element.Overflow.getY(w);
var B=parseInt(y.get(w,k),10);
var z=parseInt(y.get(w,j),10);

if(this.__ie[A]){return w.clientHeight-B-z;
}else{if(w.clientHeight>=w.scrollHeight){return Math.max(w.clientHeight,w.scrollHeight)-B-z;
}else{var C=w.scrollHeight-B;
var x=qx.bom.client.Engine;

if(x.NAME===p&&x.VERSION==6){C-=z;
}return C;
}}},getContentSize:function(u){return {width:this.getContentWidth(u),height:this.getContentHeight(u)};
}}});
})();
(function(){var u="qx.client",t="",s="mshtml",r="'",q="SelectionLanguage",p="qx.xml.Document",o=" />",n="MSXML2.DOMDocument.3.0",m='<\?xml version="1.0" encoding="utf-8"?>\n<',k="MSXML2.XMLHTTP.3.0",f="MSXML2.XMLHTTP.6.0",j=" xmlns='",h="text/xml",e="XPath",d="MSXML2.DOMDocument.6.0",g="HTML";
qx.Bootstrap.define(p,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(E){if(E.nodeType===9){return E.documentElement.nodeName!==g;
}else if(E.ownerDocument){return this.isXmlDocument(E.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(u,{"mshtml":function(v,w){var x=new ActiveXObject(this.DOMDOC);
x.setProperty(q,e);

if(w){var y=m;
y+=w;

if(v){y+=j+v+r;
}y+=o;
x.loadXML(y);
}return x;
},"default":function(z,A){return document.implementation.createDocument(z||t,A||t,null);
}}),fromString:qx.core.Variant.select(u,{"mshtml":function(b){var c=qx.xml.Document.create();
c.loadXML(b);
return c;
},"default":function(F){var G=new DOMParser();
return G.parseFromString(F,h);
}})},defer:function(B){if(qx.core.Variant.isSet(u,s)){var C=[d,n];
var D=[f,k];

for(var i=0,l=C.length;i<l;i++){try{new ActiveXObject(C[i]);
new ActiveXObject(D[i]);
}catch(a){continue;
}B.DOMDOC=C[i];
B.XMLHTTP=D[i];
break;
}}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__hd:{},__he:{},remove:function(i){var j=i.$$hash;
delete this.__he[j];
delete this.__hd[j];
},isVisible:function(c){return this.__he[c.$$hash]||false;
},__hf:function(k){var m=this.__he;
var l=k.$$hash;
var n;
if(k.isExcluded()){n=false;
}else{var parent=k.$$parent;

if(parent){n=this.__hf(parent);
}else{n=k.isRootWidget();
}}return m[l]=n;
},add:function(o){var p=this.__hd;

if(p[o.$$hash]){return;
}p[o.$$hash]=o;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var d=this.__hd;
var h=this.__he;
for(var e in d){if(h[e]!=null){d[e].addChildrenToQueue(d);
}}var g={};

for(var e in d){g[e]=h[e];
h[e]=null;
}for(var e in d){var f=d[e];
delete d[e];
if(h[e]==null){this.__hf(f);
}if(h[e]&&h[e]!=g[e]){f.checkAppearanceNeeds();
}}this.__hd={};
}}});
})();
(function(){var cK="left",cJ="top",cI="_applyLayoutChange",cH="hAlign",cG="flex",cF="vAlign",cE="Integer",cD="__bp",cC="__bo",cB="minWidth",cu="width",cA="minHeight",cx="__bk",cs="__bh",cr="qx.ui.layout.Grid",cw="__bj",cv="height",cy="__bl",cq="maxHeight",cz="maxWidth",ct="__bi";
qx.Class.define(cr,{extend:qx.ui.layout.Abstract,construct:function(cm,cn){arguments.callee.base.call(this);
this.__bh=[];
this.__bi=[];

if(cm){this.setSpacingX(cm);
}
if(cn){this.setSpacingY(cn);
}},properties:{spacingX:{check:cE,init:0,apply:cI},spacingY:{check:cE,init:0,apply:cI}},members:{__bj:null,__bh:null,__bi:null,__bk:null,__bl:null,__bm:null,__bn:null,__bo:null,__bp:null,verifyLayoutProperty:null,__bq:function(){var A=[];
var z=[];
var B=[];
var v=0;
var u=0;
var D=this._getLayoutChildren();

for(var i=0,l=D.length;i<l;i++){var w=D[i];
var C=w.getLayoutProperties();
var E=C.row;
var t=C.column;
C.colSpan=C.colSpan||1;
C.rowSpan=C.rowSpan||1;
if(E==null||t==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+w+"' must be defined!");
}
if(A[E]&&A[E][t]){throw new Error("Cannot add widget '"+w+"'!. "+"There is already a widget '"+A[E][t]+"' in this cell ("+E+", "+t+")");
}
for(var x=t;x<t+C.colSpan;x++){for(var y=E;y<E+C.rowSpan;y++){if(A[y]==undefined){A[y]=[];
}A[y][x]=w;
u=Math.max(u,x);
v=Math.max(v,y);
}}
if(C.rowSpan>1){B.push(w);
}
if(C.colSpan>1){z.push(w);
}}for(var y=0;y<=v;y++){if(A[y]==undefined){A[y]=[];
}}this.__bj=A;
this.__bk=z;
this.__bl=B;
this.__bm=v;
this.__bn=u;
this.__bo=null;
this.__bp=null;
delete this._invalidChildrenCache;
},_setRowData:function(bE,bF,bG){var bH=this.__bh[bE];

if(!bH){this.__bh[bE]={};
this.__bh[bE][bF]=bG;
}else{bH[bF]=bG;
}},_setColumnData:function(cQ,cR,cS){var cT=this.__bi[cQ];

if(!cT){this.__bi[cQ]={};
this.__bi[cQ][cR]=cS;
}else{cT[cR]=cS;
}},setSpacing:function(cN){this.setSpacingY(cN);
this.setSpacingX(cN);
return this;
},setColumnAlign:function(dd,de,df){{};
this._setColumnData(dd,cH,de);
this._setColumnData(dd,cF,df);
this._applyLayoutChange();
return this;
},getColumnAlign:function(bx){var by=this.__bi[bx]||{};
return {vAlign:by.vAlign||cJ,hAlign:by.hAlign||cK};
},setRowAlign:function(bs,bt,bu){{};
this._setRowData(bs,cH,bt);
this._setRowData(bs,cF,bu);
this._applyLayoutChange();
return this;
},getRowAlign:function(cO){var cP=this.__bh[cO]||{};
return {vAlign:cP.vAlign||cJ,hAlign:cP.hAlign||cK};
},getCellWidget:function(cL,cM){if(this._invalidChildrenCache){this.__bq();
}var cL=this.__bj[cL]||{};
return cL[cM]||null;
},getCellAlign:function(cU,cV){var dc=cJ;
var da=cK;
var db=this.__bh[cU];
var cX=this.__bi[cV];
var cW=this.__bj[cU][cV];

if(cW){var cY={vAlign:cW.getAlignY(),hAlign:cW.getAlignX()};
}else{cY={};
}if(cY.vAlign){dc=cY.vAlign;
}else if(db&&db.vAlign){dc=db.vAlign;
}else if(cX&&cX.vAlign){dc=cX.vAlign;
}if(cY.hAlign){da=cY.hAlign;
}else if(cX&&cX.hAlign){da=cX.hAlign;
}else if(db&&db.hAlign){da=db.hAlign;
}return {vAlign:dc,hAlign:da};
},setColumnFlex:function(r,s){this._setColumnData(r,cG,s);
this._applyLayoutChange();
return this;
},getColumnFlex:function(ck){var cl=this.__bi[ck]||{};
return cl.flex!==undefined?cl.flex:0;
},setRowFlex:function(ea,eb){this._setRowData(ea,cG,eb);
this._applyLayoutChange();
return this;
},getRowFlex:function(bz){var bA=this.__bh[bz]||{};
var bB=bA.flex!==undefined?bA.flex:0;
return bB;
},setColumnMaxWidth:function(bv,bw){this._setColumnData(bv,cz,bw);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(eg){var eh=this.__bi[eg]||{};
return eh.maxWidth!==undefined?eh.maxWidth:Infinity;
},setColumnWidth:function(dM,dN){this._setColumnData(dM,cu,dN);
this._applyLayoutChange();
return this;
},getColumnWidth:function(dK){var dL=this.__bi[dK]||{};
return dL.width!==undefined?dL.width:null;
},setColumnMinWidth:function(ee,ef){this._setColumnData(ee,cB,ef);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(di){var dj=this.__bi[di]||{};
return dj.minWidth||0;
},setRowMaxHeight:function(bC,bD){this._setRowData(bC,cq,bD);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(dV){var dW=this.__bh[dV]||{};
return dW.maxHeight||Infinity;
},setRowHeight:function(ec,ed){this._setRowData(ec,cv,ed);
this._applyLayoutChange();
return this;
},getRowHeight:function(co){var cp=this.__bh[co]||{};
return cp.height!==undefined?cp.height:null;
},setRowMinHeight:function(dg,dh){this._setRowData(dg,cA,dh);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(dX){var dY=this.__bh[dX]||{};
return dY.minHeight||0;
},__br:function(bI){var bM=bI.getSizeHint();
var bL=bI.getMarginLeft()+bI.getMarginRight();
var bK=bI.getMarginTop()+bI.getMarginBottom();
var bJ={height:bM.height+bK,width:bM.width+bL,minHeight:bM.minHeight+bK,minWidth:bM.minWidth+bL,maxHeight:bM.maxHeight+bK,maxWidth:bM.maxWidth+bL};
return bJ;
},_fixHeightsRowSpan:function(a){var o=this.getSpacingY();

for(var i=0,l=this.__bl.length;i<l;i++){var d=this.__bl[i];
var f=this.__br(d);
var g=d.getLayoutProperties();
var c=g.row;
var m=o*(g.rowSpan-1);
var b=m;
var k={};

for(var j=0;j<g.rowSpan;j++){var q=g.row+j;
var e=a[q];
var p=this.getRowFlex(q);

if(p>0){k[q]={min:e.minHeight,value:e.height,max:e.maxHeight,flex:p};
}m+=e.height;
b+=e.minHeight;
}if(m<f.height){var n=qx.ui.layout.Util.computeFlexOffsets(k,f.height,m);

for(var j=0;j<g.rowSpan;j++){var h=n[c+j]?n[c+j].offset:0;
a[c+j].height+=h;
}}if(b<f.minHeight){var n=qx.ui.layout.Util.computeFlexOffsets(k,f.minHeight,b);

for(var j=0;j<g.rowSpan;j++){var h=n[c+j]?n[c+j].offset:0;
a[c+j].minHeight+=h;
}}}},_fixWidthsColSpan:function(dw){var dA=this.getSpacingX();

for(var i=0,l=this.__bk.length;i<l;i++){var dx=this.__bk[i];
var dz=this.__br(dx);
var dC=dx.getLayoutProperties();
var dy=dC.column;
var dI=dA*(dC.colSpan-1);
var dB=dI;
var dD={};
var dF;

for(var j=0;j<dC.colSpan;j++){var dJ=dC.column+j;
var dH=dw[dJ];
var dG=this.getColumnFlex(dJ);
if(dG>0){dD[dJ]={min:dH.minWidth,value:dH.width,max:dH.maxWidth,flex:dG};
}dI+=dH.width;
dB+=dH.minWidth;
}if(dI<dz.width){var dE=qx.ui.layout.Util.computeFlexOffsets(dD,dz.width,dI);

for(var j=0;j<dC.colSpan;j++){dF=dE[dy+j]?dE[dy+j].offset:0;
dw[dy+j].width+=dF;
}}if(dB<dz.minWidth){var dE=qx.ui.layout.Util.computeFlexOffsets(dD,dz.minWidth,dB);

for(var j=0;j<dC.colSpan;j++){dF=dE[dy+j]?dE[dy+j].offset:0;
dw[dy+j].minWidth+=dF;
}}}},_getRowHeights:function(){if(this.__bo!=null){return this.__bo;
}var ci=[];
var cb=this.__bm;
var ca=this.__bn;

for(var cj=0;cj<=cb;cj++){var cc=0;
var ce=0;
var cd=0;

for(var ch=0;ch<=ca;ch++){var bY=this.__bj[cj][ch];

if(!bY){continue;
}var cf=bY.getLayoutProperties().rowSpan||0;

if(cf>1){continue;
}var cg=this.__br(bY);

if(this.getRowFlex(cj)>0){cc=Math.max(cc,cg.minHeight);
}else{cc=Math.max(cc,cg.height);
}ce=Math.max(ce,cg.height);
}var cc=Math.max(cc,this.getRowMinHeight(cj));
var cd=this.getRowMaxHeight(cj);

if(this.getRowHeight(cj)!==null){var ce=this.getRowHeight(cj);
}else{var ce=Math.max(cc,Math.min(ce,cd));
}ci[cj]={minHeight:cc,height:ce,maxHeight:cd};
}
if(this.__bl.length>0){this._fixHeightsRowSpan(ci);
}this.__bo=ci;
return ci;
},_getColWidths:function(){if(this.__bp!=null){return this.__bp;
}var bR=[];
var bO=this.__bn;
var bQ=this.__bm;

for(var bW=0;bW<=bO;bW++){var bU=0;
var bT=0;
var bP=Infinity;

for(var bX=0;bX<=bQ;bX++){var bN=this.__bj[bX][bW];

if(!bN){continue;
}var bS=bN.getLayoutProperties().colSpan||0;

if(bS>1){continue;
}var bV=this.__br(bN);

if(this.getColumnFlex(bW)>0){bT=Math.max(bT,bV.minWidth);
}else{bT=Math.max(bT,bV.width);
}bU=Math.max(bU,bV.width);
}var bT=Math.max(bT,this.getColumnMinWidth(bW));
var bP=this.getColumnMaxWidth(bW);

if(this.getColumnWidth(bW)!==null){var bU=this.getColumnWidth(bW);
}else{var bU=Math.max(bT,Math.min(bU,bP));
}bR[bW]={minWidth:bT,width:bU,maxWidth:bP};
}
if(this.__bk.length>0){this._fixWidthsColSpan(bR);
}this.__bp=bR;
return bR;
},_getColumnFlexOffsets:function(dO){var dP=this.getSizeHint();
var dT=dO-dP.width;

if(dT==0){return {};
}var dR=this._getColWidths();
var dQ={};

for(var i=0,l=dR.length;i<l;i++){var dU=dR[i];
var dS=this.getColumnFlex(i);

if((dS<=0)||(dU.width==dU.maxWidth&&dT>0)||(dU.width==dU.minWidth&&dT<0)){continue;
}dQ[i]={min:dU.minWidth,value:dU.width,max:dU.maxWidth,flex:dS};
}return qx.ui.layout.Util.computeFlexOffsets(dQ,dO,dP.width);
},_getRowFlexOffsets:function(bl){var bm=this.getSizeHint();
var bp=bl-bm.height;

if(bp==0){return {};
}var bq=this._getRowHeights();
var bn={};

for(var i=0,l=bq.length;i<l;i++){var br=bq[i];
var bo=this.getRowFlex(i);

if((bo<=0)||(br.height==br.maxHeight&&bp>0)||(br.height==br.minHeight&&bp<0)){continue;
}bn[i]={min:br.minHeight,value:br.height,max:br.maxHeight,flex:bo};
}return qx.ui.layout.Util.computeFlexOffsets(bn,bl,bm.height);
},renderLayout:function(F,G){if(this._invalidChildrenCache){this.__bq();
}var U=qx.ui.layout.Util;
var I=this.getSpacingX();
var O=this.getSpacingY();
var ba=this._getColWidths();
var Y=this._getColumnFlexOffsets(F);
var J=[];
var bc=this.__bn;
var H=this.__bm;
var bb;

for(var bd=0;bd<=bc;bd++){bb=Y[bd]?Y[bd].offset:0;
J[bd]=ba[bd].width+bb;
}var R=this._getRowHeights();
var T=this._getRowFlexOffsets(G);
var bj=[];

for(var P=0;P<=H;P++){bb=T[P]?T[P].offset:0;
bj[P]=R[P].height+bb;
}var bk=0;

for(var bd=0;bd<=bc;bd++){var top=0;

for(var P=0;P<=H;P++){var W=this.__bj[P][bd];
if(!W){top+=bj[P]+O;
continue;
}var K=W.getLayoutProperties();
if(K.row!==P||K.column!==bd){top+=bj[P]+O;
continue;
}var bi=I*(K.colSpan-1);

for(var i=0;i<K.colSpan;i++){bi+=J[bd+i];
}var X=O*(K.rowSpan-1);

for(var i=0;i<K.rowSpan;i++){X+=bj[P+i];
}var L=W.getSizeHint();
var bg=W.getMarginTop();
var V=W.getMarginLeft();
var S=W.getMarginBottom();
var N=W.getMarginRight();
var Q=Math.max(L.minWidth,Math.min(bi-V-N,L.maxWidth));
var bh=Math.max(L.minHeight,Math.min(X-bg-S,L.maxHeight));
var be=this.getCellAlign(P,bd);
var bf=bk+U.computeHorizontalAlignOffset(be.hAlign,Q,bi,V,N);
var M=top+U.computeVerticalAlignOffset(be.vAlign,bh,X,bg,S);
W.renderLayout(bf,M,Q,bh);
top+=bj[P]+O;
}bk+=J[bd]+I;
}},invalidateLayoutCache:function(){arguments.callee.base.call(this);
this.__bp=null;
this.__bo=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__bq();
}var dp=this._getColWidths();
var dr=0,ds=0;

for(var i=0,l=dp.length;i<l;i++){var dt=dp[i];

if(this.getColumnFlex(i)>0){dr+=dt.minWidth;
}else{dr+=dt.width;
}ds+=dt.width;
}var du=this._getRowHeights();
var dm=0,dq=0;

for(var i=0,l=du.length;i<l;i++){var dv=du[i];

if(this.getRowFlex(i)>0){dm+=dv.minHeight;
}else{dm+=dv.height;
}dq+=dv.height;
}var dl=this.getSpacingX()*(dp.length-1);
var dk=this.getSpacingY()*(du.length-1);
var dn={minWidth:dr+dl,width:ds+dl,minHeight:dm+dk,height:dq+dk};
return dn;
}},destruct:function(){this._disposeFields(cw,cs,ct,cx,cy,cD,cC);
}});
})();
(function(){var b="qx.ui.core.queue.Widget",a="widget";
qx.Class.define(b,{statics:{__hc:{},remove:function(e){delete this.__hc[e.$$hash];
},add:function(c){var d=this.__hc;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var f=this.__hc;
var h;

for(var g in f){h=f[g];
delete f[g];
h.syncWidget();
}for(var g in f){return;
}this.__hc={};
}}});
})();
(function(){var R="borderTopWidth",Q="borderLeftWidth",P="marginTop",O="marginLeft",N="scroll",M="qx.client",L="border-box",K="borderBottomWidth",J="borderRightWidth",I="auto",bh="padding",bg="qx.bom.element.Location",bf="paddingLeft",be="static",bd="marginBottom",bc="visible",bb="BODY",ba="paddingBottom",Y="paddingTop",X="marginRight",V="position",W="margin",T="overflow",U="paddingRight",S="border";
qx.Class.define(bg,{statics:{__gV:function(bv,bw){return qx.bom.element.Style.get(bv,bw,qx.bom.element.Style.COMPUTED_MODE,false);
},__gW:function(bx,by){return parseInt(qx.bom.element.Style.get(bx,by,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__gX:function(bK){var bN=0,top=0;
if(bK.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var bM=qx.dom.Node.getWindow(bK);
bN-=qx.bom.Viewport.getScrollLeft(bM);
top-=qx.bom.Viewport.getScrollTop(bM);
}else{var bL=qx.dom.Node.getDocument(bK).body;
bK=bK.parentNode;
while(bK&&bK!=bL){bN+=bK.scrollLeft;
top+=bK.scrollTop;
bK=bK.parentNode;
}}return {left:bN,top:top};
},__gY:qx.core.Variant.select(M,{"mshtml":function(s){var u=qx.dom.Node.getDocument(s);
var t=u.body;
var v=0;
var top=0;
v-=t.clientLeft+u.documentElement.clientLeft;
top-=t.clientTop+u.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){v+=this.__gW(t,Q);
top+=this.__gW(t,R);
}return {left:v,top:top};
},"webkit":function(c){var e=qx.dom.Node.getDocument(c);
var d=e.body;
var f=d.offsetLeft;
var top=d.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){f+=this.__gW(d,Q);
top+=this.__gW(d,R);
}return {left:f,top:top};
},"gecko":function(bs){var bt=qx.dom.Node.getDocument(bs).body;
var bu=bt.offsetLeft;
var top=bt.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){bu+=this.__gW(bt,O);
top+=this.__gW(bt,P);
}if(qx.bom.element.BoxSizing.get(bt)!==L){bu+=this.__gW(bt,Q);
top+=this.__gW(bt,R);
}return {left:bu,top:top};
},"default":function(bi){var bj=qx.dom.Node.getDocument(bi).body;
var bk=bj.offsetLeft;
var top=bj.offsetTop;
return {left:bk,top:top};
}}),__ha:qx.core.Variant.select(M,{"mshtml|webkit":function(bl){var bn=qx.dom.Node.getDocument(bl);
if(bl.getBoundingClientRect){var bo=bl.getBoundingClientRect();
var bp=bo.left;
var top=bo.top;
}else{var bp=bl.offsetLeft;
var top=bl.offsetTop;
bl=bl.offsetParent;
var bm=bn.body;
while(bl&&bl!=bm){bp+=bl.offsetLeft;
top+=bl.offsetTop;
bp+=this.__gW(bl,Q);
top+=this.__gW(bl,R);
bl=bl.offsetParent;
}}return {left:bp,top:top};
},"gecko":function(bz){if(bz.getBoundingClientRect){var bC=bz.getBoundingClientRect();
var bD=Math.round(bC.left);
var top=Math.round(bC.top);
}else{var bD=0;
var top=0;
var bA=qx.dom.Node.getDocument(bz).body;
var bB=qx.bom.element.BoxSizing;

if(bB.get(bz)!==L){bD-=this.__gW(bz,Q);
top-=this.__gW(bz,R);
}
while(bz&&bz!==bA){bD+=bz.offsetLeft;
top+=bz.offsetTop;
if(bB.get(bz)!==L){bD+=this.__gW(bz,Q);
top+=this.__gW(bz,R);
}if(bz.parentNode&&this.__gV(bz.parentNode,T)!=bc){bD+=this.__gW(bz.parentNode,Q);
top+=this.__gW(bz.parentNode,R);
}bz=bz.offsetParent;
}}return {left:bD,top:top};
},"default":function(bH){var bJ=0;
var top=0;
var bI=qx.dom.Node.getDocument(bH).body;
while(bH&&bH!==bI){bJ+=bH.offsetLeft;
top+=bH.offsetTop;
bH=bH.offsetParent;
}return {left:bJ,top:top};
}}),get:function(j,k){if(j.tagName==bb){var location=this.__hb(j);
var r=location.left;
var top=location.top;
}else{var l=this.__gY(j);
var q=this.__ha(j);
var scroll=this.__gX(j);
var r=q.left+l.left-scroll.left;
var top=q.top+l.top-scroll.top;
}var m=r+j.offsetWidth;
var n=top+j.offsetHeight;

if(k){if(k==bh||k==N){var o=qx.bom.element.Overflow.getX(j);

if(o==N||o==I){m+=j.scrollWidth-j.offsetWidth+this.__gW(j,Q)+this.__gW(j,J);
}var p=qx.bom.element.Overflow.getY(j);

if(p==N||p==I){n+=j.scrollHeight-j.offsetHeight+this.__gW(j,R)+this.__gW(j,K);
}}
switch(k){case bh:r+=this.__gW(j,bf);
top+=this.__gW(j,Y);
m-=this.__gW(j,U);
n-=this.__gW(j,ba);
case N:r-=j.scrollLeft;
top-=j.scrollTop;
m-=j.scrollLeft;
n-=j.scrollTop;
case S:r+=this.__gW(j,Q);
top+=this.__gW(j,R);
m-=this.__gW(j,J);
n-=this.__gW(j,K);
break;
case W:r-=this.__gW(j,O);
top-=this.__gW(j,P);
m+=this.__gW(j,X);
n+=this.__gW(j,bd);
break;
}}return {left:r,top:top,right:m,bottom:n};
},__hb:qx.core.Variant.select(M,{"default":function(w){var top=w.offsetTop+this.__gW(w,P);
var x=w.offsetLeft+this.__gW(w,O);
return {left:x,top:top};
},"mshtml":function(bq){var top=bq.offsetTop;
var br=bq.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__gW(bq,P);
br+=this.__gW(bq,O);
}return {left:br,top:top};
},"gecko":function(E){var top=E.offsetTop+this.__gW(E,P)+this.__gW(E,Q);
var F=E.offsetLeft+this.__gW(E,O)+this.__gW(E,R);
return {left:F,top:top};
}}),getLeft:function(G,H){return this.get(G,H).left;
},getTop:function(bO,bP){return this.get(bO,bP).top;
},getRight:function(a,b){return this.get(a,b).right;
},getBottom:function(h,i){return this.get(h,i).bottom;
},getRelative:function(y,z,A,B){var D=this.get(y,A);
var C=this.get(z,B);
return {left:D.left-C.left,top:D.top-C.top,right:D.right-C.right,bottom:D.bottom-C.bottom};
},getPosition:function(g){return this.getRelative(g,this.getOffsetParent(g));
},getOffsetParent:function(bE){var bG=bE.offsetParent||document.body;
var bF=qx.bom.element.Style;

while(bG&&(!/^body|html$/i.test(bG.tagName)&&bF.get(bG,V)===be)){bG=bG.offsetParent;
}return bG;
}}});
})();
(function(){var h="qx.util.DisposeUtil";
qx.Class.define(h,{statics:{disposeFields:function(s,t){var name;

for(var i=0,l=t.length;i<l;i++){var name=t[i];

if(s[name]==null||!s.hasOwnProperty(name)){continue;
}s[name]=null;
}},disposeObjects:function(q,r){var name;

for(var i=0,l=r.length;i<l;i++){name=r[i];

if(q[name]==null||!q.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(q[name].dispose){q[name].dispose();
}else{throw new Error("Has no disposable object under key: "+name+"!");
}}q[name]=null;
}},disposeArray:function(d,e){var g=d[e];

if(!g){return;
}if(qx.core.ObjectRegistry.inShutDown){d[e]=null;
return;
}try{var f;

for(var i=g.length-1;i>=0;i--){f=g[i];

if(f){f.dispose();
}}}catch(j){throw new Error("The array field: "+e+" of object: "+d+" has non disposable entries: "+j);
}g.length=0;
d[e]=null;
},disposeMap:function(k,m){var n=k[m];

if(!n){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{for(var o in n){if(n.hasOwnProperty(o)){n[o].dispose();
}}}catch(p){throw new Error("The map field: "+m+" of object: "+k+" has non disposable entries: "+p);
}k[m]=null;
},disposeTriggeredBy:function(a,b){var c=b.dispose;
b.dispose=function(){c.call(b);
a.dispose();
};
}}});
})();
(function(){var b="qx.event.dispatch.Direct";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(a){this._manager=a;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(d,event,e){return !event.getBubbles();
},dispatchEvent:function(f,event,g){event.setEventPhase(qx.event.type.Event.AT_TARGET);
var h=this._manager.getListeners(f,g,false);

if(h){for(var i=0,l=h.length;i<l;i++){var j=h[i].context||f;
h[i].handler.call(j,event);
}}}},defer:function(c){qx.event.Registration.addDispatcher(c);
}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Bootstrap.define(c,{statics:{LOCALE:"",VARIANT:"",__hl:function(){var d=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var f=a;
var e=d.indexOf(b);

if(e!=-1){f=d.substr(e+1);
d=d.substr(0,e);
}this.LOCALE=d;
this.VARIANT=f;
}},defer:function(g){g.__hl();
}});
})();
(function(){var I="_",H="",G="qx.dynlocale",F="on",E="__hp",D="_applyLocale",C="changeLocale",B="C",A="__hq",z="qx.locale.Manager",x="String",y="singleton";
qx.Class.define(z,{type:y,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hp=qx.$$translations||{};
this.__hq=qx.$$locales||{};
var p=qx.bom.client.Locale;
var n=p.LOCALE;
var o=p.VARIANT;

if(o!==H){n+=I+o;
}this.setLocale(n||this.__hr);
},statics:{tr:function(bg,bh){var bi=qx.lang.Array.fromArguments(arguments);
bi.splice(0,1);
return qx.locale.Manager.getInstance().translate(bg,bi);
},trn:function(N,O,P,Q){var R=qx.lang.Array.fromArguments(arguments);
R.splice(0,3);
if(P!=1){return qx.locale.Manager.getInstance().translate(O,R);
}else{return qx.locale.Manager.getInstance().translate(N,R);
}},trc:function(J,K,L){var M=qx.lang.Array.fromArguments(arguments);
M.splice(0,2);
return qx.locale.Manager.getInstance().translate(K,M);
},marktr:function(bf){return bf;
}},properties:{locale:{check:x,nullable:true,apply:D,event:C}},members:{__hr:B,__hs:null,__ht:null,__hp:null,__hq:null,getLanguage:function(){return this.__ht;
},getTerritory:function(){return this.getLocale().split(I)[1]||H;
},getAvailableLocales:function(){var m=[];

for(var l in this.__hq){if(l!=this.__hr){m.push(l);
}}return m;
},__hu:function(u){var w;
var v=u.indexOf(I);

if(v==-1){w=u;
}else{w=u.substring(0,v);
}return w;
},_applyLocale:function(a,b){this.__hs=a;
this.__ht=this.__hu(a);
},addTranslation:function(q,r){var s=this.__hp;

if(s[q]){for(var t in r){s[q][t]=r[t];
}}else{s[q]=r;
}},addLocale:function(bb,bc){var bd=this.__hq;

if(bd[bb]){for(var be in bc){bd[bb][be]=bc[be];
}}else{bd[bb]=bc;
}},translate:function(c,d,e){var k;
var h=this.__hp;

if(!h){return c;
}
if(e){var g=this.__hu(e);
}else{e=this.__hs;
g=this.__ht;
}
if(!k&&h[e]){k=h[e][c];
}
if(!k&&h[g]){k=h[g][c];
}
if(!k&&h[this.__hr]){k=h[this.__hr][c];
}
if(!k){k=c;
}
if(d.length>0){var f=[];

for(var i=0;i<d.length;i++){var j=d[i];

if(j&&j.translate){f[i]=j.translate();
}else{f[i]=j;
}}k=qx.lang.String.format(k,f);
}
if(qx.core.Variant.isSet(G,F)){k=new qx.locale.LocalizedString(k,c,d);
}return k;
},localize:function(S,T,U){var ba;
var X=this.__hq;

if(!X){return S;
}
if(U){var W=this.__hu(U);
}else{U=this.__hs;
W=this.__ht;
}
if(!ba&&X[U]){ba=X[U][S];
}
if(!ba&&X[W]){ba=X[W][S];
}
if(!ba&&X[this.__hr]){ba=X[this.__hr][S];
}
if(!ba){ba=S;
}
if(T.length>0){var V=[];

for(var i=0;i<T.length;i++){var Y=T[i];

if(Y.translate){V[i]=Y.translate();
}else{V[i]=Y;
}}ba=qx.lang.String.format(ba,V);
}
if(qx.core.Variant.isSet(G,F)){ba=new qx.locale.LocalizedString(ba,S,T);
}return ba;
}},destruct:function(){this._disposeFields(E,A);
}});
})();
(function(){var x="qx.client",w="gecko",v="div",u="inherit",t="text",s="value",r="",q="hidden",p="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",o="nowrap",O="auto",N="ellipsis",M="normal",L="label",K="px",J="crop",I="end",H="100%",G="visible",F="qx.bom.Label",D="Please use the setValue() method instead.",E="opera",B="Please use the getValue() method instead.",C="block",z="none",A="-1000px",y="absolute";
qx.Class.define(F,{statics:{__hX:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__hY:function(){var U=this.__ib(false);
document.body.insertBefore(U,document.body.firstChild);
return this._textElement=U;
},__ia:function(){var be=this.__ib(true);
document.body.insertBefore(be,document.body.firstChild);
return this._htmlElement=be;
},__ib:function(P){var Q=qx.bom.Element.create(v);
var R=Q.style;
R.width=R.height=O;
R.left=R.top=A;
R.visibility=q;
R.position=y;
R.overflow=G;

if(P){R.whiteSpace=M;
}else{R.whiteSpace=o;

if(qx.core.Variant.isSet(x,w)){var S=document.createElementNS(p,L);
for(var T in this.__hX){S.style[T]=u;
}Q.appendChild(S);
}}return Q;
},__ic:function(f){var g={};

if(f){g.whiteSpace=M;
}else if(qx.core.Variant.isSet(x,w)){g.display=C;
}else{g.overflow=q;
g.whiteSpace=o;
g.textOverflow=N;
g.userSelect=z;
if(qx.core.Variant.isSet(x,E)){g.OTextOverflow=N;
}}return g;
},create:function(content,j,k){if(!k){k=window;
}
if(j){var l=k.document.createElement(v);
l.useHtml=true;
}else if(qx.core.Variant.isSet(x,w)){var l=k.document.createElement(v);
var m=k.document.createElementNS(p,L);
m.style.cursor=u;
m.style.color=u;
m.style.overflow=q;
m.style.maxWidth=H;
for(var n in this.__hX){m.style[n]=u;
}m.setAttribute(J,I);
l.appendChild(m);
}else{var l=k.document.createElement(v);
qx.bom.element.Style.setStyles(l,this.__ic(j));
}
if(content){this.setValue(l,content);
}return l;
},setValue:function(bf,bg){bg=bg||r;

if(bf.useHtml){bf.innerHTML=bg;
}else if(qx.core.Variant.isSet(x,w)){bf.firstChild.setAttribute(s,bg);
}else{qx.bom.element.Attribute.set(bf,t,bg);
}},getValue:function(bc){if(bc.useHtml){return bc.innerHTML;
}else if(qx.core.Variant.isSet(x,w)){return bc.firstChild.getAttribute(s)||r;
}else{return qx.bom.element.Attribute.get(bc,t);
}},getHtmlSize:function(content,V,W){var X=this._htmlElement||this.__ia();
X.style.width=W!==undefined?W+K:O;
X.innerHTML=content;
return this.__id(X,V);
},getTextSize:function(Y,ba){var bb=this._textElement||this.__hY();

if(qx.core.Variant.isSet(x,w)){bb.firstChild.setAttribute(s,Y);
}else{qx.bom.element.Attribute.set(bb,t,Y);
}return this.__id(bb,ba);
},__id:function(a,b){var c=this.__hX;

if(!b){b={};
}
for(var d in c){a.style[d]=b[d]||r;
}var e=qx.bom.element.Dimension.getSize(a);

if(qx.core.Variant.isSet(x,w)){if(!qx.bom.client.Platform.WIN){e.width++;
}}return e;
},setContent:function(h,i){qx.log.Logger.deprecatedMethodWarning(arguments.callee,D);
this.setValue(h,i);
},getContent:function(bd){qx.log.Logger.deprecatedMethodWarning(arguments.callee,B);
return this.getValue(bd);
}}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var m="alias",l="copy",k="blur",j="mouseout",i="keydown",h="Ctrl",g="Shift",f="mousemove",d="move",c="mouseover",K="Alt",J="keyup",I="mouseup",H="dragend",G="on",F="mousedown",E="qxDraggable",D="__fX",C="__fT",B="__fV",t="__fR",u="drag",r="drop",s="qxDroppable",p="qx.event.handler.DragDrop",q="droprequest",n="dragstart",o="__fW",v="__fS",w="__fU",y="dragchange",x="__fQ",A="dragleave",z="dragover";
qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bj){arguments.callee.base.call(this);
this.__fQ=bj;
this.__fR=bj.getWindow().document.documentElement;
this.__fQ.addListener(this.__fR,F,this._onMouseDown,this);
this.__ge();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__fQ:null,__fR:null,__fS:null,__fT:null,__fU:null,__fV:null,__fW:null,__fX:null,__fY:null,__ga:null,__gb:false,__gc:0,__gd:0,canHandleEvent:function(M,N){},registerEvent:function(Q,R,S){},unregisterEvent:function(bk,bl,bm){},addType:function(bo){this.__fU[bo]=true;
},addAction:function(bh){this.__fV[bh]=true;
},supportsType:function(bi){return !!this.__fU[bi];
},supportsAction:function(bs){return !!this.__fV[bs];
},getData:function(L){if(!this.__gl||!this.__fS){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__fU[L]){throw new Error("Unsupported data type: "+L+"!");
}
if(!this.__fX[L]){this.__fY=L;
this.__gg(q,this.__fT,false);
}
if(!this.__fX[L]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__fX[L]||null;
},getCurrentAction:function(){return this.__ga;
},addData:function(bp,bq){this.__fX[bp]=bq;
},getCurrentType:function(){return this.__fY;
},__ge:function(){this.__fU={};
this.__fV={};
this.__fW={};
this.__fX={};
},__gf:function(){var bf=this.__fV;
var bd=this.__fW;
var be=null;

if(this.__gl){if(bd.Shift&&bd.Ctrl&&bf.alias){be=m;
}else if(bd.Shift&&bd.Alt&&bf.copy){be=l;
}else if(bd.Shift&&bf.move){be=d;
}else if(bd.Alt&&bf.alias){be=m;
}else if(bd.Ctrl&&bf.copy){be=l;
}else if(bf.move){be=d;
}else if(bf.copy){be=l;
}else if(bf.alias){be=m;
}}
if(be!=this.__ga){this.__ga=be;
this.__gg(y,this.__fT,false);
}},__gg:function(W,X,Y,ba){var bc=qx.event.Registration;
var bb=bc.createEvent(W,qx.event.type.Drag,[Y,ba]);

if(this.__fT!==this.__fS){if(X==this.__fT){bb.setRelatedTarget(this.__fS);
}else{bb.setRelatedTarget(this.__fT);
}}return bc.dispatchEvent(X,bb);
},__gh:function(T){while(T&&T.nodeType==1){if(T.getAttribute(E)==G){return T;
}T=T.parentNode;
}return null;
},__gi:function(P){while(P&&P.nodeType==1){if(P.getAttribute(s)==G){return P;
}P=P.parentNode;
}return null;
},__gj:function(){this.__fT=null;
this.__fQ.removeListener(this.__fR,f,this._onMouseMove,this,true);
this.__fQ.removeListener(this.__fR,I,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,k,this._onWindowBlur,this);
this.__ge();
},__gk:function(){if(this.__gb){this.__fQ.removeListener(this.__fR,c,this._onMouseOver,this,true);
this.__fQ.removeListener(this.__fR,j,this._onMouseOut,this,true);
this.__fQ.removeListener(this.__fR,i,this._onKeyDown,this,true);
this.__fQ.removeListener(this.__fR,J,this._onKeyUp,this,true);
this.__gg(H,this.__fT,false);
this.__gb=false;
}this.__gl=false;
this.__fS=null;
this.__gj();
},__gl:false,_onWindowBlur:function(e){this.__gk();
},_onKeyDown:function(e){var bg=e.getKeyIdentifier();

switch(bg){case K:case h:case g:if(!this.__fW[bg]){this.__fW[bg]=true;
this.__gf();
}}},_onKeyUp:function(e){var bn=e.getKeyIdentifier();

switch(bn){case K:case h:case g:if(this.__fW[bn]){this.__fW[bn]=false;
this.__gf();
}}},_onMouseDown:function(e){if(this.__gb){return;
}var O=this.__gh(e.getTarget());

if(O){this.__gc=e.getDocumentLeft();
this.__gd=e.getDocumentTop();
this.__fT=O;
this.__fQ.addListener(this.__fR,f,this._onMouseMove,this,true);
this.__fQ.addListener(this.__fR,I,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,k,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gl){this.__gg(r,this.__fS,false,e);
}if(this.__gb){e.stopPropagation();
}this.__gk();
},_onMouseMove:function(e){if(this.__gb){if(!this.__gg(u,this.__fT,true,e)){this.__gk();
}}else{if(Math.abs(e.getDocumentLeft()-this.__gc)>3||Math.abs(e.getDocumentTop()-this.__gd)>3){if(this.__gg(n,this.__fT,true,e)){this.__gb=true;
this.__fQ.addListener(this.__fR,c,this._onMouseOver,this,true);
this.__fQ.addListener(this.__fR,j,this._onMouseOut,this,true);
this.__fQ.addListener(this.__fR,i,this._onKeyDown,this,true);
this.__fQ.addListener(this.__fR,J,this._onKeyUp,this,true);
var br=this.__fW;
br.Ctrl=e.isCtrlPressed();
br.Shift=e.isShiftPressed();
br.Alt=e.isAltPressed();
this.__gf();
}else{this.__gg(H,this.__fT,false);
this.__gj();
}}}},_onMouseOver:function(e){var a=e.getTarget();
var b=this.__gi(a);

if(b&&b!=this.__fS){this.__gl=this.__gg(z,b,true,e);
this.__fS=b;
this.__gf();
}},_onMouseOut:function(e){var U=e.getTarget();
var V=this.__gi(U);

if(V&&V==this.__fS){this.__gg(A,this.__fS,false,e);
this.__fS=null;
this.__gl=false;
qx.event.Timer.once(this.__gf,this,0);
}}},destruct:function(){this._disposeFields(C,v,x,t,w,B,o,D);
},defer:function(bt){qx.event.Registration.addHandler(bt);
}});
})();
(function(){var c="__cg",b="__ch",a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cg:null,__ch:null,init:function(f,g,h){arguments.callee.base.call(this,false,h);
this.__cg=f;
this.__ch=g;
return this;
},clone:function(d){var e=arguments.callee.base.call(this,d);
e.__cg=this.__cg;
e.__ch=this.__ch;
return e;
},getData:function(){return this.__cg;
},getOldData:function(){return this.__ch;
}},destruct:function(){this._disposeFields(c,b);
}});
})();
(function(){var E="qx.client",D="blur",C="focus",B="mousedown",A="on",z="mouseup",y="DOMFocusOut",x="DOMFocusIn",w="selectstart",v="onmousedown",bg="onfocusout",bf="onfocusin",be="onmouseup",bd="onselectstart",bc="draggesture",bb="_document",ba="gecko",Y="_root",X="qx.event.handler.Focus",W="_applyFocus",L="_window",M="deactivate",J="qxIsRootPage",K="_applyActive",H="input",I="focusin",F="qxSelectable",G="tabIndex",N="off",O="_body",R="activate",Q="1",T="focusout",S="__mouseActive",V="_manager",U="qxKeepFocus",P="qxKeepActive";
qx.Class.define(X,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(j){arguments.callee.base.call(this);
this._manager=j;
this._window=j.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:K,nullable:true},focus:{apply:W,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gq:null,__gr:null,__gs:null,__gt:null,__gu:null,__gv:null,__gw:null,__gx:null,__gy:null,__gz:null,canHandleEvent:function(r,s){},registerEvent:function(bp,bq,br){},unregisterEvent:function(bM,bN,bO){},focus:function(bL){try{bL.focus();
}catch(a){}this.setFocus(bL);
this.setActive(bL);
},activate:function(bt){this.setActive(bt);
},blur:function(bu){try{bu.blur();
}catch(bI){}
if(this.getActive()===bu){this.resetActive();
}
if(this.getFocus()===bu){this.resetFocus();
}},deactivate:function(bB){if(this.getActive()===bB){this.resetActive();
}},tryActivate:function(b){var c=this.__gN(b);

if(c){this.setActive(c);
}},__gA:function(k,l,m,n){var p=qx.event.Registration;
var o=p.createEvent(m,qx.event.type.Focus,[k,l,n]);
p.dispatchEvent(k,o);
},_windowFocused:true,__gB:function(){if(this._windowFocused){this._windowFocused=false;
this.__gA(this._window,null,D,false);
}},__gC:function(){if(!this._windowFocused){this._windowFocused=true;
this.__gA(this._window,null,C,false);
}},_initObserver:qx.core.Variant.select(E,{"gecko":function(){this.__gq=qx.lang.Function.listener(this.__gI,this);
this.__gr=qx.lang.Function.listener(this.__gJ,this);
this.__gs=qx.lang.Function.listener(this.__gH,this);
this.__gt=qx.lang.Function.listener(this.__gG,this);
this.__gu=qx.lang.Function.listener(this.__gD,this);
this._document.addEventListener(B,this.__gq,true);
this._document.addEventListener(z,this.__gr,true);
this._window.addEventListener(C,this.__gs,true);
this._window.addEventListener(D,this.__gt,true);
this._window.addEventListener(bc,this.__gu,true);
},"mshtml":function(){this.__gq=qx.lang.Function.listener(this.__gI,this);
this.__gr=qx.lang.Function.listener(this.__gJ,this);
this.__gw=qx.lang.Function.listener(this.__gE,this);
this.__gx=qx.lang.Function.listener(this.__gF,this);
this.__gv=qx.lang.Function.listener(this.__gK,this);
this._document.attachEvent(v,this.__gq);
this._document.attachEvent(be,this.__gr);
this._document.attachEvent(bf,this.__gw);
this._document.attachEvent(bg,this.__gx);
this._document.attachEvent(bd,this.__gv);
},"webkit":function(){this.__gq=qx.lang.Function.listener(this.__gI,this);
this.__gr=qx.lang.Function.listener(this.__gJ,this);
this.__gx=qx.lang.Function.listener(this.__gF,this);
this.__gs=qx.lang.Function.listener(this.__gH,this);
this.__gt=qx.lang.Function.listener(this.__gG,this);
this.__gv=qx.lang.Function.listener(this.__gK,this);
this._document.addEventListener(B,this.__gq,true);
this._document.addEventListener(z,this.__gr,true);
this._document.addEventListener(w,this.__gv,false);
this._window.addEventListener(y,this.__gx,true);
this._window.addEventListener(C,this.__gs,true);
this._window.addEventListener(D,this.__gt,true);
},"opera":function(){this.__gq=qx.lang.Function.listener(this.__gI,this);
this.__gr=qx.lang.Function.listener(this.__gJ,this);
this.__gw=qx.lang.Function.listener(this.__gE,this);
this.__gx=qx.lang.Function.listener(this.__gF,this);
this._document.addEventListener(B,this.__gq,true);
this._document.addEventListener(z,this.__gr,true);
this._window.addEventListener(x,this.__gw,true);
this._window.addEventListener(y,this.__gx,true);
}}),_stopObserver:qx.core.Variant.select(E,{"gecko":function(){this._document.removeEventListener(B,this.__gq,true);
this._document.removeEventListener(z,this.__gr,true);
this._window.removeEventListener(C,this.__gs,true);
this._window.removeEventListener(D,this.__gt,true);
this._window.removeEventListener(bc,this.__gu,true);
},"mshtml":function(){this._document.detachEvent(v,this.__gq);
this._document.detachEvent(be,this.__gr);
this._document.detachEvent(bf,this.__gw);
this._document.detachEvent(bg,this.__gx);
this._document.detachEvent(bd,this.__gv);
},"webkit":function(){this._document.removeEventListener(B,this.__gq,true);
this._document.removeEventListener(w,this.__gv,false);
this._window.removeEventListener(x,this.__gw,true);
this._window.removeEventListener(y,this.__gx,true);
this._window.removeEventListener(C,this.__gs,true);
this._window.removeEventListener(D,this.__gt,true);
},"opera":function(){this._document.removeEventListener(B,this.__gq,true);
this._window.removeEventListener(x,this.__gw,true);
this._window.removeEventListener(y,this.__gx,true);
this._window.removeEventListener(C,this.__gs,true);
this._window.removeEventListener(D,this.__gt,true);
}}),__gD:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){if(!this.__gO(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gE:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml":function(e){this.__gC();
var bK=e.srcElement;
var bJ=this.__gM(bK);

if(bJ){this.setFocus(bJ);
}this.tryActivate(bK);
},"opera":function(e){var q=e.target;

if(q==this._document||q==this._window){this.__gC();

if(this.__gy){this.setFocus(this.__gy);
delete this.__gy;
}
if(this.__gz){this.setActive(this.__gz);
delete this.__gz;
}}else{this.setFocus(q);
this.tryActivate(q);
if(!this.__gO(q)){q.selectionStart=0;
q.selectionEnd=0;
}}},"default":null})),__gF:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml":function(e){if(!e.toElement){this.__gB();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var bl=e.target;

if(bl===this.getFocus()){this.resetFocus();
}
if(bl===this.getActive()){this.resetActive();
}},"opera":function(e){var bn=e.target;

if(bn==this._document){this.__gB();
this.__gy=this.getFocus();
this.__gz=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(bn===this.getFocus()){this.resetFocus();
}
if(bn===this.getActive()){this.resetActive();
}}},"default":null})),__gG:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__gB();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__gB();
this.__gy=this.getFocus();
this.__gz=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__gH:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){var bo=e.target;

if(bo===this._window||bo===this._document){this.__gC();
bo=this._body;
}this.setFocus(bo);
this.tryActivate(bo);
},"webkit":function(e){var bx=e.target;

if(bx===this._window||bx===this._document){this.__gC();

if(this.__gy){this.setFocus(this.__gy);
delete this.__gy;
}
if(this.__gz){this.setActive(this.__gz);
delete this.__gz;
}}else{this.setFocus(bx);
this.tryActivate(bx);
}},"default":null})),__gI:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){var bT=e.target;
var bR=this.__gM(bT);
var bS=this.__gO(bT);

if(!bS){qx.bom.Event.preventDefault(e);
if(bR){if(qx.core.Variant.isSet(E,ba)){var bU=qx.bom.element.Attribute.get(bR,J)===Q;

if(!bU){bR.focus();
}}else{bR.focus();
}}}else if(!bR){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var i=e.srcElement;
var h=this.__gM(i);

if(h){if(!this.__gO(i)){i.unselectable=A;
document.selection.empty();
h.focus();
}}else{qx.bom.Event.preventDefault(e);
if(!this.__gO(i)){i.unselectable=A;
}}},"webkit":function(e){var bF=e.target;
var bE=this.__gM(bF);

if(bE){this.setFocus(bE);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var bk=e.target;
var bi=this.__gM(bk);

if(!this.__gO(bk)){qx.bom.Event.preventDefault(e);
if(bi){var bj=this.getFocus();

if(bj&&bj.selectionEnd){bj.selectionStart=0;
bj.selectionEnd=0;
bj.blur();
}if(bi){this.setFocus(bi);
}}}else if(bi){this.setFocus(bi);
}},"default":null})),__gJ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml":function(e){var bC=e.srcElement;

if(bC.unselectable){bC.unselectable=N;
}var bD=this.getFocus();

if(bD&&bC!=bD&&bD.nodeName.toLowerCase()===H){bC=bD;
}this.tryActivate(bC);
},"gecko":function(e){var bh=e.target;

while(bh&&bh.offsetWidth===undefined){bh=bh.parentNode;
}
if(bh){this.tryActivate(bh);
}},"webkit|opera":function(e){this.tryActivate(e.target);
},"default":null})),__gK:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml|webkit":function(e){var bm=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__gO(bm)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gL:function(d){var f=qx.bom.element.Attribute.get(d,G);

if(f>=1){return true;
}var g=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(f>=0&&g[d.tagName]){return true;
}return false;
},__gM:function(bs){while(bs&&bs.nodeType===1){if(bs.getAttribute(U)==A){return null;
}
if(this.__gL(bs)){return bs;
}bs=bs.parentNode;
}return this._body;
},__gN:function(bG){var bH=bG;

while(bG&&bG.nodeType===1){if(bG.getAttribute(P)==A){return null;
}bG=bG.parentNode;
}return bH;
},__gO:function(bv){while(bv&&bv.nodeType===1){var bw=bv.getAttribute(F);

if(bw!=null){return bw===A;
}bv=bv.parentNode;
}return true;
},_applyActive:function(bP,bQ){if(bQ){this.__gA(bQ,bP,M,true);
}
if(bP){this.__gA(bP,bQ,R,true);
}},_applyFocus:function(t,u){if(u){this.__gA(u,t,T,true);
}
if(t){this.__gA(t,u,I,true);
}if(u){this.__gA(u,t,D,false);
}
if(t){this.__gA(t,u,C,false);
}}},destruct:function(){this._stopObserver();
this._disposeFields(V,L,bb,Y,O,S);
},defer:function(by){qx.event.Registration.addHandler(by);
var bz=by.FOCUSABLE_ELEMENTS;

for(var bA in bz){bz[bA.toUpperCase()]=1;
}}});
})();
(function(){var e="__iR",d="qx.html.Decorator",c="absolute";
qx.Class.define(d,{extend:qx.html.Element,construct:function(f,g){arguments.callee.base.call(this);
this.__iR=f;
this.__iS=g||f.toHashCode();
this.setStyles({position:c,top:0,left:0});
this.useMarkup(f.getMarkup());
},members:{__iS:null,__iR:null,getId:function(){return this.__iS;
},getDecorator:function(){return this.__iR;
},resize:function(a,b){this.__iR.resize(this.getDomElement(),a,b);
},tint:function(h){this.__iR.tint(this.getDomElement(),h);
},getInsets:function(){return this.__iR.getInsets();
}},destruct:function(){this._disposeFields(e);
}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){arguments.callee.base.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var g="ready",f="qx.application",d="beforeunload",c="qx.core.Init",b="shutdown";
qx.Class.define(c,{statics:{getApplication:function(){return this.__dd||null;
},__dc:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var k=qx.core.Setting.get(f);
var l=qx.Class.getByName(k);

if(l){this.__dd=new l;
var j=new Date;
this.__dd.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-j)+"ms");
var j=new Date;
this.__dd.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-j)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+k);
}},__de:function(e){var h=this.__dd;

if(h){e.setReturnValue(h.close());
}},__df:function(){var i=this.__dd;

if(i){i.terminate();
}}},defer:function(a){qx.event.Registration.addListener(window,g,a.__dc,a);
qx.event.Registration.addListener(window,b,a.__df,a);
qx.event.Registration.addListener(window,d,a.__de,a);
}});
})();
(function(){var k="qx.client",j="left",i="right",h="middle",g="dblclick",f="click",e="none",d="contextmenu",c="qx.event.type.Mouse",b="Chrome";
qx.Class.define(c,{extend:qx.event.type.Dom,members:{init:function(l,m,n,o,p){arguments.callee.base.call(this,l,m,n,o,p);

if(!n){this._relatedTarget=qx.bom.Event.getRelatedTarget(l);
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
},__gQ:qx.core.Variant.select(k,{"mshtml":{1:j,2:i,4:h},"default":{0:j,2:i,1:h}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case f:case g:return j;
case d:return i;
default:return this.__gQ[this._native.button]||e;
}},isLeftPressed:function(){return this.getButton()===j;
},isMiddlePressed:function(){return this.getButton()===h;
},isRightPressed:function(){return this.getButton()===i;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(k,{"mshtml":function(){var a=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(a);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(k,{"mshtml":function(){var q=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(q);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
},getWheelDelta:qx.core.Variant.select(k,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(window.navigator.userAgent.indexOf(b)!==-1){return -(this._native.wheelDelta/120);
}else{return -(this._native.wheelDelta/40);
}}})}});
})();
(function(){var m="iPod",l="Win32",k="",j="Win64",i="Linux",h="BSD",g="Macintosh",f="iPhone",e="Windows",d="qx.bom.client.Platform",a="X11",c="MacIntel",b="MacPPC";
qx.Bootstrap.define(d,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__bL:function(){var n=navigator.platform;
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
}}},defer:function(o){o.__bL();
}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(b,c,d){},tint:function(e,f){},getInsets:function(){}}});
})();
(function(){var e="qx.client",d="qx.event.type.Drag";
qx.Class.define(d,{extend:qx.event.type.Event,members:{init:function(a,b){arguments.callee.base.call(this,true,a);

if(b){this._native=b.getNativeEvent()||null;
this._originalTarget=b.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(n){var o=arguments.callee.base.call(this,n);
o._native=this._native;
return o;
},getDocumentLeft:qx.core.Variant.select(e,{"mshtml":function(){if(this._native==null){return 0;
}var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(l);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(e,{"mshtml":function(){if(this._native==null){return 0;
}var g=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(g);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(h){this.getManager().addType(h);
},addAction:function(i){this.getManager().addAction(i);
},supportsType:function(f){return this.getManager().supportsType(f);
},supportsAction:function(c){return this.getManager().supportsAction(c);
},addData:function(j,k){this.getManager().addData(j,k);
},getData:function(m){return this.getManager().getData(m);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var r="mshtml",q="",p="qx.client",o=">",n="<",m=" ",k="='",h="qx.bom.Element",g="div",f="' ",e="></";
qx.Class.define(h,{statics:{__gp:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,B,C){if(!C){C=window;
}
if(!name){throw new Error("The tag name is missing!");
}var E=this.__gp;
var D=q;

for(var G in B){if(E[G]){D+=G+k+B[G]+f;
}}var H;
if(D!=q){if(qx.bom.client.Engine.MSHTML){H=C.document.createElement(n+name+m+D+o);
}else{var F=C.document.createElement(g);
F.innerHTML=n+name+m+D+e+name+o;
H=F.firstChild;
}}else{H=C.document.createElement(name);
}
for(var G in B){if(!E[G]){qx.bom.element.Attribute.set(H,G,B[G]);
}}return H;
},empty:function(c){return c.innerHTML=q;
},addListener:function(w,x,y,self,z){return qx.event.Registration.addListener(w,x,y,self,z);
},removeListener:function(X,Y,ba,self,bb){return qx.event.Registration.removeListener(X,Y,ba,self,bb);
},removeListenerById:function(V,W){return qx.event.Registration.removeListenerById(V,W);
},hasListener:function(t,u,v){return qx.event.Registration.hasListener(t,u,v);
},focus:function(a){qx.event.Registration.getManager(a).getHandler(qx.event.handler.Focus).focus(a);
},blur:function(d){qx.event.Registration.getManager(d).getHandler(qx.event.handler.Focus).blur(d);
},activate:function(A){qx.event.Registration.getManager(A).getHandler(qx.event.handler.Focus).activate(A);
},deactivate:function(I){qx.event.Registration.getManager(I).getHandler(qx.event.handler.Focus).deactivate(I);
},capture:function(b){qx.event.Registration.getManager(b).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(b);
},releaseCapture:function(s){qx.event.Registration.getManager(s).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(s);
},clone:function(J,K){var N;

if(K||(qx.core.Variant.isSet(p,r)&&!qx.xml.Document.isXmlDocument(J))){var R=qx.event.Registration.getManager(J);
var L=qx.dom.Hierarchy.getDescendants(J);
L.push(J);
}if(qx.core.Variant.isSet(p,r)){for(var i=0,l=L.length;i<l;i++){R.toggleAttachedEvents(L[i],false);
}}var N=J.cloneNode(true);
if(qx.core.Variant.isSet(p,r)){for(var i=0,l=L.length;i<l;i++){R.toggleAttachedEvents(L[i],true);
}}if(K===true){var U=qx.dom.Hierarchy.getDescendants(N);
U.push(N);
var M,P,T,O;

for(var i=0,S=L.length;i<S;i++){T=L[i];
M=R.serializeListeners(T);

if(M.length>0){P=U[i];

for(var j=0,Q=M.length;j<Q;j++){O=M[j];
R.addListener(P,O.type,O.handler,O.self,O.capture);
}}}}return N;
}}});
})();
(function(){var F="",E="qx.client",D="hidden",C="-moz-scrollbars-none",B="overflow",A=";",z="overflowY",y=":",x="overflowX",w="overflow:",R="none",Q="scroll",P="borderLeftStyle",O="borderRightStyle",N="div",M="borderRightWidth",L="overflow-y",K="borderLeftWidth",J="-moz-scrollbars-vertical",I="100px",G="qx.bom.element.Overflow",H="overflow-x";
qx.Class.define(G,{statics:{__cU:null,getScrollbarWidth:function(){if(this.__cU!==null){return this.__cU;
}var m=qx.bom.element.Style;
var o=function(bM,bN){return parseInt(m.get(bM,bN))||0;
};
var p=function(cb){return (m.get(cb,O)==R?0:o(cb,M));
};
var n=function(bU){return (m.get(bU,P)==R?0:o(bU,K));
};
var r=qx.core.Variant.select(E,{"mshtml":function(bP){if(m.get(bP,z)==D||bP.clientWidth==0){return p(bP);
}return Math.max(0,bP.offsetWidth-bP.clientLeft-bP.clientWidth);
},"default":function(S){if(S.clientWidth==0){var T=m.get(S,B);
var U=(T==Q||T==J?16:0);
return Math.max(0,p(S)+U);
}return Math.max(0,(S.offsetWidth-S.clientWidth-n(S)));
}});
var q=function(bo){return r(bo)-p(bo);
};
var t=document.createElement(N);
var s=t.style;
s.height=s.width=I;
s.overflow=Q;
document.body.appendChild(t);
var c=q(t);
this.__cU=c?c:16;
document.body.removeChild(t);
return this.__cU;
},_compile:qx.core.Variant.select(E,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bE,bF){if(bF==D){bF=C;
}return w+bF+A;
}:
function(bu,bv){return bu+y+bv+A;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bS,bT){return w+bT+A;
}:
function(bY,ca){return bY+y+ca+A;
},"default":function(bj,bk){return bj+y+bk+A;
}}),compileX:function(l){return this._compile(H,l);
},compileY:function(bn){return this._compile(L,bn);
},getX:qx.core.Variant.select(E,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(d,e){var f=qx.bom.element.Style.get(d,B,e,false);

if(f===C){f=D;
}return f;
}:
function(Y,ba){return qx.bom.element.Style.get(Y,x,ba,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bw,bx){return qx.bom.element.Style.get(bw,B,bx,false);
}:
function(bf,bg){return qx.bom.element.Style.get(bf,x,bg,false);
},"default":function(by,bz){return qx.bom.element.Style.get(by,x,bz,false);
}}),setX:qx.core.Variant.select(E,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bK,bL){if(bL==D){bL=C;
}bK.style.overflow=bL;
}:
function(bb,bc){bb.style.overflowX=bc;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bQ,bR){bQ.style.overflow=bR;
}:
function(g,h){g.style.overflowX=h;
},"default":function(W,X){W.style.overflowX=X;
}}),resetX:qx.core.Variant.select(E,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bG){bG.style.overflow=F;
}:
function(k){k.style.overflowX=F;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bl,bm){bl.style.overflow=F;
}:
function(bC,bD){bC.style.overflowX=F;
},"default":function(bO){bO.style.overflowX=F;
}}),getY:qx.core.Variant.select(E,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bH,bI){var bJ=qx.bom.element.Style.get(bH,B,bI,false);

if(bJ===C){bJ=D;
}return bJ;
}:
function(u,v){return qx.bom.element.Style.get(u,z,v,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(br,bs){return qx.bom.element.Style.get(br,B,bs,false);
}:
function(bp,bq){return qx.bom.element.Style.get(bp,z,bq,false);
},"default":function(bd,be){return qx.bom.element.Style.get(bd,z,be,false);
}}),setY:qx.core.Variant.select(E,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bA,bB){if(bB===D){bB=C;
}bA.style.overflow=bB;
}:
function(i,j){i.style.overflowY=j;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(a,b){a.style.overflow=b;
}:
function(bV,bW){bV.style.overflowY=bW;
},"default":function(cc,cd){cc.style.overflowY=cd;
}}),resetY:qx.core.Variant.select(E,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bt){bt.style.overflow=F;
}:
function(bX){bX.style.overflowY=F;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(ce,cf){ce.style.overflow=F;
}:
function(bh,bi){bh.style.overflowY=F;
},"default":function(V){V.style.overflowY=F;
}})}});
})();
(function(){var h="interval",g="Number",f="_applyTimeoutInterval",e="qx.event.type.Event",d="qx.event.Idle",c="__hC",b="singleton";
qx.Class.define(d,{extend:qx.core.Object,type:b,construct:function(){arguments.callee.base.call(this);
var a=new qx.event.Timer(this.getTimeoutInterval());
a.addListener(h,this._onInterval,this);
a.start();
this.__hC=a;
},events:{"interval":e},properties:{timeoutInterval:{check:g,init:100,apply:f}},members:{__hC:null,_applyTimeoutInterval:function(i){this.__hC.setInterval(i);
},_onInterval:function(){this.fireEvent(h);
}},destruct:function(){if(this.__hC){this.__hC.stop();
}this._disposeFields(c);
}});
})();
(function(){var n="toolTipText",m="icon",l="label",k="__iN",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="execute",e="_applyCommand",d="enabled",a="menu",c="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:e,event:c,nullable:true}},members:{__iN:null,_bindableProperties:[d,l,m,n,h,a],execute:function(){var o=this.getCommand();

if(o){o.execute(this);
}this.fireEvent(f);
},_applyCommand:function(p,q){var t=this.__iN;

if(t==null){this.__iN=t={};
}
for(var i=0;i<this._bindableProperties.length;i++){var s=this._bindableProperties[i];
if(q!=null&&t[s]!=null){q.removeBinding(t[s]);
t[s]=null;
}if(p!=null&&qx.Class.hasProperty(this.constructor,s)){var r=p.get(s);

if(r==null){var u=this.get(s);
}t[s]=p.bind(s,this,s);
if(u){this.set(s,u);
}}}}},destruct:function(){this._disposeFields(k);
}});
})();
(function(){var w=":",v="qx.client",u="anonymous",t="...",s="qx.dev.StackTrace",r="",q="\n",p="/source/class/",o=".";
qx.Class.define(s,{statics:{getStackTrace:qx.core.Variant.select(v,{"gecko":function(){try{throw new Error();
}catch(a){var F=this.getStackTraceFromError(a);
qx.lang.Array.removeAt(F,0);
var D=this.getStackTraceFromCaller(arguments);
var B=D.length>F.length?D:F;

for(var i=0;i<Math.min(D.length,F.length);i++){var C=D[i];

if(C.indexOf(u)>=0){continue;
}var J=C.split(w);

if(J.length!=2){continue;
}var H=J[0];
var A=J[1];
var z=F[i];
var K=z.split(w);
var G=K[0];
var y=K[1];

if(qx.Class.getByName(G)){var E=G;
}else{E=H;
}var I=E+w;

if(A){I+=A+w;
}I+=y;
B[i]=I;
}return B;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var ba;

try{ba.bar();
}catch(x){var bb=this.getStackTraceFromError(x);
qx.lang.Array.removeAt(bb,0);
return bb;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(v,{"opera":function(f){return [];
},"default":function(M){var R=[];
var Q=qx.lang.Function.getCaller(M);
var N={};

while(Q){var O=qx.lang.Function.getName(Q);
R.push(O);

try{Q=Q.caller;
}catch(bc){break;
}
if(!Q){break;
}var P=qx.core.ObjectRegistry.toHashCode(Q);

if(N[P]){R.push(t);
break;
}N[P]=Q;
}return R;
}}),getStackTraceFromError:qx.core.Variant.select(v,{"gecko":function(g){if(!g.stack){return [];
}var n=/@(.+):(\d+)$/gm;
var h;
var j=[];

while((h=n.exec(g.stack))!=null){var k=h[1];
var m=h[2];
var l=this.__bX(k);
j.push(l+w+m);
}return j;
},"webkit":function(L){if(L.sourceURL&&L.line){return [this.__bX(L.sourceURL)+w+L.line];
}else{return [];
}},"opera":function(S){if(S.message.indexOf("Backtrace:")<0){return [];
}var U=[];
var V=qx.lang.String.trim(S.message.split("Backtrace:")[1]);
var W=V.split(q);

for(var i=0;i<W.length;i++){var T=W[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(T&&T.length>=2){var Y=T[1];
var X=this.__bX(T[2]);
U.push(X+w+Y);
}}return U;
},"default":function(){return [];
}}),__bX:function(b){var e=p;
var c=b.indexOf(e);
var d=(c==-1)?b:b.substring(c+e.length).replace(/\//g,o).replace(/\.js$/,r);
return d;
}}});
})();
(function(){var q="px",p="qx.client",o="div",n="img",m="",l="scale-x",k="mshtml",j="no-repeat",i="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",h="scale-y",H="repeat",G=".png",F="scale",E="webkit",D='<div style="',C="repeat-y",B='<img src="',A="qx.bom.element.Decoration",z="png",y="', sizingMethod='scale')",w="', sizingMethod='crop')",x='"/>',u='" style="',v="none",s="repeat-x",t='"></div>',r="absolute";
qx.Class.define(A,{statics:{DEBUG:false,__cK:qx.core.Variant.isSet(p,k)&&qx.bom.client.Engine.VERSION<9,__cL:qx.core.Variant.select(p,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__cM:{"scale-x":n,"scale-y":n,"scale":n,"repeat":o,"no-repeat":o,"repeat-x":o,"repeat-y":o},update:function(a,b,c,d){var f=this.getTagName(c,b);

if(f!=a.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var g=this.getAttributes(b,c,d);

if(f===n){a.src=g.src;
}if(a.style.backgroundPosition!=m&&g.style.backgroundPosition===undefined){g.style.backgroundPosition=null;
}if(a.style.clip!=m&&g.style.clip===undefined){g.style.clip=null;
}var e=qx.bom.element.Style;
e.setStyles(a,g.style);
},create:function(I,J,K){var L=this.getTagName(J,I);
var N=this.getAttributes(I,J,K);
var M=qx.bom.element.Style.compile(N.style);

if(L===n){return B+N.src+u+M+x;
}else{return D+M+t;
}},getTagName:function(bf,bh){if(qx.core.Variant.isSet(p,k)){if(bh&&this.__cK&&this.__cL[bf]&&qx.lang.String.endsWith(bh,G)){return o;
}}return this.__cM[bf];
},getAttributes:function(O,P,Q){var U=qx.util.ResourceManager.getInstance();
var ba=qx.io2.ImageLoader;
var bb=qx.bom.element.Background;

if(!Q){Q={};
}
if(!Q.position){Q.position=r;
}
if(qx.core.Variant.isSet(p,k)){Q.fontSize=0;
Q.lineHeight=0;
}else if(qx.core.Variant.isSet(p,E)){Q.WebkitUserDrag=v;
}var Y=U.getImageWidth(O)||ba.getWidth(O);
var X=U.getImageHeight(O)||ba.getHeight(O);
var V=U.getImageFormat(O)||ba.getFormat(O);
{};
if(this.__cK&&this.__cL[P]&&V===z){if(Q.width==null&&Y!=null){Q.width=Y+q;
}
if(Q.height==null&&X!=null){Q.height=X+q;
}
if(P==j){Q.filter=i+U.toUri(O)+w;
}else{Q.filter=i+U.toUri(O)+y;
}Q.backgroundImage=Q.backgroundRepeat=m;
return {style:Q};
}else{if(P===F){var W=U.toUri(O);

if(Q.width==null&&Y!=null){Q.width=Y+q;
}
if(Q.height==null&&X!=null){Q.height=X+q;
}return {src:W,style:Q};
}var T=U.isClippedImage(O);

if(P===l||P===h){if(T){if(P===l){var bd=U.getData(O);
var be=U.getImageHeight(bd[4]);
var W=U.toUri(bd[4]);
Q.clip={top:-bd[6],height:X};
Q.height=be+q;
if(Q.top!=null){Q.top=(parseInt(Q.top,10)+bd[6])+q;
}else if(Q.bottom!=null){Q.bottom=(parseInt(Q.bottom,10)+X-be-bd[6])+q;
}return {src:W,style:Q};
}else{var bd=U.getData(O);
var bc=U.getImageWidth(bd[4]);
var W=U.toUri(bd[4]);
Q.clip={left:-bd[5],width:Y};
Q.width=bc+q;
if(Q.left!=null){Q.left=(parseInt(Q.left,10)+bd[5])+q;
}else if(Q.right!=null){Q.right=(parseInt(Q.right,10)+Y-bc-bd[5])+q;
}return {src:W,style:Q};
}}else{{};

if(P==l){Q.height=X==null?null:X+q;
}else if(P==h){Q.width=Y==null?null:Y+q;
}var W=U.toUri(O);
return {src:W,style:Q};
}}else{if(T&&P!==H){var bd=U.getData(O);
var S=bb.getStyles(bd[4],P,bd[5],bd[6]);

for(var R in S){Q[R]=S[R];
}
if(Y!=null&&Q.width==null&&(P==C||P===j)){Q.width=Y+q;
}
if(X!=null&&Q.height==null&&(P==s||P===j)){Q.height=X+q;
}return {style:Q};
}else{{};
var S=bb.getStyles(O,P);

for(var R in S){Q[R]=S[R];
}
if(Y!=null&&Q.width==null){Q.width=Y+q;
}
if(X!=null&&Q.height==null){Q.height=X+q;
}if(Q.filter){Q.filter=m;
}return {style:Q};
}}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(p,{"mshtml":function(){return qx.bom.element.Decoration.__cK;
},"default":function(){return false;
}})}});
})();
(function(){var p="Integer",o="_applyContentPadding",n="resetPaddingRight",m="setPaddingBottom",l="resetPaddingTop",k="qx.ui.core.MContentPadding",j="resetPaddingLeft",i="setPaddingTop",h="setPaddingRight",g="resetPaddingBottom",c="contentPaddingLeft",f="setPaddingLeft",e="contentPaddingTop",b="shorthand",a="contentPaddingRight",d="contentPaddingBottom";
qx.Mixin.define(k,{properties:{contentPaddingTop:{check:p,init:0,apply:o,themeable:true},contentPaddingRight:{check:p,init:0,apply:o,themeable:true},contentPaddingBottom:{check:p,init:0,apply:o,themeable:true},contentPaddingLeft:{check:p,init:0,apply:o,themeable:true},contentPadding:{group:[e,a,d,c],mode:b,themeable:true}},members:{__bs:{contentPaddingTop:i,contentPaddingRight:h,contentPaddingBottom:m,contentPaddingLeft:f},__bt:{contentPaddingTop:l,contentPaddingRight:n,contentPaddingBottom:g,contentPaddingLeft:j},_applyContentPadding:function(q,r,name){var s=this._getContentPaddingTarget();

if(q==null){var t=this.__bt[name];
s[t]();
}else{var u=this.__bs[name];
s[u](q);
}}}});
})();
(function(){var y="textarea",x="input",w="qx.client",v="character",u="qx.bom.Selection",t="#text",s="EndToEnd",r="button",q="body";
qx.Class.define(u,{statics:{getSelectionObject:qx.core.Variant.select(w,{"mshtml":function(J){return J.selection;
},"default":function(z){return qx.dom.Node.getWindow(z).getSelection();
}}),get:qx.core.Variant.select(w,{"mshtml":function(A){var B=qx.bom.Range.get(qx.dom.Node.getDocument(A));
return B.text;
},"default":function(I){if(qx.dom.Node.isElement(I)&&(I.nodeName.toLowerCase()==x||I.nodeName.toLowerCase()==y)){return I.value.substring(I.selectionStart,I.selectionEnd);
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(I)).toString();
}return null;
}}),getLength:qx.core.Variant.select(w,{"mshtml":function(a){var c=qx.bom.Selection.get(a);
var b=qx.util.StringSplit.split(c,/\r\n/);
return c.length-(b.length-1);
},"opera":function(O){var T,R,P;

if(qx.dom.Node.isElement(O)&&(O.nodeName.toLowerCase()==x||O.nodeName.toLowerCase()==y)){var S=O.selectionStart;
var Q=O.selectionEnd;
T=O.value.substring(S,Q);
R=Q-S;
}else{T=qx.bom.Selection.get(O);
R=T.length;
}P=qx.util.StringSplit.split(T,/\r\n/);
return R-(P.length-1);
},"default":function(U){if(qx.dom.Node.isElement(U)&&(U.nodeName.toLowerCase()==x||U.nodeName.toLowerCase()==y)){return U.selectionEnd-U.selectionStart;
}else{return qx.bom.Selection.get(U).length;
}return null;
}}),set:qx.core.Variant.select(w,{"mshtml":function(C,D,E){var F;
if(qx.dom.Node.isDocument(C)){C=C.body;
}
if(qx.dom.Node.isElement(C)||qx.dom.Node.isText(C)){switch(C.nodeName.toLowerCase()){case x:case y:case r:if(E===undefined){E=C.value.length;
}
if(D>=0&&D<=C.value.length&&E>=0&&E<=C.value.length){F=qx.bom.Range.get(C);
F.collapse(true);
F.moveStart(v,D);
F.moveEnd(v,E-D);
F.select();
return true;
}break;
case t:if(E===undefined){E=C.nodeValue.length;
}
if(D>=0&&D<=C.nodeValue.length&&E>=0&&E<=C.nodeValue.length){F=qx.bom.Range.get(qx.dom.Node.getBodyElement(C));
F.moveToElementText(C.parentNode);
F.collapse(true);
F.moveStart(v,D);
F.moveEnd(v,E-D);
F.select();
return true;
}break;
default:if(E===undefined){E=C.childNodes.length-1;
}if(C.childNodes[D]&&C.childNodes[E]){F=qx.bom.Range.get(qx.dom.Node.getBodyElement(C));
F.moveToElementText(C.childNodes[D]);
F.collapse(true);
var G=qx.bom.Range.get(qx.dom.Node.getBodyElement(C));
G.moveToElementText(C.childNodes[E]);
F.setEndPoint(s,G);
F.select();
return true;
}}}return false;
},"default":function(j,k,l){var p=j.nodeName.toLowerCase();

if(qx.dom.Node.isElement(j)&&(p==x||p==y)){if(l===undefined){l=j.value.length;
}if(k>=0&&k<=j.value.length&&l>=0&&l<=j.value.length){j.focus();
j.select();
j.setSelectionRange(k,l);
return true;
}}else{var n=false;
var o=qx.dom.Node.getWindow(j).getSelection();
var m=qx.bom.Range.get(j);
if(qx.dom.Node.isText(j)){if(l===undefined){l=j.length;
}
if(k>=0&&k<j.length&&l>=0&&l<=j.length){n=true;
}}else if(qx.dom.Node.isElement(j)){if(l===undefined){l=j.childNodes.length-1;
}
if(k>=0&&j.childNodes[k]&&l>=0&&j.childNodes[l]){n=true;
}}else if(qx.dom.Node.isDocument(j)){j=j.body;

if(l===undefined){l=j.childNodes.length-1;
}
if(k>=0&&j.childNodes[k]&&l>=0&&j.childNodes[l]){n=true;
}}
if(n){if(!o.isCollapsed){o.collapseToStart();
}m.setStart(j,k);
if(qx.dom.Node.isText(j)){m.setEnd(j,l);
}else{m.setEndAfter(j.childNodes[l]);
}if(o.rangeCount>0){o.removeAllRanges();
}o.addRange(m);
return true;
}}return false;
}}),setAll:function(H){return qx.bom.Selection.set(H,0);
},clear:qx.core.Variant.select(w,{"mshtml":function(K){var L=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(K));
var M=qx.bom.Range.get(K);
var parent=M.parentElement();
var N=qx.bom.Range.get(qx.dom.Node.getDocument(K));
if(parent==N.parentElement()&&parent==K){L.empty();
}},"default":function(d){var f=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(d));
var h=d.nodeName.toLowerCase();
if(qx.dom.Node.isElement(d)&&(h==x||h==y)){d.setSelectionRange(0,0);
qx.bom.Element.blur(d);
}else if(qx.dom.Node.isDocument(d)||h==q){f.collapse(d.body?d.body:d,0);
}else{var g=qx.bom.Range.get(d);

if(!g.collapsed){var i;
var e=g.commonAncestorContainer;
if(qx.dom.Node.isElement(d)&&qx.dom.Node.isText(e)){i=e.parentNode;
}else{i=e;
}
if(i==d){f.collapse(d,0);
}}}}})}});
})();
(function(){var d="qx.ui.core.queue.Manager",c="useraction";
qx.Class.define(d,{statics:{__fn:false,__fo:{},__fp:0,MAX_RETRIES:10,scheduleFlush:function(h){var self=qx.ui.core.queue.Manager;
self.__fo[h]=true;

if(!self.__fn){self.__fs.schedule();
self.__fn=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fq){return;
}self.__fq=true;
self.__fs.cancel();
var b=self.__fo;
self.__fr(function(){while(b.visibility||b.widget||b.appearance||b.layout||b.element){if(b.widget){delete b.widget;
qx.ui.core.queue.Widget.flush();
}
if(b.visibility){delete b.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(b.appearance){delete b.appearance;
qx.ui.core.queue.Appearance.flush();
}if(b.widget||b.visibility||b.appearance){continue;
}
if(b.layout){delete b.layout;
qx.ui.core.queue.Layout.flush();
}if(b.widget||b.visibility||b.appearance||b.layout){continue;
}
if(b.element){delete b.element;
qx.html.Element.flush();
}}},function(){self.__fn=false;
});
self.__fr(function(){if(b.dispose){delete b.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__fq=false;
});
self.__fp=0;
},__fr:function(f,g){var self=qx.ui.core.queue.Manager;

try{f();
}catch(e){self.__fn=false;
self.__fq=false;
self.__fp+=1;

if(self.__fp<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__fp-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{g();
}}},defer:function(a){a.__fs=new qx.util.DeferredCall(a.flush);
qx.html.Element._scheduleFlush=a.scheduleFlush;
qx.event.Registration.addListener(window,c,a.flush);
}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",G=")",F="winxp",E="freebsd",D="sunos",C="SV1",B="|",A="nintendods",z="winnt4",y="wince",x="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="symbian",v="g",u="qx.bom.client.System",w=" Mobile/";
qx.Bootstrap.define(u,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__bM:{"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":F,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":z,"Win 9x 4.90":x,"Windows CE":y,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":E,"NetBSD":m,"OpenBSD":k,"SunOS":D,"Symbian System":t,"Nitro":A,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__bN:function(){var J=navigator.userAgent;
var I=[];

for(var H in this.__bM){I.push(H);
}var K=new RegExp(l+I.join(B).replace(/\./g,r)+G,v);

if(!K.test(J)){this.UNKNOWN_SYSTEM=true;

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
}else{this.NAME=this.__bM[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(J.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&J.indexOf(C)!==-1){this.SP2=true;
}}}}},defer:function(L){L.__bN();
}});
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
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cw=qx.dev.StackTrace.getStackTrace();
},members:{__cw:null,getStackTrace:function(){return this.__cw;
}}});
})();
(function(){var a="qx.ui.form.IModelSelection";
qx.Interface.define(a,{members:{setModelSelection:function(b){},getModelSelection:function(){}}});
})();
(function(){var h="[",g="]",f=".",d="idBubble",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(i,j,name){this.fireDataEvent(c,{value:i,name:name,old:j});
this._registerEventChaining(i,j,name);
},_registerEventChaining:function(k,l,name){if((k instanceof qx.core.Object)&&qx.Class.hasMixin(k.constructor,qx.data.marshal.MEventBubbling)){var m=qx.lang.Function.bind(this.__bB,this,name);
var n=k.addListener(c,m,this);
k.setUserData(d,n);
}if(l!=null&&l.getUserData&&l.getUserData(d)!=null){l.removeListenerById(l.getUserData(d));
}},__bB:function(name,e){var v=e.getData();
var r=v.value;
var p=v.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(v.name.indexOf){var u=v.name.indexOf(f)!=-1?v.name.indexOf(f):v.name.length;
var s=v.name.indexOf(h)!=-1?v.name.indexOf(h):v.name.length;

if(u<s){var o=v.name.substring(0,u);
var t=v.name.substring(u+1,v.name.length);

if(t[0]!=h){t=f+t;
}var q=name+h+o+g+t;
}else if(s<u){var o=v.name.substring(0,s);
var t=v.name.substring(s,v.name.length);
var q=name+h+o+g+t;
}else{var q=name+h+v.name+g;
}}else{var q=name+h+v.name+g;
}}else{var q=name+f+v.name;
}this.fireDataEvent(c,{value:r,name:q,old:p});
}}});
})();
(function(){var S="change",R="add",Q="remove",P="order",O="",N="qx.data.Array",M="?",L="changeBubble",K="__bu",J="qx.event.type.Event",G="number",I="changeLength",H="qx.event.type.Data";
qx.Class.define(N,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(bh){arguments.callee.base.call(this);
if(bh==undefined){this.__bu=[];
}else if(arguments.length>1){this.__bu=[];

for(var i=0;i<arguments.length;i++){this.__bu.push(arguments[i]);
}}else if(typeof bh==G){this.__bu=new Array(bh);
}else if(bh instanceof Array){this.__bu=qx.lang.Array.clone(bh);
}else{this.__bu=[];
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__bu.length;i++){this._applyEventPropagation(this.__bu[i],null,i);
}this.__bv();
},events:{"change":H,"changeLength":J},members:{__bu:null,concat:function(e){if(e){var f=this.__bu.concat(e);
}else{var f=this.__bu.concat();
}return new qx.data.Array(f);
},join:function(m){return this.__bu.join(m);
},pop:function(){var W=this.__bu.pop();
this.__bv();
this._applyEventPropagation(null,W,this.length-1);
this.fireDataEvent(S,{start:this.length-1,end:this.length-1,type:Q,items:[W]},null);
return W;
},push:function(l){for(var i=0;i<arguments.length;i++){this.__bu.push(arguments[i]);
this.__bv();
this._applyEventPropagation(arguments[i],null,this.length-1);
this.fireDataEvent(S,{start:this.length-1,end:this.length-1,type:R,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){this.__bu.reverse();
this.fireDataEvent(S,{start:0,end:this.length-1,type:P,items:null},null);
},shift:function(){var o=this.__bu.shift();
this.__bv();
this._applyEventPropagation(null,o);
this.fireDataEvent(S,{start:0,end:this.length-1,type:Q,items:[o]},null);
return o;
},slice:function(r,s){return new qx.data.Array(this.__bu.slice(r,s));
},splice:function(v,w,x){var D=this.__bu.length;
var A=this.__bu.splice.apply(this.__bu,arguments);
if(this.__bu.length!=D){this.__bv();
}var B=w>0;
var y=arguments.length>2;
var z=null;

if(B||y){if(this.__bu.length>D){var C=R;
}else if(this.__bu.length<D){var C=Q;
z=A;
}else{var C=P;
}this.fireDataEvent(S,{start:v,end:this.length-1,type:C,items:z},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,v+i);
}this.fireDataEvent(L,{value:this,name:M,old:A});
for(var i=0;i<A.length;i++){this._applyEventPropagation(null,A[i],i);
}return (new qx.data.Array(A));
},sort:function(c){this.__bu.sort.apply(this.__bu,arguments);
this.fireDataEvent(S,{start:0,end:this.length-1,type:P,items:null},null);
},unshift:function(q){for(var i=arguments.length-1;i>=0;i--){this.__bu.unshift(arguments[i]);
this.__bv();
this._applyEventPropagation(arguments[i],null,0);
this.fireDataEvent(S,{start:0,end:this.length-1,type:R,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__bu;
},getItem:function(g){return this.__bu[g];
},setItem:function(T,U){var V=this.__bu[T];
this.__bu[T]=U;
this._applyEventPropagation(U,V,T);
if(this.length!=this.__bu.length){this.__bv();
}this.fireDataEvent(S,{start:T,end:T,type:R,items:[U]},null);
},getLength:function(){return this.length;
},indexOf:function(u){return this.__bu.indexOf(u);
},toString:function(){if(this.__bu!=null){return this.__bu.toString();
}return O;
},contains:function(d){return this.__bu.indexOf(d)!==-1;
},copy:function(){return this.concat();
},insertAt:function(bc,bd){this.splice(bc,0,bd);
},insertBefore:function(Y,ba){var bb=this.indexOf(Y);

if(bb==-1){this.push(ba);
}else{this.splice(bb,0,ba);
}},insertAfter:function(h,j){var k=this.indexOf(h);

if(k==-1||k==(this.length-1)){this.push(j);
}else{this.splice(k+1,0,j);
}},removeAt:function(X){return this.splice(X,1)[0];
},removeAll:function(){for(var i=0;i<this.__bu.length;i++){this._applyEventPropagation(null,this.__bu[i],i);
}var F=this.getLength();
var E=this.__bu.concat();
this.__bu.length=0;
this.__bv();
this.fireDataEvent(S,{start:0,end:F-1,type:Q,items:E},null);
},append:function(n){{};
for(var i=0;i<n.length;i++){this._applyEventPropagation(n[i],null,this.__bu.length+i);
}Array.prototype.push.apply(this.__bu,n);
this.__bv();
},remove:function(a){var b=this.indexOf(a);

if(b!=-1){this.splice(b,1);
return a;
}},equals:function(p){if(this.length!==p.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==p.getItem(i)){return false;
}}return true;
},sum:function(){var bi=0;

for(var i=0;i<this.length;i++){bi+=this.getItem(i);
}return bi;
},max:function(){var t=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>t){t=this.getItem(i);
}}return t===undefined?null:t;
},min:function(){var bg=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<bg){bg=this.getItem(i);
}}return bg===undefined?null:bg;
},forEach:function(be,bf){for(var i=0;i<this.__bu.length;i++){be.call(bf,this.__bu[i]);
}},__bv:function(){this.length=this.__bu.length;
this.fireEvent(I,qx.event.type.Event);
}},destruct:function(){this._disposeFields(K);
}});
})();
(function(){var b="changeModel",a="qx.ui.form.MModelProperty";
qx.Mixin.define(a,{properties:{model:{nullable:true,event:b}}});
})();
(function(){var l="__bw",k="__bx",j="Boolean",h="qx.ui.core.SingleSelectionManager",g="__by",f="changeSelected",e="qx.event.type.Data";
qx.Class.define(h,{extend:qx.core.Object,construct:function(t){arguments.callee.base.call(this);
{};
this.__bw=t;
},events:{"changeSelected":e},properties:{allowEmptySelection:{check:j,init:true,apply:g}},members:{__bx:null,__bw:null,getSelected:function(){return this.__bx;
},setSelected:function(m){if(!this.__bA(m)){throw new Error("Could not select "+m+", because it is not a child element!");
}this.__bz(m);
},resetSelected:function(){this.__bz(null);
},isSelected:function(u){if(!this.__bA(u)){throw new Error("Could not check if "+u+" is selected,"+" because it is not a child element!");
}return this.__bx===u;
},isSelectionEmpty:function(){return this.__bx==null;
},getSelectables:function(){var r=this.__bw.getItems();
var s=[];

for(var i=0;i<r.length;i++){if(this.__bw.isItemSelectable(r[i])){s.push(r[i]);
}}return s;
},__by:function(n,o){if(!n){this.__bz(this.__bx);
}},__bz:function(a){var d=this.__bx;
var c=a;

if(c!=null&&d===c){return;
}
if(!this.isAllowEmptySelection()&&c==null){var b=this.getSelectables()[0];

if(b){c=b;
}}this.__bx=c;
this.fireDataEvent(f,c,d);
},__bA:function(p){var q=this.__bw.getItems();

for(var i=0;i<q.length;i++){if(q[i]===p){return true;
}}return false;
}},destruct:function(){if(this.__bw.toHashCode){this._disposeObjects(l);
}else{this._disposeFields(l);
}this._disposeObjects(k);
}});
})();
(function(){var c="qx.ui.core.ISingleSelection",b="qx.event.type.Data";
qx.Interface.define(c,{events:{"changeSelection":b},members:{getSelection:function(){return true;
},setSelection:function(a){return arguments.length==1;
},resetSelection:function(){return true;
},isSelected:function(d){return arguments.length==1;
},isSelectionEmpty:function(){return true;
},getSelectables:function(){return true;
}}});
})();
(function(){var c="qx.ui.form.IModel",b="qx.event.type.Data";
qx.Interface.define(c,{events:{"changeModel":b},members:{setModel:function(a){},getModel:function(){},resetModel:function(){}}});
})();
(function(){var e="change",d="qx.event.type.Data",c="qx.ui.form.MModelSelection",b="__bC",a="changeSelection";
qx.Mixin.define(c,{construct:function(){this.__bC=new qx.data.Array();
this.__bC.addListener(e,this.__bF,this);
this.addListener(a,this.__bE,this);
},events:{changeModelSelection:d},members:{__bC:null,__bD:false,__bE:function(){if(this.__bD){return;
}var s=this.getSelection();
var q=[];

for(var i=0;i<s.length;i++){var t=s[i];
var r=t.getModel?t.getModel():null;

if(r!==null){q.push(r);
}}this.setModelSelection(q);
},__bF:function(){this.__bD=true;
var g=this.getSelectables();
var k=[];
var h=this.__bC.toArray();

for(var i=0;i<h.length;i++){var m=h[i];

for(var j=0;j<g.length;j++){var n=g[j];
var f=n.getModel?n.getModel():null;

if(m===f){k.push(n);
break;
}}}this.setSelection(k);
this.__bD=false;
var l=this.getSelection();

if(!qx.lang.Array.equals(l,k)){this.__bE();
}},getModelSelection:function(){return this.__bC;
},setModelSelection:function(o){if(!o){this.__bC.removeAll();
return;
}{};
o.unshift(this.__bC.getLength());
o.unshift(0);
var p=this.__bC.splice.apply(this.__bC,o);
p.dispose();
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var h="qx.ui.core.MSingleSelectionHandling",g="changeSelection",f="changeSelected",d="__bG",c="qx.event.type.Data";
qx.Mixin.define(h,{events:{"changeSelection":c},members:{__bG:null,getSelection:function(){var i=this.__bH().getSelected();

if(i){return [i];
}else{return [];
}},setSelection:function(k){switch(k.length){case 0:this.resetSelection();
break;
case 1:this.__bH().setSelected(k[0]);
break;
default:throw new Error("Could only select one item, but the selection "+" array contains "+k.length+" items!");
}},resetSelection:function(){this.__bH().resetSelected();
},isSelected:function(m){return this.__bH().isSelected(m);
},isSelectionEmpty:function(){return this.__bH().isSelectionEmpty();
},getSelectables:function(){return this.__bH().getSelectables();
},_onChangeSelected:function(e){var b=e.getData();
var a=e.getOldData();
b==null?b=[]:b=[b];
a==null?a=[]:a=[a];
this.fireDataEvent(g,b,a);
},__bH:function(){if(this.__bG==null){var l=this;
this.__bG=new qx.ui.core.SingleSelectionManager({getItems:function(){return l._getItems();
},isItemSelectable:function(j){if(l._isItemSelectable){return l._isItemSelectable(j);
}else{return j.isEnabled()&&j.isVisible();
}}});
this.__bG.addListener(f,this._onChangeSelected,this);
}this.__bG.setAllowEmptySelection(this._isAllowEmptySelection());
return this.__bG;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var c="qx.ui.core.scroll.IScrollBar",b="qx.event.type.Data";
qx.Interface.define(c,{events:{"scroll":b},properties:{orientation:{},maximum:{},position:{},knobFactor:{}},members:{scrollTo:function(d){this.assertNumber(d);
},scrollBy:function(e){this.assertNumber(e);
},scrollBySteps:function(a){this.assertNumber(a);
}}});
})();
(function(){var i="Integer",h="hovered",g="hover-button",f="interval",d="mouseover",c="mouseout",b="qx.ui.form.HoverButton",a="__bI";
qx.Class.define(b,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(j,k){arguments.callee.base.call(this,j,k);
this.addListener(d,this._onMouseOver,this);
this.addListener(c,this._onMouseOut,this);
this.__bI=new qx.event.AcceleratingTimer();
this.__bI.addListener(f,this._onInterval,this);
},properties:{appearance:{refine:true,init:g},interval:{check:i,init:80},firstInterval:{check:i,init:200},minTimer:{check:i,init:20},timerDecrease:{check:i,init:2}},members:{__bI:null,_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.__bI.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.addState(h);
},_onMouseOut:function(e){this.__bI.stop();
this.removeState(h);

if(!this.isEnabled()||e.getTarget()!==this){return;
}},_onInterval:function(){if(this.isEnabled()){this.execute();
}else{this.__bI.stop();
}}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var s="icon",r="label",q="arrow",p="shortcut",o="submenu",n="String",m="qx.ui.menu.Menu",l="qx.ui.menu.AbstractButton",k="keypress",j="_applyIcon",g="mouseup",i="abstract",h="_applyLabel",f="_applyMenu";
qx.Class.define(l,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],type:i,construct:function(){arguments.callee.base.call(this);
this._setLayout(new qx.ui.menu.ButtonLayout);
this.addListener(g,this._onMouseUp);
this.addListener(k,this._onKeyPress);
},properties:{blockToolTip:{refine:true,init:true},label:{check:n,apply:h,nullable:true},menu:{check:m,apply:f,nullable:true},icon:{check:n,apply:j,themeable:true,nullable:true}},members:{_createChildControlImpl:function(B){var C;

switch(B){case s:C=new qx.ui.basic.Image;
C.setAnonymous(true);
this._add(C,{column:0});
break;
case r:C=new qx.ui.basic.Label;
C.setAnonymous(true);
this._add(C,{column:1});
break;
case p:C=new qx.ui.basic.Label;
C.setAnonymous(true);
this._add(C,{column:2});
break;
case q:C=new qx.ui.basic.Image;
C.setAnonymous(true);
this._add(C,{column:3});
break;
}return C||arguments.callee.base.call(this,B);
},_forwardStates:{selected:1},getChildrenSizes:function(){var t=0,u=0,v=0,z=0;

if(this._isChildControlVisible(s)){var A=this.getChildControl(s);
t=A.getMarginLeft()+A.getSizeHint().width+A.getMarginRight();
}
if(this._isChildControlVisible(r)){var x=this.getChildControl(r);
u=x.getMarginLeft()+x.getSizeHint().width+x.getMarginRight();
}
if(this._isChildControlVisible(p)){var w=this.getChildControl(p);
v=w.getMarginLeft()+w.getSizeHint().width+w.getMarginRight();
}
if(this._isChildControlVisible(q)){var y=this.getChildControl(q);
z=y.getMarginLeft()+y.getSizeHint().width+y.getMarginRight();
}return [t,u,v,z];
},_onMouseUp:function(e){},_onKeyPress:function(e){},_applyIcon:function(a,b){if(a){this._showChildControl(s).setSource(a);
}else{this._excludeChildControl(s);
}},_applyLabel:function(D,E){if(D){this._showChildControl(r).setValue(D);
}else{this._excludeChildControl(r);
}},_applyMenu:function(c,d){if(d){d.resetOpener();
d.removeState(o);
}
if(c){this._showChildControl(q);
c.setOpener(this);
c.addState(o);
}else{this._excludeChildControl(q);
}}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}}});
})();
(function(){var m="complete",l="initialized",k="loading",j="webkit",i="load",h="qx.event.type.Event",g="qx.client",f="__bK",e="qx.io2.part.Package";
qx.Class.define(e,{extend:qx.core.Object,construct:function(p,q){arguments.callee.base.call(this);
this.__bJ=q?m:l;
this.__bK=p;
},events:{"load":h},members:{__bK:null,__bJ:null,__bL:function(a,b,self){if(a.length==0){b.call(self);
return;
}this.__bJ=k;
var d=0;
var c=function(n){if(d>=a.length){this.__bJ=m;
b.call(self);
return;
}var o=new qx.io2.ScriptLoader();
o.load(n.shift(),function(){d+=1;
o.dispose();

if(qx.core.Variant.isSet(g,j)){qx.event.Timer.once(function(){c.call(this,n,b,self);
},this,0);
}else{c.call(this,n,b,self);
}},this);
};
c(qx.lang.Array.clone(a));
},getReadyState:function(){return this.__bJ;
},load:function(){if(this.__bJ!==l){return;
}this.__bJ=k;
this.__bL(this.__bK,function(){this.__bJ=m;
this.fireEvent(i);
},this);
}},destruct:function(){this._disposeArray(f);
}});
})();
(function(){var a="qx.bom.client.Transport";
qx.Class.define(a,{statics:{getMaxConcurrentRequestCount:function(){var g;
var b=qx.bom.client.Engine;
var f=/([^.]*)\.([^.]*)\.([^.]*).*/.exec(b.FULLVERSION);
var e;

if(f){e=f[3];
}else{f=/([^.]*)\.([^.]*).*/.exec(b.FULLVERSION);
e=0;
}var d=f[1];
var c=f[2];
if(window.maxConnectionsPerServer){g=window.maxConnectionsPerServer;
}else if(b.OPERA){g=8;
}else if(b.WEBKIT){g=4;
}else if(b.GECKO&&((d>1)||((d==1)&&(c>9))||((d==1)&&(c==9)&&(e>=1)))){g=6;
}else{g=2;
}return g;
}}});
})();
(function(){var h="mshtml",g="pop.push.reverse.shift.sort.splice.unshift.join.slice",f="number",e="qx.type.BaseArray",d="qx.client",c=".";
qx.Class.define(e,{extend:Array,construct:function(length){},members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});
(function(){function n(q){if(qx.core.Variant.isSet(d,h)){m.prototype={length:0,$$isArray:true};
var t=g.split(c);

for(var length=t.length;length;){m.prototype[t[--length]]=Array.prototype[t[length]];
}}var u=Array.prototype.slice;
m.prototype.concat=function(){var k=this.slice(0);

for(var i=0,length=arguments.length;i<length;i++){var j;

if(arguments[i] instanceof m){j=u.call(arguments[i],0);
}else if(arguments[i] instanceof Array){j=arguments[i];
}else{j=[arguments[i]];
}k.push.apply(k,j);
}return k;
};
m.prototype.toString=function(){return u.call(this,0).toString();
};
m.prototype.toLocaleString=function(){return u.call(this,0).toLocaleString();
};
m.prototype.constructor=m;
m.prototype.indexOf=qx.lang.Core.arrayIndexOf;
m.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
m.prototype.forEach=qx.lang.Core.arrayForEach;
m.prototype.some=qx.lang.Core.arraySome;
m.prototype.every=qx.lang.Core.arrayEvery;
var r=qx.lang.Core.arrayFilter;
var s=qx.lang.Core.arrayMap;
m.prototype.filter=function(){var a=new this.constructor;
a.push.apply(a,r.apply(this,arguments));
return a;
};
m.prototype.map=function(){var p=new this.constructor;
p.push.apply(p,s.apply(this,arguments));
return p;
};
m.prototype.slice=function(){var b=new this.constructor;
b.push.apply(b,Array.prototype.slice.apply(this,arguments));
return b;
};
m.prototype.splice=function(){var o=new this.constructor;
o.push.apply(o,Array.prototype.splice.apply(this,arguments));
return o;
};
m.prototype.toArray=function(){return Array.prototype.slice.call(this,0);
};
m.prototype.valueOf=function(){return this.length;
};
return m;
}function m(length){if(arguments.length===1&&typeof length===f){this.length=-1<length&&length===length>>.5?length:this.push(length);
}else if(arguments.length){this.push.apply(this,arguments);
}}function l(){}l.prototype=[];
m.prototype=new l;
m.prototype.length=0;
qx.type.BaseArray=n(m);
})();
})();
(function(){var h="String",g="changeContent",f="feedreader.model.Article",e="changeDate",d="changeAuthor",c="changeLink",b="Date",a="changeTitle";
qx.Class.define(f,{extend:qx.core.Object,properties:{title:{check:h,event:a},author:{check:h,nullable:true,event:d},date:{check:b,event:e},content:{check:h,event:g},link:{check:h,event:c}}});
})();
(function(){var g="center",f="knob",e="middle",d="qx.ui.splitpane.Splitter",c="vertical";
qx.Class.define(d,{extend:qx.ui.core.Widget,construct:function(h){arguments.callee.base.call(this);
if(h.getOrientation()==c){this._setLayout(new qx.ui.layout.HBox(0,g));
this._getLayout().setAlignY(e);
}else{this._setLayout(new qx.ui.layout.VBox(0,e));
this._getLayout().setAlignX(g);
}this._createChildControl(f);
},properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_createChildControlImpl:function(a){var b;

switch(a){case f:b=new qx.ui.basic.Image;
this._add(b);
break;
}return b||arguments.callee.base.call(this,a);
}}});
})();
(function(){var bc="slidebar",bb="Integer",ba="resize",Y="qx.ui.core.Widget",X="selected",W="visible",V="Boolean",U="mouseout",T="excluded",S="menu",bs="_applySelectedButton",br="_applySpacingY",bq="_blocker",bp="_applyCloseInterval",bo="_applyBlockerColor",bn="_applyIconColumnWidth",bm="mouseover",bl="_applyArrowColumnWidth",bk="qx.ui.menu.Menu",bj="_placementTarget",bh="Color",bi="Number",bf="_applyOpenInterval",bg="_applySpacingX",bd="_applyBlockerOpacity",be="_applyOpenedButton";
qx.Class.define(bk,{extend:qx.ui.core.Widget,include:[qx.ui.core.MPlacement,qx.ui.core.MChildrenHandling],construct:function(){arguments.callee.base.call(this);
this._setLayout(new qx.ui.menu.Layout);
var v=this.getApplicationRoot();
v.add(this);
this.addListener(bm,this._onMouseOver);
this.addListener(U,this._onMouseOut);
this.addListener(ba,this._onResize,this);
v.addListener(ba,this._onResize,this);
this._blocker=new qx.ui.core.Blocker(v);
this.initVisibility();
this.initKeepFocus();
this.initKeepActive();
},properties:{appearance:{refine:true,init:S},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},visibility:{refine:true,init:T},keepFocus:{refine:true,init:true},keepActive:{refine:true,init:true},spacingX:{check:bb,apply:bg,init:0,themeable:true},spacingY:{check:bb,apply:br,init:0,themeable:true},iconColumnWidth:{check:bb,init:0,themeable:true,apply:bn},arrowColumnWidth:{check:bb,init:0,themeable:true,apply:bl},blockerColor:{check:bh,init:null,nullable:true,apply:bo,themeable:true},blockerOpacity:{check:bi,init:1,apply:bd,themeable:true},selectedButton:{check:Y,nullable:true,apply:bs},openedButton:{check:Y,nullable:true,apply:be},opener:{check:Y,nullable:true},openInterval:{check:bb,themeable:true,init:250,apply:bf},closeInterval:{check:bb,themeable:true,init:250,apply:bp},blockBackground:{check:V,themeable:true,init:false}},members:{__bM:null,__bN:null,_blocker:null,open:function(){if(this.getOpener()!=null){this.placeToWidget(this.getOpener());
this.__bP();
this.show();
this._placementTarget=this.getOpener();
}else{this.warn("The menu instance needs a configured 'opener' widget!");
}},openAtMouse:function(e){this.placeToMouse(e);
this.__bP();
this.show();
this._placementTarget={left:e.getDocumentLeft(),top:e.getDocumentTop()};
},openAtPoint:function(y){this.placeToPoint(y);
this.__bP();
this.show();
this._placementTarget=y;
},addSeparator:function(){this.add(new qx.ui.menu.Separator);
},getColumnSizes:function(){return this._getMenuLayout().getColumnSizes();
},getSelectables:function(){var c=[];
var d=this.getChildren();

for(var i=0;i<d.length;i++){if(d[i].isEnabled()){c.push(d[i]);
}}return c;
},_applyIconColumnWidth:function(z,A){this._getMenuLayout().setIconColumnWidth(z);
},_applyArrowColumnWidth:function(w,x){this._getMenuLayout().setArrowColumnWidth(w);
},_applySpacingX:function(k,l){this._getMenuLayout().setColumnSpacing(k);
},_applySpacingY:function(F,G){this._getMenuLayout().setSpacing(F);
},_applyVisibility:function(B,C){arguments.callee.base.call(this,B,C);
var D=qx.ui.menu.Manager.getInstance();

if(B===W){D.add(this);
var E=this.getParentMenu();

if(E){E.setOpenedButton(this.getOpener());
}}else if(C===W){D.remove(this);
var E=this.getParentMenu();

if(E&&E.getOpenedButton()==this.getOpener()){E.resetOpenedButton();
}this.resetOpenedButton();
this.resetSelectedButton();
}this.__bO();
},__bO:function(){if(this.isVisible()){if(this.getBlockBackground()){var f=this.getZIndex();
this._blocker.blockContent(f-1);
}}else{if(this._blocker.isContentBlocked()){this._blocker.unblockContent();
}}},getParentMenu:function(){var g=this.getOpener();

if(!g||!(g instanceof qx.ui.menu.AbstractButton)){return null;
}
while(g&&!(g instanceof qx.ui.menu.Menu)){g=g.getLayoutParent();
}return g;
},_applySelectedButton:function(a,b){if(b){b.removeState(X);
}
if(a){a.addState(X);
}},_applyOpenedButton:function(H,I){if(I){I.getMenu().exclude();
}
if(H){H.getMenu().open();
}},_applyBlockerColor:function(h,j){this._blocker.setColor(h);
},_applyBlockerOpacity:function(n,o){this._blocker.setOpacity(n);
},_createChildControlImpl:function(J){var K;

switch(J){case bc:var K=new qx.ui.menu.MenuSlideBar();
var M=this._getLayout();
this._setLayout(new qx.ui.layout.Grow());
var L=K.getLayout();
K.setLayout(M);
L.dispose();
var N=qx.lang.Array.clone(this.getChildren());

for(var i=0;i<N.length;i++){K.add(N[i]);
}this.removeListener(ba,this._onResize,this);
K.getChildrenContainer().addListener(ba,this._onResize,this);
this.add(K);
break;
}return K||arguments.callee.base.call(this,J);
},_getMenuLayout:function(){if(this.hasChildControl(bc)){return this.getChildControl(bc).getChildrenContainer().getLayout();
}else{return this._getLayout();
}},_getMenuBounds:function(){if(this.hasChildControl(bc)){return this.getChildControl(bc).getChildrenContainer().getBounds();
}else{return this.getBounds();
}},_computePlacementSize:function(){return this._getMenuBounds();
},__bP:function(){var t=this._getMenuBounds();

if(!t){this.addListenerOnce(ba,this.__bP,this);
return;
}var s=this.getLayoutParent().getBounds().height;
var top=this.getLayoutProperties().top;
var u=this.getLayoutProperties().left;
if(top<0){this._assertSlideBar(function(){this.setHeight(t.height+top);
this.moveTo(u,0);
});
}else if(top+t.height>s){this._assertSlideBar(function(){this.setHeight(s-top);
});
}else{this.setHeight(null);
}},_assertSlideBar:function(m){if(this.hasChildControl(bc)){return m.call(this);
}this.__bN=m;
qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.getChildControl(bc);

if(this.__bN){this.__bN.call(this);
delete this.__bN;
}},_onResize:function(){if(this.isVisible()){var p=this._placementTarget;

if(!p){return;
}else if(p instanceof qx.ui.core.Widget){this.placeToWidget(p);
}else if(p.top!==undefined){this.placeToPoint(p);
}else{throw new Error("Unknown target: "+p);
}this.__bP();
}},_onMouseOver:function(e){var P=qx.ui.menu.Manager.getInstance();
P.cancelClose(this);
var Q=e.getTarget();

if(Q.isEnabled()&&Q instanceof qx.ui.menu.AbstractButton){this.setSelectedButton(Q);
var O=Q.getMenu&&Q.getMenu();

if(O){O.setOpener(Q);
P.scheduleOpen(O);
this.__bM=O;
}else{var R=this.getOpenedButton();

if(R){P.scheduleClose(R.getMenu());
}
if(this.__bM){P.cancelOpen(this.__bM);
this.__bM=null;
}}}else if(!this.getOpenedButton()){this.resetSelectedButton();
}},_onMouseOut:function(e){var q=qx.ui.menu.Manager.getInstance();
if(!qx.ui.core.Widget.contains(this,e.getRelatedTarget())){var r=this.getOpenedButton();
r?this.setSelectedButton(r):this.resetSelectedButton();
if(r){q.cancelClose(r.getMenu());
}if(this.__bM){q.cancelOpen(this.__bM);
}}}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.ui.menu.Manager.getInstance().remove(this);
}this.getApplicationRoot().removeListener(ba,this._onResize,this);
this._disposeFields(bj);
this._disposeObjects(bq);
}});
})();
(function(){var j="_applyBackground",i="repeat",h="backgroundPositionX",g="backgroundPositionY",f="no-repeat",e="scale",d="repeat-x",c="repeat-y",b="qx.ui.decoration.MBackgroundImage",a="String";
qx.Mixin.define(b,{properties:{backgroundImage:{check:a,nullable:true,apply:j},backgroundRepeat:{check:[i,d,c,f,e],init:i,apply:j},backgroundPositionX:{nullable:true,apply:j},backgroundPositionY:{nullable:true,apply:j},backgroundPosition:{group:[g,h]}},members:{_generateBackgroundMarkup:function(k){var l=qx.ui.decoration.Util.generateBackgroundMarkup(this.getBackgroundImage(),this.getBackgroundRepeat(),this.getBackgroundPositionX(),this.getBackgroundPositionY(),k);
return l;
},_applyBackground:function(){{};
}}});
})();
(function(){var e="qx.event.handler.Iframe",d="load",c="iframe";
qx.Class.define(e,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(m,d);
})},members:{canHandleEvent:function(a,b){return a.tagName.toLowerCase()===c;
},registerEvent:function(f,g,h){},unregisterEvent:function(j,k,l){}},defer:function(i){qx.event.Registration.addHandler(i);
}});
})();
(function(){var m="qx.client",l="webkit",k="body",j="iframe",i="qx.bom.Iframe";
qx.Class.define(i,{statics:{DEFAULT_ATTRIBUTES:{onload:"qx.event.handler.Iframe.onevent(this)",frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:true},create:function(p,q){var p=p?qx.lang.Object.clone(p):{};
var r=qx.bom.Iframe.DEFAULT_ATTRIBUTES;

for(var s in r){if(p[s]==null){p[s]=r[s];
}}return qx.bom.Element.create(j,p,q);
},getWindow:qx.core.Variant.select(m,{"mshtml|gecko":function(a){try{return a.contentWindow;
}catch(z){return null;
}},"default":function(b){try{var c=this.getDocument(b);
return c?c.defaultView:null;
}catch(t){return null;
}}}),getDocument:qx.core.Variant.select(m,{"mshtml":function(g){try{var h=this.getWindow(g);
return h?h.document:null;
}catch(B){return null;
}},"default":function(e){try{return e.contentDocument;
}catch(y){return null;
}}}),getBody:function(C){try{var D=this.getDocument(C);
return D?D.getElementsByTagName(k)[0]:null;
}catch(d){return null;
}},setSource:function(v,w){try{if(this.getWindow(v)&&qx.dom.Hierarchy.isRendered(v)){try{if(qx.core.Variant.isSet(m,l)&&qx.bom.client.Platform.MAC){var x=this.getContentWindow();

if(x){x.stop();
}}this.getWindow(v).location.replace(w);
}catch(A){v.src=w;
}}else{v.src=w;
}}catch(f){qx.log.Logger.warn("Iframe source could not be set!");
}},queryCurrentUrl:function(n){var o=this.getDocument(n);

try{if(o&&o.location){return o.location.href;
}}catch(u){}return null;
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
(function(){var n="error",m="http://resources.qooxdoo.org/proxy_1.php?mode=jsonp&proxy=",l="feedreader.io.FeedLoader",k="loading",j="completed",h="text/plain",g="GET",f="loaded",e="singleton";
qx.Class.define(l,{extend:qx.core.Object,type:e,members:{loadAll:function(s){var u=s.getFeeds().getItem(0).getFeeds();

for(var i=0;i<u.length;i++){this.load(u.getItem(i));
}var t=s.getFeeds().getItem(1).getFeeds();

for(i=0;i<t.length;i++){this.load(t.getItem(i));
}},load:function(p){p.setState(k);
var r,q;
r=m+encodeURIComponent(p.getUrl());
q=new qx.io.remote.Request(r,g,h);
q.setCrossDomain(true);
q.setTimeout(30000);
q.addListener(j,this.__bQ(p),this);
q.send();
},__bQ:function(a){return function(b){var d=b.getContent();
if(d==null){this.warn("Empty feed content: "+a.getUrl());
a.setState(n);
}else{try{a.getArticles().splice(0,a.getArticles().length);
var c=feedreader.io.FeedParser.parseFeed(d);

for(var i=0;i<c.length;i++){a.getArticles().push(c[i]);
}a.setState(f);
}catch(o){a.setState(n);
this.warn("Could not parse feed: "+a.getUrl());
}}};
}}});
})();
(function(){var k="splitter",j="slider",i="mousedown",h="mouseout",g="mousemove",f="mouseup",d="losecapture",c="active",b="horizontal",a="vertical",D="knob",C="Integer",B="height",A="row-resize",z="move",w="maxHeight",v="width",u="_applyOrientation",t="mouseover",s="splitpane",q="qx.ui.splitpane.Pane",r="_applyOffset",o="minHeight",p="__bR",m="minWidth",n="col-resize",l="maxWidth";
qx.Class.define(q,{extend:qx.ui.core.Widget,construct:function(bu){arguments.callee.base.call(this);
this.__bR=[];
if(bu){this.setOrientation(bu);
}else{this.initOrientation();
}this.addListener(i,this._onMouseDown);
this.addListener(f,this._onMouseUp);
this.addListener(g,this._onMouseMove);
this.addListener(h,this._onMouseOut);
this.addListener(d,this._onMouseUp);
},properties:{appearance:{refine:true,init:s},offset:{check:C,init:6,apply:r},orientation:{init:b,check:[b,a],apply:u}},members:{__bS:null,__bT:false,__bU:null,__bV:null,__bW:null,__bX:null,__bY:null,__bR:null,_createChildControlImpl:function(G){var H;

switch(G){case j:H=new qx.ui.splitpane.Slider(this);
H.exclude();
this._add(H,{type:G});
break;
case k:H=new qx.ui.splitpane.Splitter(this);
this._add(H,{type:G});
H.addListener(z,this._onSplitterMove,this);
if(qx.bom.client.Engine.OPERA){H.addListener(t,this._onSplitterMouseOver,H);
}break;
}return H||arguments.callee.base.call(this,G);
},_applyOrientation:function(J,K){var L=this.getChildControl(j);
var O=this.getChildControl(k);
this.__bW=J===b;
var N=this._getLayout();

if(N){N.dispose();
}var M=J===a?new qx.ui.splitpane.VLayout:new qx.ui.splitpane.HLayout;
this._setLayout(M);
O.removeState(K);
O.addState(J);
O.getChildControl(D).removeState(K);
O.getChildControl(D).addState(J);
L.removeState(K);
L.addState(J);
},_applyOffset:function(P,Q){var R=this.getChildControl(k);

if(Q===0){R.removeListener(i,this._onMouseDown,this);
R.removeListener(g,this._onMouseMove,this);
R.removeListener(h,this._onMouseOut,this);
R.removeListener(f,this._onMouseUp,this);
R.removeListener(d,this._onMouseUp,this);
this.addListener(i,this._onMouseDown);
this.addListener(f,this._onMouseUp);
this.addListener(g,this._onMouseMove);
this.addListener(h,this._onMouseOut);
this.addListener(d,this._onMouseUp);
}
if(P===0){this.removeListener(i,this._onMouseDown);
this.removeListener(f,this._onMouseUp);
this.removeListener(g,this._onMouseMove);
this.removeListener(h,this._onMouseOut);
this.removeListener(d,this._onMouseUp);
R.addListener(i,this._onMouseDown,this);
R.addListener(g,this._onMouseMove,this);
R.addListener(h,this._onMouseOut,this);
R.addListener(f,this._onMouseUp,this);
R.addListener(d,this._onMouseUp,this);
}},add:function(X,Y){if(Y==null){this._add(X);
}else{this._add(X,{flex:Y});
}this.__bR.push(X);
},remove:function(I){this._remove(I);
qx.lang.Array.remove(this.__bR,I);
},getChildren:function(){return this.__bR;
},_onMouseDown:function(e){if(!e.isLeftPressed()||!this._isNear()){return;
}var S=this.getChildControl(k);
var U=S.getContainerLocation();
var T=this.getContentLocation();
this.__bS=this.__bW?e.getDocumentLeft()-U.left+T.left:e.getDocumentTop()-U.top+T.top;
var W=this.getChildControl(j);
var V=S.getBounds();
W.setUserBounds(V.left,V.top,V.width,V.height);
W.setZIndex(S.getZIndex()+1);
W.show();
this.__bT=true;
e.getCurrentTarget().capture();
},_onMouseMove:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
if(this.__bT){this.__cb();
var E=this.getChildControl(j);
var F=this.__bX;

if(this.__bW){E.setDomLeft(F);
}else{E.setDomTop(F);
}}else{this.__ca();
}},_onMouseOut:function(e){this._setLastMousePosition(-1,-1);
this.__ca();
},_onMouseUp:function(e){if(!this.__bT){return;
}this._finalizeSizes();
var bC=this.getChildControl(j);
bC.exclude();
this.__bT=false;
this.releaseCapture();
this.__ca();
},_onSplitterMove:function(){this.__ca();
},_onSplitterMouseOver:function(){this.addState(c);
},_finalizeSizes:function(){var by=this.__bX;
var bv=this.__bY;

if(by==null){return;
}var bA=this._getChildren();
var bz=bA[2];
var bw=bA[3];
var bx=bz.getLayoutProperties().flex;
var bB=bw.getLayoutProperties().flex;
if((bx!=0)&&(bB!=0)){bz.setLayoutProperties({flex:by});
bw.setLayoutProperties({flex:bv});
}else{if(this.__bW){bz.setWidth(by);
bw.setWidth(bv);
}else{bz.setHeight(by);
bw.setHeight(bv);
}}},_isNear:function(){var bn=this.getChildControl(k);
var bp=bn.getBounds();
var br=bn.getContainerLocation();
var bo=this.getOffset();
if(!br){return;
}var bs=this.__bU;
var bt=bp.width;
var bq=br.left;

if(bt<bo){bq-=Math.floor((bo-bt)/2);
bt=bo;
}
if(bs<bq||bs>(bq+bt)){return false;
}var bs=this.__bV;
var bt=bp.height;
var bq=br.top;

if(bt<bo){bq-=Math.floor((bo-bt)/2);
bt=bo;
}
if(bs<bq||bs>(bq+bt)){return false;
}return true;
},__ca:function(){var bb=this.getChildControl(k);
var bc=this.getApplicationRoot();
if(this.__bT||this._isNear()){var ba=this.__bW?n:A;
this.setCursor(ba);
bc.setGlobalCursor(ba);
bb.addState(c);
}else if(bb.hasState(c)){this.resetCursor();
bc.resetGlobalCursor();
bb.removeState(c);
}},__cb:function(){if(this.__bW){var bf=m,bm=v,bg=l,bk=this.__bU;
}else{var bf=o,bm=B,bg=w,bk=this.__bV;
}var bl=this._getChildren();
var bd=bl[2].getSizeHint();
var bi=bl[3].getSizeHint();
var bj=bl[2].getBounds()[bm]+bl[3].getBounds()[bm];
var bh=bk-this.__bS;
var be=bj-bh;
if(bh<bd[bf]){be-=bd[bf]-bh;
bh=bd[bf];
}else if(be<bi[bf]){bh-=bi[bf]-be;
be=bi[bf];
}if(bh>bd[bg]){be+=bh-bd[bg];
bh=bd[bg];
}else if(be>bi[bg]){bh+=be-bi[bg];
be=bi[bg];
}this.__bX=bh;
this.__bY=be;
},_isActiveDragSession:function(){return this.__bT;
},_setLastMousePosition:function(x,y){this.__bU=x;
this.__bV=y;
}},destruct:function(){this._disposeFields(p);
}});
})();
(function(){var h="complete",g="load",f="loading",e="initialized",d="qx.io2.part.Part",c="__ce",b="qx.event.type.Event";
qx.Class.define(d,{extend:qx.core.Object,construct:function(name,a){arguments.callee.base.call(this);
this.__cc=name;
this.__cd=h;
this.__ce=a;

for(var i=0;i<a.length;i++){if(a[i].getReadyState()!==h){this.__cd=e;
break;
}}},events:{"load":b},members:{__cd:null,getReadyState:function(){return this.__cd;
},__cc:null,getName:function(){return this.__cc;
},__ce:null,load:function(j,self){if(this.__cd==h){if(j){j.call(self);
}return;
}else if(this.__cd==f){if(j){this.addListenerOnce(g,j,self);
}return;
}
if(j){this.addListenerOnce(g,j,self);
}this.__cd==f;
var k=function(){this.load();
};

for(var i=0;i<this.__ce.length;i++){var l=this.__ce[i];

switch(l.getReadyState()){case e:l.addListenerOnce(g,k,this);
l.load();
return;
case f:l.addListenerOnce(g,k,this);
return;
case h:break;
default:throw new Error("Invalid case!");
}}this.__cd=h;
this.fireEvent(g);
}},destruct:function(){this._disposeObjects(c);
}});
})();
(function(){var v="Boolean",u="changeSelection",t="single",s="mouseup",r="mousedown",q="losecapture",p="one",o="multi",n="_applyQuickSelection",m="mouseover",d="_applySelectionMode",l="_applyDragSelection",h="__cf",c="qx.ui.core.MMultiSelectionHandling",b="removeItem",g="keypress",f="qx.event.type.Data",j="addItem",a="additive",k="mousemove";
qx.Mixin.define(c,{construct:function(){var G=this.SELECTION_MANAGER;
var F=this.__cf=new G(this);
this.addListener(r,F.handleMouseDown,F);
this.addListener(s,F.handleMouseUp,F);
this.addListener(m,F.handleMouseOver,F);
this.addListener(k,F.handleMouseMove,F);
this.addListener(q,F.handleLoseCapture,F);
this.addListener(g,F.handleKeyPress,F);
this.addListener(j,F.handleAddItem,F);
this.addListener(b,F.handleRemoveItem,F);
F.addListener(u,this._onSelectionChange,this);
},events:{"changeSelection":f},properties:{selectionMode:{check:[t,o,a,p],init:t,apply:d},dragSelection:{check:v,init:false,apply:l},quickSelection:{check:v,init:false,apply:n}},members:{__cf:null,selectAll:function(){this.__cf.selectAll();
},isSelected:function(E){if(!qx.ui.core.Widget.contains(this,E)){throw new Error("Could not test if "+E+" is selected, because it is not a child element!");
}return this.__cf.isItemSelected(E);
},addToSelection:function(D){if(!qx.ui.core.Widget.contains(this,D)){throw new Error("Could not add + "+D+" to selection, because it is not a child element!");
}this.__cf.addItem(D);
},removeFromSelection:function(y){if(!qx.ui.core.Widget.contains(this,y)){throw new Error("Could not remove "+y+" from selection, because it is not a child element!");
}this.__cf.removeItem(y);
},selectRange:function(B,C){this.__cf.selectItemRange(B,C);
},resetSelection:function(){this.__cf.clearSelection();
},setSelection:function(w){for(var i=0;i<w.length;i++){if(!qx.ui.core.Widget.contains(this,w[i])){throw new Error("Could not select "+w[i]+", because it is not a child element!");
}}
if(w.length===0){this.resetSelection();
}else{var x=this.getSelection();

if(!qx.lang.Array.equals(x,w)){this.__cf.replaceSelection(w);
}}},getSelection:function(){return this.__cf.getSelection();
},getSortedSelection:function(){return this.__cf.getSortedSelection();
},isSelectionEmpty:function(){return this.__cf.isSelectionEmpty();
},getSelectionContext:function(){return this.__cf.getSelectionContext();
},_getManager:function(){return this.__cf;
},getSelectables:function(){return this.__cf.getSelectables();
},invertSelection:function(){this.__cf.invertSelection();
},_applySelectionMode:function(J,K){this.__cf.setMode(J);
},_applyDragSelection:function(H,I){this.__cf.setDrag(H);
},_applyQuickSelection:function(z,A){this.__cf.setQuick(z);
},_onSelectionChange:function(e){this.fireDataEvent(u,e.getData());
}},destruct:function(){this._disposeObjects(h);
}});
})();
(function(){var m="_applyDynamic",k="changeSelection",j="Boolean",h="qx.ui.container.Stack";
qx.Class.define(h,{extend:qx.ui.core.Widget,implement:qx.ui.core.ISingleSelection,include:qx.ui.core.MSingleSelectionHandling,construct:function(){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Grow);
this.addListener(k,this.__cg,this);
},properties:{dynamic:{check:j,init:false,apply:m}},members:{_applyDynamic:function(n){var p=this._getChildren();
var o=this.getSelection()[0];
var q;

for(var i=0,l=p.length;i<l;i++){q=p[i];

if(q!=o){if(n){p[i].exclude();
}else{p[i].hide();
}}}},_getItems:function(){return this.getChildren();
},_isAllowEmptySelection:function(){return true;
},_isItemSelectable:function(y){return y.isEnabled();
},__cg:function(e){var s=e.getOldData()[0];
var t=e.getData()[0];

if(s){if(this.isDynamic()){s.exclude();
}else{s.hide();
}}
if(t){t.show();
}},add:function(f){this._add(f);
var g=this.getSelection()[0];

if(!g){this.setSelection([f]);
}else if(g!==f){if(this.isDynamic()){f.exclude();
}else{f.hide();
}}},remove:function(z){this._remove(z);

if(this.getSelection()[0]===z){var A=this._getChildren()[0];

if(A){this.setSelection([A]);
}else{this.resetSelection();
}}},indexOf:function(r){return this._indexOf(r);
},getChildren:function(){return this._getChildren();
},previous:function(){var c=this.getSelection()[0];
var a=this._indexOf(c)-1;
var d=this._getChildren();

if(a<0){a=d.length-1;
}var b=d[a];
this.setSelection([b]);
},next:function(){var v=this.getSelection()[0];
var u=this._indexOf(v)+1;
var w=this._getChildren();
var x=w[u]||w[0];
this.setSelection([x]);
}}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var d="__dg",c="abstract",b="qx.application.AbstractGui";
qx.Class.define(b,{type:c,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dg:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__dg;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__dg=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(a){},terminate:function(){}},destruct:function(){this._disposeFields(d);
}});
})();
(function(){var m="]",k="Theme",j="[Theme ",h="qx.Theme";
qx.Class.define(h,{statics:{define:function(name,q){if(!q){var q={};
}q.include=this.__C(q.include);
q.patch=this.__C(q.patch);
{};
var r={$$type:k,name:name,title:q.title,toString:this.genericToString};
if(q.extend){r.supertheme=q.extend;
}r.basename=qx.Bootstrap.createNamespace(name,r);
this.__F(r,q);
this.__D(r,q);
this.$$registry[name]=r;
for(var i=0,a=q.include,l=a.length;i<l;i++){this.include(r,a[i]);
}
for(var i=0,a=q.patch,l=a.length;i<l;i++){this.patch(r,a[i]);
}},__C:function(A){if(!A){return [];
}
if(qx.lang.Type.isArray(A)){return A;
}else{return [A];
}},__D:function(n,o){var p=o.aliases||{};

if(o.extend&&o.extend.aliases){qx.lang.Object.mergeWith(p,o.extend.aliases,false);
}n.aliases=p;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},genericToString:function(){return j+this.name+m;
},__E:function(y){for(var i=0,z=this.__G,l=z.length;i<l;i++){if(y[z[i]]){return z[i];
}}},__F:function(B,C){var F=this.__E(C);
if(C.extend&&!F){F=C.extend.type;
}B.type=F||"other";
if(!F){return;
}var H=function(){};
if(C.extend){H.prototype=new C.extend.$$clazz;
}var G=H.prototype;
var E=C[F];
for(var D in E){G[D]=E[D];
if(G[D].base){{};
G[D].base=C.extend;
}}B.$$clazz=H;
B[F]=new H;
},$$registry:{},__G:["colors","borders","decorations","fonts","icons","widgets","appearances","meta"],__H:null,__I:null,__J:function(){},patch:function(b,c){var e=this.__E(c);

if(e!==this.__E(b)){throw new Error("The mixins '"+b.name+"' are not compatible '"+c.name+"'!");
}var d=c[e];
var f=b.$$clazz.prototype;

for(var g in d){f[g]=d[g];
}},include:function(s,t){var v=t.type;

if(v!==s.type){throw new Error("The mixins '"+s.name+"' are not compatible '"+t.name+"'!");
}var u=t[v];
var w=s.$$clazz.prototype;

for(var x in u){if(w[x]!==undefined){continue;
}w[x]=u[x];
}}}});
})();
(function(){var gk="button-frame",gj="atom",gi="widget",gh="main",gg="button",gf="text-selected",ge="image",gd="bold",gc="middle",gb="background-light",eO="text-disabled",eN="groupbox",eM="decoration/arrows/down.png",eL="cell",eK="selected",eJ="border-invalid",eI="input",eH="input-disabled",eG="menu-button",eF="input-focused-invalid",gr="toolbar-button",gs="spinner",gp="input-focused",gq="popup",gn="tooltip",go="list",gl="tree-item",gm="treevirtual-contract",gt="scrollbar",gu="datechooser/nav-button",fJ="text-hovered",fI="center",fL="treevirtual-expand",fK="textfield",fN="label",fM="decoration/arrows/right.png",fP="background-application",fO="radiobutton",fH="invalid",fG="combobox",cK="right-top",cL="checkbox",cM="text-title",cN="qx/static/blank.gif",cO="scrollbar/button",cP="right",cQ="combobox/button",cR="icon/16/places/folder.png",cS="text-label",cT="decoration/tree/closed.png",gI="scrollbar-slider-horizontal",gH="white",gG="decoration/arrows/left.png",gF="button-focused",gM="text-light",gL="menu-slidebar-button",gK="text-input",gJ="slidebar/button-forward",gO="background-splitpane",gN=".png",dN="decoration/tree/open.png",dO="default",dL="decoration/arrows/down-small.png",dM="datechooser",dR="slidebar/button-backward",dS="selectbox",dP="treevirtual-folder",dQ="shadow-popup",dJ="icon/16/mimetypes/office-document.png",dK="background-medium",dp="table",dn="decoration/arrows/up.png",dr="decoration/form/",dq="",dk="-invalid",dj="icon/16/places/folder-open.png",dm="button-checked",dl="decoration/window/maximize-active-hovered.png",di="radiobutton-hovered",dh="decoration/cursors/",dY="slidebar",ea="tooltip-error-arrow",eb="table-scroller-focus-indicator",ec="move-frame",dU="nodrop",dV="decoration/table/boolean-true.png",dW="table-header-cell",dX="menu",ed="app-header",ee="row-layer",dC="text-inactive",dB="move",dA="radiobutton-checked-focused",dz="decoration/window/restore-active-hovered.png",dy="shadow-window",dx="table-column-button",dw="right.png",dv="tabview-page-button-bottom-inactive",dG="tooltip-error",dF="window-statusbar",ef="button-hovered",eg="decoration/scrollbar/scrollbar-",eh="background-tip",ei="scrollbar-slider-horizontal-disabled",ej="table-scroller-header",ek="radiobutton-disabled",el="button-pressed",em="table-pane",en="decoration/window/close-active.png",eo="native",eW="checkbox-hovered",eV="button-invalid-shadow",eU="checkbox-checked",eT="decoration/window/minimize-active-hovered.png",fb="menubar",fa="icon/16/actions/dialog-cancel.png",eY="tabview-page-button-top-inactive",eX="tabview-page-button-left-inactive",ff="menu-slidebar",fe="toolbar-button-checked",fC="decoration/tree/open-selected.png",fD="radiobutton-checked",fA="decoration/window/minimize-inactive.png",fB="icon/16/apps/office-calendar.png",fy="group",fz="tabview-page-button-right-inactive",fw="decoration/window/minimize-active.png",fx="decoration/window/restore-inactive.png",fE="checkbox-checked-focused",fF="splitpane",fT="combobox/textfield",fS="button-preselected-focused",fV="decoration/window/close-active-hovered.png",fU="qx/icon/Tango/16/actions/window-close.png",fX="checkbox-pressed",fW="button-disabled",ga="tabview-page-button-left-active",fY="border-separator",fR="decoration/window/maximize-inactive.png",fQ="icon/22/places/folder-open.png",gB="scrollarea",gC="scrollbar-vertical",gD="decoration/toolbar/toolbar-handle-knob.gif",gE="icon/22/mimetypes/office-document.png",gx="button-preselected",gy="button-checked-focused",gz="up.png",gA="best-fit",gv="decoration/tree/closed-selected.png",gw="qx.theme.modern.Appearance",cJ="text-active",cI="checkbox-disabled",cH="toolbar-button-hovered",cG="progressive-table-header",cF="decoration/table/select-column-order.png",cE="decoration/menu/radiobutton.gif",cD="decoration/arrows/forward.png",cC="decoration/table/descending.png",cB="window-captionbar-active",cA="checkbox-checked-hovered",cW="scrollbar-slider-vertical",cX="toolbar",cU="alias",cV="decoration/window/restore-active.png",db="decoration/table/boolean-false.png",dc="checkbox-checked-disabled",cY="icon/32/mimetypes/office-document.png",da="radiobutton-checked-disabled",de="tabview-pane",df="decoration/arrows/rewind.png",fj="checkbox-focused",fd="top",fq="#EEE",fm="icon/16/actions/dialog-ok.png",eR="radiobutton-checked-hovered",eP="table-header-cell-hovered",dt="window",eS="text-gray",dE="decoration/menu/radiobutton-invert.gif",dD="text-placeholder",ex="slider",ey="keep-align",ez="down.png",eA="tabview-page-button-top-active",eB="icon/32/places/folder-open.png",eC="icon/22/places/folder.png",eD="decoration/window/maximize-active.png",eE="checkbox-checked-pressed",ev="decoration/window/close-inactive.png",ew="toolbar-part",eQ="decoration/splitpane/knob-vertical.png",fp=".gif",fo="decoration/menu/checkbox-invert.gif",fn="radiobutton-checked-pressed",fu="table-statusbar",ft="radiobutton-pressed",fs="window-captionbar-inactive",fr="copy",fl="radiobutton-focused",fk="decoration/arrows/down-invert.png",dd="decoration/menu/checkbox.gif",dI="decoration/splitpane/knob-horizontal.png",dH="icon/32/places/folder.png",fc="toolbar-separator",dT="tabview-page-button-bottom-active",fi="decoration/arrows/up-small.png",fh="decoration/table/ascending.png",fg="decoration/arrows/up-invert.png",ds="small",fv="tabview-page-button-right-active",dg="-disabled",du="scrollbar-horizontal",ep="progressive-table-header-cell",eq="menu-separator",er="pane",es="decoration/arrows/right-invert.png",et="left.png",eu="icon/16/actions/view-refresh.png";
qx.Theme.define(gw,{appearances:{"widget":{},"root":{style:function(hj){return {backgroundColor:fP,textColor:cS,font:dO};
}},"label":{style:function(cj){return {textColor:cj.disabled?eO:undefined};
}},"move-frame":{style:function(hL){return {decorator:gh};
}},"resize-frame":ec,"dragdrop-cursor":{style:function(bt){var bu=dU;

if(bt.copy){bu=fr;
}else if(bt.move){bu=dB;
}else if(bt.alias){bu=cU;
}return {source:dh+bu+fp,position:cK,offset:[2,16,2,6]};
}},"image":{style:function(hi){return {opacity:!hi.replacement&&hi.disabled?0.3:1};
}},"atom":{},"atom/label":fN,"atom/icon":ge,"popup":{style:function(q){return {decorator:gh,backgroundColor:gb,shadow:dQ};
}},"button-frame":{alias:gj,style:function(ba){var bc,bb;

if(ba.checked&&ba.focused&&!ba.inner){bc=gy;
bb=undefined;
}else if(ba.disabled){bc=fW;
bb=undefined;
}else if(ba.pressed){bc=el;
bb=fJ;
}else if(ba.checked){bc=dm;
bb=undefined;
}else if(ba.hovered){bc=ef;
bb=fJ;
}else if(ba.preselected&&ba.focused&&!ba.inner){bc=fS;
bb=fJ;
}else if(ba.preselected){bc=gx;
bb=fJ;
}else if(ba.focused&&!ba.inner){bc=gF;
bb=undefined;
}else{bc=gg;
bb=undefined;
}return {decorator:bc,textColor:bb,shadow:ba.invalid&&!ba.disabled?eV:undefined};
}},"button-frame/image":{style:function(s){return {opacity:!s.replacement&&s.disabled?0.5:1};
}},"button":{alias:gk,include:gk,style:function(k){return {padding:[2,8],center:true};
}},"hover-button":{alias:gj,include:gj,style:function(by){return {decorator:by.hovered?eK:undefined,textColor:by.hovered?gf:undefined};
}},"splitbutton":{},"splitbutton/button":gg,"splitbutton/arrow":{alias:gg,include:gg,style:function(V){return {icon:eM,padding:2,marginLeft:1};
}},"checkbox":{alias:gj,style:function(t){var v;

if(t.checked&&t.focused){v=fE;
}else if(t.checked&&t.disabled){v=dc;
}else if(t.checked&&t.pressed){v=eE;
}else if(t.checked&&t.hovered){v=cA;
}else if(t.checked){v=eU;
}else if(t.disabled){v=cI;
}else if(t.focused){v=fj;
}else if(t.pressed){v=fX;
}else if(t.hovered){v=eW;
}else{v=cL;
}var u=t.invalid&&!t.disabled?dk:dq;
return {icon:dr+v+u+gN,gap:6};
}},"radiobutton":{alias:gj,style:function(L){var N;

if(L.checked&&L.focused){N=dA;
}else if(L.checked&&L.disabled){N=da;
}else if(L.checked&&L.pressed){N=fn;
}else if(L.checked&&L.hovered){N=eR;
}else if(L.checked){N=fD;
}else if(L.disabled){N=ek;
}else if(L.focused){N=fl;
}else if(L.pressed){N=ft;
}else if(L.hovered){N=di;
}else{N=fO;
}var M=L.invalid&&!L.disabled?dk:dq;
return {icon:dr+N+M+gN,gap:6};
}},"textfield":{style:function(bM){var bR;
var bP=!!bM.focused;
var bQ=!!bM.invalid;
var bN=!!bM.disabled;

if(bP&&bQ&&!bN){bR=eF;
}else if(bP&&!bQ&&!bN){bR=gp;
}else if(bN){bR=eH;
}else if(!bP&&bQ&&!bN){bR=eJ;
}else{bR=eI;
}var bO;

if(bM.disabled){bO=eO;
}else if(bM.showingPlaceholder){bO=dD;
}else{bO=gK;
}return {decorator:bR,padding:[2,4,1],textColor:bO};
}},"textarea":{include:fK,style:function(hw){return {padding:4};
}},"spinner":{style:function(cd){var ch;
var cf=!!cd.focused;
var cg=!!cd.invalid;
var ce=!!cd.disabled;

if(cf&&cg&&!ce){ch=eF;
}else if(cf&&!cg&&!ce){ch=gp;
}else if(ce){ch=eH;
}else if(!cf&&cg&&!ce){ch=eJ;
}else{ch=eI;
}return {decorator:ch};
}},"spinner/textfield":{style:function(hC){return {marginRight:2,padding:[2,4,1],textColor:hC.disabled?eO:gK};
}},"spinner/upbutton":{alias:gk,include:gk,style:function(Q){return {icon:fi,padding:Q.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:gk,include:gk,style:function(ct){return {icon:dL,padding:ct.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":fG,"datefield/button":{alias:cQ,include:cQ,style:function(G){return {icon:fB,padding:[0,3],decorator:undefined};
}},"datefield/textfield":fT,"datefield/list":{alias:dM,include:dM,style:function(hK){return {decorator:undefined};
}},"groupbox":{style:function(hW){return {legendPosition:fd};
}},"groupbox/legend":{alias:gj,style:function(hM){return {padding:[1,0,1,4],textColor:hM.invalid?fH:cM,font:gd};
}},"groupbox/frame":{style:function(U){return {padding:12,decorator:fy};
}},"check-groupbox":eN,"check-groupbox/legend":{alias:cL,include:cL,style:function(E){return {padding:[1,0,1,4],textColor:E.invalid?fH:cM,font:gd};
}},"radio-groupbox":eN,"radio-groupbox/legend":{alias:fO,include:fO,style:function(bq){return {padding:[1,0,1,4],textColor:bq.invalid?fH:cM,font:gd};
}},"scrollarea":{style:function(hD){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(bI){return {backgroundColor:fP};
}},"scrollarea/pane":gi,"scrollarea/scrollbar-x":gt,"scrollarea/scrollbar-y":gt,"scrollbar":{style:function(bl){if(bl[eo]){return {};
}return {width:bl.horizontal?undefined:16,height:bl.horizontal?16:undefined,decorator:bl.horizontal?du:gC,padding:1};
}},"scrollbar/slider":{alias:ex,style:function(gY){return {padding:gY.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:gk,style:function(h){var i=h.horizontal?gI:cW;

if(h.disabled){i+=dg;
}return {decorator:i,minHeight:h.horizontal?undefined:9,minWidth:h.horizontal?9:undefined};
}},"scrollbar/button":{alias:gk,include:gk,style:function(hP){var hQ=eg;

if(hP.left){hQ+=et;
}else if(hP.right){hQ+=dw;
}else if(hP.up){hQ+=gz;
}else{hQ+=ez;
}
if(hP.left||hP.right){return {padding:[0,0,0,hP.left?3:4],icon:hQ,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:hQ,width:14,height:15};
}}},"scrollbar/button-begin":cO,"scrollbar/button-end":cO,"slider":{style:function(hE){var hI;
var hG=!!hE.focused;
var hH=!!hE.invalid;
var hF=!!hE.disabled;

if(hG&&hH&&!hF){hI=eF;
}else if(hG&&!hH&&!hF){hI=gp;
}else if(hF){hI=eH;
}else if(!hG&&hH&&!hF){hI=eJ;
}else{hI=eI;
}return {decorator:hI};
}},"slider/knob":{include:gk,style:function(Y){return {decorator:Y.disabled?ei:gI,shadow:undefined,height:14,width:14};
}},"list":{alias:gB,style:function(bz){var bD;
var bB=!!bz.focused;
var bC=!!bz.invalid;
var bA=!!bz.disabled;

if(bB&&bC&&!bA){bD=eF;
}else if(bB&&!bC&&!bA){bD=gp;
}else if(bA){bD=eH;
}else if(!bB&&bC&&!bA){bD=eJ;
}else{bD=eI;
}return {backgroundColor:gb,decorator:bD};
}},"list/pane":gi,"listitem":{alias:gj,style:function(cl){return {padding:4,textColor:cl.selected?gf:undefined,decorator:cl.selected?eK:undefined};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:gk,include:gk,style:function(B){return {padding:5,center:true,icon:B.vertical?eM:fM};
}},"slidebar/button-backward":{alias:gk,include:gk,style:function(P){return {padding:5,center:true,icon:P.vertical?dn:gG};
}},"tabview":{style:function(H){return {contentPadding:16};
}},"tabview/bar":{alias:dY,style:function(cy){var cz={marginBottom:cy.barTop?-1:0,marginTop:cy.barBottom?-4:0,marginLeft:cy.barRight?-3:0,marginRight:cy.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(cy.barTop||cy.barBottom){cz.paddingLeft=5;
cz.paddingRight=7;
}else{cz.paddingTop=5;
cz.paddingBottom=7;
}return cz;
}},"tabview/bar/button-forward":{include:gJ,alias:gJ,style:function(bH){if(bH.barTop||bH.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:dR,alias:dR,style:function(ha){if(ha.barTop||ha.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(c){return {decorator:de,minHeight:100,marginBottom:c.barBottom?-1:0,marginTop:c.barTop?-1:0,marginLeft:c.barLeft?-1:0,marginRight:c.barRight?-1:0};
}},"tabview-page":gi,"tabview-page/button":{alias:gj,style:function(bT){var ca,bV=0;
var bY=0,bU=0,bW=0,bX=0;

if(bT.checked){if(bT.barTop){ca=eA;
bV=[6,14];
bW=bT.firstTab?0:-5;
bX=bT.lastTab?0:-5;
}else if(bT.barBottom){ca=dT;
bV=[6,14];
bW=bT.firstTab?0:-5;
bX=bT.lastTab?0:-5;
}else if(bT.barRight){ca=fv;
bV=[6,13];
bY=bT.firstTab?0:-5;
bU=bT.lastTab?0:-5;
}else{ca=ga;
bV=[6,13];
bY=bT.firstTab?0:-5;
bU=bT.lastTab?0:-5;
}}else{if(bT.barTop){ca=eY;
bV=[4,10];
bY=4;
bW=bT.firstTab?5:1;
bX=1;
}else if(bT.barBottom){ca=dv;
bV=[4,10];
bU=4;
bW=bT.firstTab?5:1;
bX=1;
}else if(bT.barRight){ca=fz;
bV=[4,10];
bX=5;
bY=bT.firstTab?5:1;
bU=1;
bW=1;
}else{ca=eX;
bV=[4,10];
bW=5;
bY=bT.firstTab?5:1;
bU=1;
bX=1;
}}return {zIndex:bT.checked?10:5,decorator:ca,padding:bV,marginTop:bY,marginBottom:bU,marginLeft:bW,marginRight:bX,textColor:bT.checked?cJ:dC};
}},"tabview-page/button/close-button":{alias:gj,style:function(br){return {icon:fU};
}},"toolbar":{style:function(bs){return {decorator:cX,spacing:2};
}},"toolbar/part":{style:function(hT){return {decorator:ew,spacing:2};
}},"toolbar/part/container":{style:function(bv){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(hx){return {source:gD,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:gj,style:function(R){return {marginTop:2,marginBottom:2,padding:(R.pressed||R.checked||R.hovered)&&!R.disabled||(R.disabled&&R.checked)?3:5,decorator:R.pressed||(R.checked&&!R.hovered)||(R.checked&&R.disabled)?fe:R.hovered&&!R.disabled?cH:undefined};
}},"toolbar-menubutton":{alias:gr,include:gr,style:function(C){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:ge,include:ge,style:function(bn){return {source:dL};
}},"toolbar-splitbutton":{style:function(F){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:gr,include:gr,style:function(cw){return {icon:eM,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:gr,include:gr,style:function(hz){return {padding:hz.pressed||hz.checked?1:hz.hovered?1:3,icon:eM,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(gV){return {decorator:fc,margin:7};
}},"tree":go,"tree-item":{style:function(cx){return {padding:[2,6],textColor:cx.selected?gf:undefined,decorator:cx.selected?eK:undefined};
}},"tree-item/icon":{include:ge,style:function(bE){return {paddingRight:5};
}},"tree-item/label":fN,"tree-item/open":{include:ge,style:function(x){var y;

if(x.selected&&x.opened){y=fC;
}else if(x.selected&&!x.opened){y=gv;
}else if(x.opened){y=dN;
}else{y=cT;
}return {padding:[0,5,0,2],source:y};
}},"tree-folder":{include:gl,alias:gl,style:function(d){var e;

if(d.small){e=d.opened?dj:cR;
}else if(d.large){e=d.opened?eB:dH;
}else{e=d.opened?fQ:eC;
}return {icon:e};
}},"tree-file":{include:gl,alias:gl,style:function(cs){return {icon:cs.small?dJ:cs.large?cY:gE};
}},"treevirtual":dp,"treevirtual-folder":{style:function(cv){return {icon:cv.opened?dj:cR};
}},"treevirtual-file":{include:dP,alias:dP,style:function(A){return {icon:dJ};
}},"treevirtual-line":{style:function(bS){return {icon:cN};
}},"treevirtual-contract":{style:function(hs){return {icon:dN,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(ia){return {icon:cT,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":gm,"treevirtual-only-expand":fL,"treevirtual-start-contract":gm,"treevirtual-start-expand":fL,"treevirtual-end-contract":gm,"treevirtual-end-expand":fL,"treevirtual-cross-contract":gm,"treevirtual-cross-expand":fL,"treevirtual-end":{style:function(hy){return {icon:cN};
}},"treevirtual-cross":{style:function(hn){return {icon:cN};
}},"tooltip":{include:gq,style:function(hS){return {backgroundColor:eh,padding:[1,3,2,3],offset:[5,5,20,5]};
}},"tooltip/atom":gj,"tooltip-error":{include:gn,style:function(ck){return {textColor:gf,placeMethod:gi,offsetRight:15,position:cK,showTimeout:100,hideTimeout:10000,decorator:dG,shadow:ea,font:gd};
}},"tooltip-error/atom":gj,"window":{style:function(hc){return {shadow:dy,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(bh){return {decorator:dt};
}},"window/captionbar":{style:function(J){return {decorator:J.active?cB:fs,textColor:J.active?gH:eS,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(r){return {margin:[5,0,3,6]};
}},"window/title":{style:function(bd){return {alignY:gc,font:gd,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:gj,style:function(hq){return {icon:hq.active?hq.hovered?eT:fw:fA,margin:[4,8,2,0]};
}},"window/restore-button":{alias:gj,style:function(gX){return {icon:gX.active?gX.hovered?dz:cV:fx,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:gj,style:function(hp){return {icon:hp.active?hp.hovered?dl:eD:fR,margin:[4,8,2,0]};
}},"window/close-button":{alias:gj,style:function(hU){return {icon:hU.active?hU.hovered?fV:en:ev,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(bJ){return {padding:[2,6],decorator:dF,minHeight:18};
}},"window/statusbar-text":{style:function(O){return {font:ds};
}},"iframe":{style:function(W){return {decorator:gh};
}},"resizer":{style:function(gQ){return {decorator:er};
}},"splitpane":{style:function(f){return {decorator:fF};
}},"splitpane/splitter":{style:function(hJ){return {width:hJ.horizontal?3:undefined,height:hJ.vertical?3:undefined,backgroundColor:gO};
}},"splitpane/splitter/knob":{style:function(hr){return {source:hr.horizontal?dI:eQ};
}},"splitpane/slider":{style:function(T){return {width:T.horizontal?3:undefined,height:T.vertical?3:undefined,backgroundColor:gO};
}},"selectbox":{alias:gk,include:gk,style:function(cb){return {padding:[2,8]};
}},"selectbox/atom":gj,"selectbox/popup":gq,"selectbox/list":{alias:go},"selectbox/arrow":{include:ge,style:function(hA){return {source:eM,paddingLeft:5};
}},"datechooser":{style:function(l){var p;
var n=!!l.focused;
var o=!!l.invalid;
var m=!!l.disabled;

if(n&&o&&!m){p=eF;
}else if(n&&!o&&!m){p=gp;
}else if(m){p=eH;
}else if(!n&&o&&!m){p=eJ;
}else{p=eI;
}return {padding:2,decorator:p,backgroundColor:gb};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:gk,alias:gk,style:function(ht){var hu={padding:[2,4],shadow:undefined};

if(ht.lastYear){hu.icon=df;
hu.marginRight=1;
}else if(ht.lastMonth){hu.icon=gG;
}else if(ht.nextYear){hu.icon=cD;
hu.marginLeft=1;
}else if(ht.nextMonth){hu.icon=fM;
}return hu;
}},"datechooser/last-year-button-tooltip":gn,"datechooser/last-month-button-tooltip":gn,"datechooser/next-year-button-tooltip":gn,"datechooser/next-month-button-tooltip":gn,"datechooser/last-year-button":gu,"datechooser/last-month-button":gu,"datechooser/next-month-button":gu,"datechooser/next-year-button":gu,"datechooser/month-year-label":{style:function(cu){return {font:gd,textAlign:fI,textColor:cu.disabled?eO:undefined};
}},"datechooser/date-pane":{style:function(gR){return {textColor:gR.disabled?eO:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(bf){return {textColor:bf.disabled?eO:bf.weekend?gM:undefined,textAlign:fI,paddingTop:2,backgroundColor:dK};
}},"datechooser/week":{style:function(I){return {textAlign:fI,padding:[2,4],backgroundColor:dK};
}},"datechooser/day":{style:function(ho){return {textAlign:fI,decorator:ho.disabled?undefined:ho.selected?eK:undefined,textColor:ho.disabled?eO:ho.selected?gf:ho.otherMonth?gM:undefined,font:ho.today?gd:undefined,padding:[2,4]};
}},"combobox":{style:function(cm){var cq;
var co=!!cm.focused;
var cp=!!cm.invalid;
var cn=!!cm.disabled;

if(co&&cp&&!cn){cq=eF;
}else if(co&&!cp&&!cn){cq=gp;
}else if(cn){cq=eH;
}else if(!co&&cp&&!cn){cq=eJ;
}else{cq=eI;
}return {decorator:cq};
}},"combobox/popup":gq,"combobox/list":{alias:go},"combobox/button":{include:gk,alias:gk,style:function(hd){var he={icon:eM,padding:2};

if(hd.selected){he.decorator=gF;
}return he;
}},"combobox/textfield":{include:fK,style:function(bk){return {decorator:undefined};
}},"menu":{style:function(gS){var gT={decorator:dX,shadow:dQ,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:gS.submenu||gS.contextmenu?gA:ey};

if(gS.submenu){gT.position=cK;
gT.offset=[-2,-3];
}return gT;
}},"menu/slidebar":ff,"menu-slidebar":gi,"menu-slidebar-button":{style:function(D){return {decorator:D.hovered?eK:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:gL,style:function(b){return {icon:b.hovered?fg:dn};
}},"menu-slidebar/button-forward":{include:gL,style:function(bG){return {icon:bG.hovered?fk:eM};
}},"menu-separator":{style:function(ci){return {height:0,decorator:eq,margin:[4,2]};
}},"menu-button":{alias:gj,style:function(hb){return {decorator:hb.selected?eK:undefined,textColor:hb.selected?gf:undefined,padding:[4,6]};
}},"menu-button/icon":{include:ge,style:function(bx){return {alignY:gc};
}},"menu-button/label":{include:fN,style:function(gU){return {alignY:gc,padding:1};
}},"menu-button/shortcut":{include:fN,style:function(z){return {alignY:gc,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:ge,style:function(hV){return {source:hV.selected?es:fM,alignY:gc};
}},"menu-checkbox":{alias:eG,include:eG,style:function(hX){return {icon:!hX.checked?undefined:hX.selected?fo:dd};
}},"menu-radiobutton":{alias:eG,include:eG,style:function(a){return {icon:!a.checked?undefined:a.selected?dE:cE};
}},"menubar":{style:function(bi){return {decorator:fb};
}},"menubar-button":{alias:gj,style:function(hO){return {decorator:hO.pressed||hO.hovered?eK:undefined,textColor:hO.pressed||hO.hovered?gf:undefined,padding:[3,8]};
}},"colorselector":gi,"colorselector/control-bar":gi,"colorselector/control-pane":gi,"colorselector/visual-pane":eN,"colorselector/preset-grid":gi,"colorselector/colorbucket":{style:function(cc){return {decorator:gh,width:16,height:16};
}},"colorselector/preset-field-set":eN,"colorselector/input-field-set":eN,"colorselector/preview-field-set":eN,"colorselector/hex-field-composite":gi,"colorselector/hex-field":fK,"colorselector/rgb-spinner-composite":gi,"colorselector/rgb-spinner-red":gs,"colorselector/rgb-spinner-green":gs,"colorselector/rgb-spinner-blue":gs,"colorselector/hsb-spinner-composite":gi,"colorselector/hsb-spinner-hue":gs,"colorselector/hsb-spinner-saturation":gs,"colorselector/hsb-spinner-brightness":gs,"colorselector/preview-content-old":{style:function(hl){return {decorator:gh,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(bL){return {decorator:gh,backgroundColor:gb,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(hh){return {decorator:gh,margin:5};
}},"colorselector/brightness-field":{style:function(ib){return {decorator:gh,margin:[5,7]};
}},"colorselector/hue-saturation-pane":gi,"colorselector/hue-saturation-handle":gi,"colorselector/brightness-pane":gi,"colorselector/brightness-handle":gi,"colorpopup":{alias:gq,include:gq,style:function(X){return {padding:5,backgroundColor:fP};
}},"colorpopup/field":{style:function(hY){return {decorator:gh,margin:2,width:14,height:14,backgroundColor:gb};
}},"colorpopup/selector-button":gg,"colorpopup/auto-button":gg,"colorpopup/preview-pane":eN,"colorpopup/current-preview":{style:function(bw){return {height:20,padding:4,marginLeft:4,decorator:gh,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(bg){return {height:20,padding:4,marginRight:4,decorator:gh,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:gg,include:gg,style:function(j){return {icon:fm};
}},"colorpopup/colorselector-cancelbutton":{alias:gg,include:gg,style:function(hm){return {icon:fa};
}},"table":{alias:gi,style:function(w){return {decorator:dp};
}},"table-header":{},"table/statusbar":{style:function(hN){return {decorator:fu,padding:[0,2]};
}},"table/column-button":{alias:gk,style:function(g){return {decorator:dx,padding:3,icon:cF};
}},"table-column-reset-button":{include:eG,alias:eG,style:function(){return {icon:eu};
}},"table-scroller":gi,"table-scroller/scrollbar-x":gt,"table-scroller/scrollbar-y":gt,"table-scroller/header":{style:function(bo){return {decorator:ej};
}},"table-scroller/pane":{style:function(gP){return {backgroundColor:em};
}},"table-scroller/focus-indicator":{style:function(gW){return {decorator:eb};
}},"table-scroller/resize-line":{style:function(hR){return {backgroundColor:fY,width:2};
}},"table-header-cell":{alias:gj,style:function(hv){return {minWidth:13,minHeight:20,padding:hv.hovered?[3,4,2,4]:[3,4],decorator:hv.hovered?eP:dW,sortIcon:hv.sorted?(hv.sortedAscending?fh:cC):undefined};
}},"table-header-cell/label":{style:function(cr){return {minWidth:0,alignY:gc,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(bm){return {alignY:gc,alignX:cP};
}},"table-header-cell/icon":{style:function(hf){return {minWidth:0,alignY:gc,paddingRight:5};
}},"table-editor-textfield":{include:fK,style:function(hk){return {decorator:undefined,padding:[2,2],backgroundColor:gb};
}},"table-editor-selectbox":{include:dS,alias:dS,style:function(bK){return {padding:[0,2],backgroundColor:gb};
}},"table-editor-combobox":{include:fG,alias:fG,style:function(K){return {decorator:undefined,backgroundColor:gb};
}},"progressive-table-header":{alias:gi,style:function(be){return {decorator:cG};
}},"progressive-table-header-cell":{alias:gj,style:function(S){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:ep};
}},"app-header":{style:function(bF){return {font:gd,textColor:gf,padding:[8,12],decorator:ed};
}},"virtual-list":go,"virtual-list/row-layer":ee,"row-layer":{style:function(hg){return {colorEven:gH,colorOdd:fq};
}},"column-layer":gi,"cell":{style:function(bj){return {textColor:bj.selected?gf:cS,padding:[3,6],font:dO};
}},"cell-string":eL,"cell-number":{include:eL,style:function(bp){return {textAlign:cP};
}},"cell-image":eL,"cell-boolean":{include:eL,style:function(hB){return {iconTrue:dV,iconFalse:db};
}},"cell-atom":eL,"cell-date":eL,"cell-html":eL}});
})();
(function(){var q="qx.event.type.Event",p="String",o="failed",n="timeout",m="created",l="aborted",k="sending",j="configured",i="receiving",h="completed",c="Object",g="Boolean",f="abstract",b="_applyState",a="GET",e="changeState",d="qx.io.remote.transport.Abstract";
qx.Class.define(d,{type:f,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.setRequestHeaders({});
this.setParameters({});
this.setFormFields({});
},events:{"created":q,"configured":q,"sending":q,"receiving":q,"completed":q,"aborted":q,"failed":q,"timeout":q},properties:{url:{check:p,nullable:true},method:{check:p,nullable:true,init:a},asynchronous:{check:g,nullable:true,init:true},data:{check:p,nullable:true},username:{check:p,nullable:true},password:{check:p,nullable:true},state:{check:[m,j,k,i,h,l,n,o],init:m,event:e,apply:b},requestHeaders:{check:c,nullable:true},parameters:{check:c,nullable:true},formFields:{check:c,nullable:true},responseType:{check:p,nullable:true},useBasicHttpAuth:{check:g,nullable:true}},members:{send:function(){throw new Error("send is abstract");
},abort:function(){{};
this.setState(l);
},timeout:function(){{};
this.setState(n);
},failed:function(){{};
this.setState(o);
},setRequestHeader:function(u,v){throw new Error("setRequestHeader is abstract");
},getResponseHeader:function(t){throw new Error("getResponseHeader is abstract");
},getResponseHeaders:function(){throw new Error("getResponseHeaders is abstract");
},getStatusCode:function(){throw new Error("getStatusCode is abstract");
},getStatusText:function(){throw new Error("getStatusText is abstract");
},getResponseText:function(){throw new Error("getResponseText is abstract");
},getResponseXml:function(){throw new Error("getResponseXml is abstract");
},getFetchedLength:function(){throw new Error("getFetchedLength is abstract");
},_applyState:function(r,s){{};

switch(r){case m:this.fireEvent(m);
break;
case j:this.fireEvent(j);
break;
case k:this.fireEvent(k);
break;
case i:this.fireEvent(i);
break;
case h:this.fireEvent(h);
break;
case l:this.fireEvent(l);
break;
case o:this.fireEvent(o);
break;
case n:this.fireEvent(n);
break;
}return true;
}}});
})();
(function(){var a="qx.ui.core.IMultiSelection";
qx.Interface.define(a,{extend:qx.ui.core.ISingleSelection,members:{selectAll:function(){return true;
},addToSelection:function(b){return arguments.length==1;
},removeFromSelection:function(c){return arguments.length==1;
}}});
})();
(function(){var d="",c="qx.util.StringBuilder";
qx.Class.define(c,{extend:qx.type.BaseArray,members:{clear:function(){this.length=0;
},get:function(){return this.join(d);
},add:null,isEmpty:function(){return this.length===0;
},size:function(){return this.join(d).length;
}},defer:function(a,b){b.add=b.push;
b.toString=b.get;
b.valueOf=b.get;
}});
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
(function(){var m="container",k="handle",j="both",h="Integer",g="middle",f="qx.ui.toolbar.Part",e="icon",d="label",c="changeShow",b="_applySpacing",a="toolbar/part";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling],construct:function(){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.HBox);
this._createChildControl(k);
},properties:{appearance:{refine:true,init:a},show:{init:j,check:[j,d,e],inheritable:true,event:c},spacing:{nullable:true,check:h,themeable:true,apply:b}},members:{_createChildControlImpl:function(n){var o;

switch(n){case k:o=new qx.ui.basic.Image();
o.setAlignY(g);
this._add(o);
break;
case m:o=new qx.ui.toolbar.PartContainer;
this._add(o);
break;
}return o||arguments.callee.base.call(this,n);
},getChildrenContainer:function(){return this.getChildControl(m);
},_applySpacing:function(s,t){var u=this.getChildControl(m).getLayout();
s==null?u.resetSpacing():u.setSpacing(s);
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var q=this.getChildren();
var p=[];
var r;

for(var i=0,l=q.length;i<l;i++){r=q[i];

if(r instanceof qx.ui.menubar.Button){p.push(r);
}}return p;
}}});
})();
(function(){var b="qx.nativeScrollBars",a="qx.ui.core.scroll.MScrollBarFactory";
qx.core.Setting.define(b,false);
qx.Mixin.define(a,{members:{_createScrollBar:function(c){if(qx.core.Setting.get(b)){return new qx.ui.core.scroll.NativeScrollBar(c);
}else{return new qx.ui.core.scroll.ScrollBar(c);
}}}});
})();
(function(){var X="scrollbar-y",W="scrollbar-x",V="pane",U="auto",T="corner",S="on",R="changeVisibility",Q="scroll",P="_computeScrollbars",O="off",H="scrollY",N="qx.ui.core.scroll.AbstractScrollArea",K="abstract",F="update",E="scrollX",J="mousewheel",I="scrollbarY",L="scrollbarX",D="horizontal",M="scrollarea",G="vertical";
qx.Class.define(N,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,type:K,construct:function(){arguments.callee.base.call(this);
var a=new qx.ui.layout.Grid();
a.setColumnFlex(0,1);
a.setRowFlex(0,1);
this._setLayout(a);
this.addListener(J,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:M},width:{refine:true,init:100},height:{refine:true,init:200},scrollbarX:{check:[U,S,O],init:U,themeable:true,apply:P},scrollbarY:{check:[U,S,O],init:U,themeable:true,apply:P},scrollbar:{group:[L,I]}},members:{_createChildControlImpl:function(x){var y;

switch(x){case V:y=new qx.ui.core.scroll.ScrollPane();
y.addListener(F,this._computeScrollbars,this);
y.addListener(E,this._onScrollPaneX,this);
y.addListener(H,this._onScrollPaneY,this);
this._add(y,{row:0,column:0});
break;
case W:y=this._createScrollBar(D);
y.setMinWidth(0);
y.exclude();
y.addListener(Q,this._onScrollBarX,this);
y.addListener(R,this._onChangeScrollbarXVisibility,this);
this._add(y,{row:1,column:0});
break;
case X:y=this._createScrollBar(G);
y.setMinHeight(0);
y.exclude();
y.addListener(Q,this._onScrollBarY,this);
y.addListener(R,this._onChangeScrollbarYVisibility,this);
this._add(y,{row:0,column:1});
break;
case T:y=new qx.ui.core.Widget();
y.setWidth(0);
y.setHeight(0);
y.exclude();
this._add(y,{row:1,column:1});
break;
}return y||arguments.callee.base.call(this,x);
},getPaneSize:function(){return this.getChildControl(V).getInnerSize();
},getItemTop:function(w){return this.getChildControl(V).getItemTop(w);
},getItemBottom:function(v){return this.getChildControl(V).getItemBottom(v);
},getItemLeft:function(u){return this.getChildControl(V).getItemLeft(u);
},getItemRight:function(bb){return this.getChildControl(V).getItemRight(bb);
},scrollToX:function(b){qx.ui.core.queue.Manager.flush();
this.getChildControl(W).scrollTo(b);
},scrollByX:function(c){qx.ui.core.queue.Manager.flush();
this.getChildControl(W).scrollBy(c);
},getScrollX:function(){var s=this.getChildControl(W,true);
return s?s.getPosition():0;
},scrollToY:function(t){qx.ui.core.queue.Manager.flush();
this.getChildControl(X).scrollTo(t);
},scrollByY:function(C){qx.ui.core.queue.Manager.flush();
this.getChildControl(X).scrollBy(C);
},getScrollY:function(){var B=this.getChildControl(X,true);
return B?B.getPosition():0;
},_onScrollBarX:function(e){this.getChildControl(V).scrollToX(e.getData());
},_onScrollBarY:function(e){this.getChildControl(V).scrollToY(e.getData());
},_onScrollPaneX:function(e){this.scrollToX(e.getData());
},_onScrollPaneY:function(e){this.scrollToY(e.getData());
},_onMouseWheel:function(e){var q=this._isChildControlVisible(W);
var r=this._isChildControlVisible(X);
var p=(r)?this.getChildControl(X,true):(q?this.getChildControl(W,true):null);

if(p){p.scrollBySteps(e.getWheelDelta());
}e.stop();
},_onChangeScrollbarXVisibility:function(e){var Y=this._isChildControlVisible(W);
var ba=this._isChildControlVisible(X);

if(!Y){this.scrollToX(0);
}Y&&ba?this._showChildControl(T):this._excludeChildControl(T);
},_onChangeScrollbarYVisibility:function(e){var z=this._isChildControlVisible(W);
var A=this._isChildControlVisible(X);

if(!A){this.scrollToY(0);
}z&&A?this._showChildControl(T):this._excludeChildControl(T);
},_computeScrollbars:function(){var k=this.getChildControl(V);
var content=k.getChildren()[0];

if(!content){this._excludeChildControl(W);
this._excludeChildControl(X);
return;
}var d=this.getInnerSize();
var j=k.getInnerSize();
var h=k.getScrollSize();
if(!j||!h){return;
}var m=this.getScrollbarX();
var n=this.getScrollbarY();

if(m===U&&n===U){var i=h.width>d.width;
var o=h.height>d.height;
if((i||o)&&!(i&&o)){if(i){o=h.height>j.height;
}else if(o){i=h.width>j.width;
}}}else{var i=m===S;
var o=n===S;
if(h.width>(i?j.width:d.width)&&m===U){i=true;
}
if(h.height>(i?j.height:d.height)&&n===U){o=true;
}}if(i){var g=this.getChildControl(W);
g.show();
var l=Math.max(0,h.width-j.width-1);
g.setMaximum(l);
g.setKnobFactor(l>0?j.width/h.width:0);
}else{this._excludeChildControl(W);
}
if(o){var f=this.getChildControl(X);
f.show();
var l=Math.max(0,h.height-j.height-1);
f.setMaximum(l);
f.setKnobFactor(l>0?j.height/h.height:0);
}else{this._excludeChildControl(X);
}}}});
})();
(function(){var I="one",H="single",G="selected",F="additive",E="multi",D="PageUp",C="under",B="Left",A="lead",z="Down",bl="Up",bk="Boolean",bj="PageDown",bi="anchor",bh="End",bg="Home",bf="Right",be="right",bd="click",bc="above",P="left",Q="Escape",N="__dP",O="__dO",L="A",M="Space",J="_applyMode",K="interval",R="changeSelection",S="qx.event.type.Data",V="quick",U="__dx",X="key",W="__dQ",ba="__dA",Y="abstract",T="drag",bb="qx.ui.core.selection.Abstract";
qx.Class.define(bb,{type:Y,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__dx={};
},events:{"changeSelection":S},properties:{mode:{check:[H,E,F,I],init:H,apply:J},drag:{check:bk,init:false},quick:{check:bk,init:false}},members:{__dy:0,__dz:0,__dA:null,__dB:null,__dC:null,__dD:null,__dE:null,__dF:null,__dG:null,__dH:null,__dI:null,__dJ:null,__dK:null,__dL:null,__dM:null,__dN:null,__dO:null,__dx:null,__dP:null,__dQ:null,getSelectionContext:function(){return this.__dN;
},selectAll:function(){var cc=this.getMode();

if(cc==H||cc==I){throw new Error("Can not select all items in selection mode: "+cc);
}this._selectAllItems();
this._fireChange();
},selectItem:function(u){this._setSelectedItem(u);
var v=this.getMode();

if(v!==H&&v!==I){this._setLeadItem(u);
this._setAnchorItem(u);
}this._scrollItemIntoView(u);
this._fireChange();
},addItem:function(ca){var cb=this.getMode();

if(cb===H||cb===I){this._setSelectedItem(ca);
}else{if(!this._getAnchorItem()){this._setAnchorItem(ca);
}this._setLeadItem(ca);
this._addToSelection(ca);
}this._scrollItemIntoView(ca);
this._fireChange();
},removeItem:function(cJ){this._removeFromSelection(cJ);

if(this.getMode()===I&&this.isSelectionEmpty()){var cK=this._getFirstSelectable();

if(cK){this.addItem(cK);
}if(cK==cJ){return;
}}
if(this._getLeadItem()==cJ){this._setLeadItem(null);
}
if(this._getAnchorItem()==cJ){this._setAnchorItem(null);
}this._fireChange();
},selectItemRange:function(cm,cn){var co=this.getMode();

if(co==H||co==I){throw new Error("Can not select multiple items in selection mode: "+co);
}this._selectItemRange(cm,cn);
this._setAnchorItem(cm);
this._setLeadItem(cn);
this._scrollItemIntoView(cn);
this._fireChange();
},clearSelection:function(){if(this.getMode()==I){return;
}this._clearSelection();
this._setLeadItem(null);
this._setAnchorItem(null);
this._fireChange();
},replaceSelection:function(cu){var cv=this.getMode();

if(cv==I||cv===H){if(cu.length>1){throw new Error("Could not select more than one items in mode: "+cv+"!");
}
if(cu.length==1){this.selectItem(cu[0]);
}else{this.clearSelection();
}return;
}else{this._replaceMultiSelection(cu);
}},getSelectedItem:function(){var cN=this.getMode();

if(cN===H||cN===I){return this._getSelectedItem()||null;
}throw new Error("The method getSelectedItem() is only supported in 'single' and 'one' selection mode!");
},getSelection:function(){return qx.lang.Object.getValues(this.__dx);
},getSortedSelection:function(){var bF=this.getSelectables();
var bE=qx.lang.Object.getValues(this.__dx);
bE.sort(function(a,b){return bF.indexOf(a)-bF.indexOf(b);
});
return bE;
},isItemSelected:function(w){var x=this._selectableToHashCode(w);
return this.__dx[x]!==undefined;
},isSelectionEmpty:function(){return qx.lang.Object.isEmpty(this.__dx);
},invertSelection:function(){var bv=this.getMode();

if(bv===H||bv===I){throw new Error("The method invertSelection() is only supported in 'multi' and 'additive' selection mode!");
}var bu=this.getSelectables();

for(var i=0;i<bu.length;i++){this._toggleInSelection(bu[i]);
}this._fireChange();
},_setLeadItem:function(cs){var ct=this.__dO;

if(ct!==null){this._styleSelectable(ct,A,false);
}
if(cs!==null){this._styleSelectable(cs,A,true);
}this.__dO=cs;
},_getLeadItem:function(){return this.__dO!==null?this.__dO:null;
},_setAnchorItem:function(bz){var bA=this.__dP;

if(bA){this._styleSelectable(bA,bi,false);
}
if(bz){this._styleSelectable(bz,bi,true);
}this.__dP=bz;
},_getAnchorItem:function(){return this.__dP!==null?this.__dP:null;
},_isSelectable:function(cH){throw new Error("Abstract method call: _isSelectable()");
},_getSelectableFromMouseEvent:function(event){var bB=event.getTarget();
return this._isSelectable(bB)?bB:null;
},_selectableToHashCode:function(cO){throw new Error("Abstract method call: _selectableToHashCode()");
},_styleSelectable:function(bW,bX,bY){throw new Error("Abstract method call: _styleSelectable()");
},_capture:function(){throw new Error("Abstract method call: _capture()");
},_releaseCapture:function(){throw new Error("Abstract method call: _releaseCapture()");
},_getLocation:function(){throw new Error("Abstract method call: _getLocation()");
},_getDimension:function(){throw new Error("Abstract method call: _getDimension()");
},_getSelectableLocationX:function(cQ){throw new Error("Abstract method call: _getSelectableLocationX()");
},_getSelectableLocationY:function(cP){throw new Error("Abstract method call: _getSelectableLocationY()");
},_getScroll:function(){throw new Error("Abstract method call: _getScroll()");
},_scrollBy:function(bC,bD){throw new Error("Abstract method call: _scrollBy()");
},_scrollItemIntoView:function(bw){throw new Error("Abstract method call: _scrollItemIntoView()");
},getSelectables:function(){throw new Error("Abstract method call: getSelectables()");
},_getSelectableRange:function(bU,bV){throw new Error("Abstract method call: _getSelectableRange()");
},_getFirstSelectable:function(){throw new Error("Abstract method call: _getFirstSelectable()");
},_getLastSelectable:function(){throw new Error("Abstract method call: _getLastSelectable()");
},_getRelatedSelectable:function(cL,cM){throw new Error("Abstract method call: _getRelatedSelectable()");
},_getPage:function(bp,bq){throw new Error("Abstract method call: _getPage()");
},_applyMode:function(bm,bn){this._setLeadItem(null);
this._setAnchorItem(null);
this._clearSelection();
if(bm===I){var bo=this._getFirstSelectable();

if(bo){this._setSelectedItem(bo);
this._scrollItemIntoView(bo);
}}this._fireChange();
},handleMouseOver:function(event){if(!this.getQuick()){return;
}var cG=this.getMode();

if(cG!==I&&cG!==H){return;
}var cF=this._getSelectableFromMouseEvent(event);

if(cF===null){return;
}this._setSelectedItem(cF);
this._fireChange(V);
},handleMouseDown:function(event){var cX=this._getSelectableFromMouseEvent(event);

if(cX===null){return;
}var da=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var cW=event.isShiftPressed();
if(this.isItemSelected(cX)&&!cW&&!da&&!this.getDrag()){this.__dQ=cX;
return;
}else{this.__dQ=null;
}this._scrollItemIntoView(cX);
switch(this.getMode()){case H:case I:this._setSelectedItem(cX);
break;
case F:this._setLeadItem(cX);
this._setAnchorItem(cX);
this._toggleInSelection(cX);
break;
case E:this._setLeadItem(cX);
if(cW){var cY=this._getAnchorItem();

if(cY===null){cY=this._getFirstSelectable();
this._setAnchorItem(cY);
}this._selectItemRange(cY,cX,da);
}else if(da){this._setAnchorItem(cX);
this._toggleInSelection(cX);
}else{this._setAnchorItem(cX);
this._setSelectedItem(cX);
}break;
}var db=this.getMode();

if(this.getDrag()&&db!==H&&db!==I&&!cW&&!da){this.__dE=this._getLocation();
this.__dB=this._getScroll();
this.__dF=event.getDocumentLeft()+this.__dB.left;
this.__dG=event.getDocumentTop()+this.__dB.top;
this.__dH=true;
this._capture();
}this._fireChange(bd);
},handleMouseUp:function(event){var bQ=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bN=event.isShiftPressed();

if(!bQ&&!bN&&this.__dQ){var bO=this._getSelectableFromMouseEvent(event);

if(bO===null||!this.isItemSelected(bO)){return;
}var bP=this.getMode();

if(bP===F){this._removeFromSelection(bO);
}else{this._setSelectedItem(bO);

if(this.getMode()===E){this._setLeadItem(bO);
this._setAnchorItem(bO);
}}}this._cleanup();
},handleLoseCapture:function(event){this._cleanup();
},handleMouseMove:function(event){if(!this.__dH){return;
}this.__dI=event.getDocumentLeft();
this.__dJ=event.getDocumentTop();
var cV=this.__dI+this.__dB.left;

if(cV>this.__dF){this.__dK=1;
}else if(cV<this.__dF){this.__dK=-1;
}else{this.__dK=0;
}var cU=this.__dJ+this.__dB.top;

if(cU>this.__dG){this.__dL=1;
}else if(cU<this.__dG){this.__dL=-1;
}else{this.__dL=0;
}var location=this.__dE;

if(this.__dI<location.left){this.__dy=this.__dI-location.left;
}else if(this.__dI>location.right){this.__dy=this.__dI-location.right;
}else{this.__dy=0;
}
if(this.__dJ<location.top){this.__dz=this.__dJ-location.top;
}else if(this.__dJ>location.bottom){this.__dz=this.__dJ-location.bottom;
}else{this.__dz=0;
}if(!this.__dA){this.__dA=new qx.event.Timer(100);
this.__dA.addListener(K,this._onInterval,this);
}this.__dA.start();
this._autoSelect();
},handleAddItem:function(e){var c=e.getData();

if(this.getMode()===I&&this.isSelectionEmpty()){this.addItem(c);
}},handleRemoveItem:function(e){this.removeItem(e.getData());
},_cleanup:function(){if(!this.getDrag()&&this.__dH){return;
}if(this.__dM){this._fireChange(bd);
}delete this.__dH;
delete this.__dC;
delete this.__dD;
this._releaseCapture();
if(this.__dA){this.__dA.stop();
}},_onInterval:function(e){this._scrollBy(this.__dy,this.__dz);
this.__dB=this._getScroll();
this._autoSelect();
},_autoSelect:function(){var o=this._getDimension();
var f=Math.max(0,Math.min(this.__dI-this.__dE.left,o.width))+this.__dB.left;
var d=Math.max(0,Math.min(this.__dJ-this.__dE.top,o.height))+this.__dB.top;
if(this.__dC===f&&this.__dD===d){return;
}this.__dC=f;
this.__dD=d;
var q=this._getAnchorItem();
var h=q;
var m=this.__dK;
var p,g;

while(m!==0){p=m>0?this._getRelatedSelectable(h,be):this._getRelatedSelectable(h,P);
if(p!==null){g=this._getSelectableLocationX(p);
if((m>0&&g.left<=f)||(m<0&&g.right>=f)){h=p;
continue;
}}break;
}var n=this.__dL;
var k,j;

while(n!==0){k=n>0?this._getRelatedSelectable(h,C):this._getRelatedSelectable(h,bc);
if(k!==null){j=this._getSelectableLocationY(k);
if((n>0&&j.top<=d)||(n<0&&j.bottom>=d)){h=k;
continue;
}}break;
}var r=this.getMode();

if(r===E){this._selectItemRange(q,h);
}else if(r===F){if(this.isItemSelected(q)){this._selectItemRange(q,h,true);
}else{this._deselectItemRange(q,h);
}this._setAnchorItem(h);
}this._fireChange(T);
},__dR:{Home:1,Down:1,Right:1,PageDown:1,End:1,Up:1,Left:1,PageUp:1},handleKeyPress:function(event){var cB,cA;
var cD=event.getKeyIdentifier();
var cC=this.getMode();
var cx=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var cy=event.isShiftPressed();
var cz=false;

if(cD===L&&cx){if(cC!==H&&cC!==I){this._selectAllItems();
cz=true;
}}else if(cD===Q){if(cC!==H&&cC!==I){this._clearSelection();
cz=true;
}}else if(cD===M){var cw=this._getLeadItem();

if(cw&&!cy){if(cx||cC===F){this._toggleInSelection(cw);
}else{this._setSelectedItem(cw);
}cz=true;
}}else if(this.__dR[cD]){cz=true;

if(cC===H||cC==I){cB=this._getSelectedItem();
}else{cB=this._getLeadItem();
}
if(cB!==null){switch(cD){case bg:cA=this._getFirstSelectable();
break;
case bh:cA=this._getLastSelectable();
break;
case bl:cA=this._getRelatedSelectable(cB,bc);
break;
case z:cA=this._getRelatedSelectable(cB,C);
break;
case B:cA=this._getRelatedSelectable(cB,P);
break;
case bf:cA=this._getRelatedSelectable(cB,be);
break;
case D:cA=this._getPage(cB,true);
break;
case bj:cA=this._getPage(cB,false);
break;
}}else{switch(cD){case bg:case z:case bf:case bj:cA=this._getFirstSelectable();
break;
case bh:case bl:case B:case D:cA=this._getLastSelectable();
break;
}}if(cA!==null){switch(cC){case H:case I:this._setSelectedItem(cA);
break;
case F:this._setLeadItem(cA);
break;
case E:if(cy){var cE=this._getAnchorItem();

if(cE===null){this._setAnchorItem(cE=this._getFirstSelectable());
}this._setLeadItem(cA);
this._selectItemRange(cE,cA,cx);
}else{this._setAnchorItem(cA);
this._setLeadItem(cA);

if(!cx){this._setSelectedItem(cA);
}}break;
}this._scrollItemIntoView(cA);
}}
if(cz){event.stop();
this._fireChange(X);
}},_selectAllItems:function(){var cI=this.getSelectables();

for(var i=0,l=cI.length;i<l;i++){this._addToSelection(cI[i]);
}},_clearSelection:function(){var bS=this.__dx;

for(var bT in bS){this._removeFromSelection(bS[bT]);
}this.__dx={};
},_selectItemRange:function(bG,bH,bI){var bL=this._getSelectableRange(bG,bH);
if(!bI){var bK=this.__dx;
var bM=this.__dS(bL);

for(var bJ in bK){if(!bM[bJ]){this._removeFromSelection(bK[bJ]);
}}}for(var i=0,l=bL.length;i<l;i++){this._addToSelection(bL[i]);
}},_deselectItemRange:function(cp,cq){var cr=this._getSelectableRange(cp,cq);

for(var i=0,l=cr.length;i<l;i++){this._removeFromSelection(cr[i]);
}},__dS:function(cR){var cT={};
var cS;

for(var i=0,l=cR.length;i<l;i++){cS=cR[i];
cT[this._selectableToHashCode(cS)]=cS;
}return cT;
},_getSelectedItem:function(){for(var y in this.__dx){return this.__dx[y];
}return null;
},_setSelectedItem:function(br){if(this._isSelectable(br)){var bs=this.__dx;
var bt=this._selectableToHashCode(br);

if(!bs[bt]||qx.lang.Object.hasMinLength(bs,2)){this._clearSelection();
this._addToSelection(br);
}}},_addToSelection:function(ck){var cl=this._selectableToHashCode(ck);

if(!this.__dx[cl]&&this._isSelectable(ck)){this.__dx[cl]=ck;
this._styleSelectable(ck,G,true);
this.__dM=true;
}},_toggleInSelection:function(bx){var by=this._selectableToHashCode(bx);

if(!this.__dx[by]){this.__dx[by]=bx;
this._styleSelectable(bx,G,true);
}else{delete this.__dx[by];
this._styleSelectable(bx,G,false);
}this.__dM=true;
},_removeFromSelection:function(s){var t=this._selectableToHashCode(s);

if(this.__dx[t]!=null){delete this.__dx[t];
this._styleSelectable(s,G,false);
this.__dM=true;
}},_replaceMultiSelection:function(cd){var cg=false;
var cj,ci;
var ce={};

for(var i=0,l=cd.length;i<l;i++){cj=cd[i];

if(this._isSelectable(cj)){ci=this._selectableToHashCode(cj);
ce[ci]=cj;
}}var cf=cj;
var ch=this.__dx;

for(var ci in ch){if(ce[ci]){delete ce[ci];
}else{cj=ch[ci];
delete ch[ci];
this._styleSelectable(cj,G,false);
cg=true;
}}for(var ci in ce){cj=ch[ci]=ce[ci];
this._styleSelectable(cj,G,true);
cg=true;
}if(!cg){return false;
}this._scrollItemIntoView(cf);
this._setLeadItem(null);
this._setAnchorItem(null);
this.__dM=true;
this._fireChange();
},_fireChange:function(bR){if(this.__dM){this.__dN=bR||null;
this.fireDataEvent(R,this.getSelection());
delete this.__dM;
}}},destruct:function(){this._disposeObjects(ba);
this._disposeFields(U,W,N,O);
}});
})();
(function(){var j="vertical",h="under",g="__co",f="above",e="qx.ui.core.selection.Widget",d="left",c="right";
qx.Class.define(e,{extend:qx.ui.core.selection.Abstract,construct:function(o){arguments.callee.base.call(this);
this.__co=o;
},members:{__co:null,_isSelectable:function(H){return H.isEnabled()&&H.isVisible()&&H.getLayoutParent()===this.__co;
},_selectableToHashCode:function(a){return a.$$hash;
},_styleSelectable:function(p,q,r){r?p.addState(q):p.removeState(q);
},_capture:function(){this.__co.capture();
},_releaseCapture:function(){this.__co.releaseCapture();
},_getWidget:function(){return this.__co;
},_getLocation:function(){var k=this.__co.getContentElement().getDomElement();
return k?qx.bom.element.Location.get(k):null;
},_getDimension:function(){return this.__co.getInnerSize();
},_getSelectableLocationX:function(M){var N=M.getBounds();

if(N){return {left:N.left,right:N.left+N.width};
}},_getSelectableLocationY:function(z){var A=z.getBounds();

if(A){return {top:A.top,bottom:A.top+A.height};
}},_getScroll:function(){return {left:0,top:0};
},_scrollBy:function(O,P){},_scrollItemIntoView:function(I){this.__co.scrollChildIntoView(I);
},getSelectables:function(){var K=this.__co.getChildren();
var L=[];
var J;

for(var i=0,l=K.length;i<l;i++){J=K[i];

if(J.isEnabled()&&J.isVisible()){L.push(J);
}}return L;
},_getSelectableRange:function(t,u){if(t===u){return [t];
}var y=this.__co.getChildren();
var v=[];
var x=false;
var w;

for(var i=0,l=y.length;i<l;i++){w=y[i];

if(w===t||w===u){if(x){v.push(w);
break;
}else{x=true;
}}
if(x&&w.isEnabled()&&w.isVisible()){v.push(w);
}}return v;
},_getFirstSelectable:function(){var b=this.__co.getChildren();

for(var i=0,l=b.length;i<l;i++){if(b[i].isEnabled()&&b[i].isVisible()){return b[i];
}}return null;
},_getLastSelectable:function(){var s=this.__co.getChildren();

for(var i=s.length-1;i>0;i--){if(s[i].isEnabled()&&s[i].isVisible()){return s[i];
}}return null;
},_getRelatedSelectable:function(B,C){var F=this.__co.getOrientation()===j;
var E=this.__co.getChildren();
var D=E.indexOf(B);
var G;

if((F&&C===f)||(!F&&C===d)){for(var i=D-1;i>=0;i--){G=E[i];

if(G.isEnabled()&&G.isVisible()){return G;
}}}else if((F&&C===h)||(!F&&C===c)){for(var i=D+1;i<E.length;i++){G=E[i];

if(G.isEnabled()&&G.isVisible()){return G;
}}}return null;
},_getPage:function(m,n){if(n){return this._getFirstSelectable();
}else{return this._getLastSelectable();
}}},destruct:function(){this._disposeFields(g);
}});
})();
(function(){var d="qx.ui.core.selection.ScrollArea";
qx.Class.define(d,{extend:qx.ui.core.selection.Widget,members:{_isSelectable:function(e){return (e.isEnabled()&&e.isVisible()&&e.getLayoutParent()===this._getWidget().getChildrenContainer());
},_getDimension:function(){return this._getWidget().getPaneSize();
},_getScroll:function(){var f=this._getWidget();
return {left:f.getScrollX(),top:f.getScrollY()};
},_scrollBy:function(a,b){var c=this._getWidget();
c.scrollByX(a);
c.scrollByY(b);
},_getPage:function(g,h){var m=this.getSelectables();
var length=m.length;
var p=m.indexOf(g);
if(p===-1){throw new Error("Invalid lead item: "+g);
}var j=this._getWidget();
var r=j.getScrollY();
var innerHeight=j.getInnerSize().height;
var top,l,q;

if(h){var o=r;
var i=p;
while(1){for(;i>=0;i--){top=j.getItemTop(m[i]);
if(top<o){q=i+1;
break;
}}if(q==null){var s=this._getFirstSelectable();
return s==g?null:s;
}if(q>=p){o-=innerHeight+r-j.getItemBottom(g);
q=null;
continue;
}return m[q];
}}else{var n=innerHeight+r;
var i=p;
while(1){for(;i<length;i++){l=j.getItemBottom(m[i]);
if(l>n){q=i-1;
break;
}}if(q==null){var k=this._getLastSelectable();
return k==g?null:k;
}if(q<=p){n+=j.getItemTop(g)-r;
q=null;
continue;
}return m[q];
}}}}});
})();
(function(){var t="horizontal",s="changeValue",r="qx.event.type.Data",q="vertical",p="",o="qx.ui.form.List",n="Enter",m="one",k="addChildWidget",j="_applySpacing",H="Boolean",G="Integer",F="action",E="keyinput",D="changeSelection",C="addItem",B="removeChildWidget",A="_applyOrientation",z="single",y="keypress",w="list",x="pane",u="removeItem",v="__ch";
qx.Class.define(o,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MMultiSelectionHandling,qx.ui.form.MForm,qx.ui.form.MModelSelection],construct:function(I){arguments.callee.base.call(this);
this.__ch=new qx.ui.container.Composite();
this.__ch.addListener(k,this._onAddChild,this);
this.__ch.addListener(B,this._onRemoveChild,this);
this.getChildControl(x).add(this.__ch);
if(I){this.setOrientation(t);
}else{this.initOrientation();
}this.addListener(y,this._onKeyPress);
this.addListener(E,this._onKeyInput);
this.addListener(D,this._onChangeSelection);
this.__ci=p;
},events:{addItem:r,removeItem:r},properties:{appearance:{refine:true,init:w},focusable:{refine:true,init:true},orientation:{check:[t,q],init:q,apply:A},spacing:{check:G,init:0,apply:j,themeable:true},enableInlineFind:{check:H,init:true}},members:{__ci:null,__cj:null,__ch:null,SELECTION_MANAGER:qx.ui.core.selection.ScrollArea,getChildrenContainer:function(){return this.__ch;
},_onAddChild:function(e){this.fireDataEvent(C,e.getData());
},_onRemoveChild:function(e){this.fireDataEvent(u,e.getData());
},handleKeyPress:function(e){if(!this._onKeyPress(e)){this._getManager().handleKeyPress(e);
}},_applyOrientation:function(J,K){var L=J===t;
var M=L?new qx.ui.layout.HBox():new qx.ui.layout.VBox();
var content=this.__ch;
content.setLayout(M);
content.setAllowGrowX(!L);
content.setAllowGrowY(L);
this._applySpacing(this.getSpacing());
},_applySpacing:function(g,h){this.__ch.getLayout().setSpacing(g);
},_onKeyPress:function(e){if(e.getKeyIdentifier()==n&&!e.isAltPressed()){var Q=this.getSelection();

for(var i=0;i<Q.length;i++){Q[i].fireEvent(F);
}return true;
}return false;
},_onChangeSelection:function(){if(this.hasListener(s)){this.fireDataEvent(s,this.getValue());
}},_onKeyInput:function(e){if(!this.getEnableInlineFind()){return;
}var a=this.getSelectionMode();

if(!(a===z||a===m)){return;
}if(((new Date).valueOf()-this.__cj)>1000){this.__ci=p;
}this.__ci+=e.getChar();
var b=this.findItemByLabelFuzzy(this.__ci);
if(b){this.setSelection([b]);
}this.__cj=(new Date).valueOf();
},findItemByLabelFuzzy:function(N){N=N.toLowerCase();
var O=this.getChildren();
for(var i=0,l=O.length;i<l;i++){var P=O[i].getLabel();
if(P&&P.toLowerCase().indexOf(N)==0){return O[i];
}}return null;
},findItem:function(c){c=c.toLowerCase();
var d=this.getChildren();
var f;
for(var i=0,l=d.length;i<l;i++){f=d[i];

if((f.getLabel()!=null)&&(f.getLabel().toLowerCase()==c)){return f;
}}return null;
}},destruct:function(){this._disposeObjects(v);
}});
})();
(function(){var n="String",m="",l="new",k="stateModified",j="changeArticles",i="feedreader.model.Article",h="qx.data.Array",g="loaded",f="loading",e="dataModified",b="changeUrl",d="feedreader.model.Feed",c="changeTitle",a="error";
qx.Class.define(d,{extend:qx.core.Object,construct:function(o,p,q){arguments.callee.base.call(this);
this.set({url:p,title:o,category:q||m});
this.setArticles(new qx.data.Array());
},properties:{articles:{check:h,event:j},selectedArticle:{check:i,nullable:true},url:{check:n,event:b},title:{check:n,event:c},category:{check:n,init:m,event:e},state:{check:[l,f,g,a],init:l,event:k}}});
})();
(function(){var Y="open",X="auto",W="middle",V="icon",U="label",T="changeOpen",S="excluded",R="visible",Q="String",P="opened",bs="always",br="qx.ui.tree.AbstractTreeItem",bq="addItem",bp="Boolean",bo="Integer",bn="_applyIndent",bm="changeOpenSymbolMode",bl="_applyOpenSymbolMode",bk="__eh",bj="resize",bg="",bh="removeItem",be="__ek",bf="abstract",bc="never",bd="_applyIcon",ba="__eg",bb="_applyOpen",bi="_applyLabel";
qx.Class.define(br,{extend:qx.ui.core.Widget,type:bf,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel],construct:function(){arguments.callee.base.call(this);
this.__eg=[];
this._setLayout(new qx.ui.layout.HBox());
this._addWidgets();
this.initOpen();
},properties:{open:{check:bp,init:false,event:T,apply:bb},openSymbolMode:{check:[bs,bc,X],init:X,event:bm,apply:bl},indent:{check:bo,init:19,apply:bn,themeable:true},parent:{check:br,nullable:true},icon:{check:Q,apply:bd,nullable:true,themeable:true},label:{check:Q,apply:bi,init:bg,dispose:true}},members:{__eg:null,__eh:null,__ei:null,__ej:null,__ek:null,_addWidgets:function(){throw new Error("Abstract method call.");
},_createChildControlImpl:function(D){var E;

switch(D){case U:E=new qx.ui.basic.Label().set({alignY:W,value:this.getLabel()});
break;
case V:E=new qx.ui.basic.Image().set({alignY:W,source:this.getIcon()});
break;
case Y:E=new qx.ui.tree.FolderOpenButton().set({alignY:W});
E.addListener(T,this._onChangeOpen,this);
E.addListener(bj,this._updateIndent,this);
break;
}return E||arguments.callee.base.call(this,D);
},getTree:function(){var bP=this;

while(bP.getParent()){bP=bP.getParent();
}var bO=bP.getLayoutParent()?bP.getLayoutParent().getLayoutParent():0;

if(bO&&bO instanceof qx.ui.core.scroll.ScrollPane){return bO.getLayoutParent();
}return null;
},addWidget:function(bM,bN){this._add(bM,bN);
},addSpacer:function(){if(!this.__ek){this.__ek=new qx.ui.core.Spacer();
}else{this._remove(this.__ek);
}this._add(this.__ek);
},addOpenButton:function(){this._add(this.getChildControl(Y));
},_onChangeOpen:function(e){if(this.isOpenable()){this.setOpen(e.getData());
}},addIcon:function(){var o=this.getChildControl(V);

if(this.__ej){this._remove(o);
}this._add(o);
this.__ej=true;
},addLabel:function(bI){var bJ=this.getChildControl(U);

if(this.__ei){this._remove(bJ);
}
if(bI){this.setLabel(bI);
}else{bJ.setValue(this.getLabel());
}this._add(bJ);
this.__ei=true;
},addState:function(p){arguments.callee.base.call(this,p);
var r=this._getChildren();

for(var i=0,l=r.length;i<l;i++){var q=r[i];

if(q.addState){r[i].addState(p);
}}},removeState:function(y){arguments.callee.base.call(this,y);
var A=this._getChildren();

for(var i=0,l=A.length;i<l;i++){var z=A[i];

if(z.addState){A[i].removeState(y);
}}},_applyIcon:function(bt,bu){var bv=this.getChildControl(V,true);

if(bv){bv.setSource(bt);
}},_applyLabel:function(bF,bG){var bH=this.getChildControl(U,true);

if(bH){bH.setValue(bF);
}},_applyOpen:function(s,t){if(this.hasChildren()){this.getChildrenContainer().setVisibility(s?R:S);
}var open=this.getChildControl(Y,true);

if(open){open.setOpen(s);
}s?this.addState(P):this.removeState(P);
},isOpenable:function(){var B=this.getOpenSymbolMode();
return (B===bs||B===X&&this.hasChildren());
},_shouldShowOpenSymbol:function(){var open=this.getChildControl(Y,true);

if(!open){return false;
}var C=this.getTree();

if(!C.getRootOpenClose()){if(C.getHideRoot()){if(C.getRoot()==this.getParent()){return false;
}}else{if(C.getRoot()==this){return false;
}}}return this.isOpenable();
},_applyOpenSymbolMode:function(L,M){this._updateIndent();
},_updateIndent:function(){if(!this.getTree()){return;
}var b=0;
var open=this.getChildControl(Y,true);

if(open){if(this._shouldShowOpenSymbol()){open.show();
var a=open.getBounds();

if(a){b=a.width;
}else{return;
}}else{open.exclude();
}}
if(this.__ek){this.__ek.setWidth((this.getLevel()+1)*this.getIndent()-b);
}},_applyIndent:function(bK,bL){this._updateIndent();
},getLevel:function(){var bR=this.getTree();

if(!bR){return;
}var bS=this;
var bT=-1;

while(bS){bS=bS.getParent();
bT+=1;
}if(bR.getHideRoot()){bT-=1;
}
if(!bR.getRootOpenClose()){bT-=1;
}return bT;
},syncWidget:function(){this._updateIndent();
},getChildrenContainer:function(){if(!this.__eh){this.__eh=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({visibility:this.isOpen()?R:S});
}return this.__eh;
},getParentChildrenContainer:function(){if(this.getParent()){return this.getParent().getChildrenContainer();
}else if(this.getLayoutParent()){return this.getLayoutParent();
}else{return null;
}},getChildren:function(){return this.__eg;
},hasChildren:function(){return this.__eg?this.__eg.length>0:false;
},getItems:function(c,d,f){if(f!==false){var g=[];
}else{var g=[this];
}var k=this.hasChildren()&&(d!==false||this.isOpen());

if(k){var j=this.getChildren();

if(c===false){g=g.concat(j);
}else{for(var i=0,h=j.length;i<h;i++){g=g.concat(j[i].getItems(c,d,false));
}}}return g;
},recursiveAddToWidgetQueue:function(){var bE=this.getItems(true,true,false);

for(var i=0,l=bE.length;i<l;i++){qx.ui.core.queue.Widget.add(bE[i]);
}},__el:function(){if(this.getParentChildrenContainer()){this.getParentChildrenContainer()._addAfter(this.getChildrenContainer(),this);
}},add:function(F){var G=this.getChildrenContainer();
var J=this.getTree();

for(var i=0,l=arguments.length;i<l;i++){var K=arguments[i];
var I=K.getParent();

if(I){I.remove(K);
}K.setParent(this);
var H=this.hasChildren();
G.add(K);

if(K.hasChildren()){G.add(K.getChildrenContainer());
}this.__eg.push(K);

if(!H){this.__el();
}
if(J){K.recursiveAddToWidgetQueue();
J.fireNonBubblingEvent(bq,qx.event.type.Data,[K]);
}}
if(J){qx.ui.core.queue.Widget.add(this);
}},addAt:function(by,bz){{};

if(bz==this.__eg.length){this.add(by);
return;
}var bD=by.getParent();

if(bD){bD.remove(by);
}var bB=this.getChildrenContainer();
by.setParent(this);
var bC=this.hasChildren();
var bA=this.__eg[bz];
bB.addBefore(by,bA);

if(by.hasChildren()){bB.addAfter(by.getChildrenContainer(),by);
}qx.lang.Array.insertAt(this.__eg,by,bz);

if(!bC){this.__el();
}
if(this.getTree()){by.recursiveAddToWidgetQueue();
qx.ui.core.queue.Widget.add(this);
}},addBefore:function(m,n){{};
this.addAt(m,this.__eg.indexOf(n));
},addAfter:function(bw,bx){{};
this.addAt(bw,this.__eg.indexOf(bx)+1);
},addAtBegin:function(bQ){this.addAt(bQ,0);
},remove:function(u){for(var i=0,l=arguments.length;i<l;i++){var x=arguments[i];

if(this.__eg.indexOf(x)==-1){this.warn("Cannot remove treeitem '"+x+"'. It is not a child of this tree item.");
return;
}var w=this.getChildrenContainer();

if(x.hasChildren()){w.remove(x.getChildrenContainer());
}qx.lang.Array.remove(this.__eg,x);
x.setParent(null);
w.remove(x);
}var v=this.getTree();

if(v){v.fireNonBubblingEvent(bh,qx.event.type.Data,[x]);
}qx.ui.core.queue.Widget.add(this);
},removeAt:function(N){var O=this.__eg[N];

if(O){this.remove(O);
}},removeAll:function(){for(var i=this.__eg.length-1;i>=0;i--){this.remove(this.__eg[i]);
}}},destruct:function(){this._disposeArray(ba);
this._disposeObjects(be,bk);
}});
})();
(function(){var b="tree-folder",a="qx.ui.tree.TreeFolder";
qx.Class.define(a,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){arguments.callee.base.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:b}},members:{_addWidgets:function(){this.addSpacer();
this.addOpenButton();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var r="pressed",q="abandoned",p="Integer",o="hovered",n="qx.event.type.Event",m="Enter",l="Space",k="press",j="qx.ui.form.RepeatButton",i="release",f="__ck",h="interval",g="execute";
qx.Class.define(j,{extend:qx.ui.form.Button,construct:function(c,d){arguments.callee.base.call(this,c,d);
this.__ck=new qx.event.AcceleratingTimer();
this.__ck.addListener(h,this._onInterval,this);
},events:{"execute":n,"press":n,"release":n},properties:{interval:{check:p,init:100},firstInterval:{check:p,init:500},minTimer:{check:p,init:20},timerDecrease:{check:p,init:2}},members:{__cl:null,__ck:null,press:function(){if(this.isEnabled()){if(!this.hasState(r)){this.__cm();
}this.removeState(q);
this.addState(r);
}},release:function(s){if(!this.isEnabled()){return;
}if(this.hasState(r)){if(!this.__cl){this.execute();
}}this.removeState(r);
this.removeState(q);
this.__cn();
},_applyEnabled:function(a,b){arguments.callee.base.call(this,a,b);

if(!a){this.removeState(r);
this.removeState(q);
this.__cn();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(q)){this.removeState(q);
this.addState(r);
this.__ck.start();
}this.addState(o);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(o);

if(this.hasState(r)){this.removeState(r);
this.addState(q);
this.__ck.stop();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__cm();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(q)){this.addState(o);

if(this.hasState(r)&&!this.__cl){this.execute();
}}this.__cn();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case m:case l:if(this.hasState(r)){if(!this.__cl){this.execute();
}this.removeState(r);
this.removeState(q);
e.stopPropagation();
this.__cn();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case m:case l:this.removeState(q);
this.addState(r);
e.stopPropagation();
this.__cm();
}},_onInterval:function(e){this.__cl=true;
this.fireEvent(g);
},__cm:function(){this.fireEvent(k);
this.__cl=false;
this.__ck.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.removeState(q);
this.addState(r);
},__cn:function(){this.fireEvent(i);
this.__ck.stop();
this.removeState(q);
this.removeState(r);
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var i="Number",h="_applyInsets",g="abstract",f="insetRight",e="insetTop",d="insetBottom",c="qx.ui.decoration.Abstract",b="shorthand",a="insetLeft";
qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:g,properties:{insetLeft:{check:i,nullable:true,apply:h},insetRight:{check:i,nullable:true,apply:h},insetBottom:{check:i,nullable:true,apply:h},insetTop:{check:i,nullable:true,apply:h},insets:{group:[e,f,d,a],mode:b}},members:{__bD:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__bD=null;
},getInsets:function(){if(this.__bD){return this.__bD;
}var j=this._getDefaultInsets();
return this.__bD={left:this.getInsetLeft()==null?j.left:this.getInsetLeft(),right:this.getInsetRight()==null?j.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?j.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?j.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__bD=null;
}}});
})();
(function(){var c="middle",b="qx.ui.menu.ButtonLayout",a="left";
qx.Class.define(b,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(d,e){var q=this._getLayoutChildren();
var p;
var g;
var h=[];

for(var i=0,l=q.length;i<l;i++){p=q[i];
g=p.getLayoutProperties().column;
h[g]=p;
}var o=this.__cp(q[0]);
var r=o.getColumnSizes();
var k=o.getSpacingX();
var j=qx.lang.Array.sum(r)+k*(r.length-1);

if(j<d){r[1]+=d-j;
}var s=0,top=0;
var m=qx.ui.layout.Util;

for(var i=0,l=r.length;i<l;i++){p=h[i];

if(p){var f=p.getSizeHint();
var top=m.computeVerticalAlignOffset(p.getAlignY()||c,f.height,e,0,0);
var n=m.computeHorizontalAlignOffset(p.getAlignX()||a,f.width,r[i],p.getMarginLeft(),p.getMarginRight());
p.renderLayout(s+n,top,f.width,f.height);
}s+=r[i]+k;
}},__cp:function(x){while(!(x instanceof qx.ui.menu.Menu)){x=x.getLayoutParent();
}return x;
},_computeSizeHint:function(){var v=this._getLayoutChildren();
var u=0;
var w=0;

for(var i=0,l=v.length;i<l;i++){var t=v[i].getSizeHint();
w+=t.width;
u=Math.max(u,t.height);
}return {width:w,height:u};
}}});
})();
(function(){var l="slider",k="horizontal",j="button-begin",i="vertical",h="button-end",g="Integer",f="execute",d="right",c="left",b="down",A="up",z="PositiveNumber",y="changeValue",x="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",w="_applyKnobFactor",v="knob",u="qx.ui.core.scroll.ScrollBar",t="resize",s="_applyOrientation",r="_applyPageStep",p="PositiveInteger",q="scroll",n="_applyPosition",o="scrollbar",m="_applyMaximum";
qx.Class.define(u,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(a){arguments.callee.base.call(this);
this._createChildControl(j);
this._createChildControl(l).addListener(t,this._onResizeSlider,this);
this._createChildControl(h);
if(a!=null){this.setOrientation(a);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:o},orientation:{check:[k,i],init:k,apply:s},maximum:{check:p,apply:m,init:100},position:{check:x,init:0,apply:n,event:q},singleStep:{check:g,init:20},pageStep:{check:g,init:10,apply:r},knobFactor:{check:z,apply:w,nullable:true}},members:{__cq:2,_createChildControlImpl:function(I){var J;

switch(I){case l:J=new qx.ui.core.scroll.ScrollSlider();
J.setPageStep(100);
J.setFocusable(false);
J.addListener(y,this._onChangeSliderValue,this);
this._add(J,{flex:1});
break;
case j:J=new qx.ui.form.RepeatButton();
J.setFocusable(false);
J.addListener(f,this._onExecuteBegin,this);
this._add(J);
break;
case h:J=new qx.ui.form.RepeatButton();
J.setFocusable(false);
J.addListener(f,this._onExecuteEnd,this);
this._add(J);
break;
}return J||arguments.callee.base.call(this,I);
},_applyMaximum:function(R){this.getChildControl(l).setMaximum(R);
},_applyPosition:function(K){this.getChildControl(l).setValue(K);
},_applyKnobFactor:function(M){this.getChildControl(l).setKnobFactor(M);
},_applyPageStep:function(B){this.getChildControl(l).setPageStep(B);
},_applyOrientation:function(N,O){var P=this._getLayout();

if(P){P.dispose();
}if(N===k){this._setLayout(new qx.ui.layout.HBox());
this.setAllowStretchX(true);
this.setAllowStretchY(false);
this.replaceState(i,k);
this.getChildControl(j).replaceState(A,c);
this.getChildControl(h).replaceState(b,d);
}else{this._setLayout(new qx.ui.layout.VBox());
this.setAllowStretchX(false);
this.setAllowStretchY(true);
this.replaceState(k,i);
this.getChildControl(j).replaceState(c,A);
this.getChildControl(h).replaceState(d,b);
}this.getChildControl(l).setOrientation(N);
},scrollTo:function(Q){this.getChildControl(l).slideTo(Q);
},scrollBy:function(L){this.getChildControl(l).slideBy(L);
},scrollBySteps:function(G){var H=this.getSingleStep();
this.getChildControl(l).slideBy(G*H);
},_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep());
},_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep());
},_onChangeSliderValue:function(e){this.setPosition(e.getData());
},_onResizeSlider:function(e){var C=this.getChildControl(l).getChildControl(v);
var F=C.getSizeHint();
var D=false;
var E=this.getChildControl(l).getInnerSize();

if(this.getOrientation()==i){if(E.height<F.minHeight+this.__cq){D=true;
}}else{if(E.width<F.minWidth+this.__cq){D=true;
}}
if(D){C.exclude();
}else{C.show();
}}}});
})();
(function(){var o="pressed",n="hovered",m="changeVisibility",l="qx.ui.menu.Menu",k="submenu",j="Enter",i="contextmenu",h="changeMenu",g="qx.ui.form.MenuButton",f="abandoned",d="_applyMenu";
qx.Class.define(g,{extend:qx.ui.form.Button,construct:function(q,r,s){arguments.callee.base.call(this,q,r);
if(s!=null){this.setMenu(s);
}},properties:{menu:{check:l,nullable:true,apply:d,event:h}},members:{_applyMenu:function(v,w){if(w){w.removeListener(m,this._onMenuChange,this);
w.resetOpener();
}
if(v){v.addListener(m,this._onMenuChange,this);
v.setOpener(this);
v.removeState(k);
v.removeState(i);
}},open:function(a){var b=this.getMenu();

if(b){qx.ui.menu.Manager.getInstance().hideAll();
b.setOpener(this);
b.open();
if(a){var c=b.getSelectables()[0];

if(c){b.setSelectedButton(c);
}}}},_onMenuChange:function(e){var u=this.getMenu();

if(u.isVisible()){this.addState(o);
}else{this.removeState(o);
}},_onMouseDown:function(e){var p=this.getMenu();

if(p){if(!p.isVisible()){this.open();
}else{p.exclude();
}e.stopPropagation();
}},_onMouseUp:function(e){arguments.callee.base.call(this,e);
e.stopPropagation();
},_onMouseOver:function(e){this.addState(n);
},_onMouseOut:function(e){this.removeState(n);
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case j:this.removeState(f);
this.addState(o);
var t=this.getMenu();

if(t){if(!t.isVisible()){this.open();
}else{t.exclude();
}}e.stopPropagation();
}},_onKeyUp:function(e){}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}}});
})();
(function(){var h="pressed",g="hovered",f="inherit",d="qx.ui.menubar.Button",c="keydown",b="menubar-button",a="keyup";
qx.Class.define(d,{extend:qx.ui.form.MenuButton,construct:function(j,k,l){arguments.callee.base.call(this,j,k,l);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:b},show:{refine:true,init:f},focusable:{refine:true,init:false}},members:{getMenuBar:function(){var parent=this;

while(parent){if(parent instanceof qx.ui.toolbar.ToolBar){return parent;
}parent=parent.getLayoutParent();
}return null;
},open:function(n){arguments.callee.base.call(this,n);
var menubar=this.getMenuBar();
menubar._setAllowMenuOpenHover(true);
},_onMenuChange:function(e){var i=this.getMenu();
var menubar=this.getMenuBar();

if(i.isVisible()){this.addState(h);
if(menubar){menubar.setOpenMenu(i);
}}else{this.removeState(h);
if(menubar&&menubar.getOpenMenu()==i){menubar.resetOpenMenu();
menubar._setAllowMenuOpenHover(false);
}}},_onMouseUp:function(e){arguments.callee.base.call(this,e);
var m=this.getMenu();

if(m&&m.isVisible()&&!this.hasState(h)){this.addState(h);
}},_onMouseOver:function(e){this.addState(g);
if(this.getMenu()){var menubar=this.getMenuBar();

if(menubar._isAllowMenuOpenHover()){qx.ui.menu.Manager.getInstance().hideAll();
menubar._setAllowMenuOpenHover(true);
if(this.isEnabled()){this.open();
}}}}}});
})();
(function(){var i="px",h="position:absolute;top:0;left:0",g="qx.ui.decoration.Background",f="",e="__insets",d="__bF",c="_applyStyle",b="Color";
qx.Class.define(g,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(a){arguments.callee.base.call(this);

if(a!=null){this.setBackgroundColor(a);
}},properties:{backgroundColor:{check:b,nullable:true,apply:c}},members:{__bF:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bF;
},getMarkup:function(){if(this.__bF){return this.__bF;
}var p=this._generateBackgroundMarkup(h);
return this.__bF=p;
},resize:function(m,n,o){m.style.width=n+i;
m.style.height=o+i;
},tint:function(j,k){var l=qx.theme.manager.Color.getInstance();

if(k==null){k=this.getBackgroundColor();
}j.style.backgroundColor=l.resolve(k)||f;
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(d,e);
}});
})();
(function(){var k="qx.ui.window.Window",j="changeModal",i="changeVisibility",h="changeActive",g="_applyActiveWindow",f="__ih",d="__ig",c="qx.ui.window.MDesktop";
qx.Mixin.define(c,{properties:{activeWindow:{check:k,apply:g,init:null,nullable:true}},members:{__ig:null,__ih:null,getWindowManager:function(){if(!this.__ih){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__ih;
},supportsMaximize:function(){return true;
},setWindowManager:function(l){if(this.__ih){this.__ih.setDesktop(null);
}l.setDesktop(this);
this.__ih=l;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(m,n){this.getWindowManager().changeActiveWindow(m,n);

if(m){m.setActive(true);
}
if(n){n.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(p){if(qx.Class.isDefined(k)&&p instanceof qx.ui.window.Window){this._addWindow(p);
}},_addWindow:function(a){if(!qx.lang.Array.contains(this.getWindows(),a)){this.getWindows().push(a);
a.addListener(h,this._onChangeActive,this);
a.addListener(j,this._onChangeModal,this);
a.addListener(i,this._onChangeVisibility,this);
}
if(a.getActive()){this.setActiveWindow(a);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(o){if(qx.Class.isDefined(k)&&o instanceof qx.ui.window.Window){this._removeWindow(o);
}},_removeWindow:function(b){qx.lang.Array.remove(this.getWindows(),b);
b.removeListener(h,this._onChangeActive,this);
b.removeListener(j,this._onChangeModal,this);
b.removeListener(i,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__ig){this.__ig=[];
}return this.__ig;
}},destruct:function(){this._disposeArray(d);
this._disposeObjects(f);
}});
})();
(function(){var c="listitem",b="qx.ui.form.ListItem",a="qx.event.type.Event";
qx.Class.define(b,{extend:qx.ui.basic.Atom,implement:[qx.ui.form.IModel],include:[qx.ui.form.MModelProperty],construct:function(d,e,f){arguments.callee.base.call(this,d,e);

if(f!=null){this.setModel(f);
}},events:{"action":a},properties:{appearance:{refine:true,init:c}}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var s="success",r="head",q="complete",p="loaded",o="__cv",n="readystatechange",m="__cr",l="error",k="load",j="__cs",d="script",i="fail",h="qx.io2.ScriptLoader",c="qx.client",b="text/javascript",g="__cu",f="abort";
qx.Class.define(h,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__cr=qx.lang.Function.bind(this.__cx,this);
this.__cs=document.createElement(d);
},members:{__ct:null,__cu:null,__cv:null,__cr:null,__cs:null,load:function(u,v,w){if(this.__ct){throw new Error("Another request is still running!");
}this.__ct=true;
var x=document.getElementsByTagName(r)[0];
var y=this.__cs;
this.__cu=v||null;
this.__cv=w||window;
y.type=b;
y.onerror=y.onload=y.onreadystatechange=this.__cr;
y.src=u;
x.appendChild(y);
},abort:function(){if(this.__ct){this.__cw(f);
}},__cw:function(status){var a=this.__cs;
a.onerror=a.onload=a.onreadystatechange=null;
document.getElementsByTagName(r)[0].removeChild(a);
delete this.__ct;
this.__cu.call(this.__cv,status);
},__cx:qx.event.GlobalError.observeMethod(qx.core.Variant.select(c,{"mshtml":function(e){var t=this.__cs.readyState;

if(t==p){this.__cw(s);
}else if(t==q){this.__cw(s);
}else{return;
}},"default":function(e){if(qx.lang.Type.isString(e)||e.type===l){this.__cw(i);
}else if(e.type===k){this.__cw(s);
}else if(e.type===n&&(e.target.readyState===q||e.target.readyState===p)){this.__cw(s);
}else{return;
}}}))},destruct:function(){this._disposeFields(j,m,g,o);
}});
})();
(function(){var M="failed",L="sending",K="completed",J="receiving",I="aborted",H="timeout",G="qx.io.remote.Response",F="Connection dropped",E="configured",D="qx.event.type.Event",bI="Proxy authentication required",bH="qx.io.remote.transport.Abstract",bG="MSHTML-specific HTTP status code",bF="Not available",bE="Precondition failed",bD="Server error",bC="Moved temporarily",bB="qx.io.remote.Exchange",bA="Bad gateway",bz="Gone",T="See other",U="Partial content",R="Server timeout",S="qx.io.remote.transport.Script",P="HTTP version not supported",Q="Unauthorized",N="Multiple choices",O="Payment required",X="Not implemented",Y="Request-URL too large",bh="Length required",bf="_applyState",bp="changeState",bk="Not modified",bv="qx.io.remote.Request",bt="Connection closed by server",bb="Moved permanently",by="_applyImplementation",bx="Method not allowed",bw="Forbidden",ba="Use proxy",bd="Ok",be="Not found",bg="Not acceptable",bi="Request time-out",bl="Bad request",bq="Conflict",bu="No content",V="qx.io.remote.transport.XmlHttp",W="qx.io.remote.transport.Iframe",bc="Request entity too large",bo="Unknown status code",bn="Unsupported media type",bm="Gateway time-out",bs="created",br="Out of resources",bj="undefined";
qx.Class.define(bB,{extend:qx.core.Object,construct:function(B){arguments.callee.base.call(this);
this.setRequest(B);
B.setTransport(this);
},events:{"sending":D,"receiving":D,"completed":G,"aborted":G,"failed":G,"timeout":G},statics:{typesOrder:[V,W,S],typesReady:false,typesAvailable:{},typesSupported:{},registerType:function(n,o){qx.io.remote.Exchange.typesAvailable[o]=n;
},initTypes:function(){if(qx.io.remote.Exchange.typesReady){return;
}
for(var q in qx.io.remote.Exchange.typesAvailable){var p=qx.io.remote.Exchange.typesAvailable[q];

if(p.isSupported()){qx.io.remote.Exchange.typesSupported[q]=p;
}}qx.io.remote.Exchange.typesReady=true;

if(qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)){throw new Error("No supported transport types were found!");
}},canHandle:function(h,j,k){if(!qx.lang.Array.contains(h.handles.responseTypes,k)){return false;
}
for(var m in j){if(!h.handles[m]){return false;
}}return true;
},_nativeMap:{0:bs,1:E,2:L,3:J,4:K},wasSuccessful:function(a,b,c){if(c){switch(a){case null:case 0:return true;
case -1:return b<4;
default:return typeof a===bj;
}}else{switch(a){case -1:{};
return b<4;
case 200:case 304:return true;
case 201:case 202:case 203:case 204:case 205:return true;
case 206:{};
return b!==4;
case 300:case 301:case 302:case 303:case 305:case 400:case 401:case 402:case 403:case 404:case 405:case 406:case 407:case 408:case 409:case 410:case 411:case 412:case 413:case 414:case 415:case 500:case 501:case 502:case 503:case 504:case 505:{};
return false;
case 12002:case 12007:case 12029:case 12030:case 12031:case 12152:case 13030:{};
return false;
default:if(a>206&&a<300){return true;
}qx.log.Logger.debug(this,"Unknown status code: "+a+" ("+b+")");
return false;
}}},statusCodeToString:function(A){switch(A){case -1:return bF;
case 200:return bd;
case 304:return bk;
case 206:return U;
case 204:return bu;
case 300:return N;
case 301:return bb;
case 302:return bC;
case 303:return T;
case 305:return ba;
case 400:return bl;
case 401:return Q;
case 402:return O;
case 403:return bw;
case 404:return be;
case 405:return bx;
case 406:return bg;
case 407:return bI;
case 408:return bi;
case 409:return bq;
case 410:return bz;
case 411:return bh;
case 412:return bE;
case 413:return bc;
case 414:return Y;
case 415:return bn;
case 500:return bD;
case 501:return X;
case 502:return bA;
case 503:return br;
case 504:return bm;
case 505:return P;
case 12002:return R;
case 12029:return F;
case 12030:return F;
case 12031:return F;
case 12152:return bt;
case 13030:return bG;
default:return bo;
}}},properties:{request:{check:bv,nullable:true},implementation:{check:bH,nullable:true,apply:by},state:{check:[E,L,J,K,I,H,M],init:E,event:bp,apply:bf}},members:{send:function(){var v=this.getRequest();

if(!v){return this.error("Please attach a request object first");
}qx.io.remote.Exchange.initTypes();
var t=qx.io.remote.Exchange.typesOrder;
var s=qx.io.remote.Exchange.typesSupported;
var x=v.getResponseType();
var y={};

if(v.getAsynchronous()){y.asynchronous=true;
}else{y.synchronous=true;
}
if(v.getCrossDomain()){y.crossDomain=true;
}
if(v.getFileUpload()){y.fileUpload=true;
}for(var w in v.getFormFields()){y.programaticFormFields=true;
break;
}var z,u;

for(var i=0,l=t.length;i<l;i++){z=s[t[i]];

if(z){if(!qx.io.remote.Exchange.canHandle(z,y,x)){continue;
}
try{{};
u=new z;
this.setImplementation(u);
u.setUseBasicHttpAuth(v.getUseBasicHttpAuth());
u.send();
return true;
}catch(bK){this.error("Request handler throws error");
this.error(bK);
return;
}}}this.error("There is no transport implementation available to handle this request: "+v);
},abort:function(){var bQ=this.getImplementation();

if(bQ){{};
bQ.abort();
}else{{};
this.setState(I);
}},timeout:function(){var r=this.getImplementation();

if(r){this.warn("Timeout: implementation "+r.toHashCode());
r.timeout();
}else{this.warn("Timeout: forcing state to timeout");
this.setState(H);
}this.__eW();
},__eW:function(){var bJ=this.getRequest();

if(bJ){bJ.setTimeout(0);
}},_onsending:function(e){this.setState(L);
},_onreceiving:function(e){this.setState(J);
},_oncompleted:function(e){this.setState(K);
},_onabort:function(e){this.setState(I);
},_onfailed:function(e){this.setState(M);
},_ontimeout:function(e){this.setState(H);
},_applyImplementation:function(d,f){if(f){f.removeListener(L,this._onsending,this);
f.removeListener(J,this._onreceiving,this);
f.removeListener(K,this._oncompleted,this);
f.removeListener(I,this._onabort,this);
f.removeListener(H,this._ontimeout,this);
f.removeListener(M,this._onfailed,this);
}
if(d){var g=this.getRequest();
d.setUrl(g.getUrl());
d.setMethod(g.getMethod());
d.setAsynchronous(g.getAsynchronous());
d.setUsername(g.getUsername());
d.setPassword(g.getPassword());
d.setParameters(g.getParameters());
d.setFormFields(g.getFormFields());
d.setRequestHeaders(g.getRequestHeaders());
d.setData(g.getData());
d.setResponseType(g.getResponseType());
d.addListener(L,this._onsending,this);
d.addListener(J,this._onreceiving,this);
d.addListener(K,this._oncompleted,this);
d.addListener(I,this._onabort,this);
d.addListener(H,this._ontimeout,this);
d.addListener(M,this._onfailed,this);
}},_applyState:function(bL,bM){{};

switch(bL){case L:this.fireEvent(L);
break;
case J:this.fireEvent(J);
break;
case K:case I:case H:case M:var bO=this.getImplementation();

if(!bO){break;
}this.__eW();

if(this.hasListener(bL)){var bP=qx.event.Registration.createEvent(bL,qx.io.remote.Response);

if(bL==K){var bN=bO.getResponseContent();
bP.setContent(bN);
if(bN===null){{};
bL=M;
}}else if(bL==M){bP.setContent(bO.getResponseContent());
}bP.setStatusCode(bO.getStatusCode());
bP.setResponseHeaders(bO.getResponseHeaders());
this.dispatchEvent(bP);
}this.setImplementation(null);
bO.dispose();
break;
}}},settings:{"qx.ioRemoteDebug":false,"qx.ioRemoteDebugData":false},destruct:function(){var C=this.getImplementation();

if(C){this.setImplementation(null);
C.dispose();
}this.setRequest(null);
}});
})();
(function(){var m="=",l="&",k="application/xml",j="application/json",h="text/html",g="qx.client",f="textarea",d="none",c="text/plain",b="text/javascript",I="",H="completed",G="?",F="qx.io.remote.transport.Iframe",E="gecko",D="frame_",C="aborted",B="_data_",A="__cz",z="pre",t="javascript:void(0)",u="sending",r="__cy",s="form",p="failed",q='<iframe name="',n="mshtml",o="form_",v='"></iframe>',w="iframe",y="timeout",x="qx/static/blank.gif";
qx.Class.define(F,{extend:qx.io.remote.transport.Abstract,construct:function(){arguments.callee.base.call(this);
var X=(new Date).valueOf();
var Y=D+X;
var ba=o+X;
if(qx.core.Variant.isSet(g,n)){this.__cy=document.createElement(q+Y+v);
}else{this.__cy=document.createElement(w);
}this.__cy.src=t;
this.__cy.id=this.__cy.name=Y;
this.__cy.onload=qx.lang.Function.bind(this._onload,this);
this.__cy.style.display=d;
document.body.appendChild(this.__cy);
this.__cz=document.createElement(s);
this.__cz.target=Y;
this.__cz.id=this.__cz.name=ba;
this.__cz.style.display=d;
document.body.appendChild(this.__cz);
this.__cA=document.createElement(f);
this.__cA.id=this.__cA.name=B;
this.__cz.appendChild(this.__cA);
this.__cy.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
},statics:{handles:{synchronous:false,asynchronous:true,crossDomain:false,fileUpload:true,programaticFormFields:true,responseTypes:[c,b,j,k,h]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4}},members:{__cA:null,__cB:0,__cz:null,__cy:null,send:function(){var K=this.getMethod();
var M=this.getUrl();
var Q=this.getParameters(false);
var P=[];

for(var L in Q){var N=Q[L];

if(N instanceof Array){for(var i=0;i<N.length;i++){P.push(encodeURIComponent(L)+m+encodeURIComponent(N[i]));
}}else{P.push(encodeURIComponent(L)+m+encodeURIComponent(N));
}}
if(P.length>0){M+=(M.indexOf(G)>=0?l:G)+P.join(l);
}if(this.getData()===null){var Q=this.getParameters(true);
var P=[];

for(var L in Q){var N=Q[L];

if(N instanceof Array){for(var i=0;i<N.length;i++){P.push(encodeURIComponent(L)+m+encodeURIComponent(N[i]));
}}else{P.push(encodeURIComponent(L)+m+encodeURIComponent(N));
}}
if(P.length>0){this.setData(P.join(l));
}}var J=this.getFormFields();

for(var L in J){var O=document.createElement(f);
O.name=L;
O.appendChild(document.createTextNode(J[L]));
this.__cz.appendChild(O);
}this.__cz.action=M;
this.__cz.method=K;
this.__cA.appendChild(document.createTextNode(this.getData()));
this.__cz.submit();
this.setState(u);
},_onload:qx.event.GlobalError.observeMethod(function(e){if(this.__cz.src){return;
}this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
}),_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__cy.readyState]);
}),_switchReadyState:function(W){switch(this.getState()){case H:case C:case p:case y:this.warn("Ignore Ready State Change");
return;
}while(this.__cB<W){this.setState(qx.io.remote.Exchange._nativeMap[++this.__cB]);
}},setRequestHeader:function(U,V){},getResponseHeader:function(R){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return I;
},getIframeWindow:function(){return qx.bom.Iframe.getWindow(this.__cy);
},getIframeDocument:function(){return qx.bom.Iframe.getDocument(this.__cy);
},getIframeBody:function(){return qx.bom.Iframe.getBody(this.__cy);
},getIframeTextContent:function(){var a=this.getIframeBody();

if(!a){return null;
}
if(!a.firstChild){return I;
}if(a.firstChild.tagName&&a.firstChild.tagName.toLowerCase()==z){return a.firstChild.innerHTML;
}else{return a.innerHTML;
}},getIframeHtmlContent:function(){var T=this.getIframeBody();
return T?T.innerHTML:null;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==H){{};
return null;
}{};
var S=this.getIframeTextContent();

switch(this.getResponseType()){case c:{};
return S;
break;
case h:S=this.getIframeHtmlContent();
{};
return S;
break;
case j:S=this.getIframeHtmlContent();
{};

try{return S&&S.length>0?qx.util.Json.parse(S,false):null;
}catch(bb){return this.error("Could not execute json: ("+S+")",bb);
}case b:S=this.getIframeHtmlContent();
{};

try{return S&&S.length>0?window.eval(S):null;
}catch(bc){return this.error("Could not execute javascript: ("+S+")",bc);
}case k:S=this.getIframeDocument();
{};
return S;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(bd,be,bf){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe,F);
},destruct:function(){if(this.__cy){this.__cy.onload=null;
this.__cy.onreadystatechange=null;
if(qx.core.Variant.isSet(g,E)){this.__cy.src=qx.util.ResourceManager.getInstance().toUri(x);
}document.body.removeChild(this.__cy);
}
if(this.__cz){document.body.removeChild(this.__cz);
}this._disposeFields(r,A);
}});
})();
(function(){var bb="keypress",ba="interval",Y="keydown",X="mousedown",W="keyup",V="__cD",U="blur",T="Enter",S="__cE",R="Up",L="Escape",Q="qx.ui.menu.Manager",O="Left",K="Down",J="Right",N="__cC",M="singleton",P="Space";
qx.Class.define(Q,{type:M,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__cC=[];
var b=qx.core.Init.getApplication().getRoot();
var a=document.body;
var c=qx.event.Registration;
b.addListener(X,this._onMouseDown,this,true);
c.addListener(a,Y,this._onKeyUpDown,this,true);
c.addListener(a,W,this._onKeyUpDown,this,true);
c.addListener(a,bb,this._onKeyPress,this,true);
qx.bom.Element.addListener(window,U,this.hideAll,this);
this.__cD=new qx.event.Timer;
this.__cD.addListener(ba,this._onOpenInterval,this);
this.__cE=new qx.event.Timer;
this.__cE.addListener(ba,this._onCloseInterval,this);
},members:{__cF:null,__cG:null,__cD:null,__cE:null,__cC:null,_getChild:function(bv,bw,bx,by){var bz=bv.getChildren();
var length=bz.length;
var bA;

for(var i=bw;i<length&&i>=0;i+=bx){bA=bz[i];

if(bA.isEnabled()&&!bA.isAnonymous()){return bA;
}}
if(by){i=i==length?0:length-1;

for(;i!=bw;i+=bx){bA=bz[i];

if(bA.isEnabled()&&!bA.isAnonymous()){return bA;
}}}return null;
},_isInMenu:function(bc){while(bc){if(bc instanceof qx.ui.menu.Menu){return true;
}bc=bc.getLayoutParent();
}return false;
},_getMenuButton:function(q){while(q){if(q instanceof qx.ui.menu.AbstractButton){return q;
}q=q.getLayoutParent();
}return null;
},add:function(v){{};
var w=this.__cC;
w.push(v);
v.setZIndex(1e6+w.length);
},remove:function(r){{};
var s=this.__cC;

if(s){qx.lang.Array.remove(s,r);
}},hideAll:function(){var bd=this.__cC;

if(bd){for(var i=bd.length-1;i>=0;i--){bd[i].exclude();
}}},getActiveMenu:function(){var m=this.__cC;
return m.length>0?m[m.length-1]:null;
},scheduleOpen:function(bB){this.cancelClose(bB);
if(bB.isVisible()){if(this.__cF){this.cancelOpen(this.__cF);
}}else if(this.__cF!=bB){this.__cF=bB;
this.__cD.restartWith(bB.getOpenInterval());
}},scheduleClose:function(bk){this.cancelOpen(bk);
if(!bk.isVisible()){if(this.__cG){this.cancelClose(this.__cG);
}}else if(this.__cG!=bk){this.__cG=bk;
this.__cE.restartWith(bk.getCloseInterval());
}},cancelOpen:function(be){if(this.__cF==be){this.__cD.stop();
this.__cF=null;
}},cancelClose:function(bu){if(this.__cG==bu){this.__cE.stop();
this.__cG=null;
}},_onOpenInterval:function(e){this.__cD.stop();
this.__cF.open();
this.__cF=null;
},_onCloseInterval:function(e){this.__cE.stop();
this.__cG.exclude();
this.__cG=null;
},_onMouseDown:function(e){var l=e.getTarget();
if(l.getMenu&&l.getMenu()&&l.getMenu().isVisible()){return;
}if(this.__cC.length>0&&!this._isInMenu(l)){this.hideAll();
}},__cH:{"Enter":1,"Space":1},__cI:{"Escape":1,"Up":1,"Down":1,"Left":1,"Right":1},_onKeyUpDown:function(e){var t=this.getActiveMenu();

if(!t){return;
}var u=e.getKeyIdentifier();

if(this.__cI[u]||(this.__cH[u]&&t.getSelectedButton())){e.stopPropagation();
}},_onKeyPress:function(e){var bf=this.getActiveMenu();

if(!bf){return;
}var bg=e.getKeyIdentifier();
var bi=this.__cI[bg];
var bh=this.__cH[bg];

if(bi){switch(bg){case R:this._onKeyPressUp(bf);
break;
case K:this._onKeyPressDown(bf);
break;
case O:this._onKeyPressLeft(bf);
break;
case J:this._onKeyPressRight(bf);
break;
case L:this.hideAll();
break;
}e.stopPropagation();
e.preventDefault();
}else if(bh){var bj=bf.getSelectedButton();

if(bj){switch(bg){case T:this._onKeyPressEnter(bf,bj,e);
break;
case P:this._onKeyPressSpace(bf,bj,e);
break;
}e.stopPropagation();
e.preventDefault();
}}},_onKeyPressUp:function(x){var y=x.getSelectedButton();
var z=x.getChildren();
var B=y?x.indexOf(y)-1:z.length-1;
var A=this._getChild(x,B,-1,true);
if(A){x.setSelectedButton(A);
}else{x.resetSelectedButton();
}},_onKeyPressDown:function(bC){var bD=bC.getSelectedButton();
var bF=bD?bC.indexOf(bD)+1:0;
var bE=this._getChild(bC,bF,1,true);
if(bE){bC.setSelectedButton(bE);
}else{bC.resetSelectedButton();
}},_onKeyPressLeft:function(C){var H=C.getOpener();

if(!H){return;
}if(H instanceof qx.ui.menu.Button){var E=H.getLayoutParent();
E.resetOpenedButton();
E.setSelectedButton(H);
}else if(H instanceof qx.ui.menubar.Button){var G=H.getMenuBar().getMenuButtons();
var D=G.indexOf(H);
if(D===-1){return;
}var I=null;
var length=G.length;

for(var i=1;i<=length;i++){var F=G[(D-i+length)%length];

if(F.isEnabled()){I=F;
break;
}}
if(I&&I!=H){I.open(true);
}}},_onKeyPressRight:function(bl){var bn=bl.getSelectedButton();
if(bn){var bm=bn.getMenu();

if(bm){bl.setOpenedButton(bn);
var bt=this._getChild(bm,0,1);

if(bt){bm.setSelectedButton(bt);
}return;
}}else if(!bl.getOpenedButton()){var bt=this._getChild(bl,0,1);

if(bt){bl.setSelectedButton(bt);

if(bt.getMenu()){bl.setOpenedButton(bt);
}return;
}}var br=bl.getOpener();
if(br instanceof qx.ui.menu.Button&&bn){while(br){br=br.getLayoutParent();

if(br instanceof qx.ui.menu.Menu){br=br.getOpener();

if(br instanceof qx.ui.menubar.Button){break;
}}else{break;
}}
if(!br){return;
}}if(br instanceof qx.ui.menubar.Button){var bq=br.getMenuBar().getMenuButtons();
var bo=bq.indexOf(br);
if(bo===-1){return;
}var bs=null;
var length=bq.length;

for(var i=1;i<=length;i++){var bp=bq[(bo+i)%length];

if(bp.isEnabled()){bs=bp;
break;
}}
if(bs&&bs!=br){bs.open(true);
}}},_onKeyPressEnter:function(h,j,e){if(j.hasListener(bb)){var k=e.clone();
k.setBubbles(false);
k.setTarget(j);
j.dispatchEvent(k);
}this.hideAll();
},_onKeyPressSpace:function(d,f,e){if(f.hasListener(bb)){var g=e.clone();
g.setBubbles(false);
g.setTarget(f);
f.dispatchEvent(g);
}}},destruct:function(){var p=qx.event.Registration;
var n=document.body;
var o=qx.core.Init.getApplication().getRoot();
o.removeListener(X,this._onMouseDown,this,true);
p.removeListener(n,Y,this._onKeyUpDown,this,true);
p.removeListener(n,W,this._onKeyUpDown,this,true);
p.removeListener(n,bb,this._onKeyPress,this,true);
this._disposeObjects(V,S);
this._disposeArray(N);
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
(function(){var n="slider",m="splitter",l="qx.ui.splitpane.VLayout";
qx.Class.define(l,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(o,p){var F=this._getLayoutChildren();
var length=F.length;
var B,E;
var r,q,z,s;

for(var i=0;i<length;i++){B=F[i];
E=B.getLayoutProperties().type;

if(E===m){q=B;
}else if(E===n){z=B;
}else if(!r){r=B;
}else{s=B;
}}
if(r&&s){var H=r.getLayoutProperties().flex;
var u=s.getLayoutProperties().flex;

if(H==null){H=1;
}
if(u==null){u=1;
}var G=r.getSizeHint();
var x=q.getSizeHint();
var y=s.getSizeHint();
var t=G.height;
var C=x.height;
var D=y.height;

if(H>0&&u>0){var v=H+u;
var w=p-C;
var t=Math.round((w/v)*H);
var D=w-t;
var A=qx.ui.layout.Util.arrangeIdeals(G.minHeight,t,G.maxHeight,y.minHeight,D,y.maxHeight);
t=A.begin;
D=A.end;
}else if(H>0){t=p-C-D;

if(t<G.minHeight){t=G.minHeight;
}
if(t>G.maxHeight){t=G.maxHeight;
}}else if(u>0){D=p-t-C;

if(D<y.minHeight){D=y.minHeight;
}
if(D>y.maxHeight){D=y.maxHeight;
}}r.renderLayout(0,0,o,t);
q.renderLayout(0,t,o,C);
s.renderLayout(0,t+C,o,D);
}else{q.renderLayout(0,0,0,0);
if(r){r.renderLayout(0,0,o,p);
}else if(s){s.renderLayout(0,0,o,p);
}}},_computeSizeHint:function(){var k=this._getLayoutChildren();
var length=k.length;
var c,b,j;
var d=0,f=0,e=0;
var g=0,h=0,a=0;

for(var i=0;i<length;i++){c=k[i];
j=c.getLayoutProperties();
if(j.type===n){continue;
}b=c.getSizeHint();
d+=b.minHeight;
f+=b.height;
e+=b.maxHeight;

if(b.minWidth>g){g=b.minWidth;
}
if(b.width>h){h=b.width;
}
if(b.maxWidth>a){a=b.maxWidth;
}}return {minHeight:d,height:f,maxHeight:e,minWidth:g,width:h,maxWidth:a};
}}});
})();
(function(){var p="changeSelection",o="change",n="qx.data.Array",m="qx.data.controller.MSelection",l="_applySelection",k="target";
qx.Mixin.define(m,{construct:function(){if(!qx.Class.hasProperty(this.constructor,k)){throw new Error("Target property is needed.");
}this.setSelection(new qx.data.Array());
},properties:{selection:{check:n,event:p,apply:l,init:null}},members:{_modifingSelection:0,__cJ:null,__cK:null,_applySelection:function(q,r){if(this.__cK!=undefined&&r!=undefined){r.removeListenerById(this.__cK);
}this.__cK=q.addListener(o,this.__cL,this);
},__cL:function(){this._updateSelection();
},__cM:function(){if(this._inSelectionModification()||this.getTarget()==null){return;
}var c=this.getTarget().getSelection();
var b=this.getSelection();
if(c.length>0){b.toArray().splice(0,this.getSelection().getLength());
}else{b.splice(0,this.getSelection().getLength());
}for(var i=0;i<c.length;i++){var a=c[i].getModel();

if(i+1==c.length){b.push(a);
}else{b.toArray().push(a);
}}this.fireDataEvent(p,this.getSelection());
},_addChangeTargetListener:function(h,j){if(this.__cJ!=undefined&&j!=undefined){j.removeListenerById(this.__cJ);
}if(this.__cN()||this.__cO()){this.__cJ=h.addListener(p,this.__cM,this);
}},_updateSelection:function(){this._startSelectionModification();
if(this.__cN()){var e=[];
for(var i=0;i<this.getSelection().length;i++){var d=this.getSelection().getItem(i);
var f=this.__cQ(d);

if(f!=null){e.push(f);
}}this.getTarget().setSelection(e);
e=this.getTarget().getSelection();
var g=[];

for(var i=0;i<e.length;i++){g[i]=e[i].getModel();
}for(var i=this.getSelection().length-1;i>=0;i--){if(!qx.lang.Array.contains(g,this.getSelection().getItem(i))){this.getSelection().splice(i,1);
}}}else if(this.__cO()){this.__cP(this.getSelection().getItem(this.getSelection().length-1));
}this._endSelectionModification();
},__cN:function(){var x=this.getTarget().constructor;
return qx.Class.implementsInterface(x,qx.ui.core.IMultiSelection);
},__cO:function(){var u=this.getTarget().constructor;
return qx.Class.implementsInterface(u,qx.ui.core.ISingleSelection);
},__cP:function(v){var w=this.__cQ(v);
if(w==null){return;
}if(this.__cN()){this.getTarget().addToSelection(w);
}else if(this.__cO()){this.getTarget().setSelection([w]);
}},__cQ:function(s){var t=this.getTarget().getSelectables();
for(var i=0;i<t.length;i++){if(t[i].getModel()==s){return t[i];
}}return null;
},_startSelectionModification:function(){this._modifingSelection++;
},_endSelectionModification:function(){this._modifingSelection>0?this._modifingSelection--:null;
},_inSelectionModification:function(){return this._modifingSelection>0;
}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var D="&",C="=",B="?",A="application/json",z="completed",y="text/plain",x="text/javascript",w="qx.io.remote.transport.Script",v="",u="_ScriptTransport_data",o="_responseContent",t="__cS",r="script",n="timeout",m="_ScriptTransport_",q="_ScriptTransport_id",p="aborted",s="utf-8",l="failed";
qx.Class.define(w,{extend:qx.io.remote.transport.Abstract,construct:function(){arguments.callee.base.call(this);
var K=++qx.io.remote.transport.Script.__cR;

if(K>=2000000000){qx.io.remote.transport.Script.__cR=K=1;
}this.__cS=null;
this.__cR=K;
},statics:{__cR:0,_instanceRegistry:{},ScriptTransport_PREFIX:m,ScriptTransport_ID_PARAM:q,ScriptTransport_DATA_PARAM:u,handles:{synchronous:false,asynchronous:true,crossDomain:true,fileUpload:false,programaticFormFields:false,responseTypes:[y,x,A]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4},_requestFinished:qx.event.GlobalError.observeMethod(function(E,content){var F=qx.io.remote.transport.Script._instanceRegistry[E];

if(F==null){{};
}else{F._responseContent=content;
F._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
}})},members:{__cT:0,__cS:null,__cR:null,send:function(){var f=this.getUrl();
f+=(f.indexOf(B)>=0?D:B)+qx.io.remote.transport.Script.ScriptTransport_ID_PARAM+C+this.__cR;
var j=this.getParameters();
var h=[];

for(var e in j){if(e.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX)==0){this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): "+qx.io.remote.transport.Script.ScriptTransport_PREFIX);
}var g=j[e];

if(g instanceof Array){for(var i=0;i<g.length;i++){h.push(encodeURIComponent(e)+C+encodeURIComponent(g[i]));
}}else{h.push(encodeURIComponent(e)+C+encodeURIComponent(g));
}}
if(h.length>0){f+=D+h.join(D);
}var d=this.getData();

if(d!=null){f+=D+qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM+C+encodeURIComponent(d);
}qx.io.remote.transport.Script._instanceRegistry[this.__cR]=this;
this.__cS=document.createElement(r);
this.__cS.charset=s;
this.__cS.src=f;
{};
document.body.appendChild(this.__cS);
},_switchReadyState:function(a){switch(this.getState()){case z:case p:case l:case n:this.warn("Ignore Ready State Change");
return;
}while(this.__cT<a){this.setState(qx.io.remote.Exchange._nativeMap[++this.__cT]);
}},setRequestHeader:function(b,c){},getResponseHeader:function(G){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return v;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==z){{};
return null;
}{};

switch(this.getResponseType()){case y:case A:case x:{};
var k=this._responseContent;
return (k===0?0:(k||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(H,I,J){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script,w);
},destruct:function(){if(this.__cS){delete qx.io.remote.transport.Script._instanceRegistry[this.__cR];
document.body.removeChild(this.__cS);
}this._disposeFields(t,o);
}});
})();
(function(){var b="qx.ui.form.INumberForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var c="qx.ui.form.IRange";
qx.Interface.define(c,{members:{setMinimum:function(a){return arguments.length==1;
},getMinimum:function(){},setMaximum:function(b){return arguments.length==1;
},getMaximum:function(){},setSingleStep:function(e){return arguments.length==1;
},getSingleStep:function(){},setPageStep:function(d){return arguments.length==1;
},getPageStep:function(){}}});
})();
(function(){var bp="knob",bo="horizontal",bn="vertical",bm="Integer",bl="px",bk="mousemove",bj="resize",bi="left",bh="top",bg="mouseup",bT="slider",bS="PageUp",bR="mousedown",bQ="height",bP="changeValue",bO="Left",bN="Down",bM="Up",bL="dblclick",bK="qx.ui.form.Slider",bw="PageDown",bx="mousewheel",bu="interval",bv="_applyValue",bs="_applyKnobFactor",bt="End",bq="width",br="_applyOrientation",by="Home",bz="floor",bC="_applyMinimum",bB="click",bE="Right",bD="keypress",bG="ceil",bF="losecapture",bA="contextmenu",bJ="_applyMaximum",bI="Number",bH="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()";
qx.Class.define(bK,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MForm],construct:function(L){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Canvas());
this.addListener(bD,this._onKeyPress);
this.addListener(bx,this._onMouseWheel);
this.addListener(bR,this._onMouseDown);
this.addListener(bg,this._onMouseUp);
this.addListener(bF,this._onMouseUp);
this.addListener(bj,this._onUpdate);
this.addListener(bA,this._onStopEvent);
this.addListener(bB,this._onStopEvent);
this.addListener(bL,this._onStopEvent);
if(L!=null){this.setOrientation(L);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:bT},focusable:{refine:true,init:true},orientation:{check:[bo,bn],init:bo,apply:br},value:{check:bH,init:0,apply:bv,event:bP,nullable:true},minimum:{check:bm,init:0,apply:bC},maximum:{check:bm,init:100,apply:bJ},singleStep:{check:bm,init:1},pageStep:{check:bm,init:10},knobFactor:{check:bI,apply:bs,nullable:true}},members:{__cU:null,__cV:null,__cW:null,__cX:null,__cY:null,__da:null,__db:null,__dc:null,__dd:null,_forwardStates:{invalid:true},_createChildControlImpl:function(u){var v;

switch(u){case bp:v=new qx.ui.core.Widget();
v.addListener(bj,this._onUpdate,this);
this._add(v);
break;
}return v||arguments.callee.base.call(this,u);
},_onMouseWheel:function(e){var bf=e.getWheelDelta()>0?1:-1;
this.slideBy(bf*this.getSingleStep());
e.stop();
},_onKeyPress:function(e){var be=this.getOrientation()===bo;
var bd=be?bO:bM;
var forward=be?bE:bN;

switch(e.getKeyIdentifier()){case forward:this.slideForward();
break;
case bd:this.slideBack();
break;
case bw:this.slidePageForward();
break;
case bS:this.slidePageBack();
break;
case by:this.slideToBegin();
break;
case bt:this.slideToEnd();
break;
default:return;
}e.stop();
},_onMouseDown:function(e){if(this.__cX){return;
}var R=this.__df;
var P=this.getChildControl(bp);
var Q=R?bi:bh;
var T=R?e.getDocumentLeft():e.getDocumentTop();
var U=this.__cU=qx.bom.element.Location.get(this.getContentElement().getDomElement())[Q];
var S=this.__cV=qx.bom.element.Location.get(P.getContainerElement().getDomElement())[Q];

if(e.getTarget()===P){this.__cX=true;
this.__cY=T+U-S;
}else{this.__da=true;
this.__db=T<=S?-1:1;
this.__dg(e);
this._onInterval();
if(!this.__dd){this.__dd=new qx.event.Timer(100);
this.__dd.addListener(bu,this._onInterval,this);
}this.__dd.start();
}this.addListener(bk,this._onMouseMove);
this.capture();
e.stopPropagation();
},_onMouseUp:function(e){if(this.__cX){this.releaseCapture();
delete this.__cX;
delete this.__cY;
}else if(this.__da){this.__dd.stop();
this.releaseCapture();
delete this.__da;
delete this.__db;
delete this.__dc;
}this.removeListener(bk,this._onMouseMove);
if(e.getType()===bg){e.stopPropagation();
}},_onMouseMove:function(e){if(this.__cX){var m=this.__df?e.getDocumentLeft():e.getDocumentTop();
var l=m-this.__cY;
this.slideTo(this._positionToValue(l));
}else if(this.__da){this.__dg(e);
}e.stopPropagation();
},_onInterval:function(e){var V=this.getValue()+(this.__db*this.getPageStep());
if(V<this.getMinimum()){V=this.getMinimum();
}else if(V>this.getMaximum()){V=this.getMaximum();
}var W=this.__db==-1;

if((W&&V<=this.__dc)||(!W&&V>=this.__dc)){V=this.__dc;
}this.slideTo(V);
},_onUpdate:function(e){var N=this.getInnerSize();
var O=this.getChildControl(bp).getBounds();
var M=this.__df?bq:bQ;
this._updateKnobSize();
this.__de=N[M]-O[M];
this.__cW=O[M];
this._updateKnobPosition();
},__df:false,__de:0,__dg:function(e){var z=this.__df;
var G=z?e.getDocumentLeft():e.getDocumentTop();
var I=this.__cU;
var A=this.__cV;
var K=this.__cW;
var H=G-I;

if(G>=A){H-=K;
}var E=this._positionToValue(H);
var B=this.getMinimum();
var C=this.getMaximum();

if(E<B){E=B;
}else if(E>C){E=C;
}else{var F=this.getValue();
var D=this.getPageStep();
var J=this.__db<0?bz:bG;
E=F+(Math[J]((E-F)/D)*D);
}if(this.__dc==null||(this.__db==-1&&E<=this.__dc)||(this.__db==1&&E>=this.__dc)){this.__dc=E;
}},_positionToValue:function(a){var b=this.__de;
if(b==null||b==0){return 0;
}var d=a/b;

if(d<0){d=0;
}else if(d>1){d=1;
}var c=this.getMaximum()-this.getMinimum();
return this.getMinimum()+Math.round(c*d);
},_valueToPosition:function(f){var g=this.__de;

if(g==null){return 0;
}var h=this.getMaximum()-this.getMinimum();
if(h==0){return 0;
}var f=f-this.getMinimum();
var i=f/h;

if(i<0){i=0;
}else if(i>1){i=1;
}return Math.round(g*i);
},_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));
},_setKnobPosition:function(X){var Y=this.getChildControl(bp).getContainerElement();

if(this.__df){Y.setStyle(bi,X+bl,true);
}else{Y.setStyle(bh,X+bl,true);
}},_updateKnobSize:function(){var q=this.getKnobFactor();

if(q==null){return;
}var p=this.getInnerSize();

if(p==null){return;
}if(this.__df){this.getChildControl(bp).setWidth(Math.round(q*p.width));
}else{this.getChildControl(bp).setHeight(Math.round(q*p.height));
}},slideToBegin:function(){this.slideTo(this.getMinimum());
},slideToEnd:function(){this.slideTo(this.getMaximum());
},slideForward:function(){this.slideBy(this.getSingleStep());
},slideBack:function(){this.slideBy(-this.getSingleStep());
},slidePageForward:function(){this.slideBy(this.getPageStep());
},slidePageBack:function(){this.slideBy(-this.getPageStep());
},slideBy:function(t){this.slideTo(this.getValue()+t);
},slideTo:function(y){if(y<this.getMinimum()){y=this.getMinimum();
}else if(y>this.getMaximum()){y=this.getMaximum();
}else{y=this.getMinimum()+Math.round((y-this.getMinimum())/this.getSingleStep())*this.getSingleStep();
}this.setValue(y);
},_applyOrientation:function(ba,bb){var bc=this.getChildControl(bp);
this.__df=ba===bo;
if(this.__df){this.removeState(bn);
bc.removeState(bn);
this.addState(bo);
bc.addState(bo);
bc.setLayoutProperties({top:0,right:null,bottom:0});
}else{this.removeState(bo);
bc.removeState(bo);
this.addState(bn);
bc.addState(bn);
bc.setLayoutProperties({right:0,bottom:null,left:0});
}this._updateKnobPosition();
},_applyKnobFactor:function(r,s){if(r!=null){this._updateKnobSize();
}else{if(this.__df){this.getChildControl(bp).resetWidth();
}else{this.getChildControl(bp).resetHeight();
}}},_applyValue:function(n,o){if(n!=null){this._updateKnobPosition();
}else{this.resetValue();
}},_applyMinimum:function(j,k){if(this.getValue()<j){this.setValue(j);
}this._updateKnobPosition();
},_applyMaximum:function(w,x){if(this.getValue()>w){this.setValue(w);
}this._updateKnobPosition();
}}});
})();
(function(){var n="slider",m="splitter",l="qx.ui.splitpane.HLayout";
qx.Class.define(l,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(o,p){var F=this._getLayoutChildren();
var length=F.length;
var C,E;
var r,q,z,s;

for(var i=0;i<length;i++){C=F[i];
E=C.getLayoutProperties().type;

if(E===m){q=C;
}else if(E===n){z=C;
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
}}},_computeSizeHint:function(){var k=this._getLayoutChildren();
var length=k.length;
var c,b,j;
var g=0,h=0,a=0;
var d=0,f=0,e=0;

for(var i=0;i<length;i++){c=k[i];
j=c.getLayoutProperties();
if(j.type===n){continue;
}b=c.getSizeHint();
g+=b.minWidth;
h+=b.width;
a+=b.maxWidth;

if(b.minHeight>d){d=b.minHeight;
}
if(b.height>f){f=b.height;
}
if(b.maxHeight>e){e=b.maxHeight;
}}return {minWidth:g,width:h,maxWidth:a,minHeight:d,height:f,maxHeight:e};
}}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Classic",b="Theme",a="singleton";
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
(function(){var A=",",z="",y="string",x="null",w="qx.jsonDebugging",v='"',u='\\u00',t="new Date(Date.UTC(",s="__dk",r='\\\\',W='\\f',V="__dj",U='\\"',T="__dl",S="))",R="}",Q="__du",P=":",O="{",N='\\r',H='(',I='\\t',F="]",G=')',D="[",E="Use 'parse' instead!",B="qx.jsonEncodeUndefined",C='\\b',J="__dm",K="qx.util.Json",M="__dt",L='\\n';
qx.Class.define(K,{statics:{__dh:null,BEAUTIFYING_INDENT:"  ",BEAUTIFYING_LINE_END:"\n",__di:{"function":V,"boolean":s,"number":T,"string":J,"object":M,"undefined":Q},__dj:function(h,j){return String(h);
},__dk:function(bn,bo){return String(bn);
},__dl:function(bz,bA){return isFinite(bz)?String(bz):x;
},__dm:function(X,Y){var ba;

if(/["\\\x00-\x1f]/.test(X)){ba=X.replace(/([\x00-\x1f\\"])/g,qx.util.Json.__do);
}else{ba=X;
}return v+ba+v;
},__dn:{'\b':C,'\t':I,'\n':L,'\f':W,'\r':N,'"':U,'\\':r},__do:function(a,b){var c=qx.util.Json.__dn[b];

if(c){return c;
}c=b.charCodeAt();
return u+Math.floor(c/16).toString(16)+(c%16).toString(16);
},__dp:function(bp,bq){var bs=[],bv=true,bu,br;
var bt=qx.util.Json.__dw;
bs.push(D);

if(bt){qx.util.Json.__dq+=qx.util.Json.BEAUTIFYING_INDENT;
bs.push(qx.util.Json.__dq);
}
for(var i=0,l=bp.length;i<l;i++){br=bp[i];
bu=this.__di[typeof br];

if(bu){br=this[bu](br,i+z);

if(typeof br==y){if(!bv){bs.push(A);

if(bt){bs.push(qx.util.Json.__dq);
}}bs.push(br);
bv=false;
}}}
if(bt){qx.util.Json.__dq=qx.util.Json.__dq.substring(0,qx.util.Json.__dq.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bs.push(qx.util.Json.__dq);
}bs.push(F);
return bs.join(z);
},__dr:function(d,e){var f=d.getUTCFullYear()+A+d.getUTCMonth()+A+d.getUTCDate()+A+d.getUTCHours()+A+d.getUTCMinutes()+A+d.getUTCSeconds()+A+d.getUTCMilliseconds();
return t+f+S;
},__ds:function(bg,bh){var bk=[],bm=true,bj,bi;
var bl=qx.util.Json.__dw;
bk.push(O);

if(bl){qx.util.Json.__dq+=qx.util.Json.BEAUTIFYING_INDENT;
bk.push(qx.util.Json.__dq);
}
for(var bh in bg){bi=bg[bh];
bj=this.__di[typeof bi];

if(bj){bi=this[bj](bi,bh);

if(typeof bi==y){if(!bm){bk.push(A);

if(bl){bk.push(qx.util.Json.__dq);
}}bk.push(this.__dm(bh),P,bi);
bm=false;
}}}
if(bl){qx.util.Json.__dq=qx.util.Json.__dq.substring(0,qx.util.Json.__dq.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bk.push(qx.util.Json.__dq);
}bk.push(R);
return bk.join(z);
},__dt:function(bb,bc){if(bb){if(qx.lang.Type.isFunction(bb.toJSON)&&bb.toJSON!==this.__dh){return this.__dv(bb.toJSON(bc),bc);
}else if(qx.lang.Type.isDate(bb)){return this.__dr(bb,bc);
}else if(qx.lang.Type.isArray(bb)){return this.__dp(bb,bc);
}else if(qx.lang.Type.isObject(bb)){return this.__ds(bb,bc);
}return z;
}return x;
},__du:function(be,bf){if(qx.core.Setting.get(B)){return x;
}},__dv:function(k,m){return this[this.__di[typeof k]](k,m);
},stringify:function(bw,bx){this.__dw=bx;
this.__dq=this.BEAUTIFYING_LINE_END;
var by=this.__dv(bw,z);

if(typeof by!=y){by=null;
}if(qx.core.Setting.get(w)){qx.log.Logger.debug(this,"JSON request: "+by);
}return by;
},parse:function(o,p){if(p===undefined){p=true;
}
if(qx.core.Setting.get(w)){qx.log.Logger.debug(this,"JSON response: "+o);
}
if(p){if(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(o.replace(/"(\\.|[^"\\])*"/g,z))){throw new Error("Could not parse JSON string!");
}}
try{var q=(o&&o.length>0)?eval(H+o+G):null;
return q;
}catch(bd){throw new Error("Could not evaluate JSON string: "+bd.message);
}},parseQx:function(n){qx.log.Logger.deprecatedMethodWarning(arguments.callee,E);
return qx.util.Json.parse(n,false);
}},settings:{"qx.jsonEncodeUndefined":true,"qx.jsonDebugging":false},defer:function(g){g.__dh=Date.prototype.toJSON;
}});
})();
(function(){var c="mousewheel",b="qx.ui.core.scroll.ScrollSlider",a="keypress";
qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(d){arguments.callee.base.call(this,d);
this.removeListener(a,this._onKeyPress);
this.removeListener(c,this._onMouseWheel);
}});
})();
(function(){var i="auto",h="overflowX",g="visible",f="hidden",e="scroll",d="overflowY",c="_applyOverflowX",b="_applyOverflowY",a="qx.ui.core.MNativeOverflow";
qx.Mixin.define(a,{properties:{overflowX:{check:[f,g,e,i],nullable:true,apply:c},overflowY:{check:[f,g,e,i],nullable:true,apply:b},overflow:{group:[h,d]}},members:{_applyOverflowX:function(j){this.getContentElement().setStyle(h,j);
},_applyOverflowY:function(k){this.getContentElement().setStyle(d,k);
}}});
})();
(function(){var q="none",p="text",o="",n="userSelect",m="color",l="String",k="padding",j="0px",i="webkit",h="changeHtml",c="_applyCssClass",g="class",f="qx.ui.embed.Html",b="_applyHtml",a="qx.client",e="border",d="html";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:[qx.ui.core.MNativeOverflow],construct:function(z){arguments.callee.base.call(this);

if(z!=null){this.setHtml(z);
}},properties:{html:{check:l,apply:b,event:h,nullable:true},cssClass:{check:l,init:o,apply:c},selectable:{refine:true,init:true},focusable:{refine:true,init:true}},members:{getFocusElement:function(){return this.getContentElement();
},_applyHtml:function(r,s){var t=this.getContentElement();
t.setAttribute(d,r||o);
t.setStyle(k,j);
t.setStyle(e,q);
},_applyCssClass:function(x,y){this.getContentElement().setAttribute(g,x);
},_applySelectable:function(C){arguments.callee.base.call(this,C);
if(qx.core.Variant.isSet(a,i)){this.getContainerElement().setStyle(n,C?p:q);
this.getContentElement().setStyle(n,C?p:q);
}},_applyFont:function(u,v){var w=u?qx.theme.manager.Font.getInstance().resolve(u).getStyles():qx.bom.Font.getDefaultStyles();
this.getContentElement().setStyles(w);
},_applyTextColor:function(A,B){if(A){this.getContentElement().setStyle(m,qx.theme.manager.Color.getInstance().resolve(A));
}else{this.getContentElement().removeStyle(m);
}}}});
})();
(function(){var d="qx.theme.manager.Icon",c="Theme",b="_applyTheme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:b}},members:{_applyTheme:function(e,f){var h=qx.util.AliasManager.getInstance();

if(f){for(var g in f.aliases){h.remove(g);
}}
if(e){for(var g in e.aliases){h.add(g,e.aliases[g]);
}}}}});
})();
(function(){var b="menu-separator",a="qx.ui.menu.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true}}});
})();
(function(){var v="Integer",u="_on",t="_applyEnabled",s="Boolean",r="sending",q="interval",p="__dT",o="failed",n="qx.io.remote.RequestQueue",m="timeout",g="completed",l="__dU",k="queued",f="__dW",d="aborted",j="receiving",h="singleton";
qx.Class.define(n,{type:h,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__dT=[];
this.__dU=[];
this.__dV=0;
this.__dW=new qx.event.Timer(500);
this.__dW.addListener(q,this._oninterval,this);
},properties:{enabled:{init:true,check:s,apply:t},maxTotalRequests:{check:v,nullable:true},maxConcurrentRequests:{check:v,init:qx.bom.client.Transport.getMaxConcurrentRequestCount()},defaultTimeout:{check:v,init:5000}},members:{__dT:null,__dU:null,__dV:null,__dW:null,getRequestQueue:function(){return this.__dT;
},getActiveQueue:function(){return this.__dU;
},_debug:function(){var w;
{};
},_check:function(){this._debug();
if(this.__dU.length==0&&this.__dT.length==0){this.__dW.stop();
}if(!this.getEnabled()){return;
}if(this.__dT.length==0||(this.__dT[0].isAsynchronous()&&this.__dU.length>=this.getMaxConcurrentRequests())){return;
}if(this.getMaxTotalRequests()!=null&&this.__dV>=this.getMaxTotalRequests()){return;
}var G=this.__dT.shift();
var H=new qx.io.remote.Exchange(G);
this.__dV++;
this.__dU.push(H);
this._debug();
H.addListener(r,this._onsending,this);
H.addListener(j,this._onreceiving,this);
H.addListener(g,this._oncompleted,this);
H.addListener(d,this._oncompleted,this);
H.addListener(m,this._oncompleted,this);
H.addListener(o,this._oncompleted,this);
H._start=(new Date).valueOf();
H.send();
if(this.__dT.length>0){this._check();
}},_remove:function(K){qx.lang.Array.remove(this.__dU,K);
K.dispose();
this._check();
},__dX:0,_onsending:function(e){{};
e.getTarget().getRequest()._onsending(e);
},_onreceiving:function(e){e.getTarget().getRequest()._onreceiving(e);
},_oncompleted:function(e){{};
var J=e.getTarget().getRequest();
var I=u+e.getType();

if(J[I]){J[I](e);
}this._remove(e.getTarget());
},_oninterval:function(e){var F=this.__dU;

if(F.length==0){this.__dW.stop();
return;
}var A=(new Date).valueOf();
var D;
var B;
var E=this.getDefaultTimeout();
var C;
var z;

for(var i=F.length-1;i>=0;i--){D=F[i];
B=D.getRequest();

if(B.isAsynchronous()){C=B.getTimeout();
if(C==0){continue;
}
if(C==null){C=E;
}z=A-D._start;

if(z>C){this.warn("Timeout: transport "+D.toHashCode());
this.warn(z+"ms > "+C+"ms");
D.timeout();
}}}},_applyEnabled:function(x,y){if(x){this._check();
}this.__dW.setEnabled(x);
},add:function(a){a.setState(k);

if(a.isAsynchronous()){this.__dT.push(a);
}else{this.__dT.unshift(a);
}this._check();

if(this.getEnabled()){this.__dW.start();
}},abort:function(b){var c=b.getTransport();

if(c){c.abort();
}else if(qx.lang.Array.contains(this.__dT,b)){qx.lang.Array.remove(this.__dT,b);
}}},destruct:function(){this._disposeArray(l);
this._disposeObjects(f);
this._disposeFields(p);
}});
})();
(function(){var w="resize",v="px",u="zIndex",t="qx.ui.root.Page",s="backgroundColor",r="_applyOpacity",q="opacity",p="__in",o="Number",n="interval",f="qx.ui.core.Blocker",m="Use 'getBlockerElement' instead.",j="__il",c="_widget",b="__im",h="__ir",g="__ip",k="Use 'getContentBlockerElement' instead.",a="Color",l="__it",d="_applyColor";
qx.Class.define(f,{extend:qx.core.Object,construct:function(E){arguments.callee.base.call(this);
this._widget=E;
this._isPageRoot=(qx.Class.isDefined(t)&&E instanceof qx.ui.root.Page);

if(this._isPageRoot){E.addListener(w,this.__iu,this);
}this.__il=[];
this.__im=[];
},properties:{color:{check:a,init:null,nullable:true,apply:d,themeable:true},opacity:{check:o,init:1,apply:r,themeable:true}},members:{__in:null,__io:null,__ip:null,__iq:null,__il:null,__im:null,__ir:null,__is:0,__it:null,_isPageRoot:false,_widget:null,__iu:function(e){var H=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:H.width,height:H.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:H.width,height:H.height});
}},_applyColor:function(M,N){var O=qx.theme.manager.Color.getInstance().resolve(M);
this.__iv(s,O);
},_applyOpacity:function(A,B){this.__iv(q,A);
},__iv:function(J,K){var L=[];
this.__in&&L.push(this.__in);
this.__ip&&L.push(this.__ip);

for(var i=0;i<L.length;i++){L[i].setStyle(J,K);
}},_saveAndSetAnonymousState:function(){this.__is+=1;

if(this.__is==1){this.__ir=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){this.__is-=1;

if(this.__is==0){this._widget.setAnonymous(this.__ir);
}},_backupActiveWidget:function(){var I=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__il.push(I.getActive());
this.__im.push(I.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var z=this.__il.length;

if(z>0){var y=this.__il[z-1];

if(y){qx.bom.Element.activate(y);
}this.__il.pop();
}var x=this.__im.length;

if(x>0){var y=this.__im[x-1];

if(y){qx.bom.Element.focus(this.__im[x-1]);
}this.__im.pop();
}},__iw:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,m);
return this.getBlockerElement();
},getBlockerElement:function(){if(!this.__in){this.__in=this.__iw();
this.__in.setStyle(u,15);
this._widget.getContainerElement().add(this.__in);
this.__in.exclude();
}return this.__in;
},block:function(){if(this.__io){return;
}this.__io=true;
this.getBlockerElement().include();
this._backupActiveWidget();
this._saveAndSetAnonymousState();
},isBlocked:function(){return !!this.__io;
},unblock:function(){if(!this.__io){return;
}this.__io=false;
this._restoreAnonymousState();
this._restoreActiveWidget();
this.getBlockerElement().exclude();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,k);
return this.getContentBlockerElement();
},getContentBlockerElement:function(){if(!this.__ip){this.__ip=this.__iw();
this._widget.getContentElement().add(this.__ip);
this.__ip.exclude();
}return this.__ip;
},blockContent:function(F){var G=this.getContentBlockerElement();
G.setStyle(u,F);

if(this.__iq){return;
}this.__iq=true;
G.include();

if(this._isPageRoot){if(!this.__it){this.__it=new qx.event.Timer(300);
this.__it.addListener(n,this.__ix,this);
}this.__it.start();
this.__ix();
}},isContentBlocked:function(){return !!this.__iq;
},unblockContent:function(){if(!this.__iq){return;
}this.__iq=false;
this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__it.stop();
}},__ix:function(){var C=this._widget.getContainerElement().getDomElement();
var D=qx.dom.Node.getDocument(C);
this.getContentBlockerElement().setStyles({height:D.documentElement.scrollHeight+v,width:D.documentElement.scrollWidth+v});
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(w,this.__iu,this);
}this._disposeObjects(g,p,l);
this._disposeFields(h,j,b,c);
}});
})();
(function(){var n="px",m="0px",l="-1px",k="no-repeat",j="scale-x",i="scale-y",h="-tr",g="-l",f="__insets",e='</div>',F="scale",E="qx.client",D="-br",C="-t",B="-tl",A="-r",z='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',y="_applyBaseImage",x="-b",w="String",u="",v="-bl",s="__bG",t="-c",q="mshtml",r="__bI",o="__bH",p="qx.ui.decoration.Grid";
qx.Class.define(p,{extend:qx.ui.decoration.Abstract,construct:function(W,X){arguments.callee.base.call(this);
if(W!=null){this.setBaseImage(W);
}
if(X!=null){this.setInsets(X);
}},properties:{baseImage:{check:w,nullable:true,apply:y}},members:{__bG:null,__bH:null,__bI:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bG;
},getMarkup:function(){if(this.__bG){return this.__bG;
}var a=qx.bom.element.Decoration;
var b=this.__bH;
var c=this.__bI;
var d=[];
d.push(z);
d.push(a.create(b.tl,k,{top:0,left:0}));
d.push(a.create(b.t,j,{top:0,left:c.left+n}));
d.push(a.create(b.tr,k,{top:0,right:0}));
d.push(a.create(b.bl,k,{bottom:0,left:0}));
d.push(a.create(b.b,j,{bottom:0,left:c.left+n}));
d.push(a.create(b.br,k,{bottom:0,right:0}));
d.push(a.create(b.l,i,{top:c.top+n,left:0}));
d.push(a.create(b.c,F,{top:c.top+n,left:c.left+n}));
d.push(a.create(b.r,i,{top:c.top+n,right:0}));
d.push(e);
return this.__bG=d.join(u);
},resize:function(O,P,Q){var R=this.__bI;
var innerWidth=P-R.left-R.right;
var innerHeight=Q-R.top-R.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}O.style.width=P+n;
O.style.height=Q+n;
O.childNodes[1].style.width=innerWidth+n;
O.childNodes[4].style.width=innerWidth+n;
O.childNodes[7].style.width=innerWidth+n;
O.childNodes[6].style.height=innerHeight+n;
O.childNodes[7].style.height=innerHeight+n;
O.childNodes[8].style.height=innerHeight+n;

if(qx.core.Variant.isSet(E,q)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(P%2==1){O.childNodes[2].style.marginRight=l;
O.childNodes[5].style.marginRight=l;
O.childNodes[8].style.marginRight=l;
}else{O.childNodes[2].style.marginRight=m;
O.childNodes[5].style.marginRight=m;
O.childNodes[8].style.marginRight=m;
}
if(Q%2==1){O.childNodes[3].style.marginBottom=l;
O.childNodes[4].style.marginBottom=l;
O.childNodes[5].style.marginBottom=l;
}else{O.childNodes[3].style.marginBottom=m;
O.childNodes[4].style.marginBottom=m;
O.childNodes[5].style.marginBottom=m;
}}}},tint:function(U,V){},_applyBaseImage:function(H,I){{};

if(H){var M=this._resolveImageUrl(H);
var N=/(.*)(\.[a-z]+)$/.exec(M);
var L=N[1];
var K=N[2];
var J=this.__bH={tl:L+B+K,t:L+C+K,tr:L+h+K,bl:L+v+K,b:L+x+K,br:L+D+K,l:L+g+K,c:L+t+K,r:L+A+K};
this.__bI=this._computeEdgeSizes(J);
}},_resolveImageUrl:function(G){return qx.util.AliasManager.getInstance().resolve(G);
},_computeEdgeSizes:function(S){var T=qx.util.ResourceManager.getInstance();
return {top:T.getImageHeight(S.t),bottom:T.getImageHeight(S.b),left:T.getImageWidth(S.l),right:T.getImageWidth(S.r)};
}},destruct:function(){this._disposeFields(s,o,r,f);
}});
})();
(function(){var r="_applyStyle",q="solid",p="Color",o="double",n="px ",m="dotted",l="_applyWidth",k="dashed",j="Number",i=" ",Q=";",P="shorthand",O="px",N="widthTop",M="styleRight",L="styleLeft",K="widthLeft",J="widthBottom",I="",H="styleTop",y="colorBottom",z="styleBottom",w="widthRight",x="colorLeft",u="colorRight",v="colorTop",s="border-left:",t="scale",A="position:absolute;top:0;left:0;",B="border-top:",D="border-bottom:",C="border-right:",F="qx.ui.decoration.Single",E="__insets",G="__bK";
qx.Class.define(F,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(R,S,T){arguments.callee.base.call(this);
if(R!=null){this.setWidth(R);
}
if(S!=null){this.setStyle(S);
}
if(T!=null){this.setColor(T);
}},properties:{widthTop:{check:j,init:0,apply:l},widthRight:{check:j,init:0,apply:l},widthBottom:{check:j,init:0,apply:l},widthLeft:{check:j,init:0,apply:l},styleTop:{nullable:true,check:[q,m,k,o],init:q,apply:r},styleRight:{nullable:true,check:[q,m,k,o],init:q,apply:r},styleBottom:{nullable:true,check:[q,m,k,o],init:q,apply:r},styleLeft:{nullable:true,check:[q,m,k,o],init:q,apply:r},colorTop:{nullable:true,check:p,apply:r},colorRight:{nullable:true,check:p,apply:r},colorBottom:{nullable:true,check:p,apply:r},colorLeft:{nullable:true,check:p,apply:r},backgroundColor:{check:p,nullable:true,apply:r},left:{group:[K,L,x]},right:{group:[w,M,u]},top:{group:[N,H,v]},bottom:{group:[J,z,y]},width:{group:[N,w,J,K],mode:P},style:{group:[H,M,z,L],mode:P},color:{group:[v,u,y,x],mode:P}},members:{__bK:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__bK;
},getMarkup:function(a){if(this.__bK){return this.__bK;
}var b=qx.theme.manager.Color.getInstance();
var c=I;
var e=this.getWidthTop();

if(e>0){c+=B+e+n+this.getStyleTop()+i+b.resolve(this.getColorTop())+Q;
}var e=this.getWidthRight();

if(e>0){c+=C+e+n+this.getStyleRight()+i+b.resolve(this.getColorRight())+Q;
}var e=this.getWidthBottom();

if(e>0){c+=D+e+n+this.getStyleBottom()+i+b.resolve(this.getColorBottom())+Q;
}var e=this.getWidthLeft();

if(e>0){c+=s+e+n+this.getStyleLeft()+i+b.resolve(this.getColorLeft())+Q;
}{};
c+=A;
var d=this._generateBackgroundMarkup(c);
return this.__bK=d;
},resize:function(U,V,W){var Y=this.getBackgroundImage()&&this.getBackgroundRepeat()==t;

if(Y||qx.bom.client.Feature.CONTENT_BOX){var X=this.getInsets();
V-=X.left+X.right;
W-=X.top+X.bottom;
if(V<0){V=0;
}
if(W<0){W=0;
}}U.style.width=V+O;
U.style.height=W+O;
},tint:function(f,g){var h=qx.theme.manager.Color.getInstance();

if(g==null){g=this.getBackgroundColor();
}f.style.backgroundColor=h.resolve(g)||I;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(G,E);
}});
})();
(function(){var q="Unidentified",p="Boolean",o="+",n="short",m="keydown",l="",k="Control",j="keypress",h="-",g="PageUp",ba="Escape",Y="qx.event.type.Data",X="_applyShortcut",W="PrintScreen",V="NumLock",U="5",T="8",S="execute",R="Meta",Q="0",x="2",y="This message will be made private.",v="Shift",w="You can only specify one non modifier key!",t="3",u="/",r="_applyEnabled",s="String",z="changeEnabled",A="*",H="qx.bom.Shortcut",F="6",K="4",J="1",M="Alt",L="Not a valid key name for a shortcut: ",C="PageDown",P="Whitespaces are not allowed within shortcuts",O="Delete",N="7",B="a",D="z",E="__dY",G="__ea",I="9";
qx.Class.define(H,{extend:qx.core.Object,construct:function(b){arguments.callee.base.call(this);
this.__dY={};
this.__ea=null;

if(b!=null){this.setShortcut(b);
}{};
this.initEnabled();
},events:{"execute":Y},properties:{enabled:{init:true,check:p,event:z,apply:r},shortcut:{check:s,apply:X,nullable:true},autoRepeat:{check:p,init:false}},members:{__dY:l,__ea:l,execute:function(bc){this.fireDataEvent(S,bc);
},__eb:function(event){if(this.getEnabled()&&this.__ed(event)){if(!this.isAutoRepeat()){this.execute(event.getTarget());
}event.stop();
}},__ec:function(event){if(this.getEnabled()&&this.__ed(event)){if(this.isAutoRepeat()){this.execute(event.getTarget());
}event.stop();
}},_applyEnabled:function(bm,bn){if(bm){qx.event.Registration.addListener(document.documentElement,m,this.__eb,this);
qx.event.Registration.addListener(document.documentElement,j,this.__ec,this);
}else{qx.event.Registration.removeListener(document.documentElement,m,this.__eb,this);
qx.event.Registration.removeListener(document.documentElement,j,this.__ec,this);
}},_applyShortcut:function(bg,bh){if(bg){if(bg.search(/[\s]+/)!=-1){var bk=P;
this.error(bk);
throw new Error(bk);
}this.__dY={"Control":false,"Shift":false,"Meta":false,"Alt":false};
this.__ea=null;
var bi;
var a=[];

while(bg.length>0&&bi!=-1){bi=bg.search(/[-+]+/);
a.push((bg.length==1||bi==-1)?bg:bg.substring(0,bi));
bg=bg.substring(bi+1);
}var bj=a.length;

for(var i=0;i<bj;i++){var bl=this.__ef(a[i]);

switch(bl){case k:case v:case R:case M:this.__dY[bl]=true;
break;
case q:var bk=L+a[i];
this.error(bk);
throw bk;
default:if(this.__ea){var bk=w;
this.error(bk);
throw bk;
}this.__ea=bl;
}}}return true;
},matchesKeyEvent:function(e){qx.log.Logger.deprecatedMethodWarning(arguments.callee,y);
return this.__ed(e);
},__ed:function(e){var bb=this.__ea;

if(!bb){return ;
}if((!this.__dY.Shift&&e.isShiftPressed())||(this.__dY.Shift&&!e.isShiftPressed())||(!this.__dY.Control&&e.isCtrlPressed())||(this.__dY.Control&&!e.isCtrlPressed())||(!this.__dY.Meta&&e.isMetaPressed())||(this.__dY.Meta&&!e.isMetaPressed())||(!this.__dY.Alt&&e.isAltPressed())||(this.__dY.Alt&&!e.isAltPressed())){return false;
}
if(bb==e.getKeyIdentifier()){return true;
}return false;
},__ee:{esc:ba,ctrl:k,print:W,del:O,pageup:g,pagedown:C,numlock:V,numpad_0:Q,numpad_1:J,numpad_2:x,numpad_3:t,numpad_4:K,numpad_5:U,numpad_6:F,numpad_7:N,numpad_8:T,numpad_9:I,numpad_divide:u,numpad_multiply:A,numpad_minus:h,numpad_plus:o},__ef:function(bd){var be=qx.event.handler.Keyboard;
var bf=q;

if(be.isValidKeyIdentifier(bd)){return bd;
}
if(bd.length==1&&bd>=B&&bd<=D){return bd.toUpperCase();
}bd=bd.toLowerCase();
var bf=this.__ee[bd]||qx.lang.String.firstUp(bd);

if(be.isValidKeyIdentifier(bf)){return bf;
}else{return q;
}},toString:function(){var f=this.__ea;
var d=[];

for(var c in this.__dY){if(this.__dY[c]){d.push(qx.locale.Key.getKeyName(n,c));
}}
if(f){d.push(qx.locale.Key.getKeyName(n,f));
}return d.join(o);
}},destruct:function(){this.setEnabled(false);
this._disposeFields(E,G);
}});
})();
(function(){var b="toolbar-separator",a="qx.ui.toolbar.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true},width:{refine:true,init:0},height:{refine:true,init:0}}});
})();
(function(){var g="feedreader.view.Header",f="Feed Reader",e="app-header",d="qx.version",c="qooxdoo ";
qx.Class.define(g,{extend:qx.ui.container.Composite,construct:function(){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.HBox);
this.setAppearance(e);
var b=new qx.ui.basic.Label(f);
var a=new qx.ui.basic.Label(c+qx.core.Setting.get(d));
this.add(b);
this.add(new qx.ui.core.Spacer,{flex:1});
this.add(a);
}});
})();
(function(){var l="opened",k="click",j="mousedown",i="Boolean",h="qx.ui.tree.FolderOpenButton",g="_applyOpen",f="mouseup",d="Space",c="keypress",b="changeOpen",a="Enter";
qx.Class.define(h,{extend:qx.ui.basic.Image,include:qx.ui.core.MExecutable,construct:function(){arguments.callee.base.call(this);
this.initOpen();
this.addListener(c,this._onKeyPress);
this.addListener(k,this._onClick);
this.addListener(j,this._stopPropagation,this);
this.addListener(f,this._stopPropagation,this);
},properties:{open:{check:i,init:false,event:b,apply:g}},members:{_applyOpen:function(m,n){m?this.addState(l):this.removeState(l);
this.execute();
},_onKeyPress:function(e){switch(e.getKeyIdentifier()){case a:case d:this.toggleOpen();
e.stopPropagation();
}},_stopPropagation:function(e){e.stopPropagation();
},_onClick:function(e){this.toggleOpen();
e.stopPropagation();
}}});
})();
(function(){var k="right",j="above",h="left",g="under",f="qx.ui.tree.SelectionManager";
qx.Class.define(f,{extend:qx.ui.core.selection.ScrollArea,members:{_getSelectableLocationY:function(p){var q=p.getBounds();

if(q){var top=this._getWidget().getItemTop(p);
return {top:top,bottom:top+q.height};
}},_isSelectable:function(o){return o instanceof qx.ui.tree.AbstractTreeItem&&o.isEnabled()&&o.isVisible();
},_getSelectableFromMouseEvent:function(event){return this._getWidget().getTreeItem(event.getTarget());
},getSelectables:function(){var m=this._getWidget();
var n=[];

if(m.getRoot()!=null){var l=m.getRoot().getItems(true,false,m.getHideRoot());

for(var i=0;i<l.length;i++){if(this._isSelectable(l[i])){n.push(l[i]);
}}}return n;
},_getSelectableRange:function(a,b){if(a===b){return [a];
}var c=this.getSelectables();
var d=c.indexOf(a);
var e=c.indexOf(b);

if(d<0||e<0){return [];
}
if(d<e){return c.slice(d,e+1);
}else{return c.slice(e,d+1);
}},_getFirstSelectable:function(){return this.getSelectables()[0]||null;
},_getLastSelectable:function(){var r=this.getSelectables();

if(r.length>0){return r[r.length-1];
}else{return null;
}},_getRelatedSelectable:function(s,t){var u=this._getWidget();
var v=null;

switch(t){case j:v=u.getPreviousSiblingOf(s,false);
break;
case g:v=u.getNextSiblingOf(s,false);
break;
case h:if(s.isOpenable()&&s.isOpen()){s.setOpen(false);
}break;
case k:if(s.isOpenable()&&!s.isOpen()){s.setOpen(true);
}break;
}
if(!v){return null;
}
if(this._isSelectable(v)){return v;
}else{return this._getRelatedSelectable(v,t);
}}}});
})();
(function(){var o="static",n="user",m="execute",l="loading",k="change",j="title",h="north",g="main",f="new",d="Surfin' Safari",bt="separator-vertical",bs="selection[0].state",br="Heise",bq="F1",bp="__eA",bo="article",bn="partLoaded",bm="Control+A",bl="__er",bk="http://blogs.msdn.com/ie/rss.xml",v="http://my.opera.com/desktopteam/xml/rss/blog/",w="settings",t="feedreader/images/loading22.gif",u="error",r="selection[0]",s="http://blogs.msdn.com/jscript/rss.xml",p="__eq",q="__en",D="__es",E="loaded",P="__ew",M="feeds",X="__ep",S="The Mozilla Blog",bg="enabled",bd="__em",I="http://webkit.org/blog/feed/",bj="__eu",bi="http://feeds2.feedburner.com/qooxdoo/news/content",bh="http://blog.mozilla.com/feed/",H="add",K="vertical",L="http://www.heise.de/newsticker/heise-atom.xml",O="state",Q="JScript Team Blog",T="Feeds",ba="http://feeds2.feedburner.com/ajaxian",bf="Control+D",x="icon/22/actions/process-stop.png",y="selection[0].articles",J="white",W="IEBlog",V="Ajaxian",U="User Feeds",bc="icon/22/apps/internet-feed-reader.png",bb="model",R="feedreader.Application",Y="__eo",a="Control+P",be="Static Feeds",z="Control+R",A="qooxdoo News",N="selection[0].category",b="__ey",c="Opera Desktop Blog",G="feedreader.model.Feed",B="__ez",C="__et",F="addfeed";
qx.Class.define(R,{extend:qx.application.Standalone,members:{__em:null,__en:null,__eo:null,__ep:null,__eq:null,__er:null,__es:null,__et:null,__eu:null,__ev:null,__ew:null,__ex:null,__ey:null,__ez:null,__eA:null,main:function(){arguments.callee.base.call(this);
{};
qx.io2.PartLoader.getInstance().addListener(bn,function(e){this.debug("part loaded: "+e.getData().getName());
},this);
this._initializeCommands();
this._createLayout();
this._initializeModel();
this._setUpBinding();
this.__ep.getRoot().setOpen(true);
this.__ep.getRoot().getChildren()[0].setOpen(true);
this.__ep.getRoot().getChildren()[1].setOpen(true);
this.__ep.setHideRoot(true);
},finalize:function(){arguments.callee.base.call(this);
this.reload();
},_initializeModel:function(){this.__ey=new feedreader.model.FeedFolder(T);
this.__eA=new feedreader.model.FeedFolder(this.tr(be));
this.__ey.getFeeds().push(this.__eA);
this.__eA.getFeeds().push(new feedreader.model.Feed(A,bi,o));
this.__eA.getFeeds().push(new feedreader.model.Feed(Q,s,o));
this.__eA.getFeeds().push(new feedreader.model.Feed(d,I,o));
this.__eA.getFeeds().push(new feedreader.model.Feed(V,ba,o));
this.__ez=new feedreader.model.FeedFolder(this.tr(U));
this.__ey.getFeeds().push(this.__ez);
this.__ez.getFeeds().push(new feedreader.model.Feed(br,L,n));
this.__ez.getFeeds().push(new feedreader.model.Feed(W,bk,n));
this.__ez.getFeeds().push(new feedreader.model.Feed(S,bh,n));
this.__ez.getFeeds().push(new feedreader.model.Feed(c,v,n));
},_setUpBinding:function(){var bO={converter:this._state2iconConverter};
this.__em=new qx.data.controller.Tree(this.__ey,this.__ep,M,j);
this.__em.setIconOptions(bO);
this.__em.setIconPath(O);
this.__en=new qx.data.controller.List(null,this.__es.getList(),j);
this.__em.bind(y,this.__en,bb);
this.__en.bind(r,this.__ew,bo);
this.__en.getSelection().addListener(k,this._listControllerChange,this);
this.__em.getSelection().addListener(k,this._treeControllerChange,this);
var bP={converter:this._state2loadingConverter};
this.__em.bind(bs,this.__es,l,bP);
bP={converter:this._category2enabledConverter};
this.__em.bind(N,this.__er.getRemoveButton(),bg,bP);
},_category2enabledConverter:function(bB){if(bB==n){return true;
}return false;
},_state2iconConverter:function(bG){if(bG==f||bG==l){return t;
}else if(bG==E){return bc;
}else if(bG==u){return x;
}return null;
},_state2loadingConverter:function(bA){if(bA==f||bA==l){return true;
}return false;
},_listControllerChange:function(bw){var bx=this.__em.getSelection().getItem(0);
var by=this.__en.getSelection().getItem(0);
if(by!=undefined){bx.setSelectedArticle(by);
}},_treeControllerChange:function(bH){if(bH.getData().type!=H){return;
}var bI=this.__em.getSelection().getItem(0);
if(bI!=null&&bI.classname==G&&bI.getSelectedArticle()!=null&&bI.getArticles().contains(bI.getSelectedArticle())){this.__en.getSelection().push(bI.getSelectedArticle());
}else{this.__es.getList().scrollToY(0);
}},_createLayout:function(){var bD=new qx.ui.layout.Dock();
bD.setSeparatorY(bt);
var bE=new qx.ui.container.Composite(bD);
this.getRoot().add(bE,{edge:0});
this.__eq=new feedreader.view.Header();
bE.add(this.__eq,{edge:h});
this.__er=new feedreader.view.ToolBar(this);
bE.add(this.__er,{edge:h});
this.__et=new qx.ui.splitpane.Pane();
bE.add(this.__et);
this.__ep=new qx.ui.tree.Tree();
this.__ep.setWidth(250);
this.__ep.setBackgroundColor(J);
this.__et.add(this.__ep,0);
this.__eu=new qx.ui.splitpane.Pane(K);
this.__eu.setDecorator(null);
this.__et.add(this.__eu,1);
this.__es=new feedreader.view.List(this.__ey);
this.__es.setHeight(200);
this.__es.setDecorator(g);
this.__eu.add(this.__es,0);
this.__ew=new feedreader.view.Article();
this.__ew.setDecorator(g);
this.__eu.add(this.__ew,1);
},_initializeCommands:function(){var bC={};
bC.reload=new qx.ui.core.Command(z);
bC.reload.addListener(m,this.reload,this);
bC.about=new qx.ui.core.Command(bq);
bC.about.addListener(m,this.showAbout,this);
bC.preferences=new qx.ui.core.Command(a);
bC.preferences.addListener(m,this.showPreferences,this);
bC.addFeed=new qx.ui.core.Command(bm);
bC.addFeed.addListener(m,this.showAddFeed,this);
bC.removeFeed=new qx.ui.core.Command(bf);
bC.removeFeed.addListener(m,this.removeFeed,this);
this.__eo=bC;
},getCommand:function(bF){return this.__eo[bF];
},addFeed:function(bJ,bK,bL){var bM=new feedreader.model.Feed(bJ,bK,bL);
this.__ez.getFeeds().push(bM);
var bN=feedreader.io.FeedLoader.getInstance();
bN.load(bM);
},removeFeed:function(){var bu=this.__em.getSelection().getItem(0);
if(bu&&bu.getCategory&&bu.getCategory()!==o){var bv=this.__ez.getFeeds();
for(var i=0;i<bv.length;i++){if(bu===bv.getItem(i)){bv.splice(i,1);
return;
}}}},reload:function(){var bz=feedreader.io.FeedLoader.getInstance();
bz.loadAll(this.__ey);
},showPreferences:function(){qx.io2.PartLoader.require([w],function(){if(!this.__ev){this.__ev=new feedreader.view.PreferenceWindow();
this.getRoot().add(this.__ev);
this.showPreferences();
}this.__ev.center();
this.__ev.open();
},this);
},showAbout:function(){alert(this.tr("FeedReader (qooxdoo powered)"));
},showAddFeed:function(){qx.io2.PartLoader.require([F],function(){if(!this.__ex){this.__ex=new feedreader.view.AddFeedWindow(this);
this.getRoot().add(this.__ex);
}this.__ex.center();
this.__ex.open();
},this);
}},destruct:function(){this._disposeFields(Y);
this._disposeObjects(bl,D,P,X,b,C,bj,p,bp,B,bd,q);
}});
})();
(function(){var p="horizontal",o="px",n="scroll",m="vertical",l="-1px",k="qx.client",j="0",i="hidden",h="mousedown",g="qx.ui.core.scroll.NativeScrollBar",E="PositiveNumber",D="Integer",C="__eC",B="mousemove",A="_applyMaximum",z="_applyOrientation",y="appear",x="opera",w="PositiveInteger",v="mshtml",t="mouseup",u="Number",r="_applyPosition",s="scrollbar",q="native";
qx.Class.define(g,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(T){arguments.callee.base.call(this);
this.addState(q);
this.getContentElement().addListener(n,this._onScroll,this);
this.addListener(h,this._stopPropagation,this);
this.addListener(t,this._stopPropagation,this);
this.addListener(B,this._stopPropagation,this);

if(qx.core.Variant.isSet(k,x)){this.addListener(y,this._onAppear,this);
}this.getContentElement().add(this._getScrollPaneElement());
if(T!=null){this.setOrientation(T);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:s},orientation:{check:[p,m],init:p,apply:z},maximum:{check:w,apply:A,init:100},position:{check:u,init:0,apply:r,event:n},singleStep:{check:D,init:20},knobFactor:{check:E,nullable:true}},members:{__eB:null,__eC:null,_getScrollPaneElement:function(){if(!this.__eC){this.__eC=new qx.html.Element();
}return this.__eC;
},renderLayout:function(P,top,Q,R){var S=arguments.callee.base.call(this,P,top,Q,R);
this._updateScrollBar();
return S;
},_getContentHint:function(){var G=qx.bom.element.Overflow.getScrollbarWidth();
return {width:this.__eB?100:G,maxWidth:this.__eB?null:G,minWidth:this.__eB?null:G,height:this.__eB?G:100,maxHeight:this.__eB?G:null,minHeight:this.__eB?G:null};
},_applyEnabled:function(I,J){arguments.callee.base.call(this,I,J);
this._updateScrollBar();
},_applyMaximum:function(F){this._updateScrollBar();
},_applyPosition:function(O){var content=this.getContentElement();

if(this.__eB){content.scrollToX(O);
}else{content.scrollToY(O);
}},_applyOrientation:function(U,V){var W=this.__eB=U===p;
this.set({allowGrowX:W,allowShrinkX:W,allowGrowY:!W,allowShrinkY:!W});

if(W){this.replaceState(m,p);
}else{this.replaceState(p,m);
}this.getContentElement().setStyles({overflowX:W?n:i,overflowY:W?i:n});
qx.ui.core.queue.Layout.add(this);
},_updateScrollBar:function(){var L=this.__eB;
var M=this.getBounds();

if(!M){return;
}
if(this.isEnabled()){var N=L?M.width:M.height;
var K=this.getMaximum()+N;
}else{K=0;
}if(qx.core.Variant.isSet(k,v)){var M=this.getBounds();
this.getContentElement().setStyles({left:L?j:l,top:L?l:j,width:(L?M.width:M.width+1)+o,height:(L?M.height+1:M.height)+o});
}this._getScrollPaneElement().setStyles({left:0,top:0,width:(L?K:1)+o,height:(L?1:K)+o});
this.scrollTo(this.getPosition());
},scrollTo:function(H){this.setPosition(H);
},scrollBy:function(c){this.scrollTo(this.getPosition()+c);
},scrollBySteps:function(d){var f=this.getSingleStep();
this.scrollBy(d*f);
},_onScroll:function(e){var b=this.getContentElement();
var a=this.__eB?b.getScrollX():b.getScrollY();
this.setPosition(a);
},_onAppear:function(e){this.scrollTo(this.getPosition());
},_stopPropagation:function(e){e.stopPropagation();
}},destruct:function(){this._disposeObjects(C);
}});
})();
(function(){var w="change",v="BindingId",u="String",t="changeModel",s="_applyLabelOptions",r="_applyLabelPath",q="changeTarget",p="changeLength",o="_applyModel",n="__eF",L="__eD",K="icon",J="qx.data.controller.List",I="_applyIconPath",H="_applyDelegate",G="",F="changeDelegate",E="_applyTarget",D="]",C="qx.data.IListData",A="model[",B="label",y="__eE",z="_applyIconOptions",x=".";
qx.Class.define(J,{extend:qx.core.Object,include:qx.data.controller.MSelection,construct:function(X,Y,ba){arguments.callee.base.call(this);
this.__eD=[];
this.__eE=[];
this.__eF={};

if(ba!=null){this.setLabelPath(ba);
}
if(X!=null){this.setModel(X);
}
if(Y!=null){this.setTarget(Y);
}},properties:{model:{check:C,apply:o,event:t,nullable:true},target:{apply:E,event:q,nullable:true,init:null},labelPath:{check:u,apply:r,nullable:true},iconPath:{check:u,apply:I,nullable:true},labelOptions:{apply:s,nullable:true},iconOptions:{apply:z,nullable:true},delegate:{apply:H,event:F,init:null,nullable:true}},members:{__eG:null,__eH:null,__eD:null,__eF:null,__eE:null,update:function(){this.__eJ();
this.__eN();
this._updateSelection();
},_applyDelegate:function(M,N){this._setConfigureItem(M,N);
this._setFilter(M,N);
this._setCreateItem(M,N);
this._setBindItem(M,N);
},_applyIconOptions:function(g,h){this.__eN();
},_applyLabelOptions:function(by,bz){this.__eN();
},_applyIconPath:function(bp,bq){this.__eN();
},_applyLabelPath:function(k,m){this.__eN();
},_applyModel:function(bj,bk){if(bk!=undefined){if(this.__eG!=undefined){bk.removeListenerById(this.__eG);
}
if(this.__eH!=undefined){bk.removeListenerById(this.__eH);
}}if(bj!=null){this.__eG=bj.addListener(p,this.__eJ,this);
this.__eH=bj.addListener(w,this.__eI,this);
this.__eP();
this.__eJ();
if(this.getTarget()!=null){var bm=this.getModel();
var bn=this.getTarget().getChildren();

for(var i=0,l=this.__eD.length;i<l;i++){var bo=bm.getItem(this.__eQ(i));
var bl=bn[i];
bl.setModel(bo);
}}}if(this.getSelection()!=undefined&&this.getSelection().length>0){this.getSelection().splice(0,this.getSelection().length);
}},_applyTarget:function(bK,bL){if(bL!=undefined){bL.removeAll();
this.removeAllBindings();
}
if(bK!=null){if(this.getModel()!=null){for(var i=0;i<this.__eD.length;i++){this.__eL(this.__eQ(i));
}}this._addChangeTargetListener(bK,bL);
}},__eI:function(){for(var i=this.getSelection().length-1;i>=0;i--){if(!this.getModel().contains(this.getSelection().getItem(i))){this.getSelection().splice(i,1);
}}qx.ui.core.queue.Widget.add(this);
if(this.__eD.length!=this.getModel().getLength()){this.update();
}},syncWidget:function(){this._updateSelection();
},__eJ:function(){if(this.getTarget()==null){return;
}this.__eP();
var bs=this.__eD.length;
var br=this.getTarget().getChildren().length;
if(bs>br){for(var j=br;j<bs;j++){this.__eL(this.__eQ(j));
}}else if(bs<br){for(var j=br;j>bs;j--){this.__eM();
}}},__eK:function(){var bM=this.getModel();
if(bM!=null){bM.removeListenerById(this.__eH);
this.__eH=bM.addListener(w,this.__eI,this);
}},_createItem:function(){var bx=this.getDelegate();
if(bx!=null&&bx.createItem!=null){var bw=bx.createItem();
}else{var bw=new qx.ui.form.ListItem();
}if(bx!=null&&bx.configureItem!=null){bx.configureItem(bw);
}return bw;
},__eL:function(a){var b=this._createItem();
b.setModel(this.getModel().getItem(this.__eQ(a))||null);
this._bindListItem(b,a);
this.getTarget().add(b);
},__eM:function(){this._startSelectionModification();
var bS=this.getTarget().getChildren();
var bR=bS.length-1;
var bT=bS[bR];
this._removeBindingsFrom(bT);
this.getTarget().removeAt(bR);
bT.destroy();
this._endSelectionModification();
},getVisibleModels:function(){var bg=[];
var bh=this.getTarget();

if(bh!=null){var bi=bh.getChildren();

for(var i=0;i<bi.length;i++){bg.push(bi[i].getModel());
}}return new qx.data.Array(bg);
},_bindListItem:function(bd,be){var bf=this.getDelegate();
if(bf!=null&&bf.bindItem!=null){bf.bindItem(this,bd,be);
}else{this.bindProperty(this.getLabelPath(),B,this.getLabelOptions(),bd,be);
if(this.getIconPath()!=null){this.bindProperty(this.getIconPath(),K,this.getIconOptions(),bd,be);
}}},bindProperty:function(bA,bB,bC,bD,bE){bD.setModel(this.getModel().getItem(bE));
if(bC!=null){var bC=qx.lang.Object.clone(bC);
this.__eF[bB]=bC.onUpdate;
delete bC.onUpdate;
}else{bC={};
this.__eF[bB]=null;
}bC.onUpdate=qx.lang.Function.bind(this._onBindingSet,this,bE);
var bF=A+bE+D;

if(bA!=null&&bA!=G){bF+=x+bA;
}var bG=this.bind(bF,bD,bB,bC);
bD.setUserData(bB+v,bG);
if(!qx.lang.Array.contains(this.__eE,bB)){this.__eE.push(bB);
}},_onBindingSet:function(c,d,e){if(this.getModel()==null||this._inSelectionModification()){return;
}for(var i=0;i<this.__eE.length;i++){if(this.__eF[this.__eE[i]]!=null){this.__eF[this.__eE[i]]();
}}var f=this.getModel().getItem(c);
e.setModel(f==undefined?null:f);
},_removeBindingsFrom:function(V){for(var i=0;i<this.__eE.length;i++){var W=V.getUserData(this.__eE[i]+v);

if(W!=null){this.removeBinding(W);
}}},__eN:function(){if(this.getTarget()==null){return;
}var bN=this.getTarget().getChildren();
for(var i=0;i<bN.length;i++){this._removeBindingsFrom(bN[i]);
this._bindListItem(bN[i],this.__eQ(i));
}this.__eK();
},_setConfigureItem:function(bt,bu){if(bt!=null&&bt.configureItem!=null&&this.getTarget()!=null){var bv=this.getTarget().getChildren();

for(var i=0;i<bv.length;i++){bt.configureItem(bv[i]);
}}},_setBindItem:function(bb,bc){if(bb!=null&&bb.bindItem!=null){if(bc!=null&&bc.bindItem!=null&&bb.bindItem==bc.bindItem){return;
}this.__eN();
}},_setCreateItem:function(bH,bI){if(this.getTarget()==null||this.getModel()==null||bH==null||bH.createItem==null){return;
}this._startSelectionModification();
var bJ=this.getTarget().getChildren();

for(var i=0,l=bJ.length;i<l;i++){this._removeBindingsFrom(bJ[i]);
}this.getTarget().removeAll();
this.update();
this._endSelectionModification();
this._updateSelection();
},_setFilter:function(P,Q){if((P==null||P.filter==null)&&(Q!=null&&Q.filter!=null)){this.__eO();
}if(this.getTarget()==null||this.getModel()==null||P==null||P.filter==null){return;
}this._startSelectionModification();
var U=this.getTarget().getChildren();

for(var i=0,l=U.length;i<l;i++){this._removeBindingsFrom(U[i]);
}var S=this.__eD;
this.__eP();
if(S.length>this.__eD.length){for(var j=S.length;j>this.__eD.length;j--){this.getTarget().removeAt(j-1);
}}else if(S.length<this.__eD.length){for(var j=S.length;j<this.__eD.length;j++){var T=this._createItem();
this.getTarget().add(T);
}}var R=this.getTarget().getChildren();

for(var i=0;i<R.length;i++){this._bindListItem(R[i],this.__eQ(i));
}this.__eK();
this._endSelectionModification();
this._updateSelection();
},__eO:function(){this.__eP();
this.__eJ();
this.__eN();
qx.ui.core.queue.Widget.add(this);
},__eP:function(){var bP=this.getModel();

if(bP==null){return;
}var bQ=this.getDelegate();

if(bQ!=null){var bO=bQ.filter;
}this.__eD=[];

for(var i=0;i<bP.getLength();i++){if(bO==null||bO(bP.getItem(i))){this.__eD.push(i);
}}},__eQ:function(O){return this.__eD[O];
}},destruct:function(){this._disposeFields(L,n,y);
}});
})();
(function(){var y="qx.client",x="head",w="text/css",v="stylesheet",u="}",t='@import "',s="{",r='";',q="qx.bom.Stylesheet",p="link",o="style";
qx.Class.define(q,{statics:{includeFile:function(T,U){if(!U){U=document;
}var V=U.createElement(p);
V.type=w;
V.rel=v;
V.href=qx.util.ResourceManager.getInstance().toUri(T);
var W=U.getElementsByTagName(x)[0];
W.appendChild(V);
},createElement:qx.core.Variant.select(y,{"mshtml":function(D){var E=document.createStyleSheet();

if(D){E.cssText=D;
}return E;
},"default":function(I){var J=document.createElement(o);
J.type=w;

if(I){J.appendChild(document.createTextNode(I));
}document.getElementsByTagName(x)[0].appendChild(J);
return J.sheet;
}}),addRule:qx.core.Variant.select(y,{"mshtml":function(a,b,c){a.addRule(b,c);
},"default":function(K,L,M){K.insertRule(L+s+M+u,K.cssRules.length);
}}),removeRule:qx.core.Variant.select(y,{"mshtml":function(X,Y){var ba=X.rules;
var bb=ba.length;

for(var i=bb-1;i>=0;--i){if(ba[i].selectorText==Y){X.removeRule(i);
}}},"default":function(f,g){var h=f.cssRules;
var j=h.length;

for(var i=j-1;i>=0;--i){if(h[i].selectorText==g){f.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(y,{"mshtml":function(N){var O=N.rules;
var P=O.length;

for(var i=P-1;i>=0;i--){N.removeRule(i);
}},"default":function(F){var G=F.cssRules;
var H=G.length;

for(var i=H-1;i>=0;i--){F.deleteRule(i);
}}}),addImport:qx.core.Variant.select(y,{"mshtml":function(d,e){d.addImport(e);
},"default":function(bc,bd){bc.insertRule(t+bd+r,bc.cssRules.length);
}}),removeImport:qx.core.Variant.select(y,{"mshtml":function(z,A){var B=z.imports;
var C=B.length;

for(var i=C-1;i>=0;i--){if(B[i].href==A){z.removeImport(i);
}}},"default":function(k,l){var m=k.cssRules;
var n=m.length;

for(var i=n-1;i>=0;i--){if(m[i].href==l){k.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(y,{"mshtml":function(Q){var R=Q.imports;
var S=R.length;

for(var i=S-1;i>=0;i--){Q.removeImport(i);
}},"default":function(be){var bf=be.cssRules;
var bg=bf.length;

for(var i=bg-1;i>=0;i--){if(bf[i].type==bf[i].IMPORT_RULE){be.deleteRule(i);
}}}})}});
})();
(function(){var e="Integer",d="interval",c="qx.event.type.Event",b="qx.event.AcceleratingTimer",a="__eR";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__eR=new qx.event.Timer(this.getInterval());
this.__eR.addListener(d,this._onInterval,this);
},events:{"interval":c},properties:{interval:{check:e,init:100},firstInterval:{check:e,init:500},minimum:{check:e,init:20},decrease:{check:e,init:2}},members:{__eR:null,__eS:null,start:function(){this.__eR.setInterval(this.getFirstInterval());
this.__eR.start();
},stop:function(){this.__eR.stop();
this.__eS=null;
},_onInterval:function(){this.__eR.stop();

if(this.__eS==null){this.__eS=this.getInterval();
}this.__eS=Math.max(this.getMinimum(),this.__eS-this.getDecrease());
this.__eR.setInterval(this.__eS);
this.__eR.start();
this.fireEvent(d);
}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var s="100%",r="dblclick",q="mshtml",p="mouseup",o="mousedown",n="contextmenu",m="mousewheel",l=")",k="mouseover",j="mouseout",c="qx.html.Blocker",i="click",g="repeat",b="mousemove",a="url(",f="qx.client",d="qx/static/blank.gif",h="absolute";
qx.Class.define(c,{extend:qx.html.Element,construct:function(t,u){arguments.callee.base.call(this);
var t=t?qx.theme.manager.Color.getInstance().resolve(t):null;
this.setStyles({position:h,width:s,height:s,opacity:u||0,backgroundColor:t});
this.addListener(o,this._stopPropagation,this);
this.addListener(p,this._stopPropagation,this);
this.addListener(i,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(b,this._stopPropagation,this);
this.addListener(k,this._stopPropagation,this);
this.addListener(j,this._stopPropagation,this);
this.addListener(m,this._stopPropagation,this);
this.addListener(n,this._stopPropagation,this);
if(qx.core.Variant.isSet(f,q)){this.setStyles({backgroundImage:a+qx.util.ResourceManager.getInstance().toUri(d)+l,backgroundRepeat:g});
}},members:{_stopPropagation:function(e){e.stopPropagation();
}}});
})();
(function(){var k="both",j="qx.ui.menu.Menu",h="_applySpacing",g="icon",f="label",e="changeShow",d="Integer",c="qx.ui.toolbar.ToolBar",b="toolbar",a="changeOpenMenu";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:qx.ui.core.MChildrenHandling,construct:function(){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.HBox());
},properties:{appearance:{refine:true,init:b},openMenu:{check:j,event:a,nullable:true},show:{init:k,check:[k,f,g],inheritable:true,event:e},spacing:{nullable:true,check:d,themeable:true,apply:h}},members:{__eV:false,_setAllowMenuOpenHover:function(t){this.__eV=t;
},_isAllowMenuOpenHover:function(){return this.__eV;
},_applySpacing:function(q,r){var s=this._getLayout();
q==null?s.resetSpacing():s.setSpacing(q);
},addSpacer:function(){var p=new qx.ui.core.Spacer;
this._add(p,{flex:1});
return p;
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var n=this.getChildren();
var m=[];
var o;

for(var i=0,l=n.length;i<l;i++){o=n[i];

if(o instanceof qx.ui.menubar.Button){m.push(o);
}else if(o instanceof qx.ui.toolbar.Part){m.push.apply(m,o.getMenuButtons());
}}return m;
}}});
})();
(function(){var u="reload",t="Add feed",s="removeFeed",r="Open preferences window.",q="Reload",p="Reload the feeds. (%1)",o="icon/22/actions/dialog-cancel.png",n="icon/22/actions/view-refresh.png",m=")",l="Remove feed",e="Preferences",k="icon/22/actions/dialog-ok.png",h="preferences",c="icon/22/apps/preferences-theme.png",b="icon/22/actions/help-about.png",g="__eT",f="feedreader.view.ToolBar",i="about",a="Help",j="addFeed",d="(";
qx.Class.define(f,{extend:qx.ui.toolbar.ToolBar,construct:function(v){arguments.callee.base.call(this);
var C=new qx.ui.toolbar.Part;
this.add(C);
var D=new qx.ui.toolbar.Button(this.tr(t),k);
D.setCommand(v.getCommand(j));
C.add(D);
this.__eT=new qx.ui.toolbar.Button(this.tr(l),o);
this.__eT.setCommand(v.getCommand(s));
this.__eT.setEnabled(false);
C.add(this.__eT);
C.addSeparator();
var y=new qx.ui.toolbar.Button(this.tr(q),n);
var z=v.getCommand(u);
y.setCommand(z);
y.setToolTipText(this.tr(p,z.toString()));
C.add(y);
C.addSeparator();
var x=new qx.ui.toolbar.Button(this.tr(e),c);
x.setCommand(v.getCommand(h));
x.setToolTipText(this.tr(r));
C.add(x);
this.addSpacer();
var B=new qx.ui.toolbar.Part;
this.add(B);
var A=new qx.ui.toolbar.Button(this.tr(a),b);
var w=v.getCommand(i);
A.setCommand(w);
A.setToolTipText(d+w.toString()+m);
B.add(A);
},members:{__eT:null,getRemoveButton:function(){return this.__eT;
}},destruct:function(){this._disposeObjects(g);
}});
})();
(function(){var m="changeLocale",l="qx.dynlocale",k="on",j="shortcut",i="",h="menu-button",g="qx.ui.menu.Button",f="changeCommand";
qx.Class.define(g,{extend:qx.ui.menu.AbstractButton,construct:function(n,o,p,q){arguments.callee.base.call(this);
this.addListener(f,this._onChangeCommand,this);
if(n!=null){this.setLabel(n);
}
if(o!=null){this.setIcon(o);
}
if(p!=null){this.setCommand(p);
}
if(q!=null){this.setMenu(q);
}},properties:{appearance:{refine:true,init:h}},members:{_onChangeCommand:function(e){var d=e.getData();

if(qx.core.Variant.isSet(l,k)){var b=e.getOldData();

if(!b){qx.locale.Manager.getInstance().addListener(m,this._onChangeLocale,this);
}
if(!d){qx.locale.Manager.getInstance().removeListener(m,this._onChangeLocale,this);
}}var c=d!=null?d.toString():i;
this.getChildControl(j).setValue(c);
},_onChangeLocale:qx.core.Variant.select(l,{"on":function(e){var a=this.getCommand();

if(a!=null){this.getChildControl(j).setValue(a.toString());
}},"off":null}),_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
if(this.getMenu()){return;
}}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}},destruct:function(){if(qx.core.Variant.isSet(l,k)){qx.locale.Manager.getInstance().removeListener(m,this._onChangeLocale,this);
}}});
})();
(function(){var q="String",p="execute",o="qx.ui.menu.Menu",n="_shortcut",m="changeEnabled",l="changeToolTipText",k="Boolean",j="qx.ui.core.Command",i="changeLabel",h="changeMenu",e="changeIcon",g="changeValue",f="_applyShortcut",d="_applyEnabled",c="qx.event.type.Data";
qx.Class.define(j,{extend:qx.core.Object,construct:function(b){arguments.callee.base.call(this);
this._shortcut=new qx.bom.Shortcut(b);
this._shortcut.addListener(p,this.execute,this);
},events:{"execute":c},properties:{enabled:{init:true,check:k,event:m,apply:d},shortcut:{check:q,apply:f,nullable:true},label:{check:q,nullable:true,event:i},icon:{check:q,nullable:true,event:e},toolTipText:{check:q,nullable:true,event:l},value:{nullable:true,event:g},menu:{check:o,nullable:true,event:h}},members:{_shortcut:null,_applyEnabled:function(a){this._shortcut.setEnabled(a);
},_applyShortcut:function(r){this._shortcut.setShortcut(r);
},execute:function(s){this.fireDataEvent(p,s);
},toString:function(){return this._shortcut.toString();
}},destruct:function(){this._disposeObjects(n);
}});
})();
(function(){var f="both",e="toolbar/part/container",d="icon",c="changeShow",b="qx.ui.toolbar.PartContainer",a="label";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.HBox);
},properties:{appearance:{refine:true,init:e},show:{init:f,check:[f,a,d],inheritable:true,event:c}}});
})();
(function(){var m="Liberation Sans",l="Arial",k="Lucida Grande",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",d="monospace",a="Lucida Console",c="qx.theme.modern.Font",b="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l]},"bold":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l],bold:true},"small":{size:qx.bom.client.System.WINVISTA?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[a,e]:qx.bom.client.System.WINVISTA?[g]:[g,b,f,d]}}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var s="atom",r="Integer",q="String",p="_applyRich",o="qx.ui.tooltip.ToolTip",n="_applyIcon",m="tooltip",l="qx.ui.core.Widget",k="Boolean",j="_applyLabel";
qx.Class.define(o,{extend:qx.ui.popup.Popup,construct:function(v,w){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(s);
if(v!=null){this.setLabel(v);
}
if(w!=null){this.setIcon(w);
}},properties:{appearance:{refine:true,init:m},showTimeout:{check:r,init:700,themeable:true},hideTimeout:{check:r,init:4000,themeable:true},label:{check:q,nullable:true,apply:j},icon:{check:q,nullable:true,apply:n,themeable:true},rich:{check:k,init:false,apply:p},opener:{check:l,nullable:true}},members:{_createChildControlImpl:function(t){var u;

switch(t){case s:u=new qx.ui.basic.Atom;
this._add(u);
break;
}return u||arguments.callee.base.call(this,t);
},_applyIcon:function(d,e){var f=this.getChildControl(s);
d==null?f.resetIcon:f.setIcon(d);
},_applyLabel:function(g,h){var i=this.getChildControl(s);
g==null?i.resetLabel():i.setLabel(g);
},_applyRich:function(a,b){var c=this.getChildControl(s);
c.setRich(a);
}}});
})();
(function(){var d="Integer",c="_applyLayoutChange",b="qx.ui.menu.Layout",a="__eU";
qx.Class.define(b,{extend:qx.ui.layout.VBox,properties:{columnSpacing:{check:d,init:0,apply:c},spanColumn:{check:d,init:1,nullable:true,apply:c},iconColumnWidth:{check:d,init:0,themeable:true,apply:c},arrowColumnWidth:{check:d,init:0,themeable:true,apply:c}},members:{__eU:null,_computeSizeHint:function(){var r=this._getLayoutChildren();
var p,h,k;
var f=this.getSpanColumn();
var j=this.__eU=[0,0,0,0];
var n=this.getColumnSpacing();
var m=0;
var g=0;
for(var i=0,l=r.length;i<l;i++){p=r[i];

if(p.isAnonymous()){continue;
}h=p.getChildrenSizes();

for(var o=0;o<h.length;o++){if(f!=null&&o==f&&h[f+1]==0){m=Math.max(m,h[o]);
}else{j[o]=Math.max(j[o],h[o]);
}}var e=r[i].getInsets();
g=Math.max(g,e.left+e.right);
}if(f!=null&&j[f]+n+j[f+1]<m){j[f]=m-j[f+1]-n;
}if(m==0){k=n*2;
}else{k=n*3;
}if(j[0]==0){j[0]=this.getIconColumnWidth();
}if(j[3]==0){j[3]=this.getArrowColumnWidth();
}var q=arguments.callee.base.call(this).height;
return {minHeight:q,height:q,width:qx.lang.Array.sum(j)+g+k};
},getColumnSizes:function(){return this.__eU||null;
}},destruct:function(){this._disposeFields(a);
}});
})();
(function(){var A="_applyStyle",z="Color",y="px",x="solid",w="dotted",v="double",u="border:",t="dashed",s="",r="_applyWidth",l="qx.ui.decoration.Uniform",q="px ",o="__insets",k="position:absolute;top:0;left:0;",j=" ",n=";",m="__bE",p="scale",i="PositiveInteger";
qx.Class.define(l,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(F,G,H){arguments.callee.base.call(this);
if(F!=null){this.setWidth(F);
}
if(G!=null){this.setStyle(G);
}
if(H!=null){this.setColor(H);
}},properties:{width:{check:i,init:0,apply:r},style:{nullable:true,check:[x,w,t,v],init:x,apply:A},color:{nullable:true,check:z,apply:A},backgroundColor:{check:z,nullable:true,apply:A}},members:{__bE:null,_getDefaultInsets:function(){var I=this.getWidth();
return {top:I,right:I,bottom:I,left:I};
},_isInitialized:function(){return !!this.__bE;
},getMarkup:function(){if(this.__bE){return this.__bE;
}var B=k;
var C=this.getWidth();
{};
var E=qx.theme.manager.Color.getInstance();
B+=u+C+q+this.getStyle()+j+E.resolve(this.getColor())+n;
var D=this._generateBackgroundMarkup(B);
return this.__bE=D;
},resize:function(a,b,c){var e=this.getBackgroundImage()&&this.getBackgroundRepeat()==p;

if(e||qx.bom.client.Feature.CONTENT_BOX){var d=this.getWidth()*2;
b-=d;
c-=d;
if(b<0){b=0;
}
if(c<0){c=0;
}}a.style.width=b+y;
a.style.height=c+y;
},tint:function(f,g){var h=qx.theme.manager.Color.getInstance();

if(g==null){g=this.getBackgroundColor();
}f.style.backgroundColor=h.resolve(g)||s;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(m,o);
}});
})();
(function(){var m="_applyStyle",l='"></div>',k="Color",j='<div style="',i='border:',h="1px solid ",g="",f=";",e="px",d='</div>',z="qx.ui.decoration.Beveled",y="__insets",x='<div style="position:absolute;top:1px;left:1px;',w="__bJ",v='border-bottom:',u='border-right:',t="position:absolute;top:1px;left:1px;",s='border-left:',r='border-top:',q="Number",o='<div style="position:absolute;top:1px;left:0px;',p='position:absolute;top:0px;left:1px;',n='<div style="overflow:hidden;font-size:0;line-height:0;">';
qx.Class.define(z,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(A,B,C){arguments.callee.base.call(this);
if(A!=null){this.setOuterColor(A);
}
if(B!=null){this.setInnerColor(B);
}
if(C!=null){this.setInnerOpacity(C);
}},properties:{innerColor:{check:k,nullable:true,apply:m},innerOpacity:{check:q,init:1,apply:m},outerColor:{check:k,nullable:true,apply:m},backgroundColor:{check:k,nullable:true,apply:m}},members:{__bJ:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__bJ;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__bJ){return this.__bJ;
}var D=qx.theme.manager.Color.getInstance();
var E=[];
var G=h+D.resolve(this.getOuterColor())+f;
var F=h+D.resolve(this.getInnerColor())+f;
E.push(n);
E.push(j);
E.push(i,G);
E.push(qx.bom.element.Opacity.compile(0.35));
E.push(l);
E.push(o);
E.push(s,G);
E.push(u,G);
E.push(l);
E.push(j);
E.push(p);
E.push(r,G);
E.push(v,G);
E.push(l);
E.push(this._generateBackgroundMarkup(t));
E.push(x);
E.push(i,F);
E.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
E.push(l);
E.push(d);
return this.__bJ=E.join(g);
},resize:function(H,I,J){if(I<4){I=4;
}
if(J<4){J=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=I-2;
var outerHeight=J-2;
var P=outerWidth;
var O=outerHeight;
var innerWidth=I-4;
var innerHeight=J-4;
}else{var outerWidth=I;
var outerHeight=J;
var P=I-2;
var O=J-2;
var innerWidth=P;
var innerHeight=O;
}var R=e;
var N=H.childNodes[0].style;
N.width=outerWidth+R;
N.height=outerHeight+R;
var M=H.childNodes[1].style;
M.width=outerWidth+R;
M.height=O+R;
var L=H.childNodes[2].style;
L.width=P+R;
L.height=outerHeight+R;
var K=H.childNodes[3].style;
K.width=P+R;
K.height=O+R;
var Q=H.childNodes[4].style;
Q.width=innerWidth+R;
Q.height=innerHeight+R;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.childNodes[3].style.backgroundColor=c.resolve(b)||g;
}},destruct:function(){this._disposeFields(w,y);
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bp="decoration/table/header-cell.png",bo="decoration/form/input.png",bn="#f8f8f8",bm="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bl="#b6b6b6",bk="background-pane",bj="repeat-y",bi="decoration/form/input-focused.png",bh="border-input",bg="decoration/scrollbar/scrollbar-button-bg-vertical.png",t="decoration/tabview/tab-button-top-active.png",u="decoration/form/button-c.png",r="decoration/scrollbar/scrollbar-bg-vertical.png",s="decoration/form/button.png",p="decoration/form/button-checked.png",q="decoration/tabview/tab-button-left-inactive.png",n="decoration/groupbox/groupbox.png",o="#FAFAFA",A="decoration/pane/pane.png",B="decoration/menu/background.png",L="decoration/toolbar/toolbar-part.gif",I="decoration/tabview/tab-button-top-inactive.png",T="decoration/menu/bar-background.png",O="center",bc="decoration/tabview/tab-button-bottom-active.png",Y="decoration/form/button-hovered.png",E="decoration/form/tooltip-error-arrow.png",bf="decoration/window/captionbar-inactive.png",be="qx/decoration/Modern",bd="decoration/window/statusbar.png",D="border-focused",G="decoration/selection.png",H="table-focus-indicator",K="#F2F2F2",M="decoration/form/button-checked-c.png",P="decoration/scrollbar/scrollbar-bg-horizontal.png",V="qx.theme.modern.Decoration",bb="#f4f4f4",v="decoration/shadow/shadow-small.png",w="decoration/app-header.png",F="decoration/tabview/tabview-pane.png",S="decoration/form/tooltip-error.png",R="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",W="decoration/tabview/tab-button-right-active.png",N="decoration/form/button-pressed.png",U="no-repeat",a="decoration/window/captionbar-active.png",ba="decoration/tabview/tab-button-left-active.png",x="background-splitpane",y="decoration/form/button-checked-focused.png",J="#C5C5C5",b="decoration/toolbar/toolbar-gradient.png",c="decoration/tabview/tab-button-right-inactive.png",C="#b8b8b8",z="decoration/shadow/shadow.png";
qx.Theme.define(V,{aliases:{decoration:be},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:G,backgroundRepeat:l}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:A,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:n}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:S,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:E,backgroundPositionY:O,backgroundRepeat:U,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:z,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:v,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:P,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:r,backgroundRepeat:bj}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:R,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:Y,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:p,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:y,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:D,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:b,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:u,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:M,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:C,colorRight:bb,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:L,backgroundRepeat:bj}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:F,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:t}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:I}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bc}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:q}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:W}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:c}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bk,width:3,color:x,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bk,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:H,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthRight:1,colorRight:K,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:B,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:J,widthBottom:1,colorBottom:o}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:T,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:w,backgroundRepeat:l}}}});
})();
(function(){var b="qx.theme.Modern",a="Modern";
qx.Theme.define(b,{title:a,meta:{color:qx.theme.modern.Color,decoration:qx.theme.modern.Decoration,font:qx.theme.modern.Font,appearance:qx.theme.modern.Appearance,icon:qx.theme.icon.Tango}});
})();
(function(){var x="focusout",w="interval",v="mouseover",u="mouseout",t="mousemove",s="widget",r="__dv",q="qx.ui.tooltip.ToolTip",p="Boolean",o="__dt",k="_applyCurrent",n="__du",m="qx.ui.tooltip.Manager",j="tooltip-error",i="singleton",l="__ds";
qx.Class.define(m,{type:i,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,v,this.__dC,this,true);
this.__ds=new qx.event.Timer();
this.__ds.addListener(w,this.__dz,this);
this.__dt=new qx.event.Timer();
this.__dt.addListener(w,this.__dA,this);
this.__du={left:0,top:0};
},properties:{current:{check:q,nullable:true,apply:k},showInvalidTooltips:{check:p,init:true}},members:{__du:null,__dt:null,__ds:null,__dv:null,__dw:null,__dx:function(){if(!this.__dv){this.__dv=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dv;
},__dy:function(){if(!this.__dw){this.__dw=new qx.ui.tooltip.ToolTip().set({appearance:j});
this.__dw.syncAppearance();
}return this.__dw;
},_applyCurrent:function(z,A){if(A&&qx.ui.core.Widget.contains(A,z)){return;
}if(A){A.exclude();
this.__ds.stop();
this.__dt.stop();
}var C=qx.event.Registration;
var B=document.body;
if(z){this.__ds.startWith(z.getShowTimeout());
C.addListener(B,u,this.__dD,this,true);
C.addListener(B,x,this.__dE,this,true);
C.addListener(B,t,this.__dB,this,true);
}else{C.removeListener(B,u,this.__dD,this,true);
C.removeListener(B,x,this.__dE,this,true);
C.removeListener(B,t,this.__dB,this,true);
}},__dz:function(e){var y=this.getCurrent();

if(y){this.__dt.startWith(y.getHideTimeout());

if(y.getPlaceMethod()==s){y.placeToWidget(y.getOpener());
}else{y.placeToPoint(this.__du);
}y.show();
}this.__ds.stop();
},__dA:function(e){var a=this.getCurrent();

if(a){a.exclude();
}this.__dt.stop();
this.resetCurrent();
},__dB:function(e){var b=this.__du;
b.left=e.getDocumentLeft();
b.top=e.getDocumentTop();
},__dC:function(e){var f=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!f){return;
}var g;
while(f!=null){var g=f.getToolTip();
var h=f.getToolTipText()||null;
var d=f.getToolTipIcon()||null;

if(qx.Class.hasInterface(f.constructor,qx.ui.form.IForm)&&!f.isValid()){var c=f.getInvalidMessage();
}
if(g||h||d||c){break;
}f=f.getLayoutParent();
}
if(!f){return;
}
if(f.isBlockToolTip()){return;
}if(c&&f.getEnabled()){if(!this.getShowInvalidTooltips()){return;
}var g=this.__dy().set({label:c});
}else if(!g){var g=this.__dx().set({label:h,icon:d});
}this.setCurrent(g);
g.setOpener(f);
},__dD:function(e){var D=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!D){return;
}var E=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!E){return;
}var F=this.getCurrent();
if(F&&(E==F||qx.ui.core.Widget.contains(F,E))){return;
}if(E&&D&&qx.ui.core.Widget.contains(D,E)){return;
}if(F&&!E){this.setCurrent(null);
}else{this.resetCurrent();
}},__dE:function(e){var G=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!G){return;
}var H=this.getCurrent();
if(H&&H==G.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,v,this.__dC,this,true);
this._disposeObjects(l,o,r);
this._disposeFields(n);
}});
})();
(function(){var b="qx.util.format.IFormat";
qx.Interface.define(b,{members:{format:function(a){},parse:function(c){}}});
})();
(function(){var bA="(\\d\\d?)",bz="format",by="abbreviated",bx="",bw="wide",bv="(",bu=")",bt="|",bs="stand-alone",br="wildcard",bg="default",bf="literal",be="'",bd="hour",bc="(\\d\\d?\\d?)",bb="ms",ba="narrow",Y="-",X="quoted_literal",W='a',bH="HH:mm:ss",bI="+",bF="HHmmss",bG="long",bD='z',bE="sec",bB="day",bC='Z',bJ=" ",bK="min",bk="SSS",bj="h",bm="mm",bl='L',bo="Z",bn='K',bq="EEEE",bp="^",bi=":",bh='y',a="(\\d\\d(\\d\\d)?)",b="(\\d\\d)",c="__fE",d="K",e="a",f="GMT",g="dd",h="qx.util.format.DateFormat",j="([\\+\\-]\\d\\d:?\\d\\d)",k="__fB",bO="H",bN="YYYY",bM="HH",bL="EE",bS="__fC",bR='h',bQ="S",bP='s',bU='A',bT="KK",G="ss",H='H',E='S',F="__fD",K="0",L="MMMM",I='c',J="d",C="([a-zA-Z]+)",D='k',s="m",r='D',u="kk",t="hh",o="__fA",n="MM",q="yy",p="yyyy-MM-dd HH:mm:ss",m="short",l='d',Q="unkown",R='Y',S='m',T="(\\d\\d\\d\\d)",M="k",N='M',O="SS",P="MMM",U="s",V="M",B='w',A="EEE",z="$",y="?",x='E',w="z",v="yyyy";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(cV,cW){arguments.callee.base.call(this);

if(!cW){this.__fA=qx.locale.Manager.getInstance().getLocale();
}else{this.__fA=cW;
}
if(cV!=null){this.__fB=cV.toString();
}else{this.__fB=qx.locale.Date.getDateFormat(bG,this.__fA)+bJ+qx.locale.Date.getDateTimeFormat(bF,bH,this.__fA);
}},statics:{getDateTimeInstance:function(){var cf=qx.util.format.DateFormat;
var ce=qx.locale.Date.getDateFormat(bG)+bJ+qx.locale.Date.getDateTimeFormat(bF,bH);

if(cf._dateInstance==null||cf.__fB!=ce){cf._dateTimeInstance=new cf();
}return cf._dateTimeInstance;
},getDateInstance:function(){var dJ=qx.util.format.DateFormat;
var dI=qx.locale.Date.getDateFormat(m)+bx;

if(dJ._dateInstance==null||dJ.__fB!=dI){dJ._dateInstance=new dJ(dI);
}return dJ._dateInstance;
},ASSUME_YEAR_2000_THRESHOLD:30,LOGGING_DATE_TIME__format:p,AM_MARKER:"am",PM_MARKER:"pm",MEDIUM_TIMEZONE_NAMES:["GMT"],FULL_TIMEZONE_NAMES:["Greenwich Mean Time"]},members:{__fA:null,__fB:null,__fC:null,__fD:null,__fE:null,__fF:function(dD,dE){var dF=bx+dD;

while(dF.length<dE){dF=K+dF;
}return dF;
},__fG:function(dA){var dB=new Date(dA.getTime());
var dC=dB.getDate();

while(dB.getMonth()!=0){dB.setDate(-1);
dC+=dB.getDate()+1;
}return dC;
},__fH:function(dz){return new Date(dz.getTime()+(3-((dz.getDay()+6)%7))*86400000);
},__fI:function(dK){var dM=this.__fH(dK);
var dN=dM.getFullYear();
var dL=this.__fH(new Date(dN,0,4));
return Math.floor(1.5+(dM.getTime()-dL.getTime())/86400000/7);
},format:function(cB){if(cB==null){return null;
}var cH=qx.util.format.DateFormat;
var cI=this.__fA;
var cS=cB.getFullYear();
var cM=cB.getMonth();
var cU=cB.getDate();
var cC=cB.getDay();
var cN=cB.getHours();
var cJ=cB.getMinutes();
var cO=cB.getSeconds();
var cQ=cB.getMilliseconds();
var cT=cB.getTimezoneOffset();
var cF=cT>0?1:-1;
var cD=Math.floor(Math.abs(cT)/60);
var cK=Math.abs(cT)%60;
this.__fJ();
var cR=bx;

for(var i=0;i<this.__fE.length;i++){var cP=this.__fE[i];

if(cP.type==bf){cR+=cP.text;
}else{var cG=cP.character;
var cL=cP.size;
var cE=y;

switch(cG){case bh:case R:if(cL==2){cE=this.__fF(cS%100,2);
}else if(cL==4){cE=cS;
}break;
case r:cE=this.__fF(this.__fG(cB),cL);
break;
case l:cE=this.__fF(cU,cL);
break;
case B:cE=this.__fF(this.__fI(cB),cL);
break;
case x:if(cL==2){cE=qx.locale.Date.getDayName(ba,cC,cI,bz);
}else if(cL==3){cE=qx.locale.Date.getDayName(by,cC,cI,bz);
}else if(cL==4){cE=qx.locale.Date.getDayName(bw,cC,cI,bz);
}break;
case I:if(cL==2){cE=qx.locale.Date.getDayName(ba,cC,cI,bs);
}else if(cL==3){cE=qx.locale.Date.getDayName(by,cC,cI,bs);
}else if(cL==4){cE=qx.locale.Date.getDayName(bw,cC,cI,bs);
}break;
case N:if(cL==1||cL==2){cE=this.__fF(cM+1,cL);
}else if(cL==3){cE=qx.locale.Date.getMonthName(by,cM,cI,bz);
}else if(cL==4){cE=qx.locale.Date.getMonthName(bw,cM,cI,bz);
}break;
case bl:if(cL==1||cL==2){cE=this.__fF(cM+1,cL);
}else if(cL==3){cE=qx.locale.Date.getMonthName(by,cM,cI,bs);
}else if(cL==4){cE=qx.locale.Date.getMonthName(bw,cM,cI,bs);
}break;
case W:cE=(cN<12)?qx.locale.Date.getAmMarker(cI):qx.locale.Date.getPmMarker(cI);
break;
case H:cE=this.__fF(cN,cL);
break;
case D:cE=this.__fF((cN==0)?24:cN,cL);
break;
case bn:cE=this.__fF(cN%12,cL);
break;
case bR:cE=this.__fF(((cN%12)==0)?12:(cN%12),cL);
break;
case S:cE=this.__fF(cJ,cL);
break;
case bP:cE=this.__fF(cO,cL);
break;
case E:cE=this.__fF(cQ,cL);
break;
case bD:if(cL==1){cE=f+((cF>0)?Y:bI)+this.__fF(Math.abs(cD))+bi+this.__fF(cK,2);
}else if(cL==2){cE=cH.MEDIUM_TIMEZONE_NAMES[cD];
}else if(cL==3){cE=cH.FULL_TIMEZONE_NAMES[cD];
}break;
case bC:cE=((cF>0)?Y:bI)+this.__fF(Math.abs(cD),2)+this.__fF(cK,2);
break;
}cR+=cE;
}}return cR;
},parse:function(ds){this.__fK();
var dy=this.__fC.regex.exec(ds);

if(dy==null){throw new Error("Date string '"+ds+"' does not match the date format: "+this.__fB);
}var dt={year:1970,month:0,day:1,hour:0,ispm:false,min:0,sec:0,ms:0};
var du=1;

for(var i=0;i<this.__fC.usedRules.length;i++){var dw=this.__fC.usedRules[i];
var dv=dy[du];

if(dw.field!=null){dt[dw.field]=parseInt(dv,10);
}else{dw.manipulator(dt,dv);
}du+=(dw.groups==null)?1:dw.groups;
}var dx=new Date(dt.year,dt.month,dt.day,(dt.ispm)?(dt.hour+12):dt.hour,dt.min,dt.sec,dt.ms);

if(dt.month!=dx.getMonth()||dt.year!=dx.getFullYear()){throw new Error("Error parsing date '"+ds+"': the value for day or month is too large");
}return dx;
},__fJ:function(){if(this.__fE!=null){return;
}this.__fE=[];
var dU;
var dS=0;
var dW=bx;
var dQ=this.__fB;
var dT=bg;
var i=0;

while(i<dQ.length){var dV=dQ.charAt(i);

switch(dT){case X:if(dV==be){if(i+1>=dQ.length){i++;
break;
}var dR=dQ.charAt(i+1);

if(dR==be){dW+=dV;
i++;
}else{i++;
dT=Q;
}}else{dW+=dV;
i++;
}break;
case br:if(dV==dU){dS++;
i++;
}else{this.__fE.push({type:br,character:dU,size:dS});
dU=null;
dS=0;
dT=bg;
}break;
default:if((dV>=W&&dV<=bD)||(dV>=bU&&dV<=bC)){dU=dV;
dT=br;
}else if(dV==be){if(i+1>=dQ.length){dW+=dV;
i++;
break;
}var dR=dQ.charAt(i+1);

if(dR==be){dW+=dV;
i++;
}i++;
dT=X;
}else{dT=bg;
}
if(dT!=bg){if(dW.length>0){this.__fE.push({type:bf,text:dW});
dW=bx;
}}else{dW+=dV;
i++;
}break;
}}if(dU!=null){this.__fE.push({type:br,character:dU,size:dS});
}else if(dW.length>0){this.__fE.push({type:bf,text:dW});
}},__fK:function(){if(this.__fC!=null){return ;
}var dh=this.__fB;
this.__fL();
this.__fJ();
var dn=[];
var dj=bp;

for(var df=0;df<this.__fE.length;df++){var dp=this.__fE[df];

if(dp.type==bf){dj+=qx.lang.String.escapeRegexpChars(dp.text);
}else{var dg=dp.character;
var dk=dp.size;
var di;

for(var dq=0;dq<this.__fD.length;dq++){var dl=this.__fD[dq];

if(dg==dl.pattern.charAt(0)&&dk==dl.pattern.length){di=dl;
break;
}}if(di==null){var dm=bx;

for(var i=0;i<dk;i++){dm+=dg;
}throw new Error("Malformed date format: "+dh+". Wildcard "+dm+" is not supported");
}else{dn.push(di);
dj+=di.regex;
}}}dj+=z;
var de;

try{de=new RegExp(dj);
}catch(dr){throw new Error("Malformed date format: "+dh);
}this.__fC={regex:de,"usedRules":dn,pattern:dj};
},__fL:function(){var ck=qx.util.format.DateFormat;

if(this.__fD!=null){return ;
}this.__fD=[];
var cw=function(bV,bW){bW=parseInt(bW,10);

if(bW<ck.ASSUME_YEAR_2000_THRESHOLD){bW+=2000;
}else if(bW<100){bW+=1900;
}bV.year=bW;
};
var cm=function(cx,cy){cx.month=parseInt(cy,10)-1;
};
var cn=function(cc,cd){cc.ispm=(cd==ck.PM_MARKER);
};
var cr=function(cX,cY){cX.hour=parseInt(cY,10)%24;
};
var cl=function(cz,cA){cz.hour=parseInt(cA,10)%12;
};
var cu=function(dc,dd){return;
};
var cs=qx.locale.Date.getMonthNames(by,this.__fA,bz);

for(var i=0;i<cs.length;i++){cs[i]=qx.lang.String.escapeRegexpChars(cs[i].toString());
}var ct=function(ca,cb){cb=qx.lang.String.escapeRegexpChars(cb);
ca.month=cs.indexOf(cb);
};
var ch=qx.locale.Date.getMonthNames(bw,this.__fA,bz);

for(var i=0;i<ch.length;i++){ch[i]=qx.lang.String.escapeRegexpChars(ch[i].toString());
}var cg=function(da,db){db=qx.lang.String.escapeRegexpChars(db);
da.month=ch.indexOf(db);
};
var cj=qx.locale.Date.getDayNames(ba,this.__fA,bz);

for(var i=0;i<cj.length;i++){cj[i]=qx.lang.String.escapeRegexpChars(cj[i].toString());
}var cp=function(bX,bY){bY=qx.lang.String.escapeRegexpChars(bY);
bX.month=cj.indexOf(bY);
};
var cv=qx.locale.Date.getDayNames(by,this.__fA,bz);

for(var i=0;i<cv.length;i++){cv[i]=qx.lang.String.escapeRegexpChars(cv[i].toString());
}var co=function(dO,dP){dP=qx.lang.String.escapeRegexpChars(dP);
dO.month=cv.indexOf(dP);
};
var cq=qx.locale.Date.getDayNames(bw,this.__fA,bz);

for(var i=0;i<cq.length;i++){cq[i]=qx.lang.String.escapeRegexpChars(cq[i].toString());
}var ci=function(dG,dH){dH=qx.lang.String.escapeRegexpChars(dH);
dG.month=cq.indexOf(dH);
};
this.__fD.push({pattern:bN,regex:T,manipulator:cw});
this.__fD.push({pattern:v,regex:a,groups:2,manipulator:cw});
this.__fD.push({pattern:q,regex:b,manipulator:cw});
this.__fD.push({pattern:V,regex:bA,manipulator:cm});
this.__fD.push({pattern:n,regex:bA,manipulator:cm});
this.__fD.push({pattern:P,regex:bv+cs.join(bt)+bu,manipulator:ct});
this.__fD.push({pattern:L,regex:bv+ch.join(bt)+bu,manipulator:cg});
this.__fD.push({pattern:g,regex:bA,field:bB});
this.__fD.push({pattern:J,regex:bA,field:bB});
this.__fD.push({pattern:bL,regex:bv+cj.join(bt)+bu,manipulator:cp});
this.__fD.push({pattern:A,regex:bv+cv.join(bt)+bu,manipulator:co});
this.__fD.push({pattern:bq,regex:bv+cq.join(bt)+bu,manipulator:ci});
this.__fD.push({pattern:e,regex:bv+ck.AM_MARKER+bt+ck.PM_MARKER+bu,manipulator:cn});
this.__fD.push({pattern:bM,regex:bA,field:bd});
this.__fD.push({pattern:bO,regex:bA,field:bd});
this.__fD.push({pattern:u,regex:bA,manipulator:cr});
this.__fD.push({pattern:M,regex:bA,manipulator:cr});
this.__fD.push({pattern:bT,regex:bA,field:bd});
this.__fD.push({pattern:d,regex:bA,field:bd});
this.__fD.push({pattern:t,regex:bA,manipulator:cl});
this.__fD.push({pattern:bj,regex:bA,manipulator:cl});
this.__fD.push({pattern:bm,regex:bA,field:bK});
this.__fD.push({pattern:s,regex:bA,field:bK});
this.__fD.push({pattern:G,regex:bA,field:bE});
this.__fD.push({pattern:U,regex:bA,field:bE});
this.__fD.push({pattern:bk,regex:bc,field:bb});
this.__fD.push({pattern:O,regex:bc,field:bb});
this.__fD.push({pattern:bQ,regex:bc,field:bb});
this.__fD.push({pattern:bo,regex:j,manipulator:cu});
this.__fD.push({pattern:w,regex:C,manipulator:cu});
}},destruct:function(){this._disposeFields(k,o,c,bS,F);
}});
})();
(function(){var m="en_US",k="@attributes",j="feedreader.io.FeedParser",h="",g="yyyy-MM-d'T'HH:mm:ss'Z'",f="EEE, d MMM yyyy HH:mm:ss Z",e="EEE, d MMM yyyy HH:mm:ss z",d="yyyy-MM-d'T'HH:mm:ssZ";
qx.Class.define(j,{statics:{_rssDate1:new qx.util.format.DateFormat(f,m),_rssDate2:new qx.util.format.DateFormat(e,m),_atomDate1:new qx.util.format.DateFormat(g,m),_atomDate2:new qx.util.format.DateFormat(d,m),parseFeed:function(y){var z=[];

if(y){if(y.channel){z=this._normalizeRssFeed(y);
}else if(y.entry){z=this._normalizeAtomFeed(y);
}else{throw new Error("Unknown feed format!");
}}else{throw new Error("Invalid json: "+y);
}return z;
},_normalizeRssFeed:function(t){var u=[];

for(var i=0,a=t.channel.item,l=a.length;i<l;i++){var x=a[i];
var w=x.pubDate;

try{w=this._rssDate1.parse(w);
}catch(A){try{w=this._rssDate2.parse(w);
}catch(n){}}if(!(w instanceof Date)){throw new Error("RSS Date Error: "+w);
w=null;
}var v=new feedreader.model.Article();
v.set({title:x.title||null,author:h,date:w,content:x.description||null,link:x.link||null});
u.push(v);
}return u;
},_normalizeAtomFeed:function(o){var p=[];

for(var i=0,a=o.entry,l=a.length;i<l;i++){var s=a[i];
var r=s.updated||s.published||s.created;

try{r=this._atomDate1.parse(r);
}catch(b){try{r=this._atomDate2.parse(r);
}catch(c){}}if(!(r instanceof Date)){throw new Error("Atom Date Error: "+r);
r=null;
}var q=new feedreader.model.Article();
q.set({title:s.title||s.summary||null,author:s.author?s.author.name||null:null,date:r,content:s.content||s.summary||null,link:s.link[k]?s.link[k].href||null:null});
p.push(q);
}return p;
}}});
})();
(function(){var v="horizontal",u="scrollpane",t="vertical",s="button-backward",r="button-forward",q="content",p="execute",o="qx.ui.container.SlideBar",n="scrollY",m="removeChildWidget",i="scrollX",l="_applyOrientation",k="mousewheel",h="Integer",g="slidebar",j="update";
qx.Class.define(o,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling],construct:function(D){arguments.callee.base.call(this);
var E=this.getChildControl(u);
this._add(E,{flex:1});

if(D!=null){this.setOrientation(D);
}else{this.initOrientation();
}this.addListener(k,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:g},orientation:{check:[v,t],init:v,apply:l},scrollStep:{check:h,init:15,themeable:true}},members:{getChildrenContainer:function(){return this.getChildControl(q);
},_createChildControlImpl:function(y){var z;

switch(y){case r:z=new qx.ui.form.RepeatButton;
z.addListener(p,this._onExecuteForward,this);
z.setFocusable(false);
this._addAt(z,2);
break;
case s:z=new qx.ui.form.RepeatButton;
z.addListener(p,this._onExecuteBackward,this);
z.setFocusable(false);
this._addAt(z,0);
break;
case q:z=new qx.ui.container.Composite();
if(qx.bom.client.Engine.GECKO){z.addListener(m,this._onRemoveChild,this);
}this.getChildControl(u).add(z);
break;
case u:z=new qx.ui.core.scroll.ScrollPane();
z.addListener(j,this._onResize,this);
z.addListener(i,this._onScroll,this);
z.addListener(n,this._onScroll,this);
break;
}return z||arguments.callee.base.call(this,y);
},_forwardStates:{barLeft:true,barTop:true,barRight:true,barBottom:true},scrollBy:function(d){var f=this.getChildControl(u);

if(this.getOrientation()===v){f.scrollByX(d);
}else{f.scrollByY(d);
}},scrollTo:function(w){var x=this.getChildControl(u);

if(this.getOrientation()===v){x.scrollToX(w);
}else{x.scrollToY(w);
}},_applyOrientation:function(F,G){var J=[this.getLayout(),this._getLayout()];
var I=this.getChildControl(r);
var H=this.getChildControl(s);
if(G==t){I.removeState(t);
H.removeState(t);
I.addState(v);
H.addState(v);
}else if(G==v){I.removeState(v);
H.removeState(v);
I.addState(t);
H.addState(t);
}
if(F==v){this._setLayout(new qx.ui.layout.HBox());
this.setLayout(new qx.ui.layout.HBox());
}else{this._setLayout(new qx.ui.layout.VBox());
this.setLayout(new qx.ui.layout.VBox());
}
if(J[0]){J[0].dispose();
}
if(J[1]){J[1].dispose();
}},_onMouseWheel:function(e){this.scrollBy(e.getWheelDelta()*this.getScrollStep());
e.stop();
},_onScroll:function(){this._updateArrowsEnabled();
},_onResize:function(e){var content=this.getChildControl(u).getChildren()[0];

if(!content){return;
}var A=this.getInnerSize();
var C=content.getBounds();
var B=(this.getOrientation()===v)?C.width>A.width:C.height>A.height;

if(B){this._showArrows();
this._updateArrowsEnabled();
}else{this._hideArrows();
}},_onExecuteBackward:function(){this.scrollBy(-this.getScrollStep());
},_onExecuteForward:function(){this.scrollBy(this.getScrollStep());
},_onRemoveChild:function(){qx.event.Timer.once(function(){this.scrollBy(this.getChildControl(u).getScrollX());
},this,50);
},_updateArrowsEnabled:function(){var b=this.getChildControl(u);

if(this.getOrientation()===v){var a=b.getScrollX();
var c=b.getScrollMaxX();
}else{var a=b.getScrollY();
var c=b.getScrollMaxY();
}this.getChildControl(s).setEnabled(a>0);
this.getChildControl(r).setEnabled(a<c);
},_showArrows:function(){this._showChildControl(r);
this._showChildControl(s);
},_hideArrows:function(){this._excludeChildControl(r);
this._excludeChildControl(s);
this.scrollTo(0);
}}});
})();
(function(){var f="execute",e="button-backward",d="vertical",c="button-forward",b="menu-slidebar",a="qx.ui.menu.MenuSlideBar";
qx.Class.define(a,{extend:qx.ui.container.SlideBar,construct:function(){arguments.callee.base.call(this,d);
},properties:{appearance:{refine:true,init:b}},members:{_createChildControlImpl:function(g){var h;

switch(g){case c:h=new qx.ui.form.HoverButton();
h.addListener(f,this._onExecuteForward,this);
this._addAt(h,2);
break;
case e:h=new qx.ui.form.HoverButton();
h.addListener(f,this._onExecuteBackward,this);
this._addAt(h,0);
break;
}return h||arguments.callee.base.call(this,g);
}}});
})();
(function(){var s="Boolean",r="qx.event.type.Event",q="queued",p="String",o="sending",n="qx.io.remote.Response",m="receiving",l="aborted",k="failed",j="nocache",bc="completed",bb="POST",ba="configured",Y="timeout",X="GET",W="Pragma",V="no-url-params-on-post",U="no-cache",T="Cache-Control",S="Content-Type",A="text/plain",B="__fb",y="application/xml",z="application/json",w="text/html",x="application/x-www-form-urlencoded",t="qx.io.remote.Exchange",u="Integer",C="X-Qooxdoo-Response-Type",D="HEAD",K="qx.io.remote.Request",I="__eY",M="_applyResponseType",L="_applyState",O="text/javascript",N="changeState",F="PUT",R="_applyProhibitCaching",Q="",P="__fa",E="_applyMethod",G="DELETE",H="boolean",J="__eX";
qx.Class.define(K,{extend:qx.core.Object,construct:function(bl,bm,bn){arguments.callee.base.call(this);
this.__eX={};
this.__eY={};
this.__fa={};
this.__fb={};

if(bl!==undefined){this.setUrl(bl);
}
if(bm!==undefined){this.setMethod(bm);
}
if(bn!==undefined){this.setResponseType(bn);
}this.setProhibitCaching(true);
this.__fc=++qx.io.remote.Request.__fc;
},events:{"created":r,"configured":r,"sending":r,"receiving":r,"completed":n,"aborted":n,"failed":n,"timeout":n},statics:{__fc:0},properties:{url:{check:p,init:Q},method:{check:[X,bb,F,D,G],apply:E,init:X},asynchronous:{check:s,init:true},data:{check:p,nullable:true},username:{check:p,nullable:true},password:{check:p,nullable:true},state:{check:[ba,q,o,m,bc,l,Y,k],init:ba,apply:L,event:N},responseType:{check:[A,O,z,y,w],init:A,apply:M},timeout:{check:u,nullable:true},prohibitCaching:{check:function(v){return typeof v==H||v===V;
},init:true,apply:R},crossDomain:{check:s,init:false},fileUpload:{check:s,init:false},transport:{check:t,nullable:true},useBasicHttpAuth:{check:s,init:false}},members:{__eX:null,__eY:null,__fa:null,__fb:null,__fc:null,send:function(){qx.io.remote.RequestQueue.getInstance().add(this);
},abort:function(){qx.io.remote.RequestQueue.getInstance().abort(this);
},reset:function(){switch(this.getState()){case o:case m:this.error("Aborting already sent request!");
case q:this.abort();
break;
}},isConfigured:function(){return this.getState()===ba;
},isQueued:function(){return this.getState()===q;
},isSending:function(){return this.getState()===o;
},isReceiving:function(){return this.getState()===m;
},isCompleted:function(){return this.getState()===bc;
},isAborted:function(){return this.getState()===l;
},isTimeout:function(){return this.getState()===Y;
},isFailed:function(){return this.getState()===k;
},__fd:function(e){var bx=e.clone();
bx.setTarget(this);
this.dispatchEvent(bx);
},_onqueued:function(e){this.setState(q);
this.__fd(e);
},_onsending:function(e){this.setState(o);
this.__fd(e);
},_onreceiving:function(e){this.setState(m);
this.__fd(e);
},_oncompleted:function(e){this.setState(bc);
this.__fd(e);
this.dispose();
},_onaborted:function(e){this.setState(l);
this.__fd(e);
this.dispose();
},_ontimeout:function(e){this.setState(Y);
this.__fd(e);
this.dispose();
},_onfailed:function(e){this.setState(k);
this.__fd(e);
this.dispose();
},_applyState:function(a,b){{};
},_applyProhibitCaching:function(bi,bj){if(!bi){this.removeParameter(j);
this.removeRequestHeader(W);
this.removeRequestHeader(T);
return;
}if(bi!==V||this.getMethod()!=bb){this.setParameter(j,new Date().valueOf());
}else{this.removeParameter(j);
}this.setRequestHeader(W,U);
this.setRequestHeader(T,U);
},_applyMethod:function(bf,bg){if(bf===bb){this.setRequestHeader(S,x);
}else{this.removeRequestHeader(S);
}var bh=this.getProhibitCaching();
this._applyProhibitCaching(bh,bh);
},_applyResponseType:function(bv,bw){this.setRequestHeader(C,bv);
},setRequestHeader:function(h,i){this.__eX[h]=i;
},removeRequestHeader:function(bo){delete this.__eX[bo];
},getRequestHeader:function(bd){return this.__eX[bd]||null;
},getRequestHeaders:function(){return this.__eX;
},setParameter:function(br,bs,bt){if(bt){this.__fa[br]=bs;
}else{this.__eY[br]=bs;
}},removeParameter:function(bp,bq){if(bq){delete this.__fa[bp];
}else{delete this.__eY[bp];
}},getParameter:function(c,d){if(d){return this.__fa[c]||null;
}else{return this.__eY[c]||null;
}},getParameters:function(bk){return (bk?this.__fa:this.__eY);
},setFormField:function(f,g){this.__fb[f]=g;
},removeFormField:function(bu){delete this.__fb[bu];
},getFormField:function(be){return this.__fb[be]||null;
},getFormFields:function(){return this.__fb;
},getSequenceNumber:function(){return this.__fc;
}},destruct:function(){this.setTransport(null);
this._disposeFields(J,I,P,B);
}});
})();
(function(){var d="qx.ui.core.Spacer";
qx.Class.define(d,{extend:qx.ui.core.LayoutItem,construct:function(a,b){arguments.callee.base.call(this);
this.setWidth(a!=null?a:0);
this.setHeight(b!=null?b:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(c){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var bi="_applyLayoutChange",bh="left",bg="top",bf="Decorator",be="Integer",bd="x",bc="y",bb="auto",ba="qx.ui.layout.Dock",Y="_applySort",R="west",X="__ff",U="north",Q="south",P="center",T="east",S="Boolean",V="bottom",O="right",W="__fe";
qx.Class.define(ba,{extend:qx.ui.layout.Abstract,construct:function(ca,cb,cc,cd){arguments.callee.base.call(this);

if(ca){this.setSpacingX(ca);
}
if(cb){this.setSpacingY(cb);
}
if(cc){this.setSeparatorX(cc);
}
if(cd){this.setSeparatorY(cd);
}},properties:{sort:{check:[bb,bc,bd],init:bb,apply:Y},separatorX:{check:bf,nullable:true,apply:bi},separatorY:{check:bf,nullable:true,apply:bi},connectSeparators:{check:S,init:false,apply:bi},spacingX:{check:be,init:0,apply:bi},spacingY:{check:be,init:0,apply:bi}},members:{__fe:null,__ff:null,verifyLayoutProperty:null,_applySort:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__fg:{north:1,south:2,west:3,east:4,center:5},__fh:{1:bg,2:V,3:bh,4:O},__fi:function(){var bj=this._getLayoutChildren();
var br,bl;
var length=bj.length;
var bn=[];
var bq=[];
var bo=[];
var bk=this.getSort()===bc;
var bp=this.getSort()===bd;

for(var i=0;i<length;i++){br=bj[i];
bo=br.getLayoutProperties().edge;

if(bo===P){if(bl){throw new Error("It is not allowed to have more than one child aligned to 'center'!");
}bl=br;
}else if(bp||bk){if(bo===U||bo===Q){bk?bn.push(br):bq.push(br);
}else if(bo===R||bo===T){bk?bq.push(br):bn.push(br);
}}else{bn.push(br);
}}var bs=bn.concat(bq);

if(bl){bs.push(bl);
}this.__fe=bs;
var bm=[];

for(var i=0;i<length;i++){bo=bs[i].getLayoutProperties().edge;
bm[i]=this.__fg[bo]||5;
}this.__ff=bm;
delete this._invalidChildrenCache;
},renderLayout:function(a,b){if(this._invalidChildrenCache){this.__fi();
}var v=qx.ui.layout.Util;
var h=this.__fe;
var w=this.__ff;
var length=h.length;
var l,d,k,q,r,B,o,e,y;
var F=[];
var n=[];
var E=this._getSeparatorWidths();
var J=this.getSpacingX();
var I=this.getSpacingY();
var j=-J;
var x=-I;

if(E.x){j-=E.x+J;
}
if(E.y){x-=E.y+I;
}
for(var i=0;i<length;i++){d=h[i];
q=d.getLayoutProperties();
k=d.getSizeHint();
o=k.width;
e=k.height;

if(q.width!=null){o=Math.floor(a*parseFloat(q.width)/100);

if(o<k.minWidth){o=k.minWidth;
}else if(o>k.maxWidth){o=k.maxWidth;
}}
if(q.height!=null){e=Math.floor(b*parseFloat(q.height)/100);

if(e<k.minHeight){e=k.minHeight;
}else if(e>k.maxHeight){e=k.maxHeight;
}}F[i]=o;
n[i]=e;
switch(w[i]){case 1:case 2:x+=e+d.getMarginTop()+d.getMarginBottom()+I;

if(E.y){x+=E.y+I;
}break;
case 3:case 4:j+=o+d.getMarginLeft()+d.getMarginRight()+J;

if(E.x){j+=E.x+J;
}break;
default:j+=o+d.getMarginLeft()+d.getMarginRight()+J;
x+=e+d.getMarginTop()+d.getMarginBottom()+I;

if(E.x){j+=E.x+J;
}
if(E.y){x+=E.y+I;
}}}if(j!=a){l={};
B=j<a;

for(var i=0;i<length;i++){d=h[i];

switch(w[i]){case 3:case 4:case 5:r=d.getLayoutProperties().flex;
if(r==null&&w[i]==5){r=1;
}
if(r>0){k=d.getSizeHint();
l[i]={min:k.minWidth,value:F[i],max:k.maxWidth,flex:r};
}}}var f=v.computeFlexOffsets(l,a,j);

for(var i in f){y=f[i].offset;
F[i]+=y;
j+=y;
}}if(x!=b){l=[];
B=x<b;

for(var i=0;i<length;i++){d=h[i];

switch(w[i]){case 1:case 2:case 5:r=d.getLayoutProperties().flex;
if(r==null&&w[i]==5){r=1;
}
if(r>0){k=d.getSizeHint();
l[i]={min:k.minHeight,value:n[i],max:k.maxHeight,flex:r};
}}}var f=v.computeFlexOffsets(l,b,x);

for(var i in f){y=f[i].offset;
n[i]+=y;
x+=y;
}}this._clearSeparators();
var C=this.getSeparatorX(),D=this.getSeparatorY();
var G=this.getConnectSeparators();
var t=0,A=0;
var N,top,o,e,s,K;
var u,H,M,c;
var L,m,p,g;
var z=this.__fh;

for(var i=0;i<length;i++){d=h[i];
K=w[i];
k=d.getSizeHint();
L=d.getMarginTop();
m=d.getMarginBottom();
p=d.getMarginLeft();
g=d.getMarginRight();
switch(K){case 1:case 2:o=a-p-g;
if(o<k.minWidth){o=k.minWidth;
}else if(o>k.maxWidth){o=k.maxWidth;
}e=n[i];
top=t+v.computeVerticalAlignOffset(z[K],e,b,L,m);
N=A+v.computeHorizontalAlignOffset(d.getAlignX()||bh,o,a,p,g);
if(E.y){if(K==1){H=t+e+L+I+m;
}else{H=t+b-e-L-I-m-E.y;
}u=N;
M=a;

if(G&&u>0){u-=J+p;
M+=(J)*2;
}else{u-=p;
}this._renderSeparator(D,{left:u,top:H,width:M,height:E.y});
}s=e+L+m+I;

if(E.y){s+=E.y+I;
}b-=s;
if(K==1){t+=s;
}break;
case 3:case 4:e=b-L-m;
if(e<k.minHeight){e=k.minHeight;
}else if(e>k.maxHeight){e=k.maxHeight;
}o=F[i];
N=A+v.computeHorizontalAlignOffset(z[K],o,a,p,g);
top=t+v.computeVerticalAlignOffset(d.getAlignY()||bg,e,b,L,m);
if(E.x){if(K==3){u=A+o+p+J+g;
}else{u=A+a-o-p-J-g-E.x;
}H=top;
c=b;

if(G&&H>0){H-=I+L;
c+=(I)*2;
}else{H-=L;
}this._renderSeparator(C,{left:u,top:H,width:E.x,height:c});
}s=o+p+g+J;

if(E.x){s+=E.x+J;
}a-=s;
if(K==3){A+=s;
}break;
default:o=a-p-g;
e=b-L-m;
if(o<k.minWidth){o=k.minWidth;
}else if(o>k.maxWidth){o=k.maxWidth;
}if(e<k.minHeight){e=k.minHeight;
}else if(e>k.maxHeight){e=k.maxHeight;
}N=A+v.computeHorizontalAlignOffset(d.getAlignX()||bh,o,a,p,g);
top=t+v.computeVerticalAlignOffset(d.getAlignY()||bg,e,b,L,m);
}d.renderLayout(N,top,o,e);
}},_getSeparatorWidths:function(){var bu=this.getSeparatorX(),bt=this.getSeparatorY();

if(bu||bt){var bz=qx.theme.manager.Decoration.getInstance();
}
if(bu){var bA=bz.resolve(bu);
var bw=bA.getInsets();
var bx=bw.left+bw.right;
}
if(bt){var bB=bz.resolve(bt);
var bv=bB.getInsets();
var by=bv.top+bv.bottom;
}return {x:bx||0,y:by||0};
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__fi();
}var bF=this.__fe;
var bP=this.__ff;
var length=bF.length;
var bJ,bQ;
var bL,bK;
var bM=0,bX=0;
var bC=0,bS=0;
var bN=0,bW=0;
var bD=0,bR=0;
var bT=this._getSeparatorWidths();
var bV=this.getSpacingX(),bU=this.getSpacingY();
var bH=-bV,bG=-bU;

if(bT.x){bH-=bT.x+bV;
}
if(bT.y){bG-=bT.y+bU;
}for(var i=0;i<length;i++){bQ=bF[i];
bJ=bQ.getSizeHint();
bL=bQ.getMarginLeft()+bQ.getMarginRight();
bK=bQ.getMarginTop()+bQ.getMarginBottom();
switch(bP[i]){case 1:case 2:bN=Math.max(bN,bJ.width+bM+bL);
bW=Math.max(bW,bJ.minWidth+bX+bL);
bD+=bJ.height+bK;
bR+=bJ.minHeight+bK;
bG+=bU;

if(bT.y){bG+=bT.y+bU;
}break;
case 3:case 4:bC=Math.max(bC,bJ.height+bD+bK);
bS=Math.max(bS,bJ.minHeight+bR+bK);
bM+=bJ.width+bL;
bX+=bJ.minWidth+bL;
bH+=bV;

if(bT.x){bH+=bT.x+bV;
}break;
default:bM+=bJ.width+bL;
bX+=bJ.minWidth+bL;
bD+=bJ.height+bK;
bR+=bJ.minHeight+bK;
bH+=bV;

if(bT.x){bH+=bT.x+bV;
}bG+=bU;

if(bT.y){bG+=bT.y+bU;
}}}var bI=Math.max(bX,bW)+bH;
var bY=Math.max(bM,bN)+bH;
var bO=Math.max(bS,bR)+bG;
var bE=Math.max(bC,bD)+bG;
return {minWidth:bI,width:bY,minHeight:bO,height:bE};
}},destruct:function(){this._disposeFields(X,W);
}});
})();
(function(){var bL="get",bK="String",bJ="changeModel",bI="_applyDelegate",bH="__fl",bG="qx.core.Object",bF="_applyLabelPath",bE="icon",bD="change",bC="label",bv="__fk",bB="_applyTarget",by="changeTarget",bu="_applyIconPath",bt="__fj",bx="_applyLabelOptions",bw="_applyChildPath",bz="_applyIconOptions",bs="qx.data.controller.Tree",bA="_applyModel";
qx.Class.define(bs,{extend:qx.core.Object,include:qx.data.controller.MSelection,construct:function(Q,R,S,T){arguments.callee.base.call(this);
this.__fj={};
this.__fk=[];
this.__fl={};

if(S!=null){this.setChildPath(S);
}
if(T!=null){this.setLabelPath(T);
}
if(Q!=null){this.setModel(Q);
}
if(R!=null){this.setTarget(R);
}},properties:{model:{check:bG,apply:bA,event:bJ,nullable:true},target:{apply:bB,event:by,init:null},childPath:{check:bK,apply:bw,nullable:true},labelPath:{check:bK,apply:bF,nullable:true},iconPath:{check:bK,apply:bu,nullable:true},labelOptions:{apply:bx,nullable:true},iconOptions:{apply:bz,nullable:true},delegate:{apply:bI,init:null,nullable:true}},members:{__fl:null,__fj:null,__fk:null,_applyDelegate:function(U,V){this._setConfigureItem(U,V);
this._setCreateItem(U,V);
this._setBindItem(U,V);
},_applyIconOptions:function(a,b){this.__ft();
},_applyLabelOptions:function(bU,bV){this.__ft();
},_applyTarget:function(bO,bP){if(bP!=undefined){var bQ=bP.getRoot();
bP.setRoot(null);
bQ.destroy();
}if(this.getModel()!=null){this.__fo();
}this._addChangeTargetListener(bO,bP);
},_applyModel:function(c,d){this.__fo();
},_applyChildPath:function(y,z){this.__fo();
},_applyIconPath:function(W,X){this.__ft();
},_applyLabelPath:function(bM,bN){this.__ft();
},__fm:function(bh){var bj=bh.getTarget();
var bi=this.__fl[bj.toHashCode()].treeNode;
var bk=this.__fl[bj.toHashCode()].modelNode;
this.__fp(bi,bk);
this._updateSelection();
},__fn:function(e){var bf=e.getData();
var bb=e.getOldData();
var bc=this.__fl[bb.toHashCode()];
delete this.__fl[bb.toHashCode()];
bc.modelNode.removeListenerById(bc.changeChildernListenerId);
var bg=bc.modelNode;
var be=qx.Class.getPropertyDefinition(bc.modelNode.constructor,this.getChildPath());
var Y=be.event;
var bd=bg.addListener(Y,this.__fn,this);
var ba=bc.treeNode;
this.__fl[bf.toHashCode()]={modelNode:bg,treeNode:ba,changeListenerId:bc.changeListenerId,changeChildernListenerId:bd};
this.__fp(ba,bg);
this._updateSelection();
},_createItem:function(){var u=this.getDelegate();
if(u!=null&&u.createItem!=null){var t=u.createItem();
}else{var t=new qx.ui.tree.TreeFolder();
}if(u!=null&&u.configureItem!=null){u.configureItem(t);
}return t;
},__fo:function(){if(this.getTarget()==null||this.getChildPath()==null){return;
}if((this.getLabelPath()==null&&this.getDelegate()==null)||(this.getLabelPath()==null&&this.getDelegate()!=null&&this.getDelegate().bindItem==null)){return;
}var O=this.getTarget().getRoot();

if(O!=null){this.getTarget().resetRoot();
O.destroy();
}if(this.getModel()!=null){var P=this._createItem();
P.setModel(this.getModel());
this.getTarget().setRoot(P);
this.__fu(this.getModel(),P);
this.__fp(P,this.getModel());
}},__fp:function(f,g){if(g[bL+qx.lang.String.firstUp(this.getChildPath())]==undefined){return;
}var r=g[bL+qx.lang.String.firstUp(this.getChildPath())]();
if(this.__fl[r.toHashCode()]==undefined){var m=r.addListener(bD,this.__fm,this);
var q=qx.Class.getPropertyDefinition(g.constructor,this.getChildPath());
var n=q.event;
var o=g.addListener(n,this.__fn,this);
this.__fl[r.toHashCode()]={modelNode:g,treeNode:f,changeListenerId:m,changeChildernListenerId:o};
}for(var i=0;i<r.length;i++){if(f.getChildren()[i]==null||r.getItem(i)!=f.getChildren()[i].getModel()){for(var j=i;j<f.getChildren().length;j++){if(f.getChildren()[j].getModel()===r.getItem(i)){var h=j;
break;
}}if(h!=undefined){var k=f.getChildren()[h];
if(this.getTarget().isSelected(k)){var s=true;
}f.removeAt(h);
f.addAt(k,i);
if(s){this.getTarget().addToSelection(k);
}}else{var p=this._createItem();
p.setModel(r.getItem(i));
f.addAt(p,i);
this.__fu(r.getItem(i),p);
this.__fp(p,r.getItem(i));
}}}for(var i=f.getChildren().length-1;i>=r.length;i--){var l=f.getChildren()[i];
this.__fs(l,f);
}},__fq:function(){if(this.getTarget()==null){return;
}var bY=this.getTarget().getRoot();

if(bY!=null){this.getTarget().setRoot(null);
this.__fr(bY);
this.__fv(bY.getModel());
bY.destroy();
this.__fl={};
}},__fr:function(A){var B=A.getChildren();
for(var i=B.length-1;i>=0;i--){if(B[i].getChildren().length>0){this.__fr(B[i]);
}this.__fs(B[i],A);
}},__fs:function(bR,bS){var bT=bR.getModel();
if(bT[bL+qx.lang.String.firstUp(this.getChildPath())]!=undefined){delete this.__fl[bT[bL+qx.lang.String.firstUp(this.getChildPath())]().toHashCode()];
}this.__fv(bT);
bS.remove(bR);
bR.destroy();
},bindProperty:function(F,G,H,I,J){var K=J.bind(F,I,G,H);
if(this.__fj[G]==null){this.__fj[G]={};
}this.__fj[G][J.toHashCode()]={id:K,treeNode:I};
if(!qx.lang.Array.contains(this.__fk,G)){this.__fk.push(G);
}},__ft:function(){var bm;

for(var bo in this.__fj){bm=bo;
break;
}for(var bl in this.__fj[bm]){var bp=this.__fj[bm][bl].treeNode;
var bn=qx.core.ObjectRegistry.fromHashCode(bl);
this.__fv(bn);
this.__fu(bn,bp);
}},__fu:function(C,D){var E=this.getDelegate();
if(E!=null&&E.bindItem!=null){E.bindItem(this,D,C);
}else{this.bindProperty(this.getLabelPath(),bC,this.getLabelOptions(),D,C);
if(this.getIconPath()!=null){this.bindProperty(this.getIconPath(),bE,this.getIconOptions(),D,C);
}}},__fv:function(L){for(var i=0;i<this.__fk.length;i++){var N=this.__fk[i];
var M=this.__fj[N][L.toHashCode()];

if(M!=null){L.removeBinding(M.id);
delete this.__fj[N][L.toHashCode()];
}}},_setConfigureItem:function(v,w){if(v!=null&&v.configureItem!=null&&this.getTarget()!=null){var x=this.getTarget().getRoot().getItems(true,true,false);

for(var i=0;i<x.length;i++){v.configureItem(x[i]);
}}},_setCreateItem:function(bW,bX){if(this.getTarget()==null||this.getModel()==null){return;
}if(bW==null||bW.createItem==null){return;
}if(bX&&bX.createItem&&bW&&bW.createItem&&bX.createItem==bW.createTtem){return;
}this._startSelectionModification();
this.__fq();
this.__fo();
this._endSelectionModification();
this._updateSelection();
},_setBindItem:function(bq,br){if(bq!=null&&bq.bindItem!=null){if(br!=null&&br.bindItem!=null&&bq.bindItem==br.bindItem){return;
}this.__fo();
}}},destruct:function(){this._disposeFields(bt,bH);
this._disposeArray(bv);
}});
})();
(function(){var l="mousedown",k="__hL",j="blur",i="singleton",h="qx.ui.popup.Manager";
qx.Class.define(h,{type:i,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hL={};
qx.event.Registration.addListener(document.documentElement,l,this.__hN,this,true);
qx.bom.Element.addListener(window,j,this.hideAll,this);
},members:{__hL:null,add:function(r){{};
this.__hL[r.$$hash]=r;
this.__hM();
},remove:function(a){{};
var b=this.__hL;

if(b){delete b[a.$$hash];
this.__hM();
}},hideAll:function(){var n=this.__hL;

if(n){for(var m in n){n[m].exclude();
}}},__hM:function(){var q=1e7;
var p=this.__hL;

for(var o in p){p[o].setZIndex(q++);
}},__hN:function(e){var f=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var g=this.__hL;

for(var d in g){var c=g[d];

if(!c.getAutoHide()||f==c||qx.ui.core.Widget.contains(c,f)){continue;
}c.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,l,this.__hN,this,true);
this._disposeMap(k);
}});
})();
(function(){var A="_",z="format",y="thu",x="sat",w="cldr_day_",v="cldr_month_",u="wed",t="fri",s="tue",r="mon",R="sun",Q="short",P="HH:mm",O="HHmmsszz",N="HHmm",M="HHmmss",L="cldr_date_format_",K="HH:mm:ss zz",J="full",I="cldr_pm",G="long",H="medium",E="cldr_am",F="qx.locale.Date",C="cldr_date_time_format_",D="cldr_time_format_",B="HH:mm:ss";
qx.Class.define(F,{statics:{__fw:qx.locale.Manager.getInstance(),getAmMarker:function(m){return this.__fw.localize(E,[],m);
},getPmMarker:function(g){return this.__fw.localize(I,[],g);
},getDayNames:function(length,bk,bl){var bl=bl?bl:z;
{};
var bn=[R,r,s,u,y,t,x];
var bo=[];

for(var i=0;i<bn.length;i++){var bm=w+bl+A+length+A+bn[i];
bo.push(this.__fw.localize(bm,[],bk));
}return bo;
},getDayName:function(length,ba,bb,bc){var bc=bc?bc:z;
{};
var be=[R,r,s,u,y,t,x];
var bd=w+bc+A+length+A+be[ba];
return this.__fw.localize(bd,[],bb);
},getMonthNames:function(length,h,j){var j=j?j:z;
{};
var l=[];

for(var i=0;i<12;i++){var k=v+j+A+length+A+(i+1);
l.push(this.__fw.localize(k,[],h));
}return l;
},getMonthName:function(length,a,b,c){var c=c?c:z;
{};
var d=v+c+A+length+A+(a+1);
return this.__fw.localize(d,[],b);
},getDateFormat:function(bp,bq){{};
var br=L+bp;
return this.__fw.localize(br,[],bq);
},getDateTimeFormat:function(bf,bg,bh){var bj=C+bf;
var bi=this.__fw.localize(bj,[],bh);

if(bi==bj){bi=bg;
}return bi;
},getTimeFormat:function(V,W){{};
var Y=D+V;
var X=this.__fw.localize(Y,[],W);

if(X!=Y){return X;
}
switch(V){case Q:case H:return qx.locale.Date.getDateTimeFormat(N,P);
case G:return qx.locale.Date.getDateTimeFormat(M,B);
case J:return qx.locale.Date.getDateTimeFormat(O,K);
default:throw new Error("This case should never happen.");
}},getWeekStart:function(bs){var bt={"MV":5,"AE":6,"AF":6,"BH":6,"DJ":6,"DZ":6,"EG":6,"ER":6,"ET":6,"IQ":6,"IR":6,"JO":6,"KE":6,"KW":6,"LB":6,"LY":6,"MA":6,"OM":6,"QA":6,"SA":6,"SD":6,"SO":6,"TN":6,"YE":6,"AS":0,"AU":0,"AZ":0,"BW":0,"CA":0,"CN":0,"FO":0,"GE":0,"GL":0,"GU":0,"HK":0,"IE":0,"IL":0,"IS":0,"JM":0,"JP":0,"KG":0,"KR":0,"LA":0,"MH":0,"MN":0,"MO":0,"MP":0,"MT":0,"NZ":0,"PH":0,"PK":0,"SG":0,"TH":0,"TT":0,"TW":0,"UM":0,"US":0,"UZ":0,"VI":0,"ZA":0,"ZW":0,"MW":0,"NG":0,"TJ":0};
var bu=qx.locale.Date._getTerritory(bs);
return bt[bu]!=null?bt[bu]:1;
},getWeekendStart:function(bv){var bx={"EG":5,"IL":5,"SY":5,"IN":0,"AE":4,"BH":4,"DZ":4,"IQ":4,"JO":4,"KW":4,"LB":4,"LY":4,"MA":4,"OM":4,"QA":4,"SA":4,"SD":4,"TN":4,"YE":4};
var bw=qx.locale.Date._getTerritory(bv);
return bx[bw]!=null?bx[bw]:6;
},getWeekendEnd:function(S){var T={"AE":5,"BH":5,"DZ":5,"IQ":5,"JO":5,"KW":5,"LB":5,"LY":5,"MA":5,"OM":5,"QA":5,"SA":5,"SD":5,"TN":5,"YE":5,"AF":5,"IR":5,"EG":6,"IL":6,"SY":6};
var U=qx.locale.Date._getTerritory(S);
return T[U]!=null?T[U]:0;
},isWeekend:function(n,o){var q=qx.locale.Date.getWeekendStart(o);
var p=qx.locale.Date.getWeekendEnd(o);

if(p>q){return ((n>=q)&&(n<=p));
}else{return ((n>=q)||(n<=p));
}},_getTerritory:function(e){if(e){var f=e.split(A)[1]||e;
}else{f=this.__fw.getTerritory()||this.__fw.getLanguage();
}return f.toUpperCase();
}}});
})();
(function(){var n="separator-vertical",m="__fy",l="background-medium",k="Posts",j="bold",i="__fx",h="_applyLoading",g="center",f="feedreader.view.List",e="single",b="__fz",d="middle",c="feedreader/images/loading66.gif",a="Boolean";
qx.Class.define(f,{extend:qx.ui.core.Widget,construct:function(){arguments.callee.base.call(this);
var p=new qx.ui.layout.VBox();
p.setSeparator(n);
this._setLayout(p);
var q=new qx.ui.basic.Label(this.tr(k));
q.setBackgroundColor(l);
q.setPadding(5);
q.setAllowGrowX(true);
q.setFont(j);
this._add(q);
this.__fx=new qx.ui.container.Stack();
this._add(this.__fx,{flex:1});
this.__fy=new qx.ui.form.List();
this.__fy.setDecorator(null);
this.__fy.setSelectionMode(e);
this.__fx.add(this.__fy);
this.__fz=new qx.ui.container.Composite(new qx.ui.layout.HBox(0,g));
var o=new qx.ui.basic.Image(c);
o.setAlignY(d);
this.__fz.add(o);
this.__fx.add(this.__fz);
},properties:{loading:{check:a,init:false,apply:h}},members:{__fx:null,__fy:null,__fz:null,_applyLoading:function(r,s){if(r){this.__fx.setSelection([this.__fz]);
}else{this.__fx.setSelection([this.__fy]);
}},getList:function(){return this.__fy;
}},destruct:function(){this._disposeObjects(m,i,b);
}});
})();
(function(){var c="Integer",b="Object",a="qx.io.remote.Response";
qx.Class.define(a,{extend:qx.event.type.Event,properties:{state:{check:c,nullable:true},statusCode:{check:c,nullable:true},content:{nullable:true},responseHeaders:{check:b,nullable:true}},members:{clone:function(d){var e=arguments.callee.base.call(this,d);
e.setType(this.getType());
e.setState(this.getState());
e.setStatusCode(this.getStatusCode());
e.setContent(this.getContent());
e.setResponseHeaders(this.getResponseHeaders());
return e;
},getResponseHeader:function(f){var g=this.getResponseHeaders();

if(g){return g[f]||null;
}return null;
}}});
})();
(function(){var p="qx.data.Array",o="String",n="changeArticles",m="loading",l="",k="new",j="feedreader.model.FeedFolder",i="Folder",h="loaded",g="dataModified",c="null",f="changeFeeds",e="stateModified",b="_applyState",a="changeTitle",d="error";
qx.Class.define(j,{extend:qx.core.Object,construct:function(q){arguments.callee.base.call(this);
this.setTitle(q);
this.setFeeds(new qx.data.Array());
},properties:{title:{check:o,event:a,init:i},category:{check:o,init:l,event:g},feeds:{check:p,event:f},articles:{check:p,event:n,init:new qx.data.Array()},state:{check:[k,m,h,d],init:c,event:e,apply:b}}});
})();
(function(){var a="qx.ui.splitpane.Slider";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var e="inherit",d="toolbar-button",c="keydown",b="qx.ui.toolbar.Button",a="keyup";
qx.Class.define(b,{extend:qx.ui.form.Button,construct:function(f,g,h){arguments.callee.base.call(this,f,g,h);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var G="resize",F="scrollY",E="update",D="scrollX",C="_applyScrollX",B="_applyScrollY",A="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",z="appear",w="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",v="qx.event.type.Event",t="qx.ui.core.scroll.ScrollPane",u="scroll";
qx.Class.define(t,{extend:qx.ui.core.Widget,construct:function(){arguments.callee.base.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(G,this._onUpdate);
var I=this.getContentElement();
I.addListener(u,this._onScroll,this);
I.addListener(z,this._onAppear,this);
},events:{update:v},properties:{scrollX:{check:A,apply:C,event:D,init:0},scrollY:{check:w,apply:B,event:F,init:0}},members:{add:function(l){var m=this._getChildren()[0];

if(m){this._remove(m);
m.removeListener(G,this._onUpdate,this);
}
if(l){this._add(l);
l.addListener(G,this._onUpdate,this);
}},remove:function(H){if(H){this._remove(H);
H.removeListener(G,this._onUpdate,this);
}},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(E);
},_onScroll:function(e){var f=this.getContentElement();
this.setScrollX(f.getScrollX());
this.setScrollY(f.getScrollY());
},_onAppear:function(e){var q=this.getContentElement();
var n=this.getScrollX();
var o=q.getScrollX();

if(n!=o){q.scrollToX(n);
}var r=this.getScrollY();
var p=q.getScrollY();

if(r!=p){q.scrollToY(r);
}},getItemTop:function(b){var top=0;

do{top+=b.getBounds().top;
b=b.getLayoutParent();
}while(b&&b!==this);
return top;
},getItemBottom:function(g){return this.getItemTop(g)+g.getBounds().height;
},getItemLeft:function(j){var k=0;
var parent;

do{k+=j.getBounds().left;
parent=j.getLayoutParent();

if(parent){k+=parent.getInsets().left;
}j=parent;
}while(j&&j!==this);
return k;
},getItemRight:function(a){return this.getItemLeft(a)+a.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var i=this.getInnerSize();
var h=this.getScrollSize();

if(i&&h){return Math.max(0,h.width-i.width);
}return 0;
},getScrollMaxY:function(){var N=this.getInnerSize();
var M=this.getScrollSize();

if(N&&M){return Math.max(0,M.height-N.height);
}return 0;
},scrollToX:function(J){var K=this.getScrollMaxX();

if(J<0){J=0;
}else if(J>K){J=K;
}this.setScrollX(J);
},scrollToY:function(c){var d=this.getScrollMaxY();

if(c<0){c=0;
}else if(c>d){c=d;
}this.setScrollY(c);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(s){this.getContentElement().scrollToX(s);
},_applyScrollY:function(L){this.getContentElement().scrollToY(L);
}}});
})();
(function(){var j="Use 'getBlocker().getContentBlockerElement()' instead.",i="Use 'getBlocker().getBlockerElement()' instead.",h="_applyBlockerColor",g="Number",f="__if",e="qx.ui.core.MBlocker",d="_applyBlockerOpacity",c="Color";
qx.Mixin.define(e,{construct:function(){this.__if=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:c,init:null,nullable:true,apply:h,themeable:true},blockerOpacity:{check:g,init:1,apply:d,themeable:true}},members:{__if:null,_applyBlockerColor:function(a,b){this.__if.setColor(a);
},_applyBlockerOpacity:function(k,l){this.__if.setOpacity(k);
},block:function(){this.__if.block();
},isBlocked:function(){return this.__if.isBlocked();
},unblock:function(){this.__if.unblock();
},blockContent:function(m){this.__if.blockContent(m);
},isContentBlocked:function(){return this.__if.isContentBlocked();
},unblockContent:function(){this.__if.unblockContent();
},_getContentBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,j);
return this.__if.getContentBlockerElement();
},_getBlocker:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,i);
return this.__if.getBlockerElement();
},getBlocker:function(){return this.__if;
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var n="failed",m="completed",k="=",j="aborted",h="",g="sending",f="&",d="configured",c="timeout",b="application/xml",K="qx.io.remote.transport.XmlHttp",J="application/json",I="text/html",H="qx.client",G="receiving",F="text/plain",E="text/javascript",D="?",C="created",B='Referer',v='Basic ',w="\n</pre>",t="string",u='Authorization',q="__fO",r="<pre>Could not execute json: \n",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p=':',x="parseerror",y="file:",A="webkit",z="object";
qx.Class.define(K,{extend:qx.io.remote.transport.Abstract,statics:{handles:{synchronous:true,asynchronous:true,crossDomain:false,fileUpload:false,programaticFormFields:false,responseTypes:[F,E,J,b,I]},requestObjects:[],requestObjectCount:0,createRequestObject:qx.core.Variant.select(H,{"default":function(){return new XMLHttpRequest;
},"mshtml":function(){if(window.ActiveXObject&&qx.xml.Document.XMLHTTP){return new ActiveXObject(qx.xml.Document.XMLHTTP);
}
if(window.XMLHttpRequest){return new XMLHttpRequest;
}}}),isSupported:function(){return !!this.createRequestObject();
}},members:{__fM:false,__fN:0,__fO:null,getRequest:function(){if(this.__fO===null){this.__fO=qx.io.remote.transport.XmlHttp.createRequestObject();
this.__fO.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
}return this.__fO;
},send:function(){this.__fN=0;
var bw=this.getRequest();
var bs=this.getMethod();
var bz=this.getAsynchronous();
var by=this.getUrl();
var bu=(window.location.protocol===y&&!(/^http(s){0,1}\:/.test(by)));
this.__fM=bu;
var bC=this.getParameters(false);
var bA=[];

for(var bt in bC){var bx=bC[bt];

if(bx instanceof Array){for(var i=0;i<bx.length;i++){bA.push(encodeURIComponent(bt)+k+encodeURIComponent(bx[i]));
}}else{bA.push(encodeURIComponent(bt)+k+encodeURIComponent(bx));
}}
if(bA.length>0){by+=(by.indexOf(D)>=0?f:D)+bA.join(f);
}if(this.getData()===null){var bC=this.getParameters(true);
var bA=[];

for(var bt in bC){var bx=bC[bt];

if(bx instanceof Array){for(var i=0;i<bx.length;i++){bA.push(encodeURIComponent(bt)+k+encodeURIComponent(bx[i]));
}}else{bA.push(encodeURIComponent(bt)+k+encodeURIComponent(bx));
}}
if(bA.length>0){this.setData(bA.join(f));
}}var bB=function(ba){var bf=o;
var bj=h;
var bd,bc,bb;
var bg,bh,bi,be;
var i=0;

do{bd=ba.charCodeAt(i++);
bc=ba.charCodeAt(i++);
bb=ba.charCodeAt(i++);
bg=bd>>2;
bh=((bd&3)<<4)|(bc>>4);
bi=((bc&15)<<2)|(bb>>6);
be=bb&63;

if(isNaN(bc)){bi=be=64;
}else if(isNaN(bb)){be=64;
}bj+=bf.charAt(bg)+bf.charAt(bh)+bf.charAt(bi)+bf.charAt(be);
}while(i<ba.length);
return bj;
};
try{if(this.getUsername()){if(this.getUseBasicHttpAuth()){bw.open(bs,by,bz);
bw.setRequestHeader(u,v+bB(this.getUsername()+p+this.getPassword()));
}else{bw.open(bs,by,bz,this.getUsername(),this.getPassword());
}}else{bw.open(bs,by,bz);
}}catch(Y){this.error("Failed with exception: "+Y);
this.failed();
return;
}if(!qx.core.Variant.isSet(H,A)){bw.setRequestHeader(B,window.location.href);
}var bv=this.getRequestHeaders();

for(var bt in bv){bw.setRequestHeader(bt,bv[bt]);
}try{{};
bw.send(this.getData());
}catch(bK){if(bu){this.failedLocally();
}else{this.error("Failed to send data: "+bK,"send");
this.failed();
}return;
}if(!bz){this._onreadystatechange();
}},failedLocally:function(){if(this.getState()===n){return;
}this.warn("Could not load from file: "+this.getUrl());
this.failed();
},_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){switch(this.getState()){case m:case j:case n:case c:{};
return;
}var bp=this.getReadyState();

if(bp==4){if(!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(),bp,this.__fM)){if(this.getState()===d){this.setState(g);
}return this.failed();
}}while(this.__fN<bp){this.setState(qx.io.remote.Exchange._nativeMap[++this.__fN]);
}}),getReadyState:function(){var L=null;

try{L=this.getRequest().readyState;
}catch(bq){}return L;
},setRequestHeader:function(N,O){this.getRequestHeaders()[N]=O;
},getResponseHeader:function(bD){var bE=null;

try{bE=this.getRequest().getResponseHeader(bD)||null;
}catch(M){}return bE;
},getStringResponseHeaders:function(){var bn=null;

try{var bm=this.getRequest().getAllResponseHeaders();

if(bm){bn=bm;
}}catch(Q){}return bn;
},getResponseHeaders:function(){var bQ=this.getStringResponseHeaders();
var bR={};

if(bQ){var bO=bQ.split(/[\r\n]+/g);

for(var i=0,l=bO.length;i<l;i++){var bP=bO[i].match(/^([^:]+)\s*:\s*(.+)$/i);

if(bP){bR[bP[1]]=bP[2];
}}}return bR;
},getStatusCode:function(){var bo=-1;

try{bo=this.getRequest().status;
}catch(W){}return bo;
},getStatusText:function(){var bF=h;

try{bF=this.getRequest().statusText;
}catch(P){}return bF;
},getResponseText:function(){var X=null;

try{X=this.getRequest().responseText;
}catch(a){X=null;
}return X;
},getResponseXml:function(){var V=null;
var T=this.getStatusCode();
var U=this.getReadyState();

if(qx.io.remote.Exchange.wasSuccessful(T,U,this.__fM)){try{V=this.getRequest().responseXML;
}catch(S){}}if(typeof V==z&&V!=null){if(!V.documentElement){var s=String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/,h);
V.loadXML(s);
}if(!V.documentElement){throw new Error("Missing Document Element!");
}
if(V.documentElement.tagName==x){throw new Error("XML-File is not well-formed!");
}}else{throw new Error("Response was not a valid xml document ["+this.getRequest().responseText+"]");
}return V;
},getFetchedLength:function(){var bH=this.getResponseText();
return typeof bH==t?bH.length:0;
},getResponseContent:function(){var bL=this.getState();

if(bL!==m&&bL!=n){{};
return null;
}{};
var bN=this.getResponseText();

if(bL==n){{};
return bN;
}
switch(this.getResponseType()){case F:case I:{};
return bN;
case J:{};

try{if(bN&&bN.length>0){var bM=qx.util.Json.parse(bN,false);
return (bM===0?0:(bM||null));
}else{return null;
}}catch(R){this.error("Could not execute json: ["+bN+"]",R);
return r+bN+w;
}case E:{};

try{if(bN&&bN.length>0){var bM=window.eval(bN);
return (bM===0?0:(bM||null));
}else{return null;
}}catch(br){this.error("Could not execute javascript: ["+bN+"]",br);
return null;
}case b:bN=this.getResponseXml();
{};
return (bN===0?0:(bN||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}},_applyState:function(bI,bJ){{};

switch(bI){case C:this.fireEvent(C);
break;
case d:this.fireEvent(d);
break;
case g:this.fireEvent(g);
break;
case G:this.fireEvent(G);
break;
case m:this.fireEvent(m);
break;
case n:this.fireEvent(n);
break;
case j:this.getRequest().abort();
this.fireEvent(j);
break;
case c:this.getRequest().abort();
this.fireEvent(c);
break;
}}},defer:function(bk,bl){qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp,K);
},destruct:function(){var bG=this.getRequest();

if(bG){bG.onreadystatechange=qx.lang.Function.empty;
switch(bG.readyState){case 1:case 2:case 3:bG.abort();
}}this._disposeFields(q);
}});
})();
(function(){var w="contextmenu",v="help",u="qx.client",t="__ii",s="changeGlobalCursor",r="abstract",q="Boolean",p="root",o="",n=" !important",j="_applyGlobalCursor",m="_applyNativeHelp",l=";",i="qx.ui.root.Abstract",h="String",k="*";
qx.Class.define(i,{type:r,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:p},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:h,nullable:true,themeable:true,apply:j,event:s},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:q,init:false,apply:m}},members:{__ii:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(u,{"mshtml":function(B,C){},"default":function(a,b){var c=qx.bom.Stylesheet;
var d=this.__ii;

if(!d){this.__ii=d=c.createElement();
}c.removeAllRules(d);

if(a){c.addRule(d,k,qx.bom.element.Cursor.compile(a).replace(l,o)+n);
}}}),_applyNativeContextMenu:function(z,A){if(z){this.removeListener(w,this._onNativeContextMenu,this,true);
}else{this.addListener(w,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(u,{"mshtml":function(x,y){if(y===false){qx.bom.Event.removeNativeListener(document,v,qx.lang.Function.returnFalse);
}
if(x===false){qx.bom.Event.addNativeListener(document,v,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this._disposeFields(t);
},defer:function(f,g){qx.ui.core.MChildrenHandling.remap(g);
}});
})();
(function(){var o="resize",n="position",m="0px",l="webkit",k="$$widget",j="qx.ui.root.Application",i="hidden",h="qx.client",g="div",f="__ik",b="__ij",d="100%",c="absolute";
qx.Class.define(j,{extend:qx.ui.root.Abstract,construct:function(a){this.__ij=qx.dom.Node.getWindow(a);
this.__ik=a;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__ij,o,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__ij:null,__ik:null,_createContainerElement:function(){var p=this.__ik;

if(qx.core.Variant.isSet(h,l)){if(!p.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var t=p.documentElement.style;
var q=p.body.style;
t.overflow=q.overflow=i;
t.padding=t.margin=q.padding=q.margin=m;
t.width=t.height=q.width=q.height=d;
var s=p.createElement(g);
p.body.appendChild(s);
var r=new qx.html.Root(s);
r.setStyle(n,c);
r.setAttribute(k,this.toHashCode());
return r;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var u=qx.bom.Viewport.getWidth(this.__ij);
var v=qx.bom.Viewport.getHeight(this.__ij);
return {minWidth:u,width:u,maxWidth:u,minHeight:v,height:v,maxHeight:v};
}},destruct:function(){this._disposeFields(b,f);
}});
})();
(function(){var v="</div>",u="_blank",t="Verdana",s="sans-serif",r="<div class='description'>",q="",p="#FFFDED",o="<a target='_blank' href='",n="<div class='date'>",m="feedreader.view.Article",e="_applyArticle",l="feedreader/css/reader.css",h="blogEntry",c="<div class='container'>",b="a",g="Candara",f="<h1 class='blog'>",j="</h1>",a="auto",k="'>read more ...</a>",d="Object";
qx.Class.define(m,{extend:qx.ui.embed.Html,construct:function(){arguments.callee.base.call(this);
if(!feedreader.view.Article.__fP){feedreader.view.Article.__fP=true;
qx.bom.Stylesheet.includeFile(l);
}this.setCssClass(h);
this.setOverflowY(a);
this.setBackgroundColor(p);
var w=new qx.bom.Font(14,[g,t,s]);
w.setLineHeight(1.8);
this.setFont(w);
},properties:{article:{apply:e,nullable:true,check:d}},members:{_applyArticle:function(z,A){var B=this.__fQ();
this.setHtml(B);
qx.html.Element.flush();
var D=this.getContentElement().getDomElement();
var C=D.getElementsByTagName(b);
for(var i=0;i<C.length;i++){C[i].target=u;
}},__fQ:function(){var x=this.getArticle();
if(!x){return q;
}var y=new qx.util.StringBuilder();
y.add(c);
y.add(f,x.getTitle(),j);
y.add(n,x.getDate(),v);
y.add(r,x.getContent(),v);
y.add(o,x.getLink(),k);
y.add(v);
return y.get();
}}});
})();
(function(){var bw="Control",bv="End",bu="Left",bt="Meta",bs="Pause",br="Down",bq="Ctrl",bp="Home",bo="Apps",bn="Win",bc="Right",bb="Backspace",ba="Space",Y="Up",X="Shift",W="Enter",V="Scroll",U="Alt",T="key_full_Meta",S="PrintScreen",bD="NumLock",bE="Escape",bB="key_short_Alt",bC="key_short_Control_Mac",bz="key_short_Insert",bA="Del",bx="Num",by="key_full_Enter",bF="key_full_Control",bG="qx.locale.Key",bg="Tabulator",bf="key_full_Space",bi="key_short_Meta",bh="key_short_PageUp",bk="key_short_Pause",bj="key_full_Down",bm="key_short_Apps",bl="key_short_Win",be="key_full_Right",bd="key_short_Up",a="key_full_PageDown",b="key_full_Alt",c="PgDn",d="Esc",e="key_full_Insert",f="key_short_Space",g="key_short_Backspace",h="key_short_Home",i="key_short_Down",j="PgUp",bK="_Mac",bJ="key_short_CapsLock",bI="PageUp",bH="key_full_Up",bO="key_full_Home",bN="key_full_Backspace",bM="PageDown",bL="CapsLock",bQ="Ins",bP="key_short_PrintScreen",C="Tab",D="key_full_Apps",A="key_short_Tab",B="key_short_End",G="_",H="Caps",E="key_short_NumLock",F="key_full_Scroll",y="key_short_Left",z="key_short_Scroll",r="key_",q="key_full_Pause",t="key_short_Right",s="key_full_PrintScreen",n="key_full_Win",m="key_full_Control_Mac",p="key_short_Shift",o="key_short_PageDown",l="key_short_Enter",k="key_short_Control",M="Insert",N="key_short_Escape",O="key_full_Tab",P="Print",I="Delete",J="key_full_CapsLock",K="key_full_Escape",L="key_short_Delete",Q="key_full_PageUp",R="key_full_Shift",x="key_full_NumLock",w="key_full_Delete",v="key_full_End",u="key_full_Left";
qx.Class.define(bG,{statics:{getKeyName:function(bR,bS,bT){{};
var bV=r+bR+G+bS;
if(qx.bom.client.Platform.MAC&&bS==bw){bV+=bK;
}var bU=qx.locale.Manager.getInstance().translate(bV,[],bT);

if(bU==bV){return qx.locale.Key._keyNames[bV]||bS;
}else{return bU;
}}},defer:function(bW,bX,bY){var cb={};
var ca=qx.locale.Manager;
cb[ca.marktr(g)]=bb;
cb[ca.marktr(A)]=C;
cb[ca.marktr(f)]=ba;
cb[ca.marktr(l)]=W;
cb[ca.marktr(p)]=X;
cb[ca.marktr(k)]=bq;
cb[ca.marktr(bC)]=bq;
cb[ca.marktr(bB)]=U;
cb[ca.marktr(bJ)]=H;
cb[ca.marktr(bi)]=bt;
cb[ca.marktr(N)]=d;
cb[ca.marktr(y)]=bu;
cb[ca.marktr(bd)]=Y;
cb[ca.marktr(t)]=bc;
cb[ca.marktr(i)]=br;
cb[ca.marktr(bh)]=j;
cb[ca.marktr(o)]=c;
cb[ca.marktr(B)]=bv;
cb[ca.marktr(h)]=bp;
cb[ca.marktr(bz)]=bQ;
cb[ca.marktr(L)]=bA;
cb[ca.marktr(E)]=bx;
cb[ca.marktr(bP)]=P;
cb[ca.marktr(z)]=V;
cb[ca.marktr(bk)]=bs;
cb[ca.marktr(bl)]=bn;
cb[ca.marktr(bm)]=bo;
cb[ca.marktr(bN)]=bb;
cb[ca.marktr(O)]=bg;
cb[ca.marktr(bf)]=ba;
cb[ca.marktr(by)]=W;
cb[ca.marktr(R)]=X;
cb[ca.marktr(bF)]=bw;
cb[ca.marktr(m)]=bw;
cb[ca.marktr(b)]=U;
cb[ca.marktr(J)]=bL;
cb[ca.marktr(T)]=bt;
cb[ca.marktr(K)]=bE;
cb[ca.marktr(u)]=bu;
cb[ca.marktr(bH)]=Y;
cb[ca.marktr(be)]=bc;
cb[ca.marktr(bj)]=br;
cb[ca.marktr(Q)]=bI;
cb[ca.marktr(a)]=bM;
cb[ca.marktr(v)]=bv;
cb[ca.marktr(bO)]=bp;
cb[ca.marktr(e)]=M;
cb[ca.marktr(w)]=I;
cb[ca.marktr(x)]=bD;
cb[ca.marktr(s)]=S;
cb[ca.marktr(F)]=V;
cb[ca.marktr(q)]=bs;
cb[ca.marktr(n)]=bn;
cb[ca.marktr(D)]=bo;
bW._keyNames=cb;
}});
})();
(function(){var k="qx.io2.PartLoader",j="__fR",h="load",g="__fS",f="partLoaded",d="singleton",c="qx.event.type.Data";
qx.Class.define(k,{type:d,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__fR=[];
var s=this._getUris();

for(var i=0;i<s.length;i++){this.__fR.push(new qx.io2.part.Package(s[i],i==0));
}this.__fS={};
var p=qx.$$loader.parts;

for(var name in p){var o=p[name];
var r=[];

for(var i=0;i<o.length;i++){r.push(this.__fR[o[i]]);
}var q=new qx.io2.part.Part(name,r);
q.addListener(h,function(e){this.fireDataEvent(f,e.getTarget());
},this);
this.__fS[name]=q;
}},events:{"partLoaded":c},statics:{require:function(l,m,self){this.getInstance().require(l,m,self);
}},members:{require:function(t,u,self){var u=u||function(){};
var self=self||window;

if(qx.lang.Type.isString(t)){t=[t];
}var x=[];

for(var i=0;i<t.length;i++){x.push(this.getPart(t[i]));
}var w=0;
var v=function(){w+=1;

if(w>=x.length){u.call(self);
}};

for(var i=0;i<x.length;i++){x[i].load(v,this);
}},__fR:null,__fS:null,getPart:function(name){var n=this.__fS[name];

if(!n){throw new Error("No such part: "+name);
}return n;
},_getUris:function(){var a=qx.$$loader.uris;
var b=[];

for(var i=0;i<a.length;i++){b.push(this._decodeUris(a[i]));
}return b;
},_decodeUris:qx.$$loader.decodeUris},destruct:function(){this._disposeObjects(g,j);
}});
})();
(function(){var u="dblclick",t="click",s="visible",r="Boolean",q="excluded",p="qx.event.type.Data",o="_applyHideRoot",n="none",m="_applyRootOpenClose",l="__fT",f="_applyOpenMode",k="changeRoot",i="changeOpenMode",d="pane",c="_applyRoot",h="qx.ui.tree.Tree",g="qx.ui.tree.AbstractTreeItem",j="tree";
qx.Class.define(h,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IModelSelection],include:[qx.ui.core.MMultiSelectionHandling,qx.ui.core.MContentPadding,qx.ui.form.MModelSelection],construct:function(){arguments.callee.base.call(this);
this.__fT=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({allowShrinkY:false,allowGrowX:true});
this.getChildControl(d).add(this.__fT);
this.initOpenMode();
this.initRootOpenClose();
},events:{addItem:p,removeItem:p},properties:{openMode:{check:[t,u,n],init:u,apply:f,event:i,themeable:true},root:{check:g,init:null,nullable:true,event:k,apply:c},hideRoot:{check:r,init:false,apply:o},rootOpenClose:{check:r,init:false,apply:m},appearance:{refine:true,init:j},focusable:{refine:true,init:true}},members:{__fT:null,SELECTION_MANAGER:qx.ui.tree.SelectionManager,getChildrenContainer:function(){return this.__fT;
},_applyRoot:function(J,K){var L=this.getChildrenContainer();

if(K){L.remove(K);

if(K.hasChildren()){L.remove(K.getChildrenContainer());
}}
if(J){L.add(J);

if(J.hasChildren()){L.add(J.getChildrenContainer());
}J.setVisibility(this.getHideRoot()?q:s);
J.recursiveAddToWidgetQueue();
}},_applyHideRoot:function(G,H){var I=this.getRoot();

if(!I){return;
}I.setVisibility(G?q:s);
I.recursiveAddToWidgetQueue();
},_applyRootOpenClose:function(M,N){var O=this.getRoot();

if(!O){return;
}O.recursiveAddToWidgetQueue();
},_getContentPaddingTarget:function(){return this.__fT;
},getNextSiblingOf:function(P,Q){if((Q!==false||P.isOpen())&&P.hasChildren()){return P.getChildren()[0];
}
while(P){var parent=P.getParent();

if(!parent){return null;
}var S=parent.getChildren();
var R=S.indexOf(P);

if(R>-1&&R<S.length-1){return S[R+1];
}P=parent;
}return null;
},getPreviousSiblingOf:function(y,z,A){var parent=y.getParent();

if(!parent){return null;
}
if(this.getHideRoot()){if(parent==this.getRoot()){if(parent.getChildren()[0]==y){return null;
}}}else{if(y==this.getRoot()){return null;
}}var D=parent.getChildren();
var B=D.indexOf(y);

if(B>0){var C=D[B-1];

while((z!==false||C.isOpen())&&!(A==true)&&C.hasChildren()){var E=C.getChildren();
C=E[E.length-1];
}return C;
}else{return parent;
}},getItems:function(U,V){if(this.getRoot()!=null){return this.getRoot().getItems(U,V,this.getHideRoot());
}else{return [];
}},getChildren:function(){if(this.getRoot()!=null){return [this.getRoot()];
}else{return [];
}},scrollChildIntoViewY:function(v,w,x){if(!this.getNextSiblingOf(v,false)){this.scrollToY(1000000);
}else{arguments.callee.base.call(this,v,w,x);
}},getTreeItem:function(T){while(T){if(T==this){return null;
}
if(T instanceof qx.ui.tree.AbstractTreeItem){return T;
}T=T.getLayoutParent();
}return null;
},_applyOpenMode:function(a,b){if(b==t){this.removeListener(t,this._onOpen,this);
}else if(b==u){this.removeListener(u,this._onOpen,this);
}
if(a==t){this.addListener(t,this._onOpen,this);
}else if(a==u){this.addListener(u,this._onOpen,this);
}},_onOpen:function(e){var F=this.getTreeItem(e.getTarget());

if(!F||!F.isOpenable()){return;
}F.setOpen(!F.isOpen());
e.stopPropagation();
}},destruct:function(){this._disposeObjects(l);
}});
})();


if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) qx.event.handler.Application.onScriptLoaded();
