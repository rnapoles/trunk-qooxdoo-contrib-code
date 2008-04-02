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

package org.qooxdoo.chat.server;

import org.qooxdoo.toolkit.qooxdoo.Server;

public class Main extends Server {
    private final Room room;
    
    public Main() {
        room = new Room();
        System.out.println("created chat room");
    }
    
    @Override
    public void stop() {
        System.out.println("server stop");
    }

    @Override
    public Object clientStart() {
        System.out.println("client start");
        return room;
    }

    @Override
    public void clientStop() {
        System.out.println("client stop");
    }
}
