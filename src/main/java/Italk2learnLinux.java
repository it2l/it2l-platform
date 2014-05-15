import com.italk2learn.vo.SpeechRecognitionRequestVO;

public class Italk2learnLinux {
	
	//JLF: Send chunks of audio to Speech Recognition engine each 5 seconds
    public native void sendNewAudioChunk(byte[] buf);
    //JLF: Open the listener and retrieves true if the operation was right. It is executed when the user is logged in the platform and change the exercise
    public native boolean initSpeechRecognitionEngine();
    //JLF: Close the listener and retrieves the whole transcription. It is executed each time the exercise change to another
    public native String close();
    //JLF Indicates if ASREngine is initialised or no
    private boolean isInit=false;
    
//	private static final Logger logger = LoggerFactory
//			.getLogger(Italk2learn.class);
	
	//JLF: Send chunks of audio to Speech Recognition engine
	public void sendNewChunk(SpeechRecognitionRequestVO request) {
		System.out.println("sendNewChunk() ---Sending data from Java!");
		try {
			this.sendNewAudioChunk(request.getData());
		} catch (Exception e) {
//			logger.error(e.toString());
			System.err.println(e);
		} 
	}
	
	//JLF:Open the listener and retrieves true if the operation was right
	public boolean initSpeechRecognition() {
		System.out.println("initSpeechRecognition()---Open Listener from Java!");
		boolean result=false;
		try {
			result=this.initSpeechRecognitionEngine();
			System.out.println("initSpeechRecognition()---"+result);
			isInit=result;
			return result;
		} catch (Exception e) {
//			logger.error(e.toString());
			System.err.println(e);
		} 
		return result;
	}
	
	//JLF:Close the listener and retrieves the whole transcription
	public String closeEngine() {
		System.out.println("closeEngine()---Close Listener from Java!");
		String result="";
		try {
			result=this.close();
			System.out.println(result);
			return result;
		} catch (Exception e) {
//			logger.error(e.toString());
			System.err.println(e);
		} 
		return result;
	}
	
	// JLF: Retrieves data from ASRResult on real time
	public String realTimeSpeech(String text) {
//		logger.info(text);
		System.out.println(text);
	    return text;
	}
	
	static {
		try {
			System.loadLibrary("iT2L");
			//JLF: Loads the specific library, using absolute path
			//System.load("/var/lib/tomcat7/shared/classes/libiT2L.so");
		} catch (Exception e) {
//			logger.error(e.toString());
			System.err.println(e);
		}
	}

}
