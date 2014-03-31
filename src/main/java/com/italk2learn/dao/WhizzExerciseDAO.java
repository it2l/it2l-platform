package com.italk2learn.dao;

import java.util.Date;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.hibernate.dto.Exercises;
import com.hibernate.dto.User;
import com.hibernate.dto.Whizzexercise;
import com.italk2learn.dao.inter.IWhizzExerciseDAO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.WhizzExerciseVO;

@Repository
public class WhizzExerciseDAO extends HibernateDaoSupport implements IWhizzExerciseDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public final Session getITalk2LearnSession() {
		return this.getSessionFactory().getCurrentSession();
	}
	
	public boolean storeDataWhizz(int idUser, int idExercise, WhizzExerciseVO whizz) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try{
			Whizzexercise wh=new Whizzexercise();
			User us= (User) session.load(User.class, idUser);
			Exercises ex= (Exercises) session.load(Exercises.class, idExercise);
			wh.setExercises(ex);
			wh.setUser(us);
			wh.setScore(Integer.parseInt(whizz.getScore()));
			wh.setPercentage(Integer.parseInt(whizz.getPercentage()));
			wh.setTime(whizz.getTime());
			wh.setHelp1(whizz.getHelp1());
			wh.setHelp2(whizz.getHelp2());
			wh.setHelp3(whizz.getHelp3());
			wh.setDate(new Date());
			session.saveOrUpdate(wh);
			return true;
		}catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}

}
