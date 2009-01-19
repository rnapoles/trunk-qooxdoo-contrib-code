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

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;

public class RepositoryTest {
    private IO io;
    private Repository repository;
    
    public RepositoryTest() throws IOException {
        io = new IO();
        repository = new Repository();
        repository.addLazy(io.locateClasspathItem(Object.class));
    }

    @Test
    public void resolvePrimitive() throws Exception {
        assertNull(repository.lookup("byte"));        
    }
    
    @Test
    public void resolveInterfaceMethod() throws Exception {
        ClassDef oo;
        MethodRef m;
        
        oo = repository.lookup("java.io.ObjectOutput");        
        assertNotNull(oo);
        m = new MethodRef(oo.reference(), false, ClassRef.VOID, "writeUTF", ClassRef.STRING);
        assertNotNull(m.resolve(repository));
    }
}
