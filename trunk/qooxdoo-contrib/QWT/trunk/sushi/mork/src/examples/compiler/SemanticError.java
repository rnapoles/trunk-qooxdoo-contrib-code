// §{{header}}:
//
// This is file examples/compiler/SemanticError.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

/**
 * Checked exception do indicate semantic errors (e.g. "undefined identifiered").
 */
public class SemanticError extends Exception {
    public SemanticError(String msg) {
        super(msg);
    }
}
