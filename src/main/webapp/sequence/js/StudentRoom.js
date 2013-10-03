// stage content:
(lib.StudentRoom = function(appObj) {
	this.initialize();

    var self = this;
    
    this.appObj = appObj;
    this._interval = 0;

    // background
    this.bg = new createjs.Shape(
    	new createjs.Graphics().beginFill("#fff").drawRect(0,0,1024,748)
    );
    
    var contentImage = new Image();
    contentImage.src = "./img/"+this.appObj.lang_i18n+"_StudentRoom.png";
    this.contentImage = new createjs.Bitmap(contentImage);
    this.contentImage.setTransform(0,0);  
    
    
    // console1 rectangle
    this.console1Button=new createjs.Shape();
    this.console1Button.alpha = 0.01;
    this.console1Button.graphics.beginFill("#000").drawRect(0,0,110,40);
    this.console1Button.x=82;
    this.console1Button.y=305;

    // console2 rectangle
    this.console2Button=new createjs.Shape();
    this.console2Button.alpha = 0.01;
    this.console2Button.graphics.beginFill("#000").drawRect(0,0,110,55);
    this.console2Button.x=115;
    this.console2Button.y=535;

    // console3 rectangle
    this.console3Button=new createjs.Shape();
    this.console3Button.alpha = 0.01;
    this.console3Button.graphics.beginFill("#000").drawRect(0,0,150,120);
    this.console3Button.x=455;
    this.console3Button.y=200;


}).prototype = p = new createjs.Container();

p.appObj = null;
p._interval = null;

var BUILD_INTERFACE          = 0;
var VOID_STATE               = 1;

p.myState = BUILD_INTERFACE;

p.clearTimeInterval = function(){
    clearTimeout(this._interval);
    this._interval = 0;
}

p.onTick = function(){
    
    switch(this.myState)
    {
        // state #1
        // ============
        case BUILD_INTERFACE:

            var self = this;

            // add bg & intro
            this.addChild(this.bg, this.contentImage);

            var self = this;
            
            this.addChild(this.console1Button);            
            this.console1Button.onClick = function() {
                self.appObj.launchModule('StudentConsole');
            }
            
            this.addChild(this.console2Button);            
            this.console2Button.onClick = function() {
                self.appObj.launchModule('StudentConsole');
            }
            
            this.addChild(this.console3Button);            
            this.console3Button.onClick = function() {
                self.appObj.startLesson();
            }
            
            
            this.myState = VOID_STATE;
		    this._interval = setTimeout(function(evt) { self.clearTimeInterval(); }, 1000);
            
        break;


        // state #2
        // ============
        case VOID_STATE:

            if (this._interval == 0)
            {
                var self = this;
            }
            
        break;

    }

}



