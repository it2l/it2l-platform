package com.italk2learn.dao.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.WhizzExerciseVO;

public interface IWhizzExerciseDAO {
	
	public boolean storeDataWhizz(int idUser, int idExercise, WhizzExerciseVO whizz) throws ITalk2LearnException;

}
