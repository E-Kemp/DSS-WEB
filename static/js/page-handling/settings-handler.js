$(document).ready(function() {
    // Password form handler
    $('#password-form').submit(function(e) {
		e.preventDefault();
        var postUrl = API_URL+'account/changePassword';
        var postType = 'post';
        var formID = '#password-form';
        
        // Perform basic checks before making a request to the API
        if(!checkValidPassword($('#new_p_in').val(), $('#new2_p_in').val(), password_blacklist)) {
            return false;
        }

        // Send request to the API
        secureFormHandler(postType, postUrl, formID, function(response) {
			checkFail(response, function() {
				if (response["code"] == "success") {
					clearMessages();
					message("success", "Password successfully changed.");
					$('#new2_p_in').val('');
					$('#new_p_in').val('');
					$('#old_p_in').val('');
                }
                else {
					clearMessages();
					message(response["code"], response["reason"]);
					grecaptcha.reset();
				}
			});
        });
    });
    

    // Handler for deleting the user account
    $('#delete-button').click(function(e) {
		e.preventDefault();
		
        var postUrl = API_URL+'account/deleteAccount';
        var postType = 'post';
        var formID = '#delete-form';


        secureFormHandler(postType, postUrl, formID, function(response) {
			checkFail(response, function() {
				if (response["code"] == "success"){
					$.removeCookie('S_ID', { path: '/' });
					$.removeCookie('USR_ID', { path: '/' });
					redirectMessage(WEB_URL, "success", "Account successfully deleted.");
				}else{
					clearMessages();
					message(response["code"], response["reason"]);
				}
			});
        });
    });
});