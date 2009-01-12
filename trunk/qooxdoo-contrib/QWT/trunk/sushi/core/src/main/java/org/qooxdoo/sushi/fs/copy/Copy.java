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

package org.qooxdoo.sushi.fs.copy;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.filter.Filter;

/** TODO adjust directory modes */
public class Copy {
    private final Node sourcedir;
	/** relevant files in source dir */
	private final Filter filter;

	private final boolean modes;
	
    private final Substitution path;
    private final Substitution content;

	public Copy(Node srcdir) {
		this(srcdir, null, null, srcdir.getIO().filter().includeAll(), false);
	}
	
	public Copy(Node srcdir, Substitution path, Substitution content, Filter filter, boolean modes) {
	    this.sourcedir = srcdir;
		this.path = path;
		this.content = content;
		this.filter = filter;
		this.modes = modes;
	}

	public Node getSourceDir() {
	    return sourcedir;
	}
	
	/** @return Source files copied */
	public List<Node> copy(Node destdir) throws IOException, CopyException {
		Node dest;
		String relative;
        String replaced;
        List<Node> result;
        
        result = new ArrayList<Node>();
		sourcedir.checkDirectory();
		destdir.checkDirectory();
		for (Node src : sourcedir.find(filter)) {
			relative = src.getRelative(sourcedir);
			if (path != null) {
				relative = path.apply(relative);
			}
			dest = destdir.join(relative);
			if (src.isDirectory()) {
		        dest.mkdirsOpt();
			} else {
			    dest.getParent().mkdirsOpt();
			    if (content != null) {
			    	replaced = content.apply(src.readString());
			    	dest.writeString(replaced);
			    } else {
			    	src.copyFile(dest);
			    }
			    result.add(src);
			}
			if (modes) {
				dest.setMode(src.getMode());
			}
		}
		return result;
	}
}
