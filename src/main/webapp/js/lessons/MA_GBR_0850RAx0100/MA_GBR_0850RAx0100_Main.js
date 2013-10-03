(function (lib, img, cjs, whizz) {

	var p; // shortcut to reference prototypes

// stage content:
	(lib.MA_GBR_0850RAx0100_Main = function() {
		this.initialize();

		// timeline function:
		this.frame_0 = function() {
			//==========================================================================================================================
			// INITIALIZE
			this.init = function() {
				this.qNum = 0;
				this.attempt = 0;
				this.asked = false;
				this.totalQuestionsAvailable = 10;
				this.totalQuestionsTobeAsked = 10;
				this.qCount = 0;
				this.askedQno = [];
				//----------------------------------------------------------------------------------------
				this.questionBank = [];
				this.columns = [whizz.lang.TP_A,whizz.lang.TP_B,whizz.lang.TP_C,whizz.lang.TP_D,whizz.lang.TP_E,whizz.lang.TP_F];
				this.rows = ["1", "2", "3", "4", "5", "6"];
				var xCoor = 109;
				var yCoor = 311;
				this.torchButtons = [];

				for (var i = 0; i<6; i++) {
					this.torchButtons[i] = [];

					for (var j=0; j<6; j++) {
						this.questionBank.push({
							label: this.columns[i]+this.rows[j],
							row: j,
							col: i
						});

						var torchButton = new lib.TorchButton();
						torchButton.x = xCoor+i*41.3;
						torchButton.y = yCoor-j*34.7;
						torchButton.col = i;
						torchButton.row = j;
						torchButton.addEventListener("click", this.torchButtonClickHandler);
						this.addChild(torchButton);
						this.torchButtons[i][j] = torchButton;
					}
				}

				this.questionBank = this.questionBank.sort(function(){return 0.5 - Math.random();});
				this.wabbits = [];

				this.qRandom();
			};
			//==========================================================================================================================
			// Q RANDOM
			this.qRandom = function() {
				if (this.qCount<this.totalQuestionsTobeAsked) {
					var Qno = this.qNum = parseInt(Math.random() * this.totalQuestionsAvailable);
					for (var i=0; i<=this.askedQno.length; i++) {
						if (Qno == this.askedQno[i]) {
							this.asked = true;
							break;
						} else {
							this.asked = false;
						}
					}
					if (!this.asked) {
						this.askedQno.push(Qno);
					}
					this.newQuestion();
				} else {
					whizz.myManager.enableButtons(false);
					whizz.myManager.closeContent();
				}
			};
			//==========================================================================================================================
			// NEW QUESTION
			this.newQuestion = function() {
				if (this.asked) {
					this.qRandom();
				} else {
					//-----------------------manju-------------------------------
					whizz.myManager.incQuestion();
					//-----------------------manju-------------------------------
					this.qCount++;
					this.attempt = 0;
					// Coding starts after this point
					this.initializeQ();
				}
			};
			//==========================================================================================================================
			// DO OK
			this.doOk = function() {
				this.setButton(1);
				// Change the conditions as per the movie's requirement
				if (this.stateOfQuestion == "finished") {
					this.qRandom();
				} else {
					if (this.tryAgainFlag == 1) {
						this.tryAgain();
					} else {
						if (this.checkingAnswer()) {
							whizz.myManager.setScore(this.totalQuestionsTobeAsked);
							this.celebration();
							this.stateOfQuestion = "finished";
						} else {
							if (this.attempt == 0) {
								this.attempt = 1;
								this.tryAgainFlag = 1;
								this.help();
								this.stateOfQuestion = "Notfinished";
								whizz.myManager.setHelp(1);
							} else if (this.attempt == 1) {
								this.negative();
								this.stateOfQuestion = "finished";
							}
						}
					}
				}
			};

			//==========================================================================================================================
			// SET BUTTONS
			//==========================================================================================================================
			// SET BUTTONS
			//1 = DISABLE OK BUTTON
			//2 = ENABLE OK BUTTON
			//3 = HIDE ONLY RIGHT ARROW BUT SHOW LEFT ARROW
			//4 = SHOW ONLY RIGHT ARROW AND HIDE LEFT ARROW
			//5 = HIDE BOTH ARROW
			//6 = SHOW BOTH ARROW
			this.setButton = function(param) {
				switch(param){
					case 1:
						whizz.myManager.hideOK(true);
						break;

					case 2:
						whizz.myManager.hideOK(false);
						break;

					case 3:
						whizz.myManager.hideLeftRight(false);
						whizz.myManager.hideLeftRight("right");
						break;

					case 4:
						whizz.myManager.hideLeftRight(false);
						whizz.myManager.hideLeftRight("left");
						break;

					case 5:
						whizz.myManager.hideLeftRight(true);
						break;

					case 6:
						whizz.myManager.hideLeftRight(false);
						break;
				}
			};
			//==========================================================================================================================
			this.initializeQ = function() {
				//----------------------------------------------------------------------------------------
				this.setButton(1);
				this.stateOfQuestion = "Notfinished";

				this.door.gotoAndPlay("open");
				this.tryAgainFlag = 0;

				this.resetButtons();
				this.ansText.label.text = "";
				this.ansText.x = -100;
				this.ansText.y = -100;
				this.question = this.questionBank[this.qNum];
				whizz.lang.setAnswer(this.columns[this.question.col], this.rows[this.question.row]);


				var randomWabbit;
				if (this.qCount == 10) {
					randomWabbit = "Cat";
					this.messageBox.setMessage(whizz.lang.Q11);
				} else {
					this.messageBox.setMessage(whizz.lang.Q1);
					var ran = parseInt(Math.random()*4);
					var wabbits = ["BlackWabbit", "GreyWabbit", "PinkWabbit", "WhiteWabbit"];
					randomWabbit = wabbits[ran];
				}
				whizz.stopSound();
				whizz.playSound("Q1");

				this.wabbit = new lib[randomWabbit]();
				this.wabbit.x = 409;
				this.wabbit.y = 94;

				this.addChildAt(this.wabbit, this.getNumChildren() - 2);

				this.getValueOnTicket();
				//----------------------------------------------------------------------------------------
				//Wabbit Coming into the cinema hall
				this.wabbit.scaleX = 0.3;
				this.wabbit.scaleY = 0.3;
				this.wabbit.gotoAndPlay("bouncing");

				this.wabbits.push(this.wabbit);
				this.getValueOnTicket();

				this.initialize_counter = 0;
				this.addEventListener("tick", this.initialize_enterFrame);

				this.enableButtons();
				//----------------------------------------------------------------------------------------
			};

			this.initialize_enterFrame = function(e) {
				var self = e.target;
				if (self.wabbit.scaleX<0.65) {
					self.initialize_counter++;
					self.wabbit.scaleX += self.initialize_counter / 100;
					self.wabbit.scaleY += self.initialize_counter / 100;
				} else {
					self.removeEventListener("tick", self.initialize_enterFrame);
					self.wabbit.gotoAndStop(0);
					console.log("row: "+self.question.row)
					var r = self.question.row - 1;
					console.log("r: "+r)
					var i = r > -1 ? self.getChildIndex(self["row"+r]) : self.getNumChildren() - 2;
					console.log(i);
					self.addChildAt(self.wabbit, i);


					//var i = self.getChildIndex(this["row"+])
					//self.addChildAt(self.wabbit, this.getNumChildren()-2);
					self.getValueOnTicket();
				}
			};

			//==========================================================================================================================
			this.getValueOnTicket = function() {
				this.wabbit.board.label.text = this.question.label;
			};
			//==========================================================================================================================
			//==========================================================================================================================
			this.torchButtonClickHandler = function(e) {
				var self = e.target;
				self.parent.clickedTorch = self;
				self.parent.resetButtons();
				self.parent.clickedTorch.gotoAndStop(2);
				self.parent.setButton(2);
			};
			//==========================================================================================================================
			this.resetButtons = function() {
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						this.torchButtons[i][j].gotoAndStop(0);
					}
				}
			};
			//==========================================================================================================================
			this.disableButtons = function() {
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						this.torchButtons[i][j].mouseEnabled = false;
					}
				}
			};
			//==========================================================================================================================
			this.enableButtons = function() {
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						this.torchButtons[i][j].mouseEnabled = true;
					}
				}
			};
			//==========================================================================================================================
			this.checkingAnswer = function() {
				var t = this.clickedTorch;
				if (this.questionBank[this.qNum].col == t.col && this.questionBank[this.qNum].row == t.row) {
					return 1;
				} else {
					return 0;
				}
			};
			//==========================================================================================================================
			this.celebration = function(){
				this.disableButtons();
				this.torchButtons[this.question.col][this.question.row].gotoAndPlay("blue");
				if (this.qCount == 10) {
					this.messageBox.setMessage(whizz.lang.P11a);
				} else {
					this.messageBox.setMessage(whizz.lang.P1a);
				}
				this.movingToAPosition();
			};

			this.movingToAPosition = function(){
				this.door.gotoAndPlay("close");
				this.wabbit.gotoAndPlay("bouncing");
				this.getValueOnTicket();
				this.celebration_counter = 0;
				this.addEventListener("tick", this.celebration_enterFrame);
			};

			this.celebration_enterFrame = function(e){
				var self = e.target;
				self.celebration_counter++;
				var torchButton = self.torchButtons[self.question.col][self.question.row];
				self.wabbit.y -= (self.wabbit.y-torchButton.y+35)/6;
				if (self.celebration_counter >= 30) {
					self.wabbit.x -= (self.wabbit.x-torchButton.x)/12;
				}
				if (self.celebration_counter == 100) {
					self.wabbit.gotoAndPlay("sit");
					self.getValueOnTicket();
					self.resetButtons();
				} else if (self.celebration_counter == 130){
					self.removeEventListener("tick", self.celebration_enterFrame);
					if (self.qCount == 10) {
						self.messageBox.setMessage(whizz.lang.P11b);
					} else {
						self.messageBox.setMessage(whizz.lang.P1b);
					}
					self.setButton(2);
				}
			};


			//==========================================================================================================================
			this.help = function() {
				this.messageBox.setMessage();
				//----------------------------------------------------------------------------------------
				this.disableButtons();
				this.clickedTorch.gotoAndPlay("red");

				this.help_counter = 0;
				this.addEventListener("tick", this.help_enterFrame);
			};

			this.help_enterFrame = function(e){
				var self = e.target;
				self.help_counter++;
				switch(self.help_counter){
					case 50:
						self.resetButtons();
						for (i=0; i<6; i++) {
							self.torchButtons[self.question.col][i].gotoAndPlay("white");
						}
						self.messageBox.setMessage(whizz.lang.H1a);
						break;

					case 100:
						for (i=0; i<6; i++) {
							self.torchButtons[i][self.question.row].gotoAndPlay("white");
						}
						self.messageBox.setMessage(whizz.lang.H1b);
						break;

					case 150:
						self.messageBox.setMessage(whizz.lang.H1c);
						break;

					case 200:
						self.removeEventListener("tick", self.help_enterFrame);
						self.messageBox.setMessage(whizz.lang.H1d);
						self.setButton(2);
						break;
				}
			};

			//==========================================================================================================================
			this.tryAgain = function() {
				this.messageBox.setMessage(whizz.lang.H2);
				this.tryAgainFlag = 0;
				this.resetButtons();
				this.enableButtons();
			}
			//==========================================================================================================================
			this.negative = function() {
				this.messageBox.setMessage();
				this.disableButtons();
				this.clickedTorch.gotoAndPlay("red");

				this.negative_counter = 0;
				this.addEventListener("tick", this.negative_enterFrame);
			};

			this.negative_enterFrame = function(e) {
				var self = e.target;
				self.negative_counter++;
				switch(self.negative_counter){
					case 50:
						self.messageBox.setMessage(whizz.lang.P2a);
						self.resetButtons();

						for (i=0; i<6; i++) {
							self.torchButtons[self.question.col][i].gotoAndStop("blue1");
						}
						break;

					case 60:
						for (i=0; i<6; i++) {
							self.torchButtons[i][self.question.row].gotoAndStop("yellow");
						}
						break;

					case 120:
						self.messageBox.setMessage(whizz.lang.P2b);
						var torchButton = self.torchButtons[self.question.col][self.question.row];
						torchButton.gotoAndPlay("green");
						self.addChild(self.ansText);
						self.ansText.label.text = self.question.label;
						self.ansText.x = torchButton.x;
						self.ansText.y = torchButton.y;
						break;

					case 200:
						self.rabbitJumpOut();
						self.messageBox.setMessage(whizz.lang.P2c);
						break;
				}
			};

			this.rabbitJumpOut = function() {
				console.log("jumpOut")
				//Wabbit Coming Out of the cinema hall
				this.wabbit.gotoAndPlay("bouncing");
				this.getValueOnTicket();

				this.jumpOut_counter = 0;
				this.addEventListener("tick", this.jumpOut_enterFrame);
			};

			this.jumpOut_enterFrame = function(e) {
				var self = e.target;
				if (self.wabbit.scaleX>0.3) {
					self.jumpOut_counter++;
					self.wabbit.scaleX -= self.jumpOut_counter / 100;
					self.wabbit.scaleY -= self.jumpOut_counter / 100;
				} else {
					self.removeEventListener("tick", self.jumpOut_enterFrame);
					self.wabbit.gotoAndStop(1);
					self.wabbit.scaleX = 0.3;
					self.wabbit.scaleY = 0.3;
					self.getValueOnTicket();
					self.door.gotoAndPlay("close");
					self.removeChild(self.wabbit);
					self.setButton(2);
				}
			};


			this.wabbitsRunAway = function(){
				console.log("wabbitsRunAway")
				for (var i=0; i<9; i++) {
					this.wabbits[i].gotoAndPlay("bouncing");
				}

				this.runAway_counter = 0;
				this.addEventListener("tick", this.runAway_enterFrame);
			};

			this.runAway_enterFrame = function(e){
				var self = e.target;
				if (self.runAway_counter<30) {
					self.runAway_counter++;
					for (var i=0; i<9; i++) {
						self.wabbits[i].x += (i%2 == 0) ? 30 : -30
					}
				} else {
					self.removeEventListener("tick", self.runAway_enterFrame);
				}
			};



			whizz.myManager.setOKCallback(this, this.doOk);
			// enable buttons to exercise state
			whizz.myManager.enableButtons("ex");
			// hide arrows and ok
			this.setButton(1);
			this.setButton(5);

			whizz.myManager.setTotalQuestion(10);
			whizz.myManager.unpauseTimer();
			// *************************************************
			// record stage of movie
			this.movieStage = "ex";
			// *************************************************
			// set tool tip
			//toolTip._visible = false;
			//toolTipRollover.tabEnabled = false;
			// *************************************************

			this.messageBox = new whizz.MessageBox("messageBox");
			this.messageBox.x = 33;
			this.messageBox.y = 43;
			this.addChild(this.messageBox);

			this.init();
		};

		// ansText
		this.ansText = new lib.AnsText();
		this.ansText.setTransform(647.7,160.3);

		// labeling_rows
		this.text = new cjs.Text("6", "bold 16px Arial", "#FFFFFF");
		this.text.lineHeight = 18;
		this.text.lineWidth = 13;
		this.text.setTransform(55,126.4);

		this.text_1 = new cjs.Text("5", "bold 16px Arial", "#FFFFFF");
		this.text_1.lineHeight = 18;
		this.text_1.lineWidth = 13;
		this.text_1.setTransform(55,160.9);

		this.text_2 = new cjs.Text("4", "bold 16px Arial", "#FFFFFF");
		this.text_2.lineHeight = 18;
		this.text_2.lineWidth = 13;
		this.text_2.setTransform(55,192.4);

		this.text_3 = new cjs.Text("3", "bold 16px Arial", "#FFFFFF");
		this.text_3.lineHeight = 18;
		this.text_3.lineWidth = 13;
		this.text_3.setTransform(55,226.9);

		this.text_4 = new cjs.Text("2", "bold 16px Arial", "#FFFFFF");
		this.text_4.lineHeight = 18;
		this.text_4.lineWidth = 13;
		this.text_4.setTransform(55,261.9);

		this.text_5 = new cjs.Text("1", "bold 16px Arial", "#FFFFFF");
		this.text_5.lineHeight = 18;
		this.text_5.lineWidth = 13;
		this.text_5.setTransform(55,297.9);

		// labeling_colums
		this.text_6 = new cjs.Text(whizz.lang.TP_F, "bold 16px Arial", "#FFFFFF");
		this.text_6.lineHeight = 18;
		this.text_6.lineWidth = 13;
		this.text_6.setTransform(311,331.9);

		this.text_7 = new cjs.Text(whizz.lang.TP_E, "bold 16px Arial", "#FFFFFF");
		this.text_7.lineHeight = 18;
		this.text_7.lineWidth = 13;
		this.text_7.setTransform(268,331.9);

		this.text_8 = new cjs.Text(whizz.lang.TP_D, "bold 16px Arial", "#FFFFFF");
		this.text_8.lineHeight = 18;
		this.text_8.lineWidth = 13;
		this.text_8.setTransform(226.5,331.9);

		this.text_9 = new cjs.Text(whizz.lang.TP_C, "bold 16px Arial", "#FFFFFF");
		this.text_9.lineHeight = 18;
		this.text_9.lineWidth = 13;
		this.text_9.setTransform(184,331.9);

		this.text_10 = new cjs.Text(whizz.lang.TP_B, "bold 16px Arial", "#FFFFFF");
		this.text_10.lineHeight = 18;
		this.text_10.lineWidth = 13;
		this.text_10.setTransform(145,331.9);

		this.text_11 = new cjs.Text(whizz.lang.TP_A, "bold 16px Arial", "#FFFFFF");
		this.text_11.lineHeight = 18;
		this.text_11.lineWidth = 13;
		this.text_11.setTransform(102,331.9);

		// door
		this.door = new lib.Door();
		this.door.setTransform(440.5,80.7,1,1,0,0,180,-0.1,-0.1);

		// row0
		this.row0 = new lib.Row();
		this.row0.setTransform(213.2,311.3);
		this.row0.cache(-125,-21,252,43,whizz.scale);

		// row1
		this.row1 = new lib.Row();
		this.row1.setTransform(213.2,276.1);
		this.row1.cache(-125,-21,252,43,whizz.scale);

		// row2
		this.row2 = new lib.Row();
		this.row2.setTransform(213.2,240.9);
		this.row2.cache(-125,-21,252,43,whizz.scale);

		// row3
		this.row3 = new lib.Row();
		this.row3.setTransform(213.2,206);
		this.row3.cache(-125,-21,252,43,whizz.scale);

		// row4
		this.row4 = new lib.Row();
		this.row4.setTransform(213.2,172.1);
		this.row4.cache(-125,-21,252,43,whizz.scale);

		// row5
		this.row5 = new lib.Row();
		this.row5.setTransform(213.2,138.1);
		this.row5.cache(-125,-21,252,43,whizz.scale);

		// Background
		this.background = new lib.Background();
		this.background.setTransform(273.8,202.3,1,1,0,0,0,275.9,223.7);
		this.background.cache(-1,-1,556,451,whizz.scale);

		this.addChild(this.background,this.door,this.row5,this.row4,this.row3,this.row2,this.row1,this.row0,this.text_11,this.text_10,this.text_9,this.text_8,this.text_7,this.text_6,this.text_5,this.text_4,this.text_3,this.text_2,this.text_1,this.text,this.ansText);
		this.frame_0();
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-2,-21.4,666.8,447.3);

})(lib_MA_GBR_0850RAx0100 = lib_MA_GBR_0850RAx0100||{}, images = images||{}, createjs = createjs||{}, whizz = whizz||{});
var lib_MA_GBR_0850RAx0100, images, createjs, whizz;