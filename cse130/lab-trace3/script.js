const code = ["FUNCTION printPrimes(array,num)",
    "<span></span>SET string = \"\\nPrime numbers less than \"+str(num)+\":\\n    \"",
    "<span></span>FOR i in array:",
    "<span></span><span></span>IF not i == 0",
    "<span></span><span></span><span></span>string += str(i)+\"  \"",
    "<span></span>PUT string",
    "<span></span>",
    "GET n from USER",
    "<span></span>",
    "SET arr <- list(range(n))",
    "<span></span>",
    "FOR i <- 2 ... floor(sqrt(n))",
    "<span></span>FOR a <- i ... arr.length",
    "<span></span><span></span>IF arr[a] > i and arr[a] % i == 0:",
    "<span></span><span></span><span></span>SET arr[a] <- 0",
    "<span></span>",
    "printPrimes(arr,n)"
]
const sequence = [
    ["A", "10", "/", "/", "/", 8],
    ["B", "10", "[1,2,3,4,5,6,7,8,9,10]", "/", "/", 10],
    ["C", "10", "[1,2,3,4,5,6,7,8,9,10]", "2", "/", 12],
    ["D", "10", "[1,2,3,4,5,6,7,8,9,10]", "2", "2", 13],
    ["E", "10", "[1,2,3,4,5,6,7,8,9,10]", "2", "2", 14],
    ["D", "10", "[1,2,3,4,5,6,7,8,9,10]", "2", "3", 13],
    ["E", "10", "[1,2,3,4,5,6,7,8,9,10]", "2", "3", 14],
    ["F", "10", "[1,2,3,0,5,6,7,8,9,10]", "2", "3", 15],
    ["D", "10", "[1,2,3,0,5,6,7,8,9,10]", "2", "4", 13],
    ["E", "10", "[1,2,3,0,5,6,7,8,9,10]", "2", "4", 14],
    ["D", "10", "[1,2,3,0,5,6,7,8,9,10]", "2", "5", 13],
    ["E", "10", "[1,2,3,0,5,6,7,8,9,10]", "2", "5", 14],
    ["F", "10", "[1,2,3,0,5,0,7,8,9,10]", "2", "5", 15],
    ["D", "10", "[1,2,3,0,5,0,7,8,9,10]", "2", "6", 13],
    ["E", "10", "[1,2,3,0,5,0,7,8,9,10]", "2", "6", 14],
    ["D", "10", "[1,2,3,0,5,0,7,8,9,10]", "2", "7", 13],
    ["E", "10", "[1,2,3,0,5,0,7,8,9,10]", "2", "7", 14],
    ["F", "10", "[1,2,3,0,5,0,7,0,9,10]", "2", "7", 15],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,10]", "2", "8", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,10]", "2", "8", 14],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,10]", "2", "9", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,10]", "2", "9", 14],
    ["F", "10", "[1,2,3,0,5,0,7,0,9,0]", "2", "9", 15],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,0]", "2", "10", 13],
    ["C", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "/", 12],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "3", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "3", 14],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "4", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "4", 14],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "5", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "5", 14],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "6", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "6", 14],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "7", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "7", 14],
    ["D", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "8", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,9,0]", "3", "8", 14],
    ["F", "10", "[1,2,3,0,5,0,7,0,0,0]", "3", "8", 15],
    ["D", "10", "[1,2,3,0,5,0,7,0,0,0]", "3", "9", 13],
    ["E", "10", "[1,2,3,0,5,0,7,0,0,0]", "3", "9", 14],
    ["D", "10", "[1,2,3,0,5,0,7,0,0,0]", "3", "10", 13],
    ["C", "10", "[1,2,3,0,5,0,7,0,0,0]", "4", "/", 12],
    ["G", "10", "[1,2,3,0,5,0,7,0,0,0]", "4", "/", 17],
    ["H", "10", "[1,2,3,0,5,0,7,0,0,0]", "/", "/", [1,2,3,4,5,6]],
]

code.forEach((lineOfCode,index) => {
    document.querySelector('.code-output').innerHTML +=
        "<div class=\"code-line\"><span>"+(index+1)+"</span><div>"+lineOfCode+"</div></div>"
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
        }, 500)
    }
}

setTimeout(() => {
    animateTrace(0)
}, 500);
