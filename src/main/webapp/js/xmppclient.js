$(document).ready(function() {
		var conn = new Strophe.Connection(
	    'http://193.61.29.72/http-bind/');
	
		conn.connect('student@it2l.dcs.bbk.ac.uk', 'student', function (status) {
		    if (status === Strophe.Status.CONNECTED) {
		        $(document).trigger('connected');
		    } else if (status === Strophe.Status.DISCONNECTED) {
		        $(document).trigger('disconnected');
		    }
		});
	
		Gab.connection = conn;
	});


