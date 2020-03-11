
// URLs for all the JS to use
var API_URL = 'http://127.0.0.1:5000/';
var WEB_URL = 'http://127.0.0.1:5432/';

// When the page loads
$(document).ready(function() {
    
    // Grab the URL parameters
    var urlParams = new URLSearchParams(window.location.search);

    // If there's a message in the parameters, display the message
    if(urlParams.has('msgType')) {
        message(urlParams.get('msgType'), urlParams.get('msg'));
    }

    // If the logout button exists, add a handler to log the user out
    $('#logout-button').click(function() {
        var url = API_URL+'account/sign-out';
        var type = 'get';

        getHandler(type, url, function(response) {
			$.removeCookie('S_ID', { path: '/' });
			$.removeCookie('USR_ID', { path: '/' });
            redirectMessage(WEB_URL, 'info', 'You have been logged out.');
        });
    });

    // Add a search button handler
    $('#search-button').click(function() {
        window.location.replace(WEB_URL+'search?search=' + $("#search-term").val());
    });


});


// ----- Request handlers ----- //

// Handle POST requests without a form
function postHandler(reqURL, in_data, callback){
	return $.ajax({
        type: 'POST',
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: reqURL,
        data: in_data,
        success: callback
    });
}

// Handle POST requests with a CSRF token
function securePostHandler(reqURL, in_data, callback){
	csrf_token = getCSRF();
	formData = "token="+csrf_token+"&";
	
	return $.ajax({
        type: 'POST',
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: reqURL,
        data: formData+in_data,
        success: callback
    });
}

// Handle POST form requests with a CSRF token
function secureFormHandler(reqType, reqURL, formID, callback) {
	csrf_token = getCSRF();
	formData = "token="+csrf_token+"&";
    return $.ajax({
        type: reqType,
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: reqURL,
        data: formData+$(formID).serialize(),
        success: callback
    });
}

// Post request handler
function formHandler(reqType, reqURL, formID, callback) {
    return $.ajax({
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

// Get request handler with asynchronisation disabled
// - Allows the script to check a post's existance before continuing
function getNoSyncHandler(reqType, reqURL, callback) {
    return $.ajax({
        type: reqType,
        async: false,
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: reqURL,
        success: callback
    });
}


// ----- Miscellaneous global functions ----- //

// Unescape text that is escaped in the API for display
function unescapeText(text){
	keywords = {
            '@lt': '<', 
            '@gt': '>', 
            '@apos' : "'" ,  
            '@quot' : '"' ,
            '@amp': '&', 
            '@bksl': '/', 
            };
	for(var key in keywords){
		
		for(var i = 0; i < String(text).search(key)+1; i++){
			text = String(text).replace(key, keywords[key]);
		}
	}
	
	return text;
}


// Get CSRF tokens from the API
function getCSRF(){
	token = $.ajax({
        type: 'POST',
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: API_URL+"account/getCSRF",
        data: "",
        async: false
    });
	return $.parseJSON(token.responseText)["token"];
}

// Clears messages (to overwrite already existing messages)
function clearMessages(){
	$( ".alert" ).remove();
}

// Dismissable site message
function message(type, message) {
    clearMessages();
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

// Redirect to a page with a message
function redirectMessage(url, type, msg) {
    window.location.replace(url + '?msgType=' + type + '&msg=' + msg);
}

// Check whether a request fatally fails, and log the user out if it does.
function checkFail(response, success) {
    if(response["code"] == "danger") {
        redirectMessage(WEB_URL, response["code"], response["reason"]);
    }
    else {
        success();
    }
}

