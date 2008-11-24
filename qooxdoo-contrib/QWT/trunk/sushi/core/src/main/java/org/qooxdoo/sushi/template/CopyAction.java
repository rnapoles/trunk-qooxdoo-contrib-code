package org.qooxdoo.sushi.template;

import java.io.IOException;

import org.qooxdoo.sushi.fs.Node;

public class CopyAction extends Action {
    @Override
    public void directory(Node dest) throws IOException {
        dest.mkdirsOpt();
    }

    @Override
    public void file(Node dest, String prev, String next, int mode) throws IOException {
        if (next != null) {
        	dest.writeString(next);
        }
        dest.setMode(mode);
    }
}
