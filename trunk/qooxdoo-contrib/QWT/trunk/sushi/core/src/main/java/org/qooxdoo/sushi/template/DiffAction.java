package org.qooxdoo.sushi.template;

import java.io.IOException;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.util.Diff;

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
    public void file(Node dest, String prev, String next) throws IOException {
        if (prev == null) {
            return;
        }
        
        status.append("[[[" + dest.getRelative(base) + "]]]\n");
        status.append(Diff.diff(prev, next));
    }

    public String get() {
        return status.toString();
    }
}
