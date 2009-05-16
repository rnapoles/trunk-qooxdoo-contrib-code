package org.qooxdoo.sushi.fs;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.qooxdoo.sushi.fs.filter.Filter;
import org.qooxdoo.sushi.util.Strings;

public class Diff {
    private final boolean brief;

    public Diff(boolean brief) {
        this.brief = brief;
    }

    //-- scan directories for relevant files
    
    public List<String> paths(Node dir, Filter filter) throws IOException {
    	List<String> result;
    	
    	result = new ArrayList<String>();
    	paths(dir, filter, result);
    	return result;
    }
    
    public void paths(Node dir, Filter filter, List<String> result) throws IOException {
    	String path;
    	
    	for (Node node : dir.find(filter)) {
    		path = node.getRelative(dir);
    		if (!result.contains(path)) {
    			result.add(path);
    		}
    	}
    }

    //-- diff
    
    public String directory(Node leftdir, Node rightdir, Filter filter) throws IOException {
    	List<String> paths;
    	
    	paths = paths(leftdir, filter);
    	paths(rightdir, filter, paths);
    	return directory(leftdir, rightdir, paths);
    }
    
    public String directory(Node leftdir, Node rightdir, String ... paths) throws IOException {
    	return directory(leftdir, rightdir, Arrays.asList(paths));
    }
    
    public String directory(Node leftdir, Node rightdir, List<String> paths) throws IOException {
        StringBuilder result;
        Node left;
        Node right;
        
        result = new StringBuilder();
        leftdir.checkDirectory();
        rightdir.checkDirectory();
        for (String path : paths) {
            left = leftdir.join(path);
            right = rightdir.join(path);
            if (left.isDirectory()) {
                if (right.isDirectory()) {
                    // ok
                } else if (right.isFile()) {
                    throw new IOException("TODO");
                } else {
                    if (brief) {
                        header('A', path, result);
                    } else {
                        // TODO
                    }
                }
            } else if (right.isDirectory()) {
                header("A", path, result);
            } else {
                file(left, right, path, result);
            }
        }
        return result.toString();
    }

    public void file(Node left, Node cmp, String relative, StringBuilder result) throws IOException {
        if (brief) {
            header(left, cmp, relative, result);
        } else {
            fileNormal(left, cmp, relative, result);
        }
    }
    
    public void fileNormal(Node left, Node right, String relative, StringBuilder result) throws IOException {
        String str;
        
        if (!left.exists()) {
            right.checkFile();
            header("###", relative, result);
            result.append(Strings.indent(right.readString(), "+ "));
        } else {
            str = org.qooxdoo.sushi.util.Diff.diff(left.readString(), right.readString());
            if (str.length() > 0) {
                header("###", relative, result);
                result.append(str);
            }
        }
    }
    
    public void header(Node left, Node right, String relative, StringBuilder result) throws IOException {
        if (!left.exists()) {
            right.checkFile();
            header('A', relative, result);
        } else if (!right.exists()) {
            header('R', relative, result);
        } else if (left.diff(right)) {
            header('M', relative, result);
        } else if (left.getMode() != right.getMode()) {
            header('m', relative, result);
        } else {
            // nothing
        }
    }

    private void header(char name, String relative, StringBuilder result) {
        header(new String("" + name), relative, result);
    }

    private void header(String name, String relative, StringBuilder result) {
        result.append(name).append(' ').append(relative).append('\n');
    }
}
