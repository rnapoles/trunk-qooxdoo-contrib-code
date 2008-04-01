// §{{header}}:
//
// This is file src/de/mlhartme/mork/regexpr/Action.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.regexpr;

/** stores the result from visiting a node */

public abstract class Action {
    public abstract Object range(char first, char last);
    public abstract Object symbol(int symbol);

    public abstract Object choice(Object[] body);
    public abstract Object sequence(Object[] body);
    public abstract Object loop(Object body);
    public abstract Object without(Object left, Object right);
}
