const duration = 3000
const speed = 0.5
const cursorXOffset = 0
const cursorYOffset = -5
var hearts = []
function generateHeart(x, y, xBound, xStart, scale) {
    var heart = document.createElement("DIV")
    heart.setAttribute('class', 'heart')
    document.body.appendChild(heart)
    heart.time = duration
    heart.x = x
    heart.y = y
    heart.bound = xBound
    heart.direction = xStart
    heart.style.left = heart.x + "px"
    heart.style.top = heart.y + "px"
    heart.scale = scale
    heart.style.transform = "scale(" + scale + "," + scale + ")"
    if (hearts == null) hearts = []
    hearts.push(heart)
    return heart
}
var before = Date.now()
var id = setInterval(frame, 5)
function frame() {
    var current = Date.now()
    var deltaTime = current - before
    before = current
    for (i in hearts) {
        var heart = hearts[i]
        heart.time -= deltaTime
        if (heart.time > 0) {
            heart.y -= speed
            heart.style.top = heart.y + "px"
            heart.style.left = heart.x + heart.direction * heart.bound * Math.sin(heart.y * heart.scale / 30) + "px"
        }
        else {
            heart.parentNode.removeChild(heart)
            hearts.splice(i, 1)
        }
    }
}
function NewHeart() {
    $.getJSON("heart.json", function(data) {
        let tempHearts = data.hearts
        data.hearts = tempHearts + 1
        $("#numbers").text(data.hearts)
    })

    generateHeart(
        (window.event.clientX),
        (window.event.clientY),
        (30 + Math.random() * 20),
        (1 - Math.round(Math.random()) * 2),
        (Math.random() * Math.random() * 0.8 + 0.2)
    )
}