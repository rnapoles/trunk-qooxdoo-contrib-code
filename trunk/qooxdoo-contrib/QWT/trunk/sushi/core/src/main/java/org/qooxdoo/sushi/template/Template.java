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

public class Template {
    private final Node sourcedir;
	private final String pathPrefix;
	private final String pathSuffix;
	private final String contentPrefix;
	private final String contentSuffix;
	private final Map<String, String> variables;
	private final Filter files;
	
	public Template(Node srcdir) {
		this(srcdir, "__", "__", "${", "}", new HashMap<String, String>(), srcdir.getIO().filter().includeAll());
	}
	
	public Template(Node srcdir, String pathPrefix, String pathSuffix, String contentPrefix, String contentSuffix, 
			Map<String, String> variables, Filter files) {
	    this.sourcedir = srcdir;
		this.pathPrefix = pathPrefix;
		this.pathSuffix = pathSuffix;
		this.contentPrefix = contentPrefix;
		this.contentSuffix = contentSuffix;
		this.variables = variables;
		this.files = files;
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
		String path;
		Node dest;
        String content;
        String replaced;
        String old;
        
		sourcedir.checkDirectory();
		destdir.checkDirectory();
		for (Node src : sourcedir.find(files)) {
			path = src.getRelative(sourcedir);
			dest = destdir.join(replace(pathPrefix, pathSuffix, path));
			if (src.isDirectory()) {
		        if (dest.exists()) {
		            // nothing to to
		        } else {
                    action.directory(dest);
		        }
			} else {
			    dest.getParent().mkdirsOpt();
		        content = src.readString();
		        replaced = replace(contentPrefix, contentSuffix, content);
		        if (dest.exists()) {
		            old = dest.readString();
		            if (!old.equals(replaced)) {
	                    action.file(dest, old, replaced);
		            }
		        } else {
                    action.file(dest, null, replaced);
		        }
			}
		}
	}
	
	public String replace(String prefix, String suffix, String content) throws TemplateException {
		StringBuffer buffer;
		int start;
		int end;
		int last;
		String var;
		String replaced;
		
		buffer = new StringBuffer();
		last = 0;
		while (true) {
			start = content.indexOf(prefix, last);
			if (start == -1) {
				if (last == 0) {
					return content;
				} else {
					buffer.append(content.substring(last));
					return buffer.toString();
				}
			}
			end = content.indexOf(suffix, start + prefix.length());
			if (end == -1) {
				throw new TemplateException("missing end marker");
			}
			var = content.substring(start + prefix.length(), end);
			replaced = variables.get(var);
			if (replaced == null) {
				throw new TemplateException("undefined variable: " + var);
			}
			buffer.append(content.substring(last, start));
			buffer.append(replaced);
			last = end + suffix.length();
		}
	}
}
