/*setTimeout(() => {$.ajax({type: 'POST',url: 'https://iplan.byui.edu/apihost/Enterprise/api/AnalyticsDemographic/GetdemographicData?callback=InfoSuccess',type: 'application/json',headers: {':authority': 'iplan.byui.edu',},success: console.log("YAY!")});}, 1000);function InfoSuccess(json) {console.log("Hello World?");console.log(json);if (json['message'].length>0) {$('#show-if-not-logged-in').css('display','block');$('#show-if-logged-in').css('display','none');}else {$('#show-if-not-logged-in').css('display','none');$('#show-if-logged-in').css('display','block');$('#users-name').text(json['name']);}}*/

function NewScript(src,id) {
    let scr = document.createElement('script')
    scr.src = src
    scr.id  = id
    document.appendChild(scr)
}


var catalogCode = "5da4ba8c040540001a7c83e2"

function AdjustCatalog(elem) {
    catalogCode = elem.value
}

function SearchCourse(searchQuery) {
    NewScript('https://byui.kuali.co/api/v1/catalog/courses/'+catalogCode+'?q='+searchQuery+'&callback=LoadCourseSearch','load-course-script')
}

function GetCourseInfo(courseCode) {
    NewScript('https://byui.kuali.co/api/v1/catalog/course/'+catalogCode+'/'+courseCode+'?callback=LoadCourse','load-course-script')
}

function LoadCourseSearch(json) {
    
}

function LoadCourse(json) {
    
}
