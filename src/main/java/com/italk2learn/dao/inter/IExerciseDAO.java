package com.italk2learn.dao.inter;

import java.util.List;

import com.hibernate.dto.Exercises;

public interface IExerciseDAO {
	
	public List<Exercises> getSequenceExercises(int idUser) throws Exception;
	
	public Exercises getFirstExercise(int idUser) throws Exception;

}
