$(document).ready(function() { 
    // Get the post ID
    var path = window.location.pathname.split('/');
    var uuid = path[path.length - 1];


    // GET HANDLER
    getHandler('get', 'http://127.0.0.1:5000/post/getPosts', function(response) {
        for(var i in response) {
            if(response[i]["UUID"] == uuid) {
                //Add the post
                $('#posts').append(insertPost(response[i]));

                //alert(response[i]["user_UUID"] + "\n" + $.cookie("USR_ID"));

                //Add a delete button if necessary
                if(response[i]["user_UUID"] == $.cookie("USR_ID")) {
                    $('#posts').append($('<a>').attr({
                        "class": "btn btn-secondary mt-3",
                        "href": "/home",
                    }).text('Delete'));
                }
                else {
                }


                break;
            }
        }
    });

    
    //Comments

    getHandler('get', 'http://127.0.0.1:5000/post/comment/getComments?post_id=' + uuid, function(response2) {
        for(var j in response2) {
            alert(response2[j]["username"]);
            $('#comments').append(insertComment(response2[j]));
        }
    });

    //If the commment box is there, add the submit handler
    if($('#newpost-form').length) {
        $('#postID').val(uuid);
        $('#newpost-form').submit(function(e) {
            e.preventDefault();
            var postUrl = 'http://127.0.0.1:5000/post/comment/createComment';
            var postType = 'post';
            var formID = '#newpost-form';

            formHandler(postType, postUrl, formID, function(response) {
                $('#comments').append(insertComment(response));
            });
        });
    }

    
});


//Add post function
function insertPost(response) {
    return $('<div>').addClass('pPost container bg-white py-2 mt-3')
        .append($('<h1>').addClass('pTitle').text(response["heading"]))
        .append($('<h6>').addClass('pDateTime').text(response["date_posted"] + " " + response["time_posted"]))
        .append($('<h3>').addClass('pUser').text(response["username"]))
        .append($('<p>').addClass('pContent').text(response["body"]));
}

function insertComment(response) {
    return $('<div>').addClass('pPost container bg-white py-2 mt-3')
        .append($('<h6>').addClass('pDateTime').text(response["date_posted"] + " " + response["time_posted"]))
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