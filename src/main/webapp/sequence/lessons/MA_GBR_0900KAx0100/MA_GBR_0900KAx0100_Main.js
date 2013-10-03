(function(lib, img, cjs, whizz){

	var p; // shortcut to reference prototypes

// stage content:
	(lib.MA_GBR_0900KAx0100_Main = function() {
		this.initialize();

		// timeline function:
		this.frame_0 = function() {
			this.init = function(){
				this.enableokflag = false;
				this.addition.visible = false;
				//toolTip.visible = false;
				//toolTip.tipText = "Partitioning";

				// generate random question bank
				this.q0 = [];
				this.q1 = [];
				var q1Min = 2;
				var q1Max = 5;
				for (var i = 0; i <= 15; i++){
					this.q0.push(Math.floor(Math.random() * 9 + 1).toString() + Math.floor(Math.random() * 9 + 1).toString());
					this.q1.push(Math.floor(Math.random() * (q1Max - q1Min + 1) + q1Min));
				}
				this.TempAnswerHolder1 = "";
				this.splitnum1 = 0;
				this.splitnum2 = 0;
				this.answer1 = 0;
				this.answer2 = 0;
				this.answer3 = 0;
				this.answer4 = 0;
				this.qtotal = 10;
				this.qNum = -1;

				this.setButton(1);
				this.setButton(3);
				this.state = "question";
				this.setquestion();

				this.partitionButton.addEventListener("click", this.partitionClick.bind(this));
			}

			this.partitionClick = function(e){
				this.noHelp = true;
				this.doOk();
			}
			// ===================================================================================================
			// calculate the splits and answers
			this.findsplits = function(){
				this.splitnum1 = Math.floor((this.q0[this.qNum] / 10)) * 10;
				this.splitnum2 = this.q0[this.qNum] - this.splitnum1;
				console.log("split: "+this.splitnum1 + ", "+this.splitnum2)
				this.answer1 = this.q0[this.qNum] * this.q1[this.qNum];
				this.answer2 = this.splitnum1 * this.q1[this.qNum];
				this.answer3 = this.splitnum2 * this.q1[this.qNum];
				this.answer4 = this.answer1;
			};



			this.setquestion = function(){
				this.qNum++;
				if (this.qNum >= this.qtotal){
					this.question_mc.visible = false;
					this.msg_txt.setMessage();
					this.partitionButton.visible = false;
					whizz.myManager.enableButtons(false);
					whizz.myManager.closeContent();
				} else {
					whizz.myManager.incQuestion();

					cjs.Sound.play("Q1").addEventListener("playComplete", function(){
						cjs.Sound.play("Q2");
					});
				}
				this.msg_txt.setMessage();
				this.enableokflag = false;
				this.partitionButton.visible = false;
				this.state = "question";
				this.splitnum1 = 0;
				this.splitnum2 = 0;
				this.answer1 = 0;
				this.answer2 = 0;
				this.answer3 = 0;
				this.answer4 = 0;
				this.question_mc.ansbox.setValue();
				this.question_mc.ansbox.setEnabled(true);
				this.question_mc.ansbox1.setValue();
				this.question_mc.ansbox2.setValue();
				this.question_mc.ansbox3.setValue();
				this.question_mc.split1.setValue();
				this.question_mc.split2.setValue();
				this.question_mc.box3.setValue();
				this.question_mc.box4.setValue();
				this.question_mc.box5.setValue();
				this.question_mc.box6.setValue();

				this.outline1.gotoAndStop(0);
				this.outline2.gotoAndStop(0);
				this.outline3.gotoAndStop(0);
				this.outline4.gotoAndStop(0);
				this.TempAnswerHolder1 = "";
				this.findsplits();
				this.addition.visible = false;
				this.question_mc.gotoAndPlay("question");
				this.setButton(1);
			};

			// ===================================================================================================
			this.getNumbers = function(){
				this.question_mc.box1.setValue(this.q0[this.qNum]);
				this.question_mc.box2.setValue(this.q1[this.qNum]);
				this.question_mc.ansbox.focus();
			}

			// ===================================================================================================
			this.enableOK = function(){
				if (this.enableokflag == true){
					if (this.state == "question"){
						if (this.question_mc.ansbox.getValue()){
							this.setButton(2);
						}
						else{
							this.setButton(1);
						}
					}
					if (this.state == "help1"){
						if (this.question_mc.ansbox1.getValue() && this.question_mc.ansbox2.getValue() && this.question_mc.ansbox3.getValue()){
							this.setButton(2);
						}
						else{
							this.setButton(1);
						}
					}
					if (this.state == "help2a"){
						if (this.question_mc.ansbox1.getValue()){
							this.setButton(2);
						}
						else{
							this.setButton(1);
						}
					}
					if (this.state == "help2b"){
						if (this.question_mc.ansbox2.getValue()){
							this.setButton(2);
						}
						else{
							this.setButton(1);
						}
					}
					if (this.state == "help2c"){
						if (this.question_mc.ansbox3.getValue()){
							this.setButton(2);
						}
						else{
							this.setButton(1);
						}
					}
				}
				else{
					this.setButton(1);
				}
			}

			// ===================================================================================================
			// when ok buton is pressed
			this.doOk = function(){

				whizz.stopSound();
				this.setButton(1);
				if (this.state == "question"){
					if (this.answer1 == this.question_mc.ansbox.getValue()){
						whizz.myManager.setScore(this.qtotal);
						this.partitionButton.visible = false;
						this.TempAnswerHolder1 = "" + this.question_mc.ansbox.getValue();
						this.question_mc.gotoAndPlay("celebration");
						this.msg_txt.setMessage(whizz.lang.writtenScript2Q_text);
						this.outline1.gotoAndPlay("blue");
						this.state = "finish";
						this.setButton(2);
					} else if (this.noHelp) {
						this.noHelp = false;
						this.msg_txt.setMessage(whizz.lang.writtenScript3Q_text(this.splitnum1, this.splitnum2, this.q1[this.qNum]));
						whizz.playSound("H1");
						this.partitionButton.visible = false;
						this.setButton(1);
						this.state = "help1";
						this.question_mc.gotoAndPlay("showsplit");
					} else {
						whizz.myManager.setHelp(1);
						this.msg_txt.setMessage(whizz.lang.writtenScript3Q_text(this.splitnum1, this.splitnum2, this.q1[this.qNum]));
						whizz.playSound("H1");
						this.partitionButton.visible = false;
						this.setButton(1);
						this.state = "help1";
						this.question_mc.gotoAndPlay("showsplit");
					}
				} else if (this.state == "help1") {
					if (this.answer2 == this.question_mc.ansbox1.getValue() && this.answer3 == this.question_mc.ansbox2.getValue() && this.answer4 == this.question_mc.ansbox3.getValue()) {
						whizz.myManager.setScore(this.qtotal);
						this.question_mc.gotoAndPlay("celebration1");
						this.msg_txt.setMessage(whizz.lang.writtenScript2Q_text);
						this.outline4.gotoAndPlay("blue");
						this.state = "finish";
						this.setButton(2);
					} else {
						whizz.myManager.setHelp(2);
						this.setButton(1);
						this.state = "help2";
						this.dohelp();
					}
				}
				else if (this.state == "help2a"){
					this.setButton(1);
					this.state = "";
					this.question_mc.ansbox1.setEnabled(false);
					if (this.answer2 == this.question_mc.ansbox1.getValue()){
						this.checknum1();
					}
					else{
						this.outline2.gotoAndPlay("red");
						cjs.Tween.get(this, {useTicks: true}).wait(44).call(function(){
								this.msg_txt.setMessage(whizz.lang.writtenScript4Q_text(this.splitnum1, this.q1[this.qNum], this.answer2));
								this.question_mc.ansbox1.setValue(this.answer2);
								this.outline2.gotoAndStop(0);
							}).wait(45).call(function(){
								this.checknum1();
							});
					}
				}
				else if (this.state == "help2b"){
					this.setButton(1);
					this.state = "";
					this.question_mc.ansbox2.setEnabled(false);
					if (this.answer3 == this.question_mc.ansbox2.getValue()){
						this.checknum2();
					}
					else{
						this.outline3.gotoAndPlay("red");

						cjs.Tween.get(this, {useTicks: true}).wait(44).call(function(){
								this.msg_txt.setMessage(whizz.lang.writtenScript4Q_text(this.splitnum2, this.q1[this.qNum], this.answer3));
								this.question_mc.ansbox2.setValue(this.answer3);
								this.outline3.gotoAndStop(0);
							}).wait(45).call(function(){
								this.checknum2();
							});
					}
				}
				else if (this.state == "help2c"){
					this.setButton(1);
					this.state = "";
					this.question_mc.ansbox3.setEnabled(false);
					if (this.answer4 == this.question_mc.ansbox3.getValue()){
						whizz.myManager.setScore(this.qtotal);
						this.question_mc.gotoAndPlay("celebration1");
						this.msg_txt.setMessage(whizz.lang.writtenScript2Q_text);
						this.outline4.gotoAndPlay("blue");
						this.state = "finish";
						this.setButton(2);
					}
					else{
						this.outline4.gotoAndPlay("red");

						cjs.Tween.get(this, {useTicks: true}).wait(44).call(function(){
								this.setButton(2);
								this.msg_txt.setMessage(whizz.lang.writtenScript4Q_text(this.q0[this.qNum], this.q1[this.qNum], this.answer4));
								this.question_mc.ansbox3.setValue(this.answer4);
								this.outline4.gotoAndStop(0);
								this.state = "finish";
							});
					}
				}
				else if (this.state == "finish"){
					this.setquestion();
				}
			}

			// ===================================================================================================
			this.checknum1 = function(){
				this.question_mc.ansbox1.setEnabled(false);
				if (this.answer3 == this.question_mc.ansbox2.getValue()){
					this.question_mc.ansbox3.setEnabled(true);
					this.question_mc.ansbox3.focus();
					this.question_mc.ansbox3.setValue();
					this.addition.visible = true;
					this.msg_txt.setMessage(whizz.lang.writtenScript5Q_text(this.answer2, this.answer3));
					this.state = "help2c";
				}
				else{
					this.question_mc.ansbox2.setEnabled(true);
					this.question_mc.ansbox2.setValue();
					this.question_mc.ansbox2.focus();
					this.msg_txt.setMessage(whizz.lang.writtenScript6Q_text(this.splitnum2, this.q1[this.qNum]));
					this.state = "help2b";
				}
			}
			// ===================================================================================================
			this.checknum2 = function(){
				this.question_mc.ansbox2.setEnabled(false);
				this.question_mc.ansbox3.setEnabled(true);
				this.question_mc.ansbox3.setValue();
				this.question_mc.ansbox3.focus();

				this.addition.visible = true;
				this.msg_txt.setMessage(whizz.lang.writtenScript5Q_text(this.answer2, this.answer3));
				this.state = "help2c";
			}
			// ===================================================================================================
			this.getTempNumbers = function(){
				this.question_mc.ansbox.setValue(this.TempAnswerHolder1);
				this.question_mc.ansbox.setEnabled(false);
				this.question_mc.ansbox1.setEnabled(false);
				this.question_mc.ansbox2.setEnabled(false);
				this.question_mc.ansbox3.setEnabled(false);
			}

			// ===================================================================================================
			this.partitionButton.onRelease = function(){
				whizz.myManager.setHelp(1);
				this.msg_txt.setMessage(whizz.lang.writtenScript3Q_text(this.splitnum1, this.splitnum2, this.q1[this.qNum]));
				this.partitionButton.visible = false;
				this.state = "help1";
				this.question_mc.gotoAndPlay("showsplit");
			};
			// ===================================================================================================
			this.getPartitionNumbers = function(){
				this.question_mc.box1.setValue(this.q0[this.qNum]);
				this.question_mc.box2.setValue(this.q1[this.qNum]);
				this.question_mc.split1.setValue(this.splitnum1);
				this.question_mc.split2.setValue(this.splitnum2);
				this.question_mc.box3.setValue(this.q1[this.qNum]);
				this.question_mc.box4.setValue(this.q1[this.qNum]);
				this.question_mc.box5.setValue(this.q0[this.qNum]);
				this.question_mc.box6.setValue(this.q1[this.qNum]);
			}
			// ===================================================================================================
			this.dohelp = function(){
				if (this.answer2 == this.question_mc.ansbox1.getValue()){
					this.outline2.gotoAndPlay("blue");
				}
				else{
					this.outline2.gotoAndPlay("red");
				}
				if (this.answer3 == this.question_mc.ansbox2.getValue()){
					this.outline3.gotoAndPlay("blue");
				}
				else{
					this.outline3.gotoAndPlay("red");
				}
				if (this.answer4 == this.question_mc.ansbox3.getValue()){
				}
				else{
					this.outline4.gotoAndPlay("red");
				}
				cjs.Tween.get(this, {useTicks: true}).wait(44).call(function(){
						if (this.answer2 != this.question_mc.ansbox1.getValue()){
							this.msg_txt.setMessage(whizz.lang.writtenScript6Q_text(this.splitnum1, this.q1[this.qNum]));
							this.state = "help2a";
							this.question_mc.ansbox1.setValue();
							this.question_mc.ansbox1.focus();

							this.question_mc.ansbox3.setValue();
							this.question_mc.ansbox3.setEnabled(false);
							if (this.answer3 != this.question_mc.ansbox2.getValue()){
								this.question_mc.ansbox2.setValue();
								this.question_mc.ansbox2.setEnabled(false);
							}
							else{
								this.question_mc.ansbox2.setEnabled(false);
							}
						}
						else{
							this.question_mc.ansbox1.setEnabled(false);
							if (this.answer3 != this.question_mc.ansbox2.getValue()){
								this.msg_txt.setMessage(whizz.lang.writtenScript6Q_text(this.splitnum2, this.q1[this.qNum]));
								this.state = "help2b";
								this.question_mc.ansbox2.setValue();
								this.question_mc.ansbox2.focus();
								this.question_mc.ansbox3.setValue();
								this.question_mc.ansbox3.setEnabled(false);
							}
							else{
								this.addition.visible = true;
								this.msg_txt.setMessage(whizz.lang.writtenScript5Q_text(this.answer2, this.answer3));
								this.state = "help2c";
								this.question_mc.ansbox3.setValue();
								this.question_mc.ansbox3.focus();

								this.question_mc.ansbox2.setEnabled(false);
							}
						}
						this.outline2.gotoAndStop(0);
						this.outline3.gotoAndStop(0);
						this.outline4.gotoAndStop(0);
				}.bind(this));
			}

			this.addEventListener("tick", this.enableOK.bind(this));


			// ===================================================================================================
			// hide/show ok button
			this.setButton = function(frameVar){
				if (frameVar == 1){
					whizz.myManager.hideOK(true);
				}
				else if (frameVar == 2){
					whizz.myManager.hideOK(false);
				}
				else if (frameVar == 3){
					whizz.myManager.hideLeftRight(true);
				}
				else if (frameVar == 4){
					whizz.myManager.hideLeftRight(false);
				}
			};

			whizz.myManager.setTotalQuestion(10);

			whizz.myManager.enableButtons(true);
			whizz.myManager.setOKCallback(this, this.doOk);
			whizz.myManager.unpauseTimer();

			this.quest_txt = new whizz.MessageBox("questionBox");
			this.quest_txt.setTransform(28, 40);
			this.quest_txt.setMessage(whizz.lang.writtenScript0Q_text);

			this.msg_txt = new whizz.MessageBox("messageBox0");
			this.msg_txt.setTransform(27, 60);

			this.addChild(this.quest_txt, this.msg_txt);

			this.init();
		}

		// outlines
		this.addition = new lib.PlusSign();
		this.addition.setTransform(378,227);

		this.outline1 = new lib.Outline();
		this.outline1.setTransform(381,155);

		this.outline2 = new lib.Outline();
		this.outline2.setTransform(381,205);

		this.outline3 = new lib.Outline();
		this.outline3.setTransform(381,257);

		this.outline4 = new lib.Outline();
		this.outline4.setTransform(381,306);

		// question_mc
		this.question_mc = new lib.Question_Main();
		this.question_mc.setTransform(120.2,82.9,1,1,0,0,0,96.4,104.7);

		// partitionbutton
		this.partitionButton = new lib.PartitionButton();
		this.partitionButton.setTransform(116.4,157.7);
		new whizz.ButtonHelper(this.partitionButton);

		// Background
		this.instance = new lib.Background();
		this.instance.setTransform(272.9,208.9);
		this.instance.alpha = 0.68;
		this.instance.cache(-285,-225,571,452,whizz.scale);

		// bg
		this.shape = new cjs.Shape();
		this.shape.graphics.f("#99CC66").s().p("EArlgjEMhXJAAAMAAABGJMBXJAAAMAAAhGJ").cp();
		this.shape.setTransform(272.9,210.5);

		this.addChild(this.shape,this.instance,this.partitionButton,this.question_mc,this.outline2,this.outline3,this.outline4,this.outline1,this.addition);
		this.frame_0();
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-10.7,-223,567.3,658.1);


// symbols:




































	(lib.Question_Main = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{question:0,showsplit:41,celebration1:127,celebration:163},true);

		// timeline functions:
		this.frame_0 = function() {
			this.parent.getNumbers();
		}
		this.frame_40 = function() {
			this.parent.msg_txt.setMessage(whizz.lang.writtenScript1Q_text);

			this.ansbox.setValue();
			this.ansbox.focus();

			this.parent.enableokflag = true;
			this.parent.partitionButton.visible = true;
			this.stop();
		}
		this.frame_41 = function() {
			this.parent.enableokflag = false;
		}
		this.frame_67 = function() {
			this.parent.getPartitionNumbers();
		}
		this.frame_82 = function() {
			this.parent.getPartitionNumbers();
		}
		this.frame_98 = function() {
			this.parent.getPartitionNumbers();
		}
		this.frame_110 = function() {
			this.parent.getPartitionNumbers();
		}
		this.frame_116 = function() {
			this.parent.getPartitionNumbers();
		}
		this.frame_126 = function() {
			this.ansbox1.setValue();
			this.ansbox1.focus();
			this.ansbox2.setValue();
			this.ansbox3.setValue();
			this.parent.enableokflag = true;

			this.stop();
		}
		this.frame_127 = function() {
			this.parent.getTempNumbers();
			whizz.playSound("monkey1");
		}
		this.frame_162 = function() {
			this.gotoAndPlay("celebration1");
		}
		this.frame_163 = function() {
			this.parent.getTempNumbers();
			whizz.playSound("monkey1");
		}
		this.frame_199 = function() {
			this.gotoAndPlay("celebration");
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(40).call(this.frame_40).wait(1).call(this.frame_41).wait(26).call(this.frame_67).wait(15).call(this.frame_82).wait(16).call(this.frame_98).wait(12).call(this.frame_110).wait(6).call(this.frame_116).wait(10).call(this.frame_126).wait(1).call(this.frame_127).wait(35).call(this.frame_162).wait(1).call(this.frame_163).wait(36).call(this.frame_199));

		// monkey
		this.monkey_1 = new lib.Monkey();
		this.monkey_1.setTransform(117.8,-74.6,0.68,0.68,0,0,180);

		this.timeline.addTween(cjs.Tween.get(this.monkey_1).to({y:106.3},7).to({y:-73.5},4).to({x:227.8,y:-83.5},1).to({y:116.3},7).to({y:-70.5},3).wait(1).to({x:320.8,y:-83.5},0).to({y:116.3},8).to({y:-78.5},3).to({_off:true},1).wait(6).to({x:117.8,y:-69.5,_off:false},0).to({y:115.3},9).wait(2).to({skewX:4.8,skewY:184.9},0).wait(2).to({skewX:-7.1,skewY:172.7,x:121.1,y:119.1},0).wait(2).to({skewX:6.8,skewY:186.9,x:115.3,y:111.5},0).wait(2).to({skewX:0,skewY:180,x:117.8,y:115.3},0).wait(2).to({skewX:10.1,skewY:190.2,x:115.9,y:112.1},0).wait(2).to({skewX:-4.1,skewY:175.7,x:117.4,y:114.3},0).wait(2).to({skewX:0,skewY:180,x:117.8,y:115.3},0).wait(9).to({y:-74.5},9).to({_off:true},45).wait(37));

		// box1
		this.box1 = new lib.QuestionBox();
		this.box1.setTransform(155.4,-7,1,1,0,0,0,25.2,16.1);

		this.timeline.addTween(cjs.Tween.get(this.box1).to({x:156.4,y:178.3},7).wait(43).wait(2).to({x:148.4},0).wait(2).to({x:166.4},0).wait(2).to({x:143.4},0).wait(2).to({x:156.4},0).wait(2).to({x:140.4,y:179.3},0).wait(2).to({x:159.4,y:176.3},0).wait(2).to({x:156.4,y:178.3},0).to({alpha:0.5},18).wait(81).to({alpha:1},0).wait(37));

		// x_sign
		this.instance_55 = new lib.MultiplicationSign();
		this.instance_55.setTransform(213.9,189.4,1,1,0,0,0,11,18.8);
		this.instance_55.alpha = 0;
		this.instance_55._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(7).to({_off:false},0).to({alpha:1},5).wait(188));

		// box2
		this.box2 = new lib.QuestionBox();
		this.box2.setTransform(265.4,-21.6,1,1,0,0,0,25.2,16.1);

		this.timeline.addTween(cjs.Tween.get(this.box2).wait(12).to({y:178.3},7).wait(45).to({alpha:0.5},18).wait(81).to({alpha:1},0).wait(37));

		// =_sign
		this.equalsmc = new lib.EqualSign();
		this.equalsmc.setTransform(315.3,193.1,1,1,0,0,0,11,18.8);
		this.equalsmc._off = true;

		this.timeline.addTween(cjs.Tween.get(this.equalsmc).wait(17).to({_off:false},0).wait(6).to({_off:true},18).wait(122).to({_off:false},0).wait(37));

		// ansbox
		this.ansbox = new lib.AnswerBox();
		this.ansbox.setTransform(357.4,-21.5,1,1,0,0,0,25.1,16.1);

		this.timeline.addTween(cjs.Tween.get(this.ansbox).wait(23).to({scaleX:0.92,scaleY:0.92,x:357.4,y:177},8).to({_off:true},10).call(function(){this.hide();}).wait(122).to({_off:false},0).call(function(){this.show();}).wait(37));

		// celebration
		this.monkeyc_1 = new lib.MonkeyCelebration();
		this.monkeyc_1.setTransform(442.9,86.2,0.68,0.68,0,0,180);
		this.monkeyc_1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.monkeyc_1).wait(127).to({_off:false},0).wait(3).to({y:66.2},0).wait(3).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:66.2},0).wait(3).to({y:106.2},0).wait(3).to({y:86.2},0).wait(3).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:86.2},0).wait(3).to({y:66.2},0).wait(4).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:66.2},0).wait(3).to({y:106.2},0).wait(3).to({y:86.2},0).wait(3).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:66.2},0).wait(3).to({y:106.2},0).wait(3));

		// split1
		this.split1 = new lib.QuestionBox();
		this.split1.setTransform(156.4,178.3,1,1,0,0,0,25.2,16.1);
		this.split1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.split1).wait(67).to({_off:false},0).wait(1).to({x:166.4,y:190.8},2).to({x:156.4,y:228.5},3).to({_off:true},90).wait(37));

		// split2
		this.split2 = new lib.QuestionBox();
		this.split2.setTransform(156.4,178.3,1,1,0,0,0,25.2,16.1);
		this.split2._off = true;

		this.timeline.addTween(cjs.Tween.get(this.split2).wait(67).to({_off:false},0).wait(1).to({x:146.4,y:203.3},2).to({x:156.4,y:278.5},3).to({_off:true},90).wait(37));

		// x1
		this.instance_56 = new lib.MultiplicationSign();
		this.instance_56.setTransform(213.8,239.6,1,1,0,0,0,11,18.8);
		this.instance_56.alpha = 0;
		this.instance_56._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(73).to({_off:false},0).to({alpha:1},9).to({_off:true},81).wait(37));

		// box3
		this.box3 = new lib.QuestionBox();
		this.box3.setTransform(265.4,228.5,1,1,0,0,0,25.2,16.1);
		this.box3.alpha = 0;
		this.box3._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box3).wait(82).to({_off:false},0).to({alpha:1},6).to({_off:true},75).wait(37));

		// =1
		this.instance_57 = new lib.EqualSign();
		this.instance_57.setTransform(315.4,242.2,1,1,0,0,0,11,18.8);
		this.instance_57.alpha = 0;
		this.instance_57._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(86).to({_off:false},0).to({alpha:1},6).to({_off:true},71).wait(37));

		// ans1
		this.ansbox1 = new lib.AnswerBox();
		this.ansbox1.setTransform(357.4,227.7,0.964,0.963,0,0,0,25.1,16.1);
		//this.ansbox1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.ansbox1).wait(1).to({_off:true},1).wait(89).to({_off:false},0).call(function(){this.show();}).wait(6).to({_off:true},67).call(function(){this.hide();}).wait(37));

		// x2
		this.instance_58 = new lib.MultiplicationSign();
		this.instance_58.setTransform(213.8,289.6,1,1,0,0,0,11,18.8);
		this.instance_58.alpha = 0;
		this.instance_58._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(94).to({_off:false},0).to({alpha:1},6).to({_off:true},63).wait(37));

		// box4
		this.box4 = new lib.QuestionBox();
		this.box4.setTransform(265.4,278.5,1,1,0,0,0,25.2,16.1);
		this.box4.alpha = 0;
		this.box4._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box4).wait(98).to({_off:false},0).to({alpha:1},6).to({_off:true},59).wait(37));

		// =2
		this.instance_59 = new lib.EqualSign();
		this.instance_59.setTransform(315.4,292.2,1,1,0,0,0,11,18.8);
		this.instance_59._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(102).to({_off:false},0).wait(6).to({_off:true},55).wait(37));

		// ans2
		this.ansbox2 = new lib.AnswerBox();
		this.ansbox2.setTransform(357.4,277.7,0.964,0.963,0,0,0,25.1,16.1);
		//this.ansbox2._off = true;

		this.timeline.addTween(cjs.Tween.get(this.ansbox2).wait(1).to({_off:true},1).wait(105).to({_off:false},0).call(function(){this.show();}).wait(6).to({_off:true},51).call(function(){this.hide();}).wait(37));

		// Layer 26
		this.shape_136 = new cjs.Shape();
		this.shape_136.graphics.f().s("#04070D").ss(1,1,1).p("AmFAAIMLAA");
		this.shape_136.setTransform(356.2,303.6);

		this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_136}]},111).to({state:[]},52).wait(37));

		// box5
		this.box5 = new lib.QuestionBox();
		this.box5.setTransform(156.4,328.3,1,1,0,0,0,25.2,16.1);
		this.box5.alpha = 0;
		this.box5._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box5).wait(110).to({_off:false},0).to({y:328.5,alpha:1},5).to({_off:true},48).wait(37));

		// x
		this.instance_60 = new lib.MultiplicationSign();
		this.instance_60.setTransform(213.8,339.6,1,1,0,0,0,11,18.8);
		this.instance_60.alpha = 0;
		this.instance_60._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(113).to({_off:false},0).to({alpha:1},5).to({_off:true},45).wait(37));

		// box6
		this.box6 = new lib.QuestionBox();
		this.box6.setTransform(265.4,328.3,1,1,0,0,0,25.2,16.1);
		this.box6.alpha = 0;
		this.box6._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box6).wait(116).to({_off:false},0).to({y:328.5,alpha:1},5).to({_off:true},42).wait(37));

		// =
		this.instance_61 = new lib.EqualSign();
		this.instance_61.setTransform(315.4,342.2,1,1,0,0,0,11,18.8);
		this.instance_61._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(119).to({_off:false},0).wait(5).to({_off:true},39).wait(37));

		// finalansbox
		this.ansbox3 = new lib.AnswerBox();
		this.ansbox3.setTransform(357.4,327.7,0.964,0.963,0,0,0,25.1,16.1);
		//this.ansbox3.alpha = 0;
		//this.ansbox3._off = true;

		this.timeline.addTween(cjs.Tween.get(this.ansbox3).wait(1).to({_off:true},1).wait(120).to({_off:false},0).call(function(){this.show();}).to({alpha:1},5).to({_off:true},37).call(function(){this.hide();}).wait(37));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(106.7,-201.2,279.6,210.4);


})(lib_MA_GBR_0900KAx0100 = lib_MA_GBR_0900KAx0100 || {}, images = images || {}, createjs = createjs || {}, whizz = whizz || {});
var lib_MA_GBR_0900KAx0100, images, createjs, whizz;