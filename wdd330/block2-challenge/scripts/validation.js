var checkNow = false
var elemLater = null
var laterElem = null
var timeoutSe = null
var started = false

function CheckValue(elem) {
    if (event.keyCode === 8) {
        LoadPerCharacter(true,elem)
    }
}

function LoadPerCharacter(tr,elem) {
    if (elem) {
        started = true
        elemLater = elem.parentElement.getElementsByClassName('valid')[0]
        elemLater.className = 'valid loading'
        elemLater.title = 'Checking username'
        laterElem = elem
    }
    else {
        elemLater.className = 'valid loading'
        elemLater.title = 'Checking username'
    }
    if (checkNow) {
        if (laterElem.value.length > 0) {
            elemLater.className = 'valid true'
            elemLater.title = 'That username is available'

            if (laterElem.id == 'password-confirm') {
                let oPass = document.getElementById('password-create')
                if (oPass.value == laterElem.value) {
                    elemLater.className = 'valid true'
                    elemLater.title = 'The passwords match'
                }
                else {
                    elemLater.className = 'valid false'
                    elemLater.title = 'The passwords don\'t match'
                }
            }
        }
        else {
            elemLater.className = 'valid false'
            elemLater.title = 'Please enter a username' /* 'That username is taken... choose another' */
        }
        checkNow = false
    }
    if (tr) {
        clearTimeout(timeoutSe)
        timeoutSe = setTimeout(() => {
            checkNow = true
            LoadPerCharacter(false)
        }, 900)
    }
}

