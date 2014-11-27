package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.TaskIndependentSupportRequestVO;
import com.italk2learn.vo.TaskIndependentSupportResponseVO;

public interface ITaskIndependentSupportBO {
	
	public TaskIndependentSupportResponseVO sendNextWords(TaskIndependentSupportRequestVO request) throws ITalk2LearnException;
	public TaskIndependentSupportResponseVO getStudentInfo(TaskIndependentSupportRequestVO request) throws ITalk2LearnException;
	public TaskIndependentSupportResponseVO sendRealSpeechToSupport(TaskIndependentSupportRequestVO req) throws Exception;

}
