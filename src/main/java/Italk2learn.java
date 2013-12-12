import com.italk2learn.vo.SpeechRecognitionRequestVO;

public class Italk2learn {
	
	public native String hello(byte[] buf);
	
	public static String sendDataToSails(SpeechRecognitionRequestVO request) {
		System.out.println("Hello World Java!");
		String result="";
		try {
			result=new Italk2learn().hello(request.getData());
			System.out.println(result);
			return result;
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		} 
		return result;
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
