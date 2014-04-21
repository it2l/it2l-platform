package com.italk2learn.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.bo.inter.ISpeechRecognitionBO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

/**
 * JLF: Handles requests for the application speech recognition.
 */
@Controller
@RequestMapping("/speechRecognition")
public class SpeechRecognitionController {
	
	private static final Logger logger = LoggerFactory
			.getLogger(SpeechRecognitionController.class);
	
	//Request petition
	private SpeechRecognitionRequestVO request;
    
	//Response petition
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
	@RequestMapping(value = "/sendData",method = RequestMethod.POST)
	@ResponseBody
	public void getSpeechRecognition(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller");
		//user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		//request.getHeaderVO().setLoginUser(user.getUsername());
		request.getHeaderVO().setLoginUser("tludmetal");
		request.setData(body);
		try {
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().getSpeechRecognition(request));
		} catch (Exception e){
			logger.error(e.toString());
		}
	}
	
	
	/**
	 * Method that initialises ASREngine to be prepared to accept chunks of audio
	 */
	@RequestMapping(value = "/initEngine",method = RequestMethod.POST)
	@ResponseBody
	public Boolean initASREngine(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller");
		//user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		//request.getHeaderVO().setLoginUser(user.getUsername());
		request.getHeaderVO().setLoginUser("tludmetal");
		try {
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().initASREngine(request));
			return response.isOpen();
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response.isOpen();
	}
	
	/**
	 * Main method to get a transcription of Sails Software
	 */
	@RequestMapping(value = "/closeEngine",method = RequestMethod.POST)
	@ResponseBody
	public String closeASREngine(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller");
		//user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		//request.getHeaderVO().setLoginUser(user.getUsername());
		request.getHeaderVO().setLoginUser("tludmetal");
		request.setData(body);
		try {
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().closeASREngine(request));
			return response.getResponse();
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response.getResponse();
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
