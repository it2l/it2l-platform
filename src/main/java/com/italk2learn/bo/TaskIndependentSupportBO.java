package com.italk2learn.bo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.ITaskIndependentSupportBO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.FractionsLabRequest;
import com.italk2learn.vo.FractionsLabResponse;

@Service("taskIndependentSupportBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class TaskIndependentSupportBO implements ITaskIndependentSupportBO  {
	
	private static final Logger logger = LoggerFactory
			.getLogger(TaskIndependentSupportBO.class);

	@Autowired
	public TaskIndependentSupportBO() {
		
	}
	
	public FractionsLabResponse sendNextWords(FractionsLabRequest request) throws ITalk2LearnException{
		logger.info("sendNextWords()--- ");
		try {
			FractionsLabResponse response= new FractionsLabResponse();
			return response;
		}
		catch (Exception e){
			System.out.println(e);
		}
		return null;
	}
	
	public FractionsLabResponse getStudentInfo(FractionsLabRequest request) throws ITalk2LearnException{
		logger.info("getStudentInfo()---");
		try {
			FractionsLabResponse response= new FractionsLabResponse();
			return response;
		}
		catch (Exception e){
			System.out.println(e);
		}
		return null;
	}
	
}
