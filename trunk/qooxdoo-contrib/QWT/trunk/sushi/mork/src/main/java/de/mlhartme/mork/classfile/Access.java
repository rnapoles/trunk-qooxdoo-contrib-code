// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Access.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

/**
 * ACC_ constants from Java Virtual Machine Specification.
 */

public interface Access {
    int PUBLIC       = 0x0001;
    int PRIVATE      = 0x0002;
    int PROTECTED    = 0x0004;
    int STATIC       = 0x0008;
    int FINAL        = 0x0010;
    int SYNCHRONIZED = 0x0020;
    int VOLATILE     = 0x0040;
    int TRANSIENT    = 0x0080;
    int NATIVE       = 0x0100;
    int ABSTRACT     = 0x0400;

    // access flags in class file
    int SUPER        = 0x0020;
    int INTERFACE    = 0x0200;
}
