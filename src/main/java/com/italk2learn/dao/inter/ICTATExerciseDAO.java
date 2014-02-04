package com.italk2learn.dao.inter;

import com.italk2learn.exception.ITalk2LearnException;

public interface ICTATExerciseDAO {
	
	public boolean storageLog(int idUser, int idExercise, String log) throws ITalk2LearnException;

}
