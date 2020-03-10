$(document).ready(function() {
	
    var urlParams = new URLSearchParams(window.location.search);

    if(urlParams.has('msgType'))
        message(urlParams.get('msgType'), urlParams.get('msg'));

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


    $('#search-button').click(function() {
        window.location.replace('http://127.0.0.1:5432/search/' + $("#search-term").val());
    });


});


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





function getCSRF(){
	token = $.ajax({
        type: 'POST',
		xhrFields: { withCredentials: true },
		crossDomain: true,
        url: "http://127.0.0.1:5000/account/getCSRF",
        data: "",
        async: false
    });
	return $.parseJSON(token.responseText)["token"];
	
	
//	return postHandler("", "", function(response){/
//		alert("in getCSRF: "+response["token"])
//		return response["token"];
//	});
	//return token;
}


function secureFormHandler(reqType, reqURL, formID, callback) {
	csrf_token = getCSRF();
	formData = "token="+csrf_token+"&";
    return $.ajax({
        //Access-Control-Allow-Headers: x-requested-with, x-requested-by
       // beforeSend: function(req) {
       //     req.setRequestHeader("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
       // },
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

function redirectMessage(url, type, msg) {
    window.location.replace(url + '?msgType=' + type + '&msg=' + msg);
}

function checkFail(response, success) {
    if(response["code"] == "danger") {
        redirectMessage('http://127.0.0.1:5432/', response["code"], response["reason"]);
    }
    else {
        success();
    }
}

