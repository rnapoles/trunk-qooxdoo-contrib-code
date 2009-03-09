/* ***
 
#asset(htmleditor/icon/*)
 
*/

/**
 * Visual representation of a file
 */
qx.Class.define("htmleditor.FileItem", {
	extend : qx.ui.container.Composite,
	
	construct: function(file, fullSize) {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.VBox());
		
		this.__file = file;
		
		if (fullSize && !qx.Class.implementsInterface(file.constructor, htmleditor.IFolder))
			this.__image = this.__addElement(new qx.ui.basic.Image(file.getUrl()));
		else
			this.__image = this.__addElement(new qx.ui.basic.Image(file.getThumbnailUrl()));
		this.__label = this.__addElement(new qx.ui.basic.Label(file.getName()));
	},
	
	properties: {
		active: {
			init: false,
			check: "Boolean",
			apply: "_applyActive"
		}
	},
	
	events: {
		"select": 	"qx.event.type.Data",
		"open": 	"qx.event.type.Data"
	},
	
	members: {
		/** {IFile} The file to display */
		__file : undefined,
		
		/** {Image} the image */
		__image : undefined,
		
		/** {Label} the label */
		__label : undefined,
		
		/**
		 * Adds an element, initialising event listeners etc
		 * @param elem {Widget} the element to add
		 * @return {Widget} the element passed in as "elem"
		 */
		__addElement: function(elem) {
			elem.addListener("click", this.__onSingleClick, this);
			elem.addListener("dblclick", this.__onDoubleClick, this);
			elem.__outer = this;
			this.add(elem);
			return elem;
		},
		
		/**
		 * Called when a file is single-clicked
		 */
		__onSingleClick: function(event) {
			this.fireEvent("select");
		},
		
		/**
		 * Called when a file is double-clicked
		 */
		__onDoubleClick: function(event) {
			this.fireEvent("open");
		},
		
		/**
		 * Called to apply the "active" property
		 */
		_applyActive: function(value, oldValue) {
			// Turn it on
			if (value && !oldValue) {
				this.__label.setBackgroundColor("black");
				this.__label.setTextColor("white");
				this.set({ shadow: "shadow-window", decorator: "main" });
				
			// Turn it off
			} else if (!value && oldValue) {
				this.__label.setBackgroundColor("white");
				this.__label.setTextColor("black");
				this.set({ shadow: null, decorator: null });
			}
		},
		
		getFile: function() {
			return this.__file;
		}
	}
});
