package com.zenesis.qx.remote.relaxng;

import org.kohsuke.rngom.digested.DPattern;

public final class TypeBuilderException extends RuntimeException {
	private final DPattern pattern;
	
	public TypeBuilderException(String message, Throwable cause, DPattern pattern) {
		super(message, cause);
		this.pattern = pattern;
	}
	
	public TypeBuilderException(String message, DPattern pattern) {
		super(message);
		this.pattern = pattern;
	}

	/**
	 * @return the pattern
	 */
	public DPattern getPattern() {
		return pattern;
	}
	
}