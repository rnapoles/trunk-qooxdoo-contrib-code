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

package org.qooxdoo.sushi.metadata.store;

import java.util.List;
import java.util.Properties;

import org.qooxdoo.sushi.metadata.Item;

public class PropertyStore implements Store {
    private final Properties props;
    
    public PropertyStore(Properties props) {
        this.props = props;
    }
    
    public String read(List<Item<?>> parents, String path) {
        return props.getProperty(path);
    }

    public void write(List<Item<?>> parents, String path, String value) {
        props.put(path, value);
    }
}
