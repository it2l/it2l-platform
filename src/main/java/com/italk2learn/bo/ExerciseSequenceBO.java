package com.italk2learn.bo;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.dao.inter.IExerciseDAO;
import com.italk2learn.dao.inter.ISequenceDAO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.repositories.ExercisesRepository;
import com.italk2learn.util.ExerciseAssembler;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;

@Service("exerciseSequenceBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class ExerciseSequenceBO implements IExerciseSequenceBO  {
	

	private static final Logger logger = LoggerFactory
			.getLogger(ExerciseSequenceBO.class);
	
	public IExerciseDAO exerciseDAO;
	
	public ISequenceDAO sequenceDAO;
	
    @Autowired
    private ExercisesRepository exercisesRepository; 
	
	@Autowired
	public ExerciseSequenceBO(IExerciseDAO exerciseDAO,ISequenceDAO sequenceDAO) {
		this.exerciseDAO = exerciseDAO;
		this.sequenceDAO = sequenceDAO;
	}
	
    public ExerciseSequenceResponseVO findAllExercises(ExerciseSequenceRequestVO request) {
    	ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
		try {
			response.setResponse(ExerciseAssembler.toExerciseVOs(getExerciseDAO().getAllExercises()));
		} catch (ITalk2LearnException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return response;
    }

	public ExerciseSequenceResponseVO getExerciseSequence(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			
			ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
			response.setResponse(ExerciseAssembler.toExerciseVOs(getExerciseDAO().getSequenceExercises(request.getIdUser())));
			return response;
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	
	public ExerciseSequenceResponseVO getSpecificExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			
			ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
			response.setExercise(ExerciseAssembler.toExerciseVOs(getExerciseDAO().getSpecificExercise(request.getIdExercise())));
			return response;
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	
	public ExerciseSequenceResponseVO getNextExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			
			ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
			response.setExercise(getExerciseDAO().getNextExercise(request.getIdUser(), request.getIdExercise()));
			return response;
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	
	public ExerciseSequenceResponseVO getBackExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			
			ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
			response.setExercise(getExerciseDAO().getBackExercise(request.getIdUser(), request.getIdExercise()));
			return response;
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	
	public ExerciseSequenceResponseVO insertNextIDExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException {
		try {			
			getExerciseDAO().setNextExercise(request.getIdUser(), request.getIdExercise(), request.getIdNextexercise(),request.getFeedback());
			return new ExerciseSequenceResponseVO();
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	
	public ExerciseSequenceResponseVO insertSequenceByUser(ExerciseSequenceRequestVO request) throws ITalk2LearnException {
		try {			
			getSequenceDAO().insertSequenceByUser(request.getIdUser(), new ArrayList<String>());
			return new ExerciseSequenceResponseVO();
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	
	
	public ExerciseSequenceResponseVO insertCurrentExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
			getExerciseDAO().insertCurrentExercise(request.getIdUser(), request.getIdExercise());
			return response;
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
		
	}
	
	public ExerciseSequenceResponseVO getFirstExercise(ExerciseSequenceRequestVO request) throws ITalk2LearnException{
		try {
			ExerciseSequenceResponseVO response= new ExerciseSequenceResponseVO();
			response.setExercise(ExerciseAssembler.toExerciseVOs(getExerciseDAO().getFirstExercise(request.getIdExercise())));
			return response;
		}
		catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	

	public IExerciseDAO getExerciseDAO() {
		return exerciseDAO;
	}

	public void setExerciseDAO(IExerciseDAO exerciseDAO) {
		this.exerciseDAO = exerciseDAO;
	}
	
	public ISequenceDAO getSequenceDAO() {
		return sequenceDAO;
	}

	public void setSequenceDAO(ISequenceDAO sequenceDAO) {
		this.sequenceDAO = sequenceDAO;
	}

}
