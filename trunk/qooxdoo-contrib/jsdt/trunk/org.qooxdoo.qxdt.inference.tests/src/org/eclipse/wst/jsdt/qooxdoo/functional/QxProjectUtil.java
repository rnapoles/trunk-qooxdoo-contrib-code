/*******************************************************************************
 * Deutsche Post Com GmbH Tulpenfeld 9 53113 Bonn Germany (c) Copyright 2008 by
 * Deutsche Post Com GmbH ALL RIGHTS RESERVED
 * -----------------------------------------------------------------------------
 * $Id: QxProjectUtil.java,v 1.0 Feb 19, 2008 user Exp $
 ******************************************************************************/
package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.wst.jsdt.core.IIncludePathEntry;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.internal.core.UserLibrary;
import org.eclipse.wst.jsdt.internal.ui.wizards.buildpaths.CPListElement;
import org.eclipse.wst.jsdt.internal.ui.wizards.buildpaths.CPUserLibraryElement;
import org.eclipse.wst.jsdt.launching.JavaRuntime;
import org.eclipse.wst.jsdt.qooxdoo.validation.Activator;
import org.eclipse.wst.jsdt.ui.project.JsNature;
import org.qooxdoo.qxdt.support.QxSupport;

import de.sammy.mkempka.ide.SammyIDE;

public class QxProjectUtil {

  private static final Path QX_JS = new Path( getLibBundleLocation() );

  public static void createUserLibrary( IJavaScriptProject jproject )
    throws CoreException
  {
    IIncludePathEntry[] entries = new IIncludePathEntry[ 0 ];
    UserLibrary library = new UserLibrary( entries, false );
    JsGlobalScopeContainerInitializer initializer = JavaScriptCore.getJsGlobalScopeContainerInitializer( JavaScriptCore.USER_LIBRARY_CONTAINER_ID );
    for( int i = 0; i < 1; i++ ) {
      CPListElement[] children = new CPListElement[]{
        new CPListElement( jproject, IIncludePathEntry.CPE_LIBRARY, QX_JS, null )
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
    URL result = Platform.getBundle( QxSupport.ID )
      .getEntry( "/libraries/qx.0.7.2.js" );
    try {
      result = FileLocator.resolve( result );
    } catch( IOException e ) {
      Activator.getDefault().log( e );
    }
    System.out.println( "Library location: " + result.getFile() );
    return result.getFile();
  }

  public static void addDefaultLibToLibraryPath( IProgressMonitor monitor,
                                                 IProject project )
    throws JavaScriptModelException
  {
    IJavaScriptProject jp = JavaScriptCore.create( project );
    List<IIncludePathEntry> cp = new ArrayList<IIncludePathEntry>();
    cp.add( JavaScriptCore.newSourceEntry( project.getFullPath() ) );
    cp.add( JavaScriptCore.newContainerEntry( JavaRuntime.newDefaultJREContainerPath() ) );
    cp.add( JavaScriptCore.newContainerEntry( new Path( "org.eclipse.wst.jsdt.USER_LIBRARY/myQx" ),
                                              false ) );
    cp.add( JavaScriptCore.newContainerEntry( new Path( "org.eclipse.wst.jsdt.launching.baseBrowserLibrary" ) ) );
    IPath outputLocation = project.getFolder( "bin" ).getFullPath();
    jp.setRawIncludepath( cp.toArray( new IIncludePathEntry[ cp.size() ] ),
                          outputLocation,
                          monitor );
  }

  public static IFile createQxFileWithContents( SammyIDE sammy,
                                                String fileName,
                                                String fileContents )
    throws CoreException, JavaScriptModelException
  {
    IProject project = sammy.createGenericProject();
    JsNature.addJsNature( project, new NullProgressMonitor() );
    addDefaultLibToLibraryPath( new NullProgressMonitor(), project );
    IFile result = project.getFile( fileName );
    result.create( new ByteArrayInputStream( fileContents.getBytes() ),
                   true,
                   new NullProgressMonitor() );
    createUserLibrary( JavaScriptCore.create( project ) );
    return result;
  }
}
/*******************************************************************************
 * $Log: QxProjectUtil.java,v $
 ******************************************************************************/
