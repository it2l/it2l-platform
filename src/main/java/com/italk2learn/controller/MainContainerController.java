/**
 * 
 */
package com.italk2learn.controller;


import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.italk2learn.vo.ExerciseVO;
import com.italk2learn.vo.FractionsLabRequest;
import com.italk2learn.vo.FractionsLabResponse;

/**
 * Handles and retrieves the login or denied page depending on the URI template
 */
@Controller
@RequestMapping("/exercise")
public class MainContainerController {
       
	private LdapUserDetailsImpl user;
	
	private static final Logger logger = LoggerFactory
			.getLogger(MainContainerController.class);

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
	
	/**
	 * Method that retrieves Language, StudentInfo and TaskInfoPackage on the initialisation
	 * 
	 * @return InitFractionsLabResponse
	 */
	@RequestMapping(value = "/init",method = RequestMethod.GET)
	@ResponseBody
	public FractionsLabResponse initFractionsLab() {
		logger.info("JLF --- Initialises FractionLab ");
		FractionsLabResponse response= new FractionsLabResponse();
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return response;
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response;
	}
	
	/**
	 * Set the new information retrieved fron an specific student
	 * 
	 */
	@RequestMapping(value = "/setNewStudentInfo",method = RequestMethod.POST)
	public void setNewStundentInfo(@Valid @ModelAttribute("studentInfo") FractionsLabRequest sInfo) {
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
	public void storeFeedbackInfo(@Valid @ModelAttribute("studentInfo") FractionsLabRequest sInfo) {
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
	public void storeStudentEvents(@Valid @ModelAttribute("studentInfo") FractionsLabRequest sEvents) {
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
	public FractionsLabResponse getTIEmotions(@Valid @ModelAttribute("emotions") FractionsLabRequest emotions) {
		logger.info("JLF --- Initialises FractionLab ");
		FractionsLabResponse response= new FractionsLabResponse();
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
	public FractionsLabResponse getTIFeedback(@Valid @ModelAttribute("feeback") FractionsLabRequest feedback) {
		logger.info("JLF --- Initialises FractionLab ");
		FractionsLabResponse response= new FractionsLabResponse();
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return response;
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response;
	}
	
}
