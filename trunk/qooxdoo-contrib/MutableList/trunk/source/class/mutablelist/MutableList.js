/* ************************************************************************

   Copyright:
     2011 Gregory Hellings, http://greg.thehellings.com
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Gregory Hellings <greg.hellings@gmail.com>

************************************************************************ */

/* ************************************************************************

#asset(mutablelist/*)

************************************************************************ */

/**
 * This is the main class of contribution "MutableList"
 */
qx.Class.define("mutablelist.MutableList",
{
extend : qx.ui.container.Composite

/*
 *****************************************************************************
  CONSTRUCTOR
 *****************************************************************************
 */

/**
 * Create a new custom button
 * 
 * @param label {String} The label to associate with this list
 * @param list {qx.data.Array?} List of prepopulated entries
 */
,construct : function(label, title) {
	this.base(arguments);
	
	// Establish the basic layout of the widget
	var l = new qx.ui.layout.Grid();
	l.setRowFlex(2, 1);
	l.setColumnFlex(0, 1);
	l.setSpacing(3);
	this.setLayout(l);
	
	// Create the label
	this._add(new qx.ui.basic.Label(label), {row : 0, column : 0});
	
	// Create the entry box
	this.__addBox = new qx.ui.form.TextField();
	var add = new qx.ui.form.Button(null, "mutablelist/add.png");
	var del = new qx.ui.form.Button(null, "mutablelist/del.png");
	this._add(this.__addBox, {row : 1, column : 0});
	this._add(add, {row : 1, column : 1});
	this._add(del, {row : 1, column : 2});
	
	// Create the "list", using a table for editing's sake
	// Table model is needed first
	this.__model = new qx.ui.table.model.Simple();
	this.__model.setColumnEditable(0, true);
	this.__model.setData([[]]);
	this.__model.setColumns([title]);
	// Now the widget itself
	this.__list = new qx.ui.table.Table(this.__model);
	this.__list.set({
		height : 100,
		statusBarVisible : false
	});
	this.__list.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION_TOGGLE);
	this._add(this.__list, {row : 2, column : 0, colSpan : 3});
	
	// Behavioral listeners
	add.addListener('click', this.__add, this);
	del.addListener('click', this.__del, this);
}

,members : {
	__data : null
	,__model : null
	,__addBox : null
	,__add : null
	,__del : null
	,__list : null
	/* ****************************************************************
	 * PUBLICS
	 * ****************************************************************/
	
	/**
	 * Adds an item to the list
	 *
	 * @param t {String} An element to add to the list
	 */
	,addEntry : function(t) {
		var x = this.getData();
		x.push(t);
		this.setData(x);
	}
	
	/**
	 * Instead of a parameter, because they seem to be slightly broken
	 * in this instance.
	 * 
	 * @param t {Array} An array of String.
	 */
	,setData : function(t) {
		// First, convert the array of string into an array-of-array of
		// string
		var aos = new qx.data.Array(t);
		var aoas = [];
		aos.forEach(function(val) {
			aoas.push([val]);
		}, this);
		
		this.__model.setData(aoas);
		this.__data = t;
	}
	
	/**
	 * Instead of a paramter, because they seem slightly broken in this
	 * instance
	 * 
	 * @return {Array} An array of strings that the user has put into
	 * this widget.
	 */
	,getData : function() {
		var data = this.__model.getData();
		
		this.__data = new qx.type.Array();
		// Copy the elements out of the nested array-of-arrays
		data.forEach(function(string) {
			this.__data.push(string[0]);
		}, this);
		
		console.log(this.__data);
		return this.__data;
	}
	
	/* ****************************************************************
	 * PRIVATES
	 * ****************************************************************/
	/**
	 * Event callback when the 'add' button is clicked.
	 */
	,__add : function(e) {
		var t = this.__addBox.getValue().trim();
		if(t != '') {
			this.addEntry(t);
			this.__addBox.setValue('');
			this.__addBox.focus();
		}
	}
	
	/**
	 * Event callback when the 'delete' button is clicked.
	 */
	,__del : function(e) {
		var sel = this.__list.getSelectionModel();

		var idxs = new qx.type.Array();
		// Let us do it all at once
		sel.iterateSelection(function (idx) {
			idxs.push(idx);
		}, this);
		
		// This is dumb, but it appears to be a necessary workaround to
		// allow me to remove rows from the table on demand.
		var ct = 0;
		idxs.forEach(function(a) {
			console.log("Removing " + a);
			this.__model.removeRows(a-ct, 1);
			ct += 1;
		}, this);
	}
}
});
