/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.widgets;

public class Tree {
}

/*
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.qooxdoo.toolkit.webapp.Page;
import org.qooxdoo.toolkit.qooxdoo.widgets.QxGridLayout;
import org.qooxdoo.toolkit.qooxdoo.widgets.QxHorizontalBoxLayout;
import org.qooxdoo.toolkit.qooxdoo.gui.QxParent;
import org.qooxdoo.toolkit.qooxdoo.widgets.QxTree;
import org.qooxdoo.toolkit.qooxdoo.gui.QxWidget;

public class Tree extends Page {
    private final FileTree tree;
    private final QxGridLayout info;
    
    public Tree() {
        super("Tree");
        
        File root;
        
        root = new File("/");
        this.tree = new FileTree(root);
        this.info = new QxGridLayout();
        info.setLeft(200); // TODO
    }
    
    public QxWidget createContent() {
        QxParent content;
        
        content = new QxHorizontalBoxLayout();
        content.add(info);
        content.add(tree);
        return content;
    }
    
    private class FileTree extends QxTree<File> {
        public FileTree(File root) {
            super(root);
            setAlwaysShowPlusMinusSymbol(true);
        }
        
        public boolean isFolder(File file) {
            return file.isDirectory();
        }
        
        public void selected(File file) {
            info.removeAll();
            info.row("path", file.getPath());
            info.row("modified", new Date(file.lastModified()));
        }

        @Override
        public List<File> getChildren(File file) {
            File[] files;
            List<File> result;
            
            result = new ArrayList<File>();
            if (file.isDirectory()) {
                files = file.listFiles();
                if (files == null) {
                    throw new RuntimeException("TODO: permission denied");
                }
                for (File f : files) {
                    if (f.canRead()) {
                        result.add(f);
                    }
                }
            }
            return result;
        }

        @Override
        public String getName(File file) {
            return file.getName();
        }
    }
}
*/
