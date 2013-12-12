package com.italk2learn.vo;

public class ExerciseVO extends ResponseVO {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String user;
	private int idUser;
	private int idExercise;
	private int idNextexercise;
	private String exercise;
	private String feedback;
	
	
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
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	public int getIdNextexercise() {
		return idNextexercise;
	}
	public void setIdNextexercise(int idNextexercise) {
		this.idNextexercise = idNextexercise;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
}
