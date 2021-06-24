import QuakesController from "./QuakesController.js";

const controller = new QuakesController(document.querySelector('#quakeList'))

controller.init()

document.querySelector('#quakeDetails .close').addEventListener('touchend', () => {
    document.querySelector('#quakeDetails').className = "hide"
})
