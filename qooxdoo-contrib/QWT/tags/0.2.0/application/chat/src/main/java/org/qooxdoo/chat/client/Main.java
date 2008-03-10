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

package org.qooxdoo.chat.client;

import org.qooxdoo.chat.common.RoomService;
import org.qooxdoo.toolkit.qooxdoo.EventListener;

import qx.application.Gui;
import qx.event.type.Event;
import qx.event.type.KeyEvent;
import qx.ui.basic.Label;
import qx.ui.core.ClientDocument;
import qx.ui.form.Button;
import qx.ui.form.TextArea;
import qx.ui.form.TextField;
import qx.ui.layout.HorizontalBoxLayout;
import qx.ui.layout.VerticalBoxLayout;

public class Main extends Gui implements EventListener {
    private final RoomService room;
    private final Listener listener;
    
    private final TextArea messages;
    private final TextField name;
    private TextField text;
    private Button send;
    
    public Main(RoomService room) {
        this.messages = new TextArea();
        this.name = new TextField();
        this.text = new TextField();
        this.room = room;
        this.send = new Button("Send");
        this.listener = new Listener(messages);
        messages.setValue(room.enter(listener));
    }
    
    @Override
    public void main() {
        VerticalBoxLayout all;
        HorizontalBoxLayout bottom;
        
        super.main();

        ClientDocument.getInstance().addJavaEventListener("keydown", this);
        
        name.setValue(room.nextUser());
        name.focus();
        text.setValue("Hi!");
        send.addExecuteListener(this);
        all = new VerticalBoxLayout();
        all.setHeight("auto");
        all.setWidth("auto");
        messages.setReadOnly(true);
        messages.setHeight(400);
        messages.setWidth(400);
        all.add(messages);
        bottom = new HorizontalBoxLayout();
        bottom.setHeight("auto");
        bottom.setWidth("auto");
        bottom.add(name);
        bottom.add(new Label(": "));
        bottom.add(text);
        bottom.add(send);
        all.add(bottom);
        all.addToDocument();
    }

    public void notify(Event obj) {
        String message;
        KeyEvent ke;
        
        if (obj instanceof KeyEvent) {
            ke = (KeyEvent) obj;
            if (!"Enter".equals(ke.getKeyIdentifier())) {
                return;
            }
        }
        // force value updates:
        text.blur();
        name.blur();

        message = name.getValue() + ": " + text.getValue();
        text.setValue("");
        text.focus();
        room.say(message);
    }
}
