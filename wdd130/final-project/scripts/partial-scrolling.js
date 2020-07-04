function AdjustImage() {
    let img1 = document.getElementById("hero")
    img1.style.backgroundPosition = "0 -"+(window.scrollY/2+5)+"px"
    let img2 = document.getElementById("last-call")
    img2.style.backgroundPosition = "0 calc(100% - "+(window.scrollY/3+205)+"px)"
}