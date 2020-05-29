var globalJSONfromFile = ""

window.onload = function(){
    var iframe = document.createElement('iframe')
    iframe.id = 'iframe'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    iframe.src = 'scripts/likes.txt'
    var int1 = setInterval(function() {
        let text = $('#iframe')[0].contentDocument.body.firstChild.innerHTML
        if (text.length>0) {
            globalJSONfromFile = JSON.parse(text.toString())
            clearInterval(int1)
        }
    }, 500)
}


function Like() {
    globalJSONfromFile.hearts++
    /*var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile("scripts/likes.txt",2);
    fh.WriteLine(JSON.stringify(globalJSONfromFile));
    fh.Close();*/
    $("#num-likes").text(globalJSONfromFile.hearts)
}

