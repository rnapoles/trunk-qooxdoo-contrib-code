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

package org.qooxdoo.hello.client;

import org.qooxdoo.toolkit.qooxdoo.EventListener;
import org.qooxdoo.toolkit.qooxdoo.Util;

import qx.application.Gui;
import qx.event.type.Event;
import qx.ui.form.Button;

public class Main extends Gui implements EventListener {
    @Override
    public void main() {
        Button button;
        
        super.main();
        
        button = new Button("Your first button", "images/button.png");
        button.setTop(50);
        button.setLeft(50);

        button.addToDocument();

        button.addExecuteListener(this);
    }

    public void notify(Event obj) {
        Util.alert("Hello, World!");
    }
}
