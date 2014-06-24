$(document).ready(function() {
	   $("#testConn").hide();	
	   $("#submit").click(function() {
		   submitWOZ();
	   });
	   $("#submitUser").click(function() {
		   $("#testConn").hide();
		   $.ajax({
				type: 'GET',
				url: "/italk2learn/sequence/getUser",
				success: function (data) {
					//JLF: Call connect WOZ. If it's connected or authfail initialises the container.
					connectWOZ($('#usList').val(),data);
				},
				error: function (jqXHR, status, error) {
					$(document).trigger('error');
				}
			});
	   });
	   $("#testConn").click(function() {
		   testConn($('#usList').val());
	   });
	   
	 });

function submitWOZ(){
	var sub = {
       	 "idNextexercise": $('#exList').val(), 
    	 "user": $('#user').val() 	
        };
    $.ajax({
        type: 'POST',
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        url: "insertNextID",
        data: JSON.stringify(sub),
        success: function(data){
        	alert('Change submitted!');
        },
        error : function(jqXHR, status, error) {
           alert('Sorry!, there was a problem');
        },
//        complete : function(jqXHR, status) {
//           alert('Done!');
//        }
    });
}