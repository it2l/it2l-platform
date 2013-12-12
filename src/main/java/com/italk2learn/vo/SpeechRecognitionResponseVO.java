package com.italk2learn.vo;


public class SpeechRecognitionResponseVO extends ResponseVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String response;

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public SpeechRecognitionResponseVO(String response) {
		super();
		this.response = response;
	}
	
	public SpeechRecognitionResponseVO() {
		super();
	}

}
