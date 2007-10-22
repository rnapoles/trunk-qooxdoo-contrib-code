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

package org.qooxdoo.toolkit.repository;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.io.Node;

public class MissingIndexException extends RepositoryException {
    public final Repository repository;
    public final List<Node> lst;
    
    public MissingIndexException(Repository repository, Node src) {
        super(src.toString());
        this.repository = repository;
        this.lst = new ArrayList<Node>();
        this.lst.add(src);
    }
}
