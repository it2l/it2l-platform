package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.PTDRequestVO;
import com.italk2learn.vo.PTDResponseVO;


public interface IPerceiveDifficultyTaskBO {
	
	public PTDResponseVO callPTD(PTDRequestVO request) throws ITalk2LearnException;
	
}
