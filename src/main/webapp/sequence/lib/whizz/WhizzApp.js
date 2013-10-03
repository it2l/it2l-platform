/**
 * Author: Grzegorz Michlicki
 */




(function(whizz, createjs, undefined){

	var p;

	whizz.boot = function(el, lessonID, lang, nextLesson){
		if (whizz.app) whizz.app.clear();
		whizz.app = new WhizzApp(el, lessonID, lang, nextLesson);
	};

	whizz.nextLesson = function(){
		console.log("nextLesson()");
		window.location.href = whizz.app.nextLesson+"-"+whizz.app.lang+".html";
	};

	whizz.closeLesson = function(){
		console.log("closeLesson()");
		window.location.href = whizz.app.lang == "en" ? "index.html?load=StudentRoom" : "index-"+whizz.app.lang+".html?load=StudentRoom";
	};

	whizz.nextScene = function(){
		whizz.app.nextScene();
	};

	var WhizzApp = function(el, lessonID, lang, nextLesson){

		console.log("new WhizzApp()")
		whizz.appRoot =
			this.appRoot = document.getElementById(el);

		// cleanup

		this.nextLesson = nextLesson;
		this.lessonID = lessonID;
		this.lang = lang || "en";
		this._init();
	};

	p = WhizzApp.prototype;

	p.nextLesson = "";
	p.lessonID = "";
	p.lib = {};
	p.lang = "";
	p.stage = null;
	p.root = null;
	p.appRoot = null;

	p._init = function(){
		this._initStage();
		this._initLesson();
		this._initHeader();
		this._initUI();
		this._initManager();
		//this._initSound();
		this._initTicker();
		this._initTP();
	};

	p._initStage = function(){
		this.appRoot.className = this.lessonID;
		var canvas = whizz.createEl("canvas", this.appRoot, "whizzCanvas");

		var canvasWidth = canvas.width = this.appRoot.offsetWidth;
		var canvasHeight = canvas.height = this.appRoot.offsetHeight;

		whizz.stage =
			this.stage = new createjs.Stage(canvas);

		if (createjs.Touch.isSupported)
			createjs.Touch.enable(this.stage);
		//else
			this.stage.enableMouseOver();

		var defaultWidth = 550;
		var defaultHeight = 400;

		var dp = defaultWidth / defaultHeight;
		var cp = canvasWidth / canvasHeight;

		whizz.scale = dp > cp ? canvasWidth / defaultWidth : canvasHeight / defaultHeight;
	};

	p._initLesson = function(){
		console.log("init Lesson libs: "+"lib_"+this.lessonID+", "+"lang_"+this.lang+"_"+this.lessonID);
		this.lib = window["lib_"+this.lessonID];
		whizz.lang = window["lang_"+this.lang+"_"+this.lessonID];
	};

	p._initHeader = function(){
		this.header = new whizz.Header(this.appRoot);
		var domEl = new createjs.DOMElement(this.header.element);
		domEl.setTransform(28 * whizz.scale, 10 * whizz.scale, whizz.scale, whizz.scale);
		this.stage.addChild(domEl);
		this.header.setHeaderTop(whizz.lang.topic);
	};

	p._initUI = function(){
		this.menu = new whizz.Menu();
		this.menu.setTransform(40*whizz.scale,355*whizz.scale,whizz.scale,whizz.scale);
		this.stage.addChild(this.menu);
		this.ui = new whizz.UI();
		this.ui.setTransform(420*whizz.scale,345*whizz.scale,whizz.scale,whizz.scale);
		this.stage.addChild(this.ui);
	};

	p._initManager = function(){
		this.manager = new whizz.SystemManager(this.header, this.ui);
		this.manager.setupTimer();
		whizz.myManager = this.manager;
	};

	p._initSound = function(){
		var s = createjs.Sound.play("empty");
		s.stop();
	};

	p._initTicker = function(){
		createjs.Ticker.setFPS(20);
		createjs.Ticker.addListener(this.stage);
		this.stage.update();
	};

	p._initTP = function(){
		console.log("init TP: " + this.lessonID + "_TP");
		this.root = new this.lib[this.lessonID + "_TP"]();
		this.root.setTransform(0, 0, whizz.scale, whizz.scale);
		this.stage.addChildAt(this.root, 0);
		this.stage.update();
	};

	p._initMain = function(){
		console.log("init Main: " + this.lessonID + "_Main");
		this.root = new this.lib[this.lessonID + "_Main"]();
		this.root.setTransform(0, 0, whizz.scale, whizz.scale);
		this.stage.addChildAt(this.root, 0);
		this.stage.update();
	};

	p.nextScene = function(){
		this.stage.removeChild(this.root);
		var children = this.appRoot.childNodes;

		// TODO: Temporary, hacky appRoot clean.
		// We should create all DOM children in global function and put them into Array.
		// Then just clear all from it.
		var i = 0;
		while(children.length > 2){
			var c = children[i];
			if (c.nodeName != "CANVAS" && c.id != "appHeader"){
				this.appRoot.removeChild(c);
			} else {
				i++;
			}
		}
		this._initMain();
	};

	p.clear = function(stage){
		createjs.Ticker.removeAllListeners();
		this.clearListeners(this.root);
		this.clearListeners(this.ui);
		this.stage.removeAllChildren();
		this.appRoot.innerHTML = "";
	};

	p.clearListeners = function(object){
		if(object.removeAllEventListeners){
			object.removeAllEventListeners();
			createjs.Tween.removeTweens(object);
			if(object.getChildAt){
				var i = 0;
				while(i < object.getNumChildren()) this.clearListeners(object.getChildAt(i++));
			}
			if(object.htmlElement && object.htmlElement.onkeypress) object.htmlElement.onkeypress = null;
		}
	};

	whizz.WhizzApp = WhizzApp;


})(whizz = whizz || {}, createjs = createjs || {});

var whizz, createjs;

