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

import org.junit.Test;

import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;
import org.qooxdoo.toolkit.rhino.QooxdooEngine;
import org.qooxdoo.sushi.io.IO;

public class LoadFullTest {
    @Test
    public void load() throws Exception {
        IO io;
        Repository repository;
        QooxdooEngine engine;

        io = new IO();
        repository = Qooxdoo.load(io).repository;
        for (Module module : repository) {
            if (module.getName().startsWith("qx.")) {
                engine = new QooxdooEngine(io);
                try {
                    engine.load(module);
                } catch (Exception e) {
                    throw new RuntimeException(module.getName(), e);
                }
            }
        }
    }
}
