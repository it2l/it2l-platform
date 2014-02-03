package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.ExerciseVO;

public interface IExerciseSequenceBO {
	
	public ExerciseSequenceResponseVO findAllExercises(ExerciseSequenceRequestVO request);
	
	public ExerciseSequenceResponseVO getExerciseSequence(ExerciseSequenceRequestVO request) throws ITalk2LearnException;
	
	public ExerciseSequenceResponseVO getNextExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException;
	
	public ExerciseSequenceResponseVO getBackExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException;
	
	public ExerciseSequenceResponseVO insertNextIDExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException;
	
	public ExerciseSequenceResponseVO insertActualExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException;
	
	public ExerciseSequenceResponseVO getFirstExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException;

}
