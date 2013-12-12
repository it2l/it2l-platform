


public class Italk2learn2 {

	public native String hello(byte[] buf);
	
	//public native void hello();
	
	public static void main(String[] args) {
		System.out.println("Hello World Java!");
		try {
			byte[] buf= new byte[1024];
			String result=new Italk2learn2().hello(buf);
			//new Italk2learn().hello();
			System.out.println(result);
		} catch (Exception e) {
			System.err.println(e);
			System.exit(1);
		}
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
