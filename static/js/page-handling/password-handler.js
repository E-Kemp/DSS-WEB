

// A password 'blacklist' that is enforced upon the password
var password_blacklist = ["uea","pirate","cove","piratecove","password","topsecret",
"123", "12345","qwerty","abc"];


// Check that the password is valid (this is also done in the API but is served here to display messages)
function checkValidPassword(pass, veri, password_blacklist){
	//if password dosen't match verification password
	if(pass != veri) {
		message('warning', 'Passwords don\'t match!');
		return false;
	}
	//if password isn't longer then 12 characters
	else if(pass.length <= 11){
        alert(pass.length);
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
	var symbolTypes = 5;
	var returner = false;
	var j = 0;
	var i = 0;	//!  -  / |  0 -  9 |	     |  A  -  Z  | a  -    z | 
	var ranges = [[33, 48], [48, 58] ,[58,65],[65,91],  [97, 123]];
	for(i = 0; i < ranges.length; i++){
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

// Convert the password to ASCII characters
function convertToAsciiArr(target){
	var asciiArr = [];
	var sTarget = String(target);
	for(var i = 0; i < sTarget.length; i++){	asciiArr[i] = target.charCodeAt(i);		}
	return asciiArr;
}