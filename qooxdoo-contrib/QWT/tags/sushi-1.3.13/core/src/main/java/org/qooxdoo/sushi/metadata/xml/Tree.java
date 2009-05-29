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

package org.qooxdoo.sushi.metadata.xml;

import java.io.IOException;

public abstract class Tree {
    public abstract Object done() throws IOException;
    
    public abstract void ref(String name, int idref) throws IOException;
    public abstract void begin(String name, int id, String typeAttribute, boolean withEnd) throws IOException;
    public abstract void end(String name) throws IOException;
    public abstract void text(String name, String typeAttribute, String text) throws IOException;
}
