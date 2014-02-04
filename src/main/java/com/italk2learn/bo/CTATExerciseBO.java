package com.italk2learn.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.ICTATExerciseBO;
import com.italk2learn.dao.inter.ICTATExerciseDAO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.CTATRequestVO;
import com.italk2learn.vo.CTATResponseVO;

@Service("ctatExerciseBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class CTATExerciseBO implements ICTATExerciseBO{
	
	private ICTATExerciseDAO exerciseDAO;
	
	@Autowired
	public CTATExerciseBO(ICTATExerciseDAO exerciseDAO) {
		this.exerciseDAO = exerciseDAO;
	}
	
	
	public CTATResponseVO storageLog(CTATRequestVO request) throws ITalk2LearnException{
		try {
			
			CTATResponseVO response= new CTATResponseVO();
			response.setResponse(getExerciseDAO().storageLog(request.getIdUser(), request.getIdExercise(),request.getLog()));
			return response;
		}
		catch (Exception e){
			System.out.println(e);
		}
		return null;
	}


	public ICTATExerciseDAO getExerciseDAO() {
		return exerciseDAO;
	}


	public void setExerciseDAO(ICTATExerciseDAO exerciseDAO) {
		this.exerciseDAO = exerciseDAO;
	}

}
