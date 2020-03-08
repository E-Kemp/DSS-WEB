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
						"id": "delete-post",
                        "href": "#",
                    }).text('Delete'));
					deletePostHandler(uuid);
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
            //alert(response2[j]["username"]);
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

            formHandler(postType, postUrl, formID, function(response2) {
                    $('#comments').append(insertComment(response2["comment"]));                
            });
        });
    }
});

function deletePostHandler(uuid){
    //delete post listner
	$('#delete-post').click(function(e) {
        e.preventDefault();


        var url = 'http://127.0.0.1:5000/post/deletePost';
		var in_data = {'post_UUID': uuid};

        postHandler(url, in_data, function(response){
			if (response["code"] == "success"){
				window.location.replace('http://127.0.0.1:5432/');
			}else{
				clearMessages();
				message(response["code"], response["reason"]);
			}
        });
    })
}




function createDeleteCommentHandler(del_id, uuid){
	//alert(del_id);
	$('#'+del_id).click(function(e) {
        e.preventDefault();
		//alert("sg");
        var url = 'http://127.0.0.1:5000/post/comment/deleteComment';
		var in_data = {'comment_UUID': uuid};

        postHandler(url, in_data, function(response){
			if (response["code"] == "success"){
				window.location.replace('http://127.0.0.1:5432/');
			}else{
				clearMessages();
				message(response["code"], response["reason"]);
			}
        });
    })
}


//Add post function
function insertPost(response) {
    return $('<div>').addClass('pPost container bg-white py-2 mt-3')
        .append($('<h1>').addClass('pTitle').text(response["heading"]))
        .append($('<h6>').addClass('pDateTime').text(response["date_posted"] + " " + response["time_posted"]))
        .append($('<h3>').addClass('pUser').text(response["username"]))
        .append($('<p>').addClass('pContent').text(response["body"]));
}

function insertComment(response) {
	new_containier = $('<div>').addClass('pPost container bg-white py-2 mt-3')
        .append($('<h6>').addClass('pDateTime').text(response["date_posted"] + " " + response["time_posted"]))
        .append($('<h3>').addClass('pUser').text(response["username"]))
        .append($('<p>').addClass('pContent').text(response["body"]));
    
		
	if(response["user_UUID"] == $.cookie("USR_ID")) {
		//alert("My comment!");
		var del_but_id = "delete-comment-"+response["UUID"];
		new_containier.append($('<a>').attr({
			"class": "btn btn-secondary mt-3",
			"id": del_but_id,
			"value": response["UUID"],
			"href": "#",
		}).text('Delete'));
		createDeleteCommentHandler(del_but_id, response["UUID"]);
	}
	return new_containier;
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