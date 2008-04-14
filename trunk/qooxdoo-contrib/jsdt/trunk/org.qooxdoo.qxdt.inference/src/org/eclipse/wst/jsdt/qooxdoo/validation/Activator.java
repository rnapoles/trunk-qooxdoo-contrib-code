package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.preferences.InstanceScope;
import org.eclipse.ui.plugin.AbstractUIPlugin;
import org.eclipse.wst.jsdt.ui.PreferenceConstants;
import org.osgi.framework.BundleContext;

/**
 * The activator class controls the plug-in life cycle
 */
public class Activator extends AbstractUIPlugin {

  // The plug-in ID
  public static final String PLUGIN_ID = "org.qooxdoo.qxdt.inference";
  // The shared instance
  private static Activator plugin;

  /**
   * The constructor
   */
  public Activator() {
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.eclipse.ui.plugin.AbstractUIPlugin#start(org.osgi.framework.BundleContext)
   */
  public void start( BundleContext context ) throws Exception {
    super.start( context );
    new InstanceScope().getNode( "org.eclipse.wst.jsdt.ui" ).putBoolean( PreferenceConstants.CODEASSIST_ADDIMPORT, false );
    plugin = this;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.eclipse.ui.plugin.AbstractUIPlugin#stop(org.osgi.framework.BundleContext)
   */
  public void stop( BundleContext context ) throws Exception {
    plugin = null;
    super.stop( context );
  }

  /**
   * Returns the shared instance
   * 
   * @return the shared instance
   */
  public static Activator getDefault() {
    return plugin;
  }

  public void log( Exception exception ) {
    String msg = exception.getMessage();
    if( msg == null ) {
      msg = new String();
    }
    getDefault().getLog().log( new Status( IStatus.ERROR, PLUGIN_ID, msg ) );
  }
}
