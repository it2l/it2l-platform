package com.italk2learn.bo.inter;

import java.util.List;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.ExerciseVO;
import com.italk2learn.vo.ParamsVO;
import com.italk2learn.vo.ResponseVO;

public interface ISequencingEngine {
	
	//JLF: initialises the user on the recommender system
	public ExerciseSequenceResponseVO init(String user) throws ITalk2LearnException;
	
	//JLF: it retrieves a list of exercises available for the user (optional)
	public ExerciseSequenceResponseVO getAvailableExercises(List<ExerciseVO> exercises) throws ITalk2LearnException;
	
	//JLF: gets the next exercise depending of the user and its past history (including the
	//last exercise done and the score on that exercise)
	public ExerciseVO getNextExercise(String user, String idExercise, ParamsVO params) throws ITalk2LearnException;
	
	//JLF: close the session with the recommender system
	public ResponseVO close(String user) throws ITalk2LearnException;

}
