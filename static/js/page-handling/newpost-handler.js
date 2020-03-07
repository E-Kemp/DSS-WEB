$(document).ready(function() {
    $('#newpost').submit(function(e) {
        var postUrl = 'http://127.0.0.1:5000/post/createPost';
        var postType = 'post';
        var formID = '#register-form';

        formHandler(postType, postUrl, formID, function(response) {
            var uuid = response["post"]["UUID"];
            window.location.replace('http://127.0.0.1:5432/');
        });
    })
    
})