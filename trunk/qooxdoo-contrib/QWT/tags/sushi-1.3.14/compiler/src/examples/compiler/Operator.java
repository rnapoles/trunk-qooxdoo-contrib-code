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

package compiler;

public interface Operator {
    int ADD =  0;
    int SUB =  1;
    int MUL =  2;
    int DIV =  3;

    int AND =  5;
    int OR  =  6;

    int EQ  =  8;
    int NE  =  9;
    int LT  = 10;
    int GT  = 11;
    int LE  = 12;
    int GE  = 13;
}
