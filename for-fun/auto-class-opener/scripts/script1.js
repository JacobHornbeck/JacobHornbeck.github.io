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
setInterval(GetDay,42)

function BetweenDays(t1,t2) {
    return (t2.getTime() - t1.getTime())
}

function ParseTime(time) {
    var colon = time.indexOf(':')
    if (time.substring(0,2)=='12' && time.substring(time.length-2,time.length)=='pm') {
        return [12,45]
    }
    else {
        switch (time.substring(time.length-2,time.length)) {
            case 'am':
                return [parseInt(time.substring(0,colon)),parseInt(time.substring(colon+1,time.length-2))]
            break;
            case 'pm':
                return [parseInt(time.substring(0,colon))+12,parseInt(time.substring(colon+1,time.length-2))]
            break;
        }
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

function Task(name,time) {
    this.nameFor = name
    if (time.getHours()>=12) {
        this.timeFor = time.toDateString()+" "+(time.getHours()-12)+":"+time.getMinutes()+"pm"
    }
    else {
        this.timeFor = time.toDateString()+" "+time.getHours()+":"+time.getMinutes()+"am"
    }
    this.time2show = time
    var timeDif = 300000
    var nameOf = name
    var timeOf = time
    var iterate
    var notif
    var notified = false;
    var opened = false;
    function Notify() {
        if (BetweenDays(today,timeOf)<timeDif && !notified) {
            notif = NewNotification(
                nameOf.toUpperCase()+" is starting soon!",
                {
                    'body': 'Click now to open the class, otherwise class '+
                            'will automatically open in 3/2 minutes!',
                    'icon': 'images/favicon.ico'
                }
            )
            notif.onclick = function(event) {
                if (!opened) {
                    event.preventDefault()
                    clearInterval(iterate)
                    document.getElementById(nameOf).click()
                    opened = true;
                }
            }
            notified = true
        }
        if (BetweenDays(today,timeOf)<(timeDif/2) && !opened) {
            clearInterval(iterate)
            document.getElementById(nameOf).click()
            opened = true;
        }
    }
    iterate = setInterval(Notify,10000)
}

function OpenClassWhen() {
    var classTimes = [
        ['cse220c',     [          'tuesday',             'thursday' ],  '3:15pm'],
        ['cse340-team', [          'tuesday',             'thursday' ],  '5:30pm'],
        ['institute',   [                                 'thursday' ],  '7:00pm']
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
    setInterval(ShowTime,501)
}

function P(n) {
    return (("000".substring(0,2-n.toString().length))+n.toString())
}

var timeoutSet = false
var removed = 0
function ShowTime() {
    for (let i = 0; i<tasksToday.length; i++) {
        let something = document.getElementById("timetil"+((i+removed)+1))
        let t2 = BetweenDays(today,tasksToday[i].time2show)
        if (t2>=0) {
            let hr = Math.floor(t2/3600000)
            t2 -= hr*3600000
            let min = Math.floor(t2/60000)
            t2 -= min*60000
            let sec = Math.floor(t2/1000)
            t2 -= sec*1000
            something.innerHTML = "Time til "+tasksToday[i].nameFor.toUpperCase()+":<br><strong>"+P(hr)+" hr "+P(min)+" min "+P(sec)+" sec</strong>"
        }
        else if (!timeoutSet) {
            something.style.right = "-500px"
            setTimeout(() => {
                tasksToday.splice(i,1)
                something.remove()
                removed++
                timeoutSet = false
            }, 500)
            timeoutSet = true
        }
    }
    if (tasksToday.length < document.getElementsByClassName("timetil").length) {
        document.getElementsByClassName("timetil")[document.getElementsByClassName("timetil").length-1].remove()
    }
}
