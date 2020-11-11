const temp = window.location.href


WebFont.load({
    google: {
        families: [
            'Comfortaa',
            'Exo 2'
        ]
    }
})

document.getElementsByClassName('last-updated')[0].innerHTML = "Last Updated: "+document.lastModified

function toggleMenu() {
    var temp = document.getElementsByClassName("toggler")[0]
    temp.classList.toggle("hide")
    if (temp.classList[1]=="hide") {
        document.querySelector(".toggler > a").innerHTML = "&#9776; Menu"
    }
    else {
        document.querySelector(".toggler > a").innerHTML = "&#10006; Close"
    }
}

if (new Date().getDay() == 5) {
    document.getElementById("big-banner").style.display = "grid"
}

function closeBanner() {
    document.getElementById("big-banner").style.display = "none"
}


/* For the 5-day weather forecast */
if (temp.substring(temp.length-12,temp.length) == "preston.html") {
    var days = [
        "Sun",
        "Mon",
        "Tues",
        "Wed",
        "Thurs",
        "Fri",
        "Sat"
    ]
    var today = new Date().getDay()
    for (let i = 0; i<5; i++) {
        document.getElementById("day"+(i+1)).innerHTML = days[(today+i)%days.length]
    }
}

if (temp.substring(temp.length-16,temp.length) == "stormcenter.html") {
    adjustLabel = (elem) => {
        document.querySelector("label[for='severity']").innerHTML = elem.value
    }
    
    const helps = [
        {
            name:       'none',
            image:      './images/form-help.png',
            title:      'Form Help',
            content:    'Select an input field to show specific help info.'
        },
        {
            name:       'name',
            image:      './images/name.png',
            title:      'Full Name',
            content:    'Enter your first and last name.<br>No need for middle names or initials'
        },
        {
            name:       'email',
            image:      './images/email.png',
            title:      'Email',
            content:    'Enter an email that works best for you.'
        },
        {
            name:       'phone',
            image:      './images/phone.png',
            title:      'Phone Number',
            content:    'Enter the best phone number for you.'
        },
        {
            name:       'zip',
            image:      './images/zip-code.png',
            title:      'Zip Code',
            content:    'Enter your zip code.'
        },
        {
            name:       'storm-date',
            image:      './images/storm-date.png',
            title:      'Storm Date',
            content:    'When did the storm start?<br>If you don\'t know when it started just select the date that you first saw it.'
        },
        {
            name:       'weather-types',
            image:      './images/storm-type.png',
            title:      'Storm Type',
            content:    'What type of storm is it?<br>Select from the list or type something else.'
        },
        {
            name:       'severity',
            image:      './images/storm-severity.png',
            title:      'Storm Severity',
            content:    'How bad is the storm?<br>1 = very calm, 10 = very destructive.'
        },
        {
            name:       'region',
            image:      './images/region.png',
            title:      'Storm Region',
            content:    'What area is the storm in?<br>Either select from the list, or type your own.'
        },
        {
            name:       'in-danger',
            image:      './images/in-danger.png',
            title:      'In Danger?',
            content:    'Are you in danger?<br>Select:<ul><li>"Yes" if you are currently in danger</li><li>"Maybe" if you aren\'t sure or will be</li><li>"No" if you aren\'t or won\'t</li></ul>'
        },
        {
            name:       'additional-comments',
            image:      './images/additional-comments.png',
            title:      'Additional Comments',
            content:    'Is there any other information that you want to share?'
        },
    ]
    
    let temp = document.forms
    for (let i = 0; i<temp[0].length; i++) {
        for (let j = 0; j<helps.length; j++) {
            if (temp[0][i].name == helps[j].name) {
                let elem = document.querySelectorAll('main.form form *[name=\"'+temp[0][i].name+'\"]')
                let el1 = document.querySelector('section.help img')
                let el2 = document.querySelector('section.help h2.title')
                let el3 = document.querySelector('section.help p.details')
                elem.forEach((item) => {
                    item.addEventListener('blur', () => {
                        el1.src       = helps[0].image
                        el2.innerHTML = helps[0].title
                        el3.innerHTML = helps[0].content
                    })
                    item.addEventListener('focus',() => {
                        el1.src       = helps[j].image
                        el2.innerHTML = helps[j].title
                        el3.innerHTML = helps[j].content
                    })
                })
            }
        }
    }
}


