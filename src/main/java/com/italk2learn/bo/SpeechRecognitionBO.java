package com.italk2learn.bo;

import java.io.File;
import java.io.StringReader;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.italk2learn.bo.inter.ISpeechRecognitionBO;
import com.italk2learn.exception.ITalk2LearnException;
import com.italk2learn.vo.SpeechRecognitionRequestVO;
import com.italk2learn.vo.SpeechRecognitionResponseVO;

@Service("speechRecognitionBO")
@Transactional(rollbackFor = { ITalk2LearnException.class, ITalk2LearnException.class })
public class SpeechRecognitionBO implements ISpeechRecognitionBO {
	
	private static final Logger logger = LoggerFactory
			.getLogger(SpeechRecognitionBO.class);
	
	private static String OS = System.getProperty("os.name").toLowerCase();
	private Class asrClass;
	private Method asrMethod;
	private boolean isInit=false;

	/*
	 * Calling directly ASREngine without JNI 
	 * 
	 */
	public SpeechRecognitionResponseVO getSpeechRecognition(SpeechRecognitionRequestVO request) throws ITalk2LearnException{
		try {
			String[] cmd = { "C:\\MMIndexer\\bin\\ASRSample.exe","en_ux","broadcast-news","base","C:\\prueba2.wav" };
	        Process p = Runtime.getRuntime().exec(cmd);
	        p.waitFor();
			return new SpeechRecognitionResponseVO("");
		}
		catch (Exception e){
			logger.error(e.toString());
			System.out.println(e);
		}
		return null;
	}
	
	/*
	 * Calling ASREngine through JNI 
	 * Only is possible call JNI in default java package for that reason I use reflection
	 * Open a new connection with ASREngine 
	 */
	public SpeechRecognitionResponseVO initASREngine(SpeechRecognitionRequestVO request) throws ITalk2LearnException{
		logger.debug("initASREngine()--- Init ASREngine");
		SpeechRecognitionResponseVO res=new SpeechRecognitionResponseVO();
		try {
			if (isInit==false) {
				if (isUnix()){
					File root = new File("/var/lib/tomcat7/webapps/italk2learn/WEB-INF/classes");
					URLClassLoader classLoader = URLClassLoader.newInstance(new URL[] { root.toURI().toURL() });
					asrClass = Class.forName("Italk2learnLinux",true, classLoader);
				} else if (isWindows()) {
					asrClass = Class.forName("Italk2learn");
				}
				asrMethod = asrClass.getMethod("initSpeechRecognition");
				isInit = (Boolean)asrMethod.invoke(asrClass.newInstance());
				res.setOpen(isInit);
				logger.debug("initASREngine()--- ASREngine initialised");
			} else {
				logger.debug("initASREngine()--- ASR Engine already initialised");
				System.out.println("sendNewAudioChunk()--- ASR Engine already initialised");
			}
			return res;
		} catch (Exception e) {
			logger.error(e.toString());
			//System.err.println(e);
		}
		return res;
	}
	
	
	/*
	 * Calling ASREngine through JNI 
	 * Only is possible call JNI in default java package for that reason I use reflection
	 * Close connection with ASREngine and retrieves the whole transcription 
	 */
	public SpeechRecognitionResponseVO closeASREngine(SpeechRecognitionRequestVO request) throws ITalk2LearnException{
		logger.debug("closeASREngine()--- Closing ASREngine");
		SpeechRecognitionResponseVO res=new SpeechRecognitionResponseVO();
		try {
			if (isInit==true) {
				asrMethod = asrClass.getMethod("closeEngine");
				String asrReturned = asrMethod.invoke(asrClass.newInstance()).toString();
				String value=parseTranscription(convertStringToDocument(asrReturned));
				res.setResponse(value);
				isInit=false;
				logger.debug("closeASREngine()--- ASREngine closed");
			} else {
				logger.debug("closeASREngine()--- ASR Engine not initialised");
				System.out.println("closeEngine()--- ASR Engine not initialised");
			}
			return res;
		} catch (Exception e) {
			logger.error(e.toString());
			//System.err.println(e);
		}
		return res;
	}
	
	/*
	 * Calling ASREngine through JNI 
	 * Only is possible call JNI in default java package for that reason I use reflection 
	 */
	public SpeechRecognitionResponseVO sendNewAudioChunk(SpeechRecognitionRequestVO request) throws ITalk2LearnException{
		logger.debug("sendNewAudioChunk()--- Sending new audio chunk");
		SpeechRecognitionResponseVO res=new SpeechRecognitionResponseVO();
		try {
			if (isInit==true) {
				asrMethod = asrClass.getMethod("sendNewChunk", new Class[] { SpeechRecognitionRequestVO.class });
				asrMethod.invoke(asrClass.newInstance(),new SpeechRecognitionRequestVO[] { request}).toString();
				logger.debug("sendNewAudioChunk()--- Audio chunk sent");
			} else {
				logger.debug("sendNewAudioChunk()--- ASR Engine not initialised");
				System.out.println("sendNewAudioChunk()--- ASR Engine not initialised");
			}	
			return res;
		} catch (Exception e) {
			logger.error(e.toString());
			//System.err.println(e);
		}
		return res;
	}
	
	/*
	 * Return parsed transcription
	 * 
	 */
	public String parseTranscription(Document doc) throws ITalk2LearnException{
		try {
			StringBuffer text = new StringBuffer();
//			File transcription = new File("C:\\Italk2LearnEnvironment\\workspaceServer\\Italk2learnFinal\\prueba2.xml");
//			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
//			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
//			Document doc = dBuilder.parse(transcription);
			doc.getDocumentElement().normalize();

			System.out.println("root of xml file" + doc.getDocumentElement().getNodeName());
			NodeList nodes = doc.getElementsByTagName("nbest");
			System.out.println("==========================");

			for (int i = 0; i < nodes.getLength(); i++) {
				Node node = nodes.item(i);
				if (node.getNodeType() == Node.ELEMENT_NODE) {
					Element element = (Element) node;
					System.out.println("word: " + getValues("word", element));
					text.append(getValues("word", element)+ " ");
				}
			}
			return text.toString();

		}
		catch (Exception e){
			logger.error(e.toString());
			//System.out.println(e);
		}
		return null;
	}
	
	private static Document convertStringToDocument(String xmlStr) {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); 
        DocumentBuilder builder; 
        try 
        { 
            builder = factory.newDocumentBuilder(); 
            Document doc = builder.parse( new InputSource( new StringReader( xmlStr ) ) );
            return doc;
        } catch (Exception e) {
        	logger.error(e.toString());
            e.printStackTrace(); 
        }
        return null;
    }
	
	
	private static String getValues(String tag, Element element) {
		StringBuffer text= new StringBuffer();
		for (int i = 0; i < element.getElementsByTagName(tag).getLength(); i++) {
			NodeList nodes = element.getElementsByTagName(tag).item(i).getChildNodes();
			Node node = (Node) nodes.item(0);
			text.append(node.getNodeValue()+ " ");
		}
		return text.toString();
	}
	
	public static boolean isWindows() {
		 
		return (OS.indexOf("win") >= 0);
 
	}
 
	public static boolean isUnix() {
 
		return (OS.indexOf("nix") >= 0 || OS.indexOf("nux") >= 0 || OS.indexOf("aix") > 0 );
 
	}

}
