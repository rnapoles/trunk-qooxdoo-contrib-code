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

package java.lang;

import java.io.IOException;

public interface Appendable {
    Appendable append(char c) throws IOException;
    Appendable append(CharSequence cs) throws IOException;
    Appendable append(CharSequence cs, int start, int end) throws IOException;
}
