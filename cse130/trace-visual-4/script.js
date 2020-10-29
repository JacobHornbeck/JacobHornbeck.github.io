const code = [ "PROMPT for grade",
    "GET numberGrade",
    "IF numberGrade ≥ 80",
    "<span></span>IF numberGrade ≥ 90",
    "<span></span><span></span>letterGrade ← A",
    "<span></span>ELSE",
    "<span></span><span></span>letterGrade ← B",
    "ELSE",
    "<span></span>IF numberGrade ≥ 70",
    "<span></span><span></span>letterGrade ← C",
    "<span></span>ELSE",
    "<span></span><span></span>letterGrade ← D",
    "PUT letterGrade"
]
const sequence = [
    ["A",  "/", "/", "/",  1],
    ["B", "79", "/", "/",  2],
    ["C", "79", "/", "/",  3],
    ["H", "79", "/", "/",  8],
    ["I", "79", "/", "/",  9],
    ["J", "79", "C", "/", 10],
    ["M", "79", "C", "C", 13],
]

code.forEach((lineOfCode,index) => {
    document.querySelector('.code-output').innerHTML +=
        "<div class=\"code-line\"><span>"+(index+1)+"</span><div>"+lineOfCode+"</div></div>"
})

function animateTrace(n) {
    if (n <= sequence.length) {
        if (n < sequence.length) {
            document.querySelector('.code-line:nth-child('+sequence[n][sequence[n].length-1]+')').classList.toggle('active')
            let some_txt = "<th>"+sequence[n][0]+" ("+sequence[n][sequence[n].length-1]+")</th>"
            for (let i = 1; i<sequence[n].length-1; i++) {
                some_txt += "<td>"+sequence[n][i]+"</td>"
            }
            document.querySelector('.trace-table tbody').innerHTML += some_txt
        }
        if (n > 0) {
            document.querySelector('.code-line:nth-child('+sequence[n-1][sequence[n-1].length-1]+')').classList.toggle('active')
        }
        setTimeout(() => {
            animateTrace(n+1)
        }, 1000)
    }
}

setTimeout(() => {
    animateTrace(0)
}, 1000);
