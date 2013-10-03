import mx.events.EventDispatcher;
class com.whizz.system.SystemButton extends MovieClip {
	private static var _MOUSE_OVER:String = "mouse_over";
	private static var _MOUSE_OUT:String = "mouse_out";
	private static var _CLICK:String = "click";
	private static var _PRESS:String = "press";
	private static var _ENABLED:String = "enabled";
	private static var _TP:String = "tp";
	private static var _EX:String = "ex";
	
	private var scope_mc:MovieClip;
	private var callback_function:String;
	private var _enabled:Boolean = true;
	private var _keyCode:Number;
	private var _keyCodeListener:Boolean = false;
	private var _button_state:String = SystemButton.EX;
	private var exColor:MovieClip;
	private var tpColor:MovieClip;
	function SystemButton() {
	}
	/**
	 * Public Methods
	 */
	public function addEventListener() {};
 	public function removeEventListener() { };
	
	public static function get MOUSE_OVER():String {
		return _MOUSE_OVER;
	}
	public static function get MOUSE_OUT():String {
		return _MOUSE_OUT;
	}
	public static function get PRESS():String {
		return _PRESS;		
	}
	public static function get CLICK():String {
		return _CLICK;		
	}
	public static function get ENABLED():String {
		return _ENABLED;		
	}
	public static function get TP():String {
		return _TP;		
	}
	public static function get EX():String {
		return _EX;		
	}
	public function set buttonState(_button_state:String):Void {
		trace("_button_state: " + _button_state);
		this._button_state = _button_state;
	}
	public function get buttonState():String {
		return _button_state;
	}
	public function set enabled(_enabled:Boolean):Void {
		if (this._enabled == _enabled) {
			// Button is already in this state so don't continue
			return;
		}
		this._enabled = _enabled;
		if (this._enabled) {
			this.gotoAndStop("out");
		} else {
			this.gotoAndStop("disabled");
		}
		dispatchEvent( { target:this, enabled:this._enabled, type:SystemButton.ENABLED } );
	}
	public function get enabled():Boolean {
		return this._enabled;
	}

	public function setCallback(scope_mc:MovieClip, function_name:String):Void {
		this.scope_mc = scope_mc;
		this.callback_function = function_name;
	}
	public function set keyCode(_keyCode:Number):Void {
		this._keyCode = _keyCode;
		initKey();
	}
	/**
	 * Private Methods
	 */
	private function dispatchEvent() {};
	public function onRelease():Void {
		if (enabled) {
			over();
			doRelease();
		}
	}
	private function doRelease():Void {
			/* There is a bug with the content in that the case of the function names don't always match the case of the callback
			 For example, doOK and doOk. This was OK in Flash Player 6, but FP8 is much stricter. So, first we validate the function and if it's undefined search for a case insensitive match.
			 I would like to put this in the setCallback, but it doesn't always seem to work as the callback/function name may be changed at a later date by the content.
			 */
			if (scope_mc[callback_function] == null) {
				for (var x in scope_mc) {
					if (x.toUpperCase() == callback_function.toUpperCase()) {
						callback_function = x;
						break;
					}
				}
			}
			if (scope_mc[callback_function] == null) {
				trace("No valid callback function");
				return;
			}
			scope_mc[callback_function]();
	}
	private function onPress():Void {
		if (enabled) {
			this.gotoAndStop("down");
			dispatchEvent( { target:this, type:SystemButton.PRESS } );
		}
	}
	private function onRollOver():Void {
		if (enabled) {
			over();
			dispatchEvent( { target:this, type:SystemButton.MOUSE_OVER } );
		}
	}
	private function onRollOut():Void {
		if (enabled) {
			this.gotoAndStop("out");
			dispatchEvent( { target:this, type:SystemButton.MOUSE_OUT } );
		}
	}
	private function onKeyUp():Void {
		if (enabled) {
			doRelease();
		}
	}
	private function over():Void {
		this.gotoAndStop("over");
		switch(buttonState) {
			case SystemButton.TP:
				this.exColor._visible = false;
				this.tpColor._visible = true;
			break;
			default:
				this.exColor._visible = true;
				this.tpColor._visible = false;
			break;
		}
		trace(this);
	}
	private function initKey():Void {
		if (_keyCodeListener) {
			// The listener is already registered
			return;
		}
		_keyCodeListener = true;
		var keyListener:Object = new Object();
		keyListener.class_ref = this;
		keyListener.onKeyUp = function() {
			if (Key.getCode() == this.class_ref._keyCode) {
				this.class_ref.onKeyUp();
			}
		}
		Key.addListener(keyListener);
	}
}
