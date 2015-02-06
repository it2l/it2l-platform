// For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
        var swfVersionStr = "11.1.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
        var xiSwfUrlStr = "playerProductInstall.swf";
        var flashvars = {
        		flashvarID: $("#flashContent").data("title")
        };
        var params = {};
        params.quality = "high";
        params.bgcolor = "#ffffff";
        params.allowscriptaccess = "sameDomain";
        params.allowfullscreen = "true";
        var attributes = {};
        attributes.id = "iTalk2Learn";
        attributes.name = "iTalk2Learn";
        attributes.align = "middle";
        swfobject.embedSWF(
            "sequence/iTalk2Learn.swf", "flashContent", 
            "800", "600", 
            swfVersionStr, xiSwfUrlStr, 
            flashvars, params, attributes);
        // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
        swfobject.createCSS("#flashContent", "display:block;text-align:left;");

        
			// Each time that the score or question change. Result (score=2/percentage=20/time=327868/help1=3/help2=0/help3=0)
			function callJSInterface(value) {
				//Shows an alert with the exercise's score
				//alert(value);
				//Array with the values
				var res = value.split("/");
				var score=res[0].split("=");
				var percentage=res[1].split("=");
				var time=res[2].split("=");
				var help1=res[3].split("=");
				var help2=res[4].split("=");
				var help3=res[5].split("=");
				var wh = {
				       	 "score": score[1],
				       	 "percentage" : percentage[1],
				       	 "time" : time[1],
				       	 "help1" : help1[1],
				       	 "help2" : help2[1],
				       	 "help3" : help3[1]
				        };
				    $.ajax({
				        type: 'POST',
				        contentType : 'application/json; charset=utf-8',
				        dataType : 'json',
				        url: "sequence/storeWhizzData",
				        data: JSON.stringify(wh),
				        success: function(data){
				        	//alert('Change submitted!');
				        },
				        error : function(jqXHR, status, error) {
				        	//window.location.href = "/italk2learn/login";
				        },
				    });
			}
			
			function arrowButtonEnable(value){
				if (value==true || value=="true" || value=="True") {
					$("#next").removeAttr("disabled");
				}	
				else {
					$("#next").attr("disabled", "disabled");
				}	
			}
			
			function SendHighMessage(message)
			{
				setTimeout(function(){alert(message)},1000);			
			}

			function SendLowMessage(message)
			{
				setTimeout(function(){alert(message)},1000);
			}
			
			function EnableHelpButton(message)
			{
				setTimeout(function(){alert(message)},1000);
			}