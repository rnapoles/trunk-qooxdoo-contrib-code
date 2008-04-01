// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/Mork.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.mapping.Mapper;
import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.semantics.BuiltIn;
import de.mlhartme.mork.semantics.IllegalLiteral;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.Util;
import java.io.File;

/**
 * Global state, instances represent globale options. The this class forms a Java API
 * to Mork -- whereas the Main class forms a command-line interface. Use <code>Mork</code>
 */

public class Mork {
    /**
     * IO settings
     */
    public final Output output;

    /**
     * Maps mapper files into Specification objects.
     */
    private final MorkMapper mapperMapper;

    /**
     * Maps grammar files into Syntax objects.
     */
    private final MorkMapper grammarMapper;

    /**
     * Maps dtd files into Syntax objects.
     */
    private final MorkMapper dtdMapper;

    /**
     * Helper objects to generate class files.
     */
    private final MapperCompiler compiler;

    /**
     * Only defined during compile
     */
    private Job currentJob;

    public Mork(Output output, Function mapperFn) {
        this.output = output;
        this.mapperMapper = new MorkMapper(this, "de.mlhartme.mork.compiler.MapperMapper", mapperFn);
        this.grammarMapper = new MorkMapper(this, "de.mlhartme.mork.compiler.GrammarMapper");
        this.dtdMapper = new MorkMapper(this, "de.mlhartme.mork.xml.DtdMapper");
        this.compiler = new MapperCompiler(output);
        this.currentJob = null;
    }

    //-----------------------------------------------------------------------
    // the real functionality

    public boolean compile(Job job) {
        boolean result;

        currentJob = job;
        result = compileCurrent();
        currentJob = null;
        return result;
    }

    /** Helper for compile */
    private boolean compileCurrent() {
        Specification spec;
        Mapper result;

        output.normal(currentJob.source + ":");
        if (currentJob.listing != null) {
            output.openListing(currentJob.listing);
        }
        spec = (Specification) mapperMapper.invoke(currentJob.source);
        if (spec == null) {
            return false;
        }
        try {
            result = spec.translate(output);
            compiler.run(result, spec.getMapperName(), currentJob.source, currentJob.outputPath);
        } catch (GenericException e) {
            output.error(currentJob.source.getName(), e);
            return false;
        }
        return true;
    }

    //--------------------------------------------------------------------------------
    // load syntax

    public Syntax loadGrammar(String fileName) throws GenericException, IllegalLiteral {
        return loadSyntax(fileName, grammarMapper);
    }

    public Syntax loadDtd(String fileName) throws GenericException, IllegalLiteral {
        return loadSyntax(fileName, dtdMapper);
    }

    private Syntax loadSyntax(String fileName, MorkMapper mapper)
        throws GenericException, IllegalLiteral
    {
        File base;
        File file;
        Syntax syntax;

        fileName = BuiltIn.parseString(fileName);   // fileName use / on all platforms
        fileName = fileName.replace('/', File.separatorChar);
        file = Util.absoluteFile(currentJob.source.getParentFile(), fileName);
        syntax = (Syntax) mapper.invoke(file);
        if (syntax == null) {
            throw new GenericException("error(s) in syntax file - aborted");
        }
        return syntax;
    }
}
