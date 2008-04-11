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

/** 
 * A file system root like the drive letter on Windows or the Host Name for HttpFilesystem. 
 * The root is not a node. A root node is a node with an empty path. 
 */
public interface Root {
    /** Backlink */
    Filesystem getFilesystem();
    
    String getId();
    
    /**
     * Creates a new node with no base. The path has already been checked syntactically. 
     * Never called with heading or tailing separator. The base of the resulting node must be null. 
     */
    Node node(String path);
}
