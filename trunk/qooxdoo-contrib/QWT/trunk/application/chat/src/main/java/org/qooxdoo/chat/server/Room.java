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

package org.qooxdoo.chat.server;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.chat.common.PersonService;
import org.qooxdoo.chat.common.RoomService;

public class Room implements RoomService {
    private List<String> messages;
    private List<PersonService> persons;
    
    public Room() {
        messages = new ArrayList<String>();
        persons = new ArrayList<PersonService>();
    }

    public void enter(PersonService person) {
        persons.add(person);
    }
    
    public void say(String message) {
        messages.add(message);
        for (PersonService person : persons) {
            person.notify(message);
        }
    }
}
