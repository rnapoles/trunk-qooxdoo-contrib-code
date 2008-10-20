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

import org.qooxdoo.sushi.fs.file.FileNode;

/** 
 * Shutdown hock delete temporary java.io.File (inparticular: directories, because 
 * deleteAtExist is restricted to files).
 * 
 * The implementation is intentionally tied to FileNode, it doesn't work for files because:
 * 1) I create temp file on disk only - I can't see a use case for other node implementations.   
 * 2) node.delete() is might fail because server connections might already be closed
 */
public class TempFiles implements Runnable {
    /** null if the exit task has already been started */
    private List<FileNode> delete;

    /** null if the exit task has already been executed */
    private final Random rand;
    
    public TempFiles() {
        this.delete = new ArrayList<FileNode>();
        this.rand = new Random();
    }

    public synchronized int random() {
        return rand.nextInt();
    }
    
    /**
     * @param node  file or directory
     */
    public synchronized void deleteAtExit(FileNode node) {
        if (delete == null) {
            // already exiting
            tryDelete(node);
        } else {
            delete.add(node);
        }
    }

    public synchronized void run() {
        List<FileNode> tmp;
        
        tmp = delete;
        delete = null;
        for (FileNode node : tmp) {
        	tryDelete(node);
        }
    }

    private boolean tryDelete(FileNode node) {
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
