$(document).ready(function() {
    var path = window.location.pathname.split('/');
    var search_term = path[path.length - 1];

    var postUrl = 'http://127.0.0.1:5000/post/search?search_term='+search_term;
    var postType = 'get';

    getHandler(postType, postUrl, function(response) {
        checkFail(response, function() {
            for(var i in response) {
                $('#posts').append($('<div>').addClass('pPost container bg-white py-2 mt-3')
                    .append($('<h1>').addClass('pTitle').append(
                        $('<a>').attr("href", "http://127.0.0.1:5432/posts/" + response[i]["UUID"]).text(response[i]["heading"]))
                    )
                    .append($('<h6>').addClass('pDateTime').text(response[i]["date_posted"] + " " + response[i]["time_posted"]))
                    .append($('<h3>').addClass('pUser').text(response[i]["username"]))
                    .append($('<p>').addClass('pContent').text(response[i]["body"]))
                );
            }
        });
    });
})