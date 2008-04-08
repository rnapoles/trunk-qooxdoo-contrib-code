/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.ui.typehierarchy;

import org.eclipse.jface.resource.JFaceResources;
import org.eclipse.jface.util.IPropertyChangeListener;
import org.eclipse.jface.util.PropertyChangeEvent;
import org.eclipse.jface.viewers.LabelProviderChangedEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IMember;
import org.eclipse.wst.jsdt.core.IMethod;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.ITypeHierarchy;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.internal.corext.util.MethodOverrideTester;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.AppearanceAwareLabelProvider;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.ColoredString;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.ColoredViewersManager;
import org.eclipse.wst.jsdt.ui.JavaElementLabels;

/**
 * Label provider for the hierarchy method viewers. 
 */
public class MethodsLabelProvider extends AppearanceAwareLabelProvider {
	
	private boolean fShowDefiningType;
	private TypeHierarchyLifeCycle fHierarchy;
	private MethodsViewer fMethodsViewer;
	private IPropertyChangeListener fColorRegistryListener;

	public MethodsLabelProvider(TypeHierarchyLifeCycle lifeCycle, MethodsViewer methodsViewer) {
		super(DEFAULT_TEXTFLAGS, DEFAULT_IMAGEFLAGS);
		fHierarchy= lifeCycle;
		fShowDefiningType= false;
		fMethodsViewer= methodsViewer;
		fColorRegistryListener= new IPropertyChangeListener() {
			public void propertyChange(PropertyChangeEvent event) {
				if (event.getProperty().equals(ColoredViewersManager.INHERITED_COLOR_NAME)) {
					fireLabelProviderChanged(new LabelProviderChangedEvent(MethodsLabelProvider.this, null));
				}
			}
		};
		JFaceResources.getColorRegistry().addListener(fColorRegistryListener);
	}
	
	public void setShowDefiningType(boolean showDefiningType) {
		fShowDefiningType= showDefiningType;
	}
	
	public boolean isShowDefiningType() {
		return fShowDefiningType;
	}	
			

	private IType getDefiningType(Object element) throws JavaModelException {
		int kind= ((IJavaElement) element).getElementType();
	
		if (kind != IJavaElement.METHOD && kind != IJavaElement.FIELD && kind != IJavaElement.INITIALIZER) {
			return null;
		}
		IType declaringType= ((IMember) element).getDeclaringType();
		if (kind != IJavaElement.METHOD) {
			return declaringType;
		}
		ITypeHierarchy hierarchy= fHierarchy.getHierarchy();
		if (hierarchy == null) {
			return declaringType;
		}
		IMethod method= (IMethod) element;
		MethodOverrideTester tester= new MethodOverrideTester(declaringType, hierarchy);
		IMethod res= tester.findDeclaringMethod(method, true);
		if (res == null || method.equals(res)) {
			return declaringType;
		}
		return res.getDeclaringType();
	}

	/* (non-Javadoc)
	 * @see ILabelProvider#getText
	 */ 	
	public String getText(Object element) {
		String text= super.getText(element);
		String qualifier= getQualifier(element);
		if (qualifier != null) {
			return qualifier + text;
		}
		return text;
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.internal.ui.viewsupport.JavaUILabelProvider#getRichTextLabel(java.lang.Object)
	 */
	public ColoredString getRichTextLabel(Object element) {
		ColoredString text= super.getRichTextLabel(element);
		String qualifier= getQualifier(element);
		if (qualifier != null) {
			return new ColoredString(qualifier).append(text);
		}
		return text;
		
	}
	
	private String getQualifier(Object element) {
		if (fShowDefiningType) {
			try {
				IType type= getDefiningType(element);
				if (type != null) {
					return super.getText(type) + JavaElementLabels.CONCAT_STRING;
				}
			} catch (JavaModelException e) {
			}
		}
		return null;
	}
	
	
	/* (non-Javadoc)
	 * @see org.eclipse.jface.viewers.IColorProvider#getForeground(java.lang.Object)
	 */
	public Color getForeground(Object element) {
		if (fMethodsViewer.isShowInheritedMethods() && element instanceof IMethod) {
			IMethod curr= (IMethod) element;
			IMember declaringType= curr.getDeclaringType();
			
			if (declaringType==null || !declaringType.equals(fMethodsViewer.getInput())) {
				return JFaceResources.getColorRegistry().get(ColoredViewersManager.INHERITED_COLOR_NAME);
			}
		}
		return null;
	}
	
	public void dispose() {
		JFaceResources.getColorRegistry().removeListener(fColorRegistryListener);
		fColorRegistryListener= null;
		super.dispose();
	}
	
}
