package com.italk2learn.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseSequenceResponseVO;
import com.italk2learn.vo.ExerciseVO;
import com.italk2learn.vo.HeaderVO;

/**
 * Handles requests for the application exercise sequence.
 */
@Controller
@RequestMapping("/monitorWOZ")
public class MonitorWOZController {
	
	
	private LdapUserDetailsImpl user;
	
	private static final Logger logger = LoggerFactory
			.getLogger(MonitorWOZController.class);

	/*Services*/
	private IExerciseSequenceBO exerciseSequenceService;
	private ILoginUserService loginUserService;

    @Autowired
    public MonitorWOZController(IExerciseSequenceBO exerciseSequence, ILoginUserService loginUserService) {
    	this.exerciseSequenceService = exerciseSequence;
    	this.loginUserService=loginUserService;
    }
    
    @ModelAttribute("allExercises")
    public List<ExerciseVO> populateExercises() {
    	logger.info("JLF --- MonitorWOZ.populateExercises");
//    	user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    	ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
//    	request.setHeaderVO(new HeaderVO());
//		request.getHeaderVO().setLoginUser(user.getUsername());
//        return this.exerciseSequenceService.findAllExercises(request).getResponse();
    	final List<ExerciseVO> res= new ArrayList<ExerciseVO>();
    	final ExerciseVO var1 = new ExerciseVO();
        var1.setIdExercise(Integer.valueOf(0));
        var1.setExercise("WhizzHTML5");
        res.add(var1);
        return res;
    }
	
	/**
	 * 
	 */
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String monitorWOZInit(Model model) {
		logger.info("JLF --- MonitorWOZ.init");
		user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		model.addAttribute("messageInfo", new ExerciseVO());
		return "monitorWOZ";
	}

	
	
	@RequestMapping(value = "/insertNextID", method = RequestMethod.POST)
    public ModelAndView insertNextExercise(@Valid @ModelAttribute("messageInfo") ExerciseVO messageForm){
		logger.info("JLF --- insertNextExercise()");
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		ModelAndView modelAndView=new ModelAndView();
		modelAndView.setViewName("monitorWOZ");
		try{
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setIdUser(getLoginUserService().getIdUser(messageForm.getUser()));
			request.setIdExercise(getLoginUserService().getSimpleIdExersiceUser(messageForm.getUser()));
			request.setIdNextexercise(messageForm.getIdNextexercise());
			request.setFeedback(messageForm.getFeedback());
			ExerciseSequenceResponseVO response=getExerciseSequenceService().insertNextIDExercise(request);
			return modelAndView;
		}
		catch (Exception e){
			return new ModelAndView();
		}
		
	}

	public IExerciseSequenceBO getExerciseSequenceService() {
		return exerciseSequenceService;
	}

	public void setExerciseSequenceService(IExerciseSequenceBO exerciseSequenceService) {
		this.exerciseSequenceService = exerciseSequenceService;
	}

	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}

	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}

}
