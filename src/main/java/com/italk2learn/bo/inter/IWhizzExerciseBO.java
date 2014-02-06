package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.WhizzRequestVO;
import com.italk2learn.vo.WhizzResponseVO;

public interface IWhizzExerciseBO {
	
	public WhizzResponseVO storeWhizzInfo(WhizzRequestVO request) throws ITalk2LearnException;


}
