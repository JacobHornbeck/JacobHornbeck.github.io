fetch('../data/rentals.json')
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