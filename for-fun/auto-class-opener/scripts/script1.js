var today = new Date()
const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]
var day = [
    today.getDate(),
    today.getMonth(),
    today.getFullYear(),
]
var tasksToday = []
function GetDay() {
    today = new Date()
}
setInterval(GetDay,60000)

function BetweenDays(t1,t2) {
    return (t2.getTime() - t1.getTime())
}

function ParseTime(time) {
    var colon = time.indexOf(':')
    switch (time.substring(time.length-2,time.length)) {
        case 'am':
            return [parseInt(time.substring(0,colon)),parseInt(time.substring(colon+1,time.length-2))]
        break;
        case 'pm':
            return [parseInt(time.substring(0,colon))+12,parseInt(time.substring(colon+1,time.length-2))]
        break;
    }
}

function NewNotification(title,options) {
    var notification
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification")
    }
    else if (Notification.permission === "granted") {
        notification = new Notification(title,options)
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                notification = new Notification(title,options)
            }
        });
    }
    return notification
}

class Task {
    nameOf = ''
    timeOf = new Date()
    #timeDif = 300000
    #notified = false
    #opened = false
    #iterate
    #notif
    #timeFor
    constructor(name, time) {
        this.nameOf = name
        this.timeOf = time
        if (time.getHours() > 12) {
            this.#timeFor = time.toDateString() + " " + (time.getHours() - 12) + ":" + time.getMinutes() + "pm"
        }
        else {
            this.#timeFor = time.toDateString() + " " + time.getHours() + ":" + time.getMinutes() + "am"
        }
        this.#iterate = setInterval(this.#Notify, 10000)
        console.log("Task today: "+this.nameOf.toUpperCase()+" @"+this.#timeFor)
    }
    #Notify() {
        if (BetweenDays(today, this.timeOf) < this.#timeDif && !this.#notified) {
            this.#notif = NewNotification(this.nameOf.toUpperCase() + " is starting soon!", {
                'body': 'Click now to open the class, otherwise class ' +
                    'will automatically open in 3/2 minutes!',
                'icon': 'images/favicon.ico'
            })
            this.#notified = true
        }
        if (BetweenDays(today, this.timeOf) < (this.#timeDif / 2) && !this.#opened) {
            clearInterval(this.#iterate)
            document.getElementById(this.nameOf).click()
        }
        this.#notif.onClick = function (event) {
            event.preventDefault()
            clearInterval(this.#iterate)
            document.getElementById(this.nameOf).click()
        }
    }
}

function OpenClassWhen() {
    var classTimes = [
        ['ecen106',['monday','wednesday'],'3:15pm'],
        ['cse121b',['tuesday','thursday'],'10:15am'],
        ['cse170',['tuesday','thursday'],'4:09pm'],
        ['wdd130',['tuesday'],'8:00pm'],
    ]
    for (var i = 0; i<classTimes.length; i++) {
        for (var j = 0; j<classTimes[i][1].length; j++) {
            if (days[today.getDay()] == classTimes[i][1][j]) {
                let taskTime = ParseTime(classTimes[i][2])
                let thisTime = new Date(day[2],day[1],day[0],taskTime[0],taskTime[1])
                if (BetweenDays(today,thisTime)>0) {
                    tasksToday.push(new Task(classTimes[i][0],thisTime))
                }
            }
        }
    }
    console.log(tasksToday.length+" task"+"s".substring(0,tasksToday.length)+" for today")
}
