$(document).ready(function() { 
    $("#register-form").submit(function(e) { 
		var username = document.forms["register"]["usernameInput"].value;
		var pass = document.forms["register"]["passwordInput"].value;
		var email = document.forms["register"]["emailInput"].value;
		var forename = document.forms["register"]["forenameInput"].value;
		var urname = document.forms["register"]["surnameInput"].value;
		var DOB = document.forms["register"]["dobInput"].value;
        var veri = document.forms["register"]["verifyPasswordInput"].value;
		var password_blacklist = ["uea","pirate","cove","piratecove","password","topsecret",
		"123", "12345","qwerty","abc",email,forename,urname,username];
        console.log(DOB);
		if(!checkValidDOB(DOB)){return false;}
		if(!checkValidPassword(pass,veri,password_blacklist)){return false;}
        
        var postUrl = 'http://127.0.0.1:5000/account/createUser';
        var postType = 'post';
        var formID = '#register-form';

        e.preventDefault();

		
//

        formHandler(postType, postUrl, formID, function(response) {
            checkFail(response, function() {
				if (response["code"] == "success"){
					var url = 'http://127.0.0.1:5432/';
					var msgType = "info";
					var msg = "Please verify your email address before logging in.";
					redirectMessage(url, msgType, msg);
				}else{
                    clearMessages();
                    message(response["code"], response["reason"]);
					grecaptcha.reset();
                }
            });
        });

        return true;
    });
}); 

function checkValidDOB(DOB){
	var toofar = new Date("1899-12-31");
	var now = new Date();
	var dob = new Date(DOB);
	
	if(dob < toofar){
		message('warning', 'Birth date cannot be past 1899-12-31');
		return false;
	}
	else if(dob > now){
		message('warning', 'Birth date cannot be in the future');
		return false;
	}
	return true;
}


function checkValidPassword(pass,veri,password_blacklist){
	//if password dosen't match verification password
	if(pass != veri) {
		message('warning', 'Passwords don\'t match!');
		return false;
	}
	//if password isn't longer then 12 characters
	else if(pass.length <= 11){
		message('warning', 'Password must be at least 12 characters long')
		return false;
	}
	//if password is in blacklist of passwords
	else{
		for(var i = 0; i < password_blacklist.length; i++){
			var word = password_blacklist[i];
			if(String(pass).toLowerCase().search(word) > -1){
				message('warning', 'Password contains blacklisted word or sequence: ' + word);
				return false;
			}
		}
	}
	//check for symbols
	var passAsAscii = convertToAsciiArr(pass);
	var counter = 0;
	var counterMax = 3;
	var symbolTypes = 4;
	var returner = false;
	var j = 0;
	var i = 0;	//!  -  / |  0 -  9 |  A  -  Z  | a  -    z | 
	var ranges = [[41, 47], [60, 71], [101,132], [142, 172]];
	for(i = 0; i < symbolTypes; i++){
		for(j = ranges[i][0]; j  < ranges[i][1]; j++){
			if(passAsAscii.indexOf(j)+1 > 0){
				counter++;
				if(counter == counterMax){returner = true;}
				break;
			}
		}
	}
	
	if(!returner){
		message('warning', 'Password must contain at least 1 special character [! - /], one number [0 - 9], one capatalised character [A - Z] and one lower case character [a - z]');
	}
	
	return returner;
}

function convertToAsciiArr(target){
	var asciiArr = [];
	var sTarget = String(target);
	for(var i = 0; i < sTarget.length; i++){	asciiArr[i] = target.charCodeAt(i);		}
	return asciiArr;
}

//Do we need this?
function getContactFormData(form) {
    // creates a FormData object and adds chips text
    var formData = new FormData(document.getElementById(form));
//    for (var [key, value] of formData.entries()) { console.log('formData', key, value);}
    return formData
}
