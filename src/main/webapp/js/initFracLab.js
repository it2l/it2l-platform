				var lowMessage;
				$("#done").show();
				$("#help").show();
				$("#done").attr("disabled", "disabled");
				$("#help").attr("disabled", "disabled");
				$('#help').css("background-image", "url(/italk2learn/images/lightbulb_off.png)");
				$('#help').css({ width: '128px', height: '128px'});
				$("#done").click(function() {
					doneButtonPressed();
				});
				$("#next").click(function() {
					arrowButtonPressed();
				});
				$("#help").click(function() {
					helpButtonPressed();
				});
				var config = {
					width: 800,
					height: 600,
					params: { enableDebugging:"0" }

				};
				config.params["disableContextMenu"] = true;
				var u = new UnityObject2(config);

				jQuery(function() {

					var $missingScreen = jQuery("#unityPlayer").find(".missing");
					var $brokenScreen = jQuery("#unityPlayer").find(".broken");
					$missingScreen.hide();
					$brokenScreen.hide();

	                textToSpeech($('#task').text().substring(0,110));

					u.observeProgress(function (progress) {
						switch(progress.pluginStatus) {
							case "broken":
								$brokenScreen.find("a").click(function (e) {
									e.stopPropagation();
									e.preventDefault();
									u.installPlugin();
									return false;
								});
								$brokenScreen.show();
							break;
							case "missing":
								$missingScreen.find("a").click(function (e) {
									e.stopPropagation();
									e.preventDefault();
									u.installPlugin();
									return false;
								});
								$missingScreen.show();
							break;
							case "installed":
								$missingScreen.remove();
							break;
							case "first":
							break;
						}
					});
					u.initPlugin(jQuery("#unityPlayer")[0], "http://it2l.dcs.bbk.ac.uk/italk2learn/sequence/FractionsLab.unity3d");
				});

				function InitFractionsLab(data)
				{
					$.ajax({
						type: 'GET',
				        contentType : 'application/json; charset=utf-8',
				        dataType : 'json',
				        url: "setNewStudentInfo",
				        success: function(data, textStatus, jqXHR){
				        	//doSomething(data.Language,data.StundentInfo,data.TaskInfo)
				        },
				        error : function(jqXHR, status, error) {
				           alert('Sorry!, there was a problem');
				        },
				        complete : function(jqXHR, status) {
				        }
				    });
				}
				
				
				function SendHighMessage(message)
				{
					var json = "{\"method\": \"HighFeedback\", \"parameters\": {\"message\": \"" + message +"\"}}";
					u.getUnity().SendMessage("ExternalInterface", "SendEvent", json);
				}

				function SendLowMessage(message)
				{
					if (message.charAt(0)==='x'){
						$('#help').css("background-image", "url(/italk2learn/images/lightbulb_off.png)");
						helpButtonEnable(false);						
					}
					else {
						$('#help').css("background-image", "url(/italk2learn/images/lightbulb_on.png)");
						helpButtonEnable(true);
						lowMessage=message;
					}
				}
				
				function SendMessageToSupport(message)
				{
					var json = "{\"method\": \"SendMessageToSupport\", \"parameters\": {\"message\": \"" + message +"\"}}";
					u.getUnity().SendMessage("ExternalInterface", "SendEvent", json);
				}
				
				function playSound(message)
				{
					textToSpeech(message);
				}
				
				function doneButtonEnable(value){
					if (value==true)
						$("#done").removeAttr("disabled");
					else	
						$("#done").attr("disabled", "disabled");
				}
				
				function arrowButtonEnable(value){
					if (value==true)
						$("#next").removeAttr("disabled");
					else	
						$("#next").attr("disabled", "disabled");
				}
				
				function helpButtonEnable(value){
					if (value==true)
						$("#help").removeAttr("disabled");
					else	
						$("#help").attr("disabled", "disabled");
				}
				
				
				function SetNewStudentInfo(data)
				{
					$.ajax({
						type: 'POST',
				        contentType : 'application/json; charset=utf-8',
				        dataType : 'json',
				        url: "setNewStudentInfo",
				        data: JSON.stringify(sub),
				        success: function(data, textStatus, jqXHR){
				        	//doSomething()
				        },
				        error : function(jqXHR, status, error) {
				           alert('Sorry!, there was a problem');
				        },
				        complete : function(jqXHR, status) {
				        }
				    });
				}
				
				function doneButtonPressed(){
					var json = "{\"method\": \"doneButtonPressed\"}";
					u.getUnity().SendMessage("ExternalInterface", "SendEvent", json);
				}
				
				function arrowButtonPressed(){
					var json = "{\"method\": \"arrowButtonPressed\"}";
					u.getUnity().SendMessage("ExternalInterface", "SendEvent", json);
				}
				
				function helpButtonPressed(){
					//JLF: Future implementation
					//var json = "{\"method\": \"helpButtonPressed\"}";
					//u.getUnity().SendMessage("ExternalInterface", "SendEvent", json);
					textToSpeech(lowMessage);
					var json = "{\"method\": \"LowFeedback\", \"parameters\": {\"message\": \"" + lowMessage +"\"}}";
					u.getUnity().SendMessage("ExternalInterface", "SendEvent", json);
				}

