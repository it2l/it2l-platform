/**
 * ...
 * @author Scott Humphrey
 */

class com.whizz.utils.StringUtil
{
	public static function replace(original_string:String,searchStr:String, replaceStr:String):String {	
		return original_string.split(searchStr).join(replaceStr);
	}
	public static function capitalize(str:String):String {
		return str.charAt(0).toUpperCase() + str.substr(1);
	}
}