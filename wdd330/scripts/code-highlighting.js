/* A Syntax Highlighter Function... Still In Progress */
function HighlightPreCode(codeTxt, language) {
    let outputCodeString = ""

    switch (language.toLowerCase()) {
        case 'javascript':
            /* The Following Is Based On: https://idiallo.com/blog/javascript-syntax-highlighter */
            outputCodeString = codeTxt.replace(/"(.*?)"/g, '<span class="text">"$1"</span>')
                                      .replace(/'(.*?)'/g, "<span class=\"text\">'$1'</span>")
                                      .replace(/`(.*?|\s)`/g, '<span class="text">`$1`</span>')
                                      .replace(/`(.*?|\s)\$\{(.*?)\}(.*?|\s)`/g, '`$1<span class="reservedWord">${<span class="parameter">$2</span>}</span>$3`')
                                      .replace(/\((.*?)\) =>/g, '($1) <span class="reservedWord">=></span>')
                                      .replace(/([A-Za-z_0-9]+)\((.*?)\)/g, '<span class="functionName">$1</span>($2)')
                                      .replace(/(\d+)/g, '<span class="number">$1</span>')
                                      .replace(/\ ([A-Za-z_0-9]+)\./g, ' <span class="object">$1</span>.')
                                      .replace(/\.([A-Za-z_0-9]+)\./g, '.<span class="object">$1</span>.')
                                      .replace(/\.([A-Za-z_0-9]+)\(/g, '.<span class="method">$1</span>(')
                                      .replace(/([A-Za-z_0-9]+):/g, '<span class="object">$1</span>:')
                                      .replace(/\.([A-Za-z_0-9]+)/g, '.<span class="object">$1</span>')
                                      .replace(/\(([A-Za-z_0-9]+),/g, '(<span class="parameter">$1</span>,')
                                      .replace(/,([A-Za-z_0-9]+),/g, ', <span class="parameter">$1</span>,')
                                      .replace(/,([A-Za-z_0-9]+)\)/g, ', <span class="parameter">$1</span>)')
                                      .replace(/\b(return)(?=[^\w])/g, '<span class="return">$1</span>')
                                      .replace(/\b(var|let|const)(?=[^\w])\ ([A-Za-z_0-9]+)/g, '$1 <span class="varName">$2</span>')
                                      .replace(/\b(function)(?=[^\w]) (.*?)\(/g, '$1 <span class="functionName">$2</span>(')
                                      .replace(/\b(new|var|const|let|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g, '<span class="reservedWord">$1</span>')
                                      .replace(/\b(document|window|Array|String|Object|Number|\$)(?=[^\w])/g, '<span class="object">$1</span>')
                                      .replace(/\b(getElementsBy(TagName|ClassName|Name)|getElementById|typeof|instanceof)(?=[^\w])/g, '<span class="method">$1</span>')
                                      .replace(/\b(indexOf|match|replace|toString|length)(?=[^\w])/g, '<span class="method">$1</span>')
                                      .replace(/(\/\*.*\*\/)/g, '<span class="comment">$1</span>')
                                      .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
        break;
    }

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
