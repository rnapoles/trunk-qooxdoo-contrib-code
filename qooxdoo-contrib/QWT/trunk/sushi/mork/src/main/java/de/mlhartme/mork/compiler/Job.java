// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/Job.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.util.GenericException;
import java.io.File;

/**
 * A compile job. TODO: invoke mork from here; parsing the command line results
 * in an array of Job, the main class should become real thin.
 */

public class Job {
    /** source file, never null */
    public final File source;

    /** listing file, null for no listing */
    public final File listing;

    /**
     * -d argument that applies to this file. Null if not specified,
     * otherwise an existing directory.
     */
    public final File outputPath;

    public static final String SRC_SUFFIX = ".map";
    public static final String LST_SUFFIX = ".lst";

    /**
     * @param srcName name of the source file.
     */
    public Job(String srcName) throws GenericException {
        this(null, false, srcName);
    }

    public Job(String outputPathName, boolean listing, String srcName)
        throws GenericException
    {
        String baseName;

        if (outputPathName == null) {
            this.outputPath = null;
        } else {
            this.outputPath = new File(outputPathName);
            if (!outputPath.isDirectory()) {
                throw new GenericException("no such directory: " + outputPath);
            }
        }

        this.source = new File(srcName);
        if (srcName.endsWith(SRC_SUFFIX)) {
            baseName = srcName.substring(0, srcName.length() - SRC_SUFFIX.length());
        } else {
            baseName = srcName;
        }
        if (listing) {
            this.listing = new File(baseName + LST_SUFFIX);
        } else {
            this.listing = null;
        }
    }

    @Override
    public boolean equals(Object obj) {
        Job job;

        if (obj instanceof Job) {
            job = (Job) obj;

            return  source.equals(job.source)
                && eq(listing, job.listing) && eq(outputPath, job.outputPath);
        } else {
            return false;
        }
    }

    private static boolean eq(File a, File b) {
        if (a != null) {
            return a.equals(b);
        } else {
            return b == null;
        }
    }

    @Override
    public String toString() {
        return "source=" + source + " listing=" + listing + " output=" + outputPath;
    }
}
