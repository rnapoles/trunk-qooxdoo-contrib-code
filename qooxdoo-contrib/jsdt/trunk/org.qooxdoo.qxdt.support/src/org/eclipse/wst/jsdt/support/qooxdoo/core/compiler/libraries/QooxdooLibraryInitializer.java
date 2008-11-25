package org.eclipse.wst.jsdt.support.qooxdoo.core.compiler.libraries;

import java.util.ArrayList;
import java.util.Enumeration;

import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.core.compiler.libraries.LibraryLocation;
import org.eclipse.wst.jsdt.core.compiler.libraries.SystemLibraryLocation;
import org.osgi.framework.Bundle;
import org.qooxdoo.qxdt.support.QxSupport;

public class QooxdooLibraryInitializer
  extends JsGlobalScopeContainerInitializer
{

  protected static final String PLUGIN_ID = "org.qooxdoo.qxdt.support";
  private static final String ContainerDescription = "Qooxdoo Class Library";

  public QooxdooLibraryInitializer() {
  }

  public LibraryLocation getLibraryLocation() {
    return new SystemLibraryLocation() {

      @Override
      public char[][] getLibraryFileNames() {
        ArrayList<char[]> result = new ArrayList<char[]>();
        Bundle bundle = QxSupport.getDefault().getBundle();
        Enumeration<String> entryPaths = ( Enumeration<String> )bundle.getEntryPaths( "/libraries/" );
        while( entryPaths.hasMoreElements() ) {
          IPath each = new Path( entryPaths.nextElement() );
          if( !each.lastSegment().startsWith( "." ) ) {
            result.add( each.lastSegment().toCharArray() );
          }
        }
        return result.toArray( new char[ result.size() ][ 0 ] );
      }

      @Override
      protected String getPluginId() {
        return PLUGIN_ID;
      }
    };
  }

  public String getDescription( IPath containerPath, IJavaScriptProject project )
  {
    return containerPath.lastSegment();
  }

  public String getDescription() {
    return ContainerDescription;
  }

  /*
   * (non-Javadoc)
   * @see org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer#getKind()
   */
  public int getKind() {
    return IJsGlobalScopeContainer.K_SYSTEM;
  }

  public boolean canUpdateJsGlobalScopeContainer( IPath containerPath,
                                                  IJavaScriptProject project )
  {
    return true;
  }
}
