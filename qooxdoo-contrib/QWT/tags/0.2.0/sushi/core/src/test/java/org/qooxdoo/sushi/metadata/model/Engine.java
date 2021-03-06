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

package org.qooxdoo.sushi.metadata.model;

import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Engine {
    @Value boolean turbo;
    @Value int ps;
    
    public Engine() {
        this(false, 0);
    }

    public Engine(boolean turbo, int ps) {
        this.turbo = turbo;
        this.ps = ps;
    }

    public boolean getTurbo() {
        return turbo;
    }
    
    public void setTurbo(boolean turbo) {
        this.turbo = turbo;
    }

    public int getPs() {
        return ps;
    }
    
    public void setPs(int ps) {
        this.ps = ps;
    }
}
