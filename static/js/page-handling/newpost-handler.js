$(document).ready(function() {
    $('#newpost-form').submit(function(e) {
        e.preventDefault();

        var postUrl = 'http://127.0.0.1:5000/post/createPost';
        var postType = 'POST';
        var formID = '#newpost-form';

        formHandler(postType, postUrl, formID, function(response) {
            message('info', JSON.stringify(response));
            //window.location.replace('http://127.0.0.1:5432/');
        });
    })
    
})