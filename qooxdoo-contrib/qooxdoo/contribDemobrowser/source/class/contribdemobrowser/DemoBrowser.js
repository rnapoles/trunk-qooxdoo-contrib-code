/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * 
 */
qx.Class.define("contribdemobrowser.DemoBrowser",
{
  extend : demobrowser.DemoBrowser,

  construct : function()
  {
    this.base(arguments);
    
    this.__versionSelect.addListener("changeSelection", function(ev) {
      this._versionFilter = ev.getData()[0].getModel();
      this.filter(this._searchTextField.getValue() || "");
    }, this);
    
    this.__demoStack = this.__makeDemoStack();
    this._infosplit.add(this.__demoStack, 2);
  },
  
  members :
  {
    __versionSelect : null,
    __versionTags : null,
    __infoView : null,
    __readmeView : null,
    __demoStack : null,
    
    /**
     * Creates the application header.
     */
    _createHeader : function()
    {
      var layout = new qx.ui.layout.HBox();
      var header = new qx.ui.container.Composite(layout);
      header.setAppearance("app-header");
    
      var title = new qx.ui.basic.Label("Contrib Demo Browser");
    
      header.add(title);    
      return header;
    },
    
    
    __makeDemoStack : function()
    {
      var demoStack = new qx.ui.container.Stack();
      this.__infoView = new demobrowser.Manifest();
      this.__readmeView = new demobrowser.Readme();
      demoStack.add(this._demoView);
      demoStack.add(this.__infoView);
      demoStack.add(this.__readmeView);
      return demoStack;
    },
    
    _makeVersionSelect : function()
    {
      var versionComposite = new qx.ui.container.Composite();
      versionComposite.setLayout(new qx.ui.layout.HBox(3));
      this._leftComposite.add(versionComposite);
      var versionLabel = new qx.ui.basic.Label("Compatible with: ")
      versionLabel.setPadding(4, 5, 0, 2);
      versionComposite.add(versionLabel);

      this.__versionSelect = new qx.ui.form.SelectBox();
      versionComposite.add(this.__versionSelect,{flex: 1});

      var itemAll = new qx.ui.form.ListItem("Any qooxdoo version");
      itemAll.setModel(null);
      this.__versionSelect.add(itemAll);
    },
    
    
    /**
     * Add a library version's "qxVersion" tags to the list of version tags
     *
     * @param tagList {Array} A tree node's tags
     */
    _getVersionTags : function(tagList)
    {
      if (!this.__versionTags) {
        this.__versionTags = {};
      }
      for (var i=0,l=tagList.length; i<l; i++) {
        var tag = tagList[i];
        if (tag.indexOf("qxVersion") == 0) {
          if (!(tag in this.__versionTags)) {
            this.__versionTags[tag] = "";
          }
        }
      }
    },
    

    /**
     * Add an option for each version to the version select box
     */
    _getVersionItems : function()
    {
      var versions = [];
      for (var tag in this.__versionTags) {
        versions.push(tag.substr(tag.indexOf("_") + 1) );
      }
      versions.sort();
      versions.reverse();

      for (var i=0,l=versions.length; i<l; i++) {
        var li = new qx.ui.form.ListItem(versions[i]);
        li.setModel("qxVersion_" + versions[i]);
        this.__versionSelect.add(li);
      }
    },
    
    treeGetSelection : function(e)
    {
      var treeNode = this.tree.getSelection()[0];
      var modelNode = treeNode.getUserData("modelLink");
      this.tests.selected = this.tests.handler.getFullName(modelNode);
      if (modelNode) {
        if (modelNode.manifest) {
          this.__infoView.setManifestData(modelNode.manifest);
          this.__demoStack.setSelection([this.__infoView]);
        }
        else if (modelNode.readme) {
          this.__readmeView.setTitle(treeNode.getLabel());
          this.__readmeView.setReadmeData(modelNode.readme);
          this.__demoStack.setSelection([this.__readmeView]);
        }
        else {
          this.__demoStack.setSelection([this._demoView]);
        }
      }
      else {
        this.__demoStack.setSelection([this._demoView]);
      }
    },
    
    /**
     * event handler for the Run Test button - performs the tests
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    runSample : function(e)
    {
      this.__demoStack.setSelection([this._demoView]);
      
      this._runbutton.setVisibility("excluded");
      this._stopbutton.setVisibility("visible");

      if (this.tests.selected.indexOf(".html") > 0) {
        var file = this.tests.selected.replace(".", "/");
        // contribDemobrowser has an additional hierarchy level
        file = file.replace(".", "/");
        this.setCurrentSample(file);
      } else {
        this.playNext();
      }
    },
    
    /**
     * Loads the sample preceding the currently selected one
     * 
     * @param {Event} e
     */
    playPrev : function(e)
    {
      var currSamp = this.tree.getSelection()[0];  // widget

      if (!currSamp) {
        return;
      }

      var otherSamp = null;
      var sample = currSamp;
      while (sample) {
        var prev = this.tree.getPreviousNodeOf(sample);
        if (prev instanceof qx.ui.tree.TreeFile) {
          otherSamp = prev;
          break;
        } else {
          sample = prev;
        }
      }

      if (otherSamp) {
        this.tree.setSelection([otherSamp]);
        this.runSample();
      } else {
        // Remove stop button, display run button
        this._stopbutton.setVisibility("excluded");
        this._runbutton.setVisibility("visible");
      }
    },
    
    /**
     * Loads the sample following the currently selected one
     * 
     * @param {Event} e
     */
    playNext : function(e)
    {
      var currSamp = this.tree.getSelection()[0];  // widget

      if (!currSamp) {
        return;
      }

      var otherSamp = null;
      var sample = currSamp;
      while (sample) {
        var next = this.tree.getNextNodeOf(sample);
        if (next instanceof qx.ui.tree.TreeFile) {
          otherSamp = next;
          break;
        } else {
          sample = next;
        }
      }

      if (otherSamp) {
        this.tree.setSelection([otherSamp]);
        this.runSample();
      } else {
        // Remove stop button, display run button
        this._stopbutton.setVisibility("excluded");
        this._runbutton.setVisibility("visible");
      }
    }
  },
  
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeObjects("__demoStack", "__infoView", "__readmeView", 
      "__versionTags", "__versionSelect");
  }
});
