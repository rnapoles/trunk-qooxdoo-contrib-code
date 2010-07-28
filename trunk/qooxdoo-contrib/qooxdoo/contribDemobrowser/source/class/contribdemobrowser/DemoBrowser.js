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

      /*
      var itemAll = new qx.ui.form.ListItem("Any qooxdoo version");
      itemAll.setModel(null);
      this.__versionSelect.add(itemAll);
      */
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
          // Demo node
          if (modelNode.children.length == 0) {
            // Instruct Manifest to display "run" button(s)
            modelNode.manifest.isPlayable = true;
            // Don't display redundant "homepage" manifest entry
            if (modelNode.manifest.info.homepage) {
              delete modelNode.manifest.info.homepage; 
            }
          }
          // Library version node
          this.__infoView.setManifestData(modelNode.manifest);
          this.setActiveView("manifest");
        }
        // Library node
        else if (modelNode.readme) {
          this.__readmeView.setTitle(treeNode.getLabel());
          this.__readmeView.setReadmeData(modelNode.readme);
          this.setActiveView("readme");
        }
        // Node without a readme or manifest, this shouldn't happen
        else {
          this.setActiveView("demo");
        }
      }
      // Root node ("Demos")
      else {
        this.setCurrentSample("default");
        this.setActiveView("demo");
      }
    },
    
    setActiveView : function(view)
    {
      switch (view) {
        case "manifest":
          this.__demoStack.setSelection([this.__infoView]);
          break;
        case "readme":
          this.__demoStack.setSelection([this.__readmeView]);
          break;
        default:
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
      this.setActiveView("demo");
      
      this._runbutton.setVisibility("excluded");
      this._stopbutton.setVisibility("visible");
      
      if (this.tests.selected &&
          this.tests.selected.indexOf(".html") > 0) {
        var file = this.tests.selected.replace(/\|/g, "/");
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
        if (prev instanceof qx.ui.tree.TreeFile  && prev.isVisible()) {
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
        if (next instanceof qx.ui.tree.TreeFile && next.isVisible()) {
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
    },
  
    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @return {void}
     */
    setCurrentSample : function(value, setFilter)
    {
      if (!value) {
        return;
      }

      if (!this._sampleToTreeNodeMap) {
        return;
      }

      var url;
      var treeNode = this._sampleToTreeNodeMap[value];
      if (treeNode)
      {
        if (setFilter) {
          var qxVersion = /\/.*?\/.*?\/(.*?)\/index.html$/.exec(value);
          if (qxVersion) {
            this._setVersionFilter(qxVersion[1]);
          }
        }
        url = 'demo/' + value;
        treeNode.getTree().setSelection([treeNode]);
        if (setFilter) {
          this.setActiveView("demo");
        }
      }
      else
      {
        url = this.defaultUrl;
      }

      if (this._iframe.getSource() == url)
      {
        this._iframe.reload();
      }
      else
      {
        this.__logDone = false;
        this._iframe.setSource(url);
      }

      // Toggle menu buttons
      if (url == this.defaultUrl) {
        this.disableMenuButtons();
      } else {
        this.enableMenuButtons();
      }

      this._currentSample = value;
      this._currentSampleUrl = url;
    },
  
    
    _setVersionFilter : function(qxVersion)
    {
      var items = this.__versionSelect.getSelectables(true);
      for (var i=0,l=items.length; i<l; i++) {
        if (items[i].getModel() == "qxVersion_" + qxVersion) {
          this.__versionSelect.setSelection([items[i]]);
        }
      }
    
    },
    
    
    /**
     * This method filters the folders in the tree.
     * @param term {String} The search term.
     */
    filter : function(term)
    {
      var searchRegExp = new RegExp("^.*" + term + ".*", "ig");
      var items = this._tree.getRoot().getItems(true, true);
      
      var showing = 0;
      var count = 0;
      for (var i = 0; i < items.length; i++) {
        items[i].setOpen(false);
        items[i].exclude();
        if (items[i].getChildren().length > 0 && items[i].getChildren()[0].getChildren().length == 0) {
          count++;        
        }
      }
            
      for (var i = 0; i < items.length; i++) {
        var file = items[i];
        var tags = file.getUserData("tags");
        if (!tags) {
          continue;
        }
        
        var inTags = false;
        var selectedVersion = false;
        for (var j = 0; j < tags.length; j++) {
          
          if (!!tags[j].match(searchRegExp)) {
            inTags = true;
          }
          
          if (!this._versionFilter || tags[j] == this._versionFilter) {
            selectedVersion = true;
          }
        }
        
        if (inTags && selectedVersion) {
          file.show();
          showing++;
          var parent = file.getParent();
          while (parent) {
            parent.show();
            parent = parent.getParent();
          }
        }
        else {
          file.exclude();
        }
      }
      
      this._status.setValue(showing + "/" + count);
    },
    
    
    /**
     * TODOC
     *
     * @param url {var} TODOC
     * @return {void}
     */
    dataLoader : function(url)
    {
      var req = new qx.io.remote.Request(url);

      req.setTimeout(180000);
      req.setProhibitCaching(false);

      /**
       * TODOC
       *
       * @param evt {var} TODOC
       * @lint ignoreDeprecated(eval)
       */
      req.addListener("completed", function(evt)
      {
        var content = evt.getContent();

        var treeData = eval(content);

        // give the browser a chance to update its UI before doing more
        qx.event.Timer.once(function()
        {
          this.tests.handler = new contribdemobrowser.TreeDataHandler(treeData);
          this.leftReloadTree();

          // read initial state
          var state = this._history.getState();

          if (state) {
            this.setCurrentSample(state.replace("~", "/"), true);
          } else {
            this.setCurrentSample(this.defaultUrl);
          }
        },
        this, 0);
      },
      this);

      req.addListener("failed", function(evt) {
        this.error("Couldn't load file: " + url);
      }, this);

      req.send();
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
