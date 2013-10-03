// stage content:
(lib.StudentConsole = function(appObj) {
	this.initialize();

    var self = this;
    
    this.appObj = appObj;
    this._interval = 0;
    this.activeTab = 1;
    
    // background
    this.bg = new createjs.Shape(
    	new createjs.Graphics().beginFill("#fff").drawRect(0,0,1024,748)
    );
    
    var contentImage = new Image();
    contentImage.src = "./img/"+this.appObj.lang_i18n+"_StudentConsole.png";
    this.contentImage = new createjs.Bitmap(contentImage);
    this.contentImage.setTransform(0,0);  
    
    // LESSON rectangle
    this.lesson=new createjs.Shape();
    this.lesson.alpha = 0.01;
    this.lesson.graphics.beginFill("#000").drawRect(0,0,175,65);
    this.lesson.x=78;
    this.lesson.y=555;
    
    // exit rectangle
    this.exitButton=new createjs.Shape();
    this.exitButton.alpha = 0.01;
    this.exitButton.graphics.beginFill("#000").drawRect(0,0,110,42);
    this.exitButton.x=55;
    this.exitButton.y=675;
    
    // console1tab rectangle
    this.console1tab=new createjs.Shape();
    this.console1tab.alpha = 0.01;
    this.console1tab.graphics.beginFill("#000").drawRect(0,0,160,50);
    this.console1tab.x=781;
    this.console1tab.y=395;
    
    // console2tab rectangle
    this.console2tab=new createjs.Shape();
    this.console2tab.alpha = 0.01;
    this.console2tab.graphics.beginFill("#000").drawRect(0,0,160,50);
    this.console2tab.x=781;
    this.console2tab.y=460;
    
    // console3tab rectangle
    this.console3tab=new createjs.Shape();
    this.console3tab.alpha = 0.01;
    this.console3tab.graphics.beginFill("#000").drawRect(0,0,160,50);
    this.console3tab.x=781;
    this.console3tab.y=525;
    
    // console2 rectangle
    var console2Image = new Image();
    console2Image.src = "./img/"+this.appObj.lang_i18n+"_StudentConsole_Tab2.png";
    this.console2Image = new createjs.Bitmap(console2Image);
    this.console2Image.setTransform(293,317);

    // console3 rectangle
    var console3Image = new Image();
    console3Image.src = "./img/"+this.appObj.lang_i18n+"_StudentConsole_Tab3.png";
    this.console3Image = new createjs.Bitmap(console3Image);
    this.console3Image.setTransform(293,317);
    
    // bedroom rectangle
    this.bedroom=new createjs.Shape();
    this.bedroom.alpha = 0.01;
    this.bedroom.graphics.beginFill("#000").drawRect(0,0,155,48);
    this.bedroom.x=650;
    this.bedroom.y=670;


}).prototype = p = new createjs.Container();

p.appObj = null;
p._interval = null;
p.activeTab = null;

var BUILD_INTERFACE          = 0;
var VOID_STATE               = 1;

p.myState = BUILD_INTERFACE;

p.clearTimeInterval = function(){
    clearTimeout(this._interval);
    this._interval = 0;
}

p.handleTabClick = function(){
    
    if (this.activeTab == 1)
    {
        this.removeChild(this.console2Image);
        this.removeChild(this.console3Image);
    }
    else if (this.activeTab == 2)
    {
        this.addChild(this.console2Image);
        this.removeChild(this.console3Image);
    }
    else if (this.activeTab == 3)
    {
        this.removeChild(this.console2Image);
        this.addChild(this.console3Image);
    }
    
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
            
            this.addChild(this.console1tab);            
            this.console1tab.onClick = function() {
                self.activeTab = 1;
                self.handleTabClick();
            }

            this.addChild(this.console2tab);            
            this.console2tab.onClick = function() {
                self.activeTab = 2;
                self.handleTabClick();
            }

            this.addChild(this.console3tab);            
            this.console3tab.onClick = function() {
                self.activeTab = 3;
                self.handleTabClick();
            }

            this.addChild(this.lesson);            
            this.lesson.onClick = function() {
                self.appObj.startLesson();
            }   

            this.addChild(this.exitButton);            
            this.exitButton.onClick = function() {
                self.appObj.launchModule('Welcome');
            }   
            
            this.addChild(this.bedroom);            
            this.bedroom.onClick = function() {
                self.appObj.launchModule('StudentRoom');
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



