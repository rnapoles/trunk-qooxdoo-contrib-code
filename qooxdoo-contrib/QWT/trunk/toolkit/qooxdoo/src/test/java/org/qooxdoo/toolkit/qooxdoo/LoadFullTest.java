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

package org.qooxdoo.toolkit.qooxdoo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.rhino.QooxdooEngine;

// JUnit Parameters doesn't print proper test names
@RunWith(Modules.class)
public class LoadFullTest {
    private final IO io;
    private final Module module;
    
    public LoadFullTest(IO io, Module module) {
        this.io = io;
        this.module = module;
    }

    @Test
    public void run() throws Exception {
        QooxdooEngine engine;

        engine = new QooxdooEngine(io);
        engine.load(module);
    }
}
