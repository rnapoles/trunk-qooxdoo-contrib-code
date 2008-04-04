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

package org.qooxdoo.sushi.io;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MultiOutputStream extends OutputStream {
    public static MultiOutputStream createNullStream() {
        return new MultiOutputStream();
    }

    public static MultiOutputStream createTeeStream(OutputStream ... dests) {
        MultiOutputStream result;
        
        result = new MultiOutputStream();
        result.dests.addAll(Arrays.asList(dests));
        return result;
    }
    
    private final List<OutputStream> dests;
    
    public MultiOutputStream() {
        dests = new ArrayList<OutputStream>();
    }

    public List<OutputStream> dests() {
        return dests;
    }

    //--
    
    @Override
    public void write(int c) throws IOException {
        for (OutputStream dest : dests) {
            dest.write(c);
        }
    }

    @Override
    public void flush() throws IOException {
        for (OutputStream dest : dests) {
            dest.flush();
        }
    }

    @Override
    public void close() throws IOException {
        for (OutputStream dest : dests) {
            dest.close();
        }
    }
}
