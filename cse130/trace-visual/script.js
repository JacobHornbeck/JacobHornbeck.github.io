const code = [
    "int sum = 0;",
    "int count;",
    "for (count = 1; count < 9; count *= 2)",
    "<span></span>sum += count",
    "printf(\"sum = %d\\n\", sum);"
    
]
const cnt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const sequence = [
    ["A", 0, "/"],
    ["B", 0, "/"],
    ["C", 0, "1"],
    ["D", 1, "1"],
    ["C", 1, "2"],
    ["D", 3, "2"],
    ["C", 3, "4"],
    ["D", 7, "4"],
    ["C", 7, "8"],
    ["D",15, "8"],
    ["C",15,"16"],
    ["E",15,"16"],
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
                += "<th>"+sequence[n][0]+"</th><td>"+sequence[n][1]+"</td><td>"+sequence[n][2]+"</td>"
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
