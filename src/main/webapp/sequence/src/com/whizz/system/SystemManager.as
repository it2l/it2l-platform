import mx.events.EventDispatcher;
import com.whizz.system.*;
class com.whizz.system.SystemManager {
	/**
	 * Dispatched when the score changes
	 * @eventType com.whizz.system.SystemManager.SCORE_CHANGE
	 */
	[Event(name = "score_change", type = "com.whizz.system")]
	/**
	 * Dispatched when the help changes
	 * @eventType com.whizz.system.SystemManager.HELP_CHANGE
	 */
	[Event(name = "help_change", type = "com.whizz.system")]
	/**
	 * Dispatched when the question number changes
	 * @eventType com.whizz.system.SystemManager.QUESTION_CHANGE
	 */
	[Event(name = "question_change", type = "com.whizz.system")]
	/**
	 * Dispatched when the exercise content loads
	 * @eventType com.whizz.system.SystemManager.CONTENT_LOADED
	 */
	[Event(name = "content_loaded", type = "com.whizz.system")]
	/**
	 * Dispatched when the exercise content closes
	 * @eventType com.whizz.system.SystemManager.CLOSE_CONTENT
	 */
	[Event(name = "close_content", type = "com.whizz.system")]
	
	private static var mixit = EventDispatcher.initialize(SystemManager.prototype);
	public static var SCORE_CHANGE:String = "score_change";
	public static var HELP_CHANGE:String = "help_change";
	public static var QUESTION_CHANGE:String = "question_change";
	public static var CLOSE_CONTENT:String = "close_content";
	public static var CONTENT_LOADED:String = "content_loaded";
	private var root:MovieClip;
	private var content_mc:MovieClip;
	private var interface_path:String = "";
	private var content_path:String = "";
	private var button_group:MovieClip;
	private var ok_btn:SystemButton;
	private var left_btn:SystemButton;
	private var right_btn:SystemButton;
	private var content_score:SystemScore;
	private var question_counter:SystemQuestionCounter;
	private var sound_manager:SystemSound;
	private var skip_TP:Boolean = false;
	private var content_wrapper:MovieClip;
	private var time_obj:Object;
	private var flashplayerVersion:Number = 6;
	/**
	 * Constructor 
	 * @param	root
	 */
	function SystemManager(root:MovieClip) {
		this.root = root;
	}
	/**
	 * @private
	 */
	function dispatchEvent() {
	}
	/**
	 * @private
	 */
	function addEventListener() {
	}
	/**
	 * @private
	 */
	function removeEventListener() {
	}
	/**
	 * @private
	 */
	public function set skipTP(_skip:Boolean):Void {
		skip_TP = _skip;
	}
	/**
	 * Indicates whether the Teacher Page should be skipped
	 */
	public function get skipTP():Boolean {
		return skip_TP;
	}
	public function initialize():Void {
		enableButtons(false);
	}
	public function set interfacePath(interface_path:String):Void {
		this.interface_path = interface_path;
	}
	public function get interfacePath():String {
		return this.interface_path;
	}
	public function set soundManager(sound_manager:SystemSound):Void {
		this.sound_manager = sound_manager;
	}
	public function get soundManager():SystemSound {
		return this.sound_manager;
	}
	/**
	 * @private
	 */
	public function set contentContainer(content_mc:MovieClip):Void {
		this.content_mc = content_mc;
	}
	/**
	 * Returns the MovieClip of where the content is loaded
	 */
	public function get contentContainer():MovieClip {
		return content_mc;
	}
	/**
	 * @private
	 */
	public function set contentPath(content_path:String):Void {
		trace(content_path);
		this.content_path = content_path;
	}
	/**
	 * Returns the location of the exercise content
	 */
	public function get contentPath():String {
		return content_path;
	}
	/**
	 * Loads the Whizz Menu into the _root
	 */
	public function loadMenu():Void {
		var menu_mc:MovieClip = root.createEmptyMovieClip("menu", 10);
		if(flashplayerVersion == 8) {
			var menu_loader:MovieClipLoader = new MovieClipLoader();
			menu_loader.loadClip(interfacePath + "menu.swf", menu_mc);
		} else {
			menu_mc.loadMovie(interfacePath + "menu.swf");
		}
	}
	/**
	 * Tells the SystemManager the _parent MovieClip of the OK, Left and Right buttons
	 * @param	group
	 */
	public function setOKGroup(group:MovieClip):Void {
		// The Movieclip that contains the OK, Left and Right buttons
		this.button_group = group;
	}
	/**
	 * Sets the OK button in the SystemManager
	 * @param	ok_btn
	 */
	public function setOK(ok_btn:SystemButton):Void {
		this.ok_btn = ok_btn;
		this.ok_btn.keyCode = Key.ENTER;
	}
	/**
	 * Sets the Left button in the SystemManager
	 * @param	left_btn
	 */
	public function setLeft(left_btn:SystemButton):Void {
		this.left_btn = left_btn;
		this.left_btn.keyCode = Key.LEFT;
	}
	/**
	 * Sets the Right button in the SystemManager
	 * @param	right_btn
	 */
	public function setRight(right_btn:SystemButton):Void {
		this.right_btn = right_btn;
		this.right_btn.keyCode = Key.RIGHT;
	}
	/**
	* The callback function when the OK button is pressed
	* 
	* @param target_mc The scope for where the function is
	* @param function_name The name of the function. 
	*/
	public function setOKCallback(target_mc:MovieClip, function_name:String):Void {
		ok_btn.setCallback(target_mc, function_name);
	}
	/**
	 * Calls the callback function for the OK button
	 * @see setOKCallback
	 */
	public function doOK():Void {
		ok_btn.onRelease();
	}
	/**
	 * Sets the type or shows/hides the OK/Left/Right buttons
	 * @example enableButtons("tp")
	 * @example enableButtons("ex")
	 * @example enableButtons(true)
	 * @example enableButtons(false)
	 * @param	_hide
	 */
	public function enableButtons(_hide):Void {
		trace("enableButtons: " + _hide);
		if (typeof _hide == "string") {
			switch (_hide) {
			case "tp" :
				//left_btn._visible = false;
				ok_btn.buttonState = left_btn.buttonState = right_btn.buttonState = SystemButton.TP;
				break;
			case "ex" :
				//right_btn._visible = false;
				ok_btn.buttonState = left_btn.buttonState = right_btn.buttonState = SystemButton.EX;
				break;
			}
			button_group._visible = true;
		} else {
			button_group._visible = _hide;
		}
	}
	/**
	 * Sets the visibilty of the OK button
	 * @example To hide the OK button hideOK(true)
	 * @example To show the OK button hideOK(false)
	 * @param	_hide
	 */
	public function hideOK(_hide:Boolean):Void {
		ok_btn.enabled = !_hide;
	}
	/**
	 * Sets the visibility of the Left/Right arrows
	 * @example Parsing "left" will hide the Left arrow hideLeftRight("left")
	 * @example Parsing "right" will hide the Right arrow hideLeftRight("right")
	 * @example Parsing a Boolean will show or hide the arrows hideLeftRight(false) or hideLeftRight(true)
	 * @param	_hide
	 */
	public function hideLeftRight(_hide):Void {
		// _hide can be either a string or a booleam
		// String means to hide that arrow, boolean means to show/hide them both
		if (typeof _hide == "string") {
			switch (_hide) {
			case "left" :
				left_btn._visible = left_btn.enabled = false;
				right_btn._visible = right_btn.enabled = true;
				break;
			case "right" :
				left_btn._visible = left_btn.enabled = true;
				right_btn._visible = right_btn.enabled = false;
				break;
			}
		} else {
			left_btn._visible = !_hide;
			right_btn._visible = !_hide;
			left_btn.enabled = !_hide;
			right_btn.enabled = !_hide;
		}
	}
	/**
	* The callback function when the Left arrow button is pressed
	* 
	* @param target_mc The scope for where the function is
	* @param function_name The name of the function. 
	*/
	public function setLeftCallback(target_mc:MovieClip, function_name:String):Void {
		left_btn.setCallback(target_mc, function_name);
	}
	/**
	 * Calls the callback function for the Left arrow button
	 * @see setLeftCallback
	 */
	public function pressLeft():Void {
		left_btn.onRelease();
	}
	/**
	* The callback function when the Right arrow button is pressed
	* 
	* @param target_mc The scope for where the function is
	* @param function_name The name of the function. 
	*/
	public function setRightCallback(target_mc:MovieClip, function_name:String):Void {
		right_btn.setCallback(target_mc, function_name);
	}
	/**
	 * Calls the callback function for the Right arrow button
	 * @see setRightCallback
	 */
	public function pressRight():Void {
		right_btn.onRelease();
	}
	/**
	 * Sets the number of questions to show in the question counter
	 * @param	number_of_questions
	 */
	public function setTotalQuestion(number_of_questions:Number):Void {
		trace("setTotal");
		question_counter.setTotalQuestion(number_of_questions);
		var event_obj:Object = {target:question_counter, type:SystemManager.QUESTION_CHANGE};
		dispatchEvent(event_obj);
	}
	/**
	 * Gets the number of questions set in setTotalQuestions
	 * @return Number
	 * @see setTotalQuestions
	 */
	public function getTotalQuestion():Number {
		return question_counter.total;
	}
	/**
	 * Call to increment the question counter.
	 */
	public function incQuestion():Void {
		question_counter.incQuestion();
		var event_obj:Object = {target:question_counter, type:SystemManager.QUESTION_CHANGE};
		dispatchEvent(event_obj);
	}
	/**
	 * Get the current question number
	 * @return Number
	 */
	public function getQuestion():Number {
		return question_counter.question;
	}
	/**
	 * Set the score for the current question
	 * @param	number_of_questions The number of questions in the exercise
	 * @param	score_for_question The score this question. Usually 1, but maybe 0.5 if help is used
	 */
	public function setScore(number_of_questions:Number, score_for_question:Number):Void {
		content_score.setScore(number_of_questions, score_for_question);
		var event_obj:Object = {target:content_score, type:SystemManager.SCORE_CHANGE};
		dispatchEvent(event_obj);
	}
	/**
	 * Get the accumalative score for the exercise
	 * @return
	 */
	public function getScore():Number {
		return content_score.getScore();
	}
	/**
	 * Get the score as a percentage
	 * @return
	 */
	public function getPercentage():Number {
		return content_score.getPercentage();
	}
	/**
	 * Call when is used
	 * @param	help_level The level of the help used. Either 1, 2 or 3
	 */
	public function setHelp(help_level:Number):Void {
		content_score.setHelp(help_level);
		var event_obj:Object = {target:content_score, type:SystemManager.HELP_CHANGE, help_level:help_level};
		dispatchEvent(event_obj);
	}
	/**
	 * Gets the number of helps at the parsed level
	 * @param	help_level The level of help you want to get
	 * @return Number
	 */
	public function getHelp(help_level:Number):Number {
		return content_score.getHelp(help_level);
	}
	private function initTimer():Void {
		time_obj = {};
		time_obj.paused = true;
		time_obj.start_time = 0;
		time_obj.elapsed_time = 0;
	}
	/**
	 * Pauses the timer for the exercise. Usually paused during the Teacher Page
	 */
	public function pauseTimer():Void {
		if (time_obj == null || time_obj.paused)
			return;
		getTime();
		time_obj.paused = true;
	}
	/**
	 * Unpauses the timer. Usually called once the questions start and remains unpaused until the end of the exercise
	 */
	public function unpauseTimer():Void {
		if (time_obj == null || !this.time_obj.paused)
			return;
		time_obj.start_time = new Date().getTime();
		time_obj.paused = false;
	}
	public function getTime():Number {
		if(!time_obj.paused) {
			var elapsed_time:Number = new Date().getTime() - time_obj.start_time;
			time_obj.elapsed_time += elapsed_time;
			time_obj.start_time = new Date().getTime();
		}
		return Math.floor(time_obj.elapsed_time);
	}
	/**
	 * Loads the exercise. Dispatches CONTENT_LOADED when completed
	 * @param	code The exercise code. For example: MA_GBR_0900AAx0100
	 */
	public function selectContent(code:String):Void {
		trace("selectContent");
		/* 	Loads the content
		As the content is FP6, they share different _global spaces, so for the myManager calls within the content to work globally, 
		we load in a FP6 wrapper movie that sets a _global.myManager object to the myManager object parsed to it through the MovieClipLoader.
		Then we load the content into this wrapper and as this wrapper acts as a proxy for the content and the FP8, the content still works as originally
		*/
		/*******************************************
		CONTENT SCORE OBJECT
		*******************************************/
		content_score = new SystemScore();
		var event_obj:Object = {target:content_score, type:SystemManager.SCORE_CHANGE};
		dispatchEvent(event_obj);
		question_counter = new SystemQuestionCounter();
		event_obj = {target:question_counter, type:SystemManager.QUESTION_CHANGE};
		dispatchEvent(event_obj);
		// Initialise a new Score object
		/*******************************************
		START THE LOADING PROCESS
		*******************************************/
		var myManager:SystemManager = this;
		// Stores a reference to this instance so it can be parsed to the wrapper
		if(flashplayerVersion == 8) {
			content_wrapper = contentContainer.createEmptyMovieClip("proxy", 1);
			var wrapper_loader:MovieClipLoader = new MovieClipLoader();
			var content_loader:MovieClipLoader = new MovieClipLoader();
			var wrapper_listener:Object = new Object();
			var content_listener:Object = new Object();
			wrapper_listener.onLoadInit = function(mc:MovieClip) {
				//Once the wrapper (proxy) has loaded create a holder and load it in
				/* Here we used to create a movieclip, however some content uses the Global removeMovieClip, that would inadvertently
				try and remove the content itself. Before this failed as the content holder was created at authortime and you were the none the wiser.
				But as the content holder WAS created at runtime the removeMovieClip was successful therefor removing the content.
				Now the proxy loader clip contains an authortime placed MC to load the content in */
				var content_holder:MovieClip = mc.content_holder;
				content_loader.loadClip(myManager.contentPath + code+".swf", content_holder);
			};
			wrapper_listener.onLoadComplete = function(target_mc:MovieClip, httpStatus:Number):Void  {
				//target_mc._lockroot = true;
				target_mc.myManager = myManager;
				target_mc.mySoundManager = myManager.soundManager;
				target_mc.SoundManager = SystemSound;
				SystemSound.soundPath = myManager.contentPath;
				initTimer();
			};
			content_listener.onLoadComplete = function(target_mc:MovieClip, httpStatus:Number):Void {
				//target_mc._lockroot = true;
				myManager.dispatchEvent({target:target_mc, type:SystemManager.CONTENT_LOADED});
			}
			content_listener.onLoadInit = function(mc:MovieClip) {
				mc._lockroot = true;
			};
			wrapper_loader.addListener(wrapper_listener);
			content_loader.addListener(content_listener);
			wrapper_loader.loadClip("proxy.swf", content_wrapper);
		} else {
			var contentLoader:MovieClip = contentContainer._parent.createEmptyMovieClip("loader", 99);
			trace("contentLoader: " + contentLoader);
			contentLoader.onEnterFrame = function():Void {
				trace(myManager.contentContainer.getBytesLoaded() + " " + myManager.contentContainer.getBytesTotal() + " "+ myManager.contentContainer._width);
				if (myManager.contentContainer.getBytesLoaded() == myManager.contentContainer.getBytesTotal() && myManager.contentContainer.getBytesTotal() > 32 && myManager.contentContainer._width > 0) {
					myManager.dispatchEvent({target:myManager.contentContainer, type:SystemManager.CONTENT_LOADED});
					myManager.initTimer();
					delete this.onEnterFrame;
					this.removeMovieClip();
				}
			}
			contentContainer.loadMovie(this.contentPath + code + ".swf");
			trace(contentContainer + " "+ this.contentPath + code + ".swf");
		}
	}
	/**
	 * Clears the exercise and dispatches the CLOSE_CONTENT event
	 */
	public function closeContent():Void {
		// Bring the wrapper to a level that can be successfully removed from
		content_wrapper.removeMovieClip();
		enableButtons(false);
		var event_obj:Object = {target:this, type:SystemManager.CLOSE_CONTENT};
		trace("Close Content: " + event_obj);
		dispatchEvent(event_obj);
	}
}
