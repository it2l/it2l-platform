package com.italk2learn.util;

import java.io.File;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class ASRJava {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			String[] cmd = { "C:\\MMIndexer\\bin\\ASRSample.exe","en_ux","it2l","base","C:\\prueba2.wav" };
	        Process p = Runtime.getRuntime().exec(cmd);
	        p.waitFor();
	        parseTranscription();
		}
		catch (Exception e){
			System.out.println(e);
		}

	}
	
	/*
	 * Return parsed transcription
	 * 
	 */
	public static String parseTranscription() throws Exception{
		try {
			StringBuffer text = new StringBuffer();
			File transcription = new File("C:\\Italk2LearnEnvironment\\workspaceServer\\Italk2learnFinal\\prueba2.xml");
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(transcription);
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
			System.out.println(e.toString());
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
        	System.out.println(e.toString());
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
