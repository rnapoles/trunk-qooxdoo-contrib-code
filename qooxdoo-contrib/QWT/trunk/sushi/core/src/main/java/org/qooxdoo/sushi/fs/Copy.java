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

package org.qooxdoo.sushi.fs;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.fs.filter.Filter;
import org.qooxdoo.sushi.fs.filter.Tree;
import org.qooxdoo.sushi.fs.filter.TreeAction;
import org.qooxdoo.sushi.util.Substitution;

/** Copy configuration and command. */
public class Copy {
    private final Node sourcedir;

    /** applied to sourcedir */
	private final Filter filter;

	private final boolean modes;
	
    private final Substitution path;
    private final Substitution content;
    private final Map<String, String> variables;
    
	public Copy(Node srcdir) {
		this(srcdir, srcdir.getIO().filter().includeAll());
	}
	
    public Copy(Node srcdir, Filter filter) {
        this(srcdir, filter, false);
    }
    
    public Copy(Node srcdir, Filter filter, boolean modes) {
        this(srcdir, filter, modes, null, null);
    }
    
    public Copy(Node srcdir, Filter filter, boolean modes, Substitution subst, Map<String, String> variables) {
        this(srcdir, filter, modes, subst, subst, variables);
    }

    public Copy(Node srcdir, Filter filter, boolean modes, Substitution path, Substitution content, Map<String, String> variables) {
	    this.sourcedir = srcdir;
        this.filter = filter;
        this.modes = modes;
		this.path = path;
		this.content = content;
		this.variables = variables;
	}

	public Node getSourceDir() {
	    return sourcedir;
	}
	
	/** @return Source files copied */
	public List<Node> directory(Node destdir) throws IOException {
        List<Node> result;
        TreeAction action;
        Tree tree;
        
        result = new ArrayList<Node>();
		sourcedir.checkDirectory();
		destdir.checkDirectory();
		action = new TreeAction();
		filter.invoke(sourcedir, action);
		tree = action.getResult();
		if (tree != null) {
		    copy(sourcedir, destdir, tree, result);
		}
		return result;
	}
	
	private void copy(Node sourceroot, Node destroot, Tree src, List<Node> result) throws CopyException {
        Node dest;
        String relative;
        String replaced;
	    
	    relative = src.node.getRelative(sourceroot);
		dest = null;
        try {
            if (path != null) {
                relative = path.apply(relative, variables);
			}
			dest = destroot.join(relative);
			if (src.node.isDirectory()) {
			    dest.mkdirsOpt();
			} else {
			    dest.getParent().mkdirsOpt();
			    if (content != null) {
                    replaced = content.apply(src.node.readString(), variables);
			  	    dest.writeString(replaced);
			    } else {
			  	    src.node.copyFile(dest);
			    }
			    result.add(src.node);
			}
			if (modes) {
			    dest.setMode(src.node.getMode());
			}
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            if (dest == null) {
                dest = destroot.join(relative);
            }
            throw new CopyException(src.node, dest, e);
        }
        for (Tree child : src.children) {
            copy(sourceroot, destroot, child, result);
        }
	}
}
