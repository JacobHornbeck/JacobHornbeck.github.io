const code = [
    "GET unsorted_list from USER",
    "READ unsorted_list in JSON",
    "<span></span>",
    "SET i_pivot <- numItems in unsorted_list - 1",
    "SET i_check <- 0",
    "SET i_largest <- 0",
    "<span></span>",
    "FUNCTION swap(arr, ind1, ind2) {",
    "<span></span>SET temp <- arr[ind1]",
    "<span></span>SET arr[ind1] <- arr[ind2]",
    "<span></span>SET arr[ind2] <- temp",
    "}",
    "<span></span>",
    "WHILE i_check < i_pivot",
    "<span></span>IF unsorted_list[i_check] >= unsorted_list[i_largest]",
    "<span></span><span></span>SET i_largest <- i_check",
    "<span></span>",
    "<span></span>IF i_check == i_pivot - 1",
    "<span></span><span></span>IF unsorted_list[i_largest] > unsorted_list[i_pivot]",
    "<span></span><span></span><span></span>swap(unsorted_list, i_largest, i_pivot)",
    "<span></span><span></span>SET i_pivot <- i_pivot-1",
    "<span></span><span></span>SET i_largest <- 0",
    "<span></span><span></span>SET i_check <- 0",
    "<span></span><span></span>CONTINUE",
    "<span></span>",
    "<span></span>SET i_check <- i_check + 1"
]
const sequence = [
    ["A","3","/","/",4],
    ["B","3","0","/",5],
    ["C","3","0","0",6],

    ["D","3","0","0",14],
    ["E","3","0","0",15],
    ["F","3","0","0",16],
    ["G","3","0","0",18],
    ["M","3","1","0",26],

    ["D","3","1","0",14],
    ["E","3","1","0",15],
    ["G","3","1","0",18],
    ["M","3","2","0",26],

    ["D","3","2","0",14],
    ["E","3","2","0",15],
    ["G","3","2","0",18],
    ["H","3","2","0",19],
    ["I","3","2","0",20],
    ["J","2","2","0",21],
    ["K","2","2","0",22],
    ["L","2","0","0",23],

    ["D","2","0","0",14],
    ["E","2","0","0",15],
    ["F","2","0","0",16],
    ["G","2","0","0",18],
    ["M","2","1","0",26],

    ["D","2","1","0",14],
    ["E","2","1","0",15],
    ["G","2","1","0",18],
    ["H","2","1","0",19],
    ["J","1","1","0",21],
    ["K","1","1","0",22],
    ["L","1","0","0",23],

    ["D","1","0","0",14],
    ["E","1","0","0",15],
    ["G","1","0","0",18],
    ["H","1","0","0",19],
    ["J","0","0","0",21],
    ["K","0","0","0",22],
    ["L","0","0","0",23],

    ["D","0","0","0",14],
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
