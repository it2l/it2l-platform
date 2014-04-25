$(document).ready(function() {
	nextSequence();
	$("#back").click(function() {
		backExercise();
	});
	$("#next").click(function() {
		nextExercise();
	});
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

function backExercise(){
    $.ajax({
        type: 'GET',
        url: "/sequence/backexercise",
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

function nextExercise(){
    $.ajax({
        type: 'GET',
        url: "/sequence/backexercise",
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

