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

package org.qooxdoo.sushi.xml;

/**
 * <p>Xml processing stuff. Not thread-save - every thread should have it's own instance. </p>
 */
public class Xml {
    public final Builder builder;
    public final Selector selector;
    public final Serializer serializer;
    
    public Xml() {
        this.builder = new Builder();
        this.selector = new Selector();
        this.serializer = new Serializer();
    }
}
