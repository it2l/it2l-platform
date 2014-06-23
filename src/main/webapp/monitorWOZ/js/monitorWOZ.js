var internetTime=new Date().toUTCString();
var Woz = {
    connection: null,

    jid_to_id: function (jid) {
        return Strophe.getBareJidFromJid(jid)
            .replace(/@/g, "-")
            .replace(/\./g, "-");
    },
    
    scroll_chat: function (jid_id) {
        var div = $('#chat-' + jid_id + ' .chat-messages').get(0);
        div.scrollTop = div.scrollHeight;
    },

	on_message: function (message) {
		Alert("ACK received");
	    var full_jid = $(message).attr('from');
	    var jid = Strophe.getBareJidFromJid(full_jid);
	    var jid_id = Woz.jid_to_id(jid);
	
	    if ($('#chat-' + jid_id).length === 0) {
	        $('#chat-area').tabs('add', '#chat-' + jid_id, jid);
	        $('#chat-' + jid_id).append(
	            "<div class='chat-messages'></div>" +
	            "<input type='text' class='chat-input'>");
	    }
	    
	    $('#chat-' + jid_id).data('jid', full_jid);
	
	    $('#chat-area').tabs('select', '#chat-' + jid_id);
	    $('#chat-' + jid_id + ' input').focus();
	
	    var composing = $(message).find('composing');
	    if (composing.length > 0) {
	        $('#chat-' + jid_id + ' .chat-messages').append(
	            "<div class='chat-event'>" +
	            Strophe.getNodeFromJid(jid) +
	            " is typing...</div>");
	
	        Woz.scroll_chat(jid_id);
	    }
	
	    var body = $(message).find("html > body");
	
	    if (body.length === 0) {
	        body = $(message).find('body');
	        if (body.length > 0) {
	            body = body.text();
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
	
	    if (body) {
	        // remove notifications since user is now active
	        $('#chat-' + jid_id + ' .chat-event').remove();
	
	        // add the new message
	        $('#chat-' + jid_id + ' .chat-messages').append(
	            "<div class='chat-message'>" +
	            "&lt;<span class='chat-name'>" +
	            Strophe.getNodeFromJid(jid) +
	            "</span>&gt;<span class='chat-text'>" +
	            "</span></div>");
	
	        $('#chat-' + jid_id + ' .chat-message:last .chat-text')
	            .append(body);
	
	        Woz.scroll_chat(jid_id);
	    }
	
	    return true;
		}
};

function connectWOZ (user) {
		$('#chat-area').empty();
		$('#chat-area').append('<ul></ul>');
		var conn = new Strophe.Connection(
	    'http://it2l.dcs.bbk.ac.uk/http-bind/');
	
		conn.connect('woz@it2l-32', 'woz', function (status) {
		    if (status === Strophe.Status.CONNECTED) {
		        $(document).trigger('connected');
		    } else if (status === Strophe.Status.DISCONNECTED) {
		        $(document).trigger('disconnected');
		    }else {
	        	$('#connect').html("Status: "+status);
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

//        $('#disconnect').click(function () {
//            Woz.connection.disconnect();
//            Woz.connection = null;
//        });

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
	
function testConn(user) {
	 var jid = user+'@it2l-32';
	 var body = "SYN";
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
    Woz.connection.addHandler(Woz.on_message,
                              null, "message", "chat");
});

$(document).bind('disconnected', function () {
	$('#connect').html("disconnected");
	Woz.connection = null;
    
    //JLF:Reconnect when it's not connected
    var conn = new Strophe.Connection(
    'http://it2l.dcs.bbk.ac.uk/http-bind/');

    conn.connect('woz@it2l-32', 'woz', function (status) {
	    if (status === Strophe.Status.CONNECTED) {
	        $(document).trigger('connected');
	    } 
	});
    
});