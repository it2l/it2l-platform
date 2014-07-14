package com.italk2learn.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.hibernate.dto.Exercises;
import com.hibernate.dto.Flexercise;
import com.hibernate.dto.User;
import com.italk2learn.dao.inter.IFractionsLabDAO;
import com.italk2learn.exception.ITalk2LearnException;

@Repository
public class FractionsLabDAO extends HibernateDaoSupport implements IFractionsLabDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public final Session getITalk2LearnSession() {
		return this.getSessionFactory().getCurrentSession();
	}
	
	public boolean saveEvent(String event,int idUser, int idExercise) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try{
			Flexercise wh=new Flexercise();
			User us= (User) session.load(User.class, idUser);
			Exercises ex= (Exercises) session.load(Exercises.class, idExercise);
			wh.setExercises(ex);
			wh.setUser(us);
			wh.setEvent(event);	
			session.saveOrUpdate(wh);
			return true;
		}catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}

}
