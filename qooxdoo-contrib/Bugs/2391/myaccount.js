(function() {
  
if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application": "myaccount.Application", "qx.theme": "myaccount.theme.Theme", "qx.version": "0.8.3"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug": "off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"qx": {"resourceUri": "resource", "version": "trunk", "sourceUri": "script"}, "myaccount": {"resourceUri": "resource", "version": "trunk", "sourceUri": "script"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -474, 0], "qx/decoration/Modern/window/captionbar-inactive-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, 0], "qx/icon/Tango/16/actions/view-refresh.png": [16, 16, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-r.png": [5, 136, "png", "qx", "qx/decoration/Modern/shadow-small-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -192], "qx/decoration/Modern/tabview-pane-tb-combined.png": [30, 180, "png", "qx"], "qx/decoration/Modern/form/radiobutton-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -572, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/form/button-focused-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -132], "qx/icon/Tango/22/mimetypes/office-document.png": [22, 22, "png", "qx"], "qx/decoration/Modern/shadow/shadow-r.png": [15, 382, "png", "qx", "qx/decoration/Modern/shadow-lr-combined.png", -15, 0], "qx/decoration/Modern/shadow/shadow-tl.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, 0], "qx/decoration/Modern/window/minimize-active-hovered.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -9, 0], "qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png": [76, 15, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -69, 0], "qx/decoration/Modern/cursors/nodrop.gif": [20, 20, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", 0, 0], "qx/decoration/Modern/form/button-preselected-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -36, 0], "qx/decoration/Modern/tabview/tab-button-top-inactive-r.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png", 0, 0], "qx/decoration/Modern/window/close-active-hovered.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -72, 0], "qx/decoration/Modern/window/captionbar-inactive-r.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-inactive-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-l.png": [5, 14, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png", -5, 0], "qx/decoration/Modern/form/button-focused-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -16], "qx/decoration/Modern/tabview/tab-button-right-active-l.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-lr-combined.png", -5, 0], "qx/decoration/Modern/tree-combined.png": [32, 8, "png", "qx"], "qx/decoration/Modern/tabview-button-left-active-lr-combined.png": [10, 37, "png", "qx"], "qx/decoration/Modern/form/button-pressed-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -32, 0], "qx/decoration/Modern/tabview/tab-button-right-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -104], "qx/decoration/Modern/groupbox-tb-combined.png": [4, 24, "png", "qx"], "qx/decoration/Modern/tree/closed-selected.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", 0, 0], "qx/decoration/Modern/toolbar/toolbar-gradient.png": [20, 130, "png", "qx", "qx/decoration/Modern/toolbar-combined.png", -20, 0], "qx/decoration/Modern/colorselector/brightness-field.png": [19, 256, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tabview-pane-tr.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -30], "qx/decoration/Modern/window/captionbar-active-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -30], "qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png": [10, 12, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -59, 0], "qx/decoration/Modern/pane-tb-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, 0], "qx/decoration/Modern/menu/radiobutton.gif": [16, 5, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", 0, 0], "qx/decoration/Modern/arrows/right.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -5, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -20], "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-right-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, 0], "qx/decoration/Modern/pane/pane-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -6], "qx/decoration/Modern/form/button-hovered-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -12], "qx/decoration/Modern/window/captionbar-inactive-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -18], "qx/decoration/Modern/form/input.png": [84, 12, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -70, 0], "qx/decoration/Modern/window/statusbar-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -418, 0], "qx/decoration/Modern/form/button-focused-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -152], "qx/decoration/Modern/form/button-disabled-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -92], "qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png": [6, 39, "png", "qx"], "qx/decoration/Modern/form/button-checked-focused-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/radiobutton-checked-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -306, 0], "qx/icon/Tango/32/mimetypes/office-document.png": [32, 32, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-l.png": [4, 51, "png", "qx", "qx/decoration/Modern/groupbox-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-focused-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -48, 0], "qx/decoration/Modern/window-captionbar-lr-active-combined.png": [12, 9, "png", "qx"], "qx/decoration/Modern/shadow/shadow-l.png": [15, 382, "png", "qx", "qx/decoration/Modern/shadow-lr-combined.png", 0, 0], "qx/decoration/Modern/shadow/shadow-tr.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -60], "qx/decoration/Modern/form/button-preselected-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -48], "qx/decoration/Modern/menu-checkradio-combined.gif": [64, 7, "gif", "qx"], "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png": [15, 76, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -12, 0], "qx/decoration/Modern/cursors/move.gif": [13, 9, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", -20, 0], "qx/decoration/Modern/form/button-checked-focused-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -184], "qx/decoration/Modern/form/button-preselected-focused-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -180], "qx/decoration/Modern/form/checkbox-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -516, 0], "qx/decoration/Modern/form/checkbox-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -558, 0], "qx/decoration/Modern/form/button-disabled-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -164], "qx/decoration/Modern/menu/checkbox-invert.gif": [16, 7, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", -16, 0], "qx/decoration/Modern/tabview/tabview-pane-l.png": [30, 2, "png", "qx", "qx/decoration/Modern/tabview-pane-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-c.png": [14, 39, "png", "qx"], "qx/decoration/Modern/form/button-checked-focused-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -12, 0], "qx/decoration/Modern/form/radiobutton-checked-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -42, 0], "qx/decoration/Modern/window/captionbar-inactive-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -30], "qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png": [10, 14, "png", "qx"], "qx/decoration/Modern/colorselector/huesaturation-field.jpg": [256, 256, "jpeg", "qx"], "qx/decoration/Modern/shadow-small-lr-combined.png": [10, 136, "png", "qx"], "qx/decoration/Modern/window/captionbar-active-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -6], "qx/decoration/Modern/tabview/tab-button-right-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -5], "qx/decoration/Modern/form/button-pressed-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -84], "qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/inputcheckradio-combined.png": [628, 14, "png", "qx"], "qx/decoration/Modern/form/button-disabled-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -120], "qx/decoration/Modern/tooltip-error-lr-combined.png": [12, 18, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-top-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/tabview/tab-button-right-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -10], "qx/decoration/Modern/form/button-hovered-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -168], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -348, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-c.png": [20, 14, "png", "qx"], "qx/decoration/Modern/menu/radiobutton-invert.gif": [16, 5, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", -32, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png", 0, 0], "qx/icon/Tango/16/actions/dialog-cancel.png": [16, 16, "png", "qx"], "qx/decoration/Modern/form/checkbox-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -530, 0], "qx/decoration/Modern/window/captionbar-active-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -24], "qx/decoration/Modern/tabview/tab-button-right-active-r.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-left-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -25], "qx/decoration/Modern/form/tooltip-error-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -30], "qx/decoration/Modern/table/header-cell.png": [20, 18, "png", "qx", "qx/decoration/Modern/table-combined.png", -54, 0], "qx/decoration/Modern/pane/pane-l.png": [6, 238, "png", "qx", "qx/decoration/Modern/pane-lr-combined.png", -6, 0], "qx/decoration/Modern/tabview/tab-button-top-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -20], "qx/decoration/Modern/window/maximize-active-hovered.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -45, 0], "qx/decoration/Modern/form/input-focused.png": [40, 12, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -224, 0], "qx/decoration/Modern/form/radiobutton-checked-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -264, 0], "qx/decoration/Modern/tabview/tabview-pane-b.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -60], "qx/decoration/Modern/tabview/tabview-pane-tl.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -90], "qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -56, 0], "qx/icon/Tango/16/actions/dialog-ok.png": [16, 16, "png", "qx"], "qx/decoration/Modern/colorselector/huesaturation-handle.gif": [11, 11, "gif", "qx", "qx/decoration/Modern/colorselector-combined.gif", -35, 0], "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png": [12, 10, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -8, 0], "qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png": [6, 15, "png", "qx"], "qx/static/blank.gif": [1, 1, "gif", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-up.png": [6, 4, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -53, 0], "qx/decoration/Modern/pane-lr-combined.png": [12, 238, "png", "qx"], "qx/decoration/Modern/form/checkbox-checked-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -404, 0], "qx/icon/Tango/22/places/folder.png": [22, 22, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/window/captionbar-active-l.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-active-combined.png", -6, 0], "qx/decoration/Modern/shadow/shadow-t.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -30], "qx/decoration/Modern/window-captionbar-lr-inactive-combined.png": [12, 9, "png", "qx"], "qx/icon/Tango/22/places/folder-open.png": [22, 22, "png", "qx"], "qx/decoration/Modern/window/statusbar-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -12], "qx/decoration/Modern/toolbar/toolbar-gradient-blue.png": [20, 130, "png", "qx", "qx/decoration/Modern/toolbar-combined.png", 0, 0], "qx/decoration/Modern/window/captionbar-inactive-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -6], "qx/decoration/Modern/groupbox/groupbox-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, 0], "qx/decoration/Modern/pane/pane-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -12], "qx/decoration/Modern/form/button-hovered-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -28], "qx/decoration/Modern/window-captionbar-buttons-combined.png": [108, 9, "png", "qx"], "qx/decoration/Modern/pane/pane-r.png": [6, 238, "png", "qx", "qx/decoration/Modern/pane-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-hovered-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -32], "qx/decoration/Modern/window/captionbar-active-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -18], "qx/decoration/Modern/window-captionbar-tb-active-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -8], "qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/window/statusbar-l.png": [4, 7, "png", "qx", "qx/decoration/Modern/window-statusbar-lr-combined.png", -4, 0], "qx/decoration/Modern/shadow/shadow-b.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -75], "qx/decoration/Modern/form/button-disabled-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -72], "qx/decoration/Modern/scrollbar/scrollbar-down.png": [6, 4, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -145, 0], "qx/decoration/Modern/cursors-combined.gif": [71, 20, "gif", "qx"], "qx/decoration/Modern/scrollbar/slider-knob-background.png": [12, 10, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -27, 0], "qx/decoration/Modern/form/button-disabled-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -128], "qx/decoration/Modern/window/statusbar-r.png": [4, 7, "png", "qx", "qx/decoration/Modern/window-statusbar-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-right-inactive-c.png": [14, 39, "png", "qx"], "qx/decoration/Modern/window/captionbar-inactive-l.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-inactive-combined.png", -6, 0], "qx/decoration/Modern/form/checkbox-checked-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -460, 0], "qx/decoration/Modern/form/button-preselected-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-top-active-r.png": [5, 12, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-lr-combined.png", 0, 0], "qx/decoration/Modern/arrows/forward.png": [10, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -43, 0], "qx/decoration/Modern/form/button-preselected-focused-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, 0], "qx/decoration/Modern/form/checkbox.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -278, 0], "qx/decoration/Modern/arrows-combined.png": [87, 8, "png", "qx"], "qx/decoration/Modern/arrows/left.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", 0, 0], "qx/decoration/Modern/form/button-focused-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -16, 0], "qx/decoration/Modern/cursors/copy.gif": [19, 15, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", -52, 0], "qx/decoration/Modern/tabview/tab-button-top-active-tl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-right-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -15], "qx/decoration/Modern/pane/pane-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -18], "qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/scrollbar/scrollbar-left.png": [4, 6, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -170, 0], "qx/decoration/Modern/button-tb-combined.png": [4, 216, "png", "qx"], "qx/decoration/Modern/pane/pane-c.png": [20, 238, "png", "qx"], "qx/decoration/Modern/form/button-preselected-focused-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -8], "qx/decoration/Modern/selection.png": [110, 20, "png", "qx"], "qx/decoration/Modern/table/select-column-order.png": [10, 9, "png", "qx", "qx/decoration/Modern/table-combined.png", -36, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png", 0, -3], "qx/decoration/Modern/arrows/up.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -35, 0], "qx/decoration/Modern/form/button-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -12], "qx/decoration/Modern/form/button-pressed-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -108], "qx/decoration/Modern/window/maximize-active.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -81, 0], "qx/decoration/Modern/tabview/tab-button-top-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, 0], "qx/decoration/Modern/form/button-preselected-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -20, 0], "qx/decoration/Modern/form/button-checked-focused-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -148], "qx/decoration/Modern/form/button-pressed-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -160], "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview/tabview-pane.png": [185, 250, "png", "qx"], "qx/decoration/Modern/window/captionbar-active-c.png": [20, 9, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -12], "qx/decoration/Modern/tabview/tabview-pane-t.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -150], "qx/decoration/Modern/tabview/tab-button-top-inactive-c.png": [20, 15, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-arrow.png": [11, 14, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-tr.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -18], "qx/decoration/Modern/form/button-checked-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -40], "qx/decoration/Modern/groupbox/groupbox-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -20], "qx/decoration/Modern/form/button-preselected-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -52], "qx/decoration/Modern/form/button-hovered-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -40, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/form/button-focused-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/checkbox-checked.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -320, 0], "qx/decoration/Modern/window/close-inactive.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -63, 0], "qx/decoration/Modern/arrows/down.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -74, 0], "qx/decoration/Modern/tabview/tab-button-left-active-c.png": [12, 37, "png", "qx"], "qx/decoration/Modern/form/button-disabled-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -4, 0], "qx/decoration/Modern/window/captionbar-inactive-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -12], "qx/decoration/Modern/arrows/right-invert.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -15, 0], "qx/decoration/Modern/arrows/left-invert.png": [5, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -30, 0], "qx/decoration/Modern/form/button-pressed-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -144], "qx/decoration/Modern/tabview/tabview-pane-r.png": [30, 2, "png", "qx", "qx/decoration/Modern/tabview-pane-lr-combined.png", -30, 0], "qx/decoration/Modern/form/button-preselected-focused-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -64, 0], "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview-button-right-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/tooltip-error-tb-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png", 0, -6], "qx/decoration/Modern/tabview/tab-button-top-active-l.png": [5, 12, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-lr-combined.png", -5, 0], "qx/decoration/Modern/toolbar/toolbar-part.gif": [7, 1, "gif", "qx"], "qx/decoration/Modern/shadow/shadow-br.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tab-button-right-active-c.png": [12, 37, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -15], "qx/decoration/Modern/window/statusbar-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -4], "myaccount/test.png": [32, 32, "png", "myaccount"], "qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -10], "qx/decoration/Modern/tabview/tab-button-left-active-l.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-lr-combined.png", -5, 0], "qx/decoration/Modern/form/button-preselected-focused-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", 0, 0], "qx/decoration/Modern/shadow-lr-combined.png": [30, 382, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-top-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -5], "qx/decoration/Modern/form/radiobutton-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -502, 0], "qx/decoration/Modern/form/checkbox-checked-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -544, 0], "qx/decoration/Modern/form/checkbox-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -586, 0], "qx/decoration/Modern/shadow/shadow-bl.png": [15, 15, "png", "qx", "qx/decoration/Modern/shadow-tb-combined.png", 0, -45], "qx/decoration/Modern/tabview/tab-button-right-inactive-l.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/tree/open-selected.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", -24, 0], "qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", 0, 0], "qx/decoration/Modern/form/button-focused-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -88], "qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-t-combined.png", 0, -3], "qx/decoration/Modern/groupbox/groupbox-r.png": [4, 51, "png", "qx", "qx/decoration/Modern/groupbox-lr-combined.png", -4, 0], "qx/decoration/Modern/arrows/up-invert.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -53, 0], "qx/decoration/Modern/form/button-preselected-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -44], "qx/decoration/Modern/form/button-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -68, 0], "qx/decoration/Modern/window/statusbar-c.png": [20, 7, "png", "qx"], "qx/decoration/Modern/tree/closed.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", -8, 0], "qx/decoration/Modern/form/button-disabled-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/tree/open.png": [8, 8, "png", "qx", "qx/decoration/Modern/tree-combined.png", -16, 0], "qx/decoration/Modern/table/ascending.png": [8, 5, "png", "qx", "qx/decoration/Modern/table-combined.png", -46, 0], "qx/decoration/Modern/groupbox/groupbox-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -16], "qx/decoration/Modern/menu/bar-background.png": [40, 20, "png", "qx", "qx/decoration/Modern/menu-background-combined.png", -20, 0], "qx/decoration/Modern/form/radiobutton-checked-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -390, 0], "qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png": [6, 15, "png", "qx"], "qx/decoration/Modern/tabview-button-left-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/menu/checkbox.gif": [16, 7, "gif", "qx", "qx/decoration/Modern/menu-checkradio-combined.gif", -48, 0], "qx/decoration/Modern/form/button-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -156], "qx/decoration/Modern/form/tooltip-error-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, 0], "qx/decoration/Modern/form/button-hovered-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -36], "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/window/close-active.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -54, 0], "qx/decoration/Modern/splitpane/knob-horizontal.png": [1, 8, "png", "qx", "qx/decoration/Modern/splitpane-knobs-combined.png", 0, 0], "qx/decoration/Modern/groupbox/groupbox-c.png": [20, 51, "png", "qx"], "qx/decoration/Modern/form/button-preselected-focused-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/shadow/shadow-small-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -25], "qx/decoration/Modern/form/radiobutton-checked-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -28, 0], "qx/decoration/Modern/arrows/down-invert.png": [8, 5, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -61, 0], "qx/decoration/Modern/menu/background.png": [20, 49, "png", "qx", "qx/decoration/Modern/menu-background-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -154, 0], "qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -210, 0], "qx/decoration/Modern/shadow-tb-combined.png": [15, 90, "png", "qx"], "qx/decoration/Modern/form/button-checked-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/window/restore-active-hovered.png": [9, 8, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -99, 0], "qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png": [6, 39, "png", "qx"], "qx/decoration/Modern/window/restore-active.png": [9, 8, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", 0, 0], "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png": [6, 36, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-left-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -20], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png": [20, 15, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-bottom-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -25], "qx/decoration/Modern/table/boolean-true.png": [14, 14, "png", "qx", "qx/decoration/Modern/table-combined.png", -8, 0], "qx/decoration/Modern/window/captionbar-active-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, -12], "qx/decoration/Modern/form/checkbox-checked-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -600, 0], "qx/decoration/Modern/form/button-preselected-focused-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -204], "qx/decoration/Modern/table/boolean-false.png": [14, 14, "png", "qx", "qx/decoration/Modern/table-combined.png", -22, 0], "qx/decoration/Modern/form/button-focused-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -44, 0], "qx/decoration/Modern/window/captionbar-inactive-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-inactive-combined.png", 0, -24], "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tab-button-top-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-top-active-tb-combined.png", 0, -25], "qx/decoration/Modern/window/statusbar-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -20], "qx/decoration/Modern/form/button-preselected-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -112], "qx/decoration/Modern/form/button-pressed-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/cursors/alias.gif": [19, 15, "gif", "qx", "qx/decoration/Modern/cursors-combined.gif", -33, 0], "qx/decoration/Modern/tabview/tabview-pane-bl.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, 0], "qx/icon/Tango/16/places/folder.png": [16, 16, "png", "qx"], "qx/decoration/Modern/form/button-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -140], "qx/decoration/Modern/form/radiobutton-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -446, 0], "qx/decoration/Modern/tabview/tab-button-top-active-c.png": [20, 12, "png", "qx"], "qx/decoration/Modern/splitpane-knobs-combined.png": [8, 9, "png", "qx"], "qx/decoration/Modern/app-header.png": [110, 20, "png", "qx"], "qx/decoration/Modern/groupbox/groupbox-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/groupbox-tb-combined.png", 0, -4], "qx/decoration/Modern/window/restore-inactive.png": [9, 8, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -27, 0], "qx/decoration/Modern/form/button-checked-focused-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -100], "qx/decoration/Modern/shadow/shadow-small-l.png": [5, 136, "png", "qx", "qx/decoration/Modern/shadow-small-lr-combined.png", -5, 0], "qx/icon/Tango/16/actions/window-close.png": [16, 16, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/form/button-checked-r.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -52, 0], "qx/decoration/Modern/shadow/shadow-small-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -20], "qx/decoration/Modern/tabview-button-top-active-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/tabview/tabview-pane-c.png": [20, 2, "png", "qx"], "qx/decoration/Modern/form/button-pressed-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -64], "qx/decoration/Modern/form/radiobutton.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -334, 0], "qx/decoration/Modern/form/button-checked-focused-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -136], "qx/decoration/Modern/arrows/rewind.png": [10, 8, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -20, 0], "qx/decoration/Modern/window/captionbar-active-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/window-captionbar-tb-active-combined.png", 0, 0], "qx/decoration/Modern/form/checkbox-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -376, 0], "qx/decoration/Modern/tabview-button-right-active-lr-combined.png": [10, 37, "png", "qx"], "qx/decoration/Modern/form/button-focused-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -124], "qx/decoration/Modern/shadow/shadow-small-c.png": [20, 136, "png", "qx"], "qx/decoration/Modern/window/statusbar-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -8], "qx/decoration/Modern/window-statusbar-tb-combined.png": [4, 24, "png", "qx"], "qx/decoration/Modern/form/button-focused-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -172], "qx/decoration/Modern/tabview/tabview-pane-br.png": [30, 30, "png", "qx", "qx/decoration/Modern/tabview-pane-tb-combined.png", 0, -120], "qx/decoration/Modern/button-lr-combined.png": [72, 52, "png", "qx"], "qx/decoration/Modern/form/button-preselected-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -196], "qx/decoration/Modern/tabview/tab-button-left-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/form/checkbox-checked-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -614, 0], "qx/decoration/Modern/shadow/shadow-small-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/shadow-small-tb-combined.png", 0, -5], "qx/decoration/Modern/tabview/tab-button-right-inactive-r.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png", 0, 0], "qx/decoration/Modern/form/button-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -20], "qx/icon/Tango/16/apps/utilities-color-chooser.png": [16, 16, "png", "qx"], "qx/decoration/Modern/shadow/shadow-c.png": [20, 382, "png", "qx"], "qx/decoration/Modern/table-combined.png": [74, 18, "png", "qx"], "qx/decoration/Modern/pane/pane-bl.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, 0], "qx/decoration/Modern/form/radiobutton-checked.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -292, 0], "qx/decoration/Modern/arrows/up-small.png": [5, 3, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -69, 0], "qx/decoration/Modern/form/tooltip-error-tl.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -6], "qx/decoration/Modern/scrollbar-combined.png": [174, 76, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-active-tr.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -20], "qx/decoration/Modern/toolbar-combined.png": [40, 130, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-b.png": [6, 6, "png", "qx", "qx/decoration/Modern/tooltip-error-tb-combined.png", 0, -24], "qx/decoration/Modern/form/checkbox-focused.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -488, 0], "qx/decoration/Modern/form/button-disabled-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -208], "qx/decoration/Modern/form/button-preselected-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -56], "qx/decoration/Modern/form/button-pressed-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -24, 0], "qx/decoration/Modern/tabview/tab-button-left-active-r.png": [5, 37, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-lr-combined.png", 0, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-br.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -15], "qx/decoration/Modern/tabview/tab-button-bottom-active-r.png": [5, 14, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png", 0, 0], "qx/icon/Tango/16/places/folder-open.png": [16, 16, "png", "qx"], "qx/decoration/Modern/window-statusbar-lr-combined.png": [8, 7, "png", "qx"], "qx/decoration/Modern/groupbox-lr-combined.png": [8, 51, "png", "qx"], "qx/decoration/Modern/form/button-checked-focused-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -4], "qx/decoration/Modern/form/radiobutton-hovered.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -14, 0], "qx/decoration/Modern/tabview/tab-button-left-inactive-r.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -432, 0], "qx/decoration/Modern/tabview/tab-button-top-inactive-b.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png", 0, 0], "qx/decoration/Modern/form/checkbox-disabled.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -196, 0], "qx/decoration/Modern/form/button-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -60], "qx/decoration/Modern/toolbar/toolbar-handle-knob.gif": [1, 8, "gif", "qx"], "qx/decoration/Modern/form/button-checked-focused-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -68], "qx/decoration/Modern/form/button-checked-bl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -76], "qx/decoration/Modern/window/minimize-inactive.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -36, 0], "qx/decoration/Modern/form/tooltip-error-l.png": [6, 18, "png", "qx", "qx/decoration/Modern/tooltip-error-lr-combined.png", 0, 0], "qx/decoration/Modern/arrows/down-small.png": [5, 3, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -82, 0], "qx/decoration/Modern/colorselector/brightness-handle.gif": [35, 11, "gif", "qx", "qx/decoration/Modern/colorselector-combined.gif", 0, 0], "qx/icon/Tango/32/places/folder.png": [32, 32, "png", "qx"], "qx/decoration/Modern/pane/pane-br.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -30], "qx/decoration/Modern/splitpane/knob-vertical.png": [8, 1, "png", "qx", "qx/decoration/Modern/splitpane-knobs-combined.png", 0, -8], "qx/decoration/Modern/scrollbar/scrollbar-right.png": [4, 6, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -39, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/tabview-button-top-active-lr-combined.png": [10, 12, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-right-active-t.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-right-active-tb-combined.png", 0, -25], "qx/decoration/Modern/form/button-hovered-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -60, 0], "qx/decoration/Modern/shadow-small-tb-combined.png": [5, 30, "png", "qx"], "qx/decoration/Modern/menu-background-combined.png": [60, 49, "png", "qx"], "qx/decoration/Modern/form/button-checked-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -188], "qx/decoration/Modern/tabview/tab-button-top-inactive-l.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/colorselector-combined.gif": [46, 11, "gif", "qx"], "qx/decoration/Modern/pane/pane-t.png": [6, 6, "png", "qx", "qx/decoration/Modern/pane-tb-combined.png", 0, -24], "qx/decoration/Modern/tabview/tab-button-right-inactive-br.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-b-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png": [3, 15, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png", -3, 0], "qx/decoration/Modern/tabview/tab-button-bottom-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png", 0, -5], "qx/decoration/Modern/tabview/tab-button-left-inactive-l.png": [3, 39, "png", "qx", "qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png", 0, 0], "qx/icon/Tango/16/mimetypes/office-document.png": [16, 16, "png", "qx"], "qx/decoration/Modern/form/radiobutton-pressed.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -168, 0], "qx/decoration/Modern/form/checkbox-focused-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -182, 0], "qx/decoration/Modern/window/statusbar-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/window-statusbar-tb-combined.png", 0, -16], "qx/decoration/Modern/window/maximize-inactive.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -18, 0], "qx/decoration/Modern/tabview-pane-lr-combined.png": [60, 2, "png", "qx"], "qx/decoration/Modern/form/button-hovered-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -80], "qx/decoration/Modern/form/button-preselected-focused-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -96], "qx/decoration/Modern/window/minimize-active.png": [9, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-buttons-combined.png", -90, 0], "qx/decoration/Modern/tabview/tab-button-left-active-b.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, 0], "qx/decoration/Modern/window/captionbar-active-r.png": [6, 9, "png", "qx", "qx/decoration/Modern/window-captionbar-lr-active-combined.png", 0, 0], "qx/decoration/Modern/table/descending.png": [8, 5, "png", "qx", "qx/decoration/Modern/table-combined.png", 0, 0], "qx/decoration/Modern/form/button-checked-tr.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -116], "qx/decoration/Modern/tabview/tab-button-left-active-bl.png": [5, 5, "png", "qx", "qx/decoration/Modern/tabview-button-left-active-tb-combined.png", 0, -5], "qx/decoration/Modern/arrows/down-small-invert.png": [5, 3, "png", "qx", "qx/decoration/Modern/arrows-combined.png", -10, 0], "qx/icon/Tango/16/apps/office-calendar.png": [16, 16, "png", "qx"], "qx/icon/Tango/32/places/folder-open.png": [32, 32, "png", "qx"], "qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png": [10, 19, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -43, 0], "qx/decoration/Modern/form/button-checked-b.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -176], "qx/decoration/Modern/form/tooltip-error-r.png": [6, 18, "png", "qx", "qx/decoration/Modern/tooltip-error-lr-combined.png", -6, 0], "qx/decoration/Modern/form/button-pressed-t.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -200], "qx/decoration/Modern/form/button-preselected-focused-br.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -212], "qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png": [14, 14, "png", "qx", "qx/decoration/Modern/inputcheckradio-combined.png", -362, 0], "qx/decoration/Modern/form/button-c.png": [20, 52, "png", "qx"], "qx/decoration/Modern/form/button-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -56, 0], "qx/decoration/Modern/form/button-hovered-tl.png": [4, 4, "png", "qx", "qx/decoration/Modern/button-tb-combined.png", 0, -24], "qx/decoration/Modern/form/button-disabled-l.png": [4, 52, "png", "qx", "qx/decoration/Modern/button-lr-combined.png", -28, 0], "qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png", 0, 0], "qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png": [3, 9, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-b-combined.png", 0, -6], "qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png": [19, 10, "png", "qx", "qx/decoration/Modern/scrollbar-combined.png", -151, 0], "qx/decoration/Modern/window/captionbar-inactive-c.png": [20, 9, "png", "qx"], "qx/decoration/Modern/form/tooltip-error-c.png": [20, 18, "png", "qx"], "qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-top-inactive-t-combined.png", 0, -3], "qx/decoration/Modern/tabview/tab-button-right-inactive-t.png": [3, 3, "png", "qx", "qx/decoration/Modern/tabview-button-right-inactive-t-combined.png", 0, -3]};
qx.$$translations = {};
qx.$$locales = {"C": {"cldr_date_format_long": "MMMM d, yyyy", "cldr_month_format_wide_11": "November", "cldr_month_format_wide_12": "December", "cldr_month_format_wide_10": "October", "cldr_time_format_long": "h:mm:ss a z", "cldr_day_format_abbreviated_sat": "Sat", "cldr_month_format_abbreviated_8": "Aug", "cldr_month_format_wide_7": "July", "cldr_day_stand-alone_abbreviated_tue": "Tue", "cldr_day_format_wide_sun": "Sunday", "cldr_day_format_wide_wed": "Wednesday", "cldr_day_format_narrow_thu": "T", "cldr_day_format_narrow_fri": "F", "cldr_month_format_wide_5": "May", "cldr_day_stand-alone_wide_sat": "Saturday", "cldr_month_stand-alone_narrow_3": "M", "cldr_month_stand-alone_narrow_1": "J", "cldr_day_format_narrow_sun": "S", "cldr_date_time_format_MEd": "E, M/d", "cldr_date_time_format_MMM": "LLL", "cldr_month_stand-alone_narrow_5": "M", "cldr_day_format_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_7": "J", "cldr_month_stand-alone_narrow_6": "J", "cldr_month_stand-alone_narrow_9": "S", "cldr_day_stand-alone_wide_sun": "Sunday", "cldr_date_time_format_Md": "M/d", "cldr_month_stand-alone_narrow_4": "A", "cldr_day_stand-alone_wide_fri": "Friday", "cldr_month_stand-alone_narrow_2": "F", "cldr_day_format_abbreviated_fri": "Fri", "cldr_day_stand-alone_abbreviated_fri": "Fri", "cldr_pm": "PM", "cldr_day_format_narrow_tue": "T", "alternateQuotationEnd": "’", "cldr_date_time_format_M": "L", "cldr_month_stand-alone_narrow_8": "A", "quotationEnd": "”", "cldr_day_stand-alone_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_11": "N", "cldr_month_stand-alone_narrow_10": "O", "cldr_month_stand-alone_narrow_12": "D", "cldr_day_format_wide_thu": "Thursday", "cldr_day_stand-alone_narrow_sat": "S", "cldr_day_format_wide_tue": "Tuesday", "cldr_day_format_wide_fri": "Friday", "cldr_date_format_medium": "MMM d, yyyy", "cldr_day_format_narrow_sat": "S", "cldr_date_format_full": "EEEE, MMMM d, yyyy", "cldr_day_stand-alone_wide_thu": "Thursday", "quotationStart": "“", "cldr_date_time_format_MMMd": "MMM d", "cldr_day_format_abbreviated_tue": "Tue", "cldr_day_format_abbreviated_mon": "Mon", "cldr_date_time_format_yM": "M/yyyy", "cldr_day_stand-alone_wide_mon": "Monday", "cldr_date_time_format_MMMEd": "E, MMM d", "cldr_date_time_format_yQ": "Q yyyy", "cldr_date_time_format_hm": "h:mm a", "cldr_day_stand-alone_narrow_sun": "S", "cldr_day_stand-alone_abbreviated_sat": "Sat", "cldr_month_format_wide_1": "January", "cldr_month_format_wide_3": "March", "cldr_month_format_wide_2": "February", "cldr_day_stand-alone_abbreviated_sun": "Sun", "cldr_month_format_wide_4": "April", "cldr_date_time_format_MMMMd": "MMMM d", "cldr_month_format_wide_6": "June", "cldr_month_format_wide_9": "September", "cldr_month_format_wide_8": "August", "cldr_day_stand-alone_narrow_tue": "T", "cldr_date_time_format_MMMMEd": "E, MMMM d", "cldr_day_stand-alone_narrow_wed": "W", "cldr_time_format_full": "h:mm:ss a v", "cldr_am": "AM", "cldr_number_decimal_separator": ".", "cldr_number_percent_format": "#,##0%", "cldr_day_stand-alone_wide_wed": "Wednesday", "cldr_number_group_separator": ",", "alternateQuotationStart": "‘", "cldr_day_format_abbreviated_sun": "Sun", "cldr_time_format_short": "h:mm a", "cldr_date_time_format_Hms": "HH:mm:ss", "cldr_time_format_medium": "h:mm:ss a", "cldr_date_time_format_ms": "mm:ss", "cldr_day_stand-alone_narrow_thu": "T", "cldr_month_format_abbreviated_1": "Jan", "cldr_month_format_abbreviated_2": "Feb", "cldr_month_format_abbreviated_3": "Mar", "cldr_month_format_abbreviated_4": "Apr", "cldr_month_format_abbreviated_5": "May", "cldr_month_format_abbreviated_6": "Jun", "cldr_month_format_abbreviated_7": "Jul", "cldr_date_time_format_yMMMEd": "EEE, MMM d, yyyy", "cldr_month_format_abbreviated_9": "Sep", "cldr_day_format_wide_mon": "Monday", "cldr_date_time_format_yMEd": "EEE, M/d/yyyy", "cldr_month_format_abbreviated_10": "Oct", "cldr_date_time_format_y": "yyyy", "cldr_day_stand-alone_wide_tue": "Tuesday", "cldr_day_format_narrow_wed": "W", "cldr_day_format_abbreviated_wed": "Wed", "cldr_date_time_format_yQQQ": "QQQ yyyy", "cldr_day_stand-alone_narrow_fri": "F", "cldr_date_time_format_yMMM": "MMM yyyy", "cldr_day_stand-alone_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_mon": "Mon", "cldr_day_format_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_wed": "Wed", "cldr_date_time_format_yMMMM": "MMMM yyyy", "cldr_month_format_abbreviated_12": "Dec", "cldr_date_time_format_Hm": "HH:mm", "cldr_month_format_abbreviated_11": "Nov", "cldr_day_format_wide_sat": "Saturday", "cldr_date_time_format_d": "d", "cldr_date_format_short": "M/d/yy"}, "en": {"cldr_date_format_long": "MMMM d, yyyy", "cldr_month_format_wide_11": "November", "cldr_month_format_wide_12": "December", "cldr_month_format_wide_10": "October", "cldr_time_format_long": "h:mm:ss a z", "cldr_day_format_abbreviated_sat": "Sat", "cldr_month_format_abbreviated_8": "Aug", "cldr_month_format_wide_7": "July", "cldr_day_stand-alone_abbreviated_tue": "Tue", "cldr_day_format_wide_sun": "Sunday", "cldr_day_format_wide_wed": "Wednesday", "cldr_day_format_narrow_thu": "T", "cldr_day_format_narrow_fri": "F", "cldr_month_format_wide_5": "May", "cldr_day_stand-alone_wide_sat": "Saturday", "cldr_month_stand-alone_narrow_3": "M", "cldr_month_stand-alone_narrow_1": "J", "cldr_day_format_narrow_sun": "S", "cldr_date_time_format_MEd": "E, M/d", "cldr_date_time_format_MMM": "LLL", "cldr_month_stand-alone_narrow_5": "M", "cldr_day_format_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_7": "J", "cldr_month_stand-alone_narrow_6": "J", "cldr_month_stand-alone_narrow_9": "S", "cldr_day_stand-alone_wide_sun": "Sunday", "cldr_date_time_format_Md": "M/d", "cldr_month_stand-alone_narrow_4": "A", "cldr_day_stand-alone_wide_fri": "Friday", "cldr_month_stand-alone_narrow_2": "F", "cldr_day_format_abbreviated_fri": "Fri", "cldr_day_stand-alone_abbreviated_fri": "Fri", "cldr_pm": "PM", "cldr_day_format_narrow_tue": "T", "alternateQuotationEnd": "’", "cldr_date_time_format_M": "L", "cldr_month_stand-alone_narrow_8": "A", "quotationEnd": "”", "cldr_day_stand-alone_abbreviated_thu": "Thu", "cldr_month_stand-alone_narrow_11": "N", "cldr_month_stand-alone_narrow_10": "O", "cldr_month_stand-alone_narrow_12": "D", "cldr_day_format_wide_thu": "Thursday", "cldr_day_stand-alone_narrow_sat": "S", "cldr_day_format_wide_tue": "Tuesday", "cldr_day_format_wide_fri": "Friday", "cldr_date_format_medium": "MMM d, yyyy", "cldr_day_format_narrow_sat": "S", "cldr_date_format_full": "EEEE, MMMM d, yyyy", "cldr_day_stand-alone_wide_thu": "Thursday", "quotationStart": "“", "cldr_date_time_format_MMMd": "MMM d", "cldr_day_format_abbreviated_tue": "Tue", "cldr_day_format_abbreviated_mon": "Mon", "cldr_date_time_format_yM": "M/yyyy", "cldr_day_stand-alone_wide_mon": "Monday", "cldr_date_time_format_MMMEd": "E, MMM d", "cldr_date_time_format_yQ": "Q yyyy", "cldr_date_time_format_hm": "h:mm a", "cldr_day_stand-alone_narrow_sun": "S", "cldr_day_stand-alone_abbreviated_sat": "Sat", "cldr_month_format_wide_1": "January", "cldr_month_format_wide_3": "March", "cldr_month_format_wide_2": "February", "cldr_day_stand-alone_abbreviated_sun": "Sun", "cldr_month_format_wide_4": "April", "cldr_date_time_format_MMMMd": "MMMM d", "cldr_month_format_wide_6": "June", "cldr_month_format_wide_9": "September", "cldr_month_format_wide_8": "August", "cldr_day_stand-alone_narrow_tue": "T", "cldr_date_time_format_MMMMEd": "E, MMMM d", "cldr_day_stand-alone_narrow_wed": "W", "cldr_time_format_full": "h:mm:ss a v", "cldr_am": "AM", "cldr_number_decimal_separator": ".", "cldr_number_percent_format": "#,##0%", "cldr_day_stand-alone_wide_wed": "Wednesday", "cldr_number_group_separator": ",", "alternateQuotationStart": "‘", "cldr_day_format_abbreviated_sun": "Sun", "cldr_time_format_short": "h:mm a", "cldr_date_time_format_Hms": "HH:mm:ss", "cldr_time_format_medium": "h:mm:ss a", "cldr_date_time_format_ms": "mm:ss", "cldr_day_stand-alone_narrow_thu": "T", "cldr_month_format_abbreviated_1": "Jan", "cldr_month_format_abbreviated_2": "Feb", "cldr_month_format_abbreviated_3": "Mar", "cldr_month_format_abbreviated_4": "Apr", "cldr_month_format_abbreviated_5": "May", "cldr_month_format_abbreviated_6": "Jun", "cldr_month_format_abbreviated_7": "Jul", "cldr_date_time_format_yMMMEd": "EEE, MMM d, yyyy", "cldr_month_format_abbreviated_9": "Sep", "cldr_day_format_wide_mon": "Monday", "cldr_date_time_format_yMEd": "EEE, M/d/yyyy", "cldr_month_format_abbreviated_10": "Oct", "cldr_date_time_format_y": "yyyy", "cldr_day_stand-alone_wide_tue": "Tuesday", "cldr_day_format_narrow_wed": "W", "cldr_day_format_abbreviated_wed": "Wed", "cldr_date_time_format_yQQQ": "QQQ yyyy", "cldr_day_stand-alone_narrow_fri": "F", "cldr_date_time_format_yMMM": "MMM yyyy", "cldr_day_stand-alone_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_mon": "Mon", "cldr_day_format_narrow_mon": "M", "cldr_day_stand-alone_abbreviated_wed": "Wed", "cldr_date_time_format_yMMMM": "MMMM yyyy", "cldr_month_format_abbreviated_12": "Dec", "cldr_date_time_format_Hm": "HH:mm", "cldr_month_format_abbreviated_11": "Nov", "cldr_day_format_wide_sat": "Saturday", "cldr_date_time_format_d": "d", "cldr_date_format_short": "M/d/yy"}};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["qx:myaccount-0.js"]],
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

(function(){var h=".",g="()",f="[Class ",e=".prototype",d="toString",c="qx.Bootstrap",b="]",a="Class";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return f+this.classname+b;
},createNamespace:function(name,l){var n=name.split(h);
var parent=window;
var m=n[0];

for(var i=0,o=n.length-1;i<o;i++,m=n[i]){if(!parent[m]){parent=parent[m]={};
}else{parent=parent[m];
}}parent[m]=l;
return m;
},setDisplayName:function(j,k,name){j.displayName=k+h+name+g;
},setDisplayNames:function(w,x){for(var name in w){var y=w[name];

if(y instanceof Function){y.displayName=x+h+name+g;
}}},define:function(name,p){if(!p){var p={statics:{}};
}var u;
var s=null;
qx.Bootstrap.setDisplayNames(p.statics,name);

if(p.members){qx.Bootstrap.setDisplayNames(p.members,name+e);
u=p.construct||new Function;
var q=p.statics;

for(var r in q){u[r]=q[r];
}s=u.prototype;
var v=p.members;

for(var r in v){s[r]=v[r];
}}else{u=p.statics||{};
}var t=this.createNamespace(name,u);
u.name=u.classname=name;
u.basename=t;
u.$$type=a;
if(!u.hasOwnProperty(d)){u.toString=this.genericToString;
}if(p.defer){p.defer(u,s);
}qx.Bootstrap.$$registry[name]=p.statics;
}};
qx.Bootstrap.define(c,{statics:{LOADSTART:new Date,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,getByName:function(name){return this.$$registry[name];
},$$registry:{}}});
})();
(function(){var m="qx.allowUrlSettings",l="&",k="qx.core.Setting",j="qx.allowUrlVariants",h="qxsetting",g=":",f=".";
qx.Bootstrap.define(k,{statics:{__a:{},define:function(o,p){if(p===undefined){throw new Error('Default value of setting "'+o+'" must be defined!');
}
if(!this.__a[o]){this.__a[o]={};
}else if(this.__a[o].defaultValue!==undefined){throw new Error('Setting "'+o+'" is already defined!');
}this.__a[o].defaultValue=p;
},get:function(q){var r=this.__a[q];

if(r===undefined){throw new Error('Setting "'+q+'" is not defined.');
}
if(r.value!==undefined){return r.value;
}return r.defaultValue;
},set:function(b,c){if((b.split(f)).length<2){throw new Error('Malformed settings key "'+b+'". Must be following the schema "namespace.key".');
}
if(!this.__a[b]){this.__a[b]={};
}this.__a[b].value=c;
},__b:function(){if(window.qxsettings){for(var a in qxsettings){this.set(a,qxsettings[a]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(s){}this.__c();
}},__c:function(){if(this.get(m)!=true){return;
}var e=document.location.search.slice(1).split(l);

for(var i=0;i<e.length;i++){var d=e[i].split(g);

if(d.length!=3||d[0]!=h){continue;
}this.set(d[1],decodeURIComponent(d[2]));
}}},defer:function(n){n.define(m,false);
n.define(j,false);
n.__b();
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
(function(){var C="on",B="off",A="|",z="default",y="object",x="&",w="qx.aspects",u="$",t="qx.allowUrlVariants",s="qx.debug",m="qx.client",r="qx.dynlocale",p="webkit",k="qxvariant",j="opera",o=":",n="qx.core.Variant",q="mshtml",h="gecko";
qx.Bootstrap.define(n,{statics:{__e:{},__f:{},compilerIsSet:function(){return true;
},define:function(O,P,Q){{};

if(!this.__e[O]){this.__e[O]={};
}else{}this.__e[O].allowedValues=P;
this.__e[O].defaultValue=Q;
},get:function(I){var J=this.__e[I];
{};

if(J.value!==undefined){return J.value;
}return J.defaultValue;
},__g:function(){if(window.qxvariants){for(var a in qxvariants){{};

if(!this.__e[a]){this.__e[a]={};
}this.__e[a].value=qxvariants[a];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(M){}this.__h(this.__e);
}},__h:function(){if(qx.core.Setting.get(t)!=true){return;
}var e=document.location.search.slice(1).split(x);

for(var i=0;i<e.length;i++){var f=e[i].split(o);

if(f.length!=3||f[0]!=k){continue;
}var g=f[1];

if(!this.__e[g]){this.__e[g]={};
}this.__e[g].value=decodeURIComponent(f[2]);
}},select:function(b,c){{};

for(var d in c){if(this.isSet(b,d)){return c[d];
}}
if(c[z]!==undefined){return c[z];
}{};
},isSet:function(D,E){var F=D+u+E;

if(this.__f[F]!==undefined){return this.__f[F];
}var H=false;
if(E.indexOf(A)<0){H=this.get(D)===E;
}else{var G=E.split(A);

for(var i=0,l=G.length;i<l;i++){if(this.get(D)===G[i]){H=true;
break;
}}}this.__f[F]=H;
return H;
},__i:function(v){return typeof v===y&&v!==null&&v instanceof Array;
},__j:function(v){return typeof v===y&&v!==null&&!(v instanceof Array);
},__k:function(K,L){for(var i=0,l=K.length;i<l;i++){if(K[i]==L){return true;
}}return false;
}},defer:function(N){N.define(m,[h,q,j,p],qx.bom.client.Engine.NAME);
N.define(s,[C,B],C);
N.define(w,[C,B],B);
N.define(r,[C,B],C);
N.__g();
}});
})();
(function(){var F="qx.client",E='"',D="valueOf",C="toLocaleString",B="isPrototypeOf",A="",z="toString",y="qx.lang.Object",x='\", "',w="hasOwnProperty",v="Use 'clone()' instead!";
qx.Bootstrap.define(y,{statics:{empty:function(bb){{};

for(var bc in bb){if(bb.hasOwnProperty(bc)){delete bb[bc];
}}},isEmpty:qx.core.Variant.select(F,{"gecko":function(bm){{};
return bm.__count__===0;
},"default":function(bh){{};

for(var bi in bh){return false;
}return true;
}}),hasMinLength:qx.core.Variant.select(F,{"gecko":function(t,u){{};
return t.__count__>=u;
},"default":function(g,h){{};

if(h<=0){return true;
}var length=0;

for(var j in g){if((++length)>=h){return true;
}}return false;
}}),getLength:qx.core.Variant.select(F,{"gecko":function(k){{};
return k.__count__;
},"default":function(p){{};
var length=0;

for(var q in p){length++;
}return length;
}}),_shadowedKeys:[B,w,C,z,D],getKeys:qx.core.Variant.select(F,{"mshtml":function(V){var W=[];

for(var Y in V){W.push(Y);
}var X=Object.prototype.hasOwnProperty;

for(var i=0,a=this._shadowedKeys,l=a.length;i<l;i++){if(X.call(V,a[i])){W.push(a[i]);
}}return W;
},"default":function(b){var c=[];

for(var d in b){c.push(d);
}return c;
}}),getKeysAsString:function(T){{};
var U=qx.lang.Object.getKeys(T);

if(U.length==0){return A;
}return E+U.join(x)+E;
},getValues:function(m){{};
var o=[];
var n=this.getKeys(m);

for(var i=0,l=n.length;i<l;i++){o.push(m[n[i]]);
}return o;
},mergeWith:function(bd,be,bf){{};

if(bf===undefined){bf=true;
}
for(var bg in be){if(bf||bd[bg]===undefined){bd[bg]=be[bg];
}}return bd;
},carefullyMergeWith:function(O,P){{};
return qx.lang.Object.mergeWith(O,P,false);
},merge:function(L,M){{};
var N=arguments.length;

for(var i=1;i<N;i++){qx.lang.Object.mergeWith(L,arguments[i]);
}return L;
},copy:function(ba){qx.log.Logger.deprecatedMethodWarning(arguments.callee,v);
return qx.lang.Object.clone(ba);
},clone:function(G){{};
var H={};

for(var I in G){H[I]=G[I];
}return H;
},invert:function(bj){{};
var bk={};

for(var bl in bj){bk[bj[bl].toString()]=bl;
}return bk;
},getKeyFromValue:function(Q,R){{};

for(var S in Q){if(Q.hasOwnProperty(S)&&Q[S]===R){return S;
}}return null;
},contains:function(e,f){{};
return this.getKeyFromValue(e,f)!==null;
},select:function(J,K){{};
return K[J];
},fromArray:function(r){{};
var s={};

for(var i=0,l=r.length;i<l;i++){{};
s[r[i].toString()]=true;
}return s;
}}});
})();
(function(){var u="Function",t="Boolean",s="Error",r="Number",q="Array",p="Date",o="RegExp",n="String",m="Object",l="qx.lang.Type",k="string";
qx.Bootstrap.define(l,{statics:{__l:{"[object String]":n,"[object Array]":q,"[object Object]":m,"[object RegExp]":o,"[object Number]":r,"[object Boolean]":t,"[object Date]":p,"[object Function]":u,"[object Error]":s},getClass:function(a){var b=Object.prototype.toString.call(a);
return (this.__l[b]||b.slice(8,-1));
},isString:function(f){return (f!==null&&(typeof f===k||this.getClass(f)==n||f instanceof String||(!!f&&!!f.$$isString)));
},isArray:function(j){return (j!==null&&(j instanceof Array||(j&&qx.Class.hasInterface(j.constructor,qx.data.IListData))||this.getClass(j)==q||(!!j&&!!j.$$isArray)));
},isObject:function(g){return (g!==undefined&&g!==null&&this.getClass(g)==m);
},isRegExp:function(v){return this.getClass(v)==o;
},isNumber:function(c){return (c!==null&&(this.getClass(c)==r||c instanceof Number));
},isBoolean:function(d){return (d!==null&&(this.getClass(d)==t||d instanceof Boolean));
},isDate:function(e){return (e!==null&&(this.getClass(e)==p||e instanceof Date));
},isError:function(h){return (h!==null&&(this.getClass(h)==s||h instanceof Error));
},isFunction:function(i){return this.getClass(i)==u;
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
(function(){var S="qx.aspects",R="on",Q=".",P="static",O="[Class ",N="]",M="toString",L="constructor",K="member",J="$$init_",D=".prototype",I="destructor",G="extend",C="destruct",B="Class",F="off",E="qx.Class",H="qx.event.type.Data";
qx.Bootstrap.define(E,{statics:{define:function(name,bu){if(!bu){var bu={};
}if(bu.include&&!(bu.include instanceof Array)){bu.include=[bu.include];
}if(bu.implement&&!(bu.implement instanceof Array)){bu.implement=[bu.implement];
}if(!bu.hasOwnProperty(G)&&!bu.type){bu.type=P;
}{};
var bw=this.__r(name,bu.type,bu.extend,bu.statics,bu.construct,bu.destruct);
if(bu.extend){if(bu.properties){this.__t(bw,bu.properties,true);
}if(bu.members){this.__v(bw,bu.members,true,true,false);
}if(bu.events){this.__s(bw,bu.events,true);
}if(bu.include){for(var i=0,l=bu.include.length;i<l;i++){this.__y(bw,bu.include[i],false);
}}}if(bu.settings){for(var bv in bu.settings){qx.core.Setting.define(bv,bu.settings[bv]);
}}if(bu.variants){for(var bv in bu.variants){qx.core.Variant.define(bv,bu.variants[bv].allowedValues,bu.variants[bv].defaultValue);
}}if(bu.implement){for(var i=0,l=bu.implement.length;i<l;i++){this.__x(bw,bu.implement[i]);
}}{};
if(bu.defer){bu.defer.self=bw;
bu.defer(bw,bw.prototype,{add:function(name,bs){var bt={};
bt[name]=bs;
qx.Class.__t(bw,bt,true);
}});
}},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},getByName:function(name){return this.$$registry[name];
},include:function(bK,bL){{};
qx.Class.__y(bK,bL,false);
},patch:function(bb,bc){{};
qx.Class.__y(bb,bc,true);
},isSubClassOf:function(bG,bH){if(!bG){return false;
}
if(bG==bH){return true;
}
if(bG.prototype instanceof bH){return true;
}return false;
},getPropertyDefinition:function(f,name){while(f){if(f.$$properties&&f.$$properties[name]){return f.$$properties[name];
}f=f.superclass;
}return null;
},getProperties:function(ca){var cb=[];

while(ca){if(ca.$$properties){cb.push.apply(cb,qx.lang.Object.getKeys(ca.$$properties));
}ca=ca.superclass;
}return cb;
},getByProperty:function(bD,name){while(bD){if(bD.$$properties&&bD.$$properties[name]){return bD;
}bD=bD.superclass;
}return null;
},hasProperty:function(cl,name){return !!this.getPropertyDefinition(cl,name);
},getEventType:function(W,name){var W=W.constructor;

while(W.superclass){if(W.$$events&&W.$$events[name]!==undefined){return W.$$events[name];
}W=W.superclass;
}return null;
},supportsEvent:function(bN,name){return !!this.getEventType(bN,name);
},hasOwnMixin:function(b,c){return b.$$includes&&b.$$includes.indexOf(c)!==-1;
},getByMixin:function(bd,be){var bf,i,l;

while(bd){if(bd.$$includes){bf=bd.$$flatIncludes;

for(i=0,l=bf.length;i<l;i++){if(bf[i]===be){return bd;
}}}bd=bd.superclass;
}return null;
},getMixins:function(x){var y=[];

while(x){if(x.$$includes){y.push.apply(y,x.$$flatIncludes);
}x=x.superclass;
}return y;
},hasMixin:function(cc,cd){return !!this.getByMixin(cc,cd);
},hasOwnInterface:function(d,e){return d.$$implements&&d.$$implements.indexOf(e)!==-1;
},getByInterface:function(u,v){var w,i,l;

while(u){if(u.$$implements){w=u.$$flatImplements;

for(i=0,l=w.length;i<l;i++){if(w[i]===v){return u;
}}}u=u.superclass;
}return null;
},getInterfaces:function(bI){var bJ=[];

while(bI){if(bI.$$implements){bJ.push.apply(bJ,bI.$$flatImplements);
}bI=bI.superclass;
}return bJ;
},hasInterface:function(bE,bF){return !!this.getByInterface(bE,bF);
},implementsInterface:function(ci,cj){var ck=ci.constructor;

if(this.hasInterface(ck,cj)){return true;
}
try{qx.Interface.assertObject(ci,cj);
return true;
}catch(br){}
try{qx.Interface.assert(ck,cj,false);
return true;
}catch(bC){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return O+this.classname+N;
},$$registry:qx.Bootstrap.$$registry,__n:null,__o:null,__p:function(){},__q:function(){},__r:function(name,g,h,j,k,m){var r;

if(!h&&qx.core.Variant.isSet(S,F)){r=j||{};
qx.Bootstrap.setDisplayNames(r,name);
}else{r={};

if(h){if(!k){k=this.__z();
}r=this.__B(k,name,g);
qx.Bootstrap.setDisplayName(k,name,L);
}if(j){qx.Bootstrap.setDisplayNames(j,name);
var s;

for(var i=0,a=qx.lang.Object.getKeys(j),l=a.length;i<l;i++){s=a[i];
var o=j[s];

if(qx.core.Variant.isSet(S,R)){if(o instanceof Function){o=qx.core.Aspect.wrap(name+Q+s,o,P);
}r[s]=o;
}else{r[s]=o;
}}}}var q=qx.Bootstrap.createNamespace(name,r,false);
r.name=r.classname=name;
r.basename=q;
r.$$type=B;

if(g){r.$$classtype=g;
}if(!r.hasOwnProperty(M)){r.toString=this.genericToString;
}
if(h){var t=h.prototype;
var n=this.__A();
n.prototype=t;
var p=new n;
r.prototype=p;
p.name=p.classname=name;
p.basename=q;
k.base=r.superclass=h;
k.self=r.constructor=p.constructor=r;
if(m){if(qx.core.Variant.isSet(S,R)){m=qx.core.Aspect.wrap(name,m,I);
}r.$$destructor=m;
qx.Bootstrap.setDisplayName(m,name,C);
}}this.$$registry[name]=r;
return r;
},__s:function(ce,cf,cg){var ch,ch;
{};

if(ce.$$events){for(var ch in cf){ce.$$events[ch]=cf[ch];
}}else{ce.$$events=cf;
}},__t:function(bO,bP,bQ){var bS;

if(bQ===undefined){bQ=false;
}var bR=!!bO.$$propertiesAttached;

for(var name in bP){bS=bP[name];
{};
bS.name=name;
if(!bS.refine){if(bO.$$properties===undefined){bO.$$properties={};
}bO.$$properties[name]=bS;
}if(bS.init!==undefined){bO.prototype[J+name]=bS.init;
}if(bS.event!==undefined){var event={};
event[bS.event]=H;
this.__s(bO,event,bQ);
}if(bS.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(bR){qx.core.Property.attachMethods(bO,name,bS);
}}},__u:null,__v:function(bg,bh,bi,bj,bk){var bl=bg.prototype;
var bn,bm;
qx.Bootstrap.setDisplayNames(bh,bg.classname+D);

for(var i=0,a=qx.lang.Object.getKeys(bh),l=a.length;i<l;i++){bn=a[i];
bm=bh[bn];
{};
if(bj!==false&&bm instanceof Function&&bm.$$type==null){if(bk==true){bm=this.__w(bm,bl[bn]);
}else{if(bl[bn]){bm.base=bl[bn];
}bm.self=bg;
}
if(qx.core.Variant.isSet(S,R)){bm=qx.core.Aspect.wrap(bg.classname+Q+bn,bm,K);
}}bl[bn]=bm;
}},__w:function(bX,bY){if(bY){return function(){var A=bX.base;
bX.base=bY;
var z=bX.apply(this,arguments);
bX.base=A;
return z;
};
}else{return bX;
}},__x:function(X,Y){{};
var ba=qx.Interface.flatten([Y]);

if(X.$$implements){X.$$implements.push(Y);
X.$$flatImplements.push.apply(X.$$flatImplements,ba);
}else{X.$$implements=[Y];
X.$$flatImplements=ba;
}},__y:function(bx,by,bz){{};

if(this.hasMixin(bx,by)){qx.log.Logger.warn('Mixin "'+by.name+'" is already included into Class "'+bx.classname+'" by class: '+this.getByMixin(bx,by).classname+'!');
return;
}var bB=qx.Mixin.flatten([by]);
var bA;

for(var i=0,l=bB.length;i<l;i++){bA=bB[i];
if(bA.$$events){this.__s(bx,bA.$$events,bz);
}if(bA.$$properties){this.__t(bx,bA.$$properties,bz);
}if(bA.$$members){this.__v(bx,bA.$$members,bz,bz,bz);
}}if(bx.$$includes){bx.$$includes.push(by);
bx.$$flatIncludes.push.apply(bx.$$flatIncludes,bB);
}else{bx.$$includes=[by];
bx.$$flatIncludes=bB;
}},__z:function(){function bM(){arguments.callee.base.apply(this,arguments);
}return bM;
},__A:function(){return function(){};
},__B:function(bT,name,bU){var bW=function(){var V=arguments.callee.constructor;
{};
if(!V.$$propertiesAttached){qx.core.Property.attach(V);
}var U=V.$$original.apply(this,arguments);
if(V.$$includes){var T=V.$$flatIncludes;

for(var i=0,l=T.length;i<l;i++){if(T[i].$$constructor){T[i].$$constructor.apply(this,arguments);
}}}if(this.classname===name.classname){this.$$initialized=true;
}return U;
};

if(qx.core.Variant.isSet("qx.aspects","on")){var bV=qx.core.Aspect.wrap(name,bW,"constructor");
bW.$$original=bT;
bW.constructor=bV;
bW=bV;
}if(bU==="singleton"){bW.getInstance=this.getInstance;
}bW.$$original=bT;
bT.wrapper=bW;
return bW;
}},defer:function(bo){if(qx.core.Variant.isSet(S,R)){for(var bp in qx.Bootstrap.$$registry){var bo=qx.Bootstrap.$$registry[bp];

for(var bq in bo){if(bo[bq] instanceof Function){bo[bq]=qx.core.Aspect.wrap(bp+Q+bq,bo[bq],P);
}}}}}});
})();
(function(){var o="]",n="Theme",m="[Theme ",k="qx.Theme";
qx.Class.define(k,{statics:{define:function(name,e){if(!e){var e={};
}e.include=this.__C(e.include);
e.patch=this.__C(e.patch);
{};
var f={$$type:n,name:name,title:e.title,toString:this.genericToString};
if(e.extend){f.supertheme=e.extend;
}f.basename=qx.Bootstrap.createNamespace(name,f);
this.__G(f,e);
this.__D(f,e);
this.__E(f,e);
this.$$registry[name]=f;
for(var i=0,a=e.include,l=a.length;i<l;i++){this.include(f,a[i]);
}
for(var i=0,a=e.patch,l=a.length;i<l;i++){this.patch(f,a[i]);
}},__C:function(C){if(!C){return [];
}
if(qx.lang.Type.isArray(C)){return C;
}else{return [C];
}},__D:function(b,c){var d;
{};

if(c.resource){b.resource=c.resource;
}else if(c.extend&&c.extend.resource){b.resource=c.extend.resource;
}},__E:function(g,h){var j=h.aliases||{};

if(h.extend&&h.extend.aliases){qx.lang.Object.mergeWith(j,h.extend.aliases,false);
}g.aliases=j;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},genericToString:function(){return m+this.name+o;
},__F:function(D){for(var i=0,E=this.__H,l=E.length;i<l;i++){if(D[E[i]]){return E[i];
}}},__G:function(p,q){var t=this.__F(q);
if(q.extend&&!t){t=q.extend.type;
}p.type=t||"other";
if(!t){return;
}var v=function(){};
if(q.extend){v.prototype=new q.extend.$$clazz;
}var u=v.prototype;
var s=q[t];
for(var r in s){u[r]=s[r];
if(u[r].base){{};
u[r].base=q.extend;
}}p.$$clazz=v;
p[t]=new v;
},$$registry:{},__H:["colors","borders","decorations","fonts","icons","widgets","appearances","meta"],__I:null,__J:null,__K:function(){},patch:function(F,G){var I=this.__F(G);

if(I!==this.__F(F)){throw new Error("The mixins '"+F.name+"' are not compatible '"+G.name+"'!");
}var H=G[I];
var J=F.$$clazz.prototype;

for(var K in H){J[K]=H[K];
}},include:function(w,x){var z=x.type;

if(z!==w.type){throw new Error("The mixins '"+w.name+"' are not compatible '"+x.name+"'!");
}var y=x[z];
var A=w.$$clazz.prototype;

for(var B in y){if(A[B]!==undefined){continue;
}A[B]=y[B];
}}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var a="myaccount.theme.Color";
qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var cr=';',cq='computed=this.',cp='=value;',co='this.',cn='if(this.',cm='!==undefined)',cl='delete this.',ck="set",cj="setThemed",ci='}',bW="init",bV="setRuntime",bU='else if(this.',bT='return this.',bS="string",bR="boolean",bQ="resetThemed",bP='!==undefined){',bO='=true;',bN="resetRuntime",cy="reset",cz="refresh",cw='old=this.',cx='else ',cu='if(old===undefined)old=this.',cv='old=computed=this.',cs=' of an instance of ',ct=";",cA='if(old===computed)return value;',cB='if(old===undefined)old=null;',cb='(value);',ca=' is not (yet) ready!");',cd='===value)return value;',cc='return init;',cf='var init=this.',ce="Error in property ",ch='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',cg='.validate.call(this, value);',bY='else{',bX=" in method ",ba='=computed;',bb='(backup);',bc='if(computed===inherit){',bd="inherit",be='if(value===undefined)prop.error(this,2,"',bf='var computed, old=this.',bg='else if(computed===undefined)',bh="': ",bi=" of class ",bj='===undefined)return;',cF="')){",cE='else this.',cD='value=this.',cC='","',cJ='if(init==qx.core.Property.$$inherit)init=null;',cI='var inherit=prop.$$inherit;',cH='var computed, old;',cG='computed=undefined;delete this.',cL='",value);',cK='computed=value;',by=';}',bz='){',bw='if(computed===undefined||computed===inherit){',bx='!==inherit){',bC='(computed, old, "',bD='return value;',bA='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bB="if(reg.hasListener(this, '",bu=')a[i].',bv='.$$properties.',br="var reg=qx.event.Registration;",bq='return null;',bt='");',bs='var pa=this.getLayoutParent();if(pa)computed=pa.',bn='!==undefined&&',bm="', qx.event.type.Data, [computed, old]",bp='var backup=computed;',bo='}else{',bl="object",bk='if(computed===undefined)computed=null;',bI='if(a[i].',bJ='throw new Error("Property ',bK=")}",bL='var prop=qx.core.Property;',bE=" with incoming value '",bF='if(computed===undefined||computed==inherit)computed=null;',bG='if((computed===undefined||computed===inherit)&&',bH="reg.fireEvent(this, '",bM="qx.core.Property";
qx.Class.define(bM,{statics:{__L:{"Boolean":'qx.core.Assert.assertBoolean(value, msg) || true',"String":'qx.core.Assert.assertString(value, msg) || true',"Number":'qx.core.Assert.assertNumber(value, msg) || true',"Integer":'qx.core.Assert.assertInteger(value, msg) || true',"PositiveNumber":'qx.core.Assert.assertPositiveNumber(value, msg) || true',"PositiveInteger":'qx.core.Assert.assertPositiveInteger(value, msg) || true',"Error":'qx.core.Assert.assertInstance(value, Error, msg) || true',"RegExp":'qx.core.Assert.assertInstance(value, RegExp, msg) || true',"Object":'qx.core.Assert.assertObject(value, msg) || true',"Array":'qx.core.Assert.assertArray(value, msg) || true',"Map":'qx.core.Assert.assertMap(value, msg) || true',"Function":'qx.core.Assert.assertFunction(value, msg) || true',"Date":'qx.core.Assert.assertInstance(value, Date, msg) || true',"Node":'value !== null && value.nodeType !== undefined',"Element":'value !== null && value.nodeType === 1 && value.attributes',"Document":'value !== null && value.nodeType === 9 && value.documentElement',"Window":'value !== null && value.document',"Event":'value !== null && value.type !== undefined',"Class":'value !== null && value.$$type === "Class"',"Mixin":'value !== null && value.$$type === "Mixin"',"Interface":'value !== null && value.$$type === "Interface"',"Theme":'value !== null && value.$$type === "Theme"',"Color":'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',"Decorator":'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)'},__M:{"Object":true,"Array":true,"Map":true,"Function":true,"Date":true,"Node":true,"Element":true,"Document":true,"Window":true,"Event":true,"Class":true,"Mixin":true,"Interface":true,"Theme":true,"Font":true,"Decorator":true},$$inherit:bd,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bS,dispose:bR,inheritable:bR,nullable:bR,themeable:bR,refine:bR,init:null,apply:bS,event:bS,check:null,transform:bS,deferredInit:bR,validate:null},$$allowedGroupKeys:{name:bS,group:bl,mode:bS,themeable:bR},$$inheritable:{},refresh:function(b){var parent=b.getLayoutParent();

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
}}},attach:function(db){var dc=db.$$properties;

if(dc){for(var name in dc){this.attachMethods(db,name,dc[name]);
}}db.$$propertiesAttached=true;
},attachMethods:function(L,name,M){M.group?this.__N(L,M,name):this.__O(L,M,name);
},__N:function(z,A,name){var H=qx.lang.String.firstUp(name);
var G=z.prototype;
var I=A.themeable===true;
{};
var J=[];
var D=[];

if(I){var B=[];
var F=[];
}var E="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
J.push(E);

if(I){B.push(E);
}
if(A.mode=="shorthand"){var C="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
J.push(C);

if(I){B.push(C);
}}
for(var i=0,a=A.group,l=a.length;i<l;i++){{};
J.push("this.",this.$$method.set[a[i]],"(a[",i,"]);");
D.push("this.",this.$$method.reset[a[i]],"();");

if(I){{};
B.push("this.",this.$$method.setThemed[a[i]],"(a[",i,"]);");
F.push("this.",this.$$method.resetThemed[a[i]],"();");
}}this.$$method.set[name]="set"+H;
G[this.$$method.set[name]]=new Function(J.join(""));
this.$$method.reset[name]="reset"+H;
G[this.$$method.reset[name]]=new Function(D.join(""));

if(I){this.$$method.setThemed[name]="setThemed"+H;
G[this.$$method.setThemed[name]]=new Function(B.join(""));
this.$$method.resetThemed[name]="resetThemed"+H;
G[this.$$method.resetThemed[name]]=new Function(F.join(""));
}},__O:function(cN,cO,name){var cQ=qx.lang.String.firstUp(name);
var cS=cN.prototype;
{};
if(cO.dispose===undefined&&typeof cO.check==="string"){cO.dispose=this.__M[cO.check]||qx.Class.isDefined(cO.check)||qx.Interface.isDefined(cO.check);
}var cR=this.$$method;
var cP=this.$$store;
cP.runtime[name]="$$runtime_"+name;
cP.user[name]="$$user_"+name;
cP.theme[name]="$$theme_"+name;
cP.init[name]="$$init_"+name;
cP.inherit[name]="$$inherit_"+name;
cP.useinit[name]="$$useinit_"+name;
cR.get[name]="get"+cQ;
cS[cR.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cN,name,"get");
};
cR.set[name]="set"+cQ;
cS[cR.set[name]]=function(cM){return qx.core.Property.executeOptimizedSetter(this,cN,name,"set",arguments);
};
cR.reset[name]="reset"+cQ;
cS[cR.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cN,name,"reset");
};

if(cO.inheritable||cO.apply||cO.event||cO.deferredInit){cR.init[name]="init"+cQ;
cS[cR.init[name]]=function(y){return qx.core.Property.executeOptimizedSetter(this,cN,name,"init",arguments);
};
}
if(cO.inheritable){cR.refresh[name]="refresh"+cQ;
cS[cR.refresh[name]]=function(da){return qx.core.Property.executeOptimizedSetter(this,cN,name,"refresh",arguments);
};
}cR.setRuntime[name]="setRuntime"+cQ;
cS[cR.setRuntime[name]]=function(K){return qx.core.Property.executeOptimizedSetter(this,cN,name,"setRuntime",arguments);
};
cR.resetRuntime[name]="resetRuntime"+cQ;
cS[cR.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cN,name,"resetRuntime");
};

if(cO.themeable){cR.setThemed[name]="setThemed"+cQ;
cS[cR.setThemed[name]]=function(N){return qx.core.Property.executeOptimizedSetter(this,cN,name,"setThemed",arguments);
};
cR.resetThemed[name]="resetThemed"+cQ;
cS[cR.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cN,name,"resetThemed");
};
}
if(cO.check==="Boolean"){cS["toggle"+cQ]=new Function("return this."+cR.set[name]+"(!this."+cR.get[name]+"())");
cS["is"+cQ]=new Function("return this."+cR.get[name]+"()");
}},__P:{0:'Could not change or apply init value after constructing phase!',1:'Requires exactly one argument!',2:'Undefined value is not allowed!',3:'Does not allow any arguments!',4:'Null value is not allowed!',5:'Is invalid!'},error:function(r,s,t,u,v){var w=r.constructor.classname;
var x=ce+t+bi+w+bX+this.$$method[u][t]+bE+v+bh;
throw new Error(x+(this.__P[s]||"Unknown reason: "+s));
},__Q:function(cT,cU,name,cV,cW,cX){var cY=this.$$method[cV][name];
{cU[cY]=new Function("value",cW.join(""));
};
if(qx.core.Variant.isSet("qx.aspects","on")){cU[cY]=qx.core.Aspect.wrap(cT.classname+"."+cY,cU[cY],"property");
}qx.Bootstrap.setDisplayName(cU[cY],cT.classname+".prototype",cY);
if(cX===undefined){return cT[cY]();
}else{return cT[cY](cX[0]);
}},executeOptimizedGetter:function(j,k,name,m){var o=k.$$properties[name];
var q=k.prototype;
var n=[];
var p=this.$$store;
n.push(cn,p.runtime[name],cm);
n.push(bT,p.runtime[name],cr);

if(o.inheritable){n.push(bU,p.inherit[name],cm);
n.push(bT,p.inherit[name],cr);
n.push(cx);
}n.push(cn,p.user[name],cm);
n.push(bT,p.user[name],cr);

if(o.themeable){n.push(bU,p.theme[name],cm);
n.push(bT,p.theme[name],cr);
}
if(o.deferredInit&&o.init===undefined){n.push(bU,p.init[name],cm);
n.push(bT,p.init[name],cr);
}n.push(cx);

if(o.init!==undefined){if(o.inheritable){n.push(cf,p.init[name],cr);

if(o.nullable){n.push(cJ);
}else if(o.init!==undefined){n.push(bT,p.init[name],cr);
}else{n.push(bA,name,cs,k.classname,ca);
}n.push(cc);
}else{n.push(bT,p.init[name],cr);
}}else if(o.inheritable||o.nullable){n.push(bq);
}else{n.push(bJ,name,cs,k.classname,ca);
}return this.__Q(j,q,name,m,n);
},executeOptimizedSetter:function(O,P,name,Q,R){var X=P.$$properties[name];
var W=P.prototype;
var T=[];
var S=Q===ck||Q===cj||Q===bV||(Q===bW&&X.init===undefined);
var U=Q===cy||Q===bQ||Q===bN;
var V=X.apply||X.event||X.inheritable;

if(Q===bV||Q===bN){var Y=this.$$store.runtime[name];
}else if(Q===cj||Q===bQ){var Y=this.$$store.theme[name];
}else if(Q===bW){var Y=this.$$store.init[name];
}else{var Y=this.$$store.user[name];
}{if(!X.nullable||X.check||X.inheritable){T.push(bL);
}if(Q===ck){T.push(be,name,cC,Q,cL);
}};
if(S){if(X.transform){T.push(cD,X.transform,cb);
}if(X.validate){if(typeof X.validate===bS){T.push(co,X.validate,cb);
}else if(X.validate instanceof Function){T.push(P.classname,bv,name);
T.push(cg);
}}}if(V){if(S){T.push(cn,Y,cd);
}else if(U){T.push(cn,Y,bj);
}}if(X.inheritable){T.push(cI);
}{};

if(!V){if(Q===bV){T.push(co,this.$$store.runtime[name],cp);
}else if(Q===bN){T.push(cn,this.$$store.runtime[name],cm);
T.push(cl,this.$$store.runtime[name],cr);
}else if(Q===ck){T.push(co,this.$$store.user[name],cp);
}else if(Q===cy){T.push(cn,this.$$store.user[name],cm);
T.push(cl,this.$$store.user[name],cr);
}else if(Q===cj){T.push(co,this.$$store.theme[name],cp);
}else if(Q===bQ){T.push(cn,this.$$store.theme[name],cm);
T.push(cl,this.$$store.theme[name],cr);
}else if(Q===bW&&S){T.push(co,this.$$store.init[name],cp);
}}else{if(X.inheritable){T.push(bf,this.$$store.inherit[name],cr);
}else{T.push(cH);
}T.push(cn,this.$$store.runtime[name],bP);

if(Q===bV){T.push(cq,this.$$store.runtime[name],cp);
}else if(Q===bN){T.push(cl,this.$$store.runtime[name],cr);
T.push(cn,this.$$store.user[name],cm);
T.push(cq,this.$$store.user[name],cr);
T.push(bU,this.$$store.theme[name],cm);
T.push(cq,this.$$store.theme[name],cr);
T.push(bU,this.$$store.init[name],bP);
T.push(cq,this.$$store.init[name],cr);
T.push(co,this.$$store.useinit[name],bO);
T.push(ci);
}else{T.push(cv,this.$$store.runtime[name],cr);
if(Q===ck){T.push(co,this.$$store.user[name],cp);
}else if(Q===cy){T.push(cl,this.$$store.user[name],cr);
}else if(Q===cj){T.push(co,this.$$store.theme[name],cp);
}else if(Q===bQ){T.push(cl,this.$$store.theme[name],cr);
}else if(Q===bW&&S){T.push(co,this.$$store.init[name],cp);
}}T.push(ci);
T.push(bU,this.$$store.user[name],bP);

if(Q===ck){if(!X.inheritable){T.push(cw,this.$$store.user[name],cr);
}T.push(cq,this.$$store.user[name],cp);
}else if(Q===cy){if(!X.inheritable){T.push(cw,this.$$store.user[name],cr);
}T.push(cl,this.$$store.user[name],cr);
T.push(cn,this.$$store.runtime[name],cm);
T.push(cq,this.$$store.runtime[name],cr);
T.push(cn,this.$$store.theme[name],cm);
T.push(cq,this.$$store.theme[name],cr);
T.push(bU,this.$$store.init[name],bP);
T.push(cq,this.$$store.init[name],cr);
T.push(co,this.$$store.useinit[name],bO);
T.push(ci);
}else{if(Q===bV){T.push(cq,this.$$store.runtime[name],cp);
}else if(X.inheritable){T.push(cq,this.$$store.user[name],cr);
}else{T.push(cv,this.$$store.user[name],cr);
}if(Q===cj){T.push(co,this.$$store.theme[name],cp);
}else if(Q===bQ){T.push(cl,this.$$store.theme[name],cr);
}else if(Q===bW&&S){T.push(co,this.$$store.init[name],cp);
}}T.push(ci);
if(X.themeable){T.push(bU,this.$$store.theme[name],bP);

if(!X.inheritable){T.push(cw,this.$$store.theme[name],cr);
}
if(Q===bV){T.push(cq,this.$$store.runtime[name],cp);
}else if(Q===ck){T.push(cq,this.$$store.user[name],cp);
}else if(Q===cj){T.push(cq,this.$$store.theme[name],cp);
}else if(Q===bQ){T.push(cl,this.$$store.theme[name],cr);
T.push(cn,this.$$store.init[name],bP);
T.push(cq,this.$$store.init[name],cr);
T.push(co,this.$$store.useinit[name],bO);
T.push(ci);
}else if(Q===bW){if(S){T.push(co,this.$$store.init[name],cp);
}T.push(cq,this.$$store.theme[name],cr);
}else if(Q===cz){T.push(cq,this.$$store.theme[name],cr);
}T.push(ci);
}T.push(bU,this.$$store.useinit[name],bz);

if(!X.inheritable){T.push(cw,this.$$store.init[name],cr);
}
if(Q===bW){if(S){T.push(cq,this.$$store.init[name],cp);
}else{T.push(cq,this.$$store.init[name],cr);
}}else if(Q===ck||Q===bV||Q===cj||Q===cz){T.push(cl,this.$$store.useinit[name],cr);

if(Q===bV){T.push(cq,this.$$store.runtime[name],cp);
}else if(Q===ck){T.push(cq,this.$$store.user[name],cp);
}else if(Q===cj){T.push(cq,this.$$store.theme[name],cp);
}else if(Q===cz){T.push(cq,this.$$store.init[name],cr);
}}T.push(ci);
if(Q===ck||Q===bV||Q===cj||Q===bW){T.push(bY);

if(Q===bV){T.push(cq,this.$$store.runtime[name],cp);
}else if(Q===ck){T.push(cq,this.$$store.user[name],cp);
}else if(Q===cj){T.push(cq,this.$$store.theme[name],cp);
}else if(Q===bW){if(S){T.push(cq,this.$$store.init[name],cp);
}else{T.push(cq,this.$$store.init[name],cr);
}T.push(co,this.$$store.useinit[name],bO);
}T.push(ci);
}}
if(X.inheritable){T.push(bw);

if(Q===cz){T.push(cK);
}else{T.push(bs,this.$$store.inherit[name],cr);
}T.push(bG);
T.push(co,this.$$store.init[name],bn);
T.push(co,this.$$store.init[name],bx);
T.push(cq,this.$$store.init[name],cr);
T.push(co,this.$$store.useinit[name],bO);
T.push(bo);
T.push(cl,this.$$store.useinit[name],by);
T.push(ci);
T.push(cA);
T.push(bc);
T.push(cG,this.$$store.inherit[name],cr);
T.push(ci);
T.push(bg);
T.push(cl,this.$$store.inherit[name],cr);
T.push(cE,this.$$store.inherit[name],ba);
T.push(bp);
if(X.init!==undefined&&Q!==bW){T.push(cu,this.$$store.init[name],ct);
}else{T.push(cB);
}T.push(bF);
}else if(V){if(Q!==ck&&Q!==bV&&Q!==cj){T.push(bk);
}T.push(cA);
if(X.init!==undefined&&Q!==bW){T.push(cu,this.$$store.init[name],ct);
}else{T.push(cB);
}}if(V){if(X.apply){T.push(co,X.apply,bC,name,bt);
}if(X.event){T.push(br,bB,X.event,cF,bH,X.event,bm,bK);
}if(X.inheritable&&W._getChildren){T.push(ch);
T.push(bI,this.$$method.refresh[name],bu,this.$$method.refresh[name],bb);
T.push(ci);
}}if(S){T.push(bD);
}return this.__Q(O,W,name,Q,T,R);
}},settings:{"qx.propertyDebugLevel":0}});
})();
(function(){var p="$$hash",o="qx.core.ObjectRegistry";
qx.Bootstrap.define(o,{statics:{inShutDown:false,__R:{},__S:0,__T:[],register:function(w){var z=this.__R;

if(!z){return;
}var y=w.$$hash;

if(y==null){var x=this.__T;

if(x.length>0){y=x.pop();
}else{y=(this.__S++).toString(36);
}w.$$hash=y;
}{};
z[y]=w;
},unregister:function(s){var t=s.$$hash;

if(t==null){return;
}var u=this.__R;

if(u&&u[t]){delete u[t];
this.__T.push(t);
}try{delete s.$$hash;
}catch(q){if(s.removeAttribute){s.removeAttribute(p);
}}},toHashCode:function(k){{};
var n=k.$$hash;

if(n!=null){return n;
}var m=this.__T;

if(m.length>0){n=m.pop();
}else{n=(this.__S++).toString(36);
}return k.$$hash=n;
},clearHashCode:function(g){{};
var h=g.$$hash;

if(h!=null){this.__T.push(h);
try{delete g.$$hash;
}catch(j){if(g.removeAttribute){g.removeAttribute(p);
}}}},fromHashCode:function(v){return this.__R[v]||null;
},shutdown:function(){this.inShutDown=true;
var d=this.__R;
var f=[];

for(var e in d){f.push(e);
}f.sort(function(a,b){return parseInt(b,36)-parseInt(a,36);
});
var c,i=0,l=f.length;

while(true){try{for(;i<l;i++){e=f[i];
c=d[e];

if(c&&c.dispose){c.dispose();
}}}catch(r){qx.log.Logger.error(this,"Could not dispose object "+c.toString()+": "+r);

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
},isCompatible:function(w,x){var y=qx.Class.getMixins(x);
y.push(w);
return qx.Mixin.checkCompatibility(y);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(m){if(!m){return [];
}var n=m.concat();

for(var i=0,l=m.length;i<l;i++){if(m[i].$$includes){n.push.apply(n,this.flatten(m[i].$$includes));
}}return n;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__U:null,__V:function(){}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var u="qx.client",t="on",s="mousedown",r="qx.bom.Event",q="mouseover",p="HTMLEvents";
qx.Bootstrap.define(r,{statics:{addNativeListener:qx.core.Variant.select(u,{"mshtml":function(a,b,c){a.attachEvent(t+b,c);
},"default":function(l,m,n){l.addEventListener(m,n,false);
}}),removeNativeListener:qx.core.Variant.select(u,{"mshtml":function(f,g,h){f.detachEvent(t+g,h);
},"default":function(i,j,k){i.removeEventListener(j,k,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(u,{"mshtml":function(e){if(e.type===q){return e.fromEvent;
}else{return e.toElement;
}},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(u,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==s&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(d){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(o){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(v,w){if(document.createEventObject){var x=document.createEventObject();
return v.fireEvent(t+w,x);
}else{var x=document.createEvent(p);
x.initEvent(w,true,true);
return !v.dispatchEvent(x);
}}}});
})();
(function(){var cg="|bubble",cf="|capture",ce="|",cd="_",cc="unload",cb="UNKNOWN_",ca="DOM_",bY="__Y",bX="c",bW="__ba",bT="WIN_",bV="capture",bU="qx.event.Manager",bS="QX_";
qx.Bootstrap.define(bU,{construct:function(bE){this.__W=bE;
if(bE.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(bE,cc,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(bE,cc,arguments.callee);
self.dispose();
}));
}this.__X={};
this.__Y={};
this.__ba={};
this.__bb={};
},statics:{__bc:0,getNextUniqueId:function(){return (this.__bc++).toString(36);
}},members:{__X:null,__ba:null,__bd:null,__Y:null,__bb:null,__W:null,getWindow:function(){return this.__W;
},getHandler:function(ch){var ci=this.__Y[ch.classname];

if(ci){return ci;
}return this.__Y[ch.classname]=new ch(this);
},getDispatcher:function(a){var b=this.__ba[a.classname];

if(b){return b;
}return this.__ba[a.classname]=new a(this);
},getListeners:function(q,r,s){var t=q.$$hash||qx.core.ObjectRegistry.toHashCode(q);
var v=this.__X[t];

if(!v){return null;
}var w=r+(s?cf:cg);
var u=v[w];
return u?u.concat():null;
},serializeListeners:function(x){var E=x.$$hash||qx.core.ObjectRegistry.toHashCode(x);
var G=this.__X[E];
var C=[];

if(G){var A,F,y,B,D;

for(var z in G){A=z.indexOf(ce);
F=z.substring(0,A);
y=z.charAt(A+1)==bX;
B=G[z];

for(var i=0,l=B.length;i<l;i++){D=B[i];
C.push({self:D.context,handler:D.handler,type:F,capture:y});
}}}return C;
},toggleAttachedEvents:function(S,T){var Y=S.$$hash||qx.core.ObjectRegistry.toHashCode(S);
var bb=this.__X[Y];

if(bb){var V,ba,U,W;

for(var X in bb){V=X.indexOf(ce);
ba=X.substring(0,V);
U=X.charCodeAt(V+1)===99;
W=bb[X];

if(T){this.__be(S,ba,U);
}else{this.__bf(S,ba,U);
}}}},hasListener:function(bq,br,bs){{};
var bt=bq.$$hash||qx.core.ObjectRegistry.toHashCode(bq);
var bv=this.__X[bt];

if(!bv){return false;
}var bw=br+(bs?cf:cg);
var bu=bv[bw];
return bu&&bu.length>0;
},importListeners:function(cu,cv){{};
var cB=cu.$$hash||qx.core.ObjectRegistry.toHashCode(cu);
var cC=this.__X[cB]={};
var cy=qx.event.Manager;

for(var cw in cv){var cz=cv[cw];
var cA=cz.type+(cz.capture?cf:cg);
var cx=cC[cA];

if(!cx){cx=cC[cA]=[];
this.__be(cu,cz.type,cz.capture);
}cx.push({handler:cz.listener,context:cz.self,unique:cz.unique||(cy.__bc++).toString(36)});
}},addListener:function(cj,ck,cl,self,cm){var cq;
{};
var cr=cj.$$hash||qx.core.ObjectRegistry.toHashCode(cj);
var ct=this.__X[cr];

if(!ct){ct=this.__X[cr]={};
}var cp=ck+(cm?cf:cg);
var co=ct[cp];

if(!co){co=ct[cp]=[];
}if(co.length===0){this.__be(cj,ck,cm);
}var cs=(qx.event.Manager.__bc++).toString(36);
var cn={handler:cl,context:self,unique:cs};
co.push(cn);
return cp+ce+cs;
},findHandler:function(bF,bG){var bQ=false,bJ=false,bR=false;
var bP;

if(bF.nodeType===1){bQ=true;
bP=ca+bF.tagName.toLowerCase()+cd+bG;
}else if(bF==this.__W){bJ=true;
bP=bT+bG;
}else if(bF.classname){bR=true;
bP=bS+bF.classname+cd+bG;
}else{bP=cb+bF+cd+bG;
}var bL=this.__bb;

if(bL[bP]){return bL[bP];
}var bO=qx.event.Registration.getHandlers();
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
},__be:function(H,I,J){var K=this.findHandler(H,I);

if(K){K.registerEvent(H,I,J);
return;
}{};
},removeListener:function(bc,bd,be,self,bf){var bj;
{};
var bk=bc.$$hash||qx.core.ObjectRegistry.toHashCode(bc);
var bl=this.__X[bk];

if(!bl){return false;
}var bg=bd+(bf?cf:cg);
var bh=bl[bg];

if(!bh){return false;
}var bi;

for(var i=0,l=bh.length;i<l;i++){bi=bh[i];

if(bi.handler===be&&bi.context===self){qx.lang.Array.removeAt(bh,i);

if(bh.length==0){this.__bf(bc,bd,bf);
}return true;
}}return false;
},removeListenerById:function(c,d){var k;
{};
var h=d.split(ce);
var o=h[0];
var e=h[1].charCodeAt(0)==99;
var n=h[2];
var m=c.$$hash||qx.core.ObjectRegistry.toHashCode(c);
var p=this.__X[m];

if(!p){return false;
}var j=o+(e?cf:cg);
var g=p[j];

if(!g){return false;
}var f;

for(var i=0,l=g.length;i<l;i++){f=g[i];

if(f.unique===n){qx.lang.Array.removeAt(g,i);

if(g.length==0){this.__bf(c,o,e);
}return true;
}}return false;
},removeAllListeners:function(L){var P=L.$$hash||qx.core.ObjectRegistry.toHashCode(L);
var R=this.__X[P];

if(!R){return false;
}var N,Q,M;

for(var O in R){if(R[O].length>0){N=O.split(ce);
Q=N[0];
M=N[1]===bV;
this.__bf(L,Q,M);
}}delete this.__X[P];
return true;
},__bf:function(bm,bn,bo){var bp=this.findHandler(bm,bn);

if(bp){bp.unregisterEvent(bm,bn,bo);
return;
}{};
},dispatchEvent:function(bx,event){var bC;
{};
var bD=event.getType();

if(!event.getBubbles()&&!this.hasListener(bx,bD)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(bx);
}var bB=qx.event.Registration.getDispatchers();
var bA;
var bz=false;

for(var i=0,l=bB.length;i<l;i++){bA=this.getDispatcher(bB[i]);
if(bA.canDispatchEvent(bx,event,bD)){bA.dispatchEvent(bx,event,bD);
bz=true;
break;
}}
if(!bz){qx.log.Logger.error(this,"No dispatcher can handle event of type "+bD+" on "+bx);
return true;
}var by=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !by;
},dispose:function(){qx.event.Registration.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,bY);
qx.util.DisposeUtil.disposeMap(this,bW);
this.__X=this.__W=this.__bd=this.__bb=null;
}}});
})();
(function(){var e="qx.dom.Node",d="qx.client",c="";
qx.Class.define(e,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(j){return j.nodeType===
this.DOCUMENT?j:
j.ownerDocument||j.document;
},getWindow:qx.core.Variant.select(d,{"mshtml":function(h){if(h.nodeType==null){return h;
}if(h.nodeType!==this.DOCUMENT){h=h.ownerDocument;
}return h.parentWindow;
},"default":function(b){if(b.nodeType==null){return b;
}if(b.nodeType!==this.DOCUMENT){b=b.ownerDocument;
}return b.defaultView;
}}),getDocumentElement:function(o){return this.getDocument(o).documentElement;
},getBodyElement:function(g){return this.getDocument(g).body;
},isNode:function(p){return !!(p&&p.nodeType!=null);
},isElement:function(k){return !!(k&&k.nodeType===this.ELEMENT);
},isDocument:function(f){return !!(f&&f.nodeType===this.DOCUMENT);
},isText:function(q){return !!(q&&q.nodeType===this.TEXT);
},isWindow:function(l){return !!(l&&l.history&&l.location&&l.document);
},getText:function(m){if(!m||!m.nodeType){return null;
}
switch(m.nodeType){case 1:var i,a=[],n=m.childNodes,length=n.length;

for(i=0;i<length;i++){a[i]=this.getText(n[i]);
}return a.join(c);
case 2:return m.nodeValue;
break;
case 3:return m.nodeValue;
break;
}return null;
}}});
})();
(function(){var q="mshtml",p="qx.client",o="[object Array]",n="qx.lang.Array",m="Use qx.lang.Type.isArray() instead!",k="qx",j="number",h="Use the native Array access instead: arr[arr.length - 1]",g="Use the native Array access instead: arr[0]",f="string",e="Use 'clone()' instead!";
qx.Bootstrap.define(n,{statics:{isArray:function(a){qx.log.Logger.deprecatedMethodWarning(arguments.callee,m);
return qx.lang.Type.isArray(a);
},toArray:function(bv,bw){return this.cast(bv,Array,bw);
},cast:function(C,D,E){if(C.constructor===D){return C;
}
if(qx.Class.hasInterface(C,qx.data.IListData)){var C=C.toArray();
}var F=new D;
if(qx.core.Variant.isSet(p,q)){if(C.item){for(var i=E||0,l=C.length;i<l;i++){F.push(C[i]);
}return F;
}}if(Object.prototype.toString.call(C)===o&&E==null){F.push.apply(F,C);
}else{F.push.apply(F,Array.prototype.slice.call(C,E||0));
}return F;
},fromArguments:function(bt,bu){return Array.prototype.slice.call(bt,bu||0);
},fromCollection:function(br){if(qx.core.Variant.isSet(p,q)){if(br.item){var bs=[];

for(var i=0,l=br.length;i<l;i++){bs[i]=br[i];
}return bs;
}}return Array.prototype.slice.call(br,0);
},fromShortHand:function(y){var A=y.length;
var z=qx.lang.Array.clone(y);
switch(A){case 1:z[1]=z[2]=z[3]=z[0];
break;
case 2:z[2]=z[0];
case 3:z[3]=z[1];
}return z;
},copy:function(bf){qx.log.Logger.deprecatedMethodWarning(arguments.callee,e);
return qx.lang.Array.clone(bf);
},clone:function(x){return x.concat();
},getLast:function(by){qx.log.Logger.deprecatedMethodWarning(arguments.callee,h);
return by[by.length-1];
},getFirst:function(s){qx.log.Logger.deprecatedMethodWarning(arguments.callee,g);
return s[0];
},insertAt:function(bj,bk,i){bj.splice(i,0,bk);
return bj;
},insertBefore:function(b,c,d){var i=b.indexOf(d);

if(i==-1){b.push(c);
}else{b.splice(i,0,c);
}return b;
},insertAfter:function(bl,bm,bn){var i=bl.indexOf(bn);

if(i==-1||i==(bl.length-1)){bl.push(bm);
}else{bl.splice(i+1,0,bm);
}return bl;
},removeAt:function(B,i){return B.splice(i,1)[0];
},removeAll:function(r){r.length=0;
return this;
},append:function(V,W){{};
Array.prototype.push.apply(V,W);
return V;
},exclude:function(t,u){{};

for(var i=0,w=u.length,v;i<w;i++){v=t.indexOf(u[i]);

if(v!=-1){t.splice(v,1);
}}return t;
},remove:function(bp,bq){var i=bp.indexOf(bq);

if(i!=-1){bp.splice(i,1);
return bq;
}},contains:function(G,H){return G.indexOf(H)!==-1;
},equals:function(bd,be){var length=bd.length;

if(length!==be.length){return false;
}
for(var i=0;i<length;i++){if(bd[i]!==be[i]){return false;
}}return true;
},sum:function(bb){var bc=0;

for(var i=0,l=bb.length;i<l;i++){bc+=bb[i];
}return bc;
},max:function(bg){{};
var i,bi=bg.length,bh=bg[0];

for(i=1;i<bi;i++){if(bg[i]>bh){bh=bg[i];
}}return bh===undefined?null:bh;
},min:function(X){{};
var i,ba=X.length,Y=X[0];

for(i=1;i<ba;i++){if(X[i]<Y){Y=X[i];
}}return Y===undefined?null:Y;
},unique:function(I){var S=[],K={},N={},P={};
var O,J=0;
var T=k+qx.lang.Date.now();
var L=false,R=false,U=false;
for(var i=0,Q=I.length;i<Q;i++){O=I[i];
if(O===null){if(!L){L=true;
S.push(O);
}}else if(O===undefined){}else if(O===false){if(!R){R=true;
S.push(O);
}}else if(O===true){if(!U){U=true;
S.push(O);
}}else if(typeof O===f){if(!K[O]){K[O]=1;
S.push(O);
}}else if(typeof O===j){if(!N[O]){N[O]=1;
S.push(O);
}}else{M=O[T];

if(M==null){M=O[T]=J++;
}
if(!P[M]){P[M]=O;
S.push(O);
}}}for(var M in P){try{delete P[M][T];
}catch(bx){try{P[M][T]=null;
}catch(bo){throw new Error("Cannot clean-up map entry doneObjects["+M+"]["+T+"]");
}}}return S;
}}});
})();
(function(){var l="()",k=".",j=".prototype.",i="Use qx.lang.Type.isFunction() instead!",h='anonymous()',g="qx.lang.Function",f=".constructor()";
qx.Bootstrap.define(g,{statics:{isFunction:function(m){qx.log.Logger.deprecatedMethodWarning(arguments.callee,i);
return qx.lang.Type.isFunction(m);
},getCaller:function(n){return n.caller?n.caller.callee:n.callee.caller;
},getName:function(o){if(o.displayName){return o.displayName;
}
if(o.$$original||o.wrapper||o.classname){return o.classname+f;
}
if(o.$$mixin){for(var q in o.$$mixin.$$members){if(o.$$mixin.$$members[q]==o){return o.$$mixin.name+j+q+l;
}}for(var q in o.$$mixin){if(o.$$mixin[q]==o){return o.$$mixin.name+k+q+l;
}}}
if(o.self){var r=o.self.constructor;

if(r){for(var q in r.prototype){if(r.prototype[q]==o){return r.classname+j+q+l;
}}for(var q in r){if(r[q]==o){return r.classname+k+q+l;
}}}}var p=o.toString().match(/function\s*(\w*)\s*\(.*/);

if(p&&p.length>=1&&p[1]){return p[1]+l;
}return h;
},globalEval:function(J){if(window.execScript){return window.execScript(J);
}else{return eval.call(window,J);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(G,H){{};
if(!H){return G;
}if(!(H.self||H.args||H.delay!=null||H.periodical!=null||H.attempt)){return G;
}return function(event){{};
var b=qx.lang.Array.fromArguments(arguments);
if(H.args){b=H.args.concat(b);
}
if(H.delay||H.periodical){var a=qx.event.GlobalError.observeMethod(function(){return G.apply(H.self||this,b);
});

if(H.delay){return window.setTimeout(a,H.delay);
}
if(H.periodical){return window.setInterval(a,H.periodical);
}}else if(H.attempt){var c=false;

try{c=G.apply(H.self||this,b);
}catch(D){}return c;
}else{return G.apply(H.self||this,b);
}};
},bind:function(d,self,e){return this.create(d,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(y,z){return this.create(y,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(v,self,w){if(arguments.length<3){return function(event){return v.call(self||this,event||window.event);
};
}else{var x=qx.lang.Array.fromArguments(arguments,2);
return function(event){var I=[event||window.event];
I.push.apply(I,x);
v.apply(self||this,I);
};
}},attempt:function(E,self,F){return this.create(E,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(s,t,self,u){return this.create(s,{delay:t,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(A,B,self,C){return this.create(A,{periodical:B,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var F="qx.event.Registration";
qx.Bootstrap.define(F,{statics:{__bg:{},getManager:function(G){if(G==null){{};
G=window;
}else if(G.nodeType){G=qx.dom.Node.getWindow(G);
}else if(!qx.dom.Node.isWindow(G)){G=window;
}var I=G.$$hash||qx.core.ObjectRegistry.toHashCode(G);
var H=this.__bg[I];

if(!H){H=new qx.event.Manager(G);
this.__bg[I]=H;
}return H;
},removeManager:function(c){var d=qx.core.ObjectRegistry.toHashCode(c.getWindow());
delete this.__bg[d];
},addListener:function(B,C,D,self,E){return this.getManager(B).addListener(B,C,D,self,E);
},removeListener:function(x,y,z,self,A){return this.getManager(x).removeListener(x,y,z,self,A);
},removeListenerById:function(e,f){return this.getManager(e).removeListenerById(e,f);
},removeAllListeners:function(K){return this.getManager(K).removeAllListeners(K);
},hasListener:function(L,M,N){return this.getManager(L).hasListener(L,M,N);
},serializeListeners:function(q){return this.getManager(q).serializeListeners(q);
},createEvent:function(m,n,o){{};
if(n==null){n=qx.event.type.Event;
}var p=qx.event.Pool.getInstance().getObject(n);

if(!p){return;
}o?p.init.apply(p,o):p.init();
if(m){p.setType(m);
}return p;
},dispatchEvent:function(Q,event){return this.getManager(Q).dispatchEvent(Q,event);
},fireEvent:function(g,h,i,j){var k;
{};
var l=this.createEvent(h,i||null,j);
return this.getManager(g).dispatchEvent(g,l);
},fireNonBubblingEvent:function(r,s,t,u){{};
var v=this.getManager(r);

if(!v.hasListener(r,s,false)){return true;
}var w=this.createEvent(s,t||null,u);
return v.dispatchEvent(r,w);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bh:[],addHandler:function(J){{};
this.__bh.push(J);
this.__bh.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bh;
},__bi:[],addDispatcher:function(O,P){{};
this.__bi.push(O);
this.__bi.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__bi;
}}});
})();
(function(){var d="qx.log.appender.RingBuffer";
qx.Bootstrap.define(d,{construct:function(a){this.__bj=[];
this.setMaxMessages(a||50);
},members:{__bk:0,__bj:null,__bl:50,setMaxMessages:function(e){this.__bl=e;
this.clearHistory();
},getMaxMessages:function(){return this.__bl;
},process:function(b){var c=this.getMaxMessages();

if(this.__bj.length<c){this.__bj.push(b);
}else{this.__bj[this.__bk++]=b;

if(this.__bk>=c){this.__bk=0;
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
(function(){var k="node",j="error",h="...(+",g="array",f=")",e="info",d="instance",c="string",b="null",a="class",G="number",F="stringify",E="]",D="unknown",C="function",B="boolean",A="debug",z="map",y="undefined",x="qx.log.Logger",s=")}",t="#",q="warn",r="document",o="{...(",p="[",m="text[",n="[...(",u="\n",v=")]",w="object";
qx.Bootstrap.define(x,{statics:{__bm:A,setLevel:function(M){this.__bm=M;
},getLevel:function(){return this.__bm;
},setTreshold:function(V){this.__bp.setMaxMessages(V);
},getTreshold:function(){return this.__bp.getMaxMessages();
},__bn:{},__bo:0,register:function(bp){if(bp.$$id){return;
}var bq=this.__bo++;
this.__bn[bq]=bp;
bp.$$id=bq;
var br=this.__bp.getAllLogEvents();

for(var i=0,l=br.length;i<l;i++){bp.process(br[i]);
}},unregister:function(ba){var bb=ba.$$id;

if(bb==null){return;
}delete this.__bn[bb];
delete ba.$$id;
},debug:function(W,X){this.__br(A,arguments);
},info:function(H,I){this.__br(e,arguments);
},warn:function(bs,bt){this.__br(q,arguments);
},error:function(N,O){this.__br(j,arguments);
},trace:function(Y){this.__br(e,[Y,qx.dev.StackTrace.getStackTrace().join(u)]);
},deprecatedMethodWarning:function(P,Q){var R;
{};
},deprecatedClassWarning:function(bm,bn){var bo;
{};
},deprecatedEventWarning:function(J,event,K){var L;
{};
},deprecatedMixinWarning:function(S,T){var U;
{};
},clear:function(){this.__bp.clearHistory();
},__bp:new qx.log.appender.RingBuffer(50),__bq:{debug:0,info:1,warn:2,error:3},__br:function(bc,bd){var bi=this.__bq;

if(bi[bc]<bi[this.__bm]){return;
}var bf=bd.length<2?null:bd[0];
var bh=bf?1:0;
var be=[];

for(var i=bh,l=bd.length;i<l;i++){be.push(this.__bt(bd[i],true));
}var bj=new Date;
var bk={time:bj,offset:bj-qx.Bootstrap.LOADSTART,level:bc,items:be,win:window};
if(bf){if(bf instanceof qx.core.Object){bk.object=bf.$$hash;
}else if(bf.$$type){bk.clazz=bf;
}}this.__bp.process(bk);
var bl=this.__bn;

for(var bg in bl){bl[bg].process(bk);
}},__bs:function(bu){if(bu===undefined){return y;
}else if(bu===null){return b;
}
if(bu.$$type){return a;
}var bv=typeof bu;

if(bv===C||bv==c||bv===G||bv===B){return bv;
}else if(bv===w){if(bu.nodeType){return k;
}else if(bu.classname){return d;
}else if(bu instanceof Array){return g;
}else if(bu instanceof Error){return j;
}else{return z;
}}
if(bu.toString){return F;
}return D;
},__bt:function(bw,bx){var bE=this.__bs(bw);
var bA=D;
var bz=[];

switch(bE){case b:case y:bA=bE;
break;
case c:case G:case B:bA=bw;
break;
case k:if(bw.nodeType===9){bA=r;
}else if(bw.nodeType===3){bA=m+bw.nodeValue+E;
}else if(bw.nodeType===1){bA=bw.nodeName.toLowerCase();

if(bw.id){bA+=t+bw.id;
}}else{bA=k;
}break;
case C:bA=qx.lang.Function.getName(bw)||bE;
break;
case d:bA=bw.basename+p+bw.$$hash+E;
break;
case a:case F:bA=bw.toString();
break;
case j:bz=qx.dev.StackTrace.getStackTraceFromError(bw);
bA=bw.toString();
break;
case g:if(bx){bA=[];

for(var i=0,l=bw.length;i<l;i++){if(bA.length>20){bA.push(h+(l-i)+f);
break;
}bA.push(this.__bt(bw[i],false));
}}else{bA=n+bw.length+v;
}break;
case z:if(bx){var by;
var bD=[];

for(var bC in bw){bD.push(bC);
}bD.sort();
bA=[];

for(var i=0,l=bD.length;i<l;i++){if(bA.length>20){bA.push(h+(l-i)+f);
break;
}bC=bD[i];
by=this.__bt(bw[bC],false);
by.key=bC;
bA.push(by);
}}else{var bB=0;

for(var bC in bw){bB++;
}bA=o+bB+s;
}break;
}return {type:bE,text:bA,trace:bz};
}}});
})();
(function(){var br="set",bq="get",bp="reset",bo="__bv",bn="qx.core.Object",bm="]",bl="[",bk="$$user_",bj="Object";
qx.Class.define(bn,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:bj},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+bl+this.$$hash+bm;
},base:function(p,q){if(arguments.length===1){return p.callee.base.call(this);
}else{return p.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(N){return N.callee.self;
},clone:function(){var R=this.constructor;
var Q=new R;
var T=qx.Class.getProperties(R);
var S=qx.core.Property.$$store.user;
var U=qx.core.Property.$$method.set;
var name;
for(var i=0,l=T.length;i<l;i++){name=T[i];

if(this.hasOwnProperty(S[name])){Q[U[name]](this[S[name]]);
}}return Q;
},serialize:function(){var s=this.constructor;
var u=qx.Class.getProperties(s);
var v=qx.core.Property.$$store.user;
var name,r;
var t={classname:s.classname,properties:{}};
for(var i=0,l=u.length;i<l;i++){name=u[i];

if(this.hasOwnProperty(v[name])){r=this[v[name]];

if(r instanceof qx.core.Object){t.properties[name]={$$hash:r.$$hash};
}else{t.properties[name]=r;
}}}return t;
},set:function(a,b){var d=qx.core.Property.$$method.set;

if(qx.lang.Type.isString(a)){if(!this[d[a]]){if(this[br+qx.lang.String.firstUp(a)]!=undefined){this[br+qx.lang.String.firstUp(a)](b);
return;
}{};
}return this[d[a]](b);
}else{for(var c in a){if(!this[d[c]]){if(this[br+qx.lang.String.firstUp(c)]!=undefined){this[br+qx.lang.String.firstUp(c)](a[c]);
continue;
}{};
}this[d[c]](a[c]);
}return this;
}},get:function(bh){var bi=qx.core.Property.$$method.get;

if(!this[bi[bh]]){if(this[bq+qx.lang.String.firstUp(bh)]!=undefined){return this[bq+qx.lang.String.firstUp(bh)]();
}{};
}return this[bi[bh]]();
},reset:function(bv){var bw=qx.core.Property.$$method.reset;

if(!this[bw[bv]]){if(this[bp+qx.lang.String.firstUp(bv)]!=undefined){this[bp+qx.lang.String.firstUp(bv)]();
return;
}{};
}this[bw[bv]]();
},__bu:qx.event.Registration,addListener:function(m,n,self,o){if(!this.$$disposed){return this.__bu.addListener(this,m,n,self,o);
}return null;
},addListenerOnce:function(B,C,self,D){var E=function(e){C.call(self||this,e);
this.removeListener(B,E,this,D);
};
return this.addListener(B,E,this,D);
},removeListener:function(w,x,self,y){if(!this.$$disposed){return this.__bu.removeListener(this,w,x,self,y);
}return false;
},removeListenerById:function(bB){if(!this.$$disposed){return this.__bu.removeListenerById(this,bB);
}return false;
},hasListener:function(bz,bA){return this.__bu.hasListener(this,bz,bA);
},dispatchEvent:function(be){if(!this.$$disposed){return this.__bu.dispatchEvent(this,be);
}return true;
},fireEvent:function(K,L,M){if(!this.$$disposed){return this.__bu.fireEvent(this,K,L,M);
}return true;
},fireNonBubblingEvent:function(bD,bE,bF){if(!this.$$disposed){return this.__bu.fireNonBubblingEvent(this,bD,bE,bF);
}return true;
},fireDataEvent:function(G,H,I,J){if(!this.$$disposed){if(I===undefined){I=null;
}return this.__bu.fireNonBubblingEvent(this,G,qx.event.type.Data,[H,I,!!J]);
}return true;
},__bv:null,setUserData:function(z,A){if(!this.__bv){this.__bv={};
}this.__bv[z]=A;
},getUserData:function(bs){if(!this.__bv){return null;
}var bt=this.__bv[bs];
return bt===undefined?null:bt;
},__bw:qx.log.Logger,debug:function(bu){this.__bw.debug(this,bu);
},info:function(F){this.__bw.info(this,F);
},warn:function(P){this.__bw.warn(this,P);
},error:function(by){this.__bw.error(this,by);
},trace:function(){this.__bw.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var j,g;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var h=this.constructor;
var f;

while(h.superclass){if(h.$$destructor){h.$$destructor.call(this);
}if(h.$$includes){f=h.$$flatIncludes;

for(var i=0,l=f.length;i<l;i++){if(f[i].$$destructor){f[i].$$destructor.call(this);
}}}h=h.superclass;
}var k=qx.Class.getProperties(this.constructor);

for(var i=0,l=k.length;i<l;i++){delete this[bk+k[i]];
}{};
},_disposeFields:function(O){qx.util.DisposeUtil.disposeFields(this,arguments);
},_disposeObjects:function(bf){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeArray:function(bC){qx.util.DisposeUtil.disposeArray(this,bC);
},_disposeMap:function(bg){qx.util.DisposeUtil.disposeMap(this,bg);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bx){{};
},destruct:function(){qx.event.Registration.removeAllListeners(this);
qx.core.ObjectRegistry.unregister(this);
this._disposeFields(bo);
var X=this.constructor;
var bc;
var bd=qx.core.Property.$$store;
var ba=bd.user;
var bb=bd.theme;
var V=bd.inherit;
var Y=bd.useinit;
var W=bd.init;

while(X){bc=X.$$properties;

if(bc){for(var name in bc){if(bc[name].dispose){this[ba[name]]=this[bb[name]]=this[V[name]]=this[Y[name]]=this[W[name]]=undefined;
}}}X=X.superclass;
}}});
})();
(function(){var l="",k="g",j="0",h='\\$1',g="%",f='-',e="qx.lang.String",d=' ',c='\n',b="undefined";
qx.Bootstrap.define(e,{statics:{camelCase:function(p){return p.replace(/\-([a-z])/g,function(I,J){return J.toUpperCase();
});
},hyphenate:function(B){return B.replace(/[A-Z]/g,function(G){return (f+G.charAt(0).toLowerCase());
});
},capitalize:function(K){return K.replace(/\b[a-z]/g,function(m){return m.toUpperCase();
});
},clean:function(x){return this.trim(x.replace(/\s+/g,d));
},trimLeft:function(a){return a.replace(/^\s+/,l);
},trimRight:function(n){return n.replace(/\s+$/,l);
},trim:function(Q){return Q.replace(/^\s+|\s+$/g,l);
},startsWith:function(D,E){return D.indexOf(E)===0;
},endsWith:function(q,r){return q.substring(q.length-r.length,q.length)===r;
},pad:function(s,length,t){if(typeof t===b){t=j;
}var u=l;

for(var i=s.length;i<length;i++){u+=t;
}return u+s;
},firstUp:function(H){return H.charAt(0).toUpperCase()+H.substr(1);
},firstLow:function(C){return C.charAt(0).toLowerCase()+C.substr(1);
},contains:function(v,w){return v.indexOf(w)!=-1;
},format:function(y,z){var A=y;

for(var i=0;i<z.length;i++){A=A.replace(new RegExp(g+(i+1),k),z[i]);
}return A;
},escapeRegexpChars:function(P){return P.replace(/([.*+?^${}()|[\]\/\\])/g,h);
},toArray:function(F){return F.split(/\B|\b/g);
},stripTags:function(o){return o.replace(/<\/?[^>]+>/gi,l);
},stripScripts:function(L,M){var O=l;
var N=L.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){O+=arguments[1]+c;
return l;
});

if(M===true){qx.lang.Function.globalEval(O);
}return N;
}}});
})();
(function(){var k="function",j="Boolean",h="qx.Interface",g="]",f="toggle",e="Interface",d="is",c="[Interface ";
qx.Class.define(h,{statics:{define:function(name,p){if(p){if(p.extend&&!(p.extend instanceof Array)){p.extend=[p.extend];
}{};
var q=p.statics?p.statics:{};
if(p.extend){q.$$extends=p.extend;
}
if(p.properties){q.$$properties=p.properties;
}
if(p.members){q.$$members=p.members;
}
if(p.events){q.$$events=p.events;
}}else{var q={};
}q.$$type=e;
q.name=name;
q.toString=this.genericToString;
q.basename=qx.Bootstrap.createNamespace(name,q);
qx.Interface.$$registry[name]=q;
return q;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.lang.Object.getLength(this.$$registry);
},flatten:function(a){if(!a){return [];
}var b=a.concat();

for(var i=0,l=a.length;i<l;i++){if(a[i].$$extends){b.push.apply(b,this.flatten(a[i].$$extends));
}}return b;
},__bx:function(B,C,D,E){var I=D.$$members;

if(I){for(var H in I){if(qx.lang.Type.isFunction(I[H])){var G=this.__by(C,H);
var F=G||qx.lang.Type.isFunction(B[H]);

if(!F){throw new Error('Implementation of method "'+H+'" is missing in class "'+C.classname+'" required by interface "'+D.name+'"');
}var J=E===true&&!G&&!qx.Class.hasInterface(C,D);

if(J){B[H]=this.__bB(D,B[H],H,I[H]);
}}else{if(typeof B[H]===undefined){if(typeof B[H]!==k){throw new Error('Implementation of member "'+H+'" is missing in class "'+C.classname+'" required by interface "'+D.name+'"');
}}}}}},__by:function(v,w){var A=w.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!A){return false;
}var x=qx.lang.String.firstLow(A[2]);
var y=qx.Class.hasProperty(v,x);

if(!y){return false;
}var z=A[0]==d||A[0]==f;

if(z){return qx.Class.getPropertyDefinition(v,x).check==j;
}return true;
},__bz:function(m,n){if(n.$$properties){for(var o in n.$$properties){if(!qx.Class.hasProperty(m,o)){throw new Error('The property "'+o+'" is not supported by Class "'+m.classname+'"!');
}}}},__bA:function(K,L){if(L.$$events){for(var M in L.$$events){if(!qx.Class.supportsEvent(K,M)){throw new Error('The event "'+M+'" is not supported by Class "'+K.classname+'"!');
}}}},assertObject:function(r,s){var u=r.constructor;
this.__bx(r,u,s,false);
this.__bz(u,s);
this.__bA(u,s);
var t=s.$$extends;

if(t){for(var i=0,l=t.length;i<l;i++){this.assertObject(r,t[i]);
}}},assert:function(N,O,P){this.__bx(N.prototype,N,O,P);
this.__bz(N,O);
this.__bA(N,O);
var Q=O.$$extends;

if(Q){for(var i=0,l=Q.length;i<l;i++){this.assert(N,Q[i],P);
}}},genericToString:function(){return c+this.name+g;
},$$registry:{},__bB:function(){},__bC:null,__bD:function(){}}});
})();
(function(){var f="qx.ui.decoration.IDecorator";
qx.Interface.define(f,{members:{getMarkup:function(){},resize:function(c,d,e){},tint:function(a,b){},getInsets:function(){}}});
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
}}});
})();
(function(){var j="_applyBackground",i="repeat",h="backgroundPositionX",g="backgroundPositionY",f="no-repeat",e="scale",d="repeat-x",c="repeat-y",b="qx.ui.decoration.MBackgroundImage",a="String";
qx.Mixin.define(b,{properties:{backgroundImage:{check:a,nullable:true,apply:j},backgroundRepeat:{check:[i,d,c,f,e],init:i,apply:j},backgroundPositionX:{nullable:true,apply:j},backgroundPositionY:{nullable:true,apply:j},backgroundPosition:{group:[g,h]}},members:{_generateBackgroundMarkup:function(k){var l=qx.ui.decoration.Util.generateBackgroundMarkup(this.getBackgroundImage(),this.getBackgroundRepeat(),this.getBackgroundPositionX(),this.getBackgroundPositionY(),k);
return l;
},_applyBackground:function(){{};
}}});
})();
(function(){var I="_applyStyle",H="Color",G="px",F="solid",E="dotted",D="double",C="border:",B="dashed",A="",z="_applyWidth",t="qx.ui.decoration.Uniform",y="px ",w="__insets",s="__bF",r="position:absolute;top:0;left:0;",v=" ",u=";",x="scale",q="PositiveInteger";
qx.Class.define(t,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(n,o,p){arguments.callee.base.call(this);
if(n!=null){this.setWidth(n);
}
if(o!=null){this.setStyle(o);
}
if(p!=null){this.setColor(p);
}},properties:{width:{check:q,init:0,apply:z},style:{nullable:true,check:[F,E,B,D],init:F,apply:I},color:{nullable:true,check:H,apply:I},backgroundColor:{check:H,nullable:true,apply:I}},members:{__bF:null,_getDefaultInsets:function(){var i=this.getWidth();
return {top:i,right:i,bottom:i,left:i};
},_isInitialized:function(){return !!this.__bF;
},getMarkup:function(){if(this.__bF){return this.__bF;
}var j=r;
var k=this.getWidth();
{};
var m=qx.theme.manager.Color.getInstance();
j+=C+k+y+this.getStyle()+v+m.resolve(this.getColor())+u;
var l=this._generateBackgroundMarkup(j);
return this.__bF=l;
},resize:function(d,e,f){var h=this.getBackgroundImage()&&this.getBackgroundRepeat()==x;

if(h||qx.bom.client.Feature.CONTENT_BOX){var g=this.getWidth()*2;
e-=g;
f-=g;
if(e<0){e=0;
}
if(f<0){f=0;
}}d.style.width=e+G;
d.style.height=f+G;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.style.backgroundColor=c.resolve(b)||A;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(s,w);
}});
})();
(function(){var p="px",o="position:absolute;top:0;left:0",n="qx.ui.decoration.Background",m="",l="__insets",k="_applyStyle",j="__bG",i="Color";
qx.Class.define(n,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(a){arguments.callee.base.call(this);

if(a!=null){this.setBackgroundColor(a);
}},properties:{backgroundColor:{check:i,nullable:true,apply:k}},members:{__bG:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bG;
},getMarkup:function(){if(this.__bG){return this.__bG;
}var b=this._generateBackgroundMarkup(o);
return this.__bG=b;
},resize:function(c,d,e){c.style.width=d+p;
c.style.height=e+p;
},tint:function(f,g){var h=qx.theme.manager.Color.getInstance();

if(g==null){g=this.getBackgroundColor();
}f.style.backgroundColor=h.resolve(g)||m;
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(j,l);
}});
})();
(function(){var E="px",D="0px",C="-1px",B="no-repeat",A="scale-x",z="scale-y",y="-tr",x="-l",w="__insets",v='</div>',W="scale",V="qx.client",U="-br",T="-t",S="-tl",R="-r",Q='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',P="_applyBaseImage",O="-b",N="__bJ",L="String",M="",J="-bl",K="-c",H="mshtml",I="__bI",F="__bH",G="qx.ui.decoration.Grid";
qx.Class.define(G,{extend:qx.ui.decoration.Abstract,construct:function(g,h){arguments.callee.base.call(this);
if(g!=null){this.setBaseImage(g);
}
if(h!=null){this.setInsets(h);
}},properties:{baseImage:{check:L,nullable:true,apply:P}},members:{__bH:null,__bI:null,__bJ:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__bH;
},getMarkup:function(){if(this.__bH){return this.__bH;
}var a=qx.bom.element.Decoration;
var b=this.__bI;
var c=this.__bJ;
var d=[];
d.push(Q);
d.push(a.create(b.tl,B,{top:0,left:0}));
d.push(a.create(b.t,A,{top:0,left:c.left+E}));
d.push(a.create(b.tr,B,{top:0,right:0}));
d.push(a.create(b.bl,B,{bottom:0,left:0}));
d.push(a.create(b.b,A,{bottom:0,left:c.left+E}));
d.push(a.create(b.br,B,{bottom:0,right:0}));
d.push(a.create(b.l,z,{top:c.top+E,left:0}));
d.push(a.create(b.c,W,{top:c.top+E,left:c.left+E}));
d.push(a.create(b.r,z,{top:c.top+E,right:0}));
d.push(v);
return this.__bH=d.join(M);
},resize:function(i,j,k){var l=this.__bJ;
var innerWidth=j-l.left-l.right;
var innerHeight=k-l.top-l.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}i.style.width=j+E;
i.style.height=k+E;
i.childNodes[1].style.width=innerWidth+E;
i.childNodes[4].style.width=innerWidth+E;
i.childNodes[7].style.width=innerWidth+E;
i.childNodes[6].style.height=innerHeight+E;
i.childNodes[7].style.height=innerHeight+E;
i.childNodes[8].style.height=innerHeight+E;

if(qx.core.Variant.isSet(V,H)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(j%2==1){i.childNodes[2].style.marginRight=C;
i.childNodes[5].style.marginRight=C;
i.childNodes[8].style.marginRight=C;
}else{i.childNodes[2].style.marginRight=D;
i.childNodes[5].style.marginRight=D;
i.childNodes[8].style.marginRight=D;
}
if(k%2==1){i.childNodes[3].style.marginBottom=C;
i.childNodes[4].style.marginBottom=C;
i.childNodes[5].style.marginBottom=C;
}else{i.childNodes[3].style.marginBottom=D;
i.childNodes[4].style.marginBottom=D;
i.childNodes[5].style.marginBottom=D;
}}}},tint:function(e,f){},_applyBaseImage:function(m,n){{};
var o=qx.util.ResourceManager.getInstance();

if(m){var q=qx.util.AliasManager.getInstance();
var s=q.resolve(m);
var t=/(.*)(\.[a-z]+)$/.exec(s);
var r=t[1];
var p=t[2];
var u=this.__bI={tl:r+S+p,t:r+T+p,tr:r+y+p,bl:r+J+p,b:r+O+p,br:r+U+p,l:r+x+p,c:r+K+p,r:r+R+p};
this.__bJ={top:o.getImageHeight(u.t),bottom:o.getImageHeight(u.b),left:o.getImageWidth(u.l),right:o.getImageWidth(u.r)};
}}},destruct:function(){this._disposeFields(F,I,N,w);
}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g='<div style="',f='border:',e="1px solid ",d="",c=";",b="px",a='</div>',w="qx.ui.decoration.Beveled",v="__insets",u='<div style="position:absolute;top:1px;left:1px;',t='border-bottom:',s='border-right:',r="position:absolute;top:1px;left:1px;",q='<div style="overflow:hidden;font-size:0;line-height:0;">',p='border-left:',o='border-top:',n="Number",l='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',k="__bK";
qx.Class.define(w,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(x,y,z){arguments.callee.base.call(this);
if(x!=null){this.setOuterColor(x);
}
if(y!=null){this.setInnerColor(y);
}
if(z!=null){this.setInnerOpacity(z);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:n,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__bK:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__bK;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__bK){return this.__bK;
}var O=qx.theme.manager.Color.getInstance();
var P=[];
var R=e+O.resolve(this.getOuterColor())+c;
var Q=e+O.resolve(this.getInnerColor())+c;
P.push(q);
P.push(g);
P.push(f,R);
P.push(qx.bom.element.Opacity.compile(0.35));
P.push(i);
P.push(l);
P.push(p,R);
P.push(s,R);
P.push(i);
P.push(g);
P.push(m);
P.push(o,R);
P.push(t,R);
P.push(i);
P.push(this._generateBackgroundMarkup(r));
P.push(u);
P.push(f,Q);
P.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
P.push(i);
P.push(a);
return this.__bK=P.join(d);
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
},tint:function(L,M){var N=qx.theme.manager.Color.getInstance();

if(M==null){M=this.getBackgroundColor();
}L.childNodes[3].style.backgroundColor=N.resolve(M)||d;
}},destruct:function(){this._disposeFields(k,v);
}});
})();
(function(){var w="_applyStyle",v="solid",u="Color",t="double",s="px ",r="dotted",q="_applyWidth",p="dashed",o="Number",n=" ",V=";",U="shorthand",T="px",S="widthTop",R="styleRight",Q="styleLeft",P="widthLeft",O="widthBottom",N="",M="styleTop",D="colorBottom",E="styleBottom",B="widthRight",C="colorLeft",z="colorRight",A="colorTop",x="border-left:",y="__bL",F="scale",G="position:absolute;top:0;left:0;",I="border-top:",H="border-bottom:",K="border-right:",J="qx.ui.decoration.Single",L="__insets";
qx.Class.define(J,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(f,g,h){arguments.callee.base.call(this);
if(f!=null){this.setWidth(f);
}
if(g!=null){this.setStyle(g);
}
if(h!=null){this.setColor(h);
}},properties:{widthTop:{check:o,init:0,apply:q},widthRight:{check:o,init:0,apply:q},widthBottom:{check:o,init:0,apply:q},widthLeft:{check:o,init:0,apply:q},styleTop:{nullable:true,check:[v,r,p,t],init:v,apply:w},styleRight:{nullable:true,check:[v,r,p,t],init:v,apply:w},styleBottom:{nullable:true,check:[v,r,p,t],init:v,apply:w},styleLeft:{nullable:true,check:[v,r,p,t],init:v,apply:w},colorTop:{nullable:true,check:u,apply:w},colorRight:{nullable:true,check:u,apply:w},colorBottom:{nullable:true,check:u,apply:w},colorLeft:{nullable:true,check:u,apply:w},backgroundColor:{check:u,nullable:true,apply:w},left:{group:[P,Q,C]},right:{group:[B,R,z]},top:{group:[S,M,A]},bottom:{group:[O,E,D]},width:{group:[S,B,O,P],mode:U},style:{group:[M,R,E,Q],mode:U},color:{group:[A,z,D,C],mode:U}},members:{__bL:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__bL;
},getMarkup:function(i){if(this.__bL){return this.__bL;
}var j=qx.theme.manager.Color.getInstance();
var k=N;
var m=this.getWidthTop();

if(m>0){k+=I+m+s+this.getStyleTop()+n+j.resolve(this.getColorTop())+V;
}var m=this.getWidthRight();

if(m>0){k+=K+m+s+this.getStyleRight()+n+j.resolve(this.getColorRight())+V;
}var m=this.getWidthBottom();

if(m>0){k+=H+m+s+this.getStyleBottom()+n+j.resolve(this.getColorBottom())+V;
}var m=this.getWidthLeft();

if(m>0){k+=x+m+s+this.getStyleLeft()+n+j.resolve(this.getColorLeft())+V;
}{};
k+=G;
var l=this._generateBackgroundMarkup(k);
return this.__bL=l;
},resize:function(a,b,c){var e=this.getBackgroundImage()&&this.getBackgroundRepeat()==F;

if(e||qx.bom.client.Feature.CONTENT_BOX){var d=this.getInsets();
b-=d.left+d.right;
c-=d.top+d.bottom;
if(b<0){b=0;
}
if(c<0){c=0;
}}a.style.width=b+T;
a.style.height=c+T;
},tint:function(W,X){var Y=qx.theme.manager.Color.getInstance();

if(X==null){X=this.getBackgroundColor();
}W.style.backgroundColor=Y.resolve(X)||N;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this._disposeFields(y,L);
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bp="decoration/table/header-cell.png",bo="decoration/form/input.png",bn="#f8f8f8",bm="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bl="#b6b6b6",bk="background-pane",bj="repeat-y",bi="decoration/form/input-focused.png",bh="border-input",bg="decoration/scrollbar/scrollbar-button-bg-vertical.png",t="decoration/tabview/tab-button-top-active.png",u="decoration/form/button-c.png",r="decoration/scrollbar/scrollbar-bg-vertical.png",s="decoration/form/button.png",p="decoration/form/button-checked.png",q="decoration/tabview/tab-button-left-inactive.png",n="decoration/groupbox/groupbox.png",o="#FAFAFA",A="decoration/pane/pane.png",B="decoration/menu/background.png",L="decoration/toolbar/toolbar-part.gif",I="decoration/tabview/tab-button-top-inactive.png",T="decoration/menu/bar-background.png",O="center",bc="decoration/tabview/tab-button-bottom-active.png",Y="decoration/form/button-hovered.png",E="decoration/form/tooltip-error-arrow.png",bf="decoration/window/captionbar-inactive.png",be="qx/decoration/Modern",bd="decoration/window/statusbar.png",D="border-focused",G="decoration/selection.png",H="table-focus-indicator",K="#F2F2F2",M="decoration/form/button-checked-c.png",P="decoration/scrollbar/scrollbar-bg-horizontal.png",V="qx.theme.modern.Decoration",bb="#f4f4f4",v="decoration/shadow/shadow-small.png",w="decoration/app-header.png",F="decoration/tabview/tabview-pane.png",S="decoration/form/tooltip-error.png",R="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",W="decoration/tabview/tab-button-right-active.png",N="decoration/form/button-pressed.png",U="no-repeat",a="decoration/window/captionbar-active.png",ba="decoration/tabview/tab-button-left-active.png",x="background-splitpane",y="decoration/form/button-checked-focused.png",J="#C5C5C5",b="decoration/toolbar/toolbar-gradient.png",c="decoration/tabview/tab-button-right-inactive.png",C="#b8b8b8",z="decoration/shadow/shadow.png";
qx.Theme.define(V,{aliases:{decoration:be},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:G,backgroundRepeat:l}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:A,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:n}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:S,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:E,backgroundPositionY:O,backgroundRepeat:U,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:z,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:v,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:P,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:r,backgroundRepeat:bj}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bm,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bg,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:R,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:Y,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:p,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:y,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bh,innerColor:D,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bi,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:bo,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:b,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:u,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bl,innerColor:bn,backgroundImage:M,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:C,colorRight:bb,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:L,backgroundRepeat:bj}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:F,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:t}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:I}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bc}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:q}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:W}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:c}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bk,width:3,color:x,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bk,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:H,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bp,backgroundRepeat:l,widthRight:1,colorRight:K,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:B,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:J,widthBottom:1,colorBottom:o}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:T,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:w,backgroundRepeat:l}}}});
})();
(function(){var a="myaccount.theme.Decoration";
qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{}});
})();
(function(){var m="iPod",l="Win32",k="",j="Win64",i="Linux",h="BSD",g="Macintosh",f="iPhone",e="Windows",d="qx.bom.client.Platform",a="X11",c="MacIntel",b="MacPPC";
qx.Bootstrap.define(d,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__bM:function(){var n=navigator.platform;
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
}}},defer:function(o){o.__bM();
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
(function(){var a="myaccount.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var gP="button-frame",gO="atom",gN="widget",gM="main",gL="button",gK="bold",gJ="middle",gI="text-selected",gH="background-light",gG="image",fu="text-disabled",ft="groupbox",fs="cell",fr="border-invalid",fq="input",fp="input-disabled",fo="menu-button",fn="decoration/arrows/down.png",fm="input-focused-invalid",fl="toolbar-button",gW="spinner",gX="input-focused",gU="selected",gV="popup",gS="tooltip",gT="list",gQ="tree-item",gR="treevirtual-contract",gY="scrollbar",ha="datechooser/nav-button",gp="text-hovered",go="center",gr="treevirtual-expand",gq="textfield",gt="label",gs="decoration/arrows/right.png",gv="background-application",gu="radiobutton",gn="invalid",gm="combobox",dy="right-top",dz="checkbox",dA="text-title",dB="qx/static/blank.gif",dC="scrollbar/button",dD="right",dE="combobox/button",dF="icon/16/places/folder.png",dG="text-label",dH="decoration/tree/closed.png",ho="scrollbar-slider-horizontal",hn="white",hm="decoration/arrows/left.png",hl="button-focused",hs="text-light",hr="text-input",hq="slidebar/button-forward",hp="background-splitpane",hu=".png",ht="decoration/tree/open.png",ez="default",eA="decoration/arrows/down-small.png",ex="datechooser",ey="slidebar/button-backward",eD="selectbox",eE="treevirtual-folder",eB="shadow-popup",eC="icon/16/mimetypes/office-document.png",ev="background-medium",ew="table",ec="decoration/form/",eb="",ee="-invalid",ed="icon/16/places/folder-open.png",dX="button-checked",dW="decoration/window/maximize-active-hovered.png",ea="radiobutton-hovered",dY="decoration/cursors/",dV="slidebar",dU="tooltip-error-arrow",eK="table-scroller-focus-indicator",eL="move-frame",eM="nodrop",eN="decoration/table/boolean-true.png",eG="table-header-cell",eH="menu",eI="app-header",eJ="row-layer",eO="text-inactive",eP="move",eo="radiobutton-checked-focused",en="decoration/window/restore-active-hovered.png",em="shadow-window",el="table-column-button",ek="right.png",ej="tabview-page-button-bottom-inactive",ei="tooltip-error",eh="window-statusbar",es="button-hovered",er="decoration/scrollbar/scrollbar-",eQ="background-tip",eR="scrollbar-slider-horizontal-disabled",eS="table-scroller-header",eT="radiobutton-disabled",eU="button-pressed",eV="table-pane",eW="decoration/window/close-active.png",eX="tabview-page-button-left-active",eY="checkbox-hovered",fa="button-invalid-shadow",fC="checkbox-checked",fB="decoration/window/minimize-active-hovered.png",fA="menubar",fz="icon/16/actions/dialog-cancel.png",fG="tabview-page-button-top-inactive",fF="tabview-page-button-left-inactive",fE="toolbar-button-checked",fD="decoration/tree/open-selected.png",fK="radiobutton-checked",fJ="decoration/window/minimize-inactive.png",gi="icon/16/apps/office-calendar.png",gj="group",gg="tabview-page-button-right-inactive",gh="decoration/window/minimize-active.png",ge="decoration/window/restore-inactive.png",gf="checkbox-checked-focused",gc="splitpane",gd="combobox/textfield",gk="button-preselected-focused",gl="decoration/window/close-active-hovered.png",gz="qx/icon/Tango/16/actions/window-close.png",gy="checkbox-pressed",gB="button-disabled",gA="border-separator",gD="decoration/window/maximize-inactive.png",gC="icon/22/places/folder-open.png",gF="scrollarea",gE="scrollbar-vertical",gx="decoration/toolbar/toolbar-handle-knob.gif",gw="icon/22/mimetypes/office-document.png",hh="button-preselected",hi="button-checked-focused",hj="up.png",hk="decoration/tree/closed-selected.png",hd="qx.theme.modern.Appearance",he="text-active",hf="checkbox-disabled",hg="toolbar-button-hovered",hb="progressive-table-header",hc="decoration/menu/radiobutton.gif",dx="decoration/arrows/forward.png",dw="decoration/table/descending.png",dv="window-captionbar-active",du="checkbox-checked-hovered",dt="scrollbar-slider-vertical",ds="toolbar",dr="alias",dq="decoration/window/restore-active.png",dp="decoration/table/boolean-false.png",dn="checkbox-checked-disabled",dK="icon/32/mimetypes/office-document.png",dL="radiobutton-checked-disabled",dI="tabview-pane",dJ="decoration/arrows/rewind.png",dO="checkbox-focused",dP="top",dM="#EEE",dN="icon/16/actions/dialog-ok.png",dR="radiobutton-checked-hovered",dS="table-header-cell-hovered",fO="window",fI="text-gray",fV="decoration/menu/radiobutton-invert.gif",fR="text-placeholder",fx="slider",fv="decoration/table/select-column-order.png",eg="down.png",fy="tabview-page-button-top-active",eq="icon/32/places/folder-open.png",ep="icon/22/places/folder.png",fd="decoration/window/maximize-active.png",fe="checkbox-checked-pressed",ff="decoration/window/close-inactive.png",fg="toolbar-part",fh="decoration/splitpane/knob-vertical.png",fi=".gif",fj="decoration/menu/checkbox-invert.gif",fk="decoration/arrows/up.png",fb="radiobutton-checked-pressed",fc="table-statusbar",fw="radiobutton-pressed",fU="window-captionbar-inactive",fT="copy",fS="radiobutton-focused",ga="decoration/menu/checkbox.gif",fY="decoration/splitpane/knob-horizontal.png",fX="icon/32/places/folder.png",fW="toolbar-separator",fQ="tabview-page-button-bottom-active",fP="decoration/arrows/up-small.png",dQ="decoration/table/ascending.png",eu="small",et="tabview-page-button-right-active",fH="-disabled",eF="scrollbar-horizontal",fN="progressive-table-header-cell",fM="menu-separator",fL="pane",ef="decoration/arrows/right-invert.png",gb="left.png",dT="icon/16/actions/view-refresh.png";
qx.Theme.define(hd,{appearances:{"widget":{},"root":{style:function(k){return {backgroundColor:gv,textColor:dG,font:ez};
}},"label":{style:function(by){return {textColor:by.disabled?fu:undefined};
}},"move-frame":{style:function(D){return {decorator:gM};
}},"resize-frame":eL,"dragdrop-cursor":{style:function(d){var e=eM;

if(d.copy){e=fT;
}else if(d.move){e=eP;
}else if(d.alias){e=dr;
}return {source:dY+e+fi,position:dy,offset:[2,16,2,6]};
}},"image":{style:function(T){return {opacity:!T.replacement&&T.disabled?0.3:1};
}},"atom":{},"atom/label":gt,"atom/icon":gG,"popup":{style:function(hH){return {decorator:gM,backgroundColor:gH,shadow:eB};
}},"button-frame":{alias:gO,style:function(hI){var hK,hJ;

if(hI.checked&&hI.focused&&!hI.inner){hK=hi;
hJ=undefined;
}else if(hI.disabled){hK=gB;
hJ=undefined;
}else if(hI.pressed){hK=eU;
hJ=gp;
}else if(hI.checked){hK=dX;
hJ=undefined;
}else if(hI.hovered){hK=es;
hJ=gp;
}else if(hI.preselected&&hI.focused&&!hI.inner){hK=gk;
hJ=gp;
}else if(hI.preselected){hK=hh;
hJ=gp;
}else if(hI.focused&&!hI.inner){hK=hl;
hJ=undefined;
}else{hK=gL;
hJ=undefined;
}return {decorator:hK,textColor:hJ,shadow:hI.invalid&&!hI.disabled?fa:undefined};
}},"button-frame/image":{style:function(cT){return {opacity:!cT.replacement&&cT.disabled?0.5:1};
}},"button":{alias:gP,include:gP,style:function(bU){return {padding:[2,8],center:true};
}},"splitbutton":{},"splitbutton/button":gL,"splitbutton/arrow":{alias:gL,include:gL,style:function(di){return {icon:fn,padding:2,marginLeft:1};
}},"checkbox":{alias:gO,style:function(cE){var cG;

if(cE.checked&&cE.focused){cG=gf;
}else if(cE.checked&&cE.disabled){cG=dn;
}else if(cE.checked&&cE.pressed){cG=fe;
}else if(cE.checked&&cE.hovered){cG=du;
}else if(cE.checked){cG=fC;
}else if(cE.disabled){cG=hf;
}else if(cE.focused){cG=dO;
}else if(cE.pressed){cG=gy;
}else if(cE.hovered){cG=eY;
}else{cG=dz;
}var cF=cE.invalid&&!cE.disabled?ee:eb;
return {icon:ec+cG+cF+hu,gap:6};
}},"radiobutton":{alias:gO,style:function(Y){var bb;

if(Y.checked&&Y.focused){bb=eo;
}else if(Y.checked&&Y.disabled){bb=dL;
}else if(Y.checked&&Y.pressed){bb=fb;
}else if(Y.checked&&Y.hovered){bb=dR;
}else if(Y.checked){bb=fK;
}else if(Y.disabled){bb=eT;
}else if(Y.focused){bb=fS;
}else if(Y.pressed){bb=fw;
}else if(Y.hovered){bb=ea;
}else{bb=gu;
}var ba=Y.invalid&&!Y.disabled?ee:eb;
return {icon:ec+bb+ba+hu,gap:6};
}},"textfield":{style:function(co){var ct;
var cr=!!co.focused;
var cs=!!co.invalid;
var cp=!!co.disabled;

if(cr&&cs&&!cp){ct=fm;
}else if(cr&&!cs&&!cp){ct=gX;
}else if(cp){ct=fp;
}else if(!cr&&cs&&!cp){ct=fr;
}else{ct=fq;
}var cq;

if(co.disabled){cq=fu;
}else if(co.showingPlaceholder){cq=fR;
}else{cq=hr;
}return {decorator:ct,padding:[2,4,1],textColor:cq};
}},"textarea":{include:gq,style:function(bT){return {padding:4};
}},"spinner":{style:function(F){var J;
var H=!!F.focused;
var I=!!F.invalid;
var G=!!F.disabled;

if(H&&I&&!G){J=fm;
}else if(H&&!I&&!G){J=gX;
}else if(G){J=fp;
}else if(!H&&I&&!G){J=fr;
}else{J=fq;
}return {decorator:J};
}},"spinner/textfield":{style:function(bi){return {marginRight:2,padding:[2,4,1],textColor:bi.disabled?fu:hr};
}},"spinner/upbutton":{alias:gP,include:gP,style:function(be){return {icon:fP,padding:be.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:gP,include:gP,style:function(cR){return {icon:eA,padding:cR.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":gm,"datefield/button":{alias:dE,include:dE,style:function(bS){return {icon:gi,padding:[0,3],decorator:undefined};
}},"datefield/textfield":gd,"datefield/list":{alias:ex,include:ex,style:function(bc){return {decorator:undefined};
}},"groupbox":{style:function(cB){return {legendPosition:dP};
}},"groupbox/legend":{alias:gO,style:function(cy){return {padding:[1,0,1,4],textColor:cy.invalid?gn:dA,font:gK};
}},"groupbox/frame":{style:function(cX){return {padding:12,decorator:gj};
}},"check-groupbox":ft,"check-groupbox/legend":{alias:dz,include:dz,style:function(ca){return {padding:[1,0,1,4],textColor:ca.invalid?gn:dA,font:gK};
}},"radio-groupbox":ft,"radio-groupbox/legend":{alias:gu,include:gu,style:function(cc){return {padding:[1,0,1,4],textColor:cc.invalid?gn:dA,font:gK};
}},"scrollarea":{style:function(c){return {minWidth:64,minHeight:64};
}},"scrollarea/corner":{style:function(g){return {backgroundColor:gv};
}},"scrollarea/pane":gN,"scrollarea/scrollbar-x":gY,"scrollarea/scrollbar-y":gY,"scrollbar":{style:function(dm){return {width:dm.horizontal?undefined:16,height:dm.horizontal?16:undefined,decorator:dm.horizontal?eF:gE,padding:1};
}},"scrollbar/slider":{alias:fx,style:function(hz){return {padding:hz.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:gP,style:function(bt){var bu=bt.horizontal?ho:dt;

if(bt.disabled){bu+=fH;
}return {decorator:bu,minHeight:bt.horizontal?undefined:14,minWidth:bt.horizontal?14:undefined};
}},"scrollbar/button":{alias:gP,include:gP,style:function(a){var b=er;

if(a.left){b+=gb;
}else if(a.right){b+=ek;
}else if(a.up){b+=hj;
}else{b+=eg;
}
if(a.left||a.right){return {padding:[0,0,0,a.left?3:4],icon:b,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:b,width:14,height:15};
}}},"scrollbar/button-begin":dC,"scrollbar/button-end":dC,"slider":{style:function(O){var S;
var Q=!!O.focused;
var R=!!O.invalid;
var P=!!O.disabled;

if(Q&&R&&!P){S=fm;
}else if(Q&&!R&&!P){S=gX;
}else if(P){S=fp;
}else if(!Q&&R&&!P){S=fr;
}else{S=fq;
}return {decorator:S};
}},"slider/knob":{include:gP,style:function(hE){return {decorator:hE.disabled?eR:ho,shadow:undefined,height:14,width:14};
}},"list":{alias:gF,style:function(ch){var cl;
var cj=!!ch.focused;
var ck=!!ch.invalid;
var ci=!!ch.disabled;

if(cj&&ck&&!ci){cl=fm;
}else if(cj&&!ck&&!ci){cl=gX;
}else if(ci){cl=fp;
}else if(!cj&&ck&&!ci){cl=fr;
}else{cl=fq;
}return {backgroundColor:gH,decorator:cl};
}},"list/pane":gN,"listitem":{alias:gO,style:function(X){return {padding:4,textColor:X.selected?gI:undefined,decorator:X.selected?gU:undefined};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:gP,include:gP,style:function(bR){return {padding:5,center:true,icon:bR.vertical?fn:gs};
}},"slidebar/button-backward":{alias:gP,include:gP,style:function(br){return {padding:5,center:true,icon:br.vertical?fk:hm};
}},"tabview":{style:function(B){return {contentPadding:16};
}},"tabview/bar":{alias:dV,style:function(cH){var cI={marginBottom:cH.barTop?-1:0,marginTop:cH.barBottom?-4:0,marginLeft:cH.barRight?-3:0,marginRight:cH.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(cH.barTop||cH.barBottom){cI.paddingLeft=5;
cI.paddingRight=7;
}else{cI.paddingTop=5;
cI.paddingBottom=7;
}return cI;
}},"tabview/bar/button-forward":{include:hq,alias:hq,style:function(bN){if(bN.barTop||bN.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:ey,alias:ey,style:function(cm){if(cm.barTop||cm.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(bW){return {decorator:dI,minHeight:100,marginBottom:bW.barBottom?-1:0,marginTop:bW.barTop?-1:0,marginLeft:bW.barLeft?-1:0,marginRight:bW.barRight?-1:0};
}},"tabview-page":gN,"tabview-page/button":{alias:gO,style:function(t){var z,v=0;
var y=0,u=0,w=0,x=0;

if(t.checked){if(t.barTop){z=fy;
v=[6,14];
w=t.firstTab?0:-5;
x=t.lastTab?0:-5;
}else if(t.barBottom){z=fQ;
v=[6,14];
w=t.firstTab?0:-5;
x=t.lastTab?0:-5;
}else if(t.barRight){z=et;
v=[6,13];
y=t.firstTab?0:-5;
u=t.lastTab?0:-5;
}else{z=eX;
v=[6,13];
y=t.firstTab?0:-5;
u=t.lastTab?0:-5;
}}else{if(t.barTop){z=fG;
v=[4,10];
y=4;
w=t.firstTab?5:1;
x=1;
}else if(t.barBottom){z=ej;
v=[4,10];
u=4;
w=t.firstTab?5:1;
x=1;
}else if(t.barRight){z=gg;
v=[4,10];
x=5;
y=t.firstTab?5:1;
u=1;
w=1;
}else{z=fF;
v=[4,10];
w=5;
y=t.firstTab?5:1;
u=1;
x=1;
}}return {zIndex:t.checked?10:5,decorator:z,padding:v,marginTop:y,marginBottom:u,marginLeft:w,marginRight:x,textColor:t.checked?he:eO};
}},"tabview-page/button/close-button":{alias:gO,style:function(bh){return {icon:gz};
}},"toolbar":{style:function(bw){return {decorator:ds,spacing:2};
}},"toolbar/part":{style:function(h){return {decorator:fg,spacing:2};
}},"toolbar/part/container":{style:function(cw){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(bf){return {source:gx,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:gO,style:function(cf){return {marginTop:2,marginBottom:2,padding:(cf.pressed||cf.checked||cf.hovered)&&!cf.disabled||(cf.disabled&&cf.checked)?3:5,decorator:cf.pressed||(cf.checked&&!cf.hovered)||(cf.checked&&cf.disabled)?fE:cf.hovered&&!cf.disabled?hg:undefined};
}},"toolbar-menubutton":{alias:fl,include:fl,style:function(hx){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:gG,include:gG,style:function(E){return {source:eA};
}},"toolbar-splitbutton":{style:function(cU){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:fl,include:fl,style:function(bK){return {icon:fn,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:fl,include:fl,style:function(bI){return {padding:bI.pressed||bI.checked?1:bI.hovered?1:3,icon:fn,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(bM){return {decorator:fW,margin:7};
}},"tree":gT,"tree-item":{style:function(bG){return {padding:[2,6],textColor:bG.selected?gI:undefined,decorator:bG.selected?gU:undefined};
}},"tree-item/icon":{include:gG,style:function(bB){return {paddingRight:5};
}},"tree-item/label":gt,"tree-item/open":{include:gG,style:function(df){var dg;

if(df.selected&&df.opened){dg=fD;
}else if(df.selected&&!df.opened){dg=hk;
}else if(df.opened){dg=ht;
}else{dg=dH;
}return {padding:[0,5,0,2],source:dg};
}},"tree-folder":{include:gQ,alias:gQ,style:function(bz){var bA;

if(bz.small){bA=bz.opened?ed:dF;
}else if(bz.large){bA=bz.opened?eq:fX;
}else{bA=bz.opened?gC:ep;
}return {icon:bA};
}},"tree-file":{include:gQ,alias:gQ,style:function(cK){return {icon:cK.small?eC:cK.large?dK:gw};
}},"treevirtual":ew,"treevirtual-folder":{style:function(W){return {icon:W.opened?ed:dF};
}},"treevirtual-file":{include:eE,alias:eE,style:function(cC){return {icon:eC};
}},"treevirtual-line":{style:function(cV){return {icon:dB};
}},"treevirtual-contract":{style:function(hw){return {icon:ht,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(hM){return {icon:dH,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":gR,"treevirtual-only-expand":gr,"treevirtual-start-contract":gR,"treevirtual-start-expand":gr,"treevirtual-end-contract":gR,"treevirtual-end-expand":gr,"treevirtual-cross-contract":gR,"treevirtual-cross-expand":gr,"treevirtual-end":{style:function(hN){return {icon:dB};
}},"treevirtual-cross":{style:function(bP){return {icon:dB};
}},"tooltip":{include:gV,style:function(cx){return {backgroundColor:eQ,padding:[1,3,2,3],offset:[5,5,20,5]};
}},"tooltip/atom":gO,"tooltip-error":{include:gS,style:function(bx){return {textColor:gI,placeMethod:gN,offsetRight:15,position:dy,showTimeout:100,hideTimeout:10000,decorator:ei,shadow:dU,font:gK};
}},"tooltip-error/atom":gO,"window":{style:function(hD){return {shadow:em,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(dl){return {decorator:fO};
}},"window/captionbar":{style:function(cu){return {decorator:cu.active?dv:fU,textColor:cu.active?hn:fI,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(dd){return {margin:[5,0,3,6]};
}},"window/title":{style:function(bV){return {alignY:gJ,font:gK,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:gO,style:function(bE){return {icon:bE.active?bE.hovered?fB:gh:fJ,margin:[4,8,2,0]};
}},"window/restore-button":{alias:gO,style:function(bD){return {icon:bD.active?bD.hovered?en:dq:ge,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:gO,style:function(cz){return {icon:cz.active?cz.hovered?dW:fd:gD,margin:[4,8,2,0]};
}},"window/close-button":{alias:gO,style:function(dc){return {icon:dc.active?dc.hovered?gl:eW:ff,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(V){return {padding:[2,6],decorator:eh,minHeight:18};
}},"window/statusbar-text":{style:function(M){return {font:eu};
}},"iframe":{style:function(cQ){return {decorator:gM};
}},"resizer":{style:function(cS){return {decorator:fL};
}},"splitpane":{style:function(l){return {decorator:gc};
}},"splitpane/splitter":{style:function(hL){return {width:hL.horizontal?3:undefined,height:hL.vertical?3:undefined,backgroundColor:hp};
}},"splitpane/splitter/knob":{style:function(cJ){return {source:cJ.horizontal?fY:fh};
}},"splitpane/slider":{style:function(de){return {width:de.horizontal?3:undefined,height:de.vertical?3:undefined,backgroundColor:hp};
}},"selectbox":{alias:gP,include:gP,style:function(U){return {padding:[2,8]};
}},"selectbox/atom":gO,"selectbox/popup":gV,"selectbox/list":{alias:gT},"selectbox/arrow":{include:gG,style:function(db){return {source:fn,paddingLeft:5};
}},"datechooser":{style:function(n){var r;
var p=!!n.focused;
var q=!!n.invalid;
var o=!!n.disabled;

if(p&&q&&!o){r=fm;
}else if(p&&!q&&!o){r=gX;
}else if(o){r=fp;
}else if(!p&&q&&!o){r=fr;
}else{r=fq;
}return {padding:2,decorator:r,backgroundColor:gH};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:gP,alias:gP,style:function(dj){var dk={padding:[2,4],shadow:undefined};

if(dj.lastYear){dk.icon=dJ;
dk.marginRight=1;
}else if(dj.lastMonth){dk.icon=hm;
}else if(dj.nextYear){dk.icon=dx;
dk.marginLeft=1;
}else if(dj.nextMonth){dk.icon=gs;
}return dk;
}},"datechooser/last-year-button-tooltip":gS,"datechooser/last-month-button-tooltip":gS,"datechooser/next-year-button-tooltip":gS,"datechooser/next-month-button-tooltip":gS,"datechooser/last-year-button":ha,"datechooser/last-month-button":ha,"datechooser/next-month-button":ha,"datechooser/next-year-button":ha,"datechooser/month-year-label":{style:function(cA){return {font:gK,textAlign:go,textColor:cA.disabled?fu:undefined};
}},"datechooser/date-pane":{style:function(hv){return {textColor:hv.disabled?fu:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(C){return {textColor:C.disabled?fu:C.weekend?hs:undefined,textAlign:go,paddingTop:2,backgroundColor:ev};
}},"datechooser/week":{style:function(bs){return {textAlign:go,padding:[2,4],backgroundColor:ev};
}},"datechooser/day":{style:function(N){return {textAlign:go,decorator:N.disabled?undefined:N.selected?gU:undefined,textColor:N.disabled?fu:N.selected?gI:N.otherMonth?hs:undefined,font:N.today?gK:undefined,padding:[2,4]};
}},"combobox":{style:function(bl){var bp;
var bn=!!bl.focused;
var bo=!!bl.invalid;
var bm=!!bl.disabled;

if(bn&&bo&&!bm){bp=fm;
}else if(bn&&!bo&&!bm){bp=gX;
}else if(bm){bp=fp;
}else if(!bn&&bo&&!bm){bp=fr;
}else{bp=fq;
}return {decorator:bp};
}},"combobox/popup":gV,"combobox/list":{alias:gT},"combobox/button":{include:gP,alias:gP,style:function(hF){var hG={icon:fn,padding:2};

if(hF.selected){hG.decorator=hl;
}return hG;
}},"combobox/textfield":{include:gq,style:function(bj){return {decorator:undefined};
}},"menu":{style:function(cO){var cP={decorator:eH,shadow:eB,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4};

if(cO.submenu){cP.position=dy;
cP.offset=[-2,-3];
}return cP;
}},"menu-separator":{style:function(A){return {height:0,decorator:fM,margin:[4,2]};
}},"menu-button":{alias:gO,style:function(da){return {decorator:da.selected?gU:undefined,textColor:da.selected?gI:undefined,padding:[4,6]};
}},"menu-button/icon":{include:gG,style:function(s){return {alignY:gJ};
}},"menu-button/label":{include:gt,style:function(bH){return {alignY:gJ,padding:1};
}},"menu-button/shortcut":{include:gt,style:function(bL){return {alignY:gJ,marginLeft:14,padding:1};
}},"menu-button/arrow":{style:function(hO){return {source:hO.selected?ef:gs,alignY:gJ};
}},"menu-checkbox":{alias:fo,include:fo,style:function(cn){return {icon:!cn.checked?undefined:cn.selected?fj:ga};
}},"menu-radiobutton":{alias:fo,include:fo,style:function(hy){return {icon:!hy.checked?undefined:hy.selected?fV:hc};
}},"menubar":{style:function(bg){return {decorator:fA};
}},"menubar-button":{alias:gO,style:function(cM){return {decorator:cM.pressed||cM.hovered?gU:undefined,textColor:cM.pressed||cM.hovered?gI:undefined,padding:[3,8]};
}},"colorselector":gN,"colorselector/control-bar":gN,"colorselector/control-pane":gN,"colorselector/visual-pane":ft,"colorselector/preset-grid":gN,"colorselector/colorbucket":{style:function(bd){return {decorator:gM,width:16,height:16};
}},"colorselector/preset-field-set":ft,"colorselector/input-field-set":ft,"colorselector/preview-field-set":ft,"colorselector/hex-field-composite":gN,"colorselector/hex-field":gq,"colorselector/rgb-spinner-composite":gN,"colorselector/rgb-spinner-red":gW,"colorselector/rgb-spinner-green":gW,"colorselector/rgb-spinner-blue":gW,"colorselector/hsb-spinner-composite":gN,"colorselector/hsb-spinner-hue":gW,"colorselector/hsb-spinner-saturation":gW,"colorselector/hsb-spinner-brightness":gW,"colorselector/preview-content-old":{style:function(ce){return {decorator:gM,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(i){return {decorator:gM,backgroundColor:gH,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(cL){return {decorator:gM,margin:5};
}},"colorselector/brightness-field":{style:function(cD){return {decorator:gM,margin:[5,7]};
}},"colorselector/hue-saturation-pane":gN,"colorselector/hue-saturation-handle":gN,"colorselector/brightness-pane":gN,"colorselector/brightness-handle":gN,"colorpopup":{alias:gV,include:gV,style:function(cb){return {padding:5,backgroundColor:gv};
}},"colorpopup/field":{style:function(bk){return {decorator:gM,margin:2,width:14,height:14,backgroundColor:gH};
}},"colorpopup/selector-button":gL,"colorpopup/auto-button":gL,"colorpopup/preview-pane":ft,"colorpopup/current-preview":{style:function(bO){return {height:20,padding:4,marginLeft:4,decorator:gM,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(bq){return {height:20,padding:4,marginRight:4,decorator:gM,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:gL,include:gL,style:function(bJ){return {icon:dN};
}},"colorpopup/colorselector-cancelbutton":{alias:gL,include:gL,style:function(hA){return {icon:fz};
}},"table":{alias:gN,style:function(bQ){return {decorator:ew};
}},"table-header":{},"table/statusbar":{style:function(bv){return {decorator:fc,padding:[0,2]};
}},"table/column-button":{alias:gP,style:function(bC){return {decorator:el,padding:3,icon:fv};
}},"table-column-reset-button":{include:fo,alias:fo,style:function(){return {icon:dT};
}},"table-scroller":gN,"table-scroller/scrollbar-x":gY,"table-scroller/scrollbar-y":gY,"table-scroller/header":{style:function(hC){return {decorator:eS};
}},"table-scroller/pane":{style:function(hP){return {backgroundColor:eV};
}},"table-scroller/focus-indicator":{style:function(j){return {decorator:eK};
}},"table-scroller/resize-line":{style:function(cd){return {backgroundColor:gA,width:2};
}},"table-header-cell":{alias:gO,style:function(hB){return {minWidth:13,minHeight:20,padding:hB.hovered?[3,4,2,4]:[3,4],decorator:hB.hovered?dS:eG,sortIcon:hB.sorted?(hB.sortedAscending?dQ:dw):undefined};
}},"table-header-cell/label":{style:function(cN){return {minWidth:0,alignY:gJ,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(dh){return {alignY:gJ,alignX:dD};
}},"table-header-cell/icon":{style:function(cg){return {minWidth:0,alignY:gJ,paddingRight:5};
}},"table-editor-textfield":{include:gq,style:function(K){return {decorator:undefined,padding:[2,2],backgroundColor:gH};
}},"table-editor-selectbox":{include:eD,alias:eD,style:function(cv){return {padding:[0,2],backgroundColor:gH};
}},"table-editor-combobox":{include:gm,alias:gm,style:function(bY){return {decorator:undefined,backgroundColor:gH};
}},"progressive-table-header":{alias:gN,style:function(L){return {decorator:hb};
}},"progressive-table-header-cell":{alias:gO,style:function(m){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:fN};
}},"app-header":{style:function(bX){return {font:gK,textColor:gI,padding:[8,12],decorator:eI};
}},"virtual-list":gT,"virtual-list/row-layer":eJ,"row-layer":{style:function(cY){return {colorEven:hn,colorOdd:dM};
}},"column-layer":gN,"cell":{style:function(bF){return {textColor:bF.selected?gI:dG,padding:[3,6],font:ez};
}},"cell-string":fs,"cell-number":{include:fs,style:function(f){return {textAlign:dD};
}},"cell-image":fs,"cell-boolean":{include:fs,style:function(cW){return {iconTrue:eN,iconFalse:dp};
}},"cell-atom":fs,"cell-date":fs,"cell-html":fs}});
})();
(function(){var a="myaccount.theme.Appearance";
qx.Theme.define(a,{extend:qx.theme.modern.Appearance,appearances:{}});
})();
(function(){var a="myaccount.theme.Theme";
qx.Theme.define(a,{meta:{color:myaccount.theme.Color,decoration:myaccount.theme.Decoration,font:myaccount.theme.Font,icon:qx.theme.icon.Tango,appearance:myaccount.theme.Appearance}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:qx.lang.Object.select((!Error.prototype.toString||Error.prototype.toString()==a)?g:f,{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}),arrayIndexOf:qx.lang.Object.select(Array.prototype.indexOf?f:g,{"native":Array.prototype.indexOf,"emulated":function(C,D){if(D==null){D=0;
}else if(D<0){D=Math.max(0,this.length+D);
}
for(var i=D;i<this.length;i++){if(this[i]===C){return i;
}}return -1;
}}),arrayLastIndexOf:qx.lang.Object.select(Array.prototype.lastIndexOf?f:g,{"native":Array.prototype.lastIndexOf,"emulated":function(t,u){if(u==null){u=this.length-1;
}else if(u<0){u=Math.max(0,this.length+u);
}
for(var i=u;i>=0;i--){if(this[i]===t){return i;
}}return -1;
}}),arrayForEach:qx.lang.Object.select(Array.prototype.forEach?f:g,{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;

for(var i=0;i<l;i++){var p=this[i];

if(p!==undefined){n.call(o||window,p,i,this);
}}}}),arrayFilter:qx.lang.Object.select(Array.prototype.filter?f:g,{"native":Array.prototype.filter,"emulated":function(h,j){var k=[];
var l=this.length;

for(var i=0;i<l;i++){var m=this[i];

if(m!==undefined){if(h.call(j||window,m,i,this)){k.push(this[i]);
}}}return k;
}}),arrayMap:qx.lang.Object.select(Array.prototype.map?f:g,{"native":Array.prototype.map,"emulated":function(v,w){var x=[];
var l=this.length;

for(var i=0;i<l;i++){var y=this[i];

if(y!==undefined){x[i]=v.call(w||window,y,i,this);
}}return x;
}}),arraySome:qx.lang.Object.select(Array.prototype.some?f:g,{"native":Array.prototype.some,"emulated":function(z,A){var l=this.length;

for(var i=0;i<l;i++){var B=this[i];

if(B!==undefined){if(z.call(A||window,B,i,this)){return true;
}}}return false;
}}),arrayEvery:qx.lang.Object.select(Array.prototype.every?f:g,{"native":Array.prototype.every,"emulated":function(q,r){var l=this.length;

for(var i=0;i<l;i++){var s=this[i];

if(s!==undefined){if(!q.call(r||window,s,i,this)){return false;
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
(function(){var U=":",T="qx.client",S="anonymous",R="...",Q="qx.dev.StackTrace",P="",O="\n",N="/source/class/",M=".";
qx.Class.define(Q,{statics:{getStackTrace:qx.core.Variant.select(T,{"gecko":function(){try{throw new Error();
}catch(bc){var h=this.getStackTraceFromError(bc);
qx.lang.Array.removeAt(h,0);
var f=this.getStackTraceFromCaller(arguments);
var d=f.length>h.length?f:h;

for(var i=0;i<Math.min(f.length,h.length);i++){var e=f[i];

if(e.indexOf(S)>=0){continue;
}var m=e.split(U);

if(m.length!=2){continue;
}var k=m[0];
var c=m[1];
var b=h[i];
var n=b.split(U);
var j=n[0];
var a=n[1];

if(qx.Class.getByName(j)){var g=j;
}else{g=k;
}var l=g+U;

if(c){l+=c+U;
}l+=a;
d[i]=l;
}return d;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var K;

try{K.bar();
}catch(o){var L=this.getStackTraceFromError(o);
qx.lang.Array.removeAt(L,0);
return L;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(T,{"opera":function(x){return [];
},"default":function(V){var bb=[];
var ba=qx.lang.Function.getCaller(V);
var W={};

while(ba){var X=qx.lang.Function.getName(ba);
bb.push(X);

try{ba=ba.caller;
}catch(y){break;
}
if(!ba){break;
}var Y=qx.core.ObjectRegistry.toHashCode(ba);

if(W[Y]){bb.push(R);
break;
}W[Y]=ba;
}return bb;
}}),getStackTraceFromError:qx.core.Variant.select(T,{"gecko":function(z){if(!z.stack){return [];
}var F=/@(.+):(\d+)$/gm;
var A;
var B=[];

while((A=F.exec(z.stack))!=null){var C=A[1];
var E=A[2];
var D=this.__bP(C);
B.push(D+U+E);
}return B;
},"webkit":function(p){if(p.sourceURL&&p.line){return [this.__bP(p.sourceURL)+U+p.line];
}else{return [];
}},"opera":function(q){if(q.message.indexOf("Backtrace:")<0){return [];
}var s=[];
var t=qx.lang.String.trim(q.message.split("Backtrace:")[1]);
var u=t.split(O);

for(var i=0;i<u.length;i++){var r=u[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(r&&r.length>=2){var w=r[1];
var v=this.__bP(r[2]);
s.push(v+U+w);
}}return s;
},"default":function(){return [];
}}),__bP:function(G){var J=N;
var H=G.indexOf(J);
var I=(H==-1)?G:G.substring(H+J.length).replace(/\//g,M).replace(/\.js$/,P);
return I;
}}});
})();
(function(){var j="qx.event.type.Data",i="qx.event.type.Event",h="qx.data.IListData";
qx.Interface.define(h,{events:{"change":j,"changeLength":i},members:{getItem:function(f){},setItem:function(a,b){},splice:function(c,d,e){},contains:function(g){},getLength:function(){},toArray:function(){}}});
})();
(function(){var c="qx.globalErrorHandling",b="on",a="qx.event.GlobalError";
qx.Bootstrap.define(a,{statics:{setErrorHandler:function(j,k){this.__bQ=j||null;
this.__bR=k||window;

if(qx.core.Setting.get(c)===b){if(j&&!window.onerror){window.onerror=qx.lang.Function.bind(this.__bS,this);
}
if(!j&&window.onerror){window.onerror=null;
}}},__bS:function(d,e,f){if(this.__bQ){this.handleError(new qx.core.WindowError(d,e,f));
return true;
}},observeMethod:function(h){if(qx.core.Setting.get(c)===b){var self=this;
return function(){if(!self.__bQ){return h.apply(this,arguments);
}
try{return h.apply(this,arguments);
}catch(g){self.handleError(g);
}};
}else{return h;
}},handleError:function(l){if(this.__bQ){this.__bQ.call(this.__bR,l);
}}},defer:function(i){qx.core.Setting.define(c,b);
i.setErrorHandler(null,null);
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
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(e,f){},registerEvent:function(b,c,d){},unregisterEvent:function(g,h,i){}}});
})();
(function(){var v="load",u="unload",t="qx.client",s="ready",r="mshtml",q="qx.event.handler.Application",p="complete",o="gecko|opera|webkit",n="left",m="_window",k="DOMContentLoaded",l="shutdown";
qx.Class.define(q,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(i){arguments.callee.base.call(this);
this._window=i.getWindow();
this.__bW=false;
this.__bX=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,__bY:false,onScriptLoaded:function(){this.__bY=true;
var f=qx.event.handler.Application.$$instance;

if(f){f.__cc();
}}},members:{canHandleEvent:function(g,h){},registerEvent:function(a,b,c){},unregisterEvent:function(x,y,z){},__ca:null,__bW:null,__bX:null,__cb:null,__cc:function(){var d=qx.event.handler.Application;
if(!this.__ca&&this.__bW&&d.__bY){this.__ca=true;
qx.event.Registration.fireEvent(this._window,s);
}},isApplicationReady:function(){return this.__ca;
},_initObserver:function(){if(qx.$$domReady||document.readyState==p){this.__bW=true;
this.__cc();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(t,o)){qx.bom.Event.addNativeListener(this._window,k,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(t,r)){var e=function(){try{document.documentElement.doScroll(n);
this._onNativeLoadWrapped();
}catch(j){window.setTimeout(e,100);
}};
e();
}qx.bom.Event.addNativeListener(this._window,v,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,u,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,v,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,u,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__bW=true;
this.__cc();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cb){this.__cb=true;

try{qx.event.Registration.fireEvent(this._window,l);
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._disposeFields(m);
},defer:function(w){qx.event.Registration.addHandler(w);
}});
})();
(function(){var j="qx.util.ObjectPool",h="Integer";
qx.Class.define(j,{extend:qx.core.Object,construct:function(g){arguments.callee.base.call(this);
this.__cd={};

if(g!==undefined){this.setSize(g);
}},properties:{size:{check:h,init:null,nullable:true}},members:{__cd:null,getObject:function(a){if(this.$$disposed){return;
}
if(!a){throw new Error("Class needs to be defined!");
}var b=null;
var c=this.__cd[a.classname];

if(c){b=c.pop();
}
if(b){b.$$pooled=false;
}else{b=new a;
}return b;
},poolObject:function(k){if(!this.__cd){return;
}var m=k.classname;
var n=this.__cd[m];

if(k.$$pooled){throw new Error("Object is already pooled: "+k);
}
if(!n){this.__cd[m]=n=[];
}var o=this.getSize()||Infinity;

if(n.length>o){this.warn("Cannot pool "+k+" because the pool is already full.");
k.dispose();
return;
}k.$$pooled=true;
n.push(k);
}},destruct:function(){var f=this.__cd;
var d,e,i,l;

for(d in f){e=f[d];

for(i=0,l=e.length;i<l;i++){e[i].dispose();
}}delete this.__cd;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){arguments.callee.base.call(this,30);
}});
})();
(function(){var g="_originalTarget",f="_relatedTarget",e="qx.event.type.Event",d="_target",c="_currentTarget";
qx.Class.define(e,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(m,n){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!m;
this._cancelable=!!n;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(o){if(o){var p=o;
}else{var p=qx.event.Pool.getInstance().getObject(this.constructor);
}p._type=this._type;
p._target=this._target;
p._currentTarget=this._currentTarget;
p._relatedTarget=this._relatedTarget;
p._originalTarget=this._originalTarget;
p._stopPropagation=this._stopPropagation;
p._bubbles=this._bubbles;
p._preventDefault=this._preventDefault;
p._cancelable=this._cancelable;
return p;
},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(k){this._type=k;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(b){this._eventPhase=b;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(a){this._target=a;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(j){this._currentTarget=j;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(q){this._relatedTarget=q;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(l){this._originalTarget=l;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(i){this._bubbles=i;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(h){this._cancelable=h;
}},destruct:function(){this._disposeFields(d,c,f,g);
}});
})();
(function(){var e="__cf",d="Better use 'getData'",c="__ce",b="Better use 'getOldData'",a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__ce:null,__cf:null,init:function(f,g,h){arguments.callee.base.call(this,false,h);
this.__ce=f;
this.__cf=g;
return this;
},clone:function(i){var j=arguments.callee.base.call(this,i);
j.__ce=this.__ce;
j.__cf=this.__cf;
return j;
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
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(c,event,d){return !event.getBubbles();
},dispatchEvent:function(f,event,g){event.setEventPhase(qx.event.type.Event.AT_TARGET);
var h=this._manager.getListeners(f,g,false);

if(h){for(var i=0,l=h.length;i<l;i++){var j=h[i].context||f;
h[i].handler.call(j,event);
}}}},defer:function(e){qx.event.Registration.addDispatcher(e);
}});
})();
(function(){var bT="get",bS="",bR="[",bQ="]",bP="last",bO="change",bN=".",bM="Number",bL="String",bK="set",cj="deepBinding",ci="item",ch="reset",cg="' (",cf="Boolean",ce=").",cd=") to the object '",cc="Integer",cb="qx.data.SingleValueBinding",ca="No event could be found for the property",bX="PositiveNumber",bY="Binding from '",bV="PositiveInteger",bW="Binding does not exist!",bU="Date";
qx.Class.define(cb,{statics:{DEBUG_ON:false,__cg:{},bind:function(a,b,c,d,f){var m=b.split(bN);
var h=this.__cn(m);
var p=[];
var q=[];
var n=[];
var k=[];
var l=a;
for(var i=0;i<m.length;i++){if(h[i]!==bS){k.push(bO);
}else{k.push(this.__ci(l,m[i]));
}p[i]=l;
if(i==m.length-1){if(h[i]!==bS){var t=h[i]===bP?l.length-1:h[i];
var g=l.getItem(t);
this.__cm(g,c,d,f,a);
n[i]=this.__co(l,k[i],c,d,f,h[i]);
}else{if(m[i]!=null&&l[bT+qx.lang.String.firstUp(m[i])]!=null){var g=l[bT+qx.lang.String.firstUp(m[i])]();
this.__cm(g,c,d,f,a);
}n[i]=this.__co(l,k[i],c,d,f);
}}else{var r={index:i,propertyNames:m,sources:p,listenerIds:n,arrayIndexValues:h,targetObject:c,targetProperty:d,options:f,listeners:q};
var o=qx.lang.Function.bind(this.__ch,this,r);
q.push(o);
n[i]=l.addListener(k[i],o);
}if(l[bT+qx.lang.String.firstUp(m[i])]==null){l=null;
}else if(h[i]!==bS){l=l[bT+qx.lang.String.firstUp(m[i])](h[i]);
}else{l=l[bT+qx.lang.String.firstUp(m[i])]();
}
if(!l){break;
}}var s={type:cj,listenerIds:n,sources:p};
this.__cp(s,a,b,c,d);
return s;
},__ch:function(bc){if(bc.options&&bc.options.onUpdate){bc.options.onUpdate(bc.sources[bc.index],bc.targetObject);
}for(var j=bc.index+1;j<bc.propertyNames.length;j++){var bg=bc.sources[j];
bc.sources[j]=null;

if(!bg){continue;
}bg.removeListenerById(bc.listenerIds[j]);
}var bg=bc.sources[bc.index];
for(var j=bc.index+1;j<bc.propertyNames.length;j++){if(bc.arrayIndexValues[j-1]!==bS){bg=bg[bT+qx.lang.String.firstUp(bc.propertyNames[j-1])](bc.arrayIndexValues[j-1]);
}else{bg=bg[bT+qx.lang.String.firstUp(bc.propertyNames[j-1])]();
}bc.sources[j]=bg;
if(!bg){this.__cj(bc.targetObject,bc.targetProperty);
break;
}if(j==bc.propertyNames.length-1){if(qx.Class.implementsInterface(bg,qx.data.IListData)){var bh=bc.arrayIndexValues[j]===bP?bg.length-1:bc.arrayIndexValues[j];
var be=bg.getItem(bh);
this.__cm(be,bc.targetObject,bc.targetProperty,bc.options,bc.sources[bc.index]);
bc.listenerIds[j]=this.__co(bg,bO,bc.targetObject,bc.targetProperty,bc.options,bc.arrayIndexValues[j]);
}else{if(bc.propertyNames[j]!=null&&bg[bT+qx.lang.String.firstUp(bc.propertyNames[j])]!=null){var be=bg[bT+qx.lang.String.firstUp(bc.propertyNames[j])]();
this.__cm(be,bc.targetObject,bc.targetProperty,bc.options,bc.sources[bc.index]);
}var bf=this.__ci(bg,bc.propertyNames[j]);
bc.listenerIds[j]=this.__co(bg,bf,bc.targetObject,bc.targetProperty,bc.options);
}}else{if(bc.listeners[j]==null){var bd=qx.lang.Function.bind(this.__ch,this,bc);
bc.listeners.push(bd);
}if(qx.Class.implementsInterface(bg,qx.data.IListData)){var bf=bO;
}else{var bf=this.__ci(bg,bc.propertyNames[j]);
}bc.listenerIds[j]=bg.addListener(bf,bc.listeners[j]);
}}},__ci:function(bi,bj){var bk=this.__cr(bi,bj);
if(bk==null){if(qx.Class.supportsEvent(bi.constructor,bj)){bk=bj;
}else if(qx.Class.supportsEvent(bi.constructor,bO+qx.lang.String.firstUp(bj))){bk=bO+qx.lang.String.firstUp(bj);
}else{throw new qx.core.AssertionError(ca,bj);
}}return bk;
},__cj:function(bl,bm){var bn=this.__cl(bl,bm);

if(bn!=null){var bo=bm.substring(bm.lastIndexOf(bN)+1,bm.length);
if(bo.charAt(bo.length-1)==bQ){this.__ck(bl,bm,null);
return;
}if(bn[ch+qx.lang.String.firstUp(bo)]!=undefined){bn[ch+qx.lang.String.firstUp(bo)]();
}else{bn[bK+qx.lang.String.firstUp(bo)](null);
}}},__ck:function(cn,co,cp){var ct=this.__cl(cn,co);

if(ct!=null){var cu=co.substring(co.lastIndexOf(bN)+1,co.length);
if(cu.charAt(cu.length-1)==bQ){var cq=cu.substring(cu.lastIndexOf(bR)+1,cu.length-1);
var cs=cu.substring(0,cu.lastIndexOf(bR));
var cr=ct[bT+qx.lang.String.firstUp(cs)]();

if(cq==bP){cq=cr.length-1;
}
if(cr!=null){cr.setItem(cq,cp);
}}else{ct[bK+qx.lang.String.firstUp(cu)](cp);
}}},__cl:function(bA,bB){var bE=bB.split(bN);
var bF=bA;
for(var i=0;i<bE.length-1;i++){try{var bD=bE[i];
if(bD.indexOf(bQ)==bD.length-1){var bC=bD.substring(bD.indexOf(bR)+1,bD.length-1);
bD=bD.substring(0,bD.indexOf(bR));
}bF=bF[bT+qx.lang.String.firstUp(bD)]();

if(bC!=null){if(bC==bP){bC=bF.length-1;
}bF=bF.getItem(bC);
bC=null;
}}catch(bG){return null;
}}return bF;
},__cm:function(G,H,I,J,K){G=this.__cq(G,H,I,J);
if(G==null){this.__cj(H,I);
}if(G!=undefined){try{this.__ck(H,I,G);
if(J&&J.onUpdate){J.onUpdate(K,H,G);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(J&&J.onSetFail){J.onSetFail(e);
}else{this.warn("Failed so set value "+G+" on "+H+". Error message: "+e);
}}}},__cn:function(U){var V=[];
for(var i=0;i<U.length;i++){var name=U[i];
if(qx.lang.String.endsWith(name,bQ)){var W=name.substring(name.indexOf(bR)+1,name.indexOf(bQ));
if(name.indexOf(bQ)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(W!==bP){if(W==bS||isNaN(parseInt(W))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(bR)!=0){U[i]=name.substring(0,name.indexOf(bR));
V[i]=bS;
V[i+1]=W;
U.splice(i+1,0,ci);
i++;
}else{V[i]=W;
U.splice(i,1,ci);
}}else{V[i]=bS;
}}return V;
},__co:function(L,M,N,O,P,Q){var R;
{};
var T=function(X,e){if(X!==bS){if(X===bP){X=L.length-1;
}var bb=L.getItem(X);
if(bb==undefined){qx.data.SingleValueBinding.__cj(N,O);
}var Y=e.getData().start;
var ba=e.getData().end;

if(X<Y||X>ba){return;
}}else{var bb=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+L+" by "+M+" to "+N+" ("+O+")");
qx.log.Logger.debug("Data before conversion: "+bb);
}bb=qx.data.SingleValueBinding.__cq(bb,N,O,P);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+bb);
}try{if(bb!=undefined){qx.data.SingleValueBinding.__ck(N,O,bb);
}else{qx.data.SingleValueBinding.__cj(N,O);
}if(P&&P.onUpdate){P.onUpdate(L,N,bb);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(P&&P.onSetFail){P.onSetFail(e);
}else{this.warn("Failed so set value "+bb+" on "+N+". Error message: "+e);
}}};
if(!Q){Q=bS;
}T=qx.lang.Function.bind(T,L,Q);
var S=L.addListener(M,T);
return S;
},__cp:function(cv,cw,cx,cy,cz){if(this.__cg[cw.toHashCode()]===undefined){this.__cg[cw.toHashCode()]=[];
}this.__cg[cw.toHashCode()].push([cv,cw,cx,cy,cz]);
},__cq:function(x,y,z,A){if(A&&A.converter){var C;

if(y.getModel){C=y.getModel();
}return A.converter(x,C);
}else{var E=this.__cl(y,z);
var F=z.substring(z.lastIndexOf(bN)+1,z.length);
if(E==null){return x;
}var D=qx.Class.getPropertyDefinition(E.constructor,F);
var B=D==null?bS:D.check;
return this.__cs(x,B);
}},__cr:function(bH,bI){var bJ=qx.Class.getPropertyDefinition(bH.constructor,bI);

if(bJ==null){return null;
}return bJ.event;
},__cs:function(ck,cl){var cm=qx.lang.Type.getClass(ck);
if((cm==bM||cm==bL)&&(cl==cc||cl==bV)){ck=parseInt(ck);
}if((cm==cf||cm==bM||cm==bU)&&cl==bL){ck=ck+bS;
}if((cm==bM||cm==bL)&&(cl==bM||cl==bX)){ck=parseFloat(ck);
}return ck;
},removeBindingFromObject:function(u,v){if(v.type==cj){for(var i=0;i<v.sources.length;i++){if(v.sources[i]){v.sources[i].removeListenerById(v.listenerIds[i]);
}}}else{u.removeListenerById(v);
}var w=this.__cg[u.toHashCode()];
if(w!=undefined){for(var i=0;i<w.length;i++){if(w[i][0]==v){qx.lang.Array.remove(w,w[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(bv){{};
var bw=this.__cg[bv.toHashCode()];
for(var i=bw.length-1;i>=0;i--){this.removeBindingFromObject(bv,bw[i][0]);
}},getAllBindingsForObject:function(bz){if(this.__cg[bz.toHashCode()]===undefined){this.__cg[bz.toHashCode()]=[];
}return this.__cg[bz.toHashCode()];
},removeAllBindings:function(){for(var bq in this.__cg){var bp=qx.core.ObjectRegistry.fromHashCode(bq);
if(bp==null){delete this.__cg[bq];
continue;
}this.removeAllBindingsForObject(bp);
}this.__cg={};
},getAllBindings:function(){return this.__cg;
},showBindingInLog:function(br,bs){var bu;
for(var i=0;i<this.__cg[br.toHashCode()].length;i++){if(this.__cg[br.toHashCode()][i][0]==bs){bu=this.__cg[br.toHashCode()][i];
break;
}}
if(bu===undefined){var bt=bW;
}else{var bt=bY+bu[1]+cg+bu[2]+cd+bu[3]+cg+bu[4]+ce;
}qx.log.Logger.debug(bt);
},showAllBindingsInLog:function(){for(var by in this.__cg){var bx=qx.core.ObjectRegistry.fromHashCode(by);

for(var i=0;i<this.__cg[by].length;i++){this.showBindingInLog(bx,this.__cg[by][i][0]);
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
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(e,f){return qx.Class.supportsEvent(e.constructor,f);
},registerEvent:function(b,c,d){},unregisterEvent:function(h,i,j){}},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeFields:function(b,c){var name;

for(var i=0,l=c.length;i<l;i++){var name=c[i];

if(b[name]==null||!b.hasOwnProperty(name)){continue;
}b[name]=null;
}},disposeObjects:function(o,p){var name;

for(var i=0,l=p.length;i<l;i++){name=p[i];

if(o[name]==null||!o.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(o[name].dispose){o[name].dispose();
}else{throw new Error("Has no disposable object under key: "+name+"!");
}}o[name]=null;
}},disposeArray:function(d,e){var g=d[e];

if(!g){return;
}if(qx.core.ObjectRegistry.inShutDown){d[e]=null;
return;
}try{var f;

for(var i=g.length-1;i>=0;i--){f=g[i];

if(f){f.dispose();
}}}catch(q){throw new Error("The array field: "+e+" of object: "+d+" has non disposable entries: "+q);
}g.length=0;
d[e]=null;
},disposeMap:function(j,k){var m=j[k];

if(!m){return;
}if(qx.core.ObjectRegistry.inShutDown){j[k]=null;
return;
}try{for(var n in m){if(m.hasOwnProperty(n)){m[n].dispose();
}}}catch(h){throw new Error("The map field: "+k+" of object: "+j+" has non disposable entries: "+h);
}j[k]=null;
}}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Bootstrap.define(G,{statics:{__cv:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__cw:function(K,L){return function(s){return K.prototype[L].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cx:function(){var M=qx.lang.Generics.__cv;

for(var Q in M){var O=window[Q];
var N=M[Q];

for(var i=0,l=N.length;i<l;i++){var P=N[i];

if(!O[P]){O[P]=qx.lang.Generics.__cw(O,P);
}}}}},defer:function(J){J.__cx();
}});
})();
(function(){var m='<div style="',l='"></div>',k="mshtml",j='"/>',i="",h='" style="vertical-align:top;',g="scale",f="qx.client",e="qx.ui.decoration.Util",d='<img src="',c="overflow:hidden;";
qx.Class.define(e,{statics:{insetsModified:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var n=qx.theme.manager.Decoration.getInstance();
var p=n.resolve(a).getInsets();
var o=n.resolve(b).getInsets();

if(p.top!=o.top||p.right!=o.right||p.bottom!=o.bottom||p.left!=o.left){return true;
}return false;
},generateBackgroundMarkup:function(q,r,s,top,t){if(q){var u=qx.util.AliasManager.getInstance().resolve(q);
if(r==g){var v=qx.util.ResourceManager.getInstance().toUri(u);
return d+v+h+t+j;
}else{var back=qx.bom.element.Background.compile(u,r,s,top);
return m+back+t+l;
}}else{if(t){if(qx.core.Variant.isSet(f,k)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){t+=c;
}}return m+t+l;
}else{return i;
}}}}});
})();
(function(){var h="decoration",g="object",f="_applyTheme",e="__cy",d="qx.theme.manager.Decoration",c="Theme",b="string",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:c,nullable:true,apply:f}},members:{__cy:null,resolve:function(q){if(!q){return null;
}
if(typeof q===g){return q;
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
},isValidPropertyValue:function(o){if(typeof o===b){return this.isDynamic(o);
}else if(typeof o===g){var p=o.constructor;
return qx.Class.hasInterface(p,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(i){if(!i){return false;
}var j=this.getTheme();

if(!j){return false;
}return !!j.decorations[i];
},_applyTheme:function(k,l){var n=qx.util.AliasManager.getInstance();
if(k){n.add(h,k.resource);
}else{n.remove(h);
}
if(l){for(var m in l.aliases){n.remove(m);
}}
if(k){for(var m in k.aliases){n.add(m,k.aliases[m]);
}}
if(!k){this.__cy={};
}}},destruct:function(){this._disposeMap(e);
}});
})();
(function(){var g="_dynamic",f="qx.util.ValueManager",e="abstract";
qx.Class.define(f,{type:e,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(d){return this._dynamic[d];
},isDynamic:function(c){return !!this._dynamic[c];
},resolve:function(a){if(a&&this._dynamic[a]){return this._dynamic[a];
}return a;
},_setDynamic:function(b){this._dynamic=b;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._disposeFields(g);
}});
})();
(function(){var o="/",n="0",m="qx/static",l="http://",k="https://",j="file://",i="qx.util.AliasManager",h="__cz",g="singleton",f=".",e="static";
qx.Class.define(i,{type:g,extend:qx.util.ValueManager,construct:function(){arguments.callee.base.call(this);
this.__cz={};
this.add(e,m);
},members:{__cz:null,_preprocess:function(a){var d=this._getDynamic();

if(d[a]===false){return a;
}else if(d[a]===undefined){if(a.charAt(0)===o||a.charAt(0)===f||a.indexOf(l)===0||a.indexOf(k)===n||a.indexOf(j)===0){d[a]=false;
return a;
}
if(this.__cz[a]){return this.__cz[a];
}var c=a.substring(0,a.indexOf(o));
var b=this.__cz[c];

if(b!==undefined){d[a]=b+a.substring(c.length);
}}return a;
},add:function(p,q){this.__cz[p]=q;
var s=this._getDynamic();
for(var r in s){if(r.substring(0,r.indexOf(o))===p){s[r]=q+r.substring(p.length);
}}},remove:function(t){delete this.__cz[t];
},resolve:function(u){var v=this._getDynamic();

if(u!==null){u=this._preprocess(u);
}return v[u]||u;
}},destruct:function(){this._disposeFields(h);
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
(function(){var I="/",H="mshtml",G="qx.client",F="string",E="",D="?",C="Use 'getInstance().isClippedImage' instead!",B="Use 'getInstance().getImageWidth' instead!",A="Use 'getInstance().has' instead!",z="Use 'getInstance().getImageFormat' instead!",v="Use 'getInstance().getData' instead!",y="Use 'getInstance().getImageHeight' instead!",x="Use 'getInstance().toUri' instead!",u="qx.util.ResourceManager",t="singleton",w="qx.isSource";
qx.Class.define(u,{extend:qx.core.Object,type:t,statics:{__cB:qx.$$resources||{},__cC:{},has:function(P){qx.log.Logger.deprecatedMethodWarning(arguments.callee,A);
return this.getInstance().has(P);
},getData:function(a){qx.log.Logger.deprecatedMethodWarning(arguments.callee,v);
return this.getInstance().getData(a);
},getImageWidth:function(s){qx.log.Logger.deprecatedMethodWarning(arguments.callee,B);
return this.getInstance().getImageWidth(s);
},getImageHeight:function(N){qx.log.Logger.deprecatedMethodWarning(arguments.callee,y);
return this.getInstance().getImageHeight(N);
},getImageFormat:function(Q){qx.log.Logger.deprecatedMethodWarning(arguments.callee,z);
return this.getInstance().getImageFormat(Q);
},isClippedImage:function(J){qx.log.Logger.deprecatedMethodWarning(arguments.callee,C);
return this.getInstance().isClippedImage(J);
},toUri:function(O){qx.log.Logger.deprecatedMethodWarning(arguments.callee,x);
return this.getInstance().toUri(O);
}},members:{has:function(K){return !!arguments.callee.self.__cB[K];
},getData:function(d){return arguments.callee.self.__cB[d]||null;
},getImageWidth:function(b){var c=arguments.callee.self.__cB[b];
return c?c[0]:null;
},getImageHeight:function(i){var j=arguments.callee.self.__cB[i];
return j?j[1]:null;
},getImageFormat:function(L){var M=arguments.callee.self.__cB[L];
return M?M[2]:null;
},isClippedImage:function(q){var r=arguments.callee.self.__cB[q];
return r&&r.length>4;
},toUri:function(e){if(e==null){return e;
}var f=arguments.callee.self.__cB[e];

if(!f){return e;
}
if(typeof f===F){var h=f;
}else{var h=f[3];
if(!h){return e;
}}var g=E;

if(qx.core.Variant.isSet(G,H)&&qx.bom.client.Feature.SSL){g=arguments.callee.self.__cC[h];
}return g+qx.$$libraries[h].resourceUri+I+e;
}},defer:function(k){if(qx.core.Variant.isSet(G,H)){if(qx.bom.client.Feature.SSL){for(var o in qx.$$libraries){var m=qx.$$libraries[o].resourceUri;
if(m.match(/^\/\//)!=null){k.__cC[o]=window.location.protocol;
}else if(m.match(/^\.\//)!=null&&qx.core.Setting.get(w)){var l=document.URL;
k.__cC[o]=l.substring(0,l.lastIndexOf(I));
}else if(m.match(/^http/)!=null){}else{var p=window.location.href.indexOf(D);
var n;

if(p==-1){n=window.location.href;
}else{n=window.location.href.substring(0,p);
}k.__cC[o]=n.substring(0,n.lastIndexOf(I)+1);
}}}}}});
})();
(function(){var y="number",x="0",w="px",v=";",u="background-image:url(",t=");",s="",r=")",q="background-repeat:",p=" ",m="qx.bom.element.Background",o="url(",n="background-position:";
qx.Class.define(m,{statics:{__cD:[u,null,t,n,null,v,q,null,v],__cE:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__cF:function(F,top){var G=qx.bom.client.Engine;

if(G.GECKO&&G.VERSION<1.9&&F==top&&typeof F==y){top+=0.01;
}
if(F){var H=(typeof F==y)?F+w:F;
}else{H=x;
}
if(top){var I=(typeof top==y)?top+w:top;
}else{I=x;
}return H+p+I;
},compile:function(g,h,i,top){var j=this.__cF(i,top);
var k=qx.util.ResourceManager.getInstance().toUri(g);
var l=this.__cD;
l[1]=k;
l[4]=j;
l[7]=h;
return l.join(s);
},getStyles:function(a,b,c,top){if(!a){return this.__cE;
}var d=this.__cF(c,top);
var e=qx.util.ResourceManager.getInstance().toUri(a);
var f={backgroundPosition:d,backgroundImage:o+e+r};

if(b!=null){f.backgroundRepeat=b;
}return f;
},set:function(z,A,B,C,top){var D=this.getStyles(A,B,C,top);

for(var E in D){z.style[E]=D[E];
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
(function(){var K=",",J="rgb(",I=")",H="qx.theme.manager.Color",G="qx.util.ColorUtil";
qx.Class.define(G,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42],grey:[128,128,128]},isNamedColor:function(V){return this.NAMED[V]!==undefined;
},isSystemColor:function(a){return this.SYSTEM[a]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(H);
},isThemedColor:function(L){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(L);
},stringToRgb:function(S){if(this.supportsThemes()&&this.isThemedColor(S)){var S=qx.theme.manager.Color.getInstance().resolveDynamic(S);
}
if(this.isNamedColor(S)){return this.NAMED[S];
}else if(this.isSystemColor(S)){throw new Error("Could not convert system colors to RGB: "+S);
}else if(this.isRgbString(S)){return this.__cG();
}else if(this.isHex3String(S)){return this.__cI();
}else if(this.isHex6String(S)){return this.__cJ();
}throw new Error("Could not parse color: "+S);
},cssStringToRgb:function(y){if(this.isNamedColor(y)){return this.NAMED[y];
}else if(this.isSystemColor(y)){throw new Error("Could not convert system colors to RGB: "+y);
}else if(this.isRgbString(y)){return this.__cG();
}else if(this.isRgbaString(y)){return this.__cH();
}else if(this.isHex3String(y)){return this.__cI();
}else if(this.isHex6String(y)){return this.__cJ();
}throw new Error("Could not parse color: "+y);
},stringToRgbString:function(bi){return this.rgbToRgbString(this.stringToRgb(bi));
},rgbToRgbString:function(z){return J+z[0]+K+z[1]+K+z[2]+I;
},rgbToHexString:function(d){return (qx.lang.String.pad(d[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(d[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(d[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(N){return this.isThemedColor(N)||this.isNamedColor(N)||this.isHex3String(N)||this.isHex6String(N)||this.isRgbString(N);
},isCssString:function(e){return this.isSystemColor(e)||this.isNamedColor(e)||this.isHex3String(e)||this.isHex6String(e)||this.isRgbString(e);
},isHex3String:function(M){return this.REGEXP.hex3.test(M);
},isHex6String:function(c){return this.REGEXP.hex6.test(c);
},isRgbString:function(T){return this.REGEXP.rgb.test(T);
},isRgbaString:function(bh){return this.REGEXP.rgba.test(bh);
},__cG:function(){var bf=parseInt(RegExp.$1,10);
var be=parseInt(RegExp.$2,10);
var bd=parseInt(RegExp.$3,10);
return [bf,be,bd];
},__cH:function(){var Q=parseInt(RegExp.$1,10);
var P=parseInt(RegExp.$2,10);
var O=parseInt(RegExp.$3,10);
return [Q,P,O];
},__cI:function(){var C=parseInt(RegExp.$1,16)*17;
var B=parseInt(RegExp.$2,16)*17;
var A=parseInt(RegExp.$3,16)*17;
return [C,B,A];
},__cJ:function(){var F=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var E=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var D=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [F,E,D];
},hex3StringToRgb:function(bg){if(this.isHex3String(bg)){return this.__cI(bg);
}throw new Error("Invalid hex3 value: "+bg);
},hex6StringToRgb:function(U){if(this.isHex6String(U)){return this.__cJ(U);
}throw new Error("Invalid hex6 value: "+U);
},hexStringToRgb:function(R){if(this.isHex3String(R)){return this.__cI(R);
}
if(this.isHex6String(R)){return this.__cJ(R);
}throw new Error("Invalid hex value: "+R);
},rgbToHsb:function(h){var k,l,n;
var x=h[0];
var u=h[1];
var j=h[2];
var w=(x>u)?x:u;

if(j>w){w=j;
}var m=(x<u)?x:u;

if(j<m){m=j;
}n=w/255.0;

if(w!=0){l=(w-m)/w;
}else{l=0;
}
if(l==0){k=0;
}else{var s=(w-x)/(w-m);
var v=(w-u)/(w-m);
var o=(w-j)/(w-m);

if(x==w){k=o-v;
}else if(u==w){k=2.0+s-o;
}else{k=4.0+v-s;
}k=k/6.0;

if(k<0){k=k+1.0;
}}return [Math.round(k*360),Math.round(l*100),Math.round(n*100)];
},hsbToRgb:function(W){var i,f,p,q,t;
var X=W[0]/360;
var Y=W[1]/100;
var ba=W[2]/100;

if(X>=1.0){X%=1.0;
}
if(Y>1.0){Y=1.0;
}
if(ba>1.0){ba=1.0;
}var bb=Math.floor(255*ba);
var bc={};

if(Y==0.0){bc.red=bc.green=bc.blue=bb;
}else{X*=6.0;
i=Math.floor(X);
f=X-i;
p=Math.floor(bb*(1.0-Y));
q=Math.floor(bb*(1.0-(Y*f)));
t=Math.floor(bb*(1.0-(Y*(1.0-f))));

switch(i){case 0:bc.red=bb;
bc.green=t;
bc.blue=p;
break;
case 1:bc.red=q;
bc.green=bb;
bc.blue=p;
break;
case 2:bc.red=p;
bc.green=bb;
bc.blue=t;
break;
case 3:bc.red=p;
bc.green=q;
bc.blue=bb;
break;
case 4:bc.red=t;
bc.green=p;
bc.blue=bb;
break;
case 5:bc.red=bb;
bc.green=p;
bc.blue=q;
break;
}}return bc;
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var I="px",H="div",G="img",F="qx.client",E="",D="scale-x",C="mshtml",B="no-repeat",A="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",z="scale-y",ba="repeat",Y=".png",X="scale",W="webkit",V='<div style="',U="repeat-y",T='<img src="',S="qx.bom.element.Decoration",R="png",Q="', sizingMethod='scale')",O="', sizingMethod='crop')",P='"/>',M='" style="',N="none",K="repeat-x",L='"></div>',J="absolute";
qx.Class.define(S,{statics:{DEBUG:false,__cK:qx.core.Variant.isSet(F,C)&&qx.bom.client.Engine.VERSION<9,__cL:qx.core.Variant.select(F,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__cM:{"scale-x":G,"scale-y":G,"scale":G,"repeat":H,"no-repeat":H,"repeat-x":H,"repeat-y":H},update:function(c,d,e,f){var h=this.getTagName(e,d);

if(h!=c.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var i=this.getAttributes(d,e,f);

if(h===G){c.src=i.src;
}if(c.style.backgroundPosition!=E&&i.style.backgroundPosition===undefined){i.style.backgroundPosition=null;
}if(c.style.clip!=E&&i.style.clip===undefined){i.style.clip=null;
}var g=qx.bom.element.Style;
g.setStyles(c,i.style);
},create:function(bb,bc,bd){var be=this.getTagName(bc,bb);
var bh=this.getAttributes(bb,bc,bd);
var bf=qx.bom.element.Style.compile(bh.style);

if(be===G){return T+bh.src+M+bf+P;
}else{return V+bf+L;
}},getTagName:function(a,b){if(qx.core.Variant.isSet(F,C)){if(b&&this.__cK&&this.__cL[a]&&qx.lang.String.endsWith(b,Y)){return H;
}}return this.__cM[a];
},getAttributes:function(j,k,l){var p=qx.util.ResourceManager.getInstance();
var u=qx.io2.ImageLoader;
var v=qx.bom.element.Background;

if(!l){l={};
}
if(!l.position){l.position=J;
}
if(qx.core.Variant.isSet(F,C)){l.fontSize=0;
l.lineHeight=0;
}else if(qx.core.Variant.isSet(F,W)){l.WebkitUserDrag=N;
}var t=p.getImageWidth(j)||u.getWidth(j);
var s=p.getImageHeight(j)||u.getHeight(j);
var q=p.getImageFormat(j)||u.getFormat(j);
{};
if(this.__cK&&this.__cL[k]&&q===R){if(l.width==null&&t!=null){l.width=t+I;
}
if(l.height==null&&s!=null){l.height=s+I;
}
if(k==B){l.filter=A+p.toUri(j)+O;
}else{l.filter=A+p.toUri(j)+Q;
}l.backgroundImage=l.backgroundRepeat=E;
return {style:l};
}else{if(k===X){var r=p.toUri(j);

if(l.width==null&&t!=null){l.width=t+I;
}
if(l.height==null&&s!=null){l.height=s+I;
}return {src:r,style:l};
}var o=p.isClippedImage(j);

if(k===D||k===z){if(o){if(k===D){var x=p.getData(j);
var y=p.getImageHeight(x[4]);
var r=p.toUri(x[4]);
l.clip={top:-x[6],height:s};
l.height=y+I;
if(l.top!=null){l.top=(parseInt(l.top,10)+x[6])+I;
}else if(l.bottom!=null){l.bottom=(parseInt(l.bottom,10)+s-y-x[6])+I;
}return {src:r,style:l};
}else{var x=p.getData(j);
var w=p.getImageWidth(x[4]);
var r=p.toUri(x[4]);
l.clip={left:-x[5],width:t};
l.width=w+I;
if(l.left!=null){l.left=(parseInt(l.left,10)+x[5])+I;
}else if(l.right!=null){l.right=(parseInt(l.right,10)+t-w-x[5])+I;
}return {src:r,style:l};
}}else{{};

if(k==D){l.height=s==null?null:s+I;
}else if(k==z){l.width=t==null?null:t+I;
}var r=p.toUri(j);
return {src:r,style:l};
}}else{if(o&&k!==ba){var x=p.getData(j);
var n=v.getStyles(x[4],k,x[5],x[6]);

for(var m in n){l[m]=n[m];
}
if(t!=null&&l.width==null&&(k==U||k===B)){l.width=t+I;
}
if(s!=null&&l.height==null&&(k==K||k===B)){l.height=s+I;
}return {style:l};
}else{{};
var n=v.getStyles(j,k);

for(var m in n){l[m]=n[m];
}
if(t!=null&&l.width==null){l.width=t+I;
}
if(s!=null&&l.height==null){l.height=s+I;
}if(l.filter){l.filter=E;
}return {style:l};
}}}}}});
})();
(function(){var y="qx.client",x="",w="boxSizing",v="cursor",u="opacity",t="clip",s="overflowY",r="overflowX",q="user-select",p="userSelect",bb="appearance",ba="style",Y="MozUserModify",X="px",W="-webkit-appearance",V="styleFloat",U="-webkit-user-select",T="-moz-appearance",S="pixelHeight",R="MozAppearance",F=":",G="pixelTop",D="pixelLeft",E="text-overflow",B="-moz-user-select",C="MozUserSelect",z="qx.bom.element.Style",A="-moz-user-modify",H="-webkit-user-modify",I="WebkitUserSelect",L="-o-text-overflow",K="pixelRight",N="cssFloat",M="pixelWidth",P="pixelBottom",O=";",J="WebkitUserModify",Q="WebkitAppearance";
qx.Class.define(z,{statics:{__cN:{styleNames:{"float":qx.core.Variant.select(y,{"mshtml":V,"default":N}),"appearance":qx.core.Variant.select(y,{"gecko":R,"webkit":Q,"default":bb}),"userSelect":qx.core.Variant.select(y,{"gecko":C,"webkit":I,"default":p}),"userModify":qx.core.Variant.select(y,{"gecko":Y,"webkit":J,"default":p})},cssNames:{"appearance":qx.core.Variant.select(y,{"gecko":T,"webkit":W,"default":bb}),"userSelect":qx.core.Variant.select(y,{"gecko":B,"webkit":U,"default":q}),"userModify":qx.core.Variant.select(y,{"gecko":A,"webkit":H,"default":q}),"textOverflow":qx.core.Variant.select(y,{"opera":L,"default":E})},mshtmlPixel:{width:M,height:S,left:D,right:K,top:G,bottom:P},special:{clip:1,cursor:1,opacity:1,boxSizing:1,overflowX:1,overflowY:1}},__cO:{},compile:function(bo){var bs=[];
var bw=this.__cN;
var bv=bw.special;
var bt=bw.cssNames;
var br=this.__cO;
var bu=qx.lang.String;
var name,bq,bp;

for(name in bo){bp=bo[name];

if(bp==null){continue;
}name=bt[name]||name;
if(bv[name]){switch(name){case t:bs.push(qx.bom.element.Clip.compile(bp));
break;
case v:bs.push(qx.bom.element.Cursor.compile(bp));
break;
case u:bs.push(qx.bom.element.Opacity.compile(bp));
break;
case w:bs.push(qx.bom.element.BoxSizing.compile(bp));
break;
case r:bs.push(qx.bom.element.Overflow.compileX(bp));
break;
case s:bs.push(qx.bom.element.Overflow.compileY(bp));
break;
}}else{bq=br[name];

if(!bq){bq=br[name]=bu.hyphenate(name);
}bs.push(bq,F,bp,O);
}}return bs.join(x);
},setCss:qx.core.Variant.select(y,{"mshtml":function(m,n){m.style.cssText=n;
},"default":function(b,c){b.setAttribute(ba,c);
}}),getCss:qx.core.Variant.select(y,{"mshtml":function(o){return o.style.cssText.toLowerCase();
},"default":function(a){return a.getAttribute(ba);
}}),COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(bk,name,bl,bm){{};
var bn=this.__cN;
name=bn.styleNames[name]||name;
if(bm!==false&&bn.special[name]){switch(name){case t:return qx.bom.element.Clip.set(bk,bl);
case v:return qx.bom.element.Cursor.set(bk,bl);
case u:return qx.bom.element.Opacity.set(bk,bl);
case w:return qx.bom.element.BoxSizing.set(bk,bl);
case r:return qx.bom.element.Overflow.setX(bk,bl);
case s:return qx.bom.element.Overflow.setY(bk,bl);
}}bk.style[name]=bl!==null?bl:x;
},setStyles:function(bx,by,bz){{};

for(var name in by){this.set(bx,name,by[name],bz);
}},reset:function(d,name,e){var f=this.__cN;
name=f.styleNames[name]||name;
if(e!==false&&f.special[name]){switch(name){case t:return qx.bom.element.Clip.reset(d);
case v:return qx.bom.element.Cursor.reset(d);
case u:return qx.bom.element.Opacity.reset(d);
case w:return qx.bom.element.BoxSizing.reset(d);
case r:return qx.bom.element.Overflow.resetX(d);
case s:return qx.bom.element.Overflow.resetY(d);
}}d.style[name]=x;
},get:qx.core.Variant.select(y,{"mshtml":function(bc,name,bd,be){var bj=this.__cN;
name=bj.styleNames[name]||name;
if(be!==false&&bj.special[name]){switch(name){case t:return qx.bom.element.Clip.get(bc,bd);
case v:return qx.bom.element.Cursor.get(bc,bd);
case u:return qx.bom.element.Opacity.get(bc,bd);
case w:return qx.bom.element.BoxSizing.get(bc,bd);
case r:return qx.bom.element.Overflow.getX(bc,bd);
case s:return qx.bom.element.Overflow.getY(bc,bd);
}}if(!bc.currentStyle){return bc.style[name]||x;
}switch(bd){case this.LOCAL_MODE:return bc.style[name]||x;
case this.CASCADED_MODE:return bc.currentStyle[name]||x;
default:var bi=bc.currentStyle[name]||x;
if(/^-?[\.\d]+(px)?$/i.test(bi)){return bi;
}var bh=bj.mshtmlPixel[name];

if(bh){var bf=bc.style[name];
bc.style[name]=bi||0;
var bg=bc.style[bh]+X;
bc.style[name]=bf;
return bg;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(bi)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return bi;
}},"default":function(g,name,h,i){var l=this.__cN;
name=l.styleNames[name]||name;
if(i!==false&&l.special[name]){switch(name){case t:return qx.bom.element.Clip.get(g,h);
case v:return qx.bom.element.Cursor.get(g,h);
case u:return qx.bom.element.Opacity.get(g,h);
case w:return qx.bom.element.BoxSizing.get(g,h);
case r:return qx.bom.element.Overflow.getX(g,h);
case s:return qx.bom.element.Overflow.getY(g,h);
}}switch(h){case this.LOCAL_MODE:return g.style[name]||x;
case this.CASCADED_MODE:if(g.currentStyle){return g.currentStyle[name]||x;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var j=qx.dom.Node.getDocument(g);
var k=j.defaultView.getComputedStyle(g,null);
return k?k[name]:x;
}}})}});
})();
(function(){var A="auto",z="px",y=",",x="clip:auto;",w="rect(",v=");",u="",t=")",s="qx.bom.element.Clip",r="string",o="rect(auto)",q="clip:rect(",p="clip",n="rect(auto,auto,auto,auto)";
qx.Class.define(s,{statics:{compile:function(a){if(!a){return x;
}var f=a.left;
var top=a.top;
var e=a.width;
var d=a.height;
var b,c;

if(f==null){b=(e==null?A:e+z);
f=A;
}else{b=(e==null?A:f+e+z);
f=f+z;
}
if(top==null){c=(d==null?A:d+z);
top=A;
}else{c=(d==null?A:top+d+z);
top=top+z;
}return q+top+y+b+y+c+y+f+v;
},get:function(C,D){var F=qx.bom.element.Style.get(C,p,D,false);
var K,top,I,H;
var E,G;

if(typeof F===r&&F!==A&&F!==u){F=qx.lang.String.trim(F);
if(/\((.*)\)/.test(F)){var J=RegExp.$1.split(y);
top=qx.lang.String.trim(J[0]);
E=qx.lang.String.trim(J[1]);
G=qx.lang.String.trim(J[2]);
K=qx.lang.String.trim(J[3]);
if(K===A){K=null;
}
if(top===A){top=null;
}
if(E===A){E=null;
}
if(G===A){G=null;
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
},set:function(g,h){if(!h){g.style.clip=n;
return;
}var m=h.left;
var top=h.top;
var l=h.width;
var k=h.height;
var i,j;

if(m==null){i=(l==null?A:l+z);
m=A;
}else{i=(l==null?A:m+l+z);
m=m+z;
}
if(top==null){j=(k==null?A:k+z);
top=A;
}else{j=(k==null?A:top+k+z);
top=top+z;
}g.style.clip=w+top+y+i+y+j+y+m+t;
},reset:function(B){B.style.clip=qx.bom.client.Engine.MSHTML?o:A;
}}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__cP:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(n){return f+(this.__cP[n]||n)+d;
},get:function(l,m){return qx.bom.element.Style.get(l,b,m,false);
},set:function(o,p){o.style.cursor=this.__cP[p]||p;
},reset:function(q){q.style.cursor=g;
}}});
})();
(function(){var q="",p="qx.client",o=";",n="filter",m="opacity:",l="opacity",k="MozOpacity",j=");",i=")",h="zoom:1;filter:alpha(opacity=",e="qx.bom.element.Opacity",g="alpha(opacity=",f="-moz-opacity:";
qx.Class.define(e,{statics:{compile:qx.core.Variant.select(p,{"mshtml":function(u){if(u>=1){return q;
}
if(u<0.00001){u=0;
}return h+(u*100)+j;
},"gecko":function(z){if(z==1){z=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return f+z+o;
}else{return m+z+o;
}},"default":function(a){if(a==1){return q;
}return m+a+o;
}}),set:qx.core.Variant.select(p,{"mshtml":function(C,D){var E=qx.bom.element.Style.get(C,n,qx.bom.element.Style.COMPUTED_MODE,false);
if(D>=1){C.style.filter=E.replace(/alpha\([^\)]*\)/gi,q);
return;
}
if(D<0.00001){D=0;
}if(!C.currentStyle||!C.currentStyle.hasLayout){C.style.zoom=1;
}C.style.filter=E.replace(/alpha\([^\)]*\)/gi,q)+g+D*100+i;
},"gecko":function(F,G){if(G==1){G=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){F.style.MozOpacity=G;
}else{F.style.opacity=G;
}},"default":function(A,B){if(B==1){B=q;
}A.style.opacity=B;
}}),reset:qx.core.Variant.select(p,{"mshtml":function(s){var t=qx.bom.element.Style.get(s,n,qx.bom.element.Style.COMPUTED_MODE,false);
s.style.filter=t.replace(/alpha\([^\)]*\)/gi,q);
},"gecko":function(H){if(qx.bom.client.Engine.VERSION<1.7){H.style.MozOpacity=q;
}else{H.style.opacity=q;
}},"default":function(r){r.style.opacity=q;
}}),get:qx.core.Variant.select(p,{"mshtml":function(v,w){var x=qx.bom.element.Style.get(v,n,w,false);

if(x){var y=x.match(/alpha\(opacity=(.*)\)/);

if(y&&y[1]){return parseFloat(y[1])/100;
}}return 1.0;
},"gecko":function(I,J){var K=qx.bom.element.Style.get(I,qx.bom.client.Engine.VERSION<1.7?k:l,J,false);

if(K==0.999999){K=1.0;
}
if(K!=null){return parseFloat(K);
}return 1.0;
},"default":function(b,c){var d=qx.bom.element.Style.get(b,l,c,false);

if(d!=null){return parseFloat(d);
}return 1.0;
}})}});
})();
(function(){var C="qx.client",B="",A="boxSizing",z="box-sizing",y=":",x="border-box",w="qx.bom.element.BoxSizing",v="KhtmlBoxSizing",u="-moz-box-sizing",t="WebkitBoxSizing",q=";",s="-khtml-box-sizing",r="content-box",p="-webkit-box-sizing",o="MozBoxSizing";
qx.Class.define(w,{statics:{__cQ:qx.core.Variant.select(C,{"mshtml":null,"webkit":[A,v,t],"gecko":[o],"opera":[A]}),__cR:qx.core.Variant.select(C,{"mshtml":null,"webkit":[z,s,p],"gecko":[u],"opera":[z]}),__cS:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__cT:function(g){var h=this.__cS;
return h.tags[g.tagName.toLowerCase()]||h.types[g.type];
},compile:qx.core.Variant.select(C,{"mshtml":function(D){{};
},"default":function(b){var d=this.__cR;
var c=B;

if(d){for(var i=0,l=d.length;i<l;i++){c+=d[i]+y+b+q;
}}return c;
}}),get:qx.core.Variant.select(C,{"mshtml":function(a){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(a))){if(!this.__cT(a)){return r;
}}return x;
},"default":function(E){var G=this.__cQ;
var F;

if(G){for(var i=0,l=G.length;i<l;i++){F=qx.bom.element.Style.get(E,G[i],null,false);

if(F!=null&&F!==B){return F;
}}}return B;
}}),set:qx.core.Variant.select(C,{"mshtml":function(e,f){{};
},"default":function(k,m){var n=this.__cQ;

if(n){for(var i=0,l=n.length;i<l;i++){k.style[n[i]]=m;
}}}}),reset:function(j){this.set(j,B);
}}});
})();
(function(){var k="CSS1Compat",j="qx.bom.Document";
qx.Class.define(j,{statics:{isQuirksMode:function(a){return (a||window).document.compatMode!==k;
},isStandardMode:function(l){return (l||window).document.compatMode===k;
},getWidth:function(f){var g=(f||window).document;
var i=qx.bom.Viewport.getWidth(f);
var h=(qx.bom.client.Engine.OPERA&&qx.bom.client.Engine.VERSION>9.5&&qx.bom.client.Engine.VERSION<=10);
var scroll=g.compatMode===k?g.documentElement.scrollWidth:g.body.scrollWidth;
return h?i:Math.max(scroll,i);
},getHeight:function(b){var c=(b||window).document;
var e=qx.bom.Viewport.getHeight(b);
var d=(qx.bom.client.Engine.OPERA&&qx.bom.client.Engine.VERSION>9.5&&qx.bom.client.Engine.VERSION<=10);
var scroll=c.compatMode===k?c.documentElement.scrollHeight:c.body.scrollHeight;
return d?e:Math.max(scroll,e);
}}});
})();
(function(){var f="qx.client",e="CSS1Compat",d="qx.bom.Viewport";
qx.Class.define(d,{statics:{getWidth:qx.core.Variant.select(f,{"opera":function(c){return (c||window).document.body.clientWidth;
},"webkit":function(b){return (b||window).innerWidth;
},"default":function(j){var k=(j||window).document;
return k.compatMode===e?k.documentElement.clientWidth:k.body.clientWidth;
}}),getHeight:qx.core.Variant.select(f,{"opera":function(a){return (a||window).document.body.clientHeight;
},"webkit":function(n){return (n||window).innerHeight;
},"default":function(h){var i=(h||window).document;
return i.compatMode===e?i.documentElement.clientHeight:i.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(f,{"mshtml":function(l){var m=(l||window).document;
return m.documentElement.scrollLeft||m.body.scrollLeft;
},"default":function(q){return (q||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(f,{"mshtml":function(o){var p=(o||window).document;
return p.documentElement.scrollTop||p.body.scrollTop;
},"default":function(g){return (g||window).pageYOffset;
}})}});
})();
(function(){var q="",p="qx.client",o="hidden",n="-moz-scrollbars-none",m="overflow",l=";",k="overflowY",j=":",i="overflowX",h="overflow:",E="none",D="scroll",C="borderLeftStyle",B="borderRightStyle",A="div",z="borderRightWidth",y="overflow-y",x="borderLeftWidth",w="-moz-scrollbars-vertical",v="100px",r="qx.bom.element.Overflow",u="overflow-x";
qx.Class.define(r,{statics:{__cU:null,getScrollbarWidth:function(){if(this.__cU!==null){return this.__cU;
}var bx=qx.bom.element.Style;
var bz=function(F,G){return parseInt(bx.get(F,G))||0;
};
var bA=function(bN){return (bx.get(bN,B)==E?0:bz(bN,z));
};
var by=function(bu){return (bx.get(bu,C)==E?0:bz(bu,x));
};
var bC=qx.core.Variant.select(p,{"mshtml":function(W){if(bx.get(W,k)==o||W.clientWidth==0){return bA(W);
}return Math.max(0,W.offsetWidth-W.clientLeft-W.clientWidth);
},"default":function(cd){if(cd.clientWidth==0){var ce=bx.get(cd,m);
var cf=(ce==D||ce==w?16:0);
return Math.max(0,bA(cd)+cf);
}return Math.max(0,(cd.offsetWidth-cd.clientWidth-by(cd)));
}});
var bB=function(bd){return bC(bd)-bA(bd);
};
var t=document.createElement(A);
var s=t.style;
s.height=s.width=v;
s.overflow=D;
document.body.appendChild(t);
var c=bB(t);
this.__cU=c?c:16;
document.body.removeChild(t);
return this.__cU;
},_compile:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bG,bH){if(bH==o){bH=n;
}return h+bH+l;
}:
function(S,T){return S+j+T+l;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bb,bc){return h+bc+l;
}:
function(Q,R){return Q+j+R+l;
},"default":function(O,P){return O+j+P+l;
}}),compileX:function(bI){return this._compile(u,bI);
},compileY:function(d){return this._compile(y,d);
},getX:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bj,bk){var bl=qx.bom.element.Style.get(bj,m,bk,false);

if(bl===n){bl=o;
}return bl;
}:
function(M,N){return qx.bom.element.Style.get(M,i,N,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bY,ca){return qx.bom.element.Style.get(bY,m,ca,false);
}:
function(bT,bU){return qx.bom.element.Style.get(bT,i,bU,false);
},"default":function(bs,bt){return qx.bom.element.Style.get(bs,i,bt,false);
}}),setX:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bD,bE){if(bE==o){bE=n;
}bD.style.overflow=bE;
}:
function(bh,bi){bh.style.overflowX=bi;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(f,g){f.style.overflow=g;
}:
function(bJ,bK){bJ.style.overflowX=bK;
},"default":function(Y,ba){Y.style.overflowX=ba;
}}),resetX:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bV){bV.style.overflow=q;
}:
function(L){L.style.overflowX=q;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(H,I){H.style.overflow=q;
}:
function(cb,cc){cb.style.overflowX=q;
},"default":function(bg){bg.style.overflowX=q;
}}),getY:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bO,bP){var bQ=qx.bom.element.Style.get(bO,m,bP,false);

if(bQ===n){bQ=o;
}return bQ;
}:
function(bR,bS){return qx.bom.element.Style.get(bR,k,bS,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bm,bn){return qx.bom.element.Style.get(bm,m,bn,false);
}:
function(be,bf){return qx.bom.element.Style.get(be,k,bf,false);
},"default":function(bW,bX){return qx.bom.element.Style.get(bW,k,bX,false);
}}),setY:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bq,br){if(br===o){br=n;
}bq.style.overflow=br;
}:
function(U,V){U.style.overflowY=V;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bo,bp){bo.style.overflow=bp;
}:
function(J,K){J.style.overflowY=K;
},"default":function(bL,bM){bL.style.overflowY=bM;
}}),resetY:qx.core.Variant.select(p,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(X){X.style.overflow=q;
}:
function(e){e.style.overflowY=q;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(a,b){a.style.overflow=q;
}:
function(bv,bw){bv.style.overflowY=q;
},"default":function(bF){bF.style.overflowY=q;
}})}});
})();
(function(){var h="qx.client",g="qx.io2.ImageLoader",f="load";
qx.Bootstrap.define(g,{statics:{__cV:{},__cW:{width:null,height:null},__cX:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(c){var d=this.__cV[c];
return !!(d&&d.loaded);
},isFailed:function(v){var w=this.__cV[v];
return !!(w&&w.failed);
},isLoading:function(t){var u=this.__cV[t];
return !!(u&&u.loading);
},getFormat:function(s){if(s!=null&&this.__cV[s]){return this.__cV[s]||null;
}else{return null;
}},getSize:function(z){return this.__cV[z]||this.__cW;
},getWidth:function(a){var b=this.__cV[a];
return b?b.width:null;
},getHeight:function(k){var m=this.__cV[k];
return m?m.height:null;
},load:function(A,B,C){var D=this.__cV[A];

if(!D){D=this.__cV[A]={};
}if(B&&!C){C=window;
}if(D.loaded||D.loading||D.failed){if(B){if(D.loading){D.callbacks.push(B,C);
}else{B.call(C,A,D);
}}}else{D.loading=true;
D.callbacks=[];

if(B){D.callbacks.push(B,C);
}var F=new Image();
var E=qx.lang.Function.listener(this.__cY,this,F,A);
F.onload=E;
F.onerror=E;
F.src=A;
}},__cY:qx.event.GlobalError.observeMethod(function(event,n,o){var p=this.__cV[o];
if(event.type===f){p.loaded=true;
p.width=this.__da(n);
p.height=this.__db(n);
var q=this.__cX.exec(o);

if(q!=null){p.format=q[1];
}}else{p.failed=true;
}n.onload=n.onerror=null;
var r=p.callbacks;
delete p.loading;
delete p.callbacks;
for(var i=0,l=r.length;i<l;i+=2){r[i].call(r[i+1],o,p);
}}),__da:qx.core.Variant.select(h,{"gecko":function(e){return e.naturalWidth;
},"default":function(y){return y.width;
}}),__db:qx.core.Variant.select(h,{"gecko":function(j){return j.naturalHeight;
},"default":function(x){return x.height;
}})}});
})();
(function(){var h="_window",g="_manager",f="qx.event.handler.Window";
qx.Class.define(f,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(a){arguments.callee.base.call(this);
this._manager=a;
this._window=a.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(p,q){},registerEvent:function(u,v,w){},unregisterEvent:function(r,s,t){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var o=qx.event.handler.Window.SUPPORTED_TYPES;

for(var n in o){qx.bom.Event.addNativeListener(this._window,n,this._onNativeWrapper);
}},_stopWindowObserver:function(){var c=qx.event.handler.Window.SUPPORTED_TYPES;

for(var b in c){qx.bom.Event.removeNativeListener(this._window,b,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var j=this._window;
var m=j.document;
var k=m.documentElement;
var i=e.target||e.srcElement;

if(i==null||i===j||i===m||i===k){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,j]);
qx.event.Registration.dispatchEvent(j,event);
var l=event.getReturnValue();

if(l!=null){e.returnValue=l;
return l;
}}})},destruct:function(){this._stopWindowObserver();
this._disposeFields(g,h);
},defer:function(d){qx.event.Registration.addHandler(d);
}});
})();
(function(){var f="ready",d="qx.application",c="beforeunload",b="qx.core.Init",a="shutdown";
qx.Class.define(b,{statics:{getApplication:function(){return this.__dd||null;
},__dc:function(){if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var k=qx.core.Setting.get(d);
var l=qx.Class.getByName(k);

if(l){this.__dd=new l;
var j=new Date;
this.__dd.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-j)+"ms");
var j=new Date;
this.__dd.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-j)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+k);
}},__de:function(e){var g=this.__dd;

if(g){e.setReturnValue(g.close());
}},__df:function(){var i=this.__dd;

if(i){i.terminate();
}}},defer:function(h){qx.event.Registration.addListener(window,f,h.__dc,h);
qx.event.Registration.addListener(window,a,h.__df,h);
qx.event.Registration.addListener(window,c,h.__de,h);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var e="qx.locale.MTranslation";
qx.Mixin.define(e,{members:{tr:function(f,g){var h=qx.locale.Manager;

if(h){return h.tr.apply(h,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(i,j,k,l){var m=qx.locale.Manager;

if(m){return m.trn.apply(m,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(a,b,c){var d=qx.locale.Manager;

if(d){return d.trc.apply(d,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(n){var o=qx.locale.Manager;

if(o){return o.marktr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var c="__dg",b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dg:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__dg;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__dg=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(d){},terminate:function(){}},destruct:function(){this._disposeFields(c);
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var d="Item ",c="Simple",b="myaccount.Application",a="changeSelection";
qx.Class.define(b,{extend:qx.application.Standalone,members:{main:function(){arguments.callee.base.call(this);
{};
var k=new qx.ui.container.Scroll();
var j=new qx.ui.container.Composite(new qx.ui.layout.HBox(50));
j.setPadding(20);
j.add(this.createBox1());
k.add(j,{left:20,top:20});
this.getRoot().add(k,{edge:0});
},createBox1:function(){var g=new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
g.add(new qx.ui.basic.Label(c));
var f=new qx.ui.form.SelectBox();

for(var i=0;i<30;i++){var h=new qx.ui.form.ListItem(d+(i+1));
f.add(h);
if(i==5){f.setSelection([h]);
}}f.addListener(a,function(e){this.debug("changeSelection: "+e.getData()[0]);
});
g.add(f);
return g;
}}});
})();
(function(){var c="qx.event.type.Native",b="_native",a="_returnValue";
qx.Class.define(c,{extend:qx.event.type.Event,members:{init:function(d,e,f,g,h){arguments.callee.base.call(this,g,h);
this._target=e||qx.bom.Event.getTarget(d);
this._relatedTarget=f||qx.bom.Event.getRelatedTarget(d);

if(d.timeStamp){this._timeStamp=d.timeStamp;
}this._native=d;
return this;
},clone:function(j){var k=arguments.callee.base.call(this,j);
k._native=this._native;
k._returnValue=this._returnValue;
return k;
},preventDefault:function(){arguments.callee.base.call(this);
qx.bom.Event.preventDefault(this._native);
},stop:function(){this.stopPropagation();
this.preventDefault();
},getNativeEvent:function(){return this._native;
},setReturnValue:function(i){this._returnValue=i;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._disposeFields(b,a);
}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Classic",b="Theme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(g,h){var k=null;
var n=null;
var q=null;
var r=null;
var m=null;

if(g){k=g.meta.color||null;
n=g.meta.decoration||null;
q=g.meta.font||null;
r=g.meta.icon||null;
m=g.meta.appearance||null;
}var o=qx.theme.manager.Color.getInstance();
var p=qx.theme.manager.Decoration.getInstance();
var i=qx.theme.manager.Font.getInstance();
var l=qx.theme.manager.Icon.getInstance();
var j=qx.theme.manager.Appearance.getInstance();
o.setTheme(k);
p.setTheme(n);
i.setTheme(q);
l.setTheme(r);
j.setTheme(m);
},initialize:function(){var t=qx.core.Setting;
var s,u;
s=t.get(e);

if(s){u=qx.Theme.getByName(s);

if(!u){throw new Error("The theme to use is not available: "+s);
}this.setTheme(u);
}}},settings:{"qx.theme":c}});
})();
(function(){var h="qx.theme.manager.Font",g="Theme",f="changeTheme",e="_applyTheme",d="singleton";
qx.Class.define(h,{type:d,extend:qx.util.ValueManager,properties:{theme:{check:g,nullable:true,apply:e,event:f}},members:{resolveDynamic:function(m){var n=this._dynamic;
return m instanceof qx.bom.Font?m:n[m];
},resolve:function(i){var l=this._dynamic;
var j=l[i];

if(j){return j;
}var k=this.getTheme();

if(k!==null&&k.fonts[i]){return l[i]=(new qx.bom.Font).set(k.fonts[i]);
}return i;
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
(function(){var B="",A="underline",z="Boolean",y="px",x='"',w="italic",v="normal",u="bold",t="_applyItalic",s="_applyBold",N="Integer",M="_applyFamily",L="_applyLineHeight",K="Array",J="overline",I="line-through",H="qx.bom.Font",G="Number",F="_applyDecoration",E=" ",C="_applySize",D=",";
qx.Class.define(H,{extend:qx.core.Object,construct:function(a,b){arguments.callee.base.call(this);

if(a!==undefined){this.setSize(a);
}
if(b!==undefined){this.setFamily(b);
}},statics:{fromString:function(c){var g=new qx.bom.Font();
var e=c.split(/\s+/);
var name=[];
var f;

for(var i=0;i<e.length;i++){switch(f=e[i]){case u:g.setBold(true);
break;
case w:g.setItalic(true);
break;
case A:g.setDecoration(A);
break;
default:var d=parseInt(f,10);

if(d==f||qx.lang.String.contains(f,y)){g.setSize(d);
}else{name.push(f);
}break;
}}
if(name.length>0){g.setFamily(name);
}return g;
},fromConfig:function(O){var P=new qx.bom.Font;
P.set(O);
return P;
},__dh:{fontFamily:B,fontSize:B,fontWeight:B,fontStyle:B,textDecoration:B,lineHeight:1.2},getDefaultStyles:function(){return this.__dh;
}},properties:{size:{check:N,nullable:true,apply:C},lineHeight:{check:G,nullable:true,apply:L},family:{check:K,nullable:true,apply:M},bold:{check:z,nullable:true,apply:s},italic:{check:z,nullable:true,apply:t},decoration:{check:[A,I,J],nullable:true,apply:F}},members:{__di:null,__dj:null,__dk:null,__dl:null,__dm:null,__dn:null,_applySize:function(n,o){this.__di=n===null?null:n+y;
},_applyLineHeight:function(k,m){this.__dn=k===null?null:k;
},_applyFamily:function(p,q){var r=B;

for(var i=0,l=p.length;i<l;i++){if(p[i].indexOf(E)>0){r+=x+p[i]+x;
}else{r+=p[i];
}
if(i!==l-1){r+=D;
}}this.__dj=r;
},_applyBold:function(Q,R){this.__dk=Q===null?null:Q?u:v;
},_applyItalic:function(S,T){this.__dl=S===null?null:S?w:v;
},_applyDecoration:function(h,j){this.__dm=h===null?null:h;
},getStyles:function(){return {fontFamily:this.__dj,fontSize:this.__di,fontWeight:this.__dk,fontStyle:this.__dl,textDecoration:this.__dm,lineHeight:this.__dn};
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
(function(){var x="string",w="Theme",v="_applyTheme",u="__dp",t="__do",s="qx.theme.manager.Appearance",r=":",q="changeAppearanceTheme",p="changeTheme",o="/",n="singleton";
qx.Class.define(s,{type:n,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__do={};
this.__dp={};
},properties:{appearanceTheme:{check:w,nullable:true,event:q},theme:{check:w,nullable:true,event:p,apply:v}},members:{__dq:{},__do:null,__dp:null,_applyTheme:function(a,b){this.__dp={};
this.__do={};
},__dr:function(c,d,e){var i=d.appearances;
var l=i[c];

if(!l){var m=o;
var f=[];
var k=c.split(m);
var j;

while(!l&&k.length>0){f.unshift(k.pop());
var g=k.join(m);
l=i[g];

if(l){j=l.alias||l;

if(typeof j===x){var h=j+m+f.join(m);
return this.__dr(h,d,e);
}}}if(e!=null){return this.__dr(e,d);
}return null;
}else if(typeof l===x){return this.__dr(l,d,e);
}else if(l.include&&!l.style){return this.__dr(l.include,d,e);
}return c;
},styleFrom:function(y,z,A,B){if(!A){A=this.getTheme();
}var H=this.__dp;
var C=H[y];

if(!C){C=H[y]=this.__dr(y,A,B);
}var M=A.appearances[C];

if(!M){this.warn("Missing appearance: "+y);
return null;
}if(!M.style){return null;
}var N=C;

if(z){var O=M.$$bits;

if(!O){O=M.$$bits={};
M.$$length=0;
}var F=0;

for(var I in z){if(!z[I]){continue;
}
if(O[I]==null){O[I]=1<<M.$$length++;
}F+=O[I];
}if(F>0){N+=r+F;
}}var G=this.__do;

if(G[N]!==undefined){return G[N];
}if(!z){z=this.__dq;
}var K;
if(M.include||M.base){var E=M.style(z);
var D;

if(M.include){D=this.styleFrom(M.include,z,A,B);
}K={};
if(M.base){var J=this.styleFrom(C,z,M.base,B);

if(M.include){for(var L in J){if(!D.hasOwnProperty(L)&&!E.hasOwnProperty(L)){K[L]=J[L];
}}}else{for(var L in J){if(!E.hasOwnProperty(L)){K[L]=J[L];
}}}}if(M.include){for(var L in D){if(!E.hasOwnProperty(L)){K[L]=D[L];
}}}for(var L in E){K[L]=E[L];
}}else{K=M.style(z);
}return G[N]=K||null;
}},destruct:function(){this._disposeFields(t,u);
}});
})();
(function(){var F="focusout",E="interval",D="mouseover",C="mouseout",B="mousemove",A="widget",z="qx.ui.tooltip.ToolTip",y="Boolean",x="__dt",w="_applyCurrent",t="__du",v="qx.ui.tooltip.Manager",u="tooltip-error",s="singleton",r="__ds";
qx.Class.define(v,{type:s,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
qx.event.Registration.addListener(document.body,D,this.__dC,this,true);
this.__ds=new qx.event.Timer();
this.__ds.addListener(E,this.__dz,this);
this.__dt=new qx.event.Timer();
this.__dt.addListener(E,this.__dA,this);
this.__du={left:0,top:0};
},properties:{current:{check:z,nullable:true,apply:w},showInvalidTooltips:{check:y,init:true}},members:{__du:null,__dt:null,__ds:null,__dv:null,__dw:null,__dx:function(){if(!this.__dv){this.__dv=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dv;
},__dy:function(){if(!this.__dw){this.__dw=new qx.ui.tooltip.ToolTip().set({appearance:u});
this.__dw.syncAppearance();
}return this.__dw;
},_applyCurrent:function(a,b){if(b&&qx.ui.core.Widget.contains(b,a)){return;
}if(b){b.exclude();
this.__ds.stop();
this.__dt.stop();
}var d=qx.event.Registration;
var c=document.body;
if(a){this.__ds.startWith(a.getShowTimeout());
d.addListener(c,C,this.__dD,this,true);
d.addListener(c,F,this.__dE,this,true);
d.addListener(c,B,this.__dB,this,true);
}else{d.removeListener(c,C,this.__dD,this,true);
d.removeListener(c,F,this.__dE,this,true);
d.removeListener(c,B,this.__dB,this,true);
}},__dz:function(e){var G=this.getCurrent();

if(G){this.__dt.startWith(G.getHideTimeout());

if(G.getPlaceMethod()==A){G.placeToWidget(G.getOpener());
}else{G.placeToPoint(this.__du);
}G.show();
}this.__ds.stop();
},__dA:function(e){var g=this.getCurrent();

if(g){g.exclude();
}this.__dt.stop();
this.resetCurrent();
},__dB:function(e){var f=this.__du;
f.left=e.getDocumentLeft();
f.top=e.getDocumentTop();
},__dC:function(e){var o=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!o){return;
}var p;
while(o!=null){var p=o.getToolTip();
var q=o.getToolTipText()||null;
var n=o.getToolTipIcon()||null;

if(qx.Class.hasInterface(o.constructor,qx.ui.form.IForm)&&!o.isValid()){var m=o.getInvalidMessage();
}
if(p||q||n||m){break;
}o=o.getLayoutParent();
}
if(!o){return;
}if(m&&o.getEnabled()){if(!this.getShowInvalidTooltips()){return;
}var p=this.__dy().set({label:m});
}else if(!p){var p=this.__dx().set({label:q,icon:n});
}this.setCurrent(p);
p.setOpener(o);
},__dD:function(e){var h=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!h){return;
}var i=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!i){return;
}var j=this.getCurrent();
if(j&&(i==j||qx.ui.core.Widget.contains(j,i))){return;
}if(i&&h&&qx.ui.core.Widget.contains(h,i)){return;
}if(j&&!i){this.setCurrent(null);
}else{this.resetCurrent();
}},__dE:function(e){var k=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!k){return;
}var l=this.getCurrent();
if(l&&l==k.getToolTip()){this.setCurrent(null);
}}},destruct:function(){qx.event.Registration.removeListener(document.body,D,this.__dC,this,true);
this._disposeObjects(r,x);
this._disposeFields(t);
}});
})();
(function(){var p="interval",o="qx.event.Timer",n="_applyInterval",m="_applyEnabled",l="Boolean",k="__dG",j="__dF",i="qx.event.type.Event",h="Integer";
qx.Class.define(o,{extend:qx.core.Object,construct:function(t){arguments.callee.base.call(this);
this.setEnabled(false);

if(t!=null){this.setInterval(t);
}this.__dF=qx.lang.Function.bind(this._oninterval,this);
},events:{"interval":i},statics:{once:function(a,b,c){var d=new qx.event.Timer(c);
d.addListener(p,function(e){d.stop();
a.call(b,e);
d.dispose();
b=null;
},b);
d.start();
return d;
}},properties:{enabled:{init:true,check:l,apply:m},interval:{check:h,init:1000,apply:n}},members:{__dG:null,__dF:null,_applyInterval:function(f,g){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(r,s){if(s){window.clearInterval(this.__dG);
this.__dG=null;
}else if(r){this.__dG=window.setInterval(this.__dF,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(u){this.setInterval(u);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(q){this.stop();
this.startWith(q);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.getEnabled()){this.fireEvent(p);
}})},destruct:function(){if(this.__dG){window.clearInterval(this.__dG);
}this._disposeFields(k,j);
}});
})();
(function(){var a="qx.ui.core.MChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(l){return this._indexOf(l);
},add:function(g,h){this._add(g,h);
},addAt:function(m,n,o){this._addAt(m,n,o);
},addBefore:function(i,j,k){this._addBefore(i,j,k);
},addAfter:function(c,d,e){this._addAfter(c,d,e);
},remove:function(b){this._remove(b);
},removeAt:function(f){return this._removeAt(f);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(p){p.getChildren=p._getChildren;
p.hasChildren=p._hasChildren;
p.indexOf=p._indexOf;
p.add=p._add;
p.addAt=p._addAt;
p.addBefore=p._addBefore;
p.addAfter=p._addAfter;
p.remove=p._remove;
p.removeAt=p._removeAt;
p.removeAll=p._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(c){c.getLayout=c._getLayout;
c.setLayout=c._setLayout;
}}});
})();
(function(){var G="Integer",F="_applyDimension",E="Boolean",D="_applyStretching",C="_applyMargin",B="shorthand",A="_applyAlign",z="allowShrinkY",y="__dI",x="__dM",bb="__dK",ba="__dN",Y="bottom",X="baseline",W="marginBottom",V="qx.ui.core.LayoutItem",U="center",T="marginTop",S="$$subparent",R="allowGrowX",N="middle",O="marginLeft",L="allowShrinkX",M="$$parent",J="top",K="right",H="marginRight",I="abstract",P="allowGrowY",Q="left";
qx.Class.define(V,{type:I,extend:qx.core.Object,properties:{minWidth:{check:G,nullable:true,apply:F,init:null,themeable:true},width:{check:G,nullable:true,apply:F,init:null,themeable:true},maxWidth:{check:G,nullable:true,apply:F,init:null,themeable:true},minHeight:{check:G,nullable:true,apply:F,init:null,themeable:true},height:{check:G,nullable:true,apply:F,init:null,themeable:true},maxHeight:{check:G,nullable:true,apply:F,init:null,themeable:true},allowGrowX:{check:E,apply:D,init:true,themeable:true},allowShrinkX:{check:E,apply:D,init:true,themeable:true},allowGrowY:{check:E,apply:D,init:true,themeable:true},allowShrinkY:{check:E,apply:D,init:true,themeable:true},allowStretchX:{group:[R,L],mode:B,themeable:true},allowStretchY:{group:[P,z],mode:B,themeable:true},marginTop:{check:G,init:0,apply:C,themeable:true},marginRight:{check:G,init:0,apply:C,themeable:true},marginBottom:{check:G,init:0,apply:C,themeable:true},marginLeft:{check:G,init:0,apply:C,themeable:true},margin:{group:[T,H,W,O],mode:B,themeable:true},alignX:{check:[Q,U,K],nullable:true,apply:A,themeable:true},alignY:{check:[J,N,Y,X],nullable:true,apply:A,themeable:true}},members:{__dH:null,__dI:null,__dJ:null,__dK:null,__dL:null,__dM:null,__dN:null,getBounds:function(){return this.__dM||this.__dI||null;
},clearSeparators:function(){},renderSeparator:function(q,r){},renderLayout:function(a,top,b,c){var d;
{};
var e=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var e=this._getHeightForWidth(b);
}
if(e!=null&&e!==this.__dH){this.__dH=e;
qx.ui.core.queue.Layout.add(this);
return null;
}var g=this.__dI;

if(!g){g=this.__dI={};
}var f={};

if(a!==g.left||top!==g.top){f.position=true;
g.left=a;
g.top=top;
}
if(b!==g.width||c!==g.height){f.size=true;
g.width=b;
g.height=c;
}if(this.__dJ){f.local=true;
delete this.__dJ;
}
if(this.__dL){f.margin=true;
delete this.__dL;
}return f;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__dJ;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__dJ=true;
this.__dK=null;
},getSizeHint:function(h){var i=this.__dK;

if(i){return i;
}
if(h===false){return null;
}i=this.__dK=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__dH&&this.getHeight()==null){i.height=this.__dH;
}if(!this.getAllowShrinkX()){i.minWidth=Math.max(i.minWidth,i.width);
}else if(i.minWidth>i.width&&this.getAllowGrowX()){i.width=i.minWidth;
}
if(!this.getAllowShrinkY()){i.minHeight=Math.max(i.minHeight,i.height);
}
if(i.minHeight>i.height&&this.getAllowGrowY()){i.height=i.minHeight;
}if(!this.getAllowGrowX()){i.maxWidth=Math.min(i.maxWidth,i.width);
}
if(i.width>i.maxWidth){i.width=i.maxWidth;
}
if(!this.getAllowGrowY()){i.maxHeight=Math.min(i.maxHeight,i.height);
}
if(i.height>i.maxHeight){i.height=i.maxHeight;
}return i;
},_computeSizeHint:function(){var bk=this.getMinWidth()||0;
var bh=this.getMinHeight()||0;
var bl=this.getWidth()||bk;
var bj=this.getHeight()||bh;
var bg=this.getMaxWidth()||Infinity;
var bi=this.getMaxHeight()||Infinity;
return {minWidth:bk,width:bl,maxWidth:bg,minHeight:bh,height:bj,maxHeight:bi};
},_hasHeightForWidth:function(){var p=this._getLayout();

if(p){return p.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(s){var t=this._getLayout();

if(t&&t.hasHeightForWidth()){return t.getHeightForWidth(s);
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
},setUserBounds:function(u,top,v,w){this.__dM={left:u,top:top,width:v,height:w};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__dM;
qx.ui.core.queue.Layout.add(this);
},__dO:{},setLayoutProperties:function(m){if(m==null){return;
}var n=this.__dN;

if(!n){n=this.__dN={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(m);
}for(var o in m){if(m[o]==null){delete n[o];
}else{n[o]=m[o];
}}},getLayoutProperties:function(){return this.__dN||this.__dO;
},clearLayoutProperties:function(){delete this.__dN;
},updateLayoutProperties:function(j){var k=this._getLayout();

if(k){var l;
{};
k.invalidateChildrenCache();
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
},clone:function(){var be=arguments.callee.base.call(this);
var bf=this.__dN;

if(bf){be.__dN=qx.lang.Object.clone(bf);
}return be;
},serialize:function(){var bc=arguments.callee.base.call(this);
var bd=this.__dN;

if(bd){bc.layoutProperties=qx.lang.Object.clone(bd);
}return bc;
}},destruct:function(){this._disposeFields(M,S,ba,y,x,bb);
}});
})();
(function(){var gi="px",gh="qx.event.type.Mouse",gg="Boolean",gf="qx.event.type.Drag",ge="visible",gd="qx.event.type.Focus",gc="on",gb="Integer",ga="excluded",fY="object",fz="qx.event.type.Data",fy="_applyPadding",fx="qx.event.type.Event",fw="zIndex",fv="hidden",fu="String",ft="tabIndex",fs="contextmenu",fr="absolute",fq="backgroundColor",gp="focused",gq="changeVisibility",gn="mshtml",go="hovered",gl="qx.event.type.KeySequence",gm="qx.client",gj="drag",gk="height",gr="div",gs="disabled",fR="move",fQ="dragstart",fT="qx.dynlocale",fS="dragchange",fV="position",fU="dragend",fX="resize",fW="Decorator",fP="width",fO="$$widget",ef="opacity",eg="default",eh="Color",ei="top",ej="left",ek="changeToolTipText",em="beforeContextmenuOpen",en="Use public 'getChildControl' instead!",eo="_applyNativeContextMenu",ep="__dP",gw="_applyBackgroundColor",gv="_applyFocusable",gu="changeShadow",gt="qx.event.type.KeyInput",gA="createChildControl",gz="__eb",gy="__dQ",gx="Font",gC="_applyShadow",gB="__dT",eP="__ei",eQ="_applyEnabled",eN="_applySelectable",eO="_applyKeepActive",eT="Number",eU="_applyVisibility",eR="repeat",eS="qxDraggable",eL="syncAppearance",eM="paddingLeft",ey="_applyDroppable",ew="#",eA="_applyCursor",ez="_applyDraggable",et="__dY",es="changeTextColor",ev="changeContextMenu",eu="paddingTop",er="changeSelectable",eq="hideFocus",fa="none",fb="outline",fc="_applyAppearance",fd="overflowX",eV="_applyOpacity",eW="url(",eX=")",eY="qx.ui.core.Widget",fe="_applyFont",ff="cursor",eI="qxDroppable",eH="changeZIndex",eG="overflowY",eF="changeEnabled",eE="changeFont",eD="__dU",eC="_applyDecorator",eB="_applyZIndex",eK="_applyTextColor",eJ="qx.ui.menu.Menu",fg="Use public 'hasChildControl' instead!",fh="_applyToolTipText",fi="__ed",fj="true",fk="widget",fl="changeDecorator",fm="__dV",fn="_applyTabIndex",fo="changeAppearance",fp="__el",fD="shorthand",fC="/",fB="",fA="_applyContextMenu",fH="paddingBottom",fG="changeNativeContextMenu",fF="qx.ui.tooltip.ToolTip",fE="qxKeepActive",fJ="_applyKeepFocus",fI="paddingRight",fM="changeBackgroundColor",fN="changeLocale",fK="qxKeepFocus",fL="qx/static/blank.gif";
qx.Class.define(eY,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){arguments.callee.base.call(this);
this.__dP=this._createContainerElement();
this.__dQ=this.__ec();
this.__dP.add(this.__dQ);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:fx,disappear:fx,createChildControl:fz,resize:fz,move:fz,syncAppearance:fz,mousemove:gh,mouseover:gh,mouseout:gh,mousedown:gh,mouseup:gh,click:gh,dblclick:gh,contextmenu:gh,beforeContextmenuOpen:gh,mousewheel:gh,keyup:gl,keydown:gl,keypress:gl,keyinput:gt,focus:gd,blur:gd,focusin:gd,focusout:gd,activate:gd,deactivate:gd,capture:fx,losecapture:fx,drop:gf,dragleave:gf,dragover:gf,drag:gf,dragstart:gf,dragend:gf,dragchange:gf,droprequest:gf},properties:{paddingTop:{check:gb,init:0,apply:fy,themeable:true},paddingRight:{check:gb,init:0,apply:fy,themeable:true},paddingBottom:{check:gb,init:0,apply:fy,themeable:true},paddingLeft:{check:gb,init:0,apply:fy,themeable:true},padding:{group:[eu,fI,fH,eM],mode:fD,themeable:true},zIndex:{nullable:true,init:null,apply:eB,event:eH,check:gb,themeable:true},decorator:{nullable:true,init:null,apply:eC,event:fl,check:fW,themeable:true},shadow:{nullable:true,init:null,apply:gC,event:gu,check:fW,themeable:true},backgroundColor:{nullable:true,check:eh,apply:gw,event:fM,themeable:true},textColor:{nullable:true,check:eh,apply:eK,event:es,themeable:true,inheritable:true},font:{nullable:true,apply:fe,check:gx,event:eE,themeable:true,inheritable:true},opacity:{check:eT,apply:eV,themeable:true,nullable:true,init:null},cursor:{check:fu,apply:eA,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:fF,nullable:true},toolTipText:{check:fu,nullable:true,event:ek,apply:fh},toolTipIcon:{check:fu,nullable:true,event:ek},visibility:{check:[ge,fv,ga],init:ge,apply:eU,event:gq},enabled:{init:true,check:gg,inheritable:true,apply:eQ,event:eF},anonymous:{init:false,check:gg},tabIndex:{check:gb,nullable:true,apply:fn},focusable:{check:gg,init:false,apply:gv},keepFocus:{check:gg,init:false,apply:fJ},keepActive:{check:gg,init:false,apply:eO},draggable:{check:gg,init:false,apply:ez},droppable:{check:gg,init:false,apply:ey},selectable:{check:gg,init:false,event:er,apply:eN},contextMenu:{check:eJ,apply:fA,nullable:true,event:ev},nativeContextMenu:{check:gg,init:false,themeable:true,event:fG,apply:eo},appearance:{check:fu,init:fk,apply:fc,event:fo}},statics:{DEBUG:false,getWidgetByElement:function(dk){try{while(dk){var dl=dk.$$widget;
if(dl!=null){return qx.core.ObjectRegistry.fromHashCode(dl);
}dk=dk.parentNode;
}}catch(gR){}return null;
},contains:function(parent,bU){while(bU){if(parent==bU){return true;
}bU=bU.getLayoutParent();
}return false;
},__dR:{},__dS:{}},members:{__dP:null,__dQ:null,__dT:null,__dU:null,__dV:null,__dW:null,__dX:null,__dY:null,_getLayout:function(){return this.__dY;
},_setLayout:function(gO){{};

if(this.__dY){this.__dY.connectToWidget(null);
}
if(gO){gO.connectToWidget(this);
}this.__dY=gO;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}
if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(this.__dP);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(this.__dP);
}qx.core.Property.refresh(this);
qx.ui.core.queue.Visibility.add(this);
},__ea:null,renderLayout:function(cr,top,cs,ct){var cE=arguments.callee.base.call(this,cr,top,cs,ct);
if(!cE){return;
}var cv=this.__dP;
var content=this.__dQ;
var cB=cE.size||this.__ea;
var cF=gi;
if(cE.position){cv.setStyle(ej,cr+cF);
cv.setStyle(ei,top+cF);
}if(cE.size){cv.setStyle(fP,cs+cF);
cv.setStyle(gk,ct+cF);
}
if(cB||cE.local||cE.margin){var cu=this.getInsets();
var innerWidth=cs-cu.left-cu.right;
var innerHeight=ct-cu.top-cu.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}
if(this.__ea){content.setStyle(ej,cu.left+cF);
content.setStyle(ei,cu.top+cF);
}
if(cB){content.setStyle(fP,innerWidth+cF);
content.setStyle(gk,innerHeight+cF);
}
if(cE.size){var cD=this.__dV;

if(cD){cD.setStyles({width:cs+gi,height:ct+gi});
}}
if(cE.size||this.__ea){var cy=qx.theme.manager.Decoration.getInstance();
var cG=this.getDecorator();

if(cG){var cz=this.__dT;
var cA=cy.resolve(cG);
cA.resize(cz.getDomElement(),cs,ct);
}}
if(cE.size){var cC=this.getShadow();

if(cC){var cz=this.__dU;
var cA=cy.resolve(cC);
var cu=cA.getInsets();
var cx=cs+cu.left+cu.right;
var cw=ct+cu.top+cu.bottom;
cA.resize(cz.getDomElement(),cx,cw);
}}
if(cB||cE.local||cE.margin){if(this.__dY&&this.hasLayoutChildren()){this.__dY.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(cE.position&&this.hasListener(fR)){this.fireDataEvent(fR,this.getBounds());
}
if(cE.size&&this.hasListener(fX)){this.fireDataEvent(fX,this.getBounds());
}delete this.__ea;
},__eb:null,clearSeparators:function(){var w=this.__eb;

if(!w){return;
}var x=qx.ui.core.Widget.__dR;
var content=this.__dQ;
var v,u;

for(var i=0,l=w.length;i<l;i++){u=w[i];
v=u.$$separator;
if(!x[v]){x[v]=[u];
}else{x[v].push(u);
}content.remove(u);
}w.length=0;
},renderSeparator:function(dv,dw){var dD=qx.ui.core.Widget.__dR;
var dB=qx.theme.manager.Decoration.getInstance();

if(typeof dv==fY){var dC=dv.toHashCode();
var dy=dv;
}else{var dC=dv;
var dy=dB.resolve(dv);
}var dz=dD[dv];

if(dz&&dz.length>0){var dA=dz.pop();
}else{var dA=this.__eh(dy);
}this.__dQ.add(dA);
dy.resize(dA.getDomElement(),dw.width,dw.height);
var dx=dA.getDomElement().style;
dx.left=dw.left+gi;
dx.top=dw.top+gi;
if(!this.__eb){this.__eb=[dA];
}else{this.__eb.push(dA);
}dA.$$separator=dC;
},_computeSizeHint:function(){var hA=this.getWidth();
var hz=this.getMinWidth();
var hv=this.getMaxWidth();
var hy=this.getHeight();
var hw=this.getMinHeight();
var hx=this.getMaxHeight();
var hB=this._getContentHint();
var hu=this.getInsets();
var hD=hu.left+hu.right;
var hC=hu.top+hu.bottom;

if(hA==null){hA=hB.width+hD;
}
if(hy==null){hy=hB.height+hC;
}
if(hz==null){hz=hD;

if(hB.minWidth!=null){hz+=hB.minWidth;
}}
if(hw==null){hw=hC;

if(hB.minHeight!=null){hw+=hB.minHeight;
}}
if(hv==null){if(hB.maxWidth==null){hv=Infinity;
}else{hv=hB.maxWidth+hD;
}}
if(hx==null){if(hB.maxHeight==null){hx=Infinity;
}else{hx=hB.maxHeight+hC;
}}return {width:hA,minWidth:hz,maxWidth:hv,height:hy,minHeight:hw,maxHeight:hx};
},invalidateLayoutCache:function(){arguments.callee.base.call(this);

if(this.__dY){this.__dY.invalidateLayoutCache();
}},_getContentHint:function(){var di=this.__dY;

if(di){if(this.hasLayoutChildren()){var dh;
var dj=di.getSizeHint();
{};
return dj;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(bz){var bD=this.getInsets();
var bG=bD.left+bD.right;
var bF=bD.top+bD.bottom;
var bE=bz-bG;
var bB=this._getLayout();

if(bB&&bB.hasHeightForWidth()){var bA=bB.getHeightForWidth(bz);
}else{bA=this._getContentHeightForWidth(bE);
}var bC=bA+bF;
return bC;
},_getContentHeightForWidth:function(M){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var bL=this.getPaddingRight();
var bM=this.getPaddingBottom();
var bR=this.getPaddingLeft();
var bQ=this.getDecorator();

if(bQ){var bP=qx.theme.manager.Decoration.getInstance();
var bO=bP.resolve(bQ);
var bN=bO.getInsets();
{};
top+=bN.top;
bL+=bN.right;
bM+=bN.bottom;
bR+=bN.left;
}return {"top":top,"right":bL,"bottom":bM,"left":bR};
},getInnerSize:function(){var C=this.getBounds();

if(!C){return null;
}var B=this.getInsets();
return {width:C.width-B.left-B.right,height:C.height-B.top-B.bottom};
},show:function(){this.setVisibility(ge);
},hide:function(){this.setVisibility(fv);
},exclude:function(){this.setVisibility(ga);
},isVisible:function(){return this.getVisibility()===ge;
},isHidden:function(){return this.getVisibility()!==ge;
},isExcluded:function(){return this.getVisibility()===ga;
},isSeeable:function(){var cS=this.getContainerElement().getDomElement();

if(cS){return cS.offsetWidth>0;
}var cR=this;

do{if(!cR.isVisible()){return false;
}
if(cR.isRootWidget()){return true;
}cR=cR.getLayoutParent();
}while(cR);
return false;
},_createContainerElement:function(){var cH=new qx.html.Element(gr);
{};
cH.setStyle(fV,fr);
cH.setStyle(fw,0);
cH.setAttribute(fO,this.toHashCode());
{};
return cH;
},__ec:function(){var da=this._createContentElement();
{};
da.setStyle(fV,fr);
da.setStyle(fw,10);
return da;
},_createContentElement:function(){var bH=new qx.html.Element(gr);
bH.setStyle(fd,fv);
bH.setStyle(eG,fv);
return bH;
},getContainerElement:function(){return this.__dP;
},getContentElement:function(){return this.__dQ;
},getDecoratorElement:function(){return this.__dT;
},__ed:null,getLayoutChildren:function(){var hF=this.__ed;

if(!hF){return this.__ee;
}var hG;

for(var i=0,l=hF.length;i<l;i++){var hE=hF[i];

if(hE.hasUserBounds()||hE.isExcluded()){if(hG==null){hG=hF.concat();
}qx.lang.Array.remove(hG,hE);
}}return hG||hF;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var ho=this.__dY;

if(ho){ho.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var hs=this.__ed;

if(!hs){return false;
}var ht;

for(var i=0,l=hs.length;i<l;i++){ht=hs[i];

if(!ht.hasUserBounds()&&!ht.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__ee:[],_getChildren:function(){return this.__ed||this.__ee;
},_indexOf:function(cL){var cM=this.__ed;

if(!cM){return -1;
}return cM.indexOf(cL);
},_hasChildren:function(){var gD=this.__ed;
return gD!=null&&(!!gD[0]);
},addChildrenToQueue:function(gE){var gF=this.__ed;

if(!gF){return;
}var gG;

for(var i=0,l=gF.length;i<l;i++){gG=gF[i];
gE[gG.$$hash]=gG;
gG.addChildrenToQueue(gE);
}},_add:function(bX,bY){if(bX.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,bX);
}
if(this.__ed){this.__ed.push(bX);
}else{this.__ed=[bX];
}this.__ef(bX,bY);
},_addAt:function(dE,dF,dG){if(!this.__ed){this.__ed=[];
}if(dE.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,dE);
}var dH=this.__ed[dF];

if(dH===dE){return dE.setLayoutProperties(dG);
}
if(dH){qx.lang.Array.insertBefore(this.__ed,dE,dH);
}else{this.__ed.push(dE);
}this.__ef(dE,dG);
},_addBefore:function(f,g,h){{};

if(f==g){return;
}
if(!this.__ed){this.__ed=[];
}if(f.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,f);
}qx.lang.Array.insertBefore(this.__ed,f,g);
this.__ef(f,h);
},_addAfter:function(hp,hq,hr){{};

if(hp==hq){return;
}
if(!this.__ed){this.__ed=[];
}if(hp.getLayoutParent()==this){qx.lang.Array.remove(this.__ed,hp);
}qx.lang.Array.insertAfter(this.__ed,hp,hq);
this.__ef(hp,hr);
},_remove:function(bc){if(!this.__ed){return;
}qx.lang.Array.remove(this.__ed,bc);
this.__eg(bc);
},_removeAt:function(df){if(!this.__ed){throw new Error("This widget has no children!");
}var dg=this.__ed[df];
qx.lang.Array.removeAt(this.__ed,df);
this.__eg(dg);
return dg;
},_removeAll:function(){if(!this.__ed){return;
}var z=this.__ed.concat();
this.__ed.length=0;

for(var i=z.length-1;i>=0;i--){this.__eg(z[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__ef:function(dL,dM){{};
var parent=dL.getLayoutParent();

if(parent&&parent!=this){parent._remove(dL);
}dL.setLayoutParent(this);
if(dM){dL.setLayoutProperties(dM);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(dL);
}},__eg:function(y){{};
y.setLayoutParent(null);
if(this.__dY){this.__dY.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(y);
}},capture:function(){this.__dP.capture();
},releaseCapture:function(){this.__dP.releaseCapture();
},_applyPadding:function(db,dc,name){this.__ea=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__dV){return;
}var ca=this.__dV=new qx.html.Element;
{};
ca.setStyles({position:fr,top:0,left:0,zIndex:7});
var cb=this.getBounds();

if(cb){this.__dV.setStyles({width:cb.width+gi,height:cb.height+gi});
}if(qx.core.Variant.isSet(gm,gn)){ca.setStyles({backgroundImage:eW+qx.util.ResourceManager.getInstance().toUri(fL)+eX,backgroundRepeat:eR});
}this.__dP.add(ca);
},__eh:function(N){var O=new qx.html.Element;
O.setStyles({position:fr,top:0,left:0});
{};
O.useMarkup(N.getMarkup());
return O;
},_applyDecorator:function(dU,dV){var ee=qx.ui.core.Widget.__dR;
var eb=qx.theme.manager.Decoration.getInstance();
var dW=this.__dP;
var dY=this.__dT;
if(!this.__dV){this._createProtectorElement();
}var ec;

if(dV){if(typeof dV===fY){ec=dV.toHashCode();
}else{ec=dV;
dV=eb.resolve(dV);
}}var ed;

if(dU){if(typeof dU===fY){ed=dU.toHashCode();
{};
}else{ed=dU;
dU=eb.resolve(dU);
}}if(dV){if(!ee[ec]){ee[ec]=[];
}dW.remove(dY);
ee[ec].push(dY);
}if(dU){if(ee[ed]&&ee[ed].length>0){dY=ee[ed].pop();
}else{dY=this.__eh(dU);
dY.setStyle(fw,5);
}var dX=this.getBackgroundColor();
dU.tint(dY.getDomElement(),dX);
dW.add(dY);
this.__dT=dY;
}else{delete this.__dT;
this._applyBackgroundColor(this.getBackgroundColor());
}if(dU&&!dV&&dX){this.getContainerElement().setStyle(fq,null);
}if(qx.ui.decoration.Util.insetsModified(dV,dU)){this.__ea=true;
qx.ui.core.queue.Layout.add(this);
}else if(dU){var ea=this.getBounds();

if(ea){eb.resolve(dU).resize(dY.getDomElement(),ea.width,ea.height);
this.__dV.setStyles({width:ea.width+gi,height:ea.height+gi});
}}},_applyShadow:function(P,Q){var bb=qx.ui.core.Widget.__dS;
var X=qx.theme.manager.Decoration.getInstance();
var S=this.__dP;
var Y;

if(Q){if(typeof Q===fY){Y=Q.toHashCode();
}else{Y=Q;
Q=X.resolve(Q);
}}var ba;

if(P){if(typeof P===fY){ba=P.toHashCode();
}else{ba=P;
P=X.resolve(P);
}}if(Q){if(!bb[Y]){bb[Y]=[];
}S.remove(this.__dU);
bb[Y].push(this.__dU);
}if(P){var U;

if(bb[ba]&&bb[ba].length>0){U=bb[ba].pop();
}else{U=this.__eh(P);
}S.add(U);
this.__dU=U;
var W=P.getInsets();
U.setStyles({left:(-W.left)+gi,top:(-W.top)+gi});
var V=this.getBounds();

if(V){var T=V.width+W.left+W.right;
var R=V.height+W.top+W.bottom;
P.resize(U.getDomElement(),T,R);
}P.tint(U.getDomElement(),null);
}else{delete this.__dU;
}},_applyToolTipText:function(cc,cd){if(qx.core.Variant.isSet(fT,gc)){if(this.__dX){return;
}var ce=qx.locale.Manager.getInstance();
this.__dX=ce.addListener(fN,function(){if(cc&&cc.translate){this.setToolTipText(cc.translate());
}},this);
}},_applyTextColor:function(bJ,bK){},_applyZIndex:function(hk,hl){this.__dP.setStyle(fw,hk==null?0:hk);
},_applyVisibility:function(bV,bW){if(bV===ge){this.__dP.show();
}else{this.__dP.hide();
}var parent=this.$$parent;

if(parent&&(bW==null||bV==null||bW===ga||bV===ga)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(dI,dJ){this.__dP.setStyle(ef,dI==1?null:dI);
if(qx.core.Variant.isSet(gm,gn)){if(!qx.Class.isSubClassOf(this.__dQ.constructor,qx.html.Image)){var dK=(dI==1||dI==null)?null:0.99;
this.__dQ.setStyle(ef,dK);
}}},_applyCursor:function(gM,gN){if(gM==null&&!this.isSelectable()){gM=eg;
}this.__dP.setStyle(ff,gM,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(br,bs){var by=this.getDecorator();
var bv=this.getBackgroundColor();
var bu=this.__dP;

if(by){var bw=this.__dT;

if(bw){var bx=qx.theme.manager.Decoration.getInstance().resolve(by);
bx.tint(this.__dT.getDomElement(),bv);
}bu.setStyle(fq,null);
}else{var bt=qx.theme.manager.Color.getInstance().resolve(bv);
bu.setStyle(fq,bt);
}},_applyFont:function(bd,be){},__ei:null,$$stateChanges:null,_forwardStates:null,hasState:function(hd){var he=this.__ei;
return he&&he[hd];
},addState:function(gV){var gW=this.__ei;

if(!gW){gW=this.__ei={};
}
if(gW[gV]){return;
}this.__ei[gV]=true;
if(gV===go){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var ha=this.__el;

if(forward&&forward[gV]&&ha){var gX;

for(var gY in ha){gX=ha[gY];

if(gX instanceof qx.ui.core.Widget){ha[gY].addState(gV);
}}}},removeState:function(F){var G=this.__ei;

if(!G||!G[F]){return;
}delete this.__ei[F];
if(F===go){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var J=this.__el;

if(forward&&forward[F]&&J){for(var I in J){var H=J[I];

if(H instanceof qx.ui.core.Widget){H.removeState(F);
}}}},replaceState:function(cT,cU){var cV=this.__ei;

if(!cV){cV=this.__ei={};
}
if(!cV[cU]){cV[cU]=true;
}
if(cV[cT]){delete cV[cT];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var cY=this.__el;

if(forward&&forward[cU]&&cY){for(var cX in cY){var cW=cY[cX];

if(cW instanceof qx.ui.core.Widget){cW.replaceState(cT,cU);
}}}},__ej:null,__ek:null,syncAppearance:function(){var cl=this.__ei;
var ck=this.__ej;
var cm=qx.theme.manager.Appearance.getInstance();
var ci=qx.core.Property.$$method.setThemed;
var cq=qx.core.Property.$$method.resetThemed;
if(this.__ek){delete this.__ek;
if(ck){var ch=cm.styleFrom(ck,cl,null,this.getAppearance());
if(ch){ck=null;
}}}if(!ck){var cj=this;
var cp=[];

do{cp.push(cj.$$subcontrol||cj.getAppearance());
}while(cj=cj.$$subparent);
ck=this.__ej=cp.reverse().join(fC).replace(/#[0-9]+/g,fB);
}var cn=cm.styleFrom(ck,cl,null,this.getAppearance());

if(cn){var co;
var co;

if(ch){for(var co in ch){if(cn[co]===undefined){this[cq[co]]();
}}}{};
{};

for(var co in cn){cn[co]===undefined?this[cq[co]]():this[ci[co]](cn[co]);
}}else if(ch){for(var co in ch){this[cq[co]]();
}}this.fireDataEvent(eL,this.__ei);
},_applyAppearance:function(dN,dO){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__dW){qx.ui.core.queue.Appearance.add(this);
this.__dW=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__ek=true;
qx.ui.core.queue.Appearance.add(this);
var n=this.__el;

if(n){var k;

for(var m in n){k=n[m];

if(k instanceof qx.ui.core.Widget){k.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var cI=this;

while(cI.getAnonymous()){cI=cI.getLayoutParent();

if(!cI){return null;
}}return cI;
},getFocusTarget:function(){var A=this;

if(!A.getEnabled()){return null;
}
while(A.getAnonymous()||!A.getFocusable()){A=A.getLayoutParent();

if(!A||!A.getEnabled()){return null;
}}return A;
},getFocusElement:function(){return this.__dP;
},isTabable:function(){return this.getContainerElement().getDomElement()&&this.isFocusable();
},_applyFocusable:function(gH,gI){var gJ=this.getFocusElement();
if(gH){var gK=this.getTabIndex();

if(gK==null){gK=1;
}gJ.setAttribute(ft,gK);
if(qx.core.Variant.isSet(gm,gn)){gJ.setAttribute(eq,fj);
}else{gJ.setStyle(fb,fa);
}}else{if(gJ.isNativelyFocusable()){gJ.setAttribute(ft,-1);
}else if(gI){gJ.setAttribute(ft,null);
}}},_applyKeepFocus:function(bi){var bj=this.getFocusElement();
bj.setAttribute(fK,bi?gc:null);
},_applyKeepActive:function(dr){var ds=this.getContainerElement();
ds.setAttribute(fE,dr?gc:null);
},_applyTabIndex:function(gS){if(gS==null){gS=1;
}else if(gS<1||gS>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&gS!=null){this.getFocusElement().setAttribute(ft,gS);
}},_applySelectable:function(D){this._applyCursor(this.getCursor());
this.__dP.setSelectable(D);
this.__dQ.setSelectable(D);
},_applyEnabled:function(gT,gU){if(gT===false){this.addState(gs);
this.removeState(go);
if(this.isFocusable()){this.removeState(gp);
this._applyFocusable(false,true);
}}else{this.removeState(gs);
if(this.isFocusable()){this._applyFocusable(true,false);
}}},_applyNativeContextMenu:function(K,L,name){},_applyContextMenu:function(a,b){if(b){b.removeState(fs);

if(b.getOpener()==this){b.resetOpener();
}
if(!a){this.removeListener(fs,this._onContextMenuOpen);
b.removeListener(gq,this._onBeforeContextMenuOpen,this);
}}
if(a){a.setOpener(this);
a.addState(fs);

if(!b){this.addListener(fs,this._onContextMenuOpen);
a.addListener(gq,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){var bI=this.getContextMenu();
bI.placeToMouse(e);
bI.show();
e.preventDefault();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==ge&&this.hasListener(em)){this.fireDataEvent(em,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(dt,du){qx.ui.core.DragDropCursor.getInstance();
if(dt){this.addListener(fQ,this._onDragStart);
this.addListener(gj,this._onDrag);
this.addListener(fU,this._onDragEnd);
this.addListener(fS,this._onDragChange);
}else{this.removeListener(fQ,this._onDragStart);
this.removeListener(gj,this._onDrag);
this.removeListener(fU,this._onDragEnd);
this.removeListener(fS,this._onDragChange);
}this.__dP.setAttribute(eS,dt?gc:null);
},_applyDroppable:function(cJ,cK){this.__dP.setAttribute(eI,cJ?gc:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(eg);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var bn=qx.ui.core.DragDropCursor.getInstance();
var bo=e.getCurrentAction();
bo?bn.setAction(bo):bn.resetAction();
},visualizeFocus:function(){this.addState(gp);
},visualizeBlur:function(){this.removeState(gp);
},scrollChildIntoView:function(dm,dn,dp,dq){this.scrollChildIntoViewX(dm,dn,dq);
this.scrollChildIntoViewY(dm,dp,dq);
},scrollChildIntoViewX:function(r,s,t){this.__dQ.scrollChildIntoViewX(r.getContainerElement(),s,t);
},scrollChildIntoViewY:function(o,p,q){this.__dQ.scrollChildIntoViewY(o.getContainerElement(),p,q);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.__dP.activate();
},deactivate:function(){this.__dP.deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},_hasChildControl:function(gL){qx.log.Logger.deprecatedMethodWarning(arguments.callee,fg);
return this.hasChildControl(gL);
},hasChildControl:function(E){if(!this.__el){return false;
}return !!this.__el[E];
},__el:null,_getCreatedChildControls:function(){return this.__el;
},_getChildControl:function(c,d){qx.log.Logger.deprecatedMethodWarning(arguments.callee,en);
return this.getChildControl(c,d);
},getChildControl:function(bf,bg){if(!this.__el){if(bg){return null;
}this.__el={};
}var bh=this.__el[bf];

if(bh){return bh;
}
if(bg===true){return null;
}return this._createChildControl(bf);
},_showChildControl:function(hb){var hc=this.getChildControl(hb);
hc.show();
return hc;
},_excludeChildControl:function(bS){var bT=this.getChildControl(bS,true);

if(bT){bT.exclude();
}},_isChildControlVisible:function(bl){var bm=this.getChildControl(bl,true);

if(bm){return bm.isVisible();
}return false;
},_createChildControl:function(hf){if(!this.__el){this.__el={};
}else if(this.__el[hf]){throw new Error("Child control '"+hf+"' already created!");
}var hj=hf.indexOf(ew);

if(hj==-1){var hg=this._createChildControlImpl(hf);
}else{var hg=this._createChildControlImpl(hf.substring(0,hj));
}
if(!hg){throw new Error("Unsupported control: "+hf);
}hg.$$subcontrol=hf;
hg.$$subparent=this;
var hh=this.__ei;
var forward=this._forwardStates;

if(hh&&forward&&hg instanceof qx.ui.core.Widget){for(var hi in hh){if(forward[hi]){hg.addState(hi);
}}}this.fireDataEvent(gA,hg);
return this.__el[hf]=hg;
},_createChildControlImpl:function(j){return null;
},_disposeChildControls:function(){var cQ=this.__el;

if(!cQ){return;
}var cO=qx.ui.core.Widget;

for(var cP in cQ){var cN=cQ[cP];

if(!cO.contains(this,cN)){cN.destroy();
}else{cN.dispose();
}}delete this.__el;
},_findTopControl:function(){var bk=this;

while(bk){if(!bk.$$subparent){return bk;
}bk=bk.$$subparent;
}return null;
},getContainerLocation:function(hm){var hn=this.getContainerElement().getDomElement();
return hn?qx.bom.element.Location.get(hn,hm):null;
},getContentLocation:function(gP){var gQ=this.getContentElement().getDomElement();
return gQ?qx.bom.element.Location.get(gQ,gP):null;
},setDomLeft:function(bp){var bq=this.getContainerElement().getDomElement();

if(bq){bq.style.left=bp+gi;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(cf){var cg=this.getContainerElement().getDomElement();

if(cg){cg.style.top=cf+gi;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(dP,top){var dQ=this.getContainerElement().getDomElement();

if(dQ){dQ.style.left=dP+gi;
dQ.style.top=top+gi;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var dd=arguments.callee.base.call(this);

if(this.getChildren){var de=this.getChildren();

for(var i=0,l=de.length;i<l;i++){dd.add(de[i].clone());
}}return dd;
},serialize:function(){var dS=arguments.callee.base.call(this);

if(this.getChildren){var dT=this.getChildren();

if(dT.length>0){dS.children=[];

for(var i=0,l=dT.length;i<l;i++){dS.children.push(dT[i].serialize());
}}}
if(this.getLayout){var dR=this.getLayout();

if(dR){dS.layout=dR.serialize();
}}return dS;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(fT,gc)){if(this.__dX){qx.locale.Manager.getInstance().removeListenerById(this.__dX);
}}this.__dP.setAttribute(fO,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}this._disposeArray(fi);
this._disposeArray(gz);
this._disposeFields(eP,fp);
this._disposeObjects(et,ep,gy,gB,eD,fm);
}});
})();
(function(){var g="qx.event.type.Data",f="qx.ui.container.Composite",e="addChildWidget",d="removeChildWidget";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(b){arguments.callee.base.call(this);

if(b!=null){this._setLayout(b);
}},events:{addChildWidget:g,removeChildWidget:g},members:{_afterAddChild:function(c){this.fireNonBubblingEvent(e,qx.event.type.Data,[c]);
},_afterRemoveChild:function(a){this.fireNonBubblingEvent(d,qx.event.type.Data,[a]);
}},defer:function(h,i){qx.ui.core.MChildrenHandling.remap(i);
qx.ui.core.MLayoutHandling.remap(i);
}});
})();
(function(){var v="interval",u="Integer",t="resize",s="Boolean",r="mouse",q="disappear",p="bottom-left",o="widget",n="offsetLeft",m="offsetRight",f="right-top",l="top-right",i="top-left",d="bottom-right",c="right-bottom",h="offsetBottom",g="qx.ui.core.MPlacement",j="left-top",b="left-bottom",k="shorthand",e="offsetTop";
qx.Mixin.define(g,{properties:{position:{check:[i,l,p,d,j,b,f,c],init:p,themeable:true},placeMethod:{check:[o,r],init:r,themeable:true},domMove:{check:s,init:false},smart:{check:s,init:true,themeable:true},offsetLeft:{check:u,init:0,themeable:true},offsetTop:{check:u,init:0,themeable:true},offsetRight:{check:u,init:0,themeable:true},offsetBottom:{check:u,init:0,themeable:true},offset:{group:[e,m,h,n],mode:k,themeable:true}},members:{__em:null,__en:null,getLayoutLocation:function(L){var O,N,P,top;
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
},moveTo:function(a,top){if(this.getDomMove()){this.setDomPosition(a,top);
}else{this.setLayoutProperties({left:a,top:top});
}},placeToWidget:function(y,z){if(z){this.__en=qx.lang.Function.bind(this.placeToWidget,this,y,false);
qx.event.Idle.getInstance().addListener(v,this.__en);
this.addListener(q,function(){if(this.__en){qx.event.Idle.getInstance().removeListener(v,this.__en);
this.__en=null;
}},this);
}var A=y.getContainerLocation()||this.getLayoutLocation(y);
this.__eo(A);
},placeToMouse:function(event){var S=event.getDocumentLeft();
var top=event.getDocumentTop();
var R={left:S,top:top,right:S,bottom:top};
this.__eo(R);
},placeToElement:function(B,C){var location=qx.bom.element.Location.get(B);
var D={left:location.left,top:location.top,right:location.left+B.offsetWidth,bottom:location.top+B.offsetHeight};
if(C){this.__en=qx.lang.Function.bind(this.placeToElement,this,B,false);
qx.event.Idle.getInstance().addListener(v,this.__en);
this.addListener(q,function(){if(this.__en){qx.event.Idle.getInstance().removeListener(v,this.__en);
this.__en=null;
}},this);
}this.__eo(D);
},placeToPoint:function(w){var x={left:w.left,top:w.top,right:w.left,bottom:w.top};
this.__eo(x);
},__eo:function(E){var K=this.getBounds();

if(K==null){if(!this.__em){this.addListener(t,this.__eo);
}this.__em=E;
return;
}else if(this.__em){E=this.__em;
delete this.__em;
this.removeListener(t,this.__eo);
}var F=this.getLayoutParent().getBounds();
var I=this.getPosition();
var J=this.getSmart();
var G={left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
var H=qx.util.PlaceUtil.compute(K,F,E,I,J,G);
this.moveTo(H.left,H.top);
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
(function(){var o="atom",n="Integer",m="String",l="_applyRich",k="qx.ui.tooltip.ToolTip",j="_applyIcon",i="tooltip",h="qx.ui.core.Widget",g="Boolean",f="_applyLabel";
qx.Class.define(k,{extend:qx.ui.popup.Popup,construct:function(s,t){arguments.callee.base.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(o);
if(s!=null){this.setLabel(s);
}
if(t!=null){this.setIcon(t);
}},properties:{appearance:{refine:true,init:i},showTimeout:{check:n,init:700,themeable:true},hideTimeout:{check:n,init:4000,themeable:true},label:{check:m,nullable:true,apply:f},icon:{check:m,nullable:true,apply:j,themeable:true},rich:{check:g,init:false,apply:l},opener:{check:h,nullable:true}},members:{_createChildControlImpl:function(a){var b;

switch(a){case o:b=new qx.ui.basic.Atom;
this._add(b);
break;
}return b||arguments.callee.base.call(this,a);
},_applyIcon:function(p,q){var r=this.getChildControl(o);
p==null?r.resetIcon:r.setIcon(p);
},_applyLabel:function(u,v){var w=this.getChildControl(o);
u==null?w.resetLabel():w.setLabel(u);
},_applyRich:function(c,d){var e=this.getChildControl(o);
e.setRich(c);
}}});
})();
(function(){var h="qx.ui.core.queue.Layout",g="layout";
qx.Class.define(h,{statics:{__ep:{},remove:function(f){delete this.__ep[f.$$hash];
},add:function(a){this.__ep[a.$$hash]=a;
qx.ui.core.queue.Manager.scheduleFlush(g);
},flush:function(){var b=this.__es();
for(var i=b.length-1;i>=0;i--){var c=b[i];
if(c.hasValidLayout()){continue;
}if(c.isRootWidget()&&!c.hasUserBounds()){var e=c.getSizeHint();
c.renderLayout(0,0,e.width,e.height);
}else{var d=c.getBounds();
c.renderLayout(d.left,d.top,d.width,d.height);
}}},getNestingLevel:function(x){var y=this.__er;
var A=0;
var parent=x;
while(true){if(y[parent.$$hash]!=null){A+=y[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
A+=1;
}var z=A;

while(x&&x!==parent){y[x.$$hash]=z--;
x=x.$$parent;
}return A;
},__eq:function(){var o=qx.ui.core.queue.Visibility;
this.__er={};
var n=[];
var m=this.__ep;
var j,l;

for(var k in m){j=m[k];

if(o.isVisible(j)){l=this.getNestingLevel(j);
if(!n[l]){n[l]={};
}n[l][k]=j;
delete m[k];
}}return n;
},__es:function(){var s=[];
var u=this.__eq();

for(var r=u.length-1;r>=0;r--){if(!u[r]){continue;
}
for(var q in u[r]){var p=u[r][q];
if(r==0||p.isRootWidget()||p.hasUserBounds()){s.push(p);
p.invalidateLayoutCache();
continue;
}var w=p.getSizeHint(false);

if(w){p.invalidateLayoutCache();
var t=p.getSizeHint();
var v=(!p.getBounds()||w.minWidth!==t.minWidth||w.width!==t.width||w.maxWidth!==t.maxWidth||w.minHeight!==t.minHeight||w.height!==t.height||w.maxHeight!==t.maxHeight);
}else{v=true;
}
if(v){var parent=p.getLayoutParent();

if(!u[r-1]){u[r-1]={};
}u[r-1][parent.$$hash]=parent;
}else{s.push(p);
}}}return s;
}}});
})();
(function(){var c="qx.event.handler.UserAction",b="__eu",a="__et";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){arguments.callee.base.call(this);
this.__et=d;
this.__eu=d.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__et:null,__eu:null,canHandleEvent:function(e,f){},registerEvent:function(h,i,j){},unregisterEvent:function(k,l,m){}},destruct:function(){this._disposeFields(a,b);
},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var d="__ew",c="__ev",b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__ev={};
this.__ew=qx.lang.Function.bind(this.__eA,this);
this.__ex=false;
},members:{__ey:null,__ez:null,__ev:null,__ex:null,__ew:null,schedule:function(i){if(this.__ey==null){this.__ey=window.setTimeout(this.__ew,0);
}var j=i.toHashCode();
if(this.__ez&&this.__ez[j]){return;
}this.__ev[j]=i;
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

for(var h in this.__ez){var g=this.__ez[h];

if(g){this.__ez[h]=null;
g.call();
}}}this.__ez=null;
})},destruct:function(){if(this.__ey!=null){window.clearTimeout(this.__ey);
}this._disposeFields(d,c);
}});
})();
(function(){var d="qx.util.DeferredCall",c="__eD",b="__eC",a="__eB";
qx.Class.define(d,{extend:qx.core.Object,construct:function(g,h){arguments.callee.base.call(this);
this.__eB=g;
this.__eC=h||null;
this.__eD=qx.util.DeferredCallManager.getInstance();
},members:{__eB:null,__eC:null,__eD:null,cancel:function(){this.__eD.cancel(this);
},schedule:function(){this.__eD.schedule(this);
},call:function(){this.__eC?this.__eB.apply(this.__eC):this.__eB();
}},destruct:function(e,f){this.cancel();
this._disposeFields(b,a,c);
}});
})();
(function(){var ci="element",ch="qx.client",cg="div",cf="",ce="mshtml",cd="none",cc="__fb",cb="qx.html.Element",ca="Use public 'clearTextSelection' instead!",bY="|capture|",cK="focus",cJ="blur",cI="__eT",cH="deactivate",cG="userSelect",cF="Use public 'setTextSelection' instead!",cE="capture",cD="releaseCapture",cC="__fd",cB="__eX",cp="__fa",cq="__eQ",cn="qxSelectable",co="__eW",cl="__eL",cm="tabIndex",cj="off",ck="Use public 'getTextSelectionLength' instead!",cr="on",cs="activate",cv="__eU",cu="normal",cx="webkit",cw="__eY",cz="__eV",cy="|bubble|",ct="Use public 'getTextSelection' instead!",cA="__eP";
qx.Class.define(cb,{extend:qx.core.Object,construct:function(n){arguments.callee.base.call(this);
this.__eE=n||cg;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__eF:{},_scheduleFlush:function(eg){qx.html.Element.__fl.schedule();
},_mshtmlVisibilitySort:qx.core.Variant.select(ch,{"mshtml":function(a,b){var dL=a.__eL;
var dK=b.__eL;

if(dL.contains(dK)){return 1;
}
if(dK.contains(dL)){return -1;
}return 0;
},"default":null}),flush:function(){var be;
{};
var W=this.__eG();
var V=W.getFocus();

if(V&&this.__eK(V)){W.blur(V);
}var bn=W.getActive();

if(bn&&this.__eK(bn)){qx.bom.Element.deactivate(bn);
}var bk=this.__eI();

if(bk&&this.__eK(bk)){qx.bom.Element.releaseCapture(bk);
}var bf=[];
var bh=this._modified;

for(var bd in bh){be=bh[bd];
if(be.__ff()){if(be.__eL&&qx.dom.Hierarchy.isRendered(be.__eL)){bf.push(be);
}else{{};
be.__fe();
}delete bh[bd];
}}
for(var i=0,l=bf.length;i<l;i++){be=bf[i];
{};
be.__fe();
}var bb=this._visibility;
if(qx.core.Variant.isSet(ch,ce)){var bg=[];

for(var bd in bb){bg.push(bb[bd]);
}if(bg.length>1){bg.sort(this._mshtmlVisibilitySort);
bb=this._visibility={};

for(var i=0;i<bg.length;i++){be=bg[i];
bb[be.$$hash]=be;
}}}
for(var bd in bb){be=bb[bd];
{};
be.__eL.style.display=be.__eO?cf:cd;
delete bb[bd];
}var scroll=this._scroll;

for(var bd in scroll){be=scroll[bd];
var bo=be.__eL;

if(bo&&bo.offsetWidth){var Y=true;
if(be.__eR!=null){be.__eL.scrollLeft=be.__eR;
delete be.__eR;
}if(be.__eS!=null){be.__eL.scrollTop=be.__eS;
delete be.__eS;
}var bj=be.__eP;

if(bj!=null){var bc=bj.element.getDomElement();

if(bc&&bc.offsetWidth){qx.bom.element.Scroll.intoViewX(bc,bo,bj.align);
delete be.__eP;
}else{Y=false;
}}var ba=be.__eQ;

if(ba!=null){var bc=ba.element.getDomElement();

if(bc&&bc.offsetWidth){qx.bom.element.Scroll.intoViewY(bc,bo,ba.align);
delete be.__eQ;
}else{Y=false;
}}if(Y){delete scroll[bd];
}}}var X={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bm=this._actions[i];
var bi=bm.element.__eL;

if(!bi||!X[bm.type]&&!bm.element.__ff()){continue;
}qx.bom.Element[bm.type](bi);
}this._actions=[];
for(var bd in this.__eF){var U=this.__eF[bd];
var bo=U.element.__eL;

if(bo){qx.bom.Selection.set(bo,U.start,U.end);
delete this.__eF[bd];
}}qx.event.handler.Appear.refresh();
},__eG:function(){if(!this.__eH){var cM=qx.event.Registration.getManager(window);
this.__eH=cM.getHandler(qx.event.handler.Focus);
}return this.__eH;
},__eI:function(){if(!this.__eJ){var dX=qx.event.Registration.getManager(window);
this.__eJ=dX.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__eJ.getCaptureElement();
},__eK:function(dY){var ea=qx.core.ObjectRegistry.fromHashCode(dY.$$element);
return ea&&!ea.__ff();
}},members:{__eE:null,__eL:null,__eM:false,__eN:true,__eO:true,__eP:null,__eQ:null,__eR:null,__eS:null,__eT:null,__eU:null,__eV:null,__eW:null,__eX:null,__eY:null,__fa:null,__fb:null,__fc:null,__fd:null,_scheduleChildrenUpdate:function(){if(this.__fc){return;
}this.__fc=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
},_createDomElement:function(){return qx.bom.Element.create(this.__eE);
},__fe:function(){{};
var bF=this.__fb;

if(bF){var length=bF.length;
var bG;

for(var i=0;i<length;i++){bG=bF[i];

if(bG.__eO&&bG.__eN&&!bG.__eL){bG.__fe();
}}}
if(!this.__eL){this.__eL=this._createDomElement();
this.__eL.$$element=this.$$hash;
this._copyData(false);

if(bF&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fc){this._syncChildren();
}}delete this.__fc;
},_insertChildren:function(){var bP=this.__fb;
var length=bP.length;
var bR;

if(length>2){var bQ=document.createDocumentFragment();

for(var i=0;i<length;i++){bR=bP[i];

if(bR.__eL&&bR.__eN){bQ.appendChild(bR.__eL);
}}this.__eL.appendChild(bQ);
}else{var bQ=this.__eL;

for(var i=0;i<length;i++){bR=bP[i];

if(bR.__eL&&bR.__eN){bQ.appendChild(bR.__eL);
}}}},_syncChildren:function(){var L;
var Q=qx.core.ObjectRegistry;
var H=this.__fb;
var O=H.length;
var I;
var M;
var K=this.__eL;
var N=K.childNodes;
var J=0;
var P;
{};
for(var i=N.length-1;i>=0;i--){P=N[i];
M=Q.fromHashCode(P.$$element);

if(!M||!M.__eN||M.__fd!==this){K.removeChild(P);
{};
}}for(var i=0;i<O;i++){I=H[i];
if(I.__eN){M=I.__eL;
P=N[J];

if(!M){continue;
}if(M!=P){if(P){K.insertBefore(M,P);
}else{K.appendChild(M);
}{};
}J++;
}}{};
},_copyData:function(w){var C=this.__eL;
var B=this.__eX;

if(B){var z=qx.bom.element.Attribute;

for(var D in B){z.set(C,D,B[D]);
}}var B=this.__eW;

if(B){var A=qx.bom.element.Style;

if(w){for(var D in B){A.set(C,D,B[D]);
}}else{A.setCss(C,A.compile(B));
}}var B=this.__eY;

if(B){for(var D in B){this._applyProperty(D,B[D]);
}}var B=this.__fa;

if(B){qx.event.Registration.getManager(C).importListeners(C,B);
delete this.__fa;
}},_syncData:function(){var di=this.__eL;
var dh=qx.bom.element.Attribute;
var df=qx.bom.element.Style;
var dg=this.__eU;

if(dg){var dl=this.__eX;

if(dl){var dj;

for(var dk in dg){dj=dl[dk];

if(dj!==undefined){dh.set(di,dk,dj);
}else{dh.reset(di,dk);
}}}this.__eU=null;
}var dg=this.__eT;

if(dg){var dl=this.__eW;

if(dl){var dj;

for(var dk in dg){dj=dl[dk];

if(dj!==undefined){df.set(di,dk,dj);
}else{df.reset(di,dk);
}}}this.__eT=null;
}var dg=this.__eV;

if(dg){var dl=this.__eY;

if(dl){var dj;

for(var dk in dg){this._applyProperty(dk,dl[dk]);
}}this.__eV=null;
}},__ff:function(){var dd=this;
while(dd){if(dd.__eM){return true;
}
if(!dd.__eN||!dd.__eO){return false;
}dd=dd.__fd;
}return false;
},__fg:function(dn){if(dn.__fd===this){throw new Error("Child is already in: "+dn);
}
if(dn.__eM){throw new Error("Root elements could not be inserted into other ones.");
}if(dn.__fd){dn.__fd.remove(dn);
}dn.__fd=this;
if(!this.__fb){this.__fb=[];
}if(this.__eL){this._scheduleChildrenUpdate();
}},__fh:function(R){if(R.__fd!==this){throw new Error("Has no child: "+R);
}if(this.__eL){this._scheduleChildrenUpdate();
}delete R.__fd;
},__fi:function(T){if(T.__fd!==this){throw new Error("Has no child: "+T);
}if(this.__eL){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__fb||null;
},getChild:function(dx){var dy=this.__fb;
return dy&&dy[dx]||null;
},hasChildren:function(){var bx=this.__fb;
return bx&&bx[0]!==undefined;
},indexOf:function(da){var dc=this.__fb;
return dc?dc.indexOf(da):-1;
},hasChild:function(bU){var bV=this.__fb;
return bV&&bV.indexOf(bU)!==-1;
},add:function(cQ){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fg(arguments[i]);
}this.__fb.push.apply(this.__fb,arguments);
}else{this.__fg(cQ);
this.__fb.push(cQ);
}return this;
},addAt:function(ee,ef){this.__fg(ee);
qx.lang.Array.insertAt(this.__fb,ee,ef);
return this;
},remove:function(dU){var dV=this.__fb;

if(!dV){return;
}
if(arguments[1]){var dW;

for(var i=0,l=arguments.length;i<l;i++){dW=arguments[i];
this.__fh(dW);
qx.lang.Array.remove(dV,dW);
}}else{this.__fh(dU);
qx.lang.Array.remove(dV,dU);
}return this;
},removeAt:function(cW){var cX=this.__fb;

if(!cX){throw new Error("Has no children!");
}var cY=cX[cW];

if(!cY){throw new Error("Has no child at this position!");
}this.__fh(cY);
qx.lang.Array.removeAt(this.__fb,cW);
return this;
},removeAll:function(){var dm=this.__fb;

if(dm){for(var i=0,l=dm.length;i<l;i++){this.__fh(dm[i]);
}dm.length=0;
}return this;
},getParent:function(){return this.__fd||null;
},insertInto:function(parent,cL){parent.__fg(this);

if(cL==null){parent.__fb.push(this);
}else{qx.lang.Array.insertAt(this.__fb,this,cL);
}return this;
},insertBefore:function(de){var parent=de.__fd;
parent.__fg(this);
qx.lang.Array.insertBefore(parent.__fb,this,de);
return this;
},insertAfter:function(c){var parent=c.__fd;
parent.__fg(this);
qx.lang.Array.insertAfter(parent.__fb,this,c);
return this;
},moveTo:function(dB){var parent=this.__fd;
parent.__fi(this);
var dC=parent.__fb.indexOf(this);

if(dC===dB){throw new Error("Could not move to same index!");
}else if(dC<dB){dB--;
}qx.lang.Array.removeAt(parent.__fb,dC);
qx.lang.Array.insertAt(parent.__fb,this,dB);
return this;
},moveBefore:function(bB){var parent=this.__fd;
return this.moveTo(parent.__fb.indexOf(bB));
},moveAfter:function(s){var parent=this.__fd;
return this.moveTo(parent.__fb.indexOf(s)+1);
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
},setRoot:function(d){this.__eM=d;
},useMarkup:function(bS){if(this.__eL){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(ch,ce)){var bT=document.createElement(cg);
}else{var bT=qx.html.Element.__fj;

if(!bT){bT=qx.html.Element.__fj=document.createElement(cg);
}}bT.innerHTML=bS;
this.__eL=bT.firstChild;
this.__eL.$$element=this.$$hash;
this._copyData(true);
return this.__eL;
},useElement:function(S){if(this.__eL){throw new Error("Could not overwrite existing element!");
}this.__eL=S;
this.__eL.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var bO=this.getAttribute(cm);

if(bO>=1){return true;
}var bN=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bO>=0&&bN[this.__eE]){return true;
}return false;
},setSelectable:function(bH){this.setAttribute(cn,bH?cr:cj);
if(qx.core.Variant.isSet(ch,cx)){this.setStyle(cG,bH?cu:cd);
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
qx.html.Element._scheduleFlush(ci);
}if(this.__fd){this.__fd._scheduleChildrenUpdate();
}delete this.__eO;
},hide:function(){if(!this.__eO){return;
}
if(this.__eL){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}this.__eO=false;
},isVisible:function(){return this.__eO===true;
},scrollChildIntoViewX:function(cR,cS,cT){var cU=this.__eL;
var cV=cR.getDomElement();

if(cT!==false&&cU&&cU.offsetWidth&&cV&&cV.offsetWidth){qx.bom.element.Scroll.intoViewX(cV,cU,cS);
}else{this.__eP={element:cR,align:cS};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}delete this.__eR;
},scrollChildIntoViewY:function(dM,dN,dO){var dP=this.__eL;
var dQ=dM.getDomElement();

if(dO!==false&&dP&&dP.offsetWidth&&dQ&&dQ.offsetWidth){qx.bom.element.Scroll.intoViewY(dQ,dP,dN);
}else{this.__eQ={element:dM,align:dN};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}delete this.__eS;
},scrollToX:function(x,bI){var bJ=this.__eL;

if(bI!==true&&bJ&&bJ.offsetWidth){bJ.scrollLeft=x;
}else{this.__eR=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}delete this.__eP;
},getScrollX:function(){var bD=this.__eL;

if(bD){return bD.scrollLeft;
}return this.__eR||0;
},scrollToY:function(y,o){var p=this.__eL;

if(o!==true&&p&&p.offsetWidth){p.scrollTop=y;
}else{this.__eS=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}delete this.__eQ;
},getScrollY:function(){var bC=this.__eL;

if(bC){return bC.scrollTop;
}return this.__eS||0;
},getSelection:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,ct);
return this.getTextSelection();
},getSelectionLength:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,ck);
return this.getTextSelectionLength();
},setSelection:function(F,G){qx.log.Logger.deprecatedMethodWarning(arguments.callee,cF);
this.setTextSelection(F,G);
},clearSelection:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,ca);
this.clearTextSelection();
},getTextSelection:function(){var m=this.__eL;

if(m){return qx.bom.Selection.get(m);
}return null;
},getTextSelectionLength:function(){var bw=this.__eL;

if(bw){return qx.bom.Selection.getLength(bw);
}return null;
},setTextSelection:function(dp,dq){var dr=this.__eL;

if(dr){qx.bom.Selection.set(dr,dp,dq);
return;
}qx.html.Element.__eF[this.toHashCode()]={element:this,start:dp,end:dq};
qx.html.Element._scheduleFlush(ci);
},clearTextSelection:function(){var ed=this.__eL;

if(ed){qx.bom.Selection.clear(ed);
}delete qx.html.Element.__eF[this.toHashCode()];
},__fk:function(eb){var ec=qx.html.Element._actions;
ec.push({type:eb,element:this});
qx.html.Element._scheduleFlush(ci);
},focus:function(){this.__fk(cK);
},blur:function(){this.__fk(cJ);
},activate:function(){this.__fk(cs);
},deactivate:function(){this.__fk(cH);
},capture:function(){this.__fk(cE);
},releaseCapture:function(){this.__fk(cD);
},setStyle:function(du,dv,dw){if(!this.__eW){this.__eW={};
}
if(this.__eW[du]==dv){return;
}
if(dv==null){delete this.__eW[du];
}else{this.__eW[du]=dv;
}if(this.__eL){if(dw){qx.bom.element.Style.set(this.__eL,du,dv);
return this;
}if(!this.__eT){this.__eT={};
}this.__eT[du]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}return this;
},setStyles:function(cN,cO){for(var cP in cN){this.setStyle(cP,cN[cP],cO);
}return this;
},removeStyle:function(bp,bq){this.setStyle(bp,null,bq);
},getStyle:function(E){return this.__eW?this.__eW[E]:null;
},getAllStyles:function(){return this.__eW||null;
},setAttribute:function(bK,bL,bM){if(!this.__eX){this.__eX={};
}
if(this.__eX[bK]==bL){return;
}
if(bL==null){delete this.__eX[bK];
}else{this.__eX[bK]=bL;
}if(this.__eL){if(bM){qx.bom.element.Attribute.set(this.__eL,bK,bL);
return this;
}if(!this.__eU){this.__eU={};
}this.__eU[bK]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}return this;
},setAttributes:function(t,u){for(var v in t){this.setAttribute(v,t[v],u);
}return this;
},removeAttribute:function(bW,bX){this.setAttribute(bW,null,bX);
},getAttribute:function(dt){return this.__eX?this.__eX[dt]:null;
},_applyProperty:function(name,dA){},_setProperty:function(by,bz,bA){if(!this.__eY){this.__eY={};
}
if(this.__eY[by]==bz){return;
}
if(bz==null){delete this.__eY[by];
}else{this.__eY[by]=bz;
}if(this.__eL){if(bA){this._applyProperty(by,bz);
return this;
}if(!this.__eV){this.__eV={};
}this.__eV[by]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(ci);
}return this;
},_removeProperty:function(q,r){this._setProperty(q,null,r);
},_getProperty:function(dR){var dS=this.__eY;

if(!dS){return null;
}var dT=dS[dR];
return dT==null?null:dT;
},addListener:function(e,f,self,g){var h;

if(this.$$disposed){return null;
}{};

if(this.__eL){return qx.event.Registration.addListener(this.__eL,e,f,self,g);
}
if(!this.__fa){this.__fa={};
}
if(g==null){g=false;
}var j=qx.event.Manager.getNextUniqueId();
var k=e+(g?bY:cy)+j;
this.__fa[k]={type:e,listener:f,self:self,capture:g,unique:j};
return k;
},removeListener:function(dD,dE,self,dF){var dG;

if(this.$$disposed){return null;
}{};

if(this.__eL){qx.event.Registration.removeListener(this.__eL,dD,dE,self,dF);
}else{var dI=this.__fa;
var dH;

if(dF==null){dF=false;
}
for(var dJ in dI){dH=dI[dJ];
if(dH.listener===dE&&dH.self===self&&dH.capture===dF&&dH.type===dD){delete dI[dJ];
break;
}}}return this;
},removeListenerById:function(ds){if(this.$$disposed){return null;
}
if(this.__eL){qx.event.Registration.removeListenerById(this.__eL,ds);
}else{delete this.__fa[ds];
}return this;
},hasListener:function(br,bs){if(this.$$disposed){return false;
}
if(this.__eL){return qx.event.Registration.hasListener(this.__eL,br,bs);
}var bu=this.__fa;
var bt;

if(bs==null){bs=false;
}
for(var bv in bu){bt=bu[bv];
if(bt.capture===bs&&bt.type===br){return true;
}}return false;
}},defer:function(dz){dz.__fl=new qx.util.DeferredCall(dz.flush,dz);
},destruct:function(){var bE=this.__eL;

if(bE){qx.event.Registration.getManager(bE).removeAllListeners(bE);
bE.$$element=cf;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fd;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(cc);
this._disposeFields(cB,co,cp,cw,cv,cI,cz,cl,cC,cA,cq);
}});
})();
(function(){var b="qx.ui.core.queue.Manager",a="useraction";
qx.Class.define(b,{statics:{__fm:false,__fn:{},scheduleFlush:function(d){var self=qx.ui.core.queue.Manager;
self.__fn[d]=true;

if(!self.__fm){self.__fp.schedule();
self.__fm=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fo){return;
}self.__fo=true;
self.__fp.cancel();
var c=self.__fn;

while(c.visibility||c.widget||c.appearance||c.layout||c.element){if(c.widget){delete c.widget;
qx.ui.core.queue.Widget.flush();
}
if(c.visibility){delete c.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(c.appearance){delete c.appearance;
qx.ui.core.queue.Appearance.flush();
}if(c.widget||c.visibility||c.appearance){continue;
}
if(c.layout){delete c.layout;
qx.ui.core.queue.Layout.flush();
}if(c.widget||c.visibility||c.appearance||c.layout){continue;
}
if(c.element){delete c.element;
qx.html.Element.flush();
}}qx.ui.core.queue.Manager.__fm=false;

if(c.dispose){delete c.dispose;
qx.ui.core.queue.Dispose.flush();
}self.__fo=false;
}},defer:function(e){e.__fp=new qx.util.DeferredCall(e.flush);
qx.html.Element._scheduleFlush=e.scheduleFlush;
qx.event.Registration.addListener(window,a,e.flush);
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
(function(){var bu="keydown",bt="keypress",bs="qx.client",br="NumLock",bq="keyup",bp="Enter",bo="0",bn="9",bm="-",bl="PageUp",cF="+",cE="PrintScreen",cD="gecko",cC="A",cB="Z",cA="Left",cz="F5",cy="Down",cx="Up",cw="F11",bB="F6",bC="useraction",bz="F3",bA="keyinput",bx="Insert",by="F8",bv="End",bw="/",bJ="Delete",bK="*",bY="F1",bU="F4",ch="Home",cc="F2",cs="F12",cm="PageDown",bP="F7",cv="F9",cu="F10",ct="Right",bN="text",bR="Escape",bT="webkit",bW="5",ca="3",cd="Meta",cj="7",co="CapsLock",bD="__fs",bE="input",bQ="Control",cg="Space",cf="Tab",ce="Shift",cl="Pause",ck="Unidentified",cb="__fq",ci="qx.event.handler.Keyboard",bi="mshtml",cn="mshtml|webkit",bF="6",bG="off",bV="Apps",bj="4",bk="Alt",bM="2",bH="Scroll",bI="1",bL="8",bX="Win",cq="__ft",cp="__fr",bS="autoComplete",cr=",",bO="Backspace";
qx.Class.define(ci,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(m){arguments.callee.base.call(this);
this.__fq=m;
this.__fr=m.getWindow();
if(qx.core.Variant.isSet(bs,cD)){this.__fs=this.__fr;
}else{this.__fs=this.__fr.document.documentElement;
}this.__ft={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(f){if(this._identifierToKeyCodeMap[f]){return true;
}
if(f.length!=1){return false;
}
if(f>=bo&&f<=bn){return true;
}
if(f>=cC&&f<=cB){return true;
}
switch(f){case cF:case bm:case bK:case bw:return true;
default:return false;
}}},members:{__fu:null,__fq:null,__fr:null,__fs:null,__ft:null,__fv:null,__fw:null,canHandleEvent:function(bg,bh){},registerEvent:function(G,H,I){},unregisterEvent:function(o,p,q){},_fireInputEvent:function(Q,R){var S=this.__fq.getHandler(qx.event.handler.Focus);
var T=S.getActive();
if(!T||T.offsetWidth==0){T=S.getFocus();
}if(T&&T.offsetWidth!=0){var event=qx.event.Registration.createEvent(bA,qx.event.type.KeyInput,[Q,T,R]);
this.__fq.dispatchEvent(T,event);
}if(this.__fr){qx.event.Registration.fireEvent(this.__fr,bC,qx.event.type.Data,[bA]);
}},_fireSequenceEvent:function(r,s,t){var u=this.__fq.getHandler(qx.event.handler.Focus);
var w=u.getActive();
if(!w||w.offsetWidth==0){w=u.getFocus();
}if(!w||w.offsetWidth==0){w=this.__fq.getWindow().document.body;
}var event=qx.event.Registration.createEvent(s,qx.event.type.KeySequence,[r,w,t]);
this.__fq.dispatchEvent(w,event);
if(qx.core.Variant.isSet(bs,cn)){if(s==bu&&event.getDefaultPrevented()){var v=r.keyCode;

if(!(this._isNonPrintableKeyCode(v)||v==8||v==9)){this._fireSequenceEvent(r,bt,t);
}}}if(this.__fr){qx.event.Registration.fireEvent(this.__fr,bC,qx.event.type.Data,[s]);
}},_initKeyObserver:function(){this.__fu=qx.lang.Function.listener(this.__fx,this);
this.__fw=qx.lang.Function.listener(this.__fz,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fs,bq,this.__fu);
Event.addNativeListener(this.__fs,bu,this.__fu);
Event.addNativeListener(this.__fs,bt,this.__fw);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fs,bq,this.__fu);
Event.removeNativeListener(this.__fs,bu,this.__fu);
Event.removeNativeListener(this.__fs,bt,this.__fw);

for(var V in (this.__fv||{})){var U=this.__fv[V];
Event.removeNativeListener(U.target,bt,U.callback);
}delete (this.__fv);
},__fx:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bs,{"mshtml":function(X){X=window.event||X;
var bb=X.keyCode;
var Y=0;
var ba=X.type;
if(!(this.__ft[bb]==bu&&ba==bu)){this._idealKeyHandler(bb,Y,ba,X);
}if(ba==bu){if(this._isNonPrintableKeyCode(bb)||bb==8||bb==9){this._idealKeyHandler(bb,Y,bt,X);
}}this.__ft[bb]=ba;
},"gecko":function(x){var B=this._keyCodeFix[x.keyCode]||x.keyCode;
var z=0;
var A=x.type;
if(qx.bom.client.Platform.WIN){var y=B?this._keyCodeToIdentifier(B):this._charCodeToIdentifier(z);

if(!(this.__ft[y]==bu&&A==bu)){this._idealKeyHandler(B,z,A,x);
}this.__ft[y]=A;
}else{this._idealKeyHandler(B,z,A,x);
}this.__fy(x.target,A,B);
},"webkit":function(h){var k=0;
var i=0;
var j=h.type;
if(qx.bom.client.Engine.VERSION<525.13){if(j==bq||j==bu){k=this._charCode2KeyCode[h.charCode]||h.keyCode;
}else{if(this._charCode2KeyCode[h.charCode]){k=this._charCode2KeyCode[h.charCode];
}else{i=h.charCode;
}}this._idealKeyHandler(k,i,j,h);
}else{k=h.keyCode;
if(!(this.__ft[k]==bu&&j==bu)){this._idealKeyHandler(k,i,j,h);
}if(j==bu){if(this._isNonPrintableKeyCode(k)||k==8||k==9){this._idealKeyHandler(k,i,bt,h);
}}this.__ft[k]=j;
}},"opera":function(bd){this._idealKeyHandler(bd.keyCode,0,bd.type,bd);
}})),__fy:qx.core.Variant.select(bs,{"gecko":function(J,K,L){if(K===bu&&(L==33||L==34||L==38||L==40)&&J.type==bN&&J.tagName.toLowerCase()===bE&&J.getAttribute(bS)!==bG){if(!this.__fv){this.__fv={};
}var N=qx.core.ObjectRegistry.toHashCode(J);

if(this.__fv[N]){return;
}var self=this;
this.__fv[N]={target:J,callback:function(O){qx.bom.Event.stopPropagation(O);
self.__fz(O);
}};
var M=qx.event.GlobalError.observeMethod(this.__fv[N].callback);
qx.bom.Event.addNativeListener(J,bt,M);
}},"default":null}),__fz:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bs,{"mshtml":function(W){W=window.event||W;

if(this._charCode2KeyCode[W.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[W.keyCode],0,W.type,W);
}else{this._idealKeyHandler(0,W.keyCode,W.type,W);
}},"gecko":function(C){var F=this._keyCodeFix[C.keyCode]||C.keyCode;
var D=C.charCode;
var E=C.type;
this._idealKeyHandler(F,D,E,C);
},"webkit":function(cK){if(qx.bom.client.Engine.VERSION<525.13){var cN=0;
var cL=0;
var cM=cK.type;

if(cM==bq||cM==bu){cN=this._charCode2KeyCode[cK.charCode]||cK.keyCode;
}else{if(this._charCode2KeyCode[cK.charCode]){cN=this._charCode2KeyCode[cK.charCode];
}else{cL=cK.charCode;
}}this._idealKeyHandler(cN,cL,cM,cK);
}else{if(this._charCode2KeyCode[cK.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cK.keyCode],0,cK.type,cK);
}else{this._idealKeyHandler(0,cK.keyCode,cK.type,cK);
}}},"opera":function(n){if(this._keyCodeToIdentifierMap[n.keyCode]){this._idealKeyHandler(n.keyCode,0,n.type,n);
}else{this._idealKeyHandler(0,n.keyCode,n.type,n);
}}})),_idealKeyHandler:function(a,b,c,d){if(!a&&!b){return;
}var e;
if(a){e=this._keyCodeToIdentifier(a);
this._fireSequenceEvent(d,c,e);
}else{e=this._charCodeToIdentifier(b);
this._fireSequenceEvent(d,bt,e);
this._fireInputEvent(d,b);
}},_specialCharCodeMap:{8:bO,9:cf,13:bp,27:bR,32:cg},_keyCodeToIdentifierMap:{16:ce,17:bQ,18:bk,20:co,224:cd,37:cA,38:cx,39:ct,40:cy,33:bl,34:cm,35:bv,36:ch,45:bx,46:bJ,112:bY,113:cc,114:bz,115:bU,116:cz,117:bB,118:bP,119:by,120:cv,121:cu,122:cw,123:cs,144:br,44:cE,145:bH,19:cl,91:bX,93:bV},_numpadToCharCode:{96:bo.charCodeAt(0),97:bI.charCodeAt(0),98:bM.charCodeAt(0),99:ca.charCodeAt(0),100:bj.charCodeAt(0),101:bW.charCodeAt(0),102:bF.charCodeAt(0),103:cj.charCodeAt(0),104:bL.charCodeAt(0),105:bn.charCodeAt(0),106:bK.charCodeAt(0),107:cF.charCodeAt(0),109:bm.charCodeAt(0),110:cr.charCodeAt(0),111:bw.charCodeAt(0)},_charCodeA:cC.charCodeAt(0),_charCodeZ:cB.charCodeAt(0),_charCode0:bo.charCodeAt(0),_charCode9:bn.charCodeAt(0),_isNonPrintableKeyCode:function(g){return this._keyCodeToIdentifierMap[g]?true:false;
},_isIdentifiableKeyCode:function(P){if(P>=this._charCodeA&&P<=this._charCodeZ){return true;
}if(P>=this._charCode0&&P<=this._charCode9){return true;
}if(this._specialCharCodeMap[P]){return true;
}if(this._numpadToCharCode[P]){return true;
}if(this._isNonPrintableKeyCode(P)){return true;
}return false;
},_keyCodeToIdentifier:function(be){if(this._isIdentifiableKeyCode(be)){var bf=this._numpadToCharCode[be];

if(bf){return String.fromCharCode(bf);
}return (this._keyCodeToIdentifierMap[be]||this._specialCharCodeMap[be]||String.fromCharCode(be));
}else{return ck;
}},_charCodeToIdentifier:function(bc){return this._specialCharCodeMap[bc]||String.fromCharCode(bc).toUpperCase();
},_identifierToKeyCode:function(l){return qx.event.handler.Keyboard._identifierToKeyCodeMap[l]||l.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this._disposeFields(cb,cp,bD,cq);
},defer:function(cG,cH,cI){qx.event.Registration.addHandler(cG);
if(!cG._identifierToKeyCodeMap){cG._identifierToKeyCodeMap={};

for(var cJ in cH._keyCodeToIdentifierMap){cG._identifierToKeyCodeMap[cH._keyCodeToIdentifierMap[cJ]]=parseInt(cJ,10);
}
for(var cJ in cH._specialCharCodeMap){cG._identifierToKeyCodeMap[cH._specialCharCodeMap[cJ]]=parseInt(cJ,10);
}}
if(qx.core.Variant.isSet(bs,bi)){cH._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(bs,cD)){cH._keyCodeFix={12:cH._identifierToKeyCode(br)};
}else if(qx.core.Variant.isSet(bs,bT)){if(qx.bom.client.Engine.VERSION<525.13){cH._charCode2KeyCode={63289:cH._identifierToKeyCode(br),63276:cH._identifierToKeyCode(bl),63277:cH._identifierToKeyCode(cm),63275:cH._identifierToKeyCode(bv),63273:cH._identifierToKeyCode(ch),63234:cH._identifierToKeyCode(cA),63232:cH._identifierToKeyCode(cx),63235:cH._identifierToKeyCode(ct),63233:cH._identifierToKeyCode(cy),63272:cH._identifierToKeyCode(bJ),63302:cH._identifierToKeyCode(bx),63236:cH._identifierToKeyCode(bY),63237:cH._identifierToKeyCode(cc),63238:cH._identifierToKeyCode(bz),63239:cH._identifierToKeyCode(bU),63240:cH._identifierToKeyCode(cz),63241:cH._identifierToKeyCode(bB),63242:cH._identifierToKeyCode(bP),63243:cH._identifierToKeyCode(by),63244:cH._identifierToKeyCode(cv),63245:cH._identifierToKeyCode(cu),63246:cH._identifierToKeyCode(cw),63247:cH._identifierToKeyCode(cs),63248:cH._identifierToKeyCode(cE),3:cH._identifierToKeyCode(bp),12:cH._identifierToKeyCode(br),13:cH._identifierToKeyCode(bp)};
}else{cH._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var t="qx.client",s="mouseup",r="click",q="mousedown",p="contextmenu",o="dblclick",n="mousewheel",m="mouseover",l="mouseout",k="DOMMouseScroll",d="on",j="mshtml|webkit|opera",g="mousemove",c="__fB",b="useraction",f="__fC",e="__fA",h="__fH",a="gecko|webkit",i="qx.event.handler.Mouse";
qx.Class.define(i,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(P){arguments.callee.base.call(this);
this.__fA=P;
this.__fB=P.getWindow();
this.__fC=this.__fB.document.documentElement;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__fD:null,__fE:null,__fF:null,__fG:null,__fH:null,__fA:null,__fB:null,__fC:null,canHandleEvent:function(bb,bc){},registerEvent:qx.core.Variant.select(t,{"webkit":function(B,C,D){if(qx.bom.client.System.IPHONE){var E=qx.lang.Function.returnNull;
B[d+C]=E;
B[d+C]=undefined;
}},"default":qx.lang.Function.returnNull}),unregisterEvent:function(R,S,T){},__fI:function(u,v,w){if(!w){w=u.target||u.srcElement;
}if(w&&w.nodeType){qx.event.Registration.fireEvent(w,v||u.type,qx.event.type.Mouse,[u,w,null,true,true]);
}qx.event.Registration.fireEvent(this.__fB,b,qx.event.type.Data,[v||u.type]);
},_initButtonObserver:function(){this.__fD=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fC,q,this.__fD);
Event.addNativeListener(this.__fC,s,this.__fD);
Event.addNativeListener(this.__fC,r,this.__fD);
Event.addNativeListener(this.__fC,o,this.__fD);
Event.addNativeListener(this.__fC,p,this.__fD);
},_initMoveObserver:function(){this.__fE=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fC,g,this.__fE);
Event.addNativeListener(this.__fC,m,this.__fE);
Event.addNativeListener(this.__fC,l,this.__fE);
},_initWheelObserver:function(){this.__fF=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var U=qx.core.Variant.isSet(t,j)?n:k;
Event.addNativeListener(this.__fC,U,this.__fF);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fC,q,this.__fD);
Event.removeNativeListener(this.__fC,s,this.__fD);
Event.removeNativeListener(this.__fC,r,this.__fD);
Event.removeNativeListener(this.__fC,o,this.__fD);
Event.removeNativeListener(this.__fC,p,this.__fD);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fC,g,this.__fE);
Event.removeNativeListener(this.__fC,m,this.__fE);
Event.removeNativeListener(this.__fC,l,this.__fE);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var ba=qx.core.Variant.isSet(t,j)?n:k;
Event.removeNativeListener(this.__fC,ba,this.__fF);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(Q){this.__fI(Q);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(F){var G=F.type;
var H=F.target||F.srcElement;
if(qx.core.Variant.isSet(t,a)){if(H&&H.nodeType==3){H=H.parentNode;
}}
if(this.__fJ){this.__fJ(F,G,H);
}
if(this.__fL){this.__fL(F,G,H);
}this.__fI(F,G,H);

if(this.__fK){this.__fK(F,G,H);
}
if(this.__fM){this.__fM(F,G,H);
}this.__fG=G;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(V){this.__fI(V,n);
}),__fJ:qx.core.Variant.select(t,{"webkit":function(M,N,O){if(qx.bom.client.Engine.VERSION<530){if(N==p){this.__fI(M,s,O);
}}},"default":null}),__fK:qx.core.Variant.select(t,{"opera":function(I,J,K){if(J==s&&I.button==2){this.__fI(I,p,K);
}},"default":null}),__fL:qx.core.Variant.select(t,{"mshtml":function(W,X,Y){if(X==s&&this.__fG==r){this.__fI(W,q,Y);
}else if(X==o){this.__fI(W,r,Y);
}},"default":null}),__fM:qx.core.Variant.select(t,{"mshtml":null,"default":function(x,y,z){switch(y){case q:this.__fH=z;
break;
case s:if(z!==this.__fH){var A=qx.dom.Hierarchy.getCommonParent(z,this.__fH);
this.__fI(x,r,A);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this._disposeFields(e,c,f,h);
},defer:function(L){qx.event.Registration.addHandler(L);
}});
})();
(function(){var d="qx.event.handler.Capture";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(e,f){},registerEvent:function(a,b,c){},unregisterEvent:function(h,i,j){}},defer:function(g){qx.event.Registration.addHandler(g);
}});
})();
(function(){var t="alias",s="copy",r="blur",q="mouseout",p="keydown",o="Ctrl",n="Shift",m="mousemove",l="move",k="mouseover",R="Alt",Q="keyup",P="mouseup",O="dragend",N="on",M="mousedown",L="qxDraggable",K="__fO",J="__fT",I="__fR",A="drag",B="__fP",y="drop",z="qxDroppable",w="qx.event.handler.DragDrop",x="droprequest",u="__fN",v="dragstart",C="__fS",D="__fU",F="dragchange",E="__fQ",H="dragleave",G="dragover";
qx.Class.define(w,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(V){arguments.callee.base.call(this);
this.__fN=V;
this.__fO=V.getWindow().document.documentElement;
this.__fN.addListener(this.__fO,M,this._onMouseDown,this);
this.__gb();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__fN:null,__fO:null,__fP:null,__fQ:null,__fR:null,__fS:null,__fT:null,__fU:null,__fV:null,__fW:null,__fX:false,__fY:0,__ga:0,canHandleEvent:function(X,Y){},registerEvent:function(ba,bb,bc){},unregisterEvent:function(c,d,f){},addType:function(bs){this.__fR[bs]=true;
},addAction:function(j){this.__fS[j]=true;
},supportsType:function(br){return !!this.__fR[br];
},supportsAction:function(bi){return !!this.__fS[bi];
},getData:function(W){if(!this.__gi||!this.__fP){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__fR[W]){throw new Error("Unsupported data type: "+W+"!");
}
if(!this.__fU[W]){this.__fV=W;
this.__gd(x,this.__fQ,false);
}
if(!this.__fU[W]){throw new Error("Please use a dragrequest listener to the drag target to fill the manager with data!");
}return this.__fU[W]||null;
},getCurrentAction:function(){return this.__fW;
},addData:function(a,b){this.__fU[a]=b;
},getCurrentType:function(){return this.__fV;
},__gb:function(){this.__fR={};
this.__fS={};
this.__fT={};
this.__fU={};
},__gc:function(){var U=this.__fS;
var S=this.__fT;
var T=null;

if(this.__gi){if(S.Shift&&S.Ctrl&&U.alias){T=t;
}else if(S.Shift&&S.Alt&&U.copy){T=s;
}else if(S.Shift&&U.move){T=l;
}else if(S.Alt&&U.alias){T=t;
}else if(S.Ctrl&&U.copy){T=s;
}else if(U.move){T=l;
}else if(U.copy){T=s;
}else if(U.alias){T=t;
}}
if(T!=this.__fW){this.__fW=T;
this.__gd(F,this.__fQ,false);
}},__gd:function(bk,bl,bm,bn){var bp=qx.event.Registration;
var bo=bp.createEvent(bk,qx.event.type.Drag,[bm,bn]);

if(this.__fQ!==this.__fP){if(bl==this.__fQ){bo.setRelatedTarget(this.__fP);
}else{bo.setRelatedTarget(this.__fQ);
}}return bp.dispatchEvent(bl,bo);
},__ge:function(bd){while(bd&&bd.nodeType==1){if(bd.getAttribute(L)==N){return bd;
}bd=bd.parentNode;
}return null;
},__gf:function(be){while(be&&be.nodeType==1){if(be.getAttribute(z)==N){return be;
}be=be.parentNode;
}return null;
},__gg:function(){this.__fQ=null;
this.__fN.removeListener(this.__fO,m,this._onMouseMove,this,true);
this.__fN.removeListener(this.__fO,P,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,r,this._onWindowBlur,this);
this.__gb();
},__gh:function(){if(this.__fX){this.__fN.removeListener(this.__fO,k,this._onMouseOver,this,true);
this.__fN.removeListener(this.__fO,q,this._onMouseOut,this,true);
this.__fN.removeListener(this.__fO,p,this._onKeyDown,this,true);
this.__fN.removeListener(this.__fO,Q,this._onKeyUp,this,true);
this.__gd(O,this.__fQ,false);
this.__fX=false;
}this.__gi=false;
this.__fP=null;
this.__gg();
},__gi:false,_onWindowBlur:function(e){this.__gh();
},_onKeyDown:function(e){var bt=e.getKeyIdentifier();

switch(bt){case R:case o:case n:if(!this.__fT[bt]){this.__fT[bt]=true;
this.__gc();
}}},_onKeyUp:function(e){var bh=e.getKeyIdentifier();

switch(bh){case R:case o:case n:if(this.__fT[bh]){this.__fT[bh]=false;
this.__gc();
}}},_onMouseDown:function(e){if(this.__fX){return;
}var bq=this.__ge(e.getTarget());

if(bq){this.__fY=e.getDocumentLeft();
this.__ga=e.getDocumentTop();
this.__fQ=bq;
this.__fN.addListener(this.__fO,m,this._onMouseMove,this,true);
this.__fN.addListener(this.__fO,P,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,r,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gi){this.__gd(y,this.__fP,false,e);
}if(this.__fX){e.stopPropagation();
}this.__gh();
},_onMouseMove:function(e){if(this.__fX){if(!this.__gd(A,this.__fQ,true,e)){this.__gh();
}}else{if(Math.abs(e.getDocumentLeft()-this.__fY)>3||Math.abs(e.getDocumentTop()-this.__ga)>3){if(this.__gd(v,this.__fQ,true,e)){this.__fX=true;
this.__fN.addListener(this.__fO,k,this._onMouseOver,this,true);
this.__fN.addListener(this.__fO,q,this._onMouseOut,this,true);
this.__fN.addListener(this.__fO,p,this._onKeyDown,this,true);
this.__fN.addListener(this.__fO,Q,this._onKeyUp,this,true);
var i=this.__fT;
i.Ctrl=e.isCtrlPressed();
i.Shift=e.isShiftPressed();
i.Alt=e.isAltPressed();
this.__gc();
}else{this.__gd(O,this.__fQ,false);
this.__gg();
}}}},_onMouseOver:function(e){var g=e.getTarget();
var h=this.__gf(g);

if(h&&h!=this.__fP){this.__gi=this.__gd(G,h,true,e);
this.__fP=h;
this.__gc();
}},_onMouseOut:function(e){var bf=e.getTarget();
var bg=this.__gf(bf);

if(bg&&bg==this.__fP){this.__gd(H,this.__fP,false,e);
this.__fP=null;
this.__gi=false;
qx.event.Timer.once(this.__gc,this,0);
}}},destruct:function(){this._disposeFields(E,B,u,K,I,C,J,D);
},defer:function(bj){qx.event.Registration.addHandler(bj);
}});
})();
(function(){var x="-",w="qx.event.handler.Element",v="_manager",u="_registeredEvents";
qx.Class.define(w,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(t){arguments.callee.base.call(this);
this._manager=t;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(r,s){},registerEvent:function(a,b,c){var f=qx.core.ObjectRegistry.toHashCode(a);
var d=f+x+b;
var e=qx.lang.Function.listener(this._onNative,this,d);
qx.bom.Event.addNativeListener(a,b,e);
this._registeredEvents[d]={element:a,type:b,listener:e};
},unregisterEvent:function(k,l,m){var p=this._registeredEvents;

if(!p){return;
}var q=qx.core.ObjectRegistry.toHashCode(k);
var n=q+x+l;
var o=this._registeredEvents[n];
qx.bom.Event.removeNativeListener(k,l,o.listener);
delete this._registeredEvents[n];
},_onNative:qx.event.GlobalError.observeMethod(function(g,h){var j=this._registeredEvents;

if(!j){return;
}var i=j[h];
qx.event.Registration.fireNonBubblingEvent(i.element,i.type,qx.event.type.Native,[g]);
})},destruct:function(){var z;
var A=this._registeredEvents;

for(var B in A){z=A[B];
qx.bom.Event.removeNativeListener(z.element,z.type,z.listener);
}this._disposeFields(v,u);
},defer:function(y){qx.event.Registration.addHandler(y);
}});
})();
(function(){var u="qx.event.handler.Appear",t="__gk",s="__gj",r="disappear",q="appear";
qx.Class.define(u,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(h){arguments.callee.base.call(this);
this.__gj=h;
this.__gk={};
qx.event.handler.Appear.__gl[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gl:{},refresh:function(){var f=this.__gl;

for(var g in f){f[g].refresh();
}}},members:{__gj:null,__gk:null,canHandleEvent:function(n,o){},registerEvent:function(a,b,c){var d=qx.core.ObjectRegistry.toHashCode(a);
var e=this.__gk;

if(e&&!e[d]){e[d]=a;
a.$$displayed=a.offsetWidth>0;
}},unregisterEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i);
var m=this.__gk;

if(!m){return;
}
if(m[l]){delete m[l];
i.$$displayed=null;
}},refresh:function(){var y=this.__gk;
var z;

for(var x in y){z=y[x];
var v=z.offsetWidth>0;

if((!!z.$$displayed)!==v){z.$$displayed=v;
var w=qx.event.Registration.createEvent(v?q:r);
this.__gj.dispatchEvent(z,w);
}}}},destruct:function(){this._disposeFields(s,t);
delete qx.event.handler.Appear.__gl[this.$$hash];
},defer:function(p){qx.event.Registration.addHandler(p);
}});
})();
(function(){var E="mshtml",D="",C="qx.client",B=">",A="<",z=" ",y="='",x="qx.bom.Element",w="div",v="' ",u="></";
qx.Class.define(x,{statics:{__gm:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},create:function(name,O,P){if(!P){P=window;
}
if(!name){throw new Error("The tag name is missing!");
}var R=this.__gm;
var Q=D;

for(var T in O){if(R[T]){Q+=T+y+O[T]+v;
}}var U;
if(Q!=D){if(qx.bom.client.Engine.MSHTML){U=P.document.createElement(A+name+z+Q+B);
}else{var S=P.document.createElement(w);
S.innerHTML=A+name+z+Q+u+name+B;
U=S.firstChild;
}}else{U=P.document.createElement(name);
}
for(var T in O){if(!R[T]){qx.bom.element.Attribute.set(U,T,O[T]);
}}return U;
},empty:function(ba){return ba.innerHTML=D;
},addListener:function(V,W,X,self,Y){return qx.event.Registration.addListener(V,W,X,self,Y);
},removeListener:function(J,K,L,self,M){return qx.event.Registration.removeListener(J,K,L,self,M);
},removeListenerById:function(d,e){return qx.event.Registration.removeListenerById(d,e);
},hasListener:function(a,b,c){return qx.event.Registration.hasListener(a,b,c);
},focus:function(I){qx.event.Registration.getManager(I).getHandler(qx.event.handler.Focus).focus(I);
},blur:function(H){qx.event.Registration.getManager(H).getHandler(qx.event.handler.Focus).blur(H);
},activate:function(G){qx.event.Registration.getManager(G).getHandler(qx.event.handler.Focus).activate(G);
},deactivate:function(bb){qx.event.Registration.getManager(bb).getHandler(qx.event.handler.Focus).deactivate(bb);
},capture:function(F){qx.event.Registration.getManager(F).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(F);
},releaseCapture:function(N){qx.event.Registration.getManager(N).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(N);
},clone:function(f,g){var m;

if(g||(qx.core.Variant.isSet(C,E)&&!qx.xml.Document.isXmlDocument(f))){var q=qx.event.Registration.getManager(f);
var h=qx.dom.Hierarchy.getDescendants(f);
h.push(f);
}if(qx.core.Variant.isSet(C,E)){for(var i=0,l=h.length;i<l;i++){q.toggleAttachedEvents(h[i],false);
}}var m=f.cloneNode(true);
if(qx.core.Variant.isSet(C,E)){for(var i=0,l=h.length;i<l;i++){q.toggleAttachedEvents(h[i],true);
}}if(g===true){var t=qx.dom.Hierarchy.getDescendants(m);
t.push(m);
var k,o,s,n;

for(var i=0,r=h.length;i<r;i++){s=h[i];
k=q.serializeListeners(s);

if(k.length>0){o=t[i];

for(var j=0,p=k.length;j<p;j++){n=k[j];
q.addListener(o,n.type,n.handler,n.self,n.capture);
}}}}return m;
}}});
})();
(function(){var bi="qx.client",bh="blur",bg="focus",bf="mousedown",be="on",bd="mouseup",bc="DOMFocusOut",bb="DOMFocusIn",ba="selectstart",Y="onmousedown",bJ="onfocusout",bI="onfocusin",bH="onmouseup",bG="onselectstart",bF="draggesture",bE="_document",bD="gecko",bC="_root",bB="qx.event.handler.Focus",bA="_applyFocus",bp="_window",bq="deactivate",bn="qxIsRootPage",bo="_applyActive",bl="input",bm="focusin",bj="qxSelectable",bk="tabIndex",br="off",bs="_body",bv="activate",bu="1",bx="focusout",bw="__mouseActive",bz="_manager",by="qxKeepFocus",bt="qxKeepActive";
qx.Class.define(bB,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(a){arguments.callee.base.call(this);
this._manager=a;
this._window=a.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:bo,nullable:true},focus:{apply:bA,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gn:null,__go:null,__gp:null,__gq:null,__gr:null,__gs:null,__gt:null,__gu:null,__gv:null,__gw:null,canHandleEvent:function(W,X){},registerEvent:function(q,r,s){},unregisterEvent:function(l,m,n){},focus:function(o){try{o.focus();
}catch(bU){}this.setFocus(o);
this.setActive(o);
},activate:function(p){this.setActive(p);
},blur:function(J){try{J.blur();
}catch(b){}
if(this.getActive()===J){this.resetActive();
}
if(this.getFocus()===J){this.resetFocus();
}},deactivate:function(T){if(this.getActive()===T){this.resetActive();
}},tryActivate:function(v){var w=this.__gK(v);

if(w){this.setActive(w);
}},__gx:function(K,L,M,N){var P=qx.event.Registration;
var O=P.createEvent(M,qx.event.type.Focus,[K,L,N]);
P.dispatchEvent(K,O);
},_windowFocused:true,__gy:function(){if(this._windowFocused){this._windowFocused=false;
this.__gx(this._window,null,bh,false);
}},__gz:function(){if(!this._windowFocused){this._windowFocused=true;
this.__gx(this._window,null,bg,false);
}},_initObserver:qx.core.Variant.select(bi,{"gecko":function(){this.__gn=qx.lang.Function.listener(this.__gF,this);
this.__go=qx.lang.Function.listener(this.__gG,this);
this.__gp=qx.lang.Function.listener(this.__gE,this);
this.__gq=qx.lang.Function.listener(this.__gD,this);
this.__gr=qx.lang.Function.listener(this.__gA,this);
this._document.addEventListener(bf,this.__gn,true);
this._document.addEventListener(bd,this.__go,true);
this._window.addEventListener(bg,this.__gp,true);
this._window.addEventListener(bh,this.__gq,true);
this._window.addEventListener(bF,this.__gr,true);
},"mshtml":function(){this.__gn=qx.lang.Function.listener(this.__gF,this);
this.__go=qx.lang.Function.listener(this.__gG,this);
this.__gt=qx.lang.Function.listener(this.__gB,this);
this.__gu=qx.lang.Function.listener(this.__gC,this);
this.__gs=qx.lang.Function.listener(this.__gH,this);
this._document.attachEvent(Y,this.__gn);
this._document.attachEvent(bH,this.__go);
this._document.attachEvent(bI,this.__gt);
this._document.attachEvent(bJ,this.__gu);
this._document.attachEvent(bG,this.__gs);
},"webkit":function(){this.__gn=qx.lang.Function.listener(this.__gF,this);
this.__go=qx.lang.Function.listener(this.__gG,this);
this.__gu=qx.lang.Function.listener(this.__gC,this);
this.__gp=qx.lang.Function.listener(this.__gE,this);
this.__gq=qx.lang.Function.listener(this.__gD,this);
this.__gs=qx.lang.Function.listener(this.__gH,this);
this._document.addEventListener(bf,this.__gn,true);
this._document.addEventListener(bd,this.__go,true);
this._document.addEventListener(ba,this.__gs,false);
this._window.addEventListener(bc,this.__gu,true);
this._window.addEventListener(bg,this.__gp,true);
this._window.addEventListener(bh,this.__gq,true);
},"opera":function(){this.__gn=qx.lang.Function.listener(this.__gF,this);
this.__go=qx.lang.Function.listener(this.__gG,this);
this.__gt=qx.lang.Function.listener(this.__gB,this);
this.__gu=qx.lang.Function.listener(this.__gC,this);
this._document.addEventListener(bf,this.__gn,true);
this._document.addEventListener(bd,this.__go,true);
this._window.addEventListener(bb,this.__gt,true);
this._window.addEventListener(bc,this.__gu,true);
}}),_stopObserver:qx.core.Variant.select(bi,{"gecko":function(){this._document.removeEventListener(bf,this.__gn,true);
this._document.removeEventListener(bd,this.__go,true);
this._window.removeEventListener(bg,this.__gp,true);
this._window.removeEventListener(bh,this.__gq,true);
this._window.removeEventListener(bF,this.__gr,true);
},"mshtml":function(){this._document.detachEvent(Y,this.__gn);
this._document.detachEvent(bH,this.__go);
this._document.detachEvent(bI,this.__gt);
this._document.detachEvent(bJ,this.__gu);
this._document.detachEvent(bG,this.__gs);
},"webkit":function(){this._document.removeEventListener(bf,this.__gn,true);
this._document.removeEventListener(ba,this.__gs,false);
this._window.removeEventListener(bb,this.__gt,true);
this._window.removeEventListener(bc,this.__gu,true);
this._window.removeEventListener(bg,this.__gp,true);
this._window.removeEventListener(bh,this.__gq,true);
},"opera":function(){this._document.removeEventListener(bf,this.__gn,true);
this._window.removeEventListener(bb,this.__gt,true);
this._window.removeEventListener(bc,this.__gu,true);
this._window.removeEventListener(bg,this.__gp,true);
this._window.removeEventListener(bh,this.__gq,true);
}}),__gA:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"gecko":function(e){if(!this.__gL(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gB:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"mshtml":function(e){this.__gz();
var y=e.srcElement;
var x=this.__gJ(y);

if(x){this.setFocus(x);
}this.tryActivate(y);
},"opera":function(e){var bP=e.target;

if(bP==this._document||bP==this._window){this.__gz();

if(this.__gv){this.setFocus(this.__gv);
delete this.__gv;
}
if(this.__gw){this.setActive(this.__gw);
delete this.__gw;
}}else{this.setFocus(bP);
this.tryActivate(bP);
if(!this.__gL(bP)){bP.selectionStart=0;
bP.selectionEnd=0;
}}},"default":null})),__gC:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"mshtml":function(e){if(!e.toElement){this.__gy();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var bS=e.target;

if(bS===this.getFocus()){this.resetFocus();
}
if(bS===this.getActive()){this.resetActive();
}},"opera":function(e){var C=e.target;

if(C==this._document){this.__gy();
this.__gv=this.getFocus();
this.__gw=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(C===this.getFocus()){this.resetFocus();
}
if(C===this.getActive()){this.resetActive();
}}},"default":null})),__gD:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__gy();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__gy();
this.__gv=this.getFocus();
this.__gw=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__gE:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"gecko":function(e){var bT=e.target;

if(bT===this._window||bT===this._document){this.__gz();
bT=this._body;
}this.setFocus(bT);
this.tryActivate(bT);
},"webkit":function(e){var D=e.target;

if(D===this._window||D===this._document){this.__gz();

if(this.__gv){this.setFocus(this.__gv);
delete this.__gv;
}
if(this.__gw){this.setActive(this.__gw);
delete this.__gw;
}}else{this.setFocus(D);
this.tryActivate(D);
}},"default":null})),__gF:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"gecko":function(e){var f=e.target;
var c=this.__gJ(f);
var d=this.__gL(f);

if(!d){qx.bom.Event.preventDefault(e);
if(c){if(qx.core.Variant.isSet(bi,bD)){var g=qx.bom.element.Attribute.get(c,bn)===bu;

if(!g){c.focus();
}}else{c.focus();
}}}else if(!c){qx.bom.Event.preventDefault(e);
}},"mshtml":function(e){var u=e.srcElement;
var t=this.__gJ(u);

if(t){if(!this.__gL(u)){u.unselectable=be;
document.selection.empty();
t.focus();
}}else{qx.bom.Event.preventDefault(e);
if(!this.__gL(u)){u.unselectable=be;
}}},"webkit":function(e){var bR=e.target;
var bQ=this.__gJ(bR);

if(bQ){this.setFocus(bQ);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var bO=e.target;
var bM=this.__gJ(bO);

if(!this.__gL(bO)){qx.bom.Event.preventDefault(e);
if(bM){var bN=this.getFocus();

if(bN&&bN.selectionEnd){bN.selectionStart=0;
bN.selectionEnd=0;
bN.blur();
}if(bM){this.setFocus(bM);
}}}else if(bM){this.setFocus(bM);
}},"default":null})),__gG:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"mshtml":function(e){var R=e.srcElement;

if(R.unselectable){R.unselectable=br;
}var S=this.getFocus();

if(S&&R!=S&&S.nodeName.toLowerCase()===bl){R=S;
}this.tryActivate(R);
},"gecko":function(e){var Q=e.target;

while(Q&&Q.offsetWidth===undefined){Q=Q.parentNode;
}
if(Q){this.tryActivate(Q);
}},"webkit|opera":function(e){this.tryActivate(e.target);
},"default":null})),__gH:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bi,{"mshtml|webkit":function(e){var bL=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__gL(bL)){qx.bom.Event.preventDefault(e);
}},"default":null})),__gI:function(G){var H=qx.bom.element.Attribute.get(G,bk);

if(H>=1){return true;
}var I=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(H>=0&&I[G.tagName]){return true;
}return false;
},__gJ:function(bK){while(bK&&bK.nodeType===1){if(bK.getAttribute(by)==be){return null;
}
if(this.__gI(bK)){return bK;
}bK=bK.parentNode;
}return this._body;
},__gK:function(E){var F=E;

while(E&&E.nodeType===1){if(E.getAttribute(bt)==be){return null;
}E=E.parentNode;
}return F;
},__gL:function(j){while(j&&j.nodeType===1){var k=j.getAttribute(bj);

if(k!=null){return k===be;
}j=j.parentNode;
}return true;
},_applyActive:function(U,V){if(V){this.__gx(V,U,bq,true);
}
if(U){this.__gx(U,V,bv,true);
}},_applyFocus:function(h,i){if(i){this.__gx(i,h,bx,true);
}
if(h){this.__gx(h,i,bm,true);
}if(i){this.__gx(i,h,bh,false);
}
if(h){this.__gx(h,i,bg,false);
}}},destruct:function(){this._stopObserver();
this._disposeFields(bz,bp,bE,bC,bs,bw);
},defer:function(z){qx.event.Registration.addHandler(z);
var A=z.FOCUSABLE_ELEMENTS;

for(var B in A){A[B.toUpperCase()]=1;
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
qx.Class.define(n,{statics:{__gM:{names:{"class":k,"for":F,html:y,text:qx.core.Variant.isSet(q,v)?z:j,colspan:t,rowspan:m,valign:l,datetime:w,accesskey:o,tabindex:x,maxlength:u,readonly:p,longdesc:E,cellpadding:s,cellspacing:D,frameborder:C,usemap:A},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readonly:1,multiple:1,selected:1,noresize:1,defer:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:r,maxLength:10000000,className:r,innerHTML:r,innerText:r,textContent:r,htmlFor:r,tabIndex:0},original:{href:1,src:1,type:1}},compile:function(e){var f=[];
var h=this.__gM.runtime;

for(var g in e){if(!h[g]){f.push(g,B,e[g],i);
}}return f.join(r);
},get:qx.core.Variant.select(q,{"mshtml":function(J,name){var L=this.__gM;
var K;
name=L.names[name]||name;
if(L.original[name]){K=J.getAttribute(name,2);
}else if(L.property[name]){if(L.propertyDefault[name]&&K==L.propertyDefault[name]){return null;
}K=J[name];
}else{K=J.getAttribute(name);
}if(L.bools[name]){return !!K;
}return K;
},"default":function(G,name){var I=this.__gM;
var H;
name=I.names[name]||name;
if(I.property[name]){if(I.propertyDefault[name]&&H==I.propertyDefault[name]){return null;
}H=G[name];

if(H==null){H=G.getAttribute(name);
}}else{H=G.getAttribute(name);
}if(I.bools[name]){return !!H;
}return H;
}}),set:function(a,name,b){var c=this.__gM;
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
(function(){var k="qx.client",j="left",i="right",h="middle",g="dblclick",f="click",e="none",d="contextmenu",c="qx.event.type.Mouse",b="Chrome";
qx.Class.define(c,{extend:qx.event.type.Dom,members:{init:function(l,m,n,o,p){arguments.callee.base.call(this,l,m,n,o,p);

if(!n){this._relatedTarget=qx.bom.Event.getRelatedTarget(l);
}return this;
},__gN:qx.core.Variant.select(k,{"mshtml":{1:j,2:i,4:h},"default":{0:j,2:i,1:h}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case f:case g:return j;
case d:return i;
default:return this.__gN[this._native.button]||e;
}},isLeftPressed:function(){return this.getButton()===j;
},isMiddlePressed:function(){return this.getButton()===h;
},isRightPressed:function(){return this.getButton()===i;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(k,{"mshtml":function(){var q=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(q);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(k,{"mshtml":function(){var a=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(a);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
},getWheelDelta:qx.core.Variant.select(k,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(window.navigator.userAgent.indexOf(b)!==-1){return -(this._native.wheelDelta/120);
}else{return -(this._native.wheelDelta/40);
}}})}});
})();
(function(){var A="qx.client",z="qx.dom.Hierarchy",y="previousSibling",x="*",w="nextSibling",v="parentNode";
qx.Class.define(z,{statics:{getNodeIndex:function(P){var Q=0;

while(P&&(P=P.previousSibling)){Q++;
}return Q;
},getElementIndex:function(a){var b=0;
var c=qx.dom.Node.ELEMENT;

while(a&&(a=a.previousSibling)){if(a.nodeType==c){b++;
}}return b;
},getNextElementSibling:function(p){while(p&&(p=p.nextSibling)&&!qx.dom.Node.isElement(p)){continue;
}return p||null;
},getPreviousElementSibling:function(H){while(H&&(H=H.previousSibling)&&!qx.dom.Node.isElement(H)){continue;
}return H||null;
},contains:qx.core.Variant.select(A,{"webkit|mshtml|opera":function(M,N){if(qx.dom.Node.isDocument(M)){var O=qx.dom.Node.getDocument(N);
return M&&O==M;
}else if(qx.dom.Node.isDocument(N)){return false;
}else{return M.contains(N);
}},"gecko":function(f,g){return !!(f.compareDocumentPosition(g)&16);
},"default":function(h,i){while(i){if(h==i){return true;
}i=i.parentNode;
}return false;
}}),isRendered:function(s){if(!s.offsetParent){return false;
}var t=s.ownerDocument||s.document;
if(t.body.contains){return t.body.contains(s);
}if(t.compareDocumentPosition){return !!(t.compareDocumentPosition(s)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(d,e){return this.contains(e,d);
},getCommonParent:qx.core.Variant.select(A,{"mshtml|opera":function(I,J){if(I===J){return I;
}
while(I&&qx.dom.Node.isElement(I)){if(I.contains(J)){return I;
}I=I.parentNode;
}return null;
},"default":function(j,k){if(j===k){return j;
}var l={};
var o=qx.core.ObjectRegistry;
var n,m;

while(j||k){if(j){n=o.toHashCode(j);

if(l[n]){return l[n];
}l[n]=j;
j=j.parentNode;
}
if(k){m=o.toHashCode(k);

if(l[m]){return l[m];
}l[m]=k;
k=k.parentNode;
}}return null;
}}),getAncestors:function(F){return this._recursivelyCollect(F,v);
},getChildElements:function(K){K=K.firstChild;

if(!K){return [];
}var L=this.getNextSiblings(K);

if(K.nodeType===1){L.unshift(K);
}return L;
},getDescendants:function(r){return qx.lang.Array.fromCollection(r.getElementsByTagName(x));
},getFirstDescendant:function(q){q=q.firstChild;

while(q&&q.nodeType!=1){q=q.nextSibling;
}return q;
},getLastDescendant:function(U){U=U.lastChild;

while(U&&U.nodeType!=1){U=U.previousSibling;
}return U;
},getPreviousSiblings:function(E){return this._recursivelyCollect(E,y);
},getNextSiblings:function(u){return this._recursivelyCollect(u,w);
},_recursivelyCollect:function(R,S){var T=[];

while(R=R[S]){if(R.nodeType==1){T.push(R);
}}return T;
},getSiblings:function(G){return this.getPreviousSiblings(G).reverse().concat(this.getNextSiblings(G));
},isEmpty:function(V){V=V.firstChild;

while(V){if(V.nodeType===qx.dom.Node.ELEMENT||V.nodeType===qx.dom.Node.TEXT){return false;
}V=V.nextSibling;
}return true;
},cleanWhitespace:function(B){var C=B.firstChild;

while(C){var D=C.nextSibling;

if(C.nodeType==3&&!/\S/.test(C.nodeValue)){B.removeChild(C);
}C=D;
}}}});
})();
(function(){var b="qx.client",a="qx.event.type.Drag";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(c,d){arguments.callee.base.call(this,false,c);

if(d){this._native=d.getNativeEvent()||null;
this._originalTarget=d.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(f){var g=arguments.callee.base.call(this,f);
g._native=this._native;
return g;
},getDocumentLeft:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(l);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(b,{"mshtml":function(){if(this._native==null){return 0;
}var m=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(m);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(h){this.getManager().addType(h);
},addAction:function(o){this.getManager().addAction(o);
},supportsType:function(n){return this.getManager().supportsType(n);
},supportsAction:function(e){return this.getManager().supportsAction(e);
},addData:function(j,k){this.getManager().addData(j,k);
},getData:function(i){return this.getManager().getData(i);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var k="blur",j="__gQ",h="__gP",g="losecapture",f="capture",e="click",d="qx.event.dispatch.MouseCapture",c="focus",b="scroll",a="__gO";
qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(m){arguments.callee.base.call(this);
this.__gO=m;
this.__gP=m.getWindow();
m.addListener(this.__gP,k,this.releaseCapture,this);
m.addListener(this.__gP,c,this.releaseCapture,this);
m.addListener(this.__gP,b,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__gQ:null,__gO:null,__gP:null,canDispatchEvent:function(o,event,p){return (this.__gQ&&this.__gR[p]);
},dispatchEvent:function(q,event,r){if(r==e){event.stopPropagation();
this.releaseCapture();
return;
}var s=this.__gO.getListeners(this.__gQ,r,false);

if(s){event.setCurrentTarget(this.__gQ);
event.setEventPhase(qx.event.type.Event.AT_TARGET);

for(var i=0,l=s.length;i<l;i++){var t=s[i].context||event.getCurrentTarget();
s[i].handler.call(t,event);
}}},__gR:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(u){if(this.__gQ===u){return;
}
if(this.__gQ){this.releaseCapture();
}this.__gQ=u;
qx.event.Registration.fireEvent(u,f,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__gQ;
},releaseCapture:function(){var v=this.__gQ;

if(!v){return;
}this.__gQ=null;
qx.event.Registration.fireEvent(v,g,qx.event.type.Event,[true,false]);
}},destruct:function(){this._disposeFields(j,a,h);
},defer:function(n){qx.event.Registration.addDispatcher(n);
}});
})();
(function(){var r="qx.client",q="",p="mshtml",o="'",n="SelectionLanguage",m="qx.xml.Document",k=" />",j="MSXML2.DOMDocument.3.0",h='<\?xml version="1.0" encoding="utf-8"?>\n<',g="MSXML2.XMLHTTP.3.0",c="MSXML2.XMLHTTP.6.0",f=" xmlns='",e="text/xml",b="XPath",a="MSXML2.DOMDocument.6.0",d="HTML";
qx.Bootstrap.define(m,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(y){if(y.nodeType===9){return y.documentElement.nodeName!==d;
}else if(y.ownerDocument){return this.isXmlDocument(y.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(r,{"mshtml":function(s,t){var u=new ActiveXObject(this.DOMDOC);
u.setProperty(n,b);

if(t){var v=h;
v+=t;

if(s){v+=f+s+o;
}v+=k;
u.loadXML(v);
}return u;
},"default":function(C,D){return document.implementation.createDocument(C||q,D||q,null);
}}),fromString:qx.core.Variant.select(r,{"mshtml":function(A){var B=qx.xml.Document.create();
B.loadXML(A);
return B;
},"default":function(w){var x=new DOMParser();
return x.parseFromString(w,e);
}})},defer:function(E){if(qx.core.Variant.isSet(r,p)){var F=[a,j];
var G=[c,g];

for(var i=0,l=F.length;i<l;i++){try{new ActiveXObject(F[i]);
new ActiveXObject(G[i]);
}catch(z){continue;
}E.DOMDOC=F[i];
E.XMLHTTP=G[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(o,stop,p){var parent=o.parentNode;
var u=qx.dom.Node.getDocument(o);
var q=u.body;
var C,A,x;
var E,v,F;
var y,G,J;
var H,s,B,r;
var w,I,z;
var t=p===g;
var D=p===c;
stop=stop?stop.parentNode:u;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===q||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===q){A=parent.scrollLeft;
x=A+qx.bom.Viewport.getWidth();
E=qx.bom.Viewport.getWidth();
v=parent.clientWidth;
F=parent.scrollWidth;
y=0;
G=0;
J=0;
}else{C=qx.bom.element.Location.get(parent);
A=C.left;
x=C.right;
E=parent.offsetWidth;
v=parent.clientWidth;
F=parent.scrollWidth;
y=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
G=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
J=E-v-y-G;
}H=qx.bom.element.Location.get(o);
s=H.left;
B=H.right;
r=o.offsetWidth;
w=s-A-y;
I=B-x+G;
z=0;
if(t){z=w;
}else if(D){z=I+J;
}else if(w<0||r>v){z=w;
}else if(I>0){z=I+J;
}parent.scrollLeft+=z;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===q){break;
}parent=parent.parentNode;
}},intoViewY:function(K,stop,L){var parent=K.parentNode;
var R=qx.dom.Node.getDocument(K);
var M=R.body;
var ba,N,V;
var bc,Y,T;
var P,Q,O;
var be,bf,bb,U;
var X,S,bg;
var bd=L===d;
var W=L===e;
stop=stop?stop.parentNode:R;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===M||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===M){N=parent.scrollTop;
V=N+qx.bom.Viewport.getHeight();
bc=qx.bom.Viewport.getHeight();
Y=parent.clientHeight;
T=parent.scrollHeight;
P=0;
Q=0;
O=0;
}else{ba=qx.bom.element.Location.get(parent);
N=ba.top;
V=ba.bottom;
bc=parent.offsetHeight;
Y=parent.clientHeight;
T=parent.scrollHeight;
P=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
Q=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
O=bc-Y-P-Q;
}be=qx.bom.element.Location.get(K);
bf=be.top;
bb=be.bottom;
U=K.offsetHeight;
X=bf-N-P;
S=bb-V+Q;
bg=0;
if(bd){bg=X;
}else if(W){bg=S+O;
}else if(X<0||U>Y){bg=X;
}else if(S>0){bg=S+O;
}parent.scrollTop+=bg;
if(qx.bom.client.Engine.GECKO){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===M){break;
}parent=parent.parentNode;
}},intoView:function(l,stop,m,n){this.intoViewX(l,stop,m);
this.intoViewY(l,stop,n);
}}});
})();
(function(){var bm="borderTopWidth",bl="borderLeftWidth",bk="marginTop",bj="marginLeft",bi="scroll",bh="qx.client",bg="border-box",bf="borderBottomWidth",be="borderRightWidth",bd="auto",bB="padding",bA="qx.bom.element.Location",bz="paddingLeft",by="static",bx="marginBottom",bw="visible",bv="BODY",bu="paddingBottom",bt="paddingTop",bs="marginRight",bq="position",br="margin",bo="overflow",bp="paddingRight",bn="border";
qx.Class.define(bA,{statics:{__gS:function(v,w){return qx.bom.element.Style.get(v,w,qx.bom.element.Style.COMPUTED_MODE,false);
},__gT:function(bF,bG){return parseInt(qx.bom.element.Style.get(bF,bG,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__gU:function(z){var C=0,top=0;
if(z.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var B=qx.dom.Node.getWindow(z);
C-=qx.bom.Viewport.getScrollLeft(B);
top-=qx.bom.Viewport.getScrollTop(B);
}else{var A=qx.dom.Node.getDocument(z).body;
z=z.parentNode;
while(z&&z!=A){C+=z.scrollLeft;
top+=z.scrollTop;
z=z.parentNode;
}}return {left:C,top:top};
},__gV:qx.core.Variant.select(bh,{"mshtml":function(Y){var bb=qx.dom.Node.getDocument(Y);
var ba=bb.body;
var bc=0;
var top=0;
bc-=ba.clientLeft+bb.documentElement.clientLeft;
top-=ba.clientTop+bb.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){bc+=this.__gT(ba,bl);
top+=this.__gT(ba,bm);
}return {left:bc,top:top};
},"webkit":function(c){var e=qx.dom.Node.getDocument(c);
var d=e.body;
var f=d.offsetLeft;
var top=d.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){f+=this.__gT(d,bl);
top+=this.__gT(d,bm);
}return {left:f,top:top};
},"gecko":function(bC){var bD=qx.dom.Node.getDocument(bC).body;
var bE=bD.offsetLeft;
var top=bD.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){bE+=this.__gT(bD,bj);
top+=this.__gT(bD,bk);
}if(qx.bom.element.BoxSizing.get(bD)!==bg){bE+=this.__gT(bD,bl);
top+=this.__gT(bD,bm);
}return {left:bE,top:top};
},"default":function(j){var k=qx.dom.Node.getDocument(j).body;
var l=k.offsetLeft;
var top=k.offsetTop;
return {left:l,top:top};
}}),__gW:qx.core.Variant.select(bh,{"mshtml|webkit":function(D){var F=qx.dom.Node.getDocument(D);
if(D.getBoundingClientRect){var G=D.getBoundingClientRect();
var H=G.left;
var top=G.top;
}else{var H=D.offsetLeft;
var top=D.offsetTop;
D=D.offsetParent;
var E=F.body;
while(D&&D!=E){H+=D.offsetLeft;
top+=D.offsetTop;
H+=this.__gT(D,bl);
top+=this.__gT(D,bm);
D=D.offsetParent;
}}return {left:H,top:top};
},"gecko":function(R){if(R.getBoundingClientRect){var U=R.getBoundingClientRect();
var V=Math.round(U.left);
var top=Math.round(U.top);
}else{var V=0;
var top=0;
var S=qx.dom.Node.getDocument(R).body;
var T=qx.bom.element.BoxSizing;

if(T.get(R)!==bg){V-=this.__gT(R,bl);
top-=this.__gT(R,bm);
}
while(R&&R!==S){V+=R.offsetLeft;
top+=R.offsetTop;
if(T.get(R)!==bg){V+=this.__gT(R,bl);
top+=this.__gT(R,bm);
}if(R.parentNode&&this.__gS(R.parentNode,bo)!=bw){V+=this.__gT(R.parentNode,bl);
top+=this.__gT(R.parentNode,bm);
}R=R.offsetParent;
}}return {left:V,top:top};
},"default":function(O){var Q=0;
var top=0;
var P=qx.dom.Node.getDocument(O).body;
while(O&&O!==P){Q+=O.offsetLeft;
top+=O.offsetTop;
O=O.offsetParent;
}return {left:Q,top:top};
}}),get:function(bH,bI){if(bH.tagName==bv){var location=this.__gX(bH);
var bP=location.left;
var top=location.top;
}else{var bJ=this.__gV(bH);
var bO=this.__gW(bH);
var scroll=this.__gU(bH);
var bP=bO.left+bJ.left-scroll.left;
var top=bO.top+bJ.top-scroll.top;
}var bK=bP+bH.offsetWidth;
var bL=top+bH.offsetHeight;

if(bI){if(bI==bB||bI==bi){var bM=qx.bom.element.Overflow.getX(bH);

if(bM==bi||bM==bd){bK+=bH.scrollWidth-bH.offsetWidth+this.__gT(bH,bl)+this.__gT(bH,be);
}var bN=qx.bom.element.Overflow.getY(bH);

if(bN==bi||bN==bd){bL+=bH.scrollHeight-bH.offsetHeight+this.__gT(bH,bm)+this.__gT(bH,bf);
}}
switch(bI){case bB:bP+=this.__gT(bH,bz);
top+=this.__gT(bH,bt);
bK-=this.__gT(bH,bp);
bL-=this.__gT(bH,bu);
case bi:bP-=bH.scrollLeft;
top-=bH.scrollTop;
bK-=bH.scrollLeft;
bL-=bH.scrollTop;
case bn:bP+=this.__gT(bH,bl);
top+=this.__gT(bH,bm);
bK-=this.__gT(bH,be);
bL-=this.__gT(bH,bf);
break;
case br:bP-=this.__gT(bH,bj);
top-=this.__gT(bH,bk);
bK+=this.__gT(bH,bs);
bL+=this.__gT(bH,bx);
break;
}}return {left:bP,top:top,right:bK,bottom:bL};
},__gX:qx.core.Variant.select(bh,{"default":function(K){var top=K.offsetTop+this.__gT(K,bk);
var L=K.offsetLeft+this.__gT(K,bj);
return {left:L,top:top};
},"mshtml":function(a){var top=a.offsetTop;
var b=a.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__gT(a,bk);
b+=this.__gT(a,bj);
}return {left:b,top:top};
},"gecko":function(I){var top=I.offsetTop+this.__gT(I,bk)+this.__gT(I,bl);
var J=I.offsetLeft+this.__gT(I,bj)+this.__gT(I,bm);
return {left:J,top:top};
}}),getLeft:function(W,X){return this.get(W,X).left;
},getTop:function(x,y){return this.get(x,y).top;
},getRight:function(M,N){return this.get(M,N).right;
},getBottom:function(m,n){return this.get(m,n).bottom;
},getRelative:function(p,q,r,s){var u=this.get(p,r);
var t=this.get(q,s);
return {left:u.left-t.left,top:u.top-t.top,right:u.right-t.right,bottom:u.bottom-t.bottom};
},getPosition:function(o){return this.getRelative(o,this.getOffsetParent(o));
},getOffsetParent:function(g){var i=g.offsetParent||document.body;
var h=qx.bom.element.Style;

while(i&&(!/^body|html$/i.test(i.tagName)&&h.get(i,bq)===by)){i=i.offsetParent;
}return i;
}}});
})();
(function(){var z="textarea",y="input",x="qx.client",w="character",v="qx.bom.Selection",u="#text",t="EndToEnd",s="button",r="body";
qx.Class.define(v,{statics:{getSelectionObject:qx.core.Variant.select(x,{"mshtml":function(i){return i.selection;
},"default":function(b){return qx.dom.Node.getWindow(b).getSelection();
}}),get:qx.core.Variant.select(x,{"mshtml":function(A){var B=qx.bom.Range.get(qx.dom.Node.getDocument(A));
return B.text;
},"default":function(a){if(qx.dom.Node.isElement(a)&&(a.nodeName.toLowerCase()==y||a.nodeName.toLowerCase()==z)){return a.value.substring(a.selectionStart,a.selectionEnd);
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(a)).toString();
}return null;
}}),getLength:qx.core.Variant.select(x,{"mshtml":function(n){var p=qx.bom.Selection.get(n);
var o=qx.util.StringSplit.split(p,/\r\n/);
return p.length-(o.length-1);
},"opera":function(c){var h,f,d;

if(qx.dom.Node.isElement(c)&&(c.nodeName.toLowerCase()==y||c.nodeName.toLowerCase()==z)){var g=c.selectionStart;
var e=c.selectionEnd;
h=c.value.substring(g,e);
f=e-g;
}else{h=qx.bom.Selection.get(c);
f=h.length;
}d=qx.util.StringSplit.split(h,/\r\n/);
return f-(d.length-1);
},"default":function(J){if(qx.dom.Node.isElement(J)&&(J.nodeName.toLowerCase()==y||J.nodeName.toLowerCase()==z)){return J.selectionEnd-J.selectionStart;
}else{return qx.bom.Selection.get(J).length;
}return null;
}}),set:qx.core.Variant.select(x,{"mshtml":function(K,L,M){var N;
if(qx.dom.Node.isDocument(K)){K=K.body;
}
if(qx.dom.Node.isElement(K)||qx.dom.Node.isText(K)){switch(K.nodeName.toLowerCase()){case y:case z:case s:if(M===undefined){M=K.value.length;
}
if(L>=0&&L<=K.value.length&&M>=0&&M<=K.value.length){N=qx.bom.Range.get(K);
N.collapse(true);
N.moveStart(w,L);
N.moveEnd(w,M-L);
N.select();
return true;
}break;
case u:if(M===undefined){M=K.nodeValue.length;
}
if(L>=0&&L<=K.nodeValue.length&&M>=0&&M<=K.nodeValue.length){N=qx.bom.Range.get(qx.dom.Node.getBodyElement(K));
N.moveToElementText(K.parentNode);
N.collapse(true);
N.moveStart(w,L);
N.moveEnd(w,M-L);
N.select();
return true;
}break;
default:if(M===undefined){M=K.childNodes.length-1;
}if(K.childNodes[L]&&K.childNodes[M]){N=qx.bom.Range.get(qx.dom.Node.getBodyElement(K));
N.moveToElementText(K.childNodes[L]);
N.collapse(true);
var O=qx.bom.Range.get(qx.dom.Node.getBodyElement(K));
O.moveToElementText(K.childNodes[M]);
N.setEndPoint(t,O);
N.select();
return true;
}}}return false;
},"default":function(C,D,E){var I=C.nodeName.toLowerCase();

if(qx.dom.Node.isElement(C)&&(I==y||I==z)){if(E===undefined){E=C.value.length;
}if(D>=0&&D<=C.value.length&&E>=0&&E<=C.value.length){C.select();
C.setSelectionRange(D,E);
return true;
}}else{var G=false;
var H=qx.dom.Node.getWindow(C).getSelection();
var F=qx.bom.Range.get(C);
if(qx.dom.Node.isText(C)){if(E===undefined){E=C.length;
}
if(D>=0&&D<C.length&&E>=0&&E<=C.length){G=true;
}}else if(qx.dom.Node.isElement(C)){if(E===undefined){E=C.childNodes.length-1;
}
if(D>=0&&C.childNodes[D]&&E>=0&&C.childNodes[E]){G=true;
}}else if(qx.dom.Node.isDocument(C)){C=C.body;

if(E===undefined){E=C.childNodes.length-1;
}
if(D>=0&&C.childNodes[D]&&E>=0&&C.childNodes[E]){G=true;
}}
if(G){if(!H.isCollapsed){H.collapseToStart();
}F.setStart(C,D);
if(qx.dom.Node.isText(C)){F.setEnd(C,E);
}else{F.setEndAfter(C.childNodes[E]);
}if(H.rangeCount>0){H.removeAllRanges();
}H.addRange(F);
return true;
}}return false;
}}),setAll:function(q){return qx.bom.Selection.set(q,0);
},clear:qx.core.Variant.select(x,{"mshtml":function(j){var k=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(j));
var l=qx.bom.Range.get(j);
var parent=l.parentElement();
var m=qx.bom.Range.get(qx.dom.Node.getDocument(j));
if(parent==m.parentElement()&&parent==j){k.empty();
}},"default":function(P){var R=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(P));
var T=P.nodeName.toLowerCase();
if(qx.dom.Node.isElement(P)&&(T==y||T==z)){P.setSelectionRange(0,0);
qx.bom.Element.blur(P);
}else if(qx.dom.Node.isDocument(P)||T==r){R.collapse(P.body?P.body:P,0);
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
qx.Class.define(b,{statics:{__gY:{},remove:function(e){delete this.__gY[e.$$hash];
},add:function(c){var d=this.__gY;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var f=this.__gY;
var h;

for(var g in f){h=f[g];
delete f[g];
h.syncWidget();
}for(var g in f){return;
}this.__gY={};
}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__ha:{},__hb:{},remove:function(c){var d=c.$$hash;
delete this.__hb[d];
delete this.__ha[d];
},isVisible:function(o){return this.__hb[o.$$hash]||false;
},__hc:function(k){var m=this.__hb;
var l=k.$$hash;
var n;
if(k.isExcluded()){n=false;
}else{var parent=k.$$parent;

if(parent){n=this.__hc(parent);
}else{n=k.isRootWidget();
}}return m[l]=n;
},add:function(e){var f=this.__ha;

if(f[e.$$hash]){return;
}f[e.$$hash]=e;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var g=this.__ha;
var j=this.__hb;
for(var h in g){if(j[h]!=null){g[h].addChildrenToQueue(g);
}}var i={};

for(var h in g){i[h]=j[h];
j[h]=null;
}for(var h in g){if(j[h]==null){this.__hc(g[h]);
}if(j[h]&&j[h]!=i[h]){g[h].checkAppearanceNeeds();
}}this.__ha={};
}}});
})();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";
qx.Class.define(a,{statics:{__hd:{},remove:function(h){delete this.__hd[h.$$hash];
},add:function(i){var j=this.__hd;

if(j[i.$$hash]){return;
}j[i.$$hash]=i;
qx.ui.core.queue.Manager.scheduleFlush(b);
},has:function(g){return !!this.__hd[g.$$hash];
},flush:function(){var f=qx.ui.core.queue.Visibility;
var c=this.__hd;
var e;

for(var d in c){e=c[d];
delete c[d];
if(f.isVisible(e)){e.syncAppearance();
}else{e.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__he:{},add:function(c){var d=this.__he;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__he;

for(var f in e){e[f].dispose();
delete e[f];
}for(var f in e){return;
}this.__he={};
}}});
})();
(function(){var E="blur",D="focus",C="input",B="load",A="qx.ui.core.EventHandler",z="__hf",y="activate";
qx.Class.define(A,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){arguments.callee.base.call(this);
this.__hf=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hf:null,__hg:{focusin:1,focusout:1,focus:1,blur:1},__hh:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(w,x){return w instanceof qx.ui.core.Widget;
},_dispatchEvent:function(f){var m=f.getTarget();
var k=qx.ui.core.Widget.getWidgetByElement(m);
var n=false;

while(k&&k.isAnonymous()){var n=true;
k=k.getLayoutParent();
}if(k&&n&&f.getType()==y){k.getContainerElement().activate();
}if(this.__hg[f.getType()]){k=k&&k.getFocusTarget();
if(!k){return;
}}if(f.getRelatedTarget){var u=f.getRelatedTarget();
var t=qx.ui.core.Widget.getWidgetByElement(u);

while(t&&t.isAnonymous()){t=t.getLayoutParent();
}
if(t){if(this.__hg[f.getType()]){t=t.getFocusTarget();
}if(t===k){return;
}}}var p=f.getCurrentTarget();
var r=qx.ui.core.Widget.getWidgetByElement(p);

if(!r||r.isAnonymous()){return;
}if(this.__hg[f.getType()]){r=r.getFocusTarget();
}var s=f.getType();

if(!(r.isEnabled()||this.__hh[s])){return;
}var g=f.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var o=this.__hf.getListeners(r,s,g);

if(!o||o.length===0){return;
}var h=qx.event.Pool.getInstance().getObject(f.constructor);
f.clone(h);
h.setTarget(k);
h.setRelatedTarget(t||null);
h.setCurrentTarget(r);
var v=f.getOriginalTarget();

if(v){var j=qx.ui.core.Widget.getWidgetByElement(v);

while(j&&j.isAnonymous()){j=j.getLayoutParent();
}h.setOriginalTarget(j);
}else{h.setOriginalTarget(m);
}for(var i=0,l=o.length;i<l;i++){var q=o[i].context||r;
o[i].handler.call(q,h);
}if(h.getPropagationStopped()){f.stopPropagation();
}
if(h.getDefaultPrevented()){f.preventDefault();
}qx.event.Pool.getInstance().poolObject(h);
},registerEvent:function(F,G,H){var I;

if(G===D||G===E){I=F.getFocusElement();
}else if(G===B||G===C){I=F.getContentElement();
}else{I=F.getContainerElement();
}
if(I){I.addListener(G,this._dispatchEvent,this,H);
}},unregisterEvent:function(a,b,c){var d;

if(b===D||b===E){d=a.getFocusElement();
}else if(b===B||b===C){d=a.getContentElement();
}else{d=a.getContainerElement();
}
if(d){d.removeListener(b,this._dispatchEvent,this,c);
}}},destruct:function(){this._disposeFields(z);
},defer:function(e){qx.event.Registration.addHandler(e);
}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Bootstrap.define(c,{statics:{LOCALE:"",VARIANT:"",__hi:function(){var d=(qx.bom.client.Engine.MSHTML?navigator.userLanguage:navigator.language).toLowerCase();
var f=a;
var e=d.indexOf(b);

if(e!=-1){f=d.substr(e+1);
d=d.substr(0,e);
}this.LOCALE=d;
this.VARIANT=f;
}},defer:function(g){g.__hi();
}});
})();
(function(){var z='indexOf',y='slice',x='concat',w='toLocaleLowerCase',v="qx.type.BaseString",u="",t='match',s='toLocaleUpperCase',r='search',q='replace',j='toLowerCase',p='charCodeAt',n='split',h='substring',g='lastIndexOf',m='substr',k='toUpperCase',o='charAt';
qx.Class.define(v,{extend:Object,construct:function(a){var a=a||u;
this.__hj=a;
this.length=a.length;
},members:{$$isString:true,length:0,__hj:null,toString:function(){return this.__hj;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(b,c){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(d,e){{};
var f=[o,p,x,z,g,t,q,r,y,n,m,h,j,k,w,s];
e.valueOf=e.toString;

for(var i=0,l=f.length;i<l;i++){e[f[i]]=String.prototype[f[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){arguments.callee.base.call(this,b);
this.__hk=c;
this.__hl=d;
},members:{__hk:null,__hl:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__hk,this.__hl);
}}});
})();
(function(){var J="_",I="",H="qx.dynlocale",G="on",F="_applyLocale",E="changeLocale",D="__hm",C="C",B="__hn",A="qx.locale.Manager",y="String",z="singleton";
qx.Class.define(A,{type:z,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hm=qx.$$translations||{};
this.__hn=qx.$$locales||{};
var M=qx.bom.client.Locale;
var K=M.LOCALE;
var L=M.VARIANT;

if(L!==I){K+=J+L;
}this.setLocale(K||this.__ho);
},statics:{tr:function(s,t){var u=qx.lang.Array.fromArguments(arguments);
u.splice(0,1);
return qx.locale.Manager.getInstance().translate(s,u);
},trn:function(a,b,c,d){var e=qx.lang.Array.fromArguments(arguments);
e.splice(0,3);
if(c!=1){return qx.locale.Manager.getInstance().translate(b,e);
}else{return qx.locale.Manager.getInstance().translate(a,e);
}},trc:function(P,Q,R){var S=qx.lang.Array.fromArguments(arguments);
S.splice(0,2);
return qx.locale.Manager.getInstance().translate(Q,S);
},marktr:function(x){return x;
}},properties:{locale:{check:y,nullable:true,apply:F,event:E}},members:{__ho:C,__hp:null,__hq:null,__hm:null,__hn:null,getLanguage:function(){return this.__hq;
},getTerritory:function(){return this.getLocale().split(J)[1]||I;
},getAvailableLocales:function(){var w=[];

for(var v in this.__hn){if(v!=this.__ho){w.push(v);
}}return w;
},__hr:function(bc){var be;
var bd=bc.indexOf(J);

if(bd==-1){be=bc;
}else{be=bc.substring(0,bd);
}return be;
},_applyLocale:function(N,O){this.__hp=N;
this.__hq=this.__hr(N);
},addTranslation:function(f,g){var h=this.__hm;

if(h[f]){for(var j in g){h[f][j]=g[j];
}}else{h[f]=g;
}},translate:function(T,U,V){var bb;
var Y=this.__hm;

if(!Y){return T;
}
if(V){var X=this.__hr(V);
}else{V=this.__hp;
X=this.__hq;
}
if(!bb&&Y[V]){bb=Y[V][T];
}
if(!bb&&Y[X]){bb=Y[X][T];
}
if(!bb&&Y[this.__ho]){bb=Y[this.__ho][T];
}
if(!bb){bb=T;
}
if(U.length>0){var W=[];

for(var i=0;i<U.length;i++){var ba=U[i];

if(ba&&ba.translate){W[i]=ba.translate();
}else{W[i]=ba;
}}bb=qx.lang.String.format(bb,W);
}
if(qx.core.Variant.isSet(H,G)){bb=new qx.locale.LocalizedString(bb,T,U);
}return bb;
},localize:function(k,l,m){var r;
var p=this.__hn;

if(!p){return k;
}
if(m){var o=this.__hr(m);
}else{m=this.__hp;
o=this.__hq;
}
if(!r&&p[m]){r=p[m][k];
}
if(!r&&p[o]){r=p[o][k];
}
if(!r&&p[this.__ho]){r=p[this.__ho][k];
}
if(!r){r=k;
}
if(l.length>0){var n=[];

for(var i=0;i<l.length;i++){var q=l[i];

if(q.translate){n[i]=q.translate();
}else{n[i]=q;
}}r=qx.lang.String.format(r,n);
}
if(qx.core.Variant.isSet(H,G)){r=new qx.locale.LocalizedString(r,k,l);
}return r;
}},destruct:function(){this._disposeFields(D,B);
}});
})();
(function(){var f="source",e="scale",d="no-repeat",c="mshtml",b="qx.client",a="qx.html.Image";
qx.Class.define(a,{extend:qx.html.Element,members:{_applyProperty:function(name,h){arguments.callee.base.call(this,name,h);

if(name===f){var l=this.getDomElement();
var i=this.getAllStyles();
var j=this._getProperty(f);
var k=this._getProperty(e);
var m=k?e:d;
qx.bom.element.Decoration.update(l,j,m,i);
}},_createDomElement:function(){var p=this._getProperty(e);
var q=p?e:d;

if(qx.core.Variant.isSet(b,c)){var o=this._getProperty(f);
this.setNodeName(qx.bom.element.Decoration.getTagName(q,o));
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(q));
}return arguments.callee.base.call(this);
},_copyData:function(g){return arguments.callee.base.call(this,true);
},setSource:function(r){this._setProperty(f,r);
return this;
},getSource:function(){return this._getProperty(f);
},resetSource:function(){this._removeProperty(f);
return this;
},setScale:function(n){this._setProperty(e,n);
return this;
},getScale:function(){return this._getProperty(e);
}}});
})();
(function(){var i="replacement",h="Boolean",g="_applyScale",f="_applySource",e="-disabled.$1",d="changeSource",c="String",b="image",a="qx.ui.basic.Image";
qx.Class.define(a,{extend:qx.ui.core.Widget,construct:function(G){arguments.callee.base.call(this);

if(G){this.setSource(G);
}},properties:{source:{check:c,init:null,nullable:true,event:d,apply:f,themeable:true},scale:{check:h,init:false,themeable:true,apply:g},appearance:{refine:true,init:b},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},members:{__hs:null,__ht:null,_createContentElement:function(){return new qx.html.Image();
},_getContentHint:function(){return {width:this.__hs||0,height:this.__ht||0};
},_applyEnabled:function(j,k){arguments.callee.base.call(this,j,k);

if(this.getSource()){this._styleSource();
}},_applySource:function(n){this._styleSource();
},_applyScale:function(t){var u=this.getContentElement();
u.setScale(t);
},_styleSource:function(){var l=qx.util.AliasManager.getInstance().resolve(this.getSource());
var m=this.getContentElement();

if(!l){m.resetSource();
return;
}if(qx.util.ResourceManager.getInstance().has(l)){this.__hu(m,l);
}else if(qx.io2.ImageLoader.isLoaded(l)){this.__hv(m,l);
}else{this.__hw(m,l);
}},__hu:function(v,w){var y=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var x=w.replace(/\.([a-z]+)$/,e);

if(y.has(x)){w=x;
this.addState(i);
}else{this.removeState(i);
}}if(v.getSource()===w){return;
}v.setSource(w);
this.__hy(y.getImageWidth(w),y.getImageHeight(w));
},__hv:function(z,A){var C=qx.io2.ImageLoader;
z.setSource(A);
var B=C.getWidth(A);
var D=C.getHeight(A);
this.__hy(B,D);
},__hw:function(q,r){var self;
var s=qx.io2.ImageLoader;
{};
if(!s.isFailed(r)){s.load(r,this.__hx,this);
}else{if(q!=null){q.resetSource();
}}},__hx:function(o,p){if(o!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(p.failed){this.warn("Image could not be loaded: "+o);
}this._styleSource();
},__hy:function(E,F){if(E!==this.__hs||F!==this.__ht){this.__hs=E;
this.__ht=F;
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
(function(){var h="interval",g="Number",f="_applyTimeoutInterval",e="qx.event.type.Event",d="qx.event.Idle",c="__hz",b="singleton";
qx.Class.define(d,{extend:qx.core.Object,type:b,construct:function(){arguments.callee.base.call(this);
var i=new qx.event.Timer(this.getTimeoutInterval());
i.addListener(h,this._onInterval,this);
i.start();
this.__hz=i;
},events:{"interval":e},properties:{timeoutInterval:{check:g,init:100,apply:f}},members:{__hz:null,_applyTimeoutInterval:function(a){this.__hz.setInterval(a);
},_onInterval:function(){this.fireEvent(h);
}},destruct:function(){if(this.__hz){this.__hz.stop();
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
(function(){var h="mousedown",g="__hA",f="blur",d="singleton",c="qx.ui.popup.Manager";
qx.Class.define(c,{type:d,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__hA={};
qx.event.Registration.addListener(document.documentElement,h,this.__hC,this,true);
qx.bom.Element.addListener(window,f,this.hideAll,this);
},members:{__hA:null,add:function(n){{};
this.__hA[n.$$hash]=n;
this.__hB();
},remove:function(a){{};
var b=this.__hA;

if(b){delete b[a.$$hash];
this.__hB();
}},hideAll:function(){var m=this.__hA;

if(m){for(var l in m){m[l].exclude();
}}},__hB:function(){var k=1e7;
var j=this.__hA;

for(var i in j){j[i].setZIndex(k++);
}},__hC:function(e){var q=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var r=this.__hA;

for(var p in r){var o=r[p];

if(!o.getAutoHide()||q==o||qx.ui.core.Widget.contains(o,q)){continue;
}o.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,h,this.__hC,this,true);
this._disposeMap(g);
}});
})();
(function(){var f="abstract",e="qx.ui.layout.Abstract",d="__hD",c="__hE";
qx.Class.define(e,{type:f,extend:qx.core.Object,members:{__hD:null,_invalidChildrenCache:null,__hE:null,invalidateLayoutCache:function(){this.__hD=null;
},renderLayout:function(a,b){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__hD){return this.__hD;
}return this.__hD=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(h){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var g=this.__hE;

if(g instanceof qx.ui.core.LayoutItem){g.clearSeparators();
}},_renderSeparator:function(j,k){this.__hE.renderSeparator(j,k);
},connectToWidget:function(i){if(i&&this.__hE){throw new Error("It is not possible to manually set the connected widget.");
}this.__hE=i;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__hE;
},_applyLayoutChange:function(){if(this.__hE){this.__hE.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__hE.getLayoutChildren();
}},destruct:function(){this._disposeFields(c,d);
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
(function(){var H="label",G="icon",F="Boolean",E="left",D="both",C="String",B="_applyRich",A="_applyIcon",z="changeGap",y="_applyShow",r="right",x="_applyCenter",u="_applyIconPosition",p="qx.ui.basic.Atom",o="top",t="changeShow",s="bottom",v="_applyLabel",n="Integer",w="_applyGap",q="atom";
qx.Class.define(p,{extend:qx.ui.core.Widget,construct:function(a,b){{};
arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(a!=null){this.setLabel(a);
}
if(b!=null){this.setIcon(b);
}},properties:{appearance:{refine:true,init:q},label:{apply:v,nullable:true,dispose:true,check:C},rich:{check:F,init:false,apply:B},icon:{check:C,apply:A,nullable:true,themeable:true},gap:{check:n,nullable:false,event:z,apply:w,themeable:true,init:4},show:{init:D,check:[D,H,G],themeable:true,inheritable:true,apply:y,event:t},iconPosition:{init:E,check:[o,r,s,E],themeable:true,apply:u},center:{init:false,check:F,themeable:true,apply:x}},members:{_createChildControlImpl:function(l){var m;

switch(l){case H:m=new qx.ui.basic.Label(this.getLabel());
m.setAnonymous(true);
m.setRich(this.getRich());
this._add(m);

if(this.getLabel()==null||this.getShow()===G){m.exclude();
}break;
case G:m=new qx.ui.basic.Image(this.getIcon());
m.setAnonymous(true);
this._addAt(m,0);

if(this.getIcon()==null||this.getShow()===H){m.exclude();
}break;
}return m||arguments.callee.base.call(this,l);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===G){this._excludeChildControl(H);
}else{this._showChildControl(H);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===H){this._excludeChildControl(G);
}else{this._showChildControl(G);
}},_applyLabel:function(N,O){var P=this.getChildControl(H,true);

if(P){P.setValue(N);
}this._handleLabel();
},_applyRich:function(g,h){var i=this.getChildControl(H,true);

if(i){i.setRich(g);
}},_applyIcon:function(K,L){var M=this.getChildControl(G,true);

if(M){M.setSource(K);
}this._handleIcon();
},_applyGap:function(c,d){this._getLayout().setGap(c);
},_applyShow:function(I,J){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(j,k){this._getLayout().setIconPosition(j);
},_applyCenter:function(e,f){this._getLayout().setCenter(e);
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
(function(){var y="middle",x="qx.ui.layout.Util",w="left",v="center",u="top",t="bottom",s="right";
qx.Class.define(x,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(z,A,B){var D,H,C,I;
var E=A>B;
var J=Math.abs(A-B);
var K,F;
var G={};

for(H in z){D=z[H];
G[H]={potential:E?D.max-D.value:D.value-D.min,flex:E?D.flex:1/D.flex,offset:0};
}while(J!=0){I=Infinity;
C=0;

for(H in G){D=G[H];

if(D.potential>0){C+=D.flex;
I=Math.min(I,D.potential/D.flex);
}}if(C==0){break;
}I=Math.min(J,I*C)/C;
K=0;

for(H in G){D=G[H];

if(D.potential>0){F=Math.min(J,D.potential,Math.ceil(I*D.flex));
K+=F-I*D.flex;

if(K>=1){K-=1;
F-=1;
}D.potential-=F;

if(E){D.offset+=F;
}else{D.offset-=F;
}J-=F;
}}}return G;
},computeHorizontalAlignOffset:function(P,Q,R,S,T){if(S==null){S=0;
}
if(T==null){T=0;
}var U=0;

switch(P){case w:U=S;
break;
case s:U=R-Q-T;
break;
case v:U=Math.round((R-Q)/2);
if(U<S){U=S;
}else if(U<T){U=Math.max(S,R-Q-T);
}break;
}return U;
},computeVerticalAlignOffset:function(e,f,g,h,j){if(h==null){h=0;
}
if(j==null){j=0;
}var k=0;

switch(e){case u:k=h;
break;
case t:k=g-f-j;
break;
case y:k=Math.round((g-f)/2);
if(k<h){k=h;
}else if(k<j){k=Math.max(h,g-f-j);
}break;
}return k;
},collapseMargins:function(L){var M=0,O=0;

for(var i=0,l=arguments.length;i<l;i++){var N=arguments[i];

if(N<0){O=Math.min(O,N);
}else if(N>0){M=Math.max(M,N);
}}return M+O;
},computeHorizontalGaps:function(be,bf,bg){if(bf==null){bf=0;
}var bh=0;

if(bg){bh+=be[0].getMarginLeft();

for(var i=1,l=be.length;i<l;i+=1){bh+=this.collapseMargins(bf,be[i-1].getMarginRight(),be[i].getMarginLeft());
}bh+=be[l-1].getMarginRight();
}else{for(var i=1,l=be.length;i<l;i+=1){bh+=be[i].getMarginLeft()+be[i].getMarginRight();
}bh+=(bf*(l-1));
}return bh;
},computeVerticalGaps:function(a,b,c){if(b==null){b=0;
}var d=0;

if(c){d+=a[0].getMarginTop();

for(var i=1,l=a.length;i<l;i+=1){d+=this.collapseMargins(b,a[i-1].getMarginBottom(),a[i].getMarginTop());
}d+=a[l-1].getMarginBottom();
}else{for(var i=1,l=a.length;i<l;i+=1){d+=a[i].getMarginTop()+a[i].getMarginBottom();
}d+=(b*(l-1));
}return d;
},computeHorizontalSeparatorGaps:function(V,W,X){var bb=qx.theme.manager.Decoration.getInstance().resolve(X);
var ba=bb.getInsets();
var Y=ba.left+ba.right;
var bc=0;

for(var i=0,l=V.length;i<l;i++){var bd=V[i];
bc+=bd.getMarginLeft()+bd.getMarginRight();
}bc+=(W+Y+W)*(l-1);
return bc;
},computeVerticalSeparatorGaps:function(bi,bj,bk){var bn=qx.theme.manager.Decoration.getInstance().resolve(bk);
var bm=bn.getInsets();
var bl=bm.top+bm.bottom;
var bo=0;

for(var i=0,l=bi.length;i<l;i++){var bp=bi[i];
bo+=bp.getMarginTop()+bp.getMarginBottom();
}bo+=(bj+bl+bj)*(l-1);
return bo;
},arrangeIdeals:function(m,n,o,p,q,r){if(n<m||q<p){if(n<m&&q<p){n=m;
q=p;
}else if(n<m){q-=(m-n);
n=m;
if(q<p){q=p;
}}else if(q<p){n-=(p-q);
q=p;
if(n<m){n=m;
}}}
if(n>o||q>r){if(n>o&&q>r){n=o;
q=r;
}else if(n>o){q+=(n-o);
n=o;
if(q>r){q=r;
}}else if(q>r){n+=(q-r);
q=r;
if(n>o){n=o;
}}}return {begin:n,end:q};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var C="Please use the value property instead.",B="changeContent",A="qx.dynlocale",z="text",y="color",x="userSelect",w="changeLocale",v="enabled",u="none",t="on",bb="_applyTextAlign",ba="Boolean",Y="qx.ui.core.Widget",X="Please use the changeValue event instead.",W="changeTextAlign",V="changeValue",U="qx.client",T="__hH",S="qx.ui.basic.Label",R="A",J="_applyValue",K="center",H="_applyBuddy",I="qx.event.type.Data",F="String",G="textAlign",D="right",E="changeRich",L="_applyRich",M="click",O="label",N="__hF",Q="webkit",P="left";
qx.Class.define(S,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(n){arguments.callee.base.call(this);

if(n!=null){this.setValue(n);
}
if(qx.core.Variant.isSet(A,t)){qx.locale.Manager.getInstance().addListener(w,this._onChangeLocale,this);
}},events:{"changeContent":I},properties:{rich:{check:ba,init:false,event:E,apply:L},value:{check:F,apply:J,event:V,nullable:true},buddy:{check:Y,apply:H,nullable:true,init:null},textAlign:{check:[P,K,D],nullable:true,themeable:true,apply:bb,event:W},appearance:{refine:true,init:O},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__hF:null,__hG:null,__hH:null,__hI:null,_getContentHint:function(){if(this.__hG){this.__hJ=this.__hK();
delete this.__hG;
}return {width:this.__hJ.width,height:this.__hJ.height};
},_hasHeightForWidth:function(){return this.getRich();
},_applySelectable:function(g){arguments.callee.base.call(this,g);
if(qx.core.Variant.isSet(U,Q)){this.getContainerElement().setStyle(x,g?z:u);
this.getContentElement().setStyle(x,g?z:u);
}},_getContentHeightForWidth:function(a){if(!this.getRich()){return null;
}return this.__hK(a).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(bc,bd){this.getContentElement().setStyle(G,bc);
},_applyTextColor:function(q,r){if(q){this.getContentElement().setStyle(y,qx.theme.manager.Color.getInstance().resolve(q));
}else{this.getContentElement().removeStyle(y);
}},__hJ:{width:0,height:0},_applyFont:function(b,c){var d;

if(b){this.__hF=qx.theme.manager.Font.getInstance().resolve(b);
d=this.__hF.getStyles();
}else{this.__hF=null;
d=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(d);
this.__hG=true;
qx.ui.core.queue.Layout.add(this);
},__hK:function(be){var bi=qx.bom.Label;
var bg=this.getFont();
var bf=bg?this.__hF.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||R;
var bh=this.getRich();
return bh?bi.getHtmlSize(content,bf,be):bi.getTextSize(content,bf);
},_applyBuddy:function(l,m){if(m!=null){m.removeBinding(this.__hH);
this.__hH=null;
this.removeListenerById(this.__hI);
this.__hI=null;
}
if(l!=null){this.__hH=l.bind(v,this,v);
this.__hI=this.addListener(M,l.focus,l);
}},_applyRich:function(s){this.getContentElement().setRich(s);
this.__hG=true;
qx.ui.core.queue.Layout.add(this);
},_onChangeLocale:qx.core.Variant.select(A,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(o,p){this.getContentElement().setContent(o);
this.__hG=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(B,o,p);
},setContent:function(f){qx.log.Logger.deprecatedMethodWarning(arguments.callee,C);
this.setValue(f);
},getContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,C);
return this.getValue();
},resetContent:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,C);
this.resetValue();
},addListener:function(h,i,self,j){if(h==B){qx.log.Logger.deprecatedEventWarning(arguments.callee,B,X);
}return arguments.callee.base.call(this,h,i,self,j);
}},destruct:function(){if(qx.core.Variant.isSet(A,t)){qx.locale.Manager.getInstance().removeListener(w,this._onChangeLocale,this);
}if(this.__hH!=null){var k=this.getBuddy();

if(k!=null&&!k.isDisposed()){k.removeBinding(this.__hH);
}}this._disposeFields(N,T);
}});
})();
(function(){var c="content",b="qx.html.Label";
qx.Class.define(b,{extend:qx.html.Element,members:{__hL:null,_applyProperty:function(name,g){arguments.callee.base.call(this,name,g);

if(name==c){var h=this.getDomElement();
qx.bom.Label.setContent(h,g);
}},_createDomElement:function(){var e=this.__hL;
var d=qx.bom.Label.create(this._content,e);
return d;
},_copyData:function(a){return arguments.callee.base.call(this,true);
},setRich:function(i){var j=this.getDomElement();

if(j){throw new Error("The label mode cannot be modified after initial creation");
}i=!!i;

if(this.__hL==i){return;
}this.__hL=i;
return this;
},setContent:function(f){this._setProperty(c,f);
return this;
},getContent:function(){return this._getProperty(c);
}}});
})();
(function(){var A="qx.client",z="gecko",y="div",x="inherit",w="text",v="value",u="",t="hidden",s="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",r="nowrap",P="auto",O="ellipsis",N="normal",M="label",L="px",K="crop",J="end",I="100%",H="visible",G="qx.bom.Label",E="opera",F="block",C="none",D="-1000px",B="absolute";
qx.Class.define(G,{statics:{__hM:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__hN:function(){var o=this.__hP(false);
document.body.insertBefore(o,document.body.firstChild);
return this._textElement=o;
},__hO:function(){var p=this.__hP(true);
document.body.insertBefore(p,document.body.firstChild);
return this._htmlElement=p;
},__hP:function(a){var b=qx.bom.Element.create(y);
var c=b.style;
c.width=c.height=P;
c.left=c.top=D;
c.visibility=t;
c.position=B;
c.overflow=H;

if(a){c.whiteSpace=N;
}else{c.whiteSpace=r;

if(qx.core.Variant.isSet(A,z)){var d=document.createElementNS(s,M);
for(var e in this.__hM){d.style[e]=x;
}b.appendChild(d);
}}return b;
},__hQ:function(k){var l={};

if(k){l.whiteSpace=N;
}else if(qx.core.Variant.isSet(A,z)){l.display=F;
}else{l.overflow=t;
l.whiteSpace=r;
l.textOverflow=O;
l.userSelect=C;
if(qx.core.Variant.isSet(A,E)){l.OTextOverflow=O;
}}return l;
},create:function(content,f,g){if(!g){g=window;
}
if(f){var h=g.document.createElement(y);
h.useHtml=true;
}else if(qx.core.Variant.isSet(A,z)){var h=g.document.createElement(y);
var i=g.document.createElementNS(s,M);
i.style.cursor=x;
i.style.color=x;
i.style.overflow=t;
i.style.maxWidth=I;
for(var j in this.__hM){i.style[j]=x;
}i.setAttribute(K,J);
h.appendChild(i);
}else{var h=g.document.createElement(y);
qx.bom.element.Style.setStyles(h,this.__hQ(f));
}
if(content){this.setContent(h,content);
}return h;
},setContent:function(m,n){n=n||u;

if(m.useHtml){m.innerHTML=n;
}else if(qx.core.Variant.isSet(A,z)){m.firstChild.setAttribute(v,n);
}else{qx.bom.element.Attribute.set(m,w,n);
}},getContent:function(q){if(q.useHtml){return q.innerHTML;
}else if(qx.core.Variant.isSet(A,z)){return q.firstChild.getAttribute(v)||u;
}else{return qx.bom.element.Attribute.get(q,w);
}},getHtmlSize:function(content,Y,ba){var bb=this._htmlElement||this.__hO();
bb.style.width=ba!==undefined?ba+L:P;
bb.innerHTML=content;
return this.__hR(bb,Y);
},getTextSize:function(Q,R){var S=this._textElement||this.__hN();

if(qx.core.Variant.isSet(A,z)){S.firstChild.setAttribute(v,Q);
}else{qx.bom.element.Attribute.set(S,w,Q);
}return this.__hR(S,R);
},__hR:function(T,U){var V=this.__hM;

if(!U){U={};
}
for(var W in V){T.style[W]=U[W]||u;
}var X=qx.bom.element.Dimension.getSize(T);

if(qx.core.Variant.isSet(A,z)){if(!qx.bom.client.Platform.WIN){X.width++;
}}return X;
}}});
})();
(function(){var E="mshtml",D="qx.client",C="Please use element.clientWidth directly, or see if you can benefit from qx.bom.element.Dimension.getContentWidth()",B="qx.bom.element.Dimension",A="Please use element.scrollWidth directly, or see if you can benefit from qx.bom.element.Dimension.getContentWidth()",z="paddingRight",y="paddingLeft",x="paddingTop",w="Please use element.scrollHeight directly, or see if you can benefit from qx.bom.element.Dimension.getContentHeight()",v="Please use element.clientHeight directly, or see if you can benefit from qx.bom.element.Dimension.getContentHeight()",u="paddingBottom";
qx.Class.define(B,{statics:{getWidth:qx.core.Variant.select(D,{"gecko":function(a){if(a.getBoundingClientRect){var b=a.getBoundingClientRect();
return Math.round(b.right)-Math.round(b.left);
}else{return a.offsetWidth;
}},"default":function(c){return c.offsetWidth;
}}),getHeight:qx.core.Variant.select(D,{"gecko":function(F){if(F.getBoundingClientRect){var G=F.getBoundingClientRect();
return Math.round(G.bottom)-Math.round(G.top);
}else{return F.offsetHeight;
}},"default":function(l){return l.offsetHeight;
}}),getSize:function(K){return {width:this.getWidth(K),height:this.getHeight(K)};
},__hS:{visible:true,hidden:true},getContentWidth:function(e){var g=qx.bom.element.Style;
var h=qx.bom.element.Overflow.getX(e);
var i=parseInt(g.get(e,y),10);
var k=parseInt(g.get(e,z),10);

if(this.__hS[h]){return e.clientWidth-i-k;
}else{if(e.clientWidth>=e.scrollWidth){return Math.max(e.clientWidth,e.scrollWidth)-i-k;
}else{var j=e.scrollWidth-i;
var f=qx.bom.client.Engine;

if(f.NAME===E&&f.VERSION==6){j-=k;
}return j;
}}},getContentHeight:function(n){var p=qx.bom.element.Style;
var r=qx.bom.element.Overflow.getY(n);
var s=parseInt(p.get(n,x),10);
var q=parseInt(p.get(n,u),10);

if(this.__hS[r]){return n.clientHeight-s-q;
}else{if(n.clientHeight>=n.scrollHeight){return Math.max(n.clientHeight,n.scrollHeight)-s-q;
}else{var t=n.scrollHeight-s;
var o=qx.bom.client.Engine;

if(o.NAME===E&&o.VERSION==6){t-=q;
}return t;
}}},getContentSize:function(m){return {width:this.getContentWidth(m),height:this.getContentHeight(m)};
},getClientWidth:function(d){qx.log.Logger.deprecatedMethodWarning(arguments.callee,C);
return d.clientWidth;
},getClientHeight:function(I){qx.log.Logger.deprecatedMethodWarning(arguments.callee,v);
return I.clientHeight;
},getScrollWidth:function(H){qx.log.Logger.deprecatedMethodWarning(arguments.callee,A);
return H.scrollWidth;
},getScrollHeight:function(J){qx.log.Logger.deprecatedMethodWarning(arguments.callee,w);
return J.scrollHeight;
}}});
})();
(function(){var e="qx.event.type.Data",d="qx.ui.form.IForm";
qx.Interface.define(d,{events:{"changeEnabled":e,"changeValid":e,"changeInvalidMessage":e,"changeRequired":e},members:{setEnabled:function(b){return arguments.length==1;
},getEnabled:function(){},setRequired:function(c){return arguments.length==1;
},getRequired:function(){},setValid:function(a){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(f){return arguments.length==1;
},getInvalidMessage:function(){}}});
})();
(function(){var f="_applyBlockerColor",e="Color",d="Number",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="__hT";
qx.Mixin.define(c,{construct:function(){this.__hT=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:e,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:d,init:1,apply:b,themeable:true}},members:{__hT:null,_applyBlockerColor:function(j,k){this.__hT.setColor(j);
},_applyBlockerOpacity:function(g,h){this.__hT.setOpacity(g);
},block:function(){this.__hT.block();
},isBlocked:function(){return this.__hT.isBlocked();
},unblock:function(){this.__hT.unblock();
},blockContent:function(i){this.__hT.blockContent(i);
},isContentBlocked:function(){return this.__hT.isContentBlocked();
},unblockContent:function(){this.__hT.unblockContent();
},_getContentBlocker:function(){return this.__hT._getContentBlocker();
},_getBlocker:function(){return this.__hT._getBlocker();
},_restoreAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
this.__hT._restoreAnonymousState();
},_saveAndSetAnonymousState:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
this.__hT._saveAndSetAnonymousState();
}},destruct:function(){this._disposeObjects(a);
}});
})();
(function(){var i="qx.ui.window.Window",h="changeModal",g="changeVisibility",f="changeActive",d="_applyActiveWindow",c="qx.ui.window.MDesktop",b="__hV",a="__hU";
qx.Mixin.define(c,{properties:{activeWindow:{check:i,apply:d,init:null,nullable:true}},members:{__hU:null,__hV:null,getWindowManager:function(){if(!this.__hV){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__hV;
},supportsMaximize:function(){return true;
},setWindowManager:function(n){if(this.__hV){this.__hV.setDesktop(null);
}n.setDesktop(this);
this.__hV=n;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(k,l){this.getWindowManager().changeActiveWindow(k,l);

if(k){k.setActive(true);
}
if(l){l.resetActive();
}},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(o){if(qx.Class.isDefined(i)&&o instanceof qx.ui.window.Window){this._addWindow(o);
}},_addWindow:function(m){if(!qx.lang.Array.contains(this.getWindows(),m)){this.getWindows().push(m);
m.addListener(f,this._onChangeActive,this);
m.addListener(h,this._onChangeModal,this);
m.addListener(g,this._onChangeVisibility,this);
}
if(m.getActive()){this.setActiveWindow(m);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(p){if(qx.Class.isDefined(i)&&p instanceof qx.ui.window.Window){this._removeWindow(p);
}},_removeWindow:function(j){qx.lang.Array.remove(this.getWindows(),j);
j.removeListener(f,this._onChangeActive,this);
j.removeListener(h,this._onChangeModal,this);
j.removeListener(g,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__hU){this.__hU=[];
}return this.__hU;
}},destruct:function(){this._disposeArray(a);
this._disposeObjects(b);
}});
})();
(function(){var u="contextmenu",t="help",s="qx.client",r="changeGlobalCursor",q="abstract",p="Boolean",o="root",n="",m=" !important",l="_applyGlobalCursor",h="__hW",k="_applyNativeHelp",j=";",g="qx.ui.root.Abstract",f="String",i="*";
qx.Class.define(g,{type:q,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){arguments.callee.base.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:o},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:f,nullable:true,themeable:true,apply:l,event:r},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:p,init:false,apply:k}},members:{__hW:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(s,{"mshtml":function(a,b){},"default":function(z,A){var B=qx.bom.Stylesheet;
var C=this.__hW;

if(!C){this.__hW=C=B.createElement();
}B.removeAllRules(C);

if(z){B.addRule(C,i,qx.bom.element.Cursor.compile(z).replace(j,n)+m);
}}}),_applyNativeContextMenu:function(x,y){if(x){this.removeListener(u,this._onNativeContextMenu,this,true);
}else{this.addListener(u,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(s,{"mshtml":function(c,d){if(d===false){qx.bom.Event.removeNativeListener(document,t,qx.lang.Function.returnFalse);
}
if(c===false){qx.bom.Event.addNativeListener(document,t,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this._disposeFields(h);
},defer:function(v,w){qx.ui.core.MChildrenHandling.remap(w);
}});
})();
(function(){var n="resize",m="__hX",l="position",k="__hY",j="0px",i="webkit",h="$$widget",g="qx.ui.root.Application",f="hidden",d="qx.client",a="div",c="100%",b="absolute";
qx.Class.define(g,{extend:qx.ui.root.Abstract,construct:function(q){this.__hX=qx.dom.Node.getWindow(q);
this.__hY=q;
arguments.callee.base.call(this);
qx.event.Registration.addListener(this.__hX,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
},members:{__hX:null,__hY:null,_createContainerElement:function(){var r=this.__hY;

if(qx.core.Variant.isSet(d,i)){if(!r.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var v=r.documentElement.style;
var s=r.body.style;
v.overflow=s.overflow=f;
v.padding=v.margin=s.padding=s.margin=j;
v.width=v.height=s.width=s.height=c;
var u=r.createElement(a);
r.body.appendChild(u);
var t=new qx.html.Root(u);
t.setStyle(l,b);
t.setAttribute(h,this.toHashCode());
return t;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var o=qx.bom.Viewport.getWidth(this.__hX);
var p=qx.bom.Viewport.getHeight(this.__hX);
return {minWidth:o,width:o,maxWidth:o,minHeight:p,height:p,maxHeight:p};
}},destruct:function(){this._disposeFields(m,k);
}});
})();
(function(){var r="resize",q="px",p="zIndex",o="qx.ui.root.Page",n="backgroundColor",m="_applyOpacity",l="opacity",k="Number",j="interval",h="qx.ui.core.Blocker",c="__ic",g="__ig",f="Color",b="__ie",a="__ia",d="_applyColor";
qx.Class.define(h,{extend:qx.core.Object,construct:function(F){arguments.callee.base.call(this);
this._widget=F;
this._isPageRoot=(qx.Class.isDefined(o)&&F instanceof qx.ui.root.Page);

if(this._isPageRoot){F.addListener(r,this.__ih,this);
}},properties:{color:{check:f,init:null,nullable:true,apply:d,themeable:true},opacity:{check:k,init:1,apply:m,themeable:true}},members:{__ia:null,__ib:null,__ic:null,__id:null,__ie:null,__if:0,__ig:null,__ih:function(e){var B=e.getData();

if(this.isContentBlocked()){this._getContentBlocker().setStyles({width:B.width,height:B.height});
}
if(this.isBlocked()){this._getBlocker().setStyles({width:B.width,height:B.height});
}},_applyColor:function(C,D){var E=qx.theme.manager.Color.getInstance().resolve(C);
this.__ii(n,E);
},_applyOpacity:function(s,t){this.__ii(l,s);
},__ii:function(w,x){var y=[];
this.__ia&&y.push(this.__ia);
this.__ic&&y.push(this.__ic);

for(var i=0;i<y.length;i++){y[i].setStyle(w,x);
}},_saveAndSetAnonymousState:function(){this.__if+=1;

if(this.__if==1){this.__ie=this._widget.getAnonymous();
this._widget.setAnonymous(true);
}},_restoreAnonymousState:function(){this.__if-=1;

if(this.__if==0){this._widget.setAnonymous(this.__ie);
}},__ij:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},_getBlocker:function(){if(!this.__ia){this.__ia=this.__ij();
this.__ia.setStyle(p,15);
this._widget.getContainerElement().add(this.__ia);
this.__ia.exclude();
}return this.__ia;
},block:function(){if(this.__ib){return;
}this.__ib=true;
this._getBlocker().include();
this._saveAndSetAnonymousState();
},isBlocked:function(){return !!this.__ib;
},unblock:function(){if(!this.__ib){return;
}this.__ib=false;
this._restoreAnonymousState();
this._getBlocker().exclude();
},_getContentBlocker:function(){if(!this.__ic){this.__ic=this.__ij();
this._widget.getContentElement().add(this.__ic);
this.__ic.exclude();
}return this.__ic;
},blockContent:function(z){var A=this._getContentBlocker();
A.setStyle(p,z);

if(this.__id){return;
}this.__id=true;
A.include();

if(this._isPageRoot){if(!this.__ig){this.__ig=new qx.event.Timer(300);
this.__ig.addListener(j,this.__ik,this);
}this.__ig.start();
this.__ik();
}},isContentBlocked:function(){return !!this.__id;
},unblockContent:function(){if(!this.__id){return;
}this.__id=false;
this._getContentBlocker().exclude();

if(this._isPageRoot){this.__ig.stop();
}},__ik:function(){var u=this._widget.getContainerElement().getDomElement();
var v=qx.dom.Node.getDocument(u);
this._getContentBlocker().setStyles({height:v.documentElement.scrollHeight+q,width:v.documentElement.scrollWidth+q});
}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(r,this.__ih,this);
}this._disposeObjects(c,a,g);
this._disposeFields(b);
}});
})();
(function(){var i="100%",h="mshtml",g="repeat",f="url(",e=")",d="qx.html.Blocker",c="qx.client",b="qx/static/blank.gif",a="absolute";
qx.Class.define(d,{extend:qx.html.Element,construct:function(j,k){arguments.callee.base.call(this);
var j=j?qx.theme.manager.Color.getInstance().resolve(j):null;
this.setStyles({position:a,width:i,height:i,opacity:k||0,backgroundColor:j});
if(qx.core.Variant.isSet(c,h)){this.setStyles({backgroundImage:f+qx.util.ResourceManager.getInstance().toUri(b)+e,backgroundRepeat:g});
}}});
})();
(function(){var T="keypress",S="focusout",R="__im",Q="activate",P="Tab",O="__io",N="singleton",M="__in",L="deactivate",K="__il",I="focusin",J="qx.ui.core.FocusHandler";
qx.Class.define(J,{extend:qx.core.Object,type:N,construct:function(){arguments.callee.base.call(this);
this.__il={};
},members:{__il:null,__im:null,__in:null,__io:null,connectTo:function(U){U.addListener(T,this.__ip,this);
U.addListener(I,this._onFocusIn,this,true);
U.addListener(S,this._onFocusOut,this,true);
U.addListener(Q,this._onActivate,this,true);
U.addListener(L,this._onDeactivate,this,true);
},addRoot:function(bg){this.__il[bg.$$hash]=bg;
},removeRoot:function(G){delete this.__il[G.$$hash];
},getActiveWidget:function(){return this.__im;
},isActive:function(u){return this.__im==u;
},getFocusedWidget:function(){return this.__in;
},isFocused:function(Y){return this.__in==Y;
},isFocusRoot:function(bl){return !!this.__il[bl.$$hash];
},_onActivate:function(e){var j=e.getTarget();
this.__im=j;
var h=this.__iq(j);

if(h!=this.__io){this.__io=h;
}},_onDeactivate:function(e){var H=e.getTarget();

if(this.__im==H){this.__im=null;
}},_onFocusIn:function(e){var g=e.getTarget();

if(g!=this.__in){this.__in=g;
g.visualizeFocus();
}},_onFocusOut:function(e){var a=e.getTarget();

if(a==this.__in){this.__in=null;
a.visualizeBlur();
}},__ip:function(e){if(e.getKeyIdentifier()!=P){return;
}
if(!this.__io){return;
}e.stopPropagation();
e.preventDefault();
var ba=this.__in;

if(!e.isShiftPressed()){var bb=ba?this.__iu(ba):this.__is();
}else{var bb=ba?this.__iv(ba):this.__it();
}if(bb){bb.tabFocus();
}},__iq:function(s){var t=this.__il;

while(s){if(t[s.$$hash]){return s;
}s=s.getLayoutParent();
}return null;
},__ir:function(v,w){if(v===w){return 0;
}var y=v.getTabIndex()||0;
var x=w.getTabIndex()||0;

if(y!=x){return y-x;
}var D=v.getContainerElement().getDomElement();
var C=w.getContainerElement().getDomElement();
var B=qx.bom.element.Location;
var A=B.get(D);
var z=B.get(C);
if(A.top!=z.top){return A.top-z.top;
}if(A.left!=z.left){return A.left-z.left;
}var E=v.getZIndex();
var F=w.getZIndex();

if(E!=F){return E-F;
}return 0;
},__is:function(){return this.__iy(this.__io,null);
},__it:function(){return this.__iz(this.__io,null);
},__iu:function(b){var c=this.__io;

if(c==b){return this.__is();
}
while(b&&b.getAnonymous()){b=b.getLayoutParent();
}
if(b==null){return [];
}var d=[];
this.__iw(c,b,d);
d.sort(this.__ir);
var f=d.length;
return f>0?d[0]:this.__is();
},__iv:function(o){var p=this.__io;

if(p==o){return this.__it();
}
while(o&&o.getAnonymous()){o=o.getLayoutParent();
}
if(o==null){return [];
}var q=[];
this.__ix(p,o,q);
q.sort(this.__ir);
var r=q.length;
return r>0?q[r-1]:this.__it();
},__iw:function(parent,bh,bi){var bj=parent.getLayoutChildren();
var bk;

for(var i=0,l=bj.length;i<l;i++){bk=bj[i];
if(!(bk instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(bk)&&bk.isEnabled()&&bk.isVisible()){if(bk.isTabable()&&this.__ir(bh,bk)<0){bi.push(bk);
}this.__iw(bk,bh,bi);
}}},__ix:function(parent,bc,bd){var be=parent.getLayoutChildren();
var bf;

for(var i=0,l=be.length;i<l;i++){bf=be[i];
if(!(bf instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(bf)&&bf.isEnabled()&&bf.isVisible()){if(bf.isTabable()&&this.__ir(bc,bf)>0){bd.push(bf);
}this.__ix(bf,bc,bd);
}}},__iy:function(parent,V){var W=parent.getLayoutChildren();
var X;

for(var i=0,l=W.length;i<l;i++){X=W[i];
if(!(X instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(X)&&X.isEnabled()&&X.isVisible()){if(X.isTabable()){if(V==null||this.__ir(X,V)<0){V=X;
}}V=this.__iy(X,V);
}}return V;
},__iz:function(parent,k){var m=parent.getLayoutChildren();
var n;

for(var i=0,l=m.length;i<l;i++){n=m[i];
if(!(n instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(n)&&n.isEnabled()&&n.isVisible()){if(n.isTabable()){if(k==null||this.__ir(n,k)>0){k=n;
}}k=this.__iz(n,k);
}}return k;
}},destruct:function(){this._disposeMap(K);
this._disposeFields(M,R,O);
}});
})();
(function(){var v="qx.client",u="head",t="text/css",s="stylesheet",r="}",q='@import "',p="{",o='";',n="qx.bom.Stylesheet",m="link",l="style";
qx.Class.define(n,{statics:{includeFile:function(D,E){if(!E){E=document;
}var F=E.createElement(m);
F.type=t;
F.rel=s;
F.href=qx.util.ResourceManager.getInstance().toUri(D);
var G=E.getElementsByTagName(u)[0];
G.appendChild(F);
},createElement:qx.core.Variant.select(v,{"mshtml":function(H){var I=document.createStyleSheet();

if(H){I.cssText=H;
}return I;
},"default":function(ba){var bb=document.createElement(l);
bb.type=t;

if(ba){bb.appendChild(document.createTextNode(ba));
}document.getElementsByTagName(u)[0].appendChild(bb);
return bb.sheet;
}}),addRule:qx.core.Variant.select(v,{"mshtml":function(J,K,L){J.addRule(K,L);
},"default":function(a,b,c){a.insertRule(b+p+c+r,a.cssRules.length);
}}),removeRule:qx.core.Variant.select(v,{"mshtml":function(d,e){var f=d.rules;
var g=f.length;

for(var i=g-1;i>=0;--i){if(f[i].selectorText==e){d.removeRule(i);
}}},"default":function(O,P){var Q=O.cssRules;
var R=Q.length;

for(var i=R-1;i>=0;--i){if(Q[i].selectorText==P){O.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(v,{"mshtml":function(w){var x=w.rules;
var y=x.length;

for(var i=y-1;i>=0;i--){w.removeRule(i);
}},"default":function(bc){var bd=bc.cssRules;
var be=bd.length;

for(var i=be-1;i>=0;i--){bc.deleteRule(i);
}}}),addImport:qx.core.Variant.select(v,{"mshtml":function(bf,bg){bf.addImport(bg);
},"default":function(M,N){M.insertRule(q+N+o,M.cssRules.length);
}}),removeImport:qx.core.Variant.select(v,{"mshtml":function(S,T){var U=S.imports;
var V=U.length;

for(var i=V-1;i>=0;i--){if(U[i].href==T){S.removeImport(i);
}}},"default":function(z,A){var B=z.cssRules;
var C=B.length;

for(var i=C-1;i>=0;i--){if(B[i].href==A){z.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(v,{"mshtml":function(W){var X=W.imports;
var Y=X.length;

for(var i=Y-1;i>=0;i--){W.removeImport(i);
}},"default":function(h){var j=h.cssRules;
var k=j.length;

for(var i=k-1;i>=0;i--){if(j[i].type==j[i].IMPORT_RULE){h.deleteRule(i);
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
(function(){var z="scrollbar-y",y="scrollbar-x",x="pane",w="auto",v="corner",u="on",t="changeVisibility",s="scroll",r="_computeScrollbars",q="off",j="scrollY",p="abstract",m="update",h="scrollX",g="mousewheel",l="scrollbarY",k="scrollbarX",n="horizontal",f="scrollarea",o="qx.ui.core.AbstractScrollArea",i="vertical";
qx.Class.define(o,{extend:qx.ui.core.Widget,type:p,construct:function(){arguments.callee.base.call(this);
var N=new qx.ui.layout.Grid();
N.setColumnFlex(0,1);
N.setRowFlex(0,1);
this._setLayout(N);
this.addListener(g,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:f},width:{refine:true,init:100},height:{refine:true,init:200},scrollbarX:{check:[w,u,q],init:w,themeable:true,apply:r},scrollbarY:{check:[w,u,q],init:w,themeable:true,apply:r},scrollbar:{group:[k,l]}},members:{_createChildControlImpl:function(b){var c;

switch(b){case x:c=new qx.ui.core.ScrollPane();
c.addListener(m,this._computeScrollbars,this);
c.addListener(h,this._onScrollPaneX,this);
c.addListener(j,this._onScrollPaneY,this);
this._add(c,{row:0,column:0});
break;
case y:c=new qx.ui.core.ScrollBar(n);
c.setMinWidth(0);
c.exclude();
c.addListener(s,this._onScrollBarX,this);
c.addListener(t,this._onChangeScrollbarXVisibility,this);
this._add(c,{row:1,column:0});
break;
case z:c=new qx.ui.core.ScrollBar(i);
c.setMinHeight(0);
c.exclude();
c.addListener(s,this._onScrollBarY,this);
c.addListener(t,this._onChangeScrollbarYVisibility,this);
this._add(c,{row:0,column:1});
break;
case v:c=new qx.ui.core.Widget();
c.setWidth(0);
c.setHeight(0);
c.exclude();
this._add(c,{row:1,column:1});
break;
}return c||arguments.callee.base.call(this,b);
},getPaneSize:function(){return this.getChildControl(x).getInnerSize();
},getItemTop:function(a){return this.getChildControl(x).getItemTop(a);
},getItemBottom:function(d){return this.getChildControl(x).getItemBottom(d);
},getItemLeft:function(W){return this.getChildControl(x).getItemLeft(W);
},getItemRight:function(S){return this.getChildControl(x).getItemRight(S);
},scrollToX:function(O){qx.ui.core.queue.Manager.flush();
this.getChildControl(y).scrollTo(O);
},scrollByX:function(B){qx.ui.core.queue.Manager.flush();
this.getChildControl(y).scrollBy(B);
},getScrollX:function(){var X=this.getChildControl(y,true);
return X?X.getPosition():0;
},scrollToY:function(bb){qx.ui.core.queue.Manager.flush();
this.getChildControl(z).scrollTo(bb);
},scrollByY:function(A){qx.ui.core.queue.Manager.flush();
this.getChildControl(z).scrollBy(A);
},getScrollY:function(){var R=this.getChildControl(z,true);
return R?R.getPosition():0;
},_onScrollBarX:function(e){this.getChildControl(x).scrollToX(e.getData());
},_onScrollBarY:function(e){this.getChildControl(x).scrollToY(e.getData());
},_onScrollPaneX:function(e){this.scrollToX(e.getData());
},_onScrollPaneY:function(e){this.scrollToY(e.getData());
},_onMouseWheel:function(e){var U=this._isChildControlVisible(y);
var V=this._isChildControlVisible(z);
var T=(V)?this.getChildControl(z,true):(U?this.getChildControl(y,true):null);

if(T){T.scrollBySteps(e.getWheelDelta());
}e.stop();
},_onChangeScrollbarXVisibility:function(e){var P=this._isChildControlVisible(y);
var Q=this._isChildControlVisible(z);

if(!P){this.scrollToX(0);
}P&&Q?this._showChildControl(v):this._excludeChildControl(v);
},_onChangeScrollbarYVisibility:function(e){var Y=this._isChildControlVisible(y);
var ba=this._isChildControlVisible(z);

if(!ba){this.scrollToY(0);
}Y&&ba?this._showChildControl(v):this._excludeChildControl(v);
},_computeScrollbars:function(){var I=this.getChildControl(x);
var content=I.getChildren()[0];

if(!content){this._excludeChildControl(y);
this._excludeChildControl(z);
return;
}var C=this.getInnerSize();
var H=I.getInnerSize();
var F=I.getScrollSize();
if(!H||!F){return;
}var K=this.getScrollbarX();
var L=this.getScrollbarY();

if(K===w&&L===w){var G=F.width>C.width;
var M=F.height>C.height;
if((G||M)&&!(G&&M)){if(G){M=F.height>H.height;
}else if(M){G=F.width>H.width;
}}}else{var G=K===u;
var M=L===u;
if(F.width>(G?H.width:C.width)&&K===w){G=true;
}
if(F.height>(G?H.height:C.height)&&L===w){M=true;
}}if(G){var E=this.getChildControl(y);
E.show();
var J=Math.max(0,F.width-H.width-1);
E.setMaximum(J);
E.setKnobFactor(J>0?H.width/F.width:0);
}else{this._excludeChildControl(y);
}
if(M){var D=this.getChildControl(z);
D.show();
var J=Math.max(0,F.height-H.height-1);
D.setMaximum(J);
D.setKnobFactor(J>0?H.height/F.height:0);
}else{this._excludeChildControl(z);
}}}});
})();
(function(){var p="Integer",o="_applyContentPadding",n="resetPaddingRight",m="setPaddingBottom",l="resetPaddingTop",k="qx.ui.core.MContentPadding",j="resetPaddingLeft",i="setPaddingTop",h="setPaddingRight",g="resetPaddingBottom",c="contentPaddingLeft",f="setPaddingLeft",e="contentPaddingTop",b="shorthand",a="contentPaddingRight",d="contentPaddingBottom";
qx.Mixin.define(k,{properties:{contentPaddingTop:{check:p,init:0,apply:o,themeable:true},contentPaddingRight:{check:p,init:0,apply:o,themeable:true},contentPaddingBottom:{check:p,init:0,apply:o,themeable:true},contentPaddingLeft:{check:p,init:0,apply:o,themeable:true},contentPadding:{group:[e,a,d,c],mode:b,themeable:true}},members:{__iA:{contentPaddingTop:i,contentPaddingRight:h,contentPaddingBottom:m,contentPaddingLeft:f},__iB:{contentPaddingTop:l,contentPaddingRight:n,contentPaddingBottom:g,contentPaddingLeft:j},_applyContentPadding:function(q,r,name){var s=this._getContentPaddingTarget();

if(q==null){var t=this.__iB[name];
s[t]();
}else{var u=this.__iA[name];
s[u](q);
}}}});
})();
(function(){var c="pane",b="qx.ui.container.Scroll",a="Please use getChildren instead.";
qx.Class.define(b,{extend:qx.ui.core.AbstractScrollArea,include:[qx.ui.core.MContentPadding],construct:function(content){arguments.callee.base.call(this);

if(content){this.add(content);
}},members:{add:function(d){this.getChildControl(c).add(d);
},remove:function(e){this.getChildControl(c).remove(e);
},getChild:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,a);
return this.getChildControl(c).getChild();
},getChildren:function(){return this.getChildControl(c).getChildren();
},_getContentPaddingTarget:function(){return this.getChildControl(c);
}}});
})();
(function(){var ct="left",cs="top",cr="_applyLayoutChange",cq="hAlign",cp="flex",co="vAlign",cn="Integer",cm="__jo",cl="minWidth",ck="width",cd="__jk",cj="__jj",cg="minHeight",cb="__jl",ca="__jp",cf="qx.ui.layout.Grid",ce="height",ch="maxHeight",bY="maxWidth",ci="__jh",cc="__ji";
qx.Class.define(cf,{extend:qx.ui.layout.Abstract,construct:function(dS,dT){arguments.callee.base.call(this);
this.__jh=[];
this.__ji=[];

if(dS){this.setSpacingX(dS);
}
if(dT){this.setSpacingY(dT);
}},properties:{spacingX:{check:cn,init:0,apply:cr},spacingY:{check:cn,init:0,apply:cr}},members:{__jj:null,__jh:null,__ji:null,__jk:null,__jl:null,__jm:null,__jn:null,__jo:null,__jp:null,verifyLayoutProperty:null,__jq:function(){var w=[];
var v=[];
var z=[];
var t=0;
var s=0;
var B=this._getLayoutChildren();

for(var i=0,l=B.length;i<l;i++){var u=B[i];
var A=u.getLayoutProperties();
var C=A.row;
var r=A.column;
A.colSpan=A.colSpan||1;
A.rowSpan=A.rowSpan||1;
if(C==null||r==null){throw new Error("The layout properties 'row' and 'column' must be defined!");
}
if(w[C]&&w[C][r]){throw new Error("There is already a widget in this cell ("+C+", "+r+")");
}
for(var x=r;x<r+A.colSpan;x++){for(var y=C;y<C+A.rowSpan;y++){if(w[y]==undefined){w[y]=[];
}w[y][x]=u;
s=Math.max(s,x);
t=Math.max(t,y);
}}
if(A.rowSpan>1){z.push(u);
}
if(A.colSpan>1){v.push(u);
}}for(var y=0;y<=t;y++){if(w[y]==undefined){w[y]=[];
}}this.__jj=w;
this.__jk=v;
this.__jl=z;
this.__jm=t;
this.__jn=s;
this.__jo=null;
this.__jp=null;
delete this._invalidChildrenCache;
},_setRowData:function(dy,dz,dA){var dB=this.__jh[dy];

if(!dB){this.__jh[dy]={};
this.__jh[dy][dz]=dA;
}else{dB[dz]=dA;
}},_setColumnData:function(bk,bl,bm){var bn=this.__ji[bk];

if(!bn){this.__ji[bk]={};
this.__ji[bk][bl]=bm;
}else{bn[bl]=bm;
}},setSpacing:function(bc){this.setSpacingY(bc);
this.setSpacingX(bc);
},setColumnAlign:function(bw,bx,by){{};
this._setColumnData(bw,cq,bx);
this._setColumnData(bw,co,by);
this._applyLayoutChange();
return this;
},getColumnAlign:function(D){var E=this.__ji[D]||{};
return {vAlign:E.vAlign||cs,hAlign:E.hAlign||ct};
},setRowAlign:function(bB,bC,bD){{};
this._setRowData(bB,cq,bC);
this._setRowData(bB,co,bD);
this._applyLayoutChange();
return this;
},getRowAlign:function(bq){var br=this.__jh[bq]||{};
return {vAlign:br.vAlign||cs,hAlign:br.hAlign||ct};
},getCellWidget:function(a,b){if(this._invalidChildrenCache){this.__jq();
}var a=this.__jj[a]||{};
return a[b]||null;
},getCellAlign:function(c,d){var m=cs;
var h=ct;
var k=this.__jh[c];
var f=this.__ji[d];
var e=this.__jj[c][d];

if(e){var g={vAlign:e.getAlignY(),hAlign:e.getAlignX()};
}else{g={};
}if(g.vAlign){m=g.vAlign;
}else if(k&&k.vAlign){m=k.vAlign;
}else if(f&&f.vAlign){m=f.vAlign;
}if(g.hAlign){h=g.hAlign;
}else if(f&&f.hAlign){h=f.hAlign;
}else if(k&&k.hAlign){h=k.hAlign;
}return {vAlign:m,hAlign:h};
},setColumnFlex:function(bo,bp){this._setColumnData(bo,cp,bp);
this._applyLayoutChange();
return this;
},getColumnFlex:function(bs){var bt=this.__ji[bs]||{};
return bt.flex!==undefined?bt.flex:0;
},setRowFlex:function(dU,dV){this._setRowData(dU,cp,dV);
this._applyLayoutChange();
return this;
},getRowFlex:function(dt){var du=this.__jh[dt]||{};
var dv=du.flex!==undefined?du.flex:0;
return dv;
},setColumnMaxWidth:function(bz,bA){this._setColumnData(bz,bY,bA);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(da){var db=this.__ji[da]||{};
return db.maxWidth!==undefined?db.maxWidth:Infinity;
},setColumnWidth:function(dr,ds){this._setColumnData(dr,ck,ds);
this._applyLayoutChange();
return this;
},getColumnWidth:function(eg){var eh=this.__ji[eg]||{};
return eh.width!==undefined?eh.width:null;
},setColumnMinWidth:function(n,o){this._setColumnData(n,cl,o);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(bW){var bX=this.__ji[bW]||{};
return bX.minWidth||0;
},setRowMaxHeight:function(dC,dD){this._setRowData(dC,ch,dD);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(dW){var dX=this.__jh[dW]||{};
return dX.maxHeight||Infinity;
},setRowHeight:function(bU,bV){this._setRowData(bU,ce,bV);
this._applyLayoutChange();
return this;
},getRowHeight:function(dw){var dx=this.__jh[dw]||{};
return dx.height!==undefined?dx.height:null;
},setRowMinHeight:function(p,q){this._setRowData(p,cg,q);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(bu){var bv=this.__jh[bu]||{};
return bv.minHeight||0;
},__jr:function(bP){var bT=bP.getSizeHint();
var bS=bP.getMarginLeft()+bP.getMarginRight();
var bR=bP.getMarginTop()+bP.getMarginBottom();
var bQ={height:bT.height+bR,width:bT.width+bS,minHeight:bT.minHeight+bR,minWidth:bT.minWidth+bS,maxHeight:bT.maxHeight+bR,maxWidth:bT.maxWidth+bS};
return bQ;
},_fixHeightsRowSpan:function(dE){var dP=this.getSpacingY();

for(var i=0,l=this.__jl.length;i<l;i++){var dH=this.__jl[i];
var dJ=this.__jr(dH);
var dK=dH.getLayoutProperties();
var dG=dK.row;
var dN=dP*(dK.rowSpan-1);
var dF=dN;
var dM={};

for(var j=0;j<dK.rowSpan;j++){var dR=dK.row+j;
var dI=dE[dR];
var dQ=this.getRowFlex(dR);

if(dQ>0){dM[dR]={min:dI.minHeight,value:dI.height,max:dI.maxHeight,flex:dQ};
}dN+=dI.height;
dF+=dI.minHeight;
}if(dN<dJ.height){var dO=qx.ui.layout.Util.computeFlexOffsets(dM,dJ.height,dN);

for(var j=0;j<dK.rowSpan;j++){var dL=dO[dG+j]?dO[dG+j].offset:0;
dE[dG+j].height+=dL;
}}if(dF<dJ.minHeight){var dO=qx.ui.layout.Util.computeFlexOffsets(dM,dJ.minHeight,dF);

for(var j=0;j<dK.rowSpan;j++){var dL=dO[dG+j]?dO[dG+j].offset:0;
dE[dG+j].minHeight+=dL;
}}}},_fixWidthsColSpan:function(dc){var dg=this.getSpacingX();

for(var i=0,l=this.__jk.length;i<l;i++){var dd=this.__jk[i];
var df=this.__jr(dd);
var di=dd.getLayoutProperties();
var de=di.column;
var dp=dg*(di.colSpan-1);
var dh=dp;
var dj={};
var dl;

for(var j=0;j<di.colSpan;j++){var dq=di.column+j;
var dn=dc[dq];
var dm=this.getColumnFlex(dq);
if(dm>0){dj[dq]={min:dn.minWidth,value:dn.width,max:dn.maxWidth,flex:dm};
}dp+=dn.width;
dh+=dn.minWidth;
}if(dp<df.width){var dk=qx.ui.layout.Util.computeFlexOffsets(dj,df.width,dp);

for(var j=0;j<di.colSpan;j++){dl=dk[de+j]?dk[de+j].offset:0;
dc[de+j].width+=dl;
}}if(dh<df.minWidth){var dk=qx.ui.layout.Util.computeFlexOffsets(dj,df.minWidth,dh);

for(var j=0;j<di.colSpan;j++){dl=dk[de+j]?dk[de+j].offset:0;
dc[de+j].minWidth+=dl;
}}}},_getRowHeights:function(){if(this.__jo!=null){return this.__jo;
}var ba=[];
var S=this.__jm;
var R=this.__jn;

for(var bb=0;bb<=S;bb++){var T=0;
var V=0;
var U=0;

for(var Y=0;Y<=R;Y++){var Q=this.__jj[bb][Y];

if(!Q){continue;
}var W=Q.getLayoutProperties().rowSpan||0;

if(W>1){continue;
}var X=this.__jr(Q);

if(this.getRowFlex(bb)>0){T=Math.max(T,X.minHeight);
}else{T=Math.max(T,X.height);
}V=Math.max(V,X.height);
}var T=Math.max(T,this.getRowMinHeight(bb));
var U=this.getRowMaxHeight(bb);

if(this.getRowHeight(bb)!==null){var V=this.getRowHeight(bb);
}else{var V=Math.max(T,Math.min(V,U));
}ba[bb]={minHeight:T,height:V,maxHeight:U};
}
if(this.__jl.length>0){this._fixHeightsRowSpan(ba);
}this.__jo=ba;
return ba;
},_getColWidths:function(){if(this.__jp!=null){return this.__jp;
}var J=[];
var G=this.__jn;
var I=this.__jm;

for(var O=0;O<=G;O++){var M=0;
var L=0;
var H=Infinity;

for(var P=0;P<=I;P++){var F=this.__jj[P][O];

if(!F){continue;
}var K=F.getLayoutProperties().colSpan||0;

if(K>1){continue;
}var N=this.__jr(F);

if(this.getColumnFlex(O)>0){L=Math.max(L,N.minWidth);
}else{L=Math.max(L,N.width);
}M=Math.max(M,N.width);
}var L=Math.max(L,this.getColumnMinWidth(O));
var H=this.getColumnMaxWidth(O);

if(this.getColumnWidth(O)!==null){var M=this.getColumnWidth(O);
}else{var M=Math.max(L,Math.min(M,H));
}J[O]={minWidth:L,width:M,maxWidth:H};
}
if(this.__jk.length>0){this._fixWidthsColSpan(J);
}this.__jp=J;
return J;
},_getColumnFlexOffsets:function(dY){var ea=this.getSizeHint();
var ee=dY-ea.width;

if(ee==0){return {};
}var ec=this._getColWidths();
var eb={};

for(var i=0,l=ec.length;i<l;i++){var ef=ec[i];
var ed=this.getColumnFlex(i);

if((ed<=0)||(ef.width==ef.maxWidth&&ee>0)||(ef.width==ef.minWidth&&ee<0)){continue;
}eb[i]={min:ef.minWidth,value:ef.width,max:ef.maxWidth,flex:ed};
}return qx.ui.layout.Util.computeFlexOffsets(eb,dY,ea.width);
},_getRowFlexOffsets:function(bd){var be=this.getSizeHint();
var bh=bd-be.height;

if(bh==0){return {};
}var bi=this._getRowHeights();
var bf={};

for(var i=0,l=bi.length;i<l;i++){var bj=bi[i];
var bg=this.getRowFlex(i);

if((bg<=0)||(bj.height==bj.maxHeight&&bh>0)||(bj.height==bj.minHeight&&bh<0)){continue;
}bf[i]={min:bj.minHeight,value:bj.height,max:bj.maxHeight,flex:bg};
}return qx.ui.layout.Util.computeFlexOffsets(bf,bd,be.height);
},renderLayout:function(cu,cv){if(this._invalidChildrenCache){this.__jq();
}var cJ=qx.ui.layout.Util;
var cx=this.getSpacingX();
var cD=this.getSpacingY();
var cO=this._getColWidths();
var cN=this._getColumnFlexOffsets(cu);
var cy=[];
var cQ=this.__jn;
var cw=this.__jm;
var cP;

for(var cR=0;cR<=cQ;cR++){cP=cN[cR]?cN[cR].offset:0;
cy[cR]=cO[cR].width+cP;
}var cG=this._getRowHeights();
var cI=this._getRowFlexOffsets(cv);
var cX=[];

for(var cE=0;cE<=cw;cE++){cP=cI[cE]?cI[cE].offset:0;
cX[cE]=cG[cE].height+cP;
}var cY=0;

for(var cR=0;cR<=cQ;cR++){var top=0;

for(var cE=0;cE<=cw;cE++){var cL=this.__jj[cE][cR];
if(!cL){top+=cX[cE]+cD;
continue;
}var cz=cL.getLayoutProperties();
if(cz.row!==cE||cz.column!==cR){top+=cX[cE]+cD;
continue;
}var cW=cx*(cz.colSpan-1);

for(var i=0;i<cz.colSpan;i++){cW+=cy[cR+i];
}var cM=cD*(cz.rowSpan-1);

for(var i=0;i<cz.rowSpan;i++){cM+=cX[cE+i];
}var cA=cL.getSizeHint();
var cU=cL.getMarginTop();
var cK=cL.getMarginLeft();
var cH=cL.getMarginBottom();
var cC=cL.getMarginRight();
var cF=Math.max(cA.minWidth,Math.min(cW-cK-cC,cA.maxWidth));
var cV=Math.max(cA.minHeight,Math.min(cM-cU-cH,cA.maxHeight));
var cS=this.getCellAlign(cE,cR);
var cT=cY+cJ.computeHorizontalAlignOffset(cS.hAlign,cF,cW,cK,cC);
var cB=top+cJ.computeVerticalAlignOffset(cS.vAlign,cV,cM,cU,cH);
cL.renderLayout(cT,cB,cF,cV);
top+=cX[cE]+cD;
}cY+=cy[cR]+cx;
}},invalidateLayoutCache:function(){arguments.callee.base.call(this);
this.__jp=null;
this.__jo=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__jq();
}var bI=this._getColWidths();
var bK=0,bL=0;

for(var i=0,l=bI.length;i<l;i++){var bM=bI[i];

if(this.getColumnFlex(i)>0){bK+=bM.minWidth;
}else{bK+=bM.width;
}bL+=bM.width;
}var bN=this._getRowHeights();
var bG=0,bJ=0;

for(var i=0,l=bN.length;i<l;i++){var bO=bN[i];

if(this.getRowFlex(i)>0){bG+=bO.minHeight;
}else{bG+=bO.height;
}bJ+=bO.height;
}var bF=this.getSpacingX()*(bI.length-1);
var bE=this.getSpacingY()*(bN.length-1);
var bH={minWidth:bK+bF,width:bL+bF,minHeight:bG+bE,height:bJ+bE};
return bH;
}},destruct:function(){this._disposeFields(cj,ci,cc,cd,cb,ca,cm);
}});
})();
(function(){var D="resize",C="scrollY",B="Please use getChildren instead.",A="update",z="scrollX",w="_applyScrollX",v="_applyScrollY",u="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",t="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",s="appear",p="qx.ui.core.ScrollPane",r="qx.event.type.Event",q="scroll";
qx.Class.define(p,{extend:qx.ui.core.Widget,construct:function(){arguments.callee.base.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(D,this._onUpdate);
var i=this.getContentElement();
i.addListener(q,this._onScroll,this);
i.addListener(s,this._onAppear,this);
},events:{update:r},properties:{scrollX:{check:t,apply:w,event:z,init:0},scrollY:{check:u,apply:v,event:C,init:0}},members:{add:function(m){var n=this._getChildren()[0];

if(n){this._remove(n);
n.removeListener(D,this._onUpdate,this);
}
if(m){this._add(m);
m.addListener(D,this._onUpdate,this);
}},remove:function(L){if(L){this._remove(L);
L.removeListener(D,this._onUpdate,this);
}},getChild:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,B);
return this._getChildren()[0]||null;
},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(A);
},_onScroll:function(e){var f=this.getContentElement();
this.setScrollX(f.getScrollX());
this.setScrollY(f.getScrollY());
},_onAppear:function(e){var H=this.getContentElement();
var E=this.getScrollX();
var F=H.getScrollX();

if(E!=F){H.scrollToX(E);
}var I=this.getScrollY();
var G=H.getScrollY();

if(I!=G){H.scrollToY(I);
}},getItemTop:function(l){var top=0;

do{top+=l.getBounds().top;
l=l.getLayoutParent();
}while(l&&l!==this);
return top;
},getItemBottom:function(d){return this.getItemTop(d)+d.getBounds().height;
},getItemLeft:function(g){var h=0;
var parent;

do{h+=g.getBounds().left;
parent=g.getLayoutParent();

if(parent){h+=parent.getInsets().left;
}g=parent;
}while(g&&g!==this);
return h;
},getItemRight:function(M){return this.getItemLeft(M)+M.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var b=this.getInnerSize();
var a=this.getScrollSize();

if(b&&a){return Math.max(0,a.width-b.width);
}return 0;
},getScrollMaxY:function(){var O=this.getInnerSize();
var N=this.getScrollSize();

if(O&&N){return Math.max(0,N.height-O.height);
}return 0;
},scrollToX:function(J){var K=this.getScrollMaxX();

if(J<0){J=0;
}else if(J>K){J=K;
}this.setScrollX(J);
},scrollToY:function(j){var k=this.getScrollMaxY();

if(j<0){j=0;
}else if(j>k){j=k;
}this.setScrollY(j);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(o){this.getContentElement().scrollToX(o);
},_applyScrollY:function(c){this.getContentElement().scrollToY(c);
}}});
})();
(function(){var t="slider",s="horizontal",r="button-begin",q="button-end",p="vertical",o="Integer",n="execute",m="right",l="left",k="down",G="up",F="PositiveNumber",E="changeValue",D="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",C="_applyKnobFactor",B="_applyOrientation",A="qx.ui.core.ScrollBar",z="_applyPageStep",y="PositiveInteger",x="scroll",v="_applyPosition",w="scrollbar",u="_applyMaximum";
qx.Class.define(A,{extend:qx.ui.core.Widget,construct:function(a){arguments.callee.base.call(this);
this._createChildControl(r);
this._createChildControl(t);
this._createChildControl(q);
if(a!=null){this.setOrientation(a);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:w},orientation:{check:[s,p],init:s,apply:B},maximum:{check:y,apply:u,init:100},position:{check:D,init:0,apply:v,event:x},singleStep:{check:o,init:20},pageStep:{check:o,init:10,apply:z},knobFactor:{check:F,apply:C,nullable:true}},members:{_createChildControlImpl:function(f){var g;

switch(f){case t:g=new qx.ui.core.ScrollSlider;
g.setPageStep(100);
g.setFocusable(false);
g.addListener(E,this._onChangeSliderValue,this);
this._add(g,{flex:1});
break;
case r:g=new qx.ui.form.RepeatButton;
g.setFocusable(false);
g.addListener(n,this._onExecuteBegin,this);
this._add(g);
break;
case q:g=new qx.ui.form.RepeatButton;
g.setFocusable(false);
g.addListener(n,this._onExecuteEnd,this);
this._add(g);
break;
}return g||arguments.callee.base.call(this,f);
},_applyMaximum:function(d){this.getChildControl(t).setMaximum(d);
},_applyPosition:function(j){this.getChildControl(t).setValue(j);
},_applyKnobFactor:function(b){this.getChildControl(t).setKnobFactor(b);
},_applyPageStep:function(i){this.getChildControl(t).setPageStep(i);
},_applyOrientation:function(J,K){var L=this._getLayout();

if(L){L.dispose();
}if(J===s){this._setLayout(new qx.ui.layout.HBox());
this.setAllowStretchX(true);
this.setAllowStretchY(false);
this.replaceState(p,s);
this.getChildControl(r).replaceState(G,l);
this.getChildControl(q).replaceState(k,m);
}else{this._setLayout(new qx.ui.layout.VBox());
this.setAllowStretchX(false);
this.setAllowStretchY(true);
this.replaceState(s,p);
this.getChildControl(r).replaceState(l,G);
this.getChildControl(q).replaceState(m,k);
}this.getChildControl(t).setOrientation(J);
},scrollTo:function(h){this.getChildControl(t).slideTo(h);
},scrollBy:function(c){this.getChildControl(t).slideBy(c);
},scrollBySteps:function(H){var I=this.getSingleStep();
this.getChildControl(t).slideBy(H*I);
},_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep());
},_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep());
},_onChangeSliderValue:function(e){this.setPosition(e.getData());
}}});
})();
(function(){var d="qx.event.type.Data",c="qx.ui.form.IFormElement",b="boolean";
qx.Interface.define(c,{events:{"changeValue":d,"changeName":d,"changeEnabled":d},members:{setEnabled:function(f){this.assertType(f,b);
},getEnabled:function(){},setName:function(a){this.assertString(a);
},getName:function(){},setValue:function(e){return arguments.length==1;
},getValue:function(){}}});
})();
(function(){var b="qx.ui.form.INumberForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var a="qx.ui.form.IRange";
qx.Interface.define(a,{members:{setMinimum:function(b){return arguments.length==1;
},getMinimum:function(){},setMaximum:function(d){return arguments.length==1;
},getMaximum:function(){},setSingleStep:function(e){return arguments.length==1;
},getSingleStep:function(){},setPageStep:function(c){return arguments.length==1;
},getPageStep:function(){}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.MFormElement";
qx.Mixin.define(a,{events:{"changeName":b},members:{__iG:null,setName:function(name){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
if(name!=null&&!qx.lang.Type.isString(name)){throw new Error("Please use strings for the name property.");
return;
}var d=this.__iG;
this.__iG=name;
this.fireDataEvent(qx.event.type.Data,name,d);
},getName:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return this.__iG;
},resetName:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
var c=this.__iG;
this.__iG=null;
this.fireDataEvent(qx.event.type.Data,null,c);
}}});
})();
(function(){var i="Boolean",h="invalid",g="qx.ui.form.MForm",f="_applyValid",e="",d="changeRequired",c="changeValid",b="changeInvalidMessage",a="String";
qx.Mixin.define(g,{properties:{valid:{check:i,init:true,apply:f,event:c},required:{check:i,init:false,event:d},invalidMessage:{check:a,init:e,event:b}},members:{_applyValid:function(j,k){j?this.removeState(h):this.addState(h);
}}});
})();
(function(){var Y="knob",X="horizontal",W="vertical",V="Integer",U="px",T="mousemove",S="resize",R="left",Q="top",P="mouseup",bD="slider",bC="PageUp",bB="mousedown",bA="height",bz="changeValue",by="Left",bx="Down",bw="Up",bv="dblclick",bu="qx.ui.form.Slider",bg="PageDown",bh="mousewheel",be="interval",bf="_applyValue",bc="_applyKnobFactor",bd="End",ba="width",bb="_applyOrientation",bi="Home",bj="floor",bm="_applyMinimum",bl="click",bo="Right",bn="keypress",bq="ceil",bp="losecapture",bk="contextmenu",bt="_applyMaximum",bs="Number",br="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()";
qx.Class.define(bu,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IFormElement,qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MFormElement,qx.ui.form.MForm],construct:function(b){arguments.callee.base.call(this);
this._setLayout(new qx.ui.layout.Canvas());
this.addListener(bn,this._onKeyPress);
this.addListener(bh,this._onMouseWheel);
this.addListener(bB,this._onMouseDown);
this.addListener(P,this._onMouseUp);
this.addListener(bp,this._onMouseUp);
this.addListener(S,this._onUpdate);
this.addListener(bk,this._onStopEvent);
this.addListener(bl,this._onStopEvent);
this.addListener(bv,this._onStopEvent);
if(b!=null){this.setOrientation(b);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:bD},focusable:{refine:true,init:true},orientation:{check:[X,W],init:X,apply:bb},value:{check:br,init:0,apply:bf,event:bz,nullable:true},minimum:{check:V,init:0,apply:bm},maximum:{check:V,init:100,apply:bt},singleStep:{check:V,init:1},pageStep:{check:V,init:10},knobFactor:{check:bs,apply:bc,nullable:true}},members:{__js:null,__jt:null,__ju:null,__jv:null,__jw:null,__jx:null,__jy:null,__jz:null,__jA:null,_forwardStates:{invalid:true},_createChildControlImpl:function(D){var E;

switch(D){case Y:E=new qx.ui.core.Widget();
E.addListener(S,this._onUpdate,this);
this._add(E);
break;
}return E||arguments.callee.base.call(this,D);
},_onMouseWheel:function(e){var a=e.getWheelDelta()>0?1:-1;
this.slideBy(a*this.getSingleStep());
e.stop();
},_onKeyPress:function(e){var z=this.getOrientation()===X;
var y=z?by:bw;
var forward=z?bo:bx;

switch(e.getKeyIdentifier()){case forward:this.slideForward();
break;
case y:this.slideBack();
break;
case bg:this.slidePageForward();
break;
case bC:this.slidePageBack();
break;
case bi:this.slideToBegin();
break;
case bd:this.slideToEnd();
break;
default:return;
}e.stop();
},_onMouseDown:function(e){if(this.__jv){return;
}var bM=this.__jC;
var bK=this.getChildControl(Y);
var bL=bM?R:Q;
var bO=bM?e.getDocumentLeft():e.getDocumentTop();
var bP=this.__js=qx.bom.element.Location.get(this.getContentElement().getDomElement())[bL];
var bN=this.__jt=qx.bom.element.Location.get(bK.getContainerElement().getDomElement())[bL];

if(e.getTarget()===bK){this.__jv=true;
this.__jw=bO+bP-bN;
}else{this.__jx=true;
this.__jy=bO<=bN?-1:1;
this.__jD(e);
this._onInterval();
if(!this.__jA){this.__jA=new qx.event.Timer(100);
this.__jA.addListener(be,this._onInterval,this);
}this.__jA.start();
}this.addListener(T,this._onMouseMove);
this.capture();
e.stopPropagation();
},_onMouseUp:function(e){if(this.__jv){this.releaseCapture();
delete this.__jv;
delete this.__jw;
}else if(this.__jx){this.__jA.stop();
this.releaseCapture();
delete this.__jx;
delete this.__jy;
delete this.__jz;
}this.removeListener(T,this._onMouseMove);
if(e.getType()===P){e.stopPropagation();
}},_onMouseMove:function(e){if(this.__jv){var G=this.__jC?e.getDocumentLeft():e.getDocumentTop();
var F=G-this.__jw;
this.slideTo(this._positionToValue(F));
}else if(this.__jx){this.__jD(e);
}e.stopPropagation();
},_onInterval:function(e){var c=this.getValue()+(this.__jy*this.getPageStep());
if(c<this.getMinimum()){c=this.getMinimum();
}else if(c>this.getMaximum()){c=this.getMaximum();
}var d=this.__jy==-1;

if((d&&c<=this.__jz)||(!d&&c>=this.__jz)){c=this.__jz;
}this.slideTo(c);
},_onUpdate:function(e){var I=this.getInnerSize();
var J=this.getChildControl(Y).getBounds();
var H=this.__jC?ba:bA;
this._updateKnobSize();
this.__jB=I[H]-J[H];
this.__ju=J[H];
this._updateKnobPosition();
},__jC:false,__jB:0,__jD:function(e){var h=this.__jC;
var o=h?e.getDocumentLeft():e.getDocumentTop();
var q=this.__js;
var i=this.__jt;
var s=this.__ju;
var p=o-q;

if(o>=i){p-=s;
}var m=this._positionToValue(p);
var j=this.getMinimum();
var k=this.getMaximum();

if(m<j){m=j;
}else if(m>k){m=k;
}else{var n=this.getValue();
var l=this.getPageStep();
var r=this.__jy<0?bj:bq;
m=n+(Math[r]((m-n)/l)*l);
}if(this.__jz==null||(this.__jy==-1&&m<=this.__jz)||(this.__jy==1&&m>=this.__jz)){this.__jz=m;
}},_positionToValue:function(L){var M=this.__jB;
if(M==null||M==0){return 0;
}var O=L/M;

if(O<0){O=0;
}else if(O>1){O=1;
}var N=this.getMaximum()-this.getMinimum();
return this.getMinimum()+Math.round(N*O);
},_valueToPosition:function(bE){var bF=this.__jB;

if(bF==null){return 0;
}var bG=this.getMaximum()-this.getMinimum();
if(bG==0){return 0;
}var bE=bE-this.getMinimum();
var bH=bE/bG;

if(bH<0){bH=0;
}else if(bH>1){bH=1;
}return Math.round(bF*bH);
},_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));
},_setKnobPosition:function(u){var v=this.getChildControl(Y).getContainerElement();

if(this.__jC){v.setStyle(R,u+U,true);
}else{v.setStyle(Q,u+U,true);
}},_updateKnobSize:function(){var bT=this.getKnobFactor();

if(bT==null){return;
}var bS=this.getInnerSize();

if(bS==null){return;
}if(this.__jC){this.getChildControl(Y).setWidth(Math.round(bT*bS.width));
}else{this.getChildControl(Y).setHeight(Math.round(bT*bS.height));
}},slideToBegin:function(){this.slideTo(this.getMinimum());
},slideToEnd:function(){this.slideTo(this.getMaximum());
},slideForward:function(){this.slideBy(this.getSingleStep());
},slideBack:function(){this.slideBy(-this.getSingleStep());
},slidePageForward:function(){this.slideBy(this.getPageStep());
},slidePageBack:function(){this.slideBy(-this.getPageStep());
},slideBy:function(K){this.slideTo(this.getValue()+K);
},slideTo:function(t){if(t<this.getMinimum()){t=this.getMinimum();
}else if(t>this.getMaximum()){t=this.getMaximum();
}else{t=this.getMinimum()+Math.round((t-this.getMinimum())/this.getSingleStep())*this.getSingleStep();
}this.setValue(t);
},_applyOrientation:function(A,B){var C=this.getChildControl(Y);
this.__jC=A===X;
if(this.__jC){this.removeState(W);
C.removeState(W);
this.addState(X);
C.addState(X);
C.setLayoutProperties({top:0,right:null,bottom:0});
}else{this.removeState(X);
C.removeState(X);
this.addState(W);
C.addState(W);
C.setLayoutProperties({right:0,bottom:null,left:0});
}this._updateKnobPosition();
},_applyKnobFactor:function(w,x){if(w!=null){this._updateKnobSize();
}else{if(this.__jC){this.getChildControl(Y).resetWidth();
}else{this.getChildControl(Y).resetHeight();
}}},_applyValue:function(bI,bJ){if(bI!=null){this._updateKnobPosition();
}else{this.resetValue();
}},_applyMinimum:function(f,g){if(this.getValue()<f){this.setValue(f);
}this._updateKnobPosition();
},_applyMaximum:function(bQ,bR){if(this.getValue()>bQ){this.setValue(bQ);
}this._updateKnobPosition();
}}});
})();
(function(){var c="mousewheel",b="qx.ui.core.ScrollSlider",a="keypress";
qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(d){arguments.callee.base.call(this,d);
this.removeListener(a,this._onKeyPress);
this.removeListener(c,this._onMouseWheel);
}});
})();
(function(){var h="changeEnabled",g="qx.ui.core.MExecutable",f="qx.event.Command",d="qx.event.type.Event",c="changeCommand",b="_applyCommand",a="execute";
qx.Mixin.define(g,{events:{"execute":d},properties:{command:{check:f,apply:b,event:c,nullable:true}},members:{execute:function(){var k=this.getCommand();

if(k){k.execute(this);
}this.fireEvent(a);
},_applyCommand:function(i,j){if(j){j.removeListener(h,this._onChangeEnabledCommand,this);
}
if(i){i.addListener(h,this._onChangeEnabledCommand,this);

if(this.getEnabled()===false){i.setEnabled(false);
}else if(i.getEnabled()===false){this.setEnabled(false);
}}},_onChangeEnabledCommand:function(e){this.setEnabled(e.getData());
}}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var r="pressed",q="abandoned",p="hovered",o="changeValue",n="qx.ui.form.Button",m="Enter",l="Space",k="dblclick",j="mouseup",i="mousedown",c="The value property will be removed.",h="mouseover",g="mouseout",b="keydown",a="button",f="keyup",d="qx.event.type.Data";
qx.Class.define(n,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable,qx.ui.form.MFormElement],implement:[qx.ui.form.IFormElement,qx.ui.form.IExecutable],construct:function(s,t,u){arguments.callee.base.call(this,s,t);

if(u!=null){this.setCommand(u);
}this.addListener(h,this._onMouseOver);
this.addListener(g,this._onMouseOut);
this.addListener(i,this._onMouseDown);
this.addListener(j,this._onMouseUp);
this.addListener(b,this._onKeyDown);
this.addListener(f,this._onKeyUp);
this.addListener(k,this._onStopEvent);
},events:{"changeValue":d},properties:{appearance:{refine:true,init:a},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(q)){return;
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
var A=this.hasState(r);
var B=this.hasState(q);

if(A){this.removeState(r);
}
if(B){this.removeState(q);
}else{this.addState(p);

if(A){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case m:case l:this.removeState(q);
this.addState(r);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case m:case l:if(this.hasState(r)){this.removeState(q);
this.removeState(r);
this.execute();
e.stopPropagation();
}}},__iP:null,setValue:function(v){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
var w=this.__iP;
this.__iP=v;
this.fireDataEvent(o,v,w);
},getValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return this.__iP;
},resetValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
this.__iP=null;
},addListener:function(x,y,self,z){if(x==o&&this.classname==n){qx.log.Logger.deprecatedEventWarning(arguments.callee,o,c);
}return arguments.callee.base.call(this,x,y,self,z);
}}});
})();
(function(){var n="pressed",m="abandoned",l="Integer",k="hovered",j="qx.event.type.Event",i="Enter",h="Space",g="press",f="qx.ui.form.RepeatButton",d="release",a="interval",c="__iQ",b="execute";
qx.Class.define(f,{extend:qx.ui.form.Button,construct:function(q,r){arguments.callee.base.call(this,q,r);
this.__iQ=new qx.event.Timer(this.getInterval());
this.__iQ.addListener(a,this._onInterval,this);
},events:{"execute":j,"press":j,"release":j},properties:{interval:{check:l,init:100},firstInterval:{check:l,init:500},minTimer:{check:l,init:20},timerDecrease:{check:l,init:2}},members:{__iR:null,__iS:null,__iQ:null,press:function(){if(this.isEnabled()){if(!this.hasState(n)){this.__iT();
}this.removeState(m);
this.addState(n);
}},release:function(s){if(!this.isEnabled()){return;
}if(this.hasState(n)){if(!this.__iS){this.execute();
}}this.removeState(n);
this.removeState(m);
this.__iU();
},_applyEnabled:function(o,p){arguments.callee.base.call(this,o,p);

if(!o){this.removeState(n);
this.removeState(m);
this.__iU();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(m)){this.removeState(m);
this.addState(n);
this.__iQ.start();
}this.addState(k);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(k);

if(this.hasState(n)){this.removeState(n);
this.addState(m);
this.__iQ.stop();
this.__iR=this.getInterval();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__iT();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(m)){this.addState(k);

if(this.hasState(n)&&!this.__iS){this.execute();
}}this.__iU();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case i:case h:if(this.hasState(n)){if(!this.__iS){this.execute();
}this.removeState(n);
this.removeState(m);
e.stopPropagation();
this.__iU();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case i:case h:this.removeState(m);
this.addState(n);
e.stopPropagation();
this.__iT();
}},_onInterval:function(e){this.__iQ.stop();
if(this.__iR==null){this.__iR=this.getInterval();
}this.__iR=(Math.max(this.getMinTimer(),this.__iR-this.getTimerDecrease()));
this.__iQ.restartWith(this.__iR);
this.__iS=true;
this.fireEvent(b);
},__iT:function(){this.fireEvent(g);
this.__iS=false;
this.__iQ.setInterval(this.getFirstInterval());
this.__iQ.start();
this.removeState(m);
this.addState(n);
},__iU:function(){this.fireEvent(d);
this.__iQ.stop();
this.__iR=null;
this.removeState(m);
this.removeState(n);
}},destruct:function(){this._disposeObjects(c);
}});
})();
(function(){var bn="_applyLayoutChange",bm="left",bl="center",bk="top",bj="__iV",bi="Decorator",bh="middle",bg="_applyReversed",bf="bottom",be="Boolean",bb="right",bd="Integer",bc="__iW",ba="__iY",Y="qx.ui.layout.HBox";
qx.Class.define(Y,{extend:qx.ui.layout.Abstract,construct:function(G,H,I){arguments.callee.base.call(this);

if(G){this.setSpacing(G);
}
if(H){this.setAlignX(H);
}
if(I){this.setSeparator(I);
}},properties:{alignX:{check:[bm,bl,bb],init:bm,apply:bn},alignY:{check:[bk,bh,bf],init:bk,apply:bn},spacing:{check:bd,init:0,apply:bn},separator:{check:bi,nullable:true,apply:bn},reversed:{check:be,init:false,apply:bg}},members:{__iV:null,__iW:null,__iX:null,__iY:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__ja:function(){var F=this._getLayoutChildren();
var length=F.length;
var C=false;
var A=this.__iV&&this.__iV.length!=length&&this.__iW&&this.__iV;
var D;
var B=A?this.__iV:new Array(length);
var E=A?this.__iW:new Array(length);
if(this.getReversed()){F=F.concat().reverse();
}for(var i=0;i<length;i++){D=F[i].getLayoutProperties();

if(D.width!=null){B[i]=parseFloat(D.width)/100;
}
if(D.flex!=null){E[i]=D.flex;
C=true;
}}if(!A){this.__iV=B;
this.__iW=E;
}this.__iX=C;
this.__iY=F;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(a,b){if(this._invalidChildrenCache){this.__ja();
}var h=this.__iY;
var length=h.length;
var s=qx.ui.layout.Util;
var r=this.getSpacing();
var v=this.getSeparator();

if(v){var e=s.computeHorizontalSeparatorGaps(h,r,v);
}else{var e=s.computeHorizontalGaps(h,r,true);
}var i,c,p,o;
var u=[];
var j=e;

for(i=0;i<length;i+=1){o=this.__iV[i];
p=o!=null?Math.floor((a-e)*o):h[i].getSizeHint().width;
u.push(p);
j+=p;
}if(this.__iX&&j!=a){var m={};
var q,t;

for(i=0;i<length;i+=1){q=this.__iW[i];

if(q>0){k=h[i].getSizeHint();
m[i]={min:k.minWidth,value:u[i],max:k.maxWidth,flex:q};
}}var f=s.computeFlexOffsets(m,a,j);

for(i in f){t=f[i].offset;
u[i]+=t;
j+=t;
}}var z=h[0].getMarginLeft();
if(j<a&&this.getAlignX()!=bm){z=a-j;

if(this.getAlignX()===bl){z=Math.round(z/2);
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
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__ja();
}var P=qx.ui.layout.Util;
var X=this.__iY;
var J=0,Q=0,N=0;
var M=0,O=0;
var U,K,W;
for(var i=0,l=X.length;i<l;i+=1){U=X[i];
K=U.getSizeHint();
Q+=K.width;
var T=this.__iW[i];
var L=this.__iV[i];

if(T){J+=K.minWidth;
}else if(L){N=Math.max(N,Math.round(K.minWidth/L));
}else{J+=K.width;
}W=U.getMarginTop()+U.getMarginBottom();
if((K.height+W)>O){O=K.height+W;
}if((K.minHeight+W)>M){M=K.minHeight+W;
}}J+=N;
var S=this.getSpacing();
var V=this.getSeparator();

if(V){var R=P.computeHorizontalSeparatorGaps(X,S,V);
}else{var R=P.computeHorizontalGaps(X,S,true);
}return {minWidth:J+R,width:Q+R,minHeight:M,height:O};
}},destruct:function(){this._disposeFields(bj,bc,ba);
}});
})();
(function(){var bn="_applyLayoutChange",bm="top",bl="left",bk="middle",bj="Decorator",bi="__jc",bh="__jb",bg="center",bf="_applyReversed",be="bottom",bb="qx.ui.layout.VBox",bd="__je",bc="Integer",ba="right",Y="Boolean";
qx.Class.define(bb,{extend:qx.ui.layout.Abstract,construct:function(P,Q,R){arguments.callee.base.call(this);

if(P){this.setSpacing(P);
}
if(Q){this.setAlignY(Q);
}
if(R){this.setSeparator(R);
}},properties:{alignY:{check:[bm,bk,be],init:bm,apply:bn},alignX:{check:[bl,bg,ba],init:bl,apply:bn},spacing:{check:bc,init:0,apply:bn},separator:{check:bj,nullable:true,apply:bn},reversed:{check:Y,init:false,apply:bf}},members:{__jb:null,__jc:null,__jd:null,__je:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__jf:function(){var X=this._getLayoutChildren();
var length=X.length;
var T=false;
var S=this.__jb&&this.__jb.length!=length&&this.__jc&&this.__jb;
var V;
var U=S?this.__jb:new Array(length);
var W=S?this.__jc:new Array(length);
if(this.getReversed()){X=X.concat().reverse();
}for(var i=0;i<length;i++){V=X[i].getLayoutProperties();

if(V.height!=null){U[i]=parseFloat(V.height)/100;
}
if(V.flex!=null){W[i]=V.flex;
T=true;
}}if(!S){this.__jb=U;
this.__jc=W;
}this.__jd=T;
this.__je=X;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(a,b){if(this._invalidChildrenCache){this.__jf();
}var j=this.__je;
var length=j.length;
var u=qx.ui.layout.Util;
var t=this.getSpacing();
var x=this.getSeparator();

if(x){var f=u.computeVerticalSeparatorGaps(j,t,x);
}else{var f=u.computeVerticalGaps(j,t,true);
}var i,d,e,o;
var p=[];
var v=f;

for(i=0;i<length;i+=1){o=this.__jb[i];
e=o!=null?Math.floor((b-f)*o):j[i].getSizeHint().height;
p.push(e);
v+=e;
}if(this.__jd&&v!=b){var m={};
var s,w;

for(i=0;i<length;i+=1){s=this.__jc[i];

if(s>0){k=j[i].getSizeHint();
m[i]={min:k.minHeight,value:p[i],max:k.maxHeight,flex:s};
}}var g=u.computeFlexOffsets(m,b,v);

for(i in g){w=g[i].offset;
p[i]+=w;
v+=w;
}}var top=j[0].getMarginTop();
if(v<b&&this.getAlignY()!=bm){top=b-v;

if(this.getAlignY()===bk){top=Math.round(top/2);
}}var k,z,q,e,n,r,h;
this._clearSeparators();
if(x){var y=qx.theme.manager.Decoration.getInstance().resolve(x).getInsets();
var c=y.top+y.bottom;
}for(i=0;i<length;i+=1){d=j[i];
e=p[i];
k=d.getSizeHint();
r=d.getMarginLeft();
h=d.getMarginRight();
q=Math.max(k.minWidth,Math.min(a-r-h,k.maxWidth));
z=u.computeHorizontalAlignOffset(d.getAlignX()||this.getAlignX(),q,a,r,h);
if(i>0){if(x){top+=n+t;
this._renderSeparator(x,{top:top,left:0,height:c,width:a});
top+=c+t+d.getMarginTop();
}else{top+=u.collapseMargins(t,n,d.getMarginTop());
}}d.renderLayout(z,top,q,e);
top+=e;
n=d.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__jf();
}var G=qx.ui.layout.Util;
var O=this.__je;
var C=0,F=0,E=0;
var A=0,H=0;
var L,B,N;
for(var i=0,l=O.length;i<l;i+=1){L=O[i];
B=L.getSizeHint();
F+=B.height;
var K=this.__jc[i];
var D=this.__jb[i];

if(K){C+=B.minHeight;
}else if(D){E=Math.max(E,Math.round(B.minHeight/D));
}else{C+=B.height;
}N=L.getMarginLeft()+L.getMarginRight();
if((B.width+N)>H){H=B.width+N;
}if((B.minWidth+N)>A){A=B.minWidth+N;
}}C+=E;
var J=this.getSpacing();
var M=this.getSeparator();

if(M){var I=G.computeVerticalSeparatorGaps(O,J,M);
}else{var I=G.computeVerticalGaps(O,J,true);
}return {minHeight:C+I,height:F+I,minWidth:A,width:H};
}},destruct:function(){this._disposeFields(bh,bi,bd);
}});
})();
(function(){var f="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(f,{members:{getChildren:function(){return this.getChildrenContainer().getChildren();
},hasChildren:function(){return this.getChildrenContainer().hasChildren();
},add:function(g,h){return this.getChildrenContainer().add(g,h);
},remove:function(b){return this.getChildrenContainer().remove(b);
},removeAll:function(){return this.getChildrenContainer().removeAll();
},indexOf:function(a){return this.getChildrenContainer().indexOf(a);
},addAt:function(i,j,k){this.getChildrenContainer().addAt(i,j,k);
},addBefore:function(m,n,o){this.getChildrenContainer().addBefore(m,n,o);
},addAfter:function(c,d,e){this.getChildrenContainer().addAfter(c,d,e);
},removeAt:function(l){this.getChildrenContainer().removeAt(l);
}}});
})();
(function(){var D="popup",C="list",B="mousewheel",A="resize",z="PageUp",y="blur",x="abstract",w="keypress",v="Number",u="changeSelection",n="Escape",t="_applyMaxListHeight",q="PageDown",m="mouseup",l="changeVisibility",p="one",o="middle",r="qx.ui.form.AbstractSelectBox",k="mousedown",s="qx.event.type.Data";
qx.Class.define(r,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.form.MFormElement,qx.ui.form.MForm],implement:[qx.ui.form.IForm],type:x,construct:function(){arguments.callee.base.call(this);
var b=new qx.ui.layout.HBox();
this._setLayout(b);
b.setAlignY(o);
this.addListener(w,this._onKeyPress);
this.addListener(y,this.close,this);
var a=qx.core.Init.getApplication().getRoot();
a.addListener(B,this._onMousewheel,this,true);
this.addListener(A,this._onResize,this);
},properties:{focusable:{refine:true,init:true},width:{refine:true,init:120},maxListHeight:{check:v,apply:t,nullable:true,init:200}},events:{"changeValue":s},members:{_createChildControlImpl:function(G){var H;

switch(G){case C:H=new qx.ui.form.List().set({focusable:false,keepFocus:true,height:null,width:null,maxHeight:this.getMaxListHeight(),selectionMode:p,quickSelection:true});
H.addListener(u,this._onListChangeSelection,this);
H.addListener(k,this._onListMouseDown,this);
break;
case D:H=new qx.ui.popup.Popup(new qx.ui.layout.VBox);
H.setAutoHide(false);
H.setKeepActive(true);
H.addListener(m,this.close,this);
H.add(this.getChildControl(C));
H.addListener(l,this._onPopupChangeVisibility,this);
break;
}return H||arguments.callee.base.call(this,G);
},_applyMaxListHeight:function(c,d){this.getChildControl(C).setMaxHeight(c);
},getChildrenContainer:function(){return this.getChildControl(C);
},open:function(){var h=this.getChildControl(D);
h.placeToWidget(this,true);
h.show();
},close:function(){this.getChildControl(D).hide();
},toggle:function(){var g=this.getChildControl(D).isVisible();

if(g){this.close();
}else{this.open();
}},_onKeyPress:function(e){var E=e.getKeyIdentifier();
var F=this.getChildControl(D);
if(F.isHidden()&&(E==q||E==z)){e.stopPropagation();
}else if(!F.isHidden()&&E==n){this.close();
e.stop();
}else{this.getChildControl(C).handleKeyPress(e);
}},_onMousewheel:function(e){var j=e.getTarget();
var i=this.getChildControl(D);

if(qx.ui.core.Widget.contains(i,j)){return;
}this.close();
e.preventDefault();
},_onResize:function(e){this.getChildControl(D).setMinWidth(e.getData().width);
},_onListChangeSelection:function(e){throw new Error("Abstract method: _onListChangeSelection()");
},_onListMouseDown:function(e){throw new Error("Abstract method: _onListMouseDown()");
},_onPopupChangeVisibility:function(e){throw new Error("Abstract method: _onPopupChangeVisibility()");
}},destruct:function(){var f=qx.core.Init.getApplication().getRoot();

if(f){f.removeListener(B,this._onMousewheel,this,true);
}}});
})();
(function(){var d="qx.ui.core.ISingleSelection",c="qx.event.type.Data";
qx.Interface.define(d,{events:{"changeSelection":c},members:{getSelection:function(){return true;
},setSelection:function(b){return arguments.length==1;
},resetSelection:function(){return true;
},isSelected:function(a){return arguments.length==1;
},isSelectionEmpty:function(){return true;
},getSelectables:function(){return true;
}}});
})();
(function(){var a="qx.ui.form.IModelSelection";
qx.Interface.define(a,{members:{setModelSelection:function(b){},getModelSelection:function(){}}});
})();
(function(){var m="qx.ui.core.MSingleSelectionHandling",l="__iE",k="changeSelection",j="changeSelected",i="qx.event.type.Data";
qx.Mixin.define(m,{events:{"changeSelection":i},members:{__iE:null,getSelection:function(){var g=this.__iF().getSelected();

if(g){return [g];
}else{return [];
}},setSelection:function(c){switch(c.length){case 0:this.resetSelection();
break;
case 1:this.__iF().setSelected(c[0]);
break;
default:throw new Error("Could only select one item, but the selection "+" array contains "+c.length+" items!");
}},resetSelection:function(){this.__iF().resetSelected();
},isSelected:function(a){return this.__iF().isSelected(a);
},isSelectionEmpty:function(){return this.__iF().isSelectionEmpty();
},getSelectables:function(){return this.__iF().getSelectables();
},_onChangeSelected:function(e){var f=e.getData();
var d=e.getOldData();
f==null?f=[]:f=[f];
d==null?d=[]:d=[d];
this.fireDataEvent(k,f,d);
},__iF:function(){if(this.__iE==null){var b=this;
this.__iE=new qx.ui.core.SingleSelectionManager({getItems:function(){return b._getItems();
},isItemSelectable:function(h){if(b._isItemSelectable){return b._isItemSelectable(h);
}else{return h.isEnabled()&&h.isVisible();
}}});
this.__iE.addListener(j,this._onChangeSelected,this);
}this.__iE.setAllowEmptySelection(this._isAllowEmptySelection());
return this.__iE;
}},destruct:function(){this._disposeObjects(l);
}});
})();
(function(){var a="qx.ui.form.MModelSelection";
qx.Mixin.define(a,{members:{getModelSelection:function(){var d=this.getSelection();
var b=[];

for(var i=0;i<d.length;i++){var c=d[i].getModel();

if(c!=null){b.push(c);
}}return b;
},setModelSelection:function(e){if(!e){this.resetSelection();
return;
}{};
var f=this.getSelectables();
var g=[];

for(var i=0;i<e.length;i++){var h=e[i];

for(var j=0;j<f.length;j++){var k=f[j];

if(h===k.getModel()){g.push(k);
break;
}}}this.setSelection(g);
}}});
})();
(function(){var m="list",l="changeSelected",k="pressed",j="abandoned",i="popup",h="atom",g="hovered",f="changeValue",d="arrow",c="",K="spacer",J="Enter",I="one",H="Please use getModelSelection instead.",G="Space",F="key",E="qx.event.type.Data",D="Please use setModelSelection instead.",C="mousewheel",B="keyinput",t="Use 'setSelection' instead!",u="changeSelection",r="Use 'changeSelection' instead!",s="quick",p="qx.ui.form.SelectBox",q="mouseover",n="selectbox",o="Please use resetSelection instead.",v="mouseout",w="click",y="Use 'resetSelection' instead!",x="Use 'getSelection' instead!",A=" ",z="__eT";
qx.Class.define(p,{extend:qx.ui.form.AbstractSelectBox,implement:[qx.ui.form.IFormElement,qx.ui.core.ISingleSelection,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(){arguments.callee.base.call(this);
this._createChildControl(h);
this._createChildControl(K);
this._createChildControl(d);
this.addListener(q,this._onMouseOver,this);
this.addListener(v,this._onMouseOut,this);
this.addListener(w,this._onClick,this);
this.addListener(C,this._onMouseWheel,this);
this.addListener(B,this._onKeyInput,this);
this.addListener(u,this.__eU,this);
},events:{"changeSelected":E},properties:{appearance:{refine:true,init:n}},members:{__eT:null,_createChildControlImpl:function(U){var V;

switch(U){case K:V=new qx.ui.core.Spacer();
this._add(V,{flex:1});
break;
case h:V=new qx.ui.basic.Atom(A);
V.setCenter(false);
V.setAnonymous(true);
this._add(V,{flex:1});
break;
case d:V=new qx.ui.basic.Image();
V.setAnonymous(true);
this._add(V);
break;
}return V||arguments.callee.base.call(this,U);
},_forwardStates:{focused:true},setSelected:function(L){qx.log.Logger.deprecatedMethodWarning(arguments.callee,t);
this.setSelection([L]);
},getSelected:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,x);
var M=this.getSelection()[0];

if(M){return M;
}else{return null;
}},resetSelected:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,y);
this.resetSelection();
},setValue:function(W){qx.log.Logger.deprecatedMethodWarning(arguments.callee,D);
this.getChildControl(m).setValue(W);
},getValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,H);
var a=this.getSelection()[0];
return a?a.getFormValue():null;
},resetValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
var X=this.getChildControl(m);
var Y=X.getChildren();

if(Y[0]){X.setValue(Y[0].getFormValue()||null);
}},_getItems:function(){return this.getChildrenContainer().getChildren();
},_isAllowEmptySelection:function(){return !this.getChildrenContainer().getSelectionMode()===I;
},__eU:function(e){var P=e.getData()[0];
var N=this.getChildControl(m);

if(N.getSelection()[0]!=P){N.setSelection([P]);
}var R=this.getChildControl(h);
var O=P?P.getLabel():c;
if(O&&O.translate){O=O.translate();
}O==null?R.resetLabel():R.setLabel(O);
var T=P?P.getIcon():c;
T==null?R.resetIcon():R.setIcon(T);
if(this.hasListener(f)){this.fireDataEvent(f,N.getValue());
}if(this.hasListener(l)){var S=e.getData()[0];
var Q=e.getOldData()[0];
this.fireDataEvent(l,S,Q);
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(j)){this.removeState(j);
this.addState(k);
}this.addState(g);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(g);

if(this.hasState(k)){this.removeState(k);
this.addState(j);
}},_onClick:function(e){this.toggle();
},_onMouseWheel:function(e){if(this.getChildControl(i).isVisible()){return;
}var bf=e.getWheelDelta()>0?1:-1;
var bh=this.getSelectables();
var bg=this.getSelection()[0];

if(!bg){bg=bh[0];
}var be=bh.indexOf(bg)+bf;
var bi=bh.length-1;
if(be<0){be=0;
}else if(be>=bi){be=bi;
}this.setSelection([bh[be]]);
e.stopPropagation();
e.preventDefault();
},_onKeyPress:function(e){var b=e.getKeyIdentifier();

if(b==J||b==G){if(this.__eT){this.setSelection([this.__eT]);
this.__eT=null;
}this.toggle();
}else{arguments.callee.base.call(this,e);
}},_onKeyInput:function(e){var ba=e.clone();
ba.setTarget(this._list);
ba.setBubbles(false);
this.getChildControl(m).dispatchEvent(ba);
},_onListMouseDown:function(e){if(this.__eT){this.setSelection([this.__eT]);
this.__eT=null;
}},_onListChangeSelection:function(e){var bj=e.getData();

if(bj.length>0){var bk=this.getChildControl(i);
var bl=this.getChildControl(m);
var bm=bl.getSelectionContext();

if(bk.isVisible()&&(bm==s||bm==F)){this.__eT=bj[0];
}else{this.setSelection([bj[0]]);
this.__eT=null;
}}else{this.resetSelection();
}},_onPopupChangeVisibility:function(e){var bn=this.getChildControl(i);

if(!bn.isVisible()){var bo=this.getChildControl(m);
if(bo.hasChildren()){bo.setSelection(this.getSelection());
}}},addListener:function(bb,bc,self,bd){if(bb===l){qx.log.Logger.deprecatedEventWarning(arguments.callee,l,r);
}return arguments.callee.base.call(this,bb,bc,self,bd);
}},destruct:function(){this._disposeFields(z);
}});
})();
(function(){var a="qx.ui.core.IMultiSelection";
qx.Interface.define(a,{extend:qx.ui.core.ISingleSelection,members:{selectAll:function(){return true;
},addToSelection:function(c){return arguments.length==1;
},removeFromSelection:function(b){return arguments.length==1;
}}});
})();
(function(){var E="Use 'setSelection' instead!",D="Boolean",C="changeSelection",B="single",A="Use 'getSelection' instead!",z="mousedown",y="one",x="__jE",w="qx.event.type.Data",v="_applyDragSelection",R="mousemove",Q="addItem",P="multi",O="_applyQuickSelection",N="mouseover",M="keypress",L="_applySelectionMode",K="additive",J="mouseup",I="Use 'resetSelection' instead!",G="losecapture",H="removeItem",F="qx.ui.core.MMultiSelectionHandling";
qx.Mixin.define(F,{construct:function(){var r=this.SELECTION_MANAGER;
var q=this.__jE=new r(this);
this.addListener(z,q.handleMouseDown,q);
this.addListener(J,q.handleMouseUp,q);
this.addListener(N,q.handleMouseOver,q);
this.addListener(R,q.handleMouseMove,q);
this.addListener(G,q.handleLoseCapture,q);
this.addListener(M,q.handleKeyPress,q);
this.addListener(Q,q.handleAddItem,q);
this.addListener(H,q.handleRemoveItem,q);
q.addListener(C,this._onSelectionChange,this);
},events:{"changeSelection":w},properties:{selectionMode:{check:[B,P,K,y],init:B,apply:L},dragSelection:{check:D,init:false,apply:v},quickSelection:{check:D,init:false,apply:O}},members:{__jE:null,selectAll:function(){this.__jE.selectAll();
},select:function(g){qx.log.Logger.deprecatedMethodWarning(arguments.callee,E);
this.setSelection([g]);
},setSelected:function(o){qx.log.Logger.deprecatedMethodWarning(arguments.callee,E);
this.setSelection([o]);
},isSelected:function(f){if(!qx.ui.core.Widget.contains(this,f)){throw new Error("Could not test if "+f+" is selected, because it is not a child element!");
}return this.__jE.isItemSelected(f);
},addToSelection:function(h){if(!qx.ui.core.Widget.contains(this,h)){throw new Error("Could not add + "+h+" to selection, because it is not a child element!");
}this.__jE.addItem(h);
},removeFromSelection:function(l){if(!qx.ui.core.Widget.contains(this,l)){throw new Error("Could not remove "+l+" from selection, because it is not a child element!");
}this.__jE.removeItem(l);
},selectRange:function(a,b){this.__jE.selectItemRange(a,b);
},clearSelection:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,I);
this.resetSelection();
},resetSelection:function(){this.__jE.clearSelection();
},replaceSelection:function(p){qx.log.Logger.deprecatedMethodWarning(arguments.callee,E);
this.setSelection(p);
},setSelection:function(u){for(var i=0;i<u.length;i++){if(!qx.ui.core.Widget.contains(this,u[i])){throw new Error("Could not select "+u[i]+", because it is not a child element!");
}}
if(u.length===0){this.resetSelection();
}else{this.__jE.replaceSelection(u);
}},getSelectedItem:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,A);
var n=this.getSelection();

if(n.length>0){return n[0];
}else{return null;
}},getSelected:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,A);
var m=this.getSelection();

if(m.length>0){return m[0];
}else{return null;
}},getSelection:function(){return this.__jE.getSelection();
},getSortedSelection:function(){return this.__jE.getSortedSelection();
},isSelectionEmpty:function(){return this.__jE.isSelectionEmpty();
},getSelectionContext:function(){return this.__jE.getSelectionContext();
},_getManager:function(){return this.__jE;
},getSelectables:function(){return this.__jE.getSelectables();
},invertSelection:function(){this.__jE.invertSelection();
},_applySelectionMode:function(s,t){this.__jE.setMode(s);
},_applyDragSelection:function(j,k){this.__jE.setDrag(j);
},_applyQuickSelection:function(c,d){this.__jE.setQuick(c);
},_onSelectionChange:function(e){this.fireDataEvent(C,e.getData());
}},destruct:function(){this._disposeObjects(x);
}});
})();
(function(){var bu="one",bt="single",bs="selected",br="additive",bq="multi",bp="PageUp",bo="under",bn="Left",bm="lead",bl="Down",bW="Up",bV="Boolean",bU="PageDown",bT="anchor",bS="End",bR="Home",bQ="Right",bP="right",bO="click",bN="above",bB="left",bC="Escape",bz="__jX",bA="__jW",bx="A",by="Space",bv="_applyMode",bw="interval",bD="changeSelection",bE="qx.event.type.Data",bH="quick",bG="key",bJ="__jF",bI="__jY",bL="abstract",bK="__jI",bF="drag",bM="qx.ui.core.selection.Abstract";
qx.Class.define(bM,{type:bL,extend:qx.core.Object,construct:function(){arguments.callee.base.call(this);
this.__jF={};
},events:{"changeSelection":bE},properties:{mode:{check:[bt,bq,br,bu],init:bt,apply:bv},drag:{check:bV,init:false},quick:{check:bV,init:false}},members:{__jG:0,__jH:0,__jI:null,__jJ:null,__jK:null,__jL:null,__jM:null,__jN:null,__jO:null,__jP:null,__jQ:null,__jR:null,__jS:null,__jT:null,__jU:null,__jV:null,__jW:null,__jF:null,__jX:null,__jY:null,getSelectionContext:function(){return this.__jV;
},selectAll:function(){var C=this.getMode();

if(C==bt||C==bu){throw new Error("Can not select all items in selection mode: "+C);
}this._selectAllItems();
this._fireChange();
},selectItem:function(c){this._setSelectedItem(c);
var d=this.getMode();

if(d!==bt&&d!==bu){this._setLeadItem(c);
this._setAnchorItem(c);
}this._scrollItemIntoView(c);
this._fireChange();
},addItem:function(j){var k=this.getMode();

if(k===bt||k===bu){this._setSelectedItem(j);
}else{if(!this._getAnchorItem()){this._setAnchorItem(j);
}this._setLeadItem(j);
this._addToSelection(j);
}this._scrollItemIntoView(j);
this._fireChange();
},removeItem:function(ck){this._removeFromSelection(ck);

if(this.getMode()===bu&&this.isSelectionEmpty()){var cl=this._getFirstSelectable();

if(cl){this.addItem(cl);
}if(cl==ck){return;
}}
if(this._getLeadItem()==ck){this._setLeadItem(null);
}
if(this._getAnchorItem()==ck){this._setAnchorItem(null);
}this._fireChange();
},selectItemRange:function(cC,cD){var cE=this.getMode();

if(cE==bt||cE==bu){throw new Error("Can not select multiple items in selection mode: "+cE);
}this._selectItemRange(cC,cD);
this._setAnchorItem(cC);
this._setLeadItem(cD);
this._scrollItemIntoView(cD);
this._fireChange();
},clearSelection:function(){if(this.getMode()==bu){return;
}this._clearSelection();
this._setLeadItem(null);
this._setAnchorItem(null);
this._fireChange();
},replaceSelection:function(M){var N=this.getMode();

if(N==bu||N===bt){if(M.length>1){throw new Error("Could not select more than one items in mode: "+N+"!");
}
if(M.length==1){this.selectItem(M[0]);
}else{this.clearSelection();
}return;
}else{this._replaceMultiSelection(M);
}},getSelectedItem:function(){var cF=this.getMode();

if(cF===bt||cF===bu){return this._getSelectedItem()||null;
}throw new Error("The method getSelectedItem() is only supported in 'single' and 'one' selection mode!");
},getSelection:function(){return qx.lang.Object.getValues(this.__jF);
},getSortedSelection:function(){var V=this.getSelectables();
var U=qx.lang.Object.getValues(this.__jF);
U.sort(function(a,b){return V.indexOf(a)-V.indexOf(b);
});
return U;
},isItemSelected:function(bj){var bk=this._selectableToHashCode(bj);
return this.__jF[bk]!==undefined;
},isSelectionEmpty:function(){return qx.lang.Object.isEmpty(this.__jF);
},invertSelection:function(){var cN=this.getMode();

if(cN===bt||cN===bu){throw new Error("The method invertSelection() is only supported in 'multi' and 'additive' selection mode!");
}var cM=this.getSelectables();

for(var i=0;i<cM.length;i++){this._toggleInSelection(cM[i]);
}this._fireChange();
},_setLeadItem:function(r){var s=this.__jW;

if(s!==null){this._styleSelectable(s,bm,false);
}
if(r!==null){this._styleSelectable(r,bm,true);
}this.__jW=r;
},_getLeadItem:function(){return this.__jW!==null?this.__jW:null;
},_setAnchorItem:function(Q){var R=this.__jX;

if(R){this._styleSelectable(R,bT,false);
}
if(Q){this._styleSelectable(Q,bT,true);
}this.__jX=Q;
},_getAnchorItem:function(){return this.__jX!==null?this.__jX:null;
},_isSelectable:function(m){throw new Error("Abstract method call: _isSelectable()");
},_getSelectableFromMouseEvent:function(event){var ba=event.getTarget();
return this._isSelectable(ba)?ba:null;
},_selectableToHashCode:function(q){throw new Error("Abstract method call: _selectableToHashCode()");
},_styleSelectable:function(cw,cx,cy){throw new Error("Abstract method call: _styleSelectable()");
},_capture:function(){throw new Error("Abstract method call: _capture()");
},_releaseCapture:function(){throw new Error("Abstract method call: _releaseCapture()");
},_getLocation:function(){throw new Error("Abstract method call: _getLocation()");
},_getDimension:function(){throw new Error("Abstract method call: _getDimension()");
},_getSelectableLocationX:function(p){throw new Error("Abstract method call: _getSelectableLocationX()");
},_getSelectableLocationY:function(cm){throw new Error("Abstract method call: _getSelectableLocationY()");
},_getScroll:function(){throw new Error("Abstract method call: _getScroll()");
},_scrollBy:function(bX,bY){throw new Error("Abstract method call: _scrollBy()");
},_scrollItemIntoView:function(S){throw new Error("Abstract method call: _scrollItemIntoView()");
},getSelectables:function(){throw new Error("Abstract method call: getSelectables()");
},_getSelectableRange:function(O,P){throw new Error("Abstract method call: _getSelectableRange()");
},_getFirstSelectable:function(){throw new Error("Abstract method call: _getFirstSelectable()");
},_getLastSelectable:function(){throw new Error("Abstract method call: _getLastSelectable()");
},_getRelatedSelectable:function(cK,cL){throw new Error("Abstract method call: _getRelatedSelectable()");
},_getPage:function(n,o){throw new Error("Abstract method call: _getPage()");
},_applyMode:function(W,X){this._setLeadItem(null);
this._setAnchorItem(null);
this._clearSelection();
if(W===bu){var Y=this._getFirstSelectable();

if(Y){this._setSelectedItem(Y);
this._scrollItemIntoView(Y);
}}this._fireChange();
},handleMouseOver:function(event){if(!this.getQuick()){return;
}var bc=this.getMode();

if(bc!==bu&&bc!==bt){return;
}var bb=this._getSelectableFromMouseEvent(event);

if(bb===null){return;
}this._setSelectedItem(bb);
this._fireChange(bH);
},handleMouseDown:function(event){var cg=this._getSelectableFromMouseEvent(event);

if(cg===null){return;
}var ci=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var cf=event.isShiftPressed();
if(this.isItemSelected(cg)&&!cf&&!ci&&!this.getDrag()){this.__jY=cg;
return;
}else{this.__jY=null;
}this._scrollItemIntoView(cg);
switch(this.getMode()){case bt:case bu:this._setSelectedItem(cg);
break;
case br:this._setLeadItem(cg);
this._setAnchorItem(cg);
this._toggleInSelection(cg);
break;
case bq:this._setLeadItem(cg);
if(cf){var ch=this._getAnchorItem();

if(ch===null){ch=this._getFirstSelectable();
this._setAnchorItem(ch);
}this._selectItemRange(ch,cg,ci);
}else if(ci){this._setAnchorItem(cg);
this._toggleInSelection(cg);
}else{this._setAnchorItem(cg);
this._setSelectedItem(cg);
}break;
}var cj=this.getMode();

if(this.getDrag()&&cj!==bt&&cj!==bu&&!cf&&!ci){this.__jM=this._getLocation();
this.__jJ=this._getScroll();
this.__jN=event.getDocumentLeft()+this.__jJ.left;
this.__jO=event.getDocumentTop()+this.__jJ.top;
this.__jP=true;
this._capture();
}this._fireChange(bO);
},handleMouseUp:function(event){var bi=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bf=event.isShiftPressed();

if(!bi&&!bf&&this.__jY){var bg=this._getSelectableFromMouseEvent(event);

if(bg===null||!this.isItemSelected(bg)){return;
}var bh=this.getMode();

if(bh===br){this._removeFromSelection(bg);
}else{this._setSelectedItem(bg);

if(this.getMode()===bq){this._setLeadItem(bg);
this._setAnchorItem(bg);
}}}this._cleanup();
},handleLoseCapture:function(event){this._cleanup();
},handleMouseMove:function(event){if(!this.__jP){return;
}this.__jQ=event.getDocumentLeft();
this.__jR=event.getDocumentTop();
var cA=this.__jQ+this.__jJ.left;

if(cA>this.__jN){this.__jS=1;
}else if(cA<this.__jN){this.__jS=-1;
}else{this.__jS=0;
}var cz=this.__jR+this.__jJ.top;

if(cz>this.__jO){this.__jT=1;
}else if(cz<this.__jO){this.__jT=-1;
}else{this.__jT=0;
}var location=this.__jM;

if(this.__jQ<location.left){this.__jG=this.__jQ-location.left;
}else if(this.__jQ>location.right){this.__jG=this.__jQ-location.right;
}else{this.__jG=0;
}
if(this.__jR<location.top){this.__jH=this.__jR-location.top;
}else if(this.__jR>location.bottom){this.__jH=this.__jR-location.bottom;
}else{this.__jH=0;
}if(!this.__jI){this.__jI=new qx.event.Timer(100);
this.__jI.addListener(bw,this._onInterval,this);
}this.__jI.start();
this._autoSelect();
},handleAddItem:function(e){var T=e.getData();

if(this.getMode()===bu&&this.isSelectionEmpty()){this.addItem(T);
}},handleRemoveItem:function(e){this.removeItem(e.getData());
},_cleanup:function(){if(!this.getDrag()&&this.__jP){return;
}if(this.__jU){this._fireChange(bO);
}delete this.__jP;
delete this.__jK;
delete this.__jL;
this._releaseCapture();
if(this.__jI){this.__jI.stop();
}},_onInterval:function(e){this._scrollBy(this.__jG,this.__jH);
this.__jJ=this._getScroll();
this._autoSelect();
},_autoSelect:function(){var cX=this._getDimension();
var cQ=Math.max(0,Math.min(this.__jQ-this.__jM.left,cX.width))+this.__jJ.left;
var cP=Math.max(0,Math.min(this.__jR-this.__jM.top,cX.height))+this.__jJ.top;
if(this.__jK===cQ&&this.__jL===cP){return;
}this.__jK=cQ;
this.__jL=cP;
var da=this._getAnchorItem();
var cS=da;
var cV=this.__jS;
var cY,cR;

while(cV!==0){cY=cV>0?this._getRelatedSelectable(cS,bP):this._getRelatedSelectable(cS,bB);
if(cY!==null){cR=this._getSelectableLocationX(cY);
if((cV>0&&cR.left<=cQ)||(cV<0&&cR.right>=cQ)){cS=cY;
continue;
}}break;
}var cW=this.__jT;
var cU,cT;

while(cW!==0){cU=cW>0?this._getRelatedSelectable(cS,bo):this._getRelatedSelectable(cS,bN);
if(cU!==null){cT=this._getSelectableLocationY(cU);
if((cW>0&&cT.top<=cP)||(cW<0&&cT.bottom>=cP)){cS=cU;
continue;
}}break;
}var db=this.getMode();

if(db===bq){this._selectItemRange(da,cS);
}else if(db===br){if(this.isItemSelected(da)){this._selectItemRange(da,cS,true);
}else{this._deselectItemRange(da,cS);
}this._setAnchorItem(cS);
}this._fireChange(bF);
},__ka:{Home:1,Down:1,Right:1,PageDown:1,End:1,Up:1,Left:1,PageUp:1},handleKeyPress:function(event){var cs,cr;
var cu=event.getKeyIdentifier();
var ct=this.getMode();
var co=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var cp=event.isShiftPressed();
var cq=false;

if(cu===bx&&co){if(ct!==bt&&ct!==bu){this._selectAllItems();
cq=true;
}}else if(cu===bC){if(ct!==bt&&ct!==bu){this._clearSelection();
cq=true;
}}else if(cu===by){var cn=this._getLeadItem();

if(cn&&!cp){if(co||ct===br){this._toggleInSelection(cn);
}else{this._setSelectedItem(cn);
}cq=true;
}}else if(this.__ka[cu]){cq=true;

if(ct===bt||ct==bu){cs=this._getSelectedItem();
}else{cs=this._getLeadItem();
}
if(cs!==null){switch(cu){case bR:cr=this._getFirstSelectable();
break;
case bS:cr=this._getLastSelectable();
break;
case bW:cr=this._getRelatedSelectable(cs,bN);
break;
case bl:cr=this._getRelatedSelectable(cs,bo);
break;
case bn:cr=this._getRelatedSelectable(cs,bB);
break;
case bQ:cr=this._getRelatedSelectable(cs,bP);
break;
case bp:cr=this._getPage(cs,true);
break;
case bU:cr=this._getPage(cs,false);
break;
}}else{switch(cu){case bR:case bl:case bQ:case bU:cr=this._getFirstSelectable();
break;
case bS:case bW:case bn:case bp:cr=this._getLastSelectable();
break;
}}if(cr!==null){switch(ct){case bt:case bu:this._setSelectedItem(cr);
break;
case br:this._setLeadItem(cr);
break;
case bq:if(cp){var cv=this._getAnchorItem();

if(cv===null){this._setAnchorItem(cv=this._getFirstSelectable());
}this._setLeadItem(cr);
this._selectItemRange(cv,cr,co);
}else{this._setAnchorItem(cr);
this._setLeadItem(cr);

if(!co){this._setSelectedItem(cr);
}}break;
}this._scrollItemIntoView(cr);
}}
if(cq){event.stop();
this._fireChange(bG);
}},_selectAllItems:function(){var cB=this.getSelectables();

for(var i=0,l=cB.length;i<l;i++){this._addToSelection(cB[i]);
}},_clearSelection:function(){var D=this.__jF;

for(var E in D){this._removeFromSelection(D[E]);
}this.__jF={};
},_selectItemRange:function(t,u,v){var y=this._getSelectableRange(t,u);
if(!v){var x=this.__jF;
var z=this.__kb(y);

for(var w in x){if(!z[w]){this._removeFromSelection(x[w]);
}}}for(var i=0,l=y.length;i<l;i++){this._addToSelection(y[i]);
}},_deselectItemRange:function(f,g){var h=this._getSelectableRange(f,g);

for(var i=0,l=h.length;i<l;i++){this._removeFromSelection(h[i]);
}},__kb:function(ca){var cc={};
var cb;

for(var i=0,l=ca.length;i<l;i++){cb=ca[i];
cc[this._selectableToHashCode(cb)]=cb;
}return cc;
},_getSelectedItem:function(){for(var cG in this.__jF){return this.__jF[cG];
}return null;
},_setSelectedItem:function(cH){if(this._isSelectable(cH)){var cI=this.__jF;
var cJ=this._selectableToHashCode(cH);

if(!cI[cJ]||qx.lang.Object.hasMinLength(cI,2)){this._clearSelection();
this._addToSelection(cH);
}}},_addToSelection:function(A){var B=this._selectableToHashCode(A);

if(!this.__jF[B]&&this._isSelectable(A)){this.__jF[B]=A;
this._styleSelectable(A,bs,true);
this.__jU=true;
}},_toggleInSelection:function(bd){var be=this._selectableToHashCode(bd);

if(!this.__jF[be]){this.__jF[be]=bd;
this._styleSelectable(bd,bs,true);
}else{delete this.__jF[be];
this._styleSelectable(bd,bs,false);
}this.__jU=true;
},_removeFromSelection:function(cd){var ce=this._selectableToHashCode(cd);

if(this.__jF[ce]!=null){delete this.__jF[ce];
this._styleSelectable(cd,bs,false);
this.__jU=true;
}},_replaceMultiSelection:function(F){var I=false;
var L,K;
var G={};

for(var i=0,l=F.length;i<l;i++){L=F[i];

if(this._isSelectable(L)){K=this._selectableToHashCode(L);
G[K]=L;
}}var H=L;
var J=this.__jF;

for(var K in J){if(G[K]){delete G[K];
}else{L=J[K];
delete J[K];
this._styleSelectable(L,bs,false);
I=true;
}}for(var K in G){L=J[K]=G[K];
this._styleSelectable(L,bs,true);
I=true;
}if(!I){return false;
}this._scrollItemIntoView(H);
this._setLeadItem(null);
this._setAnchorItem(null);
this.__jU=true;
this._fireChange();
},_fireChange:function(cO){if(this.__jU){this.__jV=cO||null;
this.fireDataEvent(bD,this.getSelection());
delete this.__jU;
}}},destruct:function(){this._disposeObjects(bK);
this._disposeFields(bJ,bI,bz,bA);
}});
})();
(function(){var k="vertical",j="under",h="above",g="qx.ui.core.selection.Widget",f="__kc",e="left",d="right";
qx.Class.define(g,{extend:qx.ui.core.selection.Abstract,construct:function(A){arguments.callee.base.call(this);
this.__kc=A;
},members:{__kc:null,_isSelectable:function(a){return a.isEnabled()&&a.isVisible()&&a.getLayoutParent()===this.__kc;
},_selectableToHashCode:function(P){return P.$$hash;
},_styleSelectable:function(m,n,o){o?m.addState(n):m.removeState(n);
},_capture:function(){this.__kc.capture();
},_releaseCapture:function(){this.__kc.releaseCapture();
},_getWidget:function(){return this.__kc;
},_getLocation:function(){var B=this.__kc.getContentElement().getDomElement();
return B?qx.bom.element.Location.get(B):null;
},_getDimension:function(){return this.__kc.getInnerSize();
},_getSelectableLocationX:function(s){var t=s.getBounds();

if(t){return {left:t.left,right:t.left+t.width};
}},_getSelectableLocationY:function(b){var c=b.getBounds();

if(c){return {top:c.top,bottom:c.top+c.height};
}},_getScroll:function(){return {left:0,top:0};
},_scrollBy:function(N,O){},_scrollItemIntoView:function(C){this.__kc.scrollChildIntoView(C);
},getSelectables:function(){var q=this.__kc.getChildren();
var r=[];
var p;

for(var i=0,l=q.length;i<l;i++){p=q[i];

if(p.isEnabled()&&p.isVisible()){r.push(p);
}}return r;
},_getSelectableRange:function(u,v){if(u===v){return [u];
}var z=this.__kc.getChildren();
var w=[];
var y=false;
var x;

for(var i=0,l=z.length;i<l;i++){x=z[i];

if(x===u||x===v){if(y){w.push(x);
break;
}else{y=true;
}}
if(y&&x.isEnabled()&&x.isVisible()){w.push(x);
}}return w;
},_getFirstSelectable:function(){var D=this.__kc.getChildren();

for(var i=0,l=D.length;i<l;i++){if(D[i].isEnabled()&&D[i].isVisible()){return D[i];
}}return null;
},_getLastSelectable:function(){var M=this.__kc.getChildren();

for(var i=M.length-1;i>0;i--){if(M[i].isEnabled()&&M[i].isVisible()){return M[i];
}}return null;
},_getRelatedSelectable:function(E,F){var I=this.__kc.getOrientation()===k;
var H=this.__kc.getChildren();
var G=H.indexOf(E);
var J;

if((I&&F===h)||(!I&&F===e)){for(var i=G-1;i>=0;i--){J=H[i];

if(J.isEnabled()&&J.isVisible()){return J;
}}}else if((I&&F===j)||(!I&&F===d)){for(var i=G+1;i<H.length;i++){J=H[i];

if(J.isEnabled()&&J.isVisible()){return J;
}}}return null;
},_getPage:function(K,L){if(L){return this._getFirstSelectable();
}else{return this._getLastSelectable();
}}},destruct:function(){this._disposeFields(f);
}});
})();
(function(){var c="qx.ui.core.selection.ScrollArea";
qx.Class.define(c,{extend:qx.ui.core.selection.Widget,members:{_isSelectable:function(b){return (b.isEnabled()&&b.isVisible()&&b.getLayoutParent()===this._getWidget().getChildrenContainer());
},_getDimension:function(){return this._getWidget().getPaneSize();
},_getScroll:function(){var a=this._getWidget();
return {left:a.getScrollX(),top:a.getScrollY()};
},_scrollBy:function(q,r){var s=this._getWidget();
s.scrollByX(q);
s.scrollByY(r);
},_getPage:function(d,e){var j=this.getSelectables();
var length=j.length;
var m=j.indexOf(d);
if(m===-1){throw new Error("Invalid lead item: "+d);
}var f=this._getWidget();
var o=f.getScrollY();
var innerHeight=f.getInnerSize().height;
var top,h,n;

if(e){var l=o;
var i=m;
while(1){for(;i>=0;i--){top=f.getItemTop(j[i]);
if(top<l){n=i+1;
break;
}}if(n==null){var p=this._getFirstSelectable();
return p==d?null:p;
}if(n>=m){l-=innerHeight+o-f.getItemBottom(d);
n=null;
continue;
}return j[n];
}}else{var k=innerHeight+o;
var i=m;
while(1){for(;i<length;i++){h=f.getItemBottom(j[i]);
if(h>k){n=i-1;
break;
}}if(n==null){var g=this._getLastSelectable();
return g==d?null:g;
}if(n<=m){k+=f.getItemTop(d)-o;
n=null;
continue;
}return j[n];
}}}}});
})();
(function(){var m="changeValue",k="qx.event.type.Data",j="horizontal",h="vertical",g="",f=",",d="qx.ui.form.List",c="Boolean",b="one",a="action",F="addChildWidget",E="_applySpacing",D="Please use setModelSelection instead.",C="list",B="Please use the changeSelection event instead.",A="keyinput",z="Integer",y="changeSelection",x="addItem",w="removeChildWidget",t="_applyOrientation",u="multi",r="__ee",s="single",p="keypress",q="Please use getModelSelection instead.",n="Enter",o="pane",v="removeItem";
qx.Class.define(d,{extend:qx.ui.core.AbstractScrollArea,implement:[qx.ui.form.IFormElement,qx.ui.core.IMultiSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MMultiSelectionHandling,qx.ui.form.MFormElement,qx.ui.form.MForm,qx.ui.form.MModelSelection],construct:function(I){arguments.callee.base.call(this);
this.__ee=new qx.ui.container.Composite();
this.__ee.addListener(F,this._onAddChild,this);
this.__ee.addListener(w,this._onRemoveChild,this);
this.getChildControl(o).add(this.__ee);
if(I){this.setOrientation(j);
}else{this.initOrientation();
}this.addListener(p,this._onKeyPress);
this.addListener(A,this._onKeyInput);
this.addListener(y,this._onChangeSelection);
this.__ef=g;
},events:{addItem:k,removeItem:k,changeValue:k},properties:{appearance:{refine:true,init:C},focusable:{refine:true,init:true},orientation:{check:[j,h],init:h,apply:t},spacing:{check:z,init:0,apply:E,themeable:true},enableInlineFind:{check:c,init:true}},members:{__ef:null,__eg:null,__ee:null,SELECTION_MANAGER:qx.ui.core.selection.ScrollArea,getChildrenContainer:function(){return this.__ee;
},_onAddChild:function(e){this.fireDataEvent(x,e.getData());
},_onRemoveChild:function(e){this.fireDataEvent(v,e.getData());
},getValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,q);
var P=this.getSelection();
var Q=[];
var R;

for(var i=0,l=P.length;i<l;i++){R=P[i].getValue();
if(R==null){R=P[i].getLabel();
}Q.push(R);
}return Q.join(f);
},setValue:function(V){qx.log.Logger.deprecatedMethodWarning(arguments.callee,D);
var Y=[V];

if(this.getSelectionMode()===u){Y=V.split(f);
}var X=[];
var W;

for(var i=0,l=Y.length;i<l;i++){W=this.findItem(Y[i]);

if(W){X.push(W);
}}this.setSelection(X);
},handleKeyPress:function(e){if(!this._onKeyPress(e)){this._getManager().handleKeyPress(e);
}},_applyOrientation:function(ba,bb){var bc=ba===j;
var bd=bc?new qx.ui.layout.HBox():new qx.ui.layout.VBox();
var content=this.__ee;
content.setLayout(bd);
content.setAllowGrowX(!bc);
content.setAllowGrowY(bc);
this._applySpacing(this.getSpacing());
},_applySpacing:function(J,K){this.__ee.getLayout().setSpacing(J);
},_onKeyPress:function(e){if(e.getKeyIdentifier()==n&&!e.isAltPressed()){var L=this.getSelection();

for(var i=0;i<L.length;i++){L[i].fireEvent(a);
}return true;
}return false;
},_onChangeSelection:function(){if(this.hasListener(m)){this.fireDataEvent(m,this.getValue());
}},_onKeyInput:function(e){if(!this.getEnableInlineFind()){return;
}var G=this.getSelectionMode();

if(!(G===s||G===b)){return;
}if(((new Date).valueOf()-this.__eg)>1000){this.__ef=g;
}this.__ef+=e.getChar();
var H=this.findItemByLabelFuzzy(this.__ef);
if(H){this.setSelection([H]);
}this.__eg=(new Date).valueOf();
},findItemByLabelFuzzy:function(S){S=S.toLowerCase();
var T=this.getChildren();
for(var i=0,l=T.length;i<l;i++){var U=T[i].getLabel();
if(U&&U.toLowerCase().indexOf(S)==0){return T[i];
}}return null;
},findItem:function(M){M=M.toLowerCase();
var N=this.getChildren();
var O;
for(var i=0,l=N.length;i<l;i++){O=N[i];

if((O.getLabel()!=null)&&(O.getLabel().toLowerCase()==M)){return O;
}}return null;
},addListener:function(be,bf,self,bg){if(be==m){qx.log.Logger.deprecatedEventWarning(arguments.callee,m,B);
}return arguments.callee.base.call(this,be,bf,self,bg);
}},destruct:function(){this._disposeObjects(r);
}});
})();
(function(){var o="__iK",n="Boolean",m="qx.ui.core.SingleSelectionManager",l="__iM",k="changeSelected",j="__iL",h="qx.event.type.Data";
qx.Class.define(m,{extend:qx.core.Object,construct:function(g){arguments.callee.base.call(this);
{};
this.__iK=g;
},events:{"changeSelected":h},properties:{allowEmptySelection:{check:n,init:true,apply:l}},members:{__iL:null,__iK:null,getSelected:function(){return this.__iL;
},setSelected:function(f){if(!this.__iO(f)){throw new Error("Could not select "+f+", because it is not a child element!");
}this.__iN(f);
},resetSelected:function(){this.__iN(null);
},isSelected:function(e){if(!this.__iO(e)){throw new Error("Could not check if "+e+" is selected,"+" because it is not a child element!");
}return this.__iL===e;
},isSelectionEmpty:function(){return this.__iL==null;
},getSelectables:function(){var a=this.__iK.getItems();
var b=[];

for(var i=0;i<a.length;i++){if(this.__iK.isItemSelectable(a[i])){b.push(a[i]);
}}return b;
},__iM:function(c,d){if(!c){this.__iN(this.__iL);
}},__iN:function(r){var u=this.__iL;
var t=r;

if(t!=null&&u===t){return;
}
if(!this.isAllowEmptySelection()&&t==null){var s=this.getSelectables()[0];

if(s){t=s;
}}this.__iL=t;
this.fireDataEvent(k,t,u);
},__iO:function(p){var q=this.__iK.getItems();

for(var i=0;i<q.length;i++){if(q[i]===p){return true;
}}return false;
}},destruct:function(){if(this.__iK.toHashCode){this._disposeObjects(o);
}else{this._disposeFields(o);
}this._disposeObjects(j);
}});
})();
(function(){var d="qx.ui.core.Spacer";
qx.Class.define(d,{extend:qx.ui.core.LayoutItem,construct:function(b,c){arguments.callee.base.call(this);
this.setWidth(b!=null?b:0);
this.setHeight(c!=null?c:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(a){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var b="qx.ui.form.IModel",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeModel":a},members:{setModel:function(c){},getModel:function(){},resetModel:function(){}}});
})();
(function(){var b="changeModel",a="qx.ui.form.MModelProperty";
qx.Mixin.define(a,{properties:{model:{nullable:true,event:b}}});
})();
(function(){var l="The value is deprecated. Please use model instead.",k="listitem",j="qx.ui.form.ListItem",i="qx.event.type.Event",h="changeValue",g="qx.event.type.Data";
qx.Class.define(j,{extend:qx.ui.basic.Atom,implement:[qx.ui.form.IModel],include:[qx.ui.form.MModelProperty],construct:function(d,e,f){arguments.callee.base.call(this,d,e);

if(f!=null){this.setValue(f);
}},events:{"action":i,"changeValue":g},properties:{appearance:{refine:true,init:k}},members:{getFormValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,l);
var c=this.getValue();

if(c==null){c=this.getLabel();
}return c;
},__eh:null,setValue:function(a){qx.log.Logger.deprecatedMethodWarning(arguments.callee,l);
var b=this.__eh;
this.__eh=a;
this.fireDataEvent(h,a,b);
},getValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,l);
return this.__eh;
},resetValue:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,l);
this.setValue(null);
}}});
})();


if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) qx.event.handler.Application.onScriptLoaded();

})();