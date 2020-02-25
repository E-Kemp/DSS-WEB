function validateForm() {
    var username = document.forms["login"]["usernameInput"].value;
    var password = document.forms["login"]["passwordInput"].value;

    if(true) { //change when API can return a value
        $("#errorContainer").append("The username/password you entered is incorrect!");
        $("#errorContainer").css("display", "block");
        return false;
    }
    
}