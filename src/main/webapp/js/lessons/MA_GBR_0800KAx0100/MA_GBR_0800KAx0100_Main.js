(function (lib, img, cjs, whizz) {

	var p; // shortcut to reference prototypes



// stage content:
	(lib.MA_GBR_0800KAx0100_Main = function() {
		this.initialize();

		// timeline function:
		this.frame_0 = function() {

			this.init = function(){
				for (var i = 0; i<10; i++) {
					if (i+1 != this.a) {
						this.aArray.push(i+1);
						this.aArray2.push(this.a);
					}
					if (i+1 != this.b && i+1 != this.a) {
						this.bArray.push(i+1);
						this.bArray2.push(this.b);
					}
					if (i+1 != this.c && i+1 != this.a && i+1 != this.b) {
						this.cArray.push(i+1);
						this.cArray2.push(this.c);
					}
				}

				var pos;
				for (i = 0; i<9; i++) {
					if (i<3) {
						pos = Math.floor(Math.random() * this.aArray.length);
						this.questionArray1.push(this.aArray[pos]);
						this.questionArray2.push(this.aArray2[pos]);
						this.aArray.splice(pos, 1);
						this.aArray2.splice(pos, 1);
					}
					if (i>2 && i<6) {
						pos = Math.floor(Math.random() * this.bArray.length);
						this.questionArray1.push(this.bArray[pos]);
						this.questionArray2.push(this.bArray2[pos]);
						this.bArray.splice(pos, 1);
						this.bArray2.splice(pos, 1);
					}
					if (i>5) {
						pos = Math.floor(Math.random() * this.cArray.length);
						this.questionArray1.push(this.cArray[pos]);
						this.questionArray2.push(this.cArray2[pos]);
						this.cArray.splice(pos, 1);
						this.cArray2.splice(pos, 1);
					}
				}

				for (i = 0; i<9; i++) {
					pos = Math.floor(Math.random()*this.questionArray1.length);
					this.questionArrayY.push(this.questionArray1[pos]);
					this.questionArrayX.push(this.questionArray2[pos]);
					this.questionArray1.splice(pos, 1);
					this.questionArray2.splice(pos, 1);
				}

				this.Q0();
				this.nextQuestion();
			};

			this.animateInsect = function() {
				this.clearTextBox();
				this.disableTextBox();
				this.textBox.visible = false;
				whizz.myManager.hideOK(true);
				this.messageBox1.setMessage();
				this.messageBox2.setMessage();

				var insect, tw, nx, ny;

				for (var i = 0; i<this.zNumber; i++) {
					insect = new lib[this.currentInsect]();
					insect.scaleX = ((i%this.xNumber)%2 == 0) ? -1 : 1;
					insect.x = Math.random()*350;
					insect.y = Math.random()*230;
					insect.first = i == 0;
					this.insectHolder.addChild(insect);
					insect.gotoAndPlay(parseInt(Math.random()*14));

					if(i==0){
						tw = this.bw*1.3*this.xNumber;
						this.forDraw.x = this.insectHolder.x = 275-tw/2;
					}

					nx = this.bw * 1.3 * (i % this.xNumber) + this.bw * 1.3 / 2;
					ny = this.bh * 1.3 * Math.floor(i / this.xNumber);

					if (i == 0){
						cjs.Tween.get(insect).wait(2000).to({x: nx, y: ny}, 800).call(this.showQuestion, [], this);
					}else{
						cjs.Tween.get(insect).wait(2000).to({x: nx, y: ny}, 800);
					}
				}
			};

			this.showQuestion = function(){
				if (this.gameState == "question") {
					this.textBox.visible = true;
					this.textBox.equal_mc1.tf_insect_name.text = this.insectName;
					this.textBox.equal_mc2.tf_insect_name.text = this.insectName;
					this.enableTextBox();
					this.clearTextBox();
					this.messageBox1.setMessage();
					this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript2EXQ1_text, this.xNumber, this.yNumber, this.zNumber));
					this.textBox.answer0.focus();
				}
			};

			this.highlightInsect = function(drawType) {
				this.drawType = drawType;

				var tw = this.bw*1.3*this.xNumber;
				var th = this.bh*1.3*this.yNumber;

				this.bordersArr = [];
				if ((drawType == 'both') || (drawType == 'row')) {
					//row highlighting
					for (var i = 0; i<this.yNumber; i++) {
						x1 = 0;
						x2 = tw;
						y1 = i*1.3*this.bh - this.bh*1.3/2 + 1;
						y2 = (i+1)*1.3*this.bh - this.bh*1.3/2 - 1;
						this.bordersArr.push({x1: x1, y1: y1, x2: x2, y2: y2, color: 0x0000FF});
					}
				}
				if ((drawType == 'both') || (drawType == 'col')) {
					// columns highlight
					for (i = 0; i<this.xNumber; i++) {
						x1 = i*this.bw*1.3 + 1;
						x2 = (i+1)*this.bw*1.3 - 1;
						y1 = -this.bw*1.15/2;
						y2 = th-this.bw*1.15/2;
						this.bordersArr.push({x1: x1, y1: y1, x2: x2, y2: y2, color: 0x086608});
					}
				}

				this.drawBorders_counter = 0;
				this.addEventListener("tick", this.drawBorders_enterFrame);
			};

			this.drawBorders_enterFrame = function(e){
				var self = e.target;
				var borderIndex = Math.floor(self.drawBorders_counter/10);
				var borderStep = self.drawBorders_counter%10;
				var roundnessRadius = 10;

				if (borderIndex < self.bordersArr.length) {
					var o = self.bordersArr[borderIndex];

					switch(borderStep){
						case 0:
							self.forDraw.graphics.setStrokeStyle(1);
							self.forDraw.graphics.beginStroke(o.color);
							self.forDraw.graphics.moveTo(o.x1+roundnessRadius, o.y1);
							self.forDraw.graphics.lineTo(o.x2-roundnessRadius, o.y1);
							break;
						case 1:
							self.forDraw.graphics.quadraticCurveTo(o.x2, o.y1, o.x2, o.y1+roundnessRadius,roundnessRadius);
							break;
						case 2:
							self.forDraw.graphics.lineTo(o.x2, o.y2-roundnessRadius);
							break;
						case 3:
							self.forDraw.graphics.quadraticCurveTo(o.x2, o.y2, o.x2-roundnessRadius, o.y2);
							break;
						case 4:
							self.forDraw.graphics.lineTo(o.x1+roundnessRadius, o.y2);
							break;
						case 5:
							self.forDraw.graphics.quadraticCurveTo(o.x1, o.y2, o.x1, o.y2-roundnessRadius);
							break;
						case 6:
							self.forDraw.graphics.lineTo(o.x1, o.y1+roundnessRadius);
							break;
						case 7:
							self.forDraw.graphics.quadraticCurveTo(o.x1, o.y1, o.x1+roundnessRadius, o.y1);
							self.setTextValues(borderIndex+1);
							break;
//						default:
//							break;
					}
				} else {
					self.removeEventListener("tick", self.drawBorders_enterFrame);
					self.addEventListener("tick", self.checkOK);
					switch(self.gameState){
						case "help1":
							self.messageBox1.setMessage(whizz.lang.writtenScript1EXH2_text);
							self.enableTextBox();

							self.textBox.answer0.setEnabled(false);
							self.textBox.answer0.setValue(self.yNumber);
							self.textBox.answer3.setEnabled(false);
							self.textBox.answer3.setValue(self.xNumber);
							self.textBox.answer1.setEnabled(true);
							self.textBox.answer1.focus();
							break;

						case "help2":
							self.messageBox1.setMessage(whizz.lang.writtenScript1EXH2_text);
							if (self.activeTop) {
								self.textBox.answer0.setEnabled(false);
								self.textBox.answer1.setEnabled(true);
								self.textBox.answer2.setEnabled(true);
								self.textBox.answer3.setEnabled(false);
								self.textBox.answer4.setEnabled(false);
								self.textBox.answer5.setEnabled(false);

								self.textBox.answer0.setValue(self.yNumber);
								self.textBox.answer1.focus();
							} else {
								self.textBox.answer0.setEnabled(false);
								self.textBox.answer1.setEnabled(false);
								self.textBox.answer2.setEnabled(false);
								self.textBox.answer3.setEnabled(false);
								self.textBox.answer4.setEnabled(true);
								self.textBox.answer5.setEnabled(true);

								self.textBox.answer3.setValue(self.yNumber);
								self.textBox.answer4.focus();
							}
							break;

						case "help3":
							self.messageBox1.setMessage(whizz.lang.writtenScript1EXH2_text);
							if (self.activeTop) {
								self.textBox.answer0.setEnabled(false);
								self.textBox.answer1.setEnabled(true);
								self.textBox.answer2.setEnabled(true);
								self.textBox.answer3.setEnabled(false);
								self.textBox.answer4.setEnabled(false);
								self.textBox.answer5.setEnabled(false);

								self.textBox.answer0.setValue(self.xNumber);
								self.textBox.answer1.focus();
							} else {
								self.textBox.answer0.setEnabled(false);
								self.textBox.answer1.setEnabled(false);
								self.textBox.answer2.setEnabled(false);
								self.textBox.answer3.setEnabled(false);
								self.textBox.answer4.setEnabled(true);
								self.textBox.answer5.setEnabled(true);

								self.textBox.answer3.setValue(self.xNumber);
								self.textBox.answer4.focus();
							}
							break;
					}



				}

				self.drawBorders_counter++;
			};

			this.payoffGood = function() {
				var i = this.insectHolder.getNumChildren();
				while (i--) this.insectHolder.getChildAt(i).gotoAndPlay('payoff_side');
				this.forDraw.graphics.clear();
			};

			this.payoffGoodFlyAway = function() {
				var i = this.insectHolder.getNumChildren();
				while (i--) this.insectHolder.getChildAt(i).gotoAndPlay('fly_away');
			};

			this.payoffBadGoAway = function() {
				var i = this.insectHolder.getNumChildren();
				while (i--) this.insectHolder.getChildAt(i).gotoAndPlay('go_away_bad');
				this.forDraw.graphics.clear();
			};

			this.payoffBad = function() {
				var i = this.insectHolder.getNumChildren();
				while (i--) this.insectHolder.getChildAt(i).gotoAndPlay('go_away');
			};

			this.clearGraphic = function() {
				this.removeEventListener("tick", this.drawBorders_enterFrame);
				this.forDraw.graphics.clear();

				while(this.insectHolder.getNumChildren()) {
					this.insectHolder.getChildAt(0).stop();
					this.insectHolder.removeChildAt(0);
				}
				this.insectHolder.removeAllChildren();
				this.nextQuestion();
			};

			this.disableTextBox = function() {
				for (var i = 0; i<6; i++) this.textBox["answer"+i].setEnabled(false);
			};

			this.clearTextBox = function() {
				for (var i = 0; i<6; i++) this.textBox["answer"+i].setValue();
			};

			this.enableTextBox = function() {
				for (var i = 0; i<6; i++) this.textBox["answer"+i].setEnabled(true);
			};

			this.Q0 = function() {
				this.clearTextBox();
				this.disableTextBox();
				this.messageBox1.setMessage();
				this.messageBox2.setMessage();
				this.textBox.visible = false;
				whizz.myManager.hideOK(true);
			};

			this.playQuestion = function() {
				console.log("playQuestion");
				this.gameState = "question";
				this.animateInsect();
				this.addEventListener("tick", this.checkOK);
			};

			this.nextQuestion = function() {
				console.log("nextQuestion");
				this.xNumber = this.questionArrayY[this.currentQuestion];
				this.yNumber = this.questionArrayX[this.currentQuestion];
				this.zNumber = this.xNumber*this.yNumber;
				zzz = 0;
				if (this.yNumber == 10) {
					this.currentInsect = "FlyAnim";
					this.insectName = whizz.lang.fly_name;
					this.insectNameOne = whizz.lang.fly_name_one;
					this.bw = 17.5;
					this.bh = 14;
				} else if (this.yNumber == 5) {
					this.currentInsect = "BeeAnim";
					this.insectName = whizz.lang.bee_name;
					this.insectNameOne = whizz.lang.bee_name_one;
					this.bw = 25;
					this.bh = 20.5;
				} else if (this.yNumber == 2) {
					this.currentInsect = "LadybirdAnim";
					this.insectName = whizz.lang.ladybird_name;
					this.insectNameOne = whizz.lang.ladybird_name_one;
					this.bw = 27.5;
					this.bh = 25;
				}
				this.messageBox1.setMessage();
				this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript2EXQ1_text, this.xNumber, this.yNumber, this.zNumber));

				this.currentQuestion++;
				if (this.currentQuestion>10) {
					this.winGame();
				} else {
					cjs.Tween.get({}).wait(250).call(function(){
						whizz.playSound("Q1");
					});

					whizz.myManager.incQuestion();
					this.playQuestion();
				}
			};

			this.doOk = function() {
				whizz.myManager.hideOK(true);

				this.textBox.answer0.blur();
				this.textBox.answer1.blur();
				this.textBox.answer2.blur();
				this.textBox.answer3.blur();
				this.textBox.answer4.blur();
				this.textBox.answer5.blur();
				document.activeElement.blur();

				switch(this.gameState){
					case "Q0":
						//this part works after game init
						// restart the movie's timer
						whizz.myManager.unpauseTimer();
						this.playQuestion();
						break;

					case "question":
						this.disableTextBox();

						if (this.answerIsOK()) {
							this.payOff1();
							whizz.myManager.setScore(9);
						} else {
							if ((this.textBox.answer0.getValue() == this.xNumber && this.textBox.answer1.getValue() == this.yNumber && this.textBox.answer2.getValue() == this.xNumber*this.yNumber)
								&& (this.textBox.answer3.getValue() != this.yNumber || this.textBox.answer4.getValue() != this.xNumber || this.textBox.answer5.getValue() != this.xNumber*this.yNumber)){

								this.activeTop = false;
								this.help2();
							} else if ((this.textBox.answer3.getValue() == this.xNumber && this.textBox.answer4.getValue() == this.yNumber && this.textBox.answer5.getValue() == this.xNumber*this.yNumber)
								&& (this.textBox.answer0.getValue() != this.yNumber || this.textBox.answer1.getValue() != this.xNumber || this.textBox.answer2.getValue() != this.xNumber*this.yNumber)){

								this.activeTop = true;
								this.help2();
							} else if ((this.textBox.answer0.getValue() == this.yNumber && this.textBox.answer1.getValue() == this.xNumber && this.textBox.answer2.getValue() == this.xNumber*this.yNumber)
								&& (this.textBox.answer3.getValue() != this.xNumber || this.textBox.answer4.getValue() != this.yNumber || this.textBox.answer5.getValue() != this.xNumber*this.yNumber)) {

								this.activeTop = false;
								this.help3();
							} else if ((this.textBox.answer3.getValue() == this.yNumber && this.textBox.answer4.getValue() == this.xNumber && this.textBox.answer5.getValue() == this.xNumber*this.yNumber)
								&& (this.textBox.answer0.getValue() != this.xNumber || this.textBox.answer1.getValue() != this.yNumber || this.textBox.answer2.getValue() != this.xNumber*this.yNumber)) {

								this.activeTop = true;
								this.help3();
							} else {
								this.help1();
							}
						}
						break;

					case "help1":
						if (this.answerIsOK()) {
							this.payOff1();
							whizz.myManager.setScore(9);
						} else {
							if ((this.textBox.answer0.getValue() == this.yNumber && this.textBox.answer1.getValue() == this.xNumber && this.textBox.answer2.getValue() == this.yNumber*this.xNumber)
								&& (this.textBox.answer3.getValue() != this.xNumber || this.textBox.answer4.getValue() != this.yNumber || this.textBox.answer5.getValue() != this.yNumber*this.xNumber)) {
								this.textBox.back3.gotoAndPlay('wrong2');
								this.textBox.back4.gotoAndPlay('wrong2');
								this.textBox.back5.gotoAndPlay('wrong2');
								this.payOff2();
							} else if ((this.textBox.answer3.getValue() == this.xNumber && this.textBox.answer4.getValue() == this.yNumber && this.textBox.answer5.getValue() == this.yNumber*this.xNumber)
								&& (this.textBox.answer0.getValue() != this.yNumber || this.textBox.answer1.getValue() != this.xNumber || this.textBox.answer2.getValue() != this.yNumber*this.xNumber)) {
								this.textBox.back0.gotoAndPlay('wrong2');
								this.textBox.back1.gotoAndPlay('wrong2');
								this.textBox.back2.gotoAndPlay('wrong2');
								this.payOff2();
							} else {
								//everything is wrong
								this.payOff2();
								this.textBox.back3.gotoAndPlay('wrong2');
								this.textBox.back4.gotoAndPlay('wrong2');
								this.textBox.back5.gotoAndPlay('wrong2');
								this.textBox.back0.gotoAndPlay('wrong2');
								this.textBox.back1.gotoAndPlay('wrong2');
								this.textBox.back2.gotoAndPlay('wrong2');
							}
						}
						break;

					case "help2":
					case "help3":
						if (this.answerIsOK()) {
							this.payOff1();
							whizz.myManager.setScore(9);
						} else {
							if (this.activeTop) {
								this.textBox.back0.gotoAndPlay('wrong2');
								this.textBox.back1.gotoAndPlay('wrong2');
								this.textBox.back2.gotoAndPlay('wrong2');
							} else {
								this.textBox.back3.gotoAndPlay('wrong2');
								this.textBox.back4.gotoAndPlay('wrong2');
								this.textBox.back5.gotoAndPlay('wrong2');
							}
							this.payOff2();
						}
						break;

					case "finish":
						whizz.myManager.pauseTimer();
						whizz.myManager.enableButtons(false);
						whizz.myManager.closeContent();
						break;

					case "waiting":
						this.payoffGoodFlyAway();
						this.Q0();
						break;

					case "waiting_bad":
						this.payoffBadGoAway();
						this.Q0();
						break;

				}
			};

			this.answerIsOK = function(){
				return (
						(this.textBox.answer0.getValue() == this.xNumber
						&& this.textBox.answer1.getValue() == this.yNumber
						&& this.textBox.answer2.getValue() == this.yNumber*this.xNumber
						&& this.textBox.answer3.getValue() == this.yNumber
						&& this.textBox.answer4.getValue() == this.xNumber
						&& this.textBox.answer5.getValue() == this.yNumber*this.xNumber)
					|| (this.textBox.answer0.getValue() == this.yNumber
						&& this.textBox.answer1.getValue() == this.xNumber
						&& this.textBox.answer2.getValue() == this.yNumber*this.xNumber
						&& this.textBox.answer3.getValue() == this.xNumber
						&& this.textBox.answer4.getValue() == this.yNumber
						&& this.textBox.answer5.getValue() == this.yNumber*this.xNumber)
				);
			};

			this.winGame = function() {
				this.gameState = "finish";
				whizz.myManager.pauseTimer();
				whizz.myManager.enableButtons(false);
				whizz.myManager.closeContent();
			};

			this.setTextValues = function(index) {
				var currX;
				var currY;
				var textTemplate;
				if (this.drawType == 'both') {
					if (index<=this.yNumber) {
						currY = "<b><font color='#0000FF'>"+index+"</font></b>";
						currX = this.xNumber;
						if ((index == 1) && (currX == 1)) {
							textTemplate = whizz.lang.writtenScriptH23_text;
						} else if (index == 1) {
							textTemplate = whizz.lang.writtenScriptH21_text;
						} else if (currX == 1) {
							textTemplate = whizz.lang.writtenScriptH22_text;
						} else {
							textTemplate = whizz.lang.writtenScriptH2_text;
						}
						this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript0EXH1_text, currX, currY, this.zNumber)+this.convertToString(textTemplate, currX, currY, this.zNumber));
						temp1 = this.convertToString(textTemplate, currX, currY, this.zNumber);
						if ((zzz<1) && (index == this.yNumber)) {
							this.forDraw.graphics.clear();
							zzz = 1;
						}
					} else {
						currX = "<b><font color='#086608'>"+(index-this.yNumber)+"</font></b>";
						currY = this.yNumber;
						if ((index-this.yNumber) == 1) {
							textTemplate = whizz.lang.writtenScriptH31_text;
						} else {
							textTemplate = whizz.lang.writtenScriptH3_text;
						}
						temp2 = this.convertToString(textTemplate, currX, currY, this.zNumber);
						this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript0EXH1_text, currX, currY, this.zNumber)+temp1+"\n"+temp2);
					}
				} else if (this.drawType == 'row') {
					currY = "<b><font color='#0000FF'>"+index+"</font></b>";
					currX = this.xNumber;
					if (index == 1 && currX == 1) {
						textTemplate = whizz.lang.writtenScriptH23_text;
					} else if (index == 1) {
						textTemplate = whizz.lang.writtenScriptH21_text;
					} else if (currX == 1) {
						textTemplate = whizz.lang.writtenScriptH22_text;
					} else {
						textTemplate = whizz.lang.writtenScriptH2_text;
					}
					this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript0EXH1_text, currX, currY, this.zNumber)+this.convertToString(textTemplate, currX, currY, this.zNumber));
				} else {
					currX = "<b><font color='#086608'>"+index+"</font></b>";
					currY = this.yNumber;
					if (index == 1) {
						textTemplate = whizz.lang.writtenScriptH31_text;
					} else {
						textTemplate = whizz.lang.writtenScriptH3_text;
					}
					this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript0EXH1_text, currX, currY, this.zNumber)+this.convertToString(textTemplate, currX, currY, this.zNumber));
				}
			};

			this.convertToString = function(text_mes, x, y, z) {
				var res = "";
				for (var i = 0; i<text_mes.length; i++) {
					if (text_mes[i] == 'insect_name') {
						res += this.insectName;
					} else if (text_mes[i] == 'insect_name_one') {
						res += this.insectNameOne;
					} else if (text_mes[i] == 'x_number') {
						res += x;
					} else if (text_mes[i] == 'y_number') {
						res += y;
					} else if (text_mes[i] == 'z_number') {
						res += z;
					} else {
						res += text_mes[i];
					}
				}
				return res;
			};

			this.help1 = function() {
				whizz.myManager.setHelp(1);
				this.gameState = "help1";
				whizz.myManager.hideOK(true);
				this.highlightInsect('both', this.yNumber, this.xNumber);
				this.firstAnswerWrong();
				this.secondAnswerWrong();
				this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript0EXH1_text, this.xNumber, this.yNumber, this.zNumber));
			};

			this.help2 = function() {
				whizz.myManager.setHelp(1);
				this.gameState = "help2";
				whizz.myManager.hideOK(true);
				this.highlightInsect('row', this.yNumber, "");
				if (this.activeTop) {
					this.firstAnswerWrong();
					this.secondAnswerCorrect();
				} else {
					this.secondAnswerWrong();
					this.firstAnswerCorrect();
				}
				this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript0EXH1_text, this.xNumber, this.yNumber, this.zNumber));
			};

			this.help3 = function() {
				whizz.myManager.setHelp(1);
				this.gameState = "help3";
				whizz.myManager.hideOK(true);
				this.highlightInsect('col');
				if (this.activeTop) {
					this.firstAnswerWrong();
					this.secondAnswerCorrect();
				} else {
					this.secondAnswerWrong();
					this.firstAnswerCorrect();
				}
				this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScript0EXH1_text, this.xNumber, this.yNumber, this.zNumber));
			};

			this.payOff1 = function() {
				whizz.myManager.hideOK(true);
				if (this.xNumber == 1) {
					this.messageBox2.setMessage(whizz.lang.writtenScript0EXP1_text+this.convertToString(whizz.lang.writtenScriptH11_text, this.xNumber, this.yNumber, this.zNumber));
				} else {
					this.messageBox2.setMessage(whizz.lang.writtenScript0EXP1_text+this.convertToString(whizz.lang.writtenScriptH1_text, this.xNumber, this.yNumber, this.zNumber));
				}
				this.messageBox1.setMessage(this.convertToString(whizz.lang.writtenScript1EXP1_text, this.xNumber, this.yNumber, this.zNumber));
				this.payoffGood();
			};

			this.payOff2 = function() {
				whizz.myManager.hideOK(true);
				if (this.xNumber == 1) {
					this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScriptH11_text, this.xNumber, this.yNumber, this.zNumber)+whizz.lang.writtenScript0EXP2_text);
				} else {
					this.messageBox2.setMessage(this.convertToString(whizz.lang.writtenScriptH1_text, this.xNumber, this.yNumber, this.zNumber)+whizz.lang.writtenScript0EXP2_text);
				}
				this.messageBox1.setMessage(this.convertToString(whizz.lang.writtenScript1EXP2_text, this.xNumber, this.yNumber, this.zNumber));
				this.payoffBad();
			};

			this.firstAnswerWrong = function() {
				this.textBox.back0.gotoAndPlay('wrong');
				this.textBox.back1.gotoAndPlay('wrong');
				this.textBox.back2.gotoAndPlay('wrong');
			};

			this.secondAnswerWrong = function() {
				this.textBox.back3.gotoAndPlay('wrong');
				this.textBox.back4.gotoAndPlay('wrong');
				this.textBox.back5.gotoAndPlay('wrong');
			};

			this.firstAnswerCorrect = function() {
				this.textBox.back0.gotoAndPlay('correct');
				this.textBox.back1.gotoAndPlay('correct');
				this.textBox.back2.gotoAndPlay('correct');
			};

			this.secondAnswerCorrect = function() {
				this.textBox.back3.gotoAndPlay('correct');
				this.textBox.back4.gotoAndPlay('correct');
				this.textBox.back5.gotoAndPlay('correct');
			};

			this.checkOK = function(e){
				var self = e.target;
				if (self.textBox.answer0.getValue() != null
					&& self.textBox.answer1.getValue() != null
					&& self.textBox.answer2.getValue() != null
					&& self.textBox.answer3.getValue() != null
					&& self.textBox.answer4.getValue() != null
					&& self.textBox.answer5.getValue() != null){

					self.removeEventListener("tick", self.checkOK);
					whizz.myManager.hideOK(false);
				}
			};

			//_global.draw_int = 0;
			this.drawType = "";

			this.forDraw = new cjs.Shape();
			this.forDraw.x = this.insectHolder.x;
			this.forDraw.y = this.insectHolder.y;
			this.addChild(this.forDraw);

			//variable adjusted current question
			//Init Question Array
			this.a = 2;
			this.b = 5;
			this.c = 10;

			this.aArray = [];
			this.aArray2 = [];
			this.bArray = [];
			this.bArray2 = [];
			this.cArray = [];
			this.cArray2 = [];

			this.questionArray1 = [];
			this.questionArray2 = [];
			this.questionArrayX = [];
			this.questionArrayY = [];

			//****************** set up buttons *****************
			// enable buttons to exercise state
			whizz.myManager.enableButtons("ex");
			// hide arrows and ok
			whizz.myManager.hideOK(true);
			whizz.myManager.hideLeftRight(true);
			//set OK CallBack function
			whizz.myManager.setOKCallback(this, this.doOk);
			// *************************************************
			// record stage of movie
			this.movieStage = "ex";
			// *************************************************
			// set tool tip
			//toolTip._visible = false;
			//toolTipRollover.tabEnabled = false;
			// *************************************************
			// Init text values
			//toolTip.tip = toolTip_text;
			//topic = topic_text;

			this.messageBox1 = new whizz.MessageBox("messageBox1");
			this.messageBox1.setTransform(264,348);
			this.messageBox1.setMessage();
			this.addChild(this.messageBox1);

			this.messageBox2 = new whizz.MessageBox("messageBox2");
			this.messageBox2.setTransform(275,228);
			this.messageBox2.setMessage();
			this.addChild(this.messageBox2);


			this.currentQuestion = 0;
			this.gameState = "Q0";

			whizz.myManager.setTotalQuestion(9);
			whizz.stopSound();

			this.init();
		};

		this.insectHolder = new cjs.Container();
		this.insectHolder.setTransform(275,50);

		// sums text
		this.textBox = new lib.textBox();
		this.textBox.setTransform(149.1,287.3,1,1.001);

		// sky
		this.instance = new lib.Background();
		this.instance.setTransform(321.7,226,1,1,0,0,0,321.7,226);
		this.instance.cache(-1,-1,648,456,whizz.scale);

		this.addChild(this.instance,this.textBox,this.insectHolder);
		this.frame_0();
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,644,451.9);


})(lib_MA_GBR_0800KAx0100 = lib_MA_GBR_0800KAx0100||{}, images = images||{}, createjs = createjs||{}, whizz = whizz||{});
var lib_MA_GBR_0800KAx0100, images, createjs, whizz;