$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();

        var postUrl = API_URL+'account/sign-in';
        var postType = 'POST';
        var formID = '#login-form';

        formHandler(postType, postUrl, formID, function(response) {
			//json_ret = JSON.stringify(response)
			if (response["code"] == "success"){
				window.location.replace(WEB_URL);
			}else{
				clearMessages();
				message(response["code"], response["reason"]);
				
			}
            //message('info', JSON.stringify(response));
            //;
        });
    })
    
})