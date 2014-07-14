package com.italk2learn.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.hibernate.dto.Ctatexercise;
import com.hibernate.dto.Exercises;
import com.hibernate.dto.User;
import com.italk2learn.dao.inter.ICTATExerciseDAO;
import com.italk2learn.exception.ITalk2LearnException;

@Repository
public class CTATExerciseDAO extends HibernateDaoSupport implements ICTATExerciseDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public final Session getITalk2LearnSession() {
		return this.getSessionFactory().getCurrentSession();
	}
	
	public boolean storageLog(int idUser, int idExercise, String log) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try{
			Ctatexercise ctat=new Ctatexercise();
			User us= (User) session.load(User.class, idUser);
			Exercises ex= (Exercises) session.load(Exercises.class, idExercise);
			ctat.setExercises(ex);
			ctat.setUser(us);
			ctat.setLoganswer(log);
			session.saveOrUpdate(ctat);
			return true;
		}catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}


}
