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

package org.qooxdoo.sushi.fs;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class TempFiles implements Runnable {
    /** null if the exit task has already been started */
    private List<Node> delete;

    /** null if the exit task has already been executed */
    private final Random rand;
    
    public TempFiles() {
        this.delete = new ArrayList<Node>();
        this.rand = new Random();
    }

    public synchronized int random() {
        return rand.nextInt();
    }
    
    /**
     * @param node  file or directory
     */
    public synchronized void deleteAtExit(Node node) {
        if (delete == null) {
            // already exiting
            tryDelete(node);
        } else {
            delete.add(node);
        }
    }

    public synchronized void run() {
        List<Node> tmp;
        
        tmp = delete;
        delete = null;
        for (Node node : tmp) {
        	tryDelete(node);
        }
    }

    private boolean tryDelete(Node node) {
        try {
        	if (node.exists()) {
                node.delete();
        	}
        	return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
