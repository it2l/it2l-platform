package com.italk2learn.dao.inter;

import com.italk2learn.exception.ITalk2LearnException;

public interface ISequenceDAO {
	
	public void insertSequenceByUser(int idUser, String[] sequence) throws ITalk2LearnException;
	

}
