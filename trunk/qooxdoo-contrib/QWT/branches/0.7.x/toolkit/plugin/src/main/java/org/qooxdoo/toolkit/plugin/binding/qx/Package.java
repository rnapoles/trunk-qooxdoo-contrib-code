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

package org.qooxdoo.toolkit.plugin.binding.qx;

import java.util.List;

import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.binding.java.Set;

public class Package {
    public String packageName;
    public String fullName;
    public String name;
    public List<Package> packages;
    public List<Clazz> clazzes;
    public Desc desc;
    
    public void addJava(Set dest) throws XmlException {
        for (Clazz c : clazzes) {
            dest.add(c.createJava());
        }
        for (Package p : packages) {
            p.addJava(dest);
        }
    }
}
