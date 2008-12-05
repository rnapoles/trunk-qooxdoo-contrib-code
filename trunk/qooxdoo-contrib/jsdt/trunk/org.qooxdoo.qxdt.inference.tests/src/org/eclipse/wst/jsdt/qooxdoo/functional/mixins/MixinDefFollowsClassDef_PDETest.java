package org.eclipse.wst.jsdt.qooxdoo.functional.mixins;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.ContentAssistAssert;
import org.junit.Test;

import de.sammy.mkempka.ide.operators.TextEditorOperator;

public class MixinDefFollowsClassDef_PDETest extends AbstractMixin_PDETest {

	private final String fileContents = "qx.Class.define(\"my.cool.Class\", {\n"
			+ "    include :MyMixin\n"
			+ "});\n"
			+ "var b = new my.cool.Class()\n" + "b.mixedInMethod();\n\n\n";
	private final String mixinDefinition = "qx.Mixin.define(\"MyMixin\", {\n"
			+ "    members : {\n" + "        mixedInMethod : function() {\n"
			+ "        }\n" + "    }\n" + "})\n";

	@Override
	protected void modifyProject(IProject project) throws CoreException {
		super.modifyProject(project);
		IFile file = project.getFile("Aaamixindefinition.js");
		assertFalse(file.exists());
		file.create(new ByteArrayInputStream(mixinDefinition.getBytes()),
				IResource.FORCE, new NullProgressMonitor());
	}

	@Test
	public void checkExistenceViaContentAssist() throws Exception {
		getSammy().openEditor(new FileEditorInput(getFile()));
		TextEditorOperator teo = new TextEditorOperator(getFileName(),
				getProperties());
		teo.setCurserAfter("b.");
		teo.triggerAutoCompletion();
		ContentAssistAssert
				.assertAutoCompletionResultsContain("mixedInMethod(");
	}

	@Override
	protected String getFileContents() {
		return fileContents;
	}

	/* is called from generic test method in supertype */
	@Override
	protected List<IMarker> getErrorMarkers(TextEditorOperator teo)
			throws CoreException {
		return teo.getMarkers(IMarker.SEVERITY_ERROR);
	}

}
