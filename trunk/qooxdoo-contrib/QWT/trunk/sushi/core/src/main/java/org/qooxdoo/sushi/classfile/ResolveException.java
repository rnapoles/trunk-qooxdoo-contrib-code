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

package org.qooxdoo.sushi.classfile;

import java.io.IOException;

public class ResolveException extends Exception {
    public final Reference ref;
    
    public ResolveException(Reference ref) {
        super(ref.toString());
        
        this.ref = ref;
    }
    
    public ResolveException(Reference ref, IOException e) {
        this(ref);

        initCause(e);
    }
}
