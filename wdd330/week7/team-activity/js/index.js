import { Hike } from './hike.js'
import { Comment } from './comment.js'

const hikeList = [
    new Hike(1,
             "Bechler Falls",
             "falls.jpg",
             "Image of Bechler Falls",
             "3 miles",
             "Easy",
             "Beautiful short hike along the Bechler river to Bechler Falls",
             "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."),
    new Hike(2,
             "Teton Canyon",
             "falls.jpg",
             "Image of Bechler Falls",
             "3 miles",
             "Easy",
             "Beautiful short (or long) hike through Teton Canyon.",
             "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."),
    new Hike(3,
             "Denanda Falls",
             "falls.jpg",
             "Image of Bechler Falls",
             "7 miles",
             "Moderate",
             "Beautiful hike through Bechler meadows river to Denanda Falls",
             "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."),
];

const imgBasePath = "//byui-cit.github.io/cit261/examples/";

window.addEventListener("load", showHikeList);

function showHikeList() {
    const hikeListElement = document.getElementById("hikes");
    hikeListElement.innerHTML = "";
    renderHikeList(hikeList, hikeListElement);
}

function renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
        parent.appendChild(renderOneHike(hike));
    });
}

function renderOneHike(hike) {
    const item = document.createElement("li");

    // Using 'click' so it works in both mobile and desktop just because I test in both...
    item.addEventListener('click', () => {
        showHikeDetails(hike)
    });

    item.innerHTML = `<h2>${hike.name}</h2>
        <div class="image">
            <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
        </div>
        <div class="blurb">
            <div>
                <h3>Distance:</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty:</h3>
                <p>${hike.difficulty}</p>
            </div>
        </div>`;

    return item;
}

function showHikeDetails(hikeData) {
    const hikeListElement = document.getElementById("hikes");
    hikeListElement.innerHTML = `<button class="BackButton">Return to List</button>
        <section>
            <h2>${hikeData.name}</h2>
            <div class="image">
                <img src="${imgBasePath}${hikeData.imgSrc}" alt="${hikeData.imgAlt}">
            </div>
            <div>
                <h3>Description:</h3>
                <p>${hikeData.description}</p>
            </div>
            <div>
                <h3>Distance:</h3>
                <p>${hikeData.distance}</p>
            </div>
            <div>
                <h3>Difficulty:</h3>
                <p>${hikeData.difficulty}</p>
            </div>
            <div>
                <h3>Directions:</h3>
                <p>${hikeData.directions}</p>
            </div>
            <hr>
            <form name="commentForm">
                <textarea name="hikeComment" placeholder="Enter Comment"></textarea>
                <input type="hidden" name="hikeName" value="${hikeData.name}">
                <input type="hidden" name="hikeId" value="${hikeData.id}">
                <input id="commentSubmit" type="button" value="Post Comment">
            </form>
        </section>`;
    if (localStorage.getItem('hikeComments')) {
        JSON.parse(localStorage.getItem('hikeComments'))
            .filter((unfilteredComment) => {
                return parseInt(unfilteredComment.hikeId) === parseInt(hikeData.id)
            })
            .forEach((comment) => {
                hikeListElement.innerHTML += `<section class="comment">
                    <p>${comment.content}</p>
                </section>`
            })
    }
    document.querySelector('.BackButton').addEventListener('click', showHikeList)
    document.querySelector('#commentSubmit').addEventListener('click', () => {
        let hikeCommentsList = []
        if (localStorage.getItem('hikeComments')) {
            hikeCommentsList = JSON.parse(localStorage.getItem('hikeComments'))
        }
    
        const content = document.forms.commentForm.hikeComment.value
        const hikeId = document.forms.commentForm.hikeId.value
        const hikeName = document.forms.commentForm.hikeName.value
    
        hikeCommentsList.push(new Comment(
            hikeName,
            new Date(),
            content,
            hikeId,
        ))

        localStorage.setItem('hikeComments', JSON.stringify(hikeCommentsList))
    })
}

