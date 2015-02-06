package com.italk2learn.controller;

import java.sql.Timestamp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import MFSeq.DBManagment;
import MFSeq.Sequencer;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseVO;
import com.italk2learn.vo.HeaderVO;

@Controller
public class ExerciseSequenceAIController {

	/*Services*/
	private IExerciseSequenceBO exerciseSequenceService;
	public IExerciseSequenceBO getExerciseSequenceService() {
		return exerciseSequenceService;
	}

	public void setExerciseSequenceService(
			IExerciseSequenceBO exerciseSequenceService) {
		this.exerciseSequenceService = exerciseSequenceService;
	}

	private ILoginUserService loginUserService;
	
	private LdapUserDetailsImpl user;

	private static final Logger log = LoggerFactory.getLogger(ExerciseSequenceAIController.class);
	
    @Autowired
    public ExerciseSequenceAIController(IExerciseSequenceBO exerciseSequence, ILoginUserService loginUserService) {
    	this.exerciseSequenceService = exerciseSequence;
    	this.loginUserService=loginUserService;
    }

	@RequestMapping(value = "/nextExerciseAISequence", method = RequestMethod.GET)
	public ModelAndView getNextExercise(ModelMap model) {
		ModelAndView modelAndView = new ModelAndView();
		ExerciseSequenceRequestVO request = null;
		DBManagment manag = new DBManagment();
//		GregorianCalendar c = new GregorianCalendar();
//		c.setTime(new Date());
		Timestamp timestamp= new Timestamp(105,2,1,1,1,1,0);
		int studentId = 22516;
		int prevStudentScore = 95;
		String prevLessonId = "GB0875AAx0100";
		String whizzLessonSuggestion = "GB0900CAx0200";
		try {
			user = (LdapUserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			request = new ExerciseSequenceRequestVO();
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			ExerciseVO response=getExerciseSequenceService().getNextExercise(request).getExercise();
			prevLessonId = getLoginUserService().getIdExersiceUser(request.getHeaderVO()).toString();
			studentId = getLoginUserService().getIdUserInfo(request.getHeaderVO());
			//XMLGregorianCalendar timestamp = DatatypeFactory.newInstance().newXMLGregorianCalendar(c);
			String ID= Sequencer.next(studentId, prevLessonId, prevStudentScore, timestamp, whizzLessonSuggestion);
			modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
			return modelAndView;
		}
		catch (Exception e){
			log.error(e.toString());
			modelAndView.setViewName("redirect:/login");
			return new ModelAndView();
		}
	}

	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}

	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}
}