const check = window.location.href

if (check.substring(check.length-14,check.length) == "final-project/") {
    fetch('./data/rentals.json')
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            let list = document.querySelector('div.grid > section')
            list.innerHTML = "<h2>Basic Rental Info</h2>"
            jsonData['rentals'].forEach((el,index) => {
                let itemName = (el.name+(el.type=="Jeep"?"":" "+el.type))
                const template = "<section class=\"grid\">"+
                    "<img src=\"./images/"+itemName.toLowerCase().replace('~','').replace(/\s/g,'-').replace('-1000','')+".png\" alt=\""+itemName+"\">"+
                    "<h3>"+itemName+" <a href=\"./reservations?vehicle="+el.name.toLowerCase().replace(/\s/g,'-')+"\"><span>Rent Now</span></a></h3>"+
                    "<p>Max Capacity: "+el['max-capacity']+" "+["person","people"][el['max-capacity']>1?1:el['max-capacity']]+"</p>"+
                    "<p>Half day: $"+el.reservation['half-day']+" &nbsp; &nbsp; Full day: $"+el.reservation['full-day']+"</p>"+
                    "</section>"

                list.innerHTML += template
                if (index < jsonData['rentals'].length-1)
                    list.innerHTML += "<hr>"
            })
            list.innerHTML += "<p>View more rental information on the <a href=\"./rentals.html\"><span>Rentals page</span></a></p>"
        })



    const api_key = '\x33\x30\x64\x61\x62\x38\x61\x64\x36\x31\x36\x30\x30\x36\x34\x36\x34\x63\x36\x66\x63\x65\x66\x61\x62\x63\x63\x64\x35\x32\x35\x34'
    var url = 'https://api.openweathermap.org/data/2.5/'

    const imgURL = 'https://openweathermap.org/img/w/'
    const rnd = (n,d) => {
        return (Math.round(n*10**d)/10**d)
    }

    fetch(url+'weather?id=3530103&units=imperial&appid='+api_key)
        .then(res => {
            return res.json()
        })
        .then(jsonData => {
            let img = document.querySelector('.weather > section img')
            let h4 = document.querySelector('.weather > section h4')
            let p = document.querySelector('.weather > section p')

            img.setAttribute('src',imgURL+jsonData.weather[0].icon+'.png')
            img.setAttribute('alt',jsonData.weather[0].description)
            h4.innerHTML = rnd(jsonData.main.temp,1)+"&deg;F "+jsonData.weather[0].main
            p.innerHTML = "Humidity: "+rnd(jsonData.main.humidity,1)+"%"
        })

    fetch(url+'forecast?id=3530103&units=imperial&appid='+api_key)
        .then(res => {
            return res.json()
        })
        .then(jsonData => {
            let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
            jsonData.list.filter(item => item['dt_txt'].includes('18:00:00'))
                .forEach((elem,index) => {
                    if (document.querySelector('.forecast > section:nth-child('+(index+1)+')') !== null) {
                        let img = document.querySelector('.forecast > section:nth-child('+(index+1)+') img')
                        let h3 = document.querySelector('.forecast > section:nth-child('+(index+1)+') h3')
                        let p = document.querySelector('.forecast > section:nth-child('+(index+1)+') p')

                        img.setAttribute('src',imgURL+elem.weather[0].icon+'.png')
                        img.setAttribute('alt',elem.weather[0].description)
                        h3.innerHTML = days[((new Date().getDay())+index)%days.length]
                        p.innerHTML = "Temp: "+rnd(elem.main.temp,1)+"&deg;F"
                    }
                })
        })
        
}
else if (check.includes('reservations.html')) {
    fetch('./data/rentals.json')
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            let elem = document.querySelector('section.rental-agreement')
            elem.innerHTML = "<h2 id=\"agreement-info\">Rental Agreement</h2>"
            jsonData['agreement-info'].forEach((item) => {
                let el = document.createElement('p')
                el.innerText = item
                elem.appendChild(el)
            })
        })

    function CheckForm(agree) {
        let form = agree.parentElement.parentElement.parentElement.parentElement
        if (form.checkValidity()) {
            document.querySelector('form input[type="submit"]').disabled = false
        }
        else {
            if (agree.checked) {
                if (window.confirm("Complete the required field(s) above before you agreeing to this!")) {
                    document.querySelector('form input[type="submit"]').disabled = false
                    document.querySelector('form input[type="submit"]').click()
                }
                agree.checked = false
            }
            document.querySelector('form input[type="submit"]').disabled = true
        }
    }

    let radioOn = false
    let numOn = false
    function SelectOtherOne(input) {
        if (input.type == "radio" && !radioOn) {
            numOn = true
            input.parentElement.querySelector('input[type="number"]').focus()
        }
        if (input.type == "number" && !numOn) {
            radioOn = true
            numOn = true
            input.parentElement.querySelector('input[type="radio"]').click()
            input.focus()
        }
        setTimeout(() => {
            radioOn = false
            numOn = false
        }, 200);
    }
}