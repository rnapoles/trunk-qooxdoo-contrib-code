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


package org.qooxdoo.chat.client;

import org.qooxdoo.chat.common.ListenerService;

import qx.ui.form.TextArea;

public class Listener implements ListenerService {
    private final TextArea messages;
    
    public Listener(TextArea history) {
        this.messages = history;
    }
    
    public void hear(String message) {
        String str;
        
        str = (String) messages.getValue();
        str = str + message + "\n";
        messages.setValue(str);
    }
}
