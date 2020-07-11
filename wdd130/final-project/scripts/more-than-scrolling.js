/** Global Helper Functions **/
var cssRules = (document.all) ? 'rules': 'cssRules';
function changeCSSStyle(selector, cssProp, cssVal) {
    for (let i = 0; i < document.styleSheets[ssMain][cssRules].length; i++) {
        if (document.styleSheets[ssMain][cssRules][i].selectorText === selector) {
            document.styleSheets[ssMain][cssRules][i].style[cssProp] = cssVal;
            return;
        }
    }
}
function getUrlVars() {
    var vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value
    })
    return vars
}
/** Global Helper Functions **/

function AdjustImage() {
    let img1 = document.getElementById("hero")
    img1.style.backgroundPosition = "0 -"+(window.scrollY/2+5)+"px"
    let img2 = document.getElementById("last-call")
    img2.style.backgroundPosition = "0 calc(100% - "+(window.scrollY/3+205)+"px)"
}

function CloseLoader() {
    let cover = document.getElementsByClassName("page-loader-cover")[0]
    cover.style.transition = "transform 0.5s, opacity 0.5s"
    cover.style.transform = "scale(10)"
    cover.style.opacity = "0"
    setTimeout(() => {
        cover.style.zIndex = "-1"
    }, 501);
    if (window.location.pathname === "/start-learning.html") {
        setTimeout(LoadCourses,1500+Math.random()*500,'close')
    }
}

setTimeout(CloseLoader, 2000+Math.random()*500)

function OpenLink(element) {
    event.preventDefault()

    let cover = document.getElementsByClassName("page-loader-cover")[0]
    cover.style.transition = "transform 0.2s, opacity 0.2s"
    cover.style.transform = "scale(1)"
    cover.style.opacity = "1"
    cover.style.zIndex = "999"

    setTimeout(() => {
        window.open(element.href, "_self")
    }, 503);
}
function OpenTxtLink(urlTxt) {
    let cover = document.getElementsByClassName("page-loader-cover")[0]
    cover.style.transition = "transform 0.2s, opacity 0.2s"
    cover.style.transform = "scale(1)"
    cover.style.opacity = "1"
    cover.style.zIndex = "999"

    setTimeout(() => {
        window.open(urlTxt, "_self")
    }, 503);
}

function SubmitForm(formName) {
    //event.preventDefault()
    /* Fix this right here */
    /* Use onclick for the submit button instead of action="" */
    OpenTxtLink("login.html?showPage=form-output-"+formName)
}


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
if (window.location.pathname === "/login.html") {
    setTimeout(ShowCorrectOne,1000,getUrlVars()['showPage'])
}


var courses = [
    /* Example:
    {
        'image': [''], // Use one image or two
        'name': '',    // Give the course a name
        'tags': ['']   // Allows up to three tags
    }
    */
    {
        'image': ['images/html.png','images/css.png'],
        'name': 'Basic Web Development',
        'tags': ['HTML','CSS']
    }
]


function LoadCourses(arg) {
    var courseLoader = document.getElementById('course-loader')
    var container = document.getElementsByClassName('outer-container')[0]
    var courseGrid = document.getElementById('course-grid')
    switch (arg) {
        case 'close':
            courseLoader.className = "closed"
            setTimeout(() => {
                container.style.top = "-999px"
                container.style.left = "-999px"
                courseLoader.style.top = "-999px"
                courseLoader.style.left = "-999px"
            }, 503);
        break;
        case 'load':
            container.style.top = "0"
            container.style.left = "0"
            courseLoader.style.top = "0"
            courseLoader.style.left = "0"
            courseLoader.className = "open"
        break;
    }
}
