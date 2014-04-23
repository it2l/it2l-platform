$(document).ready(function() {
	nextSequence();
});

function nextSequence(){
    $.ajax({
        type: 'GET',
        url: "sequence/",
        data: {
            
            },
        success: function(data){
            $("#main").html(data);
        },
        error : function(jqXHR, status, error) {
           alert('Sorry!, there was a problem');
        },
        complete : function(jqXHR, status) {
           alert('Done!');
        }
    });
}

