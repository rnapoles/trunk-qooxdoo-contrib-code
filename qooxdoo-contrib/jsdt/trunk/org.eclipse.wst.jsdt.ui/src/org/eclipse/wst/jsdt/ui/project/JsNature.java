package org.eclipse.wst.jsdt.ui.project;

import java.util.Arrays;
import java.util.Vector;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IProjectNature;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.jsdt.core.IClasspathEntry;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.LibrarySuperType;
import org.eclipse.wst.jsdt.internal.core.JavaProject;
import org.eclipse.wst.jsdt.internal.ui.JavaUIMessages;
import org.eclipse.wst.jsdt.ui.PreferenceConstants;

public class JsNature implements IProjectNature {
	//private static final String FILENAME_CLASSPATH = ".classpath"; //$NON-NLS-1$
	// private static final String NATURE_IDS[] =
	// {"org.eclipse.wst.jsdt.web.core.embeded.jsNature",JavaCore.NATURE_ID};
	// //$NON-NLS-1$
	private static final String NATURE_IDS[] = { JavaCore.NATURE_ID };
	private static final String SUPER_TYPE_NAME = JavaUIMessages.JsNature_Global;
	private static final String SUPER_TYPE_LIBRARY = "org.eclipse.wst.jsdt.launching.JRE_CONTAINER"; //$NON-NLS-1$
	
	public static void addJsNature(IProject project, IProgressMonitor monitor) throws CoreException {
		if (monitor != null && monitor.isCanceled()) {
			throw new OperationCanceledException();
		}
		if (!JsNature.hasNature(project)) {
			IProjectDescription description = project.getDescription();
			String[] prevNatures = description.getNatureIds();
			String[] newNatures = new String[prevNatures.length + JsNature.NATURE_IDS.length];
			System.arraycopy(prevNatures, 0, newNatures, 0, prevNatures.length);
			// newNatures[prevNatures.length] = JavaCore.NATURE_ID;
			for (int i = 0; i < JsNature.NATURE_IDS.length; i++) {
				newNatures[prevNatures.length + i] = JsNature.NATURE_IDS[i];
			}
			description.setNatureIds(newNatures);
			project.setDescription(description, monitor);
		} else {
			if (monitor != null) {
				monitor.worked(1);
			}
		}
	}
	
	public static boolean hasNature(IProject project) {
		try {
			for (int i = 0; i < JsNature.NATURE_IDS.length; i++) {
				if (!project.hasNature(JsNature.NATURE_IDS[i])) {
					return false;
				}
			}
		} catch (CoreException ex) {
			return false;
		}
		return true;
	}
	
	public static void removeJsNature(IProject project, IProgressMonitor monitor) throws CoreException {
		if (monitor != null && monitor.isCanceled()) {
			throw new OperationCanceledException();
		}
		if (JsNature.hasNature(project)) {
			IProjectDescription description = project.getDescription();
			String[] prevNatures = description.getNatureIds();
			String[] newNatures = new String[prevNatures.length - JsNature.NATURE_IDS.length];
			int k = 0;
			head: for (int i = 0; i < prevNatures.length; i++) {
				for (int j = 0; j < JsNature.NATURE_IDS.length; j++) {
					if (prevNatures[i] == JsNature.NATURE_IDS[j]) {
						continue head;
					}
				}
				newNatures[k++] = prevNatures[i];
			}
			description.setNatureIds(newNatures);
			project.setDescription(description, monitor);
		} else {
			if (monitor != null) {
				monitor.worked(1);
			}
		}
	}
	private Vector classPathEntries = new Vector();
	private boolean DEBUG = false;
	private IProject fCurrProject;
	private JavaProject fJavaProject;
	private IPath fOutputLocation;
	private IProgressMonitor monitor;
	
	public JsNature() {
		monitor = new NullProgressMonitor();
	}
	
	public JsNature(IProject project, IProgressMonitor monitor) {
		fCurrProject = project;
		if (monitor != null) {
			this.monitor = monitor;
		} else {
			monitor = new NullProgressMonitor();
		}
	}
	
	public void configure() throws CoreException {
		
		initOutputPath();
		createSourceClassPath();
		initJREEntry();
		initLocalClassPath();
		if (hasProjectClassPathFile()) {
			IClasspathEntry[] entries = getRawClassPath();
			if (entries != null && entries.length > 0) {
				classPathEntries.removeAll(Arrays.asList(entries));
				classPathEntries.addAll(Arrays.asList(entries));
			}
		}
		JsNature.addJsNature(fCurrProject, monitor);
		fJavaProject = (JavaProject) JavaCore.create(fCurrProject);
		fJavaProject.setProject(fCurrProject);
		try {
			// , fOutputLocation
			if (!hasProjectClassPathFile()) {
				fJavaProject.setRawClasspath((IClasspathEntry[]) classPathEntries.toArray(new IClasspathEntry[] {}), fOutputLocation, monitor);
			}
			if (hasProjectClassPathFile()) {
				fJavaProject.setRawClasspath((IClasspathEntry[]) classPathEntries.toArray(new IClasspathEntry[] {}), monitor);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		LibrarySuperType superType = new LibrarySuperType(new Path( SUPER_TYPE_LIBRARY),  getJavaProject(), SUPER_TYPE_NAME);
		getJavaProject().setCommonSuperType(superType);
		// getJavaProject().addToBuildSpec(BUILDER_ID);
		fCurrProject.refreshLocal(IResource.DEPTH_INFINITE, monitor);
	}
	
	private void createSourceClassPath() {
		if (hasAValidSourcePath()) {
			return;
		}
		// IPath projectPath = fCurrProject.getFullPath();
		// classPathEntries.add(JavaCore.newSourceEntry(projectPath));
	}
	
	public void deconfigure() throws CoreException {
		Vector badEntries = new Vector();
		IClasspathEntry[] defaultJRELibrary = PreferenceConstants.getDefaultJRELibrary();
		IClasspathEntry[] localEntries = initLocalClassPath();
		badEntries.addAll(Arrays.asList(defaultJRELibrary));
		badEntries.addAll(Arrays.asList(localEntries));
		IClasspathEntry[] entries = getRawClassPath();
		Vector goodEntries = new Vector();
		for (int i = 0; i < entries.length; i++) {
			if (!badEntries.contains(entries[i])) {
				goodEntries.add(entries[i]);
			}
		}
		// getJavaProject().removeFromBuildSpec(BUILDER_ID);
		IPath outputLocation = getJavaProject().getOutputLocation();
		getJavaProject().setRawClasspath((IClasspathEntry[]) goodEntries.toArray(new IClasspathEntry[] {}), outputLocation, monitor);
		getJavaProject().deconfigure();
		JsNature.removeJsNature(fCurrProject, monitor);
		fCurrProject.refreshLocal(IResource.DEPTH_INFINITE, monitor);
	}
	
	
	
	public JavaProject getJavaProject() {
		if (fJavaProject == null) {
			fJavaProject = (JavaProject) JavaCore.create(fCurrProject);
			fJavaProject.setProject(fCurrProject);
		}
		return fJavaProject;
	}
	
	public IProject getProject() {
		return this.fCurrProject;
	}
	
	private IClasspathEntry[] getRawClassPath() {
		JavaProject proj = new JavaProject();
		proj.setProject(fCurrProject);
		return proj.readRawClasspath();
	}
	
	private boolean hasAValidSourcePath() {
		if (hasProjectClassPathFile()) {
			try {
				IClasspathEntry[] entries = getRawClassPath();
				for (int i = 0; i < entries.length; i++) {
					if (entries[i].getEntryKind() == IClasspathEntry.CPE_SOURCE) {
						return true;
					}
				}
			} catch (Exception e) {
				if (DEBUG) {
					System.out.println("Error checking sourcepath:" + e); //$NON-NLS-1$
				}
			}
		}
		return false;
	}
	
	private boolean hasProjectClassPathFile() {
		if (fCurrProject == null) {
			return false;
		}
		return fCurrProject.getFolder(JavaProject.DEFAULT_PREFERENCES_DIRNAME).getFile(JavaProject.CLASSPATH_FILENAME).exists();
	}
	
	private void initJREEntry() {
		IClasspathEntry[] defaultJRELibrary = PreferenceConstants.getDefaultJRELibrary();
		try {
			IClasspathEntry[] entries = getRawClassPath();
			for (int i = 0; i < entries.length; i++) {
				if (entries[i] == defaultJRELibrary[0]) {
					return;
				}
			}
			classPathEntries.add(defaultJRELibrary[0]);
		} catch (Exception e) {
			if (DEBUG) {
				System.out.println("Error checking sourcepath:" + e); //$NON-NLS-1$
			}
		}
	}
	
	private IClasspathEntry[] initLocalClassPath() {
		
		
		
		
		//IPath webRoot = WebRootFinder.getWebContentFolder(fCurrProject);
		IClasspathEntry source = JavaCore.newSourceEntry(fCurrProject.getFullPath().append("/")); //$NON-NLS-1$
	//	classPathEntries.add(source);
		return new IClasspathEntry[] {source};
	}
	
	private void initOutputPath() {
		if (fOutputLocation == null) {
			fOutputLocation = fCurrProject.getFullPath();
		}
	}
	
	public void setProject(IProject project) {
		this.fCurrProject = project;
	}
}
