/** Global Helper Functions **/
    var cssRules = (document.all) ? 'rules': 'cssRules'
    function changeCSSStyle(selector, cssProp, cssVal) {
        for (let i = 0; i < document.styleSheets[0][cssRules].length; i++) {
            if (document.styleSheets[0][cssRules][i].selectorText === selector) {
                document.styleSheets[0][cssRules][i].style[cssProp] = cssVal
                return
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

function CloseLoader() {
    let cover = document.querySelector(".page-loader-cover")
        cover.style.transition = "transform 0.5s, opacity 0.5s"
        cover.style.transform = "scale(10)"
        cover.style.opacity = "0"

    setTimeout(() => { cover.style.zIndex = "-1" }, 501)
    if (window.location.pathname.indexOf("start-learning.html")>-1) {
        LoadCourses('close')
    }
    if (GetNotif()) {
        CreateNotif()
        RemoveNotif()
    }
}

setTimeout(CloseLoader, 2000+Math.random()*500)

function OpenCourse(elem) {
    elem.querySelector(".course-title-link").click()
}


function OpenLink(element) {
    event.preventDefault()

    let cover = document.querySelector(".page-loader-cover")
        cover.style.transition = "transform 0.2s, opacity 0.2s"
        cover.style.transform = "scale(1)"
        cover.style.opacity = "1"
        cover.style.zIndex = "999"

    setTimeout(() => { window.open(element.href, "_self") }, 503)
}
function OpenTxtLink(urlTxt) {
    let cover = document.querySelector(".page-loader-cover")
        cover.style.transition = "transform 0.2s, opacity 0.2s"
        cover.style.transform = "scale(1)"
        cover.style.opacity = "1"
        cover.style.zIndex = "999"

    setTimeout(() => { window.open(urlTxt, "_self") }, 503)
}

function SubmitForm(formName) {
    //event.preventDefault()
    /* Fix this right here */
    /* Use onclick for the submit button instead of action="" */
    OpenTxtLink("login.html")
}

function ToggleMenu() {
    const nav = document.querySelector('.mobile-nav')

    if (nav.classList[1] && nav.classList[1] === "show") {
        nav.classList.remove('show')
    }
    else {
        nav.classList.add('show')
    }
}

function ToggleAccountOptions(elem) {
    elem.classList.toggle('showing')
    document.querySelector('.desktopAccountOptions').classList.toggle('show')
}
