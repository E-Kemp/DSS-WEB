$(document).ready(function() { 
    $("#register-form").submit(function(e) { 
        e.preventDefault();

		var username = document.forms["register"]["usernameInput"].value;
		var pass = document.forms["register"]["passwordInput"].value;
		var email = document.forms["register"]["emailInput"].value;
		var forename = document.forms["register"]["forenameInput"].value;
		var urname = document.forms["register"]["surnameInput"].value;
		var DOB = document.forms["register"]["dobInput"].value;
        var veri = document.forms["register"]["verifyPasswordInput"].value;

        password_blacklist.push(email,forename,urname,username);
      
        // First preliminary checks for date of birth and password validity
		if(!checkValidDOB(DOB)) {
            return false;
        }
		if(!checkValidPassword(pass, veri, password_blacklist)) {
            return false;
        }
        
        var postUrl = API_URL+'account/createUser';
        var postType = 'post';
        var formID = '#register-form';

        // Send a form post request to register
        formHandler(postType, postUrl, formID, function(response) {
            checkFail(response, function() {
				if (response["code"] == "success"){
					var url = WEB_URL;
					var msgType = "info";
					var msg = "Please verify your email address before logging in.";
					redirectMessage(url, msgType, msg);
                }
                else {
                    clearMessages();
                    message(response["code"], response["reason"]);
					grecaptcha.reset();
                }
            });
        });

        return true;
    });
}); 

// Check that the DOB is valid
function checkValidDOB(DOB) {
	var toofar = new Date("1899-12-31");
	var now = new Date();
	var dob = new Date(DOB);
	
	if(dob < toofar){message('warning', 'Birth date cannot be past 1899-12-31');return false;}
	else if(dob > now){message('warning', 'Birth date cannot be in the future');	return false;}
	return true;
}

//Do we need this?
function getContactFormData(form) {
    // creates a FormData object and adds chips text
    var formData = new FormData(document.getElementById(form));
    return formData
}
