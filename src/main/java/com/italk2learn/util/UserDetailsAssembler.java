package com.italk2learn.util;

import java.util.ArrayList;
import java.util.List;

import com.hibernate.dto.Userdetails;
import com.italk2learn.vo.UserDetailsVO;

public class UserDetailsAssembler {
	
	public static UserDetailsVO toUserDetailsVOs(Userdetails uDetails) {
		final UserDetailsVO userDetailsVO = new UserDetailsVO();
		userDetailsVO.setUser(uDetails.getUser());
		userDetailsVO.setPassword(uDetails.getPassword());
		userDetailsVO.setName(uDetails.getName());
		userDetailsVO.setEmail(uDetails.getEmail());
		userDetailsVO.setPhone(uDetails.getPhone());
		userDetailsVO.setWebsite(uDetails.getWebsite());
		return userDetailsVO;
	}

	
	public static final List<UserDetailsVO> toUserDetailsVOs(List<Userdetails> uDetails)
			throws Exception {

		final List<UserDetailsVO> result = new ArrayList<UserDetailsVO>();
		for (Userdetails entity : uDetails) {
			result.add(toUserDetailsVOs(entity));
		}
		return result;
	}

}
