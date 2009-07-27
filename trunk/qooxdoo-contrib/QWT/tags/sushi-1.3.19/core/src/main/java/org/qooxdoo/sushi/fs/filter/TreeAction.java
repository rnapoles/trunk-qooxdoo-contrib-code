/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.fs.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;

public class TreeAction implements Action {
    private final List<Node> nodes;
    private final List<Tree> trees;
    private Tree result;
    
    public TreeAction() {
        this.nodes = new ArrayList<Node>();
        this.trees = new ArrayList<Tree>();
    }
    
    public void enter(Node node) {
        Tree parent;
        
        if (trees.size() > 0) {
            parent = trees.get(trees.size() - 1);
            if (parent != null) {
                for (Tree child : parent.children) {
                    if (node == child.node) {
                        nodes.add(node);
                        trees.add(child);
                        return;
                    }
                }
            }
        }
        nodes.add(node);
        trees.add(null);
    }
    
    public void enterFailed(Node node, IOException e) throws IOException {
        throw e;
    }

    public void leave(Node node) {
        int idx;
        
        idx = nodes.size() - 1;
        nodes.remove(idx);
        result = trees.remove(idx);
    }
    
    public void select(Node node) {
        Tree added;
        Tree current;
        
        added = new Tree(node); 
        for (int i = trees.size() - 1; i >= 0; i--) {
            current = trees.get(i);
            if (current == null) {
                current = new Tree(nodes.get(i));
                current.children.add(added);
                trees.set(i, current);
                added = current;
            } else {
                current.children.add(added);
                break;
            }
        }
    }

    public Tree getResult() {
        if (nodes.size() != 0) {
            throw new IllegalStateException();
        }
        if (trees.size() != 0) {
            throw new IllegalStateException();
        }
        return result;
    }
}
