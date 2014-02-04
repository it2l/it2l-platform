package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.CTATRequestVO;
import com.italk2learn.vo.CTATResponseVO;

public interface ICTATExerciseBO {
	
	public CTATResponseVO storageLog(CTATRequestVO request) throws ITalk2LearnException;

}
