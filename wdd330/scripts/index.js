const weekDone = 1

for (let i = 1; i <= weekDone; i++) {
    document.querySelector('#week-list').innerHTML += `<section class="weeks">
        <h2>Week ${i}</h2>
        <a href="week${i}/notes/"><img src="images/notes.png">Notes</a>
        <a href="week${i}/code-examples/"><img src="images/codes.png">Code Examples</a>
    </section>`
}
