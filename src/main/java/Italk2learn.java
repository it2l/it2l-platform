import org.apache.log4j.Logger;

import com.italk2learn.vo.SpeechRecognitionRequestVO;

public class Italk2learn {
	
	private static final Logger LOGGER = Logger.getLogger(Italk2learn.class);
	
	//JLF: Send chunks of audio to Speech Recognition engine each 5 seconds
    public native void speechrecognition(byte[] buf);
    //JLF: Open the listener and retrieves true if the operation was right. It is executed when the user is logged in the platform and change the exercise
    public native boolean openASRListener();
    //JLF: Close the listener and retrieves the whole transcription. It is executed each time the exercise change to another
    public native String closeASRListener();
	
	//JLF: Send chunks of audio to Speech Recognition engine
	public void sendDataToSails(SpeechRecognitionRequestVO request) {
		System.out.println("Sending data from Java!");
		LOGGER.info("Sending data from Java!");
		try {
			this.speechrecognition(request.getData());
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		} 
	}
	
	//JLF:Open the listener and retrieves true if the operation was right
	public boolean openListener() {
		System.out.println("Open Listener from Java!");
		LOGGER.info("Open Listener from Java!");
		boolean result=false;
		try {
			result=this.openASRListener();
			System.out.println(result);
			return result;
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		} 
		return result;
	}
	
	//JLF:Close the listener and retrieves the whole transcription
	public String closeListener() {
		System.out.println("Close Listener from Java!");
		LOGGER.info("Close Listener from Java!");
		String result="";
		try {
			result=this.closeASRListener();
			System.out.println(result);
			return result;
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		} 
		return result;
	}
	
	// JLF: Retrieves data from ASRResult on real time
	public String realTimeSpeech(String text) {
	    System.out.println(text);
	    return text;
	}
	
	static {
		try {
			System.loadLibrary("iT2L");
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		}
	}

}
