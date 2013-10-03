(function(whizz, createjs){
	var Header = function(appRoot){
		this.init(appRoot);
	};
	Header.prototype = {
		init: function(appRoot){
			this.element = whizz.createEl("div", appRoot, "appHeader");

			this.appHeaderTop = whizz.createEl("div", this.element, "appHeaderTop", "&nbsp;");
			this.appHeaderBottom = whizz.createEl("div", this.element, "appHeaderBottom");

			var scoreBar = whizz.createEl("ul", this.element, "scoreBar");

			// TODO: lang!!!
			var el = whizz.createEl("li", scoreBar, "", whizz.UIlang.score);
			this.scoreEl = whizz.createEl("span", el, "score", "0");
			el = whizz.createEl("li", scoreBar, "", whizz.UIlang.question);
			this.questionEl = whizz.createEl("span", el, "question", "0");
			el.appendChild(document.createTextNode("/"));
			this.questionTotalEl = whizz.createEl("span", el, "total", "0");

			el = whizz.createEl("li", scoreBar, "", "h1: ");
			this.h1El = whizz.createEl("span", el, "h1", "0");
			el = whizz.createEl("li", scoreBar, "", "h2: ");
			this.h2El = whizz.createEl("span", el, "h2", "0");
			el = whizz.createEl("li", scoreBar, "", "h3: ");
			this.h3El = whizz.createEl("span", el, "h3", "0");
		},

		element: null,

		setHeaderTop: function(headerTop){
			this.appHeaderTop.innerHTML = headerTop||"&nbsp;";
		},
		setHeaderBottom: function(headerBottom){
			this.appHeaderBottom.innerHTML = headerBottom||"";
		},

		setScore: function(score){
			this.scoreEl.innerHTML = score || "0";
		},
		setQuestion: function(question){
			this.questionEl.innerHTML = question || "0";
		},
		setQuestionTotal: function(questionTotal){
			this.questionTotalEl.innerHTML = questionTotal || "0";
		},
		setHelp: function(level, value){
		    switch(level){
			    case 0:
				    this.h1El.innerHTML = value || "0";
				    break;
			    case 1:
				    this.h2El.innerHTML = value || "0";
				    break;
			    case 2:
				    this.h3El.innerHTML = value || "0";
				    break;
		    }
		}

	};



	whizz.Header = Header;
})(whizz = whizz||{}, createjs = createjs||{});
var whizz, createjs;