$(document).ready(function() {
    $('#logout-button').click(function(e) {
        e.preventDefault();

		
        var url = 'http://127.0.0.1:5000/account/sign-out';
        var type = 'get';

        getHandler(type, url, function(response) {
            //message('info', JSON.stringify(response));
			$.removeCookie('S_ID', { path: '/' });
			$.removeCookie('USR_ID', { path: '/' });
            window.location.replace('http://127.0.0.1:5432/')
        });
    })
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
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: reqURL,
        success: callback
    });
}



//clears messages (to overwrite already existing messages)
function clearMessages(){
	$( ".alert" ).remove();
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