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

function Task(name,time) {
    this.nameFor = name
    if (time.getHours()>12) {
        this.timeFor = time.toDateString()+" "+(time.getHours()-12)+":"+time.getMinutes()+"pm"
    }
    else {
        this.timeFor = time.toDateString()+" "+time.getHours()+":"+time.getMinutes()+"am"
    }
    let timeDif = 300000
    let nameOf = name
    let timeOf = time
    let iterate
    function Notify() {
        if (BetweenDays(today,timeOf)<timeDif) {
            clearInterval(iterate)
            document.getElementById(nameOf).click()
        }
    }
    iterate = setInterval(Notify,10000)
}

function OpenClassWhen() {
    var classTimes = [
        ['ecen106',['monday','wednesday'],'3:15pm'],
        ['cse121b',['tuesday','thursday'],'10:15am'],
        ['cse170',['tuesday','thursday'],'2:00pm'],
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
    console.log(tasksToday.length+" tasks for today")
}