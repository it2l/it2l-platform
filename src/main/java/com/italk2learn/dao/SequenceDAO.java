package com.italk2learn.dao;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.hibernate.dto.Exercises;
import com.hibernate.dto.Sequence;
import com.hibernate.dto.User;
import com.italk2learn.dao.inter.ISequenceDAO;
import com.italk2learn.exception.ITalk2LearnException;

@Repository
public class SequenceDAO extends HibernateDaoSupport implements ISequenceDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public final Session getITalk2LearnSession() {
		return this.getSessionFactory().getCurrentSession();
	}

	
	public void insertSequenceByUser(int idUser, String[] sequence) throws ITalk2LearnException {
		final Session session = this.getITalk2LearnSession();
		try {
			String hql = "delete from Sequence where user = :idUser";
            Query query = session.createQuery(hql);
            query.setInteger("idUser", idUser);
            int rowCount = query.executeUpdate();
            System.out.println("Rows affected: " + rowCount);
            User us= (User) session.load(User.class, idUser);
            us.setIdView(Integer.parseInt(sequence[0]));
            session.saveOrUpdate(us);
            for (int i = 0; i < sequence.length; i++){
            	Sequence seq=new Sequence();
    			Exercises ex= (Exercises) session.load(Exercises.class, Integer.parseInt(sequence[i]));
    			seq.setExercises(ex);
    			seq.setUser(us);
    			if (i+1==sequence.length){
    				seq.setIdNextexercise(Integer.parseInt(sequence[0]));
    			}
    			else {
    				seq.setIdNextexercise(Integer.parseInt(sequence[i+1]));
    			}
    			session.saveOrUpdate(seq);
            }
		} catch (Exception e){
			e.printStackTrace();
			throw new ITalk2LearnException(e);
		}
	}
	

}
