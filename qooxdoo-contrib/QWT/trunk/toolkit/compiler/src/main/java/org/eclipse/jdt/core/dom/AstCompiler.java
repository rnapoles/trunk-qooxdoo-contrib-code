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

package org.eclipse.jdt.core.dom;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;
import org.eclipse.jdt.internal.compiler.CompilationResult;
import org.eclipse.jdt.internal.compiler.Compiler;
import org.eclipse.jdt.internal.compiler.ICompilerRequestor;
import org.eclipse.jdt.internal.compiler.IErrorHandlingPolicy;
import org.eclipse.jdt.internal.compiler.ast.CompilationUnitDeclaration;
import org.eclipse.jdt.internal.compiler.env.AccessRestriction;
import org.eclipse.jdt.internal.compiler.env.INameEnvironment;
import org.eclipse.jdt.internal.compiler.env.ISourceType;
import org.eclipse.jdt.internal.compiler.impl.CompilerOptions;
import org.eclipse.jdt.internal.compiler.lookup.PackageBinding;
import org.eclipse.jdt.internal.compiler.util.HashtableOfObject;
import org.eclipse.jdt.internal.compiler.util.Messages;
import org.eclipse.jdt.internal.core.BasicCompilationUnit;
import org.eclipse.jdt.internal.core.CancelableProblemFactory;
import org.eclipse.jdt.internal.core.SourceTypeElementInfo;
import org.eclipse.jdt.internal.core.util.CommentRecorderParser;

public class AstCompiler extends Compiler {
    /*
     * The sources that were requested. Map from file name (char[]) to
     * ICompilationUnit.
     */
    private HashtableOfObject requestedSources;

    private DefaultBindingResolver.BindingTables bindingTables;

    public AstCompiler(INameEnvironment environment, CompilerOptions compilerOptions) {
        super(environment, getHandlingPolicy(), compilerOptions,
                getRequestor(), new CancelableProblemFactory(null));
    }

    private static IErrorHandlingPolicy getHandlingPolicy() {
        return new IErrorHandlingPolicy() {
            public boolean stopOnFirstError() {
                return false;
            }

            public boolean proceedOnErrors() {
                return false; // stop if there are some errors
            }
        };
    }

    private static ICompilerRequestor getRequestor() {
        return new ICompilerRequestor() {
            public void acceptResult(CompilationResult compilationResult) {
                // do nothing
            }
        };
    }

    @Override
    public void accept(ISourceType[] sourceTypes,
            PackageBinding packageBinding, AccessRestriction accessRestriction) {
        // Need to reparse the entire source of the compilation unit so as to
        // get source positions
        // (case of processing a source that was not known by beginToCompile
        // (e.g. when asking to createBinding))
        SourceTypeElementInfo sourceType = (SourceTypeElementInfo) sourceTypes[0];
        accept((ICompilationUnit) sourceType.getHandle().getCompilationUnit(),
                accessRestriction);
    }

    /**
     * Add the initial set of compilation units into the loop -> build
     * compilation unit declarations, their bindings and record their results.
     */
    private void doBeginToCompile(ICompilationUnit[] sourceUnits) {
        int sourceLength = sourceUnits.length;
        int maxUnits = sourceLength;
        this.totalUnits = 0;
        this.unitsToProcess = new CompilationUnitDeclaration[maxUnits];
        int index = 0;

        // walks the source units
        this.requestedSources = new HashtableOfObject();
        for (int i = 0; i < sourceLength; i++) {
            ICompilationUnit sourceUnit = sourceUnits[i];
            CompilationUnitDeclaration parsedUnit;
            CompilationResult unitResult = new CompilationResult(sourceUnit,
                    index++, maxUnits, this.options.maxProblemsPerUnit);
            try {
                if (options.verbose) {
                    this.out.println(Messages.bind(
                            Messages.compilation_request, new String[] {
                                    String.valueOf(index++ + 1),
                                    String.valueOf(maxUnits),
                                    new String(sourceUnit.getFileName()) }));
                }
                // diet parsing for large collection of units
                if (this.totalUnits < this.parseThreshold) {
                    parsedUnit = this.parser.parse(sourceUnit, unitResult);
                } else {
                    parsedUnit = this.parser.dietParse(sourceUnit, unitResult);
                }
                // initial type binding creation
                this.lookupEnvironment
                        .buildTypeBindings(parsedUnit, null /*
                                                             * no access
                                                             * restriction
                                                             */);
                addCompilationUnit(sourceUnit, parsedUnit);
                this.requestedSources.put(unitResult.getFileName(), sourceUnit);
            } finally {
                sourceUnits[i] = null; // no longer hold onto the unit
            }
        }

        lookupEnvironment.completeTypeBindings();
    }

    @Override
    public void initializeParser() {
        this.parser = new CommentRecorderParser(this.problemReporter, false);
    }

    @Override
    public void process(CompilationUnitDeclaration unit, int i) {
        // don't resolve a second time the same unit (this would create the same
        // binding twice)
        if (!this.requestedSources.containsKey(unit.compilationResult
                .getFileName())) {
            super.process(unit, i);
        }
    }

    public static final String FILE_NAME = "toolkit.src.filename";

    public static final String CONTENTS = "toolkit.src.contents";

    public List<CompilationUnit> resolve(ICompilationUnit[] sourceUnits,
            int apiLevel, Map<?, ?> compilerOptions) {
        CompilationUnitDeclaration unit;
        List<CompilationUnit> result;

        this.bindingTables = new DefaultBindingResolver.BindingTables();
        result = new ArrayList<CompilationUnit>();
        doBeginToCompile(sourceUnits);
        // process all units (some more could be injected in the loop by the
        // lookup environment)
        for (int i = 0; i < this.totalUnits; i++) {
            if (this.requestedSources.size() == 0) {
                // no need to keep resolving if no more ASTs are needed
                // see https://bugs.eclipse.org/bugs/show_bug.cgi?id=114935
                // cleanup remaining units
                for (; i < this.totalUnits; i++) {
                    this.unitsToProcess[i].cleanUp();
                    this.unitsToProcess[i] = null;
                }
                break;
            }
            unit = this.unitsToProcess[i];
            try {
                super.process(unit, i); // this.process(...) is optimized to not
                                        // process already known units

                // requested AST
                char[] fileName = unit.compilationResult.getFileName();
                BasicCompilationUnit source = (BasicCompilationUnit) this.requestedSources
                        .get(fileName);
                if (source != null) {
                    // convert AST
                    CompilationResult compilationResult = unit.compilationResult;
                    ICompilationUnit sourceUnit = compilationResult.compilationUnit;
                    char[] contents = sourceUnit.getContents();
                    AST ast = AST.newAST(apiLevel);
                    ast.setDefaultNodeFlag(ASTNode.ORIGINAL);
                    ASTConverter converter = new ASTConverter(compilerOptions,
                            true/* need to resolve bindings */, null);
                    BindingResolver resolver = new DefaultBindingResolver(
                            unit.scope, null, this.bindingTables);
                    ast.setBindingResolver(resolver);
                    converter.setAST(ast);
                    CompilationUnit compilationUnit = converter.convert(unit,
                            contents);
                    compilationUnit.setProperty(FILE_NAME, new String(unit
                            .getFileName()));
                    compilationUnit.setProperty(CONTENTS, new String(source
                            .getContents()));
                    // TODO compilationUnit.setJavaElement(source);
                    compilationUnit.setLineEndTable(compilationResult.getLineSeparatorPositions());
                    ast.setDefaultNodeFlag(0);
                    ast.setOriginalModificationCount(ast.modificationCount());
                    result.add(compilationUnit);
                }

                // remove at the end so that we don't resolve twice if a source and a key for the same file name have been requested
                this.requestedSources.removeKey(fileName);
            } finally {
                // cleanup compilation unit result
                unit.cleanUp();
            }
            this.unitsToProcess[i] = null; // release reference to processed unit declaration
            this.requestor.acceptResult(unit.compilationResult.tagAsAccepted());
        }
        return result;
    }
}
