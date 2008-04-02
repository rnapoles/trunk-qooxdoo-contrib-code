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

package org.qooxdoo.sushi.metadata.model;

import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Option;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Radio {
    @Value private boolean cd;
    @Value private int speaker;
    @Option private String pin;
    
    public Radio() {
    }
    
    public boolean getCd() {
        return cd;
    }
    
    public void setCd(boolean cd) {
        this.cd = cd;
    }
    
    public int getSpeaker() {
        return speaker;
    }
    
    public void setSpeaker(int speaker) {
        this.speaker = speaker;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
