package com.italk2learn.vo;

public class WhizzRequestVO extends RequestVO {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private WhizzExerciseVO whizz;
	private int idUser;
	private int idExercise;
	
	public WhizzExerciseVO getWhizz() {
		return whizz;
	}
	public void setWhizz(WhizzExerciseVO whizz) {
		this.whizz = whizz;
	}
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

}
