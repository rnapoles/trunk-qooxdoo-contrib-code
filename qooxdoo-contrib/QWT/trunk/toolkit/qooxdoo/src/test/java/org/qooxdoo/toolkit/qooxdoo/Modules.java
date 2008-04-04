package org.qooxdoo.toolkit.qooxdoo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

import org.junit.Assert;
import org.junit.internal.runners.ClassRoadie;
import org.junit.internal.runners.CompositeRunner;
import org.junit.internal.runners.InitializationError;
import org.junit.internal.runners.JUnit4ClassRunner;
import org.junit.internal.runners.MethodValidator;
import org.junit.internal.runners.TestClass;
import org.junit.runner.notification.RunNotifier;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;

public class Modules extends CompositeRunner {
    private final TestClass modulesTest;

    public Modules(Class<?> klass) throws Exception {
        super(klass.getName());

        IO io;
        Repository repository;
        
        io = new IO();
        repository = Qooxdoo.load(io).repository;

        modulesTest= new TestClass(klass);
        
        MethodValidator methodValidator= new MethodValidator(modulesTest);
        methodValidator.validateStaticMethods();
        methodValidator.validateInstanceMethods();
        methodValidator.assertValid();
        
        for (Module module : repository) {
            if (module.getName().startsWith("qx.")) {
                add(new ModuleRunner(modulesTest, io, module));
            }
        }
    }
    
    @Override
    public void run(final RunNotifier notifier) {
        new ClassRoadie(notifier, modulesTest, getDescription(), new Runnable() {
            public void run() {
                runChildren(notifier);
            }
        }).runProtected();
    }
    
    public static class ModuleRunner extends JUnit4ClassRunner {
        private final IO io;
        private final Module module;
        private final Constructor<?> create;

        ModuleRunner(TestClass testClass, IO io, Module module) throws InitializationError {
            super(testClass.getJavaClass());

            this.io = io;
            this.module = module;
            this.create= getOnlyConstructor();
        }

        @Override
        protected Object createTest() throws Exception {
            return create.newInstance(io, module);
        }
        
        @Override
        protected String getName() {
            return String.format(module.getName());
        }
        
        @Override
        protected String testName(final Method method) {
            return String.format(module.getName() + "." + method.getName());
        }

        private Constructor<?> getOnlyConstructor() {
            Constructor<?>[] constructors= getTestClass().getJavaClass().getConstructors();
            Assert.assertEquals(1, constructors.length);
            return constructors[0];
        }
        
        @Override
        protected void validate() throws InitializationError {
            // do nothing: validated before.
        }
        
        @Override
        public void run(RunNotifier notifier) {
            runMethods(notifier);
        }
    }
}
