/*******************************************************************************
 * Copyright (c) 2000, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

package org.eclipse.wst.jsdt.internal.ui.text.java;


import org.eclipse.core.runtime.Assert;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.contentassist.IContextInformation;
import org.eclipse.swt.graphics.Image;
import org.eclipse.wst.jsdt.core.CompletionProposal;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.Signature;
import org.eclipse.wst.jsdt.core.formatter.DefaultCodeFormatterConstants;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.ui.text.java.JavaContentAssistInvocationContext;


public class LazyJavaCompletionProposal extends AbstractJavaCompletionProposal {
	
	protected static final String LPAREN= "("; //$NON-NLS-1$
	protected static final String RPAREN= ")"; //$NON-NLS-1$
	protected static final String COMMA= ","; //$NON-NLS-1$
	protected static final String SPACE= " "; //$NON-NLS-1$
	
	protected static final class FormatterPrefs {
		/* Methods & constructors */
		public final boolean beforeOpeningParen;
		public final boolean afterOpeningParen;
		public final boolean beforeComma;
		public final boolean afterComma;
		public final boolean beforeClosingParen;
		public final boolean inEmptyList;
		
		/* type parameters */
		public final boolean beforeOpeningBracket;
		public final boolean afterOpeningBracket;
		public final boolean beforeTypeArgumentComma;
		public final boolean afterTypeArgumentComma;
		public final boolean beforeClosingBracket;
	
		FormatterPrefs(IJavaProject project) {
			beforeOpeningParen= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_BEFORE_OPENING_PAREN_IN_METHOD_INVOCATION, false);
			afterOpeningParen= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_AFTER_OPENING_PAREN_IN_METHOD_INVOCATION, false);
			beforeComma= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_BEFORE_COMMA_IN_METHOD_INVOCATION_ARGUMENTS, false);
			afterComma= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_AFTER_COMMA_IN_METHOD_INVOCATION_ARGUMENTS, true);
			beforeClosingParen= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_BEFORE_CLOSING_PAREN_IN_METHOD_INVOCATION, false);
			inEmptyList= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_BETWEEN_EMPTY_PARENS_IN_METHOD_INVOCATION, false);
			
			beforeOpeningBracket= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_BEFORE_OPENING_ANGLE_BRACKET_IN_PARAMETERIZED_TYPE_REFERENCE, false);
			afterOpeningBracket= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_AFTER_OPENING_ANGLE_BRACKET_IN_PARAMETERIZED_TYPE_REFERENCE, false);
			beforeTypeArgumentComma= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_BEFORE_COMMA_IN_PARAMETERIZED_TYPE_REFERENCE, false);
			afterTypeArgumentComma= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_AFTER_COMMA_IN_PARAMETERIZED_TYPE_REFERENCE, true);
			beforeClosingBracket= getCoreOption(project, DefaultCodeFormatterConstants.FORMATTER_INSERT_SPACE_BEFORE_CLOSING_ANGLE_BRACKET_IN_PARAMETERIZED_TYPE_REFERENCE, false);
		}
	
		protected final boolean getCoreOption(IJavaProject project, String key, boolean def) {
			String option= getCoreOption(project, key);
			if (JavaCore.INSERT.equals(option))
				return true;
			if (JavaCore.DO_NOT_INSERT.equals(option))
				return false;
			return def;
		}
	
		protected final String getCoreOption(IJavaProject project, String key) {
			if (project == null)
				return JavaCore.getOption(key);
			return project.getOption(key, true);
		}
	}

	private boolean fDisplayStringComputed;
	private boolean fReplacementStringComputed;
	private boolean fReplacementOffsetComputed;
	private boolean fReplacementLengthComputed;
	private boolean fCursorPositionComputed;
	private boolean fImageComputed;
	private boolean fContextInformationComputed;
	private boolean fProposalInfoComputed;
	private boolean fTriggerCharactersComputed;
	private boolean fSortStringComputed;
	private boolean fRelevanceComputed;
	private FormatterPrefs fFormatterPrefs;

	/**
	 * The core proposal wrapped by this completion proposal.
	 */
	protected final CompletionProposal fProposal;
	protected int fContextInformationPosition;
	
	public LazyJavaCompletionProposal(CompletionProposal proposal, JavaContentAssistInvocationContext context) {
		super(context);
		Assert.isNotNull(proposal);
		Assert.isNotNull(context);
		Assert.isNotNull(context.getCoreContext());
		fProposal= proposal;
	}

	/*
	 * @see ICompletionProposalExtension#getTriggerCharacters()
	 */
	public final char[] getTriggerCharacters() {
		if (!fTriggerCharactersComputed)
			setTriggerCharacters(computeTriggerCharacters());
		return super.getTriggerCharacters();
	}
	
	protected char[] computeTriggerCharacters() {
		return new char[0];
	}

	/**
	 * Sets the trigger characters.
	 * @param triggerCharacters The set of characters which can trigger the application of this completion proposal
	 */
	public final void setTriggerCharacters(char[] triggerCharacters) {
		fTriggerCharactersComputed= true;
		super.setTriggerCharacters(triggerCharacters);
	}

	/**
	 * Sets the proposal info.
	 * @param proposalInfo The additional information associated with this proposal or <code>null</code>
	 */
	public final void setProposalInfo(ProposalInfo proposalInfo) {
		fProposalInfoComputed= true;
		super.setProposalInfo(proposalInfo);
	}

	/**
	 * Returns the additional proposal info, or <code>null</code> if none
	 * exists.
	 *
	 * @return the additional proposal info, or <code>null</code> if none
	 *         exists
	 */
	protected final ProposalInfo getProposalInfo() {
		if (!fProposalInfoComputed)
			setProposalInfo(computeProposalInfo());
		return super.getProposalInfo();
	}

	protected ProposalInfo computeProposalInfo() {
		return null;
	}

	/**
	 * Sets the cursor position relative to the insertion offset. By default this is the length of the completion string
	 * (Cursor positioned after the completion)
	 * @param cursorPosition The cursorPosition to set
	 */
	public final void setCursorPosition(int cursorPosition) {
		fCursorPositionComputed= true;
		super.setCursorPosition(cursorPosition);
	}
	
	protected final int getCursorPosition() {
		if (!fCursorPositionComputed)
			setCursorPosition(computeCursorPosition());
		return super.getCursorPosition();
	}

	protected int computeCursorPosition() {
		return getReplacementString().length();
	}

	/*
	 * @see org.eclipse.wst.jsdt.internal.ui.text.java.AbstractJavaCompletionProposal#isInJavadoc()
	 */
	protected final boolean isInJavadoc() {
		return fInvocationContext.getCoreContext().isInJavadoc();
	}

	/*
	 * @see ICompletionProposal#getContextInformation()
	 */
	public final IContextInformation getContextInformation() {
		if (!fContextInformationComputed)
			setContextInformation(computeContextInformation());
		return super.getContextInformation();
	}

	protected IContextInformation computeContextInformation() {
		return null;
	}

	/**
	 * Sets the context information.
	 * @param contextInformation The context information associated with this proposal
	 */
	public final void setContextInformation(IContextInformation contextInformation) {
		fContextInformationComputed= true;
		super.setContextInformation(contextInformation);
	}
	
	/*
	 * @see ICompletionProposal#getDisplayString()
	 */
	public final String getDisplayString() {
		if (!fDisplayStringComputed)
			setDisplayString(computeDisplayString());
		return super.getDisplayString();
	}

	protected final void setDisplayString(String string) {
		fDisplayStringComputed= true;
		super.setDisplayString(string);
	}

	protected String computeDisplayString() {
		return fInvocationContext.getLabelProvider().createLabel(fProposal);
	}

	/*
	 * @see ICompletionProposal#getAdditionalProposalInfo()
	 */
	public final String getAdditionalProposalInfo() {
		return super.getAdditionalProposalInfo();
	}

	/*
	 * @see ICompletionProposalExtension#getContextInformationPosition()
	 */
	public final int getContextInformationPosition() {
		if (getContextInformation() == null)
			return getReplacementOffset() - 1;
		return getReplacementOffset() + getCursorPosition();
	}

	/**
	 * Gets the replacement offset.
	 * @return Returns a int
	 */
	public final int getReplacementOffset() {
		if (!fReplacementOffsetComputed)
			setReplacementOffset(fProposal.getReplaceStart());
		return super.getReplacementOffset();
	}

	/**
	 * Sets the replacement offset.
	 * @param replacementOffset The replacement offset to set
	 */
	public final void setReplacementOffset(int replacementOffset) {
		fReplacementOffsetComputed= true;
		super.setReplacementOffset(replacementOffset);
	}

	/*
	 * @see org.eclipse.jface.text.contentassist.ICompletionProposalExtension3#getCompletionOffset()
	 */
	public final int getPrefixCompletionStart(IDocument document, int completionOffset) {
		return getReplacementOffset();
	}

	/**
	 * Gets the replacement length.
	 * @return Returns a int
	 */
	public final int getReplacementLength() {
		if (!fReplacementLengthComputed)
			setReplacementLength(fProposal.getReplaceEnd() - fProposal.getReplaceStart());
		return super.getReplacementLength();
	}

	/**
	 * Sets the replacement length.
	 * @param replacementLength The replacementLength to set
	 */
	public final void setReplacementLength(int replacementLength) {
		fReplacementLengthComputed= true;
		super.setReplacementLength(replacementLength);
	}

	/**
	 * Gets the replacement string.
	 * @return Returns a String
	 */
	public final String getReplacementString() {
		if (!fReplacementStringComputed)
			setReplacementString(computeReplacementString());
		return super.getReplacementString();
	}

	protected String computeReplacementString() {
		return String.valueOf(fProposal.getCompletion());
	}

	/**
	 * Sets the replacement string.
	 * @param replacementString The replacement string to set
	 */
	public final void setReplacementString(String replacementString) {
		fReplacementStringComputed= true;
		super.setReplacementString(replacementString);
	}

	/*
	 * @see ICompletionProposal#getImage()
	 */
	public final Image getImage() {
		if (!fImageComputed)
			setImage(computeImage());
		return super.getImage();
	}

	protected Image computeImage() {
		return JavaPlugin.getImageDescriptorRegistry().get(fInvocationContext.getLabelProvider().createImageDescriptor(fProposal));
	}

	/**
	 * Sets the image.
	 * @param image The image to set
	 */
	public final void setImage(Image image) {
		fImageComputed= true;
		super.setImage(image);
	}

	/*
	 * @see org.eclipse.wst.jsdt.internal.ui.text.java.AbstractJavaCompletionProposal#isValidPrefix(java.lang.String)
	 */
	protected boolean isValidPrefix(String prefix) {
		if (super.isValidPrefix(prefix))
			return true;
		
		if (fProposal.getKind() == CompletionProposal.METHOD_NAME_REFERENCE) {
			// static imports - includes package & type name
			StringBuffer buf= new StringBuffer();
			buf.append(Signature.toCharArray(fProposal.getDeclarationSignature()));
			buf.append('.');
			buf.append(getDisplayString());
			return isPrefix(prefix, buf.toString());
		}
		
		return false;
	}
	
	/**
	 * Gets the proposal's relevance.
	 * @return Returns a int
	 */
	public final int getRelevance() {
		if (!fRelevanceComputed)
			setRelevance(computeRelevance());
		return super.getRelevance();
	}

	/**
	 * Sets the proposal's relevance.
	 * @param relevance The relevance to set
	 */
	public final void setRelevance(int relevance) {
		fRelevanceComputed= true;
		super.setRelevance(relevance);
	}

	protected int computeRelevance() {
		final int baseRelevance= fProposal.getRelevance() * 16;
		switch (fProposal.getKind()) {
			case CompletionProposal.PACKAGE_REF:
				return baseRelevance + 0;
			case CompletionProposal.LABEL_REF:
				return baseRelevance + 1;
			case CompletionProposal.KEYWORD:
				return baseRelevance + 2;
			case CompletionProposal.TYPE_REF:
			case CompletionProposal.ANONYMOUS_CLASS_DECLARATION:
				return baseRelevance + 3;
			case CompletionProposal.METHOD_REF:
			case CompletionProposal.METHOD_NAME_REFERENCE:
			case CompletionProposal.METHOD_DECLARATION:
			case CompletionProposal.ANNOTATION_ATTRIBUTE_REF:
				return baseRelevance + 4;
			case CompletionProposal.POTENTIAL_METHOD_DECLARATION:
				return baseRelevance + 4 /* + 99 */;
			case CompletionProposal.FIELD_REF:
				return baseRelevance + 5;
			case CompletionProposal.LOCAL_VARIABLE_REF:
			case CompletionProposal.VARIABLE_DECLARATION:
				return baseRelevance + 6;
			default:
				return baseRelevance;
		}
	}
	
	public final String getSortString() {
		if (!fSortStringComputed)
			setSortString(computeSortString());
		return super.getSortString();
	}

	protected final void setSortString(String string) {
		fSortStringComputed= true;
		super.setSortString(string);
	}

	protected String computeSortString() {
		return getDisplayString();
	}

	protected FormatterPrefs getFormatterPrefs() {
		if (fFormatterPrefs == null) {
			ICompilationUnit cu= fInvocationContext.getCompilationUnit();
			fFormatterPrefs= new FormatterPrefs(cu == null ? null : cu.getJavaProject());
		}
		return fFormatterPrefs;
	}

	/**
	 * Overrides the default context information position. Ignored if set to zero.
	 * 
	 * @param contextInformationPosition the replaced position.
	 */
	public void setContextInformationPosition(int contextInformationPosition) {
		fContextInformationPosition= contextInformationPosition;
	}
}
