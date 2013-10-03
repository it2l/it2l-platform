// stage content:
(lib.Welcome = function(appObj) {
	this.initialize();

    var self = this;
    
    this.appObj = appObj;
    this._interval = 0;

    // background
    this.bg = new createjs.Shape(
    	new createjs.Graphics().beginFill("#fff").drawRect(0,0,1024,748)
    );

    // intro txt
    var myText = this.appObj.getI18n('Welcome_Intro');
    this.intro = new createjs.Text(myText, "italic 50px Arial", "#000");
    this.intro.textAlign = "center";
    this.intro.lineHeight = 14;
    this.intro.setTransform(511,286);

    // teacher txt
    var myText = this.appObj.getI18n('Welcome_Teacher');
    this.teacher = new createjs.Text(myText, "bold 20px Arial", "#fff");
    this.teacher.textAlign = "left";
    this.teacher.lineHeight = 10;

    // teacher button
    this.teacherButton = new createjs.Container();
    this.myButton1 = new lib.WelcomeButton();
    this.myButton1.gotoAndStop(0);
    this.teacherButton.button = this.teacherButton.addChild(this.myButton1);
    this.teacherButton.button.setTransform(0,0);
    this.teacherButton.desc = this.teacherButton.addChild(this.teacher);
    if (this.appObj.lang_i18n == 'ar')
        this.teacherButton.desc.setTransform(90,19);
    else
        this.teacherButton.desc.setTransform(67,19);

    // student txt
    var myText = this.appObj.getI18n('Welcome_Student');
    this.student = new createjs.Text(myText, "bold 20px Arial", "#fff");
    this.student.textAlign = "left";
    this.student.lineHeight = 10;
        
    // student button
    this.studentButton = new createjs.Container();
    this.myButton2 = new lib.WelcomeButton();
    this.myButton2.gotoAndStop(0);
    this.studentButton.button = this.studentButton.addChild(this.myButton2);
    this.studentButton.button.setTransform(0,0);
    this.studentButton.desc = this.studentButton.addChild(this.student);
    if (this.appObj.lang_i18n == 'ar')
        this.studentButton.desc.setTransform(95,19);
    else
        this.studentButton.desc.setTransform(75,19);

    var header = new Image();
    header.src = "./img/WelcomeTopHeader.png";
    this.headerLogo = new createjs.Bitmap(header);
    this.headerLogo.setTransform(0,0);
    

}).prototype = p = new createjs.Container();

p.appObj = null;
p._interval = null;

var BUILD_INTERFACE     = 0;
var VOID_STATE          = 1;

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
            this.addChild(this.bg, this.intro, this.headerLogo);
        
            // show bee
            this.bee = new lib.Bee();
            this.bee.setTransform(705, 230);
            this.addChild(this.bee);

            // show hamster
            this.hamster = new lib.Hamster();
            this.hamster.setTransform(320, 238);
            this.addChild(this.hamster);
            
            // show teacher button
            this.addChild(this.teacherButton);
            this.teacherButton.setTransform(210, 384);
            this.teacherButton.onMouseOver = function (event) 
            { 
                self.teacherButton.button.gotoAndStop(1);
            };
            this.teacherButton.onMouseOut = function (event) 
            { 
                self.teacherButton.button.gotoAndStop(0);
            };
            this.teacherButton.onPress = function (event) 
            { 
                self.teacherButton.button.gotoAndStop(2);
                self.appObj.playSound('click');
            };
            this.teacherButton.onClick = function (event) 
            { 
                self.appObj.launchModule('TeacherOverview');
            };            
                        
            // show student button
            this.addChild(this.studentButton);
            this.studentButton.setTransform(560, 384);
            this.studentButton.onMouseOver = function (event) 
            { 
                self.studentButton.button.gotoAndStop(1);
            };
            this.studentButton.onMouseOut = function (event) 
            { 
                self.studentButton.button.gotoAndStop(0);
            };
            this.studentButton.onPress = function (event) 
            { 
                self.studentButton.button.gotoAndStop(2);
                self.appObj.playSound('click');
            };
            this.studentButton.onClick = function (event) 
            { 
                self.appObj.launchModule('StudentRoom');
            };
            
            this.myState = VOID_STATE;
            
		    this._interval = setTimeout(function(evt) { self.clearTimeInterval(); }, 1000);
            
        break;


        // state #2
        // ============
        case VOID_STATE:
        
        break;
        
    }

}


lib.Bee = function() {
	this.initialize();
}
lib.Bee._SpriteSheet = new createjs.SpriteSheet({images: ["./img/WelcomeBee.png"], frames: [[0,0,58,55,0,7.35,8.65],[58,0,58,55,0,7.35,8.65],[116,0,58,55,0,7.35,8.65],[174,0,58,55,0,7.35,8.65],[0,55,58,55,0,7.35,8.65],[58,55,58,55,0,7.35,8.65],[116,55,58,55,0,7.35,8.65],[174,55,58,55,0,7.35,8.65],[0,110,58,55,0,7.35,8.65],[58,110,58,55,0,7.35,8.65],[116,110,58,55,0,7.35,8.65],[174,110,58,55,0,7.35,8.65],[0,165,58,55,0,7.35,8.65]]});
var beeeat_p = lib.Bee.prototype = new createjs.BitmapAnimation();
beeeat_p.BitmapAnimation_initialize = beeeat_p.initialize;
beeeat_p.initialize = function() {
	this.BitmapAnimation_initialize(lib.Bee._SpriteSheet);
	this.paused = false;
}


lib.Hamster = function() {
	this.initialize();
}
lib.Hamster._SpriteSheet = new createjs.SpriteSheet({images: ["./img/WelcomeHamster.png"], frames: [[0,0,60,68,0,42.3,41.8],[60,0,60,68,0,42.3,41.8],[120,0,60,68,0,42.3,41.8],[180,0,60,68,0,42.3,41.8],[240,0,60,68,0,42.3,41.8],[300,0,60,68,0,42.3,41.8],[360,0,60,68,0,42.3,41.8],[420,0,60,68,0,42.3,41.8],[0,68,60,68,0,42.3,41.8],[60,68,60,68,0,42.3,41.8],[120,68,60,68,0,42.3,41.8],[180,68,60,68,0,42.3,41.8],[240,68,60,68,0,42.3,41.8],[300,68,60,68,0,42.3,41.8],[360,68,60,68,0,42.3,41.8],[420,68,60,68,0,42.3,41.8],[0,136,60,68,0,42.3,41.8],[60,136,60,68,0,42.3,41.8],[120,136,60,68,0,42.3,41.8],[180,136,60,68,0,42.3,41.8],[240,136,60,68,0,42.3,41.8],[300,136,60,68,0,42.3,41.8],[360,136,60,68,0,42.3,41.8],[420,136,60,68,0,42.3,41.8],[0,204,60,68,0,42.3,41.8],[60,204,60,68,0,42.3,41.8],[120,204,60,68,0,42.3,41.8],[180,204,60,68,0,42.3,41.8],[240,204,60,68,0,42.3,41.8],[300,204,60,68,0,42.3,41.8],[360,204,60,68,0,42.3,41.8],[420,204,60,68,0,42.3,41.8],[0,272,60,68,0,42.3,41.8],[60,272,60,68,0,42.3,41.8],[120,272,60,68,0,42.3,41.8],[180,272,60,68,0,42.3,41.8],[240,272,60,68,0,42.3,41.8],[300,272,60,68,0,42.3,41.8],[360,272,60,68,0,42.3,41.8],[420,272,60,68,0,42.3,41.8],[0,340,60,68,0,42.3,41.8],[60,340,60,68,0,42.3,41.8],[120,340,60,68,0,42.3,41.8],[180,340,60,68,0,42.3,41.8],[240,340,60,68,0,42.3,41.8],[300,340,60,68,0,42.3,41.8],[360,340,60,68,0,42.3,41.8],[420,340,60,68,0,42.3,41.8],[0,408,60,68,0,42.3,41.8],[60,408,60,68,0,42.3,41.8],[120,408,60,68,0,42.3,41.8],[180,408,60,68,0,42.3,41.8],[240,408,60,68,0,42.3,41.8],[300,408,60,68,0,42.3,41.8],[360,408,60,68,0,42.3,41.8],[420,408,60,68,0,42.3,41.8],[0,476,60,68,0,42.3,41.8],[60,476,60,68,0,42.3,41.8],[120,476,60,68,0,42.3,41.8],[180,476,60,68,0,42.3,41.8],[240,476,60,68,0,42.3,41.8],[300,476,60,68,0,42.3,41.8],[360,476,60,68,0,42.3,41.8]]});
var Hamster_p = lib.Hamster.prototype = new createjs.BitmapAnimation();
Hamster_p.BitmapAnimation_initialize = Hamster_p.initialize;
Hamster_p.initialize = function() {
	this.BitmapAnimation_initialize(lib.Hamster._SpriteSheet);
	this.paused = false;
}


lib.WelcomeButton = function() {
	this.initialize();
}
lib.WelcomeButton._SpriteSheet = new createjs.SpriteSheet({images: ["./img/WelcomeButton.png"], frames: [[0,0,251,79,0,9,8.5],[0,79,251,79,0,9,8.5],[0,158,251,79,0,9,8.5],[0,237,251,79,0,9,8.5]]});
var WelcomeButton_p = lib.WelcomeButton.prototype = new createjs.BitmapAnimation();
WelcomeButton_p.BitmapAnimation_initialize = WelcomeButton_p.initialize;
WelcomeButton_p.initialize = function() {
	this.BitmapAnimation_initialize(lib.WelcomeButton._SpriteSheet);
	this.paused = true;
}



