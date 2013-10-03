package com.italk2learn.dao.inter;

import java.util.List;

import com.hibernate.dto.User;
import com.hibernate.dto.Userdetails;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.UserDetailsVO;


public interface ILoginUserDAO {

	boolean getLoginUserInfo(HeaderVO header) throws Exception;
	User getIdUserInfo(HeaderVO header) throws Exception;
	void setUserData(UserDetailsVO messageForm) throws Exception;
	List<Userdetails> getUserData() throws Exception;
}
