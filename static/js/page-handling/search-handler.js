$(document).ready(function() {
    var path = window.location.pathname.split('/');
    var search_term = path[path.length - 1];

    var postUrl = API_URL+'post/search?search_term='+search_term;
    var postType = 'get';

    getHandler(postType, postUrl, function(response) {
        checkFail(response, function() {
            for(var i in response) {
                $('#posts').append($('<div>').addClass('pPost container bg-white py-2 mt-3')
                    .append($('<h1>').addClass('pTitle').append(
                        $('<a>').attr("href", WEB_URL+"posts/" + response[i]["UUID"]).text(unescapeText(response[i]["heading"])))
                    )
                    .append($('<h6>').addClass('pDateTime').text(response[i]["date_posted"] + " " + response[i]["time_posted"]))
                    .append($('<h5>').addClass('pUser').text(unescapeText(response[i]["username"])))
                    .append($('<p>').addClass('pContent').text(unescapeText(response[i]["body"])))
                );
            }
        });
    });
})