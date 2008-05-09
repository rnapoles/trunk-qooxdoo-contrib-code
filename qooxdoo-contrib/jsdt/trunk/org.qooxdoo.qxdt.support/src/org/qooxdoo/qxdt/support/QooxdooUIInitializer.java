package org.qooxdoo.qxdt.support;

import org.eclipse.core.runtime.IPath;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.internal.ui.IJsGlobalScopeContainerInitializerExtension;

public class QooxdooUIInitializer
  implements IJsGlobalScopeContainerInitializerExtension
{

  public ImageDescriptor getImage( IPath containerPath,
                                   String element,
                                   IJavaScriptProject project )
  {
    return ImageDescriptor.createFromFile( this.getClass(), "QooxdooSmall.png" );
  }
}
