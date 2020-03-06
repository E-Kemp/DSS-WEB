$(document).ready(function() { 

    getHandler('get', 'http://127.0.0.1:5000/post/getPosts', function(response) {
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

            
            
    //     }
    // }, false)
});
