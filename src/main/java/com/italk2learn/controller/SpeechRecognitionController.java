package com.italk2learn.controller;

import java.io.ByteArrayInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.bo.inter.ISpeechRecognitionBO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

import flash.utils.ByteArray;

/**
 * Handles requests for the application speech recognition.
 */
@Controller
@RequestMapping("/speechRecognition")
public class SpeechRecognitionController {
	
	private LdapUserDetailsImpl user;
	
	private SpeechRecognitionRequestVO request;
	
	private static final Logger logger = LoggerFactory
			.getLogger(SpeechRecognitionController.class);

	private SpeechRecognitionResponseVO response= new SpeechRecognitionResponseVO();
	
	
	/*Services*/
	private ISpeechRecognitionBO speechRecognitionService;
	private ILoginUserService loginUserService;

    @Autowired
    public SpeechRecognitionController(ISpeechRecognitionBO speechRecognition, ILoginUserService loginUserService) {
    	this.setSpeechRecognitionService(speechRecognition);
    	this.loginUserService=loginUserService;
    }
	
	/**
	 * Main method to get a transcription of Sails Software
	 */
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String getSpeechRecognition(@RequestParam(value="data", required=false) String data, Model model) {
		logger.info("JLF --- Speech Recognition Main Controller");
		//byte[] bytes = Hex.decode(data);
		//user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		//request.getHeaderVO().setLoginUser(user.getUsername());
		request.getHeaderVO().setLoginUser("tludmetal");
		request.setData(data);
		try {
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().getSpeechRecognition(request));
		} catch (Exception e){
			logger.error(e.toString());
		}
		model.addAttribute(response);
		return "views/sequence";
	}
	
	@RequestMapping(value = "/parseTranscription", method = RequestMethod.GET)
    public ModelAndView getParsedTranscription(){
		logger.info("JLF --- parseTranscription()");
		ModelAndView modelAndView = new ModelAndView();
		try {
			return modelAndView;
		}
		catch (Exception e){
			return new ModelAndView();
		}
    }

	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}

	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}

	public ISpeechRecognitionBO getSpeechRecognitionService() {
		return speechRecognitionService;
	}

	public void setSpeechRecognitionService(ISpeechRecognitionBO speechRecognitionService) {
		this.speechRecognitionService = speechRecognitionService;
	}

}
