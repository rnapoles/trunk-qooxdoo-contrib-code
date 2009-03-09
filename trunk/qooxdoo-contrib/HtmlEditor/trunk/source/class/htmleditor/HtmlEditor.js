/* ***
 
#asset(htmleditor/icon/*)
 
*/

/**
 * Rich text editor widget that uses HtmlArea to implement an editor with toolbars, styles, etc.
 *
 * Toolbars are added above the HtmlArea instance to add standard editing facilities; there are
 * named toolbars which come preconfigured with sets of buttons, or toolbars can be created by
 * providing a custom set.
 *
 * EG:
 *	// Add styling toolbars
 *	htmlEditor.addToolbar("basic-styling");
 *
 *	// Custom toolbar, bold, italic, and underline buttons only
 *	htmlEditor.createToolbar(["bold", "italic", "underline"]);
 *
 * Note that this uses a custom version of HtmlArea, based on 04-pre at the end of Feb 2009; this
 * is because of problems with the 0.3-pre version (the Qooxdoo 0.8.x compatible version).  HtmlEditor
 * and its embedded HtmlArea are Qooxdoo 0.8.1 compatible.
 */
qx.Class.define("htmleditor.HtmlEditor", {
	extend : qx.ui.core.Widget,

	/**
	 * Constructor
	 *
	 * @param value {String} Initial content
	 * @param styleInformation {String | Map | null} Optional style information for the editor's document
	 *                                               Can be a string or a map (example: { "p" : "padding:2px" }
	 * @param source {String} source of the iframe
	 */
	construct: function(value, styleInformation, source) {
		this.base(arguments);
    
		// set a layout
		this._setLayout(new qx.ui.layout.VBox());
		
		this.__htmlArea = new htmleditor.htmlarea.HtmlArea(value, styleInformation, source);
		this.__htmlArea.setBackgroundColor(this.__lastBackgroundColour);
		this.__htmlArea.setTextColor(this.__lastTextColour);
		this.__htmlArea.addListener("cursorContext", this.__onCursorContext, this);
		this._add(this.__htmlArea, {flex: 1});
	},
	
	properties: {
	
		/**
		 * The list of styles that are presented by the styles combobox
		 */
		styles: {
			init: [ 
				{ desc: "", tag: "" },
				{ desc: "Paragraph", tag: "p" },
				{ desc: "Heading 1", tag: "h1" },
				{ desc: "Heading 2", tag: "h2" },
				{ desc: "Heading 3", tag: "h3" },
				{ desc: "Heading 4", tag: "h4" }
			]
		},
		
		imagesFolder : {
			nullable: true,
			check:	"htmleditor.IFolder"
		}
	},
  
	members: {
		/** {htmlArea.HtmlArea} The HtmlArea */
		__htmlArea : undefined,
		
		/** {Object} The list of toolbars and buttons */
		__toolbars : undefined,
		
		/** {Object} The buttons, indexed by name */
		__toolbarButtons : undefined,
		
		/** {Boolean} If the toolbar button's state is being updated then this is set to true to stop it triggering updates to HtmlArea */
		__updatingToolbar : false,
		
		/** {Integer} When creating a toolbar, if the name is not specified one is generated using the (lastToolbarId+1) */
		__lastToolbarId : 0,
		
		/** {Object} Color popup, undefined until first use  */
		__colourPopup : undefined,
		
		/** {String} the last used text and background colours */
		__lastBackgroundColour : "#FFFFFF",
		__lastTextColour : "#000000",
		__changingBackground : false,
		
		/** {Object} Add/Edit Link dialog, undefined until first use */
		__dlgLink : undefined,
		__linkRange : undefined,
		
		/** {FilePicker} Insert Picture dialog, undefined until first use */
		__dlgImagePicker : undefined,
		
		/**
		 * Standard button types; each instance can be a object with properties (caption, icon, handler) or a
		 * function; if it's a function then it is called to create an instance of whatever appears on the
		 * toolbar (eg a style drop down)
		 */
		__buttons : {
			"bold": {
				"caption"	: "Bold",
				"toggle"    : true,
				"icon" 		: "htmleditor/icon/16/htmleditor/bold.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.setBold();
				}
			},
			"italic": {
				"caption"	: "Italic",
				"toggle"    : true,
				"icon" 		: "htmleditor/icon/16/htmleditor/italic.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.setItalic();
				}
			},
			"underline": {
				"caption"	: "Underline",
				"toggle"    : true,
				"icon" 		: "htmleditor/icon/16/htmleditor/underline.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.setUnderline();
				}
			},
			"strikethrough": {
				"caption"	: "Strikethrough",
				"toggle"    : true,
				"icon" 		: "htmleditor/icon/16/htmleditor/strikethrough.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.setStrikeThrough();
				}
			},
			
			"indent": {
				"caption"	: "Indent",
				"icon" 		: "htmleditor/icon/16/htmleditor/indent.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.insertIndent();
				}
			},
			"outdent": {
				"caption"	: "Outdent",
				"icon" 		: "htmleditor/icon/16/htmleditor/outdent.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.insertOutdent();
				}
			},
			"list-ordered": {
				"caption"	: "Ordered List",
				"toggle"    : true,
				"icon" 		: "htmleditor/icon/16/htmleditor/list-ordered.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.insertOrderedList();
				}
			},
			"list-unordered": {
				"caption"	: "Unordered List",
				"toggle"    : true,
				"icon" 		: "htmleditor/icon/16/htmleditor/list-unordered.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.insertUnorderedList();
				}
			},
			"horiz-ruler": {
				"caption"	: "Horizontal Ruler",
				"icon" 		: "htmleditor/icon/16/htmleditor/horiz-ruler.png",
				"handler" 	: function() {
					if (!this.__updatingToolbar)
						this.__htmlArea.insertHorizontalRuler();
				}
			},
			
			"insert-link": {
				"caption"	: "Insert Link",
				"icon" 		: "htmleditor/icon/16/htmleditor/insert-link.png",
				"handler" 	: function(event) {
					if (!this.__updatingToolbar)
						this.__handleInsertLink(event);
				}
			},
			"insert-picture": {
				"caption"	: "Insert Picture",
				"icon" 		: "htmleditor/icon/16/htmleditor/insert-picture.png",
				"handler" 	: function(event) {
					if (!this.__updatingToolbar)
						this.__handleInsertPicture(event);
				}
			},
			"paste-as-text": {
				"caption"	: "Paste Text",
				"icon" 		: "htmleditor/icon/16/htmleditor/paste-as-text.png",
				"handler" 	: function(event) {
					if (!this.__updatingToolbar)
						this.__handlePasteAsText(event);
				}
			},
			
			"font-size": function(part) {
				var combo = new qx.ui.form.ComboBox();
				combo.setWidth(40);
				for (var i = 1; i < 9; i++)
					combo.add(new qx.ui.form.ListItem("" + i));
				combo.addListener("changeValue", this.__onChangeFontSize, this);
				part.add(combo);
				return combo;
			},
			
			"para-styles": function(part) {
				var select = new qx.ui.form.SelectBox();
				var styles = this.getStyles();
				for (var i = 0; i < styles.length; i++) {
					var style = styles[i];
					var item = new qx.ui.form.ListItem(style.desc);
					item.setValue(style.tag);
					select.add(item);
				}
				select.setValue("");
				select.addListener("changeValue", this.__onChangeParaStyle, this);
				part.add(select);
				return select;
			},
			
			"color-text": {
				"caption"	: "Text color",
				"icon"		: "htmleditor/icon/16/htmleditor/color-text.png",
				"handler" 	: function(event) {
					this.__handleColour(event, false);
				}
			},
			"color-background": {
				"caption"	: "Background color",
				"icon"		: "htmleditor/icon/16/htmleditor/color-background.png",
				"handler" 	: function(event) {
					this.__handleColour(event, true);
				}
			},
			
			"justify": function(part) {
				var obj = new Object();
				obj.left = new qx.ui.toolbar.RadioButton("Left Justify", "htmleditor/icon/16/htmleditor/justify-left.png");
				obj.left.addListener("changeChecked", function(e) { if (e.getData()) this.__htmlArea.setJustifyLeft(); }, this);
				obj.center = new qx.ui.toolbar.RadioButton("Center Justify", "htmleditor/icon/16/htmleditor/justify-center.png");
				obj.center.addListener("changeChecked", function(e) { if (e.getData()) this.__htmlArea.setJustifyCenter(); }, this);
				obj.right = new qx.ui.toolbar.RadioButton("Right Justify", "htmleditor/icon/16/htmleditor/justify-right.png");
				obj.right.addListener("changeChecked", function(e) { if (e.getData()) this.__htmlArea.setJustifyRight(); }, this);
				obj.full = new qx.ui.toolbar.RadioButton("Full Justify", "htmleditor/icon/16/htmleditor/justify-full.png");
				obj.full.addListener("changeChecked", function(e) { if (e.getData()) this.__htmlArea.setJustifyFull(); }, this);
				part.add(obj.left);
				part.add(obj.right);
				part.add(obj.center);
				part.add(obj.full);
				obj.manager = new qx.ui.form.RadioGroup(obj.left, obj.center, obj.right, obj.full);
				return obj;
			},
			
			"undo": {
				"caption"	: "Undo",
				"icon" 		: "htmleditor/icon/16/htmleditor/undo.png",
				"handler" 	: function() {
					this.__htmlArea.undo();
				}
			},
			"redo": {
				"caption"	: "Redo",
				"icon" 		: "htmleditor/icon/16/htmleditor/redo.png",
				"handler" 	: function() {
					this.__htmlArea.redo();
				}
			},
			
			"remove-formatting": {
				"caption"	: "Remove Formatting",
				"icon" 		: "htmleditor/icon/16/htmleditor/remove-formatting.png",
				"handler" 	: function() {
					this.__htmlArea.removeFormat();
				}
			}
		},
		
		/**
		 * Predefined, frequently used button sets
		 */
		__buttonSets : {
			"basic-styling" :	[ "bold", "italic", "underline", "strikethrough" ],
			"formatting" :		[ "indent", "outdent", "list-ordered", "list-unordered", "justify" ],
			"color" :			[ "color-text", "color-background" ],
			"font" :			[ "font-size" ],
			"insert" :			[ "insert-link", "insert-picture", "paste-as-text", "horiz-ruler" ],
			"undo" :			[ "undo", "redo", "remove-formatting" ]
		},
		
		/**
		 * Adds a toolbar for a predefined button set
		 * @param names {String|Array of String} the name or names of the button sets or button to add; if more than
		 * 		one name is given only one new toolbar is added with each named set in it's own part
		 */
		addToolbar: function(names) {
			if (!names)
				return;
			var toolbarName = names;
			if (typeof names == 'string')
				names = [ names ];
			else
				toolbarName = undefined;
			if (!(typeof names.length == 'number'))
				return;
			var fullSet = [];
			for (var i = 0; i < names.length; i++) {
				var name = names[i];
				var buttonSet = this.__buttonSets[name];
				if (!buttonSet)
					buttonSet = [name];

				if (i > 0)
					fullSet[fullSet.length] = "|";
				fullSet = fullSet.concat(buttonSet);
			}
			this.createToolbar(fullSet, toolbarName);
		},
		
		/**
		 * Creates a new toolbar and adds it to the editor
		 *
		 * @param buttonSet {Array of String|String} Type of button(s) to add; an empty string
		 * 		adds a spacer, a vertical bar ("|") creates a separately draggable toolbar part
		 * @param name {String|null} The name to give the toolbar (optional)
		 * @return the name of the toolbar, generated if one was not given
		 */
		createToolbar: function(buttonSet, name) {
			if (!buttonSet)
				return;
			if (typeof buttonSet == 'string')
				buttonSet = [ buttonSet ];
			if (!(typeof buttonSet.length == 'number'))
				return;
			if (name && this.__toolbars && this.__toolbars[name]) {
				this.debug("Toolbar called " + name + " already in use");
				return;
			}
				
			var toolbar = new qx.ui.toolbar.ToolBar();
			toolbar.setShow("icon");
			toolbar.setSpacing(2);
			var part = new qx.ui.toolbar.Part();
			toolbar.add(part);
			
			for (var i = 0; i < buttonSet.length; i++) {
				var buttonType = buttonSet[i];
				
				// Spacer on the toolbar
				if (buttonType == '') {
					toolbar.addSpacer();
					continue;
				}
				
				// Separately draggable part
				if (buttonType == '|') {
					part = new qx.ui.toolbar.Part();
					toolbar.add(part);
					continue;
				}
				
				// Get the button definition and add it
				var buttonDef = this.__buttons[buttonType];
				if (buttonDef) {
					var widget;
					if (typeof buttonDef == 'function') {
						widget = buttonDef.call(this, part);
					} else {
						if (buttonDef.toggle) {
							widget = new qx.ui.toolbar.CheckBox(buttonDef.caption, buttonDef.icon);
							widget.addListener("changeChecked", buttonDef.handler, this);
						} else {
							widget = new qx.ui.toolbar.Button(buttonDef.caption, buttonDef.icon);
							widget.addListener("execute", buttonDef.handler, this);
						}
						part.add(widget);
					}
					if (widget) {
						if (!this.__toolbarButtons)
							this.__toolbarButtons = new Object();
						this.__toolbarButtons[buttonType] = widget;
					}
				}
			}
			this._addBefore(toolbar, this.__htmlArea, {flex: 0});
			if (!this.__toolbars)
				this.__toolbars = new Object();
			if (!name) {
				name = "toolbar_" + (++this.__lastToolbarId);
				this.debug("Allocated toolbar name " + name);
			}
			this.__toolbars[name] = toolbar;
		},
		
		/**
		 * Removes the named toolbar from the editor
		 *
		 * @param name {String} the name of the toolbar, as returned by previous call to addToolbar()
		 */
		removeToolbar: function(name) {
		},
		
		/**
		 * Returns the HtmlArea
		 * @return the underlying HtmlArea
		 */
		getHtmlArea: function() {
			return this.__htmlArea;
		},
		
		/**
		 * Returns the text value of the HtmlArea
		 * @return the value of the text, as xhtml
		 */
		getValue: function() {
			var computed = this.__htmlArea.getComputedValue();
			computed = computed.replace(/\$\$hash=\"([^\"]*)\"/gi, "");
			return computed;
		},
		
		/**
		 * Sets the text value of the HtmlArea
		 * @param value the value to set, as xhtml
		 */
		setValue: function(value) {
			this.__htmlArea.setValue(value);
		},
		
		/**
		 * @return {String} the stylesheet href
		 */
		getStyleSheetHref : function() {
			return this.__htmlArea.getStyleSheetHref();
		},
		
		/**
		 * Sets the stylesheet href
		 * @param uri {String} the href for the stylesheet
		 */
		setStyleSheetHref : function(uri) {
			this.__htmlArea.setStyleSheetHref(uri);
		},
		
		/**
		 * Called when the cursor context changes, and is used to set the toolbar buttons
		 * as down (eg when in bold text, the BOLD button should be depressed)
		 * @param event {Data}
		 */
		__onCursorContext: function(event) {
			this.__updatingToolbar = true;
			var map = event.getData();
			this.__setButtonState("bold", map.bold);
			this.__setButtonState("italic", map.italic);
			this.__setButtonState("underline", map.underline);
			this.__setButtonState("strikethrough", map.strikethrough);
			this.__setButtonState("list-unordered", map.unorderedList);
			this.__setButtonState("list-ordered", map.orderedList);
			
			var justify = this.__toolbarButtons["justify"];
			if (justify) {
				if (map.justifyRight)
					justify.right.setChecked(true);
				else if (map.justifyCenter)
					justify.center.setChecked(true);
				else if (map.justifyFull)
					justify.full.setChecked(true);
				else
					justify.left.setChecked(true);
			}
			this.__updatingToolbar = false;
		},
		
		/**
		 * Sets the button state, if a button with the given name can be found
		 * @param name {String} the name of the button
		 * @param state {Number} 0==unchecked, 1==checked
		 */
		__setButtonState: function(name, state) {
			if (state == undefined)
				state = false;
			else
				state = parseInt(state) != 0;
			var button = this.__toolbarButtons[name];
			if (button)
				button.setChecked(state);
		},
		
		/**
		 * Called to select a color
		 * @param event The toolbar event
		 * @param isBackground true if the background color is to be changed, false for text color
		 */
		__handleColour: function(event, isBackground) {
			if (!this.__colourPopup) {
				this.__colourPopup = new qx.ui.control.ColorPopup();
				this.__colourPopup.addListener("changeValue", this.__onSelectColour, this);
				this.__colourPopup.exclude();
			}
			this.__changingBackground = isBackground;
			if (isBackground)
				this.__colourPopup.setValue(this.__lastBackgroundColour);
			else
				this.__colourPopup.setValue(this.__lastTextColour);
			this.__colourPopup.placeToWidget(event.getCurrentTarget());
			this.__colourPopup.show();
		},
		
		/**
		 * Event handler for when the color picker popup has been used to select a color
		 */
		__onSelectColour: function(event) {
			if (this.__changingBackground) {
				this.__lastBackgroundColour = this.__colourPopup.getValue();
				this.__htmlArea.setTextBackgroundColor(this.__lastBackgroundColour);
			} else {
				this.__lastTextColour = this.__colourPopup.getValue();
				this.__htmlArea.setTextColor(this.__lastTextColour);
			}
		},
		
		/**
		 * Event handler for when the font size is changed
		 */
		__onChangeFontSize: function(event) {
			this.__htmlArea.setFontSize(event.getData());
		},
		
		/**
		 * Called to insert a link
		 */
		__handleInsertLink: function(event) {
			this.__linkRange = this.__htmlArea.getSelectedRange();
			var win = this.__dlgLink;
			if (!win) {
				win = new qx.ui.window.Window("Add/Edit Link", "htmleditor/icon/16/htmleditor/insert-link.png");
				this.__dlgLink = win;
				var layout = new qx.ui.layout.Grid(10, 20);
				layout.setColumnFlex(0, 0);
				layout.setColumnWidth(0, 70);
				layout.setColumnFlex(1, 1);
				win.setLayout(layout);
				win.set({width: 350, movable: true, allowMaximize: false, allowMinimize: false});
				
				win.add(new qx.ui.basic.Label("URL"), { row: 0, column: 0 });
				win.url = new qx.ui.form.TextField("");
				win.add(win.url, { row: 0, column: 1 });
				
				var buttons = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var ok = new qx.ui.form.Button("OK", "icon/16/actions/dialog-ok.png");
				ok.addListener("execute", function(e) { 
					win.close();
					this.__onInsertLink(win.url.getValue());
				}, this);
				buttons.add(ok);
				
				var cancel = new qx.ui.form.Button("Cancel", "icon/16/actions/dialog-cancel.png");
				cancel.addListener("execute", function(e) { win.close(); } );
				buttons.add(cancel);
				
				win.add(buttons, { row: 1, column: 0, rowSpan: 2 });
				layout.setRowHeight(1, 6);
			}
			var node = this.__htmlArea.getSelectedElement();
			if (node && node.nodeName == 'A') {
				var url = qx.bom.element.Attribute.get(node, "href");
				win.url.setValue(url);
			} else
				win.url.setValue("");
			win.show();
			win.center();
			win.url.focus();
		},
		
		/**
		 * Called when a user has entered a link into the dialog box
		 */
		__onInsertLink: function(url) {
			this.debug("given url " + url);
			if (!url || url.length < 1)
				return;
			if (url.substring(0, 5) != "http:")
				url = "http://" + url;
			
			var node = this.__htmlArea.getSelectedElement();
			if (node && node.nodeName == 'A') {
				this.debug("updating url " + url);
				node["href"] = url;
			} else {
				this.debug("adding url " + url);
				this.__htmlArea.insertHyperLink(url, this.__linkRange);
			}
		},
		
		/**
		 * Called to paste text
		 */
		__handlePasteAsText: function(event) {
			var win = this.__dlgPaste;
			if (!win) {
				win = new qx.ui.window.Window("Paste Text", "htmleditor/icon/16/htmleditor/paste-plain-text.png");
				this.__dlgPaste = win;
				var layout = new qx.ui.layout.VBox();
				win.setLayout(layout);
				win.set({width: 550, height: 400, movable: true, allowMaximize: false, allowMinimize: false});
				
				win.add(new qx.ui.basic.Label("Paste text below"));
				win.text = new qx.ui.form.TextArea("");
				win.add(win.text);
				
				var buttons = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var ok = new qx.ui.form.Button("OK", "icon/16/actions/dialog-ok.png");
				ok.addListener("execute", function(e) { 
					win.close();
					this.__onPasteAsText(win.text.getValue());
				}, this);
				buttons.add(ok);
				
				var cancel = new qx.ui.form.Button("Cancel", "icon/16/actions/dialog-cancel.png");
				cancel.addListener("execute", function(e) { win.close(); } );
				buttons.add(cancel);
				
				win.add(buttons);
			}
			win.text.value = "";
			win.show();
			win.center();
			win.text.focus();
		},
		
		/**
		 * Called to paste text
		 */
		__onPasteAsText : function(text) {
			text = text.replace(/\&/g, '&amp;');
			text = text.replace(/\>/g, '&gt;');
			text = text.replace(/\</g, '&lt;');
			this.__htmlArea.insertHtml(text);
		},
		
		/**
		 * Called when the paragraph style has been selected from the drop down
		 */
		__onChangeParaStyle: function(event) {
			var tag = event.getCurrentTarget().getSelected().getValue().toUpperCase();
			this.debug("setting paragraph style to " + tag);
			this.__htmlArea.setParagraphStyle(tag);
		},
		
		/**
		 * Called to insert an image
		 */
		__handleInsertPicture: function(event) {
			if (!this.getImagesFolder()) {
				this.debug("No images folder defined");
				return;
			}
			var picker = this.__dlgImagePicker;
			if (!picker) {
				this.__dlgImagePicker = picker = new htmleditor.FilePicker(this.getImagesFolder());
				picker.set({width: 400, height:300});
				picker.setShowFullSizeImages(false);
				picker.addListener("openFile", function(e) {
					var file = e.getData();
					picker.close();
					this.__htmlArea.insertImage({ src: file.getUrl(), border: "0" });
				}, this);
			}
			picker.show();
			picker.center();
		}
	},
	
	destruct: function() {
		this._disposeFields("__htmlArea", "__colourPopup", "__toolbars");
	}
});
