const code = ["FUNCTION getTypes(password)",
"<span></span>commonSymbols &lt;- \"!@#$%^&*()\"",
"<span></span>uncommonSymbols &lt;- \"`~-_=+[{}]\\|;:'\",&lt;.&gt;/?\"",
"<span></span>types &lt;- [0,0,0,0,0,0]",
"<span></span>",
"<span></span>FOR char in password",
"<span></span><span></span>IF char.isspace()",
"<span></span><span></span><span></span>types[0] ++",
"<span></span><span></span>ELIF char.isdigit()",
"<span></span><span></span><span></span>types[1] ++",
"<span></span><span></span>ELIF char.isalpha() && char.islower()",
"<span></span><span></span><span></span>types[2] ++",
"<span></span><span></span>ELIF char.isalpha() && char.isupper()",
"<span></span><span></span><span></span>types[3] ++",
"<span></span><span></span>ELIF char in commonSymbols",
"<span></span><span></span><span></span>types[4] ++",
"<span></span><span></span>ELIF char in uncommonSymbols",
"<span></span><span></span><span></span>types[5] ++",
"<span></span>",
"<span></span>return types",
]
const sequence = [
    ["A", "[0, 0, 0, 0, 0, 0]", "/", [2,3,4]],
    ["B", "[0, 0, 0, 0, 0, 0]", "P", 6],
    ["I", "[0, 0, 0, 0, 0, 0]", "P", 13],
    ["J", "[0, 0, 0, 1, 0, 0]", "P", 14],
    ["B", "[0, 0, 0, 1, 0, 0]", "@", 6],
    ["K", "[0, 0, 0, 1, 0, 0]", "@", 15],
    ["L", "[0, 0, 0, 1, 1, 0]", "@", 16],
    ["B", "[0, 0, 0, 1, 1, 0]", "s", 6],
    ["G", "[0, 0, 0, 1, 1, 0]", "s", 11],
    ["H", "[0, 0, 1, 1, 1, 0]", "s", 12],
    ["B", "[0, 0, 1, 1, 1, 0]", "$", 6],
    ["K", "[0, 0, 1, 1, 1, 0]", "$", 15],
    ["L", "[0, 0, 1, 1, 2, 0]", "$", 16],
    ["B", "[0, 0, 1, 1, 2, 0]", "\\", 6],
    ["M", "[0, 0, 1, 1, 2, 0]", "\\", 17],
    ["N", "[0, 0, 1, 1, 2, 1]", "\\", 18],
    ["B", "[0, 0, 1, 1, 2, 1]", "/", 6],
    ["M", "[0, 0, 1, 1, 2, 1]", "/", 17],
    ["N", "[0, 0, 1, 1, 2, 2]", "/", 18],
    ["B", "[0, 0, 1, 1, 2, 2]", "\\", 6],
    ["M", "[0, 0, 1, 1, 2, 2]", "\\", 17],
    ["N", "[0, 0, 1, 1, 2, 3]", "\\", 18],
    ["B", "[0, 0, 1, 1, 2, 3]", "/", 6],
    ["M", "[0, 0, 1, 1, 2, 3]", "/", 17],
    ["N", "[0, 0, 1, 1, 2, 4]", "/", 18],
    ["B", "[0, 0, 1, 1, 2, 4]", "0", 6],
    ["E", "[0, 0, 1, 1, 2, 4]", "0", 9],
    ["F", "[0, 1, 1, 1, 2, 4]", "0", 10],
    ["B", "[0, 1, 1, 1, 2, 4]", "r", 6],
    ["G", "[0, 1, 1, 1, 2, 4]", "r", 11],
    ["H", "[0, 1, 2, 1, 2, 4]", "r", 12],
    ["B", "[0, 1, 2, 1, 2, 4]", "d", 6],
    ["G", "[0, 1, 2, 1, 2, 4]", "d", 11],
    ["H", "[0, 1, 3, 1, 2, 4]", "d", 12],
    ["B", "[0, 1, 3, 1, 2, 4]", "!", 6],
    ["K", "[0, 1, 3, 1, 2, 4]", "!", 15],
    ["L", "[0, 1, 3, 1, 3, 4]", "!", 16],
    ["O", "[0, 1, 3, 1, 3, 4]", "!", 20]
]

code.forEach((lineOfCode,index) => {
    document.querySelector('.code-output').innerHTML +=
        "<div class=\"code-line\"><span class=\"num\">"+(index+1)+"</span><div>"+lineOfCode+"</div></div>"
    document.querySelector('.code-output').style.height = (code.length*21)+"px"
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
        window.scrollTo(0,document.body.scrollHeight)
        setTimeout(() => {
            animateTrace(n+1)
        }, 400)
    }
}

setTimeout(() => {
    animateTrace(0)
}, 500);
