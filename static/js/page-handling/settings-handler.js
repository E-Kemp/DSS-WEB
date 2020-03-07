$(document).ready(function() {
    $('#password-form').submit(function(e) {
        var postUrl = 'http://127.0.0.1:5000/account/changePassword';
        var postType = 'post';
        var formID = '#password-form';

        formHandler(postType, postUrl, formID, function(response) {
            message('success', '')
        });
    })
    
    $('#delete-button').click(function() {
        var postUrl = 'http://127.0.0.1:5000/account/deleteAccount';
        var postType = 'post';
        var formID = '#delete-form';

        formHandler(postType, postUrl, formID, function(response) {
            window.location.replace('http://127.0.0.1:5432/logout')
        });
    });
})