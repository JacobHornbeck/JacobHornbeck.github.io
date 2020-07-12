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
    }, 501)
    if (window.location.pathname === "/start-learning.html") {
        LoadCourses('close')
    }
}

setTimeout(CloseLoader, 2000+Math.random()*500)

function OpenCourse(elem) {
    elem.getElementsByClassName("course-title-link")[0].click()
}

function OpenLink(element) {
    event.preventDefault()

    let cover = document.getElementsByClassName("page-loader-cover")[0]
    cover.style.transition = "transform 0.2s, opacity 0.2s"
    cover.style.transform = "scale(1)"
    cover.style.opacity = "1"
    cover.style.zIndex = "999"

    setTimeout(() => {
        window.open(element.href, "_self")
    }, 503)
}
function OpenTxtLink(urlTxt) {
    let cover = document.getElementsByClassName("page-loader-cover")[0]
    cover.style.transition = "transform 0.2s, opacity 0.2s"
    cover.style.transform = "scale(1)"
    cover.style.opacity = "1"
    cover.style.zIndex = "999"

    setTimeout(() => {
        window.open(urlTxt, "_self")
    }, 503)
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
        'img': [
            '../images/card-icons/html.png',
            '../images/card-icons/css.png'
        ],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/hr82s4"><h3 class="noneT"><span class="htmlT">HTML</span> & <span class="cssT">CSS</span></h3></a>',
        'tags': ['HTML','CSS'],
        'rank': 15,
        'sort-name': 'html/css'
    },
    {
        'img': ['../images/card-icons/cpp.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/fu832s"><h3 class="cppT">Consider C++</h3></a>',
        'tags': ['C++'],
        'rank': 12,
        'sort-name': 'cpp'
    },
    {
        'img': ['../images/card-icons/javascript.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/8f4sj3"><h3 class="jsT">JavaScript</h3></a>',
        'tags': ['JavaScript'],
        'rank': 13,
        'sort-name': 'javascript'
    },
    {
        'img': ['../images/card-icons/pjs.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/p12j7s"><h3 class="pjsT">Process PJS</h3></a>',
        'tags': ['PJS'],
        'rank': 8,
        'sort-name': 'pjs'
    },
    {
        'img': ['../images/card-icons/java.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/1a3va"><h3 class="javaT">Master Java</h3></a>',
        'tags': ['Java'],
        'rank': 0,
        'sort-name': 'java'
    },
    {
        'img': ['../images/card-icons/python.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/P63tOn"><h3 class="pythonT">Practice Python</h3></a>',
        'tags': ['Python'],
        'rank': 0,
        'sort-name': 'python'
    },
    {
        'img': ['../images/card-icons/ruby.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/r85b3y"><h3 class="rubyT">Think Ruby</h3></a>',
        'tags': ['Coming Soon!'],
        'rank': 0,
        'sort-name': 'ruby'
    },
    {
        'img': ['../images/card-icons/jquery.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/j3Q12y"><h3 class="jqT">Learn jQuery</h3></a>',
        'tags': ['Coming Soon!'],
        'rank': 0,
        'sort-name': 'jquery'
    },
    {
        'img': ['../images/card-icons/php.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/p1Hp41"><h3 class="phpT">Discover PHP</h3></a>',
        'tags': ['Coming Soon!'],
        'rank': 0,
        'sort-name': 'php'
    },
]


function LoadCourses(arg) {
    var courseLoader = document.getElementById('course-loader')
    var container = document.getElementsByClassName('outer-container')[0]
    var courseGrid = document.getElementsByClassName('course-grid')[0]
    var titleCourse = document.querySelector('.courses-offered > h2')
    switch (arg) {
        case 'close':
            courseGrid.innerHTML = ""
            setTimeout(() => {
                for (let i = 0; i < courses.length; i++) {
                    if (courses[i].img.length>1) {
                        courseGrid.innerHTML += "<div onclick=\"OpenCourse(this)\"><div class=\"img-holder two\"><div class=\""+(courses[i].tags[0].toLowerCase())+"\" style=\"background-image: url("+courses[i].img[0]+");\"></div><div class=\""+(courses[i].tags[1].toLowerCase())+"\" style=\"background-image: url("+courses[i].img[1]+")\"></div></div>"+courses[i].name+"<div class=\"tags\" id=\"tags"+i+"\"></div></div>"
                    }
                    else {
                        courseGrid.innerHTML += "<div onclick=\"OpenCourse(this)\"><div class=\"img-holder "+(courses[i]["sort-name"].toLowerCase())+"\"><div style=\""+((courses[i].tags[0]==='C++')?"background-color: #00A0FD; ":"")+"background-image: url("+courses[i].img[0]+")\"></div></div>"+courses[i].name+"<div class=\"tags\" id=\"tags"+i+"\"></div></div>"
                    }
                    for (let j = 0; j < courses[i].tags.length; j++) {
                        let ct = courses[i].tags[j]
                        document.getElementById("tags"+i).innerHTML += "<div class=\"tag "+((i<1)?(courses[i].tags[j].toLowerCase()):(courses[i]["sort-name"].toLowerCase()))+"\">"+courses[i].tags[j]+"</div>"
                    }
                }
                titleCourse.className = 'up'
                changeCSSStyle(
                    ".overflow-handler",
                    "height",
                    "calc((100px * "+(Math.floor(courses.length/3))+") +"+
                    " (20px * "+(Math.floor(courses.length/3)-1)+"))"
                )
                changeCSSStyle(
                    ".course-grid",
                    "grid-template-rows",
                    "repeat("+(Math.floor(courses.length/3)+1)+",100px)"
                )
            }, 1500);
            setTimeout(() => {
                courseLoader.className = "closed"
                setTimeout(() => {
                    container.style.top = "-999px"
                    container.style.left = "-999px"
                    courseLoader.style.top = "-999px"
                    courseLoader.style.left = "-999px"
                }, 503)
            }, 1700+Math.random()*400)
        break;
        case 'load':
            container.style.top = "0"
            container.style.left = "0"
            courseLoader.style.top = "0"
            courseLoader.style.left = "0"
            courseLoader.className = "open"
            titleCourse.className = 'down'
            changeCSSStyle(
                ".overflow-handler",
                "height",
                "calc((100px + 20px) * 2)"
            )
        break;
    }
}

