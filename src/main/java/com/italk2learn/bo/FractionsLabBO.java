package com.italk2learn.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.IFractionsLabBO;
import com.italk2learn.dao.inter.IFractionsLabDAO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.FractionsLabRequestVO;
import com.italk2learn.vo.FractionsLabResponseVO;

@Service("fractionsLabBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class FractionsLabBO implements IFractionsLabBO{
	
	private IFractionsLabDAO fractionsLabDAO;
	
	@Autowired
	public FractionsLabBO(IFractionsLabDAO fl) {
		this.setFractionsLabDAO(fl);
	}
	
	
	public FractionsLabResponseVO saveEventFL(FractionsLabRequestVO request) throws ITalk2LearnException{
		FractionsLabResponseVO response= new FractionsLabResponseVO();
		try {
			response.setResponse(getFractionsLabDAO().saveEvent(request.getEvent(),request.getIdUser(),request.getIdExercise()));
		}
		catch (Exception e){
			System.out.println(e);
		}
		return response;
	}


	public IFractionsLabDAO getFractionsLabDAO() {
		return fractionsLabDAO;
	}


	public void setFractionsLabDAO(IFractionsLabDAO fractionsLabDAO) {
		this.fractionsLabDAO = fractionsLabDAO;
	}


}
