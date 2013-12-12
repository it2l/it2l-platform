package com.italk2learn.dao.inter;

import java.util.List;

import com.hibernate.dto.Exercises;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.ExerciseVO;

public interface IExerciseDAO {
	
	public List<Exercises> getSequenceExercises(int idUser) throws Exception;
	
	public ExerciseVO getNextExercise(int idUser, int idExercise) throws Exception;
	
	public void setNextExercise(int idUser, int idExercise, int idNextexercise, String feedback) throws Exception;
	
	public void insertActualExercise(int idUser, int idView) throws ITalk2LearnException;
	
	public Exercises getFirstExercise(int idUser) throws Exception;

}
