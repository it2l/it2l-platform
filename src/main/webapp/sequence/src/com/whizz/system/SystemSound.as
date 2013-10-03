/**
 * ...
 * @author Scott Humphrey
 */
class com.whizz.system.SystemSound 
{
	private static var SOUND_PATH:String = ""; // This needs to be hard set depending on where the content sound files are as the content doesn't set it
	private var __name;
	private var __target;
	private var _sound:Sound;
	
	public function SystemSound(__name,__target) 
	{
		trace("SoundManager Created")
		trace(__name); 
		this.__name = __name;
		this.__target = __target;
	}
	public static function set soundPath(sound_path:String):Void {
		SystemSound.SOUND_PATH = sound_path;
	}
	public static function get soundPath():String {
		return SystemSound.SOUND_PATH;		
	}
	public function loadSounds(callbackTarget:MovieClip, callback:String, args):Void {
		trace("loadSounds:" + callbackTarget + " " + callback);
		/*
		var soundLoader:MovieClipLoader = new MovieClipLoader();
		var soundListener:Object = new Object();
		soundListener.onLoadError = function():Void {
			trace("Sound Load Error");
		}
		soundListener.onLoadInit = function(target_mc:MovieClip):Void {
			trace("loadInit");
			soundLoader.removeListener(this);
			callbackTarget[callback]();
		}
		soundLoader.addListener(soundListener);
		this.__target = this.__target.createEmptyMovieClip("SoundMc", 1);
		trace("this.__target: " + this.__target);
		trace("soundPath: " + soundPath);
		soundLoader.loadClip(soundPath + this.__name + ".swf", this.__target);
		*/
		///*
		var loader:MovieClip = this.__target.createEmptyMovieClip("SoundLoader", 2);
		this.__target = this.__target.createEmptyMovieClip("SoundMc", 1);
		loader.content = this.__target;
		loader.onEnterFrame = function():Void {
			if (this.content.getBytesLoaded() == this.content.getBytesTotal() && this.content.getBytesTotal() > 32) {
				callbackTarget[callback]();
				delete this.onEnterFrame;
				this.removeMovieClip();
			}
		}
		this.__target.loadMovie(soundPath + this.__name + ".swf");
		//*/
	}
	public function isCreated():Boolean {
		// Will return false if the sound manager object wasn't created
		return __target != null;
	}
	public function createSound(__label:String):Void {
		trace("createSound: " + __label);
		_sound = new Sound(__target);
		_sound.attachSound(__label);
		_sound.start();
	}
	public function playSound(__label:String):Void {
		/* In the old sound manager the playSound function jumped the timeline to that frame label
		 * from where the createSound function was called. In practice the frame labels equal the attachSound id
		 * so the sound can be attached here rather than jumping to that timeline
		*/
		trace("this.__target: " + this.__target);
		trace("__label: " + __label);
		trace("this.__target.frames: " + this.__target._totalframes);
		//this.__target.gotoAndPlay(__label);
		createSound(__label);
	}
	public function stopSound():Void {
		_sound.stop();
	}
	
}