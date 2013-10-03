(function(lib, img, cjs, whizz){

	var p; // shortcut to reference prototypes

// stage content:
	(lib.MA_GBR_0900KAx0100_TP = function() {
		this.initialize();

		// timeline function:
		this.frame_0 = function() {
			this.init = function() {
				this.setButton(2);
				this.setButton(4);
			}
			//==========================================================================================================================
			// DO OK
			this.doOk = function() {
				whizz.stopSound();

				if (this.step == 1) {
					this.question_mc.gotoAndPlay("first_row");
				} else if (this.step == 2) {
					whizz.nextScene();
				}
			}
			// DO LEFT
			this.doLeft = function() {
				whizz.stopSound();

				if (this.step == 1) {
					this.question_mc.gotoAndPlay("first_box");
				} else  if (this.step == 2) {
					this.msg_txt2.setMessage();
					this.msg_txt3.setMessage();
					this.msg_txt4.setMessage();
					this.msg_txt5.setMessage();
					this.msg_txt6.setMessage();
					this.question_mc.gotoAndPlay("first_box");
				}

			}
			//==========================================================================================================================
			// DO RIGHT
			this.doRight = function() {
				whizz.stopSound();
				if (this.step == 1) {
					this.question_mc.gotoAndPlay("first_row");
				} else if (this.step == 2) {
					whizz.nextScene();
				}
			}
			//==========================================================================================================================
			// Hide and unhide the ok button takes a num as parameter...1 for disabling and any other number for enabling
			this.setButton = function(frameVar) {
				if (frameVar == 1) {
					whizz.myManager.hideOK(true);
				} else if (frameVar == 2) {
					whizz.myManager.hideOK(false);
				} else if (frameVar == 3) {
					whizz.myManager.hideLeftRight(true);
				} else if (frameVar == 4) {
					whizz.myManager.hideLeftRight(false);
				}
			}

			//By default the buttons are hidden this is use to intialise the buttons.
			whizz.myManager.enableButtons(true);
			//the following 3 lines tells the base movie which functions should be called when ok, left and right buttons are clicked
			whizz.myManager.setOKCallback(this, this.doOk);
			whizz.myManager.setLeftCallback(this, this.doLeft);
			whizz.myManager.setRightCallback(this, this.doRight);
			// Stops the timer
			whizz.myManager.pauseTimer();

			this.msg_txt = new whizz.MessageBox("messageBox0");
			this.msg_txt.setTransform(28,84);
			this.msg_txt1 = new whizz.MessageBox("messageBox1");
			this.msg_txt1.setTransform(28, 50);
			this.msg_txt2 = new whizz.MessageBox("messageBox2");
			this.msg_txt2.setTransform(27, 53);
			this.msg_txt3 = new whizz.MessageBox("messageBox3");
			this.msg_txt3.setTransform(25, 70);
			this.msg_txt4 = new whizz.MessageBox("messageBox4");
			this.msg_txt4.setTransform(25, 86);
			this.msg_txt5 = new whizz.MessageBox("messageBox5");
			this.msg_txt5.setTransform(25, 101);
			this.msg_txt6 = new whizz.MessageBox("messageBox6");
			this.msg_txt6.setTransform(25, 119);

			this.addChild(this.msg_txt, this.msg_txt1, this.msg_txt2, this.msg_txt3, this.msg_txt4, this.msg_txt5, this.msg_txt6);

			this.init();
		}

		// question_mc
		this.question_mc = new lib.Question_TP();
		this.question_mc.setTransform(119.2,82.9,1,1,0,0,0,96.4,104.7);

		// Bg
		this.background = new lib.Background();
		this.background.setTransform(272.9,208.9);
		this.background.alpha = 0.68;
		this.background.cache(-285,-225,571,452,whizz.scale);

		// Layer 1
		this.shape = new cjs.Shape();
		this.shape.graphics.f("#99CC66").s().p("EArlgjEMhXJAAAMAAABGJMBXJAAAMAAAhGJ").cp();
		this.shape.setTransform(272.9,210.5);

		this.addChild(this.shape,this.background,this.question_mc);
		this.frame_0();
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-10.7,-223,567.3,658.1);








	(lib.Question_TP = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{first_box:0,shake_box:42,first_row:133,second_row:212,third_row:270,answer_row:330,celebration1:380,celebration:415},true);

		// timeline functions:
		this.frame_0 = function() {
			this.box1.setValue(24);

			//_parent.msg_txt1 = "Partitioning means splitting numbers into parts.\n24 can be partitioned into 20 and 4";
			this.parent.msg_txt2.setMessage();
			this.parent.msg_txt3.setMessage();
			this.parent.msg_txt4.setMessage();
			this.parent.msg_txt5.setMessage();
			this.parent.msg_txt6.setMessage();

			this.parent.step = 1;
			this.parent.msg_txt1.setMessage();
			this.parent.msg_txt2.setMessage();
			this.parent.msg_txt.setMessage();
			whizz.myManager.hideLeftRight("left");
		}
		this.frame_13 = function() {

			this.soundIsPlaying = true;
			var instance = cjs.Sound.play("TP1").addEventListener("complete", function(){
				cjs.Sound.play("TP2").addEventListener("complete", function(){
					this.soundIsPlaying = false;
					this.play();
				}.bind(this))
			}.bind(this));

			this.parent.msg_txt1.setMessage(whizz.lang.writtenScript1TP_text);
			this.parent.msg_txt2.setMessage();
			this.parent.msg_txt3.setMessage();
			this.parent.msg_txt4.setMessage();
			this.parent.msg_txt5.setMessage();
			this.parent.msg_txt6.setMessage();
		}
		this.frame_40 = function() {
			if(this.soundIsPlaying) this.stop();
		}
		this.frame_42 = function() {
			this.parent.msg_txt1.setMessage(whizz.lang.writtenScript1TP_text);
			this.parent.msg_txt2.setMessage();
			this.parent.msg_txt3.setMessage();
			this.parent.msg_txt4.setMessage();
			this.parent.msg_txt5.setMessage();
			this.parent.msg_txt6.setMessage();
		}
		this.frame_67 = function() {
			this.split1.setValue(20);
			this.split2.setValue(4);
			this.parent.msg_txt1.setMessage(whizz.lang.writtenScript1TP_text);
			this.parent.msg_txt2.setMessage();
			this.parent.msg_txt3.setMessage();
			this.parent.msg_txt4.setMessage();
			this.parent.msg_txt5.setMessage();
			this.parent.msg_txt6.setMessage();
		}
		this.frame_84 = function() {
			whizz.playSound("TP3");
			this.parent.msg_txt.setMessage(whizz.lang.writtenScript2TP_text);
			this.parent.msg_txt2.setMessage();
			this.parent.msg_txt3.setMessage();
			this.parent.msg_txt4.setMessage();
			this.parent.msg_txt5.setMessage();
			this.parent.msg_txt6.setMessage();
		}
		this.frame_131 = function() {
			whizz.myManager.hideLeftRight(false);
			//whizz.myManager.hideLeftRight("left");

			this.stop();
			this.parent.msg_txt1.setMessage(whizz.lang.writtenScript1TP_text);
			this.parent.msg_txt2.setMessage();
			this.parent.msg_txt3.setMessage();
			this.parent.msg_txt4.setMessage();
			this.parent.msg_txt5.setMessage();
			this.parent.msg_txt6.setMessage();
		}
		this.frame_133 = function() {
			whizz.myManager.hideLeftRight(false);
			console.log("2")
			this.parent.msg_txt.setMessage();
			this.parent.msg_txt1.setMessage();
			this.split1.setValue(20);
			this.split2.setValue(4);

			this.parent.step = 2;
			whizz.stopSound();
		}
		this.frame_138 = function() {
			this.box2.setValue(3);
		}
		this.frame_141 = function() {
			whizz.playSound("monkey1");
		}
		this.frame_149 = function() {
			this.ansbox.setValue();
		}
		this.frame_161 = function() {
			this.parent.msg_txt2.setMessage(whizz.lang.writtenScript3TP_text);
		}
		this.frame_212 = function() {
			this.parent.msg_txt2.setMessage(whizz.lang.writtenScript3TP_text);
			this.parent.msg_txt3.setMessage(whizz.lang.writtenScript4TP_text);
			this.parent.msg_txt1.setMessage();

			whizz.stopSound();
		}
		this.frame_220 = function() {
			whizz.playSound("monkey1");
		}
		this.frame_221 = function() {
			this.box3.setValue(3);
		}
		this.frame_229 = function() {
			this.ansbox1.setValue(60);
		}
		this.frame_270 = function() {
			this.parent.msg_txt2.setMessage(whizz.lang.writtenScript3TP_text);
			this.parent.msg_txt3.setMessage(whizz.lang.writtenScript4TP_text);
			this.parent.msg_txt4.setMessage(whizz.lang.writtenScript5TP_text);
			whizz.stopSound();
		}
		this.frame_275 = function() {
			this.box4.setValue(3);
		}
		this.frame_280 = function() {
			whizz.playSound("monkey1");
		}
		this.frame_282 = function() {
			this.ansbox2.setValue(12);
		}
		this.frame_330 = function() {
			this.box5.setValue(24);
			this.parent.msg_txt2.setMessage(whizz.lang.writtenScript3TP_text);
			this.parent.msg_txt3.setMessage(whizz.lang.writtenScript4TP_text);
			this.parent.msg_txt4.setMessage(whizz.lang.writtenScript5TP_text);
			this.parent.msg_txt5.setMessage(whizz.lang.writtenScript6TP_text);
			whizz.stopSound();
		}
		this.frame_333 = function() {
			this.box6.setValue(3);
		}
		this.frame_340 = function() {
			this.ansbox3.setValue(72);
		}
		this.frame_342 = function() {
			whizz.playSound("monkey1");
		}
		this.frame_380 = function() {
			this.parent.msg_txt2.setMessage(whizz.lang.writtenScript3TP_text);
			this.parent.msg_txt3.setMessage(whizz.lang.writtenScript4TP_text);
			this.parent.msg_txt4.setMessage(whizz.lang.writtenScript5TP_text);
			this.parent.msg_txt5.setMessage(whizz.lang.writtenScript6TP_text);
			this.parent.msg_txt6.setMessage(whizz.lang.writtenScript7TP_text);
			whizz.stopSound();
			whizz.playSound("monkeylaugh");
		}
		this.frame_415 = function() {
			whizz.playSound("monkeylaugh");
		}
		this.frame_453 = function() {
			this.stop();
			whizz.stopSound();
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(13).call(this.frame_13).wait(27).call(this.frame_40).wait(2).call(this.frame_42).wait(25).call(this.frame_67).wait(17).call(this.frame_84).wait(47).call(this.frame_131).wait(2).call(this.frame_133).wait(5).call(this.frame_138).wait(3).call(this.frame_141).wait(8).call(this.frame_149).wait(12).call(this.frame_161).wait(51).call(this.frame_212).wait(8).call(this.frame_220).wait(1).call(this.frame_221).wait(8).call(this.frame_229).wait(41).call(this.frame_270).wait(5).call(this.frame_275).wait(5).call(this.frame_280).wait(2).call(this.frame_282).wait(48).call(this.frame_330).wait(3).call(this.frame_333).wait(7).call(this.frame_340).wait(2).call(this.frame_342).wait(38).call(this.frame_380).wait(35).call(this.frame_415).wait(38).call(this.frame_453));

		// monkey
		this.monkey = new lib.MonkeyCelebration();
		this.monkey.setTransform(442.9,86.2,0.68,0.68,0,0,180);
		this.monkey._off = true;

		this.timeline.addTween(cjs.Tween.get(this.monkey).wait(380).to({_off:false},0).wait(3).to({y:66.2},0).wait(3).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:66.2},0).wait(3).to({y:106.2},0).wait(3).to({y:86.2},0).wait(3).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:86.2},0).wait(2).to({y:66.2},0).wait(4).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:66.2},0).wait(3).to({y:106.2},0).wait(3).to({y:86.2},0).wait(3).to({y:92.2},0).wait(3).to({y:81.2},0).wait(3).to({y:99.2},0).wait(3).to({y:66.2},0).wait(3).to({y:106.2},0).wait(5));

		// monkey
		this.monkey_1 = new lib.Monkey();
		this.monkey_1.setTransform(117.8,-74.6,0.68,0.68,0,0,180);

		this.timeline.addTween(cjs.Tween.get(this.monkey_1).to({y:106.3},14).to({y:-73.5},8).wait(18).wait(2).to({y:-69.5},0).to({y:115.3},9).wait(2).to({skewX:4.8,skewY:184.9},0).wait(2).to({skewX:-7.1,skewY:172.7,x:121.1,y:119.1},0).wait(2).to({skewX:6.8,skewY:186.9,x:115.3,y:111.5},0).wait(2).to({skewX:0,skewY:180,x:117.8,y:115.3},0).wait(2).to({skewX:10.1,skewY:190.2,x:115.9,y:112.1},0).wait(2).to({skewX:-4.1,skewY:175.7,x:117.4,y:114.3},0).wait(2).to({skewX:0,skewY:180,x:117.8,y:115.3},0).wait(9).to({y:-74.5},9).wait(55).to({x:227.8,y:-83.5},0).to({y:116.3},8).to({y:-70.5},2).wait(1).to({x:320.8,y:-83.5},0).to({y:116.3},9).to({y:-78.5},2).to({_off:true},1).wait(293));

		// box1
		this.box1 = new lib.QuestionBox();
		this.box1.setTransform(155.4,-7,1,1,0,0,0,25.2,16.1);

		this.timeline.addTween(cjs.Tween.get(this.box1).to({x:156.4,y:178.3},14).wait(37).wait(2).to({x:148.4},0).wait(2).to({x:166.4},0).wait(2).to({x:143.4},0).wait(2).to({x:156.4},0).wait(2).to({x:140.4,y:179.3},0).wait(2).to({x:159.4,y:176.3},0).wait(2).to({x:156.4,y:178.3},0).wait(306).to({alpha:0.539},6).wait(77));

		// x_sign
		this.instance_44 = new lib.MultiplicationSign();
		this.instance_44.setTransform(214.4,188.1,1,1,0,0,0,11,18.8);
		this.instance_44.alpha = 0;
		this.instance_44._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(133).to({_off:false},0).to({alpha:1},5).wait(233).to({alpha:0.48},6).wait(77));

		// box2
		this.box2 = new lib.QuestionBox();
		this.box2.setTransform(265.4,-21.6,1,1,0,0,0,25.2,16.1);
		this.box2._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box2).wait(138).to({_off:false},0).to({y:178.3},8).wait(225).to({alpha:0.48},6).wait(77));

		// =_sign
		this.instance_45 = new lib.EqualSign();
		this.instance_45.setTransform(314.3,192.1,1,1,0,0,0,11,18.8);
		this.instance_45.alpha = 0;
		this.instance_45._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(143).to({_off:false},0).to({alpha:1},6).wait(222).to({alpha:0.48},6).wait(77));

		// ansbox
		this.ansbox = new lib.QuestionBox();
		this.ansbox.setTransform(358.3,-21.5,1.001,1.002,0,0,0,25.1,16.1);
		this.ansbox._off = true;

		this.timeline.addTween(cjs.Tween.get(this.ansbox).wait(149).to({_off:false},0).to({y:178.4},9).wait(213).to({alpha:0.48},6).wait(77));

		// split1
		this.split1 = new lib.QuestionBox();
		this.split1.setTransform(156.4,178.3,1,1,0,0,0,25.2,16.1);
		this.split1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.split1).wait(67).to({_off:false},0).wait(1).to({x:166.4,y:190.8},2).to({x:156.4,y:228.3},3).wait(381));

		// split2
		this.split2 = new lib.QuestionBox();
		this.split2.setTransform(156.4,178.3,1,1,0,0,0,25.2,16.1);
		this.split2._off = true;

		this.timeline.addTween(cjs.Tween.get(this.split2).wait(67).to({_off:false},0).wait(1).to({x:146.4,y:203.3},2).to({x:156.4,y:278.3},3).wait(381));

		// x1
		this.instance_46 = new lib.MultiplicationSign();
		this.instance_46.setTransform(214.4,238.1,1,1,0,0,0,11,18.8);
		this.instance_46.alpha = 0;
		this.instance_46._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(212).to({_off:false},0).to({alpha:1},9).wait(233));

		// box3
		this.box3 = new lib.QuestionBox();
		this.box3.setTransform(265.4,228.3,1,1,0,0,0,25.2,16.1);
		this.box3.alpha = 0;
		this.box3._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box3).wait(221).to({_off:false},0).to({alpha:1},6).wait(227));

		// =1
		this.instance_47 = new lib.EqualSign();
		this.instance_47.setTransform(314.3,242.1,1,1,0,0,0,11,18.8);
		this.instance_47.alpha = 0;
		this.instance_47._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(225).to({_off:false},0).to({alpha:1},6).wait(223));

		// flash
		this.instance_48 = new lib.BoxBg();
		this.instance_48.setTransform(358,256.7,0.526,0.432,0,0,0,0,1);
		this.instance_48._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(229).to({_off:false},0).to({_off:true},38).wait(187));

		// ans1
		this.ansbox1 = new lib.QuestionBox();
		this.ansbox1.setTransform(358.3,228.4,1.001,1.002,0,0,0,25.1,16.1);
		this.ansbox1.alpha = 0;
		this.ansbox1._off = true;

		this.timeline.addTween(cjs.Tween.get(this.ansbox1).wait(229).to({_off:false},0).to({alpha:1},27).wait(198));

		// x2
		this.instance_49 = new lib.MultiplicationSign();
		this.instance_49.setTransform(214.4,288.1,1,1,0,0,0,11,18.8);
		this.instance_49.alpha = 0;
		this.instance_49._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(270).to({_off:false},0).to({alpha:1},6).wait(178));

		// box4
		this.box4 = new lib.QuestionBox();
		this.box4.setTransform(265.4,278.3,1,1,0,0,0,25.2,16.1);
		this.box4.alpha = 0;
		this.box4._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box4).wait(274).to({_off:false},0).to({alpha:1},6).wait(174));

		// =2
		this.instance_50 = new lib.EqualSign();
		this.instance_50.setTransform(314.3,292.1,1,1,0,0,0,11,18.8);
		this.instance_50.alpha = 0;
		this.instance_50._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(278).to({_off:false},0).to({alpha:1},6).wait(170));

		// flash2
		this.instance_51 = new lib.BoxBg();
		this.instance_51.setTransform(358.7,307.1,0.526,0.432,0,0,0,0,1.1);
		this.instance_51._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(282).to({_off:false},0).to({_off:true},47).wait(125));

		// ans2
		this.ansbox2 = new lib.QuestionBox();
		this.ansbox2.setTransform(358.3,278.4,1.001,1.002,0,0,0,25.1,16.1);
		this.ansbox2.alpha = 0;
		this.ansbox2._off = true;

		this.timeline.addTween(cjs.Tween.get(this.ansbox2).wait(282).to({_off:false},0).to({alpha:1},47).wait(125));

		// Layer 26
		this.shape_135 = new cjs.Shape();
		this.shape_135.graphics.f().s("#04070D").ss(1,1,1).p("AmFAAIMLAA");
		this.shape_135.setTransform(356.2,301.8);

		this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_135}]},331).wait(123));

		// box5
		this.box5 = new lib.QuestionBox();
		this.box5.setTransform(156.4,328.3,1,1,0,0,0,25.2,16.1);
		this.box5.alpha = 0;
		this.box5._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box5).wait(330).to({_off:false},0).to({alpha:1},5).wait(119));

		// x
		this.instance_52 = new lib.MultiplicationSign();
		this.instance_52.setTransform(214.4,337.1,1,1,0,0,0,11,18.8);
		this.instance_52.alpha = 0;
		this.instance_52._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(333).to({_off:false},0).to({alpha:1},5).wait(116));

		// box6
		this.box6 = new lib.QuestionBox();
		this.box6.setTransform(265.4,328.3,1,1,0,0,0,25.2,16.1);
		this.box6.alpha = 0;
		this.box6._off = true;

		this.timeline.addTween(cjs.Tween.get(this.box6).wait(333).to({_off:false},0).to({alpha:1},5).wait(116));

		// =
		this.instance_53 = new lib.EqualSign();
		this.instance_53.setTransform(314.3,340.1,1,1,0,0,0,11,18.8);
		this.instance_53.alpha = 0;
		this.instance_53._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(333).to({_off:false},0).to({alpha:1},5).wait(116));

		// flash3
		this.instance_54 = new lib.BoxBg();
		this.instance_54.setTransform(359,355.9,0.526,0.432,0,0,0,0,1.1);
		this.instance_54._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(339).to({_off:false},0).to({_off:true},65).wait(50));

		// finalansbox
		this.ansbox3 = new lib.QuestionBox();
		this.ansbox3.setTransform(358.3,328.4,1.001,1.002,0,0,0,25.1,16.1);
		this.ansbox3.alpha = 0;
		this.ansbox3._off = true;

		this.timeline.addTween(cjs.Tween.get(this.ansbox3).wait(339).to({_off:false},0).to({alpha:1},65).wait(50));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(106.7,-201.2,84.5,210.4);


})(lib_MA_GBR_0900KAx0100 = lib_MA_GBR_0900KAx0100 || {}, images = images || {}, createjs = createjs || {}, whizz = whizz || {});
var lib_MA_GBR_0900KAx0100, images, createjs, whizz;