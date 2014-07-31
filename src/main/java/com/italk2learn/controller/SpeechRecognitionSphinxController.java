package com.italk2learn.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.SpeechRecognitionRequestVO;

import edu.cmu.sphinx.api.Configuration;
import edu.cmu.sphinx.api.SpeechResult;
import edu.cmu.sphinx.api.StreamSpeechRecognizer;

/**
 * JLF: Handles requests for the application speech recognition.
 */
@Controller
@Scope("session")
@RequestMapping("/speechRecognitionSphinx")
public class SpeechRecognitionSphinxController{
	

	private static final Logger logger = LoggerFactory
			.getLogger(SpeechRecognitionSphinxController.class);
	
	Configuration configuration = new Configuration();
	StreamSpeechRecognizer recognizer;
	String userLogin;
	
	//Request petition
	private SpeechRecognitionRequestVO request;
    
	/*Services*/
	private ILoginUserService loginUserService;

    @Autowired
    public SpeechRecognitionSphinxController(ILoginUserService loginUserService) {
    	this.loginUserService=loginUserService;
    }
	
	/**
	 * Main method to get a transcription of Sails Software
	 */
	@RequestMapping(value = "/sendData",method = RequestMethod.POST)
	@ResponseBody
	public void getSpeechRecognition(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller--  getSpeechRecognition");
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser(userLogin);
		request.setData(body);
		try {
			InputStream myInputStream = new ByteArrayInputStream(body); 
			recognizer.startRecognition(myInputStream);
			SpeechResult result = recognizer.getResult();
			while ((result = recognizer.getResult()) != null) {
			    System.out.println(result.getHypothesis());
			}
		} catch (Exception e){
			logger.error(e.toString());
		}
	}
	
	
	/**
	 * Method that initialises ASREngine to be prepared to accept chunks of audio
	 */
	@RequestMapping(value = "/initEngine",method = RequestMethod.GET)
	@ResponseBody
	public Boolean initASREngine(@RequestParam(value = "user") String user, HttpServletRequest req) {
		logger.info("JLF --- Speech Recognition Main Controller---  initASREngine");
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		userLogin=user;
		request.getHeaderVO().setLoginUser(userLogin);
		try {
			// Set path to acoustic model.
			configuration.setAcousticModelPath("file:/opt/models/en-us");
			// Set path to dictionary.
			configuration.setDictionaryPath("file:/opt/models/en-us/dict/cmudict.0.6d");
			// Set language model.
			configuration.setLanguageModelPath("file:/opt/models/cmusphinx-5.0-en-us.lm.dmp");
			recognizer = new StreamSpeechRecognizer(configuration);
			return true;
		} catch (Exception e){
			logger.error(e.toString());
		}
		return false;
	}
	
	/**
	 * Main method to get a transcription of Sails Software
	 */
	@RequestMapping(value = "/closeEngine",method = RequestMethod.POST)
	@ResponseBody
	public String closeASREngine(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller--- closeASREngine");
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser(userLogin);
		request.setData(body);
		try {
			recognizer.stopRecognition();
		} catch (Exception e){
			logger.error(e.toString());
		}
		return "";
	}
	
	
	public ILoginUserService getLoginUserService() {
		return loginUserService;
	}

	public void setLoginUserService(ILoginUserService loginUserService) {
		this.loginUserService = loginUserService;
	}

}
