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

package org.qooxdoo.toolkit.qooxdoo;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;
import org.qooxdoo.toolkit.rhino.QooxdooEngine;

@RunWith(Parameterized.class)
public class LoadFullTest {
    private static IO io;
    private static Repository repository;
    
    @Parameters
    public static List<Module[]> modules() {
        List<Module[]> modules;
        
        io = new IO();
        repository = Qooxdoo.load(io).repository;
        modules = new ArrayList<Module[]>();
        for (Module module : repository) {
            if (module.getName().startsWith("qx.")) {
                modules.add(new Module[] { module });
            }
        }
        return modules;
    }
    
    //--
    
    private Module module;
    
    public LoadFullTest(Module module) {
        this.module = module;
    }

    public String getName() {
        return "name " + module.getName();
    }
    
    public String toString() {
        return "toString " + module.getName();
    }
    
    @Test
    public void run() throws Exception {
        QooxdooEngine engine;

        engine = new QooxdooEngine(io);
        engine.load(module);
    }
}
