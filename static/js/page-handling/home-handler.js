$(document).ready(function() { 

    //message('info', 'Welcome to the best pirate-themed forum since the land of the internet! <br><br> Please pay particular atention to our forum rules: <br> 1. Pirates only. <br> 2. Ye follow the code by fear of death. <br> 3. The code be more like guidelines anyway.<br><br>Aaarrrrrrr Happy blogin\' to ya!');

    getHandler('get', API_URL+'post/getPosts', function(response) {
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

    
            
    //     }
    // }, false)
});





