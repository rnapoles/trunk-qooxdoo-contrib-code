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

package org.qooxdoo.sushi.svn;

import java.io.IOException;

import org.qooxdoo.sushi.io.Filesystem;
import org.qooxdoo.sushi.io.IO;

public class SvnFilesystem extends Filesystem {
    public static final SvnFilesystem INSTANCE = new SvnFilesystem();
    
    private SvnFilesystem() {
        super("svn");
    }

    @Override
    public SvnNode parse(IO io, String str) throws IOException {
        return null; // TODO
    }
}
