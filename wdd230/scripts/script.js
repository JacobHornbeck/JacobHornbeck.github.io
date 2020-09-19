// This just makes it easier for me to update this...
var updateWhen = "Fri Sep 18 2020 6:33:31 PM"

// Set the year for copyright
document.getElementById("year").innerHTML = new Date().getFullYear()

// Set the date when last updated
document.getElementById("updated").innerHTML = "Last Updated: "+updateWhen

// Stuff for printing the date when I need it. Lines (11 - 39)
var sequence = ""
var timeOutOn = false

function PrintDate() {
    var ky = event.keyCode
    sequence+=ky.toString()
    if (sequence=="818769828489") {
        let temp = new Date().toString()
        let t1 = temp.substring(0,temp.indexOf("GMT")-1)
        var n1 = parseInt(t1.substring(t1.length-8,t1.length-6))
        if (n1 > 12) {
            console.log(t1.substring(0,t1.length-8)+(n1-12)+t1.substring(t1.length-6,t1.length)+" PM")
        }
        else {
            console.log(t1+" AM")
        }
    }
    if (timeOutOn) {
        clearTimeout(timeout1)
        timeOutOn = false
    }
    else {
        timeOutOn = true
        var timeout1 = setTimeout(() => {
            sequence = ""
            timeOutOn = false
        }, 2000)
    }
}