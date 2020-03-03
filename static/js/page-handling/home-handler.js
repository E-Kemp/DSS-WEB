$(document).ready(function() { 
    //TEST VARIABLES
    var titles = ["title", "title2", "title3", "title4"];
    var users = ["user", "user2", "user3", "user4"];
    var posts = ["post", "post2", "post3", "post4"];
    

    //Insert posts
    for(i = 0; i < titles.length; i+=1) {
        $('#posts').append($('<div>').addClass('pPost container bg-white py-2 mt-3')
            .append($('<h1>').addClass('pTitle').text(titles[i]))
            .append($('<h3>').addClass('pUser').text(users[i]))
            .append($('<p>').addClass('pContent').text(posts[i]))
        );
    }
});
