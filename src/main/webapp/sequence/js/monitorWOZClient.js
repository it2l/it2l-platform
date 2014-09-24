var userWOZ;
var Gab = {
    connection: null,

    jid_to_id: function (jid) {
        return Strophe.getBareJidFromJid(jid)
            .replace(/@/g, "-")
            .replace(/\./g, "-");
    },

    on_roster: function (iq) {
        // set up presence handler and send initial presence
        Gab.connection.addHandler(Gab.on_presence, null, "presence");
        Gab.connection.send($pres());
    },

    pending_subscriber: null,

    on_presence: function (presence) {
        var ptype = $(presence).attr('type');
        var from = $(presence).attr('from');
        var jid_id = Gab.jid_to_id(from);

        return true;
    },

    on_message: function (message) {
	    
        var body = $(message).find("html > body");
        var sender=$(message).attr('from').split("/");
        if (body.length === 0) {
            body = $(message).find('body');
            if (body.length > 0) {
                body = body.text();
				if (body.charAt(0)==='h'){ 
				   var s=body.substring(1,body.lenght);
				   textToSpeech(s);
				   SendHighMessage(s);
				}
				else if (body.localeCompare("SYN")==0){ 
					var jid = sender[0];
					 var body = "SYN+ACK";
				     if (body != "") {			
				         var message = $msg({to: jid,
				                             "type": "chat"})
				             .c('body').t(body).up()
				             .c('active', {xmlns: "http://jabber.org/protocol/chatstates"});
				         Gab.connection.send(message);
				     }
				}
				else if (body.charAt(1)==='*'){
					if (body.charAt(0)==='d'){
						if (body.charAt(2)==='d')
							doneButtonEnable(false);
						else
							arrowButtonEnable(false);
					} else if (body.charAt(0)==='e'){
						if (body.charAt(2)==='d')
							doneButtonEnable(true);
						else
							arrowButtonEnable(true);
					}
				}
				else if (body.charAt(0)==='l'){
				   var s=body.substring(1,body.lenght);
				   EnableHelpButton(s);
				}
				else if (body.charAt(0)==='s'){
				   var s=body.substring(1,body.lenght);
				   textToSpeech(s);
				   SendLowMessage(s);
				}
                else if (body.charAt(0)!=''){ 
                   textToSpeech(body);
                   setTimeout(function(){alert(body)},5000);
				}				   
            } else {
                body = null;
            }
        } else {
            body = body.contents();

            var span = $("<span></span>");
            body.each(function () {
                if (document.importNode) {
                    $(document.importNode(this, true)).appendTo(span);
                } else {
                    // IE workaround
                    span.append(this.xml);
                }
            });

            body = span;
        }

        
        return true;
    },

    scroll_chat: function (jid_id) {
        var div = $('#chat-' + jid_id + ' .chat-messages').get(0);
        div.scrollTop = div.scrollHeight;
    },
  
};

function connectWOZ (user) {

	userWOZ=user;
	var conn = new Strophe.Connection(
        'http://it2l.dcs.bbk.ac.uk/http-bind/');

	//conn.connect(userWOZ+'@it2l.dcs.bbk.ac.uk', userWOZ, function (status) {
	conn.connect(userWOZ+'@it2l-32', userWOZ, function (status) {
		if (status === Strophe.Status.CONNECTED) {
			initContainer();
            $(document).trigger('connected');
        } else if (status === Strophe.Status.DISCONNECTED) {
            $(document).trigger('disconnected');
        } else if (status === Strophe.Status.AUTHFAIL) {
        	initContainer();
        } else {
        	$('#connect').html("Status: "+status);
        	if (status === Strophe.Status.DISCONNECTING) {
        		//JLF:Go to login page when auth fail
        		window.location.href = "/italk2learn/login";
	        	//JLF:Reconnect when it's not connected
	            var conn = new Strophe.Connection(
	            'http://it2l.dcs.bbk.ac.uk/http-bind/');
	
	        	conn.connect(userWOZ+'@it2l-32', userWOZ, function (status) {
	        	    if (status === Strophe.Status.CONNECTED) {
	        	        $(document).trigger('connected');
	        	    } 
	        	});
        	}
        }
    });

    Gab.connection = conn;	
    
};


$(document).bind('connected', function () {
    $('#connect').html("connected");
    var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    Gab.connection.sendIQ(iq, Gab.on_roster);

    Gab.connection.addHandler(Gab.on_message,
                              null, "message", "chat");
});

$(document).bind('disconnected', function () {
	$('#connect').html("disconnected");
    Gab.connection = null;
    Gab.pending_subscriber = null;

    //JLF:Reconnect when it's not connected
    var conn = new Strophe.Connection(
    'http://it2l.dcs.bbk.ac.uk/http-bind/');

	conn.connect(userWOZ+'@it2l-32', userWOZ, function (status) {
	    if (status === Strophe.Status.CONNECTED) {
	        $(document).trigger('connected');
	    } 
	});
    
});

