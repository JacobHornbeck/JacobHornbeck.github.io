document.getElementsByClassName('last-updated')[0].innerHTML = "Last Updated: "+document.lastModified

function toggleMenu() {
    var temp = document.getElementsByClassName("toggler")[0]
    temp.classList.toggle("hide")
    if (temp.classList[1]=="hide") {
        document.querySelector(".toggler > a").innerHTML = "&#9776; Menu"
    }
    else {
        document.querySelector(".toggler > a").innerHTML = "&#10006; Close"
    }
}

if (new Date().getDay() == 5) {
    document.getElementById("big-banner").style.display = "block"
}

function closeBanner() {
    document.getElementById("big-banner").style.display = "none"
}

var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?units=I&lang=en&lat=42.1&lon=-111.88");
xhr.setRequestHeader("x-rapidapi-host", "weatherbit-v1-mashape.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "243fe7e7d2msh1d1778fe11aeee4p16940ejsn888f93619ce4");

xhr.send(data);