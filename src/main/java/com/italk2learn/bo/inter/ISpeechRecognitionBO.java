package com.italk2learn.bo.inter;

import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

public interface ISpeechRecognitionBO {
	
	public SpeechRecognitionResponseVO getSpeechRecognition(SpeechRecognitionRequestVO request) throws ITalk2LearnException;
	
	public SpeechRecognitionResponseVO sendNewAudioChunk(SpeechRecognitionRequestVO request) throws ITalk2LearnException;
	
	public SpeechRecognitionResponseVO initASREngine(SpeechRecognitionRequestVO request) throws ITalk2LearnException;
	
	public SpeechRecognitionResponseVO closeASREngine(SpeechRecognitionRequestVO request) throws ITalk2LearnException;

}
