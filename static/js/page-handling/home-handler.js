$(document).ready(function() { 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/post/getPosts', true);
    xhr.send();
    
    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            for(var i in response) {
                $('#posts').append($('<div>').addClass('pPost container bg-white py-2 mt-3')
                    .append($('<h1>').addClass('pTitle').text(response[i]["heading"]))
                    .append($('<h6>').addClass('pDateTime').text(response[i]["date"] + " " + response[i]["time"]))
                    .append($('<h3>').addClass('pUser').text(response[i]["username"]))
                    .append($('<p>').addClass('pContent').text(response[i]["body"]))
                );
            }
            
        }
    }, false)
});
