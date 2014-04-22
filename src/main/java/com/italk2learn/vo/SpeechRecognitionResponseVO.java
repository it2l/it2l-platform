package com.italk2learn.vo;


public class SpeechRecognitionResponseVO extends ResponseVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String response;
	
	private boolean isOpen;
	
	private String liveResponse;

	public boolean isOpen() {
		return isOpen;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}

	public String getLiveResponse() {
		return liveResponse;
	}

	public void setLiveResponse(String liveResponse) {
		this.liveResponse = liveResponse;
	}

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
