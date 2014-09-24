package com.italk2learn.controller;

import java.util.Date;
import java.util.GregorianCalendar;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.ws.NextLesson;

@Controller
public class ExerciseSequenceAIController {

//	@Autowired
//	private NextLesson sequenceClient;
//	
//	@Autowired
//	private ILoginUserService loginUserService;
//	
//	private LdapUserDetailsImpl user;
//	
//
//	private static final Logger log = LoggerFactory
//			.getLogger(ExerciseSequenceAIController.class);
//
//	@RequestMapping(value = "/nextExerciseAISequence", method = RequestMethod.GET)
//	public String getNextExercise(ModelMap model) {
//		ExerciseSequenceRequestVO request;
//		GregorianCalendar c = new GregorianCalendar();
//		c.setTime(new Date());
//		int studentId=6129436;
//		int prevStudentScore=1;
//		String prevLessonId="GB0600PAp0100";
//		String whizzLessonSuggestion="GB0600PAp0100";
//		try {
//			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//			request= new ExerciseSequenceRequestVO();
//			request.setHeaderVO(new HeaderVO());
//			request.getHeaderVO().setLoginUser(user.getUsername());
//			prevLessonId=getLoginUserService().getIdExersiceUser(request.getHeaderVO()).toString();
//			studentId=getLoginUserService().getIdUserInfo(request.getHeaderVO());
//			XMLGregorianCalendar timestamp=DatatypeFactory.newInstance().newXMLGregorianCalendar(c);
//			return sequenceClient.nextLesson(studentId, prevStudentScore, prevLessonId, timestamp, whizzLessonSuggestion);
//		} catch (Exception e) {
//			log.error(e.toString());
//		}
//		return "redirect:/login";
//
//	}
//	
//	
//	public ILoginUserService getLoginUserService() {
//		return loginUserService;
//	}
//
//
//	public void setLoginUserService(ILoginUserService loginUserService) {
//		this.loginUserService = loginUserService;
//	}
}