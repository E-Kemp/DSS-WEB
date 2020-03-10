$(document).ready(function() {
    $('#logout-button').click(function(e) {
        e.preventDefault();

        // Reset cookies on the user's browser
		$.removeCookie('S_ID', { path: '/' });
        $.removeCookie('USR_ID', { path: '/' });
        
        var url = API_URL+'account/sign-out';
        var type = 'get';

        // Send the logout request to the API, which will reset the cookies on the API end
        getHandler(type, url, function(response) {
            window.location.replace(WEB_URL)
        });
    })
    
})