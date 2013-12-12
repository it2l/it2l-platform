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
import org.springframework.web.servlet.ModelAndView;

import com.italk2learn.bo.inter.ILoginUserService;
import com.italk2learn.bo.inter.ISpeechRecognitionBO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

/**
 * Handles requests for the application speech recognition.
 */
@Controller
@RequestMapping("/speechRecognition")
public class SpeechRecognitionController {
	
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
	@RequestMapping(value = "/",method = RequestMethod.POST)
	public String getSpeechRecognition(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller");
		//String filename = req.getParameter("filename");
	    //byte[] contents = req.getParameter("contents").getBytes();
		//byte[] bytes = Hex.decode(data);
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
		//model.addAttribute(response);
		return response.getResponse();
	}
	
	/**
	 * Main method to get a transcription of Sails Software
	 */
	@RequestMapping(value = "/speechRecognitionBackup",method = RequestMethod.POST)
	public void getSpeechRecognitionBackup() {
		logger.info("TESTING getSpeechRecognition");
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
			//request.setHeaderVO(CheckConstants.HEADER_ES);
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser("tludmetal");
			final SpeechRecognitionResponseVO response = this.speechRecognitionService.sendDataToSails(request);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
	}
	
	/**
	 * Main method to get a transcription of Sails Software
	 */
	@RequestMapping(value = "/speechRecognitionBackupAlice",method = RequestMethod.POST)
	public void getSpeechRecognitionBackupAlice() {
		logger.info("TESTING getSpeechRecognition");
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
			//request.setHeaderVO(CheckConstants.HEADER_ES);
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser("tludmetal");
			final SpeechRecognitionResponseVO response = this.speechRecognitionService.sendDataToSails(request);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
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
