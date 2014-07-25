package com.italk2learn.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.hibernate.dto.Sequence;
import com.italk2learn.dao.inter.ISequenceDAO;
import com.italk2learn.exception.ITalk2LearnException;

@Repository
public class SequenceDAO extends HibernateDaoSupport implements ISequenceDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public final Session getITalk2LearnSession() {
		return this.getSessionFactory().getCurrentSession();
	}

	
	public void insertSequenceByUser(int idUser, List<String> sequence) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try {
			Sequence seq=(Sequence) session.load(Sequence.class, idUser);
			session.saveOrUpdate(seq);
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	

}
