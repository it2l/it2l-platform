			trivDebug = 31
			if( is.ieMac )
			  document.write( '<font size=4>(Note: Internet Explorer for the Macintosh does not support JavaScript access to applets/AJAX. This is a browser limitation, not a shortcoming of the course material. For this reason, Macintosh IE 5 users cannot access course materials incorporating JavaScript/AJAX functions. Please try accessing this course material from a non-Macintosh machine or a non-IE browser on the Macintosh.</font><br /><br />' )
			else if( !is.min )
			  document.write( 'Your browser does not support dynamic html. Please download a current version of either <a href="http://www.microsoft.com/ie/">Microsoft Internet Explorer</a> or <a href="http://www.mozilla.com/en-US/firefox/">Mozilla Firefox </a> and try visiting our site again.  Thank You.<br /><br />' )
			
			var winW = screen.width
			var winH = screen.height
			
			function findWH(){
				if (navigator.appVersion.indexOf('MSIE 8')!=-1 || navigator.appVersion.indexOf('MSIE 7')!=-1) {
			   winW = document.documentElement.clientWidth-16;
			   winH = document.documentElement.clientHeight;
				}
				else
				{
			   winW = (window.innerWidth)? window.innerWidth-16 : document.body.offsetWidth-20
			   winH = (window.innerHeight)? window.innerHeight   : document.body.offsetHeight
				}
			}
			
			function ReFlow() {
				alert("working");
			}

			function resize(frame) { 
				frame.style.width=1100+'px'; frame.style.height=700+'px'; 
			}
			
			onload = init
			
			function init() {
			  findWH()
			}
			
			function SendHighMessage(message)
			{
				setTimeout(function(){alert(message)},5000);
			}

			function SendLowMessage(message)
			{
				setTimeout(function(){alert(message)},5000);
			}
			
			function EnableHelpButton(message)
			{
				setTimeout(function(){alert(message)},5000);
			}