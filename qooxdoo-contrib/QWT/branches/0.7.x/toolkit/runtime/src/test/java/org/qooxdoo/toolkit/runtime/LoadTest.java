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

package org.qooxdoo.toolkit.runtime;

import org.junit.Test;

import org.qooxdoo.toolkit.repository.JavaScriptEngine;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;

public class LoadTest extends Base2 {
    @Test
    public void load() throws Exception {
        expr("0", ANY, 0.0);
        
        final Repository repository = lastCompileRepository;
        JavaScriptEngine engine;

        for (Module module : repository) {
            engine = new JavaScriptEngine(repository);
            engine.load(module);
        }
    }
}
