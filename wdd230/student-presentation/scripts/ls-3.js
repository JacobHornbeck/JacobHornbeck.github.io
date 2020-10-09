function getItems() {
    var all_elems = document.getElementById('all-items')
    if (localStorage.length>0) {
        all_elems.innerHTML = ''
        all_elems.style.height = (localStorage.length*60)+'px'
        for (let i = 0; i < localStorage.length; i++) {
            let keyI = localStorage.key(i)
            all_elems.innerHTML += '<div class=\'ls-item\' id=\''+keyI+'\'></div>'
            document.getElementById(keyI).innerHTML = '<span>Key:</span><span>'+keyI+'</span>'+
                    '<span>Value:</span><span>'+localStorage.getItem(keyI)+'</span>'+
                    '<button id=\''+keyI+'-button\'>Delete</button>'
        }
        for (let i = 0; i < localStorage.length; i++) {
            let keyI = localStorage.key(i)
            let temp = document.getElementById(keyI)
            document.getElementById(keyI+'-button').addEventListener('click', function() {removeItem(temp,keyI)})
        }
    }
    else {
        all_elems.innerHTML = 'Nothing in localStorage...'
    }
}

function removeItem(htmlElem,lsItem) {
    htmlElem.remove()
    localStorage.removeItem(lsItem)
    getItems()
}

function clearStorage() {
    if (confirm("Are you sure you want to clear all localStorage items?")) {
        localStorage.clear()
        alert("All localStorage has been cleared")
    }
    else {
        alert("localStorage was not cleared")
    }
}
