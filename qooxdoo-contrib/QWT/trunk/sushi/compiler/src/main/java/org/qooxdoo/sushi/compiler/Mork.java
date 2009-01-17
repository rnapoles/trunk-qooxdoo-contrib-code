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

package org.qooxdoo.sushi.compiler;

import org.qooxdoo.sushi.mapping.Mapper;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.reflect.Function;
import org.qooxdoo.sushi.semantics.BuiltIn;
import org.qooxdoo.sushi.semantics.IllegalLiteral;
import org.qooxdoo.sushi.util.Util;
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
        this.mapperMapper = new MorkMapper(this, "org.qooxdoo.sushi.compiler.MapperMapper", mapperFn);
        this.grammarMapper = new MorkMapper(this, "org.qooxdoo.sushi.compiler.GrammarMapper");
        this.dtdMapper = new MorkMapper(this, "org.qooxdoo.sushi.xml.DtdMapper");
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

    private Syntax loadSyntax(String fileName, MorkMapper mapper) throws GenericException, IllegalLiteral {
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
