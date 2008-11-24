package org.qooxdoo.sushi.template;

import java.io.IOException;

import org.qooxdoo.sushi.fs.Node;

public class StatusAction extends Action {
    private final Node base;
    private final StringBuilder status;
    
    public StatusAction(Node base) {
        this.base = base;
        this.status = new StringBuilder();
    }
    
    @Override
    public void directory(Node dest) throws IOException {
    	add('A', dest);
    }

    @Override
    public void file(Node dest, String prev, String next, int mode) throws IOException {
        if (prev == null) {
        	add('A', dest);
        } else if (next != null) {
        	add('M', dest);
        } else {
        	add('m', dest);
        }
    }

    private void add(char flag, Node dest) throws IOException {
        status.append(flag).append(' ').append(dest.getRelative(base)).append('\n');
    }

    public String get() {
        return status.toString();
    }
}
