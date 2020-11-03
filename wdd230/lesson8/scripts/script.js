WebFont.load({
    google: {
        families: [
            'Comfortaa',
            'Exo 2'
        ]
    }
})

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


const allImages = document.querySelectorAll("img[data-src]")

const lazyLoad = (img) => {
    let fTop = document.querySelector('html').scrollTop
    let par = img.parentElement
    let timeout = (parseInt(par.offsetLeft)*(parseInt(par.offsetTop)-parseInt(fTop))/10)/50
    setTimeout(() => {
        img.setAttribute("src", img.getAttribute("data-src"))
        img.onload = () => {
            img.removeAttribute("data-src")
            par.className = "in"
        }
    },timeout)
}


const options = {
    threshold: 0.5,
    rootMargin: "0px 0px 0px 0px"
}

if ('IntersectionObserver' in window) {
    const obsrvr = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                lazyLoad(item.target)
                observer.unobserve(item.target)
            }
        })
    }, options)
    allImages.forEach((img) => {
        obsrvr.observe(img)
    })
}
else {
    allImages.forEach((img) => {
        lazyLoad(img)
    })
}

