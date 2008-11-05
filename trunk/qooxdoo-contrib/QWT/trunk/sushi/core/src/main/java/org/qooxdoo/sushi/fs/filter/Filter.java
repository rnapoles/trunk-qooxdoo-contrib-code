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
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.util.Strings;

/**
 * <p>Similar to java.io.FileFilter or Ant File/Directory sets. A filter is basically a list of paths to 
 * include or exclude. Predicates can be used to further restrict the collected nodes. Paths always use
 * slashes (/) - even on Windows - because a) it simplifies writings constants and b) the filter can be
 * applied to any file system.
 * 
 * <p>Usage. Create a new instance, use the various selections methods (include, exclude, etc.),
 * and pass the instance for dir.find(). Selection methods return <code>this</code> to allow expressions.</p>
 *
 * <p>A path is a list of names, separated by Filter.SEPARATOR. Paths must *not* start with a 
 * separator, i.e they have to be relative. Paths remain relative until the filter is actually 
 * applied to a tree. Paths must not end with a separator either. </p>
 *
 * <p>Names use the familar glob syntax. Filters do not know about extensions. </p>
 */
public class Filter {
    public static final int DEPTH_INFINITE = Integer.MAX_VALUE;
    
    public static final char SEPARATOR_CHAR = '/';
    public static final String SEPARATOR = "" + SEPARATOR_CHAR;

    //--

    
    /** List of compiled paths. CP = (HEAD, NULL | CP); HEAD = Pattern | String */
    private final List<Object[]> includes;
    private final List<String> includesRepr;
    
    /** List of compiled paths. */
    private final List<Object[]> excludes;
    private final List<String> excludesRepr;
    
    private final List<Predicate> predicates;
    
    private boolean ignoreCase;
    
    private int minDepth;
    private int maxDepth;
    
    public Filter() {
        this.includes = new ArrayList<Object[]>();
        this.includesRepr = new ArrayList<String>();
        this.excludes = new ArrayList<Object[]>();
        this.excludesRepr = new ArrayList<String>();
        this.predicates = new ArrayList<Predicate>();
        this.ignoreCase = false;
        this.minDepth = 1;
        this.maxDepth = DEPTH_INFINITE;
    }
    
    public Filter(Filter orig) {
        this.includes = new ArrayList<Object[]>(orig.includes);
        this.includesRepr = new ArrayList<String>(orig.includesRepr);
        this.excludes = new ArrayList<Object[]>(orig.excludes);
        this.excludesRepr = new ArrayList<String>(orig.excludesRepr);
        this.predicates = new ArrayList<Predicate>(orig.predicates); // TODO: not a deep clone ...
        this.ignoreCase = orig.ignoreCase;
        this.minDepth = orig.minDepth;
        this.maxDepth = orig.maxDepth;
    }

    //-- selections methods
    
    /** Does *not* affect previous calles to include/exclude */
    public Filter ignoreCase() {
        ignoreCase = true;
        return this;
    }
    
    public Filter minDepth(int minDepth) {
        this.minDepth = minDepth;
        return this;
    }
    
    public Filter maxDepth(int maxDepth) {
        this.maxDepth = maxDepth;
        return this;
    }
    
    public Filter predicate(Predicate p) {
        predicates.add(p);
        return this;
    }
    
    public Filter includeAll() {
        return includeName("*");
    }
    
    public Filter include(String... paths) {
        return include(Arrays.asList(paths));
    }
    
    public Filter include(List<String> paths) {
        for (String path : paths) {
            includes.add(compile(path));
            includesRepr.add(path);
        }
        return this;
    }
    
    public Filter includeName(String... names) {
        for (String name : names) {
            include(Strings.join(SEPARATOR, "**", name));
        }
        return this;
    }
    
    public Filter exclude(String... paths) {
        return exclude(Arrays.asList(paths));
    }

    public Filter exclude(List<String> paths) {
        for (String path : paths) {
            excludes.add(compile(path));
            excludesRepr.add(path);
        }
        return this;
    }
    
    public Filter excludeName(String... names) {
        for (String name : names) {
            exclude(Strings.join(SEPARATOR, "**", name));
        }
        return this;
    }

    public String[] getIncludes() {
        return Strings.toArray(includesRepr);
    }

    public String[] getExcludes() {
        return Strings.toArray(excludesRepr);
    }
    
    public List<Predicate> getPredicates() {
        return predicates;
    }
 
    //-- select helper methods
    
    private Object[] compile(String path) {
        List<String> lst;
        
        lst = Strings.split(SEPARATOR, path);
        if (lst.size() == 0) {
            throw new IllegalArgumentException("empty path: " + path);
        }
        if (lst.get(0).equals("")) {
            throw new IllegalArgumentException("absolute path not allowed: " + path);
        }
        if (lst.get(lst.size() - 1).equals("")) {
            throw new IllegalArgumentException(
                "path must not end with separator: " + path);
        }
        return compileTail(lst, 0);
    }
    
    /**
     * @param lst  array of patterns
     */
    private Object[] compileTail(List<String> lst, int start) {
        Object head;
        Object[] tail;
        
        if (start == lst.size()) {
            return null;
        } else {
            head = Glob.compile(lst.get(start), ignoreCase);
            tail = compileTail(lst, start + 1);
            if (head == Glob.STARSTAR) {
                if (tail == null) {
                    throw new IllegalArgumentException("** must be followed by some content");
                }
                if (tail[0] == Glob.STARSTAR) {
                    throw new IllegalArgumentException("**/** is not allowed");
                }
            }
        }
        return new Object[] { head, tail };
    }
    
    public List<Node> collect(Node root) throws IOException {
        List<Node> result;
        
        result = new ArrayList<Node>();
        collect(root, result);
        return result;
    }
    
    public void collect(Node root, List<Node> result) throws IOException {
        invoke(root, new CollectAction(result));
    }

    /**
     * Main methods of this class.
     *
     * @throws IOException as thrown by the specified FileTask
     */
    public void invoke(Node root, Action result) throws IOException {
        doInvoke(0, root, new ArrayList<Object[]>(includes), new ArrayList<Object[]>(excludes), result);
    }
    
    private void doInvoke(int currentDepth, Node node, List<Object[]> includes, List<Object[]> excludes, Action result)
    throws IOException {
        List<? extends Node> children;
        int i;
        List<Object[]> remainingIncludes;
        List<Object[]> remainingExcludes;
        String name;
        boolean in;
        boolean ex;
        
        if (currentDepth > maxDepth || includes.size() == 0 || excludesAll(excludes)) {
            return;
        }
        if (currentDepth == 0) {
        	// special case for first recursion step
            remainingIncludes = includes;
            remainingExcludes = excludes;
        } else {
            name = node.getName();
            remainingIncludes = new ArrayList<Object[]>();
            remainingExcludes = new ArrayList<Object[]>();
            in = doMatch(name, includes, remainingIncludes);
            ex = doMatch(name, excludes, remainingExcludes);
            if (in && !ex && currentDepth >= minDepth && matchPredicates(node)) {
            	result.invoke(node);
            }
        }
        children = list(node, remainingIncludes);
        if (children == null) {
            // ignore file
        } else {
            for (i = 0; i < children.size(); i++) {
                doInvoke(currentDepth + 1, (Node) children.get(i), remainingIncludes, remainingExcludes, result);
            }
        }
    }
    
    private List<? extends Node> list(Node node, List<Object[]> includes) throws IOException {
    	List<Node> children;
    	Node child;
    	
    	children = null;
    	for (Object[] path : includes) {
    		if (path[0] instanceof String) {
    			if (children == null) {
    				children = new ArrayList<Node>();
    			}
  				child = node.join((String) path[0]);
   	    		if (child.exists()) {
   	    			children.add(child);
    			}
    		} else {
    			children = null;
    			break;
    		}
    	}
        try {
        	return node.list();    	
        } catch (IOException e) {
        	// TODO: 
            // report this exception - I currently need it because the collect algorithm is poor ... 
            return null;
        }
    }

    private boolean matchPredicates(Node node) throws IOException {
        for (Predicate p : predicates) {
            if (!p.matches(node)) {
                return false;
            }
        }
        return true;
    }
    
    private static boolean excludesAll(List<Object[]> excludes) {
        int i;
        int max;
        Object[] pair;
        Object[] tail;
        
        max = excludes.size();
        for (i = 0; i < max; i++) {
            pair = (Object[]) excludes.get(i);
            tail = (Object[]) pair[1];
            if (pair[0] == Glob.STARSTAR && tail[0] == Glob.STAR) {
                return true;
            }
        }
        return false;
    }
    
    private static boolean doMatch(String name, List<Object[]> paths, List<Object[]> remainingPaths) {
        boolean found;
        int i;
        int max;
        Object[] path;
        Object head;
        Object[] tail;
        
        found = false;
        max = paths.size();
        for (i = 0; i < max; i++) {
            path = (Object[]) paths.get(i);
            if (path == null) {
                throw new IllegalStateException("unexpected empty path");
            }
            head = path[0];
            tail = (Object[]) path[1];
            if (head == Glob.STARSTAR) {
                remainingPaths.add(path);
                head = tail[0];
                tail = (Object[]) tail[1];
            }
            if (matches(head, name)) {
                if (tail != null) {
                    remainingPaths.add(tail);
                } else {
                    found = true;
                }
            }
        }
        return found;
    }
    private static boolean matches(Object stringOrPattern, String name) {
    	if (stringOrPattern instanceof String) {
    		return name.equals(stringOrPattern);
    	} else {
    		return Glob.matches((Pattern) stringOrPattern, name);    	
    	}
    }

    @Override
    public String toString() {
        return "includes=" + includes + ", excludes=" + excludes;
    }
}

