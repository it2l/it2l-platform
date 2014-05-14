package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.FractionsLabRequest;
import com.italk2learn.vo.FractionsLabResponse;

public interface ITaskIndependentSupportBO {
	
	public FractionsLabResponse sendNextWords(FractionsLabRequest request) throws ITalk2LearnException;
	public FractionsLabResponse getStudentInfo(FractionsLabRequest request) throws ITalk2LearnException;

}
