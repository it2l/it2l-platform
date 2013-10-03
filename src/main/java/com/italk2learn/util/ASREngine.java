package com.italk2learn.util;

public class ASREngine {
	
	 private native void sendData(char[] pointer, int size);
	 //JLF : Native method
	 //public size_t sendData( unsigned char* data, size_t size );
	 
	 public static void sendDataToSails(String args)
		 { 
		 	char[] pointer= args.toCharArray(); 
		 	new ASREngine().sendData(pointer, pointer.length);
		 }
	 	 static {
	 		try {
				LibraryLoader.loadLibrary("ASREngine");
			} catch (Exception e) {
				System.err.println(e);
				System.exit(1);
			}
		 }

}
