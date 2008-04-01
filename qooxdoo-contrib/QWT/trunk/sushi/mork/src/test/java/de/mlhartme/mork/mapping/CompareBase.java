// §{{header}}:
//
// This is file tests/junit/de/mlhartme/mork/mapping/CompareBase.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import java.util.ArrayList;
import java.util.List;

import junit.framework.TestCase;

import org.qooxdoo.sushi.util.IntArrayList;

import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.Compare;
import de.mlhartme.mork.semantics.Type;

public abstract class CompareBase extends TestCase implements Compare {
    protected Attribute attr;

    public CompareBase() {
        super();

        attr = new Attribute(0, "dummy", new Type(String.class));
    }

    public List attrs(int n) {
        List l;

        l = new ArrayList();
        for (; n > 0; n--) {
            l.add(attr);
        }
        return l;
    }

    public IntArrayList ofs(int a) {
        IntArrayList l;

        l = new IntArrayList();
        l.add(a);
        return l;
    }

    public IntArrayList ofs(int a, int b) {
        IntArrayList l;

        l = new IntArrayList();
        l.add(a);
        l.add(b);
        return l;
    }

    public IntArrayList ofs(int a, int b, int c) {
        IntArrayList l;

        l = new IntArrayList();
        l.add(a);
        l.add(b);
        l.add(c);
        return l;
    }
}
