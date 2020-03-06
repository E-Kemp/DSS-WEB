function formHandler(reqType, reqURL, formID, callback) {        
    return $.ajax({
        type: reqType,
        url: reqURL,
        data: $(formID).serialize(),
        success: callback
    });
}

function getHandler(reqType, reqURL, callback) {
    return $.ajax({
        type: reqType,
        url: reqURL,
        success: callback
    });
}