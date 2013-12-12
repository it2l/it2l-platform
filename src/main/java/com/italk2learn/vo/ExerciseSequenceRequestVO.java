package com.italk2learn.vo;

public class ExerciseSequenceRequestVO extends RequestVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int idUser;
	private int idExercise;
	private int idNextexercise;
	private String feedback;
	private String user;
	
	
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public int getIdExercise() {
		return idExercise;
	}
	public void setIdExercise(int idExercise) {
		this.idExercise = idExercise;
	}
	public int getIdNextexercise() {
		return idNextexercise;
	}
	public void setIdNextexercise(int idNextexercise) {
		this.idNextexercise = idNextexercise;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

}
