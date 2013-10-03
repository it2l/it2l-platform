(function(whizz) {
	var ButtonHelper = function(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
		this.initialize(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel);
	}
	var p = ButtonHelper.prototype;
	p.target = null;
	p.overLabel = null;
	p.outLabel = null;
	p.downLabel = null;
	p.play = false;
	p._isPressed = false;

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
			o.addEventListener("click", this);
		} else {
			o.removeEventListener("mouseover", this);
			o.removeEventListener("mouseout", this);
			o.removeEventListener("mousedown", this);
			o.removeEventListener("click", this);
		}
	};

	p.toString = function() {
		return "[ButtonHelper]";
	};

	p.handleEvent = function(evt) {
		var label = (evt.type == "mouseover" && !this._isPressed) || evt.type == "click" ? this.overLabel :
			(evt.type == "mouseover" && this._isPressed) || evt.type == "mousedown" ? this.downLabel :
				(this._isPressed) ? this.overLabel : this.outLabel;

		if (evt.type == "mousedown") {
			this._isPressed = true;
			evt.addEventListener("mouseup", this);
		} else if (evt.type == "mouseup") {
			this._isPressed = false;
			return;
		}

		var t = this.target;
		if (this.play) {
			t.gotoAndPlay&&t.gotoAndPlay(label);
		} else {
			t.gotoAndStop&&t.gotoAndStop(label);
		}
	};

	whizz.ButtonHelper = ButtonHelper;
}(whizz = whizz||{}));
