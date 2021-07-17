var courses = [
    /* Example:
    {
        'image': [''],  // Use one image or two
        'name': '',     // Give the course a name
        'tags': [''],   // Allows up to three tags
        'rank': 0,      // Will be for sorting by popularity
        'sort-name': '' // Will be for sorting alphabetically
    }
    */
    {
        'img': [
            'images/card-icons/html.png',
            'images/card-icons/css.png'
        ],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/hr82s4"><h3 class="noneT"><span class="htmlT">HTML</span> & <span class="cssT">CSS</span></h3></a>',
        'tags': ['HTML','CSS'],
        'rank': 15,
        'sort-name': 'html/css'
    },
    {
        'img': ['images/card-icons/cpp.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/fu832s"><h3 class="cppT">Consider C++</h3></a>',
        'tags': ['C++'],
        'rank': 12,
        'sort-name': 'cpp'
    },
    {
        'img': ['images/card-icons/javascript.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/8f4sj3"><h3 class="jsT">JavaScript</h3></a>',
        'tags': ['JavaScript'],
        'rank': 13,
        'sort-name': 'javascript'
    },
    {
        'img': ['images/card-icons/pjs.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/p12j7s"><h3 class="pjsT">Process PJS</h3></a>',
        'tags': ['PJS'],
        'rank': 8,
        'sort-name': 'pjs'
    },
    {
        'img': ['images/card-icons/java.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/1a3va"><h3 class="javaT">Master Java</h3></a>',
        'tags': ['Java'],
        'rank': 0,
        'sort-name': 'java'
    },
    {
        'img': ['images/card-icons/python.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/P63tOn"><h3 class="pythonT">Practice Python</h3></a>',
        'tags': ['Python'],
        'rank': 0,
        'sort-name': 'python'
    },
    {
        'img': ['images/card-icons/ruby.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/r85b3y"><h3 class="rubyT">Think Ruby</h3></a>',
        'tags': ['Coming Soon!'],
        'rank': 0,
        'sort-name': 'ruby'
    },
    {
        'img': ['images/card-icons/jquery.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/j3Q12y"><h3 class="jqT">Learn jQuery</h3></a>',
        'tags': ['Coming Soon!'],
        'rank': 0,
        'sort-name': 'jquery'
    },
    {
        'img': ['images/card-icons/php.png'],
        'name': '<a class="course-title-link" onclick="OpenLink(this)" href="courses/p1Hp41"><h3 class="phpT">Discover PHP</h3></a>',
        'tags': ['Coming Soon!'],
        'rank': 0,
        'sort-name': 'php'
    },
]

function LoadCourses() {
    var courseGrid = document.getElementsByClassName('course-grid')[0]
    courseGrid.innerHTML = ""
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
}