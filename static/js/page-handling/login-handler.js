$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();

        var postUrl = API_URL+'account/sign-in';
        var postType = 'POST';
        var formID = '#login-form';

        // Send the post request to sign in
        formHandler(postType, postUrl, formID, function(response) {
			checkFail(response, function(){
				if (response["code"] == "success"){
					redirectMessage(WEB_URL, 'success', 'You have logged in!');
                }
                else {
					clearMessages();
					message(response["code"], response["reason"]);
				}
			});
        });
    });
});