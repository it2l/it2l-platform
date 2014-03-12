$(document).ready(function() {
	   $("#submit").click(function() {
		   submitWOZ();
	   });
	   $("#submitUser").click(function() {
		   connectWOZ($('#usList').val());
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