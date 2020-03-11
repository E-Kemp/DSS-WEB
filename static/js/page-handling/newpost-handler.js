$(document).ready(function() {
    checkCookie();

    $('#newpost-form').submit(function(e) {
        e.preventDefault();

        var postUrl = API_URL+'post/createPost';
        var postType = 'POST';
        var formID = '#newpost-form';

        // Send the secure form to create a new post
        secureFormHandler(postType, postUrl, formID, function(response) {
			checkFail(response, function() {
				if (response["code"] == "success"){
					window.location.replace(WEB_URL + 'posts/' + response["post"]["UUID"]);
                } 
                else {
					clearMessages();
					message(response["code"], response["reason"]);
					
				}
			});	
        });
    }); 
});