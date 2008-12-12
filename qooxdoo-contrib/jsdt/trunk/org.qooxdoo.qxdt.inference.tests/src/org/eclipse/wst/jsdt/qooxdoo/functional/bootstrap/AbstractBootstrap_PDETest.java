package org.eclipse.wst.jsdt.qooxdoo.functional.bootstrap;

import java.io.ByteArrayInputStream;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.AbstractFileContentsValidates_PDETest;

/**
 * Is a {@link AbstractFileContentsValidates_PDETest}, but ensures that there
 * is a file in the project that defines qx.Bootstrap.
 * 
 * @version $Id: AbstractBootstrap_PDETest.java,v 1.0 May 15, 2008 12:38:07 PM user
 *          Exp $
 */
public abstract class AbstractBootstrap_PDETest
  extends AbstractFileContentsValidates_PDETest
{

  private String bootstrapDefSource = "qx.Class.define(\"qx.Bootstrap\", {});";

  @Override
  protected void modifyProject( IProject project ) throws CoreException {
    IFile bootstrapDefinition = project.getFile( "bootstrap.js" );
    assertFalse( bootstrapDefinition.exists() );
    bootstrapDefinition.create( new ByteArrayInputStream( bootstrapDefSource.getBytes() ),
                            IResource.FORCE,
                            new NullProgressMonitor() );
  }
}
