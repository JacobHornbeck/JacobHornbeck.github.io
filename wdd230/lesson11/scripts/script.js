const temp = window.location.href

/* Using WebFont to load the fonts */
WebFont.load({ google: { families: [ 'Comfortaa', 'Exo 2' ] } })

/* Show the current date in the footer */
let now = new Date()
let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
let weekDays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
document.querySelector('footer .current-date').innerHTML = weekDays[now.getDay()]+", "
                                                          +months[now.getMonth()]+" "
                                                          +now.getDate()+", "
                                                          +now.getFullYear()

/* Function to open and close menu */
function toggleMenu() {
    var temp = document.getElementsByClassName("toggler")[0]
    temp.classList.toggle("hide")
    if (temp.classList[1]=="hide") document.querySelector(".toggler > a").innerHTML = "&#9776; Menu"
    else document.querySelector(".toggler > a").innerHTML = "&#10006; Close"
}



if (temp.substring(temp.length-10,temp.length) == "/lesson11/") {
    /* Initialize variables to use for fetching town data */
    const townDataURL = 'https://byui-cit230.github.io/weather/data/towndata.json'
    const towns2get = [
        'Preston',
        'Fish Haven',
        'Soda Springs'
    ]

    /* Fetch town data from source */
    fetch(townDataURL)
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            /* Display the town data on the page */
            jsonData['towns'].filter(item => towns2get.includes(item.name))
                .forEach(town => {
                    /* Set the values needed to simple variables */
                    let i = town.photo
                    let n = town.name
                    let m = town.motto
                    let f = town.yearFounded
                    let p = town.currentPopulation
                    let r = town.averageRainfall
                    
                    /* Create needed elements */
                    let div = document.createElement('div')
                    let img = document.createElement('img')
                    let sect = document.createElement('section')
                    let h2 = document.createElement('h2')
                    let spn = document.createElement('span')
                    let p1 = document.createElement('p')
                    let p2 = document.createElement('p')
                    let p3 = document.createElement('p')

                    /* Give the elements content */
                    img.setAttribute('src','./images/'+i)
                    img.setAttribute('alt','header image for '+n)
                    h2.textContent = n
                    spn.textContent = m
                    p1.textContent = 'Year Founded: '+f
                    p2.textContent = 'Population: '+p
                    p3.textContent = 'Annual Rain Fall: '+r

                    /* Move the elements into reality */
                    sect.appendChild(h2)
                    sect.appendChild(spn)
                    sect.appendChild(p1)
                    sect.appendChild(p2)
                    sect.appendChild(p3)
                    div.appendChild(img)
                    div.appendChild(sect)
                    document.querySelector('#towns').appendChild(div)
                })
        })

    /* Stuff for quick links */
    let pages = {
        '🏠 Home': './',
        '🏴󠁵󠁳󠁩󠁤󠁿 Preston': './preston.html',
        '🥤 Soda Springs': './soda-springs.html',
        '🎣 Fish Haven': './fish-haven.html',
        '⛈️ Storm Center': './stormcenter.html',
        '🖼️ Gallery': './gallery.html'
    }

    function openPage(elem) {
        let el = elem.querySelector('h3')
        window.open(pages[el.textContent],'_self')
    }
}
else if (temp.includes('preston') || temp.includes('fish-haven') || temp.includes('soda-springs')) {
    /* If the page is Preston and is Friday show event banner */
    if (temp.includes('preston') && new Date().getDay() == 5) {
        document.getElementById("big-banner").style.display = "grid"
        function closeBanner() {
            document.getElementById("big-banner").style.display = "none"
        }
    }

    /* Make a parseDate function */
    const parseDate = (str => {
        let tYear = now.getFullYear()
        let dt = str.split(' ')
        let tMonth = months.indexOf(dt[0])
        let tDay = dt[1].split('-')
        let tDate = [new Date(tYear,tMonth,tDay[0])]
        if (tDay.length > 1) {
            tDate.push(new Date(tYear,tMonth,tDay[1]))
        }
        return tDate
    })

    /* Function to calculate the months/days until another date */
    const untilThen = ((d1,factor) => {
        let d1Y = now.getFullYear()
        let d2Y = d1.getFullYear()
        let d1M
        let d2M
        switch (factor) {
            case 12:
                d1M = now.getMonth()
                d2M = d1.getMonth()
            break;
            case 1:
                d1M = now.getDate()
                d2M = d1.getDate()
        }

        return ((d2M+factor*d2Y)-(d1M+factor*d1Y));
    })

    const getEventLink = ((name, date1, date2) => {
        const _year = (dt => { return dt.getFullYear() })
        const _month = (dt => { return "0".substring(0,dt.getMonth()>9?0:1)+(dt.getMonth()+1) })
        const _day = (dt => { return "0".substring(0,dt.getDate()>9?0:1)+dt.getDate() })
        return "https://calendar.google.com/calendar/u/0/r/eventedit?text="+name+"&dates="+_year(date1)+""+_month(date1)+""+_day(date1)+"/"+_year(date2)+""+_month(date2)+""+_day(date2)+"&ctz=America%2FBoise&sf=true&output=xml"
    })

    /** This function return the day after the input date... for
     *  some reason the calendar link would show the day before
     *  even when it specifically uses that same date number */
    const nextDay = (dt => {
        let temp = new Date(dt)
        temp.setDate(temp.getDate()+1)
        return temp
    })

    /* Making the 5-day forecast show the days */
    var days = [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ]
    var today = new Date().getDay()
    for (let i = 0; i<5; i++) document.getElementById("day"+(i+1)).innerHTML = days[(today+i)%days.length]

    /* Adding events into the Events Section */
        /* Initialize variables to use for fetching town data */
        const townDataURL = 'https://byui-cit230.github.io/weather/data/towndata.json'

        /* Fetch town data from source */
        fetch(townDataURL)
            .then((response) => {
                return response.json()
            })
            .then((jsonData) => {
                /* Set a variable to the events element */
                let events = document.querySelector('section.events')
                events.innerHTML = ""

                /* Display the town data on the page */
                let eventData = jsonData['towns'].filter(item => temp.includes(item.name.replace(' ','-').toLowerCase()))[0]
                let tempEl = document.createElement('h3')
                tempEl.innerText=eventData.name+" Events"
                events.appendChild(tempEl)
                eventData['events'].forEach((event) => {
                    let sect = document.createElement('section')
                    let h4 = document.createElement('h4')
                    let span1 = document.createElement('span')
                    let span2 = document.createElement('span')
                    let span3 = document.createElement('span')

                    let txt = event.split(': ')
                    let tDate = parseDate(txt[0])
                    h4.innerHTML = txt[1]
                    if (tDate.length > 1) {
                        let eventUrl = getEventLink(txt[1],tDate[0],nextDay(tDate[1]))
                        span1.innerHTML = "When: <a target=\"_blank\" href=\""+eventUrl+"\" class=\"underlined-dotted\">"+months[tDate[0].getMonth()]+" "+tDate[0].getDate()+" to "
                                                  +months[tDate[1].getMonth()]+" "+tDate[1].getDate()+"</a>"
                    }
                    else {
                        let eventUrl = getEventLink(txt[1],tDate[0],nextDay(tDate[0]))
                        span1.innerHTML = "When: <a target=\"_blank\" href=\""+eventUrl+"\" class=\"underlined-dotted\">"+months[tDate[0].getMonth()]+" "+tDate[0].getDate()+"</a>"
                    }
                    
                    let tDate2 = new Date(tDate[tDate.length-1])
                    tDate2.setHours(23,59,59) // Make the temp date be the VERY end of the day
                    if (tDate[0] <= now && now <= tDate2) {
                        span2.innerText = "This event is currently happening!"
                        if (tDate.length > 1) {
                            let tTime = untilThen(tDate[tDate.length-1],1)
                            if (tTime > 1)
                                span3.innerText = "It ends in "+tTime+" day"+"s".substring(0,tTime-1)
                            else if (tTime == 1)
                                span3.innerText = "It ends tomorrow!"
                            else
                                span3.innerText = "It ends today!"
                        }
                        else
                            span3.innerText = "It's happening next year too!"
                    }
                    else if (tDate[tDate.length-1] < now) {
                        span2.innerText = "Sorry, it looks like this event is over."
                        let tempDy = new Date(tDate[0])
                        tempDy.setFullYear(now.getFullYear()+1)
                        let tTime = untilThen(tempDy,12)
                        span3.innerText = "It will happen again in "+tTime+" month"+"s".substring(0,tTime-1)
                    }
                    else {
                        span2.innerText = "This event starts later this year."
                        let tempDy = new Date(tDate[0])
                        tempDy.setFullYear(now.getFullYear()+1)
                        let tTime = untilThen(tDate[0],12)
                        if (tTime > 0)
                            span3.innerText = "It starts in "+tTime+" month"+"s".substring(0,tTime-1)
                        else {
                            tTime = untilThen(tempDy,1)-1
                            if (tTime == 1)
                                span3.innerText = "It starts tomorrow!"
                            else
                                span3.innerText = "It starts in "+tTime+" day"+"s".substring(0,tTime-1)
                        }
                    }


                    events.appendChild(sect)
                          .append(h4, span1, span2, span3)
                })
            })
}
else if (temp.includes('stormcenter.html')) {
    /* Changing the display value for the range input */
    adjustLabel = (elem) => {
        document.querySelector("label[for='severity']").innerHTML = elem.value
    }
    
    /* Making the form help section actually show help! */
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
    var temp2 = null
    for (let i = 0; i<temp[0].length; i++) {
        for (let j = 0; j<helps.length; j++) {
            if (temp[0][i].name == helps[j].name) {
                let elem = document.querySelectorAll('main.form form *[name=\"'+temp[0][i].name+'\"]')
                let el1 = document.querySelector('section.help img')
                let el2 = document.querySelector('section.help h2.title')
                let el3 = document.querySelector('section.help p.details')
                elem.forEach((item) => {
                    item.addEventListener('blur', () => {
                        clearTimeout(temp2)
                        temp2 = setTimeout(() => {
                            el1.src       = helps[0].image
                            el2.innerHTML = helps[0].title
                            el3.innerHTML = helps[0].content
                        }, 500)
                    })
                    item.addEventListener('focus',() => {
                        clearTimeout(temp2)
                        el1.src       = helps[j].image
                        el2.innerHTML = helps[j].title
                        el3.innerHTML = helps[j].content
                    })
                })
            }
        }
    }
}


