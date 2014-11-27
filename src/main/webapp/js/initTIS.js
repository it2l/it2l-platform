$(document).ready(function() {
	   $("#butTIS1").click(function() {
		   submitEmotion("1");
	   });
	   $("#butTIS2").click(function() {
		   submitEmotion("2");
	   });
	   $("#butTIS3").click(function() {
		   submitEmotion("3");
	   });
	   $("#butTIS4").click(function() {
		   submitEmotion("4");
	   });
  
	 });

function submitEmotion(option){
	$.ajax({
		type: 'GET',
		url: "/italk2learn/tis/testTIS?option="+option,
		success: function (data) {
			alert(data);
		},
		error: function (jqXHR, status, error) {
			alert(error);
		}
	});
}