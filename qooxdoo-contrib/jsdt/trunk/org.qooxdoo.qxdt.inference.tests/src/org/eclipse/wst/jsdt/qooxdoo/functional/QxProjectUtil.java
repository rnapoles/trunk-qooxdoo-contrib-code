/*******************************************************************************
 * Deutsche Post Com GmbH Tulpenfeld 9 53113 Bonn Germany (c) Copyright 2008 by
 * Deutsche Post Com GmbH ALL RIGHTS RESERVED
 * -----------------------------------------------------------------------------
 * $Id: QxProjectUtil.java,v 1.0 Feb 19, 2008 user Exp $
 ******************************************************************************/
package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.wst.jsdt.core.IClasspathEntry;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.internal.core.UserLibrary;
import org.eclipse.wst.jsdt.internal.ui.wizards.buildpaths.CPListElement;
import org.eclipse.wst.jsdt.internal.ui.wizards.buildpaths.CPUserLibraryElement;
import org.eclipse.wst.jsdt.launching.JavaRuntime;
import org.eclipse.wst.jsdt.qooxdoo.validation.Activator;

public class QxProjectUtil {

  private static final Path QX_JS = new Path( getLibBundleLocation() );

  public static void createUserLibrary( IJavaProject jproject )
    throws CoreException
  {
    IClasspathEntry[] entries = new IClasspathEntry[ 0 ];
    UserLibrary library = new UserLibrary( entries, false );
    JsGlobalScopeContainerInitializer initializer = JavaCore.getJsGlobalScopeContainerInitializer( JavaCore.USER_LIBRARY_CONTAINER_ID );
    for( int i = 0; i < 1; i++ ) {
      CPListElement[] children = new CPListElement[]{
        new CPListElement( jproject, IClasspathEntry.CPE_LIBRARY, QX_JS, null )
      };
      CPUserLibraryElement element = new CPUserLibraryElement( "myQx",
                                                               false,
                                                               children );
      IPath path = element.getPath();
      IJsGlobalScopeContainer updatedContainer = element.getUpdatedContainer();
      initializer.requestJsGlobalScopeContainerUpdate( path,
                                                       jproject,
                                                       updatedContainer );
    }
  }

  private static String getLibBundleLocation() {
    URL result = Platform.getBundle( "org.eclipse.wst.jsdt.support.qooxdoo" )
      .getEntry( "/libraries/qx.0.7.2.js" );
    try {
      result = FileLocator.resolve( result );
    } catch( IOException e ) {
      Activator.getDefault().log( e );
    }
    System.out.println( "Bundle location: " + result.getFile() );
    return result.getFile();
  }

  public static void addDefaultLibToLibraryPath( NullProgressMonitor monitor,
                                                 IProject project )
    throws JavaModelException
  {
    IJavaProject jp = JavaCore.create( project );
    List<IClasspathEntry> cp = new ArrayList<IClasspathEntry>();
    cp.add( JavaCore.newSourceEntry( project.getFullPath() ) );
    cp.add( JavaCore.newContainerEntry( JavaRuntime.newDefaultJREContainerPath() ) );
    cp.add( JavaCore.newContainerEntry( new Path( "org.eclipse.wst.jsdt.USER_LIBRARY/myQx" ),
                                        false ) );
    IPath outputLocation = project.getFolder( "bin" ).getFullPath();
    jp.setRawClasspath( cp.toArray( new IClasspathEntry[ cp.size() ] ),
                        outputLocation,
                        monitor );
  }

  public static void addJSDTNature( final IProgressMonitor monitor,
                                    final IProject project )
    throws CoreException
  {
    IProjectDescription desc = project.getDescription();
    String[] natures = desc.getNatureIds();
    String[] newNatures = new String[ natures.length + 1 ];
    System.arraycopy( natures, 0, newNatures, 1, natures.length );
    newNatures[ 0 ] = "org.eclipse.wst.jsdt.core.jsNature";
    desc.setNatureIds( newNatures );
    project.setDescription( desc, new SubProgressMonitor( monitor, 500 ) );
  }
}
/*******************************************************************************
 * $Log: QxProjectUtil.java,v $
 ******************************************************************************/
