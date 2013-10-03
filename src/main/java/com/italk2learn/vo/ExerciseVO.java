package com.italk2learn.vo;

public class ExerciseVO extends ResponseVO {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int idExercise;
	private String exercise;
	
	
	public int getIdExercise() {
		return idExercise;
	}
	public void setIdExercise(int idExercise) {
		this.idExercise = idExercise;
	}
	public String getExercise() {
		return exercise;
	}
	public void setExercise(String exercise) {
		this.exercise = exercise;
	}

}
