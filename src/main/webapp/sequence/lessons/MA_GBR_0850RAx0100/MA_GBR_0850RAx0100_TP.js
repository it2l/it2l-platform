(function (lib, img, cjs, whizz) {

	var p; // shortcut to reference prototypes

// stage content:
	(lib.MA_GBR_0850RAx0100_TP = function() {
		this.initialize();

		// timeline function:
		this.frame_0 = function() {
			this.init = function() {
				whizz.myManager.hideOK(true);
				this.count = 0;
				//----------------------------------------------------------------------------------------
				this.torchButtons = [];
				//----------------------------------------------------------------------------------------
				//#######################
				this.ansText.label.text = "";
				this.ansText.x = -100;
				this.ansText.y = -100;
				//----------------------------------------------------------------------------------------
				//Creating Buttons over the Chairs

				var xCoor = 109;
				var yCoor;
				this.torchButtons = [];

				for (var i = 0; i<6; i++) {
					yCoor = 311;
					this.torchButtons[i] = [];

					for (var j=0; j<6; j++) {
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

				//----------------------------------------------------------------------------------------
				this.TP_01();
				//#######################
			}
			//==========================================================================================================================
			// DO OK
			this.doOk = function() {
				this.removeAllEventListeners("tick");
				whizz.myManager.hideOK(true);
				this.skipTP();
			}
			//==========================================================================================================================
			// DO RIGHT
			this.doRight = function() {
				whizz.stopSound();
				this.count++;
				this.gotoTP();
			}
			//==========================================================================================================================
			this.doLeft = function() {
				whizz.stopSound();
				this.count--;
				this.gotoTP();
			}
			this.gotoTP = function(){
				switch(this.count)
				{
					case 0:
						this.TP_01();
						break;
					case 1:
						this.TP_02();
						break;
					case 2:
						this.TP_03();
						break;
					case 3:
						this.TP_04();
						break;
					case 4:
						this.TP_05();
						break;
				}
			}
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
			}

			//==========================================================================================================================
			this.torchButtonClickHandler = function(e){
				var torchButton = e.target;
				torchButton.parent.resetButtons();
				torchButton.gotoAndStop("start");
			}
			//==========================================================================================================================
			this.resetButtons = function() {
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						this.torchButtons[i][j].gotoAndStop(0);
					}
				}
			}
			//==========================================================================================================================
			this.disableButtons = function() {
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						this.torchButtons[i][j].mouseEnabled = false;
					}
				}
			}
			//==========================================================================================================================
			this.enableButtons = function() {
				for (var i=0; i<6; i++) {
					for (var j=0; j<6; j++) {
						this.torchButtons[i][j].mouseEnabled = true;
					}
				}
			}
			//==========================================================================================================================
			this.coordinateAppear = function() {
				//this.ansText.swapDepths(80001);
				this.addChild(this.ansText);
				this.ansText.label.text = whizz.lang.TP_B4;
				this.ansText.x = this.torchButtons[1][3].x;
				this.ansText.y = this.torchButtons[1][3].y;
			}
			//==========================================================================================================================
			this.coordinateDisappear = function() {
				//this.ansText.swapDepths(80001);
				this.ansText.label.text = "";
				this.ansText.x = -100;
				this.ansText.y = -100;
			}
			//==========================================================================================================================
			this.TP_01 = function() {
				this.setButton(4);
				this.setButton(1);
				this.removeAllEventListeners("tick");
				this.resetButtons();
				this.messageBox.setMessage(whizz.lang.TP1a);
				whizz.playSound("TP1");
				this.addEventListener("tick", this.TP_01_enterFrame);
				this.delayCounter = 0;
			}
			this.TP_01_enterFrame = function(e){
				var self = e.target;
				self.delayCounter++;
				switch(self.delayCounter){
					case 50:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP1b);
						for (i=0; i<6; i++) {
							self.torchButtons[0][i].gotoAndPlay("blue");
						}
						break;

					case 110:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP1c);
						for (i=0; i<6; i++) {
							self.torchButtons[1][i].gotoAndPlay("blue");
						}
						break;

					case 150:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP1d);
						for (i=0; i<6; i++) {
							self.torchButtons[2][i].gotoAndPlay("blue");
						}
						break;

					case 190:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP1e);
						for (i=0; i<6; i++) {
							self.torchButtons[3][i].gotoAndPlay("blue");
						}
						break;

					case 230:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP1f);
						for (i=0; i<6; i++) {
							self.torchButtons[4][i].gotoAndPlay("blue");
						}
						break;

					case 270:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP1g);
						for (i=0; i<6; i++) {
							self.torchButtons[5][i].gotoAndPlay("blue");
						}
						break;

					case 310:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP1h);
						self.removeEventListener("tick", self.TP_01_enterFrame);
						break;
				}
			}

			this.TP_02 = function() {
				this.setButton(1);
				this.setButton(6);
				this.removeAllEventListeners("tick");
				this.resetButtons();
				this.coordinateDisappear();
				this.messageBox.setMessage(whizz.lang.TP2a);
				this.delayCounter = 0;
				this.addEventListener("tick", this.TP_02_enterFrame);
			}
			this.TP_02_enterFrame = function(e) {
				var self = e.target;
				self.delayCounter++;
				switch(self.delayCounter){
					case 50:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP2b);
						for (i=0; i<6; i++) {
							self.torchButtons[i][0].gotoAndPlay("yellow_flash");
						}
						break;

					case 110:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP2c);
						for (i=0; i<6; i++) {
							self.torchButtons[i][1].gotoAndPlay("yellow_flash");
						}
						break;

					case 150:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP2d);
						for (i=0; i<6; i++) {
							self.torchButtons[i][2].gotoAndPlay("yellow_flash");
						}
						break;
					case 190:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP2e);
						for (i=0; i<6; i++) {
							self.torchButtons[i][3].gotoAndPlay("yellow_flash");
						}
						break;

					case 230:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP2f);
						for (i=0; i<6; i++) {
							self.torchButtons[i][4].gotoAndPlay("yellow_flash");
						}
						break;

					case 270:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP2g);
						for (i=0; i<6; i++) {
							self.torchButtons[i][5].gotoAndPlay("yellow_flash");
						}
						break;
					case 310:
						self.resetButtons();
						self.messageBox.setMessage(whizz.lang.TP2h);
						self.removeEventListener("tick", self.TP_02_enterFrame);
						break;
				}
			};

			this.TP_03 = function() {
				this.setButton(1);
				this.setButton(6);
				this.removeAllEventListeners("tick");
				this.resetButtons();
				this.disableButtons();
				this.coordinateDisappear();
				this.messageBox.setMessage(whizz.lang.TP3a);

				whizz.playSound("TP2");
				this.delayCounter = 0;
				this.addEventListener("tick", this.TP_03_enterFrame);
			};

			this.TP_03_enterFrame = function(e){
				var self = e.target;
				self.delayCounter++;
				switch(self.delayCounter)
				{
					case 50:
						self.resetButtons();
						for (i=0; i<6; i++) {
							self.torchButtons[1][i].gotoAndPlay("blue1");
						}
						break;

					case 80:
						for (i=0; i<6; i++) {
							self.torchButtons[i][3].gotoAndPlay("yellow");
						}
						break;

					case 100:
						self.torchButtons[1][3].gotoAndPlay("green");
						self.coordinateAppear();
						self.messageBox.setMessage(whizz.lang.TP3b);
						break;

					case 180:
						self.messageBox.setMessage(whizz.lang.TP3c);
						break;

					case 210:
						self.messageBox.setMessage(whizz.lang.TP3d);
						self.removeEventListener("tick", self.TP_03_enterFrame);
						break;
				};
			}
			this.TP_04 = function() {
				this.setButton(1);
				this.setButton(6);
				this.removeAllEventListeners("tick");
				this.resetButtons();
				this.coordinateDisappear();
				this.messageBox.setMessage(whizz.lang.TP4);
				this.enableButtons();
			}
			this.TP_05 = function() {
				this.setButton(3);
				this.setButton(2);
				this.disableButtons();
				this.resetButtons();
				for (var i=0; i<6; i++) {
					this.torchButtons[4][i].gotoAndPlay("blue1");
				}
				for (i=0; i<6; i++) {
					this.torchButtons[i][2].gotoAndPlay("yellow");
				}
				this.torchButtons[4][2].gotoAndPlay("green");
				this.messageBox.setMessage(whizz.lang.TP5a);
				this.delayCounter = 0;
				this.addEventListener("tick", this.TP_05_enterFrame);
			}

			this.TP_05_enterFrame = function(e){
				var self = e.target;
				self.delayCounter++;
				if (self.delayCounter == 30) {
					self.messageBox.setMessage(whizz.lang.TP5b);
					self.removeEventListener("tick", self.TP_05_enterFrame);
				};
			}


			//****************** set up buttons *****************
			// set the function in this movie that is called when the OK button is pressed
			whizz.myManager.setOKCallback(this, this.doOk);
			// set the function in this movie that is called when the Left button is pressed
			whizz.myManager.setLeftCallback(this, this.doLeft);
			// set the function in this movie that is called when the Right button is pressed
			whizz.myManager.setRightCallback(this, this.doRight);
			// enable buttons to Teacher Page state
			whizz.myManager.enableButtons("tp");
			// show right arrow
			this.setButton(1);
			this.setButton(4);
			//myManager.hideLeftRight(false);
			//myManager.hideLeftRight("left");
			// *************************************************
			// functionality to allow the systemManager to skip the teacher's page
			if (whizz.myManager.skipTP) {
				// automatically skip TP
				this.skipTP();
			}
			this.skipTP = function() {
				// function to skip TP called automatically or by external button
				// ******** if necessary change or add to this function *********
				whizz.nextScene();
			}
			// record stage of movie
			this.movieStage = "tp";
			// *************************************************
			// set toolTip
			//toolTip._visible = false;
			//toolTipRollover.tabEnabled = false;
			// *************************************************

			this.messageBox = new whizz.MessageBox("messageBox");
			this.messageBox.x = 33;
			this.messageBox.y = 43;
			this.addChild(this.messageBox);

			this.init();
			//--------------------------------------------------------------
			//==========================================================================================================================
			// INITIALIZE

			//==========================================================================================================================
		}

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
		this.door.cache(-66,-46,137,114,whizz.scale);

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

		// background
		this.background = new lib.Background();
		this.background.setTransform(273.6,202.3,1,1,0,0,0,275.7,223.7);
		this.background.cache(-1,-1,556,451,whizz.scale);

		this.addChild(this.background,this.row5,this.row4,this.row3,this.row2,this.row1,this.row0,this.door,this.text_11,this.text_10,this.text_9,this.text_8,this.text_7,this.text_6,this.text_5,this.text_4,this.text_3,this.text_2,this.text_1,this.text,this.ansText);
		this.frame_0();
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-2,-21.4,666.8,447.3);



})(lib_MA_GBR_0850RAx0100 = lib_MA_GBR_0850RAx0100||{}, images = images||{}, createjs = createjs||{}, whizz = whizz||{});
var lib_MA_GBR_0850RAx0100, images, createjs, whizz;