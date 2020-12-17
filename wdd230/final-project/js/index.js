const check = window.location.href
const rnd = (n,d) => {
    return (Math.round(n*10**d)/10**d)
}

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
                    "<h3>"+itemName+" <a href=\"./reservations.html?vehicle="+el.name.toLowerCase().replace('~','').replace(/\s/g,'-')+"\"><span>Rent Now</span></a></h3>"+
                    "<p>Max Capacity: "+el['max-capacity']+" "+["person","people"][el['max-capacity']>1?1:0]+"</p>"+
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

    fetch(url+'onecall?lat=20.5083&lon=-86.9458&exclude=minutely,hourly&units=imperial&appid='+api_key)
        .then(res => {
            return res.json()
        })
        .then(jsonData => {
            let current = jsonData.current
            let img = document.querySelector('.weather > section img')
            let h4 = document.querySelector('.weather > section h4')
            let p = document.querySelector('.weather > section p')

            img.setAttribute('src','./images/weather-icons/'+current.weather[0].icon+'.png')
            img.setAttribute('alt',current.weather[0].description)
            h4.innerHTML = rnd(current.temp,1)+"&deg;F "+current.weather[0].main
            p.innerHTML = "Humidity: "+rnd(current.humidity,1)+"%"

            let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
            jsonData.daily.forEach((elem,index) => {
                if (document.querySelector('.forecast > section:nth-child('+(index+1)+')') !== null) {
                    let img = document.querySelector('.forecast > section:nth-child('+(index+1)+') img')
                    let h3 = document.querySelector('.forecast > section:nth-child('+(index+1)+') h3')
                    let p = document.querySelector('.forecast > section:nth-child('+(index+1)+') p')

                    img.setAttribute('src','./images/weather-icons/'+elem.weather[0].icon+'.png')
                    img.setAttribute('alt',elem.weather[0].description)
                    h3.innerHTML = days[((new Date().getDay())+index)%days.length]
                    p.innerHTML = "Temp: "+rnd(elem.temp.day,1)+"&deg;F"
                }
            })

            function CleanDate(date) {
                let tD = new Date(date*1000)
                let dt = new Date(Date.UTC(tD.getFullYear()))
                let hrs = dt.getHours()
                let mins = dt.getMinutes()
                let time = (hrs>12?((hrs-12)+":"
                    +"0".substring(0,mins>9?0:1)+mins+" pm"):(hrs==12)?(12+":"
                    +"0".substring(0,mins>9?0:1)+mins+" pm"):(hrs+":"
                    +"0".substring(0,mins>9?0:1)+mins+" am"))
                return time+" "
                      +(dt.getMonth()+1)+"/"
                      +dt.getDate()+"/"
                      +dt.getFullYear()
            }
            if (jsonData.alerts != undefined) {
                document.querySelector('div.alerts').className = "alerts"
                jsonData.alerts.forEach((item) => {
                    document.querySelector('div.alerts').innerHTML += "<section class=\"alert\">"+
                            "<img src=\"./images/alert.png\" alt=\"alert icon\">"+
                            "<h2>"+item.event+"</h2>"+
                            "<span>&nbsp;- "+item.sender_name+"</span>"+
                            "<p>"+CleanDate(item.start)+" - "+CleanDate(item.end)+" (Local Time)</p>"+
                            "<p>"+item.description.replace(/\\n/g,'<br>')+"</p>"+
                            "<div onclick=\"CloseAlert(this)\" class=\"close\">&#x2715;</div>"+
                        "</section>"
                })
            }
            else {
                document.querySelector('div.alerts').style.display = "none"
            }
        })
    function CloseAlert(close) {
        close.parentElement.classList.toggle('not-show')
    }
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
            jsonData['rentals'].forEach((item) => {
                if (check.includes(item.name.toLowerCase().replace('~','').replace(/\s/g,'-'))) {
                    document.querySelector('select[name="vehicle"]')
                        .innerHTML += "<option value=\""+item.name.replace('~','')+"\" selected>"+item.name+"</option>"
                }
                else {
                    document.querySelector('select[name="vehicle"]')
                        .innerHTML += "<option value=\""+item.name.replace('~','')+"\">"+item.name+"</option>"
                }
            })
        })

    function AdjustImg(select) {
        let output = "<div class=\"grid\"><img src=\"./images/"+select.value+".png\" alt=\""+select.value+"\">"
        switch (select.value) {
            case "g-pay":
                output += "<p>Pay</p>"
            break;
            case "cash":
                output += "<p>Cash</p>"
            break;
            case "card":
                output += "<p>Card</p>"
            break;
        }
        document.querySelector('.payment-icon').innerHTML = output
    }

    function CalcTotal(form) {
        let el1 = document.querySelector('select[name="vehicle"]')
        let tmp = document.querySelectorAll('input[name="rental-period"]')
        let el2
        let el3 = document.querySelector('input[name="rental-days"]')
        let total = 0
        for (let i = 0; i<tmp.length; i++) {
            if (tmp.item(i).checked)
                el2 = tmp.item(i)
        }
        if (el1.value != "" && el2 != undefined) {
            fetch('./data/rentals.json')
                .then((response) => {
                    return response.json()
                })
                .then((jsonData) => {
                    let vehicle_data = jsonData.rentals.filter((item => {
                        return (item.name.replace('~','') == el1.value)
                    }))[0]
                    let price = vehicle_data['reservation'][el2.value.toString()]
                    let addition = " ("+el2.value.toString().replace('-',' ')+" rental + $50 security deposit)"
                    if (price == undefined) {
                        price = vehicle_data['reservation']['full-day']*el3.value*(1-0.10)
                        addition = " ("+el3.value+" day rental + $50 security deposit)"
                    }
                    document.querySelector('#total-price').textContent = "$"+rnd(price+50,2)+addition
                })
        }
    }
    
    function CheckForm(agree) {
        let form = agree.parentElement.parentElement.parentElement.parentElement
        if (form.checkValidity()) {
            document.querySelector('form input[type="submit"]').disabled = false
        }
        else {
            if (agree.checked) {
                if (window.confirm("Complete all the required fields!")) {
                    document.querySelector('form input[type="submit"]').disabled = false
                    document.querySelector('form input[type="submit"]').click()
                }
                agree.checked = false
            }
            document.querySelector('form input[type="submit"]').disabled = true
        }
        CalcTotal(form)
    }

    let radioOn = false
    let numOn = false
    function SelectOtherOne(input) {
        if (input.type == "radio" && !radioOn) {
            numOn = true
            input.parentElement.querySelector('input[type="number"]').focus()
            input.parentElement.querySelector('input[type="number"]').setAttribute('required',true)
        }
        if (input.type == "number" && !numOn) {
            radioOn = true
            numOn = true
            input.setAttribute('required',true)
            input.parentElement.querySelector('input[type="radio"]').click()
            input.focus()
        }
        setTimeout(() => {
            radioOn = false
            numOn = false
        }, 200);
    }
    function UnRequire() {
        document.querySelector('input[name="rental-days"]').removeAttribute('required')
    }
    function HideUnHide(country) {
        if (country.value == "United States") {
            document.querySelector('#state').className = ""
            document.querySelector('#state input').setAttribute('required',true)
            document.querySelector('#state input').setAttribute('name','state')
        }
        else {
            document.querySelector('#state').className = "hide"
            document.querySelector('#state input').removeAttribute('required')
            document.querySelector('#state input').removeAttribute('name')
        }
    }
    setTimeout(() => {
        CheckForm(document.querySelector('form input[name=\"responsible\"]'))
        HideUnHide(document.querySelector('form input[name=\"country\"]'))
    }, 500);
}
else if (check.includes('rentals.html')) {
    fetch('./data/rentals.json')
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            let elem = document.querySelector('section.all-rental-info')
            elem.innerHTML = "<h2>Available Rentals</h2>"
            jsonData['rentals'].forEach((item,index) => {
                let itemName = (item.name+(item.type=="Jeep"?"":" "+item.type))
                elem.innerHTML += "<section class=\"grid\">"+
                    "<img src=\"./images/"+itemName.toLowerCase().replace('~','').replace(/\s/g,'-').replace('-1000','')+".png\" alt=\""+itemName+"\">"+
                    "<h3>"+item.name+" <a href=\"./reservations.html?vehicle="+item.name.toLowerCase().replace('~','').replace(/\s/g,'-')+"\"><span>Rent Now</span></a></h3>"+
                    "<p>Max Capacity: "+item['max-capacity']+" "+["person","people"][item['max-capacity']>1?1:0]+"</p>"+
                    "<p>Walk-in:<br> &nbsp; &nbsp; Half day: $"+item['walk-in']['half-day']+" &nbsp; &nbsp; Full day: $"+item['walk-in']['full-day']+"</p>"+
                    "<p>Reservation: <b>*</b><br> &nbsp; &nbsp; Half day: $"+item['reservation']['half-day']+" &nbsp; &nbsp; Full day: $"+item['reservation']['full-day']+"</p>"+
                    "</section>"
                if (index < jsonData['rentals'].length-1) {
                    elem.innerHTML += "<hr>"
                }
                else {
                    elem.innerHTML += "<p><b>*</b> Reservations have to be placed at least 24 hours in advanced, or we will charge you the price of a walk in.</p>"
                }
            })
            elem.innerHTML += "<h2>Agreement Info</h2>"
            jsonData['agreement-info'].forEach((item) => {
                elem.innerHTML += "<p>"+item+"</p>"
            })
            elem.innerHTML += "<h2>Other Details</h2>"
            jsonData['other-info'].forEach((item) => {
                elem.innerHTML += "<p>"+item+"</p>"
            })
        })
}
else if (check.includes('contact.html')) {
    function ShowThankYou(form) {
        window.event.preventDefault()
        form.innerHTML = "<h2>Thank You!</h2><p>We have received your comment and will get back to you as soon as possible!</p>"
    }
}

let elems = document.querySelectorAll('nav ul li:nth-child(1)')

for (let i = 0; i<elems.length; i++) {
    elems[i].addEventListener('click', (() => {
        elems[i].parentElement.parentElement.classList.toggle('out')
    }))
}
