// For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
            var swfVersionStr = "11.1.0";
            // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {
                        question_file: $("#flashContent").data("brd"),
                        BehaviorRecorderMode:"AuthorTimeTutoring",
                        remoteSocketURL: "it2l.dcs.bbk.ac.uk",
                        remoteSocketPort: "1502",
                        Logging: "ClientToLogServer",
                        log_service_url: "http://it2l.dcs.bbk.ac.uk/italk2learn/ctatlogserver/",
                        dataset_name:"CTAT_Example_Dataset",
                        dataset_level_name1:"Unit1",
                        dataset_level_type1:"unit",
                        dataset_level_name2:"Section1",
                        dataset_level_type2:"section",
                        problem_name:"CTAT_Example_Problem",
                        user_guid:"CTAT_Example_User",
                        session_id:"CTAT_Example_Session2",
                        source_id:"PACT_CTAT_FLASH",
                        DeliverUsingOLI:"false"
            };
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = $("#flashContent").data("title");
            attributes.name = $("#flashContent").data("title");
            attributes.align = "middle";
            swfobject.embedSWF(
            	"sequence/"+$("#flashContent").data("title")+".swf", "flashContent", 
                "1024", "768", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#flashContent", "display:block;text-align:left;");
            
            function SendHighMessage(message)
			{
            	setTimeout(function(){alert(message)},5000);
			}

			function SendLowMessage(message)
			{
				setTimeout(function(){alert(message)},5000);
			}