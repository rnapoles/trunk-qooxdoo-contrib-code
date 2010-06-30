/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(smarttree.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "smarttree"
 */
qx.Class.define("smarttree.demo.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        var appender;
        appender = qx.log.appender.Native;
        appender = qx.log.appender.Console;
      }

      // We want to use some of the high-level node operation convenience
      // methods rather than manually digging into the TreeVirtual helper
      // classes.  Include the mixin that provides them.
      qx.Class.include(qx.ui.treevirtual.TreeVirtual,
                       qx.ui.treevirtual.MNode);

      // tree
      var tree = new smarttree.SmartTree(
          [
            "Subject",
            "Sender",
            "Received Date"
          ]);
      tree.set(
        {
          width : 400
        });
      tree.setAlwaysShowOpenCloseSymbol(true);

      // Obtain the resize behavior object to manipulate
      var resizeBehavior = tree.getTableColumnModel().getBehavior();

      // Ensure that the tree column remains sufficiently wide
      resizeBehavior.set(0, { width:"1*", minWidth:180  });

      this.getRoot().add(tree);

      // Generate a static data model for a series of email messages.
      // Each row consists, first, of the displayed column data, and finally
      // the message id and then a map of additional information (headers)
      // which may be used to build a tree from the data.
      var data = 
        [
          [
            "[qooxdoo-devel] break on error in Firebug in func gecko()",
            "Werner Thie",
            "2010-06-09 11:53",
            1,
            {
              inReplyTo : null
            }
          ],
          [
            "Re: [qooxdoo-devel] break on error in Firebug in func gecko()",
            "thron7",
            "2010-06-09 14:28",
            2,
            {
              inReplyTo : 1
            }
          ],
          [
            "Re: [qooxdoo-devel] break on error in Firebug in func gecko()",
            "Derrell Lipman",
            "2010-06-09 14:32",
            3,
            {
              inReplyTo : 2
            }
          ],
          [
            "[qooxdoo-devel] scrolling experience",
            "Tobias Oetiker",
            "2010-06-08 07:56",
            4,
            {
              inReplyTo : null
            }
          ],
          [
            "Re: [qooxdoo-devel] scrolling experience",
            "MartinWitteman",
            "2010-06-09 12:53",
            5,
            {
              inReplyTo : 4
            }
          ],
          [
            "Re: [qooxdoo-devel] scrolling experience",
            "Tobias Oetiker",
            "2010-06-09 13:42",
            6,
            {
              inReplyTo : 5
            }
          ],
          [
            "Re: [qooxdoo-devel] scrolling experience",
            "MartinWitteman",
            "2010-06-09 14:28",
            7,
            {
              inReplyTo : 6
            }
          ],
          [
            "[qooxdoo-devel] How to patch static methods/members? (qooxdoo 1.2-pre)",
            "Peter Schneider",
            "2010-06-09 09:18",
            8,
            {
              inReplyTo : null
            }
          ],
          [
            "Re: [qooxdoo-devel] How to patch static methods/members? (qooxdoo 1.2-pre)",
            "Derrell Lipman",
            "2010-06-09 13:59",
            9,
            {
              inReplyTo : 8
            }
          ],
          [
            "Re: [qooxdoo-devel] How to patch static methods/members? (qooxdoo 1.2-pre)",
            "Peter Schneider",
            "2010-06-09 13:59",
            10,
            {
              inReplyTo : 9
            }
          ],
          [
            "Re: [qooxdoo-devel] How to patch static methods/members? (qooxdoo 1.2-pre)",
            "Derrell LIpman",
            "2010-06-09 14:04",
            11,
            {
              inReplyTo : 10
            }
          ],
          [
            "[qooxdoo-devel] mo better qooxlisp",
            "Kenneth Tilton",
            "2010-06-05 23:40",
            12,
            {
              inReplyTo : null
            }
          ],
          [
            "Re: [qooxdoo-devel][Lisp] mo better qooxlisp",
            "Ken Tilton",
            "2010-06-09 13:11",
            13,
            {
              inReplyTo : 12
            }
          ],
          [
            "Re: [qooxdoo-devel][Lisp] mo better qooxlisp",
            "Joubert Nel",
            "2010-06-09 13:24",
            14,
            {
              inReplyTo : 13
            }
          ],
          [
            "Re: [qooxdoo-devel][Lisp] mo better qooxlisp",
            "Kenneth Tilton",
            "2010-06-09 13:40",
            15,
            {
              inReplyTo : 14
            }
          ],
          [
            "[qooxdoo-devel] a jqPlot qooxdoo integration widget contrib",
            "Tobias Oetiker",
            "2010-06-08 10:59",
            16,
            {
              inReplyTo : null
            }
          ],
          [
            "Re: [qooxdoo-devel] a jqPlot qooxdoo integration widget contrib",
            "panyasan",
            "2010-06-09 07:48",
            17,
            {
              inReplyTo : 16
            }
          ],
          [
            "Re: [qooxdoo-devel] a jqPlot qooxdoo integration widget contrib",
            "Tobi Oetiker",
            "2010-06-09 13:24",
            18,
            {
              inReplyTo : 16
            }
          ],
          [
            "[qooxdoo-devel] Extending application to native window (my favorite bug)",
            "panyasan",
            "2010-06-09 07:48",
            19,
            {
              inReplyTo : null
            }
          ],
          [
            "Re: [qooxdoo-devel] Extending application to native window (my favorite bug)",
            "thron7",
            "2010-06-09 11:42",
            20,
            {
              inReplyTo : 19
            }
          ],
          [
            "Re: [qooxdoo-devel] Extending application to native window (my favorite bug)",
            "panyasan",
            "2010-06-09 12:16",
            21,
            {
              inReplyTo : 20
            }
          ],
          [
            "Re: [qooxdoo-devel] Extending application to native window (my favorite bug)",
            "hkalyoncu",
            "2010-06-09 12:57",
            22,
            {
              inReplyTo : 21
            }
          ],
          [
            "Re: [qooxdoo-devel] Extending application to native window (my favorite bug)",
            "Fritz Zaucker",
            "2010-06-09 12:58",
            23,
            {
              inReplyTo : 21
            }
          ],
          [
            "Re: [qooxdoo-devel] Extending application to native window (my favorite bug)",
            "panaysan",
            "2010-06-09 13:05",
            24,
            {
              inReplyTo : 23
            }
          ],
          [
            "Re: [qooxdoo-devel] Extending application to native window (my favorite bug)",
            "thron7",
            "2010-06-09 13:18",
            25,
            {
              inReplyTo : 21
            }
          ]
        ];

      // tree data model
      var dataModel = tree.getDataModel();

      var te1 = dataModel.addBranch(null, "Desktop", true);
      tree.nodeSetLabelStyle(te1,
                             "background-color: red; " +
                             "color: white;" +
                             "font-weight: bold;");

      var te1_1;

      dataModel.addBranch(te1, "Files", true);

      te1_1 = dataModel.addBranch(te1, "Workspace", true);
      var te = dataModel.addLeaf(te1_1, "Windows (C:)");
      dataModel.setColumnData(te, 1, "-rwxr-xr-x");
      dataModel.setColumnData(te, 2, "2007-01-30 22:54:03");
      te = dataModel.addLeaf(te1_1, "Documents (D:)");
      dataModel.setColumnData(te, 1, "-rwxr-xr-x");
      dataModel.setColumnData(te, 2, "2007-01-30 22:54:03");

      dataModel.addBranch(te1, "Network", true);

      te = dataModel.addBranch(te1, "Trash", true);
      tree.nodeSetCellStyle(te, "background-color: cyan;");

      var te2 = dataModel.addBranch(null, "Inbox", true);

      te = dataModel.addBranch(te2, "Spam", false);

      for (var i = 1; i < 3000; i++)
      {
        dataModel.addLeaf(te, "Spam Message #" + i);
      }

      dataModel.addBranch(te2, "Sent", false);
      dataModel.addBranch(te2, "Trash", false);
      dataModel.addBranch(te2, "Data", false);
      dataModel.addBranch(te2, "Edit", false);

      dataModel.setData();
    }
  }
});
