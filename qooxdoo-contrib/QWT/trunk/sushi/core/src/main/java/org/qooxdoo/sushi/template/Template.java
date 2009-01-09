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

package org.qooxdoo.sushi.template;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.filter.Filter;

/** TODO adjust directory modes */
public class Template {
    private final Node sourcedir;
    private final Substitution path;
    private final Substitution content;
	private final Map<String, String> variables;

	/** relavant files in source dir */
	private final Filter filter;
	
	public Template(Node srcdir) {
		this(srcdir, new Substitution("__", "__", '\\'), new Substitution("${", "}", '\\'), 
		        new HashMap<String, String>(), srcdir.getIO().filter().includeAll());
	}
	
	public Template(Node srcdir, Substitution path, Substitution content, Map<String, String> variables, Filter filter) {
	    this.sourcedir = srcdir;
		this.path = path;
		this.content = content;
		this.variables = variables;
		this.filter = filter;
	}

    public Node getSourceDir() {
        return sourcedir;
    }
    
	public Map<String, String> variables() {
		return variables;
	}
	
    public String status(Node destdir) throws IOException {
        StatusAction action;
        
        action = new StatusAction(destdir);
        apply(destdir, action);
        return action.get();
    }
    
    public String diff(Node destdir) throws IOException {
        DiffAction action;
        
        action = new DiffAction(destdir);
        apply(destdir, action);
        return action.get();
    }
    
	public void copy(Node destdir) throws IOException {
	    apply(destdir, new CopyAction());
	}
	
	public void apply(Node destdir, Action action) throws IOException, TemplateException {
		Node dest;
        String replaced;
        String old;
        int mode;
        
		sourcedir.checkDirectory();
		destdir.checkDirectory();
		for (Node src : sourcedir.find(filter)) {
			dest = destdir.join(path.apply(src.getRelative(sourcedir), variables));
			if (src.isDirectory()) {
		        if (dest.exists()) {
		            // nothing to do
		        } else {
                    action.directory(dest);
		        }
			} else {
			    dest.getParent().mkdirsOpt();
		        replaced = content.apply(src.readString(), variables);
	            mode = src.getMode();
		        if (dest.exists()) {
		            old = dest.readString();
		            if (!old.equals(replaced)) {
	                    action.file(dest, old, replaced, mode);
		            } else if (mode != dest.getMode()) {
	                    action.file(dest, old, null, mode);
		            }
		        } else {
                    action.file(dest, null, replaced, mode);
		        }
			}
		}
	}
}
