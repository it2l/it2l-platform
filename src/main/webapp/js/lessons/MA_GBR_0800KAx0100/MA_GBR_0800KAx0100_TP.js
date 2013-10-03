(function (lib, img, cjs, whizz) {

	var p; // shortcut to reference prototypes

	(lib.MA_GBR_0800KAx0100_TP = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{First:0,Second:300,Third:728},true);

		// timeline functions:
		this.frame_0 = function() {
			this.positions = [
				{x:0,y:0},      {x:32.5,y:0},       {x:65,y:0},     {x:97.5,y:0},       {x:130,y:0},
				{x:0,y:26.52},  {x:32.5,y:26.52},   {x:65,y:26.52}, {x:97.5,y:26.52},   {x:130,y:26.52},
				{x:0,y:53.04},  {x:32.5,y:53.04},   {x:65,y:53.04}, {x:97.5,y:53.04},   {x:130,y:53.04}
			];

			this.rowBorders = [
				{color:0x0000FF,x1:-16.25,x2:146.25,y1:-11.25,y2:11.25},
				{color:0x0000FF,x1:-16.25,x2:146.25,y1:15.25,y2:37.75},
				{color:0x0000FF,x1:-16.25,x2:146.25,y1:41.75,y2:64.25}
			];

			this.colBorders = [
				{color:0x086608,x1:-14.25,x2:14.25,y1:-13.25,y2:66.25},
				{color:0x086608,x1:18.25,x2:46.75,y1:-13.25,y2:66.25},
				{color:0x086608,x1:50.75,x2:79.25,y1:-13.25,y2:66.25},
				{color:0x086608,x1:83.25,x2:111.75,y1:-13.25,y2:66.25},
				{color:0x086608,x1:115.75,x2:144.25,y1:-13.25,y2:66.25}
			];

			this.animateInsect = function(clipHolder) {

				var insect;
				//attach insects

				for (var i = 0; i<15; i++) {
					insect = new lib.BeeAnim();
					insect.name = "insect"+i;
					insect.scaleX = ((i%5)%2 == 0) ? -1 : 1;
					insect.x = Math.random()*350;
					insect.y = Math.random()*230;
					clipHolder.addChild(insect);
					insect.gotoAndPlay(parseInt(Math.random()*14));

					cjs.Tween.get(insect).wait(2000).to({x: this.positions[i].x, y: this.positions[i].y}, 800);
				}
			};

			this.highlightInsect = function(drawType, clipHolder) {
				this.drawType = drawType;
				this.clipHolder = clipHolder;

				this.forDraw = new cjs.Shape();
				this.clipHolder.addChild(this.forDraw);

				this.drawBorders_counter = 0;
				this.addEventListener("tick", this.drawBorders_enterFrame);
			};

			this.drawBorders_enterFrame = function(e){
				var self = e.target;
				var borderIndex = Math.floor(self.drawBorders_counter/50);
				var borderStep = self.drawBorders_counter%50;
				var roundnessRadius = 10;
				var o = self.drawType == "row" ? self.rowBorders[borderIndex] : self.colBorders[borderIndex];


				switch(borderStep){
					case 0:
						self.forDraw.graphics.setStrokeStyle(1);
						self.forDraw.graphics.beginStroke(o.color);
						self.forDraw.graphics.moveTo(o.x1+roundnessRadius, o.y1);
						self.forDraw.graphics.lineTo(o.x2-roundnessRadius, o.y1);
						break;
					case 2:
						self.forDraw.graphics.quadraticCurveTo(o.x2, o.y1, o.x2, o.y1+roundnessRadius,roundnessRadius);
						break;
					case 4:
						self.forDraw.graphics.lineTo(o.x2, o.y2-roundnessRadius);
						break;
					case 6:
						self.forDraw.graphics.quadraticCurveTo(o.x2, o.y2, o.x2-roundnessRadius, o.y2);
						break;
					case 8:
						self.forDraw.graphics.lineTo(o.x1+roundnessRadius, o.y2);
						break;
					case 10:
						self.forDraw.graphics.quadraticCurveTo(o.x1, o.y2, o.x1, o.y2-roundnessRadius);
						break;
					case 12:
						self.forDraw.graphics.lineTo(o.x1, o.y1+roundnessRadius);
						break;
					case 14:
						self.forDraw.graphics.quadraticCurveTo(o.x1, o.y1, o.x1+roundnessRadius, o.y1);
						self.setTextValues(borderIndex);
						break;
//					default:
//						break;
				}

				self.drawBorders_counter++;


			};

			this.animateInsect_fast = function(clipHolder) {
				var insect;
				for (var i = 0; i<15; i++) {
					insect = new lib["BeeAnim"]();
					clipHolder.addChild(insect);
					insect.name = "insect"+i;
					insect.scaleX = ((i%5)%2 == 0) ? -1 : 1;
					insect.x = this.positions[i].x;
					insect.y = this.positions[i].y;
					insect.gotoAndStop("stop");
				}
			};

			this.highlightInsect_fast = function(drawType, clipHolder) {
				var roundnessRadius = 10;
				var forDraw = new cjs.Shape();
				clipHolder.addChild(forDraw);

				var len = drawType == "row" ? 3 : 5;
				for (var i = 0; i<len; i++) {
					var o = drawType == "row" ? this.rowBorders[i] : this.colBorders[i];

					forDraw.graphics.setStrokeStyle(1);
					forDraw.graphics.beginStroke(o.color);
					forDraw.graphics.moveTo(o.x1+roundnessRadius, o.y1);
					forDraw.graphics.lineTo(o.x2-roundnessRadius, o.y1);
					forDraw.graphics.quadraticCurveTo(o.x2, o.y1, o.x2, o.y1+roundnessRadius,roundnessRadius);
					forDraw.graphics.lineTo(o.x2, o.y2-roundnessRadius);
					forDraw.graphics.quadraticCurveTo(o.x2, o.y2, o.x2-roundnessRadius, o.y2);
					forDraw.graphics.lineTo(o.x1+roundnessRadius, o.y2);
					forDraw.graphics.quadraticCurveTo(o.x1, o.y2, o.x1, o.y2-roundnessRadius);
					forDraw.graphics.lineTo(o.x1, o.y1+roundnessRadius);
					forDraw.graphics.quadraticCurveTo(o.x1, o.y1, o.x1+roundnessRadius, o.y1);
				}

			};

			this.clearGraphic = function(clipHolder) {
				var forDraw = clipHolder.getChildByName('forDraw');
				if(forDraw) forDraw.graphics.clear();
				clipHolder.removeAllChildren();
			};

			this.setTextValues = function(index) {
				if (this.drawType == 'row') {
					switch(index){
						case 0:
							this.messageBox4.setMessage(whizz.lang.writtenScript2TP11_text);
							break;
						case 1:
							this.messageBox4.setMessage(whizz.lang.writtenScript2TP12_text);
							break;
						case 2:
							this.messageBox4.setMessage(whizz.lang.writtenScript2TP13_text);
							this.removeEventListener("tick", this.drawBorders_enterFrame);

							break;
					}
				} else if (this.drawType == 'col') {
					switch(index){
						case 0:
							this.messageBox5.setMessage(whizz.lang.writtenScript2TP21_text);
							break;
						case 1:
							this.messageBox5.setMessage(whizz.lang.writtenScript2TP22_text);
							break;
						case 2:
							this.messageBox5.setMessage(whizz.lang.writtenScript2TP23_text);
							break;
						case 3:
							this.messageBox5.setMessage(whizz.lang.writtenScript2TP24_text);
							break;
						case 4:
							this.messageBox5.setMessage(whizz.lang.writtenScript2TP25_text);
							this.removeEventListener("tick", this.drawBorders_enterFrame);
							break;
					}
				}
			};

			this.doRight = function() {
				whizz.stopSound();
				this.clearGraphic(this.insectHolder1);
				this.animateInsect_fast(this.insectHolder1);
				this.highlightInsect_fast('row', this.insectHolder1);
				this.removeEventListener("tick", this.drawBorders_enterFrame);
				this.gotoAndPlay('Second');
			};

			this.skipTP = function() {
				whizz.nextScene();
			};

			if(!this.messageBox5){
				this.messageBox5 = new whizz.MessageBox("messageBox5");
				this.messageBox5.setTransform(312.3,205.9,1,1,0,0,0,0,8.2);
				this.addChild(this.messageBox5);
			}

			if(!this.messageBox3){
				this.messageBox3 = new whizz.MessageBox("messageBox3");
				this.messageBox3.setTransform(258.3,263.4,1,1,0,0,0,0,8.7);
				this.addChild(this.messageBox3);
			}

			if(!this.messageBox4){
				this.messageBox4 = new whizz.MessageBox("messageBox2");
				this.messageBox4.setTransform(132.3,205.9,1,1,0,0,0,0,8.2);
				this.addChild(this.messageBox4);
			}

			if(!this.messageBoxTop){
				this.messageBoxTop = new whizz.MessageBox("messageBoxTop");
				this.messageBoxTop.setTransform(266.3,54,1,1,0,0,0,0,8.2);
				this.addChild(this.messageBoxTop);
			}


			this.messageBox5.setMessage();
			this.messageBox3.setMessage();
			this.messageBox4.setMessage();
			this.messageBoxTop.setMessage();

			this.removeAllEventListeners("tick");
			this.insectHolder1.removeAllChildren();
			this.insectHolder2.removeAllChildren();

			this.clearGraphic(this.insectHolder1);
			this.clearGraphic(this.insectHolder2);

			this.animateInsect(this.insectHolder1);


			//*********** set up buttons *****************
			// set the function in this movie that is called when the OK button is pressed
			whizz.myManager.setOKCallback(this, this.doOK);
			//-----------------------------CK---------------------------
			whizz.stopSound();
			//-----------------------------CK---------------------------
			// set the function in this movie that is called when the Left button is pressed
			whizz.myManager.setLeftCallback(this, this.doLeft);
			// set the function in this movie that is called when the Right button is pressed
			whizz.myManager.setRightCallback(this, this.doRight);
			// enable buttons to Teacher Page state
			whizz.myManager.enableButtons("tp");
			// *************************************************
			whizz.myManager.hideLeftRight(false);
			whizz.myManager.hideLeftRight("left");
			console.log("start")
			whizz.myManager.hideOK(true);

			// functionality to allow the systemManager to skip the teacher's page
			if (whizz.myManager.skipTP) {
				// automatically skip TP
				this.skipTP();
			}

			// record stage of movie
			this.movieStage = "tp";
			// *************************************************
			// set toolTip
			//toolTip._visible = false;
			//toolTipRollover.tabEnabled = false;
			//toolTip.tip = toolTip_text;
			// *************************************************
		};

		this.frame_38 = function() {
			this.messageBoxTop.setMessage(whizz.lang.writtenScript1TP_text);
		};

		this.frame_95 = function() {
			this.highlightInsect('row', this.insectHolder1);
		};

		this.frame_299 = function() {
			this.messageBox3.setMessage(whizz.lang.writtenScript2TP14_text);
			this.doLeft = function(){
				this.clearGraphic(this.insectHolder1);
				this.clearGraphic(this.insectHolder2);
				this.gotoAndPlay('First');
			};
			whizz.myManager.hideLeftRight(false);
			whizz.myManager.setLeftCallback(this, this.doLeft);

			this.stop();
		};

		this.frame_300 = function() {
			this.animateInsect(this.insectHolder2);

			this.messageBox3.setMessage();
			this.messageBox5.setMessage();


			this.messageBoxTop.setMessage(whizz.lang.writtenScript2TP_text);
			this.messageBox4.setMessage(whizz.lang.writtenScript2TP13_text);

			//delete empty_mc.onEnterFrame;
			//---------------------------CK-----------------------------
			whizz.playSound("TP1");
			this.doLeft = function(){
				whizz.stopSound();
				this.clearGraphic(this.insectHolder1);
				this.clearGraphic(this.insectHolder2);
				this.gotoAndPlay('First');
			};
			this.doRight = function() {
				whizz.stopSound();
				this.clearGraphic(this.insectHolder2);
				this.animateInsect_fast(this.insectHolder2);
				this.highlightInsect_fast('col', this.insectHolder2);
				this.removeEventListener("tick", this.drawBorders_enterFrame);
				this.gotoAndPlay('Third');
			};
			//---------------------------CK-----------------------------
			whizz.myManager.hideLeftRight(false);
			whizz.myManager.hideOK(true);
			whizz.myManager.setLeftCallback(this, this.doLeft);
			whizz.myManager.setRightCallback(this, this.doRight);
			console.log("2")
		};

		this.frame_378 = function() {
			this.highlightInsect('col', this.insectHolder2);
		};

		this.frame_727 = function() {
			console.log("stop")
			this.stop();
		};

		this.frame_728 = function() {
			console.log("3")
			this.playTP23_enterFrame = function(e){
				var self = e.target;
				self.playTP23_counter++;
				if (self.playTP23_counter == 1) {
					whizz.playSound("TP2");
				} else if (self.playTP23_counter == 50) {
					self.removeEventListener("tick", self.playTP23_enterFrame);
					whizz.playSound("TP3");
				}
			};

			this.doLeft = function() {
				//----------------------------------CK--------------------------------
				whizz.stopSound();
				//----------------------------------CK--------------------------------
				this.clearGraphic(this.insectHolder2);
				this.gotoAndPlay('Second');
			};

			this.doOK = function() {
				//----------------------------------CK--------------------------------
				whizz.stopSound();
				//----------------------------------CK--------------------------------
				this.clearGraphic(this.insectHolder1);
				this.clearGraphic(this.insectHolder2);
				this.messageBoxTop.setMessage();
				this.messageBox4.setMessage();
				this.messageBox3.setMessage();
				this.messageBox5.setMessage();
				this.skipTP();

				this.removeEventListener("tick", this.playTP23_enterFrame);
			};

			this.stop();
			this.messageBoxTop.setMessage();
			this.messageBox3.setMessage(whizz.lang.writtenScript2TP3_text);
			this.playTP23_counter = 0;
			this.addEventListener("tick", this.playTP23_enterFrame);

			this.messageBox5.setMessage(whizz.lang.writtenScript2TP25_text);
			whizz.myManager.hideLeftRight("right");
			whizz.myManager.hideOK(false);
			whizz.myManager.setLeftCallback(this, this.doLeft);
			whizz.myManager.setOKCallback(this, this.doOK);
		};

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(38).call(this.frame_38).wait(57).call(this.frame_95).wait(204).call(this.frame_299).wait(1).call(this.frame_300).wait(78).call(this.frame_378).wait(349).call(this.frame_727).wait(1).call(this.frame_728));

		this.insectHolder1 = new cjs.Container();
		this.insectHolder1.setTransform(72.5, 106.5);

		this.insectHolder2 = new cjs.Container();
		this.insectHolder2.setTransform(244.5, 106.5);

		this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.insectHolder1},{t:this.insectHolder2}]}).wait(729));

		// Background
		this.instance = new lib.Background();
		this.instance.setTransform(321.7,226,1,1,0,0,0,321.7,226);
		this.instance.cache(-1,-1,648,456,whizz.scale);

		this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(729));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(0,0,644,451.9);


})(lib_MA_GBR_0800KAx0100 = lib_MA_GBR_0800KAx0100||{}, images = images||{}, createjs = createjs||{}, whizz = whizz||{});
var lib_MA_GBR_0800KAx0100, images, createjs, whizz;