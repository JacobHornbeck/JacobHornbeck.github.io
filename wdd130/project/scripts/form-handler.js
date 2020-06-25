const form = document.forms[0]

function SubmitReservation(e) {
    e.preventDefault()
    document.querySelector("main.non-centered > section.cover-header + section").style.display = "none"
    document.querySelector("main.non-centered > section.cover-header + section + section").style.display = "none"
    var formEl = document.getElementById("reservation-form")
    formEl.style.paddingBottom = "0"
    formEl.innerHTML = "<section><h3>Reservation Submitted</h3>"+
        "<p>Hello, "+form.your_name.value+", thank you for choosing "+
        "Temple Inn & Suites! Your reservation has been submitted "+
        "successfully. If there is anything more we need from you, "+
        "we will email"+(form.text_able.checked==true?", call, or text ":" or call ")+
        "you for the needed information. Thank you!</p></section>"
}

form.addEventListener('submit', SubmitReservation)