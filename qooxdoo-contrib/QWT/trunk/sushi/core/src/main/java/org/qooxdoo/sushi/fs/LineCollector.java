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

package org.qooxdoo.sushi.fs;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LineCollector extends LineProcessor {
    private final List<String> result;
    
    public LineCollector() {
        this(LineProcessor.INITIAL_BUFFER_SIZE);
    }
    
    public LineCollector(int size) {
        super(size);
        
        result = new ArrayList<String>();
    }

    public List<String> collect(Node node) throws IOException {
        run(node);
        return result;
    }

    @Override
    public void line(String line) {
        result.add(line);
    }
}
