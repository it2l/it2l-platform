package com.italk2learn.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.dao.inter.IExerciseDAO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.util.ExerciseAssembler;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.ExerciseVO;

@Service("exerciseSequenceBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class ExerciseSequenceBO implements IExerciseSequenceBO  {
	

	public IExerciseDAO exerciseDAO;
	
	@Autowired
	public ExerciseSequenceBO(IExerciseDAO exerciseDAO) {
		this.exerciseDAO = exerciseDAO;
	}
	
	public ExerciseSequenceResponseVO getExerciseSequence(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			
			ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
			response.setResponse(ExerciseAssembler.toExerciseVOs(getExerciseDAO().getSequenceExercises(request.getIdUser())));
			return response;
		}
		catch (Exception e){
			System.out.println(e);
		}
		return null;
	}
	
	public ExerciseVO getFirstExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			return ExerciseAssembler.toExerciseVOs(getExerciseDAO().getFirstExercise(request.getIdUser()));
		}
		catch (Exception e){
			
		}
		return null;
	}
	

	public IExerciseDAO getExerciseDAO() {
		return exerciseDAO;
	}

	public void setExerciseDAO(IExerciseDAO exerciseDAO) {
		this.exerciseDAO = exerciseDAO;
	}

}
