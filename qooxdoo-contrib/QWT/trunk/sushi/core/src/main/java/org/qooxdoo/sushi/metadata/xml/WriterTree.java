/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.metadata.xml;

import java.io.IOException;
import java.io.Writer;

public class WriterTree extends Tree {
    private final Writer dest;
    private int indent;
    
    public WriterTree(Writer dest) {
        this.dest = dest;
        this.indent = 0;
    }

    @Override
    public Writer done() throws IOException {
        if (indent != 0) {
            throw new IllegalStateException("" + indent);
        }
        dest.flush();
        return dest;
    }

    @Override
    public void begin(String name, int children) throws IOException {
        indent();
        indent++;
        dest.write("<");
        dest.write(name);
        if (children == 0) {
            dest.write("/>\n");
        } else {
            dest.write(">\n");
        }
    }

    @Override
    public void end(String name) throws IOException {
        --indent;
        indent();
        dest.write("</");
        dest.write(name);
        dest.write(">\n");
    }

    @Override
    public void text(String name, String text) throws IOException {
        indent();
        dest.write('<');
        dest.write(name);
        dest.write('>');
        dest.write(org.qooxdoo.sushi.xml.Serializer.escapeEntities(text));
        dest.write("</");
        dest.write(name);
        dest.write(">\n");
    }

    private void indent() throws IOException {
        for (int i = 0; i < indent; i++) {
            dest.write("  ");
        }
    }
}
