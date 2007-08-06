/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/* ************************************************************************

#module(qxadmin)

************************************************************************ */

/**
 * The GUI definition of the qooxdoo unit test runner.
 */
qx.Class.define("qxadmin.AppFrame",
{
  extend : qx.ui.layout.VerticalBoxLayout,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this.set(
    {
      height : "100%",
      width  : "100%"
    });

    this.widgets = {};
    this.tests = {};
    this._useProfile = false;
    this.__states = {};
    this.__states.transientStack = [];
    this.__states.isLoading = false;
    this.__states.isFirstSample = false;
    this.__states.isLastSample  = false;

    this.__makeCommands();
    this.__makeRpcServer();

    // Header Pane
    this.header = this.__makeHeader();
    this.add(this.header);

    // Menu Bar
    this.add(this.__makeMenuBar());

    // Main Pane
    // split
    var mainsplit = new qx.ui.splitpane.HorizontalSplitPane(200, "1*");
    this.add(mainsplit);
    this.mainsplit = mainsplit;
    mainsplit.setLiveResize(true);
    mainsplit.set({ height : "1*" });

    // Left
    var left = this.__makeLeft();
    this.left = left.buttview;
    this.mainsplit.addLeft(left);

    // Right
    var right = new qx.ui.layout.VerticalBoxLayout();

    right.set(
    {
      height : "100%",
      width  : "100%",
      border : "line-left"
    });

    mainsplit.addRight(right);

    // Toolbar
    this.toolbar = this.__makeToolRun();
    this.toolbar.set(
    {
      show                  : "icon",
      verticalChildrenAlign : "middle"
    });
    right.add(this.toolbar);

    var tb = this.__makeToolEdit();
    right.add(tb);

    // Run Options
    this.widgets["runoptions"] = this.__makeOptionsPane();
    right.add(this.widgets["runoptions"]);
    this.widgets["runoptions"].setDisplay(false);

    // Output Views
    var buttview = this.__makeButtRun();
    right.add(buttview);


    buttview = this.__makeButtEdit();
    right.add(buttview);

    this.__setStateInitialized();

    // back button and bookmark support
    this._history = qx.client.History.getInstance();

    // listen for state changes
    this._history.addEventListener("request", function(e)
    {
      var newSample = e.getData().replace("~", "/");

      if (this._currentSample != newSample) {
        this.setCurrentSample(newSample);
      }
    },
    this);

    // Initial selections
    this.widgets["treeview.bsb1"].setChecked(true);

    //construct
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // ------------------------------------------------------------------------
    //   CONSTRUCTOR HELPERS
    // ------------------------------------------------------------------------
    __makeRpcServer : function()
    {
      var rpc = new qx.io.remote.Rpc();
      rpc.setTimeout(10000000000000);
      rpc.setUrl("http://127.0.0.1:8007");
      rpc.setServiceName("qooxdoo.admin");
      rpc.setCrossDomain(true);

      this.RpcServer = rpc;

      // get qooxdoo base dir (aka QOOXDOO_PATH)
      var that = this;
      this.RpcRunning = this.RpcServer.callAsync(
        function(result, ex, id)
        {
          that.RpcRunning = null;
          if (ex == null) {
              that.debug("Got QOOXDOO_PATH");
              that.qooxdoo_path = result;
          } else {
              alert("Async(" + id + ") exception: " + ex);
          }
        },
        "fss.getBaseDir");

    }, //makeRpcServer


    /**
     * Create the header widget
     *
     * @type member
     * @return {qx.ui.embed.HtmlEmbed} The header widget
     */
    __makeHeader : function()
    {
      var header = new qx.ui.embed.HtmlEmbed("<h1>" + "<span>" + "qooxdoo Web Admin" + "</span>" + "</h1>" + "<div class='version'>qooxdoo " + qx.core.Version.toString() + "</div>");
      header.setHtmlProperty("id", "header");
      header.setStyleProperty("background", "#134275 url(" + qx.io.Alias.getInstance().resolve("qxadmin/image/colorstrip.gif") + ") top left repeat-x");
      header.setHeight(70);
      return header;
    },


    __makeCommands : function()
    {
      this._cmdRunFile = new qx.client.Command("F5");
      this._cmdRunFile.addEventListener("execute", this.__ehRunFile, this);

      this._cmdViewFile = new qx.client.Command("Ctrl-Left");
      this._cmdViewFile.addEventListener("execute", this.__ehViewFile, this);

      this._cmdOpenPage = new qx.client.Command("Ctrl-Right");
      this._cmdOpenPage.addEventListener("execute", this.__ehOpenPage, this);

    }, //makeCommands


    __setStateInitialized : function()
    {
      this._cmdRunFile.setEnabled(false);
      this._cmdViewFile.setEnabled(false);
      this._cmdOpenPage.setEnabled(false);
    },


    __setStateLoading : function() {
      this.__states.isLoading = true;
      this.__setStateInitialized();
      if (!this.isPlayAll()) {
        this.widgets["toolbar.playall"].setEnabled(false);
      }
    },


    __setStateLoaded : function ()
    {
      this.__states.isLoading = false;
      this.widgets["toolbar.playall"].setEnabled(true);
      this.widgets["outputviews.bar"].resetEnabled();
      this.widgets["outputviews.demopage.page"].resetEnabled();
      this.widgets["outputviews"].resetEnabled();
      this.widgets["treeview"].resetEnabled();
    },


    __setStateSampleLoaded : function()
    {
      this._cmdObjectSummary.setEnabled(true);
      this._cmdRunFile.setEnabled(true);
      if (!this.__states.isFirstSample) {
        this._cmdViewFile.setEnabled(true);
      }
      if (!this.__states.isLastSample) {
        this._cmdOpenPage.resetEnabled();
      }
      this._cmdSampleInOwnWindow.setEnabled(true);
      this.widgets["toolbar.playall"].setEnabled(true);

      this.widgets["toolbar.profile"].setChecked(true)
      this.widgets["menu.profile"].setChecked(true);
      this._cmdProfile.setEnabled(this._useProfile);

      this._cmdShowLastProfile.setEnabled(false);
      this._cmdDisposeSample.setEnabled(true);
      this._cmdNamespacePollution.setEnabled(true);

    },


    __makeMenuBar : function()
    {
      var menuData = [
        {
          label : "File",
          items : [
            {
              label : "Execute",
              command : this._cmdRunFile
            },
            { type : "Separator" },
            {
              label : "Open Page",
              command : this._cmdOpenPage
            },
            {
              label : "View File",
              command : this._cmdViewFile
            }
          ]
        }
      ];

      var self = this;
      var setWidgetProperties = function(widget, widgetData)
      {
        var props = {};
        for (var key in widgetData) {
          if (key !== "type" && key !== "items" && key !== "label" && key !== "id") {
            props[key] = widgetData[key];
          }
        }
        widget.set(props);
        if (widgetData.id !== undefined) {
          self.widgets[widgetData.id] = widget;
        }
        if (widgetData.command !== undefined) {
          widgetData.command.addEventListener("changeEnabled", function(e) {
            widget.setEnabled(e.getValue());
          });
        }
      }


      var createMenu = function(menuItems)
      {
        var menu = new qx.ui.menu.Menu();
        for (var i=0; i<menuItems.length; i++)
        {
          var item = menuItems[i];
          var itemType = item.type || "Button";
          switch (itemType) {
            case "Button":
              var itemWidget = new qx.ui.menu.Button(item.label);
              break;

            case "CheckBox":
              var itemWidget = new qx.ui.menu.CheckBox(item.label);
              break;

            case "Separator":
              var itemWidget = new qx.ui.menu.Separator;
              break;

            default:
              throw new Error("Invalid case : '"+itemType+"'!");
          }

          setWidgetProperties(itemWidget, item);
          menu.add(itemWidget);
        }
        menu.addToDocument();
        return menu;
      }


      var bar = new qx.ui.menubar.MenuBar();
      for (var i=0; i<menuData.length; i++)
      {
        var btn = new qx.ui.menubar.Button(menuData[i].label);
        btn.setMenu(createMenu(menuData[i].items));
        setWidgetProperties(btn, menuData[i]);
        bar.add(btn);
      }
      return bar;
    }, //makeMenuBar


    __bindCommand: function(widget, command) {
      widget.setCommand(command);
      command.addEventListener("changeEnabled", function(e) {
        widget.setEnabled(e.getValue());
      });
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    __makeToolRun : function()
    {
      var toolbar = new qx.ui.toolbar.ToolBar;
      toolbar.setBorder("line-bottom");
      toolbar.setHeight(27);
      this.widgets["toolrun"] = toolbar;

      var mb = new qx.ui.toolbar.Part();
      toolbar.add(mb);
      this.widgets["toolrun.controlbutts"] = mb;

      // -- run button
      this.runbutton = new qx.ui.toolbar.Button("Run Make", "icon/16/actions/media-playback-start.png");
      mb.add(this.runbutton);
      this.widgets["toolrun.runbutton"] = this.runbutton;
      this.__bindCommand(this.runbutton, this._cmdRunFile);
      this.runbutton.setToolTip(new qx.ui.popup.ToolTip("Run make"));

      // -- view button
      var viewb = new qx.ui.toolbar.Button("View File", "icon/16/actions/zoom.png");
      this.widgets["toolrun.viewb"] = viewb;
      //mb.add(viewb);
      viewb.addEventListener("execute", this.__ehViewFile, this);
      viewb.setToolTip(new qx.ui.popup.ToolTip("View file"));

      // -- previous navigation
      var openb = new qx.ui.toolbar.Button("Open Page", "icon/16/places/www.png");
      mb.add(openb);
      this.widgets["toolrun.openb"] = openb;
      this.__bindCommand(openb, this._cmdOpenPage);
      openb.setToolTip(new qx.ui.popup.ToolTip("Open page in browser"));

      return toolbar;
    },  // __makeToolRun()



    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    __makeButtRun : function()
    {
      // Main Container
      var buttview = new qx.ui.pageview.tabview.TabView();

      buttview.set(
      {
        height  : "1*",
        padding : 10
      });

      this.widgets["buttrun"] = buttview;
      this.widgets["buttrun.bar"] = buttview.getBar();

      // First Page
      var bsb1 = new qx.ui.pageview.tabview.Button("Start", "icon/16/actions/system-run.png");
      this.widgets["buttedit.demopage.button"] = bsb1;
      bsb1.setChecked(true);
      //buttview.getBar().add(bsb1);

      var p1 = new qx.ui.pageview.tabview.Page(bsb1);
      p1.set({ padding : [ 5 ] });
      buttview.getPane().add(p1);

      var f1 = new qx.ui.embed.Iframe;
      this.f1 = f1;
      p1.add(f1);
      this.widgets["buttedit.demopage.page"] = f1;

      f1.set(
      {
        overflow : "auto",
        height   : "100%",
        width    : "100%",
        border   : "dark-shadow"
      });

      f1.setStyleProperty("font-family", '"Consolas", "Courier New", monospace');

      f1.addEventListener("load", this.__ehIframeLoaded, this);


      // Second Page
      var bsb2 = new qx.ui.pageview.tabview.Button("Log", "icon/16/mimetypes/text-ascii.png");
      buttview.getBar().add(bsb2);
      bsb2.setChecked(true);

      var p2 = new qx.ui.pageview.tabview.Page(bsb2);
      p2.set({ padding : [ 5 ] });
      buttview.getPane().add(p2);

      var pp2 = new qx.ui.layout.VerticalBoxLayout();
      p2.add(pp2);

      pp2.set(
      {
        height : "100%",
        width  : "100%"
      });

      // main output area
      this.f2 = new qx.ui.embed.HtmlEmbed();
      pp2.add(this.f2);

      this.f2.set(
      {
        overflow : "auto",
        height   : "1*",
        width    : "100%",
        border   : "dark-shadow",
        font     : "monospace"
      });

      this.logappender = new qx.log.appender.HtmlElement;
      this.logger = new qx.log.Logger("Demo Browser");
      this.logger.addAppender(this.logappender);

      this.f2.addEventListener("appear", function(e) {
        this.logappender.setElement(this.f2.getElement());
      }, this);

      // Third Page
      // -- Tab Button
      var bsb3 = new qx.ui.pageview.tabview.Button("Source View", "icon/16/apps/graphics-snapshot.png");
      //buttview.getBar().add(bsb3);

      // -- Tab Pane
      var p3 = new qx.ui.pageview.tabview.Page(bsb3);
      p3.set({ padding : [ 5 ] });
      buttview.getPane().add(p3);

      // -- Pane Content
      //var f3 = new qx.ui.form.TextArea("The sample source will be displayed here.");
      var f3 = new qx.ui.embed.HtmlEmbed("<div class='script'>The sample source will be displayed here.</div>");
      this.f3 = f3;
      p3.add(f3);
      this.widgets["buttrun.sourcepage.page"] = f3;

      f3.set(
      {
        overflow : "auto",
        width    : "100%",
        height   : "100%",
        border   : "dark-shadow",
        font     : "monospace"
      });
      f3.setHtmlProperty("id", "qx_srcview");

      return buttview;

    },  // __makeButtRun()


    /**
     * Tree View in Left Pane
     * - only make root node; rest will befilled when iframe has loaded (with
     *   leftReloadTree)
     *
     * @type member
     * @return {var} TODOC
     */
    __makeLeft : function()
    {
      var buttview = new qx.ui.pageview.buttonview.ButtonView();

      buttview.set(
      {
        height : "100%",
        width  : "100%",
        border : "line-right"
      });

      buttview.getPane().setPadding(0);

      this.widgets["treeview"] = buttview;
      buttview.getBar().getManager().addEventListener("changeSelected",this.__ehLeftSelection,this);

      // First Pane
      var bsb1 = new qx.ui.pageview.buttonview.Button("Make Edit", "icon/16/actions/view-pane-tree.png");
      buttview.getBar().add(bsb1);
      this.widgets["treeview.bsb1"] = bsb1;
      bsb1.setShow("icon");
      bsb1.setToolTip(new qx.ui.popup.ToolTip("Customize make"));

      var p1 = new qx.ui.pageview.buttonview.Page(bsb1);

      p1.set(
      {
        width           : "100%",
        height          : "100%",
        backgroundColor : "white"
      });

      buttview.getPane().add(p1);

      var treeData = 
      {
        label : "Customize Makefile",
        items : [
        {
          label : "General",
          items : [
          {
            label : "QOOXDOO_PATH"
          }
          ]
        },
        {
          label : "Makefile Vars",
          items : [
          {
            label : "BASIC SETTINGS",
            items : [
            {
              label : "APPLICATION_CLASSNAME"
            },
            {
              label : "QOOXDOO_URI"
            },
            {
              label : "APPLICATION_NAMESPACE_PATH"
            }
            ]
          },
          {
            label : "GENERATOR OPTIONS",
            items : [
            {
              label : "APPLICATON_COMPLETE_BUILD"
            },
            {
              label : "APPLICATON_COMPLETE_SOURCE"
            },
            {
              label : "APPLICATION_COMPLETE_API"
            }
            ]
          },
          {
            label : "RUNTIME SETTINGS",
            items : [
            {
              label : "APPLICATION_THEME"
            },
            {
              label : "APPLICATION_THEME_COLOR"
            },
            {
              label : "APPLICATION_THEME_BORDER"
            }
            ]
          }
          ]
        }
        ]
      };
      //var tree = new qx.ui.tree.Tree("Samples");
      //var tree = new qxadmin.FileSystemService(this.RpcServer);
      var tree = this.__createTree(treeData);
      this.tD = treeData;
      p1.add(tree);
      this.tree = tree;
      this.widgets["treeview.full"] = tree;
      bsb1.setUserData('tree', tree);  // for changeSelected handling

      tree.set(
      {
        width    : "100%",
        height   : "100%",
        padding  : 5,
        overflow : "auto"
      });

      tree.getManager().addEventListener("changeSelection", this.__handleTreeSelection, this);

      // Second Pane
      var bsb2 = new qx.ui.pageview.buttonview.Button("Run Make", "icon/16/categories/applications-development.png");
      buttview.getBar().add(bsb2);
      this.widgets["treeview.bsb2"] = bsb2;
      bsb2.setShow("icon");
      bsb2.setToolTip(new qx.ui.popup.ToolTip("Run make"));

      var p2 = new qx.ui.pageview.buttonview.Page(bsb2);

      p2.set(
      {
        width           : "100%",
        height          : "100%",
        backgroundColor : "white"
      });

      buttview.getPane().add(p2);

      // second pane content
      var treeData = 
        {
          label : "Run make",
          items : [
          {
            label : "source"
          },
          {
            label : "build"
          },
          {
            label : "api"
          },
          {
            label : "test"
          }
          ]
        };

      var tree1 = this.__createTree(treeData);
      p2.add(tree1);
      this.widgets["treeview.runmake"] = tree1;
      bsb2.setUserData('tree', tree1);  // for changeSelected handling

      tree1.set(
      {
        width    : "100%",
        height   : "100%",
        padding  : 5,
        overflow : "auto"
      });

      tree1.getManager().addEventListener("changeSelection", this.__handleTreeSelection, this);

      // Third Pane
      var bsb3 = new qx.ui.pageview.buttonview.Button("Info", "resource/image/information18.png");
      buttview.getBar().add(bsb3);
      this.widgets["treeview.bsb3"] = bsb2;
      bsb3.setShow("icon");
      bsb3.setToolTip(new qx.ui.popup.ToolTip("Run make"));

      var p2 = new qx.ui.pageview.buttonview.Page(bsb3);

      p2.set(
      {
        width           : "100%",
        height          : "100%",
        backgroundColor : "white"
      });

      buttview.getPane().add(p2);

      // pane content
      var treeData = 
        {
          label : "Overview",
          items : [
          ]
        };

      var tree1 = this.__createTree(treeData);
      p2.add(tree1);
      tree1.set(
      {
        width    : "100%",
        height   : "100%",
        padding  : 5,
        overflow : "auto"
      });

      tree1.getManager().addEventListener("changeSelection", this.__handleTreeSelection, this);


      return buttview;
    },


    __createTree : function (treeData)
    {
      var tree = new qx.ui.tree.Tree();
      tree.setHideNode(true);

      // recursive worker function
      var createTreeR = function (tData)
      {
        if (!tData.items)
        {
          return new qx.ui.tree.TreeFile(tData.label);
        } else 
        {
          var node = new qx.ui.tree.TreeFolder(tData.label);
          node.setAlwaysShowPlusMinusSymbol(true);

          for (var i=0; i<tData.items.length; i++)
          {
            var item = tData.items[i];
            node.add(createTreeR(item));
          }
          return node;
        }
      }; //createTreeR

      tree.add(createTreeR(treeData));

      return tree;
    },


    /** Traverse treeData and apply fn at each node
     */
    __traverseTreeData : function (treeData, fn)
    {
      if (!treeData.items)
      {
        fn(treeData,'L');
        return;
      } else 
      {
        fn(treeData,'N');
        for (var i=0; i<treeData.items.length; i++)
        {
          var item = treeData.items[i];
          arguments.callee(item, fn);
        }
        return;
      }

      return;

    }, //traverseTreeData


    /** Select right hand side toolbar and button pane, depending on left hand side
     *  choice
     */
    __toggleRightSide : function (b) 
    {
      if (b=="edit") // make file edit
      {
        this.widgets["toolrun"].setDisplay(false);
        this.widgets["buttrun"].setDisplay(false);
        this.widgets["runoptions"].setDisplay(false);
        this.widgets["tooledit"].setDisplay(true);
        this.widgets["buttedit"].setDisplay(true);
      } else 
      {
        this.widgets["tooledit"].setDisplay(false);
        this.widgets["buttedit"].setDisplay(false);
        this.widgets["toolrun"].setDisplay(true);
        this.widgets["buttrun"].setDisplay(true);
        this.widgets["runoptions"].setDisplay(true);
      }
      
    },

    __ehLeftSelection : function (e) 
    {
      var sel = e.getData();
      var lab = sel.getLabel();
      var tok;

      if (lab == "Make Edit") 
      {
        tok = "edit";
      } else 
      {
        tok = "run";
      }
      this.__toggleRightSide(tok);
    },


    __makeToolEdit : function ()
    {
      var toolbar = new qx.ui.toolbar.ToolBar;
      toolbar.setBorder("line-bottom");
      toolbar.setHeight(27);
      this.widgets["tooledit"] = toolbar;

      var mb = new qx.ui.toolbar.Part();
      toolbar.add(mb);
      this.widgets["tooledit.controlbutts"] = mb;

      // -- run button
      this.runbutton = new qx.ui.toolbar.Button("Save Makefile", "icon/16/actions/media-playback-start.png");
      mb.add(this.runbutton);
      this.widgets["tooledit.runbutton"] = this.runbutton;
      this.__bindCommand(this.runbutton, this._cmdRunFile);
      this.runbutton.setToolTip(new qx.ui.popup.ToolTip("Run make"));

      // -- view button
      var viewb = new qx.ui.toolbar.Button("View File", "icon/16/actions/zoom.png");
      this.widgets["tooledit.viewb"] = viewb;
      //mb.add(viewb);
      viewb.addEventListener("execute", this.__ehViewFile, this);
      viewb.setToolTip(new qx.ui.popup.ToolTip("View file"));

      // -- previous navigation
      var openb = new qx.ui.toolbar.Button("Open Page", "icon/16/places/www.png");
      //mb.add(openb);
      this.widgets["tooledit.openb"] = openb;
      this.__bindCommand(openb, this._cmdOpenPage);
      openb.setToolTip(new qx.ui.popup.ToolTip("Open page in browser"));

      return toolbar;
      
    }, //__makeToolEdit


    __makeButtEdit : function ()
    {
      // Main Container
      var buttview = new qx.ui.pageview.tabview.TabView();

      buttview.set(
      {
        height  : "1*",
        padding : 10
      });

      this.widgets["buttedit"] = buttview;
      this.widgets["buttedit.bar"] = buttview.getBar();

      // First Page
      var bsb1 = new qx.ui.pageview.tabview.Button("Customize Make", "icon/16/actions/system-run.png");
      this.widgets["buttrun.varedit.button"] = bsb1;
      bsb1.setChecked(true);
      buttview.getBar().add(bsb1);

      var p1 = new qx.ui.pageview.tabview.Page(bsb1);
      p1.set({ padding : [ 5 ] });
      buttview.getPane().add(p1);

      // contents widget
      var f1 = new qx.ui.embed.HtmlEmbed();
      p1.add(f1);
      this.widgets["buttrun.varedit.page"] = f1;

      f1.set(
      {
        overflow : "auto",
        height   : "100%",
        width    : "100%",
        border   : "dark-shadow"
      });
      f1.setStyleProperty("font-family", '"Consolas", "Courier New", monospace');

      var html = new qx.util.StringBuilder();
      this.__traverseTreeData(this.tD, function (item, type) 
      {
        if (type == 'N')
        {
          html.add('<h3>'+item.label+'</h3>');
        } else 
        {
          html.add(item.label+'<br>');
        }
      });
      f1.setHtml(html.get());

      return buttview;

    }, //makeButtEdit


    __makeOptionsPane : function () 
    {
      var rightSub = new qx.ui.layout.VerticalBoxLayout();
      rightSub.set(
      {
        padding : 10,
        height  : "auto",
        spacing : 20 
      });

      var groupBox = new qx.ui.groupbox.GroupBox();
      groupBox.set({ height : "auto" });
      rightSub.add(groupBox);

      var vert = new qx.ui.layout.VerticalBoxLayout();

      vert.set(
      {
        height : "auto",
        width  : "100%"
      });

      groupBox.add(vert);

      var opts = new qx.ui.layout.HorizontalBoxLayout();
      //vert.add(opts);
      opts.set(
      {
        height : "auto",
        width : "100%"
      });

      var c1 = new qx.ui.form.CheckBox("source","sourceChecked","c1");
      opts.add(c1);

      var addOpts = new qx.ui.layout.HorizontalBoxLayout();
      vert.add(addOpts);
      addOpts.set(
      {
        height : "auto",
        width : "100%"
      });

      var t1 = new qx.ui.form.TextField();
      addOpts.add(t1);

      var l1 = new qx.ui.basic.Label("additional run options");
      addOpts.add(l1);


      return rightSub;

    }, //makeOptionsPane


    // ------------------------------------------------------------------------
    //   EVENT HANDLER
    // ------------------------------------------------------------------------
    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    __handleTreeSelection : function(e)
    {
      return;
      if (!this.tree.getSelectedElement())
      {  // this is a kludge!
        return;
      }

      this.__setStateInitialized(); // reset all controls before enabling

      var treeNode = this.tree.getSelectedElement();
      //var modelNode = treeNode.getUserData("modelLink");
      //this.tests.selected = this.tests.handler.getFullName(modelNode);

      var treeLabel = treeNode.getLabel();

      if (treeLabel == "Makefile") 
      {
        this._cmdRunFile.setEnabled(true);
        //this.invokeMake(treeNode);
        this.widgets["runoptions"].setDisplay(true);
      } else {
        this._cmdRunFile.setEnabled(false);
        this.widgets["runoptions"].setDisplay(false);
        if (treeLabel == "index.html") 
        {
          this._cmdOpenPage.setEnabled(true);
          //this.invokeIndexHtml(treeNode);
        } else if (treeNode instanceof qx.ui.tree.TreeFile)
        {
          this._cmdViewFile.setEnabled(true);
          //this.getFile(treeNode);
        }
      }

    }, //handleTreeSelection


    __ehViewFile : function (e) 
    {
      if (!this.tree.getSelectedElement())
      {  // this is a kludge!
        return;
      }
      var treeNode = this.tree.getSelectedElement();

      if (treeNode instanceof qx.ui.tree.TreeFile) 
      {
        this.getFile(treeNode);
      }
    },


    __ehRunFile : function (e)
    {
      if (!this.tree.getSelectedElement())
      {  // this is a kludge!
        return;
      }
      var treeNode = this.tree.getSelectedElement();

      if (treeNode instanceof qx.ui.tree.TreeFile) 
      {
        this.runFile(treeNode);
      }
    },


    runFile : function (treeNode) 
    {
      var a = this.getParentFolderChain(treeNode);
      var b = [];
      var that = this;

      for (var i=0; i<a.length; i++) 
      {
        b.push(a[i].getLabel());
      }
      //alert(b);
      // drop the root node
      b.shift();

      // run make through RPC
      this.RpcRunning = this.RpcServer.callAsync(
        function(result, ex, id)
        {
          that.RpcRunning = null;
          if (ex == null) {
              that.debug("Make successfull, rendering output...");
              that.f2.setHtml('<pre>'+result+'</pre>')
              that.debug("Rendering complete.");
          } else {
              alert("Async(" + id + ") exception: " + ex);
          }
        },
        "fss.runMake",
        b,
        "source");
      /*
      // run make through CGI
      var url = "http://127.0.0.1/cgi-bin/nph-make_build.py?path="+b.join("/");
      this.f1.setSource(url);
      */

    },

    __ehOpenPage : function (e)
    {
      if (!this.tree.getSelectedElement())
      {  // this is a kludge!
        return;
      }
      var treeNode = this.tree.getSelectedElement();

      if (treeNode instanceof qx.ui.tree.TreeFile) 
      {
        this.invokeIndexHtml(treeNode);
      }
    },


    invokeIndexHtml : function (treeNode) 
    {
      var a = this.getParentFolderChain(treeNode);
      var b = [];
      var that = this;

      for (var i=0; i<a.length; i++) 
      {
        b.push(a[i].getLabel());
      }
      //alert(b);
      // drop the root node
      b.shift();

      var url = this.qooxdoo_path+"/"+b.join("/")+"/index.html";
      // open index.html
      window.open(url);

    },


    getFile : function (treeNode)
    {
      var a = this.getParentFolderChain(treeNode);
      var b = [];
      var that = this;
      var treeLabel = treeNode.getLabel();

      for (var i=0; i<a.length; i++) 
      {
        b.push(a[i].getLabel());
      }
      // drop the root node
      b.shift();
      // add file name
      b.push(treeLabel);

      this.RpcRunning = this.RpcServer.callAsync(
        function(result, ex, id)
        {
          that.RpcRunning = null;
          if (ex == null) {
              that.debug("Got file "+treeLabel);
              that.f3.setHtml('<pre>'+result+'</pre>');
          } else {
              alert("Async(" + id + ") exception: " + ex);
          }
        },
        "fss.getFile",
        b);

    },


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    leftReloadTree : function(e)
    {
      this._sampleToTreeNodeMap = {};
      var _sampleToTreeNodeMap = this._sampleToTreeNodeMap;

      // use tree struct
      /**
       * create widget tree from model
       *
       * @param widgetR {qx.ui.tree.Tree}    [In/Out]
       *        widget root under which the widget tree will be built
       * @param modelR  {qxadmin.Tree} [In]
       *        model root for the tree from which the widgets representation
       *        will be built
       */
      function buildSubTree(widgetR, modelR)
      {
        var children = modelR.getChildren();
        var t, tt, desc;

        for (var i=0; i<children.length; i++)
        {
          var currNode = children[i];

          if (currNode.hasChildren())
          {
            t = new qx.ui.tree.TreeFolder(that.polish(currNode.label), "qxadmin/image/package18.gif");
            t.setUserData("filled", false);
            t.setUserData("node", currNode);
            t.setAlwaysShowPlusMinusSymbol(true);

            t.addEventListener("changeOpen", function(e)
            {
              if (!this.getUserData("filled"))
              {
                buildSubTree(this, this.getUserData("node"));
                this.setUserData("filled", true);
              }
            });

            if (currNode.label == "example")
            {  // TODO: hard-wired
              t.setOpen(true);
            }
          }
          else
          {
            t = new qx.ui.tree.TreeFile(that.polish(currNode.label), "qxadmin/image/method_public18.gif");
            var fullName = currNode.pwd().slice(1).join("/") + "/" + currNode.label;
            _sampleToTreeNodeMap[fullName] = t;

            desc = currNode.desc;

            // force reduced margins
            desc = desc.replace(/<p>/g, '<p style="margin:4px 0;padding:0">');
            desc = desc.replace(/<ul>/g, '<ul style="margin:4px 0;padding:0">');
            desc = desc.replace(/<ol>/g, '<ol style="margin:4px 0;padding:0">');

            if (qx.core.Variant.isSet("qx.client", "mshtml")) {
              desc = '<div style="width:200px">' + desc + '</div>';
            } else {
              desc = '<div style="max-width:200px">' + desc + '</div>';
            }

            tt = new qx.ui.popup.ToolTip(desc, "icon/32/actions/help-contents.png");
            tt.getAtom().getLabelObject().setWrap(true);
            tt.setShowInterval(200);
            t.setToolTip(tt);
          }

          // make connections
          widgetR.add(t);
          t.setUserData("modelLink", currNode);
          currNode.widgetLinkFull = t;

          if (that.tests.handler.getFullName(currNode) == that.tests.selected) {
            selectedElement = currNode;
          }
        }
      }

      function buildSubTreeFlat(widgetR, modelR)
      {
        var iter = modelR.getIterator("depth");
        var currNode;

        while (currNode = iter())
        {
          // it's a container
          if (!(currNode.type && currNode.type == "test"))
          {
            if (handler.hasTests(currNode))
            {
              var fullName = handler.getFullName(currNode);
              var t = new qx.ui.tree.TreeFolder(that.polish(fullName), "qxadmin/image/package18.gif");
              widgetR.add(t);
              t.setUserData("modelLink", currNode);
              currNode.widgetLinkFlat = t;

              if (that.tests.handler.getFullName(currNode) == that.tests.selected) {
                selectedElement = currNode;
              }

              var children = currNode.getChildren();

              for (var i=0; i<children.length; i++)
              {
                if (children[i].type && children[i].type == "test")
                {
                  var c = new qx.ui.tree.TreeFile(that.polish(children[i].label), "qxadmin/image/class18.gif");
                  c.setToolTip(new qx.ui.popup.ToolTip(children[i].desc));
                  t.add(c);
                  c.setUserData("modelLink", children[i]);
                  children[i].widgetLinkFlat = c;

                  if (that.tests.handler.getFullName(children[i]) == that.tests.selected) {
                    selectedElement = children[i];
                  }
                }
              }
            }
          }
        }
      }

      // -- Main --------------------------------
      var ttree = this.tests.handler.ttree;
      var handler = this.tests.handler;
      var that = this;

      /*
      // Reset Status Pane Elements
      this.widgets["statuspane.current"].setText("");
      this.widgets["statuspane.number"].setText("");
      */

      // Disable Tree View
      this.widgets["treeview"].setEnabled(false);

      // Handle current Tree Selection and Content
      var fulltree = this.widgets["treeview.full"];
      var flattree = this.widgets["treeview.flat"];
      var trees = [ fulltree, flattree ];
      var stree = this.widgets["treeview"].getBar().getManager().getSelected();

      for (var i=0; i<trees.length; i++)
      {
        trees[i].resetSelected();
        trees[i].destroyContent();  // clean up before re-build
        trees[i].setUserData("modelLink", ttree);  // link top level widgets and model
      }

      // link top level model to widgets
      ttree.widgetLinkFull = fulltree;
      ttree.widgetLinkFlat = flattree;

      var selectedElement = null;  // if selection exists will be set by

      // buildSubTree* functions to a model node
      // Build the widget trees
      buildSubTree(this.widgets["treeview.full"], ttree);

      // buildSubTreeFlat(this.widgets["treeview.flat"], ttree);
      // Re-enable and Re-select
      this.widgets["treeview"].setEnabled(true);

      if (selectedElement)  // try to re-select previously selected element
      {
        // select tree element and open if folder
        if (selectedElement.widgetLinkFull)
        {
          this.widgets["treeview.full"].setSelectedElement(selectedElement.widgetLinkFull);

          if (selectedElement.widgetLinkFull instanceof qx.ui.tree.TreeFolder) {
            selectedElement.widgetLinkFull.open();
          }
        }

        if (selectedElement.widgetLinkFlat)
        {
          this.widgets["treeview.flat"].setSelectedElement(selectedElement.widgetLinkFlat);

          if (selectedElement.widgetLinkFlat instanceof qx.ui.tree.TreeFolder) {
            selectedElement.widgetLinkFlat.open();
          }
        }
      }
    },  // leftReloadTree


    /**
     * event handler for the Run Test button - performs the tests
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    runSample : function(e)
    {
      // -- Feasibility Checks -----------------
      if (!this.tests.selected) {
        return;
      }

      if (!this.widgets["toolbar.runbutton"].isEnabled()) {
        return;
      }

      if (true)
      {
        var file = this.tests.selected.replace(".", "/");

        this.setCurrentSample(file);
      }
    },  // runSample()


    /**
     * TODOC
     *
     * @type member
     * @param value {var} TODOC
     * @return {void}
     */
    setCurrentSample : function(value)
    {
      if (!value) {
        return;
      }

      if (!this._sampleToTreeNodeMap) {
        return;
      }

      // -- Vars and Setup -----------------------
      this.widgets["outputviews.bar"].getManager().setSelected(this.widgets["outputviews.demopage.button"]);
      this.widgets["outputviews.demopage.page"].setEnabled(false);

      this.__setStateLoading();

      var iDoc = this.widgets["outputviews.demopage.page"].getContentDocument();
      if (iDoc)
      {
        iDoc.body.innerHTML = "";
      }
      this.widgets["outputviews.bar"].setEnabled(false);
      this.widgets["outputviews"].setEnabled(false);

      var url;
      var treeNode = this._sampleToTreeNodeMap[value];

      if (treeNode)
      {
        treeNode.setSelected(true);
        //this.widgets["treeview.full"].setSelectedElement(treeNode);
        url = 'html/' + value;
        if (this._useProfile) {
          url += "?qxvariant:qx.aspects:on&qxsetting:qx.enableAspect:true"
        } else {
          url += "?qxvariant:qx.aspects:off&qx.enableAspect:false"
        }
      }
      else
      {
        url = this.defaultUrl;
      }

      // disable tree *after* setSelectedElement
      this.widgets["treeview"].setEnabled(false);

      // Clear log
      this.logappender.clear();
      this.logger.info("load demo: " + value);

      this._currentSampleUrl == url ? this.f1.reload() : this.f1.setSource(url);

      this._currentSample = value;
      this._currentSampleUrl = url;
    },  // setCurrentSample


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    __ehIframeLoaded : function(e)
    {
      return;
      var fwindow = this.f1.getContentWindow();
      var fpath = fwindow.location.pathname + "";
      var splitIndex = fpath.indexOf("?");
      if (splitIndex != -1) {
        fpath = fpath.substring(0, splitIndex + 1);
      }
      var path = fpath.split("/");

      //if (this._currentSampleUrl != this.defaultUrl)
      if (this.f1.getSource() != "" && this.f1.getSource() != this.defaultUrl)
      {
        // set logger
        fwindow.qx.log.Logger.ROOT_LOGGER.removeAllAppenders();
        fwindow.qx.log.Logger.ROOT_LOGGER.addAppender(this.logappender);

        var url = fwindow.location.href;
        var posHtml = url.indexOf("/html/") + 6;
        var posSearch = url.indexOf("?");
        posSearch = posSearch == -1 ? url.length : posSearch;
        var split = url.substring(posHtml, posSearch).split("/");
        var div = String.fromCharCode(187);

        if (split.length == 2)
        {
          var category = split[0];
          category = category.charAt(0).toUpperCase() + category.substring(1);
          var pagename = split[1].replace(".html", "").replace(/_/g, " ");
          pagename = pagename.charAt(0).toUpperCase() + pagename.substring(1);
          var title = "qooxdoo " + div + " Demo Browser " + div + " " + category + " " + div + " " + pagename;
        }
        else
        {
          var title = "qooxdoo " + div + " Demo Browser " + div + " Welcome";
        }

        // update state on example change
        var sample = path.slice(-2).join('~');
        this._history.addToHistory(sample, title);

        // load sample source code
        if (this._currentSampleUrl != this.defaultUrl)
        {
          this.__setStateSampleLoaded();
          this.__getPageSource(this._currentSampleUrl);
        } else {
          this.__setStateInitialized();
        }
      }

      this.__setStateLoaded();
      this.widgets["outputviews.demopage.button"].setLabel(this.polish(path[path.length - 1]));
      this.debug("Demo loaded...");

      if (this.isPlayAll())
      {
        if (this.widgets["toolbar.nextbutt"].isEnabled())
        {
          // give some time before proceeding
          qx.client.Timer.once(function ()
          {
            this.widgets["toolbar.nextbutt"].execute();
          }, this, 1500);
        } else
        {
          this.setPlayAll(false);
        }
      }

    }, // __ehIframeLoaded


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    __ehPlayAll : function(e)
    {
      if (! this.isPlayAll())  // start playing all
      {
        this.setPlayAll(true);  // turn on global flag
        // select first example
        var first = this._sampleToTreeNodeMap['example/Atom_1.html'];
        this.widgets["treeview.full"].setSelectedElement(first);
        // run sample
        this.widgets["toolbar.runbutton"].execute();
      } else                  // end playing all
      {
        if (this.__states.isLoading)
        {
          this.widgets["toolbar.playall"].setEnabled(false);
        }
        this.setPlayAll(false);
      }
    },


    // ------------------------------------------------------------------------
    //   MISC HELPERS
    // ------------------------------------------------------------------------
    __applyPlayAll : function(value, old)
    {
      if (value == true )
      {
        this.widgets["toolbar.playall"].setIcon(qxadmin.AppFrame.Img_PlayAll_Stop);
      } else
      {
        this.widgets["toolbar.playall"].setIcon(qxadmin.AppFrame.Img_PlayAll_Default);
        //this.widgets["toolbar.playall"].resetEnabled();
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param url {var} TODOC
     * @return {String} TODOC
     */
    __getPageSource : function(url)
    {
      var req = new qx.io.remote.Request(url);

      req.setTimeout(180000);
      req.setProhibitCaching(false);

      req.addEventListener("completed", function(evt)
      {
        var loadEnd = new Date();
        this.debug("Time to load page source from server: " + (loadEnd.getTime() - loadStart.getTime()) + "ms");

        var content = evt.getData().getContent();

        if (content) {
          //this.widgets["outputviews.sourcepage.page"].setValue(content);
          this.widgets["outputviews.sourcepage.page"].setHtml(this.__beautySource(content));
          this.__sourceCodeLoaded = 1;
        }
      },
      this);

      req.addEventListener("failed", function(evt) {
        this.error("Couldn't load file: " + url);
      }, this);

      var loadStart = new Date();
      req.send();
    },


    /**
     * TODOC
     *
     * @type member
     * @param url {var} TODOC
     * @return {void}
     */
    dataLoader : function()
    {
      this.tests.handler = new qxadmin.TreeDataHandler({});

      var start = new Date();
      //this.leftReloadTree();
      var end = new Date();
      this.debug("Time to build/display tree: " + (end.getTime() - start.getTime()) + "ms");

      // read initial state
      var state = this._history.getState();
    },


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    playPrev : function(e)
    {
      var currSamp = this.tree.getSelectedElement();  // widget

      if (currSamp)
      {
        var otherSamp = currSamp.getUserData('modelLink').getPrevSibling().widgetLinkFull;

        if (otherSamp)
        {
          this.widgets["treeview.full"].setSelectedElement(otherSamp);
          this.runSample();
        }
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    playNext : function(e)
    {
      var currSamp = this.tree.getSelectedElement();  // widget

      if (currSamp)
      {
        var otherSamp = currSamp.getUserData('modelLink').getNextSibling().widgetLinkFull;

        if (otherSamp)
        {
          this.widgets["treeview.full"].setSelectedElement(otherSamp);
          this.runSample();
        }
      }
    },


    __beautySource : function (src)
    {
      var bsrc = "<pre>";
      var lines = [];
      var currBlock = ""
      var PScriptStart = /^\s*<script\b[^>]*?(?!\bsrc\s*=)[^>]*?>\s*$/i;
      var PScriptEnd = /^\s*<\/script>\s*$/i;


      src = src.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      var lines = src.split('\n');

      for (var i=0; i<lines.length; i++)
      {
          if (PScriptStart.exec(lines[i])) // start of inline script
          {
            // add this line to 'normal' code
            bsrc += this.__beautyHtml(qx.html.String.escape(currBlock + lines[i]));
            currBlock = "";  // start new block
          }
          else if (PScriptEnd.exec(lines[i])) // end of inline script
          {
            // pass script block to tokenizer
            var s1 = qx.dev.Tokenizer.javaScriptToHtml(currBlock);
            bsrc += '<div class="script">'+s1+'</div>';
            currBlock = lines[i]+'\n';  // start new block
          }
          else // no border line
          {
            currBlock += lines[i]+'\n';
          }
      }


      // collect rest of page
      bsrc += this.__beautyHtml(qx.html.String.escape(currBlock)) + "</pre>";

      return bsrc;

    }, // beautySource()


    __beautyHtml : function (str)
    {
      var res = str;
      var PTagStart = '&lt;\/?'

      // This match function might be a bit of overkill right now, but provides
      // for later extensions (cf. Flanagan(5th), 703)
      function matchfunc (vargs)
      {
        var s = arguments[1]+'<span class="html-tag-name">'+arguments[2]+'</span>';
        var pair, curr;
        var endT = false;

        // handle rest of submatches
        if (arguments.length -2 > 3) {
          for (var i=3; i<arguments.length-2; i++)
          {
            curr = arguments[i];
            if (curr == "/")
            {
              endT = true;
              break;
            }
            else // handle tag attributes
            {
              var m = /\s*([^=]+?)\s*=\s*((?!&quot;)\S+|&quot;.*?&quot;)\s*/g;
              var r;

              while ((r = m.exec(curr)) != null) {
                s += ' <span class="keyword">'+r[1]+'</span>=<span class="string">'+
                      r[2].replace(/\s*$/,"")+'</span>';
              }
            }
          }
          s += (endT?"/":"");
        }
        s += '&gt;';

        return s;

      } //matchfunc()

      //res = res.replace(/(&lt;\/?)([a-zA-Z]+)\b/g, matchfunc);  // only tag start
      res = res.replace(/(&lt;\/?)([a-zA-Z]+)(.*?)(\/?)&gt;/g, matchfunc); // whole tag

      return res;
    },


    /**
     * Return the array of ancestor folders of a given element.
     *
     * @type member
     * @param treeElem {qx.ui.tree.AbstractTreeElement} Element of a tree
     * @return {qx.ui.tree.AbstractTreeElement[]|null} Array of ancestor folders
     */
    getParentFolderChain : function(treeElem) 
    {
      if (treeElem.getParentFolder() == null)
      {
        return null;
      } else 
      {
        return this.getParentFolderChainR(treeElem, []);
      }
      
    },

    getParentFolderChainR : function(treeElem,aAncestors)
    {
      var parnt = treeElem.getParentFolder();
      if (parnt == null)
      {
        return aAncestors;
      } else 
      {
        aAncestors.unshift(parnt);
        return arguments.callee(parnt, aAncestors);
      }
    },


    /**
     * 'Atom_1.html' -> 'Atom 1'
     *
     * @type member
     * @param str {String} TODOC
     * @return {var} TODOC
     */
    polish : function(str) {
      return str.replace(".html", "").replace("_", " ");
    },

    defaultUrl : "html/welcome.html"
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeFields("widgets", "tests", "_sampleToTreeNodeMap", "tree", "__states");
    this._disposeObjects("header", "mainsplit", "tree1", "left", "runbutton", "toolbar", "f1", "f2", "logger", "_history", "logappender", '_cmdObjectSummary', '_cmdRunFile', '_cmdViewFile', '_cmdOpenPage', '_cmdSampleInOwnWindow', '_cmdLoadProfile', '_cmdProfile', '_cmdShowLastProfile', '_cmdDisposeSample', '_cmdNamespacePollution');
  }
});
