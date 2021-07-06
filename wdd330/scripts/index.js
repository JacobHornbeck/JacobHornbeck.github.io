const weekOn = 11
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
    [0,1],
    [0,0],
    [0,0],
    [0,0],
]

for (let i = 1; i <= weekOn; i++) {
    const weekList = document.querySelector('#week-list')

    if (i > 1)
        weekList.innerHTML += "<hr>"
    
    weekList.innerHTML += `<section class="weeks">
        <h2>Week ${i}</h2>
        <a href="week${i}/notes/"><img src="images/notes.png">Notes<span ${numbers[i][0] > 0 ? "" : "class=\"showOnHover\""}>${numbers[i][0]}</span></a>
        <a href="week${i}/code-examples/"><img src="images/codes.png">Code Examples<span ${numbers[i][1] > 0 ? "" : "class=\"showOnHover\""}>${numbers[i][1]}</span></a>
        <a href="week${i}/team-activity/"><img src="images/team.png">Team Activity</a>
    </section>`

    if (i === 6) {
        weekList.innerHTML += `<hr>
            <section class="weeks">
                <h2 class="special">Midterm Check-in</h2>
                <a href="block1-challenge/"><img src="images/challenge.png">Block 1 Challenge</a>
            </section>`
    }
}
