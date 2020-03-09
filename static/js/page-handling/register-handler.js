$(document).ready(function() { 
    $("#register-form").submit(function(e) { 
		//var username = document.forms["register"]["usernameInput"].value;
		var pass = document.forms["register"]["passwordInput"].value;
		var email = document.forms["register"]["emailInput"].value;
		var forename = document.forms["register"]["forenameInput"].value;
		var urname = document.forms["register"]["surnameInput"].value;
		var DOB = document.forms["register"]["dobInput"].value;
        var veri = document.forms["register"]["verifyPasswordInput"].value;
		var password_blacklist = ["uea","pirate","cove","piratecove","password","topsecret",
		"123", "12345","qwerty","abc",email,forename,urname,DOB];
        if(pass != veri) {
            message('warning', 'Passwords don\'t match!');
            return false;
        }else{
			for(var i = 0; i < password_blacklist.length; i++){
				var word = password_blacklist[i];
				console.log(word);
				console.log(pass)
				if(String(pass).toLowerCase().search(word) > -1){
					message('warning', 'Password contains blacklisted word or sequence: ' + word);
					return false;
				}
			}
		}
        
        var postUrl = 'http://127.0.0.1:5000/account/createUser';
        var postType = 'post';
        var formID = '#register-form';

        e.preventDefault();

		


        formHandler(postType, postUrl, formID, function(response) {
            checkFail(response, function() {
                url = 'http://127.0.0.1:5432/'
                var msgType = "info";
                var msg = "Please verify your email address before logging in.";
                redirectMessage(url, msgType, msg);
            });
        });

        return true;
    });
}); 

//Do we need this?
function getContactFormData(form) {
    // creates a FormData object and adds chips text
    var formData = new FormData(document.getElementById(form));
//    for (var [key, value] of formData.entries()) { console.log('formData', key, value);}
    return formData
}
