$(document).ready(function() { 
    var path = window.location.pathname.split('/');
    var uuid = path[path.length - 1];

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/post/getPosts', true);
    xhr.send();
    
    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            for(var i in response) {
                if(response[i]["UUID"] == uuid) {
                    //Add the post
                    $('#posts').append(insertPost(response[i]));

                    // $('#comments').append(insertComments(response[i]));

                    //Add a delete button if necessary
                    if(response[i]["user_UUID"] = $.cookie("USR_ID")) {
                        $('#posts').append($('<a>').attr({
                            "class": "btn btn-secondary mt-3",
                            "href": "/home",
                        }).text('Delete'));
                    }
                    else {
                        alert(response[i]["user_UUID"] + "\n" + $.cookie("USR_ID"));
                    }

                    //Comments


                    break;
                }
            }
            
        }
    }, false)
});


//Add post function
function insertPost(response) {
    return $('<div>').addClass('pPost container bg-white py-2 mt-3')
        .append($('<h1>').addClass('pTitle').text(response["heading"]))
        .append($('<h6>').addClass('pDateTime').text(response["date"] + " " + response["time"]))
        .append($('<h3>').addClass('pUser').text(response["username"]))
        .append($('<p>').addClass('pContent').text(response["body"]));
}


// fucntion getComments(post) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://127.0.0.1:5000/post/getPosts', true);
//     xhr.send();
    
//     xhr.addEventListener('readystatechange', function() {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var response = JSON.parse(xhr.responseText);
//     });

//     return 0;
// }