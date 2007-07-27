qx.core.Init.getInstance().defineMain(
    function()
    {
        var addChildren = function(parent, children)
        {
            var t;
            var trs;
            var child;

            for (i = 0; i < children.length; i++)
            {
                child = children[i];

                trs = qx.ui.treefullcontrol.TreeRowStructure.getInstance().newRow();

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
                    t = new qx.ui.treefullcontrol.TreeFolder(trs);
                }
                else
                {
                    t = new qx.ui.treefullcontrol.TreeFile(trs);
                }
                parent.add(t);
            }
        }

        /*
         * Reset the default of always showing the plus/minus symbol.  The
         * default is 'false'.  We want to always display it for each folder
         * (and then stop displaying it if we determine upon open that there
         * are no contents).
         */
        var constructor = qx.OO.classes["qx.ui.treefullcontrol.TreeFolder"];
        qx.Proto = constructor.prototype;
        qx.OO.changeProperty({
              name : "alwaysShowPlusMinusSymbol",
              type : "boolean",
              defaultValue : true });

        var rpc = new qx.io.remote.Rpc();
        rpc.setTimeout(1000);
        rpc.setUrl("fs.py");
        rpc.setServiceName("qooxdoo.fs");
        rpc.setCrossDomain(false);

        var mycall = null;

        var trs = qx.ui.treefullcontrol.TreeRowStructure.getInstance().standard("Root");
        var t = new qx.ui.treefullcontrol.Tree(trs);

        with(t)
        {
            setBackgroundColor(255);
            setBorder(qx.renderer.border.BorderPresets.getInstance().inset);
            setOverflow("scrollY");

            setHeight(null);
            setTop(48);
            setLeft(20);
            setWidth(700);
            setBottom(48);

            setHideNode(true);          // hide the root node
            setUseTreeLines(true);      // display tree lines
        };

        /*
         * All subtrees will use this root node's event listeners.  Create an
         * event listener for an open while empty.
         */
        t.addEventListener(
            "treeOpenWhileEmpty",
            function(e)
            {
                var parent = e.getData();
                var hierarchy = parent.getHierarchy(new Array());

                parent.debug("Requesting children...");

                // Strip off the root node
                hierarchy.shift();

                mycall = rpc.callAsync(
                    function(result, ex, id)
                    {
                        mycall = null;
                        if (ex == null) {
                            parent.debug("Children obtained.  Rendering...");
                            addChildren(parent, result);
                            parent.debug("Rendering complete.");
                        } else {
                            alert("Async(" + id + ") exception: " + ex);
                        }
                    },
                    "readDirEntries",
                    hierarchy,
                    true);
            });

        qx.ui.core.ClientDocument.getInstance().add(t);

        var trs = qx.ui.treefullcontrol.TreeRowStructure.getInstance().standard("Sandbox");
        var tf = new qx.ui.treefullcontrol.TreeFolder(trs);
        t.add(tf);
    });