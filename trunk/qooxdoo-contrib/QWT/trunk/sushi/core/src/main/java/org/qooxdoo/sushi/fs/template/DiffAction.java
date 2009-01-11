package org.qooxdoo.sushi.fs.template;

import java.io.IOException;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.util.Diff;
import org.qooxdoo.sushi.util.Strings;

public class DiffAction extends Action {
    private final Node base;
    private final StringBuilder status;
    
    public DiffAction(Node base) {
        this.base = base;
        this.status = new StringBuilder();
    }
    
    @Override
    public void directory(Node dest) throws IOException {
    }

    @Override
    public void file(Node dest, String prev, String next, int mode) throws IOException {
        status.append("### ").append(dest.getRelative(base)).append('\n');
        if (prev == null) {
        	status.append(Strings.indent(next, "+ "));
        } else if (next != null) {
        	status.append(Diff.diff(prev, next));
        } else {
            status.append("[chmod " + Integer.toOctalString(mode) + "]\n");
        }
    }

    public String get() {
        return status.toString();
    }
}
