function storeVal() {
    localStorage.setItem('ls_1_message', document.getElementById('local-storage-set').value)
}

function getVal() {
    document.getElementById('local-storage-get').value = localStorage.getItem('ls_1_message')
}
