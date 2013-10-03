package com.italk2learn.vo;

import java.util.List;

public class ExerciseSequenceResponseVO extends ResponseVO{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private List<ExerciseVO> response;
	

	public List<ExerciseVO> getResponse() {
		return response;
	}

	public void setResponse(List<ExerciseVO> response) {
		this.response = response;
	}

}
