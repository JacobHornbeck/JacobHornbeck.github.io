//'https://iplan.byui.edu/apihost/Enterprise/api/AnalyticsDemographic/GetdemographicData',



setTimeout(() => {
    var el = document.createElement('script')
    el.src = 'https://iplan.byui.edu/apihost/Enterprise/api/EnterpriseUser/GetUser?callback=UserLoginSuccess'
    document.body.appendChild(el)
}, 1000);

function UserLoginSuccess(json) {
    console.log(json)
    if (json['message'].length>0) {
        $('#show-if-not-logged-in').css('display','block')
        $('#show-if-logged-in').css('display','none')
    }
    else {
        $('#show-if-not-logged-in').css('display','none')
        $('#show-if-logged-in').css('display','block')
        $('#users-name').text(json['name'])
    }
}
