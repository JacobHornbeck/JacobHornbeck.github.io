const code = [
    "let legs = [\"snake\": 0, \"snail\": 1, \"person\": 2,<br><span></span> <span></span> <span></span>\"dog\": 4, \"butterfly\": 6, \"crab\": 8]",
    "let total = 0;",
    "for (name, count) in legs {",
    "<span></span>total += count;",
    "}",
    "print (\"there are \\(total) legs\")"
]
const cnt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const sequence = [
    ["A","[\"snake\": 0, ...]","/",        "/","/"," (1)"],
    ["B","[\"snake\": 0, ...]",  0,        "/","/"," (2)"],
    ["C","[\"snake\": 0, ...]",  0,    "snake",  0," (3)"],
    ["D","[\"snake\": 0, ...]",  0,    "snake",  0," (4)"],
    ["C","[\"snake\": 0, ...]",  0,    "snail",  1," (3)"],
    ["D","[\"snake\": 0, ...]",  1,    "snail",  1," (4)"],
    ["C","[\"snake\": 0, ...]",  1,   "person",  2," (3)"],
    ["D","[\"snake\": 0, ...]",  3,   "person",  2," (4)"],
    ["C","[\"snake\": 0, ...]",  3,      "dog",  4," (3)"],
    ["D","[\"snake\": 0, ...]",  7,      "dog",  4," (4)"],
    ["C","[\"snake\": 0, ...]",  7,"butterfly",  6," (3)"],
    ["D","[\"snake\": 0, ...]", 13,"butterfly",  6," (4)"],
    ["C","[\"snake\": 0, ...]", 13,     "crab",  8," (3)"],
    ["D","[\"snake\": 0, ...]", 21,     "crab",  8," (4)"],
    ["E","[\"snake\": 0, ...]", 21,     "crab",  8," (5)"],
]

code.forEach((lineOfCode,index) => {
    document.querySelector('.code-output').innerHTML +=
        "<div class=\"code-line\"><span>"+(index+1)+"</span><div>"+lineOfCode+"</div></div>"
})

function animateTrace(n) {
    if (n <= sequence.length) {
        if (n < sequence.length) {
            document.querySelector('.code-line:nth-child('+(cnt.indexOf(sequence[n][0])+1)+')').classList.toggle('active')
            document.querySelector('.trace-table tbody').innerHTML
                += "<th>"+sequence[n][0]+sequence[n][5]+"</th>"+
                   "<td>"+sequence[n][1]+"</td>"+
                   "<td>"+sequence[n][2]+"</td>"+
                   "<td>"+sequence[n][3]+"</td>"+
                   "<td>"+sequence[n][4]+"</td>"
        }
        if (n > 0) {
            document.querySelector('.code-line:nth-child('+(cnt.indexOf(sequence[n-1][0])+1)+')').classList.toggle('active')
        }
        setTimeout(() => {
            animateTrace(n+1)
        }, 1000)
    }
}

setTimeout(() => {
    animateTrace(0)
}, 1000);
