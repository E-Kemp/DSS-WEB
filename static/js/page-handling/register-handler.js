$(document).ready(function() { 
    $("#register-form").submit(function() { 

        var user = document.forms["register"]["usernameInput"].value;
        var email = document.forms["register"]["emailInput"].value;
        var pass = document.forms["register"]["passwordInput"].value;
        var veri = document.forms["register"]["verifyPasswordInput"].value

        if(pass != veri) {
            $("#errorContainer").html("<strong>Warning:</strong> The passwords " + pass + " " + veri + " do not match!").fadeIn()
            event.preventDefault();
            return false;
        }

        return true;
    }); 
}); 