package com.italk2learn.exception;

public class ITalk2LearnException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * Exception father, If applies.
	 */
	private Exception exception;
	
	public ITalk2LearnException(Exception exception) {
		super();
		this.exception = exception;
	}

	/**
	 * Private constructor .
	 */
	private ITalk2LearnException() {
		super();
	}


	public Exception getException() {
		return exception;
	}


	public void setException(Exception exception) {
		this.exception = exception;
	}

}
