function storeVals() {
    var lst1 = document.getElementsByClassName('key')
    var lst2 = document.getElementsByClassName('value')
    for (let i = 0; i < lst1.length; i++) {
        sessionStorage.setItem(lst1[i].value,lst2[i].value)
    }
}

function getVals() {
    var all_elems = document.getElementById('session-storage-all')
    if (sessionStorage.length>0) {
        all_elems.value = ""
        all_elems.style.height = (sessionStorage.length*3.1+3)+"em"
        all_elems.style.minHeight = (sessionStorage.length*3.1+3)+"em"
        all_elems.style.maxHeight = (sessionStorage.length*3.1+3)+"em"
        for (let i = 0; i < sessionStorage.length; i++) {
            all_elems.value += "Key:\t\t"+sessionStorage.key(i)+"\nValue:\t"+sessionStorage.getItem(sessionStorage.key(i))+"\n\n"
        }
    }
    else {
        all_elems.value = "Nothing in sessionStorage..."
    }
}

function addAnother() {
    document.getElementById('key/value-inputs')
        .innerHTML += "<input type=\"text\" class=\"key\" placeholder=\"Key name\">\n"+
                      "<input type=\"text\" class=\"value\" placeholder=\"Value\">"
}

function clearOutput() {
    document.getElementById('session-storage-all').value = ""
    document.getElementById('session-storage-all').style.height = "2em"
    document.getElementById('session-storage-all').style.minHeight = "2em"
    document.getElementById('session-storage-all').style.maxHeight = "2em"
}