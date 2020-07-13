function ShowCorrectOne(show) {
    if (document.getElementById(show) !== undefined) {
        var pT = show[0].toUpperCase()+show.substring(1,show.length)
        var _i = pT.indexOf("-")
        if (_i>=0) {
            pT = pT.substring(0,_i)+" "+pT[(_i+1)].toUpperCase()+pT.substring(_i+2,pT.length)
        }
        document.getElementById("page-title").innerText = pT+" | Genius Coding"
        document.getElementById(show).style.display = "block"
        switch (show) {
            case "form-output-fp":
                let email1 = getUrlVars()['email']
                let atI1 = (email1.indexOf("@")>4)?4:email1.indexOf("@")
                let ati1 = email1.indexOf("@")
                document.getElementById('email-fp').innerHTML = email1.substring(0,atI1)+"***"+email1.substring(ati1,email1.length)
                document.getElementById("page-title").innerText = "Forgot Password | Genius Coding"
            break;
            case "form-output-ca":
                let email2 = getUrlVars()['email']
                let atI2 = (email2.indexOf("@")>4)?4:email2.indexOf("@")
                let ati2 = email2.indexOf("@")
                document.getElementById('email-ca').innerHTML = email2.substring(0,atI2)+"***"+email2.substring(ati2,email2.length)
                document.getElementById("page-title").innerText = "Account Created | Genius Coding"
            break;
            case "form-output-li":
                document.getElementById("page-title").innerText = "Logged In | Genius Coding"
            break;
        }
        
    }
}

setTimeout(ShowCorrectOne,1000,getUrlVars()['showPage'])