package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.ExerciseVO;

public interface IExerciseSequenceBO {
	
	public ExerciseSequenceResponseVO getExerciseSequence(ExerciseSequenceRequestVO request) throws ITalk2LearnException;
	
	public ExerciseVO getFirstExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException;

}
