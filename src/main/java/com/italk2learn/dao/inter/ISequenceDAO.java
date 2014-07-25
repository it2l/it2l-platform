package com.italk2learn.dao.inter;

import java.util.List;

import com.italk2learn.exception.ITalk2LearnException;

public interface ISequenceDAO {
	
	public void insertSequenceByUser(int idUser, List<String> sequence) throws ITalk2LearnException;
	

}
