/**
 * Author: Grzegorz Michlicki
 */

(function(whizz, createjs){

	var p;

	whizz.createEl = function(tag, parent, id, content){
		var domEl = document.createElement(tag);
		if(id !== undefined && id !== "") domEl.id = id;
		if(content !== undefined) domEl.innerHTML = content;
		parent.appendChild(domEl);
		return domEl;
	};

	whizz.playSound = function(name, loop){
		if(window.a) window.a.playSound(name, loop);
		else createjs.Sound.play(name);
	};

	whizz.stopSound = function(name){
		if(window.a) window.a.stopSound(name);
		else createjs.Sound.stop(name);
	};



	/**
	 * Keyboard
	 */
	var Keyboard = function(document) {
		this.initialize(document);
	};
	Keyboard.keys = [];
	Keyboard.onkeydown = function(e){
		if (Keyboard.keys.indexOf(e.keyCode)<0) Keyboard.keys.push(e.keyCode);
	};
	Keyboard.onkeyup = function(e){
		var s = Keyboard.keys.indexOf(e.keyCode);
		Keyboard.keys.splice(s,1);
	};
	p = Keyboard.prototype;
	p.initialize = function(document){
		document.onkeydown = Keyboard.onkeydown;
		document.onkeyup = Keyboard.onkeyup;
	};
	whizz.Keyboard = Keyboard;

	/**
	 * NumericInput
	 */
	var NumericInput = function(id){
		this.initialize(id);
	};

	p = NumericInput.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.input = null;
	p.initialize = function(id){
		this.Container_initialize();
		this.input = document.createElement("input");
		this.input.id = id;
		this.input.type = "number";
		this.input.className = "numericInput";
		this.input.onkeypress = function(evt){
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

			/*if(this.value.length > 1) {
				this.value = this.value.substr(0, 1);
			} */
		};

		whizz.appRoot.appendChild(this.input);
		this.addChild(new createjs.DOMElement(this.input));
	};

	p.setValue = function(value){
		this.input.value = value ? parseInt(value) : "";
	};

	p.getValue = function(){
		return this.input.value.length > 0 ? parseInt(this.input.value) : null;
	};

	p.setEnabled = function(value){
		this.input.disabled = value ? "" : "disabled";
	};

	p.focus = function(){
		console.log("focus");
		this.input.focus();
	};

	p.blur = function(){
		this.input.blur();
		document.activeElement.blur();
	};
	whizz.NumericInput = NumericInput;


	/**
	 * MessageBox
	 */
	var MessageBox = function(id){
		this.initialize(id);
	};
	p = MessageBox.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.box = null;
	p.initialize = function(id){
		//super();
		this.Container_initialize();
		var el = document.getElementById(id);
		if (!el){
			el = document.createElement("div");
			el.id = id;
			el.className = "messageBox";
			el.innerHTML = "<div></div>";
			whizz.appRoot.appendChild(el);
		}

		this.box = new createjs.DOMElement(el);
		this.addChild(this.box);
	};
	p.setMessage = function(message){
		this.box.htmlElement.innerHTML = "<div>"+(message||"")+"</div>";
		this.box.htmlElement.style.display = !!message ? "block" : "none";
	};

	whizz.MessageBox = MessageBox;

	/**
	 * SimpleButton
	 */

	var SimpleButton = function(normalState,overState,downState) {
		console.log("SimpleButton");
		this.initialize(normalState,overState,downState);
	};
	p = SimpleButton.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p._isDown = false;
	p._isOver = false;
	p.normalState = null;
	p.overState = null;
	p.downState = null;
	p.initialize = function(normalState,overState,downState) {
		this.normalState = normalState;
		this.overState = overState;
		this.downState = downState;
		// super();
		this.Container_initialize();
		this.addChild(this.downState,this.overState,this.normalState);
		console.log("init button");
		this.addEventListener("mouseover", function(evt){
			console.log("over");
			var o = evt.target;
			o._isOver = true;
			if (o._isDown) o.setDown();
			else o.setOver();
		});
		this.addEventListener("mouseout", function(evt){
			var o = evt.target;
			o._isOver = false;
			if(o._isDown) o.setDown();
			else o.setNormal();
		});
		this.addEventListener("mousedown", function(evt){
			console.log("down");
			var o = evt.target;
			console.log(evt.target);
			o._isDown = true;
			o.setDown();
			evt.addEventListener("mouseup", function(ev){
				var o = ev.target;
				o._isDown = false;
				if (o._isOver) o.setOver();
				else o.setNormal();
			});
		});

	};
	p.setNormal = function(){
		this.normalState.visible = true;
		this.overState.visible = false;
		this.downState.visible = false;
	};
	p.setOver = function(){
		this.normalState.visible = false;
		this.overState.visible = true;
		this.downState.visible = false;
	};
	p.setDown = function(){
		this.normalState.visible = false;
		this.overState.visible = false;
		this.downState.visible = true;
	};
	whizz.SimpleButton = SimpleButton;




	var ButtonHelper = function(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
		this.initialize(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel);
	};
	p = ButtonHelper.prototype;
	p.target = null;
	p.overLabel = null;
	p.outLabel = null;
	p.downLabel = null;
	p.play = false;
	p._isPressed = false;
	p._isOver = false;

	p.initialize = function(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
		if (!target.addEventListener) { return; }
		this.target = target;
		target.cursor = "pointer";
		this.overLabel = overLabel == null ? "over" : overLabel;
		this.outLabel = outLabel == null ? "out" : outLabel;
		this.downLabel = downLabel == null ? "down" : downLabel;
		this.play = play;
		this.setEnabled(true);
		this.handleEvent({});
		if (hitArea) {
			if (hitLabel) {
				hitArea.actionsEnabled = false;
				hitArea.gotoAndStop&&hitArea.gotoAndStop(hitLabel);
			}
			target.hitArea = hitArea;
		}
	};

	p.setEnabled = function(value) {
		var o = this.target;
		if (value) {
			o.addEventListener("mouseover", this);
			o.addEventListener("mouseout", this);
			o.addEventListener("mousedown", this);
			o.addEventListener("mouseup", this);
		} else {
			o.removeEventListener("mouseover", this);
			o.removeEventListener("mouseout", this);
			o.removeEventListener("mousedown", this);
			o.removeEventListener("mouseup", this);
		}
	};

	p.toString = function() {
		return "[ButtonHelper]";
	};

	p.handleEvent = function(evt) {
		var label;

		if (evt.type == "mouseover") {
			this._isOver = true;
			label = this._isPressed ? this.downLabel : this.overLabel;
			evt.addEventListener("mouseout", this);

		} else if (evt.type == "mouseout") {
			this._isOver = false;
			label = this._isPressed ? this.downLabel : this.outLabel;

		} else if (evt.type == "mousedown") {
			this._isPressed = true;
			label = this.downLabel;
			evt.addEventListener("mouseup", this);

		} else if (evt.type == "mouseup") {
			this._isPressed = false;
			label = this._isOver ? this.overLabel : this.outLabel;
		}

		var t = this.target;
		if (this.play) {
			t.gotoAndPlay&&t.gotoAndPlay(label);
		} else {
			t.gotoAndStop&&t.gotoAndStop(label);
		}
	};

	whizz.ButtonHelper = ButtonHelper;


	/**
	 * OkButton
	 */


		/*
	var OkButton = function(){

		this.initialize(new OkButtonNormalState(), new OkButtonOverState(), new OkButtonDownState());
		this.downState.setTransform(1.55, 1.35);
	};
	                                         // TODO: export z fla + buttonhelper;
	p = OkButton.prototype = new SimpleButton();
	p.nominalBounds = new createjs.Rectangle(-30.8, -13.2, 62.8, 28);


	whizz.OkButton = OkButton;

	(OkButtonNormalState = function(){
		this.initialize();
		this.shape = new createjs.Shape();
		this.shape.graphics.f("#ffffff").p("AEzAAQAAgfgggaQgVgSglgQQhagmh/AAQh+AAhaAmQgCABgCABQgGADgGACQhJAkgBAwQAAAAAAABQACAwBIAjQAGADAGADQACAAACABQBaAmB+AAQB/AABagmQAlgPAVgSQAfgaABgfQAAgBAAAA").f();
		this.shape.setTransform(-0.1, -0.2);
		this.outline = new OkButton_Outline();
		this.outline.setTransform(-0.2, -0.2);
		this.tintBall = new OkButton_TintBall();
		this.tintBall.setTransform(0.2, 0, 0.36, 0.146);
		this.reflex = new OkButton_Reflex();
		this.reflex.setTransform(0, 2, 1.016, 1.016);
		this.reflex.alpha = 0.4;
		this.shadow = new OkButton_Shadow();
		this.shadow.setTransform(1.3, 1.8, 0.262, 0.262);
		this.shadow.alpha = 0.28;
		this.addChild(this.shadow, this.shape, this.tintBall, this.reflex, this.outline);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-30.8, -13.2, 62.8, 28);

	(OkButtonOverState = function(){
		this.initialize();
		this.shape = new createjs.Shape();
		this.shape.graphics.rf(["#00ffff", "#0000ff"], [0, 1], -13.1, -4.7, 0, -13.1, -4.7, 44.3).p("ADZhbQhagmh/AAQh+AAhaAmQgCABgCABQgGADgGACQhJAkgBAwQAAAAAAABQACAwBIAjQAGADAGADQACAAACABQBaAmB+AAQB/AABagmQAlgPAVgSQAfgaABgfQAAgBAAAAQAAgfgggaQgVgSglgQ").f();
		this.shape.setTransform(-0.1, -0.2);
		this.outline = new OkButton_Outline();
		this.outline.setTransform(-0.2, -0.2);
		this.tintBall = new OkButton_TintBall();
		this.tintBall.setTransform(0.2, 0, 0.36, 0.146);
		this.reflex = new OkButton_Reflex();
		this.reflex.setTransform(0, 2, 1.016, 1.016);
		this.reflex.alpha = 0.4;
		this.shadow = new OkButton_Shadow();
		this.shadow.setTransform(1.3, 1.8, 0.262, 0.262);
		this.shadow.alpha = 0.28;
		this.addChild(this.shadow, this.shape, this.tintBall, this.reflex, this.outline);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-30.8, -13.2, 62.8, 28);

	(OkButtonDownState = function(){
		this.initialize();
		this.shape = new createjs.Shape();
		this.shape.graphics.rf(["#ffff00", "#00ff00"], [0, 1], -12.5, -4.5, 0, -12.5, -4.5, 42).p("AEGg2QgVgRgjgPQhVgkh5AAQh4AAhVAkQgCABgCABQgFACgGADQhGAiAAAtQAAABAAAAQABAuBFAhQAGADAFACQACABACABQBVAkB4AAQB5AABVgkQAjgPAVgRQAdgYABgeQAAAAAAgBQgBgdgdgZ").f();
		this.shape.setTransform(-0.1, -0.2);
		this.outline = new OkButton_Outline2();
		this.outline.setTransform(-0.2, -0.1);
		this.tintBall = new OkButton_TintBall();
		this.tintBall.setTransform(0.2, 0, 0.342, 0.139);
		this.reflex = new OkButton_Reflex();
		this.reflex.setTransform(-0.1, 1.85, 0.965, 0.965);
		this.reflex.alpha = 0.4;
		this.addChild(this.shape, this.tintBall, this.reflex, this.outline);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-29.4, -12.55, 58.35, 24.70);

	(OkButton_TintBall = function(){
		this.initialize();
		this.shape = new createjs.Shape();
		this.shape.graphics.f("#ffffff").p("ADViXQgRgoggAIQiEAuhpBrQhiBhgvB2QAdglAjgiQCPiODHg4QAqgbgRgo").f();
		this.shape.setTransform(-47.5, -57.4);
		this.shine = new OkButton_Shine();
		this.shine.setTransform(-1.2, -1.3);
		this.shine.alpha = 0.68;
		this.addChild(this.shine, this.shape);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-86.4, -89, 170.4, 175.3);

	(OkButton_Reflex = function(){
		this.initialize();
		this.shape_1 = new createjs.Shape();
		this.shape_1.graphics.f("#ffffff").p("AgygKQgkgOgUgSQAOAhBAAXQAoAPAwAIQAXAEAYACIAAgYQgYgBgXgDQg9gHgxgS").f();
		this.shape_1.setTransform(-17, 4.3);
		this.shape_2 = new createjs.Shape();
		this.shape_2.graphics.f("#ffffff").p("ADpgpQAAAqhOAfQhOAehtAAQgQAAgPAAIAAAXQAeADAgAAQBzAABSgfQBSgfAAgrQAAgohHgeQAaAVAAAZ").f();
		this.addChild(this.shape_2, this.shape_1);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-27.6, -8.6, 55.5, 17.5);

	(OkButton_Outline = function(){
		this.initialize();
		this.graphics.f().s("#999999").ss(1, 1, 1, 3).p("ADZhbQAkAQAWASQAfAaAAAfQAAAAAAABQAAAfgfAZQgWATglAPQhZAmh/AAQh+AAhagmQgJgDgIgEQhIgjgBgwQAAgBAAAAQAAgwBJgkQAIgDAJgEQBagmB+AAQB/AABZAm").cp();
	}).prototype = p = new createjs.Shape();
	p.nominalBounds = new createjs.Rectangle(-30.9, -13.2, 61.3, 25.9);

	(OkButton_Outline2 = function(){
		this.initialize();
		this.graphics.rf(["#ffff00", "#00ff00"], [0, 0.651], 0, 0.1, 0, 0, 0.1, 29.3).p("ADOBWQhVAkh5ABQh4gBhVgkQgCAAgBgBQgHgDgGgCIAAAAQhEgigCgtQABAuBFAhIAAAAQAGAEAHACQABABACABQBVAkB4AAQB5AABVgkQAjgPAVgRQAdgZAAgeQAAAdgdAZQgVARgjAO").f();
	}).prototype = p = new createjs.Shape();

	(OkButton_Shine = function(){
		this.initialize();
		this.graphics.rf(["rgba(43,64,64,0.141)", "#99ffff"], [0, 1], -31.3, -48.4, 0, -31.3, -48.4, 141.9).p("AJZptQj4j+lhgBQlfABj7D+Qj4EDgBFqQABFqD4D/QD7EDFfAAQFhAAD4kDQD7j/gBlqQABlqj7kD").f();
	}).prototype = p = new createjs.Shape();
	p.nominalBounds = new createjs.Rectangle(-85.1, -87.6, 170.4, 175.3);

	(OkButton_Shadow = function(){
		this.initialize();
		this.graphics.f("#000000").p("AQbjbQhThFiMg7QlXiRnkAAQnkAAlWCRQghANgdAOQkZCIAAC5QAAACAAADQAEC2EVCGQAdAOAhAOQFWCQHkAAQHkAAFXiQQCMg7BThFQB1hiADh2QAAgDAAgCQgBh4h3hk").f();
	}).prototype = p = new createjs.Shape();
	p.nominalBounds = new createjs.Rectangle(-116.9, -49.3, 234, 98.7);

     */

	/**
	 * Arrow Button
	 */
	/*
	(whizz.ArrowButton = function(){
		console.log("new ArrowButton()")
		this.initialize(new ArrowButtonNormalState(), new ArrowButtonOverState(), new ArrowButtonDownState());
	}).prototype = p = new whizz.SimpleButton();
	p.nominalBounds = new createjs.Rectangle(-14, -11.1, 27.4, 29.6);

	(whizz.ArrowButton2 = function(){
		this.initialize(new ArrowButtonNormalState(), new ArrowButtonOverState(), new ArrowButtonDownState());
	}).prototype = p = new whizz.SimpleButton();
	p.nominalBounds = new createjs.Rectangle(-14, -11.1, 27.4, 29.6);

	(ArrowButtonNormalState = function(){
		this.initialize();
		this.reflex_1 = new ArrowButton_Reflex1();
		this.reflex_1.setTransform(-0.4, -4.4, 0.262, 0.262, 180);
		this.reflex_1.alpha = 0.4;
		this.reflex_2 = new ArrowButton_Reflex2();
		this.reflex_2.setTransform(4.8, 6.4);
		this.tint = new ArrowButton_Tint();
		this.tint.setTransform(-0.5, 2, 0.262, 0.262, 180);
		this.tint.alpha = 0.66;
		this.shadow = new ArrowButton_Shadow();
		this.shadow.setTransform(0, 5.8, 0.262, 0.262, 180);
		this.shadow.alpha = 0.28;
		this.outline = new createjs.Shape();
		this.outline.graphics.f().s("#999999").ss(1, 1, 1, 3).p("AhkhdQgMgHgNgHQgDgCgCgDQgCgCAAgFQAAgFACgCQAEgEAGABQAGAAAGABQALABATAEQBHAPAxAYQBbAsAAAjQAAAuhbAsQgvAYhFAOQgUAFgXADQgIAAgDgEQgCgCgCgFQAAgGAHgFQABgBABgBQACAAABgBQBVgsACg9QgCg0hBgq").cp();
		this.outline.setTransform(-0.7, 1.9);
		this.shape = new createjs.Shape();
		this.shape.graphics.f("#ffffff").p("AiDh/QgBAEgBAEQABAEABADQADADADACQANAHALAHQCLBhihBoQgBAAgBABQgHAFgBAGQADAEABADQADAAADAAQAZgBAYgDQBEgOAwgXQBbgtAAgtQAAgkhbgsQgxgYhIgPQgZgCgbgC").f();
		this.shape.setTransform(-0.6, 2.1);
		this.addChild(this.shadow, this.shape, this.tint, this.outline, this.reflex_1, this.reflex_2);
	}).prototype = p = new createjs.Container();

	(ArrowButtonOverState = function(){
		this.initialize();
		this.reflex_1 = new ArrowButton_Reflex1();
		this.reflex_1.setTransform(-0.4, -4.4, 0.262, 0.262, 180);
		this.reflex_1.alpha = 0.4;
		this.reflex_2 = new ArrowButton_Reflex2();
		this.reflex_2.setTransform(4.8, 6.4);
		this.shadow = new ArrowButton_Shadow();
		this.shadow.setTransform(0, 5.8, 0.262, 0.262, 180);
		this.shadow.alpha = 0.28;
		this.outline = new createjs.Shape();
		this.outline.graphics.f().s("#999999").ss(1, 1, 1, 3).p("AhkhdQgMgHgNgHQgDgCgCgDQgCgCAAgFQAAgFACgCQAEgEAGABQAGAAAGABQALABATAEQBHAPAxAYQBbAsAAAjQAAAuhbAsQgvAYhFAOQgUAFgXADQgIAAgDgEQgCgCgCgFQAAgGAHgFQABgBABgBQACAAABgBQBVgsACg9QgCg0hBgq").cp();
		this.outline.setTransform(-0.7, 1.9);
		this.shape = new createjs.Shape();
		this.shape.graphics.rf(["#00ffff", "#0000ff"], [0, 1], 5.8, 5.4, 0, 5.8, 5.4, 26.5).p("AiDh/QgBAEgBAEQABAEABADQADADADACQANAHALAHQCLBhihBoQgBAAgBABQgHAFgBAGQADAEABADQADAAADAAQAZgBAYgDQBEgOAwgXQBbgtAAgtQAAgkhbgsQgxgYhIgPQgZgCgbgC").f();
		this.shape.setTransform(-0.6, 2.1);
		this.addChild(this.shadow, this.shape, this.outline, this.reflex_1, this.reflex_2)
	}).prototype = p = new createjs.Container();

	(ArrowButtonDownState = function(){
		this.initialize();
		this.reflex_1 = new ArrowButton_Reflex1();
		this.reflex_1.setTransform(-0.4, -4.4, 0.262, 0.262, 180);
		this.reflex_1.alpha = 0.4;
		this.reflex_2 = new ArrowButton_Reflex2();
		this.reflex_2.setTransform(4.8, 6.4);
		this.outline = new createjs.Shape();
		this.outline.graphics.f().s("#009900").ss(1, 1, 1, 3).p("AB/gEQAAArhXAqQgtAXhBANQgTAEgWADQgIAAgDgDQgCgCgCgEQABgGAHgGQABAAABgBQABAAACgBQBQgrACg5QgCgyg+gnQgLgHgMgHQgEgBgBgDQgCgDgBgEQABgEACgCQAEgEAFAAQAGABAGAAQAKACASADQBEAOAuAXQBXAqAAAi").cp();
		this.outline.setTransform(-0.7, 1.9);
		this.shape = new createjs.Shape();
		this.shape.graphics.rf(["#ffff00", "#00ff00"], [0, 1], 6.6, 4.4, 0, 6.6, 4.4, 25.5).p("Ah8h4QgCADAAAEQABAEABADQACADADABQANAHAKAHQCEBbiZBjQAAABgCAAQgHAFAAAGQACAEACADQADAAACAAQAZgCAWgDQBBgNAtgWQBXgqAAgrQAAgihXgqQgugXhEgOQgYgCgagB").f();
		this.shape.setTransform(-0.6, 2.1);
		this.addChild(this.shape, this.outline, this.reflex_1, this.reflex_2);
	}).prototype = p = new createjs.Container();

	(ArrowButton_Reflex1 = function(){
		this.initialize();
		this.graphics.f("#ffffff").p("AmfiuQB3CXFXBtQCrA4DGAiQiVg1hbhhQhgAbjNhHQjNhJhVhT").f();
	}).prototype = p = new createjs.Shape();
	p.nominalBounds = new createjs.Rectangle(-41.5, -17.4, 83.2, 35.1);

	(ArrowButton_Reflex2 = function(){
		this.initialize();
		this.graphics.f("#ffffff").p("AAtgZQgoAeg7AVQgMAHAHAFQAGAEAJgDQAogQAcgWQAcgTALgVQgIAIgKAG").f();
		this.setTransform(4.8, 6.4);
	}).prototype = p = new createjs.Shape();
	p.nominalBounds = new createjs.Rectangle(-41.5, -17.4, 83.2, 35.1);

	(ArrowButton_Tint = function(){
		this.initialize();
		this.graphics.rf(["rgba(43,64,64,0.141)", "#99ffff"], [0, 1], 18.1, -26.9, 0, 18.1, -26.9, 195.5).p("AHZnkQhhAFhbAKQkFA3i2BZQldCpAACvQAACHFdCpQC9BdEQA2QBgALBnAEQAGgKAAgTQAAgPgHgNQgHgJgNgIQgzgagrgcQoTlyJomMQAEgCADgDQAdgVAAgXQgHgQgIgLQgKABgKAA").f();
	}).prototype = p = new createjs.Shape();
	p.nominalBounds = new createjs.Rectangle(47.8, -48.8, 101.7, 97);

	(ArrowButton_Shadow = function(){
		this.initialize();
		this.graphics.f("#000000").p("AHfmhQAdgUAAgYQgHgPgIgLQgLABgKAAQhhAEhbALQkEA2i3BZQldCqAACvQAACHFdCpQC9BcEQA3QBsAZBQgGQAUgFgBgWQgBgWgIgMQgHgKgNgHQgzgbgrgbQoTlyJomNQAEgCAEgD").f();
		this.setTransform(0.1, 0.3);
	}).prototype = p = new createjs.Shape();
	p.nominalBounds = new createjs.Rectangle(-50.8, -48.4, 101.8, 97.6);

           */

	/**
	 * MENU
	 */
	(whizz.Menu = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{show:10},true);

		// timeline functions:
		this.frame_0 = function() {
			this.handleShowClick = function(e){
				this.gotoAndPlay("show");
			}
			this.handleHideClick = function(e){
				this.gotoAndPlay(0);
			}

			this.logo.removeAllEventListeners("click");
			this.logo.addEventListener("click", this.handleShowClick.bind(this));


			this.handleNextClick = function(e){
				whizz.nextLesson();
			}
			this.handleCloseClick = function(e){
				whizz.closeLesson();
			}

			new whizz.ButtonHelper(this.buttonClose);
			new whizz.ButtonHelper(this.buttonNext);
			this.buttonNext.addEventListener("click", this.handleNextClick.bind(this));
			this.buttonClose.addEventListener("click", this.handleCloseClick.bind(this));
		}
		this.frame_9 = function() {
			this.stop();
		}
		this.frame_14 = function() {
			this.logo.removeAllEventListeners("click");
			this.logo.addEventListener("click", this.handleHideClick.bind(this));
		}
		this.frame_22 = function() {
			this.stop();
		}

		// actions tween:
		this.timeline.addTween(createjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(5).call(this.frame_14).wait(8).call(this.frame_22));

		// Layer 36
		this.text = new createjs.Text(whizz.UIlang.next, "bold 8px Arial");
		this.text.textAlign = "center";
		this.text.lineHeight = 8;
		this.text.lineWidth = 36;
		this.text.setTransform(-7,-72);

		this.timeline.addTween(createjs.Tween.get({}).to({state:[]}).to({state:[{t:this.text}]},14).wait(9));

		// Layer 34
		this.text_1 = new createjs.Text(whizz.UIlang.close, "bold 8px Arial");
		this.text_1.lineHeight = 8;
		this.text_1.lineWidth = 23;
		this.text_1.setTransform(-18,-47.5);

		this.timeline.addTween(createjs.Tween.get({}).to({state:[]}).to({state:[{t:this.text_1}]},14).wait(9));

		// Layer 15
		this.buttonNext = new MenuButtonNext();
		this.buttonNext.setTransform(-6.8,-68.2);
		this.buttonNext._off = true;

		this.timeline.addTween(createjs.Tween.get(this.buttonNext).wait(12).to({_off:false},0).wait(11));

		// Layer 13
		this.buttonClose = new MenuButtonClose();
		this.buttonClose.setTransform(-6.8,-43);
		this.buttonClose._off = true;

		this.timeline.addTween(createjs.Tween.get(this.buttonClose).wait(11).to({_off:false},0).wait(12));

		// Layer 12
		this.instance_6 = new MenuButtonUp("synched",0);
		this.instance_6.setTransform(-6.8,-17.4);
		this.instance_6._off = true;

		this.timeline.addTween(createjs.Tween.get(this.instance_6).wait(6).to({startPosition:0,_off:false},0).wait(17));

		// Layer 11
		this.instance_7 = new shape7("synched",0);
		this.instance_7._off = true;

		this.timeline.addTween(createjs.Tween.get(this.instance_7).wait(4).to({startPosition:0,_off:false},0).wait(19));

		// Layer 10
		this.instance_8 = new shape6("synched",0);
		this.instance_8._off = true;

		this.timeline.addTween(createjs.Tween.get(this.instance_8).wait(2).to({startPosition:0,_off:false},0).wait(21));

		// Layer 9
		this.logo = new shape5();

		this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.logo}]}).wait(23));

		// Layer 1
		this.instance_9 = new shape1("synched",0);
		this.instance_9.setTransform(3.6,4.4,0.092,2.237);
		this.instance_9.alpha = 0.281;

		this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.instance_9}]}).wait(23));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(-22,-25.1,49,57.4);

	(shape7 = function() {
		this.initialize();

		// Layer 1
		this.shape = new createjs.Shape();
		this.shape.graphics.f("#FFFFFF").s("#FFFFFF").ss(2.1,1,1).p("AAAgfQAaAAATAKQATAJAAAMQAAANgTAJQgTAKgaAAQgZAAgTgKQgTgJAAgNQAAgMATgJQATgKAZAAIAAAA").cp();
		this.shape.setTransform(-0.6,0);

		this.addChild(this.shape);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-7.1,-3.1,12.9,6.5);


	(shape6 = function() {
		this.initialize();

		// Layer 1
		this.shape_1 = new createjs.Shape();
		this.shape_1.graphics.f("#FFFFFF").s("#000000").ss(1.4,1,1).p("AgPgMQAGgGAJABQAJgBAHAGQAHAGAAAGQAAAHgHAGQgHAFgJAAQgJAAgGgFQgHgGAAgHQAAgGAHgGIAAAA").cp();
		this.shape_1.setTransform(4,15.1);

		this.addChild(this.shape_1);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(1.6,13.3,4.8,3.8);


	(shape5 = function() {
		this.initialize();

		// Layer 7
		this.shape_2 = new createjs.Shape();
		this.shape_2.graphics.f("#FFFFFF").s().p("AAhgsIAAAPIgpA3IApAAQADAAAAACQAAABAAACIgFANQgBACgCAAIg+AAQgBAAAAgBIAAgPIApg3IgkAAQgCAAAAgDIAAgOQAAgDADAAIA7AAQADAAAAABIAAAA").cp();
		this.shape_2.setTransform(19.7,24.8);

		// Layer 8
		this.shape_3 = new createjs.Shape();
		this.shape_3.graphics.f("#FFFFFF").s().p("AAggdIgpA3IAqAAQADAAAAACQAAABAAACIgGANQAAACgDAAIg9AAQgCAAAAgBIAAgPIAqg3IglAAQgBAAAAgDIAAgOQAAgDADAAIA6AAQADAAAAABIAAAP").cp();
		this.shape_3.setTransform(11.7,24.8);

		// Layer 9
		this.shape_4 = new createjs.Shape();
		this.shape_4.graphics.f("#FFFFFF").s().p("AAUgqIAABVQAAADgCAAIgSAAQgCAAAAgDIAAhGIgOAAQgDAAAAgDIAAgMQAAgDADAAIAiAAQACAAAAADIAAAA").cp();
		this.shape_4.setTransform(3.9,24.8);

		// Layer 10
		this.shape_5 = new createjs.Shape();
		this.shape_5.graphics.f("#FFFFFF").s().p("AAlBBQAAADgDAAIgTAAQgDAAAAgDIAAg6QAAgOgKAAQgFAAgJAHIAABBQAAADgDAAIgTAAQgCAAAAgDIAAh9QAAgDADAAIAQgEQABAAABAAIABAAQABAAAAABIABADIAAAvQAMgLAMAAQAZAAAAAcIAABA").cp();
		this.shape_5.setTransform(-3.5,22.6);

		// Layer 11
		this.shape_6 = new createjs.Shape();
		this.shape_6.graphics.f("#FFFFFF").s().p("AgjgsIAIAqQACAIACAWQABgNADgPIAJgqQAAgCABgBQABAAABAAIAPAAQACAAABAAQABABAAACIAIAqQAEAQAAAMIAAAAIAOhIQAAgDACAAIACAAQABAAAAAAIANACQAEAAAAABIgbBaQgBACgDAAIgOAAQgDAAgBgDIgJguQgCgJAAgMQAAAJgCAMIgMAuQgBADgCAAIgPAAQgDAAgBgCIgXhaQAAgBAEAAIAOgCQABAAABAAIABAAQACAAABADIAAAA").cp();
		this.shape_6.setTransform(-14.8,24.8);

		// Layer 12
		this.shape_7 = new createjs.Shape();
		this.shape_7.graphics.f("#000000").s().p("ADmkRIAAIjInLAAIAAojIHLAA").cp();
		this.shape_7.setTransform(1,2.2);

		this.addChild(this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-22,-25.1,46.1,54.9);


	(shape1 = function() {
		this.initialize();

		// Layer 1
		this.shape_8 = new createjs.Shape();
		this.shape_8.graphics.f("#000000").s().p("EAnpgB6IAAD1MhPRAAAIAAj1MBPRAAA").cp();

		this.addChild(this.shape_8);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-253.6,-12.3,507.4,24.8);


	(MenuButtonUp = function() {
		this.initialize();

		// Layer 1
		this.shape_9 = new createjs.Shape();
		this.shape_9.graphics.f("#FFFFFF").s("#000000").ss(1.3,1,1).p("ADSgjQARARAAASQAAATgRASQgSAQgfAOQhDAbheAAQhdAAhCgbQgggOgRgQQgSgSAAgTQAAgSASgRQARgRAggOQBCgbBdAAQBeAABDAbQAfAOASARIAAAA").cp();

		this.addChild(this.shape_9);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-22.7,-9.4,45.5,19);


	(MenuButtonOver = function() {
		this.initialize();

		// Layer 1
		this.shape_10 = new createjs.Shape();
		this.shape_10.graphics.f().s("#006600").ss(1.3,1,1).p("ADSgjQARARAAASQAAATgRASQgSAQgfAOQhDAbheAAQhdAAhCgbQgggOgRgQQgSgSAAgTQAAgSASgRQARgRAggOQBCgbBdAAQBeAABDAbQAfAOASARIAAAA").cp();

		this.shape_11 = new createjs.Shape();
		this.shape_11.graphics.rf(["#00FF00","#006600"],[0,1],-9.2,-5.2,0,-9.2,-5.2,38.6).s().p("ADhAAQAAAmhCAcQhDAbhcAAQhcAAhCgbQhDgcABgmQgBglBDgcQBCgbBcAAQBcAABDAbQBCAcAAAlIAAAA").cp();

		this.addChild(this.shape_11,this.shape_10);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-22.7,-9.4,45.5,19);


	(MenuButtonDown = function() {
		this.initialize();

		// Layer 1
		this.shape_12 = new createjs.Shape();
		this.shape_12.graphics.f().s("#009900").ss(1.3,1,1).p("ADSgjQARARAAASQAAATgRASQgSAQgfAOQhDAbheAAQhdAAhCgbQgggOgRgQQgSgSAAgTQAAgSASgRQARgRAggOQBCgbBdAAQBeAABDAbQAfAOASARIAAAA").cp();

		this.shape_13 = new createjs.Shape();
		this.shape_13.graphics.rf(["#FFFF00","#00FF00"],[0,1],-9.2,-5.2,0,-9.2,-5.2,38.6).s().p("ADhAAQAAAmhCAcQhDAbhcAAQhcAAhCgbQhDgcABgmQgBglBDgcQBCgbBcAAQBcAABDAbQBCAcAAAlIAAAA").cp();

		this.addChild(this.shape_13,this.shape_12);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-22.7,-9.4,45.5,19);


	(MenuButtonNext = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{out:0,over:1,down:2},true);

		// timeline functions:
		this.frame_1 = function() {
		//	playSound("sound3overtodown");
		}
		this.frame_2 = function() {
		//	playSound("sound3overtodown");
		}

		// actions tween:
		this.timeline.addTween(createjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

		// Layer 1
		this.instance = new MenuButtonUp();

		this.instance_1 = new MenuButtonOver();

		this.instance_2 = new MenuButtonDown();

		this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[]},1).wait(1));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(-22.7,-9.4,45.5,19);


	(MenuButtonClose = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{out:0,over:1,down:2},true);

		// timeline functions:
		this.frame_1 = function() {
			//playSound("sound3overtodown");
		}
		this.frame_2 = function() {
			//playSound("sound3overtodown");
		}

		// actions tween:
		this.timeline.addTween(createjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

		// Layer 1
		this.instance_3 = new MenuButtonUp("synched",0);
		this.instance_4 = new MenuButtonOver("synched",0);
		this.instance_5 = new MenuButtonDown("synched",0);

		this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).wait(1));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(-22.7,-9.4,45.5,19);



	// UI
	/*
	(whizz.UI = function(){
		console.log("new UI()")
		this.initialize();
		this.okButton = new whizz.OkButton();
		this.okButton.setTransform(485,355);
		this.okButtonLabel = new createjs.Text(whizz.UIlang.ok, "bold 16px Arial", "#000000");
		this.okButtonLabel.textAlign = "center";
		this.okButtonLabel.lineHeight = 18;
		this.okButtonLabel.lineWidth = 33;
		this.okButtonLabel.setTransform(485,346);
		this.okButtonLabel.mouseEnabled = false;
		this.leftArrow = new whizz.ArrowButton();
		this.leftArrow.setTransform(440,352,-1,1);
		this.rightArrow = new whizz.ArrowButton2();
		this.rightArrow.setTransform(530,352,1,1);
		this.menu = new whizz.Menu();
		this.menu.setTransform(47.9,350.9,0.809,0.809);

		this.addChild(this.okButton,this.okButtonLabel,this.leftArrow,this.rightArrow,this.menu);
	}).prototype = p = new createjs.Container();
	*/


})(whizz = whizz||{}, createjs = createjs||{});


(function(createjs, whizz){

	var lib = {} // internal
	var p; // shortcut to reference prototypes

// stage content:
	(whizz.UI = function(){
		this.initialize();

		// leftArrow
		this.leftArrow = new whizz.LeftArrow();
		this.leftArrow.setTransform(13.1, 13.1);

		new whizz.ButtonHelper(this.leftArrow);

		// rightArrow
		this.rightArrow = new whizz.RightArrow();
		this.rightArrow.setTransform(99.5, 13.1, 1, 1, 0, 0, 180);

		new whizz.ButtonHelper(this.rightArrow);

		// shadow
		this.shadow = new whizz.Shadow();
		this.shadow.setTransform(56.3, 43, 0.578, 0.087);
		this.shadow.alpha = 0.5;
		this.shadow.cache(-56, -56, 114, 114, whizz.scale);

		// okButton
		this.okButton = new whizz.OkButton();
		this.okButton.setTransform(56.3, 13.3);

		new whizz.ButtonHelper(this.okButton);

		this.addChild(this.okButton, this.shadow, this.rightArrow, this.leftArrow);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 113.6, 47.8);

	(whizz.OkButton = function(mode, startPosition, loop){
		this.initialize(mode, startPosition, loop, {out: 0, over: 1, down: 2, hit: 3}, true);

		// Layer 1
		this.instance_35 = new lib.OkButtonOut();
		this.instance_35.setTransform(0.3, 0.6, 1, 1, 0, 0, 0, 31.2, 13.8);
		this.instance_35.cache(-1, -1, 67, 32, whizz.scale);

		this.instance_36 = new lib.OkButtonOver();
		this.instance_36.setTransform(0.3, 0.6, 1, 1, 0, 0, 0, 31.2, 13.8);
		this.instance_36.cache(-1, -1, 67, 32, whizz.scale);

		this.instance_37 = new lib.OkButtonDown();
		this.instance_37.setTransform(-0.1, -0.1, 1, 1, 0, 0, 0, 29.2, 12.3);
		this.instance_37.cache(-1, -1, 62, 29, whizz.scale);

		this.instance_38 = new lib.OkHitArea();
		this.instance_38.setTransform(-0.1, -0.1, 1, 1, 0, 0, 0, 29.7, 12.8);

		this.timeline.addTween(createjs.Tween.get({}).to({state: [
			{t: this.instance_35}
		]}).to({state: [
				{t: this.instance_36}
			]}, 1).to({state: [
				{t: this.instance_37}
			]}, 1).to({state: [
				{t: this.instance_38}
			]}, 1).wait(1));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(-30.8, -13.2, 62.8, 28);

	(whizz.LeftArrow = function(mode, startPosition, loop){
		this.initialize(mode, startPosition, loop, {out: 0, over: 1, down: 2, hit: 3}, true);

		// Layer 1
		this.instance_53 = new lib.LeftButtonOut();
		this.instance_53.setTransform(-5.2, 0.7, 1, 1, 0, 0, 0, 7.7, 13.8);
		this.instance_53.cache(-1, -1, 32, 32, whizz.scale);

		this.instance_54 = new lib.LeftButtonOver();
		this.instance_54.setTransform(-5.2, 0.7, 1, 1, 0, 0, 0, 7.7, 13.8);
		this.instance_54.cache(-1, -1, 32, 32, whizz.scale);

		this.instance_55 = new lib.LeftButtonDown();
		this.instance_55.setTransform(-5.1, 0, 1, 1, 0, 0, 0, 7.1, 12.3);
		this.instance_55.cache(-1, -1, 30, 29, whizz.scale);

		this.hitArea_1 = new lib.ArrowHitArea();
		this.hitArea_1.setTransform(0.6, 0, 1, 1, 0, 0, 0, 13.2, 12.8);

		this.timeline.addTween(createjs.Tween.get({}).to({state: [
			{t: this.instance_53}
		]}).to({state: [
				{t: this.instance_54}
			]}, 1).to({state: [
				{t: this.instance_55}
			]}, 1).to({state: [
				{t: this.hitArea_1}
			]}, 1).wait(1));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(-13, -13, 27.9, 28);

	(whizz.RightArrow = function(mode, startPosition, loop){
		this.initialize(mode, startPosition, loop, {out: 0, over: 1, down: 2, hit: 3}, true);

		// Layer 1
		this.instance_16 = new lib.RightButtonOut();
		this.instance_16.setTransform(-5.5, 0.7, 1, 1, 0, 0, 0, 8.4, 13.8);
		this.instance_16.cache(-1, -1, 32, 32, whizz.scale);

		this.instance_17 = new lib.RightButtonOver();
		this.instance_17.setTransform(-5.5, 0.7, 1, 1, 0, 0, 0, 8.4, 13.8);
		this.instance_17.cache(-1, -1, 32, 32, whizz.scale);

		this.instance_18 = new lib.RightButtonDown();
		this.instance_18.setTransform(-5.1, 0, 1, 1, 0, 0, 0, 7.1, 12.3);
		this.instance_18.cache(-1, -1, 30, 29, whizz.scale);

		this.hitArea = new lib.ArrowHitArea();
		this.hitArea.setTransform(0.6, 0, 1, 1, 0, 0, 0, 13.2, 12.8);

		this.timeline.addTween(createjs.Tween.get({}).to({state: [
			{t: this.instance_16}
		]}).to({state: [
				{t: this.instance_17}
			]}, 1).to({state: [
				{t: this.instance_18}
			]}, 1).to({state: [
				{t: this.hitArea}
			]}, 1).wait(1));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(-14, -13, 28, 28);


	(whizz.Shadow = function(){
		this.initialize();

		// Layer 1
		this.shape_26 = new createjs.Shape();
		this.shape_26.graphics.rf(["rgba(0,0,0,0.698)", "rgba(43,64,64,0.098)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AFultQCYCXAADWQAADWiYCYIAAAAQiYCYjWAAQjWAAiXiYQiYiXAAjXQAAjVCYiYQCYiYDVAAQDXAACXCYIAAAAAFqlqQiWiWjUAAQjTAAiXCWQiWCXAADTQAADUCWCWQCXCXDTAAQDUAACWiWIABgBQCWiWAAjUQAAjTiXiXIAAAA").cp();

		this.shape_27 = new createjs.Shape();
		this.shape_27.graphics.rf(["rgba(0,0,0,0.796)", "rgba(43,64,64,0.11)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AFnlmQiViVjSAAQjRAAiVCVQiVCVAADRQAADSCVCVQCVCVDRAAQDSAACViVQCViVAAjSQAAjRiViVIAAAAAFqlqQCXCXAADTQAADUiWCWIgBABQiWCWjUAAQjTAAiXiXQiWiWAAjUQAAjTCWiXQCXiWDTAAQDUAACWCWIAAAA").cp();

		this.shape_28 = new createjs.Shape();
		this.shape_28.graphics.rf(["#000000", "rgba(43,64,64,0.141)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AFjljQCUCUAADPQAADQiUCTQiTCUjQAAQjPAAiUiUQiTiTAAjQQAAjPCTiUQCUiTDPAAQDQAACTCTIAAAA").cp();

		this.shape_29 = new createjs.Shape();
		this.shape_29.graphics.rf(["rgba(0,0,0,0.898)", "rgba(43,64,64,0.125)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AFjljQiTiTjQAAQjPAAiUCTQiTCUAADPQAADQCTCTQCUCUDPAAQDQAACTiUQCUiTAAjQQAAjPiUiUIAAAAAFnlmQCVCVAADRQAADSiVCVQiVCVjSAAQjRAAiViVQiViVAAjSQAAjRCViVQCViVDRAAQDSAACVCVIAAAA").cp();

		this.shape_30 = new createjs.Shape();
		this.shape_30.graphics.rf(["rgba(0,0,0,0.196)", "rgba(43,64,64,0.027)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AGAl/QCfCfAADgQAADhifCfQifCfjhAAQjgAAififQififAAjhQAAjgCfifQCfifDgAAQDhAACfCfIAAAAAF8l7QidiejfAAQjeAAidCeQieCdAADeQAADfCeCdQCdCeDeAAQDfAACdieQCeidAAjfQAAjeieidIAAAA").cp();

		this.shape_31 = new createjs.Shape();
		this.shape_31.graphics.rf(["rgba(0,0,0,0.294)", "rgba(43,64,64,0.039)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AF8l7QCeCdAADeQAADfieCdQidCejfAAQjeAAidieQieidAAjfQAAjeCeidQCdieDeAAQDfAACdCeIAAAAAF5l4QicicjdAAQjcAAicCcQicCcAADcQAADdCcCcQCcCcDcAAQDdAACcicQCcicAAjdQAAjcicicIAAAA").cp();

		this.shape_32 = new createjs.Shape();
		this.shape_32.graphics.rf(["rgba(0,0,0,0.396)", "rgba(43,64,64,0.055)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AF5l4QCcCcAADcQAADdicCcQicCcjdAAQjcAAicicQicicAAjdQAAjcCcicQCcicDcAAQDdAACcCcIAAAAAF1l0QiaibjbAAQjaAAiaCbQibCaAADaQAADbCbCaQCaCbDaAAQDbAACaibQCbiaAAjbQAAjaibiaIAAAA").cp();

		this.shape_33 = new createjs.Shape();
		this.shape_33.graphics.rf(["rgba(0,0,0,0.596)", "rgba(43,64,64,0.082)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AFylxQCZCZAADYQAADZiZCZQiZCZjZAAQjYAAiZiZQiZiZAAjZQAAjYCZiZQCZiZDYAAQDZAACZCZIAAAAAFultQiXiYjXAAQjVAAiYCYQiYCYAADVQAADXCYCXQCXCYDWAAQDWAACYiYIAAAAQCYiYAAjWQAAjWiYiXIAAAA").cp();

		this.shape_34 = new createjs.Shape();
		this.shape_34.graphics.rf(["rgba(0,0,0,0.498)", "rgba(43,64,64,0.071)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AF1l0QCbCaAADaQAADbibCaQiaCbjbAAQjaAAiaibQibiaAAjbQAAjaCbiaQCaibDaAAQDbAACaCbIAAAAAFylxQiZiZjZAAQjYAAiZCZQiZCZAADYQAADZCZCZQCZCZDYAAQDZAACZiZQCZiZAAjZQAAjYiZiZIAAAA").cp();

		this.shape_35 = new createjs.Shape();
		this.shape_35.graphics.rf(["rgba(0,0,0,0.094)", "rgba(43,64,64,0.012)"], [0, 1], 0, 0, 0, 0, 0, 50.5).s().p("AGAl/QififjhAAQjgAAifCfQifCfAADgQAADhCfCfQCfCfDgAAQDhAACfifQCfifAAjhQAAjgififIAAAAAGDmCQChCgAADiQAADjihCgQigChjjAAQjiAAigihQihigAAjjQAAjiCgigIABgBQCgigDiAAQDjAACgChIAAAA").cp();

		this.addChild(this.shape_35, this.shape_34, this.shape_33, this.shape_32, this.shape_31, this.shape_30, this.shape_29, this.shape_28, this.shape_27, this.shape_26);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-54.7, -54.7, 109.6, 109.6);



// symbols:
	(lib.shape27DownHit = function(){
		this.initialize();

		// Layer 2
		this.text = new createjs.Text(whizz.UIlang.ok, "bold 13px Arial");
		this.text.textAlign = "center";
		this.text.lineHeight = 16;
		this.text.lineWidth = 24;
		this.text.setTransform(0, -8);

		// Layer 1
		this.shape = new createjs.Shape();
		this.shape.graphics.f().s("#009900").ss(1, 1, 1).p("AEFg2QAeAZAAAdIAAABQgBAdgdAZQgVARgiAOQhWAkh4ABQh4gBhVgkIgPgGQhFgigBgtIAAgBQAAgtBGghIAPgIQBVgkB4AAQB4AABWAkQAiAPAVARIAAAA").cp();
		this.shape.setTransform(-0.2, -0.1);

		this.addChild(this.shape, this.text);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-29.3, -12.4, 58.3, 24.6);


	(lib.shape26DownHit = function(){
		this.initialize();

		// Layer 2
		this.shape_1 = new createjs.Shape();
		this.shape_1.graphics.rf(["#FFFF00", "#00FF00"], [0, 0.651], 0, -6, 0, 0, -6, 29.3).s().p("ADNAZQhVAkh4AAQh3AAhWgkIgPgHIAAAAQhGggAAguQABAtBFAgIAMAGIADABQBWAkB3AAQB4AABVgkQAjgPAVgPQAdgZABgdQAAAegeAZQgVAPgjAPIAAAA").cp();
		this.shape_1.setTransform(-0.1, 6);

		// Layer 1
		this.shape_2 = new createjs.Shape();
		this.shape_2.graphics.rf(["#FFFF00", "#00FF00"], [0, 1], -12.5, -4.5, 0, -12.5, -4.5, 42).s().p("AEjABQgBAdgdAYQgVARgiAPQhWAkh4AAQh3AAhVgkIgEgBIgMgGQhFghgBgtIAAgBQAAgtBGgiIAQgHQBVgkB3ABQB4gBBWAkQAiAPAVARQAeAZAAAdIAAAB").cp();
		this.shape_2.setTransform(-0.1, -0.2);

		this.addChild(this.shape_2, this.shape_1);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-29.3, -12.5, 58.3, 24.7);


	(lib.shape25Over = function(){
		this.initialize();

		// Layer 1
		this.shape_3 = new createjs.Shape();
		this.shape_3.graphics.rf(["#00FFFF", "#0000FF"], [0, 1], -13.1, -4.7, 0, -13.1, -4.7, 44.2).s().p("AETg5QAfAaAAAfIAAABQgBAegeAbQgWASglAPQhaAmh+AAQh+AAhZgmIgEgCIgMgGQhJgjgBgvIAAgBQAAgwBKgjIAMgGIAEgBQBZgmB+AAQB+AABaAmQAlAPAWASIAAAA").cp();
		this.shape_3.setTransform(-0.1, -0.2);

		this.addChild(this.shape_3);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-30.8, -13.2, 61.4, 25.9);


	(lib.shape24UpOver = function(){
		this.initialize();

		// Layer 2
		this.text_1 = new createjs.Text(whizz.UIlang.ok, "bold 14px Arial");
		this.text_1.textAlign = "center";
		this.text_1.lineHeight = 17;
		this.text_1.lineWidth = 24;
		this.text_1.setTransform(0, -8);

		// Layer 1
		this.shape_4 = new createjs.Shape();
		this.shape_4.graphics.f().s("#999999").ss(1, 1, 1).p("AETg5QAfAaAAAfIAAABQAAAfgfAaQgWASgkAPQhaAmh/AAQh9AAhagmIgQgHQhJgjgBgwIAAgBQAAgvBKgkIAQgHQBagmB9AAQB/AABaAmQAkAPAWASIAAAA").cp();
		this.shape_4.setTransform(-0.2, -0.2);

		this.addChild(this.shape_4, this.text_1);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-30.8, -13.1, 61.3, 25.9);


	(lib.shape23UpOver = function(){
		this.initialize();

		// Layer 2
		this.shape_5 = new createjs.Shape();
		this.shape_5.graphics.f("#FFFFFF").s().p("AA7APIAvADIAAAYIgvgGQgwgIgmgPQhBgWgNggQATARAlAOQAxARA7AIIAAAA").cp();
		this.shape_5.setTransform(-16.9, 4.3);

		// Layer 1
		this.shape_6 = new createjs.Shape();
		this.shape_6.graphics.f("#FFFFFF").s().p("ABkhWQBGAdAAApQAAAphSAfQhRAfhyAAIg+gDIAAgXIAeAAQBvAABMgeQBOgfAAgpQAAgYgagVIAAAA").cp();
		this.shape_6.setTransform(10.7, 0);

		this.addChild(this.shape_6, this.shape_5);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-27.6, -8.6, 55.5, 17.5);


	(lib.shape21Hit = function(){
		this.initialize();

		// Layer 1
		this.shape_7 = new createjs.Shape();
		this.shape_7.graphics.f("#FFFFFF").s().p("AC8hTQjHA3iPCNQgiAjgdAlQAvh3BhhgQBphqCEguQAggJARAoQARApgqAbIAAAA").cp();
		this.shape_7.setTransform(-47.5, -57.3);

		this.addChild(this.shape_7);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-69.4, -75.9, 43.7, 37.1);


	(lib.shape20Hit = function(){
		this.initialize();

		// Layer 1
		this.shape_8 = new createjs.Shape();
		this.shape_8.graphics.rf(["rgba(43,64,64,0.141)", "#99FFFF"], [0, 1], -31.2, -48.3, 0, -31.2, -48.3, 141.9).s().p("ANTAAQABFpj7EAQj5EClgABQlegBj7kCQj5kAAAlpQAAlpD5kDQD7j/FeAAQFgAAD5D/QD7EDgBFpIAAAA").cp();

		this.addChild(this.shape_8);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-85.1, -87.6, 170.4, 175.3);


	(lib.shape19UpOver = function(){
		this.initialize();

		// Layer 1
		this.shape_9 = new createjs.Shape();
		this.shape_9.graphics.rf(["#FFFF00", "#00FF00"], [0, 0.651], 0.1, -6.4, 0, 0.1, -6.4, 30.9).s().p("AExgwQgGAXgXATQgWAQgkARQhaAlh/AAQh9AAhaglIgDgCIgNgGIgBAAQhJgiAAgwQABAvBIAiIABAAIANAFIADACQBaAmB9AAQB/AABagmQAkgQAWgQQAXgTAGgWIAAAA").cp();
		this.shape_9.setTransform(-0.3, 6.4);

		this.addChild(this.shape_9);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-30.8, 0, 61.3, 12.9);


	(lib.shape18Up = function(){
		this.initialize();

		// Layer 1
		this.shape_10 = new createjs.Shape();
		this.shape_10.graphics.f("#FFFFFF").s().p("AEyABQgBAegeAbQgWASglAPQhaAmh+AAQh+AAhZgmIgEgCIgMgGQhJgjgBgvIAAgBQAAgwBKgjIAMgGIAEgBQBZgmB+AAQB+AABaAmQAlAPAWASQAfAaAAAfIAAAB").cp();
		this.shape_10.setTransform(-0.1, -0.2);

		this.addChild(this.shape_10);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-30.8, -13.2, 61.4, 25.9);


	(lib.shape17UpOver = function(){
		this.initialize();

		// Layer 1
		this.shape_11 = new createjs.Shape();
		this.shape_11.graphics.f("#000000").s().p("As5lcQFWiQHjAAQHkAAFXCQQCLA7BTBFQB4BkAAB4IAAAFQgCB2h2BiQhTBFiLA7QlXCQnkAAQnjAAlWiQIg+gcQkViGgEi2IAAgFQAAi4EZiIIA+gc").cp();

		this.addChild(this.shape_11);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-116.9, -49.3, 234, 98.7);


	(lib.shape14DownHit = function(){
		this.initialize();

		// Layer 2
		this.shape_12 = new createjs.Shape();
		this.shape_12.graphics.f("#FFFFFF").s().p("AAzgYQg3AUgmAbIgQAOQALgUAZgRQAagVAlgPIAPABQAGAEgLAHIAAAA").cp();
		this.shape_12.setTransform(-4.6, -4.2);

		// Layer 1
		this.shape_13 = new createjs.Shape();
		this.shape_13.graphics.f().s("#009900").ss(1, 1, 1).p("AB3hlIgCABIgDABQhQArgCA4QABAxA/AoIAXANIAFAFIACAGIgDAHIgJADIgLgBIgcgFQhEgOgtgXQhXgqAAghQAAgqBXgqQArgXBBgNIAqgHIAKADIAEAGQAAAGgHAGIAAAA").cp();
		this.shape_13.setTransform(0.6, 0);

		this.addChild(this.shape_13, this.shape_12);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-12, -12.4, 25.4, 24.8);


	(lib.shape13UpOver = function(){
		this.initialize();

		// Layer 2
		this.shape_14 = new createjs.Shape();
		this.shape_14.graphics.f("#FFFFFF").s().p("AA2gYQg5AUgoAdIgSAOQALgUAcgTQAbgWAngQIAQABQAGAFgMAIIAAAA").cp();
		this.shape_14.setTransform(-4.9, -4.4);

		// Layer 1
		this.shape_15 = new createjs.Shape();
		this.shape_15.graphics.f().s("#999999").ss(1, 1, 1).p("AB9hrIgCACIgDABQhUAsgCA8QABA0BCAqIAYAOIAGAEIACAIIgDAHQgEADgGAAIgMgBIgdgGQhIgOgvgYQhcgtAAgjQAAgsBcgsQAugYBEgOIAsgIQAIAAADAEIAEAHQAAAGgIAFIAAAA").cp();
		this.shape_15.setTransform(0.6, 0);

		this.addChild(this.shape_15, this.shape_14);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-12.7, -13, 26.7, 26.1);


	(lib.shape10DownHit = function(){
		this.initialize();

		// Layer 2
		this.shape_16 = new createjs.Shape();
		this.shape_16.graphics.f("#FFFFFF").s().p("AAzgYQg3AUgmAbIgQAOQALgUAZgRQAagVAlgPIAPABQAGAEgLAHIAAAA").cp();
		this.shape_16.setTransform(-4.6, -4.2);

		// Layer 1
		this.shape_17 = new createjs.Shape();
		this.shape_17.graphics.f().s("#009900").ss(1, 1, 1).p("AB3hlIgCABIgDABQhQArgCA4QABAxA/AoIAXANIAFAFIACAGIgDAHIgJADIgLgBIgcgFQhEgOgtgXQhXgqAAghQAAgqBXgqQArgXBBgNIAqgHIAKADIAEAGQAAAGgHAGIAAAA").cp();
		this.shape_17.setTransform(0.6, 0);

		this.addChild(this.shape_17, this.shape_16);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-12, -12.4, 25.4, 24.8);


	(lib.shape9DownHit = function(){
		this.initialize();

		// Layer 1
		this.shape_18 = new createjs.Shape();
		this.shape_18.graphics.rf(["#FFFF00", "#00FF00"], [0, 1], -6.4, -4.3, 0, -6.4, -4.3, 25.5).s().p("AB+hxQAAAGgHAFIgCABQiYBjCDBaIAXAOQAEACABACIACAHIgBAHIgygDQhEgOgtgXQhXgqAAgiQAAgqBXgqQAsgWBBgNIAugEIAFAAIAEAG").cp();
		this.shape_18.setTransform(0.4, -0.1);

		this.addChild(this.shape_18);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-12.1, -12.2, 25.3, 24.2);


	(lib.shape8Over = function(){
		this.initialize();

		// Layer 1
		this.shape_19 = new createjs.Shape();
		this.shape_19.graphics.rf(["#00FFFF", "#0000FF"], [0, 1], -5.7, -5.3, 0, -5.7, -5.3, 26.5).s().p("AB7h+IAGAAIAEAHQAAAGgIAGIgCABQigBoCKBfIAYAOIAGAFIACAHIgCAIIg0gEQhIgPgvgYQhcgsAAgjQAAgtBcgsQAugYBEgOIAxgE").cp();
		this.shape_19.setTransform(0.5, -0.1);

		this.addChild(this.shape_19);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-12.8, -12.9, 26.7, 25.5);


	(lib.shape7UpOver = function(){
		this.initialize();

		// Layer 1
		this.shape_20 = new createjs.Shape();
		this.shape_20.graphics.f("#FFFFFF").s().p("AmfiuQB4CXFVBsQCrA4DHAiQiWg1hbhhQhgAbjLhGQjOhIhVhUIAAAA").cp();

		this.addChild(this.shape_20);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-41.5, -17.4, 83.2, 35.1);


	(lib.shape6UpOver = function(){
		this.initialize();

		// Layer 2
		this.shape_21 = new createjs.Shape();
		this.shape_21.graphics.f("#FFFFFF").s().p("AA2gYQg5AUgoAdIgSAOQALgUAcgTQAbgWAngQIAQABQAGAFgMAIIAAAA").cp();
		this.shape_21.setTransform(-4.9, -4.4);

		// Layer 1
		this.shape_22 = new createjs.Shape();
		this.shape_22.graphics.f().s("#999999").ss(1, 1, 1).p("AB9hrIgCACIgDABQhUAsgCA8QABA0BCAqIAYAOIAGAEIACAIIgDAHQgEADgGAAIgMgBIgdgGQhIgOgvgYQhcgtAAgjQAAgsBcgsQAugYBEgOIAsgIQAIAAADAEIAEAHQAAAGgIAFIAAAA").cp();
		this.shape_22.setTransform(0.6, 0);

		this.addChild(this.shape_22, this.shape_21);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-12.7, -13, 26.7, 26.1);


	(lib.shape5UpOver = function(){
		this.initialize();

		// Layer 1
		this.shape_23 = new createjs.Shape();
		this.shape_23.graphics.rf(["rgba(43,64,64,0.141)", "#99FFFF"], [0, 1], 18.1, -26.8, 0, 18.1, -26.8, 195.5).s().p("AHtnkIAPAaQAAAYgdAVIgHAEQpoGNISFxQAsAcAyAaQANAHAHALQAIALAAAQQAAASgGALIjIgOQkQg4i8hcQldipAAiHQAAivFdipQC2hZEEg2IC9gPIAUgB").cp();
		this.shape_23.setTransform(98.6, -0.3);

		this.addChild(this.shape_23);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(47.8, -48.8, 101.7, 97);


	(lib.shape4Up = function(){
		this.initialize();

		// Layer 1
		this.shape_24 = new createjs.Shape();
		this.shape_24.graphics.f("#FFFFFF").s().p("AB7h+IAGAAIAEAHQAAAGgIAGIgCABQigBoCKBfIAYAOIAGAFIACAHIgCAIIg0gEQhIgPgvgYQhcgsAAgjQAAgtBcgsQAugYBEgOIAxgE").cp();
		this.shape_24.setTransform(0.5, -0.1);

		this.addChild(this.shape_24);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-12.8, -12.9, 26.7, 25.5);


	(lib.shape3UpOver = function(){
		this.initialize();

		// Layer 1
		this.shape_25 = new createjs.Shape();
		this.shape_25.graphics.f("#000000").s().p("AHXmbQpoGMISFxQAsAcAyAaQANAHAHALQAIALABAXQABAWgUAEQhQAHhsgZQkQg4i8hcQldipAAiHQAAiuFdipQC2hZEEg3IC9gPIAUAAIAPAaQAAAXgdAVIgHAF").cp();
		this.shape_25.setTransform(0.1, 0.3);

		this.addChild(this.shape_25);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-50.8, -48.4, 101.8, 97.6);





	(lib.OkHitArea = function(){
		this.initialize();

		// Layer 1
		this.shape_36 = new createjs.Shape();
		this.shape_36.graphics.f("#000000").s().p("AEoABIAAgBQAAgfgfgaQgWgSgjgPQhXglh5AAQh4AAhWAlIgQAHQhJAjAAAwIAAAAQABAxBIAjIABABIAPAGIAAgBQBWAlB4ABQB5gBBXglQAjgOAWgSQAegaABgfIAAAA").cp();
		this.shape_36.setTransform(29.6, 12.8);

		this.addChild(this.shape_36);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 59.3, 25.6);


	(lib.ArrowHitArea = function(){
		this.initialize();

		// Layer 1
		this.shape_37 = new createjs.Shape();
		this.shape_37.graphics.f("#000000").s().p("AB8h7IgKgEQgCAAgBAAIgpAHIgBAAQhBANgsAXQhbAsABAtQgBAkBbAsQAtAXBFAOIAcAFIAAAAIAMABQABAAABAAIAJgDQABAAABgBQAAgBABgBIADgHQAAgBAAgBQAAgBAAgBIgDgGQAAgBgBgBIgFgEQAAgBgBAAIgXgNIABAAQg6glgEguIAAgBQAAgBAAAAIAAAAQACgyBDgmQAFgDAFgDIAFgDIABAAQAJgHAAgIQAAgCAAgBIgEgGQgBgCgCAAIAAAA").cp();
		this.shape_37.setTransform(13.2, 12.9);

		this.addChild(this.shape_37);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 26.4, 25.8);


	(lib.sprite22UpOver = function(){
		this.initialize();

		// Layer 2
		this.instance = new lib.shape21Hit("synched", 0);

		// Layer 1
		this.instance_1 = new lib.shape20Hit("synched", 0);
		this.instance_1.setTransform(-1.2, -1.3);
		this.instance_1.alpha = 0.68;

		this.addChild(this.instance_1, this.instance);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(-86.4, -89, 170.4, 175.3);


	(lib.RightButtonOver = function(){
		this.initialize();

		// shape 7 (Up Over)
		this.instance_2 = new lib.shape7UpOver("synched", 0);
		this.instance_2.setTransform(14.4, 19.4, 0.262, 0.262);
		this.instance_2.alpha = 0.398;

		// shape 6 (Up Over)
		this.instance_3 = new lib.shape6UpOver("synched", 0);
		this.instance_3.setTransform(14.1, 13.1);

		// shape 5 (Up Over)
		this.instance_4 = new lib.shape5UpOver("synched", 0);
		this.instance_4.setTransform(-11.4, 13.2, 0.262, 0.262);
		this.instance_4.alpha = 0.66;

		// shape 8 (Over)
		this.instance_5 = new lib.shape8Over("synched", 0);
		this.instance_5.setTransform(14.1, 13.1);

		// shape 3 (Up Over)
		this.instance_6 = new lib.shape3UpOver("synched", 0);
		this.instance_6.setTransform(13.4, 15.2, 0.262, 0.262);
		this.instance_6.alpha = 0.281;

		this.addChild(this.instance_6, this.instance_5, this.instance_4, this.instance_3, this.instance_2);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 28, 28);


	(lib.RightButtonOut = function(){
		this.initialize();

		// shape 7 (Up Over)
		this.instance_7 = new lib.shape7UpOver("synched", 0);
		this.instance_7.setTransform(14.4, 19.4, 0.262, 0.262);
		this.instance_7.alpha = 0.398;

		// shape 6 (Up Over)
		this.instance_8 = new lib.shape6UpOver("synched", 0);
		this.instance_8.setTransform(14.1, 13.1);

		// shape 5 (Up Over)
		this.instance_9 = new lib.shape5UpOver("synched", 0);
		this.instance_9.setTransform(-11.4, 13.2, 0.262, 0.262);
		this.instance_9.alpha = 0.66;

		// shape 4 (Up)
		this.instance_10 = new lib.shape4Up("synched", 0);
		this.instance_10.setTransform(14.1, 13.1);

		// shape 3 (Up Over)
		this.instance_11 = new lib.shape3UpOver("synched", 0);
		this.instance_11.setTransform(13.4, 15.2, 0.262, 0.262);
		this.instance_11.alpha = 0.281;

		this.addChild(this.instance_11, this.instance_10, this.instance_9, this.instance_8, this.instance_7);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 28, 28);


	(lib.RightButtonDown = function(){
		this.initialize();

		// shape 10 (Down Hit)
		this.instance_12 = new lib.shape10DownHit("synched", 0);
		this.instance_12.setTransform(12.4, 12.5);

		// shape 7 (Up Over)
		this.instance_13 = new lib.shape7UpOver("synched", 0);
		this.instance_13.setTransform(12.7, 18.5, 0.249, 0.249);
		this.instance_13.alpha = 0.398;

		// shape 5 (Up Over)
		this.instance_14 = new lib.shape5UpOver("synched", 0);
		this.instance_14.setTransform(-11.8, 12.5, 0.249, 0.249);
		this.instance_14.alpha = 0.66;

		// shape 9 (Down Hit)
		this.instance_15 = new lib.shape9DownHit("synched", 0);
		this.instance_15.setTransform(12.4, 12.5);

		this.addChild(this.instance_15, this.instance_14, this.instance_13, this.instance_12);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 25.6, 24.8);



	(lib.OkButtonOver = function(){
		this.initialize();

		// shape 24 (Up Over)
		this.instance_19 = new lib.shape24UpOver("synched", 0);
		this.instance_19.setTransform(30.9, 13.3);

		// shape 23 (Up Over)
		this.instance_20 = new lib.shape23UpOver("synched", 0);
		this.instance_20.setTransform(30.8, 15.2, 1.016, 1.016);
		this.instance_20.alpha = 0.398;

		// sprite 22 (Up Over)
		this.instance_21 = new lib.sprite22UpOver();
		this.instance_21.setTransform(31.1, 13.3, 0.36, 0.146);

		// shape 19 (Up Over)
		this.instance_22 = new lib.shape19UpOver("synched", 0);
		this.instance_22.setTransform(30.9, 13.3);

		// shape 25 (Over)
		this.instance_23 = new lib.shape25Over("synched", 0);
		this.instance_23.setTransform(30.9, 13.3);

		// shape 17 (Up Over)
		this.instance_24 = new lib.shape17UpOver("synched", 0);
		this.instance_24.setTransform(32.2, 15.1, 0.262, 0.262);
		this.instance_24.alpha = 0.281;

		this.addChild(this.instance_24, this.instance_23, this.instance_22, this.instance_21, this.instance_20, this.instance_19);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 62.8, 28);


	(lib.OkButtonOut = function(){
		this.initialize();

		// shape 24 (Up Over)
		this.instance_25 = new lib.shape24UpOver("synched", 0);
		this.instance_25.setTransform(30.9, 13.3);

		// shape 23 (Up Over)
		this.instance_26 = new lib.shape23UpOver("synched", 0);
		this.instance_26.setTransform(30.8, 15.2, 1.016, 1.016);
		this.instance_26.alpha = 0.398;

		// sprite 22 (Up Over)
		this.instance_27 = new lib.sprite22UpOver();
		this.instance_27.setTransform(31.1, 13.3, 0.36, 0.146);

		// shape 19 (Up Over)
		this.instance_28 = new lib.shape19UpOver("synched", 0);
		this.instance_28.setTransform(30.9, 13.3);

		// shape 18 (Up)
		this.instance_29 = new lib.shape18Up("synched", 0);
		this.instance_29.setTransform(30.9, 13.3);

		// shape 17 (Up Over)
		this.instance_30 = new lib.shape17UpOver("synched", 0);
		this.instance_30.setTransform(32.2, 15.1, 0.262, 0.262);
		this.instance_30.alpha = 0.281;

		this.addChild(this.instance_30, this.instance_29, this.instance_28, this.instance_27, this.instance_26, this.instance_25);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 62.8, 28);


	(lib.OkButtonDown = function(){
		this.initialize();

		// shape 27 (Down Hit)
		this.instance_31 = new lib.shape27DownHit("synched", 0);
		this.instance_31.setTransform(29.4, 12.6);

		// shape 23 (Up Over)
		this.instance_32 = new lib.shape23UpOver("synched", 0);
		this.instance_32.setTransform(29.3, 14.4, 0.965, 0.965);
		this.instance_32.alpha = 0.398;

		// sprite 22 (Up Over)
		this.instance_33 = new lib.sprite22UpOver();
		this.instance_33.setTransform(29.6, 12.6, 0.342, 0.139);

		// shape 26 (Down Hit)
		this.instance_34 = new lib.shape26DownHit("synched", 0);
		this.instance_34.setTransform(29.4, 12.6);

		this.addChild(this.instance_34, this.instance_33, this.instance_32, this.instance_31);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 58.4, 24.7);


	(lib.LeftButtonOver = function(){
		this.initialize();

		// shape 7 (Up Over)
		this.instance_39 = new lib.shape7UpOver("synched", 0);
		this.instance_39.setTransform(13.4, 19.4, 0.262, 0.262);
		this.instance_39.alpha = 0.398;

		// shape 13 (Up Over)
		this.instance_40 = new lib.shape13UpOver("synched", 0);
		this.instance_40.setTransform(13.1, 13.1);

		// shape 5 (Up Over)
		this.instance_41 = new lib.shape5UpOver("synched", 0);
		this.instance_41.setTransform(-12.4, 13.2, 0.262, 0.262);
		this.instance_41.alpha = 0.66;

		// shape 8 (Over)
		this.instance_42 = new lib.shape8Over("synched", 0);
		this.instance_42.setTransform(13.1, 13.1);

		// shape 3 (Up Over)
		this.instance_43 = new lib.shape3UpOver("synched", 0);
		this.instance_43.setTransform(14.6, 15.2, 0.262, 0.262);
		this.instance_43.alpha = 0.281;

		this.addChild(this.instance_43, this.instance_42, this.instance_41, this.instance_40, this.instance_39);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 27.9, 28);


	(lib.LeftButtonOut = function(){
		this.initialize();

		// shape 7 (Up Over)
		this.instance_44 = new lib.shape7UpOver("synched", 0);
		this.instance_44.setTransform(13.4, 19.4, 0.262, 0.262);
		this.instance_44.alpha = 0.398;

		// shape 13 (Up Over)
		this.instance_45 = new lib.shape13UpOver("synched", 0);
		this.instance_45.setTransform(13.1, 13.1);

		// shape 5 (Up Over)
		this.instance_46 = new lib.shape5UpOver("synched", 0);
		this.instance_46.setTransform(-12.4, 13.2, 0.262, 0.262);
		this.instance_46.alpha = 0.66;

		// shape 4 (Up)
		this.instance_47 = new lib.shape4Up("synched", 0);
		this.instance_47.setTransform(13.1, 13.1);

		// shape 3 (Up Over)
		this.instance_48 = new lib.shape3UpOver("synched", 0);
		this.instance_48.setTransform(14.6, 15.2, 0.262, 0.262);
		this.instance_48.alpha = 0.281;

		this.addChild(this.instance_48, this.instance_47, this.instance_46, this.instance_45, this.instance_44);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 27.9, 28);


	(lib.LeftButtonDown = function(){
		this.initialize();

		// shape 14 (Down Hit)
		this.instance_49 = new lib.shape14DownHit("synched", 0);
		this.instance_49.setTransform(12.4, 12.5);

		// shape 7 (Up Over)
		this.instance_50 = new lib.shape7UpOver("synched", 0);
		this.instance_50.setTransform(12.7, 18.5, 0.249, 0.249);
		this.instance_50.alpha = 0.398;

		// shape 5 (Up Over)
		this.instance_51 = new lib.shape5UpOver("synched", 0);
		this.instance_51.setTransform(-11.8, 12.5, 0.249, 0.249);
		this.instance_51.alpha = 0.66;

		// shape 9 (Down Hit)
		this.instance_52 = new lib.shape9DownHit("synched", 0);
		this.instance_52.setTransform(12.4, 12.5);

		this.addChild(this.instance_52, this.instance_51, this.instance_50, this.instance_49);
	}).prototype = p = new createjs.Container();
	p.nominalBounds = new createjs.Rectangle(0, 0, 25.6, 24.8);


})(createjs = createjs || {}, whizz = whizz || {});


var createjs, whizz;


