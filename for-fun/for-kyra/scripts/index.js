var xhr = new XMLHttpRequest(),
    jsonArr,
    method = "GET",
    jsonRequestURL = "./sources/"

xhr.open(method, jsonRequestURL, true)
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // we convert your JSON into JavaScript object
        jsonArr = JSON.parse(xhr.responseText)

        // we add new value:
        jsonArr.push({"nissan": "sentra", "color": "green"})

        // we send with new request the updated JSON file to the server:
        xhr.open("POST", jsonRequestURL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        // if you want to handle the POST response write (in this case you do not need it):
        // xhr.onreadystatechange = function(){ /* handle POST response */ };
        xhr.send("jsonTxt="+JSON.stringify(jsonArr))
        // but on this place you have to have a server for write updated JSON to the file
    }
}
xhr.send(null)