package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.FractionsLabRequestVO;
import com.italk2learn.vo.FractionsLabResponseVO;

public interface IFractionsLabBO {
	
	public FractionsLabResponseVO saveEventFL(FractionsLabRequestVO request) throws ITalk2LearnException;

}
