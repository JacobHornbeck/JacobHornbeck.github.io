const api_key = "30dab8ad616006464c6fcefabccd5254"
const imgURL = "https://openweathermap.org/img/w/"
const k2f = (K) => {
    return (K - 273.15)* 1.8000 + 32.00
}
const rnd = (n,d) => {
    return (Math.round(n*10**d)/10**d)
}

fetch('https://api.openweathermap.org/data/2.5/weather?id=5604473&appid='+api_key)
    .then(res => {
        return res.json()
    })
    .then(jsonData => {
        console.log(jsonData)
        document.querySelector('#current-temp').textContent = rnd(k2f(jsonData.main.temp),1)

        let imageURL = imgURL+jsonData.weather[0].icon+'.png'
        let imageDesc = jsonData.weather[0].description
        document.querySelector('#imagesrc').textContent = imageURL
        document.querySelector('#icon').setAttribute('src',imageURL)
        document.querySelector('#icon').setAttribute('alt',imageDesc)
    })