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

package org.qooxdoo.toolkit.compiler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.ITypeBinding;

import org.qooxdoo.toolkit.repository.Chunk;
import org.qooxdoo.toolkit.repository.Importer;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;

public class Context {
    public final List<Problem> problems;
    
    /** all known modules: from classpath, from js sourcepath, and compiled */
    private final Repository repository;
    
    /** modules added by the compiler. Includes imported modules. Subset of "repository". */
    private final Repository compiled;

    private final Map<AbstractTypeDeclaration, Module> types;
    private final Naming naming;
    
    public Context(Repository repository) {
        this.problems = new ArrayList<Problem>();
        this.repository = repository;
        this.compiled = new Repository();
        this.types = new HashMap<AbstractTypeDeclaration, Module>();
        this.naming = new Naming();
    }

    public void createModules(List<CompilationUnit> all) {
        for (CompilationUnit cu : all) {
            for (Object obj : cu.types()) {
                createModule((AbstractTypeDeclaration) obj);
            }
        }
    }

    private void createModule(AbstractTypeDeclaration type) {
        String name;
        Module module;
        Importer nativ;
        
        name = naming.typeQualified(type.resolveBinding());
        module = new Module(name);
        repository.add(module);
        compiled.add(module);
        module.setDirect(Util.isDirect(type));
        nativ = Util.getAnnotationNative(type);
        if (nativ != null) {
            Chunk cinit;
            
            cinit = module.createCinit();
            module.add(cinit);
            nativ.require(module.head().deps.names());
            nativ.post(cinit.deps.names());
            module.head().addCode(nativ.content);
        }
        types.put(type, module);
        for (Object obj : type.bodyDeclarations()) {
            if (obj instanceof AbstractTypeDeclaration) {
                createModule((AbstractTypeDeclaration) obj);
            }
        }
    }

    public Module lookup(AbstractTypeDeclaration type) {
        return types.get(type);
    }
    
    public boolean isDirect(ITypeBinding type) {
        String name;
        
        name = naming.typeQualified(type);
        return name != null && repository.get(name).getDirect();
    }

    public Naming getNaming() {
        return naming;
    }
    
    public Repository getRepository() {
        return repository;
    }

    public Repository getCompiled() {
        return compiled;
    }
}
