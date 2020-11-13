const code = [
    "GET num from USER",
    "<span></span>",
    "ASSERT num.isdigit(), \"Must be an integer!\"",
    "<span></span>",
    "IF num > 0",
    "<span></span>SET fib1 <- 1",
    "<span></span>SET fib2 <- 1",
    "<span></span>",
    "<span></span>FOR fib_i <- 2 ... num",
    "<span></span><span></span>SET temp <- fib2",
    "<span></span><span></span>SET fib2 <- fib2 + fib1",
    "<span></span><span></span>SET fib1 <- temp",
    "<span></span>PUT fib2",
    "ELSE",
    "<span></span>PUT \"Can't find Fibonacci number \" and num"
]
const sequence = [
    ["A", "7", "/",  "/", "/", "/",  "/", 1],
    ["A", "7", "/",  "/", "/", "/",  "/", 5],
    ["C", "7", "1",  "1", "/", "/",  "/", [6,7]],
    ["D", "7", "1",  "1", "2", "/",  "/", 9],
    ["E", "7", "1",  "2", "2", "1",  "/", [10,11,12]],
    ["D", "7", "1",  "2", "3", "/",  "/", 9],
    ["E", "7", "2",  "3", "3", "2",  "/", [10,11,12]],
    ["D", "7", "2",  "3", "4", "/",  "/", 9],
    ["E", "7", "3",  "5", "4", "3",  "/", [10,11,12]],
    ["D", "7", "3",  "5", "5", "/",  "/", 9],
    ["E", "7", "5",  "8", "5", "5",  "/", [10,11,12]],
    ["D", "7", "5",  "8", "6", "/",  "/", 9],
    ["E", "7", "8", "13", "6", "8",  "/", [10,11,12]],
    ["D", "7", "8", "13", "7", "/",  "/", 9],
    ["F", "7", "8", "13", "7", "/", "13", 13],
]

code.forEach((lineOfCode,index) => {
    document.querySelector('.code-output').innerHTML +=
        "<div class=\"code-line\"><span>"+(index+1)+"</span><div>"+lineOfCode+"</div></div>"
})

function animateTrace(n) {
    if (n <= sequence.length) {
        if (n < sequence.length) {
            seqN = sequence[n]
            if (seqN[seqN.length-1].length > 1) {
                for (let ii = 0; ii<seqN[seqN.length-1].length; ii++) {
                    document.querySelector('.code-line:nth-child('+seqN[seqN.length-1][ii]+')').classList.toggle('active')
                }
            }
            else {
                document.querySelector('.code-line:nth-child('+seqN[seqN.length-1]+')').classList.toggle('active')
            }
            let some_txt = "<th>"+seqN[0]+" ("+seqN[seqN.length-1]+")</th>"
            if (seqN[seqN.length-1].length > 1) {
                some_txt = "<th>"+seqN[0]+" ("+seqN[seqN.length-1][0]+"-"+seqN[seqN.length-1][seqN[seqN.length-1].length-1]+")</th>"
            }
            for (let i = 1; i<seqN.length-1; i++) {
                some_txt += "<td>"+seqN[i]+"</td>"
            }
            document.querySelector('.trace-table tbody').innerHTML += some_txt
        }
        if (n > 0) {
            if (sequence[n-1][sequence[n-1].length-1].length > 1) {
                for (let ii = 0; ii<sequence[n-1][sequence[n-1].length-1].length; ii++) {
                    document.querySelector('.code-line:nth-child('+sequence[n-1][sequence[n-1].length-1][ii]+')').classList.toggle('active')
                }
            }
            else {
                document.querySelector('.code-line:nth-child('+sequence[n-1][sequence[n-1].length-1]+')').classList.toggle('active')
            }
        }
        setTimeout(() => {
            animateTrace(n+1)
        }, 1000)
    }
}

setTimeout(() => {
    animateTrace(0)
}, 1000);
