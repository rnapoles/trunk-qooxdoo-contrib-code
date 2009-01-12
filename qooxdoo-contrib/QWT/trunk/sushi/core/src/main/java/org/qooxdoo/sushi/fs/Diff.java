package org.qooxdoo.sushi.fs;

import java.io.IOException;

import org.qooxdoo.sushi.fs.filter.Filter;
import org.qooxdoo.sushi.util.Strings;

public class Diff {
    private final boolean brief;
    private final Filter filter;

    public Diff(Filter filter) {
        this(true, filter);
    }

    public Diff(boolean brief, Filter filter) {
        this.brief = brief;
        this.filter = filter;
    }

    public String directory(Node leftdir, Node rightdir) throws IOException {
        StringBuilder result;
        String relative;
        Node left;
        
        result = new StringBuilder();
        leftdir.checkDirectory();
        rightdir.checkDirectory();
        for (Node right : rightdir.find(filter)) {
            relative = right.getRelative(rightdir);
            left = leftdir.join(relative);
            if (left.isDirectory()) {
                if (right.isDirectory()) {
                    // ok
                } else if (right.isFile()) {
                    throw new IOException("TODO");
                } else {
                    if (brief) {
                        header('A', relative, result);
                    } else {
                        // TODO
                    }
                }
            } else if (right.isDirectory()) {
                header("A", relative, result);
            } else {
                file(left, right, relative, result);
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
