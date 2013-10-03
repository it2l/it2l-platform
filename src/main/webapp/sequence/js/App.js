(function(ns) {

    /**
     * Constructor
     */
    var App = function(){this.initialize()};
    var p = App.prototype;

    /**
     * Application logic
     *
     * https://github.com/jakesgordon/javascript-state-machine
     *
     * name: Event name
     * from: State(s) name
     * to: State name
     */
    var logic = {
        target: p,
        events: [
            { name: "gotoWelcome",                      from: ["none"],                             to: "Welcome" },
            { name: "gotoStudentLogin",                 from: ["gotoWelcome"],                      to: "StudentLogin" },
            { name: "gotoStudentRoom",                  from: ["gotoStudentLogin"],                 to: "StudentRoom" },
            { name: "gotoStudentConsole",               from: ["gotoStudentConsole"],               to: "StudentConsole" },
            { name: "gotoTeacherLogin",                 from: ["gotoWelcome"],                      to: "TeacherLogin" },
            { name: "gotoTeacherOverview",              from: ["gotoTeacherLogin"],                 to: "TeacherOverview" },
            { name: "gotoTeacherClassReportDashboard",  from: ["gotoTeacherOverview"],              to: "TeacherClassReportDashboard" },
            { name: "gotoTeacherClassReportUsage",      from: ["gotoTeacherClassReportDashboard"],  to: "TeacherClassReportUsage" },
            { name: "gotoTeacherStudentReport",         from: ["gotoTeacherClassReportUsage"],      to: "TeacherStudentReport" }
        ]
    };


    /**
     * Messages dictionary
     */
    p.messages = [];
    p.sounds = [];
    p.isBusy = false;
    p.launchModule = null;
    p.myContent = null;
    p.lang_i18n = null;
    p.lessons = [];
    p.currentLesson = null;
	p.ifrm = null;
	p.lessonSounds = null;
	
    /**
     * Initialize stage
     */
    p.stage = null;
    p.root = null;
    p.soundmanager = null;
 
   p.initialize = function() {

       this.lang_i18n = window.appLanguage;
       this.lessonSounds = Array;

        this.stage = new createjs.Stage(document.getElementById("canvas"));
        this.stage.autoClear = true;
        
        this.myContent = new createjs.DOMElement(document.getElementById("myContent"));
        this.myContent.visible = false;     
        this.stage.addChild(this.myContent);
        this.stage.update();
        
        this.lessons = Array();
        this.lessons.push('MA_GBR_0800CAx0300');
        this.lessons.push('MA_GBR_0850RAx0100');
//        this.lessons.push('MA_GBR_0900KAx0100');
        if (this.lang_i18n == 'en')
            this.lessons.push('MA_GBR_0800KAx0100');

        
        this.currentLesson = null;

         
        var isTouch = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
        if (isTouch) {
            createjs.Touch.enable(this.stage);
        } else {
            this.stage.enableMouseOver();
        }

 };
 
    /**
     * Start ticker & State machine
     */
     
     p.loadSounds = function() {

          // load sounds when SM ready..
         for (var i in this.lessonSounds)
         {
             console.log("LOAD: " + this.lessonSounds[i].id);
             
             soundManager.createSound({
                 id:this.lessonSounds[i].id,
                 url:this.lessonSounds[i].src,
                 autoLoad: true
             });
         }

     }
     
     p.unloadSounds = function() {

          // load sounds when SM ready..
         for (var i in this.lessonSounds)
         {
             console.log("UNLOAD: " + this.lessonSounds[i].id);
             
             soundManager.unload(this.lessonSounds[i].id);
             soundManager.mute(this.lessonSounds[i].id);
             soundManager.destroySound(this.lessonSounds[i].id);
         }

     }
     
    p.start = function() {

        var self = this;

        // prepre soundmng path
        var myPath = window.location.pathname;
        if (myPath.indexOf("index.html") !== -1)
            myPath = myPath.replace('index.html', '');
        if (myPath.indexOf("index-ar.html") !== -1)
            myPath = myPath.replace('index-ar.html', ''); 
                   
        // launch soundmanager
        soundManager.setup({
          useFlashBlock: true,
          preferFlash: false,
          url: myPath, 
          debugMode: false,
          consoleOnly: false,
        }); 
        
         soundManager.onready(function(oStatus) {

          if (!oStatus.success) {
            return false;
          }
          else
          {
               // load sounds when SM ready..
              for (var i in self.sounds)
              {
                  soundManager.createSound({
                      id:self.sounds[i].id,
                      url:self.sounds[i].src,
                      autoLoad: true
                  });
              }
          }
        });

        createjs.Ticker.setFPS(30);
        createjs.Ticker.addListener(this.stage);
        
        var self = this;
        this.stage.onTick = function () {
            
            if (self.queuedModule != null)
            {
                if (!this.isBusy)
                {
                    var evalString = 'self.setup'+self.queuedModule+'();';
                    eval(evalString);
                    self.queuedModule = null;
                }
            }
        }

        StateMachine.create(logic);


		var href = window.location.href.split("=");
        var myVar = href[0].split("?");

		if ((href != undefined) && (myVar[1] == 'load') && (href[1] != undefined))
		    eval('this.setup'+href[1]+'();');
        else
            this.gotoWelcome();
        
//        this.setupStudentConsole();
        
    };



    p.loadCurrentLesson = function() {
        
        var myFrame = document.getElementById("appContainer");
        var myCanvas = document.getElementById("canvas");
        var myContent = document.getElementById("myContent");

        var self = this;
        
        if (this.lessonSounds.length > 0)
            this.unloadSounds();
        
        $.getJSON('./sounds-'+this.lessons[this.currentLesson]+'.js',function(sdata){

            // assign sounds
            self.lessonSounds = new Array;
            $.each(sdata,function(sindex, svalue){ 
                self.lessonSounds.push({ src: svalue, id: sindex });
            });
            
            self.loadSounds();
            
            // launch app
        	whizz.boot("appContainer", self.lessons[self.currentLesson], self.lang_i18n);
            
        });
            
        
        myFrame.setAttribute("style", "display: block; border: none");
        myCanvas.setAttribute("style", "display: none");
        myContent.setAttribute("style", "display: none");
    }

    p.loadCurrentLesson = function() {
        
        var myFrame = document.getElementById("appContainer");
        var myCanvas = document.getElementById("canvas");
        var myContent = document.getElementById("myContent");

        var self = this;
        
        $.getJSON('./sounds-'+this.lessons[this.currentLesson]+'.js',function(sdata){

            // var self = window.a;
            
            // assign sounds
            self.lessonSounds = new Array;
            $.each(sdata,function(sindex, svalue){ 
                self.lessonSounds.push({ src: svalue, id: sindex });
            });
            
            self.loadSounds();
            
            // launch app
        	whizz.boot("appContainer", self.lessons[self.currentLesson], self.lang_i18n);
            
        });
            
        
        myFrame.setAttribute("style", "display: block; border: none");
        myCanvas.setAttribute("style", "display: none");
        myContent.setAttribute("style", "display: none");
    }

    p.startLesson = function() {

        // redirect
        window.location.href = this.lessons[0] + "-" + this.lang_i18n + ".html";

        this.currentLesson = 0;
        this.loadCurrentLesson();
    }
    
    p.endLesson = function() {
        
        if (this.lessonSounds.length > 0)
            this.unloadSounds();
        
        if (this.currentLesson < (this.lessons.length-1))
        {
            this.currentLesson++;
            this.loadCurrentLesson();
        }
        else // loop back to start!
        {
            this.currentLesson=0;
            this.loadCurrentLesson();
        }        
    }

    p.closeLesson = function() {

        var myFrame = document.getElementById("appContainer");
        var myCanvas = document.getElementById("canvas");
        var myContent = document.getElementById("myContent");

        if (this.lessonSounds.length > 0)
            this.unloadSounds();

        myFrame.setAttribute("style", "display: none; border: none");
        myCanvas.setAttribute("style", "display: block");
        myContent.setAttribute("style", "display: block");
//        $('#appContainer').append("");
    }


    p.setMyContent = function(contentHtml) {
        this.myContent.htmlElement.innerHTML = contentHtml;
    }
    
    p.launchModule = function(moduleName) {
        this.queuedModule = moduleName;
        console.log('ADDED ' + moduleName);
    }

    p.hideMyContent = function() {
        this.myContent.visible = false;     
        this.myContent.setTransform(0,0);
    }

    p.showMyContent = function() {
        this.myContent.visible = true;     
    }
    
    p.positionMyContent = function(newX, newY) {
        this.myContent.visible = true;     
        this.myContent.setTransform(newX,newY);
    }

    p.resizeStage = function(resizeUp) {
        
        // resize up from 550px width to mimic 1204
        if (resizeUp === 1) {
            this.stage.scaleX = 1.86;
            this.stage.scaleY = 1.86;
        }
        // resize down to default
        else {
            this.stage.scaleX = 1;
            this.stage.scaleY = 1;
        }
    }


    p.onaftergotoWelcome = function(event, from, to){
        this.setupWelcome();
    };


    p.getI18n = function(tag) {
        return this.messages[tag];
    }

	p._interval = 0;

    /**
     * Welcome Page
     */
    p.setupWelcome = function() {
        this.stage.removeAllChildren();
        this.resizeStage();
        this.welcome = new lib.Welcome(this);
        this.stage.addChild(this.welcome);
    };


    p.setupStudentLogin = function() {
        this.stage.removeAllChildren();
        this.stage.addChild(this.myContent);
        this.studentLogin = new lib.StudentLogin(this);
        this.stage.addChild(this.studentLogin);
    };

    
    p.setupStudentRoom = function() {
        this.stage.removeAllChildren();
        this.studentRoom = new lib.StudentRoom(this);
        this.stage.addChild(this.studentRoom);
    };

    
    p.setupStudentConsole = function() {
        this.stage.removeAllChildren();
        this.studentConsole = new lib.StudentConsole(this);
        this.stage.addChild(this.studentConsole);
    };

    
    p.setupTeacherLogin = function() {
        this.stage.removeAllChildren();
        this.stage.addChild(this.myContent);
        this.teacherLogin = new lib.TeacherLogin(this);
        this.stage.addChild(this.teacherLogin);
    };

    
    p.setupTeacherOverview = function() {
        this.stage.removeAllChildren();
        this.teacherOverview = new lib.TeacherOverview(this);
        this.stage.addChild(this.teacherOverview);
    };

    
    p.setupTeacherClassReportDashboard = function() {
        this.stage.removeAllChildren();
        this.teacherClassReportDashboard = new lib.TeacherClassReportDashboard(this);
        this.stage.addChild(this.teacherClassReportDashboard);
    };

    
    p.setupTeacherClassReportUsage = function() {
        this.stage.removeAllChildren();
        this.teacherClassReportUsage = new lib.TeacherClassReportUsage(this);
        this.stage.addChild(this.teacherClassReportUsage);
    };

    
    p.setupTeacherStudentReport = function() {
        this.stage.removeAllChildren();
        this.teacherStudentReport = new lib.TeacherStudentReport(this);
        this.stage.addChild(this.teacherStudentReport);
    };

    p.stopSound = function(inputSoundTag) {
                
        if(typeof myVar != 'undefined')
            soundManager.stop(inputSoundTag);
            
        self.isBusy = false;
    }
    
	p.playSound = function(inputSoundTags, shouldLoop){

        // handle looping via evalString
        evalString = (shouldLoop === true) ? "window.a.playSound('" + inputSoundTags[0] + "')" : '';

        // if several sound files sent to play one by one - rewrite array
        if (soundIds instanceof Array) {
            var soundIds = inputSoundTags;            
        }
        // else if single tag sent - convert to simple array
        else {
            var soundIds = [inputSoundTags];
        }
        
        // if just one sound to play - launch it
        if (soundIds.length == 1)
        {
            this.isBusy = true;
            var self = this;
            soundManager.play(soundIds[0], {onfinish:function() { self.isBusy = false; }});
        }
        // handle multiple sounds (max 2 for now ;-)
        else
        {
            var self = this;
            soundManager.play(soundIds[0],{
              multiShotEvents: true, 
              onfinish:function() {
                soundManager.play(soundIds[1]);

                if (evalString != '')
                    eval(evalString);
              }
            }); 
        }

	}
		
    ns.App = App;

})(window);

