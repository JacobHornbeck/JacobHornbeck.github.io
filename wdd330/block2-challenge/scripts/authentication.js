let loggedInUser = null

/* Functions Working With LocalStorage */
    function StoreRedirect(pageTo) {
        localStorage.setItem('redirectTo', pageTo)
    }
    function GetRedirect() {
        return localStorage.getItem('redirectTo')
    }
    function StoreNotif(content, type="error") {
        localStorage.setItem('message-content', content)
        localStorage.setItem('message-type', type)
    }
    function CreateNotif(content, type) {
        let obj = GetNotif()
        if (content && type) {
            obj = {
                content: content,
                type: type
            }
        }

        let notif = document.createElement('div')
            notif.classList.add('notif')
            notif.classList.add(obj.type)
        let notifIcon = document.createElement('img')
            notifIcon.src = `images/notif-${obj.type}.png`
        let notifText = document.createElement('span')
            notifText.textContent = obj.content
        let notifClose = document.createElement('span')
            notifClose.textContent = "×"
            notifClose.classList.add('close')
            notifClose.addEventListener('click', () => {
                notif.style.animation = "notif-out 0.5s"
                setTimeout(() => {
                    notif.remove()
                }, 501);
            })
        
        notif.appendChild(notifIcon)
        notif.appendChild(notifText)
        notif.appendChild(notifClose)
        document.body.appendChild(notif)
    }
    function GetNotif() {
        if (localStorage.getItem('message-content')) {
            return {
                content: localStorage.getItem('message-content'),
                type: localStorage.getItem('message-type')
            }
        }
        else return null
    }
    function RemoveNotif() {
        localStorage.removeItem('message-content')
        localStorage.removeItem('message-type')
    }
/* Functions Working With LocalStorage */

/* Functions Interacting With Firebase */
    window.onload = () => {
        let loggingOut = false
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                loggedInUser = user
                document.querySelectorAll('.navLoginButton').forEach((elem) => {
                    elem.parentElement.style.display = "none"
                })
                document.querySelectorAll('.logoutButton').forEach((button) => {
                    button.addEventListener('click', () => {
                        firebase.auth().signOut().then((result) => {
                            loggingOut = true
                            StoreNotif('You are now signed out', 'success')
                            OpenTxtLink('./')
                        })
                    })
                })
                if (user.photoURL) {
                    let imagePreview = document.querySelector('.navAccountDropdown > img')
                        imagePreview.src = user.photoURL
                        imagePreview.alt = `${user.displayName}'s profile picture`
                }
                if (window.location.href.includes('my-account')) {
                    const hour = new Date().getHours()
                    document.querySelector('#greeting').textContent = (hour < 12 ? "Good morning," : (hour < 17 ? "Good afternoon," : "Good evening,"))
                    document.querySelector('#accountDisplayName').textContent = user.displayName

                    let displayName = document.querySelector('#userName')
                        displayName.value = user.displayName
                        displayName.addEventListener('input', () => {
                            if (document.querySelector('#userName').value !== user.displayName) {
                                document.querySelector('#userName + .btn').disabled = false
                            }
                            else {
                                document.querySelector('#userName + .btn').disabled = true
                            }
                        })
                    let updateNameButton = document.querySelector('#userName + .btn')
                        updateNameButton.disabled = true
                        updateNameButton.addEventListener('click', () => {
                            user.updateProfile({
                                    displayName: document.querySelector('#userName').value
                                })
                                .then(() => {
                                    document.querySelector('#accountDisplayName').textContent = user.displayName
                                    updateNameButton.textContent = "Updated"
                                    updateNameButton.disabled = true
                                    setTimeout(() => {
                                        updateNameButton.textContent = "Update"
                                    }, 2000);
                                })
                                .catch(error => {
                                    console.log({code: error.code, message: error.message})
                                })
                        })

                    let userEmail = document.querySelector('#userEmail')
                        userEmail.value = user.email
                        userEmail.addEventListener('input', () => {
                            if (document.querySelector('#userEmail').value !== user.email) {
                                document.querySelector('#userEmail + .btn + .btn').style.display = "block"
                                document.querySelector('#userEmail + .btn').style.display = "none"
                            }
                            else {
                                document.querySelector('#userEmail + .btn + .btn').style.display = "none"
                                document.querySelector('#userEmail + .btn').style.display = "block"
                            }
                        })

                    let verifyButton = document.querySelector('#userEmail + .btn')
                        verifyButton.addEventListener('click', () => {
                            user.sendEmailVerification()
                                .then(() => {
                                    verifyButton.textContent = "Sent"
                                    verifyButton.disabled = true
                                    CreateNotif('Verification email sent!', 'success')
                                })
                                .catch(error => {
                                    console.log({code: error.code, message: error.message})
                                })
                        })
                    if (user.emailVerified) {
                        verifyButton.textContent = "Verified"
                        verifyButton.disabled = true
                    }

                    let updateEmailButton = document.querySelector('#userEmail + .btn + .btn')
                        updateEmailButton.style.display = "none"
                        updateEmailButton.addEventListener('click', () => {
                            user.updateEmail(document.querySelector('#userEmail').value)
                                .then(() => {
                                    updateEmailButton.textContent = "Updated"
                                    setTimeout(() => {
                                        updateEmailButton.textContent = "Update"
                                        document.querySelector('#userEmail + .btn + .btn').style.display = "none"
                                        document.querySelector('#userEmail + .btn').style.display = "block"
                                        if (user.emailVerified) {
                                            verifyButton.textContent = "Verified"
                                            verifyButton.disabled = true
                                        }
                                    }, 2000);
                                })
                                .catch(error => {
                                    console.log({code: error.code, message: error.message})
                                    if (error.code = "auth/requires-recent-login") {
                                        StoreNotif('Please login again to update email')
                                        StoreRedirect('my-account.html')
                                        
                                        OpenTxtLink('login.html')
                                    }
                                })
                        })

                    let photoUpload = document.querySelector('#userImage')
                        photoUpload.addEventListener('input', () => {
                            document.querySelector('#userImage + .btn').disabled = false
                            const reader = new FileReader()
                            reader.addEventListener('load', () => {
                                document.querySelector('#userImage ~ img').setAttribute('src', reader.result)
                            })
                            reader.readAsDataURL(photoUpload.files[0])
                        })
                    
                    let savePhoto = document.querySelector('#userImage + .btn')
                        savePhoto.disabled = true
                        savePhoto.addEventListener('click', () => {
                            let profileImage = document.querySelector('#userImage').files[0]

                            if (profileImage.type.includes('image')) {
                                let storageRef = firebase.storage().ref('images/' + profileImage.name)
                                let uploadTask = storageRef.put(profileImage, {contentType: profileImage.type})
                                    uploadTask.on('state_changed',
                                        (snapshot) => {
                                            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                            // Use the progress somewhere...
                                        },
                                        (error) => {
                                            console.log({code: error.code, message: error.message})
                                        },
                                        () => {
                                            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                                                user.updateProfile({ photoURL: url })
                                                    .then(() => {
                                                        CreateNotif('Profile image uploaded', 'success')
                                                    })
                                                    .catch(error => {
                                                        console.log({code: error.code, message: error.message})
                                                    })
                                            })
                                        })
                            }
                        })
                    if (user.photoURL) {
                        let imagePreview = document.querySelector('#userImage ~ img')
                            imagePreview.src = user.photoURL
                            imagePreview.alt = `${user.displayName}'s profile picture`
                    }   
                }
            }
            else {
                document.querySelector('.navAccountDropdown').parentElement.style.display = "none"
                document.querySelector('.desktopAccountOptions').style.display = "none"
                if (window.location.href.includes('my-account') && !loggingOut) {
                    StoreNotif('You must be logged in to access that page')
                    OpenTxtLink('./')
                }
            }
        })
    }
    function UserSignUp(email, password, name) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                let user = userCredential.user;
                    user.updateProfile({
                        displayName: name
                    })
                    .then(() => {
                        StoreNotif('Your account was created', 'success')
                        OpenTxtLink("./")
                    })
                    .catch(error => {
                        console.log({code: error.code, message: error.message})
                    })
            })
            .catch((error) => {
                console.log({code: error.code, message: error.message})
            });
    }
    function UserSignIn(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                OpenTxtLink(GetRedirect() || './')
            })
            .catch((error) => {
                console.log({code: error.code, message: error.message})
            });
    }
/* Functions Interacting With Firebase */

function EmailSignUp() {
    const email = document.querySelector('#email-create').value
    const password = document.querySelector('#password-create').value
    const confirm = document.querySelector('#password-confirm').value
    const name = document.querySelector('#name-create').value

    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(email)) {
        alert("Not a valid email address!")
    }
    else if (password !== confirm) {
        alert("Passwords don't match!")
    }
    else {
        UserSignUp(email, password, name)
    }
}
function EmailSignIn() {
    const email = document.querySelector('#email-login').value
    const password = document.querySelector('#password').value

    UserSignIn(email, password)
}

function MicrosoftSignUp() {
    alert("That sign up method is currently unavailable")
}

