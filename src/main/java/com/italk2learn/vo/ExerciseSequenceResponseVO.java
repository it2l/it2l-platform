package com.italk2learn.vo;

import java.util.List;

public class ExerciseSequenceResponseVO extends ResponseVO{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private List<ExerciseVO> response;
	
	private ExerciseVO exercise;
	
	private int numExercises;
	
	private String idSequencer;
	

	public List<ExerciseVO> getResponse() {
		return response;
	}

	public void setResponse(List<ExerciseVO> response) {
		this.response = response;
	}

	public int getNumExercises() {
		return numExercises;
	}

	public void setNumExercises(int numExercises) {
		this.numExercises = numExercises;
	}

	public ExerciseVO getExercise() {
		return exercise;
	}

	public void setExercise(ExerciseVO exercise) {
		this.exercise = exercise;
	}

	public String getIdSequencer() {
		return idSequencer;
	}

	public void setIdSequencer(String idSequencer) {
		this.idSequencer = idSequencer;
	}

}
