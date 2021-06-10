let nextUrl = null;
let previousUrl = null;

function loadList(url){
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let list = document.querySelector('#starwarsPeopleList')
            list.innerHTML = ""
            data.results.forEach((person) => {
                list.innerHTML +=
                    `<li> ${person.name} </li>`
            });  

            nextUrl = data.next;
            previousUrl = data.previous;
            
            if (data.next) {
                document.querySelector("#next")
                    .disabled = false
            }
            else {
                document.querySelector("#next")
                    .disabled = true
            }

            if (data.previous) {
                document.querySelector("#previous")
                    .disabled = false
            }
            else {
                document.querySelector("#previous")
                    .disabled = true
            }
            


        });
}

loadList("https://swapi.dev/api/people")

document.querySelector('#goTo').addEventListener('touchend', () => {
    const page = document.querySelector('#pageSkip').value
    loadList("https://swapi.dev/api/people/?page="+page)
})


function LoadNext() {
    if (nextUrl) {
        loadList(nextUrl)
    }
}

function LoadPrevious() {
    if (previousUrl) {
        loadList(previousUrl)
    }
}
