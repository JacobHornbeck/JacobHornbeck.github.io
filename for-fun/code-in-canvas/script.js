function updateView() {
    let language = document.querySelector('#language').value
    language = (language.length>0) ? language : "[Language]"
    let code = document.querySelector('#code').value
    code = (code.length>0) ? code : "[Code Here]"
    let color = document.querySelector('#code-color').value
    let other_color = document.querySelector('#white-text').checked ? "#FFFFFF" : "#000000"
    let view = '<div style="padding: 5px 50px; width: max-content; text-align: center; background: '+color+'; color: '+other_color+';">'+language+'</div>'+
               '<pre style="width: max-content; max-width: 800px; margin-top: -5px; border: 5px solid '+color+'; padding: 10px; padding-right: 50px;">'+
               code+
               '</pre>'
    document.querySelector('#output').textContent = view
    
    document.querySelector('#language-view').textContent = language
    document.querySelector('#language-view').style.background = color
    document.querySelector('#language-view').style.color = other_color
    document.querySelector('#code-view').textContent = code
    document.querySelector('#code-view').style.border = "5px solid "+color
}

function CopyText(btn) {
    let text2copy = document.querySelector('#output')
    if (text2copy.value.length > 0) {
        text2copy.focus();
        text2copy.select();
        try {
            let successful = document.execCommand('copy');
            if (successful)
                btn.textContent = "Copied!"
            else
                btn.textContent = "Not Copied..."
        } catch(err) {
            btn.textContent = "Can't Copy..."
        }
    }
    else
        btn.textContent = "Nothing to Copy..."
    
    setTimeout(() => {
        btn.textContent = "Copy"
    }, 3000);
}
