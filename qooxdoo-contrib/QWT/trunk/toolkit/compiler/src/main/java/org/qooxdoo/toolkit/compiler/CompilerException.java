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

package org.qooxdoo.toolkit.compiler;

import java.util.List;

public class CompilerException extends RuntimeException {
    private final List<Problem> problems;
    
    public CompilerException(List<Problem> problems) {
        super(toString(problems));
        
        this.problems = problems;
    }

    public List<Problem> problems() {
        return problems;
    }
    
    public Problem first() {
        return problems.isEmpty() ? null : problems.get(0);
    }
    
    private static String toString(List<Problem> problems) {
        StringBuilder builder;
        
        builder = new StringBuilder();
        for (Problem p : problems) {
            builder.append('\n');
            builder.append(p.toString());
        }
        return builder.toString();
    }
}
