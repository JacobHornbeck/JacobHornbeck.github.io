document.getElementById("year").innerHTML = new Date().getFullYear()
document.getElementById("updated").innerHTML = "Last Updated: Fri Sep 18 2020 18:04:06"

var sequence = ""
var timeOutOn = false

function PrintDate() {
    var ky = event.keyCode
    sequence+=ky.toString()
    if (sequence=="818769828489") {
        console.log(new Date())
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