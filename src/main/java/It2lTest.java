
public class It2lTest {

	/**
	 * @param args
	 */
	private static byte[] data;
	
	public native String hello(byte[] buf);
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("Hello World Java!");
		String result="";
		try {
			result=new Italk2learn().hello(data);
			System.out.println(result);
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		} 
	}
	static {
		try {
			System.loadLibrary("iT2L");
			System.loadLibrary("/usr//Work/workspace/JNI/hello.so");
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		}

	}

}
