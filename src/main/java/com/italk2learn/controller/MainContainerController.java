/**
 * 
 */
package com.italk2learn.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.italk2learn.bo.inter.IExerciseSequenceBO;
import com.italk2learn.vo.ExerciseSequenceRequestVO;
import com.italk2learn.vo.ExerciseVO;
import com.italk2learn.vo.FractionsLabRequestVO;
import com.italk2learn.vo.FractionsLabResponseVO;
import com.italk2learn.vo.HeaderVO;

/**
 * Handles and retrieves the login or denied page depending on the URI template
 */
@Controller
@RequestMapping("/exercise")
public class MainContainerController {
       
	private LdapUserDetailsImpl user;
	
	private static final Logger logger = LoggerFactory
			.getLogger(MainContainerController.class);
	
	/*Services*/
	private IExerciseSequenceBO exerciseSequenceService;

    public IExerciseSequenceBO getExerciseSequenceService() {
		return exerciseSequenceService;
	}


	public void setExerciseSequenceService(
			IExerciseSequenceBO exerciseSequenceService) {
		this.exerciseSequenceService = exerciseSequenceService;
	}


	@Autowired
    public MainContainerController(IExerciseSequenceBO exerciseSequence) {
    	this.exerciseSequenceService = exerciseSequence;
    }
	
	
	@ModelAttribute("allExercises")
    public List<ExerciseVO> populateExercises() {
    	logger.info("JLF --- MonitorWOZ.populateExercises");
    	try {
	    	user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    	ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
	    	request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
	        return this.exerciseSequenceService.findAllExercises(request).getResponse();
    	} catch (Exception e){
    		return null;
    	}
    }

	/**
	 * Handles and retrieves the login page
	 * 
	 * @return the name of the page
	 */
	@RequestMapping(value = "",method = RequestMethod.GET)
	public String initMainContainer(Model model) {
		logger.info("JLF --- Main Container Init");
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return "exercise";
		} catch (Exception e){
			logger.error(e.toString());
			return "redirect:/login";
		}
	}
	
	@RequestMapping(value="/invalidate", method=RequestMethod.GET)
	public void invalidate(HttpSession session, Model model) {
		  session.invalidate();
	}
	
	/**
	 * Method that retrieves Language, StudentInfo and TaskInfoPackage on the initialisation
	 * 
	 * @return InitFractionsLabResponse
	 */
	@RequestMapping(value = "/init",method = RequestMethod.GET)
	@ResponseBody
	public FractionsLabResponseVO initFractionsLab() {
		logger.info("JLF --- Initialises FractionLab ");
		FractionsLabResponseVO response= new FractionsLabResponseVO();
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return response;
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response;
	}
	
	/**
	 * JLF: Get an specific exercise of the table of contents
	 */
	@RequestMapping(value = "/getSpecificExercise", method = RequestMethod.POST)
    public ModelAndView getSpecificExercise(@RequestBody ExerciseVO exercise, HttpServletRequest req){
		logger.info("JLF --- getSpecificExercise()");
		ModelAndView modelAndView = new ModelAndView();
		ExerciseSequenceRequestVO request= new ExerciseSequenceRequestVO();
		try{
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setIdExercise(exercise.getIdExercise());
			ExerciseVO response=getExerciseSequenceService().getSpecificExercise(request).getExercise();
			request.setIdExercise(response.getIdExercise());
			modelAndView.setViewName(response.getView()+"/"+ response.getExercise());
			return modelAndView;
		}
		catch (Exception e){
			return new ModelAndView();
		}
		
	}
	
	/**
	 * Set the new information retrieved fron an specific student
	 * 
	 */
	@RequestMapping(value = "/setNewStudentInfo",method = RequestMethod.POST)
	public void setNewStundentInfo(@Valid @ModelAttribute("studentInfo") FractionsLabRequestVO sInfo) {
		logger.info("JLF --- Initialises FractionLab ");
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e){
			logger.error(e.toString());
		}
	}
	
	/**
	 * Store the information of the feedback
	 * 
	 */
	@RequestMapping(value = "/storeFeedbackInfo",method = RequestMethod.POST)
	public void storeFeedbackInfo(@Valid @ModelAttribute("studentInfo") FractionsLabRequestVO sInfo) {
		logger.info("JLF --- Initialises FractionLab ");
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e){
			logger.error(e.toString());
		}
	}
	
	/**
	 * Store the information about student events
	 * 
	 */
	@RequestMapping(value = "/storeStudentEvents",method = RequestMethod.POST)
	public void storeStudentEvents(@Valid @ModelAttribute("studentInfo") FractionsLabRequestVO sEvents) {
		logger.info("JLF --- Initialises FractionLab ");
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e){
			logger.error(e.toString());
		}
	}
	
	/**
	 * Get the task independent support emotions
	 * 
	 */
	@RequestMapping(value = "/getTIEmotions",method = RequestMethod.GET)
	@ResponseBody
	public FractionsLabResponseVO getTIEmotions(@Valid @ModelAttribute("emotions") FractionsLabRequestVO emotions) {
		logger.info("JLF --- Initialises FractionLab ");
		FractionsLabResponseVO response= new FractionsLabResponseVO();
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return response;
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response;
	}
	
	/**
	 * Get the task independent support emotions
	 * 
	 */
	@RequestMapping(value = "/getTIFeedback",method = RequestMethod.GET)
	@ResponseBody
	public FractionsLabResponseVO getTIFeedback(@Valid @ModelAttribute("feeback") FractionsLabRequestVO feedback) {
		logger.info("JLF --- Initialises FractionLab ");
		FractionsLabResponseVO response= new FractionsLabResponseVO();
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return response;
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response;
	}
	
}
