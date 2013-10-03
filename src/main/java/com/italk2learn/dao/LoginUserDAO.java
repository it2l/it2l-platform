package com.italk2learn.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.hibernate.dto.User;
import com.hibernate.dto.Userdetails;
import com.italk2learn.dao.inter.ILoginUserDAO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.UserDetailsVO;

/**
 * 
 * @author José Luis Fernández
 * 
 */
@Repository
public class LoginUserDAO extends HibernateDaoSupport implements ILoginUserDAO {

	private static final Logger logger = LoggerFactory
			.getLogger(LoginUserDAO.class);
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public final Session getITalk2LearnSession() {
		return this.getSessionFactory().getCurrentSession();
	}
	
	/**
	 * @return list Consulta que comprueba si el usuario está bloqueado en BBDD
	 *         o no para expulsarle de la aplicación.
	 */
	public boolean getLoginUserInfo(HeaderVO header) throws Exception {
		try {
			return (getIdUserInfo(header)!=null);
		} catch (Exception e){
			System.out.println(e);
		}
		return false;
	}
	
	public User getIdUserInfo(HeaderVO header) throws Exception {
		try {
			final Criteria criteria = getITalk2LearnSession().createCriteria(User.class);
			criteria.setMaxResults(1);
			criteria.add(Restrictions.eq("user", header.getLoginUser()));
			criteria.setResultTransformer(Criteria.ROOT_ENTITY);
			return (User)criteria.uniqueResult();
		} catch (Exception e){
			System.out.println(e);
		}
		return null;
	}

	public void setUserData(UserDetailsVO messageForm) throws Exception {
		try {
			Session pr=getITalk2LearnSession();
			final Userdetails ud = new Userdetails();
			ud.setUser(messageForm.getName());
			ud.setName(messageForm.getName());
			ud.setEmail(messageForm.getEmail());
			ud.setMessage(messageForm.getMessage());
			ud.setWebsite(messageForm.getWebsite());
			ud.setPhone(messageForm.getPhone());
			pr.saveOrUpdate(ud);
		} catch (Exception e){
			System.out.println(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Userdetails> getUserData() throws Exception {
		try {
			Session pr=getITalk2LearnSession();
			final Criteria criteria = pr.createCriteria(Userdetails.class);
			return (List<Userdetails>) criteria.list();
		} catch (Exception e){
			System.out.println(e);
		}
		return null;
	}
}
