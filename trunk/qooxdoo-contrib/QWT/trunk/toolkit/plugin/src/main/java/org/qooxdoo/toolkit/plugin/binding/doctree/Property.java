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

package org.qooxdoo.toolkit.plugin.binding.doctree;

import java.util.List;

public class Property {
    public List<Desc> desc;
    public Deprecated deprecated;
    public List<Entry> types;
    
    public String propertyType;
    public String inheritable;
    public String mode;
    public String type;
    public String defaultValue;
    public String event;
    public String group;
    public String apply;
    public String docFrom;
    public String name;
    public String overriddenFrom;
    public String oldProperty;
    public boolean allowNull;
    public boolean isMixin;
    public String check;
    public String possibleValue;
    public String refine;
    public boolean themeable;
}
