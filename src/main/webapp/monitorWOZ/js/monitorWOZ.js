var userWOZ;
var internetTime=new Date().toUTCString();
var Woz = {
    connection: null,

    jid_to_id: function (jid) {
        return Strophe.getBareJidFromJid(jid)
            .replace(/@/g, "-")
            .replace(/\./g, "-");
    },
	
	on_roster: function (iq) {
        // set up presence handler and send initial presence
        Woz.connection.addHandler(Woz.on_presence, null, "presence");
        Woz.connection.send($pres());
    },

    pending_subscriber: null,

    on_presence: function (presence) {
        var ptype = $(presence).attr('type');
        var from = $(presence).attr('from');
        var jid_id = Woz.jid_to_id(from);

        return true;
    },
    
    scroll_chat: function (jid_id) {
        var div = $('#chat-' + jid_id + ' .chat-messages').get(0);
        div.scrollTop = div.scrollHeight;
    },

	on_message: function (message) {
		var sender=$(message).attr('from').split("/");
		var student=sender[0].split("@");
		alert("Connection to "+ student[0]+ " working");
	    return true;
	}
};

function connectWOZ (user, woz) {
		userWOZ=woz;
		$('#chat-area').empty();
		$('#chat-area').append('<ul></ul>');
		var conn = new Strophe.Connection(
	    'http://it2l.dcs.bbk.ac.uk/http-bind/');
	
		conn.connect(userWOZ+'@it2l-32', userWOZ, function (status) {
		    if (status === Strophe.Status.CONNECTED) {
		    	$("#testConn").show();
		 	    $("#nextBHandler").show();
			    //$("#doneBHandler").show();
		        $(document).trigger('connected');
		    } else if (status === Strophe.Status.DISCONNECTED) {
		        $(document).trigger('disconnected');
		    }else {
	        	$('#connect').html("Status: "+status);
	        	if (status === Strophe.Status.DISCONNECTING) {
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
	
		Woz.connection = conn;

		var jid = user+'@it2l-32';
        var jid_id = Woz.jid_to_id(jid);

        $('#chat-area').tabs('add', '#chat-' + jid_id, jid);
        $('#chat-' + jid_id).append(
             "<div class='chat-messages'></div>" +
             "<input type='text' class='chat-input'>");
     
        $('#chat-' + jid_id).data('jid', jid);
     
        $('#chat-area').tabs('select', '#chat-' + jid_id);
        $('#chat-' + jid_id + ' input').focus();
        
        $('#chat-area').tabs().find('.ui-tabs-nav').sortable({axis: 'x'});
        
        $('.chat-input').live('keypress', function (ev) {
            var jid = $(this).parent().data('jid');
            //JLF: If intro key is clicked
            if (ev.which === 13) {
                ev.preventDefault();
                var body = $(this).val();
                if (body != "") {			
	                var message = $msg({to: jid,
	                                    "type": "chat"})
	                    .c('body').t(body).up()
	                    .c('active', {xmlns: "http://jabber.org/protocol/chatstates"});
	                Woz.connection.send(message);
	
	                $(this).parent().find('.chat-messages').append(
	                    "<div class='chat-message'>&lt;" +
	                    "<span class='chat-name me'>" + 
	                    Strophe.getNodeFromJid(Woz.connection.jid) +
	                    "</span>&gt;<span class='chat-text'>" +
	                    "&lt"+internetTime+"&gt;" +
	                    body +
	                    "</span></div>");
	                Woz.scroll_chat(Woz.jid_to_id(jid));
	
	                $(this).val('');
	                $(this).parent().data('composing', false);
                }    
            } else {
            	//JLF: Special functionality to get Internet Time
				$.ajax({
						async: false,
						dataType: 'jsonp',
						type: 'GET',
						url: "http://www.timeapi.org/utc/now.json",
						success: function (data) {
							internetTime = data.dateString;
						},
						error: function (data) {
							console.log("ko");
						}
				});
                var composing = $(this).parent().data('composing');
                if (!composing) {
                    var notify = $msg({to: jid, "type": "chat"})
                        .c('composing', {xmlns: "http://jabber.org/protocol/chatstates"});
                    Woz.connection.send(notify);

                    $(this).parent().data('composing', true);
                }
            }
        });

        var jid = user+'@it2l-32';
        var jid_id = Woz.jid_to_id(jid);

        $('#chat-area').tabs('add', '#chat-' + jid_id, jid);
        $('#chat-' + jid_id).append(
            "<div class='chat-messages'></div>" +
            "<input type='text' class='chat-input'>");
    
        $('#chat-' + jid_id).data('jid', jid);
    
        $('#chat-area').tabs('select', '#chat-' + jid_id);
        $('#chat-' + jid_id + ' input').focus();
    
        $('#chat-jid').val('');
        
        $(this).dialog('close');
        
	};
	
function sendMessage(user, message) {
	 var jid = user+'@it2l-32';
	 var body = message;
     if (body != "") {			
         var message = $msg({to: jid,
                             "type": "chat"})
             .c('body').t(body).up()
             .c('active', {xmlns: "http://jabber.org/protocol/chatstates"});
         Woz.connection.send(message);
     }	
}

$(document).bind('connected', function () {
	$('#connect').html("connected");
	var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    Woz.connection.sendIQ(iq, Woz.on_roster);
    Woz.connection.addHandler(Woz.on_message,
                              null, "message", "chat");
});

$(document).bind('disconnected', function () {
	$('#connect').html("disconnected");
	Woz.connection = null;
    
    //JLF:Reconnect when it's not connected
    var conn = new Strophe.Connection(
    'http://it2l.dcs.bbk.ac.uk/http-bind/');

    conn.connect(userWOZ+'@it2l-32', userWOZ, function (status) {
	    if (status === Strophe.Status.CONNECTED) {
	        $(document).trigger('connected');
	    } 
	});
    
});