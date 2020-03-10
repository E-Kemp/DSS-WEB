$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();

        var postUrl = 'http://127.0.0.1:5000/account/sign-in';
        var postType = 'POST';
        var formID = '#login-form';

        formHandler(postType, postUrl, formID, function(response) {
			checkFail(response, function(){
				//json_ret = JSON.stringify(response)
				if (response["code"] == "success"){
					window.location.replace('http://127.0.0.1:5432/');
				}else{
					clearMessages();
					message(response["code"], response["reason"]);
					
				}
			});
            //message('info', JSON.stringify(response));
            //;
        });
    })
    
})