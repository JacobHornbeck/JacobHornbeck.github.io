const weekOn = 9
const numbers = [
    [],
    [1,0],
    [1,1],
    [0,1],
    [1,1],
    [1,0],
    [0,0],
    [0,1],
    [1,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
]

for (let i = 1; i <= weekOn; i++) {
    if (i > 1)
        document.querySelector('#week-list').innerHTML += "<hr>"
    document.querySelector('#week-list').innerHTML += `<section class="weeks">
        <h2>Week ${i}</h2>
        <a href="week${i}/notes/"><img src="images/notes.png">Notes<span ${numbers[i][0] > 0 ? "" : "class=\"showOnHover\""}>${numbers[i][0]}</span></a>
        <a href="week${i}/code-examples/"><img src="images/codes.png">Code Examples<span ${numbers[i][1] > 0 ? "" : "class=\"showOnHover\""}>${numbers[i][1]}</span></a>
        <a href="week${i}/team-activity/"><img src="images/team.png">Team Activity</a>
    </section>`
}
