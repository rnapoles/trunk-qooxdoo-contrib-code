/**
 *
 */
package org.eclipse.wst.jsdt.internal.ui.util;



import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtensionPoint;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;

import org.eclipse.wst.jsdt.core.IJavaProject;

import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;

import org.eclipse.wst.jsdt.core.JSDScopeUtil;

import org.eclipse.wst.jsdt.internal.ui.IJsGlobalScopeContainerInitializerExtension;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;



/**
 * @author childsb
 *
 */

/* (mostly) static methods to figure out classpath entries and container initializers *
 *
 */
public class JSDScopeUiUtil {

	private static final String CLASS="class";
	private static final String ID="id";
	
	public static IJsGlobalScopeContainerInitializerExtension findLibraryUiInitializer(IPath compUnitPath, IJavaProject javaProject) {
		System.out.println("public static IJsGlobalScopeContainerInitializerExtension findLibraryInitializer(");
		JsGlobalScopeContainerInitializer init =  JSDScopeUtil.findLibraryInitializer(compUnitPath,javaProject);
			return (IJsGlobalScopeContainerInitializerExtension)init;
	}

	public static IJsGlobalScopeContainerInitializerExtension getContainerUiInitializer(IPath compUnitPath) {
		try {
			IExtensionRegistry registry = Platform.getExtensionRegistry();
		    IExtensionPoint extensionPoint =  registry.getExtensionPoint("org.eclipse.wst.jsdt.ui.JsGlobalScopeUIInitializer");
		    IConfigurationElement points[] = extensionPoint.getConfigurationElements();
		 //   int[] priorities = new int[points.length];
		   
		    
		    
		    for(int i = 0;i < points.length;i++){
		    	String id = points[i].getAttribute(ID);
		    	if(id!=null && compUnitPath.equals(new Path(id))){
		    		Object o =  points[i].createExecutableExtension(CLASS);
		    		return (IJsGlobalScopeContainerInitializerExtension)o;
		    	}
		       
		    }
		    
		}catch(Exception e) {
			JavaPlugin.log( e);
		}
		return null;
		//IJsGlobalScopeContainerInitializer init = JSDScopeUtil.getContainerInitializer(compUnitPath);
		//System.out.println("public static IJsGlobalScopeContainerInitializerExtension getContainerInitializer(");
	//	return (IJsGlobalScopeContainerInitializerExtension)init;
		
	}
}
