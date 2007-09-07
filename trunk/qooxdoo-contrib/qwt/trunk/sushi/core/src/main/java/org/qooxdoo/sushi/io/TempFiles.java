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

package org.qooxdoo.sushi.io;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class TempFiles extends Thread {
    /** null if the exit task has already been started */
    private List<FileNode> delete;

    /** null if the exit task has already been executed */
    private final Random rand;
    
    public TempFiles() {
        super("TempFilesAtExit");
        
        this.delete = new ArrayList<FileNode>();
        this.rand = new Random();
    }

    public synchronized int random() {
        return rand.nextInt();
    }
    
    /**
     * @param file  file or directory
     */
    public synchronized void deleteAtExit(FileNode node) {
        if (delete == null) {
            // already exiting
            tryDelete(node);
        } else {
            delete.add(node);
        }
    }

    @Override
    public synchronized void run() {
        List<FileNode> tmp;
        
        tmp = delete;
        delete = null;
        for (FileNode node : tmp) {
            if (node.exists()) {
                try {
                    node.delete();
                } catch (IOException e) {
                    // ignored
                }
            }
        }
    }

    private void tryDelete(FileNode node) {
        if (node.exists()) {
            try {
                node.delete();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
