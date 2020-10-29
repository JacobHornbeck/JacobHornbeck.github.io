const code = [
    "val count = 0",
    "<span></span>",
    "while (count < 5) {",
    "<span></span>count++",
    "}",
    "<span></span>",
    "println(\"count == $count\")"
]
const sequence = [
    ["A", "0", "/", 1],
    ["B", "0", "/", 3],
    ["C", "1", "/", 4],
    ["B", "1", "/", 3],
    ["C", "2", "/", 4],
    ["B", "2", "/", 3],
    ["C", "3", "/", 4],
    ["B", "3", "/", 3],
    ["C", "4", "/", 4],
    ["B", "4", "/", 3],
    ["C", "5", "/", 4],
    ["B", "5", "/", 3],
    ["B", "5", "count == $count", 7]
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
