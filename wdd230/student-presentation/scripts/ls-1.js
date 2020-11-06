function storeVal() {
    /*  Use localStorage.setItem() to store the value in the input. Remember
        that localStorage.setItem() is best to use, but there are other methods  */
    localStorage.setItem('ls_1_message', document.getElementById('local-storage-set').value)
}

function getVal() {
    /*  Use localStorage.getItem() to retrieve the value from localStorage */
    document.getElementById('local-storage-get').value = localStorage.getItem('ls_1_message')
}
