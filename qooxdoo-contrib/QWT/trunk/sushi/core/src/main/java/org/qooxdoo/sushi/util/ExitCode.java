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

package org.qooxdoo.sushi.util;

import java.io.IOException;
import java.util.List;

/** indicates a processes terminating with a non-zero result */
public class ExitCode extends IOException {
    private static final long serialVersionUID = 2L;
    
    public final List<String> call;
    public final int code;
    public final String output;
    
    public ExitCode(List<String> call, int code) {
        this(call, code, "");
    }

    public ExitCode(List<String> call, int code, String output) {
        super(call.get(0) + " failed with exit code " + code + ", output: " + output.trim());
        
        this.call = call;
        this.code = code;
        this.output = output;
    }
}
