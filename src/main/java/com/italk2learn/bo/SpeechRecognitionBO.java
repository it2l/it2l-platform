package com.italk2learn.bo;

import java.io.StringReader;
import java.lang.reflect.Method;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

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
			System.out.println(e);
		}
		return null;
	}
	
	/*
	 * Calling ASREngine through JNI 
	 * Only is possible call JNI in default java package for that reason I use reflection
	 * Open a new connection with ASREngine 
	 */
	public SpeechRecognitionResponseVO openListener(SpeechRecognitionRequestVO request) throws ITalk2LearnException{
		SpeechRecognitionResponseVO res=new SpeechRecognitionResponseVO();
		try {
			Class asrClass = Class.forName("Italk2learn");
			Method asrMethod = asrClass.getMethod("openListener", new Class[] { SpeechRecognitionRequestVO.class });
			boolean asrReturned = (Boolean)asrMethod.invoke(asrClass.newInstance());
			//String value=parseTranscription(convertStringToDocument(asrReturned));
			res.setOpen(asrReturned);
			return res;
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		}
		return null;
	}
	
	
	/*
	 * Calling ASREngine through JNI 
	 * Only is possible call JNI in default java package for that reason I use reflection
	 * Close connection with ASREngine and retrieves the whole transcription 
	 */
	public SpeechRecognitionResponseVO closeListener(SpeechRecognitionRequestVO request) throws ITalk2LearnException{
		SpeechRecognitionResponseVO res=new SpeechRecognitionResponseVO();
		try {
			Class asrClass = Class.forName("Italk2learn");
			Method asrMethod = asrClass.getMethod("closeListener", new Class[] { SpeechRecognitionRequestVO.class });
			String asrReturned = asrMethod.invoke(asrClass.newInstance(),new SpeechRecognitionRequestVO[] { request}).toString();
			String value=parseTranscription(convertStringToDocument(asrReturned));
			res.setResponse(value);
			return res;
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		}
		return null;
	}
	
	/*
	 * Calling ASREngine through JNI 
	 * Only is possible call JNI in default java package for that reason I use reflection 
	 */
	public SpeechRecognitionResponseVO sendDataToSails(SpeechRecognitionRequestVO request) throws ITalk2LearnException{
		SpeechRecognitionResponseVO res=new SpeechRecognitionResponseVO();
		try {
			Class asrClass = Class.forName("Italk2learn");
			Method asrMethod = asrClass.getMethod("sendDataToSails", new Class[] { SpeechRecognitionRequestVO.class });
			String asrReturned = asrMethod.invoke(asrClass.newInstance(),new SpeechRecognitionRequestVO[] { request}).toString();
			res.setLiveResponse(asrReturned);
			return res;
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		}
		return null;
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
			System.out.println(e);
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

}
