$(document).ready(function() { 
    $("#login-form").submit(function() { 
        let username = document.forms["login"]["usernameInput"].value;
        let password = document.forms["login"]["passwordInput"].value;

        if(true) { //change when API can return a value
            $("#errorContainer").html("<strong>Warning:</strong> The username: " + username + " / password: " + password + " you entered is incorrect!").fadeIn()
            return false;
        }
    }); 
}); 