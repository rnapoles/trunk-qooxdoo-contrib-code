// §{{header}}:
//
// This is file examples/compiler/Operator.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

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
