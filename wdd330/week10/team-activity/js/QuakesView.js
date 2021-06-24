export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
        listElement.innerHTML = quakeList.features.map(quake => {
            const quakeDate = new Date(quake.properties.time)
            return `<li data-id="${quake.id}">${quake.properties.title}, ${quakeDate.getMonth()+1}/${quakeDate.getDate()}/${quakeDate.getFullYear()}</li>`
        }).join('')
    }
    renderQuake(quake, element) {
        const quakeProperties = Object.entries(quake.properties)
        const title = element.querySelector(`#${element.id} .quakeTitle`)
        const propertyList = element.querySelector(`#${element.id} .quakeProperties`)
        
        console.log(quakeProperties)

        title.innerHTML = `${quakeProperties.filter(item => item[0] === "title")[0][1]}`
        propertyList.innerHTML = ''

        quakeProperties.forEach((property) => {
            if (property[0] !== "title") {
                propertyList.innerHTML += `<li>${property[0]}: ${property[1]}</li>`
            }
        })
    }
}