import com.whizz.EventMovieclip;
import mx.utils.Delegate;
/**
 * ...
 * @author Scott Humphrey
 */

class com.whizz.ui.MovieClipButton extends EventMovieclip 
{
	public static var CLICK:String = "click";
	public static var RELEASE:String = "release";
	function MovieClipButton() {
		this.gotoAndStop(1);
		this.onPress = Delegate.create(this, onPressEvent);
		this.onRelease = this.onReleaseOutside = Delegate.create(this, onReleaseEvent);
	}
	public function release():Void {
		onReleaseEvent();
	}
	public function press():Void {
		onPressEvent();
	}
	private function onRollOver():Void {
		this.gotoAndStop(2);
	}
	private function onRollOut():Void {
		this.gotoAndStop(1);
	}
	private function onPressEvent():Void {
		this.gotoAndStop(3);
		dispatchEvent( { target:this, type:MovieClipButton.CLICK } );
	}
	private function onReleaseEvent():Void {
		this.gotoAndStop(1);
		dispatchEvent( { target:this, type:MovieClipButton.RELEASE } );
	}
}