package com.italk2learn.bo.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;

import org.apache.log4j.Logger;
import org.gienah.testing.junit.Configuration;
import org.gienah.testing.junit.Dependency;
import org.gienah.testing.junit.SpringRunner;
import org.gienah.testing.junit.Transactional;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.italk2learn.bo.inter.ISpeechRecognitionBO;
import com.italk2learn.vo.HeaderVO;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

@RunWith(value = SpringRunner.class)
@Configuration(locations = { "spring/web-application-config.xml" })
public class SpeechRecognitionTest {
	
	private static final Logger LOGGER = Logger
	.getLogger(SpeechRecognitionTest.class);
	
	@Dependency
	private ISpeechRecognitionBO speechRecognitionService;

	@Test
	public void testInitEngine() throws Exception{
		LOGGER.info("TESTING testInitEngine");
		boolean testOk = false;
		SpeechRecognitionRequestVO request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser("tludmetal");
		SpeechRecognitionRequestVO request2= new SpeechRecognitionRequestVO();
		request2.setHeaderVO(new HeaderVO());
		request2.getHeaderVO().setLoginUser("student1");
		try {
			final SpeechRecognitionResponseVO response = this.speechRecognitionService.initASREngine(request);
			if (response.isOpen()== true) {
				this.speechRecognitionService.initASREngine(request2);
				if (response.isOpen()== true) {
					testOk = true;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e);
		}
		Assert.assertTrue(testOk);
	}
	
	@Test
	public void testSendAudio() throws Exception{
		LOGGER.info("TESTING getSpeechRecognition");
		SpeechRecognitionRequestVO request= new SpeechRecognitionRequestVO();
		request.setHeaderVO(new HeaderVO());
		request.getHeaderVO().setLoginUser("student1");
		SpeechRecognitionRequestVO request2= new SpeechRecognitionRequestVO();
		request2.setHeaderVO(new HeaderVO());
		request2.getHeaderVO().setLoginUser("student2");
		File f=new File("C:\\recordings\\bbc1.wav");
		long l=f.length();
		System.out.println("the file is " + l + " bytes long");
		FileInputStream finp = null;
		byte[] b=new byte[(int)l];
		try {
		finp = new FileInputStream(f);
		int i;
		i=finp.read(b);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		byte[] aux1=Arrays.copyOfRange(b, 0, (int)l/4);
		byte[] aux2=Arrays.copyOfRange(b, ((int)l/4)+1, (int)l/2);
		byte[] aux3=Arrays.copyOfRange(b, ((int)l/2)+1, (int)(3*l)/4);
		byte[] aux4=Arrays.copyOfRange(b, ((int)(3*l)/4), (int)l-1);
		try {
		Boolean open1=this.speechRecognitionService.initASREngine(request).isOpen();
		Boolean open2=this.speechRecognitionService.initASREngine(request2).isOpen();
		if (open1){
			request.setData(aux1);
			this.speechRecognitionService.sendNewAudioChunk(request);
			request.setData(aux2);
			this.speechRecognitionService.sendNewAudioChunk(request);
			request.setData(aux3);
			this.speechRecognitionService.sendNewAudioChunk(request);
			this.speechRecognitionService.closeASREngine(request);
		}
		if (open2){
			request2.setData(aux1);
			this.speechRecognitionService.sendNewAudioChunk(request2);
			request2.setData(aux2);
			this.speechRecognitionService.sendNewAudioChunk(request2);
			request2.setData(aux3);
			this.speechRecognitionService.sendNewAudioChunk(request2);
			request2.setData(aux4);
			this.speechRecognitionService.sendNewAudioChunk(request2);
		}
		Boolean open3=this.speechRecognitionService.initASREngine(request).isOpen();
		if (open3){
			request.setData(aux1);
			this.speechRecognitionService.sendNewAudioChunk(request);
			request.setData(aux2);
			this.speechRecognitionService.sendNewAudioChunk(request);
			request.setData(aux3);
			this.speechRecognitionService.sendNewAudioChunk(request);
			request.setData(aux4);
			this.speechRecognitionService.sendNewAudioChunk(request);
		}
		
		this.speechRecognitionService.closeASREngine(request);
		this.speechRecognitionService.closeASREngine(request2);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public ISpeechRecognitionBO getSpeechRecognitionService() {
		return speechRecognitionService;
	}

	public void setSpeechRecognitionService(
			ISpeechRecognitionBO speechRecognitionService) {
		this.speechRecognitionService = speechRecognitionService;
	}

}
