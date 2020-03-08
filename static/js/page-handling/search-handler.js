$(document).ready(function() {
    $('#seach_form').submit(function(e) {
        e.preventDefault();
		var search_term = $('#search_term').val()

        var postUrl = 'http://127.0.0.1:5000/post/search?search_term='+search_term;
        var postType = 'get';

        getHandler(postType, postUrl, function(response) {
            message('info', JSON.stringify(response));
            //window.location.replace('http://127.0.0.1:5432/');
        });
    })
    
})