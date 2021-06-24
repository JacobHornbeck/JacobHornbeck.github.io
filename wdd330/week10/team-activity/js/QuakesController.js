import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
    constructor(parent, position = null) {
        this.parent = parent;
        // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
        this.parentElement = null;
        // let's give ourselves the option of using a location other than the current location by passing it in.
        this.position = position || { lat: 0, lon: 0 };
        // this is how our controller will know about the model and view...we add them right into the class as members.
        this.quakes = new Quake();
        this.quakesView = new QuakesView();
    }
    async init() {
        // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
        this.parentElement = document.querySelector('#'+this.parent.id);
        await this.initPos();
        this.getQuakesByRadius(100);
    }
    async initPos() {
        // if a position has not been set
        if (this.position.lat === 0) {
            try {
                // try to get the position using getLocation()
                const location = await getLocation()
                // if we get the location back then set the latitude and longitude into this.position
                if (location) {
                    this.position.lat = location.coords.latitude
                    this.position.lon = location.coords.longitude
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getQuakesByRadius(radius = 100) {
        this.parentElement.innerHTML = 'Loading...';
        
        const quakeList = await this.quakes.getEarthQuakesByRadius(
            this.position,
            radius
        );
        
        this.quakesView.renderQuakeList(quakeList, this.parentElement);
        this.parentElement.addEventListener('touchend', e => {
            this.getQuakeDetails(e.target.dataset.id);
        });
    }
    async getQuakeDetails(quakeId) {
        // get the details for the quakeId provided from the model, then send them to the view to be displayed
        const quake = this.quakes.getQuakeById(quakeId)
        console.log(quake)
        this.quakesView.renderQuake(quake, document.querySelector('#quakeDetails'))

        document.querySelector('#quakeDetails')
    }
}