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

package org.qooxdoo.sushi.fs.ssh;

import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class TimedOutputStream extends FilterOutputStream {
    private long started;
    public long duration;

    public TimedOutputStream(OutputStream out) {
        super(out);
        this.started = System.currentTimeMillis();
        this.duration = 0;
    }
    
    @Override
    public void close() throws IOException {
        super.close();
        if (duration == 0) {
            duration = System.currentTimeMillis() - started;
        } else {
            // already closed
        }
    }
}
