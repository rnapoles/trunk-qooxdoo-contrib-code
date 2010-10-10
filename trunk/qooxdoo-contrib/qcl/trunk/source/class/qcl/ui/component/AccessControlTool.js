/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2010 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/*------------------------------------------------------------------------------
 #asset(qcl/icon/button-plus.png)
 #asset(qcl/icon/button-minus.png)
 #asset(qcl/icon/button-edit.png)
 #asset(qcl/icon/button-reload.png)
 #asset(qx/icon/${qx.icontheme}/22/actions/go-next.png)
 #asset(qx/icon/${qx.icontheme}/22/actions/application-exit.png)
 #asset(qx/icon/${qx.icontheme}/22/actions/view-refresh.png)
 #asset(qx/icon/${qx.icontheme}/16/apps/preferences-users.png)
 #asset(qx/icon/${qx.icontheme}/16/apps/internet-feed-reader.png)
 #asset(qx/icon/${qx.icontheme}/16/actions/address-book-new.png)
 #asset(qx/icon/${qx.icontheme}/16/apps/preferences-security.png)
 #asset(qx/icon/${qx.icontheme}/16/apps/internet-transfer.png) 
 #asset(qx/icon/${qx.icontheme}/16/apps/utilities-network-manager.png)
 ------------------------------------------------------------------------------*/
 
qx.Class.define("qcl.ui.component.AccessControlTool", 
{
	extend : qx.ui.window.Window,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor.
   * @param {} sandbox
   */
	construct : function() 
  {
		this.base(arguments);
		this.__build();
	},
  
  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */  
  properties :
  {
    /**
     * Whether to show the load and export buttons
     */
    showSaveLoadButtons :
    {
      check : "Boolean",
      init  : false,
      event : "changeShowSaveLoadButtons"
    },
    
    /**
     * Whether the ACL data is editable
     * @type 
     */
    editable :
    {
      check : "Boolean",
      init  : false,
      event : "changeEditable"
    },

    
    /**
     * The type of the elements in the left list 
     * @type 
     */
    leftElementType :
    {
      check : "String",
      nullable : true,
      event : "changeLeftElementType"
    },    
    
    /**
     * The (named) id of the selected element in the left list
     * @type 
     */
    leftElementId :
    {
      check : "String",
      nullable : true,
      event : "changeLeftElementId"
    },
    
    /**
     * The type of the element selected in the tree
     * @type 
     */
    treeElementType :
    {
      check : "String",
      nullable : true,
      event : "changeTreeElementType"
    },

    /**
     * The id of the element selected in the tree
     * @type 
     */
    treeElementId :
    {
      check : "String",
      nullable : true,
      event : "changeTreeElementId"
    }, 
    
    /**
     * The action that can be performed on the element selected in the tree
     * @type 
     */
    treeElementAction :
    {
      check : "String",
      nullable : true,
      event : "changeTreeElementAction"
    },     
    
    /**
     * The type of the elements in the right list 
     * @type 
     */
    rightElementType :
    {
      check : "String",
      nullable : true,
      event : "changeRightElementType"
    },    
    
    /**
     * The ids of the elements currently selected in the right list
     * @type 
     */
    rightElementIds :
    {
      check : "Array",
      nullable : true,
      event : "changeRightElementIds"
    }
  }, 
  
 /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  
  events :
  {
    

  },    
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */  

	members :  
  {
    __sandbox : null,
    
		__build : function() 
    {

      /*
       * initialize window
       */
			this.setCaption(this.tr('Access control tool'));
      this.setLayout( new qx.ui.layout.VBox() );
			this.setWidth(800);
			this.addListener("appear", this.center, this);

      /*
       * toolbar
       */
      var qxToolBar1 = new qx.ui.toolbar.ToolBar();
			this.add(qxToolBar1);

      /*
       * button to reload from file
       */
			var qxToolBarButton1 = new qx.ui.toolbar.Button(
        this.tr('Reload from file'),
			 "icon/22/actions/view-refresh.png"
      );
			qxToolBar1.add(qxToolBarButton1);
      this.bind( "showSaveLoadButtons", qxToolBarButton1, "visibility", {
        converter : function(v){ v ? "visible" : "excluded" }
      });
			qxToolBarButton1.addListener("execute", this.reloadFromFile, this);
      
      /*
       * button to export to file
       */
      var qxToolBarButton2 = new qx.ui.toolbar.Button(
        this.tr('Export to file'),
			  "icon/22/actions/go-next.png"
       );
			qxToolBar1.add(qxToolBarButton2);
      this.bind( "showSaveLoadButtons", qxToolBarButton2, "visibility", {
        converter : function(v){ v ? "visible" : "excluded" }
      });      
      qxToolBarButton2.addListener("execute", this.exportToFile, this);      

      /*
       * exit button 
       */
			qxToolBar1.addSpacer();
			var qxToolBarButton3 = new qx.ui.toolbar.Button(
        this.tr('Exit'),
				"icon/22/actions/application-exit.png"
      );
			qxToolBar1.add(qxToolBarButton3);
			qxToolBarButton3.addListener("execute", this.close, this);

      /*
       * groupbox, looks nicer
       */
			var qxGroupBox1 = new qx.ui.groupbox.GroupBox(null, null);
			this.add(qxGroupBox1, {flex : 1});
			qxGroupBox1.setLayout(new qx.ui.layout.VBox());
      
      /*
       * left column
       */
			var qxComposite1 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
			qxComposite1.setAllowStretchY(true);
			qxGroupBox1.add(qxComposite1, {flex : 1 });
			var qxComposite2 = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
			qxComposite1.add(qxComposite2, { flex : 1 });

      /*
       * select box
       */
			var leftSelectBox = new qx.ui.form.SelectBox();
			this.leftSelectBox = leftSelectBox;
			qxComposite2.add(leftSelectBox);

			var selectBoxController = new qx.data.controller.List(null, leftSelectBox, "label");
			selectBoxController.setIconPath("icon");
      
      // bind selection to the left element type
			leftSelectBox.bind("selection",this,"leftElementType",{
        converter : function(selection){ return selection.length ? selection[0].getModel().getValue() : null; }
      });     
      
      // populate select box
      this.loadElementTypeModel( selectBoxController );

      /*
       * left list
       */
			var leftList =  new qx.ui.list.List().set({
        selectionMode : "single",
        labelPath: "label",
        iconPath: "icon"  //,
//        iconOptions: {converter : function(data) {
//          return "icon/" + data + "/places/folder.png";
//        }}
      });
      qxComposite2.add(leftList, { flex : 1 });
      
      // load left list when element type changes
      this.addListener("changeLeftElementType",function(e){
        if (e.getData())
        {
          this.loadElements( leftList, e.getData() );
        }
        else
        {
          leftList.resetModel();
        }
      },this);
      
      // remove selection on model change
      leftList.addListener("changeModel",function(){
        leftList.getSelection().removeAll();
      },this);
      
      // set element id when selection changes
      leftList.getSelection().addListener("change", function(){ 
        this.setLeftElementId( leftList.getSelection().length ? leftList.getSelection().getItem(0).getValue() : null );
      },this);
      
      /*
       * buttons
       */
			var qxComposite3 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
			qxComposite2.add(qxComposite3);
      this.bind( "editable", qxComposite3, "enabled" );
			
      // add
      var qxButton1 = new qx.ui.form.Button(null, "qcl/icon/button-plus.png");
			qxButton1.setEnabled(false);
			qxComposite3.add(qxButton1);
			leftSelectBox.bind("selection", qxButton1, "enabled", {
				converter : function(s) { return s.length > 0 }
			});
			qxButton1.addListener("execute", function(){
        this.addElement(leftList, this.getLeftElementType() );
      }, this);

      // remove
      var qxButton2 = new qx.ui.form.Button(null,"qcl/icon/button-minus.png");
			qxButton2.setEnabled(false);
			qxComposite3.add(qxButton2);
			this.bind("leftElementId", qxButton2, "enabled", {
				converter : function(v) { return v !== null }
			});
			qxButton2.addListener("execute", function(){
        this.removeElement(leftList, this.getLeftElementType() )
      }, this);

      // edit
			var qxButton3 = new qx.ui.form.Button(null, "qcl/icon/button-edit.png" );
			qxButton3.setEnabled(false);
			qxComposite3.add(qxButton3);
      this.bind("leftElementId", qxButton3, "enabled", {
        converter : function(v) { return v !== null }
      });
			qxButton3.addListener("execute", function(){
        this.editElement(leftList, this.getLeftElementType() );
      }, this);

      // reload
			var qxButton4 = new qx.ui.form.Button(null, "qcl/icon/button-reload.png" );
			qxComposite3.add(qxButton4);
			qxButton4.addListener("execute", function(){
        this.loadElements( leftList, this.getLeftElementType() );
      }, this );
      this.bind("leftElementType",qxButton4,"enabled",{
        converter: function(v){ return v !== null }
      });
      // FIXME use sandbox
      qx.event.message.Bus.subscribe("qcl.access.AccessControlTool.reloadType",function(e){
        if( e.getData() == this.getLeftElementType() )
        {
          this.loadElements( leftList, this.getLeftElementType() );
        }
      },this);

      /*
       * center column
       */
			var qxComposite4 = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({
        minWidth : 200
      });
			qxComposite1.add(qxComposite4, { flex : 2 });
      
      // label
			var centerLabel = new qx.ui.basic.Label();
			centerLabel.setMaxWidth(250);
			centerLabel.setHeight(20);
			qxComposite4.add(centerLabel);

      // bind selection label 
			leftList.getSelection().addListener("change", function(){
				centerLabel.setValue( 
          leftList.getSelection().length ? 
            leftList.getSelection().getItem(0).getLabel() : 
            this.tr('Edited element') 
        );
			},this);

      // tree
			var elementTree = new qx.ui.tree.Tree();
			qxComposite4.add(elementTree, { flex : 1 });
			var treeController = new qx.data.controller.Tree(null, elementTree, "children", "label");
			treeController.setIconPath("icon");
			treeController.setDelegate({
				configureItem : function(item) {
					item.setOpen(true);
				}
			});
      
      // load when left element id changes
			this.addListener("changeLeftElementId", function(e){
        if ( e.getData() != null )
        {
          this.loadTree( treeController );
        }
      },this);
      
      // bind right list to selection
      elementTree.addListener("changeSelection",function(e){
        var selection = e.getData();
        if ( selection.length )
        {
          this.setTreeElementType( selection[0].getModel().getType() );
          this.setTreeElementId( selection[0].getModel().getValue() || null );
          this.setTreeElementAction( selection[0].getModel().getAction() || null )
        }
      },this );
      
      // remove selection on model change
//      treeController.addListener("changeModel",function(){
//        treeController.resetSelection();
//      },this);

      /*
       * center buttons
       */
      var qxComposite5 = new qx.ui.container.Composite( new qx.ui.layout.HBox(10) );
			qxComposite4.add(qxComposite5);
      this.bind("editable", qxComposite5, "enabled");
      
      // link
			var qxButton5 = new qx.ui.form.Button(this.tr('Link'));
			qxButton5.setEnabled(false);
			qxComposite5.add(qxButton5);
			qxButton5.addListener("execute", function(){
        this.linkElements( treeController );
      }, this);
      var _this = this;
      this.bind("treeElementAction", qxButton5, "enabled", { 
        converter : function( v ){ 
          return ( v == "link" 
                  && qx.lang.Type.isArray( _this.getRightElementIds() ) 
                  && _this.getRightElementIds().length > 0 ) 
         }
      });
      this.bind("rightElementIds", qxButton5, "enabled", { 
        converter : function( v ){ 
          return ( qx.lang.Type.isArray(v) 
                    && v.length > 0 
                    && _this.getTreeElementAction() == "link" )
         }
      });     

      // Unlink
			var qxButton6 = new qx.ui.form.Button(this.tr('Unlink'), null, null);
			qxButton6.setEnabled(false);
			qxComposite5.add(qxButton6);
			qxButton6.addListener("execute", function(){
        this.unlinkElements( treeController );
      }, this);
      this.bind("treeElementAction", qxButton6, "enabled", { 
        converter : function( v ){ return v == "unlink" }
      });

			/*
       * right column
       */
			var qxComposite6 = new qx.ui.container.Composite( new qx.ui.layout.VBox(10) );
			qxComposite1.add(qxComposite6, { flex : 1 });

      var rightLabel = new qx.ui.basic.Label(this.tr('Linkable items'));
			rightLabel.setRich(true);
			rightLabel.setHeight(20);
			qxComposite6.add(rightLabel);

      /*
       * right list
       */
			var rightList = new qx.ui.list.List().set({
        scrollbarX: "on",
        selectionMode : "multi",
        labelPath: "label",
        iconPath: "icon"  //,
//        iconOptions: {converter : function(data) {
//          return "icon/" + data + "/places/folder.png";
//        }}
      });

      /*
       * load list list when tree selection type changes, but only if
       * no linked element has been selected 
       */
      elementTree.addListener("changeSelection",function(){
        if ( this.getTreeElementType() == this.getRightElementType() ){
          return;
        }
        this.setRightElementType( this.getTreeElementType() || null );
        this.loadLinkableElements( rightList );
      },this);
      
      // bind ids to selection
      rightList.getSelection().addListener("change", function(){ 
        var ids = [];
        rightList.getSelection().forEach( function(item){
          ids.push( item.getValue() );
        }, this );
        this.setRightElementIds(ids);
      },this);
      
      // remove selection on model change
      rightList.addListener("changeModel",function(){
        rightList.getSelection().removeAll();
      },this);      
      
      qxComposite6.add(rightList,{flex:1});

			/*
       * buttons
       */
      var qxComposite3 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      qxComposite6.add(qxComposite3);
      this.bind( "editable", qxComposite3, "enabled" );
      
      // add
      var qxButton1 = new qx.ui.form.Button(null, "qcl/icon/button-plus.png");
      qxComposite3.add(qxButton1);
      qxButton1.addListener("execute", function(){
        this.addElement( rightList, this.getRightElementType() );
      }, this);
      this.bind("rightElementType",qxButton1,"enabled",{
        converter: function(v){ return v !== null }
      });

      // remove
      var qxButton2 = new qx.ui.form.Button(null,"qcl/icon/button-minus.png");
      qxButton2.setEnabled(false);
      qxComposite3.add(qxButton2);
      this.bind("rightElementIds", qxButton2, "enabled", {
        converter : function( ids ) { return ids !== null && ids.length > 0 }
      });
      qxButton2.addListener("execute", function(){
        this.removeElement( rightList, this.getRightElementType() );
      }, this);

      // edit
      var qxButton3 = new qx.ui.form.Button(null, "qcl/icon/button-edit.png" );
      qxButton3.setEnabled(false);
      qxComposite3.add(qxButton3);
      this.bind("rightElementIds", qxButton3, "enabled", {
        converter : function( ids ) { return ids !== null && ids.length > 0 }
      });
      qxButton3.addListener("execute", function(){
        this.editElement(rightList, this.getRightElementType() );
      }, this);

      // reload
      var qxButton4 = new qx.ui.form.Button(null, "qcl/icon/button-reload.png" );
      qxComposite3.add(qxButton4);
      qxButton4.addListener("execute", function(){
        this.loadElements( rightList, this.getRightElementType() );
      }, this );
      this.bind("rightElementType",qxButton4,"enabled",{
        converter: function(v){ return v !== null }
      });
      // FIXME use sandbox
      qx.event.message.Bus.subscribe("qcl.access.AccessControlTool.reloadType",function(e){
        if( e.getData() == this.getRightElementType() )
        {
          this.loadElements( rightList, this.getRightElementType() );
        }
      },this);      
		},
    
    _handleUnimplemented : function( name ) 
    {
      dialog.Dialog.alert( "method " + name + " not implemented");
    },
    
    /**
     * Loads the model for the select box displaying the element types.
     * Each item of the model has the structure 
     * { label : "String", value : "String", icon : "String" }.
     * When the data is available, it must be saved in the "model" property of 
     * the passed controller.
     * @param controller {qx.data.controller.List}
     */
    loadElementTypeModel : function( controller )
    {
      this._handleUnimplemented( arguments.callee.name );
    },
    
    /**
     * Loads the model of the given qx.ui.list.List. When available, 
     * saves the data into the "model" property of the list. 
     * The the structure of the qx.data.Array items is 
     * { label : "String", id : "String", icon : "String" }
     * @param list {qx.ui.list.List} The list to populate
     * @param filter {String|undefined} An optional filter string
     */
    loadElements : function( list, filter )
    {
      this._handleUnimplemented( arguments.callee.name );
    },
    
    /**
     * Loads the model of a qx.ui.tree.Tree and populates it by using the 
     * given qx.data.controller.Tree. When available, saves the data into 
     * the "model" property of the controller. The nodes of the tree must have the 
     * structure { label : "String", type : "String", id : "String", icon : "String" }
     * @param  controller {qx.data.controller.Tree}
     */
    loadTree : function( controller )
    {
      this._handleUnimplemented( arguments.callee.name );
    },  
    
    /**
     * Loads the model of the the given qx.ui.list.List. When available, 
     * saves the data into the "model" property of the list. The difference
     * to {@link #loadLinkableElements} is that the list should only contain
     * the elements that can be linked to the currently selected item. 
     * The the structure of the qx.data.Array items is 
     * { label : "String", value : "String", icon : "String" }
     * @param list {qx.ui.list.List} The list to populate
     */
    loadLinkableElements : function( list )
    {
      this._handleUnimplemented( arguments.callee.name );
    },      
    
    /**
     * Adds an element to the given qx.ui.list.List. 
     * @param list {qx.ui.list.List}
     */
    addElement : function( list )
    {
      this._handleUnimplemented( arguments.callee.name );
    },

    /**
     * Removes an element from the given qx.ui.list.List.  
     * @param list {qx.ui.list.List}
     */    
    removeElement : function( list )
    {
      this._handleUnimplemented( arguments.callee.name );
    },
    
    /**
     * Edits an element in the given qx.ui.list.List. 
     * @param list {qx.ui.list.List}
     */    
    editElement : function( list )
    {
      this._handleUnimplemented( arguments.callee.name );
    },
    

    /**
     * Links the element from the left list with the element from the 
     * right list. 
     */
    linkElements : function()
    {
      this._handleUnimplemented( arguments.callee.name );
    },    
    
    /**
     * Unlinks the element selected in the tree from the element selected
     * in the left list. 
     */
    unlinkElements : function()
    {
      this._handleUnimplemented( arguments.callee.name );
    },    
    
    /**
     * Resets the ACL data by reloading it from a file on the server.
     */
    reloadFromFile : function()
    {
      this._handleUnimplemented( arguments.callee.name );
    },
    
    /**
     * Exports the current ACL data to a file on the server
     */
    exportToFile : function()
    {
      this._handleUnimplemented( arguments.callee.name );
    }
	}
});
