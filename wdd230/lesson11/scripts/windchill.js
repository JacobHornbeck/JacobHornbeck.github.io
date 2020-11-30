const pathN = window.location.pathname
const api_key = '\x33\x30\x64\x61\x62\x38\x61\x64\x36\x31\x36\x30\x30\x36\x34\x36\x34\x63\x36\x66\x63\x65\x66\x61\x62\x63\x63\x64\x35\x32\x35\x34'
var cityId = ''
var url = 'https://api.openweathermap.org/data/2.5/'
if (pathN.includes('preston')) {
    cityId = 'id=5604473'
}
else if (pathN.includes('fish-haven')) {
    cityId = 'lat=42.0380399&lon=-111.4048681'
}
else if (pathN.includes('soda-springs')) {
    cityId = 'id=5607916'
}

const imgURL = 'https://openweathermap.org/img/w/'
const rnd = (n,d) => {
    return (Math.round(n*10**d)/10**d)
}

fetch(url+'weather?'+cityId+'&units=imperial&appid='+api_key)
    .then(res => {
        return res.json()
    })
    .then(jsonData => {
        setTimeout(() => {
            let currentTemp = rnd(jsonData.main.temp,1)
            let windSpeed = jsonData.wind.speed
            document.querySelector('.summary .currently').innerHTML = jsonData.weather[0].main+' <span>'+currentTemp+'</span>&deg;F'
            document.querySelector('.summary .temperature').innerHTML = "<span>"+rnd(jsonData.main.temp_max,1)+"</span>&deg;F"
            document.querySelector('.summary .humidity').textContent = jsonData.main.humidity+'%'
            document.querySelector('.summary .wind-speed').innerHTML = "<span>"+windSpeed+"</span> mph"

            let chillFactor = 35.74 + (0.6215 * currentTemp) - (35.75 * Math.pow(windSpeed,0.16)) + (0.4275 * currentTemp * Math.pow(windSpeed,0.16))
            if (currentTemp <= 50.0 && windSpeed > 3.0) {
                document.querySelector('.colored.chill').innerHTML = "<span class=\"wind-chill\">"+rnd(chillFactor,1)+"</span>&deg;F"
            }
            else {
                document.querySelector('.colored.chill').innerHTML = 'N/A'
            }
        },2000)
    })




fetch(url+'forecast?'+cityId+'&units=imperial&appid='+api_key)
    .then(res => {
        return res.json()
    })
    .then(jsonData => {
        jsonData.list.filter(item => item['dt_txt'].includes('18:00:00'))
            .forEach((elem,index) => {

                document.querySelector('#day'+(index+1)+' + .weather-icon')
                    .innerHTML = '<img alt=\'\' src=\''+imgURL+elem.weather[0].icon+'.png\'>'
                document.querySelector('#day'+(index+1)+' ~ span')
                    .innerHTML = rnd(elem.main.temp,1)+'&deg;F'
            })
    })

