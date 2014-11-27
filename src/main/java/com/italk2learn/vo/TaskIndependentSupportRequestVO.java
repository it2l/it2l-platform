package com.italk2learn.vo;

import java.util.List;

public class TaskIndependentSupportRequestVO extends RequestVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private List<String> words;
	
	private int File;
	
	public List<String> getWords() {
		return words;
	}
	public void setWords(List<String> words) {
		this.words = words;
	}
	public int getFile() {
		return File;
	}
	public void setFile(int file) {
		File = file;
	} 

}
