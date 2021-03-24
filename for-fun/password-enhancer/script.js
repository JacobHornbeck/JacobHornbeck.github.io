const what4what = [
    /* ["find", "replace"] */
    /* Symbols */
    [
        ["A", "/-\\"],
        ["C", "("],
        ["D", "|)"],
        ["H", "|-|"],
        ["I", "]["],
        ["K", "|<"],
        ["L", "|_"],
        ["M", "|\\/|"],
        ["N", "|\\|"],
        ["O", "()"],
        ["V", "\\/"],
        ["W", "\\/\\/"],
        ["X", "><"],
    ],
    /* Characters */
    [
        ["a", "@"],
        ["i", "!"],
        ["s", "$"],
    ],
    /* Numbers */
    [
        ["o", "0"],
        ["i", "1"],
        ["e", "3"],
    ]
]


function adjustOutput(justUsed) {
    let inStr = document.querySelector('#password')
    let strVal = inStr.value
    let outElem = document.querySelector('#output')
    let outStr = ""

    let characters = document.querySelector('#forCharacters').checked
    let symbols = document.querySelector('#forSymbols').checked
    let numbers = document.querySelector('#forNumbers').checked

    if (characters) {
        document.querySelector('#pForCharacters').className = ""
    }
    else {
        document.querySelector('#pForCharacters').className = "hide"
    }
    if (symbols) {
        document.querySelector('#pForSymbols').className = ""
    }
    else {
        document.querySelector('#pForSymbols').className = "hide"
    }
    if (numbers) {
        document.querySelector('#pForNumbers').className = ""
    }
    else {
        document.querySelector('#pForNumbers').className = "hide"
    }
    if (!characters && !symbols && !numbers)
        document.querySelector('#showOnlyWhenShowing').className = "hide"
    else
        document.querySelector('#showOnlyWhenShowing').className = ""

    for (let i = 0; i < strVal.length; i++) {
        let added = false
        if (symbols && !added) {
            temp2 = what4what[1]
            for (let j = 0; j < temp2.length; j++) {
                if (temp2[j][0].toLowerCase() == strVal[i].toLowerCase()) {
                    outStr += temp2[j][1]
                    added = true
                    break
                }
            }
        }
        if (numbers && !added) {
            temp3 = what4what[2]
            for (let j = 0; j < temp3.length; j++) {
                if (temp3[j][0].toLowerCase() == strVal[i].toLowerCase()) {
                    outStr += temp3[j][1]
                    added = true
                    break
                }
            }
        }
        if (characters && !added) {
            temp1 = what4what[0]
            for (let j = 0; j < temp1.length; j++) {
                if (temp1[j][0].toLowerCase() == strVal[i].toLowerCase()) {
                    outStr += temp1[j][1]
                    added = true
                    break
                }
            }
        }
        if (!added) {
            outStr += strVal[i]
        }
    }

    outElem.value = outStr
}


