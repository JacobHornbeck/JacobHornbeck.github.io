function storeVal() {
    sessionStorage.setItem('ss_1_message', document.getElementById('session-storage-set').value)
}

function getVal() {
    document.getElementById('session-storage-get').value = sessionStorage.getItem('ss_1_message')
}
