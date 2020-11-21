WebFont.load({
    google: {
        families: [
            'Comfortaa',
            'Exo 2'
        ]
    }
})

function toggleMenu() {
    var temp = document.getElementsByClassName('toggler')[0]
    temp.classList.toggle('hide')
    if (temp.classList[1]=='hide') {
        document.querySelector('.toggler > a').innerHTML = '&#9776; Menu'
    }
    else {
        document.querySelector('.toggler > a').innerHTML = '&#10006; Close'
    }
}


const townDataURL = 'https://byui-cit230.github.io/weather/data/towndata.json'
const towns2get = [
    'Preston',
    'Fish Haven',
    'Soda Springs'
]

fetch(townDataURL)
    .then((response) => {
        return response.json()
    })
    .then((jsonData) => {
        jsonData['towns'].filter(item => towns2get.includes(item.name))
            .forEach(town => {
                let i = town.photo
                let n = town.name
                let m = town.motto
                let f = town.yearFounded
                let p = town.currentPopulation
                let r = town.averageRainfall
                
                let div = document.createElement('div')
                let img = document.createElement('img')
                let sect = document.createElement('section')
                let h2 = document.createElement('h2')
                let spn = document.createElement('span')
                let p1 = document.createElement('p')
                let p2 = document.createElement('p')
                let p3 = document.createElement('p')

                img.setAttribute('src','./images/'+i)
                img.setAttribute('alt','header image for '+n)
                h2.textContent = n
                spn.textContent = m
                p1.textContent = 'Year Founded: '+f
                p2.textContent = 'Population: '+p
                p3.textContent = 'Annual Rain Fall: '+r
                sect.appendChild(h2)
                sect.appendChild(spn)
                sect.appendChild(p1)
                sect.appendChild(p2)
                sect.appendChild(p3)
                div.appendChild(img)
                div.appendChild(sect)
                document.querySelector('#towns').appendChild(div)
            })
    })


let pages = {
    '🏠 Home': './',
    '🏴󠁵󠁳󠁩󠁤󠁿 Preston': './preston.html',
    '🥤 Soda Springs': './soda-springs.html',
    '🎣 Fish Haven': './fish-haven.html',
    '⛈️ Storm Center': './stormcenter.html',
    '🖼️ Gallery': './gallery.html'
}

function openPage(elem) {
    let el = elem.querySelector('h3')
    window.open(pages[el.textContent],'_self')
}