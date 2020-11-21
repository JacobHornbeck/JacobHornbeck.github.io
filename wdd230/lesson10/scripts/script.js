WebFont.load({
    google: {
        families: [
            'Comfortaa',
            'Exo 2'
        ]
    }
})

let now = new Date()
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
document.querySelector('footer .current-date').innerHTML = weekDays[now.getDay()]+", "
                                                          +months[now.getMonth()]+" "
                                                          +now.getDate()+", "
                                                          +now.getFullYear()

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
