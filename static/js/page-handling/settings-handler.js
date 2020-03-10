$(document).ready(function() {
    $('#password-form').submit(function(e) {
		e.preventDefault();
        var postUrl = API_URL+'account/changePassword';
        var postType = 'post';
        var formID = '#password-form';

        formHandler(postType, postUrl, formID, function(response) {
			checkFail(response, function() {
				if (response["code"] == "success"){
					clearMessages();
					message("success", "Password successfully changed.");
					$('#new2_p_in').val('')
					$('#new_p_in').val('')
					$('#old_p_in').val('')
				}else{
					clearMessages();
					message(response["code"], response["reason"]);
					grecaptcha.reset();
				}
			});
        });
    });
    
    $('#delete-button').click(function(e) {
		e.preventDefault();
		
        var postUrl = API_URL+'account/deleteAccount';
        var postType = 'post';
        var formID = '#delete-form';

        formHandler(postType, postUrl, formID, function(response) {
			if (response["code"] == "success"){
				 window.location.replace(WEB_URL)
			}else{
				clearMessages();
				message(response["code"], response["reason"]);
				
			}
           
        });
    });
})