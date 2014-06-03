function init() {
    var amq = org.activemq.Amq;
    amq.init({
        uri: 'amq',
        logging: true,
        timeout: 20
    });

    amq.addListener('theBrowser', 'topic.events', function(msg) {
        $('#messages').append('<li>' + msg.textContent + '</li>')
    });

    $('#sendMessage').submit(function() {
        var msg = $('#msg').val();
        amq.sendMessage('queue.process', msg);
        $('#sendMessage').after('<p id="ack">Sent message: "' + msg + '"');
        $("#ack").fadeOut(2000, function () {
            $("#ack").remove();
        });
        return false;
    });
}

$(document).ready(init);
