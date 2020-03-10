$(document).ready(function() { 
    // Get the post ID
    var path = window.location.pathname.split('/');
    var uuid = path[path.length - 1];


    // GET HANDLER
    getHandler('get', API_URL+'post/getPosts', function(response) {
        for(var i in response) {
            if(response[i]["UUID"] == uuid) {
                //Add the post
                insertPost(response[i]);
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

    getHandler('get', API_URL+'post/comment/getComments?post_id=' + uuid, function(response2) {
        for(var j in response2) {
            //alert(response2[j]["username"]);
            insertComment(response2[j], uuid);
        }
    });

    //If the commment box is there, add the submit handler
    if($('#newcomment-form').length) {
        $('#postID').val(uuid);
        $('#newcomment-form').submit(function(e) {
            e.preventDefault();
            var postUrl = API_URL+'post/comment/createComment';
            var postType = 'post';
            var formID = '#newcomment-form';

            formHandler(postType, postUrl, formID, function(response2) {
                insertComment(response2["comment"], uuid);
				
            });
        });
    }
});

function deletePostHandler(uuid){
    //delete post listner
	$('#delete-post').click(function(e) {
        e.preventDefault();


        var url = API_URL+'post/deletePost';
		var in_data = {'post_UUID': uuid};

        postHandler(url, in_data, function(response){
            checkFail(response, function() {
                if (response["code"] == "success"){
                    redirectMessage(WEB_URL, response["code"], "Post successfully deleted.");
                }else{
                    clearMessages();
                    message(response["code"], response["reason"]);
                }
            });
        });
    })
}
//function redirectMessage(url, type, msg) {
//    window.location.replace(url + '?msgType=' + type + '&msg=' + msg);
//}



function createDeleteCommentHandler(del_id, comment_uuid, post_uuid){
	$('#'+del_id).click(function() {
        var url = API_URL+'post/comment/deleteComment';
		var in_data = {'comment_UUID': comment_uuid};

		//alert("comment successfully deleted");
		
        postHandler(url, in_data, function(response){
			checkFail(response, function(){
				if (response["code"] == "success"){
					redirectMessage(WEB_URL+'posts/'+post_uuid, "success", "Comment successfully deleted.");
				}else{
					clearMessages();
					message(response["code"], response["reason"]);
				}
				
			});
        });
    });
}


//Add post function
function insertPost(response) {
    var post = $('<div>').addClass('pPost container')
        .append($('<h1>').addClass('pTitle').text(unescapeText(response["heading"])))
        .append($('<h6>').addClass('pDateTime').text(response["date_posted"] + " " + response["time_posted"]))
        .append($('<h5>').addClass('pUser').text(unescapeText(response["username"])))
        .append($('<p>').addClass('pContent').text(unescapeText(response["body"])));

    $('#posts').prepend(post);
}

function insertComment(response, post_uuid) {
	var comment =  $('<div>').addClass('pPost bg-light p-3 m-2')
        .append($('<h6>').addClass('pDateTime').text(response["date_posted"] + " " + response["time_posted"]))
        .append($('<h5>').addClass('pUser').text(unescapeText(response["username"])))
        .append($('<p>').addClass('pContent').text(unescapeText(response["body"])));
    
    if(response["user_UUID"] == $.cookie("USR_ID")) {
        var del_but_id = "delete-comment-"+response["UUID"];
        comment.append($('<a>').attr({
            "class": "btn btn-secondary mt-3",
            "id": del_but_id,
            "value": response["UUID"],
            "href": "#"
        }).text('Delete'));
       
    }

    $('#comments').append(comment);
    createDeleteCommentHandler(del_but_id, response["UUID"], post_uuid);
}