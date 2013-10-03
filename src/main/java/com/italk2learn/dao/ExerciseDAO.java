package com.italk2learn.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.hibernate.dto.Exercises;
import com.italk2learn.dao.inter.IExerciseDAO;
import com.italk2learn.exception.ITalk2LearnException;

@Repository
public class ExerciseDAO extends HibernateDaoSupport implements IExerciseDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public final Session getITalk2LearnSession() {
		return this.getSessionFactory().getCurrentSession();
	}

	/**
	 * @return list Get a list of exercises to create a sequence
	 */
	@SuppressWarnings("unchecked")
	public List<Exercises> getSequenceExercises(int idUser) throws Exception {
		try {
//			SELECT e.id_exercise, e.exercise
//			  FROM user AS u, exercises AS e, sequence s
//			  WHERE     u.id_user = 1
//			        AND u.id_user = s.id_user
//			        AND e.id_exercise = s.id_exercise
			final Criteria criteria = getITalk2LearnSession().createCriteria(Exercises.class);
			criteria.createCriteria("sequences.user", "u");
			criteria.createCriteria("sequences", "s");
			criteria.add(Restrictions.eq("u.idUser", idUser));
			criteria.setResultTransformer(Criteria.ROOT_ENTITY);
			return (List<Exercises>) criteria.list();
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	public Exercises getFirstExercise(int idUser) throws ITalk2LearnException {
		try {
			final Criteria criteria = getITalk2LearnSession().createCriteria(Exercises.class);
			criteria.setMaxResults(1);
			criteria.createCriteria("sequences.user", "u");
			criteria.createCriteria("sequences", "s");
			criteria.add(Restrictions.eq("u.idUser", idUser));
			criteria.setResultTransformer(Criteria.ROOT_ENTITY);
			return (Exercises)criteria.uniqueResult();
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	

}
