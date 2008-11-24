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
        status.append("A " + dest.getRelative(base) + "/\n");
    }

    @Override
    public void file(Node dest, String prev, String next, int mode) throws IOException {
        if (prev == null) {
            status.append("A " + dest.getRelative(base) + "\n");
        } else if (next != null) {
            status.append("M " + dest.getRelative(base) + "\n");
        } else {
        	status.append("m " + dest.getRelative(base) + "\n");
        }
    }

    public String get() {
        return status.toString();
    }
}
