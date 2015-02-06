/**
 * 
 */
package com.italk2learn.controller;


import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.italk2learn.bo.inter.ITaskIndependentSupportBO;
import com.italk2learn.vo.FractionsLabRequestVO;
import com.italk2learn.vo.FractionsLabResponseVO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.TaskIndependentSupportRequestVO;
import com.italk2learn.vo.TaskIndependentSupportResponseVO;

/**
 * Handles and retrieves the login or denied page depending on the URI template
 */
@Controller
@RequestMapping("/tis")
public class TaskIndependentSupportController {
       
	private LdapUserDetailsImpl user;
	
	private ITaskIndependentSupportBO tisService;
	
	private static final Logger logger = LoggerFactory
			.getLogger(TaskIndependentSupportController.class);
	

	@Autowired
    public TaskIndependentSupportController(ITaskIndependentSupportBO tisService) {
		this.tisService=tisService;
	}
	
	
	/**
	 * Receives 
	 * 
	 * @input Number of file is requested to send to the engine. 
	 * 
	 * @return the name of the page
	 */
	@RequestMapping(value = "/testTIS",method = RequestMethod.GET)
	@ResponseBody
	public TaskIndependentSupportResponseVO testTaskIndependentSupport(@RequestParam(value = "option") String op) {
		logger.info("JLF --- testTaskIndependentSupport()");
		TaskIndependentSupportRequestVO request= new TaskIndependentSupportRequestVO();
		try {
			user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setFile(Integer.parseInt(op));
			TaskIndependentSupportResponseVO res= getTisService().sendRealSpeechToSupport(request);
			return res;
		} catch (Exception e){
			logger.error(e.toString());
		}
		return null;
	}
	
	/**
	 * JLF: Controller to call TIS from TDS
	 */
	@RequestMapping(value = "/callTIS", method = RequestMethod.POST)
	@ResponseBody
	public void callTIDfromTDS(@RequestBody TaskIndependentSupportRequestVO tisRequest){
		user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		logger.info("JLF --- callTIDfromTDS log"+"User: "+user.getUsername());
		TaskIndependentSupportRequestVO request= new TaskIndependentSupportRequestVO();
        try {
        	request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(user.getUsername());
			request.setCurrentFeedbackType(tisRequest.getCurrentFeedbackType());
			request.setFeedbackText(tisRequest.getFeedbackText());
			request.setPreviousFeedbackType(tisRequest.getPreviousFeedbackType());
			request.setFollowed(tisRequest.getFollowed());
			getTisService().callTISfromTID(request);
        } catch (Exception ex) {
        	logger.error(ex.toString());
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


	public ITaskIndependentSupportBO getTisService() {
		return tisService;
	}


	public void setTisService(ITaskIndependentSupportBO tisService) {
		this.tisService = tisService;
	}
	
}
