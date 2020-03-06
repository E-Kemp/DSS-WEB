$(document).ready(function() { 
    $("#register-form").submit(function(e) { 

        var pass = document.forms["register"]["passwordInput"].value;
        var veri = document.forms["register"]["verifyPasswordInput"].value;

        if(pass != veri) {
            $("#errorContainer").html("<strong>Warning:</strong> The passwords " + pass + " " + veri + " do not match!").fadeIn()
            return false;
        }
        
        var postUrl = 'http://127.0.0.1:5000/account/createUser';
        var postType = 'post';
        var formID = '#register-form';
        var successRe = "http://127.0.0.1:5432/";
        var failRe = "http://127.0.0.1:5432/login";

        e.preventDefault();

        formHandler(postType, postUrl, formID, function(response) {
            window.location.replace('http://127.0.0.1:5432/');
        });

        return true;
    });
}); 


function getContactFormData(form) {
    // creates a FormData object and adds chips text
    var formData = new FormData(document.getElementById(form));
//    for (var [key, value] of formData.entries()) { console.log('formData', key, value);}
    return formData
}
