package com.italk2learn.controller;

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
import com.italk2learn.bo.inter.IPerceiveDifficultyTaskBO;
import com.italk2learn.bo.inter.ISpeechRecognitionBO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.PTDRequestVO;
import com.italk2learn.vo.PTDResponseVO;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

/**
 * JLF: Handles requests for the application speech recognition.
 */
@Controller
@Scope("session")
@RequestMapping("/speechRecognition")
public class SpeechRecognitionController{
	

	private static final Logger logger = LoggerFactory
			.getLogger(SpeechRecognitionController.class);
	
	//Request petition
	private SpeechRecognitionRequestVO request;
    
	//Response petition
	private SpeechRecognitionResponseVO response= new SpeechRecognitionResponseVO();
	
	private String username;
	
	private byte[] audio=new byte[0];
	
	
	/*Services*/
	private ISpeechRecognitionBO speechRecognitionService;
	private IPerceiveDifficultyTaskBO perceiveDifficultyTaskService;
	private ILoginUserService loginUserService;

    @Autowired
    public SpeechRecognitionController(ISpeechRecognitionBO speechRecognition,IPerceiveDifficultyTaskBO perceiveDifficultyTask, ILoginUserService loginUserService) {
    	this.setSpeechRecognitionService(speechRecognition);
    	this.perceiveDifficultyTaskService=perceiveDifficultyTask;
    	this.loginUserService=loginUserService;
    }
	
	/**
	 * Main method to get a transcription of Sail Software
	 */
	@RequestMapping(value = "/sendData",method = RequestMethod.POST)
	@ResponseBody
	public void getSpeechRecognition(@RequestBody byte[] body) {
		logger.info("JLF --- Speech Recognition Main Controller");
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser(getUsername());
		request.setData(body);
		concatenateAudioStream(body);
		try {
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().sendNewAudioChunk(request));
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
		logger.info("JLF --- Speech Recognition Main Controller");
		request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		this.setUsername(user);
		request.getHeaderVO().setLoginUser(user);
		try {
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().initASREngine(request));
			//Send first chunk always
			getSpeechRecognition(new byte[0]);
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
		request= new SpeechRecognitionRequestVO();
		if (body==null)
			body=new byte[0];
		try {
			request.setHeaderVO(new HeaderVO());
			request.getHeaderVO().setLoginUser(getUsername());
			request.getHeaderVO().setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			request.setData(body);
			concatenateAudioStream(body);
			request.setFinalByteArray(getAudio());
			getSpeechRecognitionService().saveByteArray(request);
			response=((SpeechRecognitionResponseVO) getSpeechRecognitionService().closeASREngine(request));
			return response.getResponse();
		} catch (Exception e){
			logger.error(e.toString());
		}
		return response.getResponse();
	}
	
	/**
	 * Method to get the perceive difficulty task at the end of each task
	 */
	@RequestMapping(value = "/callPTD",method = RequestMethod.POST)
	@ResponseBody
	public int callPTD(@RequestBody byte[] body) {
		logger.info("JLF --- Get PTD from Audio based difficulty classifier");
		PTDRequestVO req= new PTDRequestVO();
		PTDResponseVO res= new PTDResponseVO();
		try {
			req.setHeaderVO(new HeaderVO());
			req.getHeaderVO().setLoginUser(getUsername());
			req.getHeaderVO().setIdUser(getLoginUserService().getIdUserInfo(request.getHeaderVO()));
			req.setAudioByteArray(getAudio());
			res=getPerceiveDifficultyTaskService().callPTD(req);
			return res.getPTD();
		} catch (Exception e){
			logger.error(e.toString());
		}
		return res.getPTD();
	}
	
	private void concatenateAudioStream(byte[] body){
		//JLF:Copying byte array 
		byte[] destination = new byte[body.length + getAudio().length];
		// copy audio into start of destination (from pos 0, copy audio.length bytes)
		System.arraycopy(getAudio(), 0, destination, 0, getAudio().length);
		// copy body into end of destination (from pos audio.length, copy body.length bytes)
		System.arraycopy(body, 0, destination, getAudio().length, body.length);
    	//setAudio(Arrays.copyOfRange(destination, 0, destination.length));
		this.audio=destination.clone();
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public byte[] getAudio() {
		return audio;
	}

	public void setAudio(byte[] audio) {
		this.audio = audio;
	}

	public IPerceiveDifficultyTaskBO getPerceiveDifficultyTaskService() {
		return perceiveDifficultyTaskService;
	}

	public void setPerceiveDifficultyTaskService(
			IPerceiveDifficultyTaskBO perceiveDifficultyTaskService) {
		this.perceiveDifficultyTaskService = perceiveDifficultyTaskService;
	}

}
