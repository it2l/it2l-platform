$(document).ready(function() {
	   $("#submit").click(function() {
		   submitWOZ();
	   });
	 });

function submitWOZ(){
	var sub = {
       	 "idNextexercise": parseInt($('#exList').val()), 
    	 "user": $('#user').val() 	
        };
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType : 'json',
        url: "insertNextID",
        //data: JSON.stringfy(sub),
        data: sub,
        success: function(data){
        	alert('Great!');
        },
        error : function(jqXHR, status, error) {
           alert('Sorry!, there was a problem');
        },
        complete : function(jqXHR, status) {
           alert('Done!');
        }
    });
}