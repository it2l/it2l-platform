package com.italk2learn.bo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.ITaskIndependentSupportBO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.FractionsLabRequestVO;
import com.italk2learn.vo.FractionsLabResponseVO;

@Service("taskIndependentSupportBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class TaskIndependentSupportBO implements ITaskIndependentSupportBO  {
	
	private static final Logger logger = LoggerFactory
			.getLogger(TaskIndependentSupportBO.class);

	/*@Autowired*/
	public TaskIndependentSupportBO() {
		
	}
	
	public FractionsLabResponseVO sendNextWords(FractionsLabRequestVO request) throws ITalk2LearnException{
		logger.info("sendNextWords()--- ");
		try {
			FractionsLabResponseVO response= new FractionsLabResponseVO();
			return response;
		}
		catch (Exception e){
			System.out.println(e);
		}
		return null;
	}
	
	public FractionsLabResponseVO getStudentInfo(FractionsLabRequestVO request) throws ITalk2LearnException{
		logger.info("getStudentInfo()---");
		try {
			FractionsLabResponseVO response= new FractionsLabResponseVO();
			return response;
		}
		catch (Exception e){
			System.out.println(e);
		}
		return null;
	}
	
}
