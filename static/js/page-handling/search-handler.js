$(document).ready(function() {
    // Get the search term from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var term = "";
    if(urlParams.has('search')) {
        term = urlParams.get('search');
        $('#term').text(term);
    }
    else {
        redirectMessage(WEB_URL, 'warning', 'No search term entered!');
    }

    var postUrl = API_URL + 'post/search?search_term=' + term;
    var postType = 'get';

    // Get request for all posts that match the search term
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

            // If there are no results, return to the homepage
            if($('#posts').is(':empty')) {
                redirectMessage(WEB_URL, 'warning', 'There are no results!');
            }
        });
    });
});