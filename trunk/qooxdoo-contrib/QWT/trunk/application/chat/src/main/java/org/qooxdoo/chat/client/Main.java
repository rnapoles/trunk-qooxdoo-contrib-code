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
import qx.event.type.DataEvent;
import qx.ui.basic.Label;
import qx.ui.form.Button;
import qx.ui.form.TextArea;
import qx.ui.form.TextField;
import qx.ui.layout.HorizontalBoxLayout;
import qx.ui.layout.VerticalBoxLayout;

public class Main extends Gui implements EventListener {
    private final RoomService room;
    private final Listener person;
    
    private final TextArea messages;
    private final TextField name;
    private final TextField text;
    private Button send;
    
    public Main(RoomService room) {
        this.messages = new TextArea();
        this.name = new TextField();
        this.text = new TextField();
        this.room = room;
        this.person = new Listener(messages);

        room.enter(person);
        if (false) {  // TODO: force reference
            room.say("hi");
        }
    }
    
    @Override
    public void main() {
        VerticalBoxLayout all;
        HorizontalBoxLayout bottom;
        
        super.main();

        this.send = new Button("Send");

        all = new VerticalBoxLayout();
        messages.setValue(room.getMessages());
        messages.setHeight(400);
        messages.setWidth(600);
        all.add(messages);
        bottom = new HorizontalBoxLayout();
        name.setValue("your name");
        bottom.add(name);
        bottom.add(new Label(": "));
        bottom.add(text);
        bottom.add(send);
        all.add(bottom);
        all.addToDocument();
        send.addExecuteListener(this);
    }

    public void notify(DataEvent obj) {
        String message;
        
        message = name.getValue() + ": " + text.getValue();
        text.setValue("");
        System.out.println("message: " + message);
        room.say(message);
    }
}
