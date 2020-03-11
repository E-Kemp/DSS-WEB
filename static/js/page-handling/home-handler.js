$(document).ready(function() { 
    // Get request for all posts
    getHandler('get', API_URL+'post/getPosts', function(response) {
        for(var i in response) {
                $('#posts').append($('<div>').addClass('pPost container bg-white py-2 mt-3')
                    .append($('<h1>').addClass('pTitle').append(
                        $('<a>').attr("href", WEB_URL + "posts?postID=" + response[i]["UUID"]).text(unescapeText(response[i]["heading"])))
                    )
                    .append($('<h6>').addClass('pDateTime').text(response[i]["date_posted"] + " " + response[i]["time_posted"]))
                    .append($('<h5>').addClass('pUser').text(unescapeText(response[i]["username"])))
                    .append($('<p>').addClass('pContent').text(unescapeText(response[i]["body"])))
                );
            }
    });
});





