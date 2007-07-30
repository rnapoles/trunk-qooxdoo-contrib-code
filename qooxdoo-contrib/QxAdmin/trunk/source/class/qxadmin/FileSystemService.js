/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Viktor Ferenczi (python@cx.hu)
     * Thomas Herchenroeder (thron7)

************************************************************************ */

/* ************************************************************************

#module(qxadmin)

************************************************************************ */

qx.Class.define("qxadmin.FileSystemService",
{
  extend : qx.ui.tree.Tree,

  construct : function()
  {
    this.base(arguments);

    /*
     * Reset the default of always showing the plus/minus symbol.  The
     * default is 'false'.  We want to always display it for each folder
     * (and then stop displaying it if we determine upon open that there
     * is no contents).
     */
    /*
    var constructor = qx.OO.classes["qx.ui.tree.TreeFolder"];
    qx.Proto = constructor.prototype;
    qx.OO.changeProperty({
          name : "alwaysShowPlusMinusSymbol",
          type : "boolean",
          defaultValue : true });
    */

    var rpc = new qx.io.remote.Rpc();
    this.rpc = rpc;
    rpc.setTimeout(1000);
    rpc.setUrl("http://127.0.0.1:8007");
    rpc.setServiceName("qooxdoo.admin");
    rpc.setCrossDomain(true);

    this.mycall = null;

    var trs = qx.ui.tree.TreeRowStructure.getInstance().standard("Root");
    var tree = new qx.ui.tree.Tree(trs);
    this.tree = tree;

    tree.set(
    {
        backgroundColor : 'white',
        border          : 'inset',
        overflow        : "auto",

        height          : null,
        top             : 48,
        left            : 20,
        width           : 700,
        bottom          : 48,

        hideNode        : true,          // hide the root node
        useTreeLines    : true           // display tree lines
    });

    /*
     * All subtrees will use this root node's event listeners.  Create an
     * event listener for an open while empty.
     */
    tree.addEventListener("treeOpenWhileEmpty", this.__treeOpenWhileEmpty, this);

    //qx.ui.core.ClientDocument.getInstance().add(tree);

    var trs = qx.ui.tree.TreeRowStructure.getInstance().standard("Sandbox");
    var tf = new qx.ui.tree.TreeFolder(trs);
    tree.add(tf);

  }, // construct

  members : {

    __treeOpenWhileEmpty : function(e)
    {
        alert("in treeOpenWhileEmpty handler");
        return;
        var parent = e.getData();
        var hierarchy = parent.getHierarchy(new Array());
        var that = this;

        parent.debug("Requesting children...");

        // Strip off the root node
        hierarchy.shift();

        this.mycall = this.rpc.callAsync(
            function(result, ex, id)
            {
                that.mycall = null;
                if (ex == null) {
                    parent.debug("Children obtained.  Rendering...");
                    that.__addChildren(parent, result);
                    parent.debug("Rendering complete.");
                } else {
                    alert("Async(" + id + ") exception: " + ex);
                }
            },
            "fss.readDirEntries",
            hierarchy,
            true);
    },


    __addChildren : function(parent, children)
    {
        var t;
        var trs;
        var child;
        var obj;

        for (i = 0; i < children.length; i++)
        {
            child = children[i];

            trs = qx.ui.tree.TreeRowStructure.getInstance().newRow();

            // Here's our indentation and tree-lines
            trs.addIndent();

            // If not a file or directory, change the icon
            var bIsDirectory = ((child.mode & 0040000) != 0);
            var bIsFile = ((child.mode & 0100000) != 0);
            if (! bIsDirectory && ! bIsFile)
            {
                trs.addIcon("icon/16/places/user-desktop.png",
                            "icon/16/apps/accessories-dictionary.png");
            }
            else
            {
                trs.addIcon();
            }

            // The label
            trs.addLabel(child.name);

            // All else should be right justified
            obj = new qx.ui.basic.HorizontalSpacer;
            trs.addObject(obj, true);

            // Add the permissions
            mode = "";
            mode = ((child.mode & 0001) ? "x" : "-") + mode;
            mode = ((child.mode & 0002) ? "w" : "-") + mode;
            mode = ((child.mode & 0004) ? "r" : "-") + mode;
            mode = ((child.mode & 0010) ? "x" : "-") + mode;
            mode = ((child.mode & 0020) ? "w" : "-") + mode;
            mode = ((child.mode & 0040) ? "r" : "-") + mode;
            mode = ((child.mode & 0100) ? "x" : "-") + mode;
            mode = ((child.mode & 0200) ? "w" : "-") + mode;
            mode = ((child.mode & 0400) ? "r" : "-") + mode;
            obj = new qx.ui.basic.Label(mode);
            obj.setWidth(80);
            obj.setStyleProperty("fontFamily", "monospace");
            trs.addObject(obj, true);

            // Add a file size, date and mode
            obj = new qx.ui.basic.Label(child.size + "");
            obj.setWidth(50);
            obj.setStyleProperty("fontFamily", "monospace");
            trs.addObject(obj, true);

            var d = new Date();
            d.setTime(child.mtime * 1000);
            obj = new qx.ui.basic.Label(d.toString().slice(0,33));
            obj.setWidth(200);
            obj.setStyleProperty("fontFamily", "monospace");
            trs.addObject(obj, true);

            if (bIsDirectory)
            {
                t = new qx.ui.tree.TreeFolder(trs);
            }
            else
            {
                t = new qx.ui.tree.TreeFile(trs);
            }
            parent.add(t);
        }
    }
  }
});


