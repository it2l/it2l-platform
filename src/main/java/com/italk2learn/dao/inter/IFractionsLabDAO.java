package com.italk2learn.dao.inter;

import com.italk2learn.exception.ITalk2LearnException;

public interface IFractionsLabDAO {
	
	public boolean saveEvent(String event,int idUser, int idExercise) throws ITalk2LearnException;

}
