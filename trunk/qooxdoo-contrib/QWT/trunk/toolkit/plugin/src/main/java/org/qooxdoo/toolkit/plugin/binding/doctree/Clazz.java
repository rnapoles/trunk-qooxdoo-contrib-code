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

public class Clazz {
    public String name;
    public String interfaces;
    public String superClass;
    public String fullName;
    public String type;
    public String packageName;

    public String access;
    public String mixins;
    public String includer;
    public String childClasses;
    public String implementations;
    public boolean isAbstract;
    public boolean isInternal;
    public boolean isStatic;
    public boolean isSingleton;

    public Desc desc;
    public See see;
    public Deprecated deprecated;
    public Constructor constructor;
    public List<Constant> constants;
    public List<Event> events;
    public List<Method> methods;
    public List<Appearance> appearances;
    public List<Property> properties;
    public List<Error> errors;
}
