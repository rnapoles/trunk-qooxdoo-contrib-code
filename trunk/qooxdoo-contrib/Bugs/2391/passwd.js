(function() {
  
if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application": "passwd.Application", "qx.theme": "passwd.theme.Theme", "qx.version": "0.8.3"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug": "off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"passwd": {"resourceUri": "resource", "version": "trunk", "sourceUri": "script"}, "qx": {"resourceUri": "resource", "version": "trunk", "sourceUri": "script"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -474, 0], "qx/decoration/Modern/window/captionbar-inactive-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, 0], "qx/icon/Tango/16/actions/view-refresh.png": [16, 16, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-r.png": [5, 136, "png", "qx", "qx/decoration/Modern/shadow-small-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -192], "qx/decoration/Modern/tabview-pane-tb-combined.png": [30, 180, "png", "qx"], "qx/decoration/Modern/form/radiobutton-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -572, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/form/button-focused-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -132], "qx/icon/Tango/22/mimetypes/office-document.png": [22, 22, "png", "qx"], "qx/decoration/Modern/shadow/shadow-r.png": [15, 382, "png", "qx", "qx/decoration/Modern/shadow-lr-combined.png", -15, 0], "qx/decoration/Modern/shadow/shadow-tl.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, 0], "qx/decoration/Modern/window/minimize-active-hovered.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -9, 0], "qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png": [76, 15, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -69, 0], "qx/decoration/Modern/cursors/nodrop.gif": [20, 20, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", 0, 0], "qx/decoration/Modern/form/button-preselected-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -36, 0], "qx/decoration/Modern/tabview/tab-button-top-inactive-r.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png", 0, 0], "qx/decoration/Modern/window/close-active-hovered.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -72, 0], "qx/decoration/Modern/window/captionbar-inactive-r.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-inactive-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-l.png": [5, 14, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png", -5, 0], "qx/decoration/Modern/form/button-focused-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -16], "qx/decoration/Modern/tabview/tab-button-right-active-l.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-lr-combined.png", -5, 0], "qx/decoration/Modern/tree-combined.png": [32, 8, "png", "qx"], "qx/decoration/Modern/tabview-button-left-active-lr-combined.png": [10, 37, "png", "qx"], "qx/decoration/Modern/form/button-pressed-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -32, 0], "qx/decoration/Modern/tabview/tab-button-right-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -104], "qx/decoration/Modern/groupbox-tb-combined.png": [4, 24, "png", "qx"], "qx/decoration/Modern/tree/closed-selected.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", 0, 0], "qx/decoration/Modern/toolbar/toolbar-gradient.png": [20, 130, "png", "qx", "qx/decoration/Modern/toolbar-combined.png", -20, 0], "qx/decoration/Modern/colorselector/brightness-field.png": [19, 256, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tabview-pane-tr.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -30], "qx/decoration/Modern/window/captionbar-active-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -30], "qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png": [10, 12, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -59, 0], "qx/decoration/Modern/pane-tb-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, 0], "qx/decoration/Modern/menu/radiobutton.gif": [16, 5, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", 0, 0], "qx/decoration/Modern/arrows/right.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -5, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -20], "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-right-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, 0], "qx/decoration/Modern/pane/pane-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -6], "qx/decoration/Modern/form/button-hovered-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -12], "qx/decoration/Modern/window/captionbar-inactive-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -18], "qx/decoration/Modern/form/input.png": [84, 12, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -70, 0], "qx/decoration/Modern/window/statusbar-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -418, 0], "qx/decoration/Modern/form/button-focused-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -152], "qx/decoration/Modern/form/button-disabled-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -92], "qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png": [6, 39, "png", "qx"], "qx/decoration/Modern/form/button-checked-focused-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/radiobutton-checked-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -306, 0], "qx/icon/Tango/32/mimetypes/office-document.png": [32, 32, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-l.png": [4, 51, "png", "qx", "qx/decoration/Modern/groupbox-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-focused-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -48, 0], "qx/decoration/Modern/window-captionbar-lr-active-combined.png": [12, 9, "png", "qx"], "qx/decoration/Modern/shadow/shadow-l.png": [15, 382, "png", "qx", "qx/decoration/Modern/shadow-lr-combined.png", 0, 0], "qx/decoration/Modern/shadow/shadow-tr.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -60], "qx/decoration/Modern/form/button-preselected-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -48], "qx/decoration/Modern/menu-checkradio-combined.gif": [64, 7, "gif", "qx"], "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png": [15, 76, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -12, 0], "qx/decoration/Modern/cursors/move.gif": [13, 9, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", -20, 0], "qx/decoration/Modern/form/button-checked-focused-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -184], "qx/decoration/Modern/form/button-preselected-focused-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -180], "qx/decoration/Modern/form/checkbox-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -516, 0], "qx/decoration/Modern/form/checkbox-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -558, 0], "qx/decoration/Modern/form/button-disabled-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -164], "qx/decoration/Modern/menu/checkbox-invert.gif": [16, 7, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", -16, 0], "qx/decoration/Modern/tabview/tabview-pane-l.png": [30, 2, "png", "qx", "qx/decoration/Modern/tabview-pane-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-c.png": [14, 39, "png", "qx"], "qx/decoration/Modern/form/button-checked-focused-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -12, 0], "qx/decoration/Modern/form/radiobutton-checked-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -42, 0], "qx/decoration/Modern/window/captionbar-inactive-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -30], "qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png": [10, 14, "png", "qx"], "qx/decoration/Modern/colorselector/huesaturation-field.jpg": [256, 256, "jpeg", "qx"], "qx/decoration/Modern/shadow-small-lr-combined.png": [10, 136, "png", "qx"], "qx/decoration/Modern/window/captionbar-active-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -6], "qx/decoration/Modern/tabview/tab-button-right-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -5], "qx/decoration/Modern/form/button-pressed-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -84], "qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/inputcheckradio-combined.png": [628, 14, "png", "qx"], "qx/decoration/Modern/form/button-disabled-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -120], "qx/decoration/Modern/tooltip-error-lr-combined.png": [12, 18, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-top-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/tabview/tab-button-right-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -10], "qx/decoration/Modern/form/button-hovered-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -168], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -348, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-c.png": [20, 14, "png", "qx"], "qx/decoration/Modern/menu/radiobutton-invert.gif": [16, 5, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", -32, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png", 0, 0], "qx/icon/Tango/16/actions/dialog-cancel.png": [16, 16, "png", "qx"], "qx/decoration/Modern/form/checkbox-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -530, 0], "qx/decoration/Modern/window/captionbar-active-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -24], "qx/decoration/Modern/tabview/tab-button-right-active-r.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-left-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -25], "qx/decoration/Modern/form/tooltip-error-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -30], "qx/decoration/Modern/table/header-cell.png": [20, 18, "png", "qx", "qx/decoration/Modern/table-combined.png", -54, 0], "qx/decoration/Modern/pane/pane-l.png": [6, 238, "png", "qx", "qx/decoration/Modern/pane-lr-combined.png", -6, 0], "qx/decoration/Modern/tabview/tab-button-top-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -20], "qx/decoration/Modern/window/maximize-active-hovered.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -45, 0], "qx/decoration/Modern/form/input-focused.png": [40, 12, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -224, 0], "qx/decoration/Modern/form/radiobutton-checked-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -264, 0], "qx/decoration/Modern/tabview/tabview-pane-b.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -60], "qx/decoration/Modern/tabview/tabview-pane-tl.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -90], "qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -56, 0], "qx/icon/Tango/16/actions/dialog-ok.png": [16, 16, "png", "qx"], "qx/decoration/Modern/colorselector/huesaturation-handle.gif": [11, 11, "gif", "qx", "qx/decoration/Modern/colorselector-combined.gif", -35, 0], "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png": [12, 10, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -8, 0], "qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png": [6, 15, "png", "qx"], "qx/static/blank.gif": [1, 1, "gif", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-up.png": [6, 4, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -53, 0], "qx/decoration/Modern/pane-lr-combined.png": [12, 238, "png", "qx"], "qx/decoration/Modern/form/checkbox-checked-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -404, 0], "qx/icon/Tango/22/places/folder.png": [22, 22, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/window/captionbar-active-l.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-active-combined.png", -6, 0], "qx/decoration/Modern/shadow/shadow-t.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -30], "qx/decoration/Modern/window-captionbar-lr-inactive-combined.png": [12, 9, "png", "qx"], "qx/icon/Tango/22/places/folder-open.png": [22, 22, "png", "qx"], "qx/decoration/Modern/window/statusbar-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -12], "qx/decoration/Modern/toolbar/toolbar-gradient-blue.png": [20, 130, "png", "qx", "qx/decoration/Modern/toolbar-combined.png", 0, 0], "qx/decoration/Modern/window/captionbar-inactive-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -6], "qx/decoration/Modern/groupbox/groupbox-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, 0], "qx/decoration/Modern/pane/pane-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -12], "qx/decoration/Modern/form/button-hovered-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -28], "passwd/test.png": [32, 32, "png", "passwd"], "qx/decoration/Modern/window-captionbar-buttons-combined.png": [108, 9, "png", "qx"], "qx/decoration/Modern/pane/pane-r.png": [6, 238, "png", "qx", "qx/decoration/Modern/pane-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-hovered-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -32], "qx/decoration/Modern/window/captionbar-active-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -18], "qx/decoration/Modern/window-captionbar-tb-active-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -8], "qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/window/statusbar-l.png": [4, 7, "png", "qx", "qx/decoration/Modern/window-statusbar-lr-combined.png", -4, 0], "qx/decoration/Modern/shadow/shadow-b.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -75], "qx/decoration/Modern/form/button-disabled-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -72], "qx/decoration/Modern/scrollbar/scrollbar-down.png": [6, 4, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -145, 0], "qx/decoration/Modern/cursors-combined.gif": [71, 20, "gif", "qx"], "qx/decoration/Modern/scrollbar/slider-knob-background.png": [12, 10, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -27, 0], "qx/decoration/Modern/form/button-disabled-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -128], "qx/decoration/Modern/window/statusbar-r.png": [4, 7, "png", "qx", "qx/decoration/Modern/window-statusbar-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-right-inactive-c.png": [14, 39, "png", "qx"], "qx/decoration/Modern/window/captionbar-inactive-l.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-inactive-combined.png", -6, 0], "qx/decoration/Modern/form/checkbox-checked-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -460, 0], "qx/decoration/Modern/form/button-preselected-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-top-active-r.png": [5, 12, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-lr-combined.png", 0, 0], "qx/decoration/Modern/arrows/forward.png": [10, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -43, 0], "qx/decoration/Modern/form/button-preselected-focused-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, 0], "qx/decoration/Modern/form/checkbox.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -278, 0], "qx/decoration/Modern/arrows-combined.png": [87, 8, "png", "qx"], "qx/decoration/Modern/arrows/left.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", 0, 0], "qx/decoration/Modern/form/button-focused-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -16, 0], "qx/decoration/Modern/cursors/copy.gif": [19, 15, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", -52, 0], "qx/decoration/Modern/tabview/tab-button-top-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-right-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -15], "qx/decoration/Modern/pane/pane-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -18], "qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/scrollbar/scrollbar-left.png": [4, 6, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -170, 0], "qx/decoration/Modern/button-tb-combined.png": [4, 216, "png", "qx"], "qx/decoration/Modern/pane/pane-c.png": [20, 238, "png", "qx"], "qx/decoration/Modern/form/button-preselected-focused-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -8], "qx/decoration/Modern/selection.png": [110, 20, "png", "qx"], "qx/decoration/Modern/table/select-column-order.png": [10, 9, "png", "qx", "qx/decoration/Modern/table-combined.png", -36, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png", 0, -3], "qx/decoration/Modern/arrows/up.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -35, 0], "qx/decoration/Modern/form/button-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -12], "qx/decoration/Modern/form/button-pressed-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -108], "qx/decoration/Modern/window/maximize-active.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -81, 0], "qx/decoration/Modern/tabview/tab-button-top-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, 0], "qx/decoration/Modern/form/button-preselected-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -20, 0], "qx/decoration/Modern/form/button-checked-focused-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -148], "qx/decoration/Modern/form/button-pressed-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -160], "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview/tabview-pane.png": [185, 250, "png", "qx"], "qx/decoration/Modern/window/captionbar-active-c.png": [20, 9, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -12], "qx/decoration/Modern/tabview/tabview-pane-t.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -150], "qx/decoration/Modern/tabview/tab-button-top-inactive-c.png": [20, 15, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-arrow.png": [11, 14, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -18], "qx/decoration/Modern/form/button-checked-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -40], "qx/decoration/Modern/groupbox/groupbox-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -20], "qx/decoration/Modern/form/button-preselected-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -52], "qx/decoration/Modern/form/button-hovered-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -40, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/form/button-focused-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/checkbox-checked.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -320, 0], "qx/decoration/Modern/window/close-inactive.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -63, 0], "qx/decoration/Modern/arrows/down.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -74, 0], "qx/decoration/Modern/tabview/tab-button-left-active-c.png": [12, 37, "png", "qx"], "qx/decoration/Modern/form/button-disabled-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -4, 0], "qx/decoration/Modern/window/captionbar-inactive-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -12], "qx/decoration/Modern/arrows/right-invert.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -15, 0], "qx/decoration/Modern/arrows/left-invert.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -30, 0], "qx/decoration/Modern/form/button-pressed-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -144], "qx/decoration/Modern/tabview/tabview-pane-r.png": [30, 2, "png", "qx", "qx/decoration/Modern/tabview-pane-lr-combined.png", -30, 0], "qx/decoration/Modern/form/button-preselected-focused-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -64, 0], "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview-button-right-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/tooltip-error-tb-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/tabview/tab-button-top-active-l.png": [5, 12, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-lr-combined.png", -5, 0], "qx/decoration/Modern/toolbar/toolbar-part.gif": [7, 1, "gif", "qx"], "qx/decoration/Modern/shadow/shadow-br.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tab-button-right-active-c.png": [12, 37, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -15], "qx/decoration/Modern/window/statusbar-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -4], "qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-left-active-l.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-lr-combined.png", -5, 0], "qx/decoration/Modern/form/button-preselected-focused-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", 0, 0], "qx/decoration/Modern/shadow-lr-combined.png": [30, 382, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-top-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -5], "qx/decoration/Modern/form/radiobutton-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -502, 0], "qx/decoration/Modern/form/checkbox-checked-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -544, 0], "qx/decoration/Modern/form/checkbox-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -586, 0], "qx/decoration/Modern/shadow/shadow-bl.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -45], "qx/decoration/Modern/tabview/tab-button-right-inactive-l.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/tree/open-selected.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", -24, 0], "qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", 0, 0], "qx/decoration/Modern/form/button-focused-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -88], "qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png", 0, -3], "qx/decoration/Modern/groupbox/groupbox-r.png": [4, 51, "png", "qx", "qx/decoration/Modern/groupbox-lr-combined.png", -4, 0], "qx/decoration/Modern/arrows/up-invert.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -53, 0], "qx/decoration/Modern/form/button-preselected-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -44], "qx/decoration/Modern/form/button-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -68, 0], "qx/decoration/Modern/window/statusbar-c.png": [20, 7, "png", "qx"], "qx/decoration/Modern/tree/closed.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", -8, 0], "qx/decoration/Modern/form/button-disabled-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/tree/open.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", -16, 0], "qx/decoration/Modern/table/ascending.png": [8, 5, "png", "qx", "qx/decoration/Modern/table-combined.png", -46, 0], "qx/decoration/Modern/groupbox/groupbox-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -16], "qx/decoration/Modern/menu/bar-background.png": [40, 20, "png", "qx", "qx/decoration/Modern/menu-background-combined.png", -20, 0], "qx/decoration/Modern/form/radiobutton-checked-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -390, 0], "qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png": [6, 15, "png", "qx"], "qx/decoration/Modern/tabview-button-left-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/menu/checkbox.gif": [16, 7, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", -48, 0], "qx/decoration/Modern/form/button-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -156], "qx/decoration/Modern/form/tooltip-error-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, 0], "qx/decoration/Modern/form/button-hovered-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -36], "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/window/close-active.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -54, 0], "qx/decoration/Modern/splitpane/knob-horizontal.png": [1, 8, "png", "qx", "qx/decoration/Modern/splitpane-knobs-combined.png", 0, 0], "qx/decoration/Modern/groupbox/groupbox-c.png": [20, 51, "png", "qx"], "qx/decoration/Modern/form/button-preselected-focused-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -25], "qx/decoration/Modern/form/radiobutton-checked-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -28, 0], "qx/decoration/Modern/arrows/down-invert.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -61, 0], "qx/decoration/Modern/menu/background.png": [20, 49, "png", "qx", "qx/decoration/Modern/menu-background-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -154, 0], "qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -210, 0], "qx/decoration/Modern/shadow-tb-combined.png": [15, 90, "png", "qx"], "qx/decoration/Modern/form/button-checked-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/window/restore-active-hovered.png": [9, 8, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -99, 0], "qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png": [6, 39, "png", "qx"], "qx/decoration/Modern/window/restore-active.png": [9, 8, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", 0, 0], "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -20], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png": [20, 15, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-bottom-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -25], "qx/decoration/Modern/table/boolean-true.png": [14, 14, "png", "qx", "qx/decoration/Modern/table-combined.png", -8, 0], "qx/decoration/Modern/window/captionbar-active-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -12], "qx/decoration/Modern/form/checkbox-checked-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -600, 0], "qx/decoration/Modern/form/button-preselected-focused-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -204], "qx/decoration/Modern/table/boolean-false.png": [14, 14, "png", "qx", "qx/decoration/Modern/table-combined.png", -22, 0], "qx/decoration/Modern/form/button-focused-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -44, 0], "qx/decoration/Modern/window/captionbar-inactive-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -24], "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tab-button-top-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -25], "qx/decoration/Modern/window/statusbar-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -20], "qx/decoration/Modern/form/button-preselected-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -112], "qx/decoration/Modern/form/button-pressed-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/cursors/alias.gif": [19, 15, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", -33, 0], "qx/decoration/Modern/tabview/tabview-pane-bl.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, 0], "qx/icon/Tango/16/places/folder.png": [16, 16, "png", "qx"], "qx/decoration/Modern/form/button-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -140], "qx/decoration/Modern/form/radiobutton-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -446, 0], "qx/decoration/Modern/tabview/tab-button-top-active-c.png": [20, 12, "png", "qx"], "qx/decoration/Modern/splitpane-knobs-combined.png": [8, 9, "png", "qx"], "qx/decoration/Modern/app-header.png": [110, 20, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -4], "qx/decoration/Modern/window/restore-inactive.png": [9, 8, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -27, 0], "qx/decoration/Modern/form/button-checked-focused-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -100], "qx/decoration/Modern/shadow/shadow-small-l.png": [5, 136, "png", "qx", "qx/decoration/Modern/shadow-small-lr-combined.png", -5, 0], "qx/icon/Tango/16/actions/window-close.png": [16, 16, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/form/button-checked-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -52, 0], "qx/decoration/Modern/shadow/shadow-small-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -20], "qx/decoration/Modern/tabview-button-top-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/tabview/tabview-pane-c.png": [20, 2, "png", "qx"], "qx/decoration/Modern/form/button-pressed-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -64], "qx/decoration/Modern/form/radiobutton.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -334, 0], "qx/decoration/Modern/form/button-checked-focused-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -136], "qx/decoration/Modern/arrows/rewind.png": [10, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -20, 0], "qx/decoration/Modern/window/captionbar-active-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, 0], "qx/decoration/Modern/form/checkbox-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -376, 0], "qx/decoration/Modern/tabview-button-right-active-lr-combined.png": [10, 37, "png", "qx"], "qx/decoration/Modern/form/button-focused-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -124], "qx/decoration/Modern/shadow/shadow-small-c.png": [20, 136, "png", "qx"], "qx/decoration/Modern/window/statusbar-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -8], "qx/decoration/Modern/window-statusbar-tb-combined.png": [4, 24, "png", "qx"], "qx/decoration/Modern/form/button-focused-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -172], "qx/decoration/Modern/tabview/tabview-pane-br.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -120], "qx/decoration/Modern/button-lr-combined.png": [72, 52, "png", "qx"], "qx/decoration/Modern/form/button-preselected-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -196], "qx/decoration/Modern/tabview/tab-button-left-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/form/checkbox-checked-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -614, 0], "qx/decoration/Modern/shadow/shadow-small-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -5], "qx/decoration/Modern/tabview/tab-button-right-inactive-r.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -20], "qx/icon/Tango/16/apps/utilities-color-chooser.png": [16, 16, "png", "qx"], "qx/decoration/Modern/shadow/shadow-c.png": [20, 382, "png", "qx"], "qx/decoration/Modern/table-combined.png": [74, 18, "png", "qx"], "qx/decoration/Modern/pane/pane-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-checked.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -292, 0], "qx/decoration/Modern/arrows/up-small.png": [5, 3, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -69, 0], "qx/decoration/Modern/form/tooltip-error-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -6], "qx/decoration/Modern/scrollbar-combined.png": [174, 76, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -20], "qx/decoration/Modern/toolbar-combined.png": [40, 130, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -24], "qx/decoration/Modern/form/checkbox-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -488, 0], "qx/decoration/Modern/form/button-disabled-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -208], "qx/decoration/Modern/form/button-preselected-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -56], "qx/decoration/Modern/form/button-pressed-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -24, 0], "qx/decoration/Modern/tabview/tab-button-left-active-r.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tab-button-bottom-active-r.png": [5, 14, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png", 0, 0], "qx/icon/Tango/16/places/folder-open.png": [16, 16, "png", "qx"], "qx/decoration/Modern/window-statusbar-lr-combined.png": [8, 7, "png", "qx"], "qx/decoration/Modern/groupbox-lr-combined.png": [8, 51, "png", "qx"], "qx/decoration/Modern/form/button-checked-focused-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -4], "qx/decoration/Modern/form/radiobutton-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -14, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-r.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -432, 0], "qx/decoration/Modern/tabview/tab-button-top-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png", 0, 0], "qx/decoration/Modern/form/checkbox-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -196, 0], "qx/decoration/Modern/form/button-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -60], "qx/decoration/Modern/toolbar/toolbar-handle-knob.gif": [1, 8, "gif", "qx"], "qx/decoration/Modern/form/button-checked-focused-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -68], "qx/decoration/Modern/form/button-checked-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -76], "qx/decoration/Modern/window/minimize-inactive.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -36, 0], "qx/decoration/Modern/form/tooltip-error-l.png": [6, 18, "png", "qx", "qx/decoration/Modern/tooltip-error-lr-combined.png", 0, 0], "qx/decoration/Modern/arrows/down-small.png": [5, 3, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -82, 0], "qx/decoration/Modern/colorselector/brightness-handle.gif": [35, 11, "gif", "qx", "qx/decoration/Modern/colorselector-combined.gif", 0, 0], "qx/icon/Tango/32/places/folder.png": [32, 32, "png", "qx"], "qx/decoration/Modern/pane/pane-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -30], "qx/decoration/Modern/splitpane/knob-vertical.png": [8, 1, "png", "qx", "qx/decoration/Modern/splitpane-knobs-combined.png", 0, -8], "qx/decoration/Modern/scrollbar/scrollbar-right.png": [4, 6, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -39, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/tabview-button-top-active-lr-combined.png": [10, 12, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -25], "qx/decoration/Modern/form/button-hovered-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -60, 0], "qx/decoration/Modern/shadow-small-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/menu-background-combined.png": [60, 49, "png", "qx"], "qx/decoration/Modern/form/button-checked-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -188], "qx/decoration/Modern/tabview/tab-button-top-inactive-l.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/colorselector-combined.gif": [46, 11, "gif", "qx"], "qx/decoration/Modern/pane/pane-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -24], "qx/decoration/Modern/tabview/tab-button-right-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -5], "qx/decoration/Modern/tabview/tab-button-left-inactive-l.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png", 0, 0], "qx/icon/Tango/16/mimetypes/office-document.png": [16, 16, "png", "qx"], "qx/decoration/Modern/form/radiobutton-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -168, 0], "qx/decoration/Modern/form/checkbox-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -182, 0], "qx/decoration/Modern/window/statusbar-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -16], "qx/decoration/Modern/window/maximize-inactive.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -18, 0], "qx/decoration/Modern/tabview-pane-lr-combined.png": [60, 2, "png", "qx"], "qx/decoration/Modern/form/button-hovered-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -80], "qx/decoration/Modern/form/button-preselected-focused-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -96], "qx/decoration/Modern/window/minimize-active.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -90, 0], "qx/decoration/Modern/tabview/tab-button-left-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, 0], "qx/decoration/Modern/window/captionbar-active-r.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-active-combined.png", 0, 0], "qx/decoration/Modern/table/descending.png": [8, 5, "png", "qx", "qx/decoration/Modern/table-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -116], "qx/decoration/Modern/tabview/tab-button-left-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -5], "qx/decoration/Modern/arrows/down-small-invert.png": [5, 3, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -10, 0], "qx/icon/Tango/16/apps/office-calendar.png": [16, 16, "png", "qx"], "qx/icon/Tango/32/places/folder-open.png": [32, 32, "png", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png": [10, 19, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -43, 0], "qx/decoration/Modern/form/button-checked-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -176], "qx/decoration/Modern/form/tooltip-error-r.png": [6, 18, "png", "qx", "qx/decoration/Modern/tooltip-error-lr-combined.png", -6, 0], "qx/decoration/Modern/form/button-pressed-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -200], "qx/decoration/Modern/form/button-preselected-focused-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -212], "qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -362, 0], "qx/decoration/Modern/form/button-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/button-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -56, 0], "qx/decoration/Modern/form/button-hovered-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -24], "qx/decoration/Modern/form/button-disabled-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -28, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png": [19, 10, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -151, 0], "qx/decoration/Modern/window/captionbar-inactive-c.png": [20, 9, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-c.png": [20, 18, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-right-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png", 0, -3]};
qx.$$translations = {};
qx.$$locales = {"C": {"cldr_date_format_long": "MMMM d, yyyy", "cldr_month_format_wide_11": "November", "cldr_month_format_wide_12": "December", "cldr_month_format_wide_10": "October", "cldr_time_format_long": "h:mm:ss a z", "cldr_day_format_abbreviated_sat": "Sat", "cldr_month_format_abbreviated_8": "Aug", "cldr_month_format_wide_7": "July", "cldr_day_stand-alone_abbreviated_tue": "Tue", "cldr_day_format_wide_sun": "Sunday", "cldr_day_format_wide_wed": "Wednesday", "cldr_day_format_narrow_thu": "T", "cldr_day_format_narrow_fri": "F", "cldr_month_format_wide_5": "May", "cldr_day_stand-alone_wide_sat": "Saturday", "cldr_month_stand-alone_narrow_3": "M", "cldr_month_stand-alone_narrow_1": "J", "cldr_day_format_narrow_sun": "S", "cldr_date_time_format_MEd": "E, M/d", "cldr_date_time_format_MMM": "LLL", "cldr_month_stand-alone_narrow_5": "M", "cldr_day_format_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_7": "J", "cldr_month_stand-alone_narrow_6": "J", "cldr_month_stand-alone_narrow_9": "S", "cldr_day_stand-alone_wide_sun": "Sunday", "cldr_date_time_format_Md": "M/d", "cldr_month_stand-alone_narrow_4": "A", "cldr_day_stand-alone_wide_fri": "Friday", "cldr_month_stand-alone_narrow_2": "F", "cldr_day_format_abbreviated_fri": "Fri", "cldr_day_stand-alone_abbreviated_fri": "Fri", "cldr_pm": "PM", "cldr_day_format_narrow_tue": "T", "alternateQuotationEnd": "’", "cldr_date_time_format_M": "L", "cldr_month_stand-alone_narrow_8": "A", "quotationEnd": "”", "cldr_day_stand-alone_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_11": "N", "cldr_month_stand-alone_narrow_10": "O", "cldr_month_stand-alone_narrow_12": "D", "cldr_day_format_wide_thu": "Thursday", "cldr_day_stand-alone_narrow_sat": "S", "cldr_day_format_wide_tue": "Tuesday", "cldr_day_format_wide_fri": "Friday", "cldr_date_format_medium": "MMM d, yyyy", "cldr_day_format_narrow_sat": "S", "cldr_date_format_full": "EEEE, MMMM d, yyyy", "cldr_day_stand-alone_wide_thu": "Thursday", "quotationStart": "“", "cldr_date_time_format_MMMd": "MMM d", "cldr_day_format_abbreviated_tue": "Tue", "cldr_day_format_abbreviated_mon": "Mon", "cldr_date_time_format_yM": "M/yyyy", "cldr_day_stand-alone_wide_mon": "Monday", "cldr_date_time_format_MMMEd": "E, MMM d", "cldr_date_time_format_yQ": "Q yyyy", "cldr_date_time_format_hm": "h:mm a", "cldr_day_stand-alone_narrow_sun": "S", "cldr_day_stand-alone_abbreviated_sat": "Sat", "cldr_month_format_wide_1": "January", "cldr_month_format_wide_3": "March", "cldr_month_format_wide_2": "February", "cldr_day_stand-alone_abbreviated_sun": "Sun", "cldr_month_format_wide_4": "April", "cldr_date_time_format_MMMMd": "MMMM d", "cldr_month_format_wide_6": "June", "cldr_month_format_wide_9": "September", "cldr_month_format_wide_8": "August", "cldr_day_stand-alone_narrow_tue": "T", "cldr_date_time_format_MMMMEd": "E, MMMM d", "cldr_day_stand-alone_narrow_wed": "W", "cldr_time_format_full": "h:mm:ss a v", "cldr_am": "AM", "cldr_number_decimal_separator": ".", "cldr_number_percent_format": "#,##0%", "cldr_day_stand-alone_wide_wed": "Wednesday", "cldr_number_group_separator": ",", "alternateQuotationStart": "‘", "cldr_day_format_abbreviated_sun": "Sun", "cldr_time_format_short": "h:mm a", "cldr_date_time_format_Hms": "HH:mm:ss", "cldr_time_format_medium": "h:mm:ss a", "cldr_date_time_format_ms": "mm:ss", "cldr_day_stand-alone_narrow_thu": "T", "cldr_month_format_abbreviated_1": "Jan", "cldr_month_format_abbreviated_2": "Feb", "cldr_month_format_abbreviated_3": "Mar", "cldr_month_format_abbreviated_4": "Apr", "cldr_month_format_abbreviated_5": "May", "cldr_month_format_abbreviated_6": "Jun", "cldr_month_format_abbreviated_7": "Jul", "cldr_date_time_format_yMMMEd": "EEE, MMM d, yyyy", "cldr_month_format_abbreviated_9": "Sep", "cldr_day_format_wide_mon": "Monday", "cldr_date_time_format_yMEd": "EEE, M/d/yyyy", "cldr_month_format_abbreviated_10": "Oct", "cldr_date_time_format_y": "yyyy", "cldr_day_stand-alone_wide_tue": "Tuesday", "cldr_day_format_narrow_wed": "W", "cldr_day_format_abbreviated_wed": "Wed", "cldr_date_time_format_yQQQ": "QQQ yyyy", "cldr_day_stand-alone_narrow_fri": "F", "cldr_date_time_format_yMMM": "MMM yyyy", "cldr_day_stand-alone_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_mon": "Mon", "cldr_day_format_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_wed": "Wed", "cldr_date_time_format_yMMMM": "MMMM yyyy", "cldr_month_format_abbreviated_12": "Dec", "cldr_date_time_format_Hm": "HH:mm", "cldr_month_format_abbreviated_11": "Nov", "cldr_day_format_wide_sat": "Saturday", "cldr_date_time_format_d": "d", "cldr_date_format_short": "M/d/yy"}, "en": {"cldr_date_format_long": "MMMM d, yyyy", "cldr_month_format_wide_11": "November", "cldr_month_format_wide_12": "December", "cldr_month_format_wide_10": "October", "cldr_time_format_long": "h:mm:ss a z", "cldr_day_format_abbreviated_sat": "Sat", "cldr_month_format_abbreviated_8": "Aug", "cldr_month_format_wide_7": "July", "cldr_day_stand-alone_abbreviated_tue": "Tue", "cldr_day_format_wide_sun": "Sunday", "cldr_day_format_wide_wed": "Wednesday", "cldr_day_format_narrow_thu": "T", "cldr_day_format_narrow_fri": "F", "cldr_month_format_wide_5": "May", "cldr_day_stand-alone_wide_sat": "Saturday", "cldr_month_stand-alone_narrow_3": "M", "cldr_month_stand-alone_narrow_1": "J", "cldr_day_format_narrow_sun": "S", "cldr_date_time_format_MEd": "E, M/d", "cldr_date_time_format_MMM": "LLL", "cldr_month_stand-alone_narrow_5": "M", "cldr_day_format_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_7": "J", "cldr_month_stand-alone_narrow_6": "J", "cldr_month_stand-alone_narrow_9": "S", "cldr_day_stand-alone_wide_sun": "Sunday", "cldr_date_time_format_Md": "M/d", "cldr_month_stand-alone_narrow_4": "A", "cldr_day_stand-alone_wide_fri": "Friday", "cldr_month_stand-alone_narrow_2": "F", "cldr_day_format_abbreviated_fri": "Fri", "cldr_day_stand-alone_abbreviated_fri": "Fri", "cldr_pm": "PM", "cldr_day_format_narrow_tue": "T", "alternateQuotationEnd": "’", "cldr_date_time_format_M": "L", "cldr_month_stand-alone_narrow_8": "A", "quotationEnd": "”", "cldr_day_stand-alone_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_11": "N", "cldr_month_stand-alone_narrow_10": "O", "cldr_month_stand-alone_narrow_12": "D", "cldr_day_format_wide_thu": "Thursday", "cldr_day_stand-alone_narrow_sat": "S", "cldr_day_format_wide_tue": "Tuesday", "cldr_day_format_wide_fri": "Friday", "cldr_date_format_medium": "MMM d, yyyy", "cldr_day_format_narrow_sat": "S", "cldr_date_format_full": "EEEE, MMMM d, yyyy", "cldr_day_stand-alone_wide_thu": "Thursday", "quotationStart": "“", "cldr_date_time_format_MMMd": "MMM d", "cldr_day_format_abbreviated_tue": "Tue", "cldr_day_format_abbreviated_mon": "Mon", "cldr_date_time_format_yM": "M/yyyy", "cldr_day_stand-alone_wide_mon": "Monday", "cldr_date_time_format_MMMEd": "E, MMM d", "cldr_date_time_format_yQ": "Q yyyy", "cldr_date_time_format_hm": "h:mm a", "cldr_day_stand-alone_narrow_sun": "S", "cldr_day_stand-alone_abbreviated_sat": "Sat", "cldr_month_format_wide_1": "January", "cldr_month_format_wide_3": "March", "cldr_month_format_wide_2": "February", "cldr_day_stand-alone_abbreviated_sun": "Sun", "cldr_month_format_wide_4": "April", "cldr_date_time_format_MMMMd": "MMMM d", "cldr_month_format_wide_6": "June", "cldr_month_format_wide_9": "September", "cldr_month_format_wide_8": "August", "cldr_day_stand-alone_narrow_tue": "T", "cldr_date_time_format_MMMMEd": "E, MMMM d", "cldr_day_stand-alone_narrow_wed": "W", "cldr_time_format_full": "h:mm:ss a v", "cldr_am": "AM", "cldr_number_decimal_separator": ".", "cldr_number_percent_format": "#,##0%", "cldr_day_stand-alone_wide_wed": "Wednesday", "cldr_number_group_separator": ",", "alternateQuotationStart": "‘", "cldr_day_format_abbreviated_sun": "Sun", "cldr_time_format_short": "h:mm a", "cldr_date_time_format_Hms": "HH:mm:ss", "cldr_time_format_medium": "h:mm:ss a", "cldr_date_time_format_ms": "mm:ss", "cldr_day_stand-alone_narrow_thu": "T", "cldr_month_format_abbreviated_1": "Jan", "cldr_month_format_abbreviated_2": "Feb", "cldr_month_format_abbreviated_3": "Mar", "cldr_month_format_abbreviated_4": "Apr", "cldr_month_format_abbreviated_5": "May", "cldr_month_format_abbreviated_6": "Jun", "cldr_month_format_abbreviated_7": "Jul", "cldr_date_time_format_yMMMEd": "EEE, MMM d, yyyy", "cldr_month_format_abbreviated_9": "Sep", "cldr_day_format_wide_mon": "Monday", "cldr_date_time_format_yMEd": "EEE, M/d/yyyy", "cldr_month_format_abbreviated_10": "Oct", "cldr_date_time_format_y": "yyyy", "cldr_day_stand-alone_wide_tue": "Tuesday", "cldr_day_format_narrow_wed": "W", "cldr_day_format_abbreviated_wed": "Wed", "cldr_date_time_format_yQQQ": "QQQ yyyy", "cldr_day_stand-alone_narrow_fri": "F", "cldr_date_time_format_yMMM": "MMM yyyy", "cldr_day_stand-alone_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_mon": "Mon", "cldr_day_format_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_wed": "Wed", "cldr_date_time_format_yMMMM": "MMMM yyyy", "cldr_month_format_abbreviated_12": "Dec", "cldr_date_time_format_Hm": "HH:mm", "cldr_month_format_abbreviated_11": "Nov", "cldr_day_format_wide_sat": "Saturday", "cldr_date_time_format_d": "d", "cldr_date_format_short": "M/d/yy"}};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["qx:passwd-0.js"]],
  boot : "boot",
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var prefix = libs[uri[0]].sourceUri;
      uris.push(prefix + "/" + uri[1]);
    }
    return uris;
  }
};  

(function(){var n=".",m="()",l="[Class ",k=".prototype",j="toString",h="qx.Bootstrap",g="]",f="Class";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return l+this.classname+g;
},createNamespace:function(name,v){var x=name.split(n);
var parent=window;
var w=x[0];

for(var i=0,y=x.length-1;i<y;i++,w=x[i]){if(!parent[w]){parent=parent[w]={};
}else{parent=parent[w];
}}parent[w]=v;
return w;
},setDisplayName:function(d,e,name){d.displayName=e+n+name+m;
},setDisplayNames:function(a,b){for(var name in a){var c=a[name];

if(c instanceof Function){c.displayName=b+n+name+m;
}}},define:function(name,o){if(!o){var o={statics:{}};
}var t;
var r=null;
qx.Bootstrap.setDisplayNames(o.statics,name);

if(o.members){qx.Bootstrap.setDisplayNames(o.members,name+k);
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
t.$$type=f;
if(!t.hasOwnProperty(j)){t.toString=this.genericToString;
}if(o.defer){o.defer(t,r);
}qx.Bootstrap.$$registry[name]=o.statics;
}};
qx.Bootstrap.define(h,{statics:{LOADSTART:new Date,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return this.$$registry[name];
},$$registry:{}}});
})();
(function(){var q="qx.allowUrlSettings",p="&",o="qx.core.Setting",n="qx.allowUrlVariants",m="qxsetting",l=":",k=".";
qx.Bootstrap.define(o,{statics:{__a:{},define:function(a,b){if(b===undefined){throw new Error('Default value of setting "'+a+'" must be defined!');
}
if(!this.__a[a]){this.__a[a]={};
}else if(this.__a[a].defaultValue!==undefined){throw new Error('Setting "'+a+'" is already defined!');
}this.__a[a].defaultValue=b;
},get:function(h){var j=this.__a[h];

if(j===undefined){throw new Error('Setting "'+h+'" is not defined.');
}
if(j.value!==undefined){return j.value;
}return j.defaultValue;
},set:function(c,d){if((c.split(k)).length<2){throw new Error('Malformed settings key "'+c+'". Must be following the schema "namespace.key".');
}
if(!this.__a[c]){this.__a[c]={};
}this.__a[c].value=d;
},__b:function(){if(window.qxsettings){for(var r in qxsettings){this.set(r,qxsettings[r]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(e){}this.__c();
}},__c:function(){if(this.get(q)!=true){return;
}var g=document.location.search.slice(1).split(p);

for(var i=0;i<g.length;i++){var f=g[i].split(l);

if(f.length!=3||f[0]!=m){continue;
}this.set(f[1],decodeURIComponent(f[2]));
}}},defer:function(s){s.define(q,false);
s.define(n,false);
s.__b();
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
(function(){var w="on",u="off",t="|",s="default",r="object",q="&",p="qx.aspects",o="$",n="qx.allowUrlVariants",m="qx.debug",e="qx.client",k="qx.dynlocale",h="webkit",d="qxvariant",c="opera",g=":",f="qx.core.Variant",j="mshtml",b="gecko";
qx.Bootstrap.define(f,{statics:{__e:{},__f:{},compilerIsSet:function(){return true;
},define:function(J,K,L){{};

if(!this.__e[J]){this.__e[J]={};
}else{}this.__e[J].allowedValues=K;
this.__e[J].defaultValue=L;
},get:function(D){var E=this.__e[D];
{};

if(E.value!==undefined){return E.value;
}return E.defaultValue;
},__g:function(){if(window.qxvariants){for(var I in qxvariants){{};

if(!this.__e[I]){this.__e[I]={};
}this.__e[I].value=qxvariants[I];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(a){}this.__h(this.__e);
}},__h:function(){if(qx.core.Setting.get(n)!=true){return;
}var O=document.location.search.slice(1).split(q);

for(var i=0;i<O.length;i++){var P=O[i].split(g);

if(P.length!=3||P[0]!=d){continue;
}var Q=P[1];

if(!this.__e[Q]){this.__e[Q]={};
}this.__e[Q].value=decodeURIComponent(P[2]);
}},select:function(F,G){{};

for(var H in G){if(this.isSet(F,H)){return G[H];
}}
if(G[s]!==undefined){return G[s];
}{};
},isSet:function(y,z){var A=y+o+z;

if(this.__f[A]!==undefined){return this.__f[A];
}var C=false;
if(z.indexOf(t)<0){C=this.get(y)===z;
}else{var B=z.split(t);

for(var i=0,l=B.length;i<l;i++){if(this.get(y)===B[i]){C=true;
break;
}}}this.__f[A]=C;
return C;
},__i:function(v){return typeof v===r&&v!==null&&v instanceof Array;
},__j:function(v){return typeof v===r&&v!==null&&!(v instanceof Array);
},__k:function(M,N){for(var i=0,l=M.length;i<l;i++){if(M[i]==N){return true;
}}return false;
}},defer:function(x){x.define(e,[b,j,c,h],qx.bom.client.Engine.NAME);
x.define(m,[w,u],w);
x.define(p,[w,u],u);
x.define(k,[w,u],w);
x.__g();
}});
})();
(function(){var bc="qx.client",bb='"',ba="valueOf",Y="toLocaleString",X="isPrototypeOf",W="",V="toString",U="qx.lang.Object",T='\", "',S="hasOwnProperty",R="Use 'clone()' instead!";
qx.Bootstrap.define(U,{statics:{empty:function(r){{};

for(var s in r){if(r.hasOwnProperty(s)){delete r[s];
}}},isEmpty:qx.core.Variant.select(bc,{"gecko":function(f){{};
return f.__count__===0;
},"default":function(P){{};

for(var Q in P){return false;
}return true;
}}),hasMinLength:qx.core.Variant.select(bc,{"gecko":function(y,z){{};
return y.__count__>=z;
},"default":function(g,h){{};

if(h<=0){return true;
}var length=0;

for(var j in g){if((++length)>=h){return true;
}}return false;
}}),getLength:qx.core.Variant.select(bc,{"gecko":function(M){{};
return M.__count__;
},"default":function(N){{};
var length=0;

for(var O in N){length++;
}return length;
}}),_shadowedKeys:[X,S,Y,V,ba],getKeys:qx.core.Variant.select(bc,{"mshtml":function(b){var c=[];

for(var e in b){c.push(e);
}var d=Object.prototype.hasOwnProperty;

for(var i=0,a=this._shadowedKeys,l=a.length;i<l;i++){if(d.call(b,a[i])){c.push(a[i]);
}}return c;
},"default":function(E){var F=[];

for(var G in E){F.push(G);
}return F;
}}),getKeysAsString:function(bd){{};
var be=qx.lang.Object.getKeys(bd);

if(be.length==0){return W;
}return bb+be.join(T)+bb;
},getValues:function(o){{};
var q=[];
var p=this.getKeys(o);

for(var i=0,l=p.length;i<l;i++){q.push(o[p[i]]);
}return q;
},mergeWith:function(A,B,C){{};

if(C===undefined){C=true;
}
for(var D in B){if(C||A[D]===undefined){A[D]=B[D];
}}return A;
},carefullyMergeWith:function(bf,bg){{};
return qx.lang.Object.mergeWith(bf,bg,false);
},merge:function(k,m){{};
var n=arguments.length;

for(var i=1;i<n;i++){qx.lang.Object.mergeWith(k,arguments[i]);
}return k;
},copy:function(bj){qx.log.Logger.deprecatedMethodWarning(arguments.callee,R);
return qx.lang.Object.clone(bj);
},clone:function(bk){{};
var bl={};

for(var bm in bk){bl[bm]=bk[bm];
}return bl;
},invert:function(J){{};
var K={};

for(var L in J){K[J[L].toString()]=L;
}return K;
},getKeyFromValue:function(v,w){{};

for(var x in v){if(v.hasOwnProperty(x)&&v[x]===w){return x;
}}return null;
},contains:function(t,u){{};
return this.getKeyFromValue(t,u)!==null;
},select:function(H,I){{};
return I[H];
},fromArray:function(bh){{};
var bi={};

for(var i=0,l=bh.length;i<l;i++){{};
bi[bh[i].toString()]=true;
}return bi;
}}});
})();
(function(){var o="Function",n="Boolean",m="Error",l="Number",k="Array",j="Date",i="RegExp",h="String",g="Object",f="qx.lang.Type",e="string";
qx.Bootstrap.define(f,{statics:{__l:{"[object String]":h,"[object Array]":k,"[object Object]":g,"[object RegExp]":i,"[object Number]":l,"[object Boolean]":n,"[object Date]":j,"[object Function]":o,"[object Error]":m},getClass:function(c){var d=Object.prototype.toString.call(c);
return (this.__l[d]||d.slice(8,-1));
},isString:function(a){return (a!==null&&(typeof a===e||this.getClass(a)==h||a instanceof String||(!!a&&!!a.$$isString)));
},isArray:function(t){return (t!==null&&(t instanceof Array||(t&&qx.Class.hasInterface(t.constructor,qx.data.IListData))||this.getClass(t)==k||(!!t&&!!t.$$isArray)));
},isObject:function(p){return (p!==undefined&&p!==null&&this.getClass(p)==g);
},isRegExp:function(v){return this.getClass(v)==i;
},isNumber:function(s){return (s!==null&&(this.getClass(s)==l||s instanceof Number));
},isBoolean:function(u){return (u!==null&&(this.getClass(u)==n||u instanceof Boolean));
},isDate:function(r){return (r!==null&&(this.getClass(r)==j||r instanceof Date));
},isError:function(b){return (b!==null&&(this.getClass(b)==m||b instanceof Error));
},isFunction:function(q){return this.getClass(q)==o;
}}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__m:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__m;
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
},addAdvice:function(n,o,p,name){this.__m.push({fcn:n,pos:o===c?-1:1,type:p,name:name});
}}});
})();
(function(){var ci="qx.aspects",ch="on",cg=".",cf="static",ce="[Class ",cd="]",cc="toString",cb="constructor",ca="member",bY="$$init_",bS=".prototype",bX="destructor",bV="extend",bR="destruct",bQ="Class",bU="off",bT="qx.Class",bW="qx.event.type.Data";
qx.Bootstrap.define(bT,{statics:{define:function(name,cj){if(!cj){var cj={};
}if(cj.include&&!(cj.include instanceof Array)){cj.include=[cj.include];
}if(cj.implement&&!(cj.implement instanceof Array)){cj.implement=[cj.implement];
}if(!cj.hasOwnProperty(bV)&&!cj.type){cj.type=cf;
}{};
var cl=this.__r(name,cj.type,cj.extend,cj.statics,cj.construct,cj.destruct);
if(cj.extend){if(cj.properties){this.__t(cl,cj.properties,true);
}if(cj.members){this.__v(cl,cj.members,true,true,false);
}if(cj.events){this.__s(cl,cj.events,true);
}if(cj.include){for(var i=0,l=cj.include.length;i<l;i++){this.__y(cl,cj.include[i],false);
}}}if(cj.settings){for(var ck in cj.settings){qx.core.Setting.define(ck,cj.settings[ck]);
}}if(cj.variants){for(var ck in cj.variants){qx.core.Variant.define(ck,cj.variants[ck].allowedValues,cj.variants[ck].defaultValue);
}}if(cj.implement){for(var i=0,l=cj.implement.length;i<l;i++){this.__x(cl,cj.implement[i]);
}}{};
if(cj.defer){cj.defer.self=cl;
cj.defer(cl,cl.prototype,{add:function(name,B){var C={};
C[name]=B;
qx.Class.__t(cl,C,true);
}});
}},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},getByName:function(name){return this.$$registry[name];
},include:function(br,bs){{};
qx.Class.__y(br,bs,false);
},patch:function(bo,bp){{};
qx.Class.__y(bo,bp,true);
},isSubClassOf:function(bd,be){if(!bd){return false;
}
if(bd==be){return true;
}
if(bd.prototype instanceof be){return true;
}return false;
},getPropertyDefinition:function(bn,name){while(bn){if(bn.$$properties&&bn.$$properties[name]){return bn.$$properties[name];
}bn=bn.superclass;
}return null;
},getProperties:function(bf){var bg=[];

while(bf){if(bf.$$properties){bg.push.apply(bg,qx.lang.Object.getKeys(bf.$$properties));
}bf=bf.superclass;
}return bg;
},getByProperty:function(bq,name){while(bq){if(bq.$$properties&&bq.$$properties[name]){return bq;
}bq=bq.superclass;
}return null;
},hasProperty:function(k,name){return !!this.getPropertyDefinition(k,name);
},getEventType:function(bh,name){var bh=bh.constructor;

while(bh.superclass){if(bh.$$events&&bh.$$events[name]!==undefined){return bh.$$events[name];
}bh=bh.superclass;
}return null;
},supportsEvent:function(D,name){return !!this.getEventType(D,name);
},hasOwnMixin:function(bb,bc){return bb.$$includes&&bb.$$includes.indexOf(bc)!==-1;
},getByMixin:function(T,U){var V,i,l;

while(T){if(T.$$includes){V=T.$$flatIncludes;

for(i=0,l=V.length;i<l;i++){if(V[i]===U){return T;
}}}T=T.superclass;
}return null;
},getMixins:function(Y){var ba=[];

while(Y){if(Y.$$includes){ba.push.apply(ba,Y.$$flatIncludes);
}Y=Y.superclass;
}return ba;
},hasMixin:function(P,Q){return !!this.getByMixin(P,Q);
},hasOwnInterface:function(bL,bM){return bL.$$implements&&bL.$$implements.indexOf(bM)!==-1;
},getByInterface:function(bN,bO){var bP,i,l;

while(bN){if(bN.$$implements){bP=bN.$$flatImplements;

for(i=0,l=bP.length;i<l;i++){if(bP[i]===bO){return bN;
}}}bN=bN.superclass;
}return null;
},getInterfaces:function(W){var X=[];

while(W){if(W.$$implements){X.push.apply(X,W.$$flatImplements);
}W=W.superclass;
}return X;
},hasInterface:function(R,S){return !!this.getByInterface(R,S);
},implementsInterface:function(F,G){var H=F.constructor;

if(this.hasInterface(H,G)){return true;
}
try{qx.Interface.assertObject(F,G);
return true;
}catch(bt){}
try{qx.Interface.assert(H,G,false);
return true;
}catch(bF){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return ce+this.classname+cd;
},$$registry:qx.Bootstrap.$$registry,__n:null,__o:null,__p:function(){},__q:function(){},__r:function(name,p,q,r,s,t){var y;

if(!q&&qx.core.Variant.isSet(ci,bU)){y=r||{};
qx.Bootstrap.setDisplayNames(y,name);
}else{y={};

if(q){if(!s){s=this.__z();
}y=this.__B(s,name,p);
qx.Bootstrap.setDisplayName(s,name,cb);
}if(r){qx.Bootstrap.setDisplayNames(r,name);
var z;

for(var i=0,a=qx.lang.Object.getKeys(r),l=a.length;i<l;i++){z=a[i];
var v=r[z];

if(qx.core.Variant.isSet(ci,ch)){if(v instanceof Function){v=qx.core.Aspect.wrap(name+cg+z,v,cf);
}y[z]=v;
}else{y[z]=v;
}}}}var x=qx.Bootstrap.createNamespace(name,y,false);
y.name=y.classname=name;
y.basename=x;
y.$$type=bQ;

if(p){y.$$classtype=p;
}if(!y.hasOwnProperty(cc)){y.toString=this.genericToString;
}
if(q){var A=q.prototype;
var u=this.__A();
u.prototype=A;
var w=new u;
y.prototype=w;
w.name=w.classname=name;
w.basename=x;
s.base=y.superclass=q;
s.self=y.constructor=w.constructor=y;
if(t){if(qx.core.Variant.isSet(ci,ch)){t=qx.core.Aspect.wrap(name,t,bX);
}y.$$destructor=t;
qx.Bootstrap.setDisplayName(t,name,bR);
}}this.$$registry[name]=y;
return y;
},__s:function(L,M,N){var O,O;
{};

if(L.$$events){for(var O in M){L.$$events[O]=M[O];
}}else{L.$$events=M;
}},__t:function(bG,bH,bI){var bK;

if(bI===undefined){bI=false;
}var bJ=!!bG.$$propertiesAttached;

for(var name in bH){bK=bH[name];
{};
bK.name=name;
if(!bK.refine){if(bG.$$properties===undefined){bG.$$properties={};
}bG.$$properties[name]=bK;
}if(bK.init!==undefined){bG.prototype[bY+name]=bK.init;
}if(bK.event!==undefined){var event={};
event[bK.event]=bW;
this.__s(bG,event,bI);
}if(bK.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(bJ){qx.core.Property.attachMethods(bG,name,bK);
}}},__u:null,__v:function(b,c,d,e,f){var g=b.prototype;
var j,h;
qx.Bootstrap.setDisplayNames(c,b.classname+bS);

for(var i=0,a=qx.lang.Object.getKeys(c),l=a.length;i<l;i++){j=a[i];
h=c[j];
{};
if(e!==false&&h instanceof Function&&h.$$type==null){if(f==true){h=this.__w(h,g[j]);
}else{if(g[j]){h.base=g[j];
}h.self=b;
}
if(qx.core.Variant.isSet(ci,ch)){h=qx.core.Aspect.wrap(b.classname+cg+j,h,ca);
}}g[j]=h;
}},__w:function(bu,bv){if(bv){return function(){var bj=bu.base;
bu.base=bv;
var bi=bu.apply(this,arguments);
bu.base=bj;
return bi;
};
}else{return bu;
}},__x:function(m,n){{};
var o=qx.Interface.flatten([n]);

if(m.$$implements){m.$$implements.push(n);
m.$$flatImplements.push.apply(m.$$flatImplements,o);
}else{m.$$implements=[n];
m.$$flatImplements=o;
}},__y:function(bw,bx,by){{};

if(this.hasMixin(bw,bx)){qx.log.Logger.warn('Mixin "'+bx.name+'" is already included into Class "'+bw.classname+'" by class: '+this.getByMixin(bw,bx).classname+'!');
return;
}var bA=qx.Mixin.flatten([bx]);
var bz;

for(var i=0,l=bA.length;i<l;i++){bz=bA[i];
if(bz.$$events){this.__s(bw,bz.$$events,by);
}if(bz.$$properties){this.__t(bw,bz.$$properties,by);
}if(bz.$$members){this.__v(bw,bz.$$members,by,by,by);
}}if(bw.$$includes){bw.$$includes.push(bx);
bw.$$flatIncludes.push.apply(bw.$$flatIncludes,bA);
}else{bw.$$includes=[bx];
bw.$$flatIncludes=bA;
}},__z:function(){function E(){arguments.callee.base.apply(this,arguments);
}return E;
},__A:function(){return function(){};
},__B:function(bB,name,bC){var bE=function(){var K=arguments.callee.constructor;
{};
if(!K.$$propertiesAttached){qx.core.Property.attach(K);
}var J=K.$$original.apply(this,arguments);
if(K.$$includes){var I=K.$$flatIncludes;

for(var i=0,l=I.length;i<l;i++){if(I[i].$$constructor){I[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return J;
};

if(qx.core.Variant.isSet("qx.aspects","on")){var bD=qx.core.Aspect.wrap(name,bE,"constructor");
bE.$$original=bB;
bE.constructor=bD;
bE=bD;
}if(bC==="singleton"){bE.getInstance=this.getInstance;
}bE.$$original=bB;
bB.wrapper=bE;
return bE;
}},defer:function(bk){if(qx.core.Variant.isSet(ci,ch)){for(var bl in qx.Bootstrap.$$registry){var bk=qx.Bootstrap.$$registry[bl];

for(var bm in bk){if(bk[bm] instanceof Function){bk[bm]=qx.core.Aspect.wrap(bl+cg+bm,bk[bm],cf);
}}}}}});
})();
(function(){var F="]",E="Theme",D="[Theme ",C="qx.Theme";
qx.Class.define(C,{statics:{define:function(name,J){if(!J){var J={};
}J.include=this.__C(J.include);
J.patch=this.__C(J.patch);
{};
var K={$$type:E,name:name,title:J.title,toString:this.genericToString};
if(J.extend){K.supertheme=J.extend;
}K.basename=qx.Bootstrap.createNamespace(name,K);
this.__G(K,J);
this.__D(K,J);
this.__E(K,J);
this.$$registry[name]=K;
for(var i=0,a=J.include,l=a.length;i<l;i++){this.include(K,a[i]);
}
for(var i=0,a=J.patch,l=a.length;i<l;i++){this.patch(K,a[i]);
}},__C:function(b){if(!b){return [];
}
if(qx.lang.Type.isArray(b)){return b;
}else{return [b];
}},__D:function(j,k){var m;
{};

if(k.resource){j.resource=k.resource;
}else if(k.extend&&k.extend.resource){j.resource=k.extend.resource;
}},__E:function(G,H){var I=H.aliases||{};

if(H.extend&&H.extend.aliases){qx.lang.Object.mergeWith(I,H.extend.aliases,false);
}G.aliases=I;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},genericToString:function(){return D+this.name+F;
},__F:function(n){for(var i=0,o=this.__H,l=o.length;i<l;i++){if(n[o[i]]){return o[i];
}}},__G:function(v,w){var z=this.__F(w);
if(w.extend&&!z){z=w.extend.type;
}v.type=z||"other";
if(!z){return;
}var B=function(){};
if(w.extend){B.prototype=new w.extend.$$clazz;
}var A=B.prototype;
var y=w[z];
for(var x in y){A[x]=y[x];
if(A[x].base){{};
A[x].base=w.extend;
}}v.$$clazz=B;
v[z]=new B;
},$$registry:{},__H:["colors","borders","decorations","fonts","icons","widgets","appearances","meta"],__I:null,__J:null,__K:function(){},patch:function(p,q){var s=this.__F(q);

if(s!==this.__F(p)){throw new Error("The mixins '"+p.name+"' are not compatible '"+q.name+"'!");
}var r=q[s];
var t=p.$$clazz.prototype;

for(var u in r){t[u]=r[u];
}},include:function(c,d){var f=d.type;

if(f!==c.type){throw new Error("The mixins '"+c.name+"' are not compatible '"+d.name+"'!");
}var e=d[f];
var g=c.$$clazz.prototype;

for(var h in e){if(g[h]!==undefined){continue;
}g[h]=e[h];
}}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var a="passwd.theme.Color";
qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var bQ=';',bP='computed=this.',bO='=value;',bN='this.',bM='if(this.',bL='!==undefined)',bK='delete this.',bJ="set",bI="setThemed",bH='}',bw="init",bv="setRuntime",bu='else if(this.',bt='return this.',bs="string",br="boolean",bq="resetThemed",bp='!==undefined){',bo='=true;',bn="resetRuntime",bX="reset",bY="refresh",bV='old=this.',bW='else ',bT='if(old===undefined)old=this.',bU='old=computed=this.',bR=' of an instance of ',bS=";",ca='if(old===computed)return value;',cb='if(old===undefined)old=null;',bA='(value);',bz=' is not (yet) ready!");',bC='===value)return value;',bB='return init;',bE='var init=this.',bD="Error in property ",bG='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',bF='.validate.call(this, value);',by='else{',bx=" in method ",z='=computed;',A='(backup);',B='if(computed===inherit){',C="inherit",D='if(value===undefined)prop.error(this,2,"',E='var computed, old=this.',F='else if(computed===undefined)',G="': ",H=" of class ",I='===undefined)return;',cf="')){",ce='else this.',cd='value=this.',cc='","',cj='if(init==qx.core.Property.$$inherit)init=null;',ci='var inherit=prop.$$inherit;',ch='var computed, old;',cg='computed=undefined;delete this.',cl='",value);',ck='computed=value;',X=';}',Y='){',V='if(computed===undefined||computed===inherit){',W='!==inherit){',bc='(computed, old, "',bd='return value;',ba='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bb="if(reg.hasListener(this, '",T=')a[i].',U='.$$properties.',Q="var reg=qx.event.Registration;",P='return null;',S='");',R='var pa=this.getLayoutParent();if(pa)computed=pa.',M='!==undefined&&',L="', qx.event.type.Data, [computed, old]",O='var backup=computed;',N='}else{',K="object",J='if(computed===undefined)computed=null;',bi='if(a[i].',bj='throw new Error("Property ',bk=")}",bl='var prop=qx.core.Property;',be=" with incoming value '",bf='if(computed===undefined||computed==inherit)computed=null;',bg='if((computed===undefined||computed===inherit)&&',bh="reg.fireEvent(this, '",bm="qx.core.Property";
qx.Class.define(bm,{statics:{__L:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__M:{"Object":true,"Array":true,"Map":true,"Function":true,"Date":true,"Node":true,"Element":true,"Document":true,"Window":true,"Event":true,"Class":true,"Mixin":true,"Interface":true,"Theme":true,"Font":true,"Decorator":true},$$inherit:C,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bs,dispose:br,inheritable:br,nullable:br,themeable:br,refine:br,init:null,apply:bs,event:bs,check:null,transform:bs,deferredInit:br,validate:null},$$allowedGroupKeys:{name:bs,group:K,mode:bs,themeable:br},$$inheritable:{},refresh:function(b){var parent=b.getLayoutParent();

if(parent){var e=b.constructor;
var g=this.$$store.inherit;
var f=this.$$store.init;
var d=this.$$method.refresh;
var h;
var c;
{};

while(e){h=e.$$properties;

if(h){for(var name in this.$$inheritable){if(h[name]&&b[d[name]]){c=parent[g[name]];

if(c===undefined){c=parent[f[name]];
}{};
b[d[name]](c);
}}}e=e.superclass;
}}},attach:function(j){var k=j.$$properties;

if(k){for(var name in k){this.attachMethods(j,name,k[name]);
}}j.$$propertiesAttached=true;
},attachMethods:function(cI,name,cJ){cJ.group?this.__N(cI,cJ,name):this.__O(cI,cJ,name);
},__N:function(cL,cM,name){var cT=qx.lang.String.firstUp(name);
var cS=cL.prototype;
var cU=cM.themeable===true;
{};
var cV=[];
var cP=[];

if(cU){var cN=[];
var cR=[];
}var cQ="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
cV.push(cQ);

if(cU){cN.push(cQ);
}
if(cM.mode=="shorthand"){var cO="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
cV.push(cO);

if(cU){cN.push(cO);
}}
for(var i=0,a=cM.group,l=a.length;i<l;i++){{};
cV.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
cP.push("this.",this.$$method.reset[a[i]],"();");

if(cU){{};
cN.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
cR.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+cT;
cS[this.$$method.set[name]]=new Function(cV.join(""));
this.$$method.reset[name]="reset"+cT;
cS[this.$$method.reset[name]]=new Function(cP.join(""));

if(cU){this.$$method.setThemed[name]="setThemed"+cT;
cS[this.$$method.setThemed[name]]=new Function(cN.join(""));
this.$$method.resetThemed[name]="resetThemed"+cT;
cS[this.$$method.resetThemed[name]]=new Function(cR.join(""));
}},__O:function(cW,cX,name){var da=qx.lang.String.firstUp(name);
var dc=cW.prototype;
{};
if(cX.dispose===undefined&&typeof cX.check==="string"){cX.dispose=this.__M[cX.check]||qx.Class.isDefined(cX.check)||qx.Interface.isDefined(cX.check);
}var db=this.$$method;
var cY=this.$$store;
cY.runtime[name]="$$runtime_"+name;
cY.user[name]="$$user_"+name;
cY.theme[name]="$$theme_"+name;
cY.init[name]="$$init_"+name;
cY.inherit[name]="$$inherit_"+name;
cY.useinit[name]="$$useinit_"+name;
db.get[name]="get"+da;
dc[db.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cW,name,"get");
};
db.set[name]="set"+da;
dc[db.set[name]]=function(cH){return qx.core.Property.executeOptimizedSetter(this,cW,name,"set",arguments);
};
db.reset[name]="reset"+da;
dc[db.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cW,name,"reset");
};

if(cX.inheritable||cX.apply||cX.event||cX.deferredInit){db.init[name]="init"+da;
dc[db.init[name]]=function(cG){return qx.core.Property.executeOptimizedSetter(this,cW,name,"init",arguments);
};
}
if(cX.inheritable){db.refresh[name]="refresh"+da;
dc[db.refresh[name]]=function(cK){return qx.core.Property.executeOptimizedSetter(this,cW,name,"refresh",arguments);
};
}db.setRuntime[name]="setRuntime"+da;
dc[db.setRuntime[name]]=function(y){return qx.core.Property.executeOptimizedSetter(this,cW,name,"setRuntime",arguments);
};
db.resetRuntime[name]="resetRuntime"+da;
dc[db.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cW,name,"resetRuntime");
};

if(cX.themeable){db.setThemed[name]="setThemed"+da;
dc[db.setThemed[name]]=function(m){return qx.core.Property.executeOptimizedSetter(this,cW,name,"setThemed",arguments);
};
db.resetThemed[name]="resetThemed"+da;
dc[db.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cW,name,"resetThemed");
};
}
if(cX.check==="Boolean"){dc["toggle"+da]=new Function("return this."+db.set[name]+"(!this."+db.get[name]+"())");
dc["is"+da]=new Function("return this."+db.get[name]+"()");
}},__P:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(cm,cn,co,cp,cq){var cr=cm.constructor.classname;
var cs=bD+co+H+cr+bx+this.$$method[cp][co]+be+cq+G;
throw new Error(cs+(this.__P[cn]||"Unknown reason: "+cn));
},__Q:function(ct,cu,name,cv,cw,cx){var cy=this.$$method[cv][name];
{cu[cy]=new Function("value",cw.join(""));
};
if(qx.core.Variant.isSet("qx.aspects","on")){cu[cy]=qx.core.Aspect.wrap(ct.classname+"."+cy,cu[cy],"property");
}qx.Bootstrap.setDisplayName(cu[cy],ct.classname+".prototype",cy);
if(cx===undefined){return ct[cy]();
}else{return ct[cy](cx[0]);
}},executeOptimizedGetter:function(cz,cA,name,cB){var cD=cA.$$properties[name];
var cF=cA.prototype;
var cC=[];
var cE=this.$$store;
cC.push(bM,cE.runtime[name],bL);
cC.push(bt,cE.runtime[name],bQ);

if(cD.inheritable){cC.push(bu,cE.inherit[name],bL);
cC.push(bt,cE.inherit[name],bQ);
cC.push(bW);
}cC.push(bM,cE.user[name],bL);
cC.push(bt,cE.user[name],bQ);

if(cD.themeable){cC.push(bu,cE.theme[name],bL);
cC.push(bt,cE.theme[name],bQ);
}
if(cD.deferredInit&&cD.init===undefined){cC.push(bu,cE.init[name],bL);
cC.push(bt,cE.init[name],bQ);
}cC.push(bW);

if(cD.init!==undefined){if(cD.inheritable){cC.push(bE,cE.init[name],bQ);

if(cD.nullable){cC.push(cj);
}else if(cD.init!==undefined){cC.push(bt,cE.init[name],bQ);
}else{cC.push(ba,name,bR,cA.classname,bz);
}cC.push(bB);
}else{cC.push(bt,cE.init[name],bQ);
}}else if(cD.inheritable||cD.nullable){cC.push(P);
}else{cC.push(bj,name,bR,cA.classname,bz);
}return this.__Q(cz,cF,name,cB,cC);
},executeOptimizedSetter:function(n,o,name,p,q){var w=o.$$properties[name];
var v=o.prototype;
var s=[];
var r=p===bJ||p===bI||p===bv||(p===bw&&w.init===undefined);
var t=p===bX||p===bq||p===bn;
var u=w.apply||w.event||w.inheritable;

if(p===bv||p===bn){var x=this.$$store.runtime[name];
}else if(p===bI||p===bq){var x=this.$$store.theme[name];
}else if(p===bw){var x=this.$$store.init[name];
}else{var x=this.$$store.user[name];
}{if(!w.nullable||w.check||w.inheritable){s.push(bl);
}if(p===bJ){s.push(D,name,cc,p,cl);
}};
if(r){if(w.transform){s.push(cd,w.transform,bA);
}if(w.validate){if(typeof w.validate===bs){s.push(bN,w.validate,bA);
}else if(w.validate instanceof Function){s.push(o.classname,U,name);
s.push(bF);
}}}if(u){if(r){s.push(bM,x,bC);
}else if(t){s.push(bM,x,I);
}}if(w.inheritable){s.push(ci);
}{};

if(!u){if(p===bv){s.push(bN,this.$$store.runtime[name],bO);
}else if(p===bn){s.push(bM,this.$$store.runtime[name],bL);
s.push(bK,this.$$store.runtime[name],bQ);
}else if(p===bJ){s.push(bN,this.$$store.user[name],bO);
}else if(p===bX){s.push(bM,this.$$store.user[name],bL);
s.push(bK,this.$$store.user[name],bQ);
}else if(p===bI){s.push(bN,this.$$store.theme[name],bO);
}else if(p===bq){s.push(bM,this.$$store.theme[name],bL);
s.push(bK,this.$$store.theme[name],bQ);
}else if(p===bw&&r){s.push(bN,this.$$store.init[name],bO);
}}else{if(w.inheritable){s.push(E,this.$$store.inherit[name],bQ);
}else{s.push(ch);
}s.push(bM,this.$$store.runtime[name],bp);

if(p===bv){s.push(bP,this.$$store.runtime[name],bO);
}else if(p===bn){s.push(bK,this.$$store.runtime[name],bQ);
s.push(bM,this.$$store.user[name],bL);
s.push(bP,this.$$store.user[name],bQ);
s.push(bu,this.$$store.theme[name],bL);
s.push(bP,this.$$store.theme[name],bQ);
s.push(bu,this.$$store.init[name],bp);
s.push(bP,this.$$store.init[name],bQ);
s.push(bN,this.$$store.useinit[name],bo);
s.push(bH);
}else{s.push(bU,this.$$store.runtime[name],bQ);
if(p===bJ){s.push(bN,this.$$store.user[name],bO);
}else if(p===bX){s.push(bK,this.$$store.user[name],bQ);
}else if(p===bI){s.push(bN,this.$$store.theme[name],bO);
}else if(p===bq){s.push(bK,this.$$store.theme[name],bQ);
}else if(p===bw&&r){s.push(bN,this.$$store.init[name],bO);
}}s.push(bH);
s.push(bu,this.$$store.user[name],bp);

if(p===bJ){if(!w.inheritable){s.push(bV,this.$$store.user[name],bQ);
}s.push(bP,this.$$store.user[name],bO);
}else if(p===bX){if(!w.inheritable){s.push(bV,this.$$store.user[name],bQ);
}s.push(bK,this.$$store.user[name],bQ);
s.push(bM,this.$$store.runtime[name],bL);
s.push(bP,this.$$store.runtime[name],bQ);
s.push(bM,this.$$store.theme[name],bL);
s.push(bP,this.$$store.theme[name],bQ);
s.push(bu,this.$$store.init[name],bp);
s.push(bP,this.$$store.init[name],bQ);
s.push(bN,this.$$store.useinit[name],bo);
s.push(bH);
}else{if(p===bv){s.push(bP,this.$$store.runtime[name],bO);
}else if(w.inheritable){s.push(bP,this.$$store.user[name],bQ);
}else{s.push(bU,this.$$store.user[name],bQ);
}if(p===bI){s.push(bN,this.$$store.theme[name],bO);
}else if(p===bq){s.push(bK,this.$$store.theme[name],bQ);
}else if(p===bw&&r){s.push(bN,this.$$store.init[name],bO);
}}s.push(bH);
if(w.themeable){s.push(bu,this.$$store.theme[name],bp);

if(!w.inheritable){s.push(bV,this.$$store.theme[name],bQ);
}
if(p===bv){s.push(bP,this.$$store.runtime[name],bO);
}else if(p===bJ){s.push(bP,this.$$store.user[name],bO);
}else if(p===bI){s.push(bP,this.$$store.theme[name],bO);
}else if(p===bq){s.push(bK,this.$$store.theme[name],bQ);
s.push(bM,this.$$store.init[name],bp);
s.push(bP,this.$$store.init[name],bQ);
s.push(bN,this.$$store.useinit[name],bo);
s.push(bH);
}else if(p===bw){if(r){s.push(bN,this.$$store.init[name],bO);
}s.push(bP,this.$$store.theme[name],bQ);
}else if(p===bY){s.push(bP,this.$$store.theme[name],bQ);
}s.push(bH);
}s.push(bu,this.$$store.useinit[name],Y);

if(!w.inheritable){s.push(bV,this.$$store.init[name],bQ);
}
if(p===bw){if(r){s.push(bP,this.$$store.init[name],bO);
}else{s.push(bP,this.$$store.init[name],bQ);
}}else if(p===bJ||p===bv||p===bI||p===bY){s.push(bK,this.$$store.useinit[name],bQ);

if(p===bv){s.push(bP,this.$$store.runtime[name],bO);
}else if(p===bJ){s.push(bP,this.$$store.user[name],bO);
}else if(p===bI){s.push(bP,this.$$store.theme[name],bO);
}else if(p===bY){s.push(bP,this.$$store.init[name],bQ);
}}s.push(bH);
if(p===bJ||p===bv||p===bI||p===bw){s.push(by);

if(p===bv){s.push(bP,this.$$store.runtime[name],bO);
}else if(p===bJ){s.push(bP,this.$$store.user[name],bO);
}else if(p===bI){s.push(bP,this.$$store.theme[name],bO);
}else if(p===bw){if(r){s.push(bP,this.$$store.init[name],bO);
}else{s.push(bP,this.$$store.init[name],bQ);
}s.push(bN,this.$$store.useinit[name],bo);
}s.push(bH);
}}
if(w.inheritable){s.push(V);

if(p===bY){s.push(ck);
}else{s.push(R,this.$$store.inherit[name],bQ);
}s.push(bg);
s.push(bN,this.$$store.init[name],M);
s.push(bN,this.$$store.init[name],W);
s.push(bP,this.$$store.init[name],bQ);
s.push(bN,this.$$store.useinit[name],bo);
s.push(N);
s.push(bK,this.$$store.useinit[name],X);
s.push(bH);
s.push(ca);
s.push(B);
s.push(cg,this.$$store.inherit[name],bQ);
s.push(bH);
s.push(F);
s.push(bK,this.$$store.inherit[name],bQ);
s.push(ce,this.$$store.inherit[name],z);
s.push(O);
if(w.init!==undefined&&p!==bw){s.push(bT,this.$$store.init[name],bS);
}else{s.push(cb);
}s.push(bf);
}else if(u){if(p!==bJ&&p!==bv&&p!==bI){s.push(J);
}s.push(ca);
if(w.init!==undefined&&p!==bw){s.push(bT,this.$$store.init[name],bS);
}else{s.push(cb);
}}if(u){if(w.apply){s.push(bN,w.apply,bc,name,S);
}if(w.event){s.push(Q,bb,w.event,cf,bh,w.event,L,bk);
}if(w.inheritable&&v._getChildren){s.push(bG);
s.push(bi,this.$$method.refresh[name],T,this.$$method.refresh[name],A);
s.push(bH);
}}if(r){s.push(bd);
}return this.__Q(n,v,name,p,s,q);
}},settings:{"qx.propertyDebugLevel":0}});
})();
(function(){var r="$$hash",q="qx.core.ObjectRegistry";
qx.Bootstrap.define(q,{statics:{inShutDown:false,__R:{},__S:0,__T:[],register:function(s){var v=this.__R;

if(!v){return;
}var u=s.$$hash;

if(u==null){var t=this.__T;

if(t.length>0){u=t.pop();
}else{u=(this.__S++).toString(36);
}s.$$hash=u;
}{};
v[u]=s;
},unregister:function(j){var k=j.$$hash;

if(k==null){return;
}var m=this.__R;

if(m&&m[k]){delete m[k];
this.__T.push(k);
}try{delete j.$$hash;
}catch(h){if(j.removeAttribute){j.removeAttribute(r);
}}},toHashCode:function(c){{};
var e=c.$$hash;

if(e!=null){return e;
}var d=this.__T;

if(d.length>0){e=d.pop();
}else{e=(this.__S++).toString(36);
}return c.$$hash=e;
},clearHashCode:function(o){{};
var p=o.$$hash;

if(p!=null){this.__T.push(p);
try{delete o.$$hash;
}catch(n){if(o.removeAttribute){o.removeAttribute(r);
}}}},fromHashCode:function(f){return this.__R[f]||null;
},shutdown:function(){this.inShutDown=true;
var x=this.__R;
var z=[];

for(var y in x){z.push(y);
}z.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var w,i=0,l=z.length;

while(true){try{for(;i<l;i++){y=z[i];
w=x[y];

if(w&&w.dispose){w.dispose();
}}}catch(g){qx.log.Logger.error(this,"Could not dispose object "+w.toString()+": "+g);

if(i!==0){continue;
}}break;
}qx.log.Logger.debug(this,"Disposed "+l+" objects");
delete this.__R;
},getRegistry:function(){return this.__R;
}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Class.define(g,{statics:{define:function(name,h){if(h){if(h.include&&!(h.include instanceof Array)){h.include=[h.include];
}{};
var k=h.statics?h.statics:{};
qx.Bootstrap.setDisplayNames(k,name);

for(var j in k){if(k[j] instanceof Function){k[j].$$mixin=k;
}}if(h.construct){k.$$constructor=h.construct;
qx.Bootstrap.setDisplayName(h.construct,name,e);
}
if(h.include){k.$$includes=h.include;
}
if(h.properties){k.$$properties=h.properties;
}
if(h.members){k.$$members=h.members;
qx.Bootstrap.setDisplayNames(h.members,name+f);
}
for(var j in k.$$members){if(k.$$members[j] instanceof Function){k.$$members[j].$$mixin=k;
}}
if(h.events){k.$$events=h.events;
}
if(h.destruct){k.$$destructor=h.destruct;
qx.Bootstrap.setDisplayName(h.destruct,name,b);
}}else{var k={};
}k.$$type=a;
k.name=name;
k.toString=this.genericToString;
k.basename=qx.Bootstrap.createNamespace(name,k);
this.$$registry[name]=k;
return k;
},checkCompatibility:function(r){var u=this.flatten(r);
var v=u.length;

if(v<2){return true;
}var y={};
var x={};
var w={};
var t;

for(var i=0;i<v;i++){t=u[i];

for(var s in t.events){if(w[s]){throw new Error('Conflict between mixin "'+t.name+'" and "'+w[s]+'" in member "'+s+'"!');
}w[s]=t.name;
}
for(var s in t.properties){if(y[s]){throw new Error('Conflict between mixin "'+t.name+'" and "'+y[s]+'" in property "'+s+'"!');
}y[s]=t.name;
}
for(var s in t.members){if(x[s]){throw new Error('Conflict between mixin "'+t.name+'" and "'+x[s]+'" in member "'+s+'"!');
}x[s]=t.name;
}}return true;
},isCompatible:function(m,n){var o=qx.Class.getMixins(n);
o.push(m);
return qx.Mixin.checkCompatibility(o);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(p){if(!p){return [];
}var q=p.concat();

for(var i=0,l=p.length;i<l;i++){if(p[i].$$includes){q.push.apply(q,this.flatten(p[i].$$includes));
}}return q;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__U:null,__V:function(){}}});
})();
(function(){var e="qx.data.MBinding";
qx.Mixin.define(e,{members:{bind:function(a,b,c,d){return qx.data.SingleValueBinding.bind(this,a,b,c,d);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var g="qx.client",f="on",d="mousedown",c="qx.bom.Event",b="mouseover",a="HTMLEvents";
qx.Bootstrap.define(c,{statics:{addNativeListener:qx.core.Variant.select(g,{"mshtml":function(r,s,t){r.attachEvent(f+s,t);
},"default":function(h,i,j){h.addEventListener(i,j,false);
}}),removeNativeListener:qx.core.Variant.select(g,{"mshtml":function(n,o,p){n.detachEvent(f+o,p);
},"default":function(u,v,w){u.removeEventListener(v,w,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(g,{"mshtml":function(e){if(e.type===b){return e.fromEvent;
}else{return e.toElement;
}},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(g,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==d&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(x){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(q){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(k,l){if(document.createEventObject){var m=document.createEventObject();
return k.fireEvent(f+l,m);
}else{var m=document.createEvent(a);
m.initEvent(l,true,true);
return !k.dispatchEvent(m);
}}}});
})();
(function(){var X="|bubble",W="|capture",V="|",U="_",T="unload",S="UNKNOWN_",R="DOM_",Q="__Y",P="c",O="__ba",L="WIN_",N="capture",M="qx.event.Manager",K="QX_";
qx.Bootstrap.define(M,{construct:function(cC){this.__W=cC;
if(cC.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(cC,T,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(cC,T,arguments.callee);
self.dispose();
}));
}this.__X={};
this.__Y={};
this.__ba={};
this.__bb={};
},statics:{__bc:0,getNextUniqueId:function(){return (this.__bc++).toString(36);
}},members:{__X:null,__ba:null,__bd:null,__Y:null,__bb:null,__W:null,getWindow:function(){return this.__W;
},getHandler:function(cy){var cz=this.__Y[cy.classname];

if(cz){return cz;
}return this.__Y[cy.classname]=new cy(this);
},getDispatcher:function(cA){var cB=this.__ba[cA.classname];

if(cB){return cB;
}return this.__ba[cA.classname]=new cA(this);
},getListeners:function(bO,bP,bQ){var bR=bO.$$hash||qx.core.ObjectRegistry.toHashCode(bO);
var bT=this.__X[bR];

if(!bT){return null;
}var bU=bP+(bQ?W:X);
var bS=bT[bU];
return bS?bS.concat():null;
},serializeListeners:function(a){var h=a.$$hash||qx.core.ObjectRegistry.toHashCode(a);
var k=this.__X[h];
var f=[];

if(k){var d,j,b,e,g;

for(var c in k){d=c.indexOf(V);
j=c.substring(0,d);
b=c.charAt(d+1)==P;
e=k[c];

for(var i=0,l=e.length;i<l;i++){g=e[i];
f.push({self:g.context,handler:g.handler,type:j,capture:b});
}}}return f;
},toggleAttachedEvents:function(bV,bW){var cc=bV.$$hash||qx.core.ObjectRegistry.toHashCode(bV);
var ce=this.__X[cc];

if(ce){var bY,cd,bX,ca;

for(var cb in ce){bY=cb.indexOf(V);
cd=cb.substring(0,bY);
bX=cb.charCodeAt(bY+1)===99;
ca=ce[cb];

if(bW){this.__be(bV,cd,bX);
}else{this.__bf(bV,cd,bX);
}}}},hasListener:function(cr,cs,ct){{};
var cu=cr.$$hash||qx.core.ObjectRegistry.toHashCode(cr);
var cw=this.__X[cu];

if(!cw){return false;
}var cx=cs+(ct?W:X);
var cv=cw[cx];
return cv&&cv.length>0;
},importListeners:function(bB,bC){{};
var bI=bB.$$hash||qx.core.ObjectRegistry.toHashCode(bB);
var bJ=this.__X[bI]={};
var bF=qx.event.Manager;

for(var bD in bC){var bG=bC[bD];
var bH=bG.type+(bG.capture?W:X);
var bE=bJ[bH];

if(!bE){bE=bJ[bH]=[];
this.__be(bB,bG.type,bG.capture);
}bE.push({handler:bG.listener,context:bG.self,unique:bG.unique||(bF.__bc++).toString(36)});
}},addListener:function(bq,br,bs,self,bt){var bx;
{};
var by=bq.$$hash||qx.core.ObjectRegistry.toHashCode(bq);
var bA=this.__X[by];

if(!bA){bA=this.__X[by]={};
}var bw=br+(bt?W:X);
var bv=bA[bw];

if(!bv){bv=bA[bw]=[];
}if(bv.length===0){this.__be(bq,br,bt);
}var bz=(qx.event.Manager.__bc++).toString(36);
var bu={handler:bs,context:self,unique:bz};
bv.push(bu);
return bw+V+bz;
},findHandler:function(m,n){var x=false,q=false,y=false;
var w;

if(m.nodeType===1){x=true;
w=R+m.tagName.toLowerCase()+U+n;
}else if(m==this.__W){q=true;
w=L+n;
}else if(m.classname){y=true;
w=K+m.classname+U+n;
}else{w=S+m+U+n;
}var s=this.__bb;

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
},__be:function(bK,bL,bM){var bN=this.findHandler(bK,bL);

if(bN){bN.registerEvent(bK,bL,bM);
return;
}{};
},removeListener:function(bg,bh,bi,self,bj){var bn;
{};
var bo=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);
var bp=this.__X[bo];

if(!bp){return false;
}var bk=bh+(bj?W:X);
var bl=bp[bk];

if(!bl){return false;
}var bm;

for(var i=0,l=bl.length;i<l;i++){bm=bl[i];

if(bm.handler===bi&&bm.context===self){qx.lang.Array.removeAt(bl,i);

if(bl.length==0){this.__bf(bg,bh,bj);
}return true;
}}return false;
},removeListenerById:function(cf,cg){var cm;
{};
var ck=cg.split(V);
var cp=ck[0];
var ch=ck[1].charCodeAt(0)==99;
var co=ck[2];
var cn=cf.$$hash||qx.core.ObjectRegistry.toHashCode(cf);
var cq=this.__X[cn];

if(!cq){return false;
}var cl=cp+(ch?W:X);
var cj=cq[cl];

if(!cj){return false;
}var ci;

for(var i=0,l=cj.length;i<l;i++){ci=cj[i];

if(ci.unique===co){qx.lang.Array.removeAt(cj,i);

if(cj.length==0){this.__bf(cf,cp,ch);
}return true;
}}return false;
},removeAllListeners:function(Y){var bd=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);
var bf=this.__X[bd];

if(!bf){return false;
}var bb,be,ba;

for(var bc in bf){if(bf[bc].length>0){bb=bc.split(V);
be=bb[0];
ba=bb[1]===N;
this.__bf(Y,be,ba);
}}delete this.__X[bd];
return true;
},__bf:function(z,A,B){var C=this.findHandler(z,A);

if(C){C.unregisterEvent(z,A,B);
return;
}{};
},dispatchEvent:function(D,event){var I;
{};
var J=event.getType();

if(!event.getBubbles()&&!this.hasListener(D,J)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(D);
}var H=qx.event.Registration.getDispatchers();
var G;
var F=false;

for(var i=0,l=H.length;i<l;i++){G=this.getDispatcher(H[i]);
if(G.canDispatchEvent(D,event,J)){G.dispatchEvent(D,event,J);
F=true;
break;
}}
if(!F){qx.log.Logger.error(this,"No dispatcher can handle event of type "+J+" on "+D);
return true;
}var E=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !E;
},dispose:function(){qx.event.Registration.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,Q);
qx.util.DisposeUtil.disposeMap(this,O);
this.__X=this.__W=this.__bd=this.__bb=null;
}}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(e){return e.nodeType===
this.DOCUMENT?e:
e.ownerDocument||e.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(l){if(l.nodeType==null){return l;
}if(l.nodeType!==this.DOCUMENT){l=l.ownerDocument;
}return l.parentWindow;
},"default":function(o){if(o.nodeType==null){return o;
}if(o.nodeType!==this.DOCUMENT){o=o.ownerDocument;
}return o.defaultView;
}}),getDocumentElement:function(g){return this.getDocument(g).documentElement;
},getBodyElement:function(h){return this.getDocument(h).body;
},isNode:function(k){return !!(k&&k.nodeType!=null);
},isElement:function(p){return !!(p&&p.nodeType===this.ELEMENT);
},isDocument:function(j){return !!(j&&j.nodeType===this.DOCUMENT);
},isText:function(f){return !!(f&&f.nodeType===this.TEXT);
},isWindow:function(q){return !!(q&&q.history&&q.location&&q.document);
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
(function(){var bc="mshtml",bb="qx.client",ba="[object Array]",Y="qx.lang.Array",X="Use qx.lang.Type.isArray() instead!",W="qx",V="number",U="Use the native Array access instead: arr[arr.length - 1]",T="Use the native Array access instead: arr[0]",S="string",R="Use 'clone()' instead!";
qx.Bootstrap.define(Y,{statics:{isArray:function(bt){qx.log.Logger.deprecatedMethodWarning(arguments.callee,X);
return qx.lang.Type.isArray(bt);
},toArray:function(n,o){return this.cast(n,Array,o);
},cast:function(h,j,k){if(h.constructor===j){return h;
}
if(qx.Class.hasInterface(h,qx.data.IListData)){var h=h.toArray();
}var m=new j;
if(qx.core.Variant.isSet(bb,bc)){if(h.item){for(var i=k||0,l=h.length;i<l;i++){m.push(h[i]);
}return m;
}}if(Object.prototype.toString.call(h)===ba&&k==null){m.push.apply(m,h);
}else{m.push.apply(m,Array.prototype.slice.call(h,k||0));
}return m;
},fromArguments:function(b,c){return Array.prototype.slice.call(b,c||0);
},fromCollection:function(br){if(qx.core.Variant.isSet(bb,bc)){if(br.item){var bs=[];

for(var i=0,l=br.length;i<l;i++){bs[i]=br[i];
}return bs;
}}return Array.prototype.slice.call(br,0);
},fromShortHand:function(bu){var bw=bu.length;
var bv=qx.lang.Array.clone(bu);
switch(bw){case 1:bv[1]=bv[2]=bv[3]=bv[0];
break;
case 2:bv[2]=bv[0];
case 3:bv[3]=bv[1];
}return bv;
},copy:function(a){qx.log.Logger.deprecatedMethodWarning(arguments.callee,R);
return qx.lang.Array.clone(a);
},clone:function(bi){return bi.concat();
},getLast:function(bx){qx.log.Logger.deprecatedMethodWarning(arguments.callee,U);
return bx[bx.length-1];
},getFirst:function(G){qx.log.Logger.deprecatedMethodWarning(arguments.callee,T);
return G[0];
},insertAt:function(E,F,i){E.splice(i,0,F);
return E;
},insertBefore:function(bj,bk,bl){var i=bj.indexOf(bl);

if(i==-1){bj.push(bk);
}else{bj.splice(i,0,bk);
}return bj;
},insertAfter:function(H,I,J){var i=H.indexOf(J);

if(i==-1||i==(H.length-1)){H.push(I);
}else{H.splice(i+1,0,I);
}return H;
},removeAt:function(bf,i){return bf.splice(i,1)[0];
},removeAll:function(by){by.length=0;
return this;
},append:function(bp,bq){{};
Array.prototype.push.apply(bp,bq);
return bp;
},exclude:function(d,e){{};

for(var i=0,g=e.length,f;i<g;i++){f=d.indexOf(e[i]);

if(f!=-1){d.splice(f,1);
}}return d;
},remove:function(C,D){var i=C.indexOf(D);

if(i!=-1){C.splice(i,1);
return D;
}},contains:function(K,L){return K.indexOf(L)!==-1;
},equals:function(bg,bh){var length=bg.length;

if(length!==bh.length){return false;
}
for(var i=0;i<length;i++){if(bg[i]!==bh[i]){return false;
}}return true;
},sum:function(bd){var be=0;

for(var i=0,l=bd.length;i<l;i++){be+=bd[i];
}return be;
},max:function(M){{};
var i,O=M.length,N=M[0];

for(i=1;i<O;i++){if(M[i]>N){N=M[i];
}}return N===undefined?null:N;
},min:function(bm){{};
var i,bo=bm.length,bn=bm[0];

for(i=1;i<bo;i++){if(bm[i]<bn){bn=bm[i];
}}return bn===undefined?null:bn;
},unique:function(p){var z=[],r={},u={},w={};
var v,q=0;
var A=W+qx.lang.Date.now();
var s=false,y=false,B=false;
for(var i=0,x=p.length;i<x;i++){v=p[i];
if(v===null){if(!s){s=true;
z.push(v);
}}else if(v===undefined){}else if(v===false){if(!y){y=true;
z.push(v);
}}else if(v===true){if(!B){B=true;
z.push(v);
}}else if(typeof v===S){if(!r[v]){r[v]=1;
z.push(v);
}}else if(typeof v===V){if(!u[v]){u[v]=1;
z.push(v);
}}else{t=v[A];

if(t==null){t=v[A]=q++;
}
if(!w[t]){w[t]=v;
z.push(v);
}}}for(var t in w){try{delete w[t][A];
}catch(P){try{w[t][A]=null;
}catch(Q){throw new Error("Cannot clean-up map entry doneObjects["+t+"]["+A+"]");
}}}return z;
}}});
})();
(function(){var r="()",q=".",p=".prototype.",o="Use qx.lang.Type.isFunction() instead!",n='anonymous()',m="qx.lang.Function",l=".constructor()";
qx.Bootstrap.define(m,{statics:{isFunction:function(H){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
return qx.lang.Type.isFunction(H);
},getCaller:function(a){return a.caller?a.caller.callee:a.callee.caller;
},getName:function(s){if(s.displayName){return s.displayName;
}
if(s.$$original||s.wrapper||s.classname){return s.classname+l;
}
if(s.$$mixin){for(var u in s.$$mixin.$$members){if(s.$$mixin.$$members[u]==s){return s.$$mixin.name+p+u+r;
}}for(var u in s.$$mixin){if(s.$$mixin[u]==s){return s.$$mixin.name+q+u+r;
}}}
if(s.self){var v=s.self.constructor;

if(v){for(var u in v.prototype){if(v.prototype[u]==s){return v.classname+p+u+r;
}}for(var u in v){if(v[u]==s){return v.classname+q+u+r;
}}}}var t=s.toString().match(/function\s*(\w*)\s*\(.*/);

if(t&&t.length>=1&&t[1]){return t[1]+r;
}return n;
},globalEval:function(b){if(window.execScript){return window.execScript(b);
}else{return eval.call(window,b);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(w,x){{};
if(!x){return w;
}if(!(x.self||x.args||x.delay!=null||x.periodical!=null||x.attempt)){return w;
}return function(event){{};
var g=qx.lang.Array.fromArguments(arguments);
if(x.args){g=x.args.concat(g);
}
if(x.delay||x.periodical){var f=qx.event.GlobalError.observeMethod(function(){return w.apply(x.self||this,g);
});

if(x.delay){return window.setTimeout(f,x.delay);
}
if(x.periodical){return window.setInterval(f,x.periodical);
}}else if(x.attempt){var h=false;

try{h=w.apply(x.self||this,g);
}catch(y){}return h;
}else{return w.apply(x.self||this,g);
}};
},bind:function(F,self,G){return this.create(F,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(A,B){return this.create(A,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(i,self,j){if(arguments.length<3){return function(event){return i.call(self||this,event||window.event);
};
}else{var k=qx.lang.Array.fromArguments(arguments,2);
return function(event){var z=[event||window.event];
z.push.apply(z,k);
i.apply(self||this,z);
};
}},attempt:function(I,self,J){return this.create(I,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(C,D,self,E){return this.create(C,{delay:D,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(c,d,self,e){return this.create(c,{periodical:d,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var J="qx.event.Registration";
qx.Bootstrap.define(J,{statics:{__bg:{},getManager:function(O){if(O==null){{};
O=window;
}else if(O.nodeType){O=qx.dom.Node.getWindow(O);
}else if(!qx.dom.Node.isWindow(O)){O=window;
}var Q=O.$$hash||qx.core.ObjectRegistry.toHashCode(O);
var P=this.__bg[Q];

if(!P){P=new qx.event.Manager(O);
this.__bg[Q]=P;
}return P;
},removeManager:function(t){var u=qx.core.ObjectRegistry.toHashCode(t.getWindow());
delete this.__bg[u];
},addListener:function(j,k,l,self,m){return this.getManager(j).addListener(j,k,l,self,m);
},removeListener:function(F,G,H,self,I){return this.getManager(F).removeListener(F,G,H,self,I);
},removeListenerById:function(c,d){return this.getManager(c).removeListenerById(c,d);
},removeAllListeners:function(i){return this.getManager(i).removeAllListeners(i);
},hasListener:function(B,C,D){return this.getManager(B).hasListener(B,C,D);
},serializeListeners:function(K){return this.getManager(K).serializeListeners(K);
},createEvent:function(e,f,g){{};
if(f==null){f=qx.event.type.Event;
}var h=qx.event.Pool.getInstance().getObject(f);

if(!h){return;
}g?h.init.apply(h,g):h.init();
if(e){h.setType(e);
}return h;
},dispatchEvent:function(L,event){return this.getManager(L).dispatchEvent(L,event);
},fireEvent:function(n,o,p,q){var r;
{};
var s=this.createEvent(o,p||null,q);
return this.getManager(n).dispatchEvent(n,s);
},fireNonBubblingEvent:function(v,w,x,y){{};
var z=this.getManager(v);

if(!z.hasListener(v,w,false)){return true;
}var A=this.createEvent(w,x||null,y);
return z.dispatchEvent(v,A);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bh:[],addHandler:function(E){{};
this.__bh.push(E);
this.__bh.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bh;
},__bi:[],addDispatcher:function(M,N){{};
this.__bi.push(M);
this.__bi.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bi;
}}});
})();
(function(){var e="qx.log.appender.RingBuffer";
qx.Bootstrap.define(e,{construct:function(a){this.__bj=[];
this.setMaxMessages(a||50);
},members:{__bk:0,__bj:null,__bl:50,setMaxMessages:function(b){this.__bl=b;
this.clearHistory();
},getMaxMessages:function(){return this.__bl;
},process:function(c){var d=this.getMaxMessages();

if(this.__bj.length<d){this.__bj.push(c);
}else{this.__bj[this.__bk++]=c;

if(this.__bk>=d){this.__bk=0;
}}},getAllLogEvents:function(){return this.retrieveLogEvents(this.getMaxMessages());
},retrieveLogEvents:function(f){if(f>this.__bj.length){f=this.__bj.length;
}
if(this.__bj.length==this.getMaxMessages()){var h=this.__bk-1;
}else{h=this.__bj.length-1;
}var g=h-f+1;

if(g<0){g+=this.__bj.length;
}var i;

if(g<=h){i=this.__bj.slice(g,h+1);
}else{i=this.__bj.slice(g,this.__bj.length).concat(this.__bj.slice(0,h+1));
}return i;
},clearHistory:function(){this.__bj=[];
this.__bk=0;
}}});
})();
(function(){var Q="node",P="error",O="...(+",N="array",M=")",L="info",K="instance",J="string",I="null",H="class",bm="number",bl="stringify",bk="]",bj="unknown",bi="function",bh="boolean",bg="debug",bf="map",be="undefined",bd="qx.log.Logger",X=")}",Y="#",V="warn",W="document",T="{...(",U="[",R="text[",S="[...(",ba="\n",bb=")]",bc="object";
qx.Bootstrap.define(bd,{statics:{__bm:bg,setLevel:function(bw){this.__bm=bw;
},getLevel:function(){return this.__bm;
},setTreshold:function(bx){this.__bp.setMaxMessages(bx);
},getTreshold:function(){return this.__bp.getMaxMessages();
},__bn:{},__bo:0,register:function(bn){if(bn.$$id){return;
}var bo=this.__bo++;
this.__bn[bo]=bn;
bn.$$id=bo;
var bp=this.__bp.getAllLogEvents();

for(var i=0,l=bp.length;i<l;i++){bn.process(bp[i]);
}},unregister:function(m){var n=m.$$id;

if(n==null){return;
}delete this.__bn[n];
delete m.$$id;
},debug:function(F,G){this.__br(bg,arguments);
},info:function(by,bz){this.__br(L,arguments);
},warn:function(bD,bE){this.__br(V,arguments);
},error:function(B,C){this.__br(P,arguments);
},trace:function(A){this.__br(L,[A,qx.dev.StackTrace.getStackTrace().join(ba)]);
},deprecatedMethodWarning:function(bA,bB){var bC;
{};
},deprecatedClassWarning:function(bt,bu){var bv;
{};
},deprecatedEventWarning:function(x,event,y){var z;
{};
},deprecatedMixinWarning:function(bq,br){var bs;
{};
},clear:function(){this.__bp.clearHistory();
},__bp:new qx.log.appender.RingBuffer(50),__bq:{debug:0,info:1,warn:2,error:3},__br:function(a,b){var g=this.__bq;

if(g[a]<g[this.__bm]){return;
}var d=b.length<2?null:b[0];
var f=d?1:0;
var c=[];

for(var i=f,l=b.length;i<l;i++){c.push(this.__bt(b[i],true));
}var h=new Date;
var j={time:h,offset:h-qx.Bootstrap.LOADSTART,level:a,items:c,win:window};
if(d){if(d instanceof qx.core.Object){j.object=d.$$hash;
}else if(d.$$type){j.clazz=d;
}}this.__bp.process(j);
var k=this.__bn;

for(var e in k){k[e].process(j);
}},__bs:function(D){if(D===undefined){return be;
}else if(D===null){return I;
}
if(D.$$type){return H;
}var E=typeof D;

if(E===bi||E==J||E===bm||E===bh){return E;
}else if(E===bc){if(D.nodeType){return Q;
}else if(D.classname){return K;
}else if(D instanceof Array){return N;
}else if(D instanceof Error){return P;
}else{return bf;
}}
if(D.toString){return bl;
}return bj;
},__bt:function(o,p){var w=this.__bs(o);
var s=bj;
var r=[];

switch(w){case I:case be:s=w;
break;
case J:case bm:case bh:s=o;
break;
case Q:if(o.nodeType===9){s=W;
}else if(o.nodeType===3){s=R+o.nodeValue+bk;
}else if(o.nodeType===1){s=o.nodeName.toLowerCase();

if(o.id){s+=Y+o.id;
}}else{s=Q;
}break;
case bi:s=qx.lang.Function.getName(o)||w;
break;
case K:s=o.basename+U+o.$$hash+bk;
break;
case H:case bl:s=o.toString();
break;
case P:r=qx.dev.StackTrace.getStackTraceFromError(o);
s=o.toString();
break;
case N:if(p){s=[];

for(var i=0,l=o.length;i<l;i++){if(s.length>20){s.push(O+(l-i)+M);
break;
}s.push(this.__bt(o[i],false));
}}else{s=S+o.length+bb;
}break;
case bf:if(p){var q;
var v=[];

for(var u in o){v.push(u);
}v.sort();
s=[];

for(var i=0,l=v.length;i<l;i++){if(s.length>20){s.push(O+(l-i)+M);
break;
}u=v[i];
q=this.__bt(o[u],false);
q.key=u;
s.push(q);
}}else{var t=0;

for(var u in o){t++;
}s=T+t+X;
}break;
}return {type:w,text:s,trace:r};
}}});
})();
(function(){var R="set",Q="get",P="reset",O="__bv",N="qx.core.Object",M="]",L="[",K="$$user_",J="Object";
qx.Class.define(N,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:J},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+L+this.$$hash+M;
},base:function(z,A){if(arguments.length===1){return z.callee.base.call(this);
}else{return z.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(bg){return bg.callee.self;
},clone:function(){var bk=this.constructor;
var bj=new bk;
var bm=qx.Class.getProperties(bk);
var bl=qx.core.Property.$$store.user;
var bn=qx.core.Property.$$method.set;
var name;
for(var i=0,l=bm.length;i<l;i++){name=bm[i];

if(this.hasOwnProperty(bl[name])){bj[bn[name]](this[bl[name]]);
}}return bj;
},serialize:function(){var t=this.constructor;
var v=qx.Class.getProperties(t);
var w=qx.core.Property.$$store.user;
var name,s;
var u={classname:t.classname,properties:{}};
for(var i=0,l=v.length;i<l;i++){name=v[i];

if(this.hasOwnProperty(w[name])){s=this[w[name]];

if(s instanceof qx.core.Object){u.properties[name]={$$hash:s.$$hash};
}else{u.properties[name]=s;
}}}return u;
},set:function(a,b){var d=qx.core.Property.$$method.set;

if(qx.lang.Type.isString(a)){if(!this[d[a]]){if(this[R+qx.lang.String.firstUp(a)]!=undefined){this[R+qx.lang.String.firstUp(a)](b);
return;
}{};
}return this[d[a]](b);
}else{for(var c in a){if(!this[d[c]]){if(this[R+qx.lang.String.firstUp(c)]!=undefined){this[R+qx.lang.String.firstUp(c)](a[c]);
continue;
}{};
}this[d[c]](a[c]);
}return this;
}},get:function(x){var y=qx.core.Property.$$method.get;

if(!this[y[x]]){if(this[Q+qx.lang.String.firstUp(x)]!=undefined){return this[Q+qx.lang.String.firstUp(x)]();
}{};
}return this[y[x]]();
},reset:function(m){var n=qx.core.Property.$$method.reset;

if(!this[n[m]]){if(this[P+qx.lang.String.firstUp(m)]!=undefined){this[P+qx.lang.String.firstUp(m)]();
return;
}{};
}this[n[m]]();
},__bu:qx.event.Registration,addListener:function(V,W,self,X){if(!this.$$disposed){return this.__bu.addListener(this,V,W,self,X);
}return null;
},addListenerOnce:function(bb,bc,self,bd){var be=function(e){bc.call(self||this,e);
this.removeListener(bb,be,this,bd);
};
return this.addListener(bb,be,this,bd);
},removeListener:function(h,j,self,k){if(!this.$$disposed){return this.__bu.removeListener(this,h,j,self,k);
}return false;
},removeListenerById:function(bx){if(!this.$$disposed){return this.__bu.removeListenerById(this,bx);
}return false;
},hasListener:function(bh,bi){return this.__bu.hasListener(this,bh,bi);
},dispatchEvent:function(q){if(!this.$$disposed){return this.__bu.dispatchEvent(this,q);
}return true;
},fireEvent:function(G,H,I){if(!this.$$disposed){return this.__bu.fireEvent(this,G,H,I);
}return true;
},fireNonBubblingEvent:function(bp,bq,br){if(!this.$$disposed){return this.__bu.fireNonBubblingEvent(this,bp,bq,br);
}return true;
},fireDataEvent:function(bs,bt,bu,bv){if(!this.$$disposed){if(bu===undefined){bu=null;
}return this.__bu.fireNonBubblingEvent(this,bs,qx.event.type.Data,[bt,bu,!!bv]);
}return true;
},__bv:null,setUserData:function(o,p){if(!this.__bv){this.__bv={};
}this.__bv[o]=p;
},getUserData:function(T){if(!this.__bv){return null;
}var U=this.__bv[T];
return U===undefined?null:U;
},__bw:qx.log.Logger,debug:function(bw){this.__bw.debug(this,bw);
},info:function(S){this.__bw.info(this,S);
},warn:function(f){this.__bw.warn(this,f);
},error:function(g){this.__bw.error(this,g);
},trace:function(){this.__bw.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var E,C;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var D=this.constructor;
var B;

while(D.superclass){if(D.$$destructor){D.$$destructor.call(this);
}if(D.$$includes){B=D.$$flatIncludes;

for(var i=0,l=B.length;i<l;i++){if(B[i].$$destructor){B[i].$$destructor.call(this);
}}}D=D.superclass;
}var F=qx.Class.getProperties(this.constructor);

for(var i=0,l=F.length;i<l;i++){delete this[K+F[i]];
}{};
},_disposeFields:function(ba){qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(Y){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(bo){qx.util.DisposeUtil.disposeArray(this,bo);
},_disposeMap:function(r){qx.util.DisposeUtil.disposeMap(this,r);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bf){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this._disposeFields(O);
var bA=this.constructor;
var bE;
var bF=qx.core.Property.$$store;
var bC=bF.user;
var bD=bF.theme;
var by=bF.inherit;
var bB=bF.useinit;
var bz=bF.init;

while(bA){bE=bA.$$properties;

if(bE){for(var name in bE){if(bE[name].dispose){this[bC[name]]=this[bD[name]]=this[by[name]]=this[bB[name]]=this[bz[name]]=undefined;
}}}bA=bA.superclass;
}}});
})();
(function(){var y="",x="g",w="0",v='\\$1',u="%",t='-',s="qx.lang.String",r=' ',q='\n',p="undefined";
qx.Bootstrap.define(s,{statics:{camelCase:function(m){return m.replace(/\-([a-z])/g,function(N,O){return O.toUpperCase();
});
},hyphenate:function(G){return G.replace(/[A-Z]/g,function(J){return (t+J.charAt(0).toLowerCase());
});
},capitalize:function(H){return H.replace(/\b[a-z]/g,function(h){return h.toUpperCase();
});
},clean:function(l){return this.trim(l.replace(/\s+/g,r));
},trimLeft:function(n){return n.replace(/^\s+/,y);
},trimRight:function(d){return d.replace(/\s+$/,y);
},trim:function(z){return z.replace(/^\s+|\s+$/g,y);
},startsWith:function(E,F){return E.indexOf(F)===0;
},endsWith:function(b,c){return b.substring(b.length-c.length,b.length)===c;
},pad:function(K,length,L){if(typeof L===p){L=w;
}var M=y;

for(var i=K.length;i<length;i++){M+=L;
}return M+K;
},firstUp:function(Q){return Q.charAt(0).toUpperCase()+Q.substr(1);
},firstLow:function(a){return a.charAt(0).toLowerCase()+a.substr(1);
},contains:function(j,k){return j.indexOf(k)!=-1;
},format:function(e,f){var g=e;

for(var i=0;i<f.length;i++){g=g.replace(new RegExp(u+(i+1),x),f[i]);
}return g;
},escapeRegexpChars:function(I){return I.replace(/([.*+?^${}()|[\]\/\\])/g,v);
},toArray:function(P){return P.split(/\B|\b/g);
},stripTags:function(o){return o.replace(/<\/?[^>]+>/gi,y);
},stripScripts:function(A,B){var D=y;
var C=A.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){D+=arguments[1]+q;
return y;
});

if(B===true){qx.lang.Function.globalEval(D);
}return C;
}}});
})();
(function(){var q="function",p="Boolean",o="qx.Interface",n="]",m="toggle",k="Interface",j="is",h="[Interface ";
qx.Class.define(o,{statics:{define:function(name,a){if(a){if(a.extend&&!(a.extend instanceof Array)){a.extend=[a.extend];
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
}b.$$type=k;
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
},__bx:function(r,s,t,u){var y=t.$$members;

if(y){for(var x in y){if(qx.lang.Type.isFunction(y[x])){var w=this.__by(s,x);
var v=w||qx.lang.Type.isFunction(r[x]);

if(!v){throw new Error('Implementation of method "'+x+'" is missing in class "'+s.classname+'" required by interface "'+t.name+'"');
}var z=u===true&&!w&&!qx.Class.hasInterface(s,t);

if(z){r[x]=this.__bB(t,r[x],x,y[x]);
}}else{if(typeof r[x]===undefined){if(typeof r[x]!==q){throw new Error('Implementation of member "'+x+'" is missing in class "'+s.classname+'" required by interface "'+t.name+'"');
}}}}}},__by:function(L,M){var Q=M.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!Q){return false;
}var N=qx.lang.String.firstLow(Q[2]);
var O=qx.Class.hasProperty(L,N);

if(!O){return false;
}var P=Q[0]==j||Q[0]==m;

if(P){return qx.Class.getPropertyDefinition(L,N).check==p;
}return true;
},__bz:function(e,f){if(f.$$properties){for(var g in f.$$properties){if(!qx.Class.hasProperty(e,g)){throw new Error('The property "'+g+'" is not supported by Class "'+e.classname+'"!');
}}}},__bA:function(E,F){if(F.$$events){for(var G in F.$$events){if(!qx.Class.supportsEvent(E,G)){throw new Error('The event "'+G+'" is not supported by Class "'+E.classname+'"!');
}}}},assertObject:function(H,I){var K=H.constructor;
this.__bx(H,K,I,false);
this.__bz(K,I);
this.__bA(K,I);
var J=I.$$extends;

if(J){for(var i=0,l=J.length;i<l;i++){this.assertObject(H,J[i]);
}}},assert:function(A,B,C){this.__bx(A.prototype,A,B,C);
this.__bz(A,B);
this.__bA(A,B);
var D=B.$$extends;

if(D){for(var i=0,l=D.length;i<l;i++){this.assert(A,D[i],C);
}}},genericToString:function(){return h+this.name+n;
},$$registry:{},__bB:function(){},__bC:null,__bD:function(){}}});
})();
(function(){var a="qx.ui.decoration.IDecorator";
qx.Interface.define(a,{members:{getMarkup:function(){},resize:function(b,c,d){},tint:function(e,f){},getInsets:function(){}}});
})();
(function(){var j="Number",i="_applyInsets",h="abstract",g="insetRight",f="insetTop",e="insetBottom",d="qx.ui.decoration.Abstract",c="shorthand",b="insetLeft";
qx.Class.define(d,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:h,properties:{insetLeft:{check:j,nullable:true,apply:i},insetRight:{check:j,nullable:true,apply:i},insetBottom:{check:j,nullable:true,apply:i},insetTop:{check:j,nullable:true,apply:i},insets:{group:[f,g,e,b],mode:c}},members:{__bE:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__bE=null;
},getInsets:function(){if(this.__bE){return this.__bE;
}var a=this._getDefaultInsets();
return this.__bE={left:this.getInsetLeft()==null?a.left:this.getInsetLeft(),right:this.getInsetRight()==null?a.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?a.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?a.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__bE=null;
}}});
})();
(function(){var j="_applyBackground",i="repeat",h="backgroundPositionX",g="backgroundPositionY",f="no-repeat",e="scale",d="repeat-x",c="repeat-y",b="qx.ui.decoration.MBackgroundImage",a="String";
qx.Mixin.define(b,{properties:{backgroundImage:{check:a,nullable:true,apply:j},backgroundRepeat:{check:[i,d,c,f,e],init:i,apply:j},backgroundPositionX:{nullable:true,apply:j},backgroundPositionY:{nullable:true,apply:j},backgroundPosition:{group:[g,h]}},members:{_generateBackgroundMarkup:function(k){var l=qx.ui.decoration.Util.generateBackgroundMarkup(this.getBackgroundImage(),this.getBackgroundRepeat(),this.getBackgroundPositionX(),this.getBackgroundPositionY(),k);
return l;
},_applyBackground:function(){{};
}}});
})();
(function(){var D="_applyStyle",C="Color",B="px",A="solid",z="dotted",y="double",x="border:",w="dashed",v="",u="_applyWidth",o="qx.ui.decoration.Uniform",t="px ",r="__insets",n="__bF",m="position:absolute;top:0;left:0;",q=" ",p=";",s="scale",l="PositiveInteger";
qx.Class.define(o,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(i,j,k){arguments.callee.base.call(this);
if(i!=null){this.setWidth(i);
}
if(j!=null){this.setStyle(j);
}
if(k!=null){this.setColor(k);
}},properties:{width:{check:l,init:0,apply:u},style:{nullable:true,check:[A,z,w,y],init:A,apply:D},color:{nullable:true,check:C,apply:D},backgroundColor:{check:C,nullable:true,apply:D}},members:{__bF:null,_getDefaultInsets:function(){var d=this.getWidth();
return {top:d,right:d,bottom:d,left:d};
},_isInitialized:function(){return !!this.__bF;
},getMarkup:function(){if(this.__bF){return this.__bF;
}var e=m;
var f=this.getWidth();
{};
var h=qx.theme.manager.Color.getInstance();
e+=x+f+t+this.getStyle()+q+h.resolve(this.getColor())+p;
var g=this._generateBackgroundMarkup(e);
return this.__bF=g;
},resize:function(E,F,G){var I=this.getBackgroundImage()&&this.getBackgroundRepeat()==s;

if(I||qx.bom.client.Feature.CONTENT_BOX){var H=this.getWidth()*2;
F-=H;
G-=H;
if(F<0){F=0;
}
if(G<0){G=0;
}}E.style.width=F+B;
E.style.height=G+B;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.style.backgroundColor=c.resolve(b)||v;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(n,r);
}});
})();
(function(){var h="px",g="position:absolute;top:0;left:0",f="qx.ui.decoration.Background",e="",d="__insets",c="_applyStyle",b="__bG",a="Color";
qx.Class.define(f,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(p){arguments.callee.base.call(this);

if(p!=null){this.setBackgroundColor(p);
}},properties:{backgroundColor:{check:a,nullable:true,apply:c}},members:{__bG:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bG;
},getMarkup:function(){if(this.__bG){return this.__bG;
}var i=this._generateBackgroundMarkup(g);
return this.__bG=i;
},resize:function(j,k,l){j.style.width=k+h;
j.style.height=l+h;
},tint:function(m,n){var o=qx.theme.manager.Color.getInstance();

if(n==null){n=this.getBackgroundColor();
}m.style.backgroundColor=o.resolve(n)||e;
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(b,d);
}});
})();
(function(){var j="px",i="0px",h="-1px",g="no-repeat",f="scale-x",e="scale-y",d="-tr",c="-l",b="__insets",a='</div>',B="scale",A="qx.client",z="-br",y="-t",x="-tl",w="-r",v='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',u="_applyBaseImage",t="-b",s="__bJ",q="String",r="",o="-bl",p="-c",m="mshtml",n="__bI",k="__bH",l="qx.ui.decoration.Grid";
qx.Class.define(l,{extend:qx.ui.decoration.Abstract,construct:function(N,O){arguments.callee.base.call(this);
if(N!=null){this.setBaseImage(N);
}
if(O!=null){this.setInsets(O);
}},properties:{baseImage:{check:q,nullable:true,apply:u}},members:{__bH:null,__bI:null,__bJ:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bH;
},getMarkup:function(){if(this.__bH){return this.__bH;
}var P=qx.bom.element.Decoration;
var Q=this.__bI;
var R=this.__bJ;
var S=[];
S.push(v);
S.push(P.create(Q.tl,g,{top:0,left:0}));
S.push(P.create(Q.t,f,{top:0,left:R.left+j}));
S.push(P.create(Q.tr,g,{top:0,right:0}));
S.push(P.create(Q.bl,g,{bottom:0,left:0}));
S.push(P.create(Q.b,f,{bottom:0,left:R.left+j}));
S.push(P.create(Q.br,g,{bottom:0,right:0}));
S.push(P.create(Q.l,e,{top:R.top+j,left:0}));
S.push(P.create(Q.c,B,{top:R.top+j,left:R.left+j}));
S.push(P.create(Q.r,e,{top:R.top+j,right:0}));
S.push(a);
return this.__bH=S.join(r);
},resize:function(T,U,V){var W=this.__bJ;
var innerWidth=U-W.left-W.right;
var innerHeight=V-W.top-W.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}T.style.width=U+j;
T.style.height=V+j;
T.childNodes[1].style.width=innerWidth+j;
T.childNodes[4].style.width=innerWidth+j;
T.childNodes[7].style.width=innerWidth+j;
T.childNodes[6].style.height=innerHeight+j;
T.childNodes[7].style.height=innerHeight+j;
T.childNodes[8].style.height=innerHeight+j;

if(qx.core.Variant.isSet(A,m)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(U%2==1){T.childNodes[2].style.marginRight=h;
T.childNodes[5].style.marginRight=h;
T.childNodes[8].style.marginRight=h;
}else{T.childNodes[2].style.marginRight=i;
T.childNodes[5].style.marginRight=i;
T.childNodes[8].style.marginRight=i;
}
if(V%2==1){T.childNodes[3].style.marginBottom=h;
T.childNodes[4].style.marginBottom=h;
T.childNodes[5].style.marginBottom=h;
}else{T.childNodes[3].style.marginBottom=i;
T.childNodes[4].style.marginBottom=i;
T.childNodes[5].style.marginBottom=i;
}}}},tint:function(C,D){},_applyBaseImage:function(E,F){{};
var G=qx.util.ResourceManager.getInstance();

if(E){var I=qx.util.AliasManager.getInstance();
var K=I.resolve(E);
var L=/(.*)(\.[a-z]+)$/.exec(K);
var J=L[1];
var H=L[2];
var M=this.__bI={tl:J+x+H,t:J+y+H,tr:J+d+H,bl:J+o+H,b:J+t+H,br:J+z+H,l:J+c+H,c:J+p+H,r:J+w+H};
this.__bJ={top:G.getImageHeight(M.t),bottom:G.getImageHeight(M.b),left:G.getImageWidth(M.l),right:G.getImageWidth(M.r)};
}}},destruct:function(){this._disposeFields(k,n,s,b);
}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g='<div style="',f='border:',e="1px solid ",d="",c=";",b="px",a='</div>',w="qx.ui.decoration.Beveled",v="__insets",u='<div style="position:absolute;top:1px;left:1px;',t='border-bottom:',s='border-right:',r="position:absolute;top:1px;left:1px;",q='<div style="overflow:hidden;font-size:0;line-height:0;">',p='border-left:',o='border-top:',n="Number",l='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',k="__bK";
qx.Class.define(w,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(P,Q,R){arguments.callee.base.call(this);
if(P!=null){this.setOuterColor(P);
}
if(Q!=null){this.setInnerColor(Q);
}
if(R!=null){this.setInnerOpacity(R);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:n,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__bK:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__bK;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__bK){return this.__bK;
}var L=qx.theme.manager.Color.getInstance();
var M=[];
var O=e+L.resolve(this.getOuterColor())+c;
var N=e+L.resolve(this.getInnerColor())+c;
M.push(q);
M.push(g);
M.push(f,O);
M.push(qx.bom.element.Opacity.compile(0.35));
M.push(i);
M.push(l);
M.push(p,O);
M.push(s,O);
M.push(i);
M.push(g);
M.push(m);
M.push(o,O);
M.push(t,O);
M.push(i);
M.push(this._generateBackgroundMarkup(r));
M.push(u);
M.push(f,N);
M.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
M.push(i);
M.push(a);
return this.__bK=M.join(d);
},resize:function(A,B,C){if(B<4){B=4;
}
if(C<4){C=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=B-2;
var outerHeight=C-2;
var I=outerWidth;
var H=outerHeight;
var innerWidth=B-4;
var innerHeight=C-4;
}else{var outerWidth=B;
var outerHeight=C;
var I=B-2;
var H=C-2;
var innerWidth=I;
var innerHeight=H;
}var K=b;
var G=A.childNodes[0].style;
G.width=outerWidth+K;
G.height=outerHeight+K;
var F=A.childNodes[1].style;
F.width=outerWidth+K;
F.height=H+K;
var E=A.childNodes[2].style;
E.width=I+K;
E.height=outerHeight+K;
var D=A.childNodes[3].style;
D.width=I+K;
D.height=H+K;
var J=A.childNodes[4].style;
J.width=innerWidth+K;
J.height=innerHeight+K;
},tint:function(x,y){var z=qx.theme.manager.Color.getInstance();

if(y==null){y=this.getBackgroundColor();
}x.childNodes[3].style.backgroundColor=z.resolve(y)||d;
}},destruct:function(){this._disposeFields(k,v);
}});
})();
(function(){var j="_applyStyle",i="solid",h="Color",g="double",f="px ",e="dotted",d="_applyWidth",c="dashed",b="Number",a=" ",I=";",H="shorthand",G="px",F="widthTop",E="styleRight",D="styleLeft",C="widthLeft",B="widthBottom",A="",z="styleTop",q="colorBottom",r="styleBottom",o="widthRight",p="colorLeft",m="colorRight",n="colorTop",k="border-left:",l="__bL",s="scale",t="position:absolute;top:0;left:0;",v="border-top:",u="border-bottom:",x="border-right:",w="qx.ui.decoration.Single",y="__insets";
qx.Class.define(w,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(W,X,Y){arguments.callee.base.call(this);
if(W!=null){this.setWidth(W);
}
if(X!=null){this.setStyle(X);
}
if(Y!=null){this.setColor(Y);
}},properties:{widthTop:{check:b,init:0,apply:d},widthRight:{check:b,init:0,apply:d},widthBottom:{check:b,init:0,apply:d},widthLeft:{check:b,init:0,apply:d},styleTop:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleRight:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleBottom:{nullable:true,check:[i,e,c,g],init:i,apply:j},styleLeft:{nullable:true,check:[i,e,c,g],init:i,apply:j},colorTop:{nullable:true,check:h,apply:j},colorRight:{nullable:true,check:h,apply:j},colorBottom:{nullable:true,check:h,apply:j},colorLeft:{nullable:true,check:h,apply:j},backgroundColor:{check:h,nullable:true,apply:j},left:{group:[C,D,p]},right:{group:[o,E,m]},top:{group:[F,z,n]},bottom:{group:[B,r,q]},width:{group:[F,o,B,C],mode:H},style:{group:[z,E,r,D],mode:H},color:{group:[n,m,q,p],mode:H}},members:{__bL:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__bL;
},getMarkup:function(M){if(this.__bL){return this.__bL;
}var N=qx.theme.manager.Color.getInstance();
var O=A;
var Q=this.getWidthTop();

if(Q>0){O+=v+Q+f+this.getStyleTop()+a+N.resolve(this.getColorTop())+I;
}var Q=this.getWidthRight();

if(Q>0){O+=x+Q+f+this.getStyleRight()+a+N.resolve(this.getColorRight())+I;
}var Q=this.getWidthBottom();

if(Q>0){O+=u+Q+f+this.getStyleBottom()+a+N.resolve(this.getColorBottom())+I;
}var Q=this.getWidthLeft();

if(Q>0){O+=k+Q+f+this.getStyleLeft()+a+N.resolve(this.getColorLeft())+I;
}{};
O+=t;
var P=this._generateBackgroundMarkup(O);
return this.__bL=P;
},resize:function(R,S,T){var V=this.getBackgroundImage()&&this.getBackgroundRepeat()==s;

if(V||qx.bom.client.Feature.CONTENT_BOX){var U=this.getInsets();
S-=U.left+U.right;
T-=U.top+U.bottom;
if(S<0){S=0;
}
if(T<0){T=0;
}}R.style.width=S+G;
R.style.height=T+G;
},tint:function(J,K){var L=qx.theme.manager.Color.getInstance();

if(K==null){K=this.getBackgroundColor();
}J.style.backgroundColor=L.resolve(K)||A;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(l,y);
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bp="decoration/table/header-cell.png",bo="decoration/form/input.png",bn="#f8f8f8",bm="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bl="#b6b6b6",bk="background-pane",bj="repeat-y",bi="decoration/form/input-focused.png",bh="border-input",bg="decoration/scrollbar/scrollbar-button-bg-vertical.png",t="decoration/tabview/tab-button-top-active.png",u="decoration/form/button-c.png",r="decoration/scrollbar/scrollbar-bg-vertical.png",s="decoration/form/button.png",p="decoration/form/button-checked.png",q="decoration/tabview/tab-button-left-inactive.png",n="decoration/groupbox/groupbox.png",o="#FAFAFA",A="decoration/pane/pane.png",B="decoration/menu/background.png",L="decoration/toolbar/toolbar-part.gif",I="decoration/tabview/tab-button-top-inactive.png",T="decoration/menu/bar-background.png",O="center",bc="decoration/tabview/tab-button-bottom-active.png",Y="decoration/form/button-hovered.png",E="decoration/form/tooltip-error-arrow.png",bf="decoration/window/captionbar-inactive.png",be="qx/decoration/Modern",bd="decoration/window/statusbar.png",D="border-focused",G="decoration/selection.png",H="table-focus-indicator",K="#F2F2F2",M="decoration/form/button-checked-c.png",P="decoration/scrollbar/scrollbar-bg-horizontal.png",V="qx.theme.modern.Decoration",bb="#f4f4f4",v="decoration/shadow/shadow-small.png",w="decoration/app-header.png",F="decoration/tabview/tabview-pane.png",S="decoration/form/tooltip-error.png",R="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",W="decoration/tabview/tab-button-right-active.png",N="decoration/form/button-pressed.png",U="no-repeat",a="decoration/window/captionbar-active.png",ba="decoration/tabview/tab-button-left-active.png",x="background-splitpane",y="decoration/form/button-checked-focused.png",J="#C5C5C5",b="decoration/toolbar/toolbar-gradient.png",c="decoration/tabview/tab-button-right-inactive.png",C="#b8b8b8",z="decoration/shadow/shadow.png";
qx.Theme.define(V,{aliases:{decoration:be},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:G,backgroundRepeat:l}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:A,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:n}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:S,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:E,backgroundPositionY:O,backgroundRepeat:U,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:z,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:v,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:P,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:r,backgroundRepeat:bj}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:R,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:Y,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:p,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:y,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:D,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:b,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:u,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:M,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:C,colorRight:bb,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:L,backgroundRepeat:bj}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:F,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:t}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:I}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bc}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:q}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:W}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:c}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bk,width:3,color:x,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bk,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:H,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthRight:1,colorRight:K,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:B,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:J,widthBottom:1,colorBottom:o}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:T,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:w,backgroundRepeat:l}}}});
})();
(function(){var a="passwd.theme.Decoration";
qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{}});
})();
(function(){var m="iPod",l="Win32",k="",j="Win64",i="Linux",h="BSD",g="Macintosh",f="iPhone",e="Windows",d="qx.bom.client.Platform",a="X11",c="MacIntel",b="MacPPC";
qx.Bootstrap.define(d,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__bM:function(){var o=navigator.platform;
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
}}},defer:function(n){n.__bM();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",G=")",F="winxp",E="freebsd",D="sunos",C="SV1",B="|",A="nintendods",z="winnt4",y="wince",x="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="symbian",v="g",u="qx.bom.client.System",w=" Mobile/";
qx.Bootstrap.define(u,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__bN:{"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":F,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":z,"Win 9x 4.90":x,"Windows CE":y,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":E,"NetBSD":m,"OpenBSD":k,"SunOS":D,"Symbian System":t,"Nitro":A,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__bO:function(){var J=navigator.userAgent;
var I=[];

for(var H in this.__bN){I.push(H);
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
}else{this.NAME=this.__bN[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(J.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&J.indexOf(C)!==-1){this.SP2=true;
}}}}},defer:function(L){L.__bO();
}});
})();
(function(){var m="Liberation Sans",l="Arial",k="Lucida Grande",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",d="monospace",a="Lucida Console",c="qx.theme.modern.Font",b="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l]},"bold":{size:qx.bom.client.System.WINVISTA?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l],bold:true},"small":{size:qx.bom.client.System.WINVISTA?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[k]:qx.bom.client.System.WINVISTA?[h,i]:[j,m,l]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[a,e]:qx.bom.client.System.WINVISTA?[g]:[g,b,f,d]}}});
})();
(function(){var a="passwd.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var dM="button-frame",dL="atom",dK="widget",dJ="main",dI="button",dH="bold",dG="middle",dF="text-selected",dE="background-light",dD="image",cq="text-disabled",cp="groupbox",co="cell",cn="border-invalid",cm="input",cl="input-disabled",ck="menu-button",cj="decoration/arrows/down.png",ci="input-focused-invalid",ch="toolbar-button",dT="spinner",dU="input-focused",dR="selected",dS="popup",dP="tooltip",dQ="list",dN="tree-item",dO="treevirtual-contract",dV="scrollbar",dW="datechooser/nav-button",dl="text-hovered",dk="center",dn="treevirtual-expand",dm="textfield",dq="label",dp="decoration/arrows/right.png",ds="background-application",dr="radiobutton",dj="invalid",di="combobox",u="right-top",v="checkbox",w="text-title",x="qx/static/blank.gif",y="scrollbar/button",z="right",A="combobox/button",B="icon/16/places/folder.png",C="text-label",D="decoration/tree/closed.png",el="scrollbar-slider-horizontal",ek="white",ej="decoration/arrows/left.png",ei="button-focused",ep="text-light",eo="text-input",en="slidebar/button-forward",em="background-splitpane",er=".png",eq="decoration/tree/open.png",bv="default",bw="decoration/arrows/down-small.png",bt="datechooser",bu="slidebar/button-backward",bz="selectbox",bA="treevirtual-folder",bx="shadow-popup",by="icon/16/mimetypes/office-document.png",br="background-medium",bs="table",X="decoration/form/",W="",ba="-invalid",Y="icon/16/places/folder-open.png",T="button-checked",S="decoration/window/maximize-active-hovered.png",V="radiobutton-hovered",U="decoration/cursors/",R="slidebar",Q="tooltip-error-arrow",bG="table-scroller-focus-indicator",bH="move-frame",bI="nodrop",bJ="decoration/table/boolean-true.png",bC="table-header-cell",bD="menu",bE="app-header",bF="row-layer",bK="text-inactive",bL="move",bk="radiobutton-checked-focused",bj="decoration/window/restore-active-hovered.png",bi="shadow-window",bh="table-column-button",bg="right.png",bf="tabview-page-button-bottom-inactive",be="tooltip-error",bd="window-statusbar",bo="button-hovered",bn="decoration/scrollbar/scrollbar-",bM="background-tip",bN="scrollbar-slider-horizontal-disabled",bO="table-scroller-header",bP="radiobutton-disabled",bQ="button-pressed",bR="table-pane",bS="decoration/window/close-active.png",bT="tabview-page-button-left-active",bU="checkbox-hovered",bV="button-invalid-shadow",cy="checkbox-checked",cx="decoration/window/minimize-active-hovered.png",cw="menubar",cv="icon/16/actions/dialog-cancel.png",cC="tabview-page-button-top-inactive",cB="tabview-page-button-left-inactive",cA="toolbar-button-checked",cz="decoration/tree/open-selected.png",cG="radiobutton-checked",cF="decoration/window/minimize-inactive.png",de="icon/16/apps/office-calendar.png",df="group",dc="tabview-page-button-right-inactive",dd="decoration/window/minimize-active.png",da="decoration/window/restore-inactive.png",db="checkbox-checked-focused",cX="splitpane",cY="combobox/textfield",dg="button-preselected-focused",dh="decoration/window/close-active-hovered.png",dw="qx/icon/Tango/16/actions/window-close.png",dv="checkbox-pressed",dy="button-disabled",dx="border-separator",dA="decoration/window/maximize-inactive.png",dz="icon/22/places/folder-open.png",dC="scrollarea",dB="scrollbar-vertical",du="decoration/toolbar/toolbar-handle-knob.gif",dt="icon/22/mimetypes/office-document.png",ee="button-preselected",ef="button-checked-focused",eg="up.png",eh="decoration/tree/closed-selected.png",ea="qx.theme.modern.Appearance",eb="text-active",ec="checkbox-disabled",ed="toolbar-button-hovered",dX="progressive-table-header",dY="decoration/menu/radiobutton.gif",t="decoration/arrows/forward.png",s="decoration/table/descending.png",r="window-captionbar-active",q="checkbox-checked-hovered",p="scrollbar-slider-vertical",o="toolbar",n="alias",m="decoration/window/restore-active.png",l="decoration/table/boolean-false.png",k="checkbox-checked-disabled",G="icon/32/mimetypes/office-document.png",H="radiobutton-checked-disabled",E="tabview-pane",F="decoration/arrows/rewind.png",K="checkbox-focused",L="top",I="#EEE",J="icon/16/actions/dialog-ok.png",N="radiobutton-checked-hovered",O="table-header-cell-hovered",cK="window",cE="text-gray",cR="decoration/menu/radiobutton-invert.gif",cN="text-placeholder",ct="slider",cr="decoration/table/select-column-order.png",bc="down.png",cu="tabview-page-button-top-active",bm="icon/32/places/folder-open.png",bl="icon/22/places/folder.png",bY="decoration/window/maximize-active.png",ca="checkbox-checked-pressed",cb="decoration/window/close-inactive.png",cc="toolbar-part",cd="decoration/splitpane/knob-vertical.png",ce=".gif",cf="decoration/menu/checkbox-invert.gif",cg="decoration/arrows/up.png",bW="radiobutton-checked-pressed",bX="table-statusbar",cs="radiobutton-pressed",cQ="window-captionbar-inactive",cP="copy",cO="radiobutton-focused",cV="decoration/menu/checkbox.gif",cU="decoration/splitpane/knob-horizontal.png",cT="icon/32/places/folder.png",cS="toolbar-separator",cM="tabview-page-button-bottom-active",cL="decoration/arrows/up-small.png",M="decoration/table/ascending.png",bq="small",bp="tabview-page-button-right-active",cD="-disabled",bB="scrollbar-horizontal",cJ="progressive-table-header-cell",cI="menu-separator",cH="pane",bb="decoration/arrows/right-invert.png",cW="left.png",P="icon/16/actions/view-refresh.png";
qx.Theme.define(ea,{appearances:{"widget":{},"root":{style:function(ez){return {backgroundColor:ds,textColor:C,font:bv};
}},"label":{style:function(hf){return {textColor:hf.disabled?cq:undefined};
}},"move-frame":{style:function(i){return {decorator:dJ};
}},"resize-frame":bH,"dragdrop-cursor":{style:function(gK){var gL=bI;

if(gK.copy){gL=cP;
}else if(gK.move){gL=bL;
}else if(gK.alias){gL=n;
}return {source:U+gL+ce,position:u,offset:[2,16,2,6]};
}},"image":{style:function(gl){return {opacity:!gl.replacement&&gl.disabled?0.3:1};
}},"atom":{},"atom/label":dq,"atom/icon":dD,"popup":{style:function(fM){return {decorator:dJ,backgroundColor:dE,shadow:bx};
}},"button-frame":{alias:dL,style:function(fr){var ft,fs;

if(fr.checked&&fr.focused&&!fr.inner){ft=ef;
fs=undefined;
}else if(fr.disabled){ft=dy;
fs=undefined;
}else if(fr.pressed){ft=bQ;
fs=dl;
}else if(fr.checked){ft=T;
fs=undefined;
}else if(fr.hovered){ft=bo;
fs=dl;
}else if(fr.preselected&&fr.focused&&!fr.inner){ft=dg;
fs=dl;
}else if(fr.preselected){ft=ee;
fs=dl;
}else if(fr.focused&&!fr.inner){ft=ei;
fs=undefined;
}else{ft=dI;
fs=undefined;
}return {decorator:ft,textColor:fs,shadow:fr.invalid&&!fr.disabled?bV:undefined};
}},"button-frame/image":{style:function(eE){return {opacity:!eE.replacement&&eE.disabled?0.5:1};
}},"button":{alias:dM,include:dM,style:function(gN){return {padding:[2,8],center:true};
}},"splitbutton":{},"splitbutton/button":dI,"splitbutton/arrow":{alias:dI,include:dI,style:function(fw){return {icon:cj,padding:2,marginLeft:1};
}},"checkbox":{alias:dL,style:function(eJ){var eL;

if(eJ.checked&&eJ.focused){eL=db;
}else if(eJ.checked&&eJ.disabled){eL=k;
}else if(eJ.checked&&eJ.pressed){eL=ca;
}else if(eJ.checked&&eJ.hovered){eL=q;
}else if(eJ.checked){eL=cy;
}else if(eJ.disabled){eL=ec;
}else if(eJ.focused){eL=K;
}else if(eJ.pressed){eL=dv;
}else if(eJ.hovered){eL=bU;
}else{eL=v;
}var eK=eJ.invalid&&!eJ.disabled?ba:W;
return {icon:X+eL+eK+er,gap:6};
}},"radiobutton":{alias:dL,style:function(eG){var eI;

if(eG.checked&&eG.focused){eI=bk;
}else if(eG.checked&&eG.disabled){eI=H;
}else if(eG.checked&&eG.pressed){eI=bW;
}else if(eG.checked&&eG.hovered){eI=N;
}else if(eG.checked){eI=cG;
}else if(eG.disabled){eI=bP;
}else if(eG.focused){eI=cO;
}else if(eG.pressed){eI=cs;
}else if(eG.hovered){eI=V;
}else{eI=dr;
}var eH=eG.invalid&&!eG.disabled?ba:W;
return {icon:X+eI+eH+er,gap:6};
}},"textfield":{style:function(gD){var gI;
var gG=!!gD.focused;
var gH=!!gD.invalid;
var gE=!!gD.disabled;

if(gG&&gH&&!gE){gI=ci;
}else if(gG&&!gH&&!gE){gI=dU;
}else if(gE){gI=cl;
}else if(!gG&&gH&&!gE){gI=cn;
}else{gI=cm;
}var gF;

if(gD.disabled){gF=cq;
}else if(gD.showingPlaceholder){gF=cN;
}else{gF=eo;
}return {decorator:gI,padding:[2,4,1],textColor:gF};
}},"textarea":{include:dm,style:function(ff){return {padding:4};
}},"spinner":{style:function(fa){var fe;
var fc=!!fa.focused;
var fd=!!fa.invalid;
var fb=!!fa.disabled;

if(fc&&fd&&!fb){fe=ci;
}else if(fc&&!fd&&!fb){fe=dU;
}else if(fb){fe=cl;
}else if(!fc&&fd&&!fb){fe=cn;
}else{fe=cm;
}return {decorator:fe};
}},"spinner/textfield":{style:function(hE){return {marginRight:2,padding:[2,4,1],textColor:hE.disabled?cq:eo};
}},"spinner/upbutton":{alias:dM,include:dM,style:function(gJ){return {icon:cL,padding:gJ.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:dM,include:dM,style:function(ga){return {icon:bw,padding:ga.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":di,"datefield/button":{alias:A,include:A,style:function(fn){return {icon:de,padding:[0,3],decorator:undefined};
}},"datefield/textfield":cY,"datefield/list":{alias:bt,include:bt,style:function(eC){return {decorator:undefined};
}},"groupbox":{style:function(fh){return {legendPosition:L};
}},"groupbox/legend":{alias:dL,style:function(hI){return {padding:[1,0,1,4],textColor:hI.invalid?dj:w,font:dH};
}},"groupbox/frame":{style:function(fK){return {padding:12,decorator:df};
}},"check-groupbox":cp,"check-groupbox/legend":{alias:v,include:v,style:function(gT){return {padding:[1,0,1,4],textColor:gT.invalid?dj:w,font:dH};
}},"radio-groupbox":cp,"radio-groupbox/legend":{alias:dr,include:dr,style:function(gj){return {padding:[1,0,1,4],textColor:gj.invalid?dj:w,font:dH};
}},"scrollarea":{style:function(gg){return {minWidth:64,minHeight:64};
}},"scrollarea/corner":{style:function(gk){return {backgroundColor:ds};
}},"scrollarea/pane":dK,"scrollarea/scrollbar-x":dV,"scrollarea/scrollbar-y":dV,"scrollbar":{style:function(gP){return {width:gP.horizontal?undefined:16,height:gP.horizontal?16:undefined,decorator:gP.horizontal?bB:dB,padding:1};
}},"scrollbar/slider":{alias:ct,style:function(hK){return {padding:hK.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:dM,style:function(gA){var gB=gA.horizontal?el:p;

if(gA.disabled){gB+=cD;
}return {decorator:gB,minHeight:gA.horizontal?undefined:14,minWidth:gA.horizontal?14:undefined};
}},"scrollbar/button":{alias:dM,include:dM,style:function(hi){var hj=bn;

if(hi.left){hj+=cW;
}else if(hi.right){hj+=bg;
}else if(hi.up){hj+=eg;
}else{hj+=bc;
}
if(hi.left||hi.right){return {padding:[0,0,0,hi.left?3:4],icon:hj,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:hj,width:14,height:15};
}}},"scrollbar/button-begin":y,"scrollbar/button-end":y,"slider":{style:function(a){var e;
var c=!!a.focused;
var d=!!a.invalid;
var b=!!a.disabled;

if(c&&d&&!b){e=ci;
}else if(c&&!d&&!b){e=dU;
}else if(b){e=cl;
}else if(!c&&d&&!b){e=cn;
}else{e=cm;
}return {decorator:e};
}},"slider/knob":{include:dM,style:function(gU){return {decorator:gU.disabled?bN:el,shadow:undefined,height:14,width:14};
}},"list":{alias:dC,style:function(hL){var hP;
var hN=!!hL.focused;
var hO=!!hL.invalid;
var hM=!!hL.disabled;

if(hN&&hO&&!hM){hP=ci;
}else if(hN&&!hO&&!hM){hP=dU;
}else if(hM){hP=cl;
}else if(!hN&&hO&&!hM){hP=cn;
}else{hP=cm;
}return {backgroundColor:dE,decorator:hP};
}},"list/pane":dK,"listitem":{alias:dL,style:function(eu){return {padding:4,textColor:eu.selected?dF:undefined,decorator:eu.selected?dR:undefined};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:dM,include:dM,style:function(gR){return {padding:5,center:true,icon:gR.vertical?cj:dp};
}},"slidebar/button-backward":{alias:dM,include:dM,style:function(eA){return {padding:5,center:true,icon:eA.vertical?cg:ej};
}},"tabview":{style:function(eP){return {contentPadding:16};
}},"tabview/bar":{alias:R,style:function(hF){var hG={marginBottom:hF.barTop?-1:0,marginTop:hF.barBottom?-4:0,marginLeft:hF.barRight?-3:0,marginRight:hF.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(hF.barTop||hF.barBottom){hG.paddingLeft=5;
hG.paddingRight=7;
}else{hG.paddingTop=5;
hG.paddingBottom=7;
}return hG;
}},"tabview/bar/button-forward":{include:en,alias:en,style:function(ey){if(ey.barTop||ey.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:bu,alias:bu,style:function(gM){if(gM.barTop||gM.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(hd){return {decorator:E,minHeight:100,marginBottom:hd.barBottom?-1:0,marginTop:hd.barTop?-1:0,marginLeft:hd.barLeft?-1:0,marginRight:hd.barRight?-1:0};
}},"tabview-page":dK,"tabview-page/button":{alias:dL,style:function(fN){var fT,fP=0;
var fS=0,fO=0,fQ=0,fR=0;

if(fN.checked){if(fN.barTop){fT=cu;
fP=[6,14];
fQ=fN.firstTab?0:-5;
fR=fN.lastTab?0:-5;
}else if(fN.barBottom){fT=cM;
fP=[6,14];
fQ=fN.firstTab?0:-5;
fR=fN.lastTab?0:-5;
}else if(fN.barRight){fT=bp;
fP=[6,13];
fS=fN.firstTab?0:-5;
fO=fN.lastTab?0:-5;
}else{fT=bT;
fP=[6,13];
fS=fN.firstTab?0:-5;
fO=fN.lastTab?0:-5;
}}else{if(fN.barTop){fT=cC;
fP=[4,10];
fS=4;
fQ=fN.firstTab?5:1;
fR=1;
}else if(fN.barBottom){fT=bf;
fP=[4,10];
fO=4;
fQ=fN.firstTab?5:1;
fR=1;
}else if(fN.barRight){fT=dc;
fP=[4,10];
fR=5;
fS=fN.firstTab?5:1;
fO=1;
fQ=1;
}else{fT=cB;
fP=[4,10];
fQ=5;
fS=fN.firstTab?5:1;
fO=1;
fR=1;
}}return {zIndex:fN.checked?10:5,decorator:fT,padding:fP,marginTop:fS,marginBottom:fO,marginLeft:fQ,marginRight:fR,textColor:fN.checked?eb:bK};
}},"tabview-page/button/close-button":{alias:dL,style:function(hz){return {icon:dw};
}},"toolbar":{style:function(fI){return {decorator:o,spacing:2};
}},"toolbar/part":{style:function(et){return {decorator:cc,spacing:2};
}},"toolbar/part/container":{style:function(fU){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(gQ){return {source:du,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:dL,style:function(gd){return {marginTop:2,marginBottom:2,padding:(gd.pressed||gd.checked||gd.hovered)&&!gd.disabled||(gd.disabled&&gd.checked)?3:5,decorator:gd.pressed||(gd.checked&&!gd.hovered)||(gd.checked&&gd.disabled)?cA:gd.hovered&&!gd.disabled?ed:undefined};
}},"toolbar-menubutton":{alias:ch,include:ch,style:function(es){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:dD,include:dD,style:function(hH){return {source:bw};
}},"toolbar-splitbutton":{style:function(ha){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:ch,include:ch,style:function(fB){return {icon:cj,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:ch,include:ch,style:function(go){return {padding:go.pressed||go.checked?1:go.hovered?1:3,icon:cj,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(gW){return {decorator:cS,margin:7};
}},"tree":dQ,"tree-item":{style:function(hJ){return {padding:[2,6],textColor:hJ.selected?dF:undefined,decorator:hJ.selected?dR:undefined};
}},"tree-item/icon":{include:dD,style:function(gz){return {paddingRight:5};
}},"tree-item/label":dq,"tree-item/open":{include:dD,style:function(f){var g;

if(f.selected&&f.opened){g=cz;
}else if(f.selected&&!f.opened){g=eh;
}else if(f.opened){g=eq;
}else{g=D;
}return {padding:[0,5,0,2],source:g};
}},"tree-folder":{include:dN,alias:dN,style:function(eX){var eY;

if(eX.small){eY=eX.opened?Y:B;
}else if(eX.large){eY=eX.opened?bm:cT;
}else{eY=eX.opened?dz:bl;
}return {icon:eY};
}},"tree-file":{include:dN,alias:dN,style:function(fi){return {icon:fi.small?by:fi.large?G:dt};
}},"treevirtual":bs,"treevirtual-folder":{style:function(fz){return {icon:fz.opened?Y:B};
}},"treevirtual-file":{include:bA,alias:bA,style:function(gq){return {icon:by};
}},"treevirtual-line":{style:function(eT){return {icon:x};
}},"treevirtual-contract":{style:function(hh){return {icon:eq,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(gp){return {icon:D,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":dO,"treevirtual-only-expand":dn,"treevirtual-start-contract":dO,"treevirtual-start-expand":dn,"treevirtual-end-contract":dO,"treevirtual-end-expand":dn,"treevirtual-cross-contract":dO,"treevirtual-cross-expand":dn,"treevirtual-end":{style:function(fE){return {icon:x};
}},"treevirtual-cross":{style:function(hx){return {icon:x};
}},"tooltip":{include:dS,style:function(fH){return {backgroundColor:bM,padding:[1,3,2,3],offset:[5,5,20,5]};
}},"tooltip/atom":dL,"tooltip-error":{include:dP,style:function(eB){return {textColor:dF,placeMethod:dK,offsetRight:15,position:u,showTimeout:100,hideTimeout:10000,decorator:be,shadow:Q,font:dH};
}},"tooltip-error/atom":dL,"window":{style:function(hg){return {shadow:bi,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(gf){return {decorator:cK};
}},"window/captionbar":{style:function(hm){return {decorator:hm.active?r:cQ,textColor:hm.active?ek:cE,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(eW){return {margin:[5,0,3,6]};
}},"window/title":{style:function(he){return {alignY:dG,font:dH,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:dL,style:function(eR){return {icon:eR.active?eR.hovered?cx:dd:cF,margin:[4,8,2,0]};
}},"window/restore-button":{alias:dL,style:function(hb){return {icon:hb.active?hb.hovered?bj:m:da,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:dL,style:function(hn){return {icon:hn.active?hn.hovered?S:bY:dA,margin:[4,8,2,0]};
}},"window/close-button":{alias:dL,style:function(fk){return {icon:fk.active?fk.hovered?dh:bS:cb,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(gX){return {padding:[2,6],decorator:bd,minHeight:18};
}},"window/statusbar-text":{style:function(eQ){return {font:bq};
}},"iframe":{style:function(ew){return {decorator:dJ};
}},"resizer":{style:function(gn){return {decorator:cH};
}},"splitpane":{style:function(eS){return {decorator:cX};
}},"splitpane/splitter":{style:function(fl){return {width:fl.horizontal?3:undefined,height:fl.vertical?3:undefined,backgroundColor:em};
}},"splitpane/splitter/knob":{style:function(fq){return {source:fq.horizontal?cU:cd};
}},"splitpane/slider":{style:function(gm){return {width:gm.horizontal?3:undefined,height:gm.vertical?3:undefined,backgroundColor:em};
}},"selectbox":{alias:dM,include:dM,style:function(fg){return {padding:[2,8]};
}},"selectbox/atom":dL,"selectbox/popup":dS,"selectbox/list":{alias:dQ},"selectbox/arrow":{include:dD,style:function(gt){return {source:cj,paddingLeft:5};
}},"datechooser":{style:function(hq){var hu;
var hs=!!hq.focused;
var ht=!!hq.invalid;
var hr=!!hq.disabled;

if(hs&&ht&&!hr){hu=ci;
}else if(hs&&!ht&&!hr){hu=dU;
}else if(hr){hu=cl;
}else if(!hs&&ht&&!hr){hu=cn;
}else{hu=cm;
}return {padding:2,decorator:hu,backgroundColor:dE};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:dM,alias:dM,style:function(hv){var hw={padding:[2,4],shadow:undefined};

if(hv.lastYear){hw.icon=F;
hw.marginRight=1;
}else if(hv.lastMonth){hw.icon=ej;
}else if(hv.nextYear){hw.icon=t;
hw.marginLeft=1;
}else if(hv.nextMonth){hw.icon=dp;
}return hw;
}},"datechooser/last-year-button-tooltip":dP,"datechooser/last-month-button-tooltip":dP,"datechooser/next-year-button-tooltip":dP,"datechooser/next-month-button-tooltip":dP,"datechooser/last-year-button":dW,"datechooser/last-month-button":dW,"datechooser/next-month-button":dW,"datechooser/next-year-button":dW,"datechooser/month-year-label":{style:function(fo){return {font:dH,textAlign:dk,textColor:fo.disabled?cq:undefined};
}},"datechooser/date-pane":{style:function(gi){return {textColor:gi.disabled?cq:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(fV){return {textColor:fV.disabled?cq:fV.weekend?ep:undefined,textAlign:dk,paddingTop:2,backgroundColor:br};
}},"datechooser/week":{style:function(ge){return {textAlign:dk,padding:[2,4],backgroundColor:br};
}},"datechooser/day":{style:function(eM){return {textAlign:dk,decorator:eM.disabled?undefined:eM.selected?dR:undefined,textColor:eM.disabled?cq:eM.selected?dF:eM.otherMonth?ep:undefined,font:eM.today?dH:undefined,padding:[2,4]};
}},"combobox":{style:function(gu){var gy;
var gw=!!gu.focused;
var gx=!!gu.invalid;
var gv=!!gu.disabled;

if(gw&&gx&&!gv){gy=ci;
}else if(gw&&!gx&&!gv){gy=dU;
}else if(gv){gy=cl;
}else if(!gw&&gx&&!gv){gy=cn;
}else{gy=cm;
}return {decorator:gy};
}},"combobox/popup":dS,"combobox/list":{alias:dQ},"combobox/button":{include:dM,alias:dM,style:function(eU){var eV={icon:cj,padding:2};

if(eU.selected){eV.decorator=ei;
}return eV;
}},"combobox/textfield":{include:dm,style:function(hp){return {decorator:undefined};
}},"menu":{style:function(hA){var hB={decorator:bD,shadow:bx,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4};

if(hA.submenu){hB.position=u;
hB.offset=[-2,-3];
}return hB;
}},"menu-separator":{style:function(fD){return {height:0,decorator:cI,margin:[4,2]};
}},"menu-button":{alias:dL,style:function(hC){return {decorator:hC.selected?dR:undefined,textColor:hC.selected?dF:undefined,padding:[4,6]};
}},"menu-button/icon":{include:dD,style:function(ex){return {alignY:dG};
}},"menu-button/label":{include:dq,style:function(hk){return {alignY:dG,padding:1};
}},"menu-button/shortcut":{include:dq,style:function(eF){return {alignY:dG,marginLeft:14,padding:1};
}},"menu-button/arrow":{style:function(fW){return {source:fW.selected?bb:dp,alignY:dG};
}},"menu-checkbox":{alias:ck,include:ck,style:function(fv){return {icon:!fv.checked?undefined:fv.selected?cf:cV};
}},"menu-radiobutton":{alias:ck,include:ck,style:function(fX){return {icon:!fX.checked?undefined:fX.selected?cR:dY};
}},"menubar":{style:function(eN){return {decorator:cw};
}},"menubar-button":{alias:dL,style:function(gV){return {decorator:gV.pressed||gV.hovered?dR:undefined,textColor:gV.pressed||gV.hovered?dF:undefined,padding:[3,8]};
}},"colorselector":dK,"colorselector/control-bar":dK,"colorselector/control-pane":dK,"colorselector/visual-pane":cp,"colorselector/preset-grid":dK,"colorselector/colorbucket":{style:function(ho){return {decorator:dJ,width:16,height:16};
}},"colorselector/preset-field-set":cp,"colorselector/input-field-set":cp,"colorselector/preview-field-set":cp,"colorselector/hex-field-composite":dK,"colorselector/hex-field":dm,"colorselector/rgb-spinner-composite":dK,"colorselector/rgb-spinner-red":dT,"colorselector/rgb-spinner-green":dT,"colorselector/rgb-spinner-blue":dT,"colorselector/hsb-spinner-composite":dK,"colorselector/hsb-spinner-hue":dT,"colorselector/hsb-spinner-saturation":dT,"colorselector/hsb-spinner-brightness":dT,"colorselector/preview-content-old":{style:function(gb){return {decorator:dJ,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(fx){return {decorator:dJ,backgroundColor:dE,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(fY){return {decorator:dJ,margin:5};
}},"colorselector/brightness-field":{style:function(fu){return {decorator:dJ,margin:[5,7]};
}},"colorselector/hue-saturation-pane":dK,"colorselector/hue-saturation-handle":dK,"colorselector/brightness-pane":dK,"colorselector/brightness-handle":dK,"colorpopup":{alias:dS,include:dS,style:function(gC){return {padding:5,backgroundColor:ds};
}},"colorpopup/field":{style:function(gS){return {decorator:dJ,margin:2,width:14,height:14,backgroundColor:dE};
}},"colorpopup/selector-button":dI,"colorpopup/auto-button":dI,"colorpopup/preview-pane":cp,"colorpopup/current-preview":{style:function(ev){return {height:20,padding:4,marginLeft:4,decorator:dJ,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(fm){return {height:20,padding:4,marginRight:4,decorator:dJ,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:dI,include:dI,style:function(gs){return {icon:J};
}},"colorpopup/colorselector-cancelbutton":{alias:dI,include:dI,style:function(gh){return {icon:cv};
}},"table":{alias:dK,style:function(fL){return {decorator:bs};
}},"table-header":{},"table/statusbar":{style:function(eD){return {decorator:bX,padding:[0,2]};
}},"table/column-button":{alias:dM,style:function(hc){return {decorator:bh,padding:3,icon:cr};
}},"table-column-reset-button":{include:ck,alias:ck,style:function(){return {icon:P};
}},"table-scroller":dK,"table-scroller/scrollbar-x":dV,"table-scroller/scrollbar-y":dV,"table-scroller/header":{style:function(h){return {decorator:bO};
}},"table-scroller/pane":{style:function(fJ){return {backgroundColor:bR};
}},"table-scroller/focus-indicator":{style:function(eO){return {decorator:bG};
}},"table-scroller/resize-line":{style:function(fA){return {backgroundColor:dx,width:2};
}},"table-header-cell":{alias:dL,style:function(fj){return {minWidth:13,minHeight:20,padding:fj.hovered?[3,4,2,4]:[3,4],decorator:fj.hovered?O:bC,sortIcon:fj.sorted?(fj.sortedAscending?M:s):undefined};
}},"table-header-cell/label":{style:function(hy){return {minWidth:0,alignY:dG,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(fy){return {alignY:dG,alignX:z};
}},"table-header-cell/icon":{style:function(gO){return {minWidth:0,alignY:dG,paddingRight:5};
}},"table-editor-textfield":{include:dm,style:function(gc){return {decorator:undefined,padding:[2,2],backgroundColor:dE};
}},"table-editor-selectbox":{include:bz,alias:bz,style:function(fC){return {padding:[0,2],backgroundColor:dE};
}},"table-editor-combobox":{include:di,alias:di,style:function(hD){return {decorator:undefined,backgroundColor:dE};
}},"progressive-table-header":{alias:dK,style:function(gY){return {decorator:dX};
}},"progressive-table-header-cell":{alias:dL,style:function(fp){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:cJ};
}},"app-header":{style:function(hl){return {font:dH,textColor:dF,padding:[8,12],decorator:bE};
}},"virtual-list":dQ,"virtual-list/row-layer":bF,"row-layer":{style:function(j){return {colorEven:ek,colorOdd:I};
}},"column-layer":dK,"cell":{style:function(fG){return {textColor:fG.selected?dF:C,padding:[3,6],font:bv};
}},"cell-string":co,"cell-number":{include:co,style:function(fF){return {textAlign:z};
}},"cell-image":co,"cell-boolean":{include:co,style:function(gr){return {iconTrue:bJ,iconFalse:l};
}},"cell-atom":co,"cell-date":co,"cell-html":co}});
})();
(function(){var a="passwd.theme.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,appearances:{}});
})();
(function(){var a="passwd.theme.Theme";
qx.Theme.define(a,{meta:{color:passwd.theme.Color,decoration:passwd.theme.Decoration,font:passwd.theme.Font,icon:qx.theme.icon.Tango,appearance:passwd.theme.Appearance}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()==a)?g:f,{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?f:g,{"native":Array.prototype.indexOf,"emulated":function(n,o){if(o==null){o=0;
}else if(o<0){o=Math.max(0,this.length+o);
}
for(var i=o;i<this.length;i++){if(this[i]===n){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?f:g,{"native":Array.prototype.lastIndexOf,"emulated":function(w,x){if(x==null){x=this.length-1;
}else if(x<0){x=Math.max(0,this.length+x);
}
for(var i=x;i>=0;i--){if(this[i]===w){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?f:g,{"native":Array.prototype.forEach,"emulated":function(y,z){var l=this.length;

for(var i=0;i<l;i++){var A=this[i];

if(A!==undefined){y.call(z||window,A,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?f:g,{"native":Array.prototype.filter,"emulated":function(s,t){var u=[];
var l=this.length;

for(var i=0;i<l;i++){var v=this[i];

if(v!==undefined){if(s.call(t||window,v,i,this)){u.push(this[i]);
}}}return u;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?f:g,{"native":Array.prototype.map,"emulated":function(h,j){var k=[];
var l=this.length;

for(var i=0;i<l;i++){var m=this[i];

if(m!==undefined){k[i]=h.call(j||window,m,i,this);
}}return k;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?f:g,{"native":Array.prototype.some,"emulated":function(p,q){var l=this.length;

for(var i=0;i<l;i++){var r=this[i];

if(r!==undefined){if(p.call(q||window,r,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?f:g,{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;

for(var i=0;i<l;i++){var D=this[i];

if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;
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
(function(){var L=":",K="qx.client",J="anonymous",I="...",H="qx.dev.StackTrace",G="",F="\n",E="/source/class/",D=".";
qx.Class.define(H,{statics:{getStackTrace:qx.core.Variant.select(K,{"gecko":function(){try{throw new Error();
}catch(a){var j=this.getStackTraceFromError(a);
qx.lang.Array.removeAt(j,0);
var g=this.getStackTraceFromCaller(arguments);
var e=g.length>j.length?g:j;

for(var i=0;i<Math.min(g.length,j.length);i++){var f=g[i];

if(f.indexOf(J)>=0){continue;
}var n=f.split(L);

if(n.length!=2){continue;
}var l=n[0];
var d=n[1];
var c=j[i];
var o=c.split(L);
var k=o[0];
var b=o[1];

if(qx.Class.getByName(k)){var h=k;
}else{h=l;
}var m=h+L;

if(d){m+=d+L;
}m+=b;
e[i]=m;
}return e;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var S;

try{S.bar();
}catch(M){var T=this.getStackTraceFromError(M);
qx.lang.Array.removeAt(T,0);
return T;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(K,{"opera":function(bc){return [];
},"default":function(p){var u=[];
var t=qx.lang.Function.getCaller(p);
var q={};

while(t){var r=qx.lang.Function.getName(t);
u.push(r);

try{t=t.caller;
}catch(C){break;
}
if(!t){break;
}var s=qx.core.ObjectRegistry.toHashCode(t);

if(q[s]){u.push(I);
break;
}q[s]=t;
}return u;
}}),getStackTraceFromError:qx.core.Variant.select(K,{"gecko":function(U){if(!U.stack){return [];
}var bb=/@(.+):(\d+)$/gm;
var V;
var W=[];

while((V=bb.exec(U.stack))!=null){var X=V[1];
var ba=V[2];
var Y=this.__bP(X);
W.push(Y+L+ba);
}return W;
},"webkit":function(N){if(N.sourceURL&&N.line){return [this.__bP(N.sourceURL)+L+N.line];
}else{return [];
}},"opera":function(v){if(v.message.indexOf("Backtrace:")<0){return [];
}var x=[];
var y=qx.lang.String.trim(v.message.split("Backtrace:")[1]);
var z=y.split(F);

for(var i=0;i<z.length;i++){var w=z[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(w&&w.length>=2){var B=w[1];
var A=this.__bP(w[2]);
x.push(A+L+B);
}}return x;
},"default":function(){return [];
}}),__bP:function(O){var R=E;
var P=O.indexOf(R);
var Q=(P==-1)?O:O.substring(P+R.length).replace(/\//g,D).replace(/\.js$/,G);
return Q;
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(g){},setItem:function(i,j){},splice:function(d,e,f){},contains:function(h){},getLength:function(){},toArray:function(){}}});
})();
(function(){var c="qx.globalErrorHandling",b="on",a="qx.event.GlobalError";
qx.Bootstrap.define(a,{statics:{setErrorHandler:function(k,l){this.__bQ=k||null;
this.__bR=l||window;

if(qx.core.Setting.get(c)===b){if(k&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__bS,this);
}
if(!k&&window.onerror){window.onerror=null;
}}},__bS:function(d,e,f){if(this.__bQ){this.handleError(new qx.core.WindowError(d,e,f));
return true;
}},observeMethod:function(j){if(qx.core.Setting.get(c)===b){var self=this;
return function(){if(!self.__bQ){return j.apply(this,arguments);
}
try{return j.apply(this,arguments);
}catch(g){self.handleError(g);
}};
}else{return j;
}},handleError:function(i){if(this.__bQ){this.__bQ.call(this.__bR,i);
}}},defer:function(h){qx.core.Setting.define(c,b);
h.setErrorHandler(null,null);
}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Class.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__bT=c;
this.__bU=d||b;
this.__bV=e===undefined?-1:e;
},members:{__bT:null,__bU:null,__bV:null,toString:function(){return this.__bT;
},getUri:function(){return this.__bU;
},getLineNumber:function(){return this.__bV;
}}});
})();
(function(){var a="qx.lang.Date";
qx.Bootstrap.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(h,i){},registerEvent:function(b,c,d){},unregisterEvent:function(e,f,g){}}});
})();
(function(){var t="load",s="unload",r="qx.client",q="ready",p="mshtml",o="qx.event.handler.Application",n="complete",m="gecko|opera|webkit",l="left",k="_window",i="DOMContentLoaded",j="shutdown";
qx.Class.define(o,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){arguments.callee.base.call(this);
this._window=u.getWindow();
this.__bW=false;
this.__bX=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__bY:false,onScriptLoaded:function(){this.__bY=true;
var x=qx.event.handler.Application.$$instance;

if(x){x.__cc();
}}},members:{canHandleEvent:function(g,h){},registerEvent:function(a,b,c){},unregisterEvent:function(d,e,f){},__ca:null,__bW:null,__bX:null,__cb:null,__cc:function(){var v=qx.event.handler.Application;
if(!this.__ca&&this.__bW&&v.__bY){this.__ca=true;
qx.event.Registration.fireEvent(this._window,q);
}},isApplicationReady:function(){return this.__ca;
},_initObserver:function(){if(qx.$$domReady||document.readyState==n){this.__bW=true;
this.__cc();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(r,m)){qx.bom.Event.addNativeListener(this._window,i,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(r,p)){var y=function(){try{document.documentElement.doScroll(l);
this._onNativeLoadWrapped();
}catch(w){window.setTimeout(y,100);
}};
y();
}qx.bom.Event.addNativeListener(this._window,t,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,s,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,t,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,s,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__bW=true;
this.__cc();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cb){this.__cb=true;

try{qx.event.Registration.fireEvent(this._window,j);
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._disposeFields(k);
},defer:function(z){qx.event.Registration.addHandler(z);
}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(g){arguments.callee.base.call(this);
this.__cd={};

if(g!==undefined){this.setSize(g);
}},properties:{size:{check:a,init:null,nullable:true}},members:{__cd:null,getObject:function(h){if(this.$$disposed){return;
}
if(!h){throw new Error("Class needs to be defined!");
}var j=null;
var k=this.__cd[h.classname];

if(k){j=k.pop();
}
if(j){j.$$pooled=false;
}else{j=new h;
}return j;
},poolObject:function(c){if(!this.__cd){return;
}var d=c.classname;
var e=this.__cd[d];

if(c.$$pooled){throw new Error("Object is already pooled: "+c);
}
if(!e){this.__cd[d]=e=[];
}var f=this.getSize()||Infinity;

if(e.length>f){this.warn("Cannot pool "+c+" because the pool is already full.");
c.dispose();
return;
}c.$$pooled=true;
e.push(c);
}},destruct:function(){var o=this.__cd;
var m,n,i,l;

for(m in o){n=o[m];

for(i=0,l=n.length;i<l;i++){n[i].dispose();
}}delete this.__cd;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){arguments.callee.base.call(this,30);
}});
})();
(function(){var e="_originalTarget",d="_relatedTarget",c="qx.event.type.Event",b="_target",a="_currentTarget";
qx.Class.define(c,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(l,m){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!l;
this._cancelable=!!m;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(h){if(h){var i=h;
}else{var i=qx.event.Pool.getInstance().getObject(this.constructor);
}i._type=this._type;
i._target=this._target;
i._currentTarget=this._currentTarget;
i._relatedTarget=this._relatedTarget;
i._originalTarget=this._originalTarget;
i._stopPropagation=this._stopPropagation;
i._bubbles=this._bubbles;
i._preventDefault=this._preventDefault;
i._cancelable=this._cancelable;
return i;
},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(j){this._type=j;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(n){this._eventPhase=n;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(f){this._target=f;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(o){this._currentTarget=o;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(p){this._relatedTarget=p;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(q){this._originalTarget=q;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(g){this._bubbles=g;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(k){this._cancelable=k;
}},destruct:function(){this._disposeFields(b,a,d,e);
}});
})();
(function(){var e="__cf",d="Better use 'getData'",c="__ce",b="Better use 'getOldData'",a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__ce:null,__cf:null,init:function(h,i,j){arguments.callee.base.call(this,false,j);
this.__ce=h;
this.__cf=i;
return this;
},clone:function(f){var g=arguments.callee.base.call(this,f);
g.__ce=this.__ce;
g.__cf=this.__cf;
return g;
},getData:function(){return this.__ce;
},getOldData:function(){return this.__cf;
},getValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,d);
return this.__ce;
},getOldValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,b);
return this.__cf;
}},destruct:function(){this._disposeFields(c,e);
}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(g){this._manager=g;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(h,event,j){return !event.getBubbles();
},dispatchEvent:function(c,event,d){event.setEventPhase(qx.event.type.Event.AT_TARGET);
var e=this._manager.getListeners(c,d,false);

if(e){for(var i=0,l=e.length;i<l;i++){var f=e[i].context||c;
e[i].handler.call(f,event);
}}}},defer:function(b){qx.event.Registration.addDispatcher(b);
}});
})();
(function(){var bF="get",bE="",bD="[",bC="]",bB="last",bA="change",bz=".",by="Number",bx="String",bw="set",bU="deepBinding",bT="item",bS="reset",bR="' (",bQ="Boolean",bP=").",bO=") to the object '",bN="Integer",bM="qx.data.SingleValueBinding",bL="No event could be found for the property",bJ="PositiveNumber",bK="Binding from '",bH="PositiveInteger",bI="Binding does not exist!",bG="Date";
qx.Class.define(bM,{statics:{DEBUG_ON:false,__cg:{},bind:function(V,W,X,Y,ba){var bf=W.split(bz);
var bc=this.__cn(bf);
var bi=[];
var bj=[];
var bg=[];
var bd=[];
var be=V;
for(var i=0;i<bf.length;i++){if(bc[i]!==bE){bd.push(bA);
}else{bd.push(this.__ci(be,bf[i]));
}bi[i]=be;
if(i==bf.length-1){if(bc[i]!==bE){var bm=bc[i]===bB?be.length-1:bc[i];
var bb=be.getItem(bm);
this.__cm(bb,X,Y,ba,V);
bg[i]=this.__co(be,bd[i],X,Y,ba,bc[i]);
}else{if(bf[i]!=null&&be[bF+qx.lang.String.firstUp(bf[i])]!=null){var bb=be[bF+qx.lang.String.firstUp(bf[i])]();
this.__cm(bb,X,Y,ba,V);
}bg[i]=this.__co(be,bd[i],X,Y,ba);
}}else{var bk={index:i,propertyNames:bf,sources:bi,listenerIds:bg,arrayIndexValues:bc,targetObject:X,targetProperty:Y,options:ba,listeners:bj};
var bh=qx.lang.Function.bind(this.__ch,this,bk);
bj.push(bh);
bg[i]=be.addListener(bd[i],bh);
}if(be[bF+qx.lang.String.firstUp(bf[i])]==null){be=null;
}else if(bc[i]!==bE){be=be[bF+qx.lang.String.firstUp(bf[i])](bc[i]);
}else{be=be[bF+qx.lang.String.firstUp(bf[i])]();
}
if(!be){break;
}}var bl={type:bU,listenerIds:bg,sources:bi};
this.__cp(bl,V,W,X,Y);
return bl;
},__ch:function(bq){if(bq.options&&bq.options.onUpdate){bq.options.onUpdate(bq.sources[bq.index],bq.targetObject);
}for(var j=bq.index+1;j<bq.propertyNames.length;j++){var bu=bq.sources[j];
bq.sources[j]=null;

if(!bu){continue;
}bu.removeListenerById(bq.listenerIds[j]);
}var bu=bq.sources[bq.index];
for(var j=bq.index+1;j<bq.propertyNames.length;j++){if(bq.arrayIndexValues[j-1]!==bE){bu=bu[bF+qx.lang.String.firstUp(bq.propertyNames[j-1])](bq.arrayIndexValues[j-1]);
}else{bu=bu[bF+qx.lang.String.firstUp(bq.propertyNames[j-1])]();
}bq.sources[j]=bu;
if(!bu){this.__cj(bq.targetObject,bq.targetProperty);
break;
}if(j==bq.propertyNames.length-1){if(qx.Class.implementsInterface(bu,qx.data.IListData)){var bv=bq.arrayIndexValues[j]===bB?bu.length-1:bq.arrayIndexValues[j];
var bs=bu.getItem(bv);
this.__cm(bs,bq.targetObject,bq.targetProperty,bq.options,bq.sources[bq.index]);
bq.listenerIds[j]=this.__co(bu,bA,bq.targetObject,bq.targetProperty,bq.options,bq.arrayIndexValues[j]);
}else{if(bq.propertyNames[j]!=null&&bu[bF+qx.lang.String.firstUp(bq.propertyNames[j])]!=null){var bs=bu[bF+qx.lang.String.firstUp(bq.propertyNames[j])]();
this.__cm(bs,bq.targetObject,bq.targetProperty,bq.options,bq.sources[bq.index]);
}var bt=this.__ci(bu,bq.propertyNames[j]);
bq.listenerIds[j]=this.__co(bu,bt,bq.targetObject,bq.targetProperty,bq.options);
}}else{if(bq.listeners[j]==null){var br=qx.lang.Function.bind(this.__ch,this,bq);
bq.listeners.push(br);
}if(qx.Class.implementsInterface(bu,qx.data.IListData)){var bt=bA;
}else{var bt=this.__ci(bu,bq.propertyNames[j]);
}bq.listenerIds[j]=bu.addListener(bt,bq.listeners[j]);
}}},__ci:function(cb,cc){var cd=this.__cr(cb,cc);
if(cd==null){if(qx.Class.supportsEvent(cb.constructor,cc)){cd=cc;
}else if(qx.Class.supportsEvent(cb.constructor,bA+qx.lang.String.firstUp(cc))){cd=bA+qx.lang.String.firstUp(cc);
}else{throw new qx.core.AssertionError(bL,cc);
}}return cd;
},__cj:function(ch,ci){var cj=this.__cl(ch,ci);

if(cj!=null){var ck=ci.substring(ci.lastIndexOf(bz)+1,ci.length);
if(ck.charAt(ck.length-1)==bC){this.__ck(ch,ci,null);
return;
}if(cj[bS+qx.lang.String.firstUp(ck)]!=undefined){cj[bS+qx.lang.String.firstUp(ck)]();
}else{cj[bw+qx.lang.String.firstUp(ck)](null);
}}},__ck:function(L,M,N){var R=this.__cl(L,M);

if(R!=null){var S=M.substring(M.lastIndexOf(bz)+1,M.length);
if(S.charAt(S.length-1)==bC){var O=S.substring(S.lastIndexOf(bD)+1,S.length-1);
var Q=S.substring(0,S.lastIndexOf(bD));
var P=R[bF+qx.lang.String.firstUp(Q)]();

if(O==bB){O=P.length-1;
}
if(P!=null){P.setItem(O,N);
}}else{R[bw+qx.lang.String.firstUp(S)](N);
}}},__cl:function(d,f){var k=f.split(bz);
var l=d;
for(var i=0;i<k.length-1;i++){try{var h=k[i];
if(h.indexOf(bC)==h.length-1){var g=h.substring(h.indexOf(bD)+1,h.length-1);
h=h.substring(0,h.indexOf(bD));
}l=l[bF+qx.lang.String.firstUp(h)]();

if(g!=null){if(g==bB){g=l.length-1;
}l=l.getItem(g);
g=null;
}}catch(m){return null;
}}return l;
},__cm:function(bV,bW,bX,bY,ca){bV=this.__cq(bV,bW,bX,bY);
if(bV==null){this.__cj(bW,bX);
}if(bV!=undefined){try{this.__ck(bW,bX,bV);
if(bY&&bY.onUpdate){bY.onUpdate(ca,bW,bV);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(bY&&bY.onSetFail){bY.onSetFail(e);
}else{this.warn("Failed so set value "+bV+" on "+bW+". Error message: "+e);
}}}},__cn:function(ce){var cf=[];
for(var i=0;i<ce.length;i++){var name=ce[i];
if(qx.lang.String.endsWith(name,bC)){var cg=name.substring(name.indexOf(bD)+1,name.indexOf(bC));
if(name.indexOf(bC)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cg!==bB){if(cg==bE||isNaN(parseInt(cg))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(bD)!=0){ce[i]=name.substring(0,name.indexOf(bD));
cf[i]=bE;
cf[i+1]=cg;
ce.splice(i+1,0,bT);
i++;
}else{cf[i]=cg;
ce.splice(i,1,bT);
}}else{cf[i]=bE;
}}return cf;
},__co:function(A,B,C,D,E,F){var G;
{};
var I=function(w,e){if(w!==bE){if(w===bB){w=A.length-1;
}var z=A.getItem(w);
if(z==undefined){qx.data.SingleValueBinding.__cj(C,D);
}var x=e.getData().start;
var y=e.getData().end;

if(w<x||w>y){return;
}}else{var z=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+A+" by "+B+" to "+C+" ("+D+")");
qx.log.Logger.debug("Data before conversion: "+z);
}z=qx.data.SingleValueBinding.__cq(z,C,D,E);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+z);
}try{if(z!=undefined){qx.data.SingleValueBinding.__ck(C,D,z);
}else{qx.data.SingleValueBinding.__cj(C,D);
}if(E&&E.onUpdate){E.onUpdate(A,C,z);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(E&&E.onSetFail){E.onSetFail(e);
}else{this.warn("Failed so set value "+z+" on "+C+". Error message: "+e);
}}};
if(!F){F=bE;
}I=qx.lang.Function.bind(I,A,F);
var H=A.addListener(B,I);
return H;
},__cp:function(n,o,p,q,r){if(this.__cg[o.toHashCode()]===undefined){this.__cg[o.toHashCode()]=[];
}this.__cg[o.toHashCode()].push([n,o,p,q,r]);
},__cq:function(cl,cm,cn,co){if(co&&co.converter){var cq;

if(cm.getModel){cq=cm.getModel();
}return co.converter(cl,cq);
}else{var cs=this.__cl(cm,cn);
var ct=cn.substring(cn.lastIndexOf(bz)+1,cn.length);
if(cs==null){return cl;
}var cr=qx.Class.getPropertyDefinition(cs.constructor,ct);
var cp=cr==null?bE:cr.check;
return this.__cs(cl,cp);
}},__cr:function(cu,cv){var cw=qx.Class.getPropertyDefinition(cu.constructor,cv);

if(cw==null){return null;
}return cw.event;
},__cs:function(bn,bo){var bp=qx.lang.Type.getClass(bn);
if((bp==by||bp==bx)&&(bo==bN||bo==bH)){bn=parseInt(bn);
}if((bp==bQ||bp==by||bp==bG)&&bo==bx){bn=bn+bE;
}if((bp==by||bp==bx)&&(bo==by||bo==bJ)){bn=parseFloat(bn);
}return bn;
},removeBindingFromObject:function(a,b){if(b.type==bU){for(var i=0;i<b.sources.length;i++){if(b.sources[i]){b.sources[i].removeListenerById(b.listenerIds[i]);
}}}else{a.removeListenerById(b);
}var c=this.__cg[a.toHashCode()];
if(c!=undefined){for(var i=0;i<c.length;i++){if(c[i][0]==b){qx.lang.Array.remove(c,c[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(T){{};
var U=this.__cg[T.toHashCode()];
for(var i=U.length-1;i>=0;i--){this.removeBindingFromObject(T,U[i][0]);
}},getAllBindingsForObject:function(cz){if(this.__cg[cz.toHashCode()]===undefined){this.__cg[cz.toHashCode()]=[];
}return this.__cg[cz.toHashCode()];
},removeAllBindings:function(){for(var K in this.__cg){var J=qx.core.ObjectRegistry.fromHashCode(K);
if(J==null){delete this.__cg[K];
continue;
}this.removeAllBindingsForObject(J);
}this.__cg={};
},getAllBindings:function(){return this.__cg;
},showBindingInLog:function(s,t){var v;
for(var i=0;i<this.__cg[s.toHashCode()].length;i++){if(this.__cg[s.toHashCode()][i][0]==t){v=this.__cg[s.toHashCode()][i];
break;
}}
if(v===undefined){var u=bI;
}else{var u=bK+v[1]+bR+v[2]+bO+v[3]+bR+v[4]+bP;
}qx.log.Logger.debug(u);
},showAllBindingsInLog:function(){for(var cy in this.__cg){var cx=qx.core.ObjectRegistry.fromHashCode(cy);

for(var i=0;i<this.__cg[cy].length;i++){this.showBindingInLog(cx,this.__cg[cy][i][0]);
}}}}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__ct=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__ct:null,message:null,getComment:function(){return this.__ct;
},toString:function(){return this.__ct+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cu=qx.dev.StackTrace.getStackTrace();
},members:{__cu:null,getStackTrace:function(){return this.__cu;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var j="qx.event.handler.Object";
qx.Class.define(j,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(h,i){return qx.Class.supportsEvent(h.constructor,i);
},registerEvent:function(e,f,g){},unregisterEvent:function(a,b,c){}},defer:function(d){qx.event.Registration.addHandler(d);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeFields:function(p,q){var name;

for(var i=0,l=q.length;i<l;i++){var name=q[i];

if(p[name]==null||!p.hasOwnProperty(name)){continue;
}p[name]=null;
}},disposeObjects:function(b,c){var name;

for(var i=0,l=c.length;i<l;i++){name=c[i];

if(b[name]==null||!b.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(b[name].dispose){b[name].dispose();
}else{throw new Error("Has no disposable object under key: "+name+"!");
}}b[name]=null;
}},disposeArray:function(j,k){var n=j[k];

if(!n){return;
}if(qx.core.ObjectRegistry.inShutDown){j[k]=null;
return;
}try{var m;

for(var i=n.length-1;i>=0;i--){m=n[i];

if(m){m.dispose();
}}}catch(o){throw new Error("The array field: "+k+" of object: "+j+" has non disposable entries: "+o);
}n.length=0;
j[k]=null;
},disposeMap:function(e,f){var g=e[f];

if(!g){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{for(var h in g){if(g.hasOwnProperty(h)){g[h].dispose();
}}}catch(d){throw new Error("The map field: "+f+" of object: "+e+" has non disposable entries: "+d);
}e[f]=null;
}}});
})();
(function(){var t="indexOf",r="lastIndexOf",q="slice",p="concat",o="join",n="toLocaleUpperCase",m="shift",k="substr",j="filter",h="unshift",P="match",O="quote",N="qx.lang.Generics",M="localeCompare",L="sort",K="some",J="charAt",I="split",H="substring",G="pop",A="toUpperCase",B="replace",y="push",z="charCodeAt",w="every",x="reverse",u="search",v="forEach",C="map",D="toLowerCase",F="splice",E="toLocaleLowerCase";
qx.Bootstrap.define(N,{statics:{__cv:{"Array":[o,x,L,y,G,m,h,F,p,q,t,r,v,C,j,K,w],"String":[O,H,D,A,J,z,t,r,E,n,M,P,u,B,I,k,p,q]},__cw:function(f,g){return function(s){return f.prototype[g].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cx:function(){var a=qx.lang.Generics.__cv;

for(var e in a){var c=window[e];
var b=a[e];

for(var i=0,l=b.length;i<l;i++){var d=b[i];

if(!c[d]){c[d]=qx.lang.Generics.__cw(c,d);
}}}}},defer:function(Q){Q.__cx();
}});
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
(function(){var l="decoration",k="object",j="_applyTheme",i="__cy",h="qx.theme.manager.Decoration",g="Theme",f="string",e="singleton";
qx.Class.define(h,{type:e,extend:qx.core.Object,properties:{theme:{check:g,nullable:true,apply:j}},members:{__cy:null,resolve:function(q){if(!q){return null;
}
if(typeof q===k){return q;
}var t=this.getTheme();

if(!t){return null;
}var t=this.getTheme();

if(!t){return null;
}var u=this.__cy;

if(!u){u=this.__cy={};
}var r=u[q];

if(r){return r;
}var s=t.decorations[q];

if(!s){return null;
}var v=s.decorator;

if(v==null){throw new Error("Missing definition of which decorator to use in entry: "+q+"!");
}return u[q]=(new v).set(s.style);
},isValidPropertyValue:function(m){if(typeof m===f){return this.isDynamic(m);
}else if(typeof m===k){var n=m.constructor;
return qx.Class.hasInterface(n,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(o){if(!o){return false;
}var p=this.getTheme();

if(!p){return false;
}return !!p.decorations[o];
},_applyTheme:function(a,b){var d=qx.util.AliasManager.getInstance();
if(a){d.add(l,a.resource);
}else{d.remove(l);
}
if(b){for(var c in b.aliases){d.remove(c);
}}
if(a){for(var c in a.aliases){d.add(c,a.aliases[c]);
}}
if(!a){this.__cy={};
}}},destruct:function(){this._disposeMap(i);
}});
})();
(function(){var c="_dynamic",b="qx.util.ValueManager",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(g){return this._dynamic[g];
},isDynamic:function(f){return !!this._dynamic[f];
},resolve:function(d){if(d&&this._dynamic[d]){return this._dynamic[d];
}return d;
},_setDynamic:function(e){this._dynamic=e;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._disposeFields(c);
}});
})();
(function(){var k="/",j="0",i="qx/static",h="http://",g="https://",f="file://",e="qx.util.AliasManager",d="__cz",c="singleton",b=".",a="static";
qx.Class.define(e,{type:c,extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__cz={};
this.add(a,i);
},members:{__cz:null,_preprocess:function(l){var o=this._getDynamic();

if(o[l]===false){return l;
}else if(o[l]===undefined){if(l.charAt(0)===k||l.charAt(0)===b||l.indexOf(h)===0||l.indexOf(g)===j||l.indexOf(f)===0){o[l]=false;
return l;
}
if(this.__cz[l]){return this.__cz[l];
}var n=l.substring(0,l.indexOf(k));
var m=this.__cz[n];

if(m!==undefined){o[l]=m+l.substring(n.length);
}}return l;
},add:function(s,t){this.__cz[s]=t;
var v=this._getDynamic();
for(var u in v){if(u.substring(0,u.indexOf(k))===s){v[u]=t+u.substring(s.length);
}}},remove:function(p){delete this.__cz[p];
},resolve:function(q){var r=this._getDynamic();

if(q!==null){q=this._preprocess(q);
}return r[q]||q;
}},destruct:function(){this._disposeFields(d);
}});
})();
(function(){var a="qx.bom.client.Feature";
qx.Bootstrap.define(a,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:false,VML:false,XPATH:false,AIR:false,GEARS:false,SSL:false,__cA:function(){this.STANDARD_MODE=document.compatMode==="CSS1Compat";
this.QUIRKS_MODE=!this.STANDARD_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.CANVAS=!!window.CanvasRenderingContext2D;
this.VML=qx.bom.client.Engine.MSHTML;
this.AIR=navigator.userAgent.indexOf("adobeair")!==-1;
this.GEARS=!!(window.google&&window.google.gears);
this.XPATH=!!document.evaluate;
this.SSL=window.location.protocol==="https:";
}},defer:function(b){b.__cA();
}});
})();
(function(){var p="/",o="mshtml",n="qx.client",m="string",l="",k="?",j="Use 'getInstance().isClippedImage' instead!",i="Use 'getInstance().getImageWidth' instead!",h="Use 'getInstance().has' instead!",g="Use 'getInstance().getImageFormat' instead!",c="Use 'getInstance().getData' instead!",f="Use 'getInstance().getImageHeight' instead!",e="Use 'getInstance().toUri' instead!",b="qx.util.ResourceManager",a="singleton",d="qx.isSource";
qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__cB:qx.$$resources||{},__cC:{},has:function(B){qx.log.Logger.deprecatedMethodWarning(arguments.callee,h);
return this.getInstance().has(B);
},getData:function(D){qx.log.Logger.deprecatedMethodWarning(arguments.callee,c);
return this.getInstance().getData(D);
},getImageWidth:function(G){qx.log.Logger.deprecatedMethodWarning(arguments.callee,i);
return this.getInstance().getImageWidth(G);
},getImageHeight:function(q){qx.log.Logger.deprecatedMethodWarning(arguments.callee,f);
return this.getInstance().getImageHeight(q);
},getImageFormat:function(I){qx.log.Logger.deprecatedMethodWarning(arguments.callee,g);
return this.getInstance().getImageFormat(I);
},isClippedImage:function(H){qx.log.Logger.deprecatedMethodWarning(arguments.callee,j);
return this.getInstance().isClippedImage(H);
},toUri:function(r){qx.log.Logger.deprecatedMethodWarning(arguments.callee,e);
return this.getInstance().toUri(r);
}},members:{has:function(A){return !!arguments.callee.self.__cB[A];
},getData:function(C){return arguments.callee.self.__cB[C]||null;
},getImageWidth:function(s){var t=arguments.callee.self.__cB[s];
return t?t[0]:null;
},getImageHeight:function(P){var Q=arguments.callee.self.__cB[P];
return Q?Q[1]:null;
},getImageFormat:function(E){var F=arguments.callee.self.__cB[E];
return F?F[2]:null;
},isClippedImage:function(J){var K=arguments.callee.self.__cB[J];
return K&&K.length>4;
},toUri:function(L){if(L==null){return L;
}var M=arguments.callee.self.__cB[L];

if(!M){return L;
}
if(typeof M===m){var O=M;
}else{var O=M[3];
if(!O){return L;
}}var N=l;

if(qx.core.Variant.isSet(n,o)&&qx.bom.client.Feature.SSL){N=arguments.callee.self.__cC[O];
}return N+qx.$$libraries[O].resourceUri+p+L;
}},defer:function(u){if(qx.core.Variant.isSet(n,o)){if(qx.bom.client.Feature.SSL){for(var y in qx.$$libraries){var w=qx.$$libraries[y].resourceUri;
if(w.match(/^\/\//)!=null){u.__cC[y]=window.location.protocol;
}else if(w.match(/^\.\//)!=null&&qx.core.Setting.get(d)){var v=document.URL;
u.__cC[y]=v.substring(0,v.lastIndexOf(p));
}else if(w.match(/^http/)!=null){}else{var z=window.location.href.indexOf(k);
var x;

if(z==-1){x=window.location.href;
}else{x=window.location.href.substring(0,z);
}u.__cC[y]=x.substring(0,x.lastIndexOf(p)+1);
}}}}}});
})();
(function(){var s="number",r="0",q="px",p=";",o="background-image:url(",n=");",m="",l=")",k="background-repeat:",j=" ",g="qx.bom.element.Background",i="url(",h="background-position:";
qx.Class.define(g,{statics:{__cD:[o,null,n,h,null,p,k,null,p],__cE:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__cF:function(F,top){var G=qx.bom.client.Engine;

if(G.GECKO&&G.VERSION<1.9&&F==top&&typeof F==s){top+=0.01;
}
if(F){var H=(typeof F==s)?F+q:F;
}else{H=r;
}
if(top){var I=(typeof top==s)?top+q:top;
}else{I=r;
}return H+j+I;
},compile:function(z,A,B,top){var C=this.__cF(B,top);
var D=qx.util.ResourceManager.getInstance().toUri(z);
var E=this.__cD;
E[1]=D;
E[4]=C;
E[7]=A;
return E.join(m);
},getStyles:function(a,b,c,top){if(!a){return this.__cE;
}var d=this.__cF(c,top);
var e=qx.util.ResourceManager.getInstance().toUri(a);
var f={backgroundPosition:d,backgroundImage:i+e+l};

if(b!=null){f.backgroundRepeat=b;
}return f;
},set:function(t,u,v,w,top){var x=this.getStyles(u,v,w,top);

for(var y in x){t.style[y]=x[y];
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
(function(){var M=",",L="rgb(",K=")",J="qx.theme.manager.Color",I="qx.util.ColorUtil";
qx.Class.define(I,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42],grey:[128,128,128]},isNamedColor:function(Q){return this.NAMED[Q]!==undefined;
},isSystemColor:function(P){return this.SYSTEM[P]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(J);
},isThemedColor:function(a){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(a);
},stringToRgb:function(s){if(this.supportsThemes()&&this.isThemedColor(s)){var s=qx.theme.manager.Color.getInstance().resolveDynamic(s);
}
if(this.isNamedColor(s)){return this.NAMED[s];
}else if(this.isSystemColor(s)){throw new Error("Could not convert system colors to RGB: "+s);
}else if(this.isRgbString(s)){return this.__cG();
}else if(this.isHex3String(s)){return this.__cI();
}else if(this.isHex6String(s)){return this.__cJ();
}throw new Error("Could not parse color: "+s);
},cssStringToRgb:function(S){if(this.isNamedColor(S)){return this.NAMED[S];
}else if(this.isSystemColor(S)){throw new Error("Could not convert system colors to RGB: "+S);
}else if(this.isRgbString(S)){return this.__cG();
}else if(this.isRgbaString(S)){return this.__cH();
}else if(this.isHex3String(S)){return this.__cI();
}else if(this.isHex6String(S)){return this.__cJ();
}throw new Error("Could not parse color: "+S);
},stringToRgbString:function(N){return this.rgbToRgbString(this.stringToRgb(N));
},rgbToRgbString:function(T){return L+T[0]+M+T[1]+M+T[2]+K;
},rgbToHexString:function(O){return (qx.lang.String.pad(O[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(O[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(O[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(B){return this.isThemedColor(B)||this.isNamedColor(B)||this.isHex3String(B)||this.isHex6String(B)||this.isRgbString(B);
},isCssString:function(o){return this.isSystemColor(o)||this.isNamedColor(o)||this.isHex3String(o)||this.isHex6String(o)||this.isRgbString(o);
},isHex3String:function(H){return this.REGEXP.hex3.test(H);
},isHex6String:function(u){return this.REGEXP.hex6.test(u);
},isRgbString:function(D){return this.REGEXP.rgb.test(D);
},isRgbaString:function(U){return this.REGEXP.rgba.test(U);
},__cG:function(){var k=parseInt(RegExp.$1,10);
var j=parseInt(RegExp.$2,10);
var h=parseInt(RegExp.$3,10);
return [k,j,h];
},__cH:function(){var e=parseInt(RegExp.$1,10);
var d=parseInt(RegExp.$2,10);
var c=parseInt(RegExp.$3,10);
return [e,d,c];
},__cI:function(){var G=parseInt(RegExp.$1,16)*17;
var F=parseInt(RegExp.$2,16)*17;
var E=parseInt(RegExp.$3,16)*17;
return [G,F,E];
},__cJ:function(){var n=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var m=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var l=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [n,m,l];
},hex3StringToRgb:function(C){if(this.isHex3String(C)){return this.__cI(C);
}throw new Error("Invalid hex3 value: "+C);
},hex6StringToRgb:function(V){if(this.isHex6String(V)){return this.__cJ(V);
}throw new Error("Invalid hex6 value: "+V);
},hexStringToRgb:function(R){if(this.isHex3String(R)){return this.__cI(R);
}
if(this.isHex6String(R)){return this.__cJ(R);
}throw new Error("Invalid hex value: "+R);
},rgbToHsb:function(W){var Y,ba,bc;
var bi=W[0];
var bf=W[1];
var X=W[2];
var bh=(bi>bf)?bi:bf;

if(X>bh){bh=X;
}var bb=(bi<bf)?bi:bf;

if(X<bb){bb=X;
}bc=bh/255.0;

if(bh!=0){ba=(bh-bb)/bh;
}else{ba=0;
}
if(ba==0){Y=0;
}else{var be=(bh-bi)/(bh-bb);
var bg=(bh-bf)/(bh-bb);
var bd=(bh-X)/(bh-bb);

if(bi==bh){Y=bd-bg;
}else if(bf==bh){Y=2.0+be-bd;
}else{Y=4.0+bg-be;
}Y=Y/6.0;

if(Y<0){Y=Y+1.0;
}}return [Math.round(Y*360),Math.round(ba*100),Math.round(bc*100)];
},hsbToRgb:function(v){var i,f,p,q,t;
var w=v[0]/360;
var x=v[1]/100;
var y=v[2]/100;

if(w>=1.0){w%=1.0;
}
if(x>1.0){x=1.0;
}
if(y>1.0){y=1.0;
}var z=Math.floor(255*y);
var A={};

if(x==0.0){A.red=A.green=A.blue=z;
}else{w*=6.0;
i=Math.floor(w);
f=w-i;
p=Math.floor(z*(1.0-x));
q=Math.floor(z*(1.0-(x*f)));
t=Math.floor(z*(1.0-(x*(1.0-f))));

switch(i){case 0:A.red=z;
A.green=t;
A.blue=p;
break;
case 1:A.red=q;
A.green=z;
A.blue=p;
break;
case 2:A.red=p;
A.green=z;
A.blue=t;
break;
case 3:A.red=p;
A.green=q;
A.blue=z;
break;
case 4:A.red=t;
A.green=p;
A.blue=z;
break;
case 5:A.red=z;
A.green=p;
A.blue=q;
break;
}}return A;
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var j="px",i="div",h="img",g="qx.client",f="",e="scale-x",d="mshtml",c="no-repeat",b="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",a="scale-y",A="repeat",z=".png",y="scale",x="webkit",w='<div style="',v="repeat-y",u='<img src="',t="qx.bom.element.Decoration",s="png",r="', sizingMethod='scale')",p="', sizingMethod='crop')",q='"/>',n='" style="',o="none",l="repeat-x",m='"></div>',k="absolute";
qx.Class.define(t,{statics:{DEBUG:false,__cK:qx.core.Variant.isSet(g,d)&&qx.bom.client.Engine.VERSION<9,__cL:qx.core.Variant.select(g,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__cM:{"scale-x":h,"scale-y":h,"scale":h,"repeat":i,"no-repeat":i,"repeat-x":i,"repeat-y":i},update:function(B,C,D,E){var G=this.getTagName(D,C);

if(G!=B.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var H=this.getAttributes(C,D,E);

if(G===h){B.src=H.src;
}if(B.style.backgroundPosition!=f&&H.style.backgroundPosition===undefined){H.style.backgroundPosition=null;
}if(B.style.clip!=f&&H.style.clip===undefined){H.style.clip=null;
}var F=qx.bom.element.Style;
F.setStyles(B,H.style);
},create:function(Y,ba,bb){var bc=this.getTagName(ba,Y);
var be=this.getAttributes(Y,ba,bb);
var bd=qx.bom.element.Style.compile(be.style);

if(bc===h){return u+be.src+n+bd+q;
}else{return w+bd+m;
}},getTagName:function(bf,bh){if(qx.core.Variant.isSet(g,d)){if(bh&&this.__cK&&this.__cL[bf]&&qx.lang.String.endsWith(bh,z)){return i;
}}return this.__cM[bf];
},getAttributes:function(I,J,K){var O=qx.util.ResourceManager.getInstance();
var T=qx.io2.ImageLoader;
var U=qx.bom.element.Background;

if(!K){K={};
}
if(!K.position){K.position=k;
}
if(qx.core.Variant.isSet(g,d)){K.fontSize=0;
K.lineHeight=0;
}else if(qx.core.Variant.isSet(g,x)){K.WebkitUserDrag=o;
}var S=O.getImageWidth(I)||T.getWidth(I);
var R=O.getImageHeight(I)||T.getHeight(I);
var P=O.getImageFormat(I)||T.getFormat(I);
{};
if(this.__cK&&this.__cL[J]&&P===s){if(K.width==null&&S!=null){K.width=S+j;
}
if(K.height==null&&R!=null){K.height=R+j;
}
if(J==c){K.filter=b+O.toUri(I)+p;
}else{K.filter=b+O.toUri(I)+r;
}K.backgroundImage=K.backgroundRepeat=f;
return {style:K};
}else{if(J===y){var Q=O.toUri(I);

if(K.width==null&&S!=null){K.width=S+j;
}
if(K.height==null&&R!=null){K.height=R+j;
}return {src:Q,style:K};
}var N=O.isClippedImage(I);

if(J===e||J===a){if(N){if(J===e){var W=O.getData(I);
var X=O.getImageHeight(W[4]);
var Q=O.toUri(W[4]);
K.clip={top:-W[6],height:R};
K.height=X+j;
if(K.top!=null){K.top=(parseInt(K.top,10)+W[6])+j;
}else if(K.bottom!=null){K.bottom=(parseInt(K.bottom,10)+R-X-W[6])+j;
}return {src:Q,style:K};
}else{var W=O.getData(I);
var V=O.getImageWidth(W[4]);
var Q=O.toUri(W[4]);
K.clip={left:-W[5],width:S};
K.width=V+j;
if(K.left!=null){K.left=(parseInt(K.left,10)+W[5])+j;
}else if(K.right!=null){K.right=(parseInt(K.right,10)+S-V-W[5])+j;
}return {src:Q,style:K};
}}else{{};

if(J==e){K.height=R==null?null:R+j;
}else if(J==a){K.width=S==null?null:S+j;
}var Q=O.toUri(I);
return {src:Q,style:K};
}}else{if(N&&J!==A){var W=O.getData(I);
var M=U.getStyles(W[4],J,W[5],W[6]);

for(var L in M){K[L]=M[L];
}
if(S!=null&&K.width==null&&(J==v||J===c)){K.width=S+j;
}
if(R!=null&&K.height==null&&(J==l||J===c)){K.height=R+j;
}return {style:K};
}else{{};
var M=U.getStyles(I,J);

for(var L in M){K[L]=M[L];
}
if(S!=null&&K.width==null){K.width=S+j;
}
if(R!=null&&K.height==null){K.height=R+j;
}if(K.filter){K.filter=f;
}return {style:K};
}}}}}});
})();
(function(){var N="qx.client",M="",L="boxSizing",K="cursor",J="opacity",I="clip",H="overflowY",G="overflowX",F="user-select",E="userSelect",bq="appearance",bp="style",bo="MozUserModify",bn="px",bm="-webkit-appearance",bl="styleFloat",bk="-webkit-user-select",bj="-moz-appearance",bi="pixelHeight",bh="MozAppearance",U=":",V="pixelTop",S="pixelLeft",T="text-overflow",Q="-moz-user-select",R="MozUserSelect",O="qx.bom.element.Style",P="-moz-user-modify",W="-webkit-user-modify",X="WebkitUserSelect",bb="-o-text-overflow",ba="pixelRight",bd="cssFloat",bc="pixelWidth",bf="pixelBottom",be=";",Y="WebkitUserModify",bg="WebkitAppearance";
qx.Class.define(O,{statics:{__cN:{styleNames:{"float":qx.core.Variant.select(N,{"mshtml":bl,"default":bd}),"appearance":qx.core.Variant.select(N,{"gecko":bh,"webkit":bg,"default":bq}),"userSelect":qx.core.Variant.select(N,{"gecko":R,"webkit":X,"default":E}),"userModify":qx.core.Variant.select(N,{"gecko":bo,"webkit":Y,"default":E})},cssNames:{"appearance":qx.core.Variant.select(N,{"gecko":bj,"webkit":bm,"default":bq}),"userSelect":qx.core.Variant.select(N,{"gecko":Q,"webkit":bk,"default":F}),"userModify":qx.core.Variant.select(N,{"gecko":P,"webkit":W,"default":F}),"textOverflow":qx.core.Variant.select(N,{"opera":bb,"default":T})},mshtmlPixel:{width:bc,height:bi,left:S,right:ba,top:V,bottom:bf},special:{clip:1,cursor:1,opacity:1,boxSizing:1,overflowX:1,overflowY:1}},__cO:{},compile:function(c){var g=[];
var k=this.__cN;
var j=k.special;
var h=k.cssNames;
var f=this.__cO;
var i=qx.lang.String;
var name,e,d;

for(name in c){d=c[name];

if(d==null){continue;
}name=h[name]||name;
if(j[name]){switch(name){case I:g.push(qx.bom.element.Clip.compile(d));
break;
case K:g.push(qx.bom.element.Cursor.compile(d));
break;
case J:g.push(qx.bom.element.Opacity.compile(d));
break;
case L:g.push(qx.bom.element.BoxSizing.compile(d));
break;
case G:g.push(qx.bom.element.Overflow.compileX(d));
break;
case H:g.push(qx.bom.element.Overflow.compileY(d));
break;
}}else{e=f[name];

if(!e){e=f[name]=i.hyphenate(name);
}g.push(e,U,d,be);
}}return g.join(M);
},setCss:qx.core.Variant.select(N,{"mshtml":function(a,b){a.style.cssText=b;
},"default":function(br,bs){br.setAttribute(bp,bs);
}}),getCss:qx.core.Variant.select(N,{"mshtml":function(l){return l.style.cssText.toLowerCase();
},"default":function(bz){return bz.getAttribute(bp);
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(m,name,n,o){{};
var p=this.__cN;
name=p.styleNames[name]||name;
if(o!==false&&p.special[name]){switch(name){case I:return qx.bom.element.Clip.set(m,n);
case K:return qx.bom.element.Cursor.set(m,n);
case J:return qx.bom.element.Opacity.set(m,n);
case L:return qx.bom.element.BoxSizing.set(m,n);
case G:return qx.bom.element.Overflow.setX(m,n);
case H:return qx.bom.element.Overflow.setY(m,n);
}}m.style[name]=n!==null?n:M;
},setStyles:function(bt,bu,bv){{};

for(var name in bu){this.set(bt,name,bu[name],bv);
}},reset:function(bw,name,bx){var by=this.__cN;
name=by.styleNames[name]||name;
if(bx!==false&&by.special[name]){switch(name){case I:return qx.bom.element.Clip.reset(bw);
case K:return qx.bom.element.Cursor.reset(bw);
case J:return qx.bom.element.Opacity.reset(bw);
case L:return qx.bom.element.BoxSizing.reset(bw);
case G:return qx.bom.element.Overflow.resetX(bw);
case H:return qx.bom.element.Overflow.resetY(bw);
}}bw.style[name]=M;
},get:qx.core.Variant.select(N,{"mshtml":function(w,name,x,y){var D=this.__cN;
name=D.styleNames[name]||name;
if(y!==false&&D.special[name]){switch(name){case I:return qx.bom.element.Clip.get(w,x);
case K:return qx.bom.element.Cursor.get(w,x);
case J:return qx.bom.element.Opacity.get(w,x);
case L:return qx.bom.element.BoxSizing.get(w,x);
case G:return qx.bom.element.Overflow.getX(w,x);
case H:return qx.bom.element.Overflow.getY(w,x);
}}if(!w.currentStyle){return w.style[name]||M;
}switch(x){case this.LOCAL_MODE:return w.style[name]||M;
case this.CASCADED_MODE:return w.currentStyle[name]||M;
default:var C=w.currentStyle[name]||M;
if(/^-?[\.\d]+(px)?$/i.test(C)){return C;
}var B=D.mshtmlPixel[name];

if(B){var z=w.style[name];
w.style[name]=C||0;
var A=w.style[B]+bn;
w.style[name]=z;
return A;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(C)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return C;
}},"default":function(q,name,r,s){var v=this.__cN;
name=v.styleNames[name]||name;
if(s!==false&&v.special[name]){switch(name){case I:return qx.bom.element.Clip.get(q,r);
case K:return qx.bom.element.Cursor.get(q,r);
case J:return qx.bom.element.Opacity.get(q,r);
case L:return qx.bom.element.BoxSizing.get(q,r);
case G:return qx.bom.element.Overflow.getX(q,r);
case H:return qx.bom.element.Overflow.getY(q,r);
}}switch(r){case this.LOCAL_MODE:return q.style[name]||M;
case this.CASCADED_MODE:if(q.currentStyle){return q.currentStyle[name]||M;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var t=qx.dom.Node.getDocument(q);
var u=t.defaultView.getComputedStyle(q,null);
return u?u[name]:M;
}}})}});
})();
(function(){var K="auto",J="px",I=",",H="clip:auto;",G="rect(",F=");",E="",D=")",C="qx.bom.element.Clip",B="string",y="rect(auto)",A="clip:rect(",z="clip",x="rect(auto,auto,auto,auto)";
qx.Class.define(C,{statics:{compile:function(a){if(!a){return H;
}var f=a.left;
var top=a.top;
var e=a.width;
var d=a.height;
var b,c;

if(f==null){b=(e==null?K:e+J);
f=K;
}else{b=(e==null?K:f+e+J);
f=f+J;
}
if(top==null){c=(d==null?K:d+J);
top=K;
}else{c=(d==null?K:top+d+J);
top=top+J;
}return A+top+I+b+I+c+I+f+F;
},get:function(g,h){var j=qx.bom.element.Style.get(g,z,h,false);
var o,top,m,l;
var i,k;

if(typeof j===B&&j!==K&&j!==E){j=qx.lang.String.trim(j);
if(/\((.*)\)/.test(j)){var n=RegExp.$1.split(I);
top=qx.lang.String.trim(n[0]);
i=qx.lang.String.trim(n[1]);
k=qx.lang.String.trim(n[2]);
o=qx.lang.String.trim(n[3]);
if(o===K){o=null;
}
if(top===K){top=null;
}
if(i===K){i=null;
}
if(k===K){k=null;
}if(top!=null){top=parseInt(top,10);
}
if(i!=null){i=parseInt(i,10);
}
if(k!=null){k=parseInt(k,10);
}
if(o!=null){o=parseInt(o,10);
}if(i!=null&&o!=null){m=i-o;
}else if(i!=null){m=i;
}
if(k!=null&&top!=null){l=k-top;
}else if(k!=null){l=k;
}}else{throw new Error("Could not parse clip string: "+j);
}}return {left:o||null,top:top||null,width:m||null,height:l||null};
},set:function(q,r){if(!r){q.style.clip=x;
return;
}var w=r.left;
var top=r.top;
var v=r.width;
var u=r.height;
var s,t;

if(w==null){s=(v==null?K:v+J);
w=K;
}else{s=(v==null?K:w+v+J);
w=w+J;
}
if(top==null){t=(u==null?K:u+J);
top=K;
}else{t=(u==null?K:top+u+J);
top=top+J;
}q.style.clip=G+top+I+s+I+t+I+w+D;
},reset:function(p){p.style.clip=qx.bom.client.Engine.MSHTML?y:K;
}}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__cP:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(m){return f+(this.__cP[m]||m)+d;
},get:function(p,q){return qx.bom.element.Style.get(p,b,q,false);
},set:function(n,o){n.style.cursor=this.__cP[o]||o;
},reset:function(l){l.style.cursor=g;
}}});
})();
(function(){var D="",C="qx.client",B=";",A="filter",z="opacity:",y="opacity",x="MozOpacity",w=");",v=")",u="zoom:1;filter:alpha(opacity=",r="qx.bom.element.Opacity",t="alpha(opacity=",s="-moz-opacity:";
qx.Class.define(r,{statics:{compile:qx.core.Variant.select(C,{"mshtml":function(q){if(q>=1){return D;
}
if(q<0.00001){q=0;
}return u+(q*100)+w;
},"gecko":function(E){if(E==1){E=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return s+E+B;
}else{return z+E+B;
}},"default":function(j){if(j==1){return D;
}return z+j+B;
}}),set:qx.core.Variant.select(C,{"mshtml":function(d,e){var f=qx.bom.element.Style.get(d,A,qx.bom.element.Style.COMPUTED_MODE,false);
if(e>=1){d.style.filter=f.replace(/alpha\([^\)]*\)/gi,D);
return;
}
if(e<0.00001){e=0;
}if(!d.currentStyle||!d.currentStyle.hasLayout){d.style.zoom=1;
}d.style.filter=f.replace(/alpha\([^\)]*\)/gi,D)+t+e*100+v;
},"gecko":function(a,b){if(b==1){b=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){a.style.MozOpacity=b;
}else{a.style.opacity=b;
}},"default":function(o,p){if(p==1){p=D;
}o.style.opacity=p;
}}),reset:qx.core.Variant.select(C,{"mshtml":function(F){var G=qx.bom.element.Style.get(F,A,qx.bom.element.Style.COMPUTED_MODE,false);
F.style.filter=G.replace(/alpha\([^\)]*\)/gi,D);
},"gecko":function(n){if(qx.bom.client.Engine.VERSION<1.7){n.style.MozOpacity=D;
}else{n.style.opacity=D;
}},"default":function(c){c.style.opacity=D;
}}),get:qx.core.Variant.select(C,{"mshtml":function(H,I){var J=qx.bom.element.Style.get(H,A,I,false);

if(J){var K=J.match(/alpha\(opacity=(.*)\)/);

if(K&&K[1]){return parseFloat(K[1])/100;
}}return 1.0;
},"gecko":function(g,h){var i=qx.bom.element.Style.get(g,qx.bom.client.Engine.VERSION<1.7?x:y,h,false);

if(i==0.999999){i=1.0;
}
if(i!=null){return parseFloat(i);
}return 1.0;
},"default":function(k,l){var m=qx.bom.element.Style.get(k,y,l,false);

if(m!=null){return parseFloat(m);
}return 1.0;
}})}});
})();
(function(){var u="qx.client",t="",s="boxSizing",r="box-sizing",q=":",p="border-box",o="qx.bom.element.BoxSizing",n="KhtmlBoxSizing",m="-moz-box-sizing",k="WebkitBoxSizing",g=";",j="-khtml-box-sizing",h="content-box",f="-webkit-box-sizing",e="MozBoxSizing";
qx.Class.define(o,{statics:{__cQ:qx.core.Variant.select(u,{"mshtml":null,"webkit":[s,n,k],"gecko":[e],"opera":[s]}),__cR:qx.core.Variant.select(u,{"mshtml":null,"webkit":[r,j,f],"gecko":[m],"opera":[r]}),__cS:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__cT:function(F){var G=this.__cS;
return G.tags[F.tagName.toLowerCase()]||G.types[F.type];
},compile:qx.core.Variant.select(u,{"mshtml":function(C){{};
},"default":function(a){var c=this.__cR;
var b=t;

if(c){for(var i=0,l=c.length;i<l;i++){b+=c[i]+q+a+g;
}}return b;
}}),get:qx.core.Variant.select(u,{"mshtml":function(d){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(d))){if(!this.__cT(d)){return h;
}}return p;
},"default":function(y){var A=this.__cQ;
var z;

if(A){for(var i=0,l=A.length;i<l;i++){z=qx.bom.element.Style.get(y,A[i],null,false);

if(z!=null&&z!==t){return z;
}}}return t;
}}),set:qx.core.Variant.select(u,{"mshtml":function(D,E){{};
},"default":function(v,w){var x=this.__cQ;

if(x){for(var i=0,l=x.length;i<l;i++){v.style[x[i]]=w;
}}}}),reset:function(B){this.set(B,t);
}}});
})();
(function(){var l="CSS1Compat",k="qx.bom.Document";
qx.Class.define(k,{statics:{isQuirksMode:function(i){return (i||window).document.compatMode!==l;
},isStandardMode:function(j){return (j||window).document.compatMode===l;
},getWidth:function(e){var f=(e||window).document;
var h=qx.bom.Viewport.getWidth(e);
var g=(qx.bom.client.Engine.OPERA&&qx.bom.client.Engine.VERSION>9.5&&qx.bom.client.Engine.VERSION<=10);
var scroll=f.compatMode===l?f.documentElement.scrollWidth:f.body.scrollWidth;
return g?h:Math.max(scroll,h);
},getHeight:function(a){var b=(a||window).document;
var d=qx.bom.Viewport.getHeight(a);
var c=(qx.bom.client.Engine.OPERA&&qx.bom.client.Engine.VERSION>9.5&&qx.bom.client.Engine.VERSION<=10);
var scroll=b.compatMode===l?b.documentElement.scrollHeight:b.body.scrollHeight;
return c?d:Math.max(scroll,d);
}}});
})();
(function(){var k="qx.client",j="CSS1Compat",i="qx.bom.Viewport";
qx.Class.define(i,{statics:{getWidth:qx.core.Variant.select(k,{"opera":function(a){return (a||window).document.body.clientWidth;
},"webkit":function(o){return (o||window).innerWidth;
},"default":function(b){var c=(b||window).document;
return c.compatMode===j?c.documentElement.clientWidth:c.body.clientWidth;
}}),getHeight:qx.core.Variant.select(k,{"opera":function(l){return (l||window).document.body.clientHeight;
},"webkit":function(n){return (n||window).innerHeight;
},"default":function(e){var f=(e||window).document;
return f.compatMode===j?f.documentElement.clientHeight:f.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(k,{"mshtml":function(p){var q=(p||window).document;
return q.documentElement.scrollLeft||q.body.scrollLeft;
},"default":function(d){return (d||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(k,{"mshtml":function(g){var h=(g||window).document;
return h.documentElement.scrollTop||h.body.scrollTop;
},"default":function(m){return (m||window).pageYOffset;
}})}});
})();
(function(){var z="",y="qx.client",x="hidden",w="-moz-scrollbars-none",v="overflow",u=";",r="overflowY",q=":",p="overflowX",o="overflow:",L="none",K="scroll",J="borderLeftStyle",I="borderRightStyle",H="div",G="borderRightWidth",F="overflow-y",E="borderLeftWidth",D="-moz-scrollbars-vertical",C="100px",A="qx.bom.element.Overflow",B="overflow-x";
qx.Class.define(A,{statics:{__cU:null,getScrollbarWidth:function(){if(this.__cU!==null){return this.__cU;
}var bk=qx.bom.element.Style;
var bm=function(M,N){return parseInt(bk.get(M,N))||0;
};
var bn=function(bF){return (bk.get(bF,I)==L?0:bm(bF,G));
};
var bl=function(bj){return (bk.get(bj,J)==L?0:bm(bj,E));
};
var bp=qx.core.Variant.select(y,{"mshtml":function(X){if(bk.get(X,r)==x||X.clientWidth==0){return bn(X);
}return Math.max(0,X.offsetWidth-X.clientLeft-X.clientWidth);
},"default":function(cd){if(cd.clientWidth==0){var ce=bk.get(cd,v);
var cf=(ce==K||ce==D?16:0);
return Math.max(0,bn(cd)+cf);
}return Math.max(0,(cd.offsetWidth-cd.clientWidth-bl(cd)));
}});
var bo=function(bg){return bp(bg)-bn(bg);
};
var t=document.createElement(H);
var s=t.style;
s.height=s.width=C;
s.overflow=K;
document.body.appendChild(t);
var c=bo(t);
this.__cU=c?c:16;
document.body.removeChild(t);
return this.__cU;
},_compile:qx.core.Variant.select(y,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bh,bi){if(bi==x){bi=w;
}return o+bi+u;
}:
function(bU,bV){return bU+q+bV+u;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(by,bz){return o+bz+u;
}:
function(bd,be){return bd+q+be+u;
},"default":function(a,b){return a+q+b+u;
}}),compileX:function(bG){return this._compile(B,bG);
},compileY:function(bL){return this._compile(F,bL);
},getX:qx.core.Variant.select(y,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(g,h){var i=qx.bom.element.Style.get(g,v,h,false);

if(i===w){i=x;
}return i;
}:
function(bH,bI){return qx.bom.element.Style.get(bH,p,bI,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(U,V){return qx.bom.element.Style.get(U,v,V,false);
}:
function(bs,bt){return qx.bom.element.Style.get(bs,p,bt,false);
},"default":function(bW,bX){return qx.bom.element.Style.get(bW,p,bX,false);
}}),setX:qx.core.Variant.select(y,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(cb,cc){if(cc==x){cc=w;
}cb.style.overflow=cc;
}:
function(Y,ba){Y.style.overflowX=ba;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bM,bN){bM.style.overflow=bN;
}:
function(j,k){j.style.overflowX=k;
},"default":function(bw,bx){bw.style.overflowX=bx;
}}),resetX:qx.core.Variant.select(y,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(W){W.style.overflow=z;
}:
function(n){n.style.overflowX=z;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bD,bE){bD.style.overflow=z;
}:
function(l,m){l.style.overflowX=z;
},"default":function(bT){bT.style.overflowX=z;
}}),getY:qx.core.Variant.select(y,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bA,bB){var bC=qx.bom.element.Style.get(bA,v,bB,false);

if(bC===w){bC=x;
}return bC;
}:
function(d,e){return qx.bom.element.Style.get(d,r,e,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(O,P){return qx.bom.element.Style.get(O,v,P,false);
}:
function(bP,bQ){return qx.bom.element.Style.get(bP,r,bQ,false);
},"default":function(Q,R){return qx.bom.element.Style.get(Q,r,R,false);
}}),setY:qx.core.Variant.select(y,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bY,ca){if(ca===x){ca=w;
}bY.style.overflow=ca;
}:
function(bR,bS){bR.style.overflowY=bS;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bq,br){bq.style.overflow=br;
}:
function(S,T){S.style.overflowY=T;
},"default":function(bJ,bK){bJ.style.overflowY=bK;
}}),resetY:qx.core.Variant.select(y,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bf){bf.style.overflow=z;
}:
function(f){f.style.overflowY=z;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bb,bc){bb.style.overflow=z;
}:
function(bu,bv){bu.style.overflowY=z;
},"default":function(bO){bO.style.overflowY=z;
}})}});
})();
(function(){var c="qx.client",b="qx.io2.ImageLoader",a="load";
qx.Bootstrap.define(b,{statics:{__cV:{},__cW:{width:null,height:null},__cX:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__cV[d];
return !!(e&&e.loaded);
},isFailed:function(B){var C=this.__cV[B];
return !!(C&&C.failed);
},isLoading:function(m){var n=this.__cV[m];
return !!(n&&n.loading);
},getFormat:function(v){if(v!=null&&this.__cV[v]){return this.__cV[v]||null;
}else{return null;
}},getSize:function(F){return this.__cV[F]||this.__cW;
},getWidth:function(D){var E=this.__cV[D];
return E?E.width:null;
},getHeight:function(y){var z=this.__cV[y];
return z?z.height:null;
},load:function(p,q,r){var s=this.__cV[p];

if(!s){s=this.__cV[p]={};
}if(q&&!r){r=window;
}if(s.loaded||s.loading||s.failed){if(q){if(s.loading){s.callbacks.push(q,r);
}else{q.call(r,p,s);
}}}else{s.loading=true;
s.callbacks=[];

if(q){s.callbacks.push(q,r);
}var u=new Image();
var t=qx.lang.Function.listener(this.__cY,this,u,p);
u.onload=t;
u.onerror=t;
u.src=p;
}},__cY:qx.event.GlobalError.observeMethod(function(event,f,g){var h=this.__cV[g];
if(event.type===a){h.loaded=true;
h.width=this.__da(f);
h.height=this.__db(f);
var j=this.__cX.exec(g);

if(j!=null){h.format=j[1];
}}else{h.failed=true;
}f.onload=f.onerror=null;
var k=h.callbacks;
delete h.loading;
delete h.callbacks;
for(var i=0,l=k.length;i<l;i+=2){k[i].call(k[i+1],g,h);
}}),__da:qx.core.Variant.select(c,{"gecko":function(A){return A.naturalWidth;
},"default":function(w){return w.width;
}}),__db:qx.core.Variant.select(c,{"gecko":function(o){return o.naturalHeight;
},"default":function(x){return x.height;
}})}});
})();
(function(){var l="_window",k="_manager",j="qx.event.handler.Window";
qx.Class.define(j,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(m){arguments.callee.base.call(this);
this._manager=m;
this._window=m.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(n,o){},registerEvent:function(c,d,f){},unregisterEvent:function(g,h,i){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var b=qx.event.handler.Window.SUPPORTED_TYPES;

for(var a in b){qx.bom.Event.addNativeListener(this._window,a,this._onNativeWrapper);
}},_stopWindowObserver:function(){var w=qx.event.handler.Window.SUPPORTED_TYPES;

for(var v in w){qx.bom.Event.removeNativeListener(this._window,v,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var r=this._window;
var u=r.document;
var s=u.documentElement;
var q=e.target||e.srcElement;

if(q==null||q===r||q===u||q===s){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,r]);
qx.event.Registration.dispatchEvent(r,event);
var t=event.getReturnValue();

if(t!=null){e.returnValue=t;
return t;
}}})},destruct:function(){this._stopWindowObserver();
this._disposeFields(k,l);
},defer:function(p){qx.event.Registration.addHandler(p);
}});
})();
(function(){var j="ready",i="qx.application",h="beforeunload",g="qx.core.Init",f="shutdown";
qx.Class.define(g,{statics:{getApplication:function(){return this.__dd||null;
},__dc:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var c=qx.core.Setting.get(i);
var d=qx.Class.getByName(c);

if(d){this.__dd=new d;
var b=new Date;
this.__dd.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-b)+"ms");
var b=new Date;
this.__dd.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-b)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+c);
}},__de:function(e){var a=this.__dd;

if(a){e.setReturnValue(a.close());
}},__df:function(){var k=this.__dd;

if(k){k.terminate();
}}},defer:function(l){qx.event.Registration.addListener(window,j,l.__dc,l);
qx.event.Registration.addListener(window,f,l.__df,l);
qx.event.Registration.addListener(window,h,l.__de,l);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var m="qx.locale.MTranslation";
qx.Mixin.define(m,{members:{tr:function(a,b){var c=qx.locale.Manager;

if(c){return c.tr.apply(c,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(d,e,f,g){var h=qx.locale.Manager;

if(h){return h.trn.apply(h,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(i,j,k){var l=qx.locale.Manager;

if(l){return l.trc.apply(l,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
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
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var d="passwd.Application",c="First Button",b="execute",a="passwd/test.png";
qx.Class.define(d,{extend:qx.application.Standalone,members:{main:function(){arguments.callee.base.call(this);
{};
var h=new qx.ui.tree.TreeFolder();
var g=new qx.ui.form.Button(c,a);
var f=this.getRoot();
f.add(g,{left:100,top:50});
g.addListener(b,function(e){alert("Hello World!");
});
}}});
})();
(function(){var j="qx.event.type.Native",i="_native",h="_returnValue";
qx.Class.define(j,{extend:qx.event.type.Event,members:{init:function(a,b,c,d,e){arguments.callee.base.call(this,d,e);
this._target=b||qx.bom.Event.getTarget(a);
this._relatedTarget=c||qx.bom.Event.getRelatedTarget(a);

if(a.timeStamp){this._timeStamp=a.timeStamp;
}this._native=a;
return this;
},clone:function(f){var g=arguments.callee.base.call(this,f);
g._native=this._native;
g._returnValue=this._returnValue;
return g;
},preventDefault:function(){arguments.callee.base.call(this);
qx.bom.Event.preventDefault(this._native);
},stop:function(){this.stopPropagation();
this.preventDefault();
},getNativeEvent:function(){return this._native;
},setReturnValue:function(k){this._returnValue=k;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._disposeFields(i,h);
}});
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
(function(){var l="qx.theme.manager.Font",k="Theme",j="changeTheme",i="_applyTheme",h="singleton";
qx.Class.define(l,{type:h,extend:qx.util.ValueManager,properties:{theme:{check:k,nullable:true,apply:i,event:j}},members:{resolveDynamic:function(r){var s=this._dynamic;
return r instanceof qx.bom.Font?r:s[r];
},resolve:function(d){var g=this._dynamic;
var e=g[d];

if(e){return e;
}var f=this.getTheme();

if(f!==null&&f.fonts[d]){return g[d]=(new qx.bom.Font).set(f.fonts[d]);
}return d;
},isDynamic:function(a){var c=this._dynamic;

if(a&&(a instanceof qx.bom.Font||c[a]!==undefined)){return true;
}var b=this.getTheme();

if(b!==null&&a&&b.fonts[a]){c[a]=(new qx.bom.Font).set(b.fonts[a]);
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
(function(){var r="",q="underline",p="Boolean",o="px",n='"',m="italic",k="normal",j="bold",h="_applyItalic",g="_applyBold",D="Integer",C="_applyFamily",B="_applyLineHeight",A="Array",z="overline",y="line-through",x="qx.bom.Font",w="Number",v="_applyDecoration",u=" ",s="_applySize",t=",";
qx.Class.define(x,{extend:qx.core.Object,construct:function(a,b){arguments.callee.base.call(this);

if(a!==undefined){this.setSize(a);
}
if(b!==undefined){this.setFamily(b);
}},statics:{fromString:function(L){var P=new qx.bom.Font();
var N=L.split(/\s+/);
var name=[];
var O;

for(var i=0;i<N.length;i++){switch(O=N[i]){case j:P.setBold(true);
break;
case m:P.setItalic(true);
break;
case q:P.setDecoration(q);
break;
default:var M=parseInt(O,10);

if(M==O||qx.lang.String.contains(O,o)){P.setSize(M);
}else{name.push(O);
}break;
}}
if(name.length>0){P.setFamily(name);
}return P;
},fromConfig:function(E){var F=new qx.bom.Font;
F.set(E);
return F;
},__dw:{fontFamily:r,fontSize:r,fontWeight:r,fontStyle:r,textDecoration:r,lineHeight:1.2},getDefaultStyles:function(){return this.__dw;
}},properties:{size:{check:D,nullable:true,apply:s},lineHeight:{check:w,nullable:true,apply:B},family:{check:A,nullable:true,apply:C},bold:{check:p,nullable:true,apply:g},italic:{check:p,nullable:true,apply:h},decoration:{check:[q,y,z],nullable:true,apply:v}},members:{__dx:null,__dy:null,__dz:null,__dA:null,__dB:null,__dC:null,_applySize:function(e,f){this.__dx=e===null?null:e+o;
},_applyLineHeight:function(G,H){this.__dC=G===null?null:G;
},_applyFamily:function(I,J){var K=r;

for(var i=0,l=I.length;i<l;i++){if(I[i].indexOf(u)>0){K+=n+I[i]+n;
}else{K+=I[i];
}
if(i!==l-1){K+=t;
}}this.__dy=K;
},_applyBold:function(c,d){this.__dz=c===null?null:c?j:k;
},_applyItalic:function(S,T){this.__dA=S===null?null:S?m:k;
},_applyDecoration:function(Q,R){this.__dB=Q===null?null:Q;
},getStyles:function(){return {fontFamily:this.__dy,fontSize:this.__dx,fontWeight:this.__dz,fontStyle:this.__dA,textDecoration:this.__dB,lineHeight:this.__dC};
}}});
})();
(function(){var e="icon",d="qx.theme.manager.Icon",c="Theme",b="_applyTheme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:b}},members:{_applyTheme:function(f,g){var i=qx.util.AliasManager.getInstance();
if(f){i.add(e,f.resource);
}else{i.remove(e);
}
if(g){for(var h in g.aliases){i.remove(h);
}}
if(f){for(var h in f.aliases){i.add(h,f.aliases[h]);
}}}}});
})();
(function(){var O="string",N="Theme",M="__dD",L="__dE",K="_applyTheme",J="qx.theme.manager.Appearance",I=":",H="changeAppearanceTheme",G="changeTheme",F="/",E="singleton";
qx.Class.define(J,{type:E,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__dD={};
this.__dE={};
},properties:{appearanceTheme:{check:N,nullable:true,event:H},theme:{check:N,nullable:true,event:G,apply:K}},members:{__dF:{},__dD:null,__dE:null,_applyTheme:function(l,m){this.__dE={};
this.__dD={};
},__dG:function(a,b,c){var g=b.appearances;
var j=g[a];

if(!j){var k=F;
var d=[];
var i=a.split(k);
var h;

while(!j&&i.length>0){d.unshift(i.pop());
var e=i.join(k);
j=g[e];

if(j){h=j.alias||j;

if(typeof h===O){var f=h+k+d.join(k);
return this.__dG(f,b,c);
}}}if(c!=null){return this.__dG(c,b);
}return null;
}else if(typeof j===O){return this.__dG(j,b,c);
}else if(j.include&&!j.style){return this.__dG(j.include,b,c);
}return a;
},styleFrom:function(n,o,p,q){if(!p){p=this.getTheme();
}var w=this.__dE;
var r=w[n];

if(!r){r=w[n]=this.__dG(n,p,q);
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
}}var v=this.__dD;

if(v[C]!==undefined){return v[C];
}if(!o){o=this.__dF;
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
}},destruct:function(){this._disposeFields(M,L);
}});
})();
(function(){var q="focusout",p="interval",o="mouseover",n="mouseout",m="mousemove",l="widget",k="__dJ",j="qx.ui.tooltip.ToolTip",i="Boolean",h="__dI",d="_applyCurrent",g="qx.ui.tooltip.Manager",f="__dH",c="tooltip-error",b="singleton";
qx.Class.define(g,{type:b,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,o,this.__dR,this,true);
this.__dH=new qx.event.Timer();
this.__dH.addListener(p,this.__dO,this);
this.__dI=new qx.event.Timer();
this.__dI.addListener(p,this.__dP,this);
this.__dJ={left:0,top:0};
},properties:{current:{check:j,nullable:true,apply:d},showInvalidTooltips:{check:i,init:true}},members:{__dJ:null,__dI:null,__dH:null,__dK:null,__dL:null,__dM:function(){if(!this.__dK){this.__dK=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dK;
},__dN:function(){if(!this.__dL){this.__dL=new qx.ui.tooltip.ToolTip().set({appearance:c});
this.__dL.syncAppearance();
}return this.__dL;
},_applyCurrent:function(B,C){if(C&&qx.ui.core.Widget.contains(C,B)){return;
}if(C){C.exclude();
this.__dH.stop();
this.__dI.stop();
}var E=qx.event.Registration;
var D=document.body;
if(B){this.__dH.startWith(B.getShowTimeout());
E.addListener(D,n,this.__dS,this,true);
E.addListener(D,q,this.__dT,this,true);
E.addListener(D,m,this.__dQ,this,true);
}else{E.removeListener(D,n,this.__dS,this,true);
E.removeListener(D,q,this.__dT,this,true);
E.removeListener(D,m,this.__dQ,this,true);
}},__dO:function(e){var a=this.getCurrent();

if(a){this.__dI.startWith(a.getHideTimeout());

if(a.getPlaceMethod()==l){a.placeToWidget(a.getOpener());
}else{a.placeToPoint(this.__dJ);
}a.show();
}this.__dH.stop();
},__dP:function(e){var F=this.getCurrent();

if(F){F.exclude();
}this.__dI.stop();
this.resetCurrent();
},__dQ:function(e){var G=this.__dJ;
G.left=e.getDocumentLeft();
G.top=e.getDocumentTop();
},__dR:function(e){var y=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!y){return;
}var z;
while(y!=null){var z=y.getToolTip();
var A=y.getToolTipText()||null;
var x=y.getToolTipIcon()||null;

if(qx.Class.hasInterface(y.constructor,qx.ui.form.IForm)&&!y.isValid()){var w=y.getInvalidMessage();
}
if(z||A||x||w){break;
}y=y.getLayoutParent();
}
if(!y){return;
}if(w&&y.getEnabled()){if(!this.getShowInvalidTooltips()){return;
}var z=this.__dN().set({label:w});
}else if(!z){var z=this.__dM().set({label:A,icon:x});
}this.setCurrent(z);
z.setOpener(y);
},__dS:function(e){var r=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!r){return;
}var s=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!s){return;
}var t=this.getCurrent();
if(t&&(s==t||qx.ui.core.Widget.contains(t,s))){return;
}if(s&&r&&qx.ui.core.Widget.contains(r,s)){return;
}if(t&&!s){this.setCurrent(null);
}else{this.resetCurrent();
}},__dT:function(e){var u=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!u){return;
}var v=this.getCurrent();
if(v&&v==u.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,o,this.__dR,this,true);
this._disposeObjects(f,h);
this._disposeFields(k);
}});
})();
(function(){var m="interval",l="qx.event.Timer",k="_applyInterval",j="_applyEnabled",i="Boolean",h="__dU",g="qx.event.type.Event",f="Integer",d="__dV";
qx.Class.define(l,{extend:qx.core.Object,construct:function(n){arguments.callee.base.call(this);
this.setEnabled(false);

if(n!=null){this.setInterval(n);
}this.__dU=qx.lang.Function.bind(this._oninterval,this);
},events:{"interval":g},statics:{once:function(p,q,r){var s=new qx.event.Timer(r);
s.addListener(m,function(e){s.stop();
p.call(q,e);
s.dispose();
q=null;
},q);
s.start();
return s;
}},properties:{enabled:{init:true,check:i,apply:j},interval:{check:f,init:1000,apply:k}},members:{__dV:null,__dU:null,_applyInterval:function(t,u){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(a,b){if(b){window.clearInterval(this.__dV);
this.__dV=null;
}else if(a){this.__dV=window.setInterval(this.__dU,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(c){this.setInterval(c);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(o){this.stop();
this.startWith(o);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.getEnabled()){this.fireEvent(m);
}})},destruct:function(){if(this.__dV){window.clearInterval(this.__dV);
}this._disposeFields(d,h);
}});
})();
(function(){var b="qx.ui.core.MChildrenHandling";
qx.Mixin.define(b,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(g){return this._indexOf(g);
},add:function(l,m){this._add(l,m);
},addAt:function(h,i,j){this._addAt(h,i,j);
},addBefore:function(d,e,f){this._addBefore(d,e,f);
},addAfter:function(n,o,p){this._addAfter(n,o,p);
},remove:function(a){this._remove(a);
},removeAt:function(c){return this._removeAt(c);
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
(function(){var Q="Integer",P="_applyDimension",O="Boolean",N="_applyStretching",M="_applyMargin",L="shorthand",K="_applyAlign",J="allowShrinkY",I="bottom",H="baseline",bl="marginBottom",bk="qx.ui.core.LayoutItem",bj="center",bi="marginTop",bh="$$subparent",bg="__dX",bf="allowGrowX",be="__ed",bd="middle",bc="marginLeft",X="allowShrinkX",Y="$$parent",V="top",W="right",T="marginRight",U="abstract",R="allowGrowY",S="left",ba="__ea",bb="__ec";
qx.Class.define(bk,{type:U,extend:qx.core.Object,properties:{minWidth:{check:Q,nullable:true,apply:P,init:null,themeable:true},width:{check:Q,nullable:true,apply:P,init:null,themeable:true},maxWidth:{check:Q,nullable:true,apply:P,init:null,themeable:true},minHeight:{check:Q,nullable:true,apply:P,init:null,themeable:true},height:{check:Q,nullable:true,apply:P,init:null,themeable:true},maxHeight:{check:Q,nullable:true,apply:P,init:null,themeable:true},allowGrowX:{check:O,apply:N,init:true,themeable:true},allowShrinkX:{check:O,apply:N,init:true,themeable:true},allowGrowY:{check:O,apply:N,init:true,themeable:true},allowShrinkY:{check:O,apply:N,init:true,themeable:true},allowStretchX:{group:[bf,X],mode:L,themeable:true},allowStretchY:{group:[R,J],mode:L,themeable:true},marginTop:{check:Q,init:0,apply:M,themeable:true},marginRight:{check:Q,init:0,apply:M,themeable:true},marginBottom:{check:Q,init:0,apply:M,themeable:true},marginLeft:{check:Q,init:0,apply:M,themeable:true},margin:{group:[bi,T,bl,bc],mode:L,themeable:true},alignX:{check:[S,bj,W],nullable:true,apply:K,themeable:true},alignY:{check:[V,bd,I,H],nullable:true,apply:K,themeable:true}},members:{__dW:null,__dX:null,__dY:null,__ea:null,__eb:null,__ec:null,__ed:null,getBounds:function(){return this.__ec||this.__dX||null;
},clearSeparators:function(){},renderSeparator:function(c,d){},renderLayout:function(k,top,l,m){var n;
{};
var o=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var o=this._getHeightForWidth(l);
}
if(o!=null&&o!==this.__dW){this.__dW=o;
qx.ui.core.queue.Layout.add(this);
return null;
}var q=this.__dX;

if(!q){q=this.__dX={};
}var p={};

if(k!==q.left||top!==q.top){p.position=true;
q.left=k;
q.top=top;
}
if(l!==q.width||m!==q.height){p.size=true;
q.width=l;
q.height=m;
}if(this.__dY){p.local=true;
delete this.__dY;
}
if(this.__eb){p.margin=true;
delete this.__eb;
}return p;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__dY;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__dY=true;
this.__ea=null;
},getSizeHint:function(f){var g=this.__ea;

if(g){return g;
}
if(f===false){return null;
}g=this.__ea=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__dW&&this.getHeight()==null){g.height=this.__dW;
}if(!this.getAllowShrinkX()){g.minWidth=Math.max(g.minWidth,g.width);
}else if(g.minWidth>g.width&&this.getAllowGrowX()){g.width=g.minWidth;
}
if(!this.getAllowShrinkY()){g.minHeight=Math.max(g.minHeight,g.height);
}
if(g.minHeight>g.height&&this.getAllowGrowY()){g.height=g.minHeight;
}if(!this.getAllowGrowX()){g.maxWidth=Math.min(g.maxWidth,g.width);
}
if(g.width>g.maxWidth){g.width=g.maxWidth;
}
if(!this.getAllowGrowY()){g.maxHeight=Math.min(g.maxHeight,g.height);
}
if(g.height>g.maxHeight){g.height=g.maxHeight;
}return g;
},_computeSizeHint:function(){var x=this.getMinWidth()||0;
var u=this.getMinHeight()||0;
var y=this.getWidth()||x;
var w=this.getHeight()||u;
var t=this.getMaxWidth()||Infinity;
var v=this.getMaxHeight()||Infinity;
return {minWidth:x,width:y,maxWidth:t,minHeight:u,height:w,maxHeight:v};
},_hasHeightForWidth:function(){var e=this._getLayout();

if(e){return e.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(a){var b=this._getLayout();

if(b&&b.hasHeightForWidth()){return b.getHeightForWidth(a);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__eb=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__ec;
},setUserBounds:function(E,top,F,G){this.__ec={left:E,top:top,width:F,height:G};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__ec;
qx.ui.core.queue.Layout.add(this);
},__ee:{},setLayoutProperties:function(z){if(z==null){return;
}var A=this.__ed;

if(!A){A=this.__ed={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(z);
}for(var B in z){if(z[B]==null){delete A[B];
}else{A[B]=z[B];
}}},getLayoutProperties:function(){return this.__ed||this.__ee;
},clearLayoutProperties:function(){delete this.__ed;
},updateLayoutProperties:function(h){var i=this._getLayout();

if(i){var j;
{};
i.invalidateChildrenCache();
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
},clone:function(){var r=arguments.callee.base.call(this);
var s=this.__ed;

if(s){r.__ed=qx.lang.Object.clone(s);
}return r;
},serialize:function(){var C=arguments.callee.base.call(this);
var D=this.__ed;

if(D){C.layoutProperties=qx.lang.Object.clone(D);
}return C;
}},destruct:function(){this._disposeFields(Y,bh,be,bg,bb,ba);
}});
})();
(function(){var gL="px",gK="qx.event.type.Mouse",gJ="Boolean",gI="qx.event.type.Drag",gH="visible",gG="qx.event.type.Focus",gF="on",gE="Integer",gD="excluded",gC="object",gd="qx.event.type.Data",gc="_applyPadding",gb="qx.event.type.Event",ga="zIndex",fY="hidden",fX="String",fW="tabIndex",fV="contextmenu",fU="absolute",fT="backgroundColor",gS="focused",gT="changeVisibility",gQ="mshtml",gR="hovered",gO="qx.event.type.KeySequence",gP="qx.client",gM="drag",gN="height",gU="div",gV="disabled",gv="move",gu="dragstart",gx="qx.dynlocale",gw="dragchange",gz="position",gy="dragend",gB="resize",gA="Decorator",gt="width",gs="$$widget",eK="opacity",eL="default",eM="Color",eN="top",eO="left",eP="changeToolTipText",eQ="beforeContextmenuOpen",eR="Use public 'getChildControl' instead!",eS="_applyNativeContextMenu",eT="__eo",ha="__ef",gY="_applyBackgroundColor",gX="_applyFocusable",gW="changeShadow",he="__ej",hd="__es",hc="qx.event.type.KeyInput",hb="createChildControl",hg="Font",hf="_applyShadow",ft="_applyEnabled",fu="_applySelectable",fr="_applyKeepActive",fs="Number",fx="_applyVisibility",fy="__eg",fv="repeat",fw="qxDraggable",fp="syncAppearance",fq="paddingLeft",fc="_applyDroppable",fb="__eA",fe="__ex",fd="__eq",eX="#",eW="_applyCursor",fa="_applyDraggable",eY="changeTextColor",eV="changeContextMenu",eU="paddingTop",fD="changeSelectable",fE="hideFocus",fF="none",fG="outline",fz="_applyAppearance",fA="overflowX",fB="_applyOpacity",fC="url(",fH=")",fI="qx.ui.core.Widget",fm="_applyFont",fl="cursor",fk="qxDroppable",fj="changeZIndex",fi="overflowY",fh="changeEnabled",fg="changeFont",ff="_applyDecorator",fo="_applyZIndex",fn="__ek",fJ="_applyTextColor",fK="qx.ui.menu.Menu",fL="Use public 'hasChildControl' instead!",fM="_applyToolTipText",fN="true",fO="widget",fP="changeDecorator",fQ="_applyTabIndex",fR="changeAppearance",fS="__el",gh="shorthand",gg="/",gf="",ge="_applyContextMenu",gl="paddingBottom",gk="changeNativeContextMenu",gj="qx.ui.tooltip.ToolTip",gi="qxKeepActive",gn="_applyKeepFocus",gm="paddingRight",gq="changeBackgroundColor",gr="changeLocale",go="qxKeepFocus",gp="qx/static/blank.gif";
qx.Class.define(fI,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__ef=this._createContainerElement();
this.__eg=this.__er();
this.__ef.add(this.__eg);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:gb,disappear:gb,createChildControl:gd,resize:gd,move:gd,syncAppearance:gd,mousemove:gK,mouseover:gK,mouseout:gK,mousedown:gK,mouseup:gK,click:gK,dblclick:gK,contextmenu:gK,beforeContextmenuOpen:gK,mousewheel:gK,keyup:gO,keydown:gO,keypress:gO,keyinput:hc,focus:gG,blur:gG,focusin:gG,focusout:gG,activate:gG,deactivate:gG,capture:gb,losecapture:gb,drop:gI,dragleave:gI,dragover:gI,drag:gI,dragstart:gI,dragend:gI,dragchange:gI,droprequest:gI},properties:{paddingTop:{check:gE,init:0,apply:gc,themeable:true},paddingRight:{check:gE,init:0,apply:gc,themeable:true},paddingBottom:{check:gE,init:0,apply:gc,themeable:true},paddingLeft:{check:gE,init:0,apply:gc,themeable:true},padding:{group:[eU,gm,gl,fq],mode:gh,themeable:true},zIndex:{nullable:true,init:null,apply:fo,event:fj,check:gE,themeable:true},decorator:{nullable:true,init:null,apply:ff,event:fP,check:gA,themeable:true},shadow:{nullable:true,init:null,apply:hf,event:gW,check:gA,themeable:true},backgroundColor:{nullable:true,check:eM,apply:gY,event:gq,themeable:true},textColor:{nullable:true,check:eM,apply:fJ,event:eY,themeable:true,inheritable:true},font:{nullable:true,apply:fm,check:hg,event:fg,themeable:true,inheritable:true},opacity:{check:fs,apply:fB,themeable:true,nullable:true,init:null},cursor:{check:fX,apply:eW,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:gj,nullable:true},toolTipText:{check:fX,nullable:true,event:eP,apply:fM},toolTipIcon:{check:fX,nullable:true,event:eP},visibility:{check:[gH,fY,gD],init:gH,apply:fx,event:gT},enabled:{init:true,check:gJ,inheritable:true,apply:ft,event:fh},anonymous:{init:false,check:gJ},tabIndex:{check:gE,nullable:true,apply:fQ},focusable:{check:gJ,init:false,apply:gX},keepFocus:{check:gJ,init:false,apply:gn},keepActive:{check:gJ,init:false,apply:fr},draggable:{check:gJ,init:false,apply:fa},droppable:{check:gJ,init:false,apply:fc},selectable:{check:gJ,init:false,event:fD,apply:fu},contextMenu:{check:fK,apply:ge,nullable:true,event:eV},nativeContextMenu:{check:gJ,init:false,themeable:true,event:gk,apply:eS},appearance:{check:fX,init:fO,apply:fz,event:fR}},statics:{DEBUG:false,getWidgetByElement:function(eI){try{while(eI){var eJ=eI.$$widget;
if(eJ!=null){return qx.core.ObjectRegistry.fromHashCode(eJ);
}eI=eI.parentNode;
}}catch(X){}return null;
},contains:function(parent,cX){while(cX){if(parent==cX){return true;
}cX=cX.getLayoutParent();
}return false;
},__eh:{},__ei:{}},members:{__ef:null,__eg:null,__ej:null,__ek:null,__el:null,__em:null,__en:null,__eo:null,_getLayout:function(){return this.__eo;
},_setLayout:function(k){{};

if(this.__eo){this.__eo.connectToWidget(null);
}
if(k){k.connectToWidget(this);
}this.__eo=k;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}
if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(this.__ef);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(this.__ef);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},__ep:null,renderLayout:function(cH,top,cI,cJ){var cU=arguments.callee.base.call(this,cH,top,cI,cJ);
if(!cU){return;
}var cL=this.__ef;
var content=this.__eg;
var cR=cU.size||this.__ep;
var cV=gL;
if(cU.position){cL.setStyle(eO,cH+cV);
cL.setStyle(eN,top+cV);
}if(cU.size){cL.setStyle(gt,cI+cV);
cL.setStyle(gN,cJ+cV);
}
if(cR||cU.local||cU.margin){var cK=this.getInsets();
var innerWidth=cI-cK.left-cK.right;
var innerHeight=cJ-cK.top-cK.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}
if(this.__ep){content.setStyle(eO,cK.left+cV);
content.setStyle(eN,cK.top+cV);
}
if(cR){content.setStyle(gt,innerWidth+cV);
content.setStyle(gN,innerHeight+cV);
}
if(cU.size){var cT=this.__el;

if(cT){cT.setStyles({width:cI+gL,height:cJ+gL});
}}
if(cU.size||this.__ep){var cO=qx.theme.manager.Decoration.getInstance();
var cW=this.getDecorator();

if(cW){var cP=this.__ej;
var cQ=cO.resolve(cW);
cQ.resize(cP.getDomElement(),cI,cJ);
}}
if(cU.size){var cS=this.getShadow();

if(cS){var cP=this.__ek;
var cQ=cO.resolve(cS);
var cK=cQ.getInsets();
var cN=cI+cK.left+cK.right;
var cM=cJ+cK.top+cK.bottom;
cQ.resize(cP.getDomElement(),cN,cM);
}}
if(cR||cU.local||cU.margin){if(this.__eo&&this.hasLayoutChildren()){this.__eo.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(cU.position&&this.hasListener(gv)){this.fireDataEvent(gv,this.getBounds());
}
if(cU.size&&this.hasListener(gB)){this.fireDataEvent(gB,this.getBounds());
}delete this.__ep;
},__eq:null,clearSeparators:function(){var bv=this.__eq;

if(!bv){return;
}var bw=qx.ui.core.Widget.__eh;
var content=this.__eg;
var bu,bt;

for(var i=0,l=bv.length;i<l;i++){bt=bv[i];
bu=bt.$$separator;
if(!bw[bu]){bw[bu]=[bt];
}else{bw[bu].push(bt);
}content.remove(bt);
}bv.length=0;
},renderSeparator:function(dx,dy){var dF=qx.ui.core.Widget.__eh;
var dD=qx.theme.manager.Decoration.getInstance();

if(typeof dx==gC){var dE=dx.toHashCode();
var dA=dx;
}else{var dE=dx;
var dA=dD.resolve(dx);
}var dB=dF[dx];

if(dB&&dB.length>0){var dC=dB.pop();
}else{var dC=this.__ew(dA);
}this.__eg.add(dC);
dA.resize(dC.getDomElement(),dy.width,dy.height);
var dz=dC.getDomElement().style;
dz.left=dy.left+gL;
dz.top=dy.top+gL;
if(!this.__eq){this.__eq=[dC];
}else{this.__eq.push(dC);
}dC.$$separator=dE;
},_computeSizeHint:function(){var er=this.getWidth();
var eq=this.getMinWidth();
var em=this.getMaxWidth();
var ep=this.getHeight();
var en=this.getMinHeight();
var eo=this.getMaxHeight();
var es=this._getContentHint();
var ek=this.getInsets();
var eu=ek.left+ek.right;
var et=ek.top+ek.bottom;

if(er==null){er=es.width+eu;
}
if(ep==null){ep=es.height+et;
}
if(eq==null){eq=eu;

if(es.minWidth!=null){eq+=es.minWidth;
}}
if(en==null){en=et;

if(es.minHeight!=null){en+=es.minHeight;
}}
if(em==null){if(es.maxWidth==null){em=Infinity;
}else{em=es.maxWidth+eu;
}}
if(eo==null){if(es.maxHeight==null){eo=Infinity;
}else{eo=es.maxHeight+et;
}}return {width:er,minWidth:eq,maxWidth:em,height:ep,minHeight:en,maxHeight:eo};
},invalidateLayoutCache:function(){arguments.callee.base.call(this);

if(this.__eo){this.__eo.invalidateLayoutCache();
}},_getContentHint:function(){var cg=this.__eo;

if(cg){if(this.hasLayoutChildren()){var cf;
var ch=cg.getSizeHint();
{};
return ch;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(dp){var dt=this.getInsets();
var dw=dt.left+dt.right;
var dv=dt.top+dt.bottom;
var du=dp-dw;
var dr=this._getLayout();

if(dr&&dr.hasHeightForWidth()){var dq=dr.getHeightForWidth(dp);
}else{dq=this._getContentHeightForWidth(du);
}var ds=dq+dv;
return ds;
},_getContentHeightForWidth:function(y){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var bN=this.getPaddingRight();
var bO=this.getPaddingBottom();
var bT=this.getPaddingLeft();
var bS=this.getDecorator();

if(bS){var bR=qx.theme.manager.Decoration.getInstance();
var bQ=bR.resolve(bS);
var bP=bQ.getInsets();
{};
top+=bP.top;
bN+=bP.right;
bO+=bP.bottom;
bT+=bP.left;
}return {"top":top,"right":bN,"bottom":bO,"left":bT};
},getInnerSize:function(){var r=this.getBounds();

if(!r){return null;
}var q=this.getInsets();
return {width:r.width-q.left-q.right,height:r.height-q.top-q.bottom};
},show:function(){this.setVisibility(gH);
},hide:function(){this.setVisibility(fY);
},exclude:function(){this.setVisibility(gD);
},isVisible:function(){return this.getVisibility()===gH;
},isHidden:function(){return this.getVisibility()!==gH;
},isExcluded:function(){return this.getVisibility()===gD;
},isSeeable:function(){var dN=this.getContainerElement().getDomElement();

if(dN){return dN.offsetWidth>0;
}var dM=this;

do{if(!dM.isVisible()){return false;
}
if(dM.isRootWidget()){return true;
}dM=dM.getLayoutParent();
}while(dM);
return false;
},_createContainerElement:function(){var bb=new qx.html.Element(gU);
{};
bb.setStyle(gz,fU);
bb.setStyle(ga,0);
bb.setAttribute(gs,this.toHashCode());
{};
return bb;
},__er:function(){var bm=this._createContentElement();
{};
bm.setStyle(gz,fU);
bm.setStyle(ga,10);
return bm;
},_createContentElement:function(){var j=new qx.html.Element(gU);
j.setStyle(fA,fY);
j.setStyle(fi,fY);
return j;
},getContainerElement:function(){return this.__ef;
},getContentElement:function(){return this.__eg;
},getDecoratorElement:function(){return this.__ej;
},__es:null,getLayoutChildren:function(){var bH=this.__es;

if(!bH){return this.__et;
}var bI;

for(var i=0,l=bH.length;i<l;i++){var bG=bH[i];

if(bG.hasUserBounds()||bG.isExcluded()){if(bI==null){bI=bH.concat();
}qx.lang.Array.remove(bI,bG);
}}return bI||bH;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var Y=this.__eo;

if(Y){Y.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var V=this.__es;

if(!V){return false;
}var W;

for(var i=0,l=V.length;i<l;i++){W=V[i];

if(!W.hasUserBounds()&&!W.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__et:[],_getChildren:function(){return this.__es||this.__et;
},_indexOf:function(cY){var da=this.__es;

if(!da){return -1;
}return da.indexOf(cY);
},_hasChildren:function(){var hB=this.__es;
return hB!=null&&(!!hB[0]);
},addChildrenToQueue:function(cE){var cF=this.__es;

if(!cF){return;
}var cG;

for(var i=0,l=cF.length;i<l;i++){cG=cF[i];
cE[cG.$$hash]=cG;
cG.addChildrenToQueue(cE);
}},_add:function(u,v){if(u.getLayoutParent()==this){qx.lang.Array.remove(this.__es,u);
}
if(this.__es){this.__es.push(u);
}else{this.__es=[u];
}this.__eu(u,v);
},_addAt:function(bX,bY,ca){if(!this.__es){this.__es=[];
}if(bX.getLayoutParent()==this){qx.lang.Array.remove(this.__es,bX);
}var cb=this.__es[bY];

if(cb===bX){return bX.setLayoutProperties(ca);
}
if(cb){qx.lang.Array.insertBefore(this.__es,bX,cb);
}else{this.__es.push(bX);
}this.__eu(bX,ca);
},_addBefore:function(dV,dW,dX){{};

if(dV==dW){return;
}
if(!this.__es){this.__es=[];
}if(dV.getLayoutParent()==this){qx.lang.Array.remove(this.__es,dV);
}qx.lang.Array.insertBefore(this.__es,dV,dW);
this.__eu(dV,dX);
},_addAfter:function(cy,cz,cA){{};

if(cy==cz){return;
}
if(!this.__es){this.__es=[];
}if(cy.getLayoutParent()==this){qx.lang.Array.remove(this.__es,cy);
}qx.lang.Array.insertAfter(this.__es,cy,cz);
this.__eu(cy,cA);
},_remove:function(dR){if(!this.__es){return;
}qx.lang.Array.remove(this.__es,dR);
this.__ev(dR);
},_removeAt:function(bp){if(!this.__es){throw new Error("This widget has no children!");
}var bq=this.__es[bp];
qx.lang.Array.removeAt(this.__es,bp);
this.__ev(bq);
return bq;
},_removeAll:function(){if(!this.__es){return;
}var eB=this.__es.concat();
this.__es.length=0;

for(var i=eB.length-1;i>=0;i--){this.__ev(eB[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__eu:function(eE,eF){{};
var parent=eE.getLayoutParent();

if(parent&&parent!=this){parent._remove(eE);
}eE.setLayoutParent(this);
if(eF){eE.setLayoutProperties(eF);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(eE);
}},__ev:function(ba){{};
ba.setLayoutParent(null);
if(this.__eo){this.__eo.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(ba);
}},capture:function(){this.__ef.capture();
},releaseCapture:function(){this.__ef.releaseCapture();
},_applyPadding:function(ct,cu,name){this.__ep=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__el){return;
}var hj=this.__el=new qx.html.Element;
{};
hj.setStyles({position:fU,top:0,left:0,zIndex:7});
var hk=this.getBounds();

if(hk){this.__el.setStyles({width:hk.width+gL,height:hk.height+gL});
}if(qx.core.Variant.isSet(gP,gQ)){hj.setStyles({backgroundImage:fC+qx.util.ResourceManager.getInstance().toUri(gp)+fH,backgroundRepeat:fv});
}this.__ef.add(hj);
},__ew:function(m){var n=new qx.html.Element;
n.setStyles({position:fU,top:0,left:0});
{};
n.useMarkup(m.getMarkup());
return n;
},_applyDecorator:function(hl,hm){var hu=qx.ui.core.Widget.__eh;
var hr=qx.theme.manager.Decoration.getInstance();
var hn=this.__ef;
var hp=this.__ej;
if(!this.__el){this._createProtectorElement();
}var hs;

if(hm){if(typeof hm===gC){hs=hm.toHashCode();
}else{hs=hm;
hm=hr.resolve(hm);
}}var ht;

if(hl){if(typeof hl===gC){ht=hl.toHashCode();
{};
}else{ht=hl;
hl=hr.resolve(hl);
}}if(hm){if(!hu[hs]){hu[hs]=[];
}hn.remove(hp);
hu[hs].push(hp);
}if(hl){if(hu[ht]&&hu[ht].length>0){hp=hu[ht].pop();
}else{hp=this.__ew(hl);
hp.setStyle(ga,5);
}var ho=this.getBackgroundColor();
hl.tint(hp.getDomElement(),ho);
hn.add(hp);
this.__ej=hp;
}else{delete this.__ej;
this._applyBackgroundColor(this.getBackgroundColor());
}if(hl&&!hm&&ho){this.getContainerElement().setStyle(fT,null);
}if(qx.ui.decoration.Util.insetsModified(hm,hl)){this.__ep=true;
qx.ui.core.queue.Layout.add(this);
}else if(hl){var hq=this.getBounds();

if(hq){hr.resolve(hl).resize(hp.getDomElement(),hq.width,hq.height);
this.__el.setStyles({width:hq.width+gL,height:hq.height+gL});
}}},_applyShadow:function(C,D){var N=qx.ui.core.Widget.__ei;
var K=qx.theme.manager.Decoration.getInstance();
var F=this.__ef;
var L;

if(D){if(typeof D===gC){L=D.toHashCode();
}else{L=D;
D=K.resolve(D);
}}var M;

if(C){if(typeof C===gC){M=C.toHashCode();
}else{M=C;
C=K.resolve(C);
}}if(D){if(!N[L]){N[L]=[];
}F.remove(this.__ek);
N[L].push(this.__ek);
}if(C){var H;

if(N[M]&&N[M].length>0){H=N[M].pop();
}else{H=this.__ew(C);
}F.add(H);
this.__ek=H;
var J=C.getInsets();
H.setStyles({left:(-J.left)+gL,top:(-J.top)+gL});
var I=this.getBounds();

if(I){var G=I.width+J.left+J.right;
var E=I.height+J.top+J.bottom;
C.resize(H.getDomElement(),G,E);
}C.tint(H.getDomElement(),null);
}else{delete this.__ek;
}},_applyToolTipText:function(hw,hx){if(qx.core.Variant.isSet(gx,gF)){if(this.__en){return;
}var hy=qx.locale.Manager.getInstance();
this.__en=hy.addListener(gr,function(){if(hw&&hw.translate){this.setToolTipText(hw.translate());
}},this);
}},_applyTextColor:function(co,cp){},_applyZIndex:function(bL,bM){this.__ef.setStyle(ga,bL==null?0:bL);
},_applyVisibility:function(dG,dH){if(dG===gH){this.__ef.show();
}else{this.__ef.hide();
}var parent=this.$$parent;

if(parent&&(dH==null||dG==null||dH===gD||dG===gD)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(a,b){this.__ef.setStyle(eK,a==1?null:a);
if(qx.core.Variant.isSet(gP,gQ)){if(!qx.Class.isSubClassOf(this.__eg.constructor,qx.html.Image)){var c=(a==1||a==null)?null:0.99;
this.__eg.setStyle(eK,c);
}}},_applyCursor:function(cm,cn){if(cm==null&&!this.isSelectable()){cm=eL;
}this.__ef.setStyle(fl,cm,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(bx,by){var bE=this.getDecorator();
var bB=this.getBackgroundColor();
var bA=this.__ef;

if(bE){var bC=this.__ej;

if(bC){var bD=qx.theme.manager.Decoration.getInstance().resolve(bE);
bD.tint(this.__ej.getDomElement(),bB);
}bA.setStyle(fT,null);
}else{var bz=qx.theme.manager.Color.getInstance().resolve(bB);
bA.setStyle(fT,bz);
}},_applyFont:function(eC,eD){},__ex:null,$$stateChanges:null,_forwardStates:null,hasState:function(s){var t=this.__ex;
return t&&t[s];
},addState:function(dY){var ea=this.__ex;

if(!ea){ea=this.__ex={};
}
if(ea[dY]){return;
}this.__ex[dY]=true;
if(dY===gR){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var ed=this.__eA;

if(forward&&forward[dY]&&ed){var eb;

for(var ec in ed){eb=ed[ec];

if(eb instanceof qx.ui.core.Widget){ed[ec].addState(dY);
}}}},removeState:function(P){var Q=this.__ex;

if(!Q||!Q[P]){return;
}delete this.__ex[P];
if(P===gR){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var T=this.__eA;

if(forward&&forward[P]&&T){for(var S in T){var R=T[S];

if(R instanceof qx.ui.core.Widget){R.removeState(P);
}}}},replaceState:function(de,df){var dg=this.__ex;

if(!dg){dg=this.__ex={};
}
if(!dg[df]){dg[df]=true;
}
if(dg[de]){delete dg[de];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var dj=this.__eA;

if(forward&&forward[df]&&dj){for(var di in dj){var dh=dj[di];

if(dh instanceof qx.ui.core.Widget){dh.replaceState(de,df);
}}}},__ey:null,__ez:null,syncAppearance:function(){var bg=this.__ex;
var bf=this.__ey;
var bh=qx.theme.manager.Appearance.getInstance();
var bd=qx.core.Property.$$method.setThemed;
var bl=qx.core.Property.$$method.resetThemed;
if(this.__ez){delete this.__ez;
if(bf){var bc=bh.styleFrom(bf,bg,null,this.getAppearance());
if(bc){bf=null;
}}}if(!bf){var be=this;
var bk=[];

do{bk.push(be.$$subcontrol||be.getAppearance());
}while(be=be.$$subparent);
bf=this.__ey=bk.reverse().join(gg).replace(/#[0-9]+/g,gf);
}var bi=bh.styleFrom(bf,bg,null,this.getAppearance());

if(bi){var bj;
var bj;

if(bc){for(var bj in bc){if(bi[bj]===undefined){this[bl[bj]]();
}}}{};
{};

for(var bj in bi){bi[bj]===undefined?this[bl[bj]]():this[bd[bj]](bi[bj]);
}}else if(bc){for(var bj in bc){this[bl[bj]]();
}}this.fireDataEvent(fp,this.__ex);
},_applyAppearance:function(ei,ej){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__em){qx.ui.core.queue.Appearance.add(this);
this.__em=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__ez=true;
qx.ui.core.queue.Appearance.add(this);
var dQ=this.__eA;

if(dQ){var dO;

for(var dP in dQ){dO=dQ[dP];

if(dO instanceof qx.ui.core.Widget){dO.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var cc=this;

while(cc.getAnonymous()){cc=cc.getLayoutParent();

if(!cc){return null;
}}return cc;
},getFocusTarget:function(){var bU=this;

if(!bU.getEnabled()){return null;
}
while(bU.getAnonymous()||!bU.getFocusable()){bU=bU.getLayoutParent();

if(!bU||!bU.getEnabled()){return null;
}}return bU;
},getFocusElement:function(){return this.__ef;
},isTabable:function(){return this.getContainerElement().getDomElement()&&this.isFocusable();
},_applyFocusable:function(dI,dJ){var dK=this.getFocusElement();
if(dI){var dL=this.getTabIndex();

if(dL==null){dL=1;
}dK.setAttribute(fW,dL);
if(qx.core.Variant.isSet(gP,gQ)){dK.setAttribute(fE,fN);
}else{dK.setStyle(fG,fF);
}}else{if(dK.isNativelyFocusable()){dK.setAttribute(fW,-1);
}else if(dJ){dK.setAttribute(fW,null);
}}},_applyKeepFocus:function(dm){var dn=this.getFocusElement();
dn.setAttribute(go,dm?gF:null);
},_applyKeepActive:function(bJ){var bK=this.getContainerElement();
bK.setAttribute(gi,bJ?gF:null);
},_applyTabIndex:function(db){if(db==null){db=1;
}else if(db<1||db>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&db!=null){this.getFocusElement().setAttribute(fW,db);
}},_applySelectable:function(dU){this._applyCursor(this.getCursor());
this.__ef.setSelectable(dU);
this.__eg.setSelectable(dU);
},_applyEnabled:function(hF,hG){if(hF===false){this.addState(gV);
this.removeState(gR);
if(this.isFocusable()){this.removeState(gS);
this._applyFocusable(false,true);
}}else{this.removeState(gV);
if(this.isFocusable()){this._applyFocusable(true,false);
}}},_applyNativeContextMenu:function(hh,hi,name){},_applyContextMenu:function(bn,bo){if(bo){bo.removeState(fV);

if(bo.getOpener()==this){bo.resetOpener();
}
if(!bn){this.removeListener(fV,this._onContextMenuOpen);
bo.removeListener(gT,this._onBeforeContextMenuOpen,this);
}}
if(bn){bn.setOpener(this);
bn.addState(fV);

if(!bo){this.addListener(fV,this._onContextMenuOpen);
bn.addListener(gT,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){var bF=this.getContextMenu();
bF.placeToMouse(e);
bF.show();
e.preventDefault();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==gH&&this.hasListener(eQ)){this.fireDataEvent(eQ,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(hz,hA){qx.ui.core.DragDropCursor.getInstance();
if(hz){this.addListener(gu,this._onDragStart);
this.addListener(gM,this._onDrag);
this.addListener(gy,this._onDragEnd);
this.addListener(gw,this._onDragChange);
}else{this.removeListener(gu,this._onDragStart);
this.removeListener(gM,this._onDrag);
this.removeListener(gy,this._onDragEnd);
this.removeListener(gw,this._onDragChange);
}this.__ef.setAttribute(fw,hz?gF:null);
},_applyDroppable:function(g,h){this.__ef.setAttribute(fk,g?gF:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(eL);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var eG=qx.ui.core.DragDropCursor.getInstance();
var eH=e.getCurrentAction();
eH?eG.setAction(eH):eG.resetAction();
},visualizeFocus:function(){this.addState(gS);
},visualizeBlur:function(){this.removeState(gS);
},scrollChildIntoView:function(ci,cj,ck,cl){this.scrollChildIntoViewX(ci,cj,cl);
this.scrollChildIntoViewY(ci,ck,cl);
},scrollChildIntoViewX:function(cB,cC,cD){this.__eg.scrollChildIntoViewX(cB.getContainerElement(),cC,cD);
},scrollChildIntoViewY:function(z,A,B){this.__eg.scrollChildIntoViewY(z.getContainerElement(),A,B);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.__ef.activate();
},deactivate:function(){this.__ef.deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},_hasChildControl:function(cq){qx.log.Logger.deprecatedMethodWarning(arguments.callee,fL);
return this.hasChildControl(cq);
},hasChildControl:function(hv){if(!this.__eA){return false;
}return !!this.__eA[hv];
},__eA:null,_getCreatedChildControls:function(){return this.__eA;
},_getChildControl:function(dc,dd){qx.log.Logger.deprecatedMethodWarning(arguments.callee,eR);
return this.getChildControl(dc,dd);
},getChildControl:function(cv,cw){if(!this.__eA){if(cw){return null;
}this.__eA={};
}var cx=this.__eA[cv];

if(cx){return cx;
}
if(cw===true){return null;
}return this._createChildControl(cv);
},_showChildControl:function(w){var x=this.getChildControl(w);
x.show();
return x;
},_excludeChildControl:function(br){var bs=this.getChildControl(br,true);

if(bs){bs.exclude();
}},_isChildControlVisible:function(d){var f=this.getChildControl(d,true);

if(f){return f.isVisible();
}return false;
},_createChildControl:function(ev){if(!this.__eA){this.__eA={};
}else if(this.__eA[ev]){throw new Error("Child control '"+ev+"' already created!");
}var eA=ev.indexOf(eX);

if(eA==-1){var ew=this._createChildControlImpl(ev);
}else{var ew=this._createChildControlImpl(ev.substring(0,eA));
}
if(!ew){throw new Error("Unsupported control: "+ev);
}ew.$$subcontrol=ev;
ew.$$subparent=this;
var ey=this.__ex;
var forward=this._forwardStates;

if(ey&&forward&&ew instanceof qx.ui.core.Widget){for(var ez in ey){if(forward[ez]){ew.addState(ez);
}}}this.fireDataEvent(hb,ew);
return this.__eA[ev]=ew;
},_createChildControlImpl:function(O){return null;
},_disposeChildControls:function(){var eh=this.__eA;

if(!eh){return;
}var ef=qx.ui.core.Widget;

for(var eg in eh){var ee=eh[eg];

if(!ef.contains(this,ee)){ee.destroy();
}else{ee.dispose();
}}delete this.__eA;
},_findTopControl:function(){var U=this;

while(U){if(!U.$$subparent){return U;
}U=U.$$subparent;
}return null;
},getContainerLocation:function(dk){var dl=this.getContainerElement().getDomElement();
return dl?qx.bom.element.Location.get(dl,dk):null;
},getContentLocation:function(o){var p=this.getContentElement().getDomElement();
return p?qx.bom.element.Location.get(p,o):null;
},setDomLeft:function(cd){var ce=this.getContainerElement().getDomElement();

if(ce){ce.style.left=cd+gL;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(bV){var bW=this.getContainerElement().getDomElement();

if(bW){bW.style.top=bV+gL;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(dS,top){var dT=this.getContainerElement().getDomElement();

if(dT){dT.style.left=dS+gL;
dT.style.top=top+gL;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var cr=arguments.callee.base.call(this);

if(this.getChildren){var cs=this.getChildren();

for(var i=0,l=cs.length;i<l;i++){cr.add(cs[i].clone());
}}return cr;
},serialize:function(){var hD=arguments.callee.base.call(this);

if(this.getChildren){var hE=this.getChildren();

if(hE.length>0){hD.children=[];

for(var i=0,l=hE.length;i<l;i++){hD.children.push(hE[i].serialize());
}}}
if(this.getLayout){var hC=this.getLayout();

if(hC){hD.layout=hC.serialize();
}}return hD;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(gx,gF)){if(this.__en){qx.locale.Manager.getInstance().removeListenerById(this.__en);
}}this.__ef.setAttribute(gs,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}this._disposeArray(hd);
this._disposeArray(fd);
this._disposeFields(fe,fb);
this._disposeObjects(eT,ha,fy,he,fn,fS);
}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.container.Composite",b="addChildWidget",a="removeChildWidget";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(e){arguments.callee.base.call(this);

if(e!=null){this._setLayout(e);
}},events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(i){this.fireNonBubblingEvent(b,qx.event.type.Data,[i]);
},_afterRemoveChild:function(h){this.fireNonBubblingEvent(a,qx.event.type.Data,[h]);
}},defer:function(f,g){qx.ui.core.MChildrenHandling.remap(g);
qx.ui.core.MLayoutHandling.remap(g);
}});
})();
(function(){var A="interval",z="Integer",y="resize",x="Boolean",w="mouse",v="disappear",u="bottom-left",t="widget",s="offsetLeft",r="offsetRight",k="right-top",q="top-right",n="top-left",i="bottom-right",h="right-bottom",m="offsetBottom",l="qx.ui.core.MPlacement",o="left-top",g="left-bottom",p="shorthand",j="offsetTop";
qx.Mixin.define(l,{properties:{position:{check:[n,q,u,i,o,g,k,h],init:u,themeable:true},placeMethod:{check:[t,w],init:w,themeable:true},domMove:{check:x,init:false},smart:{check:x,init:true,themeable:true},offsetLeft:{check:z,init:0,themeable:true},offsetTop:{check:z,init:0,themeable:true},offsetRight:{check:z,init:0,themeable:true},offsetBottom:{check:z,init:0,themeable:true},offset:{group:[j,r,m,s],mode:p,themeable:true}},members:{__eB:null,__eC:null,getLayoutLocation:function(L){var O,N,P,top;
N=L.getBounds();
P=N.left;
top=N.top;
var Q=N;
L=L.getLayoutParent();

while(L&&!L.isRootWidget()){N=L.getBounds();
P+=N.left;
top+=N.top;
O=L.getInsets();
P+=O.left;
top+=O.top;
L=L.getLayoutParent();
}if(L.isRootWidget()){var M=L.getContainerLocation();

if(M){P+=M.left;
top+=M.top;
}}return {left:P,top:top,right:P+Q.width,bottom:top+Q.height};
},moveTo:function(B,top){if(this.getDomMove()){this.setDomPosition(B,top);
}else{this.setLayoutProperties({left:B,top:top});
}},placeToWidget:function(a,b){if(b){this.__eC=qx.lang.Function.bind(this.placeToWidget,this,a,false);
qx.event.Idle.getInstance().addListener(A,this.__eC);
this.addListener(v,function(){if(this.__eC){qx.event.Idle.getInstance().removeListener(A,this.__eC);
this.__eC=null;
}},this);
}var c=a.getContainerLocation()||this.getLayoutLocation(a);
this.__eD(c);
},placeToMouse:function(event){var D=event.getDocumentLeft();
var top=event.getDocumentTop();
var C={left:D,top:top,right:D,bottom:top};
this.__eD(C);
},placeToElement:function(d,e){var location=qx.bom.element.Location.get(d);
var f={left:location.left,top:location.top,right:location.left+d.offsetWidth,bottom:location.top+d.offsetHeight};
if(e){this.__eC=qx.lang.Function.bind(this.placeToElement,this,d,false);
qx.event.Idle.getInstance().addListener(A,this.__eC);
this.addListener(v,function(){if(this.__eC){qx.event.Idle.getInstance().removeListener(A,this.__eC);
this.__eC=null;
}},this);
}this.__eD(f);
},placeToPoint:function(R){var S={left:R.left,top:R.top,right:R.left,bottom:R.top};
this.__eD(S);
},__eD:function(E){var K=this.getBounds();

if(K==null){if(!this.__eB){this.addListener(y,this.__eD);
}this.__eB=E;
return;
}else if(this.__eB){E=this.__eB;
delete this.__eB;
this.removeListener(y,this.__eD);
}var F=this.getLayoutParent().getBounds();
var I=this.getPosition();
var J=this.getSmart();
var G={left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
var H=qx.util.PlaceUtil.compute(K,F,E,I,J,G);
this.moveTo(H.left,H.top);
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
(function(){var t="atom",s="Integer",r="String",q="_applyRich",p="qx.ui.tooltip.ToolTip",o="_applyIcon",n="tooltip",m="qx.ui.core.Widget",l="Boolean",k="_applyLabel";
qx.Class.define(p,{extend:qx.ui.popup.Popup,construct:function(c,d){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(t);
if(c!=null){this.setLabel(c);
}
if(d!=null){this.setIcon(d);
}},properties:{appearance:{refine:true,init:n},showTimeout:{check:s,init:700,themeable:true},hideTimeout:{check:s,init:4000,themeable:true},label:{check:r,nullable:true,apply:k},icon:{check:r,nullable:true,apply:o,themeable:true},rich:{check:l,init:false,apply:q},opener:{check:m,nullable:true}},members:{_createChildControlImpl:function(a){var b;

switch(a){case t:b=new qx.ui.basic.Atom;
this._add(b);
break;
}return b||arguments.callee.base.call(this,a);
},_applyIcon:function(h,i){var j=this.getChildControl(t);
h==null?j.resetIcon:j.setIcon(h);
},_applyLabel:function(u,v){var w=this.getChildControl(t);
u==null?w.resetLabel():w.setLabel(u);
},_applyRich:function(e,f){var g=this.getChildControl(t);
g.setRich(e);
}}});
})();
(function(){var A="qx.ui.core.queue.Layout",z="layout";
qx.Class.define(A,{statics:{__eE:{},remove:function(x){delete this.__eE[x.$$hash];
},add:function(y){this.__eE[y.$$hash]=y;
qx.ui.core.queue.Manager.scheduleFlush(z);
},flush:function(){var a=this.__eH();
for(var i=a.length-1;i>=0;i--){var b=a[i];
if(b.hasValidLayout()){continue;
}if(b.isRootWidget()&&!b.hasUserBounds()){var d=b.getSizeHint();
b.renderLayout(0,0,d.width,d.height);
}else{var c=b.getBounds();
b.renderLayout(c.left,c.top,c.width,c.height);
}}},getNestingLevel:function(t){var u=this.__eG;
var w=0;
var parent=t;
while(true){if(u[parent.$$hash]!=null){w+=u[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
w+=1;
}var v=w;

while(t&&t!==parent){u[t.$$hash]=v--;
t=t.$$parent;
}return w;
},__eF:function(){var k=qx.ui.core.queue.Visibility;
this.__eG={};
var j=[];
var h=this.__eE;
var e,g;

for(var f in h){e=h[f];

if(k.isVisible(e)){g=this.getNestingLevel(e);
if(!j[g]){j[g]={};
}j[g][f]=e;
delete h[f];
}}return j;
},__eH:function(){var o=[];
var q=this.__eF();

for(var n=q.length-1;n>=0;n--){if(!q[n]){continue;
}
for(var m in q[n]){var l=q[n][m];
if(n==0||l.isRootWidget()||l.hasUserBounds()){o.push(l);
l.invalidateLayoutCache();
continue;
}var s=l.getSizeHint(false);

if(s){l.invalidateLayoutCache();
var p=l.getSizeHint();
var r=(!l.getBounds()||s.minWidth!==p.minWidth||s.width!==p.width||s.maxWidth!==p.maxWidth||s.minHeight!==p.minHeight||s.height!==p.height||s.maxHeight!==p.maxHeight);
}else{r=true;
}
if(r){var parent=l.getLayoutParent();

if(!q[n-1]){q[n-1]={};
}q[n-1][parent.$$hash]=parent;
}else{o.push(l);
}}}return o;
}}});
})();
(function(){var l="qx.event.handler.UserAction",k="__eI",j="__eJ";
qx.Class.define(l,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(m){arguments.callee.base.call(this);
this.__eI=m;
this.__eJ=m.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eI:null,__eJ:null,canHandleEvent:function(g,h){},registerEvent:function(a,b,c){},unregisterEvent:function(d,e,f){}},destruct:function(){this._disposeFields(k,j);
},defer:function(i){qx.event.Registration.addHandler(i);
}});
})();
(function(){var f="__eL",e="qx.util.DeferredCallManager",d="__eK",c="singleton";
qx.Class.define(e,{extend:qx.core.Object,type:c,construct:function(){this.__eK={};
this.__eL=qx.lang.Function.bind(this.__eP,this);
this.__eM=false;
},members:{__eN:null,__eO:null,__eK:null,__eM:null,__eL:null,schedule:function(a){if(this.__eN==null){this.__eN=window.setTimeout(this.__eL,0);
}var b=a.toHashCode();
if(this.__eO&&this.__eO[b]){return;
}this.__eK[b]=a;
this.__eM=true;
},cancel:function(i){var j=i.toHashCode();
if(this.__eO&&this.__eO[j]){this.__eO[j]=null;
return;
}delete this.__eK[j];
if(qx.lang.Object.isEmpty(this.__eK)&&this.__eN!=null){window.clearTimeout(this.__eN);
this.__eN=null;
}},__eP:qx.event.GlobalError.observeMethod(function(){this.__eN=null;
while(this.__eM){this.__eO=qx.lang.Object.clone(this.__eK);
this.__eK={};
this.__eM=false;

for(var h in this.__eO){var g=this.__eO[h];

if(g){this.__eO[h]=null;
g.call();
}}}this.__eO=null;
})},destruct:function(){if(this.__eN!=null){window.clearTimeout(this.__eN);
}this._disposeFields(f,d);
}});
})();
(function(){var h="qx.util.DeferredCall",g="__eQ",f="__eS",e="__eR";
qx.Class.define(h,{extend:qx.core.Object,construct:function(a,b){arguments.callee.base.call(this);
this.__eQ=a;
this.__eR=b||null;
this.__eS=qx.util.DeferredCallManager.getInstance();
},members:{__eQ:null,__eR:null,__eS:null,cancel:function(){this.__eS.cancel(this);
},schedule:function(){this.__eS.schedule(this);
},call:function(){this.__eR?this.__eQ.apply(this.__eR):this.__eQ();
}},destruct:function(c,d){this.cancel();
this._disposeFields(e,g,f);
}});
})();
(function(){var dD="element",dC="qx.client",dB="div",dA="",dz="mshtml",dy="none",dx="__fb",dw="qx.html.Element",dv="Use public 'clearTextSelection' instead!",du="|capture|",eg="focus",ef="blur",ee="deactivate",ed="userSelect",ec="__fl",eb="__fn",ea="Use public 'setTextSelection' instead!",dY="capture",dX="__fs",dW="releaseCapture",dK="__fq",dL="__ff",dI="qxSelectable",dJ="tabIndex",dG="off",dH="Use public 'getTextSelectionLength' instead!",dE="on",dF="activate",dM="normal",dN="__fo",dQ="__fk",dP="__fm",dS="webkit",dR="__fj",dU="|bubble|",dT="Use public 'getTextSelection' instead!",dO="__fp",dV="__fg";
qx.Class.define(dw,{extend:qx.core.Object,construct:function(C){arguments.callee.base.call(this);
this.__eT=C||dB;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__eU:{},_scheduleFlush:function(p){qx.html.Element.__fA.schedule();
},_mshtmlVisibilitySort:qx.core.Variant.select(dC,{"mshtml":function(a,b){var k=a.__fb;
var j=b.__fb;

if(k.contains(j)){return 1;
}
if(j.contains(k)){return -1;
}return 0;
},"default":null}),flush:function(){var bG;
{};
var bz=this.__eV();
var by=bz.getFocus();

if(by&&this.__fa(by)){bz.blur(by);
}var bO=bz.getActive();

if(bO&&this.__fa(bO)){qx.bom.Element.deactivate(bO);
}var bM=this.__eX();

if(bM&&this.__fa(bM)){qx.bom.Element.releaseCapture(bM);
}var bH=[];
var bJ=this._modified;

for(var bF in bJ){bG=bJ[bF];
if(bG.__fu()){if(bG.__fb&&qx.dom.Hierarchy.isRendered(bG.__fb)){bH.push(bG);
}else{{};
bG.__ft();
}delete bJ[bF];
}}
for(var i=0,l=bH.length;i<l;i++){bG=bH[i];
{};
bG.__ft();
}var bD=this._visibility;
if(qx.core.Variant.isSet(dC,dz)){var bI=[];

for(var bF in bD){bI.push(bD[bF]);
}if(bI.length>1){bI.sort(this._mshtmlVisibilitySort);
bD=this._visibility={};

for(var i=0;i<bI.length;i++){bG=bI[i];
bD[bG.$$hash]=bG;
}}}
for(var bF in bD){bG=bD[bF];
{};
bG.__fb.style.display=bG.__fe?dA:dy;
delete bD[bF];
}var scroll=this._scroll;

for(var bF in scroll){bG=scroll[bF];
var bP=bG.__fb;

if(bP&&bP.offsetWidth){var bB=true;
if(bG.__fh!=null){bG.__fb.scrollLeft=bG.__fh;
delete bG.__fh;
}if(bG.__fi!=null){bG.__fb.scrollTop=bG.__fi;
delete bG.__fi;
}var bL=bG.__ff;

if(bL!=null){var bE=bL.element.getDomElement();

if(bE&&bE.offsetWidth){qx.bom.element.Scroll.intoViewX(bE,bP,bL.align);
delete bG.__ff;
}else{bB=false;
}}var bC=bG.__fg;

if(bC!=null){var bE=bC.element.getDomElement();

if(bE&&bE.offsetWidth){qx.bom.element.Scroll.intoViewY(bE,bP,bC.align);
delete bG.__fg;
}else{bB=false;
}}if(bB){delete scroll[bF];
}}}var bA={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bN=this._actions[i];
var bK=bN.element.__fb;

if(!bK||!bA[bN.type]&&!bN.element.__fu()){continue;
}qx.bom.Element[bN.type](bK);
}this._actions=[];
for(var bF in this.__eU){var bx=this.__eU[bF];
var bP=bx.element.__fb;

if(bP){qx.bom.Selection.set(bP,bx.start,bx.end);
delete this.__eU[bF];
}}qx.event.handler.Appear.refresh();
},__eV:function(){if(!this.__eW){var dr=qx.event.Registration.getManager(window);
this.__eW=dr.getHandler(qx.event.handler.Focus);
}return this.__eW;
},__eX:function(){if(!this.__eY){var dm=qx.event.Registration.getManager(window);
this.__eY=dm.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__eY.getCaptureElement();
},__fa:function(cY){var da=qx.core.ObjectRegistry.fromHashCode(cY.$$element);
return da&&!da.__fu();
}},members:{__eT:null,__fb:null,__fc:false,__fd:true,__fe:true,__ff:null,__fg:null,__fh:null,__fi:null,__fj:null,__fk:null,__fl:null,__fm:null,__fn:null,__fo:null,__fp:null,__fq:null,__fr:null,__fs:null,_scheduleChildrenUpdate:function(){if(this.__fr){return;
}this.__fr=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
},_createDomElement:function(){return qx.bom.Element.create(this.__eT);
},__ft:function(){{};
var cW=this.__fq;

if(cW){var length=cW.length;
var cX;

for(var i=0;i<length;i++){cX=cW[i];

if(cX.__fe&&cX.__fd&&!cX.__fb){cX.__ft();
}}}
if(!this.__fb){this.__fb=this._createDomElement();
this.__fb.$$element=this.$$hash;
this._copyData(false);

if(cW&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fr){this._syncChildren();
}}delete this.__fr;
},_insertChildren:function(){var de=this.__fq;
var length=de.length;
var dg;

if(length>2){var df=document.createDocumentFragment();

for(var i=0;i<length;i++){dg=de[i];

if(dg.__fb&&dg.__fd){df.appendChild(dg.__fb);
}}this.__fb.appendChild(df);
}else{var df=this.__fb;

for(var i=0;i<length;i++){dg=de[i];

if(dg.__fb&&dg.__fd){df.appendChild(dg.__fb);
}}}},_syncChildren:function(){var cr;
var cw=qx.core.ObjectRegistry;
var cn=this.__fq;
var cu=cn.length;
var co;
var cs;
var cq=this.__fb;
var ct=cq.childNodes;
var cp=0;
var cv;
{};
for(var i=ct.length-1;i>=0;i--){cv=ct[i];
cs=cw.fromHashCode(cv.$$element);

if(!cs||!cs.__fd||cs.__fs!==this){cq.removeChild(cv);
{};
}}for(var i=0;i<cu;i++){co=cn[i];
if(co.__fd){cs=co.__fb;
cv=ct[cp];

if(!cs){continue;
}if(cs!=cv){if(cv){cq.insertBefore(cs,cv);
}else{cq.appendChild(cs);
}{};
}cp++;
}}{};
},_copyData:function(be){var bi=this.__fb;
var bh=this.__fn;

if(bh){var bf=qx.bom.element.Attribute;

for(var bj in bh){bf.set(bi,bj,bh[bj]);
}}var bh=this.__fm;

if(bh){var bg=qx.bom.element.Style;

if(be){for(var bj in bh){bg.set(bi,bj,bh[bj]);
}}else{bg.setCss(bi,bg.compile(bh));
}}var bh=this.__fo;

if(bh){for(var bj in bh){this._applyProperty(bj,bh[bj]);
}}var bh=this.__fp;

if(bh){qx.event.Registration.getManager(bi).importListeners(bi,bh);
delete this.__fp;
}},_syncData:function(){var bU=this.__fb;
var bT=qx.bom.element.Attribute;
var bR=qx.bom.element.Style;
var bS=this.__fk;

if(bS){var bX=this.__fn;

if(bX){var bV;

for(var bW in bS){bV=bX[bW];

if(bV!==undefined){bT.set(bU,bW,bV);
}else{bT.reset(bU,bW);
}}}this.__fk=null;
}var bS=this.__fj;

if(bS){var bX=this.__fm;

if(bX){var bV;

for(var bW in bS){bV=bX[bW];

if(bV!==undefined){bR.set(bU,bW,bV);
}else{bR.reset(bU,bW);
}}}this.__fj=null;
}var bS=this.__fl;

if(bS){var bX=this.__fo;

if(bX){var bV;

for(var bW in bS){this._applyProperty(bW,bX[bW]);
}}this.__fl=null;
}},__fu:function(){var ci=this;
while(ci){if(ci.__fc){return true;
}
if(!ci.__fd||!ci.__fe){return false;
}ci=ci.__fs;
}return false;
},__fv:function(c){if(c.__fs===this){throw new Error("Child is already in: "+c);
}
if(c.__fc){throw new Error("Root elements could not be inserted into other ones.");
}if(c.__fs){c.__fs.remove(c);
}c.__fs=this;
if(!this.__fq){this.__fq=[];
}if(this.__fb){this._scheduleChildrenUpdate();
}},__fw:function(bk){if(bk.__fs!==this){throw new Error("Has no child: "+bk);
}if(this.__fb){this._scheduleChildrenUpdate();
}delete bk.__fs;
},__fx:function(dk){if(dk.__fs!==this){throw new Error("Has no child: "+dk);
}if(this.__fb){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fq||null;
},getChild:function(ds){var dt=this.__fq;
return dt&&dt[ds]||null;
},hasChildren:function(){var P=this.__fq;
return P&&P[0]!==undefined;
},indexOf:function(cB){var cC=this.__fq;
return cC?cC.indexOf(cB):-1;
},hasChild:function(r){var s=this.__fq;
return s&&s.indexOf(r)!==-1;
},add:function(bm){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fv(arguments[i]);
}this.__fq.push.apply(this.__fq,arguments);
}else{this.__fv(bm);
this.__fq.push(bm);
}return this;
},addAt:function(Q,R){this.__fv(Q);
qx.lang.Array.insertAt(this.__fq,Q,R);
return this;
},remove:function(X){var Y=this.__fq;

if(!Y){return;
}
if(arguments[1]){var ba;

for(var i=0,l=arguments.length;i<l;i++){ba=arguments[i];
this.__fw(ba);
qx.lang.Array.remove(Y,ba);
}}else{this.__fw(X);
qx.lang.Array.remove(Y,X);
}return this;
},removeAt:function(dn){var dp=this.__fq;

if(!dp){throw new Error("Has no children!");
}var dq=dp[dn];

if(!dq){throw new Error("Has no child at this position!");
}this.__fw(dq);
qx.lang.Array.removeAt(this.__fq,dn);
return this;
},removeAll:function(){var F=this.__fq;

if(F){for(var i=0,l=F.length;i<l;i++){this.__fw(F[i]);
}F.length=0;
}return this;
},getParent:function(){return this.__fs||null;
},insertInto:function(parent,cm){parent.__fv(this);

if(cm==null){parent.__fq.push(this);
}else{qx.lang.Array.insertAt(this.__fq,this,cm);
}return this;
},insertBefore:function(E){var parent=E.__fs;
parent.__fv(this);
qx.lang.Array.insertBefore(parent.__fq,this,E);
return this;
},insertAfter:function(dd){var parent=dd.__fs;
parent.__fv(this);
qx.lang.Array.insertAfter(parent.__fq,this,dd);
return this;
},moveTo:function(cb){var parent=this.__fs;
parent.__fx(this);
var cc=parent.__fq.indexOf(this);

if(cc===cb){throw new Error("Could not move to same index!");
}else if(cc<cb){cb--;
}qx.lang.Array.removeAt(parent.__fq,cc);
qx.lang.Array.insertAt(parent.__fq,this,cb);
return this;
},moveBefore:function(e){var parent=this.__fs;
return this.moveTo(parent.__fq.indexOf(e));
},moveAfter:function(dc){var parent=this.__fs;
return this.moveTo(parent.__fq.indexOf(dc)+1);
},free:function(){var parent=this.__fs;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__fq){return;
}parent.__fw(this);
qx.lang.Array.remove(parent.__fq,this);
return this;
},getDomElement:function(){return this.__fb||null;
},getNodeName:function(){return this.__eT;
},setNodeName:function(name){this.__eT=name;
},setRoot:function(br){this.__fc=br;
},useMarkup:function(t){if(this.__fb){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(dC,dz)){var u=document.createElement(dB);
}else{var u=qx.html.Element.__fy;

if(!u){u=qx.html.Element.__fy=document.createElement(dB);
}}u.innerHTML=t;
this.__fb=u.firstChild;
this.__fb.$$element=this.$$hash;
this._copyData(true);
return this.__fb;
},useElement:function(q){if(this.__fb){throw new Error("Could not overwrite existing element!");
}this.__fb=q;
this.__fb.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var w=this.getAttribute(dJ);

if(w>=1){return true;
}var v=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(w>=0&&v[this.__eT]){return true;
}return false;
},setSelectable:function(cJ){this.setAttribute(dI,cJ?dE:dG);
if(qx.core.Variant.isSet(dC,dS)){this.setStyle(ed,cJ?dM:dy);
}},isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__eT];
},include:function(){if(this.__fd){return;
}delete this.__fd;

if(this.__fs){this.__fs._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__fd){return;
}this.__fd=false;

if(this.__fs){this.__fs._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__fd===true;
},show:function(){if(this.__fe){return;
}
if(this.__fb){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}if(this.__fs){this.__fs._scheduleChildrenUpdate();
}delete this.__fe;
},hide:function(){if(!this.__fe){return;
}
if(this.__fb){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}this.__fe=false;
},isVisible:function(){return this.__fe===true;
},scrollChildIntoViewX:function(cE,cF,cG){var cH=this.__fb;
var cI=cE.getDomElement();

if(cG!==false&&cH&&cH.offsetWidth&&cI&&cI.offsetWidth){qx.bom.element.Scroll.intoViewX(cI,cH,cF);
}else{this.__ff={element:cE,align:cF};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}delete this.__fh;
},scrollChildIntoViewY:function(cd,ce,cf){var cg=this.__fb;
var ch=cd.getDomElement();

if(cf!==false&&cg&&cg.offsetWidth&&ch&&ch.offsetWidth){qx.bom.element.Scroll.intoViewY(ch,cg,ce);
}else{this.__fg={element:cd,align:ce};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}delete this.__fi;
},scrollToX:function(x,cM){var cN=this.__fb;

if(cM!==true&&cN&&cN.offsetWidth){cN.scrollLeft=x;
}else{this.__fh=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}delete this.__ff;
},getScrollX:function(){var cx=this.__fb;

if(cx){return cx.scrollLeft;
}return this.__fh||0;
},scrollToY:function(y,bb){var bc=this.__fb;

if(bb!==true&&bc&&bc.offsetWidth){bc.scrollTop=y;
}else{this.__fi=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}delete this.__fg;
},getScrollY:function(){var bd=this.__fb;

if(bd){return bd.scrollTop;
}return this.__fi||0;
},getSelection:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,dT);
return this.getTextSelection();
},getSelectionLength:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,dH);
return this.getTextSelectionLength();
},setSelection:function(S,T){qx.log.Logger.deprecatedMethodWarning(arguments.callee,ea);
this.setTextSelection(S,T);
},clearSelection:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,dv);
this.clearTextSelection();
},getTextSelection:function(){var bn=this.__fb;

if(bn){return qx.bom.Selection.get(bn);
}return null;
},getTextSelectionLength:function(){var m=this.__fb;

if(m){return qx.bom.Selection.getLength(m);
}return null;
},setTextSelection:function(cy,cz){var cA=this.__fb;

if(cA){qx.bom.Selection.set(cA,cy,cz);
return;
}qx.html.Element.__eU[this.toHashCode()]={element:this,start:cy,end:cz};
qx.html.Element._scheduleFlush(dD);
},clearTextSelection:function(){var bQ=this.__fb;

if(bQ){qx.bom.Selection.clear(bQ);
}delete qx.html.Element.__eU[this.toHashCode()];
},__fz:function(bY){var ca=qx.html.Element._actions;
ca.push({type:bY,element:this});
qx.html.Element._scheduleFlush(dD);
},focus:function(){this.__fz(eg);
},blur:function(){this.__fz(ef);
},activate:function(){this.__fz(dF);
},deactivate:function(){this.__fz(ee);
},capture:function(){this.__fz(dY);
},releaseCapture:function(){this.__fz(dW);
},setStyle:function(G,H,I){if(!this.__fm){this.__fm={};
}
if(this.__fm[G]==H){return;
}
if(H==null){delete this.__fm[G];
}else{this.__fm[G]=H;
}if(this.__fb){if(I){qx.bom.element.Style.set(this.__fb,G,H);
return this;
}if(!this.__fj){this.__fj={};
}this.__fj[G]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}return this;
},setStyles:function(z,A){for(var B in z){this.setStyle(B,z[B],A);
}return this;
},removeStyle:function(f,g){this.setStyle(f,null,g);
},getStyle:function(D){return this.__fm?this.__fm[D]:null;
},getAllStyles:function(){return this.__fm||null;
},setAttribute:function(cj,ck,cl){if(!this.__fn){this.__fn={};
}
if(this.__fn[cj]==ck){return;
}
if(ck==null){delete this.__fn[cj];
}else{this.__fn[cj]=ck;
}if(this.__fb){if(cl){qx.bom.element.Attribute.set(this.__fb,cj,ck);
return this;
}if(!this.__fk){this.__fk={};
}this.__fk[cj]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}return this;
},setAttributes:function(dh,di){for(var dj in dh){this.setAttribute(dj,dh[dj],di);
}return this;
},removeAttribute:function(cK,cL){this.setAttribute(cK,null,cL);
},getAttribute:function(h){return this.__fn?this.__fn[h]:null;
},_applyProperty:function(name,dl){},_setProperty:function(U,V,W){if(!this.__fo){this.__fo={};
}
if(this.__fo[U]==V){return;
}
if(V==null){delete this.__fo[U];
}else{this.__fo[U]=V;
}if(this.__fb){if(W){this._applyProperty(U,V);
return this;
}if(!this.__fl){this.__fl={};
}this.__fl[U]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(dD);
}return this;
},_removeProperty:function(n,o){this._setProperty(n,null,o);
},_getProperty:function(bo){var bp=this.__fo;

if(!bp){return null;
}var bq=bp[bo];
return bq==null?null:bq;
},addListener:function(J,K,self,L){var M;

if(this.$$disposed){return null;
}{};

if(this.__fb){return qx.event.Registration.addListener(this.__fb,J,K,self,L);
}
if(!this.__fp){this.__fp={};
}
if(L==null){L=false;
}var N=qx.event.Manager.getNextUniqueId();
var O=J+(L?du:dU)+N;
this.__fp[O]={type:J,listener:K,self:self,capture:L,unique:N};
return O;
},removeListener:function(cO,cP,self,cQ){var cR;

if(this.$$disposed){return null;
}{};

if(this.__fb){qx.event.Registration.removeListener(this.__fb,cO,cP,self,cQ);
}else{var cT=this.__fp;
var cS;

if(cQ==null){cQ=false;
}
for(var cU in cT){cS=cT[cU];
if(cS.listener===cP&&cS.self===self&&cS.capture===cQ&&cS.type===cO){delete cT[cU];
break;
}}}return this;
},removeListenerById:function(d){if(this.$$disposed){return null;
}
if(this.__fb){qx.event.Registration.removeListenerById(this.__fb,d);
}else{delete this.__fp[d];
}return this;
},hasListener:function(bs,bt){if(this.$$disposed){return false;
}
if(this.__fb){return qx.event.Registration.hasListener(this.__fb,bs,bt);
}var bv=this.__fp;
var bu;

if(bt==null){bt=false;
}
for(var bw in bv){bu=bv[bw];
if(bu.capture===bt&&bu.type===bs){return true;
}}return false;
}},defer:function(cV){cV.__fA=new qx.util.DeferredCall(cV.flush,cV);
},destruct:function(){var cD=this.__fb;

if(cD){qx.event.Registration.getManager(cD).removeAllListeners(cD);
cD.$$element=dA;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fs;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(dK);
this._disposeFields(eb,dP,dO,dN,dQ,dR,ec,dx,dX,dL,dV);
}});
})();
(function(){var b="qx.ui.core.queue.Manager",a="useraction";
qx.Class.define(b,{statics:{__fB:false,__fC:{},scheduleFlush:function(c){var self=qx.ui.core.queue.Manager;
self.__fC[c]=true;

if(!self.__fB){self.__fE.schedule();
self.__fB=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fD){return;
}self.__fD=true;
self.__fE.cancel();
var d=self.__fC;

while(d.visibility||d.widget||d.appearance||d.layout||d.element){if(d.widget){delete d.widget;
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
}}qx.ui.core.queue.Manager.__fB=false;

if(d.dispose){delete d.dispose;
qx.ui.core.queue.Dispose.flush();
}self.__fD=false;
}},defer:function(e){e.__fE=new qx.util.DeferredCall(e.flush);
qx.html.Element._scheduleFlush=e.scheduleFlush;
qx.event.Registration.addListener(window,a,e.flush);
}});
})();
(function(){var f="abstract",e="qx.event.dispatch.AbstractBubbling";
qx.Class.define(e,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:f,construct:function(a){this._manager=a;
},members:{_getParent:function(b){throw new Error("Missing implementation");
},canDispatchEvent:function(c,event,d){return event.getBubbles();
},dispatchEvent:function(g,event,h){var parent=g;
var s=this._manager;
var p,w;
var n;
var r,u;
var t;
var v=[];
p=s.getListeners(g,h,true);
w=s.getListeners(g,h,false);

if(p){v.push(p);
}
if(w){v.push(w);
}var parent=this._getParent(g);
var l=[];
var k=[];
var m=[];
var q=[];
while(parent!=null){p=s.getListeners(parent,h,true);

if(p){m.push(p);
q.push(parent);
}w=s.getListeners(parent,h,false);

if(w){l.push(w);
k.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=m.length-1;i>=0;i--){t=q[i];
event.setCurrentTarget(t);
n=m[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(g);

for(var i=0,x=v.length;i<x;i++){n=v[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||g;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,x=l.length;i<x;i++){t=k[i];
event.setCurrentTarget(t);
n=l[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(e){return e.parentNode;
},canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();
}},defer:function(b){qx.event.Registration.addDispatcher(b);
}});
})();
(function(){var S="keydown",R="keypress",Q="qx.client",P="NumLock",O="keyup",N="Enter",M="0",L="9",K="-",J="PageUp",ce="+",cd="PrintScreen",cc="gecko",cb="A",ca="Z",bY="Left",bX="F5",bW="Down",bV="Up",bU="F11",ba="F6",bb="useraction",X="F3",Y="keyinput",V="Insert",W="F8",T="End",U="/",bi="Delete",bj="*",bx="F1",bt="F4",bF="Home",bA="F2",bQ="F12",bK="PageDown",bo="F7",bT="F9",bS="F10",bR="Right",bm="text",bq="Escape",bs="webkit",bv="__fI",by="5",bB="3",bH="Meta",bM="7",bc="CapsLock",bd="input",bp="Control",bE="Space",bD="Tab",bC="Shift",bJ="Pause",bI="Unidentified",bz="qx.event.handler.Keyboard",bG="__fG",G="mshtml",bL="mshtml|webkit",be="6",bf="off",bu="Apps",H="__fH",I="4",bl="Alt",bg="__fF",bh="2",bk="Scroll",bw="1",bO="8",bN="Win",br="autoComplete",bP=",",bn="Backspace";
qx.Class.define(bz,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(cw){arguments.callee.base.call(this);
this.__fF=cw;
this.__fG=cw.getWindow();
if(qx.core.Variant.isSet(Q,cc)){this.__fH=this.__fG;
}else{this.__fH=this.__fG.document.documentElement;
}this.__fI={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(j){if(this._identifierToKeyCodeMap[j]){return true;
}
if(j.length!=1){return false;
}
if(j>=M&&j<=L){return true;
}
if(j>=cb&&j<=ca){return true;
}
switch(j){case ce:case K:case bj:case U:return true;
default:return false;
}}},members:{__fJ:null,__fF:null,__fG:null,__fH:null,__fI:null,__fK:null,__fL:null,canHandleEvent:function(p,q){},registerEvent:function(cj,ck,cl){},unregisterEvent:function(x,y,z){},_fireInputEvent:function(cG,cH){var cI=this.__fF.getHandler(qx.event.handler.Focus);
var cJ=cI.getActive();
if(!cJ||cJ.offsetWidth==0){cJ=cI.getFocus();
}if(cJ&&cJ.offsetWidth!=0){var event=qx.event.Registration.createEvent(Y,qx.event.type.KeyInput,[cG,cJ,cH]);
this.__fF.dispatchEvent(cJ,event);
}if(this.__fG){qx.event.Registration.fireEvent(this.__fG,bb,qx.event.type.Data,[Y]);
}},_fireSequenceEvent:function(cA,cB,cC){var cD=this.__fF.getHandler(qx.event.handler.Focus);
var cF=cD.getActive();
if(!cF||cF.offsetWidth==0){cF=cD.getFocus();
}if(!cF||cF.offsetWidth==0){cF=this.__fF.getWindow().document.body;
}var event=qx.event.Registration.createEvent(cB,qx.event.type.KeySequence,[cA,cF,cC]);
this.__fF.dispatchEvent(cF,event);
if(qx.core.Variant.isSet(Q,bL)){if(cB==S&&event.getDefaultPrevented()){var cE=cA.keyCode;

if(!(this._isNonPrintableKeyCode(cE)||cE==8||cE==9)){this._fireSequenceEvent(cA,R,cC);
}}}if(this.__fG){qx.event.Registration.fireEvent(this.__fG,bb,qx.event.type.Data,[cB]);
}},_initKeyObserver:function(){this.__fJ=qx.lang.Function.listener(this.__fM,this);
this.__fL=qx.lang.Function.listener(this.__fO,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fH,O,this.__fJ);
Event.addNativeListener(this.__fH,S,this.__fJ);
Event.addNativeListener(this.__fH,R,this.__fL);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fH,O,this.__fJ);
Event.removeNativeListener(this.__fH,S,this.__fJ);
Event.removeNativeListener(this.__fH,R,this.__fL);

for(var cy in (this.__fK||{})){var cx=this.__fK[cy];
Event.removeNativeListener(cx.target,R,cx.callback);
}delete (this.__fK);
},__fM:qx.event.GlobalError.observeMethod(qx.core.Variant.select(Q,{"mshtml":function(cm){cm=window.event||cm;
var cp=cm.keyCode;
var cn=0;
var co=cm.type;
if(!(this.__fI[cp]==S&&co==S)){this._idealKeyHandler(cp,cn,co,cm);
}if(co==S){if(this._isNonPrintableKeyCode(cp)||cp==8||cp==9){this._idealKeyHandler(cp,cn,R,cm);
}}this.__fI[cp]=co;
},"gecko":function(e){var i=this._keyCodeFix[e.keyCode]||e.keyCode;
var g=0;
var h=e.type;
if(qx.bom.client.Platform.WIN){var f=i?this._keyCodeToIdentifier(i):this._charCodeToIdentifier(g);

if(!(this.__fI[f]==S&&h==S)){this._idealKeyHandler(i,g,h,e);
}this.__fI[f]=h;
}else{this._idealKeyHandler(i,g,h,e);
}this.__fN(e.target,h,i);
},"webkit":function(k){var n=0;
var l=0;
var m=k.type;
if(qx.bom.client.Engine.VERSION<525.13){if(m==O||m==S){n=this._charCode2KeyCode[k.charCode]||k.keyCode;
}else{if(this._charCode2KeyCode[k.charCode]){n=this._charCode2KeyCode[k.charCode];
}else{l=k.charCode;
}}this._idealKeyHandler(n,l,m,k);
}else{n=k.keyCode;
if(!(this.__fI[n]==S&&m==S)){this._idealKeyHandler(n,l,m,k);
}if(m==S){if(this._isNonPrintableKeyCode(n)||n==8||n==9){this._idealKeyHandler(n,l,R,k);
}}this.__fI[n]=m;
}},"opera":function(o){this._idealKeyHandler(o.keyCode,0,o.type,o);
}})),__fN:qx.core.Variant.select(Q,{"gecko":function(B,C,D){if(C===S&&(D==33||D==34||D==38||D==40)&&B.type==bm&&B.tagName.toLowerCase()===bd&&B.getAttribute(br)!==bf){if(!this.__fK){this.__fK={};
}var F=qx.core.ObjectRegistry.toHashCode(B);

if(this.__fK[F]){return;
}var self=this;
this.__fK[F]={target:B,callback:function(A){qx.bom.Event.stopPropagation(A);
self.__fO(A);
}};
var E=qx.event.GlobalError.observeMethod(this.__fK[F].callback);
qx.bom.Event.addNativeListener(B,R,E);
}},"default":null}),__fO:qx.event.GlobalError.observeMethod(qx.core.Variant.select(Q,{"mshtml":function(s){s=window.event||s;

if(this._charCode2KeyCode[s.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[s.keyCode],0,s.type,s);
}else{this._idealKeyHandler(0,s.keyCode,s.type,s);
}},"gecko":function(cf){var ci=this._keyCodeFix[cf.keyCode]||cf.keyCode;
var cg=cf.charCode;
var ch=cf.type;
this._idealKeyHandler(ci,cg,ch,cf);
},"webkit":function(t){if(qx.bom.client.Engine.VERSION<525.13){var w=0;
var u=0;
var v=t.type;

if(v==O||v==S){w=this._charCode2KeyCode[t.charCode]||t.keyCode;
}else{if(this._charCode2KeyCode[t.charCode]){w=this._charCode2KeyCode[t.charCode];
}else{u=t.charCode;
}}this._idealKeyHandler(w,u,v,t);
}else{if(this._charCode2KeyCode[t.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[t.keyCode],0,t.type,t);
}else{this._idealKeyHandler(0,t.keyCode,t.type,t);
}}},"opera":function(c){if(this._keyCodeToIdentifierMap[c.keyCode]){this._idealKeyHandler(c.keyCode,0,c.type,c);
}else{this._idealKeyHandler(0,c.keyCode,c.type,c);
}}})),_idealKeyHandler:function(cq,cr,cs,ct){if(!cq&&!cr){return;
}var cu;
if(cq){cu=this._keyCodeToIdentifier(cq);
this._fireSequenceEvent(ct,cs,cu);
}else{cu=this._charCodeToIdentifier(cr);
this._fireSequenceEvent(ct,R,cu);
this._fireInputEvent(ct,cr);
}},_specialCharCodeMap:{8:bn,9:bD,13:N,27:bq,32:bE},_keyCodeToIdentifierMap:{16:bC,17:bp,18:bl,20:bc,224:bH,37:bY,38:bV,39:bR,40:bW,33:J,34:bK,35:T,36:bF,45:V,46:bi,112:bx,113:bA,114:X,115:bt,116:bX,117:ba,118:bo,119:W,120:bT,121:bS,122:bU,123:bQ,144:P,44:cd,145:bk,19:bJ,91:bN,93:bu},_numpadToCharCode:{96:M.charCodeAt(0),97:bw.charCodeAt(0),98:bh.charCodeAt(0),99:bB.charCodeAt(0),100:I.charCodeAt(0),101:by.charCodeAt(0),102:be.charCodeAt(0),103:bM.charCodeAt(0),104:bO.charCodeAt(0),105:L.charCodeAt(0),106:bj.charCodeAt(0),107:ce.charCodeAt(0),109:K.charCodeAt(0),110:bP.charCodeAt(0),111:U.charCodeAt(0)},_charCodeA:cb.charCodeAt(0),_charCodeZ:ca.charCodeAt(0),_charCode0:M.charCodeAt(0),_charCode9:L.charCodeAt(0),_isNonPrintableKeyCode:function(cz){return this._keyCodeToIdentifierMap[cz]?true:false;
},_isIdentifiableKeyCode:function(d){if(d>=this._charCodeA&&d<=this._charCodeZ){return true;
}if(d>=this._charCode0&&d<=this._charCode9){return true;
}if(this._specialCharCodeMap[d]){return true;
}if(this._numpadToCharCode[d]){return true;
}if(this._isNonPrintableKeyCode(d)){return true;
}return false;
},_keyCodeToIdentifier:function(a){if(this._isIdentifiableKeyCode(a)){var b=this._numpadToCharCode[a];

if(b){return String.fromCharCode(b);
}return (this._keyCodeToIdentifierMap[a]||this._specialCharCodeMap[a]||String.fromCharCode(a));
}else{return bI;
}},_charCodeToIdentifier:function(cv){return this._specialCharCodeMap[cv]||String.fromCharCode(cv).toUpperCase();
},_identifierToKeyCode:function(r){return qx.event.handler.Keyboard._identifierToKeyCodeMap[r]||r.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this._disposeFields(bg,bG,H,bv);
},defer:function(cK,cL,cM){qx.event.Registration.addHandler(cK);
if(!cK._identifierToKeyCodeMap){cK._identifierToKeyCodeMap={};

for(var cN in cL._keyCodeToIdentifierMap){cK._identifierToKeyCodeMap[cL._keyCodeToIdentifierMap[cN]]=parseInt(cN,10);
}
for(var cN in cL._specialCharCodeMap){cK._identifierToKeyCodeMap[cL._specialCharCodeMap[cN]]=parseInt(cN,10);
}}
if(qx.core.Variant.isSet(Q,G)){cL._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(Q,cc)){cL._keyCodeFix={12:cL._identifierToKeyCode(P)};
}else if(qx.core.Variant.isSet(Q,bs)){if(qx.bom.client.Engine.VERSION<525.13){cL._charCode2KeyCode={63289:cL._identifierToKeyCode(P),63276:cL._identifierToKeyCode(J),63277:cL._identifierToKeyCode(bK),63275:cL._identifierToKeyCode(T),63273:cL._identifierToKeyCode(bF),63234:cL._identifierToKeyCode(bY),63232:cL._identifierToKeyCode(bV),63235:cL._identifierToKeyCode(bR),63233:cL._identifierToKeyCode(bW),63272:cL._identifierToKeyCode(bi),63302:cL._identifierToKeyCode(V),63236:cL._identifierToKeyCode(bx),63237:cL._identifierToKeyCode(bA),63238:cL._identifierToKeyCode(X),63239:cL._identifierToKeyCode(bt),63240:cL._identifierToKeyCode(bX),63241:cL._identifierToKeyCode(ba),63242:cL._identifierToKeyCode(bo),63243:cL._identifierToKeyCode(W),63244:cL._identifierToKeyCode(bT),63245:cL._identifierToKeyCode(bS),63246:cL._identifierToKeyCode(bU),63247:cL._identifierToKeyCode(bQ),63248:cL._identifierToKeyCode(cd),3:cL._identifierToKeyCode(N),12:cL._identifierToKeyCode(P),13:cL._identifierToKeyCode(N)};
}else{cL._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var B="qx.client",A="mouseup",z="click",y="mousedown",x="contextmenu",w="dblclick",v="mousewheel",u="mouseover",t="mouseout",s="DOMMouseScroll",l="on",r="mshtml|webkit|opera",o="mousemove",k="useraction",j="__fW",n="__fR",m="gecko|webkit",p="qx.event.handler.Mouse",i="__fQ",q="__fP";
qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(F){arguments.callee.base.call(this);
this.__fP=F;
this.__fQ=F.getWindow();
this.__fR=this.__fQ.document.documentElement;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__fS:null,__fT:null,__fU:null,__fV:null,__fW:null,__fP:null,__fQ:null,__fR:null,canHandleEvent:function(d,e){},registerEvent:qx.core.Variant.select(B,{"webkit":function(O,P,Q){if(qx.bom.client.System.IPHONE){var R=qx.lang.Function.returnNull;
O[l+P]=R;
O[l+P]=undefined;
}},"default":qx.lang.Function.returnNull}),unregisterEvent:function(a,b,c){},__fX:function(K,L,M){if(!M){M=K.target||K.srcElement;
}if(M&&M.nodeType){qx.event.Registration.fireEvent(M,L||K.type,qx.event.type.Mouse,[K,M,null,true,true]);
}qx.event.Registration.fireEvent(this.__fQ,k,qx.event.type.Data,[L||K.type]);
},_initButtonObserver:function(){this.__fS=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fR,y,this.__fS);
Event.addNativeListener(this.__fR,A,this.__fS);
Event.addNativeListener(this.__fR,z,this.__fS);
Event.addNativeListener(this.__fR,w,this.__fS);
Event.addNativeListener(this.__fR,x,this.__fS);
},_initMoveObserver:function(){this.__fT=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fR,o,this.__fT);
Event.addNativeListener(this.__fR,u,this.__fT);
Event.addNativeListener(this.__fR,t,this.__fT);
},_initWheelObserver:function(){this.__fU=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var N=qx.core.Variant.isSet(B,r)?v:s;
Event.addNativeListener(this.__fR,N,this.__fU);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fR,y,this.__fS);
Event.removeNativeListener(this.__fR,A,this.__fS);
Event.removeNativeListener(this.__fR,z,this.__fS);
Event.removeNativeListener(this.__fR,w,this.__fS);
Event.removeNativeListener(this.__fR,x,this.__fS);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fR,o,this.__fT);
Event.removeNativeListener(this.__fR,u,this.__fT);
Event.removeNativeListener(this.__fR,t,this.__fT);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var Y=qx.core.Variant.isSet(B,r)?v:s;
Event.removeNativeListener(this.__fR,Y,this.__fU);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(V){this.__fX(V);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(C){var D=C.type;
var E=C.target||C.srcElement;
if(qx.core.Variant.isSet(B,m)){if(E&&E.nodeType==3){E=E.parentNode;
}}
if(this.__fY){this.__fY(C,D,E);
}
if(this.__gb){this.__gb(C,D,E);
}this.__fX(C,D,E);

if(this.__ga){this.__ga(C,D,E);
}
if(this.__gc){this.__gc(C,D,E);
}this.__fV=D;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(W){this.__fX(W,v);
}),__fY:qx.core.Variant.select(B,{"webkit":function(f,g,h){if(qx.bom.client.Engine.VERSION<530){if(g==x){this.__fX(f,A,h);
}}},"default":null}),__ga:qx.core.Variant.select(B,{"opera":function(ba,bb,bc){if(bb==A&&ba.button==2){this.__fX(ba,x,bc);
}},"default":null}),__gb:qx.core.Variant.select(B,{"mshtml":function(S,T,U){if(T==A&&this.__fV==z){this.__fX(S,y,U);
}else if(T==w){this.__fX(S,z,U);
}},"default":null}),__gc:qx.core.Variant.select(B,{"mshtml":null,"default":function(G,H,I){switch(H){case y:this.__fW=I;
break;
case A:if(I!==this.__fW){var J=qx.dom.Hierarchy.getCommonParent(I,this.__fW);
this.__fX(G,z,J);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this._disposeFields(q,i,n,j);
},defer:function(X){qx.event.Registration.addHandler(X);
}});
})();
(function(){var b="qx.event.handler.Capture";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(i,j){},registerEvent:function(f,g,h){},unregisterEvent:function(c,d,e){}},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var C="alias",B="copy",A="blur",z="mouseout",y="keydown",x="Ctrl",w="Shift",v="mousemove",u="move",t="mouseover",bb="Alt",ba="keyup",Y="mouseup",X="dragend",W="on",V="mousedown",U="qxDraggable",T="drag",S="__gd",R="drop",J="qxDroppable",K="qx.event.handler.DragDrop",H="__gg",I="__gk",F="__gi",G="droprequest",D="dragstart",E="dragchange",L="__ge",M="__gf",O="dragleave",N="__gh",Q="dragover",P="__gj";
qx.Class.define(K,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bp){arguments.callee.base.call(this);
this.__gd=bp;
this.__ge=bp.getWindow().document.documentElement;
this.__gd.addListener(this.__ge,V,this._onMouseDown,this);
this.__gq();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__gd:null,__ge:null,__gf:null,__gg:null,__gh:null,__gi:null,__gj:null,__gk:null,__gl:null,__gm:null,__gn:false,__go:0,__gp:0,canHandleEvent:function(o,p){},registerEvent:function(bm,bn,bo){},unregisterEvent:function(a,b,c){},addType:function(j){this.__gh[j]=true;
},addAction:function(bt){this.__gi[bt]=true;
},supportsType:function(br){return !!this.__gh[br];
},supportsAction:function(n){return !!this.__gi[n];
},getData:function(bq){if(!this.__gx||!this.__gf){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__gh[bq]){throw new Error("Unsupported data type: "+bq+"!");
}
if(!this.__gk[bq]){this.__gl=bq;
this.__gs(G,this.__gg,false);
}
if(!this.__gk[bq]){throw new Error("Please use a dragrequest listener to the drag target to fill the manager with data!");
}return this.__gk[bq]||null;
},getCurrentAction:function(){return this.__gm;
},addData:function(l,m){this.__gk[l]=m;
},getCurrentType:function(){return this.__gl;
},__gq:function(){this.__gh={};
this.__gi={};
this.__gj={};
this.__gk={};
},__gr:function(){var s=this.__gi;
var q=this.__gj;
var r=null;

if(this.__gx){if(q.Shift&&q.Ctrl&&s.alias){r=C;
}else if(q.Shift&&q.Alt&&s.copy){r=B;
}else if(q.Shift&&s.move){r=u;
}else if(q.Alt&&s.alias){r=C;
}else if(q.Ctrl&&s.copy){r=B;
}else if(s.move){r=u;
}else if(s.copy){r=B;
}else if(s.alias){r=C;
}}
if(r!=this.__gm){this.__gm=r;
this.__gs(E,this.__gg,false);
}},__gs:function(be,bf,bg,bh){var bj=qx.event.Registration;
var bi=bj.createEvent(be,qx.event.type.Drag,[bg,bh]);

if(this.__gg!==this.__gf){if(bf==this.__gg){bi.setRelatedTarget(this.__gf);
}else{bi.setRelatedTarget(this.__gg);
}}return bj.dispatchEvent(bf,bi);
},__gt:function(f){while(f&&f.nodeType==1){if(f.getAttribute(U)==W){return f;
}f=f.parentNode;
}return null;
},__gu:function(i){while(i&&i.nodeType==1){if(i.getAttribute(J)==W){return i;
}i=i.parentNode;
}return null;
},__gv:function(){this.__gg=null;
this.__gd.removeListener(this.__ge,v,this._onMouseMove,this,true);
this.__gd.removeListener(this.__ge,Y,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,A,this._onWindowBlur,this);
this.__gq();
},__gw:function(){if(this.__gn){this.__gd.removeListener(this.__ge,t,this._onMouseOver,this,true);
this.__gd.removeListener(this.__ge,z,this._onMouseOut,this,true);
this.__gd.removeListener(this.__ge,y,this._onKeyDown,this,true);
this.__gd.removeListener(this.__ge,ba,this._onKeyUp,this,true);
this.__gs(X,this.__gg,false);
this.__gn=false;
}this.__gx=false;
this.__gf=null;
this.__gv();
},__gx:false,_onWindowBlur:function(e){this.__gw();
},_onKeyDown:function(e){var bl=e.getKeyIdentifier();

switch(bl){case bb:case x:case w:if(!this.__gj[bl]){this.__gj[bl]=true;
this.__gr();
}}},_onKeyUp:function(e){var d=e.getKeyIdentifier();

switch(d){case bb:case x:case w:if(this.__gj[d]){this.__gj[d]=false;
this.__gr();
}}},_onMouseDown:function(e){if(this.__gn){return;
}var bk=this.__gt(e.getTarget());

if(bk){this.__go=e.getDocumentLeft();
this.__gp=e.getDocumentTop();
this.__gg=bk;
this.__gd.addListener(this.__ge,v,this._onMouseMove,this,true);
this.__gd.addListener(this.__ge,Y,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,A,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gx){this.__gs(R,this.__gf,false,e);
}if(this.__gn){e.stopPropagation();
}this.__gw();
},_onMouseMove:function(e){if(this.__gn){if(!this.__gs(T,this.__gg,true,e)){this.__gw();
}}else{if(Math.abs(e.getDocumentLeft()-this.__go)>3||Math.abs(e.getDocumentTop()-this.__gp)>3){if(this.__gs(D,this.__gg,true,e)){this.__gn=true;
this.__gd.addListener(this.__ge,t,this._onMouseOver,this,true);
this.__gd.addListener(this.__ge,z,this._onMouseOut,this,true);
this.__gd.addListener(this.__ge,y,this._onKeyDown,this,true);
this.__gd.addListener(this.__ge,ba,this._onKeyUp,this,true);
var k=this.__gj;
k.Ctrl=e.isCtrlPressed();
k.Shift=e.isShiftPressed();
k.Alt=e.isAltPressed();
this.__gr();
}else{this.__gs(X,this.__gg,false);
this.__gv();
}}}},_onMouseOver:function(e){var g=e.getTarget();
var h=this.__gu(g);

if(h&&h!=this.__gf){this.__gx=this.__gs(Q,h,true,e);
this.__gf=h;
this.__gr();
}},_onMouseOut:function(e){var bc=e.getTarget();
var bd=this.__gu(bc);

if(bd&&bd==this.__gf){this.__gs(O,this.__gf,false,e);
this.__gf=null;
this.__gx=false;
qx.event.Timer.once(this.__gr,this,0);
}}},destruct:function(){this._disposeFields(H,M,S,L,N,F,P,I);
},defer:function(bs){qx.event.Registration.addHandler(bs);
}});
})();
(function(){var j="-",i="qx.event.handler.Element",h="_manager",g="_registeredEvents";
qx.Class.define(i,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(s){arguments.callee.base.call(this);
this._manager=s;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(w,x){},registerEvent:function(a,b,c){var f=qx.core.ObjectRegistry.toHashCode(a);
var d=f+j+b;
var e=qx.lang.Function.listener(this._onNative,this,d);
qx.bom.Event.addNativeListener(a,b,e);
this._registeredEvents[d]={element:a,type:b,listener:e};
},unregisterEvent:function(l,m,n){var q=this._registeredEvents;

if(!q){return;
}var r=qx.core.ObjectRegistry.toHashCode(l);
var o=r+j+m;
var p=this._registeredEvents[o];
qx.bom.Event.removeNativeListener(l,m,p.listener);
delete this._registeredEvents[o];
},_onNative:qx.event.GlobalError.observeMethod(function(y,z){var B=this._registeredEvents;

if(!B){return;
}var A=B[z];
qx.event.Registration.fireNonBubblingEvent(A.element,A.type,qx.event.type.Native,[y]);
})},destruct:function(){var t;
var u=this._registeredEvents;

for(var v in u){t=u[v];
qx.bom.Event.removeNativeListener(t.element,t.type,t.listener);
}this._disposeFields(h,g);
},defer:function(k){qx.event.Registration.addHandler(k);
}});
})();
(function(){var u="qx.event.handler.Appear",t="__gy",s="__gz",r="disappear",q="appear";
qx.Class.define(u,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(a){arguments.callee.base.call(this);
this.__gy=a;
this.__gz={};
qx.event.handler.Appear.__gA[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gA:{},refresh:function(){var o=this.__gA;

for(var p in o){o[p].refresh();
}}},members:{__gy:null,__gz:null,canHandleEvent:function(b,c){},registerEvent:function(j,k,l){var m=qx.core.ObjectRegistry.toHashCode(j);
var n=this.__gz;

if(n&&!n[m]){n[m]=j;
j.$$displayed=j.offsetWidth>0;
}},unregisterEvent:function(d,e,f){var g=qx.core.ObjectRegistry.toHashCode(d);
var h=this.__gz;

if(!h){return;
}
if(h[g]){delete h[g];
d.$$displayed=null;
}},refresh:function(){var y=this.__gz;
var z;

for(var x in y){z=y[x];
var v=z.offsetWidth>0;

if((!!z.$$displayed)!==v){z.$$displayed=v;
var w=qx.event.Registration.createEvent(v?q:r);
this.__gy.dispatchEvent(z,w);
}}}},destruct:function(){this._disposeFields(t,s);
delete qx.event.handler.Appear.__gA[this.$$hash];
},defer:function(i){qx.event.Registration.addHandler(i);
}});
})();
(function(){var R="mshtml",Q="",P="qx.client",O=">",N="<",M=" ",L="='",K="qx.bom.Element",J="div",I="' ",H="></";
qx.Class.define(K,{statics:{__gB:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,A,B){if(!B){B=window;
}
if(!name){throw new Error("The tag name is missing!");
}var D=this.__gB;
var C=Q;

for(var F in A){if(D[F]){C+=F+L+A[F]+I;
}}var G;
if(C!=Q){if(qx.bom.client.Engine.MSHTML){G=B.document.createElement(N+name+M+C+O);
}else{var E=B.document.createElement(J);
E.innerHTML=N+name+M+C+H+name+O;
G=E.firstChild;
}}else{G=B.document.createElement(name);
}
for(var F in A){if(!D[F]){qx.bom.element.Attribute.set(G,F,A[F]);
}}return G;
},empty:function(n){return n.innerHTML=Q;
},addListener:function(X,Y,ba,self,bb){return qx.event.Registration.addListener(X,Y,ba,self,bb);
},removeListener:function(g,h,k,self,m){return qx.event.Registration.removeListener(g,h,k,self,m);
},removeListenerById:function(V,W){return qx.event.Registration.removeListenerById(V,W);
},hasListener:function(d,e,f){return qx.event.Registration.hasListener(d,e,f);
},focus:function(a){qx.event.Registration.getManager(a).getHandler(qx.event.handler.Focus).focus(a);
},blur:function(b){qx.event.Registration.getManager(b).getHandler(qx.event.handler.Focus).blur(b);
},activate:function(c){qx.event.Registration.getManager(c).getHandler(qx.event.handler.Focus).activate(c);
},deactivate:function(S){qx.event.Registration.getManager(S).getHandler(qx.event.handler.Focus).deactivate(S);
},capture:function(T){qx.event.Registration.getManager(T).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(T);
},releaseCapture:function(U){qx.event.Registration.getManager(U).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(U);
},clone:function(o,p){var s;

if(p||(qx.core.Variant.isSet(P,R)&&!qx.xml.Document.isXmlDocument(o))){var w=qx.event.Registration.getManager(o);
var q=qx.dom.Hierarchy.getDescendants(o);
q.push(o);
}if(qx.core.Variant.isSet(P,R)){for(var i=0,l=q.length;i<l;i++){w.toggleAttachedEvents(q[i],false);
}}var s=o.cloneNode(true);
if(qx.core.Variant.isSet(P,R)){for(var i=0,l=q.length;i<l;i++){w.toggleAttachedEvents(q[i],true);
}}if(p===true){var z=qx.dom.Hierarchy.getDescendants(s);
z.push(s);
var r,u,y,t;

for(var i=0,x=q.length;i<x;i++){y=q[i];
r=w.serializeListeners(y);

if(r.length>0){u=z[i];

for(var j=0,v=r.length;j<v;j++){t=r[j];
w.addListener(u,t.type,t.handler,t.self,t.capture);
}}}}return s;
}}});
})();
(function(){var E="qx.client",D="blur",C="focus",B="mousedown",A="on",z="mouseup",y="DOMFocusOut",x="DOMFocusIn",w="selectstart",v="onmousedown",bg="onfocusout",bf="onfocusin",be="onmouseup",bd="onselectstart",bc="draggesture",bb="_document",ba="gecko",Y="_root",X="qx.event.handler.Focus",W="_applyFocus",L="_window",M="deactivate",J="qxIsRootPage",K="_applyActive",H="input",I="focusin",F="qxSelectable",G="tabIndex",N="off",O="_body",R="activate",Q="1",T="focusout",S="__mouseActive",V="_manager",U="qxKeepFocus",P="qxKeepActive";
qx.Class.define(X,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bt){arguments.callee.base.call(this);
this._manager=bt;
this._window=bt.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:K,nullable:true},focus:{apply:W,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gC:null,__gD:null,__gE:null,__gF:null,__gG:null,__gH:null,__gI:null,__gJ:null,__gK:null,__gL:null,canHandleEvent:function(bI,bJ){},registerEvent:function(bh,bi,bj){},unregisterEvent:function(bp,bq,br){},focus:function(bs){try{bs.focus();
}catch(bG){}this.setFocus(bs);
this.setActive(bs);
},activate:function(bF){this.setActive(bF);
},blur:function(bM){try{bM.blur();
}catch(bz){}
if(this.getActive()===bM){this.resetActive();
}
if(this.getFocus()===bM){this.resetFocus();
}},deactivate:function(n){if(this.getActive()===n){this.resetActive();
}},tryActivate:function(t){var u=this.__ha(t);

if(u){this.setActive(u);
}},__gM:function(c,d,f,g){var i=qx.event.Registration;
var h=i.createEvent(f,qx.event.type.Focus,[c,d,g]);
i.dispatchEvent(c,h);
},_windowFocused:true,__gN:function(){if(this._windowFocused){this._windowFocused=false;
this.__gM(this._window,null,D,false);
}},__gO:function(){if(!this._windowFocused){this._windowFocused=true;
this.__gM(this._window,null,C,false);
}},_initObserver:qx.core.Variant.select(E,{"gecko":function(){this.__gC=qx.lang.Function.listener(this.__gU,this);
this.__gD=qx.lang.Function.listener(this.__gV,this);
this.__gE=qx.lang.Function.listener(this.__gT,this);
this.__gF=qx.lang.Function.listener(this.__gS,this);
this.__gG=qx.lang.Function.listener(this.__gP,this);
this._document.addEventListener(B,this.__gC,true);
this._document.addEventListener(z,this.__gD,true);
this._window.addEventListener(C,this.__gE,true);
this._window.addEventListener(D,this.__gF,true);
this._window.addEventListener(bc,this.__gG,true);
},"mshtml":function(){this.__gC=qx.lang.Function.listener(this.__gU,this);
this.__gD=qx.lang.Function.listener(this.__gV,this);
this.__gI=qx.lang.Function.listener(this.__gQ,this);
this.__gJ=qx.lang.Function.listener(this.__gR,this);
this.__gH=qx.lang.Function.listener(this.__gW,this);
this._document.attachEvent(v,this.__gC);
this._document.attachEvent(be,this.__gD);
this._document.attachEvent(bf,this.__gI);
this._document.attachEvent(bg,this.__gJ);
this._document.attachEvent(bd,this.__gH);
},"webkit":function(){this.__gC=qx.lang.Function.listener(this.__gU,this);
this.__gD=qx.lang.Function.listener(this.__gV,this);
this.__gJ=qx.lang.Function.listener(this.__gR,this);
this.__gE=qx.lang.Function.listener(this.__gT,this);
this.__gF=qx.lang.Function.listener(this.__gS,this);
this.__gH=qx.lang.Function.listener(this.__gW,this);
this._document.addEventListener(B,this.__gC,true);
this._document.addEventListener(z,this.__gD,true);
this._document.addEventListener(w,this.__gH,false);
this._window.addEventListener(y,this.__gJ,true);
this._window.addEventListener(C,this.__gE,true);
this._window.addEventListener(D,this.__gF,true);
},"opera":function(){this.__gC=qx.lang.Function.listener(this.__gU,this);
this.__gD=qx.lang.Function.listener(this.__gV,this);
this.__gI=qx.lang.Function.listener(this.__gQ,this);
this.__gJ=qx.lang.Function.listener(this.__gR,this);
this._document.addEventListener(B,this.__gC,true);
this._document.addEventListener(z,this.__gD,true);
this._window.addEventListener(x,this.__gI,true);
this._window.addEventListener(y,this.__gJ,true);
}}),_stopObserver:qx.core.Variant.select(E,{"gecko":function(){this._document.removeEventListener(B,this.__gC,true);
this._document.removeEventListener(z,this.__gD,true);
this._window.removeEventListener(C,this.__gE,true);
this._window.removeEventListener(D,this.__gF,true);
this._window.removeEventListener(bc,this.__gG,true);
},"mshtml":function(){this._document.detachEvent(v,this.__gC);
this._document.detachEvent(be,this.__gD);
this._document.detachEvent(bf,this.__gI);
this._document.detachEvent(bg,this.__gJ);
this._document.detachEvent(bd,this.__gH);
},"webkit":function(){this._document.removeEventListener(B,this.__gC,true);
this._document.removeEventListener(w,this.__gH,false);
this._window.removeEventListener(x,this.__gI,true);
this._window.removeEventListener(y,this.__gJ,true);
this._window.removeEventListener(C,this.__gE,true);
this._window.removeEventListener(D,this.__gF,true);
},"opera":function(){this._document.removeEventListener(B,this.__gC,true);
this._window.removeEventListener(x,this.__gI,true);
this._window.removeEventListener(y,this.__gJ,true);
this._window.removeEventListener(C,this.__gE,true);
this._window.removeEventListener(D,this.__gF,true);
}}),__gP:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){if(!this.__hb(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gQ:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml":function(e){this.__gO();
var b=e.srcElement;
var a=this.__gY(b);

if(a){this.setFocus(a);
}this.tryActivate(b);
},"opera":function(e){var bR=e.target;

if(bR==this._document||bR==this._window){this.__gO();

if(this.__gK){this.setFocus(this.__gK);
delete this.__gK;
}
if(this.__gL){this.setActive(this.__gL);
delete this.__gL;
}}else{this.setFocus(bR);
this.tryActivate(bR);
if(!this.__hb(bR)){bR.selectionStart=0;
bR.selectionEnd=0;
}}},"default":null})),__gR:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml":function(e){if(!e.toElement){this.__gN();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var bH=e.target;

if(bH===this.getFocus()){this.resetFocus();
}
if(bH===this.getActive()){this.resetActive();
}},"opera":function(e){var bA=e.target;

if(bA==this._document){this.__gN();
this.__gK=this.getFocus();
this.__gL=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(bA===this.getFocus()){this.resetFocus();
}
if(bA===this.getActive()){this.resetActive();
}}},"default":null})),__gS:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__gN();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__gN();
this.__gK=this.getFocus();
this.__gL=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__gT:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){var bQ=e.target;

if(bQ===this._window||bQ===this._document){this.__gO();
bQ=this._body;
}this.setFocus(bQ);
this.tryActivate(bQ);
},"webkit":function(e){var by=e.target;

if(by===this._window||by===this._document){this.__gO();

if(this.__gK){this.setFocus(this.__gK);
delete this.__gK;
}
if(this.__gL){this.setActive(this.__gL);
delete this.__gL;
}}else{this.setFocus(by);
this.tryActivate(by);
}},"default":null})),__gU:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"gecko":function(e){var bw=e.target;
var bu=this.__gY(bw);
var bv=this.__hb(bw);

if(!bv){qx.bom.Event.preventDefault(e);
if(bu){if(qx.core.Variant.isSet(E,ba)){var bx=qx.bom.element.Attribute.get(bu,J)===Q;

if(!bx){bu.focus();
}}else{bu.focus();
}}}else if(!bu){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var bE=e.srcElement;
var bD=this.__gY(bE);

if(bD){if(!this.__hb(bE)){bE.unselectable=A;
document.selection.empty();
bD.focus();
}}else{qx.bom.Event.preventDefault(e);
if(!this.__hb(bE)){bE.unselectable=A;
}}},"webkit":function(e){var bC=e.target;
var bB=this.__gY(bC);

if(bB){this.setFocus(bB);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var s=e.target;
var q=this.__gY(s);

if(!this.__hb(s)){qx.bom.Event.preventDefault(e);
if(q){var r=this.getFocus();

if(r&&r.selectionEnd){r.selectionStart=0;
r.selectionEnd=0;
r.blur();
}if(q){this.setFocus(q);
}}}else if(q){this.setFocus(q);
}},"default":null})),__gV:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml":function(e){var bk=e.srcElement;

if(bk.unselectable){bk.unselectable=N;
}var bl=this.getFocus();

if(bl&&bk!=bl&&bl.nodeName.toLowerCase()===H){bk=bl;
}this.tryActivate(bk);
},"gecko":function(e){var bm=e.target;

while(bm&&bm.offsetWidth===undefined){bm=bm.parentNode;
}
if(bm){this.tryActivate(bm);
}},"webkit|opera":function(e){this.tryActivate(e.target);
},"default":null})),__gW:qx.event.GlobalError.observeMethod(qx.core.Variant.select(E,{"mshtml|webkit":function(e){var bL=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__hb(bL)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gX:function(bS){var bT=qx.bom.element.Attribute.get(bS,G);

if(bT>=1){return true;
}var bU=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bT>=0&&bU[bS.tagName]){return true;
}return false;
},__gY:function(bK){while(bK&&bK.nodeType===1){if(bK.getAttribute(U)==A){return null;
}
if(this.__gX(bK)){return bK;
}bK=bK.parentNode;
}return this._body;
},__ha:function(bn){var bo=bn;

while(bn&&bn.nodeType===1){if(bn.getAttribute(P)==A){return null;
}bn=bn.parentNode;
}return bo;
},__hb:function(j){while(j&&j.nodeType===1){var k=j.getAttribute(F);

if(k!=null){return k===A;
}j=j.parentNode;
}return true;
},_applyActive:function(l,m){if(m){this.__gM(m,l,M,true);
}
if(l){this.__gM(l,m,R,true);
}},_applyFocus:function(o,p){if(p){this.__gM(p,o,T,true);
}
if(o){this.__gM(o,p,I,true);
}if(p){this.__gM(p,o,D,false);
}
if(o){this.__gM(o,p,C,false);
}}},destruct:function(){this._stopObserver();
this._disposeFields(V,L,bb,Y,O,S);
},defer:function(bN){qx.event.Registration.addHandler(bN);
var bO=bN.FOCUSABLE_ELEMENTS;

for(var bP in bO){bO[bP.toUpperCase()]=1;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){arguments.callee.base.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var q="",p="qx.client",o="readOnly",n="accessKey",m="qx.bom.element.Attribute",l="rowSpan",k="vAlign",j="className",i="textContent",h="'",E="htmlFor",D="longDesc",C="cellSpacing",B="frameBorder",A="='",z="useMap",y="innerText",x="innerHTML",w="tabIndex",v="dateTime",t="maxLength",u="mshtml",r="cellPadding",s="colSpan";
qx.Class.define(m,{statics:{__hc:{names:{"class":j,"for":E,html:x,text:qx.core.Variant.isSet(p,u)?y:i,colspan:s,rowspan:l,valign:k,datetime:v,accesskey:n,tabindex:w,maxlength:t,readonly:o,longdesc:D,cellpadding:r,cellspacing:C,frameborder:B,usemap:z},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:q,maxLength:10000000,className:q,innerHTML:q,innerText:q,textContent:q,htmlFor:q,tabIndex:0},original:{href:1,src:1,type:1}},compile:function(I){var J=[];
var L=this.__hc.runtime;

for(var K in I){if(!L[K]){J.push(K,A,I[K],h);
}}return J.join(q);
},get:qx.core.Variant.select(p,{"mshtml":function(e,name){var g=this.__hc;
var f;
name=g.names[name]||name;
if(g.original[name]){f=e.getAttribute(name,2);
}else if(g.property[name]){if(g.propertyDefault[name]&&f==g.propertyDefault[name]){return null;
}f=e[name];
}else{f=e.getAttribute(name);
}if(g.bools[name]){return !!f;
}return f;
},"default":function(F,name){var H=this.__hc;
var G;
name=H.names[name]||name;
if(H.property[name]){if(H.propertyDefault[name]&&G==H.propertyDefault[name]){return null;
}G=F[name];

if(G==null){G=F.getAttribute(name);
}}else{G=F.getAttribute(name);
}if(H.bools[name]){return !!G;
}return G;
}}),set:function(a,name,b){var c=this.__hc;
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
(function(){var a="qx.event.type.Dom";
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{getModifiers:function(){var c=0;
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
(function(){var f="qx.event.type.KeyInput";
qx.Class.define(f,{extend:qx.event.type.Dom,members:{init:function(a,b,c){arguments.callee.base.call(this,a,b,null,true,true);
this._charCode=c;
return this;
},clone:function(d){var e=arguments.callee.base.call(this,d);
e._charCode=this._charCode;
return e;
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
(function(){var o="qx.client",n="left",m="right",l="middle",k="dblclick",j="click",i="none",h="contextmenu",g="qx.event.type.Mouse",f="Chrome";
qx.Class.define(g,{extend:qx.event.type.Dom,members:{init:function(a,b,c,d,e){arguments.callee.base.call(this,a,b,c,d,e);

if(!c){this._relatedTarget=qx.bom.Event.getRelatedTarget(a);
}return this;
},__hd:qx.core.Variant.select(o,{"mshtml":{1:n,2:m,4:l},"default":{0:n,2:m,1:l}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case j:case k:return n;
case h:return m;
default:return this.__hd[this._native.button]||i;
}},isLeftPressed:function(){return this.getButton()===n;
},isMiddlePressed:function(){return this.getButton()===l;
},isRightPressed:function(){return this.getButton()===m;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(o,{"mshtml":function(){var p=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(p);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(o,{"mshtml":function(){var q=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(q);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
},getWheelDelta:qx.core.Variant.select(o,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(window.navigator.userAgent.indexOf(f)!==-1){return -(this._native.wheelDelta/120);
}else{return -(this._native.wheelDelta/40);
}}})}});
})();
(function(){var F="qx.client",E="qx.dom.Hierarchy",D="previousSibling",C="*",B="nextSibling",A="parentNode";
qx.Class.define(E,{statics:{getNodeIndex:function(S){var T=0;

while(S&&(S=S.previousSibling)){T++;
}return T;
},getElementIndex:function(P){var Q=0;
var R=qx.dom.Node.ELEMENT;

while(P&&(P=P.previousSibling)){if(P.nodeType==R){Q++;
}}return Q;
},getNextElementSibling:function(w){while(w&&(w=w.nextSibling)&&!qx.dom.Node.isElement(w)){continue;
}return w||null;
},getPreviousElementSibling:function(a){while(a&&(a=a.previousSibling)&&!qx.dom.Node.isElement(a)){continue;
}return a||null;
},contains:qx.core.Variant.select(F,{"webkit|mshtml|opera":function(H,I){if(qx.dom.Node.isDocument(H)){var J=qx.dom.Node.getDocument(I);
return H&&J==H;
}else if(qx.dom.Node.isDocument(I)){return false;
}else{return H.contains(I);
}},"gecko":function(U,V){return !!(U.compareDocumentPosition(V)&16);
},"default":function(u,v){while(v){if(u==v){return true;
}v=v.parentNode;
}return false;
}}),isRendered:function(f){if(!f.offsetParent){return false;
}var g=f.ownerDocument||f.document;
if(g.body.contains){return g.body.contains(f);
}if(g.compareDocumentPosition){return !!(g.compareDocumentPosition(f)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(c,d){return this.contains(d,c);
},getCommonParent:qx.core.Variant.select(F,{"mshtml|opera":function(x,y){if(x===y){return x;
}
while(x&&qx.dom.Node.isElement(x)){if(x.contains(y)){return x;
}x=x.parentNode;
}return null;
},"default":function(h,i){if(h===i){return h;
}var j={};
var m=qx.core.ObjectRegistry;
var l,k;

while(h||i){if(h){l=m.toHashCode(h);

if(j[l]){return j[l];
}j[l]=h;
h=h.parentNode;
}
if(i){k=m.toHashCode(i);

if(j[k]){return j[k];
}j[k]=i;
i=i.parentNode;
}}return null;
}}),getAncestors:function(M){return this._recursivelyCollect(M,A);
},getChildElements:function(N){N=N.firstChild;

if(!N){return [];
}var O=this.getNextSiblings(N);

if(N.nodeType===1){O.unshift(N);
}return O;
},getDescendants:function(K){return qx.lang.Array.fromCollection(K.getElementsByTagName(C));
},getFirstDescendant:function(e){e=e.firstChild;

while(e&&e.nodeType!=1){e=e.nextSibling;
}return e;
},getLastDescendant:function(G){G=G.lastChild;

while(G&&G.nodeType!=1){G=G.previousSibling;
}return G;
},getPreviousSiblings:function(b){return this._recursivelyCollect(b,D);
},getNextSiblings:function(L){return this._recursivelyCollect(L,B);
},_recursivelyCollect:function(r,s){var t=[];

while(r=r[s]){if(r.nodeType==1){t.push(r);
}}return t;
},getSiblings:function(q){return this.getPreviousSiblings(q).reverse().concat(this.getNextSiblings(q));
},isEmpty:function(z){z=z.firstChild;

while(z){if(z.nodeType===qx.dom.Node.ELEMENT||z.nodeType===qx.dom.Node.TEXT){return false;
}z=z.nextSibling;
}return true;
},cleanWhitespace:function(n){var o=n.firstChild;

while(o){var p=o.nextSibling;

if(o.nodeType==3&&!/\S/.test(o.nodeValue)){n.removeChild(o);
}o=p;
}}}});
})();
(function(){var k="qx.client",j="qx.event.type.Drag";
qx.Class.define(j,{extend:qx.event.type.Event,members:{init:function(a,b){arguments.callee.base.call(this,false,a);

if(b){this._native=b.getNativeEvent()||null;
this._originalTarget=b.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(h){var i=arguments.callee.base.call(this,h);
i._native=this._native;
return i;
},getDocumentLeft:qx.core.Variant.select(k,{"mshtml":function(){if(this._native==null){return 0;
}var d=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(d);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(k,{"mshtml":function(){if(this._native==null){return 0;
}var c=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(c);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(o){this.getManager().addType(o);
},addAction:function(l){this.getManager().addAction(l);
},supportsType:function(f){return this.getManager().supportsType(f);
},supportsAction:function(e){return this.getManager().supportsAction(e);
},addData:function(m,n){this.getManager().addData(m,n);
},getData:function(g){return this.getManager().getData(g);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var t="__he",s="blur",r="losecapture",q="__hf",p="capture",o="click",n="__hg",m="qx.event.dispatch.MouseCapture",k="focus",j="scroll";
qx.Class.define(m,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(g){arguments.callee.base.call(this);
this.__he=g;
this.__hf=g.getWindow();
g.addListener(this.__hf,s,this.releaseCapture,this);
g.addListener(this.__hf,k,this.releaseCapture,this);
g.addListener(this.__hf,j,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__hg:null,__he:null,__hf:null,canDispatchEvent:function(e,event,f){return (this.__hg&&this.__hh[f]);
},dispatchEvent:function(a,event,b){if(b==o){event.stopPropagation();
this.releaseCapture();
return;
}var c=this.__he.getListeners(this.__hg,b,false);

if(c){event.setCurrentTarget(this.__hg);
event.setEventPhase(qx.event.type.Event.AT_TARGET);

for(var i=0,l=c.length;i<l;i++){var d=c[i].context||event.getCurrentTarget();
c[i].handler.call(d,event);
}}},__hh:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(h){if(this.__hg===h){return;
}
if(this.__hg){this.releaseCapture();
}this.__hg=h;
qx.event.Registration.fireEvent(h,p,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__hg;
},releaseCapture:function(){var u=this.__hg;

if(!u){return;
}this.__hg=null;
qx.event.Registration.fireEvent(u,r,qx.event.type.Event,[true,false]);
}},destruct:function(){this._disposeFields(n,t,q);
},defer:function(v){qx.event.Registration.addDispatcher(v);
}});
})();
(function(){var D="qx.client",C="",B="mshtml",A="'",z="SelectionLanguage",y="qx.xml.Document",x=" />",w="MSXML2.DOMDocument.3.0",v='<\?xml version="1.0" encoding="utf-8"?>\n<',u="MSXML2.XMLHTTP.3.0",q="MSXML2.XMLHTTP.6.0",t=" xmlns='",s="text/xml",p="XPath",o="MSXML2.DOMDocument.6.0",r="HTML";
qx.Bootstrap.define(y,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(k){if(k.nodeType===9){return k.documentElement.nodeName!==r;
}else if(k.ownerDocument){return this.isXmlDocument(k.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(D,{"mshtml":function(c,d){var e=new ActiveXObject(this.DOMDOC);
e.setProperty(z,p);

if(d){var f=v;
f+=d;

if(c){f+=t+c+A;
}f+=x;
e.loadXML(f);
}return e;
},"default":function(m,n){return document.implementation.createDocument(m||C,n||C,null);
}}),fromString:qx.core.Variant.select(D,{"mshtml":function(a){var b=qx.xml.Document.create();
b.loadXML(a);
return b;
},"default":function(h){var j=new DOMParser();
return j.parseFromString(h,s);
}})},defer:function(E){if(qx.core.Variant.isSet(D,B)){var F=[o,w];
var G=[q,u];

for(var i=0,l=F.length;i<l;i++){try{new ActiveXObject(F[i]);
new ActiveXObject(G[i]);
}catch(g){continue;
}E.DOMDOC=F[i];
E.XMLHTTP=G[i];
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
(function(){var bi="borderTopWidth",bh="borderLeftWidth",bg="marginTop",bf="marginLeft",be="scroll",bd="qx.client",bc="border-box",bb="borderBottomWidth",ba="borderRightWidth",Y="auto",bx="padding",bw="qx.bom.element.Location",bv="paddingLeft",bu="static",bt="marginBottom",bs="visible",br="BODY",bq="paddingBottom",bp="paddingTop",bo="marginRight",bm="position",bn="margin",bk="overflow",bl="paddingRight",bj="border";
qx.Class.define(bw,{statics:{__hi:function(N,O){return qx.bom.element.Style.get(N,O,qx.bom.element.Style.COMPUTED_MODE,false);
},__hj:function(F,G){return parseInt(qx.bom.element.Style.get(F,G,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hk:function(n){var q=0,top=0;
if(n.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var p=qx.dom.Node.getWindow(n);
q-=qx.bom.Viewport.getScrollLeft(p);
top-=qx.bom.Viewport.getScrollTop(p);
}else{var o=qx.dom.Node.getDocument(n).body;
n=n.parentNode;
while(n&&n!=o){q+=n.scrollLeft;
top+=n.scrollTop;
n=n.parentNode;
}}return {left:q,top:top};
},__hl:qx.core.Variant.select(bd,{"mshtml":function(a){var c=qx.dom.Node.getDocument(a);
var b=c.body;
var d=0;
var top=0;
d-=b.clientLeft+c.documentElement.clientLeft;
top-=b.clientTop+c.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){d+=this.__hj(b,bh);
top+=this.__hj(b,bi);
}return {left:d,top:top};
},"webkit":function(P){var R=qx.dom.Node.getDocument(P);
var Q=R.body;
var S=Q.offsetLeft;
var top=Q.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){S+=this.__hj(Q,bh);
top+=this.__hj(Q,bi);
}return {left:S,top:top};
},"gecko":function(r){var s=qx.dom.Node.getDocument(r).body;
var t=s.offsetLeft;
var top=s.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){t+=this.__hj(s,bf);
top+=this.__hj(s,bg);
}if(qx.bom.element.BoxSizing.get(s)!==bc){t+=this.__hj(s,bh);
top+=this.__hj(s,bi);
}return {left:t,top:top};
},"default":function(bM){var bN=qx.dom.Node.getDocument(bM).body;
var bO=bN.offsetLeft;
var top=bN.offsetTop;
return {left:bO,top:top};
}}),__hm:qx.core.Variant.select(bd,{"mshtml|webkit":function(bA){var bC=qx.dom.Node.getDocument(bA);
if(bA.getBoundingClientRect){var bD=bA.getBoundingClientRect();
var bE=bD.left;
var top=bD.top;
}else{var bE=bA.offsetLeft;
var top=bA.offsetTop;
bA=bA.offsetParent;
var bB=bC.body;
while(bA&&bA!=bB){bE+=bA.offsetLeft;
top+=bA.offsetTop;
bE+=this.__hj(bA,bh);
top+=this.__hj(bA,bi);
bA=bA.offsetParent;
}}return {left:bE,top:top};
},"gecko":function(bH){if(bH.getBoundingClientRect){var bK=bH.getBoundingClientRect();
var bL=Math.round(bK.left);
var top=Math.round(bK.top);
}else{var bL=0;
var top=0;
var bI=qx.dom.Node.getDocument(bH).body;
var bJ=qx.bom.element.BoxSizing;

if(bJ.get(bH)!==bc){bL-=this.__hj(bH,bh);
top-=this.__hj(bH,bi);
}
while(bH&&bH!==bI){bL+=bH.offsetLeft;
top+=bH.offsetTop;
if(bJ.get(bH)!==bc){bL+=this.__hj(bH,bh);
top+=this.__hj(bH,bi);
}if(bH.parentNode&&this.__hi(bH.parentNode,bk)!=bs){bL+=this.__hj(bH.parentNode,bh);
top+=this.__hj(bH.parentNode,bi);
}bH=bH.offsetParent;
}}return {left:bL,top:top};
},"default":function(u){var w=0;
var top=0;
var v=qx.dom.Node.getDocument(u).body;
while(u&&u!==v){w+=u.offsetLeft;
top+=u.offsetTop;
u=u.offsetParent;
}return {left:w,top:top};
}}),get:function(e,f){if(e.tagName==br){var location=this.__hn(e);
var m=location.left;
var top=location.top;
}else{var g=this.__hl(e);
var l=this.__hm(e);
var scroll=this.__hk(e);
var m=l.left+g.left-scroll.left;
var top=l.top+g.top-scroll.top;
}var h=m+e.offsetWidth;
var i=top+e.offsetHeight;

if(f){if(f==bx||f==be){var j=qx.bom.element.Overflow.getX(e);

if(j==be||j==Y){h+=e.scrollWidth-e.offsetWidth+this.__hj(e,bh)+this.__hj(e,ba);
}var k=qx.bom.element.Overflow.getY(e);

if(k==be||k==Y){i+=e.scrollHeight-e.offsetHeight+this.__hj(e,bi)+this.__hj(e,bb);
}}
switch(f){case bx:m+=this.__hj(e,bv);
top+=this.__hj(e,bp);
h-=this.__hj(e,bl);
i-=this.__hj(e,bq);
case be:m-=e.scrollLeft;
top-=e.scrollTop;
h-=e.scrollLeft;
i-=e.scrollTop;
case bj:m+=this.__hj(e,bh);
top+=this.__hj(e,bi);
h-=this.__hj(e,ba);
i-=this.__hj(e,bb);
break;
case bn:m-=this.__hj(e,bf);
top-=this.__hj(e,bg);
h+=this.__hj(e,bo);
i+=this.__hj(e,bt);
break;
}}return {left:m,top:top,right:h,bottom:i};
},__hn:qx.core.Variant.select(bd,{"default":function(T){var top=T.offsetTop+this.__hj(T,bg);
var U=T.offsetLeft+this.__hj(T,bf);
return {left:U,top:top};
},"mshtml":function(by){var top=by.offsetTop;
var bz=by.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__hj(by,bg);
bz+=this.__hj(by,bf);
}return {left:bz,top:top};
},"gecko":function(J){var top=J.offsetTop+this.__hj(J,bg)+this.__hj(J,bh);
var K=J.offsetLeft+this.__hj(J,bf)+this.__hj(J,bi);
return {left:K,top:top};
}}),getLeft:function(L,M){return this.get(L,M).left;
},getTop:function(bF,bG){return this.get(bF,bG).top;
},getRight:function(H,I){return this.get(H,I).right;
},getBottom:function(x,y){return this.get(x,y).bottom;
},getRelative:function(z,A,B,C){var E=this.get(z,B);
var D=this.get(A,C);
return {left:E.left-D.left,top:E.top-D.top,right:E.right-D.right,bottom:E.bottom-D.bottom};
},getPosition:function(bP){return this.getRelative(bP,this.getOffsetParent(bP));
},getOffsetParent:function(V){var X=V.offsetParent||document.body;
var W=qx.bom.element.Style;

while(X&&(!/^body|html$/i.test(X.tagName)&&W.get(X,bm)===bu)){X=X.offsetParent;
}return X;
}}});
})();
(function(){var C="textarea",B="input",A="qx.client",z="character",y="qx.bom.Selection",x="#text",w="EndToEnd",v="button",u="body";
qx.Class.define(y,{statics:{getSelectionObject:qx.core.Variant.select(A,{"mshtml":function(O){return O.selection;
},"default":function(p){return qx.dom.Node.getWindow(p).getSelection();
}}),get:qx.core.Variant.select(A,{"mshtml":function(a){var b=qx.bom.Range.get(qx.dom.Node.getDocument(a));
return b.text;
},"default":function(D){if(qx.dom.Node.isElement(D)&&(D.nodeName.toLowerCase()==B||D.nodeName.toLowerCase()==C)){return D.value.substring(D.selectionStart,D.selectionEnd);
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(D)).toString();
}return null;
}}),getLength:qx.core.Variant.select(A,{"mshtml":function(F){var H=qx.bom.Selection.get(F);
var G=qx.util.StringSplit.split(H,/\r\n/);
return H.length-(G.length-1);
},"opera":function(I){var N,L,J;

if(qx.dom.Node.isElement(I)&&(I.nodeName.toLowerCase()==B||I.nodeName.toLowerCase()==C)){var M=I.selectionStart;
var K=I.selectionEnd;
N=I.value.substring(M,K);
L=K-M;
}else{N=qx.bom.Selection.get(I);
L=N.length;
}J=qx.util.StringSplit.split(N,/\r\n/);
return L-(J.length-1);
},"default":function(E){if(qx.dom.Node.isElement(E)&&(E.nodeName.toLowerCase()==B||E.nodeName.toLowerCase()==C)){return E.selectionEnd-E.selectionStart;
}else{return qx.bom.Selection.get(E).length;
}return null;
}}),set:qx.core.Variant.select(A,{"mshtml":function(c,d,e){var f;
if(qx.dom.Node.isDocument(c)){c=c.body;
}
if(qx.dom.Node.isElement(c)||qx.dom.Node.isText(c)){switch(c.nodeName.toLowerCase()){case B:case C:case v:if(e===undefined){e=c.value.length;
}
if(d>=0&&d<=c.value.length&&e>=0&&e<=c.value.length){f=qx.bom.Range.get(c);
f.collapse(true);
f.moveStart(z,d);
f.moveEnd(z,e-d);
f.select();
return true;
}break;
case x:if(e===undefined){e=c.nodeValue.length;
}
if(d>=0&&d<=c.nodeValue.length&&e>=0&&e<=c.nodeValue.length){f=qx.bom.Range.get(qx.dom.Node.getBodyElement(c));
f.moveToElementText(c.parentNode);
f.collapse(true);
f.moveStart(z,d);
f.moveEnd(z,e-d);
f.select();
return true;
}break;
default:if(e===undefined){e=c.childNodes.length-1;
}if(c.childNodes[d]&&c.childNodes[e]){f=qx.bom.Range.get(qx.dom.Node.getBodyElement(c));
f.moveToElementText(c.childNodes[d]);
f.collapse(true);
var g=qx.bom.Range.get(qx.dom.Node.getBodyElement(c));
g.moveToElementText(c.childNodes[e]);
f.setEndPoint(w,g);
f.select();
return true;
}}}return false;
},"default":function(h,i,j){var n=h.nodeName.toLowerCase();

if(qx.dom.Node.isElement(h)&&(n==B||n==C)){if(j===undefined){j=h.value.length;
}if(i>=0&&i<=h.value.length&&j>=0&&j<=h.value.length){h.select();
h.setSelectionRange(i,j);
return true;
}}else{var l=false;
var m=qx.dom.Node.getWindow(h).getSelection();
var k=qx.bom.Range.get(h);
if(qx.dom.Node.isText(h)){if(j===undefined){j=h.length;
}
if(i>=0&&i<h.length&&j>=0&&j<=h.length){l=true;
}}else if(qx.dom.Node.isElement(h)){if(j===undefined){j=h.childNodes.length-1;
}
if(i>=0&&h.childNodes[i]&&j>=0&&h.childNodes[j]){l=true;
}}else if(qx.dom.Node.isDocument(h)){h=h.body;

if(j===undefined){j=h.childNodes.length-1;
}
if(i>=0&&h.childNodes[i]&&j>=0&&h.childNodes[j]){l=true;
}}
if(l){if(!m.isCollapsed){m.collapseToStart();
}k.setStart(h,i);
if(qx.dom.Node.isText(h)){k.setEnd(h,j);
}else{k.setEndAfter(h.childNodes[j]);
}if(m.rangeCount>0){m.removeAllRanges();
}m.addRange(k);
return true;
}}return false;
}}),setAll:function(o){return qx.bom.Selection.set(o,0);
},clear:qx.core.Variant.select(A,{"mshtml":function(q){var r=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(q));
var s=qx.bom.Range.get(q);
var parent=s.parentElement();
var t=qx.bom.Range.get(qx.dom.Node.getDocument(q));
if(parent==t.parentElement()&&parent==q){r.empty();
}},"default":function(P){var R=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(P));
var T=P.nodeName.toLowerCase();
if(qx.dom.Node.isElement(P)&&(T==B||T==C)){P.setSelectionRange(0,0);
qx.bom.Element.blur(P);
}else if(qx.dom.Node.isDocument(P)||T==u){R.collapse(P.body?P.body:P,0);
}else{var S=qx.bom.Range.get(P);

if(!S.collapsed){var U;
var Q=S.commonAncestorContainer;
if(qx.dom.Node.isElement(P)&&qx.dom.Node.isText(Q)){U=Q.parentNode;
}else{U=Q;
}
if(U==P){R.collapse(P,0);
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
}}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();
}},"default":function(n){var o=qx.dom.Node.getDocument(n);
var p=qx.bom.Selection.getSelectionObject(o);

if(p.rangeCount>0){return p.getRangeAt(0);
}else{return o.createRange();
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
qx.Class.define(b,{statics:{__ho:{},remove:function(c){delete this.__ho[c.$$hash];
},add:function(g){var h=this.__ho;

if(h[g.$$hash]){return;
}h[g.$$hash]=g;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var d=this.__ho;
var f;

for(var e in d){f=d[e];
delete d[e];
f.syncWidget();
}for(var e in d){return;
}this.__ho={};
}}});
})();
(function(){var i="qx.ui.core.queue.Visibility",h="visibility";
qx.Class.define(i,{statics:{__hp:{},__hq:{},remove:function(a){var b=a.$$hash;
delete this.__hq[b];
delete this.__hp[b];
},isVisible:function(c){return this.__hq[c.$$hash]||false;
},__hr:function(d){var f=this.__hq;
var e=d.$$hash;
var g;
if(d.isExcluded()){g=false;
}else{var parent=d.$$parent;

if(parent){g=this.__hr(parent);
}else{g=d.isRootWidget();
}}return f[e]=g;
},add:function(j){var k=this.__hp;

if(k[j.$$hash]){return;
}k[j.$$hash]=j;
qx.ui.core.queue.Manager.scheduleFlush(h);
},flush:function(){var l=this.__hp;
var o=this.__hq;
for(var m in l){if(o[m]!=null){l[m].addChildrenToQueue(l);
}}var n={};

for(var m in l){n[m]=o[m];
o[m]=null;
}for(var m in l){if(o[m]==null){this.__hr(l[m]);
}if(o[m]&&o[m]!=n[m]){l[m].checkAppearanceNeeds();
}}this.__hp={};
}}});
})();
(function(){var g="appearance",f="qx.ui.core.queue.Appearance";
qx.Class.define(f,{statics:{__hs:{},remove:function(h){delete this.__hs[h.$$hash];
},add:function(i){var j=this.__hs;

if(j[i.$$hash]){return;
}j[i.$$hash]=i;
qx.ui.core.queue.Manager.scheduleFlush(g);
},has:function(a){return !!this.__hs[a.$$hash];
},flush:function(){var e=qx.ui.core.queue.Visibility;
var b=this.__hs;
var d;

for(var c in b){d=b[c];
delete b[c];
if(e.isVisible(d)){d.syncAppearance();
}else{d.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__ht:{},add:function(c){var d=this.__ht;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__ht;

for(var f in e){e[f].dispose();
delete e[f];
}for(var f in e){return;
}this.__ht={};
}}});
})();
(function(){var k="blur",j="focus",h="input",g="load",f="qx.ui.core.EventHandler",e="activate",d="__hu";
qx.Class.define(f,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__hu=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hu:null,__hv:{focusin:1,focusout:1,focus:1,blur:1},__hw:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(a,b){return a instanceof qx.ui.core.Widget;
},_dispatchEvent:function(m){var r=m.getTarget();
var q=qx.ui.core.Widget.getWidgetByElement(r);
var s=false;

while(q&&q.isAnonymous()){var s=true;
q=q.getLayoutParent();
}if(q&&s&&m.getType()==e){q.getContainerElement().activate();
}if(this.__hv[m.getType()]){q=q&&q.getFocusTarget();
if(!q){return;
}}if(m.getRelatedTarget){var z=m.getRelatedTarget();
var y=qx.ui.core.Widget.getWidgetByElement(z);

while(y&&y.isAnonymous()){y=y.getLayoutParent();
}
if(y){if(this.__hv[m.getType()]){y=y.getFocusTarget();
}if(y===q){return;
}}}var u=m.getCurrentTarget();
var w=qx.ui.core.Widget.getWidgetByElement(u);

if(!w||w.isAnonymous()){return;
}if(this.__hv[m.getType()]){w=w.getFocusTarget();
}var x=m.getType();

if(!(w.isEnabled()||this.__hw[x])){return;
}var n=m.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var t=this.__hu.getListeners(w,x,n);

if(!t||t.length===0){return;
}var o=qx.event.Pool.getInstance().getObject(m.constructor);
m.clone(o);
o.setTarget(q);
o.setRelatedTarget(y||null);
o.setCurrentTarget(w);
var A=m.getOriginalTarget();

if(A){var p=qx.ui.core.Widget.getWidgetByElement(A);

while(p&&p.isAnonymous()){p=p.getLayoutParent();
}o.setOriginalTarget(p);
}else{o.setOriginalTarget(r);
}for(var i=0,l=t.length;i<l;i++){var v=t[i].context||w;
t[i].handler.call(v,o);
}if(o.getPropagationStopped()){m.stopPropagation();
}
if(o.getDefaultPrevented()){m.preventDefault();
}qx.event.Pool.getInstance().poolObject(o);
},registerEvent:function(F,G,H){var I;

if(G===j||G===k){I=F.getFocusElement();
}else if(G===g||G===h){I=F.getContentElement();
}else{I=F.getContainerElement();
}
if(I){I.addListener(G,this._dispatchEvent,this,H);
}},unregisterEvent:function(B,C,D){var E;

if(C===j||C===k){E=B.getFocusElement();
}else if(C===g||C===h){E=B.getContentElement();
}else{E=B.getContainerElement();
}
if(E){E.removeListener(C,this._dispatchEvent,this,D);
}}},destruct:function(){this._disposeFields(d);
},defer:function(c){qx.event.Registration.addHandler(c);
}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Bootstrap.define(c,{statics:{LOCALE:"",VARIANT:"",__hx:function(){var e=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var g=a;
var f=e.indexOf(b);

if(f!=-1){g=e.substr(f+1);
e=e.substr(0,f);
}this.LOCALE=e;
this.VARIANT=g;
}},defer:function(d){d.__hx();
}});
})();
(function(){var t='indexOf',s='slice',r='concat',q='toLocaleLowerCase',p="qx.type.BaseString",o="",n='match',m='toLocaleUpperCase',k='search',j='replace',c='toLowerCase',h='charCodeAt',f='split',b='substring',a='lastIndexOf',e='substr',d='toUpperCase',g='charAt';
qx.Class.define(p,{extend:Object,construct:function(u){var u=u||o;
this.__hy=u;
this.length=u.length;
},members:{$$isString:true,length:0,__hy:null,toString:function(){return this.__hy;
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
this.__hz=c;
this.__hA=d;
},members:{__hz:null,__hA:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__hz,this.__hA);
}}});
})();
(function(){var D="_",C="",B="qx.dynlocale",A="on",z="_applyLocale",y="changeLocale",x="C",w="__hC",v="__hB",u="qx.locale.Manager",s="String",t="singleton";
qx.Class.define(u,{type:t,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hB=qx.$$translations||{};
this.__hC=qx.$$locales||{};
var f=qx.bom.client.Locale;
var d=f.LOCALE;
var e=f.VARIANT;

if(e!==C){d+=D+e;
}this.setLocale(d||this.__hD);
},statics:{tr:function(a,b){var c=qx.lang.Array.fromArguments(arguments);
c.splice(0,1);
return qx.locale.Manager.getInstance().translate(a,c);
},trn:function(M,N,O,P){var Q=qx.lang.Array.fromArguments(arguments);
Q.splice(0,3);
if(O!=1){return qx.locale.Manager.getInstance().translate(N,Q);
}else{return qx.locale.Manager.getInstance().translate(M,Q);
}},trc:function(R,S,T){var U=qx.lang.Array.fromArguments(arguments);
U.splice(0,2);
return qx.locale.Manager.getInstance().translate(S,U);
},marktr:function(be){return be;
}},properties:{locale:{check:s,nullable:true,apply:z,event:y}},members:{__hD:x,__hE:null,__hF:null,__hB:null,__hC:null,getLanguage:function(){return this.__hF;
},getTerritory:function(){return this.getLocale().split(D)[1]||C;
},getAvailableLocales:function(){var H=[];

for(var G in this.__hC){if(G!=this.__hD){H.push(G);
}}return H;
},__hG:function(g){var j;
var h=g.indexOf(D);

if(h==-1){j=g;
}else{j=g.substring(0,h);
}return j;
},_applyLocale:function(E,F){this.__hE=E;
this.__hF=this.__hG(E);
},addTranslation:function(I,J){var K=this.__hB;

if(K[I]){for(var L in J){K[I][L]=J[L];
}}else{K[I]=J;
}},translate:function(V,W,X){var bd;
var bb=this.__hB;

if(!bb){return V;
}
if(X){var ba=this.__hG(X);
}else{X=this.__hE;
ba=this.__hF;
}
if(!bd&&bb[X]){bd=bb[X][V];
}
if(!bd&&bb[ba]){bd=bb[ba][V];
}
if(!bd&&bb[this.__hD]){bd=bb[this.__hD][V];
}
if(!bd){bd=V;
}
if(W.length>0){var Y=[];

for(var i=0;i<W.length;i++){var bc=W[i];

if(bc&&bc.translate){Y[i]=bc.translate();
}else{Y[i]=bc;
}}bd=qx.lang.String.format(bd,Y);
}
if(qx.core.Variant.isSet(B,A)){bd=new qx.locale.LocalizedString(bd,V,W);
}return bd;
},localize:function(k,l,m){var r;
var p=this.__hC;

if(!p){return k;
}
if(m){var o=this.__hG(m);
}else{m=this.__hE;
o=this.__hF;
}
if(!r&&p[m]){r=p[m][k];
}
if(!r&&p[o]){r=p[o][k];
}
if(!r&&p[this.__hD]){r=p[this.__hD][k];
}
if(!r){r=k;
}
if(l.length>0){var n=[];

for(var i=0;i<l.length;i++){var q=l[i];

if(q.translate){n[i]=q.translate();
}else{n[i]=q;
}}r=qx.lang.String.format(r,n);
}
if(qx.core.Variant.isSet(B,A)){r=new qx.locale.LocalizedString(r,k,l);
}return r;
}},destruct:function(){this._disposeFields(v,w);
}});
})();
(function(){var l="source",k="scale",j="no-repeat",i="mshtml",h="qx.client",g="qx.html.Image";
qx.Class.define(g,{extend:qx.html.Element,members:{_applyProperty:function(name,a){arguments.callee.base.call(this,name,a);

if(name===l){var e=this.getDomElement();
var b=this.getAllStyles();
var c=this._getProperty(l);
var d=this._getProperty(k);
var f=d?k:j;
qx.bom.element.Decoration.update(e,c,f,b);
}},_createDomElement:function(){var o=this._getProperty(k);
var p=o?k:j;

if(qx.core.Variant.isSet(h,i)){var n=this._getProperty(l);
this.setNodeName(qx.bom.element.Decoration.getTagName(p,n));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(p));
}return arguments.callee.base.call(this);
},_copyData:function(r){return arguments.callee.base.call(this,true);
},setSource:function(q){this._setProperty(l,q);
return this;
},getSource:function(){return this._getProperty(l);
},resetSource:function(){this._removeProperty(l);
return this;
},setScale:function(m){this._setProperty(k,m);
return this;
},getScale:function(){return this._getProperty(k);
}}});
})();
(function(){var v="replacement",u="Boolean",t="_applyScale",s="_applySource",r="-disabled.$1",q="changeSource",p="String",o="image",n="qx.ui.basic.Image";
qx.Class.define(n,{extend:qx.ui.core.Widget,construct:function(a){arguments.callee.base.call(this);

if(a){this.setSource(a);
}},properties:{source:{check:p,init:null,nullable:true,event:q,apply:s,themeable:true},scale:{check:u,init:false,themeable:true,apply:t},appearance:{refine:true,init:o},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__hH:null,__hI:null,_createContentElement:function(){return new qx.html.Image();
},_getContentHint:function(){return {width:this.__hH||0,height:this.__hI||0};
},_applyEnabled:function(B,C){arguments.callee.base.call(this,B,C);

if(this.getSource()){this._styleSource();
}},_applySource:function(b){this._styleSource();
},_applyScale:function(f){var g=this.getContentElement();
g.setScale(f);
},_styleSource:function(){var D=qx.util.AliasManager.getInstance().resolve(this.getSource());
var E=this.getContentElement();

if(!D){E.resetSource();
return;
}if(qx.util.ResourceManager.getInstance().has(D)){this.__hJ(E,D);
}else if(qx.io2.ImageLoader.isLoaded(D)){this.__hK(E,D);
}else{this.__hL(E,D);
}},__hJ:function(j,k){var m=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var l=k.replace(/\.([a-z]+)$/,r);

if(m.has(l)){k=l;
this.addState(v);
}else{this.removeState(v);
}}if(j.getSource()===k){return;
}j.setSource(k);
this.__hN(m.getImageWidth(k),m.getImageHeight(k));
},__hK:function(w,x){var z=qx.io2.ImageLoader;
w.setSource(x);
var y=z.getWidth(x);
var A=z.getHeight(x);
this.__hN(y,A);
},__hL:function(c,d){var self;
var e=qx.io2.ImageLoader;
{};
if(!e.isFailed(d)){e.load(d,this.__hM,this);
}else{if(c!=null){c.resetSource();
}}},__hM:function(F,G){if(F!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(G.failed){this.warn("Image could not be loaded: "+F);
}this._styleSource();
},__hN:function(h,i){if(h!==this.__hH||i!==this.__hI){this.__hH=h;
this.__hI=i;
qx.ui.core.queue.Layout.add(this);
}}}});
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
(function(){var h="interval",g="Number",f="_applyTimeoutInterval",e="qx.event.type.Event",d="qx.event.Idle",c="__hO",b="singleton";
qx.Class.define(d,{extend:qx.core.Object,type:b,construct:function(){arguments.callee.base.call(this);
var i=new qx.event.Timer(this.getTimeoutInterval());
i.addListener(h,this._onInterval,this);
i.start();
this.__hO=i;
},events:{"interval":e},properties:{timeoutInterval:{check:g,init:100,apply:f}},members:{__hO:null,_applyTimeoutInterval:function(a){this.__hO.setInterval(a);
},_onInterval:function(){this.fireEvent(h);
}},destruct:function(){if(this.__hO){this.__hO.stop();
}this._disposeFields(c);
}});
})();
(function(){var f="bottom",e="top",d="left",c="right",b="-",a="qx.util.PlaceUtil";
qx.Class.define(a,{statics:{compute:function(g,h,i,j,k,l){var z=0;
var top=0;
var p,o;
var v=j.split(b);
var s=v[0];
var y=v[1];
var t=0,q=0,u=0,w=0;

if(l){t+=l.left||0;
q+=l.top||0;
u+=l.right||0;
w+=l.bottom||0;
}switch(s){case d:z=i.left-g.width-t;
break;
case e:top=i.top-g.height-q;
break;
case c:z=i.right+u;
break;
case f:top=i.bottom+w;
break;
}switch(y){case d:z=i.left;
break;
case e:top=i.top;
break;
case c:z=i.right-g.width;
break;
case f:top=i.bottom-g.height;
break;
}
if(k===false){return {left:z,top:top};
}else{var r=Math.min(z,h.width-z-g.width);

if(r<0){var n=z;

if(z<0){if(s==d){n=i.right+u;
}else if(y==c){n=i.left;
}}else{if(s==c){n=i.left-g.width-t;
}else if(y==d){n=i.right-g.width;
}}p=Math.min(n,h.width-n-g.width);

if(p>r){z=n;
r=p;
}}var m=Math.min(top,h.height-top-g.height);

if(m<0){var x=top;

if(top<0){if(s==e){x=i.bottom+w;
}else if(y==f){x=i.top;
}}else{if(s==f){x=i.top-g.height-q;
}else if(y==e){x=i.bottom-g.height;
}}o=Math.min(x,h.height-x-g.height);

if(o>m){top=x;
m=o;
}}return {left:z,top:top,ratingX:r,ratingY:m};
}}}});
})();
(function(){var i="mousedown",h="__hP",g="blur",f="singleton",d="qx.ui.popup.Manager";
qx.Class.define(d,{type:f,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hP={};
qx.event.Registration.addListener(document.documentElement,i,this.__hR,this,true);
qx.bom.Element.addListener(window,g,this.hideAll,this);
},members:{__hP:null,add:function(c){{};
this.__hP[c.$$hash]=c;
this.__hQ();
},remove:function(a){{};
var b=this.__hP;

if(b){delete b[a.$$hash];
this.__hQ();
}},hideAll:function(){var k=this.__hP;

if(k){for(var j in k){k[j].exclude();
}}},__hQ:function(){var r=1e7;
var q=this.__hP;

for(var p in q){q[p].setZIndex(r++);
}},__hR:function(e){var n=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var o=this.__hP;

for(var m in o){var l=o[m];

if(!l.getAutoHide()||n==l||qx.ui.core.Widget.contains(l,n)){continue;
}l.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,i,this.__hR,this,true);
this._disposeMap(h);
}});
})();
(function(){var j="abstract",i="__hT",h="qx.ui.layout.Abstract",g="__hS";
qx.Class.define(h,{type:j,extend:qx.core.Object,members:{__hS:null,_invalidChildrenCache:null,__hT:null,invalidateLayoutCache:function(){this.__hS=null;
},renderLayout:function(a,b){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__hS){return this.__hS;
}return this.__hS=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(f){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var c=this.__hT;

if(c instanceof qx.ui.core.LayoutItem){c.clearSeparators();
}},_renderSeparator:function(d,e){this.__hT.renderSeparator(d,e);
},connectToWidget:function(k){if(k&&this.__hT){throw new Error("It is not possible to manually set the connected widget.");
}this.__hT=k;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__hT;
},_applyLayoutChange:function(){if(this.__hT){this.__hT.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__hT.getLayoutChildren();
}},destruct:function(){this._disposeFields(i,g);
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
}},_computeSizeHint:function(){var m=this._getLayoutChildren();
var j,o;
var n=0,k=0;
for(var i=0,l=m.length;i<l;i++){j=m[i];
o=j.getSizeHint();
n=Math.max(n,o.width);
k=Math.max(k,o.height);
}return {width:n,height:k};
}}});
})();
(function(){var u="label",t="icon",s="Boolean",r="left",q="both",p="String",o="_applyRich",n="_applyIcon",m="changeGap",l="_applyShow",e="right",k="_applyCenter",h="_applyIconPosition",c="qx.ui.basic.Atom",b="top",g="changeShow",f="bottom",i="_applyLabel",a="Integer",j="_applyGap",d="atom";
qx.Class.define(c,{extend:qx.ui.core.Widget,construct:function(v,w){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(v!=null){this.setLabel(v);
}
if(w!=null){this.setIcon(w);
}},properties:{appearance:{refine:true,init:d},label:{apply:i,nullable:true,dispose:true,check:p},rich:{check:s,init:false,apply:o},icon:{check:p,apply:n,nullable:true,themeable:true},gap:{check:a,nullable:false,event:m,apply:j,themeable:true,init:4},show:{init:q,check:[q,u,t],themeable:true,inheritable:true,apply:l,event:g},iconPosition:{init:r,check:[b,e,f,r],themeable:true,apply:h},center:{init:false,check:s,themeable:true,apply:k}},members:{_createChildControlImpl:function(F){var G;

switch(F){case u:G=new qx.ui.basic.Label(this.getLabel());
G.setAnonymous(true);
G.setRich(this.getRich());
this._add(G);

if(this.getLabel()==null||this.getShow()===t){G.exclude();
}break;
case t:G=new qx.ui.basic.Image(this.getIcon());
G.setAnonymous(true);
this._addAt(G,0);

if(this.getIcon()==null||this.getShow()===u){G.exclude();
}break;
}return G||arguments.callee.base.call(this,F);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===t){this._excludeChildControl(u);
}else{this._showChildControl(u);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===u){this._excludeChildControl(t);
}else{this._showChildControl(t);
}},_applyLabel:function(N,O){var P=this.getChildControl(u,true);

if(P){P.setValue(N);
}this._handleLabel();
},_applyRich:function(z,A){var B=this.getChildControl(u,true);

if(B){B.setRich(z);
}},_applyIcon:function(C,D){var E=this.getChildControl(t,true);

if(E){E.setSource(C);
}this._handleIcon();
},_applyGap:function(x,y){this._getLayout().setGap(x);
},_applyShow:function(H,I){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(L,M){this._getLayout().setIconPosition(L);
},_applyCenter:function(J,K){this._getLayout().setCenter(J);
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
qx.Class.define(f,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(h,j,k){var n,r,m,s;
var o=j>k;
var t=Math.abs(j-k);
var u,p;
var q={};

for(r in h){n=h[r];
q[r]={potential:o?n.max-n.value:n.value-n.min,flex:o?n.flex:1/n.flex,offset:0};
}while(t!=0){s=Infinity;
m=0;

for(r in q){n=q[r];

if(n.potential>0){m+=n.flex;
s=Math.min(s,n.potential/n.flex);
}}if(m==0){break;
}s=Math.min(t,s*m)/m;
u=0;

for(r in q){n=q[r];

if(n.potential>0){p=Math.min(t,n.potential,Math.ceil(s*n.flex));
u+=p-s*n.flex;

if(u>=1){u-=1;
p-=1;
}n.potential-=p;

if(o){n.offset+=p;
}else{n.offset-=p;
}t-=p;
}}}return q;
},computeHorizontalAlignOffset:function(P,Q,R,S,T){if(S==null){S=0;
}
if(T==null){T=0;
}var U=0;

switch(P){case e:U=S;
break;
case a:U=R-Q-T;
break;
case d:U=Math.round((R-Q)/2);
if(U<S){U=S;
}else if(U<T){U=Math.max(S,R-Q-T);
}break;
}return U;
},computeVerticalAlignOffset:function(v,w,x,y,z){if(y==null){y=0;
}
if(z==null){z=0;
}var A=0;

switch(v){case c:A=y;
break;
case b:A=x-w-z;
break;
case g:A=Math.round((x-w)/2);
if(A<y){A=y;
}else if(A<z){A=Math.max(y,x-w-z);
}break;
}return A;
},collapseMargins:function(bi){var bj=0,bl=0;

for(var i=0,l=arguments.length;i<l;i++){var bk=arguments[i];

if(bk<0){bl=Math.min(bl,bk);
}else if(bk>0){bj=Math.max(bj,bk);
}}return bj+bl;
},computeHorizontalGaps:function(bm,bn,bo){if(bn==null){bn=0;
}var bp=0;

if(bo){bp+=bm[0].getMarginLeft();

for(var i=1,l=bm.length;i<l;i+=1){bp+=this.collapseMargins(bn,bm[i-1].getMarginRight(),bm[i].getMarginLeft());
}bp+=bm[l-1].getMarginRight();
}else{for(var i=1,l=bm.length;i<l;i+=1){bp+=bm[i].getMarginLeft()+bm[i].getMarginRight();
}bp+=(bn*(l-1));
}return bp;
},computeVerticalGaps:function(V,W,X){if(W==null){W=0;
}var Y=0;

if(X){Y+=V[0].getMarginTop();

for(var i=1,l=V.length;i<l;i+=1){Y+=this.collapseMargins(W,V[i-1].getMarginBottom(),V[i].getMarginTop());
}Y+=V[l-1].getMarginBottom();
}else{for(var i=1,l=V.length;i<l;i+=1){Y+=V[i].getMarginTop()+V[i].getMarginBottom();
}Y+=(W*(l-1));
}return Y;
},computeHorizontalSeparatorGaps:function(ba,bb,bc){var bf=qx.theme.manager.Decoration.getInstance().resolve(bc);
var be=bf.getInsets();
var bd=be.left+be.right;
var bg=0;

for(var i=0,l=ba.length;i<l;i++){var bh=ba[i];
bg+=bh.getMarginLeft()+bh.getMarginRight();
}bg+=(bb+bd+bb)*(l-1);
return bg;
},computeVerticalSeparatorGaps:function(H,I,J){var M=qx.theme.manager.Decoration.getInstance().resolve(J);
var L=M.getInsets();
var K=L.top+L.bottom;
var N=0;

for(var i=0,l=H.length;i<l;i++){var O=H[i];
N+=O.getMarginTop()+O.getMarginBottom();
}N+=(I+K+I)*(l-1);
return N;
},arrangeIdeals:function(B,C,D,E,F,G){if(C<B||F<E){if(C<B&&F<E){C=B;
F=E;
}else if(C<B){F-=(B-C);
C=B;
if(F<E){F=E;
}}else if(F<E){C-=(E-F);
F=E;
if(C<B){C=B;
}}}
if(C>D||F>G){if(C>D&&F>G){C=D;
F=G;
}else if(C>D){F+=(C-D);
C=D;
if(F>G){F=G;
}}else if(F>G){C+=(F-G);
F=G;
if(C>D){C=D;
}}}return {begin:C,end:F};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var u="Please use the value property instead.",t="changeContent",s="qx.dynlocale",r="text",q="color",p="userSelect",o="changeLocale",n="enabled",m="none",l="on",S="_applyTextAlign",R="Boolean",Q="qx.ui.core.Widget",P="Please use the changeValue event instead.",O="changeTextAlign",N="changeValue",M="qx.client",L="qx.ui.basic.Label",K="A",J="_applyValue",B="center",C="_applyBuddy",z="qx.event.type.Data",A="String",x="__hW",y="textAlign",v="right",w="changeRich",D="_applyRich",E="click",G="label",F="webkit",I="left",H="__hU";
qx.Class.define(L,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(f){arguments.callee.base.call(this);

if(f!=null){this.setValue(f);
}
if(qx.core.Variant.isSet(s,l)){qx.locale.Manager.getInstance().addListener(o,this._onChangeLocale,this);
}},events:{"changeContent":z},properties:{rich:{check:R,init:false,event:w,apply:D},value:{check:A,apply:J,event:N,nullable:true},buddy:{check:Q,apply:C,nullable:true,init:null},textAlign:{check:[I,B,v],nullable:true,themeable:true,apply:S,event:O},appearance:{refine:true,init:G},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__hU:null,__hV:null,__hW:null,__hX:null,_getContentHint:function(){if(this.__hV){this.__hY=this.__ia();
delete this.__hV;
}return {width:this.__hY.width,height:this.__hY.height};
},_hasHeightForWidth:function(){return this.getRich();
},_applySelectable:function(a){arguments.callee.base.call(this,a);
if(qx.core.Variant.isSet(M,F)){this.getContainerElement().setStyle(p,a?r:m);
this.getContentElement().setStyle(p,a?r:m);
}},_getContentHeightForWidth:function(bi){if(!this.getRich()){return null;
}return this.__ia(bi).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(W,X){this.getContentElement().setStyle(y,W);
},_applyTextColor:function(g,h){if(g){this.getContentElement().setStyle(q,qx.theme.manager.Color.getInstance().resolve(g));
}else{this.getContentElement().removeStyle(q);
}},__hY:{width:0,height:0},_applyFont:function(T,U){var V;

if(T){this.__hU=qx.theme.manager.Font.getInstance().resolve(T);
V=this.__hU.getStyles();
}else{this.__hU=null;
V=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(V);
this.__hV=true;
qx.ui.core.queue.Layout.add(this);
},__ia:function(bd){var bh=qx.bom.Label;
var bf=this.getFont();
var be=bf?this.__hU.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||K;
var bg=this.getRich();
return bg?bh.getHtmlSize(content,be,bd):bh.getTextSize(content,be);
},_applyBuddy:function(i,j){if(j!=null){j.removeBinding(this.__hW);
this.__hW=null;
this.removeListenerById(this.__hX);
this.__hX=null;
}
if(i!=null){this.__hW=i.bind(n,this,n);
this.__hX=this.addListener(E,i.focus,i);
}},_applyRich:function(k){this.getContentElement().setRich(k);
this.__hV=true;
qx.ui.core.queue.Layout.add(this);
},_onChangeLocale:qx.core.Variant.select(s,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(b,c){this.getContentElement().setContent(b);
this.__hV=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(t,b,c);
},setContent:function(d){qx.log.Logger.deprecatedMethodWarning(arguments.callee,u);
this.setValue(d);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,u);
return this.getValue();
},resetContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,u);
this.resetValue();
},addListener:function(Y,ba,self,bb){if(Y==t){qx.log.Logger.deprecatedEventWarning(arguments.callee,t,P);
}return arguments.callee.base.call(this,Y,ba,self,bb);
}},destruct:function(){if(qx.core.Variant.isSet(s,l)){qx.locale.Manager.getInstance().removeListener(o,this._onChangeLocale,this);
}if(this.__hW!=null){var bc=this.getBuddy();

if(bc!=null&&!bc.isDisposed()){bc.removeBinding(this.__hW);
}}this._disposeFields(H,x);
}});
})();
(function(){var b="content",a="qx.html.Label";
qx.Class.define(a,{extend:qx.html.Element,members:{__ib:null,_applyProperty:function(name,f){arguments.callee.base.call(this,name,f);

if(name==b){var g=this.getDomElement();
qx.bom.Label.setContent(g,f);
}},_createDomElement:function(){var d=this.__ib;
var c=qx.bom.Label.create(this._content,d);
return c;
},_copyData:function(h){return arguments.callee.base.call(this,true);
},setRich:function(i){var j=this.getDomElement();

if(j){throw new Error("The label mode cannot be modified after initial creation");
}i=!!i;

if(this.__ib==i){return;
}this.__ib=i;
return this;
},setContent:function(e){this._setProperty(b,e);
return this;
},getContent:function(){return this._getProperty(b);
}}});
})();
(function(){var s="qx.client",r="gecko",q="div",p="inherit",o="text",n="value",m="",l="hidden",k="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",j="nowrap",H="auto",G="ellipsis",F="normal",E="label",D="px",C="crop",B="end",A="100%",z="visible",y="qx.bom.Label",w="opera",x="block",u="none",v="-1000px",t="absolute";
qx.Class.define(y,{statics:{__ic:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__id:function(){var S=this.__if(false);
document.body.insertBefore(S,document.body.firstChild);
return this._textElement=S;
},__ie:function(){var c=this.__if(true);
document.body.insertBefore(c,document.body.firstChild);
return this._htmlElement=c;
},__if:function(I){var J=qx.bom.Element.create(q);
var K=J.style;
K.width=K.height=H;
K.left=K.top=v;
K.visibility=l;
K.position=t;
K.overflow=z;

if(I){K.whiteSpace=F;
}else{K.whiteSpace=j;

if(qx.core.Variant.isSet(s,r)){var L=document.createElementNS(k,E);
for(var M in this.__ic){L.style[M]=p;
}J.appendChild(L);
}}return J;
},__ig:function(a){var b={};

if(a){b.whiteSpace=F;
}else if(qx.core.Variant.isSet(s,r)){b.display=x;
}else{b.overflow=l;
b.whiteSpace=j;
b.textOverflow=G;
b.userSelect=u;
if(qx.core.Variant.isSet(s,w)){b.OTextOverflow=G;
}}return b;
},create:function(content,T,U){if(!U){U=window;
}
if(T){var V=U.document.createElement(q);
V.useHtml=true;
}else if(qx.core.Variant.isSet(s,r)){var V=U.document.createElement(q);
var W=U.document.createElementNS(k,E);
W.style.cursor=p;
W.style.color=p;
W.style.overflow=l;
W.style.maxWidth=A;
for(var X in this.__ic){W.style[X]=p;
}W.setAttribute(C,B);
V.appendChild(W);
}else{var V=U.document.createElement(q);
qx.bom.element.Style.setStyles(V,this.__ig(T));
}
if(content){this.setContent(V,content);
}return V;
},setContent:function(d,e){e=e||m;

if(d.useHtml){d.innerHTML=e;
}else if(qx.core.Variant.isSet(s,r)){d.firstChild.setAttribute(n,e);
}else{qx.bom.element.Attribute.set(d,o,e);
}},getContent:function(f){if(f.useHtml){return f.innerHTML;
}else if(qx.core.Variant.isSet(s,r)){return f.firstChild.getAttribute(n)||m;
}else{return qx.bom.element.Attribute.get(f,o);
}},getHtmlSize:function(content,g,h){var i=this._htmlElement||this.__ie();
i.style.width=h!==undefined?h+D:H;
i.innerHTML=content;
return this.__ih(i,g);
},getTextSize:function(Y,ba){var bb=this._textElement||this.__id();

if(qx.core.Variant.isSet(s,r)){bb.firstChild.setAttribute(n,Y);
}else{qx.bom.element.Attribute.set(bb,o,Y);
}return this.__ih(bb,ba);
},__ih:function(N,O){var P=this.__ic;

if(!O){O={};
}
for(var Q in P){N.style[Q]=O[Q]||m;
}var R=qx.bom.element.Dimension.getSize(N);

if(qx.core.Variant.isSet(s,r)){if(!qx.bom.client.Platform.WIN){R.width++;
}}return R;
}}});
})();
(function(){var k="mshtml",j="qx.client",i="Please use element.clientWidth directly, or see if you can benefit from qx.bom.element.Dimension.getContentWidth()",h="qx.bom.element.Dimension",g="Please use element.scrollWidth directly, or see if you can benefit from qx.bom.element.Dimension.getContentWidth()",f="paddingRight",e="paddingLeft",d="paddingTop",c="Please use element.scrollHeight directly, or see if you can benefit from qx.bom.element.Dimension.getContentHeight()",b="Please use element.clientHeight directly, or see if you can benefit from qx.bom.element.Dimension.getContentHeight()",a="paddingBottom";
qx.Class.define(h,{statics:{getWidth:qx.core.Variant.select(j,{"gecko":function(x){if(x.getBoundingClientRect){var y=x.getBoundingClientRect();
return Math.round(y.right)-Math.round(y.left);
}else{return x.offsetWidth;
}},"default":function(B){return B.offsetWidth;
}}),getHeight:qx.core.Variant.select(j,{"gecko":function(u){if(u.getBoundingClientRect){var v=u.getBoundingClientRect();
return Math.round(v.bottom)-Math.round(v.top);
}else{return u.offsetHeight;
}},"default":function(w){return w.offsetHeight;
}}),getSize:function(K){return {width:this.getWidth(K),height:this.getHeight(K)};
},__ii:{visible:true,hidden:true},getContentWidth:function(l){var n=qx.bom.element.Style;
var o=qx.bom.element.Overflow.getX(l);
var p=parseInt(n.get(l,e),10);
var r=parseInt(n.get(l,f),10);

if(this.__ii[o]){return l.clientWidth-p-r;
}else{if(l.clientWidth>=l.scrollWidth){return Math.max(l.clientWidth,l.scrollWidth)-p-r;
}else{var q=l.scrollWidth-p;
var m=qx.bom.client.Engine;

if(m.NAME===k&&m.VERSION==6){q-=r;
}return q;
}}},getContentHeight:function(C){var E=qx.bom.element.Style;
var G=qx.bom.element.Overflow.getY(C);
var H=parseInt(E.get(C,d),10);
var F=parseInt(E.get(C,a),10);

if(this.__ii[G]){return C.clientHeight-H-F;
}else{if(C.clientHeight>=C.scrollHeight){return Math.max(C.clientHeight,C.scrollHeight)-H-F;
}else{var I=C.scrollHeight-H;
var D=qx.bom.client.Engine;

if(D.NAME===k&&D.VERSION==6){I-=F;
}return I;
}}},getContentSize:function(s){return {width:this.getContentWidth(s),height:this.getContentHeight(s)};
},getClientWidth:function(t){qx.log.Logger.deprecatedMethodWarning(arguments.callee,i);
return t.clientWidth;
},getClientHeight:function(J){qx.log.Logger.deprecatedMethodWarning(arguments.callee,b);
return J.clientHeight;
},getScrollWidth:function(A){qx.log.Logger.deprecatedMethodWarning(arguments.callee,g);
return A.scrollWidth;
},getScrollHeight:function(z){qx.log.Logger.deprecatedMethodWarning(arguments.callee,c);
return z.scrollHeight;
}}});
})();
(function(){var f="qx.event.type.Data",e="qx.ui.form.IForm";
qx.Interface.define(e,{events:{"changeEnabled":f,"changeValid":f,"changeInvalidMessage":f,"changeRequired":f},members:{setEnabled:function(d){return arguments.length==1;
},getEnabled:function(){},setRequired:function(c){return arguments.length==1;
},getRequired:function(){},setValid:function(a){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(b){return arguments.length==1;
},getInvalidMessage:function(){}}});
})();
(function(){var h="_applyBlockerColor",g="Number",f="qx.ui.core.MBlocker",e="_applyBlockerOpacity",d="__ij",c="Color";
qx.Mixin.define(f,{construct:function(){this.__ij=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:c,init:null,nullable:true,apply:h,themeable:true},blockerOpacity:{check:g,init:1,apply:e,themeable:true}},members:{__ij:null,_applyBlockerColor:function(j,k){this.__ij.setColor(j);
},_applyBlockerOpacity:function(a,b){this.__ij.setOpacity(a);
},block:function(){this.__ij.block();
},isBlocked:function(){return this.__ij.isBlocked();
},unblock:function(){this.__ij.unblock();
},blockContent:function(i){this.__ij.blockContent(i);
},isContentBlocked:function(){return this.__ij.isContentBlocked();
},unblockContent:function(){this.__ij.unblockContent();
},_getContentBlocker:function(){return this.__ij._getContentBlocker();
},_getBlocker:function(){return this.__ij._getBlocker();
},_restoreAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
this.__ij._restoreAnonymousState();
},_saveAndSetAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
this.__ij._saveAndSetAnonymousState();
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var m="qx.ui.window.Window",l="changeModal",k="changeVisibility",j="changeActive",i="_applyActiveWindow",h="__ik",g="qx.ui.window.MDesktop",f="__il";
qx.Mixin.define(g,{properties:{activeWindow:{check:m,apply:i,init:null,nullable:true}},members:{__ik:null,__il:null,getWindowManager:function(){if(!this.__il){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__il;
},supportsMaximize:function(){return true;
},setWindowManager:function(p){if(this.__il){this.__il.setDesktop(null);
}p.setDesktop(this);
this.__il=p;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(a,b){this.getWindowManager().changeActiveWindow(a,b);

if(a){a.setActive(true);
}
if(b){b.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(n){if(qx.Class.isDefined(m)&&n instanceof qx.ui.window.Window){this._addWindow(n);
}},_addWindow:function(o){if(!qx.lang.Array.contains(this.getWindows(),o)){this.getWindows().push(o);
o.addListener(j,this._onChangeActive,this);
o.addListener(l,this._onChangeModal,this);
o.addListener(k,this._onChangeVisibility,this);
}
if(o.getActive()){this.setActiveWindow(o);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(c){if(qx.Class.isDefined(m)&&c instanceof qx.ui.window.Window){this._removeWindow(c);
}},_removeWindow:function(d){qx.lang.Array.remove(this.getWindows(),d);
d.removeListener(j,this._onChangeActive,this);
d.removeListener(l,this._onChangeModal,this);
d.removeListener(k,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__ik){this.__ik=[];
}return this.__ik;
}},destruct:function(){this._disposeArray(h);
this._disposeObjects(f);
}});
})();
(function(){var y="contextmenu",x="help",w="qx.client",v="changeGlobalCursor",u="abstract",t="Boolean",s="root",r="",q=" !important",p="__im",l="_applyGlobalCursor",o="_applyNativeHelp",n=";",k="qx.ui.root.Abstract",j="String",m="*";
qx.Class.define(k,{type:u,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:s},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:j,nullable:true,themeable:true,apply:l,event:v},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:t,init:false,apply:o}},members:{__im:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(w,{"mshtml":function(h,i){},"default":function(a,b){var c=qx.bom.Stylesheet;
var d=this.__im;

if(!d){this.__im=d=c.createElement();
}c.removeAllRules(d);

if(a){c.addRule(d,m,qx.bom.element.Cursor.compile(a).replace(n,r)+q);
}}}),_applyNativeContextMenu:function(B,C){if(B){this.removeListener(y,this._onNativeContextMenu,this,true);
}else{this.addListener(y,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(w,{"mshtml":function(z,A){if(A===false){qx.bom.Event.removeNativeListener(document,x,qx.lang.Function.returnFalse);
}
if(z===false){qx.bom.Event.addNativeListener(document,x,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this._disposeFields(p);
},defer:function(f,g){qx.ui.core.MChildrenHandling.remap(g);
}});
})();
(function(){var q="resize",p="position",o="0px",n="webkit",m="$$widget",l="qx.ui.root.Application",k="hidden",j="qx.client",i="div",h="__in",d="__io",g="100%",f="absolute";
qx.Class.define(l,{extend:qx.ui.root.Abstract,construct:function(a){this.__in=qx.dom.Node.getWindow(a);
this.__io=a;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__in,q,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
},members:{__in:null,__io:null,_createContainerElement:function(){var r=this.__io;

if(qx.core.Variant.isSet(j,n)){if(!r.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var v=r.documentElement.style;
var s=r.body.style;
v.overflow=s.overflow=k;
v.padding=v.margin=s.padding=s.margin=o;
v.width=v.height=s.width=s.height=g;
var u=r.createElement(i);
r.body.appendChild(u);
var t=new qx.html.Root(u);
t.setStyle(p,f);
t.setAttribute(m,this.toHashCode());
return t;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var b=qx.bom.Viewport.getWidth(this.__in);
var c=qx.bom.Viewport.getHeight(this.__in);
return {minWidth:b,width:b,maxWidth:b,minHeight:c,height:c,maxHeight:c};
}},destruct:function(){this._disposeFields(h,d);
}});
})();
(function(){var A="resize",z="px",y="zIndex",x="qx.ui.root.Page",w="backgroundColor",v="_applyOpacity",u="opacity",t="__it",s="Number",r="interval",n="qx.ui.core.Blocker",q="__ir",p="__ip",m="__iv",l="Color",o="_applyColor";
qx.Class.define(n,{extend:qx.core.Object,construct:function(g){arguments.callee.base.call(this);
this._widget=g;
this._isPageRoot=(qx.Class.isDefined(x)&&g instanceof qx.ui.root.Page);

if(this._isPageRoot){g.addListener(A,this.__iw,this);
}},properties:{color:{check:l,init:null,nullable:true,apply:o,themeable:true},opacity:{check:s,init:1,apply:v,themeable:true}},members:{__ip:null,__iq:null,__ir:null,__is:null,__it:null,__iu:0,__iv:null,__iw:function(e){var k=e.getData();

if(this.isContentBlocked()){this._getContentBlocker().setStyles({width:k.width,height:k.height});
}
if(this.isBlocked()){this._getBlocker().setStyles({width:k.width,height:k.height});
}},_applyColor:function(D,E){var F=qx.theme.manager.Color.getInstance().resolve(D);
this.__ix(w,F);
},_applyOpacity:function(a,b){this.__ix(u,a);
},__ix:function(c,d){var f=[];
this.__ip&&f.push(this.__ip);
this.__ir&&f.push(this.__ir);

for(var i=0;i<f.length;i++){f[i].setStyle(c,d);
}},_saveAndSetAnonymousState:function(){this.__iu+=1;

if(this.__iu==1){this.__it=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){this.__iu-=1;

if(this.__iu==0){this._widget.setAnonymous(this.__it);
}},__iy:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){if(!this.__ip){this.__ip=this.__iy();
this.__ip.setStyle(y,15);
this._widget.getContainerElement().add(this.__ip);
this.__ip.exclude();
}return this.__ip;
},block:function(){if(this.__iq){return;
}this.__iq=true;
this._getBlocker().include();
this._saveAndSetAnonymousState();
},isBlocked:function(){return !!this.__iq;
},unblock:function(){if(!this.__iq){return;
}this.__iq=false;
this._restoreAnonymousState();
this._getBlocker().exclude();
},_getContentBlocker:function(){if(!this.__ir){this.__ir=this.__iy();
this._widget.getContentElement().add(this.__ir);
this.__ir.exclude();
}return this.__ir;
},blockContent:function(B){var C=this._getContentBlocker();
C.setStyle(y,B);

if(this.__is){return;
}this.__is=true;
C.include();

if(this._isPageRoot){if(!this.__iv){this.__iv=new qx.event.Timer(300);
this.__iv.addListener(r,this.__iz,this);
}this.__iv.start();
this.__iz();
}},isContentBlocked:function(){return !!this.__is;
},unblockContent:function(){if(!this.__is){return;
}this.__is=false;
this._getContentBlocker().exclude();

if(this._isPageRoot){this.__iv.stop();
}},__iz:function(){var h=this._widget.getContainerElement().getDomElement();
var j=qx.dom.Node.getDocument(h);
this._getContentBlocker().setStyles({height:j.documentElement.scrollHeight+z,width:j.documentElement.scrollWidth+z});
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(A,this.__iw,this);
}this._disposeObjects(q,p,m);
this._disposeFields(t);
}});
})();
(function(){var i="100%",h="mshtml",g="repeat",f="url(",e=")",d="qx.html.Blocker",c="qx.client",b="qx/static/blank.gif",a="absolute";
qx.Class.define(d,{extend:qx.html.Element,construct:function(j,k){arguments.callee.base.call(this);
var j=j?qx.theme.manager.Color.getInstance().resolve(j):null;
this.setStyles({position:a,width:i,height:i,opacity:k||0,backgroundColor:j});
if(qx.core.Variant.isSet(c,h)){this.setStyles({backgroundImage:f+qx.util.ResourceManager.getInstance().toUri(b)+e,backgroundRepeat:g});
}}});
})();
(function(){var bl="keypress",bk="focusout",bj="activate",bi="__iC",bh="__iA",bg="Tab",bf="__iB",be="singleton",bd="deactivate",bc="__iD",ba="focusin",bb="qx.ui.core.FocusHandler";
qx.Class.define(bb,{extend:qx.core.Object,type:be,construct:function(){arguments.callee.base.call(this);
this.__iA={};
},members:{__iA:null,__iB:null,__iC:null,__iD:null,connectTo:function(P){P.addListener(bl,this.__iE,this);
P.addListener(ba,this._onFocusIn,this,true);
P.addListener(bk,this._onFocusOut,this,true);
P.addListener(bj,this._onActivate,this,true);
P.addListener(bd,this._onDeactivate,this,true);
},addRoot:function(n){this.__iA[n.$$hash]=n;
},removeRoot:function(M){delete this.__iA[M.$$hash];
},getActiveWidget:function(){return this.__iB;
},isActive:function(C){return this.__iB==C;
},getFocusedWidget:function(){return this.__iC;
},isFocused:function(V){return this.__iC==V;
},isFocusRoot:function(D){return !!this.__iA[D.$$hash];
},_onActivate:function(e){var Y=e.getTarget();
this.__iB=Y;
var X=this.__iF(Y);

if(X!=this.__iD){this.__iD=X;
}},_onDeactivate:function(e){var g=e.getTarget();

if(this.__iB==g){this.__iB=null;
}},_onFocusIn:function(e){var W=e.getTarget();

if(W!=this.__iC){this.__iC=W;
W.visualizeFocus();
}},_onFocusOut:function(e){var U=e.getTarget();

if(U==this.__iC){this.__iC=null;
U.visualizeBlur();
}},__iE:function(e){if(e.getKeyIdentifier()!=bg){return;
}
if(!this.__iD){return;
}e.stopPropagation();
e.preventDefault();
var a=this.__iC;

if(!e.isShiftPressed()){var b=a?this.__iJ(a):this.__iH();
}else{var b=a?this.__iK(a):this.__iI();
}if(b){b.tabFocus();
}},__iF:function(N){var O=this.__iA;

while(N){if(O[N.$$hash]){return N;
}N=N.getLayoutParent();
}return null;
},__iG:function(o,p){if(o===p){return 0;
}var r=o.getTabIndex()||0;
var q=p.getTabIndex()||0;

if(r!=q){return r-q;
}var w=o.getContainerElement().getDomElement();
var v=p.getContainerElement().getDomElement();
var u=qx.bom.element.Location;
var t=u.get(w);
var s=u.get(v);
if(t.top!=s.top){return t.top-s.top;
}if(t.left!=s.left){return t.left-s.left;
}var x=o.getZIndex();
var y=p.getZIndex();

if(x!=y){return x-y;
}return 0;
},__iH:function(){return this.__iN(this.__iD,null);
},__iI:function(){return this.__iO(this.__iD,null);
},__iJ:function(E){var F=this.__iD;

if(F==E){return this.__iH();
}
while(E&&E.getAnonymous()){E=E.getLayoutParent();
}
if(E==null){return [];
}var G=[];
this.__iL(F,E,G);
G.sort(this.__iG);
var H=G.length;
return H>0?G[0]:this.__iH();
},__iK:function(Q){var R=this.__iD;

if(R==Q){return this.__iI();
}
while(Q&&Q.getAnonymous()){Q=Q.getLayoutParent();
}
if(Q==null){return [];
}var S=[];
this.__iM(R,Q,S);
S.sort(this.__iG);
var T=S.length;
return T>0?S[T-1]:this.__iI();
},__iL:function(parent,h,j){var k=parent.getLayoutChildren();
var m;

for(var i=0,l=k.length;i<l;i++){m=k[i];
if(!(m instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(m)&&m.isEnabled()&&m.isVisible()){if(m.isTabable()&&this.__iG(h,m)<0){j.push(m);
}this.__iL(m,h,j);
}}},__iM:function(parent,I,J){var K=parent.getLayoutChildren();
var L;

for(var i=0,l=K.length;i<l;i++){L=K[i];
if(!(L instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(L)&&L.isEnabled()&&L.isVisible()){if(L.isTabable()&&this.__iG(I,L)>0){J.push(L);
}this.__iM(L,I,J);
}}},__iN:function(parent,c){var d=parent.getLayoutChildren();
var f;

for(var i=0,l=d.length;i<l;i++){f=d[i];
if(!(f instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(f)&&f.isEnabled()&&f.isVisible()){if(f.isTabable()){if(c==null||this.__iG(f,c)<0){c=f;
}}c=this.__iN(f,c);
}}return c;
},__iO:function(parent,z){var A=parent.getLayoutChildren();
var B;

for(var i=0,l=A.length;i<l;i++){B=A[i];
if(!(B instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(B)&&B.isEnabled()&&B.isVisible()){if(B.isTabable()){if(z==null||this.__iG(B,z)>0){z=B;
}}z=this.__iO(B,z);
}}return z;
}},destruct:function(){this._disposeMap(bh);
this._disposeFields(bi,bf,bc);
}});
})();
(function(){var J="qx.client",I="head",H="text/css",G="stylesheet",F="}",E='@import "',D="{",C='";',B="qx.bom.Stylesheet",A="link",z="style";
qx.Class.define(B,{statics:{includeFile:function(d,e){if(!e){e=document;
}var f=e.createElement(A);
f.type=H;
f.rel=G;
f.href=qx.util.ResourceManager.getInstance().toUri(d);
var g=e.getElementsByTagName(I)[0];
g.appendChild(f);
},createElement:qx.core.Variant.select(J,{"mshtml":function(K){var L=document.createStyleSheet();

if(K){L.cssText=K;
}return L;
},"default":function(W){var X=document.createElement(z);
X.type=H;

if(W){X.appendChild(document.createTextNode(W));
}document.getElementsByTagName(I)[0].appendChild(X);
return X.sheet;
}}),addRule:qx.core.Variant.select(J,{"mshtml":function(a,b,c){a.addRule(b,c);
},"default":function(bc,bd,be){bc.insertRule(bd+D+be+F,bc.cssRules.length);
}}),removeRule:qx.core.Variant.select(J,{"mshtml":function(r,s){var t=r.rules;
var u=t.length;

for(var i=u-1;i>=0;--i){if(t[i].selectorText==s){r.removeRule(i);
}}},"default":function(v,w){var x=v.cssRules;
var y=x.length;

for(var i=y-1;i>=0;--i){if(x[i].selectorText==w){v.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(J,{"mshtml":function(T){var U=T.rules;
var V=U.length;

for(var i=V-1;i>=0;i--){T.removeRule(i);
}},"default":function(Q){var R=Q.cssRules;
var S=R.length;

for(var i=S-1;i>=0;i--){Q.deleteRule(i);
}}}),addImport:qx.core.Variant.select(J,{"mshtml":function(bf,bg){bf.addImport(bg);
},"default":function(m,n){m.insertRule(E+n+C,m.cssRules.length);
}}),removeImport:qx.core.Variant.select(J,{"mshtml":function(h,j){var k=h.imports;
var l=k.length;

for(var i=l-1;i>=0;i--){if(k[i].href==j){h.removeImport(i);
}}},"default":function(M,N){var O=M.cssRules;
var P=O.length;

for(var i=P-1;i>=0;i--){if(O[i].href==N){M.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(J,{"mshtml":function(Y){var ba=Y.imports;
var bb=ba.length;

for(var i=bb-1;i>=0;i--){Y.removeImport(i);
}},"default":function(o){var p=o.cssRules;
var q=p.length;

for(var i=q-1;i>=0;i--){if(p[i].type==p[i].IMPORT_RULE){o.deleteRule(i);
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
(function(){var b="changeModel",a="qx.ui.form.MModelProperty";
qx.Mixin.define(a,{properties:{model:{nullable:true,event:b}}});
})();
(function(){var b="qx.ui.form.IModel",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeModel":a},members:{setModel:function(c){},getModel:function(){},resetModel:function(){}}});
})();
(function(){var bg="open",bf="auto",be="middle",bd="icon",bc="label",bb="changeOpen",ba="excluded",Y="visible",X="String",W="opened",bz="always",by="qx.ui.tree.AbstractTreeItem",bx="addItem",bw="Boolean",bv="__bt",bu="Integer",bt="_applyIndent",bs="changeOpenSymbolMode",br="_applyOpenSymbolMode",bq="__bx",bn="resize",bo="",bl="__bu",bm="removeItem",bj="abstract",bk="never",bh="_applyIcon",bi="_applyOpen",bp="_applyLabel";
qx.Class.define(by,{extend:qx.ui.core.Widget,type:bj,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel],construct:function(){arguments.callee.base.call(this);
this.__bt=[];
this._setLayout(new qx.ui.layout.HBox());
this._addWidgets();
this.initOpen();
},properties:{open:{check:bw,init:false,event:bb,apply:bi},openSymbolMode:{check:[bz,bk,bf],init:bf,event:bs,apply:br},indent:{check:bu,init:19,apply:bt,themeable:true},parent:{check:by,nullable:true},icon:{check:X,apply:bh,nullable:true,themeable:true},label:{check:X,apply:bp,init:bo,dispose:true}},members:{__bt:null,__bu:null,__bv:null,__bw:null,__bx:null,_addWidgets:function(){throw new Error("Abstract method call.");
},_createChildControlImpl:function(c){var d;

switch(c){case bc:d=new qx.ui.basic.Label().set({alignY:be,value:this.getLabel()});
break;
case bd:d=new qx.ui.basic.Image().set({alignY:be,source:this.getIcon()});
break;
case bg:d=new qx.ui.tree.FolderOpenButton().set({alignY:be});
d.addListener(bb,this._onChangeOpen,this);
d.addListener(bn,this._updateIndent,this);
break;
}return d||arguments.callee.base.call(this,c);
},getTree:function(){var bT=this;

while(bT.getParent()){bT=bT.getParent();
}var bS=bT.getLayoutParent()?bT.getLayoutParent().getLayoutParent():0;

if(bS&&bS instanceof qx.ui.core.ScrollPane){return bS.getLayoutParent();
}return null;
},addWidget:function(bA,bB){this._add(bA,bB);
},addSpacer:function(){if(!this.__bx){this.__bx=new qx.ui.core.Spacer();
}else{this._remove(this.__bx);
}this._add(this.__bx);
},addOpenButton:function(){this._add(this.getChildControl(bg));
},_onChangeOpen:function(e){if(this.isOpenable()){this.setOpen(e.getData());
}},addIcon:function(){var x=this.getChildControl(bd);

if(this.__bw){this._remove(x);
}this._add(x);
this.__bw=true;
},addLabel:function(H){var I=this.getChildControl(bc);

if(this.__bv){this._remove(I);
}
if(H){this.setLabel(H);
}else{I.setValue(this.getLabel());
}this._add(I);
this.__bv=true;
},addState:function(J){arguments.callee.base.call(this,J);
var L=this._getChildren();

for(var i=0,l=L.length;i<l;i++){var K=L[i];

if(K.addState){L[i].addState(J);
}}},removeState:function(E){arguments.callee.base.call(this,E);
var G=this._getChildren();

for(var i=0,l=G.length;i<l;i++){var F=G[i];

if(F.addState){G[i].removeState(E);
}}},_applyIcon:function(u,v){var w=this.getChildControl(bd,true);

if(w){w.setSource(u);
}},_applyLabel:function(bJ,bK){var bL=this.getChildControl(bc,true);

if(bL){bL.setValue(bJ);
}},_applyOpen:function(a,b){if(this.hasChildren()){this.getChildrenContainer().setVisibility(a?Y:ba);
}var open=this.getChildControl(bg,true);

if(open){open.setOpen(a);
}a?this.addState(W):this.removeState(W);
},isOpenable:function(){var M=this.getOpenSymbolMode();
return (M===bz||M===bf&&this.hasChildren());
},_shouldShowOpenSymbol:function(){var open=this.getChildControl(bg,true);

if(!open){return false;
}var h=this.getTree();

if(!h.getRootOpenClose()){if(h.getHideRoot()){if(h.getRoot()==this.getParent()){return false;
}}else{if(h.getRoot()==this){return false;
}}}return this.isOpenable();
},_applyOpenSymbolMode:function(bM,bN){this._updateIndent();
},_updateIndent:function(){if(!this.getTree()){return;
}var bF=0;
var open=this.getChildControl(bg,true);

if(open){if(this._shouldShowOpenSymbol()){open.show();
var bE=open.getBounds();

if(bE){bF=bE.width;
}else{return;
}}else{open.exclude();
}}
if(this.__bx){this.__bx.setWidth((this.getLevel()+1)*this.getIndent()-bF);
}},_applyIndent:function(U,V){this._updateIndent();
},getLevel:function(){var j=this.getTree();

if(!j){return;
}var k=this;
var m=-1;

while(k){k=k.getParent();
m+=1;
}if(j.getHideRoot()){m-=1;
}
if(!j.getRootOpenClose()){m-=1;
}return m;
},syncWidget:function(){this._updateIndent();
},getChildrenContainer:function(){if(!this.__bu){this.__bu=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({visibility:this.isOpen()?Y:ba});
}return this.__bu;
},getParentChildrenContainer:function(){if(this.getParent()){return this.getParent().getChildrenContainer();
}else if(this.getLayoutParent()){return this.getLayoutParent();
}else{return null;
}},getChildren:function(){return this.__bt;
},hasChildren:function(){return this.__bt?this.__bt.length>0:false;
},getItems:function(N,O,P){if(P!==false){var Q=[];
}else{var Q=[this];
}var T=this.hasChildren()&&(O!==false||this.isOpen());

if(T){var S=this.getChildren();

if(N===false){Q=Q.concat(S);
}else{for(var i=0,R=S.length;i<R;i++){Q=Q.concat(S[i].getItems(N,O,false));
}}}return Q;
},recursiveAddToWidgetQueue:function(){var bG=this.getItems(true,true,false);

for(var i=0,l=bG.length;i<l;i++){qx.ui.core.queue.Widget.add(bG[i]);
}},__by:function(){if(this.getParentChildrenContainer()){this.getParentChildrenContainer()._addAfter(this.getChildrenContainer(),this);
}},add:function(n){var o=this.getChildrenContainer();
var r=this.getTree();

for(var i=0,l=arguments.length;i<l;i++){var s=arguments[i];
var q=s.getParent();

if(q){q.remove(s);
}s.setParent(this);
var p=this.hasChildren();
o.add(s);

if(s.hasChildren()){o.add(s.getChildrenContainer());
}this.__bt.push(s);

if(!p){this.__by();
}
if(r){s.recursiveAddToWidgetQueue();
r.fireNonBubblingEvent(bx,qx.event.type.Data,[s]);
}}
if(r){qx.ui.core.queue.Widget.add(this);
}},addAt:function(y,z){{};

if(z==this.__bt.length){this.add(y);
return;
}var D=y.getParent();

if(D){D.remove(y);
}var B=this.getChildrenContainer();
y.setParent(this);
var C=this.hasChildren();
var A=this.__bt[z];
B.addBefore(y,A);

if(y.hasChildren()){B.addAfter(y.getChildrenContainer(),y);
}qx.lang.Array.insertAt(this.__bt,y,z);

if(!C){this.__by();
}
if(this.getTree()){y.recursiveAddToWidgetQueue();
qx.ui.core.queue.Widget.add(this);
}},addBefore:function(f,g){{};
this.addAt(f,this.__bt.indexOf(g));
},addAfter:function(bC,bD){{};
this.addAt(bC,this.__bt.indexOf(bD)+1);
},addAtBegin:function(t){this.addAt(t,0);
},remove:function(bO){for(var i=0,l=arguments.length;i<l;i++){var bR=arguments[i];

if(this.__bt.indexOf(bR)==-1){this.warn("Cannot remove treeitem '"+bR+"'. It is not a child of this tree item.");
return;
}var bQ=this.getChildrenContainer();

if(bR.hasChildren()){bQ.remove(bR.getChildrenContainer());
}qx.lang.Array.remove(this.__bt,bR);
bR.setParent(null);
bQ.remove(bR);
}var bP=this.getTree();

if(bP){bP.fireNonBubblingEvent(bm,qx.event.type.Data,[bR]);
}qx.ui.core.queue.Widget.add(this);
},removeAt:function(bH){var bI=this.__bt[bH];

if(bI){this.remove(bI);
}},removeAll:function(){for(var i=this.__bt.length-1;i>=0;i--){this.remove(this.__bt[i]);
}}},destruct:function(){this._disposeArray(bv);
this._disposeObjects(bq,bl);
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
(function(){var w="_applyLayoutChange",v="left",u="center",t="top",s="Decorator",r="middle",q="__jk",p="_applyReversed",o="bottom",n="Boolean",j="right",m="__jh",k="Integer",h="__ji",g="qx.ui.layout.HBox";
qx.Class.define(g,{extend:qx.ui.layout.Abstract,construct:function(bl,bm,bn){arguments.callee.base.call(this);

if(bl){this.setSpacing(bl);
}
if(bm){this.setAlignX(bm);
}
if(bn){this.setSeparator(bn);
}},properties:{alignX:{check:[v,u,j],init:v,apply:w},alignY:{check:[t,r,o],init:t,apply:w},spacing:{check:k,init:0,apply:w},separator:{check:s,nullable:true,apply:w},reversed:{check:n,init:false,apply:p}},members:{__jh:null,__ji:null,__jj:null,__jk:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__jl:function(){var f=this._getLayoutChildren();
var length=f.length;
var c=false;
var a=this.__jh&&this.__jh.length!=length&&this.__ji&&this.__jh;
var d;
var b=a?this.__jh:new Array(length);
var e=a?this.__ji:new Array(length);
if(this.getReversed()){f=f.concat().reverse();
}for(var i=0;i<length;i++){d=f[i].getLayoutProperties();

if(d.width!=null){b[i]=parseFloat(d.width)/100;
}
if(d.flex!=null){e[i]=d.flex;
c=true;
}}if(!a){this.__jh=b;
this.__ji=e;
}this.__jj=c;
this.__jk=f;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(M,N){if(this._invalidChildrenCache){this.__jl();
}var T=this.__jk;
var length=T.length;
var bd=qx.ui.layout.Util;
var bc=this.getSpacing();
var bg=this.getSeparator();

if(bg){var Q=bd.computeHorizontalSeparatorGaps(T,bc,bg);
}else{var Q=bd.computeHorizontalGaps(T,bc,true);
}var i,O,ba,Y;
var bf=[];
var U=Q;

for(i=0;i<length;i+=1){Y=this.__jh[i];
ba=Y!=null?Math.floor((M-Q)*Y):T[i].getSizeHint().width;
bf.push(ba);
U+=ba;
}if(this.__jj&&U!=M){var W={};
var bb,be;

for(i=0;i<length;i+=1){bb=this.__ji[i];

if(bb>0){V=T[i].getSizeHint();
W[i]={min:V.minWidth,value:bf[i],max:V.maxWidth,flex:bb};
}}var R=bd.computeFlexOffsets(W,M,U);

for(i in R){be=R[i].offset;
bf[i]+=be;
U+=be;
}}var bk=T[0].getMarginLeft();
if(U<M&&this.getAlignX()!=v){bk=M-U;

if(this.getAlignX()===u){bk=Math.round(bk/2);
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
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__jl();
}var D=qx.ui.layout.Util;
var L=this.__jk;
var x=0,E=0,B=0;
var A=0,C=0;
var I,y,K;
for(var i=0,l=L.length;i<l;i+=1){I=L[i];
y=I.getSizeHint();
E+=y.width;
var H=this.__ji[i];
var z=this.__jh[i];

if(H){x+=y.minWidth;
}else if(z){B=Math.max(B,Math.round(y.minWidth/z));
}else{x+=y.width;
}K=I.getMarginTop()+I.getMarginBottom();
if((y.height+K)>C){C=y.height+K;
}if((y.minHeight+K)>A){A=y.minHeight+K;
}}x+=B;
var G=this.getSpacing();
var J=this.getSeparator();

if(J){var F=D.computeHorizontalSeparatorGaps(L,G,J);
}else{var F=D.computeHorizontalGaps(L,G,true);
}return {minWidth:x+F,width:E+F,minHeight:A,height:C};
}},destruct:function(){this._disposeFields(m,h,q);
}});
})();
(function(){var h="changeEnabled",g="qx.ui.core.MExecutable",f="qx.event.Command",d="qx.event.type.Event",c="changeCommand",b="_applyCommand",a="execute";
qx.Mixin.define(g,{events:{"execute":d},properties:{command:{check:f,apply:b,event:c,nullable:true}},members:{execute:function(){var i=this.getCommand();

if(i){i.execute(this);
}this.fireEvent(a);
},_applyCommand:function(j,k){if(k){k.removeListener(h,this._onChangeEnabledCommand,this);
}
if(j){j.addListener(h,this._onChangeEnabledCommand,this);

if(this.getEnabled()===false){j.setEnabled(false);
}else if(j.getEnabled()===false){this.setEnabled(false);
}}},_onChangeEnabledCommand:function(e){this.setEnabled(e.getData());
}}});
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
(function(){var L="resize",K="scrollY",J="Please use getChildren instead.",I="update",H="scrollX",G="_applyScrollX",F="_applyScrollY",E="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",D="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",C="appear",z="qx.ui.core.ScrollPane",B="qx.event.type.Event",A="scroll";
qx.Class.define(z,{extend:qx.ui.core.Widget,construct:function(){arguments.callee.base.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(L,this._onUpdate);
var M=this.getContentElement();
M.addListener(A,this._onScroll,this);
M.addListener(C,this._onAppear,this);
},events:{update:B},properties:{scrollX:{check:D,apply:G,event:H,init:0},scrollY:{check:E,apply:F,event:K,init:0}},members:{add:function(f){var g=this._getChildren()[0];

if(g){this._remove(g);
g.removeListener(L,this._onUpdate,this);
}
if(f){this._add(f);
f.addListener(L,this._onUpdate,this);
}},remove:function(m){if(m){this._remove(m);
m.removeListener(L,this._onUpdate,this);
}},getChild:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,J);
return this._getChildren()[0]||null;
},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(I);
},_onScroll:function(e){var u=this.getContentElement();
this.setScrollX(u.getScrollX());
this.setScrollY(u.getScrollY());
},_onAppear:function(e){var q=this.getContentElement();
var n=this.getScrollX();
var o=q.getScrollX();

if(n!=o){q.scrollToX(n);
}var r=this.getScrollY();
var p=q.getScrollY();

if(r!=p){q.scrollToY(r);
}},getItemTop:function(N){var top=0;

do{top+=N.getBounds().top;
N=N.getLayoutParent();
}while(N&&N!==this);
return top;
},getItemBottom:function(v){return this.getItemTop(v)+v.getBounds().height;
},getItemLeft:function(c){var d=0;
var parent;

do{d+=c.getBounds().left;
parent=c.getLayoutParent();

if(parent){d+=parent.getInsets().left;
}c=parent;
}while(c&&c!==this);
return d;
},getItemRight:function(w){return this.getItemLeft(w)+w.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var t=this.getInnerSize();
var s=this.getScrollSize();

if(t&&s){return Math.max(0,s.width-t.width);
}return 0;
},getScrollMaxY:function(){var j=this.getInnerSize();
var i=this.getScrollSize();

if(j&&i){return Math.max(0,i.height-j.height);
}return 0;
},scrollToX:function(k){var l=this.getScrollMaxX();

if(k<0){k=0;
}else if(k>l){k=l;
}this.setScrollX(k);
},scrollToY:function(a){var b=this.getScrollMaxY();

if(a<0){a=0;
}else if(a>b){a=b;
}this.setScrollY(a);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(h){this.getContentElement().scrollToX(h);
},_applyScrollY:function(O){this.getContentElement().scrollToY(O);
}}});
})();
(function(){var a="qx.ui.core.Spacer";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(b,c){arguments.callee.base.call(this);
this.setWidth(b!=null?b:0);
this.setHeight(c!=null?c:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(d){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var X="_applyLayoutChange",W="top",V="left",U="middle",T="__iS",S="Decorator",R="center",Q="_applyReversed",P="bottom",O="__iQ",L="qx.ui.layout.VBox",N="__iP",M="Integer",K="right",J="Boolean";
qx.Class.define(L,{extend:qx.ui.layout.Abstract,construct:function(a,b,c){arguments.callee.base.call(this);

if(a){this.setSpacing(a);
}
if(b){this.setAlignY(b);
}
if(c){this.setSeparator(c);
}},properties:{alignY:{check:[W,U,P],init:W,apply:X},alignX:{check:[V,R,K],init:V,apply:X},spacing:{check:M,init:0,apply:X},separator:{check:S,nullable:true,apply:X},reversed:{check:J,init:false,apply:Q}},members:{__iP:null,__iQ:null,__iR:null,__iS:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__iT:function(){var j=this._getLayoutChildren();
var length=j.length;
var e=false;
var d=this.__iP&&this.__iP.length!=length&&this.__iQ&&this.__iP;
var g;
var f=d?this.__iP:new Array(length);
var h=d?this.__iQ:new Array(length);
if(this.getReversed()){j=j.concat().reverse();
}for(var i=0;i<length;i++){g=j[i].getLayoutProperties();

if(g.height!=null){f[i]=parseFloat(g.height)/100;
}
if(g.flex!=null){h[i]=g.flex;
e=true;
}}if(!d){this.__iP=f;
this.__iQ=h;
}this.__iR=e;
this.__iS=j;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(k,m){if(this._invalidChildrenCache){this.__iT();
}var t=this.__iS;
var length=t.length;
var D=qx.ui.layout.Util;
var C=this.getSpacing();
var G=this.getSeparator();

if(G){var q=D.computeVerticalSeparatorGaps(t,C,G);
}else{var q=D.computeVerticalGaps(t,C,true);
}var i,o,p,x;
var y=[];
var E=q;

for(i=0;i<length;i+=1){x=this.__iP[i];
p=x!=null?Math.floor((m-q)*x):t[i].getSizeHint().height;
y.push(p);
E+=p;
}if(this.__iR&&E!=m){var v={};
var B,F;

for(i=0;i<length;i+=1){B=this.__iQ[i];

if(B>0){u=t[i].getSizeHint();
v[i]={min:u.minHeight,value:y[i],max:u.maxHeight,flex:B};
}}var r=D.computeFlexOffsets(v,m,E);

for(i in r){F=r[i].offset;
y[i]+=F;
E+=F;
}}var top=t[0].getMarginTop();
if(E<m&&this.getAlignY()!=W){top=m-E;

if(this.getAlignY()===U){top=Math.round(top/2);
}}var u,I,z,p,w,A,s;
this._clearSeparators();
if(G){var H=qx.theme.manager.Decoration.getInstance().resolve(G).getInsets();
var n=H.top+H.bottom;
}for(i=0;i<length;i+=1){o=t[i];
p=y[i];
u=o.getSizeHint();
A=o.getMarginLeft();
s=o.getMarginRight();
z=Math.max(u.minWidth,Math.min(k-A-s,u.maxWidth));
I=D.computeHorizontalAlignOffset(o.getAlignX()||this.getAlignX(),z,k,A,s);
if(i>0){if(G){top+=w+C;
this._renderSeparator(G,{top:top,left:0,height:n,width:k});
top+=n+C+o.getMarginTop();
}else{top+=D.collapseMargins(C,w,o.getMarginTop());
}}o.renderLayout(I,top,z,p);
top+=p;
w=o.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__iT();
}var bf=qx.ui.layout.Util;
var bn=this.__iS;
var bb=0,be=0,bd=0;
var Y=0,bg=0;
var bk,ba,bm;
for(var i=0,l=bn.length;i<l;i+=1){bk=bn[i];
ba=bk.getSizeHint();
be+=ba.height;
var bj=this.__iQ[i];
var bc=this.__iP[i];

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
}},destruct:function(){this._disposeFields(N,O,T);
}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.MFormElement";
qx.Mixin.define(a,{events:{"changeName":b},members:{__iU:null,setName:function(name){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
if(name!=null&&!qx.lang.Type.isString(name)){throw new Error("Please use strings for the name property.");
return;
}var c=this.__iU;
this.__iU=name;
this.fireDataEvent(qx.event.type.Data,name,c);
},getName:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return this.__iU;
},resetName:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
var d=this.__iU;
this.__iU=null;
this.fireDataEvent(qx.event.type.Data,null,d);
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.ui.form.IFormElement",a="boolean";
qx.Interface.define(b,{events:{"changeValue":c,"changeName":c,"changeEnabled":c},members:{setEnabled:function(e){this.assertType(e,a);
},getEnabled:function(){},setName:function(f){this.assertString(f);
},getName:function(){},setValue:function(d){return arguments.length==1;
},getValue:function(){}}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var z="pressed",y="abandoned",x="hovered",w="changeValue",v="qx.ui.form.Button",u="Enter",t="Space",s="dblclick",r="mouseup",q="mousedown",l="The value property will be removed.",p="mouseover",o="mouseout",k="keydown",j="button",n="keyup",m="qx.event.type.Data";
qx.Class.define(v,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable,qx.ui.form.MFormElement],implement:[qx.ui.form.IFormElement,qx.ui.form.IExecutable],construct:function(a,b,c){arguments.callee.base.call(this,a,b);

if(c!=null){this.setCommand(c);
}this.addListener(p,this._onMouseOver);
this.addListener(o,this._onMouseOut);
this.addListener(q,this._onMouseDown);
this.addListener(r,this._onMouseUp);
this.addListener(k,this._onKeyDown);
this.addListener(n,this._onKeyUp);
this.addListener(s,this._onStopEvent);
},events:{"changeValue":m},properties:{appearance:{refine:true,init:j},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(y)){return;
}this.addState(z);
},release:function(){if(this.hasState(z)){this.removeState(z);
}},reset:function(){this.removeState(z);
this.removeState(y);
this.removeState(x);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(y)){this.removeState(y);
this.addState(z);
}this.addState(x);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(x);

if(this.hasState(z)){this.removeState(z);
this.addState(y);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(y);
this.addState(z);
},_onMouseUp:function(e){this.releaseCapture();
var A=this.hasState(z);
var B=this.hasState(y);

if(A){this.removeState(z);
}
if(B){this.removeState(y);
}else{this.addState(x);

if(A){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case u:case t:this.removeState(y);
this.addState(z);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case u:case t:if(this.hasState(z)){this.removeState(y);
this.removeState(z);
this.execute();
e.stopPropagation();
}}},__jm:null,setValue:function(d){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
var f=this.__jm;
this.__jm=d;
this.fireDataEvent(w,d,f);
},getValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return this.__jm;
},resetValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
this.__jm=null;
},addListener:function(g,h,self,i){if(g==w&&this.classname==v){qx.log.Logger.deprecatedEventWarning(arguments.callee,w,l);
}return arguments.callee.base.call(this,g,h,self,i);
}}});
})();


if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) qx.event.handler.Application.onScriptLoaded();

})();