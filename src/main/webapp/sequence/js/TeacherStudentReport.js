// stage content:
(lib.TeacherStudentReport = function(appObj) {
	this.initialize();

    var self = this;
    
    this.appObj = appObj;
    this._interval = 0;
    this.isMenuOpened = false;
    
    // background
    this.bg = new createjs.Shape(
    	new createjs.Graphics().beginFill("#fff").drawRect(0,0,1024,748)
    );
    
    var contentImage = new Image();
    contentImage.src = "./img/"+this.appObj.lang_i18n+"_TeacherStudentReport.png";
    this.contentImage = new createjs.Bitmap(contentImage);
    this.contentImage.setTransform(0,0);  
    
    var menuImage = new Image();
    menuImage.src = "./img/"+this.appObj.lang_i18n+"_TeacherStudentReport_Menu.png";
    this.menuImage = new createjs.Bitmap(menuImage);
    this.menuImage.setTransform(706,0);  
    
    // exit rectangle
    this.rectangleExit=new createjs.Shape();
    this.rectangleExit.alpha = 0.01;
    this.rectangleExit.graphics.beginFill("#000").drawRect(0,0,250,50);
    this.rectangleExit.x=710;
    this.rectangleExit.y=170;
    
    // menu rectangle
    this.rectangleShape=new createjs.Shape();
    this.rectangleShape.alpha = 0.01;
    this.rectangleShape.graphics.beginFill("#fff").drawRect(0,0,250,40);
    this.rectangleShape.x=710;
    this.rectangleShape.y=0;
    
    // class reports rectangle
    this.classReports=new createjs.Shape();
    this.classReports.alpha = 0.01;
    this.classReports.graphics.beginFill("#000").drawRect(0,0,90,75);
    this.classReports.x=120;
    this.classReports.y=610;

}).prototype = p = new createjs.Container();

p.appObj = null;
p._interval = null;
p.isMenuOpened = false;

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
            this.contentImage.onClick = function() {
                if (self.isMenuOpened == true)
                {
                    self.removeChild(self.menuImage);
                    self.isMenuOpened = false;
                }
            }
            this.menuImage.onClick = function() {
                if (self.isMenuOpened == true)
                {
                    self.removeChild(self.menuImage);
                    self.isMenuOpened = false;
                }
            }
            

            var self = this;
            
            this.addChild(this.rectangleShape);
            this.rectangleShape.onClick = function() {
                self.addChild(self.menuImage);
                self.isMenuOpened = true;
                
                self.removeChild(self.rectangleExit);       
                self.addChild(self.rectangleExit);            
                self.rectangleExit.onClick = function() {
                    if (self.isMenuOpened)
                        self.appObj.launchModule('Welcome');
                }
            }
            
            this.addChild(this.rectangleExit);            
            this.rectangleExit.onClick = function() {
                if (self.isMenuOpened)
                    self.appObj.launchModule('Welcome');
            }
            
            this.addChild(this.classReports);
            this.classReports.onClick = function() {
               self.appObj.launchModule('TeacherClassReportDashboard');
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



