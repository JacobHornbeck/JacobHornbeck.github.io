const weekOn = 2

for (let i = 1; i <= weekOn; i++) {
    if (i > 1)
        document.querySelector('#week-list').innerHTML += "<hr>"
    document.querySelector('#week-list').innerHTML += `<section class="weeks">
        <h2>Week ${i}</h2>
        <a href="week${i}/notes/"><img src="images/notes.png">Notes</a>
        <a href="week${i}/code-examples/"><img src="images/codes.png">Code Examples</a>
        <a href="week${i}/team-activity/"><img src="images/team.png">Team Activity</a>
    </section>`
}
