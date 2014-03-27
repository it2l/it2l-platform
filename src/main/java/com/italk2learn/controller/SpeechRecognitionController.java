package com.italk2learn.controller;

import java.io.File;
import java.io.FileInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
	@RequestMapping(value = "/",method = RequestMethod.POST)
	@ResponseBody
	public String getSpeechRecognition(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller");
		//user = (LdapUserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		//request.getHeaderVO().setLoginUser(user.getUsername());
		request.getHeaderVO().setLoginUser("tludmetal");
		request.setData(body);
		try {
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().sendDataToSails(request));
			return response.getResponse();
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response.getResponse();
	}
	
	/**
	 * Backup plan to get transcription for Gemma recordings
	 * Only shows the result in console
	 */
	@RequestMapping(value = "/speechRecognitionBackup",method = RequestMethod.POST)
	public void getSpeechRecognitionBackup() {
		logger.info("TESTING speechRecognitionBackupGemma");
		try {
			File f=new File("C:\\recordings\\gemma2.wav");
			long l=f.length();
			System.out.println("the file is " + l + " bytes long");
			FileInputStream finp=new FileInputStream(f);
			byte[] b=new byte[(int)l];
			int i;
			i=finp.read(b);
			SpeechRecognitionRequestVO request= new SpeechRecognitionRequestVO();
			request.setData(b);
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser("tludmetal");
			getSpeechRecognitionService().sendDataToSails(request);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
	}
	
	/**
	 * Backup plan to get transcription for Gemma recordings
	 * Only shows the result in console
	 */
	@RequestMapping(value = "/speechRecognitionBackupAlice",method = RequestMethod.POST)
	public void getSpeechRecognitionBackupAlice() {
		logger.info("TESTING speechRecognitionBackupAlice");
		try {
			File f=new File("C:\\recordings\\alice2.wav");
			long l=f.length();
			System.out.println("the file is " + l + " bytes long");
			FileInputStream finp=new FileInputStream(f);
			byte[] b=new byte[(int)l];
			int i;
			i=finp.read(b);
			SpeechRecognitionRequestVO request= new SpeechRecognitionRequestVO();
			request.setData(b);
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser("tludmetal");
			getSpeechRecognitionService().sendDataToSails(request);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
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
