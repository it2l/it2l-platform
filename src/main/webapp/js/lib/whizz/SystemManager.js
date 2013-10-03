/**
 * Author: Grzegorz Michlicki
 */

(function(whizz){

	/******************************************************************************************
	 * SYSTEM MANAGER
	 ******************************************************************************************/
	var SystemManager = function(header, ui){
		this.init(header, ui);
	};

	SystemManager.prototype = {
		init: function(header, ui){
			this.okButton = ui;
			this.okButton.okButton.addEventListener("click", this.pressOK.bind(this));
			this.okButton.leftArrow.addEventListener("click", this.pressLeft.bind(this));
			this.okButton.rightArrow.addEventListener("click", this.pressRight.bind(this));
			this.header = header;

			this.setupTimer();
		},

		okButton: null,
		header: null,
		lessonScore: {},

		tempScore: {
			totalQuestions: 0,
			questionCounter: 0,
			score: 0,
			percentage: 0,
			helpUsed: [0,0,0]
		},

		closeContent: function(){
			this.lessonScore.completed = true;
			this.lessonScore.score = this.tempScore.score;
			this.lessonScore.percentage = this.tempScore.percentage;
			this.lessonScore.helpUsed = this.tempScore.helpUsed;
			//this.lessonScore.whizz_cj = this.whizz_ea();
			/*
			this.sendResults();
			*/
			this.lessonScore = null;
			this.okButtonCallback = {};
			this.rightArrowCallback = {};
			this.leftArrowCallback = {};

			//window.a.endLesson();
			whizz.nextLesson();
		},

		incQuestion: function(){
			++this.tempScore.questionCounter;
			this.header.setQuestion(this.tempScore.questionCounter);
		},
		setTotalQuestion: function(totalQs){
			this.tempScore.totalQuestions = totalQs;
			this.header.setQuestionTotal(totalQs);
		},
		setScore: function(totalQs, score){
			//if (this.lessonScore == null) return;
			score = score || 1;

			if (totalQs === undefined){
				this.tempScore.score = this.tempScore.score + score;
				this.tempScore.percentage = this.tempScore.score * 10;
			} else {
				this.tempScore.score = this.tempScore.score + score;
				this.tempScore.percentage = this.__convertToDecimalPlaces(this.tempScore.score / totalQs * 100, 1);
			}

			this.header.setScore(this.tempScore.score);
		},

		setHelp: function(helpLevel){
			//if (this.lessonScore == null) return;
			if (helpLevel === undefined){
				var h1 = parseFloat(this.tempScore.helpUsed[0]) + 1;
				this.tempScore.helpUsed[0] = h1;
				this.header.setHelp(0, h1);
			}else{
				++this.tempScore.helpUsed[helpLevel];
				this.header.setHelp(helpLevel, this.tempScore.helpUsed[helpLevel]);
			}
		},

		setupTimer: function(){
			this.timeData = {
				lastTime: new Date(),
				totalTime: 0,
				paused: false
			};

			this.pauseTimer();
		},

		pauseTimer: function(){
			if (this.timeData == null || this.timeData.paused) return;

			this.timeData.paused = true;
			var currentTime = new Date();
			this.timeData.totalTime = this.timeData.totalTime + (currentTime - this.timeData.lastTime);
		},

		unpauseTimer: function(){
			if (this.timeData == null || !this.timeData.paused) return;
			this.timeData.paused = false;
			this.timeData.lastTime = new Date();
		},

		getTime: function(){
			if (this.timeData == null){
				return 0;
			} else if (this.timeData.paused){
				return this.timeData.totalTime;
			} else {
				var currentTime = new Date();
				return (currentTime - this.timeData.lastTime + this.timeData.totalTime);
			}
		},

		resetTimer: function(){
			if (this.timeData != null){
				var totalTime = this.getTime();
				this.timeData = null;
				return totalTime;
			}
		},

		enableButtons: function(whizz_cd, ignore_state){

			if (whizz_cd === true){
				this.okButton.visible = true;
			} else if (whizz_cd == "tp") {
				this.okButton.visible = true;
			} else if (whizz_cd == "ex") {
				this.okButton.visible = true;
			} else {
				this.okButton.visible = false;
			}

			if (!ignore_state) {
				this.hideOK(true);
				this.hideLeftRight(true);
			}
		},

		hideOK: function(whizz_cd){
			console.log("hideok")
			this.okButton.okButton.alpha = whizz_cd ? 0.5 : 1;
			//this.okButton.okButtonLabel.alpha = whizz_cd ? 0.5 : 1;

			this.okButton.okButton.mouseEnabled = !whizz_cd;
		},

		hideLeftRight: function(state){
			if (state == "left"){
				this.okButton.leftArrow.visible = false;
				this.okButton.rightArrow.visible = true;
				return;
			}
			if (state == "right"){
				this.okButton.leftArrow.visible = true;
				this.okButton.rightArrow.visible = false;
				return;
			}
			this.okButton.leftArrow.visible = !state;
			this.okButton.rightArrow.visible = !state;
		},

		// Buttons callbacks
		setOKCallback: function(target, callback){
			this.okButtonCallback = {target: target, callback: callback};
		},
		setLeftCallback: function(target, callback){
			this.leftArrowCallback = {target: target, callback: callback};
		},
		setRightCallback: function(target, callback){
			this.rightArrowCallback = {target: target, callback: callback};
		},
		pressOK: function(e){
			this.okButtonCallback.callback.apply(this.okButtonCallback.target, arguments);
		},
		pressLeft: function(e){
			this.leftArrowCallback.callback.apply(this.leftArrowCallback.target, arguments);
		},
		pressRight: function(e){
			this.rightArrowCallback.callback.apply(this.rightArrowCallback.target, arguments);
		},
		clear: function(e){
			this.rightArrowCallback = {};
			this.leftArrowCallback = {};
			this.okButtonCallback = {};

			this.okButton.okButton.removeAllEventListeners("click");
			this.okButton.leftArrow.removeAllEventListeners("click");
			this.okButton.rightArrow.removeAllEventListeners("click");
		},

		__convertToDecimalPlaces: function(num, places){
			var pow = Math.pow(10, places);
			return Math.round(num * pow) / pow;
		}
	};

	whizz.SystemManager = SystemManager;

})(whizz = whizz || {});

var whizz;
