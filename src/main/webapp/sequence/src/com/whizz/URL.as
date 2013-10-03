/*	Returns the URL path of a SWF. This is useful for loading in external 
	sources into an SWF that itself is loaded into another SWF that is not in the same directory. */
class com.whizz.URL {
	public static function getPath(__url:String):String {
		var urlPath:String;
		if (__url.lastIndexOf("\\") != -1) {
			urlPath = __url.substring(0, __url.lastIndexOf("\\")+1);
		} else {
			urlPath = __url.substring(0, __url.lastIndexOf("/")+1);
		}
		return urlPath;
	}
}
