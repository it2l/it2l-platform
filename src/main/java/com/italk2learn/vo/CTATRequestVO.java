package com.italk2learn.vo;

public class CTATRequestVO extends RequestVO {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int idUser;
	private int idExercise;
	private String log;
	
	
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	public int getIdExercise() {
		return idExercise;
	}
	public void setIdExercise(int idExercise) {
		this.idExercise = idExercise;
	}
	public String getLog() {
		return log;
	}
	public void setLog(String log) {
		this.log = log;
	}

}
