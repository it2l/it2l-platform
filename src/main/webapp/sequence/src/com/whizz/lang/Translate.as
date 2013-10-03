/**
 * ...
 * @author ...
 */
import com.whizz.utils.StringUtil;
class com.whizz.lang.Translate 
{
	public static var GBR:String = "GBR";
	public static var USA:String = "USA";
	public static var RUS:String = "RUS";
	private static var COUNTRY:String = Translate.GBR;
	public static function setCountry(_country:String):Void {
		Translate.COUNTRY = _country;
	}
	public static function getCountry():String {
		return Translate.COUNTRY;
	}
	public static function text(_txt:String):String {
		if (Translate.COUNTRY != Translate.USA)
			return _txt;
		_txt = StringUtil.replace(_txt, "Maths", "Math");
		_txt = StringUtil.replace(_txt, "maths", "math");
		return _txt;
	}
}