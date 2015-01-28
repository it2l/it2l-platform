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
import com.hibernate.dto.Sequence;
import com.hibernate.dto.User;
import com.italk2learn.dao.inter.IExerciseDAO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.util.ExerciseAssembler;
import com.italk2learn.vo.ExerciseVO;

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
	
	/**
	 * @return Get a specific exercise of a given idExercise
	 */
	public Exercises getSpecificExercise(int idExercise) throws Exception {
		try {
			final Criteria criteria = getITalk2LearnSession().createCriteria(Exercises.class);
			criteria.add(Restrictions.eq("idExercise", idExercise));
			return (Exercises) criteria.uniqueResult();
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	/**
	 * @return list Get a exercise to create a sequence
	 */
	public ExerciseVO getNextExercise(int idUser, int idExercise) throws Exception {
		try {
//			(SELECT s.id_nextexercise
//		             FROM user AS u, exercises AS e, sequence s
//		            WHERE     u.id_user = 1
//		                  AND u.id_user = s.id_user
//		                  AND e.id_exercise = s.id_exercise
//		                  AND e.id_exercise = 1)
			final Criteria seqCriteria = getITalk2LearnSession().createCriteria(Sequence.class);
			seqCriteria.setMaxResults(1);
			seqCriteria.createCriteria("user", "u");
			seqCriteria.createCriteria("exercises", "e");
			seqCriteria.add(Restrictions.eq("u.idUser", idUser));
			seqCriteria.add(Restrictions.eq("e.idExercise", idExercise));
			seqCriteria.setResultTransformer(Criteria.ROOT_ENTITY);
			Sequence resultSeq =(Sequence)seqCriteria.uniqueResult();
//			SELECT e.id_exercise, e.exercise, s.feedback
//			  FROM exercises AS e, sequence s
//			 WHERE e.id_exercise =
//			          (resultSeq.id_exercise)
//			       AND e.id_exercise = s.id_exercise
//			       AND s.id_user = 1
			final Criteria exCriteria = getITalk2LearnSession().createCriteria(Exercises.class);
			exCriteria.setMaxResults(1);
			exCriteria.createCriteria("sequences.user", "u");
			exCriteria.createCriteria("sequences", "s");
			exCriteria.add(Restrictions.eq("u.idUser", idUser));
			exCriteria.add(Restrictions.eq("idExercise", resultSeq.getIdNextexercise()));
			exCriteria.setResultTransformer(Criteria.ROOT_ENTITY);
			Exercises resultEx =(Exercises)exCriteria.uniqueResult();
			return ExerciseAssembler.toExerciseFeedbackVOs(resultEx, resultSeq.getFeedback());
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	public ExerciseVO getWholeViewFromIDSequencer(int idUser, String idSequencer) throws Exception {
		try {
			final Criteria seqCriteria = getITalk2LearnSession().createCriteria(Sequence.class);
			seqCriteria.setMaxResults(1);
			seqCriteria.createCriteria("user", "u");
			seqCriteria.createCriteria("exercises", "e");
			seqCriteria.add(Restrictions.eq("u.idUser", idUser));
			seqCriteria.add(Restrictions.eq("e.idSequencer", idSequencer));
			seqCriteria.setResultTransformer(Criteria.ROOT_ENTITY);
			Sequence resultSeq =(Sequence)seqCriteria.uniqueResult();
	
			final Criteria exCriteria = getITalk2LearnSession().createCriteria(Exercises.class);
			exCriteria.setMaxResults(1);
			exCriteria.createCriteria("sequences.user", "u");
			exCriteria.createCriteria("sequences", "s");
			exCriteria.add(Restrictions.eq("u.idUser", idUser));
			exCriteria.add(Restrictions.eq("idExercise", resultSeq.getExercises().getIdExercise()));
			exCriteria.setResultTransformer(Criteria.ROOT_ENTITY);
			Exercises resultEx =(Exercises)exCriteria.uniqueResult();
			return ExerciseAssembler.toExerciseFeedbackVOs(resultEx, resultSeq.getFeedback());
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	public ExerciseVO getBackExercise(int idUser, int idExercise) throws Exception {
		try {
			final Criteria seqCriteria = getITalk2LearnSession().createCriteria(Sequence.class);
			seqCriteria.setMaxResults(1);
			seqCriteria.createCriteria("user", "u");
			seqCriteria.createCriteria("exercises", "e");
			seqCriteria.add(Restrictions.eq("u.idUser", idUser));
			seqCriteria.add(Restrictions.eq("idNextexercise", idExercise));
			seqCriteria.setResultTransformer(Criteria.ROOT_ENTITY);
			Sequence resultSeq =(Sequence)seqCriteria.uniqueResult();
			//JLF New criteria
			final Criteria exCriteria = getITalk2LearnSession().createCriteria(Exercises.class);
			exCriteria.setMaxResults(1);
			exCriteria.createCriteria("sequences.user", "u");
			exCriteria.createCriteria("sequences", "s");
			exCriteria.add(Restrictions.eq("u.idUser", idUser));
			exCriteria.add(Restrictions.eq("idExercise", resultSeq.getExercises().getIdExercise()));
			exCriteria.setResultTransformer(Criteria.ROOT_ENTITY);
			Exercises resultEx =(Exercises)exCriteria.uniqueResult();
			return ExerciseAssembler.toExerciseFeedbackVOs(resultEx, resultSeq.getFeedback());
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	public void setNextExercise(int idUser, int idExercise, int idNextexercise, String feedback) throws Exception{
		final Session session = this.getITalk2LearnSession();
		
		try{
			final Criteria seqCriteria = getITalk2LearnSession().createCriteria(Sequence.class);
			seqCriteria.setMaxResults(1);
			seqCriteria.createCriteria("user", "u");
			seqCriteria.createCriteria("exercises", "e");
			seqCriteria.add(Restrictions.eq("u.idUser", idUser));
			seqCriteria.add(Restrictions.eq("e.idExercise", idExercise));
			seqCriteria.setResultTransformer(Criteria.ROOT_ENTITY);
			Sequence resultSeq =(Sequence)seqCriteria.uniqueResult();
			final Sequence entity = (Sequence) session.load(Sequence.class, resultSeq.getIdSequence());
			entity.setIdNextexercise(idNextexercise);
			entity.setFeedback(feedback);
			session.saveOrUpdate(entity);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		} 
	}
	
	public void insertCurrentExercise(int idUser, int idView) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try{
			User us=(User) session.load(User.class, idUser);
			us.setIdView(idView);
			session.saveOrUpdate(us);
		}catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	public void insertCurrentVPSExercise(int idUser, String idSequencerView) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try{
			User us=(User) session.load(User.class, idUser);
			us.setIdSequencerView(idSequencerView);
			session.saveOrUpdate(us);
		}catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}

	
	public Exercises getFirstExercise(int idExercise) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try{
			Exercises ex=(Exercises) session.load(Exercises.class, idExercise);
			return ex;
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	public Exercises getIDSequencer(int idExercise) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try{
			Exercises ex=(Exercises) session.load(Exercises.class, idExercise);
			return ex;
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	
	
	/**
	 * @return list Get all exercises stored in the database
	 */
	@SuppressWarnings("unchecked")
	public List<Exercises> getAllExercises() throws ITalk2LearnException {
		try {
			final Criteria criteria = getITalk2LearnSession().createCriteria(Exercises.class);
			return (List<Exercises>) criteria.list();
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	

}
