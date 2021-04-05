const code = ["FUNCTION create_insult(words)",
    "<span></span>insult <- ''",
    "<span></span>first_words <- words['adjective1']['unused']",
    "<span></span>first_index <- random(0, first_words.length)",
    "<span></span>",
    "<span></span>insult += first_words[first_index]",
    "<span></span>words['adjective1']['used'].append(first_words[first_index])",
    "<span></span>words['adjective1']['unused'].remove(first_words[first_index])",
    "<span></span>",
    "<span></span>second_words <- words['adjective2']['unused']",
    "<span></span>second_index <- random(0, second_words.length)",
    "<span></span>",
    "<span></span>insult += ' '+second_words[second_index]",
    "<span></span>words['adjective2']['used'].append(second_words[second_index])",
    "<span></span>words['adjective2']['unused'].remove(second_words[second_index])",
    "<span></span>",
    "<span></span>third_words <- words['noun']['unused']",
    "<span></span>third_index <- random(0, third_words.length)",
    "<span></span>",
    "<span></span>insult += ' '+third_words[third_index]",
    "<span></span>words['noun']['used'].append(third_words[third_index])",
    "<span></span>words['noun']['unused'].remove(third_words[third_index])",
    "<span></span>",
    "<span></span>return insult",
]
const sequence = [
    ["A", "", "['goatish', 'meddling']", "1", "/", "/", "/", "/", [2, 3, 4]],
    ["B", "meddling", "['goatish']", "1", "/", "/", "/", "/", [6, 7, 8]],
    ["C", "meddling", "['goatish']", "1", "['toad-spotted', 'onion-eyed']", "0", "/", "/", [10, 11]],
    ["D", "meddling toad-spotted", "['goatish']", "1", "['onion-eyed']", "0", "/", "/", [13, 14, 15]],
    ["E", "meddling toad-spotted", "['goatish']", "1", "['onion-eyed']", "0", "['coward', 'mangy-dog']", "1", [17, 18]],
    ["F", "meddling toad-spotted mangy-dog", "['goatish']", "1", "['onion-eyed']", "0", "['coward']", "1", [20, 21, 22]],
    ["G", "meddling toad-spotted mangy-dog", "['goatish']", "1", "['onion-eyed']", "0", "['coward']", "1", 24]
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
