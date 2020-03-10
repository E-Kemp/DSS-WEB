$(document).ready(function() {
    $('#logout-button').click(function(e) {
        e.preventDefault();

		$.removeCookie('S_ID', { path: '/' });
		$.removeCookie('USR_ID', { path: '/' });
        var url = API_URL'account/sign-out';
        var type = 'get';

        getHandler(type, url, function(response) {
            //message('info', JSON.stringify(response));
            window.location.replace(WEB_URL)
        });
    })
    
})