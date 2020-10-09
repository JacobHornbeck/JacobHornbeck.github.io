function storeVals() {
    var lst1 = document.getElementsByClassName('key')
    var lst2 = document.getElementsByClassName('value')
    for (let i = 0; i < lst1.length; i++) {
        localStorage.setItem(lst1[i].value,lst2[i].value)
    }
}

function getVals() {
    var all_elems = document.getElementById('local-storage-all')
    if (localStorage.length>0) {
        all_elems.value = ""
        all_elems.style.height = (localStorage.length*3.1+3)+"em"
        all_elems.style.minHeight = (localStorage.length*3.1+3)+"em"
        all_elems.style.maxHeight = (localStorage.length*3.1+3)+"em"
        for (let i = 0; i < localStorage.length; i++) {
            all_elems.value += "Key:\t\t"+localStorage.key(i)+"\nValue:\t"+localStorage.getItem(localStorage.key(i))+"\n\n"
        }
    }
    else {
        all_elems.value = "Nothing in localStorage..."
    }
}

function addAnother() {
    document.getElementById('key/value-inputs')
        .innerHTML += "<input type=\"text\" class=\"key\" placeholder=\"Key name\">\n"+
                      "<input type=\"text\" class=\"value\" placeholder=\"Value\">"
    
}

function clearOutput() {
    document.getElementById('local-storage-all').value = ""
    document.getElementById('local-storage-all').style.height = "2em"
    document.getElementById('local-storage-all').style.minHeight = "2em"
    document.getElementById('local-storage-all').style.maxHeight = "2em"
}