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

public class Method {
    public Desc desc;
    public List<Param> params;
    public Return return_;
    public See see;
    
    public String access;
    public String fromProperty;
    public String overriddenFrom;
    public String apply;
    public String name;
    public String docFrom;
    public boolean isInternal;
    public boolean isMixin;
    public boolean isStatic;
    public boolean isAbstract;
    public boolean isCtor;
}
