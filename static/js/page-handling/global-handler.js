$(document).ready(function() {
    if($('#logout-handler').length) {
        $('#logout-handler').click(function() {
            // Finish this laterrrrr
        });
    }
});



// Post request handler
function formHandler(reqType, reqURL, formID, callback) {        
    return $.ajax({
        //Access-Control-Allow-Headers: x-requested-with, x-requested-by
       // beforeSend: function(req) {
       //     req.setRequestHeader("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
       // },
        type: reqType,
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: reqURL,
        data: $(formID).serialize(),
        success: callback
    });
}

// Get request handler
function getHandler(reqType, reqURL, callback) {
    return $.ajax({
        type: reqType,
        url: reqURL,
        success: callback
    });
}



// Dismissable site message
function message(type, message) {
    $('#main').prepend($('<div>').attr('class', 'alert alert-' + type + ' alert-dismissible')
        .append($('<a>').attr({'href':'#', 'class':'close', 'data-dismiss':'alert', 'aria-label':'close'}).text("\u00d7"))
        .append(messageText(type, message))
    );
}
// Text in the message
function messageText(type, message) {
    switch(type) {
        case 'warning': return '<strong>Warning!</strong> ' + message;
        case 'success': return '<strong>Success!</strong> ' + message;
        case 'info': return '<strong>Intormation!</strong> ' + message;
        case 'danger': return '<strong>Fail!</strong> ' + message;
    }

}