$(document).ready(function() { 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/post/getPosts', true);
    xhr.send();
    
    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //alert(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            for(var post in response) {
                alert(response.post);
                $('#posts').append($('<div>').addClass('pPost container bg-white py-2 mt-3')
                    .append($('<h1>').addClass('pTitle').text(post.heading))
                    .append($('<h6>').addClass('pDateTime').text(response.date + " " + response.time))
                    //.append($('<h3>').addClass('pUser').text(response.username))
                    .append($('<p>').addClass('pContent').text(response.body))
                );
            }
            
        }
        // else {
        //     alert("It's fucked");        
        // }
    }, false)
    
    
    // //TEST VARIABLES
    // var titles = ["title", "title2", "title3", "title4"];
    // var users = ["user", "user2", "user3", "user4"];
    // var dates = ["01/01/1970", "01/01/1970", "01/01/1970", "01/01/1970"]
    // var times = ["00:00:00", "00:00:00", "00:00:00", "00:00:00"]
    // var posts = ["post", "post2", "post3", "post4"];
    

    // //Insert posts
    // for(i = 0; i < titles.length; i+=1) {
    //    $('#posts').append($('<div>').addClass('pPost container bg-white py-2 mt-3')
    //        .append($('<h1>').addClass('pTitle').text(titles[i]))
    //        .append($('<h6>').addClass('pDateTime').text(dates[i] + " " + times[i]))
    //        .append($('<h3>').addClass('pUser').text(users[i]))
    //        .append($('<p>').addClass('pContent').text(posts[i]))
    //    );
    // }
});
