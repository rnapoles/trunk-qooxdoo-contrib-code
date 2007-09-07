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

package org.qooxdoo.grep;

import qx.event.type.DataEvent;
import qx.ui.core.Widget;
import qx.ui.form.Button;
import qx.ui.form.TextField;
import qx.ui.layout.HorizontalBoxLayout;
import qx.ui.layout.VerticalBoxLayout;
import qx.ui.tree.Tree;
import qx.ui.tree.TreeFile;
import qx.ui.tree.TreeFolder;
import org.qooxdoo.toolkit.qooxdoo.EventListener;

public class Main implements EventListener {
    private IServices find;
    private TextField text;
    private Button button;
    private Tree<String> tree;
    
    public Main() {
    }
    
    public void initServices(IServices find) {
        this.find = find;
    }

    public Widget createRoot() {
        HorizontalBoxLayout header;
        VerticalBoxLayout all;
        
        text = new TextField();
        button = new Button("grep");
        tree = Tree.<String>create("Results");
        header = new HorizontalBoxLayout();
        header.add(text);
        header.add(button);
        button.addExecuteListener(this);
        
        header.setHeight(20);
        all = new VerticalBoxLayout();
        all.add(header);
        all.add(tree);
        return all;
    }

    public void notify(DataEvent obj) {
        String substring;
        TreeFolder<String> file;
        
        file = null;
        tree.removeAll();
        substring = text.getValue().toString();
        for (Match match : find.find(substring)) {
            if (file == null || !match.file.equals(file.getNode())) {
                file = tree.addFolder(match.file);
            }
            file.add(new TreeFile<String>(match.line));
        }
    }
}
