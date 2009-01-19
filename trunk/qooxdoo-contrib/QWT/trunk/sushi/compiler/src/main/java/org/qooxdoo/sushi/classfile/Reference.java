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

public abstract class Reference {
    public abstract ClassRef getOwner();
    
    public Definition resolve(Repository repository) throws ResolveException {
        Definition def;
        
        def = lookup(repository);
        if (def == null) {
            throw new ResolveException(this); 
        }
        return def;
    }
    
    public abstract Definition lookup(Repository repository) throws ResolveException;
}
