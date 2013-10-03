$(document).ready(function() {
	   $("#btn_next").click(function() {
		   nextSequence();
	   });
	 });

function nextSequence(){
    $.ajax({
        type: 'GET',
        url: "nextsequence",
        data: {
            
            },
        success: function(data){
            $("#container").html(data);
//            $("#container").attr({
//                'title' : data,
//                'href' : data.html
//            });
        },
        error : function(jqXHR, status, error) {
           alert('Sorry!, there was a problem');
        },
        complete : function(jqXHR, status) {
           alert('Done!');
        }
    });
}

