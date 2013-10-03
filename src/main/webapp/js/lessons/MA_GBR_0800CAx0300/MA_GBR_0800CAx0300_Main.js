(function (lib, img, cjs, whizz) {

	var p; // shortcut to reference prototypes

// stage content:
	(lib.MA_GBR_0800CAx0300_Main = function() {
		this.initialize();


		// timeline function:
		this.frame_0 = function() {
			this.init = function() {
				//Set up basic variables for all questions
				this.Attached_Animal_Array = [];
				this.smallAnimals = [];
				this.animal_counter = 0;
				this.questionlargeAnimal = ["Duck", "Swan", "Crocodile", "Duck", "Swan", "Crocodile", "Duck", "Swan", "Crocodile", "Duck"];
				this.questionsmallAnimal = ["Duckling", "Cygnet", "Babycroc", "Duckling", "Cygnet", "Babycroc", "Duckling", "Cygnet", "Babycroc", "Duckling"];
				//----------------------------------------------------------------------------------
				this.qNum = 0;
				this.asked = false;

				//this.celebrationSound = new Sound(this);
				this.totalQuestionsAvailable = 1;
				this.totalQuestionsTobeAsked = 1;
				this.QCount = 0;
				this.askedQno = [];
				this.Qrandom();

				this.addEventListener("tick", function(e) {
					var t = e.target;
					t.enableOK();
					//If lead animal is past left of screen remove, if not keep moving left, also begin second stage of movement

					if(t.largeAnimal1){
						if (t.largeAnimal1.x<-100) {
							t.movementStage = 2;
							t.removeChild(this.largeAnimal1);
							t.largeAnimal1 = null;
						} else {
							t.largeAnimal1.x -= 10;
						}
					}


					//Set start and end position variables from small animals
					if (t.movementStage == 2) {
						t.setSmallAnimalPosition();
						t.movementStage = 3;
					}
					//Move small animals to middle of screen if they are in position if not keep moving left
					if (t.movementStage == 3) {
						t.moveToMidScreen();
					} else {
						if (t.movementStage != 4) {
							for (var i=0; i<t.total; i++) {
								if(t.smallAnimals[i]) t.smallAnimals[i].x -= 10;
							}
						}
					}
					if (t.movementStage == 4) {
						t.moveToBoxes();
					}
					//If answer is correct move back to start positions and off screen
					if (t.movementStage == 5) {
						t.moveBack();
					}
				});
			}
			//==========================================================================================================================
			this.setSound = function(animName) {
				switch (animName) {
					case "ducklings":
						whizz.playSound("quackFinal");

						break;
					case "cygnets":
						whizz.playSound("swan");
						break;
					case "crocodiles":
						whizz.playSound("crocodile");
						break;
				}
			}
			//==========================================================================================================================
			this.Qrandom = function() {
				if (this.QCount<this.totalQuestionsTobeAsked) {
					this.Qno = Math.floor(Math.random() * this.totalQuestionsAvailable);
					this.qNum = this.Qno;
					for (var i=0; i<=this.askedQno.length; i++) {
						if (this.Qno == this.askedQno[i]) {
							this.asked = true;
							break;
						} else {
							this.asked = false;
						}
					}
					if (this.asked == false) {
						this.askedQno.push(this.Qno);
					}
					this.newquestion();
				} else {
					whizz.myManager.enableButtons(false);
					whizz.myManager.closeContent();
				}
			}
			//-------------------------CK----------------------------
			this.newquestion = function() {
				if (this.asked) {
					this.Qrandom();
				} else {
					//-------------------------CK----------------------------
					whizz.myManager.incQuestion();
					//-------------------------CK----------------------------
					this.QCount++;

					// Coding starts after this point
					//------------------------------------------------
					this.box.visible = false;

					this.lastLine.innerHTML = "";
					this.state = "start";
					//this.celebrationSound.stop();
					this.box.gotoAndStop(0);
					this.answer = whizz.lang.questionTotal[this.qNum]/whizz.lang.questionDenominator[this.qNum];
					this.inputField.setValue();
					this.SetAnsBox(1);

					this.messageBox.setMessage(whizz.lang.writtenScript1EX(this.qNum));
					//Reset variables for new question
					this.timesWrong = 0;
					this.n = 0;
					this.bn = 0;
					this.cn = 0;
					this.SpaceBetween1 = 0;
					this.SpaceBetween2 = 0;
					this.SpaceBetween3 = 0;
					this.movementStage = 1;
					//Reset the Tab order
					//---------------------------------------------------------
					this.denominator = whizz.lang.questionDenominator[this.qNum];
					this.total = whizz.lang.questionTotal[this.qNum];
					this.largeAnimal = this.questionlargeAnimal[this.qNum];
					this.smallAnimal = this.questionsmallAnimal[this.qNum];
					//mainText = "How many "+smallAnimal+"s make "+convertFractions(whizz.lang.questionNumerator[this.qNum], whizz.lang.questionDenominator[this.qNum])+" of this group";
					//Attach lead animal, level 9999 used to he won't overlap with smallAnimal movies when attached
					this.largeAnimal1 = new lib[this.largeAnimal];
					this.Attached_Animal_Array[this.animal_counter] = this.addChild(this.largeAnimal1);   //attachMovie(this.largeAnimal, "largeAnimal1", 9999);
					this.animal_counter++;
					this.largeAnimal1.y = 300;
					this.largeAnimal1.x = 685;
					//Attach smaller animals
					var animal;
					for (var i=0; i<this.total; i++) {
						animal = new lib[this.smallAnimal];
						this.smallAnimals[i] = this.Attached_Animal_Array[this.animal_counter] = this.addChild(animal); //attachMovie(this.smallAnimal, "smallAnimal"+i, 100+i);
						this.animal_counter++;
						animal.y = 300;
						//animal.x = 800+(i*50);
						animal.x = 800+(i*(animal.nominalBounds.width+5));
					}
				}
			}
			//==========================================================================================================================
			this.SetAnsBox = function(num) {
				if (num == 1) {
					this.inputField.setEnabled(false);
				} else if (num == 2) {
					this.inputField.setValue();
					this.inputField.setEnabled(true);
				}
			}
			//==========================================================================================================================
			this.enableOK = function() {
				if (this.state == "start" || this.state == "help") {
					if (this.inputField.getValue()) {
						this.setButton(2);
					} else {
						this.setButton(1);
					}
				}
				if (this.state == "none") {
					this.setButton(1);
				}
			}

			this.doOk = function() {
				whizz.stopSound();

				this.inputField.blur();

				this.setButton(1);
				this.SetAnsBox(1);

				if (this.state == "finish") {
					for (var i=0; i<this.denominator; i++) {
						if (this.xLines[i]){
							this.removeChild(this.xLines[i]);
							this.xLines[i] = null;
						}
					}
					this.RemovePreviousAnimals();
					this.Qrandom();
				} else {
					if (this.state == "start") {
						if (this.inputField.getValue() == this.answer) {
							this.state = "none";
							this.right();
						} else {
							this.state = "none";
							this.box.gotoAndPlay("red");
							whizz.myManager.setHelp(0);
							cjs.Tween.get(this).wait(150).call(function(){
								this.state = "help";
								this.box.gotoAndStop(0);
								this.SetAnsBox(2);
								this.wrong();
							}.bind(this));
						}
					} else if (this.state == "help") {
						if (this.inputField.getValue() == this.answer) {
							this.state = "none";
							this.right();
						} else {
							this.state = "none";
							this.box.gotoAndPlay("red");
							cjs.Tween.get(this).wait(150).call(function(){
								this.state = "finish";
								this.box.gotoAndStop(0);
								this.inputField.setValue(this.answer);
								this.wrong();
							}.bind(this));
						}
					}
				}
			}
			//==========================================================================================================================
			this.RemovePreviousAnimals = function() {
				for (var i=0; i<=this.Attached_Animal_Array.length; i++) {
					if(this.Attached_Animal_Array[i]){
						this.removeChild(this.Attached_Animal_Array[i]);
						this.Attached_Animal_Array[i] = null;
					}
				}
			}

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
				if (param == 1) {
					whizz.myManager.hideOK(true);
				} else if (param == 2) {
					whizz.myManager.hideOK(false);
				} else if (param == 3) {
					whizz.myManager.hideLeftRight(false);
					whizz.myManager.hideLeftRight("right");
				} else if (param == 4) {
					whizz.myManager.hideLeftRight(false);
					whizz.myManager.hideLeftRight("left");
				} else if (param == 5) {
					whizz.myManager.hideLeftRight(true);
				} else if (param == 6) {
					whizz.myManager.hideLeftRight(false);
				}
			}
			//==========================================================================================================================
			this.setSmallAnimalPosition = function() {
				//Set up start and end positions for Small Animal movement after they have arrived in start positions
				for (var i=0; i<this.total; i++) {
					this.smallAnimals[i].startx = this.smallAnimals[i].x;
					this.smallAnimals[i].starty = this.smallAnimals[i].y;
					//Set first third of animals to top row
					if ((i-1)<(this.total/3)) {
						this.SpaceBetween1 += 65;
						this.smallAnimals[i].endx = 140+this.SpaceBetween1+parseInt(Math.random()*20);
						this.smallAnimals[i].endy = 170+parseInt(Math.random()*20);
					}
					//Last set of animals to middle row (because there is likely to be more of them)
					if (i>((this.total/3)*2)) {
						this.SpaceBetween3 += 65;
						this.smallAnimals[i].endx = 90+this.SpaceBetween3+parseInt(Math.random()*20);
						this.smallAnimals[i].endy = 270+parseInt(Math.random()*20);
					}
					//Set middle third of animals to the bottom row
					if (i>(this.total/3) && (i-1)<((this.total/3)*2)) {
						this.SpaceBetween2 += 65;
						this.smallAnimals[i].endx = 120+this.SpaceBetween2+parseInt(Math.random()*20);
						this.smallAnimals[i].endy = 220+parseInt(Math.random()*20);
					}
				}
			}
			//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
			this.moveToMidScreen = function() {
				//Move animals closer to final position as set in setSmallAnimalPosition()
				this.n += 5;
				if (this.n<=100) {
					for (var i=0; i<this.total; i++) {
						this.smallAnimals[i].x = this.smallAnimals[i].endx*this.n/100+this.smallAnimals[i].startx*(100-this.n)/100;
						this.smallAnimals[i].y = this.smallAnimals[i].endy*this.n/100+this.smallAnimals[i].starty*(100-this.n)/100;
					}
				}
				if (this.n == 100) {
					this.messageBox.setMessage(whizz.lang.writtenScript1EX_a);
					this.box.visible=true;
					this.lastLine.innerHTML = "<div>"+whizz.lang.answerText(this.qNum)+"</div>";
					this.SetAnsBox(2);
					this.inputField.focus();
				}
			}
			//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
			this.moveBack = function() {
				if (this.timesWrong>=1) {
					for (var i=0; i<this.denominator; i++) {
						this.removeChild(this.xLines[i]);
						this.xLines[i] = null;
					}
				}
				if (this.timesWrong>2) {
				}
				if (this.timesWrong == 0) {
					this.bn += 5;
					if (this.bn<=100) {
						for (var i=0; i<this.total; i++) {
							this.smallAnimals[i].x = this.smallAnimals[i].startx*this.bn/100+this.smallAnimals[i].endx*(100-this.bn)/100;
							this.smallAnimals[i].y = this.smallAnimals[i].starty*this.bn/100+this.smallAnimals[i].endy*(100-this.bn)/100;
						}
					}
				}
				if (this.timesWrong == 1) {
					this.bn += 5;
					if (this.bn<=100) {
						for (var i=0; i<this.total; i++) {
							this.smallAnimals[i].x = this.smallAnimals[i].startx*this.bn/100+this.smallAnimals[i].endx*(100-this.bn)/100;
							this.smallAnimals[i].y = this.smallAnimals[i].starty*this.bn/100+this.smallAnimals[i].endy*(100-this.bn)/100;
						}
					}
				}
				if (this.timesWrong>=2) {
					this.bn += 5;
					if (this.bn<=100) {
						for (var i=0; i<this.total; i++) {
							this.smallAnimals[i].x = this.smallAnimals[i].startx*this.bn/100+this.smallAnimals[i].finalendx*(100-this.bn)/100;
							this.smallAnimals[i].y = this.smallAnimals[i].starty*this.bn/100+this.smallAnimals[i].finalendy*(100-this.bn)/100;
						}
					}
				}
				for (var i=0; i<this.total; i++) {
					if (this.smallAnimals[i] && this.smallAnimals[i].x<-50) {
						this.removeChild(this.smallAnimals[i]);
						this.smallAnimals[i] = null;
						if (i == (this.total-1)) {
							this.setButton(2);
							this.state = "finish";
						}
					}
				}
			}
			//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
			this.wrong = function() {
				//What to do if user gets it wrong
				this.timesWrong++;
				if (this.timesWrong == 1) {
					this.messageBox.setMessage();
					whizz.lang.errorText(whizz.lang.animal_Array[this.qNum], whizz.lang.questionDenominator[this.qNum], whizz.lang.questionDenominator[this.qNum], whizz.lang.questionTotal[this.qNum]);

					var self = this;
					cjs.Tween.get(this).wait(250).call(function(){
							this.messageBox.setMessage(whizz.lang.writtenScript4EX1_a);
						}.bind(this)).wait(100).call(function(){
							this.messageBox.setMessage(whizz.lang.writtenScript4EX1_a1);
						}.bind(this)).wait(1500).call(function(){
							self.messageBox.setMessage(whizz.lang.writtenScript4EX2_b);
							whizz.playSound("H1");
						}.bind(this)).wait(3000).call(function(){
							self.messageBox.setMessage(whizz.lang.writtenScript4EX3_c);
						}.bind(this));


					this.lineDist = (550/(this.denominator+2));
					this.xLines = [];
					for (var i=0; i<this.denominator; i++) {
						this.xLines[i] = this.addChild(new lib.Xline());
						//this.attachMovie("Xline", "Xline"+i, 30+i);
						//Set up end positions for when they go into boxes
						var a = i*(this.total/this.denominator);
						var b = (i+1)*(this.total/this.denominator);
						var evenSpacing = 20;
						for (a; a<b; a++) {
							evenSpacing = evenSpacing+25;
							this.smallAnimals[a].finalendy = 145+evenSpacing;
							this.smallAnimals[a].finalendx = this.lineDist+i*this.lineDist+22+(this.smallAnimals[a].nominalBounds.width/2);
						}
						this.xLines[i].y = 210;
						this.xLines[i].x = this.lineDist+i*this.lineDist+25;
					}
				}
				if (this.timesWrong == 2) {
					if (this.answer == 1) {
						this.messageBox.setMessage(whizz.lang.showAnswerText(whizz.lang.questionDenominator[this.qNum], whizz.lang.questionTotal[this.qNum], whizz.lang.animal_Array_temp[this.qNum], this.answer));
					} else {
						this.messageBox.setMessage(whizz.lang.showAnswerText(whizz.lang.questionDenominator[this.qNum], whizz.lang.questionTotal[this.qNum], whizz.lang.animal_Array[this.qNum], this.answer));
					}
					this.movementStage = 4;
				}
				if (this.timesWrong == 3) {
					this.questionAsked[this.qNum] = 3;
				}
			}

			this.right = function() {
				whizz.myManager.setScore(this.totalQuestionsTobeAsked);
				this.box.gotoAndPlay("blue");
				this.setSound(whizz.lang.animal_Array[this.qNum]);
				this.messageBox.setMessage(whizz.lang.celebrateText(whizz.lang.questionDenominator[this.qNum], whizz.lang.questionTotal[this.qNum], whizz.lang.animal_Array[this.qNum]));
				this.movementStage = 5;
			}

			this.moveToBoxes = function() {
				this.cn += 5;
				if (this.cn<=100) {
					for (var i=0; i<this.total; i++) {
						this.smallAnimals[i].x = this.smallAnimals[i].finalendx*this.cn/100+this.smallAnimals[i].endx*(100-this.cn)/100;
						this.smallAnimals[i].y = this.smallAnimals[i].finalendy*this.cn/100+this.smallAnimals[i].endy*(100-this.cn)/100;
					}
				} else {
					this.setButton(2);
				}
			}

			this.numberToText = function(number_str) {
				var text = "";
				if (number_str>999 && number_str<10000) {
					this.numberString = String(number_str);
					this.firstNumber = this.numberString.charAt(0);
					text = this.wordUnits[this.firstNumber]+" thousand";
					this.number_str = number_str-(firstNumber*1000);
					if (this.number_str>0) {
						if (this.number_str>99) {
							text += ", ";
						} else {
							text += " and ";
						}
					}
				}
				if (number_str>99 && number_str<1000) {
					this.numberString = String(number_str);
					this.firstNumber = this.numberString.charAt(0);
					this.secondNumber = this.numberString.charAt(1);
					text += this.wordUnits[this.firstNumber]+" hundred";
					number_str = number_str-(this.firstNumber*100);
					if (number_str>0) {
						text += " and ";
					}
				}
				if (number_str>19 && number_str<100) {
					this.numberString = String(number_str);
					this.firstNumber = this.numberString.charAt(0);
					this.secondNumber = this.numberString.charAt(1);
					text += this.wordTens[this.firstNumber];
					number_str = number_str-(this.firstNumber*10);
					if (number_str>0) {
						text += "-";
					}
				}
				if (number_str>0 && number_str<20) {
					text += this.wordUnits[number_str];
				}
				return text;
			};



			this.inputField = new whizz.NumericInput("answerInput");
			this.addChild(this.inputField);
			this.inputField.setTransform(295,330);
			this.inputField.setEnabled(false);
			/*this.inputField = document.createElement("input");
			this.inputField.id = "answerInput";
			this.inputField.type = "number";
			this.inputField.min = 0;
			this.inputField.max = 99;
			this.inputField.onkeypress = function(evt){
				evt = evt || window.event;
				var charCode = evt.which || evt.keyCode;
				var charStr = String.fromCharCode(charCode);
				if(charCode == 13){
					document.activeElement.blur();
					evt.target.blur();
				}
				if (!/\d/.test(charStr)) {
					return false;
				}

				if(this.value.length > 1) {
					this.value = this.value.substr(0, 1);
				}
			};
			whizz.appRoot.appendChild(this.inputField);
			var input = new cjs.DOMElement(this.inputField);
			this.addChild(input);
			input.setTransform(295,330);
			*/


			this.xLines = [];

			this.lastLine = document.createElement("div");
			this.lastLine.id = "lastLine";
			whizz.appRoot.appendChild(this.lastLine);
			var ll = new cjs.DOMElement(this.lastLine);
			this.addChild(ll);
			ll.setTransform(290,340);

			whizz.myManager.enableButtons("ex");
			whizz.myManager.setOKCallback(this, this.doOk);
			// hide arrows and ok
			this.setButton(1);
			this.setButton(5);
			// restart the movie's timer
			whizz.myManager.unpauseTimer();
			// *************************************************
			// set tool tipw
			//this.toolTip.visible = false;
			//this.toolTipRollover.tabEnabled = false;
			// *************************************************

			this.messageBox = new whizz.MessageBox("mainMessageBox");// new createjs.DOMElement(whizz.createMessageBox("mainMessageBox"));
			this.messageBox.x = 33;
			this.messageBox.y = 47;
			this.addChild(this.messageBox);

			/*this.setMessage = function(message){
				this.messageBox.htmlElement.innerHTML = message || "";
				this.messageBox.htmlElement.style.visibility = message===undefined ? "hidden" : "visible";
			};*/

			this.init();
			//==========================================================================================================================
			// INITIALIZE

			//==========================================================================================================================
			// NEW QUESTION
			//-------------------------CK----------------------------
			whizz.myManager.setTotalQuestion(10);
		}

		// textbox
		this.box = new lib.Box();
		this.box.setTransform(314.7,350.3);

		// Bg
		this.backgroundMain = new lib.BackgroundMain();
		this.backgroundMain.setTransform(286.4,179.6,1,1,0,0,0,411.2,244.6);
		this.backgroundMain.cache(-1,-1,824,493);

		this.addChild(this.backgroundMain,this.box);
		this.frame_0();
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-124.8,-65,820,489.2);

})(lib_MA_GBR_0800CAx0300 = lib_MA_GBR_0800CAx0300||{}, images = images||{}, createjs = createjs||{}, whizz = whizz||{});
var lib_MA_GBR_0800CAx0300, images, createjs, whizz;