(function (lib, img, cjs, whizz) {

	var p; // shortcut to reference prototypes

	// stage content:
	(lib.MA_GBR_0800CAx0300_TP = function() {
		this.initialize();

		// timeline function:
		this.frame_0 = function() {
			this.init = function() {
				this.TPcounter = 0;
				whizz.myManager.hideOK(true);
			};
			this.doOk = function() {
				whizz.myManager.hideOK(true);
				this.tpAnim.gotoAndPlay("TP4");
			};
			this.doRight = function() {
				whizz.stopSound();
				if (this.TPcounter == 0) {
					this.TPcounter++;
					this.tpAnim.gotoAndPlay("TP2");
					//this.tpAnim.mysound.stop();
					this.setButton(6);
				} else if (this.TPcounter == 1) {
					//this.tpAnim.mysound.stop();
					this.TPcounter++;
					this.tpAnim.gotoAndPlay("TP3");
					this.setButton(3);
				}
			};
			this.doLeft = function() {
				whizz.stopSound();
				if (this.TPcounter == 1) {
					//this.tpAnim.mysound.stop();
					this.TPcounter--;
					this.tpAnim.gotoAndPlay("duck");
					this.setButton(4);
				} else if (this.TPcounter == 2) {
					//this.tpAnim.mysound.stop();
					this.TPcounter--;
					this.tpAnim.gotoAndPlay("swan");
					this.setButton(6);
				}
			};
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
			};

			whizz.myManager.setOKCallback(this, this.doOk);
			whizz.myManager.setLeftCallback(this, this.doLeft);
			whizz.myManager.setRightCallback(this, this.doRight);
			whizz.myManager.enableButtons("tp");
			this.setButton(1);
			this.setButton(4);
			if (whizz.myManager.skipTP) {
				this.skipTP();
			}
			this.skipTP = function() {
				whizz.nextScene();
			};

			this.messageBox = new whizz.MessageBox("tpMessageBox");//new createjs.DOMElement(whizz.createMessageBox("tpMessageBox"));
			this.messageBox.x = 275;
			this.messageBox.y = 62;
			this.addChild(this.messageBox);

			//this.toolTip.visible = false;
			//this.toolTipRollover.tabEnabled = false;
			this.init();
		};

		// tpAnim
		this.tpAnim = new lib.TPAnim();
		this.tpAnim.setTransform(507.5,245,1,1,0,0,0,422.6,110.7);

		// Bg
		this.backgroundTP = new lib.BackgroundTP();
		this.backgroundTP.setTransform(254.4,184.6,1,1,0,0,0,379.2,239.6);
		this.backgroundTP.cache(-1,-1,760,483,whizz.scale);

		this.addChild(this.backgroundTP,this.tpAnim);
		this.frame_0();
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-124.8,-55,1193.2,479.3);


})(lib_MA_GBR_0800CAx0300 = lib_MA_GBR_0800CAx0300||{}, images = images||{}, createjs = createjs||{}, whizz = whizz||{});
var lib_MA_GBR_0800CAx0300, images, createjs, whizz;