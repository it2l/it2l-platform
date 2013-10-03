// stage content:
(lib.StudentLogin = function(appObj) {
	this.initialize();

    var self = this;
    
    this.appObj = appObj;
    this._interval = 0;
    
    // background
    this.bg = new createjs.Shape(
    	new createjs.Graphics().beginFill("#fff").drawRect(0,0,1024,748)
    );

    // myContent    
    this.myContentHtml = '';
    this.myContentHtml += '<table border=0 cellpadding=10 cellspacing=0 class="LoginTable">';
    this.myContentHtml += '<tr>';
    this.myContentHtml += '    <td colspan="2">' +  this.appObj.getI18n('StudentLogin_Intro')  + '</td>';
    this.myContentHtml += '</tr>';    
    this.myContentHtml += '<tr>';
    this.myContentHtml += '    <td>' +  this.appObj.getI18n('StudentLogin_User')  + ':</td>';
    this.myContentHtml += '    <td><input id="loginUser" type="text"></td>';
    this.myContentHtml += '</tr>';
    this.myContentHtml += '<tr>';
    this.myContentHtml += '    <td>' +  this.appObj.getI18n('StudentLogin_Password')  + ':</td>';
    this.myContentHtml += '    <td><input id="loginPassword" type="password"></td>';
    this.myContentHtml += '</tr>';
    this.myContentHtml += '<tr>';
    this.myContentHtml += '    <td></td>';
    this.myContentHtml += '    <td><input type="button" class="whizzButton" value="' +  this.appObj.getI18n('StudentLogin_Login')  + '" onClick="a.studentLogin.validateLogin();"></td>';
    this.myContentHtml += '</tr>';
    this.myContentHtml += '</table>';
    this.appObj.setMyContent(this.myContentHtml);
    
    var header = new Image();
    header.src = "./img/WelcomeTopHeader.png";
    this.headerLogo = new createjs.Bitmap(header);
    this.headerLogo.setTransform(0,0);

}).prototype = p = new createjs.Container();

p.appObj = null;
p._interval = null;

var BUILD_INTERFACE          = 0;
var VOID_STATE               = 1;

p.myState = BUILD_INTERFACE;

p.validateLogin = function()
{
    if ((document.getElementById("loginUser").value.toLowerCase() == 'user2') && (document.getElementById("loginPassword").value.toLowerCase() == 'password2'))
    {
        // login teacher
        this.appObj.setMyContent('');
        this.appObj.hideMyContent();
        this.appObj.setupStudentRoom();
    }
    else
    {
        // error!
        var errorContent = this.myContentHtml.replace(this.appObj.getI18n('StudentLogin_Intro'), this.appObj.getI18n('StudentLogin_Intro') + "<br/><span style='color:red'>"+ this.appObj.getI18n('StudentLogin_Error') +"</span>");
        
        this.appObj.setMyContent(errorContent);
        window.scrollTo(0,0);
    }
}

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
            this.addChild(this.bg, this.headerLogo);
            

            this.appObj.showMyContent();
            this.appObj.positionMyContent(260, 200);
            
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



