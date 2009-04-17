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
import org.qooxdoo.sushi.util.Substitution;

/** Copy configuration and command. */
public class Copy {
    private final Node sourcedir;
	/** relevant files in source dir */
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
        this(srcdir, filter, modes, null, null, null);
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
		Node dest;
		String relative;
        String replaced;
        List<Node> result;
        
        result = new ArrayList<Node>();
		sourcedir.checkDirectory();
		destdir.checkDirectory();
		for (Node src : sourcedir.find(filter)) {
			relative = src.getRelative(sourcedir);
			dest = null;
            try {
                if (path != null) {
			        relative = path.apply(relative, variables);
			    }
			    dest = destdir.join(relative);
			    if (src.isDirectory()) {
		            dest.mkdirsOpt();
			    } else {
			        dest.getParent().mkdirsOpt();
			        if (content != null) {
                        replaced = content.apply(src.readString(), variables);
			    	    dest.writeString(replaced);
			        } else {
			    	    src.copyFile(dest);
			        }
			        result.add(src);
			    }
			    if (modes) {
				    dest.setMode(src.getMode());
			    }
            } catch (RuntimeException e) {
                throw e;
            } catch (Exception e) {
                if (dest == null) {
                    dest = destdir.join(relative);
                }
                throw new CopyException(src, dest, e);
            }
		}
		return result;
	}
}
