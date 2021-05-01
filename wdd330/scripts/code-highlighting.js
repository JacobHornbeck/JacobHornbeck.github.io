/* A Syntax Highlighter Function... Still In Progress */
function HighlightPreCode(codeTxt, language) {
    let outputCodeString = ""
    codeTxt.split('\n').forEach((item,index) => {
        const functionStart = item.indexOf('function ')
        const openingParentheses = item.indexOf('(')
        const closingParentheses = item.indexOf(')')
        const variable = item.indexOf('var')
        const constant = item.indexOf('const')
        const varLet = item.indexOf('let')
        const equalSign = item.indexOf('=')
        const beginText = item.indexOf('"') >= 0 ? item.indexOf('"') : item.indexOf('\'')
        const endText = item.indexOf('"', beginText+1) >= 0 ? item.indexOf('"', beginText+1) : item.indexOf('\'', beginText+1)
        const consoleObj = item.indexOf('console')
        const period = item.indexOf('.')
        const emptyFunctionCall = item.indexOf('()')

        if (index > 0)
            outputCodeString += "\n"

        switch (language) {
            case 'JavaScript':
                if (functionStart >= 0) {
                    outputCodeString += `${item.substring(0, functionStart)}<span class='reservedWord'>function</span> `

                    if (openingParentheses >= 0 && closingParentheses >= 0) {
                        outputCodeString += `<span class='functionName'>${item.substring(functionStart+9, openingParentheses)}</span>(<span class="parameter">${item.substring(openingParentheses+1, closingParentheses).split(',').join('</span>, <span class="parameter">')}</span>) {`
                    }
                }
                else if (variable >= 0) {
                    if (equalSign > variable)
                        outputCodeString += `${item.substring(0, variable)}<span class='reservedWord'>var</span> <span class='variableName'>${item.substring(variable+4,equalSign)}</span> = `
                    else
                        outputCodeString += `${item.substring(0, variable)}<span class='reservedWord'>var</span> <span class='variableName'>${item.substring(variable+4,equalSign)}</span>`
                    // Check for the different variable types like string or number
                }
                else if (constant >= 0) {
                    if (equalSign > constant)
                        outputCodeString += `${item.substring(0, constant)}<span class='reservedWord'>var</span> <span class='variableName'>${item.substring(constant+4,equalSign)}</span> = `
                    else
                        outputCodeString += `${item.substring(0, constant)}<span class='reservedWord'>var</span> <span class='variableName'>${item.substring(constant+4,equalSign)}</span>`
                    // Check for the different variable types like string or number
                }
                else if (varLet >= 0) {
                    if (equalSign > varLet)
                        outputCodeString += `${item.substring(0, varLet)}<span class='reservedWord'>var</span> <span class='variableName'>${item.substring(varLet+4,equalSign)}</span> = `
                    else
                        outputCodeString += `${item.substring(0, varLet)}<span class='reservedWord'>var</span> <span class='variableName'>${item.substring(varLet+4,equalSign)}</span>`
                    // Check for the different variable types like string or number
                }
                else if (consoleObj >= 0) {
                    if (period > consoleObj && openingParentheses > period && closingParentheses > openingParentheses)
                        outputCodeString += `${item.substring(0, consoleObj)}<span class="object">console</span>.<span class="functionName">${item.substring(consoleObj+8,openingParentheses)}</span><span class="text">(${item.substring(openingParentheses+1,closingParentheses).split("${").join("<span class=\"object\">${</span><span class=\"parameter\">").split("}").join("</span><span class=\"object\">}</span>")}</span>)`
                }
                else if (emptyFunctionCall >= 0) {
                    outputCodeString += `${item.substring(0, item.lastIndexOf(' ')+1)}<span class="functionName">${item.substring(item.lastIndexOf(' ')+1,emptyFunctionCall)}</span>()`
                }
                else if (item.trim() == "}")
                    outputCodeString += `${item.substring(0, item.indexOf('}'))}}`
                else {
                    outputCodeString += item
                }
            break;
        }
    })

    return outputCodeString
}

/* A Function To Call The Syntax Highlighter */
function GetPreCodeAndApplySyntaxHighlights() {
    const codeBlocks = document.querySelectorAll('pre')
    const languages = document.querySelectorAll('div.codeLanguage')

    for (let i = 0; i<codeBlocks.length; i++) {
        codeBlocks[i].innerHTML = HighlightPreCode(codeBlocks[i].textContent, languages[i].textContent)
    }
}

GetPreCodeAndApplySyntaxHighlights()
