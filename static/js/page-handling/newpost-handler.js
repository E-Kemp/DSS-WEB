$(document).ready(function() {
    $('#newpost-form').submit(function(e) {
        e.preventDefault();

        var postUrl = 'http://127.0.0.1:5000/post/createPost';
        var postType = 'POST';
        var formID = '#newpost-form';

        formHandler(postType, postUrl, formID, function(response) {
			if (response["code"] == "success"){
				window.location.replace('http://127.0.0.1:5432/posts/'+response["post"]["UUID"]);
			}else{
				clearMessages();
				message(response["code"], response["reason"]);
				
			}
            ///message('info', JSON.stringify(response));
            //window.location.replace('http://127.0.0.1:5432/');
        });
    })
    
})