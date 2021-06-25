export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
        listElement.innerHTML = quakeList.features.map(quake => {
            const quakeDate = new Date(quake.properties.time)
            return `<li data-id="${quake.id}">${quake.properties.title}, ${quakeDate.getMonth()+1}/${quakeDate.getDate()}/${quakeDate.getFullYear()}</li>`
        }).join('')
    }
    renderQuake(quake, element) {
        const qp = quake.properties
        const qpDate = new Date(qp.time)
        const title = element.querySelector(`#${element.id} .quakeTitle`)
        const propertyList = element.querySelector(`#${element.id} .quakeProperties`)
        const quakeProperties = [
            ['Magnitude', qp.mag+' '+qp.magType],
            ['Depth', quake.geometry.coordinates[2]+' km'],
            ['Date', `${qpDate.getMonth()+1}/${qpDate.getDate()}/${qpDate.getFullYear()}`],
            ['More Info', `<a href="${qp.url}" target="_blank">click here</a>`]
        ]

        title.innerHTML = `${qp.title}`
        propertyList.innerHTML = ''

        quakeProperties.forEach((property) => {
            propertyList.innerHTML += `<li>${property[0]}: ${property[1]}</li>`
        })
    }
}