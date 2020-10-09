function fO(str) {
    var l = 25
    if (str.length > l) {
        return str.substring(0,l)+"..."
    }
    else {
        return str
    }
}

function getItems() {
    var all_elems = document.getElementById('all-session-items')
    if (sessionStorage.length>0) {
        all_elems.innerHTML = ''
        all_elems.style.height = (sessionStorage.length*60)+'px'
        for (let i = 0; i < sessionStorage.length; i++) {
            let keyI = sessionStorage.key(i)
            all_elems.innerHTML += '<div class=\'ls-item\' id=\''+keyI+'\'></div>'
            document.getElementById(keyI).innerHTML = '<span>Key:</span><span>'+fO(keyI)+'</span>'+
                    '<span>Value:</span><span>'+fO(sessionStorage.getItem(keyI))+'</span>'+
                    '<button id=\''+keyI+'-button\'>Delete</button>'
        }
        for (let i = 0; i < sessionStorage.length; i++) {
            let keyI = sessionStorage.key(i)
            let temp = document.getElementById(keyI)
            document.getElementById(keyI+'-button').addEventListener('click', function() {removeItem(temp,keyI)})
        }
    }
    else {
        all_elems.innerHTML = 'Nothing in sessionStorage...'
    }
}

function removeItem(htmlElem,lsItem) {
    htmlElem.remove()
    sessionStorage.removeItem(lsItem)
    getItems()
}

function clearStorage() {
    if (confirm("Are you sure you want to clear all sessionStorage items?")) {
        sessionStorage.clear()
        alert("All sessionStorage has been cleared")
    }
    else {
        alert("SessionStorage was not cleared")
    }
}


function addAnother() {
    document.getElementById('key/value-session-inputs')
        .innerHTML += "<input type=\"text\" class=\"key\" placeholder=\"Key name\">\n"+
                      "<input type=\"text\" class=\"value\" placeholder=\"Value\">"
}

function storeVals() {
    var lst1 = document.getElementsByClassName('key')
    var lst2 = document.getElementsByClassName('value')
    for (let i = 0; i < lst1.length; i++) {
        sessionStorage.setItem(lst1[i].value,lst2[i].value)
    }
}
