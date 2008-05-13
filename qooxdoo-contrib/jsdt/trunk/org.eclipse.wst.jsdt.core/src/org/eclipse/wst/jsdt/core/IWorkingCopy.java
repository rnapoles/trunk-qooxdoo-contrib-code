/*******************************************************************************
 * Copyright (c) 2000, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.core;

import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.IProgressMonitor;

/**
 * Common protocol for Java elements that support working copies.
 * <p>
 * A working copy of a Java element acts just like a regular element (handle),
 * except it is not attached to an underlying resource. A working copy is not
 * visible to the rest of the Java model. Changes in a working copy's
 * buffer are not realized in a resource. To bring the Java model up-to-date with a working
 * copy's contents, an explicit commit must be performed on the working copy.
 * Other operations performed on a working copy update the
 * contents of the working copy's buffer but do not commit the contents
 * of the working copy.
 * </p>
 * <p>
 * Note: The contents of a working copy is determined when a working
 * copy is created, based on the current content of the element the working
 * copy is created from. If a working copy is an <code>IOpenable</code> and is explicitly
 * closed, the working copy's buffer will be thrown away. However, clients should not
 * explicitly open and close working copies.
 * </p>
 * <p>
 * The client that creates a working copy is responsible for
 * destroying the working copy. The Java model will never automatically
 * destroy or close a working copy. (Note that destroying a working copy
 * does not commit it to the model, it only frees up the memory occupied by
 * the element). After a working copy is destroyed, the working copy cannot
 * be accessed again. Non-handle methods will throw a
 * <code>JavaScriptModelException</code> indicating the Java element does not exist.
 * </p>
 * <p>
 * A working copy cannot be created from another working copy.
 * Calling <code>getWorkingCopy</code> on a working copy returns the receiver.
 * </p>
 * <p>
 * This interface is not intended to be implemented by clients.
 * </p>
 * @deprecated Use {@link IJavaScriptUnit} instead
 *  
 * Provisional API: This class/interface is part of an interim API that is still under development and expected to 
 * change significantly before reaching stability. It is being made available at this early stage to solicit feedback 
 * from pioneering adopters on the understanding that any code that uses this API will almost certainly be broken 
 * (repeatedly) as the API evolves.
 */
public interface IWorkingCopy {

	/**
	 * Commits the contents of this working copy to its original element
	 * and underlying resource, bringing the Java model up-to-date with
	 * the current contents of the working copy.
	 *
	 * <p>It is possible that the contents of the original resource have changed
	 * since this working copy was created, in which case there is an update conflict.
	 * The value of the <code>force</code> parameter effects the resolution of
	 * such a conflict:<ul>
	 * <li> <code>true</code> - in this case the contents of this working copy are applied to
	 * 	the underlying resource even though this working copy was created before
	 *	a subsequent change in the resource</li>
	 * <li> <code>false</code> - in this case a <code>JavaScriptModelException</code> is thrown</li>
	 * </ul>
	 * <p>
	 * Since 2.1, a working copy can be created on a not-yet existing compilation
	 * unit. In particular, such a working copy can then be committed in order to create
	 * the corresponding compilation unit.
	 * </p>
	 * @param force a flag to handle the cases when the contents of the original resource have changed
	 * since this working copy was created
	 * @param monitor the given progress monitor
	 * @exception JavaScriptModelException if this working copy could not commit. Reasons include:
	 * <ul>
	 * <li> A <code>CoreException</code> occurred while updating an underlying resource
	 * <li> This element is not a working copy (INVALID_ELEMENT_TYPES)
	 * <li> A update conflict (described above) (UPDATE_CONFLICT)
	 * </ul>
	 * @deprecated Use {@link IJavaScriptUnit#commitWorkingCopy(boolean, IProgressMonitor)} instead.
	 */
	void commit(boolean force, IProgressMonitor monitor) throws JavaScriptModelException;

	/**
	 * Destroys this working copy, closing its buffer and discarding
	 * its structure. Subsequent attempts to access non-handle information
	 * for this working copy will result in <code>IJavaModelException</code>s. Has
	 * no effect if this element is not a working copy.
	 * <p>
	 * If this working copy is shared, it is destroyed only when the number of calls to
	 * <code>destroy()</code> is the same as the number of calls to <code>
	 * getSharedWorkingCopy(IProgressMonitor, IBufferFactory)</code>.
	 * </p><p>
	 * When it is destroyed, a REMOVED IJavaScriptElementDelta is reported on this
	 * working copy.
	 * </p>
	 * @deprecated Use {@link IJavaScriptUnit#discardWorkingCopy()} instead.
	 */
	void destroy();

	/**
	 * Finds the shared working copy for this element, given a <code>IBuffer</code> factory.
	 * If no working copy has been created for this element associated with this
	 * buffer factory, returns <code>null</code>.
	 * <p>
	 * Users of this method must not destroy the resulting working copy.
	 *
	 * @param bufferFactory the given <code>IBuffer</code> factory
	 * @return the found shared working copy for this element, <code>null</code> if none
	 * @see IBufferFactory
	 * @since 2.0
	 *
	 * @deprecated Use {@link IJavaScriptUnit#findWorkingCopy(WorkingCopyOwner)} instead.
	 */
	IJavaScriptElement findSharedWorkingCopy(IBufferFactory bufferFactory);

	/**
	 * Returns the original element the specified working copy element was created from,
	 * or <code>null</code> if this is not a working copy element.  This is a handle
	 * only method, the returned element may or may not exist.
	 *
	 * @param workingCopyElement the specified working copy element
	 * @return the original element the specified working copy element was created from,
	 * or <code>null</code> if this is not a working copy element
	 *
	 * @deprecated Use {@link IJavaScriptElement#getPrimaryElement()} instead.
	 */
	IJavaScriptElement getOriginal(IJavaScriptElement workingCopyElement);

	/**
	 * Returns the original element this working copy was created from,
	 * or <code>null</code> if this is not a working copy.
	 *
	 * @return the original element this working copy was created from,
	 * or <code>null</code> if this is not a working copy
	 *
	 * @deprecated Use {@link IJavaScriptUnit#findPrimaryType()} instead.
	 */
	IJavaScriptElement getOriginalElement();

	/**
	 * Finds the elements in this compilation unit that correspond to
	 * the given element.
	 * An element A corresponds to an element B if:
	 * <ul>
	 * <li>A has the same element name as B.
	 * <li>If A is a method, A must have the same number of arguments as
	 *     B and the simple names of the argument types must be equals.
	 * <li>The parent of A corresponds to the parent of B recursively up to
	 *     their respective compilation units.
	 * <li>A exists.
	 * </ul>
	 * Returns <code>null</code> if no such java elements can be found
	 * or if the given element is not included in a compilation unit.
	 *
	 * @param element the given element
	 * @return the found elements in this compilation unit that correspond to the given element
	 * @since 2.0
	 *
	 * @deprecated Use {@link IJavaScriptUnit#findElements(IJavaScriptElement)} instead.
	 */
	IJavaScriptElement[] findElements(IJavaScriptElement element);

	/**
	 * Finds the primary type of this compilation unit (that is, the type with the same name as the
	 * compilation unit), or <code>null</code> if no such a type exists.
	 *
	 * @return the found primary type of this compilation unit, or <code>null</code> if no such a type exists
	 * @since 2.0
	 *
	 * @deprecated Use {@link ITypeRoot#findPrimaryType()} instead.
	 */
	IType findPrimaryType();

	/**
	 * Returns a shared working copy on this element using the given factory to create
	 * the buffer, or this element if this element is already a working copy.
	 * This API can only answer an already existing working copy if it is based on the same
	 * original compilation unit AND was using the same buffer factory (that is, as defined by <code>Object.equals</code>).
	 * <p>
	 * The life time of a shared working copy is as follows:
	 * <ul>
	 * <li>The first call to <code>getSharedWorkingCopy(...)</code> creates a new working copy for this
	 *     element</li>
	 * <li>Subsequent calls increment an internal counter.</li>
	 * <li>A call to <code>destroy()</code> decrements the internal counter.</li>
	 * <li>When this counter is 0, the working copy is destroyed.
	 * </ul>
	 * So users of this method must destroy exactly once the working copy.
	 * <p>
	 * Note that the buffer factory will be used for the life time of this working copy, that is if the
	 * working copy is closed then reopened, this factory will be used.
	 * The buffer will be automatically initialized with the original's compilation unit content
	 * upon creation.
	 * <p>
	 * When the shared working copy instance is created, an ADDED IJavaScriptElementDelta is reported on this
	 * working copy.
	 *
	 * @param monitor a progress monitor used to report progress while opening this compilation unit
	 *                 or <code>null</code> if no progress should be reported
	 * @param factory the factory that creates a buffer that is used to get the content of the working copy
	 *                 or <code>null</code> if the internal factory should be used
	 * @param problemRequestor a requestor which will get notified of problems detected during
	 * 	reconciling as they are discovered. The requestor can be set to <code>null</code> indicating
	 * 	that the client is not interested in problems.
	 * @exception JavaScriptModelException if the contents of this element can
	 *   not be determined.
	 * @return a shared working copy on this element using the given factory to create
	 * the buffer, or this element if this element is already a working copy
	 * @see IBufferFactory
	 * @see IProblemRequestor
	 * @since 2.0
	 *
	 * @deprecated Use {@link IJavaScriptUnit#getWorkingCopy(WorkingCopyOwner, IProblemRequestor, IProgressMonitor)} instead.
	 */
	IJavaScriptElement getSharedWorkingCopy(
		IProgressMonitor monitor,
		IBufferFactory factory,
		IProblemRequestor problemRequestor)
		throws JavaScriptModelException;

	/**
	 * Returns a new working copy of this element if this element is not
	 * a working copy, or this element if this element is already a working copy.
	 * <p>
	 * Note: if intending to share a working copy amongst several clients, then
	 * <code>#getSharedWorkingCopy</code> should be used instead.
	 * </p><p>
	 * When the working copy instance is created, an ADDED IJavaScriptElementDelta is
	 * reported on this working copy.
	 * </p><p>
	 * Since 2.1, a working copy can be created on a not-yet existing compilation
	 * unit. In particular, such a working copy can then be committed in order to create
	 * the corresponding compilation unit.
	 * </p>
	 * @exception JavaScriptModelException if the contents of this element can
	 *   not be determined.
	 * @return a new working copy of this element if this element is not
	 * a working copy, or this element if this element is already a working copy
	 *
	 * @deprecated Use {@link IJavaScriptUnit#getWorkingCopy(IProgressMonitor)} instead.
	 */
	IJavaScriptElement getWorkingCopy() throws JavaScriptModelException;

	/**
	 * Returns a new working copy of this element using the given factory to create
	 * the buffer, or this element if this element is already a working copy.
	 * Note that this factory will be used for the life time of this working copy, that is if the
	 * working copy is closed then reopened, this factory will be reused.
	 * The buffer will be automatically initialized with the original's compilation unit content
	 * upon creation.
	 * <p>
	 * Note: if intending to share a working copy amongst several clients, then
	 * <code>#getSharedWorkingCopy</code> should be used instead.
	 * </p><p>
	 * When the working copy instance is created, an ADDED IJavaScriptElementDelta is
	 * reported on this working copy.
	 * </p><p>
	 * Since 2.1, a working copy can be created on a not-yet existing compilation
	 * unit. In particular, such a working copy can then be committed in order to create
	 * the corresponding compilation unit.
	 * </p>
	 * @param monitor a progress monitor used to report progress while opening this compilation unit
	 *                 or <code>null</code> if no progress should be reported
	 * @param factory the factory that creates a buffer that is used to get the content of the working copy
	 *                 or <code>null</code> if the internal factory should be used
	 * @param problemRequestor a requestor which will get notified of problems detected during
	 * 	reconciling as they are discovered. The requestor can be set to <code>null</code> indicating
	 * 	that the client is not interested in problems.
	 * @exception JavaScriptModelException if the contents of this element can
	 *   not be determined.
	 * @return a new working copy of this element using the given factory to create
	 * the buffer, or this element if this element is already a working copy
	 * @since 2.0
	 *
	 * @deprecated Use {@link IJavaScriptUnit#getWorkingCopy(WorkingCopyOwner, IProblemRequestor, IProgressMonitor)} instead.
	 */
	IJavaScriptElement getWorkingCopy(
		IProgressMonitor monitor,
		IBufferFactory factory,
		IProblemRequestor problemRequestor)
		throws JavaScriptModelException;

	/**
	 * Returns whether this working copy's original element's content
	 * has not changed since the inception of this working copy.
	 *
	 * @param resource this working copy's resource
	 * @return true if this working copy's original element's content
	 * has not changed since the inception of this working copy, false otherwise
	 *
	 * @deprecated Use {@link IJavaScriptUnit#hasResourceChanged()} instead.
	 */
	boolean isBasedOn(IResource resource);

	/**
	 * Returns whether this element is a working copy.
	 *
	 * @return true if this element is a working copy, false otherwise
	 *
	 * @deprecated Use {@link IJavaScriptUnit#isWorkingCopy()} instead.
	 */
	boolean isWorkingCopy();

	/**
	 * Reconciles the contents of this working copy.
	 * It performs the reconciliation by locally caching the contents of
	 * the working copy, updating the contents, then creating a delta
	 * over the cached contents and the new contents, and finally firing
	 * this delta.
	 * <p>
	 * If the working copy hasn't changed, then no problem will be detected,
	 * this is equivalent to <code>IWorkingCopy#reconcile(false, null)</code>.</p>
	 * <p>
	 * Compilation problems found in the new contents are notified through the
	 * <code>IProblemRequestor</code> interface which was passed at
	 * creation, and no longer as transient markers. Therefore this API will
	 * return <code>null</code>.</p>
	 * <p>
 	 * Note: Since 3.0 added/removed/changed inner types generate change deltas.</p>
	 *
	 * @exception JavaScriptModelException if the contents of the original element
	 *		cannot be accessed. Reasons include:
	 * <ul>
	 * <li> The original Java element does not exist (ELEMENT_DOES_NOT_EXIST)</li>
	 * </ul>
	 * @return <code>null</code>
	 *
	 * @deprecated Use {@link IJavaScriptUnit#reconcile(int, boolean, WorkingCopyOwner, IProgressMonitor)} instead.
	 */
	IMarker[] reconcile() throws JavaScriptModelException;

	/**
	 * Reconciles the contents of this working copy.
	 * It performs the reconciliation by locally caching the contents of
	 * the working copy, updating the contents, then creating a delta
	 * over the cached contents and the new contents, and finally firing
	 * this delta.
	 * <p>
	 * The boolean argument allows to force problem detection even if the
	 * working copy is already consistent.</p>
	 * <p>
	 * Compilation problems found in the new contents are notified through the
	 * <code>IProblemRequestor</code> interface which was passed at
	 * creation, and no longer as transient markers. Therefore this API answers
	 * nothing.</p>
	 * <p>
 	 * Note: Since 3.0 added/removed/changed inner types generate change deltas.</p>
	 *
	 * @param forceProblemDetection boolean indicating whether problem should be recomputed
	 *   even if the source hasn't changed.
	 * @param monitor a progress monitor
	 * @exception JavaScriptModelException if the contents of the original element
	 *		cannot be accessed. Reasons include:
	 * <ul>
	 * <li> The original Java element does not exist (ELEMENT_DOES_NOT_EXIST)</li>
	 * </ul>
	 * @since 2.0
	 *
	 * @deprecated Use {@link IJavaScriptUnit#reconcile(int, boolean, WorkingCopyOwner, IProgressMonitor)} instead.
	 */
	void reconcile(boolean forceProblemDetection, IProgressMonitor monitor) throws JavaScriptModelException;

	/**
	 * Restores the contents of this working copy to the current contents of
	 * this working copy's original element. Has no effect if this element
	 * is not a working copy.
	 *
	 * <p>Note: This is the inverse of committing the content of the
	 * working copy to the original element with <code>commit(boolean, IProgressMonitor)</code>.
	 *
	 * @exception JavaScriptModelException if the contents of the original element
	 *		cannot be accessed.  Reasons include:
	 * <ul>
	 * <li> The original Java element does not exist (ELEMENT_DOES_NOT_EXIST)</li>
	 * </ul>
	 * @deprecated Use {@link IJavaScriptUnit#restore()} instead.
	 */
	void restore() throws JavaScriptModelException;
}
