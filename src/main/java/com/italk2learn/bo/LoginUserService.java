package com.italk2learn.bo;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.dao.inter.ILoginUserDAO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.util.UserDetailsAssembler;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.UserDetailsVO;

/**
 * Login service
 * 
 * @author José Luis Fernández
 * @version 1.0
 */

@Service("loginUserService")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class LoginUserService implements ILoginUserService {

	private static final Logger logger = LoggerFactory
			.getLogger(LoginUserService.class);
	
	@Autowired
	private ILoginUserDAO loginUserDAO;

	/**
	 * @return the loginUserDAO
	 */
	public ILoginUserDAO getLoginUserDAO() {
		return loginUserDAO;
	}

	public void setLoginUserDAO(ILoginUserDAO loginUserDAO) {
		this.loginUserDAO = loginUserDAO;
	}
	
	public final boolean getLoginUserInfo(HeaderVO header)
			throws ITalk2LearnException {
		try {
			return loginUserDAO.getLoginUserInfo(header);
		} catch (Exception nfe) {
			System.out.println(nfe);
		}
		return false;
	}
	
	public Integer getIdUserInfoUserInfo(HeaderVO header)
			throws ITalk2LearnException {
		try {
			return loginUserDAO.getIdUserInfo(header).getIdUser();
		} catch (Exception nfe) {
			System.out.println(nfe);
		}
		return null;
	}
	
	public final void setUserData(UserDetailsVO messageForm)
			throws ITalk2LearnException {
		try {
			loginUserDAO.setUserData(messageForm);
		} catch (Exception nfe) {
			System.out.println(nfe);
		}
	}

	public final List<UserDetailsVO> getUserData()
			throws ITalk2LearnException {
		try {
			return UserDetailsAssembler.toUserDetailsVOs(loginUserDAO.getUserData());
		} catch (Exception nfe) {
			System.out.println(nfe);
		}
		return null;
	}
}
